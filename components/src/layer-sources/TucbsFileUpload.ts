import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "@carbon/web-components/es/components/file-uploader/file-uploader-drop-container.js";
import "@carbon/web-components/es/components/notification/index.js";
import { TucbsError } from "@tucbs/core";
import type { LayerManager } from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { showToast, destroyToast } from "../shared/ui/toast.js";
import { beginBusy, endBusy } from "../shared/util/busy.js";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { DraggablePanelController } from "../shared/ui/DraggablePanelController.js";

import { Close16 as CloseIcon, DocumentAdd16 as DocumentAddIcon } from "@carbon/icons";

type SupportedFormat = "geojson" | "kml" | "kmz" | "shp" | "csv";

interface FormatDef {
  readonly extension: string;
  readonly mime?: string;
  readonly layerType: "GEOJSON" | "KML" | "KMZ" | "SHP" | "CSV";
  readonly label: string;
}

const FORMATS: Record<SupportedFormat, FormatDef> = {
  geojson: { extension: ".geojson", mime: "application/geo+json", layerType: "GEOJSON", label: "GeoJSON" },
  kml: { extension: ".kml", mime: "application/vnd.google-earth.kml+xml", layerType: "KML", label: "KML" },
  kmz: { extension: ".kmz", mime: "application/vnd.google-earth.kmz", layerType: "KMZ", label: "KMZ" },
  shp: { extension: ".zip", mime: "application/zip", layerType: "SHP", label: "SHP(ZIP)" },
  csv: { extension: ".csv", mime: "text/csv", layerType: "CSV", label: "CSV" },
};

const ALL_FORMATS: readonly SupportedFormat[] = ["geojson", "kml", "kmz", "shp", "csv"];

interface FileUploaderDropContainerChangedDetail {
  addedFiles?: File[];
}

const ICON_CLOSE = unsafeSVG(iconNodeToString(CloseIcon));
const ICON_DOCUMENT_ADD = unsafeSVG(iconNodeToString(DocumentAddIcon));

/**
 * GeoJSON/KML/KMZ/SHP(ZIP)/CSV dosyalarını sürükle-bırak veya dosya seçici ile
 * haritaya katman olarak yükleten diyalog (`<tucbs-file-upload>`, `cds-file-uploader`
 * tabanlı).
 * @fires tucbs-file-upload-closed - Diyalog kapatıldığında (`open` false yapılır); `detail` yok.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya (ve `LayerManager`'a) otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-file-upload mapElementId="map" accepted-types="geojson,kml,shp"></tucbs-file-upload>
 * ```
 */
@customElement("tucbs-file-upload")
export class TucbsFileUpload extends LitElement {
  static override readonly styles = css`
    :host {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1100;
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      /* suppress Carbon's blue focus ring inside the drop container */
      --cds-focus: transparent;
    }

    :host([hidden]) {
      display: none;
    }

    .panel {
      background: #ffffff;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      width: max-content;
      max-width: 320px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
      cursor: move;
      user-select: none;
      touch-action: none;
    }

    .title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }

    .title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      line-height: 0;
      color: #0f62fe;
    }

    .title-icon svg {
      width: 1.25rem;
      height: 1.25rem;
      display: block;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      flex: none;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--cds-icon-secondary, #6f6f6f);
      cursor: pointer;
    }

    .close-btn:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
      color: var(--cds-icon-primary, #161616);
    }

    .body {
      padding: 1rem;
    }

    .upload-text {
      margin: 0;
      font-size: 0.75rem;
      color: var(--cds-text-secondary, #525252);
      text-align: center;
    }

    cds-inline-notification {
      margin-top: 0.75rem;
    }

    /* Dosya secilir secilmez diyalog (baslik/kapat/surukleme cercevesi)
       KAPATILIR (bkz _handleFileAdded); layerManager.add() cozulene kadar
       (buyuk dosyalarda -- 68-86MB'lik GeoJSON gibi -- hem veri parse hem
       de Cesium'un asenkron primitive kurulumu birkac saniye surebiliyor,
       bkz LayerManager.waitForRenderSettle() yorumu) YERINE bagimsiz/yalin
       bu kucuk gosterge kalir -- kullanicinin "hicbir sey olmuyor"
       sanmamasi icin, ama diyalogun tam cercevesi OLMADAN (bkz kullanici
       bildirimi: "tek basina gozuksun"). Ayni kapsayici, yukleme diyalog
       zaten KAPANDIKTAN SONRA basarisiz olursa (bkz render()) kisa omurlu
       bir hata gostergesi icin de kullanilir.
       */
    .standalone {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: #ffffff;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .standalone .upload-text {
      margin: 0;
      text-align: left;
    }

    .upload-spinner {
      width: 24px;
      height: 24px;
      flex: none;
      border: 2.5px solid var(--cds-border-subtle, #e0e0e0);
      border-top-color: var(--cds-interactive, #0f62fe);
      border-radius: 50%;
      animation: upload-spin 0.7s linear infinite;
    }

    @keyframes upload-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  /** Diyaloğun açık olup olmadığı (`open` attribute'una reflect edilir). */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Core JS API `LayerManager` referansı. */

  // tucbs-app: property binding ile gelir.
  // Senaryo 2: ready event sonrasi JS ile atanir.
  @property({ attribute: false }) layerManager: LayerManager | undefined;

  /** Opsiyonel: `tucbs-map` element'inin ID'si (2A: `ready` + property ile aynı işlemi yapar; W3C standardı değildir — kolaylık için). */
  @property() mapElementId = "";

  /** Virgülle ayrılmış dosya uzantıları (örn. `"geojson,kml"`). Boş ise desteklenen tüm formatlar (geojson, kml, kmz, shp ZIP paketi, csv) kabul edilir. */
  @property({ attribute: "accepted-types" }) acceptedTypes = "";

  /** Kabul edilen azami dosya boyutu (MB). */
  @property({ attribute: "max-file-size-mb", type: Number }) maxFileSizeMb = 50;

  /** Sürükle-bırak ile dosya yüklemenin etkin olup olmadığı. */
  @property({ attribute: "drag-drop", type: Boolean }) dragDrop = true;

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _error = "";
  // layerManager.add() cozulene kadar true -- bkz .upload-loading WHY yorumu.
  @state() private _uploading = false;

  private readonly _customCssState: CustomCssState = { sheet: null };

  private readonly _drag = new DraggablePanelController(this, {
    getPanel: () => this,
    ignoreSelector: ".close-btn",
  });

  // === Yasam Dongusu: LayerManager baglama (TucbsServiceUpload'daki ile
  // AYNI yontem -- ikisi de TucbsApp icinde bagsiz/binding'siz "marker tag"
  // olarak kullanilabiliyor (bkz TucbsApp.render() "Ciplak marker tag'ler"
  // yorumu); mapElementId hic verilmemesi bu durumda GECERLI bir kullanim,
  // uyarmak YANLIS ALARM olurdu -- eskiden burada console.warn vardi, ama
  // bu bilesen HER ZAMAN bagsiz-marker olarak da kullanildigi icin sessizce
  // cikilir (TucbsLayerList'ten farki bu -- o hicbir zaman bagsiz kullanilmiyor). ===
  /** `layerManager` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
  override firstUpdated(): void {
    if (this.layerManager || !this.mapElementId) return;

    const mapEl = document.getElementById(this.mapElementId) as
      | (HTMLElement & { layerManager?: LayerManager })
      | null;
    if (!mapEl) return;

    if (mapEl.layerManager) {
      this.layerManager = mapEl.layerManager;
    } else {
      mapEl.addEventListener(
        "ready",
        () => {
          if (mapEl.layerManager) this.layerManager = mapEl.layerManager;
        },
        { once: true },
      );
    }
  }

  /** Reactive property değişikliklerini işler: `customCss`'i uygular, `open` true yapıldığında sürüklemeden kalan konumu sıfırlar. */
  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-file-upload");
    }

    if (changedProperties.has("open") && this.open) {
      // always reopen centered — forget any position left over from dragging
      this.style.removeProperty("left");
      this.style.removeProperty("top");
      this.style.removeProperty("transform");
    }
  }

  /** Bileşen DOM'dan kaldırıldığında açık kalmış olabilecek toast'ı yok eder. */
  override disconnectedCallback(): void {
    destroyToast();
    super.disconnectedCallback();
  }

  private _close() {
    this.open = false;
    this._error = "";
    this.dispatchEvent(new CustomEvent("tucbs-file-upload-closed", { bubbles: true, composed: true }));
  }

  // acceptedTypes bos ise desteklenen tum formatlar; doluysa sadece belirtilenler.
  private _activeFormats(): SupportedFormat[] {
    const requested = this.acceptedTypes
      .split(",")
      .map((type) => type.trim().toLowerCase())
      .filter((type): type is SupportedFormat => (ALL_FORMATS as string[]).includes(type));

    return requested.length > 0 ? requested : [...ALL_FORMATS];
  }

  private _detectFormat(fileName: string): SupportedFormat | undefined {
    const lowerFileName = fileName.toLowerCase();
    return ALL_FORMATS.find((format) => lowerFileName.endsWith(FORMATS[format].extension));
  }

  //SHPJS kütüphanesi yoksa SHP dosyası ekleme sırasındaki hata mesajını vermek için async yapıldı.
  private async _handleFileAdded(files: File[]) {
    this._error = "";
    destroyToast();

    const file = files[0];
    if (!file) return;

    const activeFormats = this._activeFormats();
    const format = this._detectFormat(file.name);

    if (!format || !activeFormats.includes(format)) {
      const labels = activeFormats.map((f) => FORMATS[f].label).join(", ");
      this._error = `Sadece ${labels} dosyaları desteklenir.`;
      return;
    }

    const layerManager = this.layerManager;
    if (!layerManager) {
      this._error = "Harita hazır değil, katman eklenemedi.";
      return;
    }

    const { layerType, extension } = FORMATS[format];
    const title = file.name.replace(new RegExp(`\\${extension}$`, "i"), "");
    const id = `upload-${title}-${Date.now()}`;

    // "layer:crs-reprojected" -- yuklenen katmanin "crs" alani WGS84 disi bir
    // EPSG koduysa LayerManager veriyi otomatik cevirip DOGRU konumda
    // gosterir (bkz LayerManager/internal/geojsonCrs.ts), ama bu SESSIZ
    // donusum kullaniciya bildirilmezse "verim yanlis mi yuklendi" kaygisi
    // dogurur (bkz kullanici bildirimi). "layer:crs-unresolved" -- "crs" alani
    // VAR ama gecerli/cozulebilir bir EPSG koduna karsilik gelmiyorsa (orn.
    // "EPSG:Tanımsız" gibi bozuk bir isim) VE koordinatlar YINE DE gecerli bir
    // enlem/boylam araliginda kaliyorsa katman varsayilan/ham donusumle YINE
    // DE yuklenir (kullanici bildirimi: "crs alanı var ama epsg gerçek
    // değilse yine göster haritada"). Koordinatlar GECERSIZ bir aralikta ise
    // (crs hic olmasa da, crs cozulemese de) LayerManager artik yuklemeyi
    // BLOKLAR (throw) -- Cesium'un kure matematigi o degerleri anlamsiz/coken
    // bir goruntuye cevirdigi icin (bkz kullanici bildirimi: "bu ne saçma bir
    // görüntü"); bu durum ayri bir event DEGIL, asagidaki catch/_error
    // akisindan gecer. Ikisinde de id ile FILTRELIYORUZ ki ayni anda (ör.
    // TucbsServiceUpload'tan) baska bir katman eklenirse onun event'ini
    // yakalamayalim.
    const onCrsReprojected = (payload: { id: string; fromEpsg: string; toEpsg: string }) => {
      if (payload.id !== id) return;
      showToast("info", `${payload.fromEpsg} → ${payload.toEpsg} (WGS84) dönüştürüldü.`);
    };
    const onCrsUnresolved = (payload: { id: string; crsName: string }) => {
      if (payload.id !== id) return;
      showToast("warning", "Koordinat sistemi tanınamadı; WGS84 kabul edilerek yüklendi.");
    };
    layerManager.on("layer:crs-reprojected", onCrsReprojected);
    layerManager.on("layer:crs-unresolved", onCrsUnresolved);

    // Diyalog (baslik/kapat butonu/surukleme cerceve) burada KAPATILIR --
    // yukleme suren asenkron isle hicbir ilgisi yok, sadece bagimsiz/yalin
    // bir "Katman yukleniyor…" gostergesi kalir (bkz kullanici bildirimi:
    // "diyalogda cikmasina gerek yok, tek basina gozuksun"). _close()
    // kullanilir (dogrudan this.open=false DEGIL) ki "tucbs-file-upload-
    // closed" event'i ile TucbsLayerList'teki _uploadOpen state'i de
    // senkron kalsin -- aksi halde ebeveynin bir sonraki render'i bu
    // component'in "open" property binding'ini eski (acik) degere geri
    // dondurebilirdi.
    this._close();
    this._uploading = true;
    // Katman yuklenirken arka planda diger bilesenlerle etkilesim devam
    // ETMEMELI (bkz kullanici bildirimi) -- global overlay tum sayfayi kilitler.
    beginBusy("Katman yükleniyor…");
    // layerManager.add() buyuk GeoJSON/SHP dosyalarinda ilk await'ine kadar
    // AGIR, SENKRON parse/isleme yapar -- hemen ardindan cagrilirsa ana
    // thread'i bloke edip tarayiciya overlay'i BOYAMA firsati hic vermez
    // (kullanici bildirimi: "2-3 saniye sonra blur oluyor, hemen olmasi
    // lazim"). TucbsBusyOverlay'in kendi gecikmeli-gosterim suresinden
    // (SHOW_DELAY_MS=150ms) daha uzun bir bekleme ile once GORSEL OLARAK
    // boyanmasini garanti ediyoruz, agir isi ancak ondan sonra baslatiyoruz.
    // TimerBag BILEREK kullanilmaz: bilesen bu 200ms icinde DOM'dan kalkarsa
    // TimerBag zamanlayiciyi iptal eder, Promise hic cozulmez, asagidaki
    // finally'deki endBusy() hic calismaz ve yukaridaki beginBusy() yuzunden
    // sayfa mesgul gostergesinde TAKILI kalirdi. Bu bekleme her durumda bitmeli.
    // eslint-disable-next-line no-restricted-syntax -- Promise her durumda cozulmeli; iptal edilirse beginBusy acik kalir (bkz ustteki yorum).
    await new Promise((resolve) => setTimeout(resolve, 200));
    try {
      await layerManager.add(layerType, {
        id,
        title,
        data: file,
        layerType,
        clampToGround: true,
      });
    } catch (err) {
      // Konsolda da gorunmesi istendigi icin bilerek yutmuyoruz. Diyalog
      // zaten kapali oldugundan (bkz yukarisi) hata da CRS bilgilendirmeleriyle
      // AYNI (document.body-portali, kendiliginden kapanan) toast ile
      // gosterilir -- bkz kullanici bildirimi: "bu mesajı da üst ortadan
      // gelen ve kaybolan şekilde yapalım. Daha önce yapmıştık benzerini."
      if (err instanceof TucbsError) {
        console.error(`[tucbs-file-upload] ${err.code} (${err.number}): ${err.message}`);
      } else {
        console.error(err);
      }
      showToast("error", err instanceof Error ? err.message : String(err));
    } finally {
      layerManager.off("layer:crs-reprojected", onCrsReprojected);
      layerManager.off("layer:crs-unresolved", onCrsUnresolved);
      this._uploading = false;
      endBusy();
    }
  }

  /** Bileşenin şablonunu render eder (yükleme sürerken bağımsız gösterge, `open` false ise boş şablon). */
  override render() {
    // Diyalog dosya secilir secilmez KAPATILIR (bkz _handleFileAdded) --
    // yukleme suren bu bagimsiz/yalin gosterge, diyalog KAPALIYKEN de
    // gorunur kalir.
    if (this._uploading) {
      return html`
        <div class="standalone">
          <span class="upload-spinner"></span>
          <p class="upload-text">Katman yükleniyor…</p>
        </div>
      `;
    }

    if (!this.open) {
      // Diyalog zaten KAPANDIKTAN SONRA (yukleme sirasinda) olusan bir hata,
      // CRS bilgilendirmeleriyle AYNI document.body-portali toast ile
      // gosterilir (bkz yukaridaki catch bloğu) -- bu bilesenin kendi
      // render'inde ARTIK hicbir sey gostermez.
      return html``;
    }

    const activeFormats = this._activeFormats();
    const accept = activeFormats
      .map((f) => {
        const { extension, mime } = FORMATS[f];
        return mime ? `${extension},${mime}` : extension;
      })
      .join(",");
    const labels = activeFormats.map((f) => FORMATS[f].label).join(", ");

    return html`
      <div class="panel">
        <div class="header" @pointerdown=${(event: PointerEvent) => this._drag.start(event)}>
          <span class="title"><span class="title-icon">${ICON_DOCUMENT_ADD}</span>Veri Dosyası Ekle</span>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this._close()}>
            ${ICON_CLOSE}
          </button>
        </div>

        <div class="body">
          <cds-file-uploader-drop-container
            accept=${accept}
            @cds-file-uploader-drop-container-changed=${(
              event: CustomEvent<FileUploaderDropContainerChangedDetail>,
            ) => this._handleFileAdded(event.detail?.addedFiles ?? [])}
          >
            <p class="upload-text">${labels} dosyasını buraya sürükleyin ya da seçmek için tıklayın</p>
          </cds-file-uploader-drop-container>
          ${this._error
            ? html`
                <cds-inline-notification
                  kind="error"
                  title="Katman eklenemedi"
                  subtitle=${this._error}
                  @cds-notification-closed=${() => {
                    this._error = "";
                  }}
                ></cds-inline-notification>
              `
            : ""}
        </div>
      </div>
    `;
  }
}
