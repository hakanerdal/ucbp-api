import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "@carbon/web-components/es/components/checkbox/index.js";
import "../style-editor/TucbsStyleEditor.js";
import "./TucbsLegendPanel.js";
import "../shared/ui/SlideOverPanel.js";
import { PanelLayoutController } from "../shared/ui/PanelLayoutController.js";
import { PortalHost } from "./PortalHost.js";
import { DragReorder } from "./DragReorder.js";
import { MarkerWatcher } from "./MarkerWatcher.js";
import { buildLayerMenuActions } from "./LayerMenuActions.js";
import { ExclusiveOverlayCoordinator } from "./ExclusiveOverlayCoordinator.js";
import { WriteOnlyApiKey } from "../shared/util/WriteOnlyApiKey.js";
import { TimerBag } from "../shared/util/TimerBag.js";
import "./LayerMenuPortal.js";
import type { TucbsLayerMenuPortal } from "./LayerMenuPortal.js";
import "../shared/ui/TooltipPortal.js";
import type { TucbsTooltipPortal } from "../shared/ui/TooltipPortal.js";
import type {
  LayerManager,
  ManagedLayer,
  LayerType,
  LayerStyleSpec,
  Map as TucbsMapInstance,
} from "@tucbs/core";
import { toHexColor, type TucbsStyleEditor } from "../style-editor/TucbsStyleEditor.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { whenTucbsMapReady, type TucbsMapElement } from "../shared/util/bindTucbsMap.js";
import { iconNodeToString, type CarbonIconNode } from "../shared/util/CarbonIcon.js";
import { bottomRightTooltipStyles } from "../shared/ui/TooltipStyles.js";
import { layerListStyles } from "./layerListStyles.js";
import type { TucbsFileUpload } from "../layer-sources/TucbsFileUpload.js";
import type { TucbsServiceUpload } from "../layer-sources/TucbsServiceUpload.js";
import type { TucbsAuthorizedLayers } from "../layer-sources/TucbsAuthorizedLayers.js";
import type { TucbsLegendPanel } from "./TucbsLegendPanel.js";
import type { TucbsLayerExport } from "./TucbsLayerExport.js";

import {
  ChevronRight16 as ChevronRightIcon,
  OverflowMenuVertical16 as OverflowMenuVerticalIcon,
  Draggable16 as DraggableIcon,
  DocumentBlank20 as DocumentBlankIcon,
  CloudDownload20 as CloudDownloadIcon,
  ApiKey20 as ApiKeyIcon,
  Layers16 as LayersIcon,
} from "@carbon/icons";

interface LayerItem {
  id: string;
  title: string;
  visible: boolean;
  opacity: number;
  fill: string;
  /** LayerManager.getLayerStyle()'dan okunan güncel fill modu — "solid"
   * dışındaki değerlerde (gradient/bin/enum/off) ve stil hiç uygulanmamış
   * (ör. raster) katmanlarda undefined. Legend butonunu gizlemek ve renk
   * swatch'ını pasifleştirmek için kullanılır. */
  styleMode: string | undefined;
  layerType: LayerType;
  /** Tampon/kesişim sonucu. Yüklenen GEOJSON ile karışmasın diye menü buna bakar. */
  analysisResult: boolean;
}

/** Stil henüz uygulanmamış (raster) ya da solid dışı modda olan katmanlar
 * için renk swatch'ının gösterdiği nötr yer tutucu renk. */
const NEUTRAL_LAYER_COLOR = "#9e9e9e";

function carbonIcon(node: CarbonIconNode) {
  return unsafeSVG(iconNodeToString(node));
}

const ICON_DOCUMENT_BLANK = carbonIcon(DocumentBlankIcon);
const ICON_CLOUD_DOWNLOAD = carbonIcon(CloudDownloadIcon);
const ICON_CHEVRON_RIGHT = carbonIcon(ChevronRightIcon);
const ICON_OVERFLOW_MENU = carbonIcon(OverflowMenuVerticalIcon);
const ICON_DRAG_HANDLE = carbonIcon(DraggableIcon);
const ICON_API_KEY = carbonIcon(ApiKeyIcon);
const ICON_LAYERS = carbonIcon(LayersIcon);

/**
 * Haritadaki katmanları listeleyen, sürükle-bırak sıralanabilen, her katman için
 * görünürlük/opaklık/stil/lejant/dışa-aktarma aksiyonları sunan panel (`<tucbs-layer-list>`).
 * `LayerManager`'ın `layer:*` event'lerini dinleyerek listeyi canlı senkronlar.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya (ve `LayerManager`'a) otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-map id="map" api-key="YOUR_API_KEY" basemap="hgm-temel"></tucbs-map>
 *
 * <tucbs-layer-list
 *   mapElementId="map"
 *   panel-width="360px"
 *   collapsible
 * ></tucbs-layer-list>
 * ```
 */
@customElement("tucbs-layer-list")
export class TucbsLayerList extends LitElement {
  static override readonly styles = [bottomRightTooltipStyles, layerListStyles];

  /** Core JS API `LayerManager` referansı. */

  // tucbs-app: property binding ile gelir.
  // Senaryo 2: ready event sonrasi JS ile atanir.
  @property({ attribute: false }) layerManager: LayerManager | undefined;

  /** Core JS API `Map` instance'ı — panel açıldığında haritayı soldan sıkıştırmak için kullanılır. */

  // SADECE panel acildiginda haritayi soldan sikistirmak (bkz.
  // PanelLayoutController, _layoutController) icin kullanilir, katman
  // islemlerinin hicbiri buna ihtiyac duymaz (onlar hep `layerManager`
  // uzerinden yurur). Senaryo 1: `layerManager` ile BIRLIKTE dogrudan
  // property binding (ör. TucbsApp: `.map=${this._map}`). Senaryo 2:
  // `mapElementId` ile `layerManager` ile AYNI anda cozulur (bkz.
  // firstUpdated). Verilmezse (ör. sadece `.layerManager` binding'i yapilip
  // `.map` atlanirsa) harita sikistirma sessizce devre disi kalir --
  // katman yonetimi islevi bundan ETKILENMEZ.
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  /** Opsiyonel: `tucbs-map` element'inin ID'si (2A: `ready` + property ile aynı işlemi yapar; W3C standardı değildir — kolaylık için). */
  @property() mapElementId = "";

  // Gercek deger `#apiKeyState` (WriteOnlyApiKey, shared/util/WriteOnlyApiKey.ts)
  // icinde tutulur -- TucbsMap.ts ile AYNI "write-only" deseni uygular. Iki
  // yoldan biriyle dolar: (1) Senaryo 1 -- dogrudan property binding (ör.
  // TucbsApp: `.apiKey=${...}`, `.layerManager`/`.map` ile AYNI desen); (2)
  // Senaryo 2 -- "mapElementId" ile host TucbsMap'in `_grantApiKeyTo()`
  // PUSH'u (bkz firstUpdated()). TEK amaci: portal klonuna
  // (_serviceUploadPortal) aktarmak (bkz _serviceUploadPortal'in sync
  // fonksiyonu) -- katman islemlerinin hicbiri buna ihtiyac duymaz (onlar
  // hep `layerManager` uzerinden yurur).
  //
  // GUVENLIK: bu alan digerleri gibi (`private readonly`) DEGIL, GERCEK ES
  // private (`#`) olmali -- yoksa `el._apiKeyState.real` ile gercek anahtar
  // disaridan okunabilir hale gelir (bkz WriteOnlyApiKey.ts basindaki UYARI).
  #apiKeyState = new WriteOnlyApiKey(this);
  /** Harita apiKey'i — yalnızca yazılabilir; `get` güvenlik nedeniyle her zaman maskelenmiş döner (bkz yukarıdaki `#apiKeyState` WHY notu). */
  @property({ attribute: "api-key" })
  set apiKey(value: string) {
    this.#apiKeyState.write(value);
  }
  get apiKey(): string {
    return this.#apiKeyState.masked;
  }

  /** Panelin (ve açıldığında haritanın soldan daralacağı miktarın) genişliği. */

  // Ayarlar panelinin varsayilaniyla (360px) AYNI. `tucbs-slide-over-panel`'e
  // (bkz. render()) ve PanelLayoutController'a AYNI degerle iletilir --
  // TucbsSettingsTool'daki ayni "panel-width" deseni.
  @property({ attribute: "panel-width" }) panelWidth = "360px";

  /** Panelin daraltılabilir olup olmadığı. */
  @property({ type: Boolean }) collapsible = true;

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM içine enjekte edebileceği keyfi CSS metni (bkz {@link _applyCustomCss}). */
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _open = false;
  @state() private _layers: LayerItem[] = [];
  @state() private _openMenuId: string | null = null;
  // GeoTIFF export'un (bkz _exportLayerAsGeoTiff) surdugu katmanin id'si --
  // menu zaten kapandigi icin (bkz o metod) tikanacak bir yer kalmiyor,
  // bu yuzden "..." butonunun kendisi bu sure boyunca bir spinner'a
  // donusup gosterge gorevi gorur (bkz render()'daki .options-btn-spinner).
  @state() private _geoTiffExportingId: string | null = null;
  @state() private _uploadOpen = false;
  @state() private _fileUploadAvailable = false;
  @state() private _serviceUploadOpen = false;
  @state() private _serviceUploadAvailable = false;
  @state() private _styleEditorAvailable = false;
  @state() private _legendAvailable = false;
  @state() private _layerExportAvailable = false;
  @state() private _legendOpenIds = new Set<string>();
  // "apiKey ile yetkili katmanlarımı getir" butonu da (GC-03 4.4 Adim 3
  // sonrasi) AYNI "cIplak marker" deseniyle calisir -- bkz asagidaki
  // _authorizedLayersMarker/_authorizedLayersPortal.
  @state() private _authorizedLayersAvailable = false;
  // _openAuthorizedLayers() butonunu fetchAndOpen() surerken devre disi
  // birakmak icin -- asil "yukleniyor" durumu artik <tucbs-authorized-layers>'in
  // KENDI state'i (bkz o dosya), ama bu AYRI bir custom element oldugundan
  // onun reactive guncellemesi TucbsLayerList'i OTOMATIK yeniden render ETMEZ
  // -- bu yuzden burada KUCUK, yerel bir kopya tutuluyor.
  @state() private _authorizedLayersFetching = false;
  // Buton SADECE apiKey mevcutsa gosterilir (component-seviyesi VEYA
  // configureTucbs() global-seviyesi -- LayerManager.hasApiKey ikisini de
  // TEK bayrakla kapsar, bkz Map.ts effectiveApiKey). layerManager
  // baglandiginda ilk deger okunur; sonrasinda "apiKey:change" event'i
  // (configureTucbs() rotasyonu HALIHAZIRDA baglanmis bir LayerManager'i
  // guncelleyebilir, bkz registerApiKeyRefresh) bu bayragi CANLI tutar.
  @state() private _hasApiKey = false;

  // Uygulamanin HTML'inde duran "cIplak marker" tag'lerin kendileri (sadece
  // varlik kontrolu icin degil) — boylece tuketicinin O TAG UZERINE yazdigi
  // custom-css, TucbsLayerList'in GOMDUGU kopyaya aktarilabilir. TucbsLayerList'e
  // bunun icin AYRI bir "fileUploadCustomCss" gibi property EKLENMEDI —
  // tuketici custom-css'i dogrudan kendi <tucbs-file-upload custom-css="...">
  // tag'ine yazar, biz sadece o degeri OKURUZ (render() icinde).
  private _fileUploadMarker: TucbsFileUpload | null = null;
  private _serviceUploadMarker: TucbsServiceUpload | null = null;
  private _styleEditorMarker: TucbsStyleEditor | null = null;
  private _legendMarker: TucbsLegendPanel | null = null;
  // Katman "..." menusundeki "GeoJSON Olarak Disa Aktar" ogesi icin -- diger
  // marker'lardan farkli olarak (dialog/panel degil, dogrudan indirme) ayrica
  // portallanmaz, bare marker'in kendisi zaten fonksiyonel instance'dir (bkz
  // TucbsLayerExport.ts WHY yorumu).
  private _layerExportMarker: TucbsLayerExport | null = null;
  // "tucbs-authorized-layers" icin de AYNI mantik (bkz GC-03 4.4 Adim 3 --
  // bu bilesen de digerleri gibi portallaniyor, bkz asagidaki
  // _authorizedLayersPortal).
  private _authorizedLayersMarker: TucbsAuthorizedLayers | null = null;

  // GERCEK (gomduğu, "cIplak marker" DEGIL) dosya/servis/stil dialoglari
  // ARTIK `document.body`'ye DOGRUDAN eklenir ("portal") -- `render()`
  // icinde `<tucbs-slide-over-panel>`'in ICINE (light DOM/slot) render
  // EDILMEZLER. WHY: bu ucu de kendi `:host{position:fixed;top:50%;
  // left:50%;transform:translate(-50%,-50%)}` ile EKRANIN TAM ORTASINDA
  // gorunmesi gereken bagimsiz dialoglardir -- ama tucbs-slide-over-panel'in
  // KENDI ".panel"i (kayma animasyonu icin) `transform` tasiyor, ve CSS
  // spec'ine gore `transform` tasiyan HERHANGI bir ATA (SLOTLANMIS ICERIK
  // dahil -- flattened tree, shadow sinirini gecer) `position:fixed`
  // torunlari icin panelin KENDI (dar, kirpilmis) kutusunu yeni bir
  // containing block yapar. Ayni sinif TucbsSettingsTool'un "Ayarlar"
  // panelini portallamasinin AYNI nedeni (bkz. SlideOverPanel.ts WHY
  // yorumu) -- burada fark, PORTALLANAN'IN panelin kendi icerigi DEGIL,
  // panelin ICINE gomulmesi gereken AYRI/bagimsiz alt-dialoglar olmasi.
  //
  // Uc portal de AYNI "olustur/body'ye ekle/senkronla/kaldir" iskeletini
  // tekrar ettigi icin PortalHost<T>'e indirgendi (bkz GC-03 4.4 Adim 1).
  private readonly _fileUploadPortal = new PortalHost<TucbsFileUpload>(
    "tucbs-file-upload",
    (el) => {
      el.open = this._uploadOpen;
      el.layerManager = this.layerManager;
      el.customCss = this._fileUploadMarker?.customCss ?? "";
    },
    "tucbs-file-upload-closed",
    () => this._closeUpload(),
  );
  private readonly _serviceUploadPortal = new PortalHost<TucbsServiceUpload>(
    "tucbs-service-upload",
    (el) => {
      el.open = this._serviceUploadOpen;
      el.layerManager = this.layerManager;
      el.customCss = this._serviceUploadMarker?.customCss ?? "";
      el.apiKey = this.#apiKeyState.real;
    },
    "tucbs-service-upload-closed",
    () => this._closeServiceUpload(),
  );
  private readonly _styleEditorPortal = new PortalHost<TucbsStyleEditor>(
    "tucbs-style-editor",
    (el) => {
      el.layerManager = this.layerManager;
      el.customCss = this._styleEditorMarker?.customCss ?? "";
    },
  );
  private readonly _authorizedLayersPortal = new PortalHost<TucbsAuthorizedLayers>(
    "tucbs-authorized-layers",
    (el) => {
      el.layerManager = this.layerManager;
      el.customCss = this._authorizedLayersMarker?.customCss ?? "";
    },
  );

  // GC-03 Adim 6 (Faz 3): kardes marker kesfi artik canli -- her marker icin
  // ilk taramayi + marker SONRADAN eklenir/kaldirilirse _xAvailable/_xMarker'i
  // VE (varsa) portali GUNCEL tutar (bkz layer-list/MarkerWatcher.ts WHY
  // yorumu). Simetrik: marker KALDIRILIRSA portal da dispose edilir
  // (yarim-canlilik olmasin diye -- aksi halde buton kaybolur ama altindaki
  // portal/instance kalici bir sizinti olurdu).
  private readonly _fileUploadWatcher = new MarkerWatcher<TucbsFileUpload>(
    this,
    "tucbs-file-upload",
    (marker) => {
      this._fileUploadMarker = marker;
      this._fileUploadAvailable = marker !== null;
      if (marker) this._fileUploadPortal.ensure();
      else this._fileUploadPortal.dispose();
    },
  );
  private readonly _serviceUploadWatcher = new MarkerWatcher<TucbsServiceUpload>(
    this,
    "tucbs-service-upload",
    (marker) => {
      this._serviceUploadMarker = marker;
      this._serviceUploadAvailable = marker !== null;
      if (marker) this._serviceUploadPortal.ensure();
      else this._serviceUploadPortal.dispose();
    },
  );
  private readonly _styleEditorWatcher = new MarkerWatcher<TucbsStyleEditor>(
    this,
    "tucbs-style-editor",
    (marker) => {
      this._styleEditorMarker = marker;
      this._styleEditorAvailable = marker !== null;
      if (marker) this._styleEditorPortal.ensure();
      else this._styleEditorPortal.dispose();
    },
  );
  // "tucbs-legend-panel"in portallanan bir kopyasi yok (bkz _legendMarker
  // field yorumu -- render() icinde dogrudan render edilir), bu yuzden
  // burada ensure()/dispose() cagrisi YOK.
  private readonly _legendWatcher = new MarkerWatcher<TucbsLegendPanel>(
    this,
    "tucbs-legend-panel",
    (marker) => {
      this._legendMarker = marker;
      this._legendAvailable = marker !== null;
    },
  );
  // "tucbs-layer-export" de AYNI sekilde portallanmaz (bkz _layerExportMarker
  // field yorumu -- bare marker'in kendisi zaten fonksiyonel instance'dir).
  private readonly _layerExportWatcher = new MarkerWatcher<TucbsLayerExport>(
    this,
    "tucbs-layer-export",
    (marker) => {
      this._layerExportMarker = marker;
      this._layerExportAvailable = marker !== null;
    },
  );
  private readonly _authorizedLayersWatcher = new MarkerWatcher<TucbsAuthorizedLayers>(
    this,
    "tucbs-authorized-layers",
    (marker) => {
      this._authorizedLayersMarker = marker;
      this._authorizedLayersAvailable = marker !== null;
      if (marker) this._authorizedLayersPortal.ensure();
      else this._authorizedLayersPortal.dispose();
    },
  );

  // Katman "..." (kebap) menüsü için TEK, yeniden kullanılan portal instance
  // -- her açılışta içeriği/konumu güncellenir (bkz. _openMenuPortal). Aynı
  // "document.body'ye taşı" gerekçesi ile, ama farklı bir CSS sorunu için:
  // menü `position:absolute` (kendi `.layer-options{position:relative}`
  // atasına göre, transform sorunundan ETKİLENMİYOR) ama
  // `tucbs-slide-over-panel`'in `.panel-body{overflow-y:auto}`'su CSS
  // spec'i gereği KARŞI eksende de örtük "auto" kırpma uyguluyordu (bkz.
  // layer-list/LayerMenuPortal.ts WHY yorumu).
  private _menuPortalEl: TucbsLayerMenuPortal | null = null;

  // Kirpma sinirina (overflow:auto konteynir) flush yasli buton tooltip'leri
  // icin TEK, yeniden kullanilan portal instance'i -- AYNI sorun (bkz.
  // yukaridaki _menuPortalEl yorumu) CSS-only tooltip'te de gecerli: buton
  // konteynirinin kenarina cok yakinsa, o yone acilan tooltip konteynirin
  // "auto" kirpmasina takilip görünmez olur. Su an SADECE ".options-btn"
  // icin kullanilir ("Katman seçenekleri", satirin EN SAGINA yasli, bkz.
  // .layer-actions{margin-left:auto}). (GC-03 4.4 Adim 3 ONCESI burada
  // ".authorized-token-btn" icin de kullanilirdi -- o buton artik
  // <tucbs-authorized-layers>'a tasindigi icin KENDI bagimsiz tooltip
  // portalini kuruyor, bkz o dosya.) Diger toolbar/panel butonlari CSS-only
  // `data-tooltip` (bkz. shared/ui/TooltipStyles.ts) kullanmaya devam ediyor
  // -- portal SADECE kirpma sinirina flush yasli butonlar icin gerekli.
  private _tooltipPortalEl: TucbsTooltipPortal | null = null;

  // katman basina secilen renk/opaklik; LayerManager bu degerleri saklamadigi icin burada tutulur.
  private readonly _colorById = new Map<string, string>();
  private readonly _opacityById = new Map<string, number>();

  private readonly _dragReorder = new DragReorder((draggedId, nextId) =>
    this._applyReorder(draggedId, nextId),
  );

  // Veri Dosyasi Ekle/Cografi Veri Servisi Ekle/Stil Duzenle/Yetkili
  // Katmanlar kutularinin karsilikli dislamasi -- bkz
  // layer-list/ExclusiveOverlayCoordinator.ts WHY yorumu. Kayitlar
  // connectedCallback'te yapilir (bkz orada).
  private readonly _overlayCoordinator = new ExclusiveOverlayCoordinator<
    "upload" | "serviceUpload" | "styleEditor" | "authorizedLayers"
  >();

  // customCss icin adopte edilmis stil sayfasinin durumu — bkz.
  // ./internal/CustomCss.ts (tucbs-* bilesenleri arasinda ortak).
  private readonly _customCssState: CustomCssState = { sheet: null };

  // Panel (soldan) acildiginda/kapaninca haritayi AYNI genislikte soldan
  // daraltir/geri genisletir -- TucbsSettingsTool'un "Ayarlar" paneli icin
  // kullandigi AYNI sinif, "left" tarafiyla (bkz. PanelLayoutController.
  // setOpen: side="left" iken width'e EK olarak marginLeft de uygulanir,
  // boylece bosluk haritanin SAG'inda degil SOL'unda acilir). Kamera
  // KONUMU/ACISI/ZOOM'u HICBIR SEKILDE degistirilmez -- sadece canvas'in
  // fiziksel boyutu degisir (bkz. o sinifin kendi WHY yorumu).
  private readonly _layoutController = new PanelLayoutController(this, "left");

  // Slider surukleme sirasinda harita guncellemesi frame basina en fazla bir
  // kez uygulanir; slider'in kendi gorsel hareketi input event'inde aninda akar.
  private readonly _opacityRaf = new Map<string, number>();
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  private readonly _onDocumentPointerDown = (event: PointerEvent) => {
    const path = event.composedPath();
    const insideOptions = path.some(
      (el) =>
        (el instanceof HTMLElement && el.classList.contains("layer-options")) ||
        el === this._menuPortalEl,
    );
    if (!insideOptions) this._closeMenu();
  };

  private readonly _onDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") this._closeMenu();
  };

  private readonly _onWindowScrollOrResize = () => {
    if (this._openMenuId) this._closeMenu();
    this._hidePortalTooltip();
  };

  // Kirpma sinirina flush yasli buton tooltip'lerini _tooltipPortalEl
  // uzerinden gosterir/gizler -- bkz. _tooltipPortalEl field yorumu (neden
  // portal gerekiyor, hangi butonlar kullaniyor).
  private _showPortalTooltip(anchor: HTMLElement, text: string): void {
    if (!this._tooltipPortalEl) return;
    const rect = anchor.getBoundingClientRect();
    this._tooltipPortalEl.text = text;
    this._tooltipPortalEl.x = rect.left;
    this._tooltipPortalEl.y = rect.bottom + 6;
    this._tooltipPortalEl.open = true;
  }

  private _hidePortalTooltip(): void {
    if (this._tooltipPortalEl) this._tooltipPortalEl.open = false;
  }

  // === LayerManager event handler'lari ===
  private readonly _onLayerAdd = () => this._syncFromLayerManager();
  private readonly _onLayerRemove = () => this._syncFromLayerManager();
  private readonly _onLayerReorder = () => this._syncFromLayerManager();
  private readonly _onLayerVisibility = (payload: {
    id: string;
    visible: boolean;
  }) => {
    this._layers = this._layers.map((layer) =>
      layer.id === payload.id ? { ...layer, visible: payload.visible } : layer,
    );
  };
  private readonly _onLayerOpacity = (payload: {
    id: string;
    opacity: number;
  }) => {
    this._opacityById.set(payload.id, payload.opacity);
    this._layers = this._layers.map((layer) =>
      layer.id === payload.id ? { ...layer, opacity: payload.opacity } : layer,
    );
  };
  // StyleEditor'den (veya başka bir yerden) uygulanan stil değişikliğini
  // swatch/legend-görünürlüğüne yansıtır — çift yönlü senkronun LayerList
  // tarafı. fill.opacity da AYNI şekilde yansıtılır (bkz _applyOpacity WHY
  // yorumu) -- bu satırın olmadığı önceki halde, StyleEditor'ün "Dolgu"
  // kartındaki Opaklık slider'ı sürüklendiğinde bu bileşenin kendi opaklık
  // barı/yüzdesi HİÇ güncellenmiyordu (iki ayrı, birbirinden habersiz state
  // -- kullanıcı bildirimi: "senkron çalışmıyor").
  private readonly _onLayerStyle = (payload: {
    id: string;
    style: LayerStyleSpec;
  }) => {
    const { fill } = payload.style;
    const fillColor = fill.mode === "solid" ? fill.color : NEUTRAL_LAYER_COLOR;
    if (fill.mode !== "off") this._opacityById.set(payload.id, fill.opacity);
    this._layers = this._layers.map((layer) =>
      layer.id === payload.id
        ? {
            ...layer,
            fill: fillColor,
            styleMode: fill.mode,
            opacity: fill.mode !== "off" ? fill.opacity : layer.opacity,
          }
        : layer,
    );
  };

  /** Bileşen DOM'a bağlandığında: global dinleyicileri, portal elementlerini ve sıra dışı bileşen (upload/style-editor/legend/export) varlık bayraklarını kurar. */
  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener("pointerdown", this._onDocumentPointerDown);
    document.addEventListener("keydown", this._onDocumentKeyDown);
    // "scroll" event'i bubble ETMEZ (bkz. spec) -- window'a CAPTURE fazinda
    // dinlemek, herhangi bir ic-ice scroll-container'daki (ör.
    // tucbs-slide-over-panel'in ".panel-body"si) kaydirmayi da yakalar.
    // Menu, acildigi anki anchor konumuna GORE (bir kerelik) konumlandigi
    // icin liste kaydirilinca konumu GECERSIZ olur -- yeniden hesaplamak
    // yerine (kisa omurlu bir dropdown icin gereksiz karmasiklik) sadece kapatiyoruz.
    window.addEventListener("scroll", this._onWindowScrollOrResize, true);
    window.addEventListener("resize", this._onWindowScrollOrResize);

    this._menuPortalEl = document.createElement(
      "tucbs-layer-menu-portal",
    ) as TucbsLayerMenuPortal;
    document.body.appendChild(this._menuPortalEl);

    this._tooltipPortalEl = document.createElement(
      "tucbs-tooltip-portal",
    ) as TucbsTooltipPortal;
    document.body.appendChild(this._tooltipPortalEl);

    // "Ac" metodlarinin (_openUpload/_openServiceUpload/_openStyleEditor/
    // _openAuthorizedLayers) diger 3 kutuyu ELLE kapatmasi yerine TEK bir
    // yere devredilen karsilikli-dislama kaydi -- bkz
    // layer-list/ExclusiveOverlayCoordinator.ts WHY yorumu. Ayni "id" ile
    // tekrar register() cagrisi (disconnect+reconnect) sadece kaydi
    // degistirir, zararsizdir.
    this._overlayCoordinator.register("upload", () => {
      this._uploadOpen = false;
    });
    this._overlayCoordinator.register("serviceUpload", () => {
      this._serviceUploadOpen = false;
    });
    this._overlayCoordinator.register("styleEditor", () => this._closeStyleEditorIfOpen());
    this._overlayCoordinator.register("authorizedLayers", () => this._closeAuthorizedLayersIfOpen());

    // Buton/panel sadece uygulamanin HTML'inde gercek bir "tucbs-file-upload"
    // elementi varsa gosterilir; modulun sadece import/register edilmis olmasi
    // yeterli degildir, element'in belgede (body'de) ekli olmasi gerekir.
    // Element referansi da saklanir ki tuketicinin O TAG'A yazdigi custom-css
    // okunup gomulu kopyaya aktarilabilsin (bkz. render()). GC-03 Adim 6
    // (Faz 3): her .start() ilk taramayi YAPAR VE marker'i canli izlemeye
    // baslar (bkz field tanimlari, layer-list/MarkerWatcher.ts).
    this._fileUploadWatcher.start();
    this._serviceUploadWatcher.start();
    this._styleEditorWatcher.start();
    this._legendWatcher.start();
    this._layerExportWatcher.start();
    this._authorizedLayersWatcher.start();
  }

  /** Bileşen DOM'dan kaldırıldığında: global dinleyicileri, portalları ve bekleyen RAF/sürükleme durumunu temizler. */
  override disconnectedCallback() {
    document.removeEventListener("pointerdown", this._onDocumentPointerDown);
    document.removeEventListener("keydown", this._onDocumentKeyDown);
    window.removeEventListener("scroll", this._onWindowScrollOrResize, true);
    window.removeEventListener("resize", this._onWindowScrollOrResize);
    if (this.layerManager) this._unbindLayerManager(this.layerManager);
    if (this.map) this._layoutController.unbindMap(this.map);
    this._fileUploadPortal.dispose();
    this._serviceUploadPortal.dispose();
    this._styleEditorPortal.dispose();
    this._authorizedLayersPortal.dispose();
    this._fileUploadWatcher.dispose();
    this._serviceUploadWatcher.dispose();
    this._styleEditorWatcher.dispose();
    this._legendWatcher.dispose();
    this._layerExportWatcher.dispose();
    this._authorizedLayersWatcher.dispose();
    this._menuPortalEl?.remove();
    this._menuPortalEl = null;
    this._tooltipPortalEl?.remove();
    this._tooltipPortalEl = null;
    // ESKIDEN _opacityRaf'taki kareler burada cancelAnimationFrame ile elle
    // iptal ediliyordu; artik _timers (TimerBag) super.disconnectedCallback()
    // icinde (hostDisconnected) iptal ediyor. Bekleyen id kaydi yine temizlenir.
    this._opacityRaf.clear();
    // Aktif bir surukleme varken panel kapanirsa/bilesen kaldirilirsa (bkz
    // DragReorder.start() WHY yorumu -- dinleyiciler artik "window"'da) bu
    // dinleyiciler ASLA temizlenmeyip kalici bir sizintiya (bu instance'i
    // sonsuza dek referans tutan) donusmesin diye burada da kaldirilir.
    this._dragReorder.dispose();
    super.disconnectedCallback();
  }

  // === Yasam Dongusu: LayerManager baglama ===
  /** `layerManager`/`map` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
  override firstUpdated(): void {
    // Senaryo 1: layerManager property binding ile disaridan zaten atanmis.
    if (this.layerManager) return;

    if (!this.mapElementId) {
      // Parent (tucbs-app) ".layerManager"i asenkron cozup property binding
      // ile gec atayabilir -- yanlis-pozitif uyariyi onlemek icin bir kare
      // ertelenip tekrar kontrol edilir (bkz TucbsZoomTool.ts ayni yorum).
      // Kare _timers (TimerBag) ile planlanir: bilesen o kare icinde DOM'dan
      // kalkarsa iptal edilir. ESKIDEN ciplak requestAnimationFrame'di ve
      // kaldirilmis bilesen icin de yanlis uyari basiliyordu.
      this._timers.requestAnimationFrame(() => {
        if (this.layerManager) return;
        console.warn(
          '[tucbs-layer-list] "mapElementId" verilmedi ve "layerManager" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin gizli kalacak.',
        );
      });
      return;
    }

    // Senaryo 2: "mapElementId" ile tucbs-map elementinin id'si verilmis.
    const mapEl = document.getElementById(this.mapElementId) as TucbsMapElement | null;
    if (!mapEl) {
      console.warn(
        `[tucbs-layer-list] mapElementId="${this.mapElementId}" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin gizli kalacak.`,
      );
      return;
    }

    whenTucbsMapReady(mapEl, (host) => {
      if (host.layerManager) {
        this.layerManager = host.layerManager;
      }
      if (host.map) {
        this.map = host.map;
      }
      host._grantApiKeyTo?.(this);
    });
  }

  /** Reactive property değişikliklerini (customCss/map/layerManager/apiKey vb.) işler ve bağlı Core JS API instance'larını senkronlar. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(
        this.shadowRoot,
        this.customCss,
        this._customCssState,
        "tucbs-layer-list",
      );
    }

    if (changed.has("map")) {
      const previousMap = changed.get("map") as TucbsMapInstance | undefined;
      if (previousMap) this._layoutController.unbindMap(previousMap);
      if (this.map) this._layoutController.bindMap(this.map);
    }

    if (changed.has("layerManager")) {
      const previous = changed.get("layerManager") as LayerManager | undefined;
      if (previous) this._unbindLayerManager(previous);
      if (this.layerManager) this._bindLayerManager(this.layerManager);
      else this._hasApiKey = false;
    }

    this._fileUploadPortal.update();
    this._serviceUploadPortal.update();
    this._styleEditorPortal.update();
    this._authorizedLayersPortal.update();
  }

  private _bindLayerManager(layerManager: LayerManager): void {
    layerManager.on("layer:add", this._onLayerAdd);
    layerManager.on("layer:remove", this._onLayerRemove);
    layerManager.on("layer:reorder", this._onLayerReorder);
    layerManager.on("layer:visibility", this._onLayerVisibility);
    layerManager.on("layer:opacity", this._onLayerOpacity);
    layerManager.on("layer:style", this._onLayerStyle);
    layerManager.on("apiKey:change", this._onApiKeyChange);
    this._hasApiKey = layerManager.hasApiKey;
    this._syncFromLayerManager();
  }

  private _unbindLayerManager(layerManager: LayerManager): void {
    layerManager.off("layer:add", this._onLayerAdd);
    layerManager.off("layer:remove", this._onLayerRemove);
    layerManager.off("layer:reorder", this._onLayerReorder);
    layerManager.off("layer:visibility", this._onLayerVisibility);
    layerManager.off("layer:opacity", this._onLayerOpacity);
    layerManager.off("layer:style", this._onLayerStyle);
    layerManager.off("apiKey:change", this._onApiKeyChange);
  }

  // configureTucbs() rotasyonu HALIHAZIRDA baglanmis bir LayerManager'in
  // apiKey'ini sonradan set/degistirebilir (bkz LayerManager.configure()
  // emit'i) -- bu durumda butonun gorunurlugu sayfa yenilenmeden gunceller.
  private readonly _onApiKeyChange = (payload: { hasApiKey: boolean }) => {
    this._hasApiKey = payload.hasApiKey;
  };

  // LayerManager'daki basemap disindaki tum katmanlari _layers'a yansitir.
  // getLayers() katmanlari z-sirasina gore artan (en arkadaki once) dondurur;
  // listede en ustte en onde/en son yukseltilmis katman gorunmesi icin ters
  // cevrilir (bu, _reorderInLayerManager'daki "index 0 = raiseToTop" ile tutarlidir).
  private _syncFromLayerManager(): void {
    if (!this.layerManager) {
      this._layers = [];
      return;
    }
    this._layers = this.layerManager
      .getLayers()
      .filter((layer) => !layer.isBasemap)
      .reverse()
      .map((layer) => this._toLayerItem(layer));
  }

  private _toLayerItem(layer: ManagedLayer): LayerItem {
    if (!this._opacityById.has(layer.id)) this._opacityById.set(layer.id, 1);
    const style = this.layerManager?.getLayerStyle(layer.id);
    const isSolid = style?.fill.mode === "solid";
    return {
      id: layer.id,
      title: layer.title,
      visible: layer.cesiumObject.show,
      opacity: this._opacityById.get(layer.id) ?? 1,
      fill: isSolid ? style.fill.color : NEUTRAL_LAYER_COLOR,
      styleMode: style?.fill.mode,
      layerType: layer.layerType,
      analysisResult: this.layerManager?.isAnalysisResult(layer.id) ?? false,
    };
  }

  private _openPanel() {
    this._open = true;
    this._layoutController.setOpen(true, this.panelWidth);
  }

  private _closePanel() {
    this._open = false;
    this._layoutController.setOpen(false, this.panelWidth);
    this._closeMenu();
  }

  // Veri Dosyasi Ekle / Cografi Veri Servisi Ekle / Yetkili Katmanlar / Stil
  // Duzenle -- hepsi haritanin ustune serbest (modal olmayan, z-index'e
  // dayali) kutular olarak biniyor; ayni anda ikisi acik kalirsa ust uste
  // binip alttakini tiklanamaz/okunamaz hale getiriyor (bkz kullanici
  // ekran goruntusu). Bu yuzden biri acilirken digerleri KAPATILIR.
  private _closeStyleEditorIfOpen(): void {
    const el = this._styleEditorPortal.element;
    if (el?.open) el.close();
  }

  private _closeAuthorizedLayersIfOpen(): void {
    const el = this._authorizedLayersPortal.element;
    if (el?.open) el.closePicker();
  }

  private _openUpload() {
    this._overlayCoordinator.closeOthers("upload");
    this._uploadOpen = true;
  }

  private _closeUpload() {
    this._uploadOpen = false;
  }

  private _openServiceUpload() {
    this._overlayCoordinator.closeOthers("serviceUpload");
    this._serviceUploadOpen = true;
  }

  private _closeServiceUpload() {
    this._serviceUploadOpen = false;
  }

  /**
   * "Yetkili Katmanlarımı Getir" butonu — diğer serbest kutuları kapatıp
   * `<tucbs-authorized-layers>` portalının `fetchAndOpen()`'ını tetikler
   * (bkz GC-03 4.4 Adım 3, asıl fetch/dialog mantığı artık o bileşende).
   */
  private async _openAuthorizedLayers(): Promise<void> {
    if (this._authorizedLayersFetching) return;
    this._overlayCoordinator.closeOthers("authorizedLayers");
    this._authorizedLayersFetching = true;
    try {
      await this._authorizedLayersPortal.element?.fetchAndOpen();
    } finally {
      this._authorizedLayersFetching = false;
    }
  }


  private _setVisible(id: string, visible: boolean) {
    this.layerManager?.setVisible(id, visible);
  }

  // Yalnız solid modda çağrılır (swatch o dışındaki modlarda pasif).
  // Gerçek katman rengini LayerManager üzerinden değiştirir; "layer:style"
  // event'i hem bu bileşenin (_onLayerStyle) hem de açık olabilecek
  // StyleEditor'ün state'ini otomatik günceller.
  private _setLayerColor(id: string, color: string) {
    const current = this.layerManager?.getLayerStyle(id);
    const opacity = current?.fill.mode === "solid" ? current.fill.opacity : 1;
    const outline = current?.outline ?? {
      enabled: true,
      color: "#000000",
      width: 2,
    };
    this.layerManager?.applyLayerStyle(id, {
      fill: { mode: "solid", color, opacity },
      outline,
    });
  }

  private _setOpacity(id: string, opacity: number) {
    this._opacityById.set(id, opacity);

    const pending = this._opacityRaf.get(id);
    if (pending !== undefined) this._timers.cancelAnimationFrame(pending);

    const raf = this._timers.requestAnimationFrame(() => {
      this._opacityRaf.delete(id);
      this._applyOpacity(id, this._opacityById.get(id) ?? opacity);
    });
    this._opacityRaf.set(id, raf);
  }

  // Entity-tabanli (vektor) katmanlarda bu bar, TucbsStyleEditor'un "Dolgu"
  // kartindaki Opaklik slider'iyla AYNI degeri (fill.opacity) okur/yazar --
  // eskiden burasi TAMAMEN AYRI, tum katman genelinde CARPAN olarak
  // uygulanan LayerManager.setOpacity()'i cagiriyordu (bkz o metodun/
  // prepareDataSourceOpacity'nin yorumlari: alpha = fill.alpha * layerOpacity);
  // iki slider farkli sayilari gosterip birbirinden habersiz kaliyordu (bkz
  // kullanici bildirimi). fill.mode "off" ise (StyleEditor'da Opaklik alani
  // zaten gizlenir) senkronize edilecek bir fill opakligi YOK -- bu TEK
  // durumda ve raster (WMS/WMTS/WCS -- getLayerStyle() bunlar icin hep
  // undefined doner, applyLayerStyle entity-disi katmanlarda zaten hata
  // firlatir) katmanlarda eski katman-geneli mekanizmaya dusulur.
  private _applyOpacity(id: string, opacity: number): void {
    if (!this.layerManager) return;
    const current = this.layerManager.getLayerStyle(id);
    if (current !== undefined && current.fill.mode !== "off") {
      this.layerManager.applyLayerStyle(id, {
        fill: { ...current.fill, opacity },
        outline: current.outline,
      });
      return;
    }
    this.layerManager.setOpacity(id, opacity);
  }

  private _updateOpacitySlider(input: HTMLInputElement, value: number): void {
    input.style.setProperty("--fill", `${value}%`);
  }

  private _remove(id: string) {
    this._closeMenu();
    const pendingOpacity = this._opacityRaf.get(id);
    if (pendingOpacity !== undefined) {
      cancelAnimationFrame(pendingOpacity);
      this._opacityRaf.delete(id);
    }
    if (this._legendOpenIds.has(id)) {
      const next = new Set(this._legendOpenIds);
      next.delete(id);
      this._legendOpenIds = next;
    }
    // Katman "layer:remove" event'i uzerinden listeden cikarilacak.
    this.layerManager?.removeLayer(id);
  }

  private _bringToFront(id: string) {
    this._closeMenu();
    // Katman "layer:reorder" event'i uzerinden listede en uste tasinacak.
    this.layerManager?.raiseToTop(id);
  }

  private _zoomToLayer(id: string) {
    this._closeMenu();
    void this.layerManager?.zoomToLayer(id);
  }

  private _closeMenu(): void {
    this._openMenuId = null;
    if (this._menuPortalEl) this._menuPortalEl.open = false;
  }

  private _toggleMenu(layer: LayerItem, event: MouseEvent) {
    if (this._openMenuId === layer.id) {
      this._closeMenu();
      return;
    }
    this._openMenuId = layer.id;
    this._openMenuPortal(layer, event.currentTarget as HTMLElement);
  }

  // Menu icerigini/konumunu portal instance'ina yazar -- bkz.
  // layer-list/LayerMenuPortal.ts WHY yorumu (panel-body'nin yatay kirpmasindan
  // kacinmak icin document.body'ye portallanmis TEK instance). Hangi
  // aksiyonlarin hangi sirada gorunecegine karar veren mantik GC-03 yardimci
  // sinif cikarma plani Faz 2'de layer-list/LayerMenuActions.ts'e tasindi --
  // burada SADECE LayerManager sorgularini flags/callbacks'e cozup
  // pozisyonu hesaplayip portala yazmak kalir.
  private _openMenuPortal(layer: LayerItem, anchor: HTMLElement): void {
    if (!this._menuPortalEl) return;
    const rect = anchor.getBoundingClientRect();
    const analysisResult = this.layerManager?.isAnalysisResult(layer.id) ?? layer.analysisResult;
    this._menuPortalEl.actions = buildLayerMenuActions(
      { styleMode: layer.styleMode, layerType: layer.layerType },
      {
        styleEditorAvailable: this._styleEditorAvailable,
        legendAvailable: this._legendAvailable,
        layerExportAvailable: this._layerExportAvailable,
        isAnalysisResult: analysisResult,
        isGeoTiffExportAvailable: this.layerManager?.isGeoTiffExportAvailable(layer.id) ?? false,
      },
      {
        zoomToLayer: () => this._zoomToLayer(layer.id),
        bringToFront: () => this._bringToFront(layer.id),
        remove: () => this._remove(layer.id),
        openStyleEditor: () => this._openStyleEditor(layer),
        toggleLegend: () => this._toggleLegend(layer.id),
        exportLayer: () => this._exportLayer(layer),
        exportLayerKml: () => this._exportLayerKml(layer),
        exportLayerShapefile: () => this._exportLayerShapefile(layer),
        exportLayerAsGeoTiff: () => this._exportLayerAsGeoTiff(layer),
      },
    );
    this._menuPortalEl.x = rect.right + 4;
    this._menuPortalEl.y = rect.top;
    this._menuPortalEl.open = true;
  }

  private _openStyleEditor(layer: LayerItem) {
    this._closeMenu();
    this._overlayCoordinator.closeOthers("styleEditor");
    this._styleEditorPortal.element?.openFor(
      layer.id,
      layer.title,
      layer.layerType,
      layer.fill,
      layer.opacity,
    );
  }

  private _toggleLegend(id: string) {
    this._closeMenu();
    const next = new Set(this._legendOpenIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this._legendOpenIds = next;
  }

  private _exportLayer(layer: LayerItem) {
    this._closeMenu();
    if (!this.layerManager) return;
    this._layerExportMarker?.exportLayer(this.layerManager, layer.id, layer.title);
  }

  /** Analiz sonucu katmanı KML indirir. Çizim menüsü bu yolu kullanmaz. */
  private _exportLayerKml(layer: LayerItem) {
    this._closeMenu();
    if (!this.layerManager) return;
    this._layerExportMarker?.exportLayerKml(this.layerManager, layer.id, layer.title);
  }

  /** Analiz sonucu katmanı Shapefile zip indirir. Çizim menüsü bu yolu kullanmaz. */
  private _exportLayerShapefile(layer: LayerItem) {
    this._closeMenu();
    if (!this.layerManager) return;
    this._layerExportMarker?.exportLayerShapefile(this.layerManager, layer.id, layer.title);
  }

  // GeoJSON export'un (yukarisi) aksine gercek bir ag istegi -- basarisiz
  // olabilir (sunucu erisilemez/CORS/beklenmedik yanit). Bu panelde asenkron
  // islemler icin bir bildirim/toast mekanizmasi yok; MVP kapsaminda hata
  // sessizce konsola loglanir (TucbsMapPreview.ensureApiKeyValid() ile AYNI
  // "yakala ve logla" deseni) -- kullanici indirmenin gerceklesmedigini
  // sadece tarayicida bir indirme baslamamasindan anlar.
  private async _exportLayerAsGeoTiff(layer: LayerItem) {
    this._closeMenu();
    if (!this.layerManager) return;
    this._geoTiffExportingId = layer.id;
    try {
      await this._layerExportMarker?.exportLayerAsGeoTiff(
        this.layerManager,
        layer.id,
        layer.title,
      );
    } catch (err) {
      console.error("[tucbs-layer-list] GeoTIFF export başarısız:", err);
    } finally {
      this._geoTiffExportingId = null;
    }
  }

  // GC-03 Adim 5 (Faz 2): pointer/DOM mekanigi layer-list/DragReorder.ts'e
  // tasindi (bkz _dragReorder alani) -- burada SADECE is mantigi kalir:
  // surukleme bittiginde yeni sirayi `_layers`'a uygulamak ve
  // `LayerManager.reorder()` cagirmak. ORIJINAL _endDrag'in TEK SATIR
  // davranis degisikligi OLMADAN tasinmis son yarisi.
  private _applyReorder(draggedId: string | undefined, nextId: string | undefined): void {
    const oldIndex = this._layers.findIndex((layer) => layer.id === draggedId);
    const dragged = oldIndex === -1 ? undefined : this._layers[oldIndex];
    if (!dragged) return;

    const rest = this._layers.filter((layer) => layer.id !== draggedId);
    const insertIndex = nextId
      ? rest.findIndex((layer) => layer.id === nextId)
      : -1;
    const newIndex = insertIndex === -1 ? rest.length : insertIndex;

    rest.splice(newIndex, 0, dragged);
    this._layers = rest;

    if (newIndex !== oldIndex) {
      // Eskiden burada tek-adimlik raise()/lower() cagrilari, KARISIK
      // (imagery + dataSource) listedeki HAM index farki kadar bir
      // dongude tekrarlaniyordu -- bu, suruklenen katman ile aralarindaki
      // FARKLI TURDEN (ör. WMS ile GEOJSON) katmanlari da adim sayisina
      // dahil ediyordu. Cesium'da imagery (WMS/WMTS/WCS) ve dataSource
      // (GEOJSON/KML/WFS/...) AYRI koleksiyonlardir ve imageryLayers[0]
      // HER ZAMAN basemap'e ayrilmistir (bkz Map.setBasemap); fazladan
      // sayilan bir adim, katman basemap'in hemen ustundeyken onunla YER
      // DEGISTIRIP katmani basemap'in ALTINA (goruntu olarak TAMAMEN
      // kaybolacagi bir konuma) itiyordu -- SADECE TucbsServiceUpload'tan
      // (WMS/WMTS/WCS, imagery) eklenen katmanlarda gorulup
      // TucbsFileUpload'tan (dataSource) eklenenlerde gorulmemesinin
      // sebebi tam olarak bu (bkz kullanici bildirimi). LayerManager.
      // reorder() artik TUM listeyi (`this._layers`'in guncel sirasi) tek
      // seferde, her katmani KENDI koleksiyonu icinde dogru konuma
      // yerlestirerek uygular -- bkz o metodun WHY yorumu.
      this.layerManager?.reorder(this._layers.map((layer) => layer.id));
    }
  }

  /** Bileşenin şablonunu render eder (`layerManager` bağlanmamışsa tamamen gizli kalır). */
  override render() {
    // Haritaya baglanmadiysa (mapElementId verilmedi/bulunamadi ve
    // layerManager programatik atanmadi) bilesen tamamen gizli kalir; boylece
    // "yanlissa yanlis gorunme" yerine "baglantisiz -> hicbir sey gorunmez".
    if (!this.layerManager) return nothing;

    // "tucbs-slide-over-panel" HER ZAMAN mount edilir (acik/kapali sadece
    // ".open" ile kontrol edilir) -- Ayarlar panelindeki AYNI desen (bkz. o
    // dosyanin WHY yorumu): panel DOM'dan kosullu olarak kaldirilip
    // eklenseydi, CSS transition'in "kapali (ekran disi)" baslangic
    // durumunu goremeyip aninda/animasyonsuz belirirdi. `side="left"` ile
    // Ayarlar panelinin ("side="right", varsayilan) TAM TERSI yonden
    // (soldan, saga dogru) acilir -- kullanici istegi: "Ayarlar paneli
    // nasil sola aciliyorsa, Katman Yonetimi de sagaa acilsin".
    return html`
      ${!this._open
        ? html`
            <button
              type="button"
              class="toggle-btn"
              @click=${() => this._openPanel()}
            >
              Katmanları Göster
              <span class="toggle-arrow" aria-hidden="true"
                >${ICON_CHEVRON_RIGHT}</span
              >
            </button>
          `
        : nothing}
      <tucbs-slide-over-panel
        side="left"
        panelTitle="Katman Yönetimi"
        panel-width=${this.panelWidth}
        .open=${this._open}
        .onCloseRequest=${() => this._closePanel()}
      >
        <span slot="icon">${ICON_LAYERS}</span>
        ${this._renderHeader()}

        <div class="layer-list">
          ${this._layers.length === 0
            ? html`<div class="layer-empty">Katman yok</div>`
            : repeat(
                this._layers,
                (layer) => layer.id,
                (layer) => this._renderLayerRow(layer),
              )}
        </div>
      </tucbs-slide-over-panel>
    `;
  }

  private _renderHeader() {
    if (
      !this._fileUploadAvailable &&
      !this._serviceUploadAvailable &&
      !(this._authorizedLayersAvailable && this._hasApiKey)
    ) {
      return nothing;
    }
    return html`
      <div class="header-actions">
        ${this._fileUploadAvailable
          ? html`
              <button
                type="button"
                class="add-btn"
                data-tooltip="Veri Dosyası Ekle"
                aria-label="Veri Dosyası Ekle"
                @click=${() => this._openUpload()}
              >
                ${ICON_DOCUMENT_BLANK}
              </button>
            `
          : ""}
        ${this._serviceUploadAvailable
          ? html`
              <button
                type="button"
                class="add-btn"
                data-tooltip="Coğrafi Veri Servisi Ekle"
                aria-label="Coğrafi Veri Servisi Ekle"
                @click=${() => this._openServiceUpload()}
              >
                ${ICON_CLOUD_DOWNLOAD}
              </button>
            `
          : ""}
        ${this._authorizedLayersAvailable && this._hasApiKey
          ? html`
              <button
                type="button"
                class="add-btn"
                data-tooltip="APIKey ile Yetkili Katmanlarımı Getir"
                aria-label="APIKey ile Yetkili Katmanlarımı Getir"
                ?disabled=${this._authorizedLayersFetching}
                @click=${() => this._openAuthorizedLayers()}
              >
                ${ICON_API_KEY}
              </button>
            `
          : ""}
      </div>
    `;
  }

  private _renderLayerRow(layer: LayerItem) {
    const sliderValue = layer.opacity * 100;
    const pct = Math.round(sliderValue);

    return html`
      <div class="layer-item" data-layer-id=${layer.id}>
        <div class="layer-row">
          <button
            type="button"
            class="drag-handle"
            data-tooltip="Sürükleyerek Sırala"
            aria-label="${layer.title} katmanını sırala"
            @pointerdown=${(event: PointerEvent) => {
              const handle = event.currentTarget as HTMLElement;
              const item = handle.closest(".layer-item");
              const list = item?.closest(".layer-list");
              if (item instanceof HTMLElement && list instanceof HTMLElement) {
                this._dragReorder.start(event, item, handle, list);
              }
            }}
          >
            ${ICON_DRAG_HANDLE}
          </button>

          <cds-checkbox
            .checked=${layer.visible}
            aria-label=${layer.title}
            @cds-checkbox-changed=${(
              event: CustomEvent<{ checked?: boolean }>,
            ) => {
              const checked = event.detail?.checked ?? !layer.visible;
              this._setVisible(layer.id, !!checked);
            }}
          ></cds-checkbox>

          ${layer.layerType !== "DRAWING" && layer.layerType !== "MEASURE"
            ? html`
                <span
                  class="layer-color-dot"
                  style="background:${layer.fill}"
                  title=${layer.styleMode === "solid"
                    ? "Katman rengi"
                    : "Katman rengi (yalnız sabit renk modunda değiştirilebilir)"}
                >
                  <input
                    type="color"
                    .value=${toHexColor(layer.fill)}
                    ?disabled=${layer.styleMode !== "solid"}
                    aria-label="${layer.title} rengi"
                    @input=${(event: Event) => {
                      this._setLayerColor(
                        layer.id,
                        (event.target as HTMLInputElement).value,
                      );
                    }}
                  />
                </span>
              `
            : ""}
          <span class="layer-name" title=${layer.title}>${layer.title}</span>

          <div class="layer-actions">
            <div class="layer-options">
              <button
                type="button"
                class="options-btn"
                aria-label=${this._geoTiffExportingId === layer.id
                  ? "GeoTIFF İndiriliyor…"
                  : "Katman Seçenekleri"}
                aria-haspopup="menu"
                aria-expanded=${this._openMenuId === layer.id}
                ?disabled=${this._geoTiffExportingId === layer.id}
                @click=${(event: MouseEvent) => {
                  this._hidePortalTooltip();
                  this._toggleMenu(layer, event);
                }}
                @mouseenter=${(event: MouseEvent) =>
                  this._showPortalTooltip(
                    event.currentTarget as HTMLElement,
                    this._geoTiffExportingId === layer.id
                      ? "GeoTIFF İndiriliyor…"
                      : "Katman Seçenekleri",
                  )}
                @mouseleave=${() => this._hidePortalTooltip()}
                @focus=${(event: FocusEvent) =>
                  this._showPortalTooltip(
                    event.currentTarget as HTMLElement,
                    this._geoTiffExportingId === layer.id
                      ? "GeoTIFF İndiriliyor…"
                      : "Katman Seçenekleri",
                  )}
                @blur=${() => this._hidePortalTooltip()}
              >
                ${this._geoTiffExportingId === layer.id
                  ? html`<span class="options-btn-spinner"></span>`
                  : ICON_OVERFLOW_MENU}
              </button>
            </div>
          </div>
        </div>

        ${layer.layerType !== "DRAWING" && layer.layerType !== "MEASURE"
          ? html`
              <div class="layer-opacity-row">
                <span class="layer-opacity-pct">%${pct}</span>
                <input
                  type="range"
                  class="opacity-slider"
                  min="0"
                  max="100"
                  step="0.1"
                  .value=${String(sliderValue)}
                  style="--fill: ${sliderValue}%"
                  @input=${(event: Event) => {
                    const input = event.target as HTMLInputElement;
                    const value = Number(input.value);
                    this._updateOpacitySlider(input, value);
                    this._setOpacity(layer.id, value / 100);
                  }}
                />
              </div>
            `
          : ""}

        ${this._legendAvailable &&
        layer.styleMode !== "solid" &&
        this._legendOpenIds.has(layer.id)
          ? html`<tucbs-legend-panel
              layerId=${layer.id}
              layerType=${layer.layerType}
              .layerManager=${this.layerManager}
              .open=${true}
              .customCss=${this._legendMarker?.customCss ?? ""}
            ></tucbs-legend-panel>`
          : ""}
      </div>
    `;
  }
}
