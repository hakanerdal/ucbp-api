import { LitElement, html, type PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "@carbon/web-components/es/components/checkbox/index.js";
import "@carbon/web-components/es/components/dropdown/index.js";
import "@carbon/web-components/es/components/text-input/index.js";
import "../map/TucbsMapPreview.js";
import { LayerOperationError, TucbsError } from "@tucbs/core";
import { wcsRectangleFor } from "@tucbs/core";
import type { LayerManager, WMSLayerOptions, WCSLayerOptions, DiscoveredItem } from "@tucbs/core";
import type { PreviewLayerSpec, TucbsMapPreview } from "../map/TucbsMapPreview.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { VirtualScrollbar } from "../shared/ui/VirtualScrollbar.js";
import { TimerBag } from "../shared/util/TimerBag.js";
import { serviceUploadStyles } from "./serviceUploadStyles.js";
import { ServiceDiscoveryController, baseServiceUrl } from "./ServiceDiscoveryController.js";
import { showToast } from "../shared/ui/toast.js";
import { beginBusy, endBusy } from "../shared/util/busy.js";
import type { TucbsMapElement } from "../shared/util/bindTucbsMap.js";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { DraggablePanelController } from "../shared/ui/DraggablePanelController.js";

import {
  Close16 as CloseIcon,
  Download16 as DownloadIcon,
  Renew16 as RenewIcon,
  View16 as ViewIcon,
  ViewOff16 as ViewOffIcon,
  CloudDownload16 as CloudDownloadIcon,
} from "@carbon/icons";

interface ServiceTypeOption {
  value: string;
  label: string;
}

// Siralama onemli: dropdown'da bu sirayla listelenir.
const SERVICE_TYPES: readonly ServiceTypeOption[] = [
  { value: "WMS", label: "Web Harita Servisi (WMS)" },
  { value: "WMTS", label: "Web Harita Karo Servisi (WMTS)" },
  { value: "WFS", label: "Web Özellik Servisi (WFS)" },
  { value: "WCS", label: "Web Kapsama Servisi (WCS)" },
];

function servicePlaceholder(serviceType: string): string {
  const path = serviceType.toLowerCase();
  return `Ör: https://.../${path}`;
}

// buildCapabilitiesUrl/DiscoveredItem/GeographicBoundingBox artik
// @tucbs/core (ogc/capabilities.ts) uzerinden geliyor -- bkz
// project_ucbp_api_ogc_capabilities_uygulama_plani Faz 3 (saf tasima).

// fetchCapabilitiesDocument/elementsByLocalName/childByLocalName/
// parseWms*/parseWmts*/parseWfs*/parseWcs*/parseWcsCoverageEnvelope/
// fetchWcsCoverageExtents/wcsRectangleFor/parseCapabilities/detectServiceType
// artik @tucbs/core (ogc/capabilities.ts) uzerinden geliyor -- bkz
// project_ucbp_api_ogc_capabilities_uygulama_plani Faz 3 (saf tasima).

const ICON_CLOSE = unsafeSVG(iconNodeToString(CloseIcon));
const ICON_DOWNLOAD = unsafeSVG(iconNodeToString(DownloadIcon));
const ICON_RENEW = unsafeSVG(iconNodeToString(RenewIcon));
const ICON_VIEW = unsafeSVG(iconNodeToString(ViewIcon));
const ICON_VIEW_OFF = unsafeSVG(iconNodeToString(ViewOffIcon));
const ICON_CLOUD_DOWNLOAD = unsafeSVG(iconNodeToString(CloudDownloadIcon));

/**
 * Bir OGC servis URL'inden (WMS/WMTS/WFS/WCS) GetCapabilities ile katman keşfeden,
 * seçilen katmanları önizleyip haritaya ekleyen diyalog (`<tucbs-service-upload>`).
 * @fires tucbs-service-upload-closed - Diyalog kapatıldığında (`open` false yapılır); `detail` yok.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya (ve `LayerManager`'a) otomatik bağlanır (Senaryo 2).
 * Alternatif olarak, `TucbsLayerList`'in katman "..." menüsüyle AYNI şekilde,
 * `mapElementId` VERİLMEDEN çıplak bir marker (`<tucbs-service-upload>`) olarak
 * da eklenebilir — bu durumda `TucbsLayerList` kendi `layerManager`/`apiKey`'ini
 * portal ile bu marker'a aktarır (bkz `TucbsLayerList._syncServiceUploadPortal`).
 *
 * @example
 * ```html
 * <tucbs-service-upload mapElementId="map"></tucbs-service-upload>
 * ```
 */
@customElement("tucbs-service-upload")
export class TucbsServiceUpload extends LitElement {
  static override readonly styles = serviceUploadStyles;

  /** Diyaloğun açık olup olmadığı (`open` attribute'una reflect edilir). */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Core JS API `LayerManager` referansı. */

  // tucbs-app: property binding ile gelir.
  // Senaryo 2: ready event sonrasi JS ile atanir.
  @property({ attribute: false }) layerManager: LayerManager | undefined;

  /** Opsiyonel: `tucbs-map` element'inin ID'si (2A: `ready` + property ile aynı işlemi yapar; W3C standardı değildir — kolaylık için). */
  @property() mapElementId = "";

  // `#apiKey` GERCEK ES private field'inda tutulur, get/set cifti TucbsMap.ts
  // ile AYNI "write-only" deseni uygular -- disaridan okuma maskelenir.
  // Deger MANUEL verilmez -- host TucbsMap'in `_grantApiKeyTo()` ile PUSH
  // ettigi deger buraya yazilir (bkz asagidaki firstUpdated()). Kesif adimi
  // (ServiceDiscoveryController.discover) BU degeri KULLANMAZ -- sadece embedded onizlemeye
  // (_ensurePreviewEl/_updatePreview) aktarilir.
  #apiKey = "";
  /** Harita apiKey'i — yalnızca yazılabilir; `get` güvenlik nedeniyle her zaman maskelenmiş döner (bkz yukarıdaki `#apiKey` WHY notu). */
  @property({ attribute: "api-key" })
  set apiKey(value: string) {
    const old = this.#apiKey;
    this.#apiKey = value ?? "";
    this.requestUpdate("apiKey", old);
  }
  get apiKey(): string {
    return this.#apiKey ? "••••••" : "";
  }

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  private readonly _customCssState: CustomCssState = { sheet: null };

  @state() private _serviceType: string = "WMS";
  @state() private _serviceUrl = "";

  @state() private _discovering = false;
  // Kesif akisi ve nesil kontrolu (gercek hatalar plani H2.2): bkz
  // ServiceDiscoveryController.ts (Faz 3.3). Sonuclar asagidaki durum
  // alanlarina DiscoverySink uzerinden yazilir.
  private readonly _discovery = new ServiceDiscoveryController(this, {
    layerManager: () => this.layerManager,
    resetDiscovery: () => this._resetDiscovery(),
    setDiscovering: (discovering) => {
      this._discovering = discovering;
    },
    setError: (message) => {
      this._discoveryError = message;
    },
    setItems: (items) => {
      this._discoveredItems = items;
    },
    setTiffFormat: (format) => {
      this._discoveredTiffFormat = format;
    },
  });
  @state() private _discoveryError = "";
  @state() private _discoveredItems: DiscoveredItem[] = [];
  // Sunucunun GeoTIFF-uyumlu formatini (varsa, ServiceDiscoveryController'da tespit
  // edilir) saklar -- _addOneLayer bunu layerManager.add()'e gecirir ki
  // eklenen katman GeoTIFF export edilebilsin (bkz
  // LayerManager.isGeoTiffExportAvailable). Servis genelinde (katman bazli
  // degil) gecerli bir bilgi oldugundan DiscoveredItem yerine burada,
  // digerleriyle AYNI yasam donguisunde (_resetDiscovery) tutulur.
  //
  // NOT: kesif sirasinda basarili olan VERSION (SERVICE_VERSIONS'taki
  // adaylardan hangisi) BILEREK katmanin gercek add()'ine GECIRILMIYOR --
  // GetCapabilities'in bir surumde basarili olmasi, o surumun GetMap/
  // GetCoverage icin de guvenilir oldugu anlamina gelmez. Ornek: WCS 2.1.0
  // service.geo.llv.li'de capabilities'i basariyla doner ama GetCoverage'in
  // SCALESIZE parametresi SADECE 2.0.1'de calisiyor, 2.1.0'da 400 hatasi
  // veriyor -- discovered version'i addWCS()'e gecirmek (onceki bir
  // denemede yapilmisti) bu sunucuda "1/1 katman eklenemedi" regresyonuna
  // yol acti. addWMS/addWCS'in KENDI (uzun suredir kanitlanmis) sabit
  // varsayilanlari (1.3.0 / 2.0.1) bilerek KORUNUYOR. GeoTIFF export de
  // (bkz LayerManager.buildWmsGeoTiffExportUrl/buildWcsGeoTiffExportUrl)
  // ayni sebeple discovered version'a guvenmiyor.
  @state() private _discoveredTiffFormat: string | undefined;
  @state() private _selectedIdentifiers: string[] = [];
  @state() private _addError = "";
  @state() private _previewIdentifier: string | undefined;
  // _previewSpec KASITLI OLARAK @state DEGIL: TucbsMapPreview.layerOptions
  // referans esitligiyle degisim algilar (bkz. TucbsMapPreview.updated()).
  // Bir getter her render'da YENI bir {layerType, options} objesi uretseydi,
  // bu satirla ilgisiz her state degisikligi (orn. baska bir satirin
  // checkbox'ini isaretlemek) onizleme katmanini gereksiz yere kaldirip
  // yeniden ekleyip kameray tekrar zoom'lardi. Bunun yerine sadece
  // _togglePreview icinde HESAPLANIP saklanir, boylece ayni secim boyunca
  // referans sabit kalir.
  private _previewSpec: PreviewLayerSpec | undefined;
  // Aynı anda sadece 1 katman önizlenebilir — bir katmanın önizleme
  // butonuna basmak öncekini otomatik kapatır (bkz. _togglePreview).

  private readonly _drag = new DraggablePanelController(this, {
    getPanel: () => this,
    ignoreSelector: ".close-btn, .reset-btn",
    onMove: () => this._syncPreviewPosition(),
  });

  // Onizleme her zaman diyalogun TAM USTUNE, ayni genislikte, yatay
  // (landscape) bir serit olarak yerlesir (bkz. _syncPreviewPosition).
  // Genislik panelin o anki genisligiyle (tek/iki sutunlu) birebir
  // esitlenir; yukseklik ise bu sabit degerle kontrol edilir.
  private static readonly PREVIEW_HEIGHT_PX = 300;

  // <tucbs-map-preview>, bu bilesenin Shadow DOM agacinin DISINA, dogrudan
  // document.body'ye eklenen bagimsiz bir "portal" element'i olarak yonetilir.
  // SEBEP: Shadow DOM icine yerlestirilseydi (once denendi), Cesium'un
  // document <head>'e enjekte edilen global widgets.css'i shadow sinirini
  // GECEMEDIGI icin mini haritanin canvas'i 0x0 kalip hicbir sey gostermiyordu
  // (bkz. TucbsMap.ts / TucbsMapPreview.ts'teki ayni neden — onlar da bu
  // yuzden Light DOM kullanir). document.body'ye dogrudan eklemek, MapPreviewTest
  // ornegindeki calisan kullanimla ayni (kesintisiz Light DOM -> document
  // zinciri) kosulu saglar; pozisyonu ise bu bilesenin (dialog'un) o anki
  // ekran konumuna gore elle senkronize edilir (bkz. _syncPreviewPosition).
  private _previewEl: TucbsMapPreview | undefined;

  @query(".discovered-list") private _discoveredListEl?: HTMLDivElement;
  @query(".scroll-thumb") private _scrollThumbEl?: HTMLDivElement;
  // Native scrollbar tamamen gizli (bkz. .discovered-list CSS'i); gorunen
  // gostergeyi VirtualScrollbar ile (bkz shared/ui/VirtualScrollbar.ts --
  // TucbsStyleEditor ile PAYLASILAN tek uygulama) kendimiz ciziyoruz.
  private readonly _listScroll = new VirtualScrollbar(
    this,
    () => this._discoveredListEl,
    () => this._scrollThumbEl,
  );
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  /** Bileşen DOM'a bağlandığında pencere `resize` dinleyicisini kurar (önizleme konumu/scroll-thumb senkronu için). */
  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("resize", this._onWindowResize);
  }

  /** Bileşen DOM'dan kaldırıldığında `resize` dinleyicisini ve gömülü önizleme elementini kaldırır. */
  override disconnectedCallback(): void {
    window.removeEventListener("resize", this._onWindowResize);
    // Suren kesif ServiceDiscoveryController.hostDisconnected'da (super
    // cagrisi icinde) gecersiz kilinir.
    this._previewEl?.remove();
    this._previewEl = undefined;
    super.disconnectedCallback();
  }

  private readonly _onWindowResize = (): void => {
    this._syncPreviewPosition();
    this._listScroll.sync();
  };

  private _ensurePreviewEl(): TucbsMapPreview {
    if (!this._previewEl) {
      const el = document.createElement("tucbs-map-preview") as TucbsMapPreview;
      el.setAttribute("basemap", "hgm-temel");
      el.apiKey = this.#apiKey;
      // Servis keşfinden önizlenen bir katmanın kullanıcıya Türkiye'nin
      // ortasında değil, kendi gerçek konumunda gösterilmesi için (bkz
      // kullanıcı bildirimi) -- TucbsMapPreview'ın varsayılanı (kamerayı
      // hep DEFAULT_INITIAL_EXTENT'e sabitlemek) burada BİLİNÇLİ OLARAK
      // geçersiz kılınır.
      el.zoomToLayer = true;
      el.style.position = "fixed";
      el.style.zIndex = "1100";
      el.style.display = "none";
      document.body.appendChild(el);
      this._previewEl = el;
    }
    return this._previewEl;
  }

  // Dialog'un o anki ekran konumuna (surukleniyor olsa bile) TAM USTUNE,
  // sol kenari dialog'un sol kenariyla hizali ve genisligi dialog ile
  // BIREBIR ESIT olacak sekilde yerlesir (yatay/landscape serit, sabit
  // yukseklik: PREVIEW_HEIGHT_PX). getBoundingClientRect() zaten
  // viewport-relative koordinat dondurdugu icin position:fixed bir
  // "kardes" element'i konumlandirmak icin dogrudan kullanilabilir.
  // width/height burada `.style` degil dogrudan REACTIVE PROPERTY olarak
  // atanir (`el.width`/`el.height`) — TucbsMapPreview.render() bunlari
  // `.preview-box`'in inline style'ina kendi template'i icinde
  // islediginden, host'un kendi `.style`'ini degistirmek onlari etkilemez.
  private _syncPreviewPosition(): void {
    if (!this._previewEl) return;
    const rect = this.getBoundingClientRect();
    this._previewEl.style.left = `${rect.left}px`;
    this._previewEl.style.top = `${rect.top - TucbsServiceUpload.PREVIEW_HEIGHT_PX}px`;
    this._previewEl.width = `${rect.width}px`;
    this._previewEl.height = `${TucbsServiceUpload.PREVIEW_HEIGHT_PX}px`;
  }

  // Katmanlar listesi gorunur oldugu surece (dialog acik + en az 1 sonuc
  // bulundu) preview gorunur kalir; layerOptions her cagrida guncellenir
  // (secili katman degisince veya secim kalkinca undefined olarak).
  private _updatePreview(): void {
    const shouldShow = this.open && this._discoveredItems.length > 0;
    if (!shouldShow) {
      if (this._previewEl) this._previewEl.style.display = "none";
      return;
    }
    const el = this._ensurePreviewEl();
    el.style.display = "inline-block";
    // _ensurePreviewEl() apiKey'i SADECE ilk olusturma aninda atar (guard
    // yuzunden); push (_grantApiKeyTo) onizleme zaten olusturulduktan SONRA
    // tamamlanmis olabilecegi kenar durumu icin burada da tekrar senkronlanir.
    el.apiKey = this.#apiKey;
    el.layerOptions = this._previewSpec;
    this._syncPreviewPosition();
    // Katmanlar listesi ILK kez eklendiginde, icindeki <cds-checkbox> gibi
    // custom element'ler kendi ilk render'larini bu senkron an icinde degil,
    // bir sonraki frame'de tamamlayabiliyor — bu yuzden .panel o anda
    // OLMASI GEREKENDEN KISA olculup preview'in ustten/alttan tasmasina yol
    // aciyordu (surukleyince duzeliyordu, cunku o zamana kadar hepsi
    // render olmus oluyordu). Bir frame sonra tekrar olcup duzeltiyoruz.
    // Kare _timers (TimerBag) ile planlanir: bilesen DOM'dan kalkinca iptal
    // edilir. ESKIDEN ciplak requestAnimationFrame'di ve bilesen kalksa bile
    // kopmus DOM uzerinde olcum yapiyordu.
    this._timers.requestAnimationFrame(() => this._syncPreviewPosition());
  }

  // === Yasam Dongusu: LayerManager baglama (TucbsFileUpload'daki ile ayni yontem) ===
  /** `layerManager` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
  override firstUpdated(): void {
    if (this.layerManager || !this.mapElementId) return;

    const mapEl = document.getElementById(this.mapElementId) as
      | TucbsMapElement
      | null;
    if (!mapEl) return;

    if (mapEl.layerManager) {
      this.layerManager = mapEl.layerManager;
      mapEl._grantApiKeyTo?.(this);
    } else {
      mapEl.addEventListener(
        "ready",
        () => {
          if (mapEl.layerManager) this.layerManager = mapEl.layerManager;
          mapEl._grantApiKeyTo?.(this);
        },
        { once: true },
      );
    }
  }

  /** Reactive property değişikliklerini işler, önizlemeyi ve liste scroll-thumb'unu günceller. */
  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-service-upload");
    }

    if (changedProperties.has("open") && this.open) {
      // always reopen centered — forget any position left over from dragging
      this.style.removeProperty("left");
      this.style.removeProperty("top");
      this.style.removeProperty("transform");
    }
    // :host([data-preview-open]) CSS kuralini tetikler (bkz. yukarisi) —
    // onizleme+panel BUTUNUNU merkezlemek icin panelin dikey merkezini
    // kaydirir. Suruklenirken (bkz. DraggablePanelController) zaten inline top/left
    // devrede oldugundan bu attribute'un etkisi olmaz, sorun degil.
    this.toggleAttribute(
      "data-preview-open",
      this._discoveredItems.length > 0,
    );
    this._updatePreview();
    // Katman sayisi degistiginde (veya panel ilk kez acildiginda)
    // discovered-list'in scrollHeight'i degisir; her render sonrasi
    // yeniden olcmek ucuz oldugu icin kosulsuz cagirmak en basiti. Bir
    // frame gecikme, _updatePreview'daki ayni sebeple (bkz. yukarisi):
    // cds-checkbox gibi cocuk custom element'ler ilk render'ini henuz
    // tamamlamamis olabilir.
    // Kare _timers (TimerBag) ile planlanir: bilesen DOM'dan kalkinca iptal
    // edilir. ESKIDEN ciplak requestAnimationFrame'di ve bilesen kalksa bile
    // kopmus DOM uzerinde olcum yapiyordu.
    this._timers.requestAnimationFrame(() => this._listScroll.sync());
  }

  private _close() {
    this.open = false;
    // Diyalog TEKRAR acildiginda (bkz updated()'in "open" degisince kosulsuz
    // cagirdigi _updatePreview()) ayni katman icin onizlemenin OTOMATIK
    // olarak yeniden tetiklenmemesi icin burada temizlenir (bkz kullanici
    // bildirimi: "tekrar actigimda ayni katmana onizleme yapmaya calisiyor").
    // _discoveredItems/_selectedIdentifiers KASITLI OLARAK KORUNUR --
    // kullanici tekrar acinca sunucuyu yeniden sorgulamak zorunda kalmasin,
    // sadece "su an aktif onizlenen katman" durumu sifirlanir.
    this._previewIdentifier = undefined;
    this._previewSpec = undefined;
    this.dispatchEvent(
      new CustomEvent("tucbs-service-upload-closed", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  // Servis turu veya adresi degistiginde, onceki aramaya ait sonuclar artik
  // gecersiz oldugu icin temizlenir.
  private _resetDiscovery() {
    // Suren bir kesif varsa sonucu artik bu forma ait degil (bkz ServiceDiscoveryController).
    this._discovery.invalidate();
    this._discoveryError = "";
    this._discoveredItems = [];
    this._discoveredTiffFormat = undefined;
    this._selectedIdentifiers = [];
    this._addError = "";
    this._previewIdentifier = undefined;
    this._previewSpec = undefined;
  }

  private _toggleSelected(identifier: string, checked: boolean) {
    this._selectedIdentifiers = checked
      ? [...this._selectedIdentifiers, identifier]
      : this._selectedIdentifiers.filter(
          (candidate) => candidate !== identifier,
        );
    this._addError = "";
  }

  // Onizleme paneli her zaman TEK bir katman gosterir: yeni bir satirin
  // butonuna basmak oncekini otomatik kapatir, ayni satira tekrar basmak
  // onizlemeyi tamamen kapatir.
  private _togglePreview(item: DiscoveredItem) {
    if (this._previewIdentifier === item.identifier) {
      this._previewIdentifier = undefined;
      this._previewSpec = undefined;
    } else {
      this._previewIdentifier = item.identifier;
      this._previewSpec = this._previewSpecFor(item);
    }
    // _previewSpec @state DEGIL (bkz. yukaridaki not), bu yuzden bu
    // degisiklik otomatik updated()'i tetiklemez — dogrudan cagirmak gerekir.
    this._updatePreview();
  }

  // WMTS disindaki servis turlerinde tileMatrixSetID gerekmez; WMTS'te
  // eksikse (capabilities'te bulunamadiysa) onizleme sessizce atlanir —
  // ayni kural _addOneLayer'da hata olarak ele alinir, burada sadece
  // onizleme butonunun bu satir icin calismamasina yol acar.
  private _previewSpecFor(item: DiscoveredItem): PreviewLayerSpec | undefined {
    if (this._serviceType === "WMTS" && !item.tileMatrixSetID) return undefined;

    const url = baseServiceUrl(this._serviceUrl.trim());
    const id = `service-upload-preview-${item.identifier}`;

    switch (this._serviceType) {
      case "WMS":
        return {
          layerType: "WMS",
          options: { id, title: item.title, url, layers: item.identifier },
        };
      case "WMTS":
        return {
          layerType: "WMTS",
          options: {
            id,
            title: item.title,
            url,
            layer: item.identifier,
            tileMatrixSetID: item.tileMatrixSetID as string,
          },
        };
      case "WFS":
        return {
          layerType: "WFS",
          options: { id, title: item.title, url, typeName: item.identifier },
        };
      case "WCS": {
        const rectangle = wcsRectangleFor(item);
        return {
          layerType: "WCS",
          options: {
            id,
            title: item.title,
            url,
            coverageId: item.identifier,
            ...(rectangle && { rectangle }),
          },
        };
      }
      default:
        return undefined;
    }
  }

  // Tum formu (servis turu, servis adresi, kesif sonuclari/secimleri, onizleme)
  // ilk acilistaki varsayilan duruma dondurur -- TucbsStyleEditor._reset() ile
  // AYNI amac (kullaniciya, elle tek tek temizlemek yerine tek tikla "bastan
  // basla" secenegi sunmak), buradaki karsiligi.
  private _resetFields() {
    this._serviceType = "WMS";
    this._serviceUrl = "";
    this._resetDiscovery();
  }

  private _selectServiceType(value: string) {
    this._serviceType = value;
    // Onceki servis turune ait adres yeni turde genelde gecersiz (farkli
    // servis, farkli sunucu) -- kullanicinin bunu ELLE silmesini beklemek
    // yerine tur degisince otomatik temizlenir.
    this._serviceUrl = "";
    this._resetDiscovery();
  }

  private _setServiceUrl(value: string) {
    this._serviceUrl = value;
    this._resetDiscovery();
  }

  private async _addOneLayer(item: DiscoveredItem): Promise<void> {
    if (this._serviceType === "WMTS" && !item.tileMatrixSetID) {
      throw new LayerOperationError("LAYER_WMTS_TILEMATRIXSET_MISSING", "Bu katman için TileMatrixSet bilgisi bulunamadı.");
    }

    const url = baseServiceUrl(this._serviceUrl.trim());
    const id = `service-${item.identifier}-${Date.now()}`;
    const layerManager = this.layerManager as LayerManager;

    switch (this._serviceType) {
      case "WMS": {
        // GeoTIFF export'un o katman icin sunulup sunulmayacagini (bkz
        // LayerManager.isGeoTiffExportAvailable) ve dogru BBOX'i
        // hesaplayabilmesini (bkz buildWmsGeoTiffExportUrl) saglar --
        // sunucu tiff/geotiff desteklemiyorsa (_discoveredTiffFormat
        // undefined) hicbiri geçilmez, export sunulmaz.
        const options: WMSLayerOptions = {
          id,
          title: item.title,
          url,
          layers: item.identifier,
          ...(this._discoveredTiffFormat && {
            tiffFormat: this._discoveredTiffFormat,
            geographicBoundingBox: item.geographicBoundingBox,
          }),
        };
        await layerManager.add("WMS", options);
        break;
      }
      case "WMTS":
        await layerManager.add("WMTS", {
          id,
          title: item.title,
          url,
          layer: item.identifier,
          tileMatrixSetID: item.tileMatrixSetID as string,
        });
        break;
      case "WFS": {
        // "count"/"maxFeatures" sinirini asan katmanlarda LayerManager
        // katmani ENGELLEMEZ, ilk N kaydi yine dogru konumda yukler --
        // sadece kullaniciya ne kadarinin eksik kaldigini bildirmek icin bu
        // event'i yayinlar (bkz kullanici bildirimi: "eksik ama dogru veri,
        // hiç veri olmamasından daha faydalı"). id ile FILTRELIYORUZ ki ayni
        // anda (ör. TucbsFileUpload'tan) baska bir katman eklenirse onun
        // event'ini yakalamayalim.
        const onFeaturesTruncated = (payload: {
          id: string;
          totalCount: number;
          loadedCount: number;
        }) => {
          if (payload.id !== id) return;
          showToast(
            "warning",
            `${payload.totalCount} özellikten sadece ${payload.loadedCount} tanesi yüklendi; tamamı için filtre uygulayın.`,
          );
        };
        layerManager.on("layer:features-truncated", onFeaturesTruncated);
        try {
          await layerManager.add("WFS", {
            id,
            title: item.title,
            url,
            typeName: item.identifier,
          });
        } finally {
          layerManager.off("layer:features-truncated", onFeaturesTruncated);
        }
        break;
      }
      case "WCS": {
        const rectangle = wcsRectangleFor(item);
        const options: WCSLayerOptions = {
          id,
          title: item.title,
          url,
          coverageId: item.identifier,
          ...(rectangle && { rectangle }),
          ...(this._discoveredTiffFormat && {
            tiffFormat: this._discoveredTiffFormat,
          }),
        };
        await layerManager.add("WCS", options);
        break;
      }
    }
  }

  // Secilen katmanlarin tumunu sirayla (ayni sunucuyu ayni anda cok sayida
  // istekle bogmamak icin) eklemeye calisir. Basarisiz olanlar secili
  // kalir ki kullanici sadece onlari tekrar deneyebilsin; basarili olanlar
  // secimden cikarilir. Panel yalnizca hepsi basarili olduysa kapanir.
  private async _addSelectedLayers() {
    if (!this.layerManager) {
      this._addError = "Harita hazır değil, katman eklenemedi.";
      return;
    }

    const toAdd = this._discoveredItems.filter((candidate) =>
      this._selectedIdentifiers.includes(candidate.identifier),
    );
    if (toAdd.length === 0) return;

    // Katman(lar) eklenirken arka planda diger bilesenlerle etkilesim devam
    // ETMEMELI (bkz kullanici bildirimi) -- global overlay tum sayfayi kilitler.
    beginBusy("Katmanlar ekleniyor…");
    this._addError = "";
    const failed: { label: string; message: string }[] = [];

    for (const item of toAdd) {
      try {
        await this._addOneLayer(item);
      } catch (err) {
        if (err instanceof TucbsError) {
          console.error(`[tucbs-service-upload] ${err.code} (${err.number}): ${err.message}`);
        } else {
          console.error(err);
        }
        failed.push({
          label: item.title || item.identifier,
          message: err instanceof Error ? err.message : String(err),
        });
      }
    }

    const failedLabels = failed.map((f) => f.label);
    this._selectedIdentifiers =
      failed.length === 0
        ? []
        : toAdd
            .filter((item) => failedLabels.includes(item.title || item.identifier))
            .map((item) => item.identifier);
    endBusy();

    if (failed.length === 0) {
      this._close();
    } else if (failed.length === 1) {
      // Konsolda da gorunmesi istendigi icin (bkz TucbsFileUpload'daki AYNI
      // desen) bilerek yutmuyoruz -- tek katman basarisiz olduysa GERCEK
      // sebebi (ör. "27458 özellik var, 5000 sınırını aşıyor...") dogrudan
      // gosteriyoruz; oncesinde SADECE katman adi gosterilip sebep tamamen
      // yutuluyordu (bkz kullanici bildirimi: "şu an hiç eklenemiyor").
      this._addError = `"${failed[0]!.label}" eklenemedi: ${failed[0]!.message}`;
    } else {
      // Birden fazla katman farkli sebeplerle basarisiz olabilir -- .error-text
      // zaten cok satirli mesajlar icin "white-space: pre-line" kullaniyor
      // (bkz ServiceDiscoveryController.discover'daki ayni desen).
      this._addError = `${failed.length}/${toAdd.length} katman eklenemedi:\n${failed
        .map((f) => `• ${f.label}: ${f.message}`)
        .join("\n")}`;
    }
  }

  private _addButtonLabel(): string {
    if (this._selectedIdentifiers.length > 1) {
      return `Haritaya Ekle (${this._selectedIdentifiers.length})`;
    }
    return "Haritaya Ekle";
  }

  /** Bileşenin şablonunu render eder (`open` false ise boş şablon). */
  override render() {
    if (!this.open) return html``;

    const hasLayers = this._discoveredItems.length > 0;

    return html`
      <div class="panel${hasLayers ? " with-layers" : ""}">
        <div
            class="header"
            @pointerdown=${(event: PointerEvent) => this._drag.start(event)}
          >
            <span class="title"><span class="title-icon">${ICON_CLOUD_DOWNLOAD}</span>Coğrafi Veri Servisi Ekle</span>
            <div class="header-actions">
              <button
                type="button"
                class="reset-btn"
                @click=${() => this._resetFields()}
              >
                ${ICON_RENEW} Sıfırla
              </button>
              <button
                type="button"
                class="close-btn"
                aria-label="Kapat"
                @click=${() => this._close()}
              >
                ${ICON_CLOSE}
              </button>
            </div>
          </div>

          <div class="content">
            <div class="form-column">
              <cds-dropdown
                title-text="Servis Türü seçiniz"
                label="Seçiniz"
                .value=${this._serviceType}
                @cds-dropdown-selected=${(
                  event: CustomEvent<{ item: { value: string } }>,
                ) => {
                  this._selectServiceType(event.detail.item.value);
                }}
              >
                ${SERVICE_TYPES.map(
                  (option) =>
                    html`<cds-dropdown-item value=${option.value}
                      >${option.label}</cds-dropdown-item
                    >`,
                )}
              </cds-dropdown>

              <div class="url-row">
                <cds-text-input
                  label="Servis Adresi giriniz"
                  placeholder=${servicePlaceholder(this._serviceType)}
                  .value=${this._serviceUrl}
                  @input=${(event: Event) => {
                    this._setServiceUrl(
                      (event.target as HTMLInputElement).value,
                    );
                  }}
                ></cds-text-input>

                <button
                  type="button"
                  class="fetch-btn"
                  title="Servis bilgilerini getir"
                  aria-label="Servis bilgilerini getir"
                  ?disabled=${this._discovering}
                  @click=${() => this._discovery.discover(this._serviceType, this._serviceUrl)}
                >
                  ${ICON_DOWNLOAD}
                </button>
              </div>

              ${this._discoveryError
                ? html`<div class="error-text">${this._discoveryError}</div>`
                : ""}
            </div>

            ${hasLayers
              ? html`
                  <div class="katmanlar-column">
                    <span class="section-label">Katmanlar</span>
                    <div class="discovered-list-wrap">
                      <div
                        class="discovered-list"
                        role="group"
                        aria-label="Katmanlar"
                        @scroll=${() => this._listScroll.sync()}
                      >
                        ${this._discoveredItems.map((item) => {
                          const isPreviewing =
                            this._previewIdentifier === item.identifier;
                          const previewLabel = isPreviewing
                            ? "Önizlemeyi kapat"
                            : "Haritada önizle";
                          return html`
                            <div class="discovered-row">
                              <cds-checkbox
                                title=${item.title}
                                .checked=${this._selectedIdentifiers.includes(
                                  item.identifier,
                                )}
                                @cds-checkbox-changed=${(
                                  event: CustomEvent<{ checked?: boolean }>,
                                ) => {
                                  this._toggleSelected(
                                    item.identifier,
                                    !!event.detail?.checked,
                                  );
                                }}
                              >
                                ${item.title}
                              </cds-checkbox>
                              <button
                                type="button"
                                class="preview-toggle-btn"
                                aria-pressed=${isPreviewing}
                                title=${previewLabel}
                                aria-label=${previewLabel}
                                @click=${() => this._togglePreview(item)}
                              >
                                ${isPreviewing ? ICON_VIEW : ICON_VIEW_OFF}
                              </button>
                            </div>
                          `;
                        })}
                      </div>
                      <div
                        class="scroll-thumb"
                        @pointerdown=${(event: PointerEvent) =>
                          this._listScroll.startDrag(event)}
                      ></div>
                    </div>

                    ${this._addError
                      ? html`<div class="error-text">${this._addError}</div>`
                      : ""}

                    <button
                      type="button"
                      class="add-layer-btn"
                      ?disabled=${this._selectedIdentifiers.length === 0}
                      @click=${() => this._addSelectedLayers()}
                    >
                      ${this._addButtonLabel()}
                    </button>
                  </div>
                `
              : ""}
          </div>
      </div>
    `;
  }
}
