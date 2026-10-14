import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  Map as TucbsMapCore,
  entityToGeoJSON,
  featureLabel,
  TucbsError,
  type EntityInteractionDetail,
} from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { showToast } from "../shared/ui/toast.js";
import { analysisHelpStyles, COGRAFI_HELP, renderAnalysisHelp } from "./analysisHelp.js";

type RunStatus = "idle" | "loading" | "error" | "success";

/** Minimal GeoJSON Feature — geojson paket tipine bağımlılık yok */
type SelectedFeature = {
  type: "Feature";
  id?: string | number | undefined;
  properties: Record<string, unknown>;
  geometry: object;
};
type MapHost = HTMLElement & {
  map?: TucbsMapCore | null;
  addEventListener: HTMLElement["addEventListener"];
  removeEventListener: HTMLElement["removeEventListener"];
};

/**
 * Tampon form UI — tucbs-harita-analiz BufferPanel.tsx kalıbı.
 * Panel içinde açılır; HTTP yalnızca @tucbs/core Map.runBuffer üzerinden.
 *
 * @fires tucbs-buffer-run - Tampon analizi çalıştırıldığında (doğrulamalar geçip Map.runBuffer çağrılmadan hemen önce) tetiklenir; `detail` içinde `mapElementId`, `distanceM` ve `selectedLabel` bulunur.
 */
@customElement("tucbs-buffer-tool")
export class TucbsBufferTool extends LitElement {
  static override readonly styles = [css`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      color: #111827;
    }

    .panel {
      padding: 0;
    }

    .title {
      margin: 0 0 6px;
      font-size: 16px;
      font-weight: 600;
    }

    .info {
      margin: 0 0 12px;
      padding: 8px 10px;
      font-size: 12.5px;
      line-height: 1.4;
      color: #374151;
      background: #f3f4f6;
      border-radius: 8px;
    }

    .row-between {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    label.lbl {
      display: block;
      font-weight: 600;
      font-size: 12.5px;
      margin-bottom: 4px;
    }

    .input-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    input[type="text"],
    input[type="number"] {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 34px 10px 10px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #f9fafb;
      font-size: 13px;
      outline: none;
      color: inherit;
    }

    input[type="number"] {
      padding-right: 10px;
    }

    .distance-row {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .distance-row input {
      margin-bottom: 0;
    }

    .unit {
      margin-left: 8px;
      font-size: 13px;
      color: #374151;
    }

    .refresh {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      color: #9ca3af;
      line-height: 1;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 4px;
    }

    button.run {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
    }

    button.run:disabled {
      background: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }

    .status {
      margin: 8px 0 0;
      font-size: 12.5px;
    }

    .status.error {
      color: #da1e28;
    }

    .status.success {
      color: #198038;
    }

    .status.loading {
      color: #525252;
    }
  `, analysisHelpStyles];

  /** Analiz için kullanılacak harita elemanının DOM id'si — `map` verilmediğinde bununla çözümlenir. */
  @property() mapElementId = "";

  /** Core JS API `Map` referansı — doğrudan atanırsa `mapElementId` yerine bu kullanılır. */
  @property({ attribute: false }) map: TucbsMapCore | null = null;

  /** Haritada seçilen özelliğin etiketi (salt-okunur giriş alanında gösterilir). */
  @property() selectedLabel = "";

  /** Tampon mesafesi (metre). */
  @property({ type: Number }) distanceM: number | null = null;

  /** Shadow DOM'a uygulanacak özel CSS metni (`custom-css` attribute). */
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _distanceStr = "";
  @state() private _status: RunStatus = "idle";
  @state() private _message = "";
  @state() private _helpOpen = false;

  private _selectedFeature: SelectedFeature | null = null;
  private _map: TucbsMapCore | null = null;
  private _mapHost: MapHost | null = null;
  private readonly _customCssState: CustomCssState = { sheet: null };

  private readonly _onEntityClick = (detail: EntityInteractionDetail): void => {
    const feature = entityToGeoJSON(detail.entity);
    if (!feature) {
      this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
      return;
    }
    this._selectedFeature = {
      type: "Feature",
      id: feature.id,
      properties: (feature.properties ?? {}) as Record<string, unknown>,
      geometry: feature.geometry as object,
    };
    this.selectedLabel = featureLabel(feature);
    this._status = "idle";
    this._message = "";
    this._syncHighlight();
  };

  private readonly _onMapReady = (): void => {
    this._bindMap();
  };

  /** Lit yaşam döngüsü — bileşen DOM'a bağlandığında başlangıç mesafe metnini ayarlar ve haritaya bağlanmayı dener. */
  override connectedCallback(): void {
    super.connectedCallback();
    if (this.distanceM != null && this.distanceM > 0) {
      this._distanceStr = String(this.distanceM);
    }
    this._bindMap();
  }

  /** Lit yaşam döngüsü — bileşen DOM'dan kaldırılırken harita bağlantısını (interaction/event) çözer. */
  override disconnectedCallback(): void {
    this._unbindMap();
    super.disconnectedCallback();
  }

  /**
   * Lit yaşam döngüsü — `customCss`, `distanceM`, `mapElementId`/`map` değişikliklerinde ilgili yan etkileri uygular.
   *
   * @param changed Değişen property adları ve önceki değerleri.
   */
  override updated(changed: Map<string, unknown>): void {
    if (changed.has("customCss")) {
      applyCustomCss(
        this.shadowRoot,
        this.customCss,
        this._customCssState,
        "tucbs-buffer-tool",
      );
    }
    if (changed.has("distanceM") && this.distanceM != null) {
      this._distanceStr = String(this.distanceM);
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._unbindMap();
      this._bindMap();
    }
  }

  private _resolveMap(): TucbsMapCore | null {
    if (this.map) return this.map;
    return this._resolveMapHost()?.map ?? null;
  }

  private _resolveMapHost(): MapHost | null {
    if (!this.mapElementId) return null;
    return document.getElementById(this.mapElementId) as MapHost | null;
  }

  private _bindMap(): void {
    if (this.map) {
      this._attachInteraction(this.map);
      return;
    }

    const host = this._resolveMapHost();
    if (!host) return;
    this._mapHost = host;

    if (host.map) {
      this._attachInteraction(host.map);
      return;
    }

    host.addEventListener("ready", this._onMapReady, { once: true });
  }

  private _attachInteraction(map: TucbsMapCore): void {
    if (this._map === map) return;
    if (this._map) {
      this._map.interactionManager.off("entity:click", this._onEntityClick);
      this._map.interactionManager.resumeIdentify();
    }
    this._map = map;
    map.interactionManager.on("entity:click", this._onEntityClick);
    // Bu arac ta AYNI "entity:click"i secim icin kullandigindan (bkz
    // _onEntityClick), TucbsIdentifyPanel'in oznitelik tablosu/koordinat
    // karti araciyla AYNI tiklamaya tepki verip araya girmesin diye
    // (bkz kullanici geri bildirimi) -- InteractionManager'in kendi
    // event yayinini DURDURMAZ, sadece identify'e "araya girme" sinyali verir.
    map.interactionManager.suspendIdentify();
  }

  private _unbindMap(): void {
    if (this._map) {
      this._map.interactionManager.off("entity:click", this._onEntityClick);
      this._map.clearSelectionHighlight();
      this._map.interactionManager.resumeIdentify();
      this._map = null;
    }
    if (this._mapHost) {
      this._mapHost.removeEventListener("ready", this._onMapReady);
      this._mapHost = null;
    }
  }

  private _onDistanceInput(e: Event): void {
    const raw = (e.target as HTMLInputElement).value;
    this._distanceStr = raw;
    const n = Number(raw);
    this.distanceM = Number.isFinite(n) ? n : null;
  }

  private _onReselect(): void {
    this.selectedLabel = "";
    this._selectedFeature = null;
    this._note("info", "Haritada bir noktaya / çizgiye / alana tıklayın.");
    this._syncHighlight();
  }

  /** Sonuçtan sonra seçim ve mesafe ilk haline döner; kırmızı vurgu kalkar. */
  private _clearForm(): void {
    this._selectedFeature = null;
    this.selectedLabel = "";
    this._distanceStr = "";
    this.distanceM = null;
    this._syncHighlight();
  }

  private _syncHighlight(): void {
    this._map?.showSelectionHighlight(this._selectedFeature ? [this._selectedFeature] : []);
  }

  private _onSelectionClick(): void {
    if (this._selectedFeature) {
      this._note("info", `Seçili: ${this.selectedLabel}`);
    } else {
      this._note("info", "Haritada bir noktaya, çizgiye veya alana tıklayın.");
    }
  }

  private async _onRun(): Promise<void> {
    if (this._status === "loading") return;

    const dist = Number(this._distanceStr);
    if (!this._selectedFeature) {
      this._note("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    if (!this._distanceStr || Number.isNaN(dist) || dist <= 0) {
      this._note("error", "Geçerli bir mesafe (metre) girin.");
      return;
    }

    if (!this._map) {
      this._bindMap();
    }
    const map = this._resolveMap();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._map = map;

    this.distanceM = dist;
    this._status = "loading";
    this._message = "İşleniyor…";

    this.dispatchEvent(
      new CustomEvent("tucbs-buffer-run", {
        detail: {
          mapElementId: this.mapElementId,
          distanceM: dist,
          selectedLabel: this.selectedLabel,
        },
        bubbles: true,
        composed: true,
      }),
    );

    try {
      const title = `Tampon sonucu (${dist}m)`;

      await map.runBuffer(
        {
          geojson: this._selectedFeature,
          distanceM: dist,
        },
        { title },
      );

      this._clearForm();
      this._status = "idle";
      this._message = "";
      showToast("success", "Tampon katmanı eklendi.");
      // Basarili sonuc identify'i GERI ACMAZ -- arac DOM'da bagli/secili
      // kaldigi surece (kullanici panel "← Analiz"/X ile kapatmadan) identify
      // suspend kalmaya devam eder. Once basari aninda resumeIdentify()
      // cagriliyordu ama kullanici HEMEN ardindan baska bir feature'a tiklayip
      // ayni aractan yeni bir analiz baslatabiliyordu -- o tiklama identify'i
      // de tetikleyip cakismayi GERI getiriyordu (bkz kullanici geri
      // bildirimi: "farkli feature secip analize devam edebiliyor, cakisma
      // oluyor yine"). Identify sadece aractan GERCEKTEN cikildiginda
      // (_unbindMap -> resumeIdentify) geri gelir.
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-buffer-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Tampon üretimi başarısız.");
    }
  }

  /** Sonuç, hata ve seçim uyarısını formun altında bırakmadan toast olarak gösterir. */
  private _note(kind: "info" | "error" | "success", message: string): void {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }

  /** Tampon formunu (seçim, mesafe, çalıştır butonu) render eder. */
  override render() {
    const busy = this._status === "loading";
    const canRun = Boolean(this._selectedFeature && this._distanceStr) && !busy;

    return html`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Tampon</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => { this._helpOpen = true; }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Tampon", COGRAFI_HELP.tampon, () => { this._helpOpen = false; })}

        <div class="row-between">
          <label class="lbl">Etrafında tampon oluştur...</label>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritada nesne seçin"
            .value=${this.selectedLabel ? `= ${this.selectedLabel}` : ""}
            @click=${this._onSelectionClick}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${this._onReselect}
          >
            ⟳
          </button>
        </div>

        <label class="lbl">Mesafe</label>
        <div class="distance-row">
          <input
            type="number"
            min="0"
            step="any"
            placeholder="Mesafe girin"
            .value=${this._distanceStr}
            ?disabled=${busy}
            @input=${this._onDistanceInput}
          />
          <span class="unit">m</span>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._onRun}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>

        ${this._message
          ? html`<p class="status ${this._status}">${this._message}</p>`
          : null}
      </div>
    `;
  }
}
