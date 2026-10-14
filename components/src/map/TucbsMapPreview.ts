import { LitElement, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { Color, Math as CesiumMath } from "cesium";
import {
  ZoomIn16 as ZoomInIcon,
  ZoomOut16 as ZoomOutIcon,
} from "@carbon/icons";
import {
  Map,
  DEFAULT_INITIAL_EXTENT,
  HGM_BASEMAP_IDS,
  ApiKeyValidationError,
  ensureEffectiveApiKeyValid,
  getUcbpApiBase,
  registerApiKeyRefresh,
  LayerOperationError,
  type BasemapId,
  type LayerType,
  type ManagedLayer,
  type WMSLayerOptions,
  type WMTSLayerOptions,
  type WFSLayerOptions,
  type WCSLayerOptions,
  type GeoTiffLayerOptions,
  type LocalLayerOptions,
} from "@tucbs/core";
import { previewViewerPool } from "./PreviewViewerPool.js";
import { mapPreviewStyles } from "./mapPreviewStyles.js";
import { AsyncGeneration } from "../shared/util/AsyncGeneration.js";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { zoomInProportional, zoomOutProportional } from "../shared/util/CameraZoom.js";

const ICON_ZOOM_IN = unsafeSVG(iconNodeToString(ZoomInIcon));
const ICON_ZOOM_OUT = unsafeSVG(iconNodeToString(ZoomOutIcon));

// Karo (tile) tabanli katman turleri — bunlar icin "hazir" olmak agdan karo
// gelmesini bekler (bkz. _waitForTilesLoaded). DataSource tabanli turler
// (WFS/GEOJSON/KML/KMZ/SHP/CSV) icin _addLayer()'in await'i zaten yeterlidir.
const IMAGERY_LAYER_TYPES: ReadonlySet<LayerType> = new Set([
  "WMS",
  "WMTS",
  "WCS",
  "GEOTIFF",
  "XYZ",
]);

// zoomToLayer=true iken (bkz asagidaki property) "globe'u tam kaplayan"
// (kendi konumu OLMAYAN, ornegin bir WCS'in kesfedilemeyip varsayilan
// -180/-90/180/90'a dusen rectangle'i, ya da GERCEKTEN dunya geneli bir WMS
// katmani -- "World continents" gibi) katmanlar icin LayerManager.
// zoomToLayer() kamerayi TUM GEZEGENI gorecek kadar uzaklastirirdi -- bu
// "onizleme" olarak ISE YARAMAZ (bkz kullanici bildirimi). Boyle katmanlar
// icin bunun yerine varsayilan Turkiye gorunumune (DEFAULT_INITIAL_EXTENT)
// dusulur; SADECE kendi ozel/yerel bir kapsama alani olan katmanlar
// (coğunluk) gercekten kendi konumuna yaklastirilir. Esikler tam 360°/180°
// DEGIL: bir WMS katmani (orn. EPSG:3857 tabanli) genelde -85.06..85.06
// enlem araligi bildirir (Web Mercator'un matematiksel siniri) -- bu hala
// "kuresel" sayilmali.
const GLOBAL_LONGITUDE_SPAN_THRESHOLD = CesiumMath.toRadians(350);
const GLOBAL_LATITUDE_SPAN_THRESHOLD = CesiumMath.toRadians(160);

// DataSource'lar (vektor katmanlar -- GeoJSON/KML/.../WFS) icin bu kavram
// gecerli degil (entity'lerin gercek konumundan hesaplanir, "varsayilan
// global rectangle" diye bir sey yok) -- SADECE ImageryLayer'lar (raster/
// servis katmanlari) icin kontrol edilir, bkz IMAGERY_LAYER_TYPES.
function isGloballyExtentedLayer(managed: ManagedLayer): boolean {
  const cesiumObject = managed.cesiumObject;
  if (!("imageryProvider" in cesiumObject)) return false;
  const rectangle = cesiumObject.imageryProvider?.rectangle;
  if (!rectangle) return false;
  const lonSpan = rectangle.east - rectangle.west;
  const latSpan = rectangle.north - rectangle.south;
  return (
    lonSpan >= GLOBAL_LONGITUDE_SPAN_THRESHOLD &&
    latSpan >= GLOBAL_LATITUDE_SPAN_THRESHOLD
  );
}

/** `<tucbs-map-preview>`'in `layer` property'sinin kabul ettigi sekil — `LayerManager.add()` ile ayni {layerType, options} eslesmesini bilerek yansitir. */
export interface PreviewLayerSpec {
  /** Katmanın veri kaynağı/servis türü. */
  readonly layerType: LayerType;
  /** `layerType`'a karşılık gelen katman seçenekleri (`LayerManager.add()` ile aynı eşleşme). */
  readonly options:
    | WMSLayerOptions
    | WMTSLayerOptions
    | WFSLayerOptions
    | WCSLayerOptions
    | GeoTiffLayerOptions
    | LocalLayerOptions;
}

// Karar: HGM altlik haritalari "acik servis" SAYILMAZ -- apiKey olmadan/
// gecersizken bu ID'lerden biri yuklenmeyecek (bkz TucbsMap.ts Faz 1 ayni
// karar). Custom/3.taraf bir tile URL'i (BasemapId'nin izin verdigi keyfi
// string) bu kapsamin DISINDA -- HGM proxy'sine hic gitmiyor (bkz
// Map.ts resolveBasemapUrl()'un default dalinda dogrudan URL olarak kullanilmasi).
const HGM_GATED_BASEMAP_IDS: ReadonlySet<string> = new Set(HGM_BASEMAP_IDS);

let tucbsMapPreviewInstanceCounter = 0;

/**
 * Bagimsiz, canli mini-Cesium onizleme bileseni. `TucbsMap`'ten farkli olarak
 * disaridan hicbir map/layerManager referansi almaz — kendi Core JS API `Map`
 * instance'ini kendi icinde olusturur (mevcut/ana haritadan tamamen bagimsiz,
 * ikinci bir Cesium Viewer).
 *
 * WHY (gorunurluk tabanli lazy-mount + paylasilan LRU havuzu): sayfada 10+
 * eszamanli aktif Viewer WebGL context limitini asabilir. Bu yuzden Viewer
 * sadece bilesen ekranda gorunurken kurulur; havuz doluysa en eski kullanilan
 * onizleme otomatik pasiflestirilir (bkz. map/PreviewViewerPool.ts).
 *
 * @example
 * ```html
 * <tucbs-map-preview
 *   api-key="YOUR_API_KEY"
 *   basemap="hgm-temel"
 *   width="320px"
 *   height="220px"
 *   layer-options='{"layerType":"WMS","options":{"id":"world-continents","title":"World Continents (WMS)","url":"https://demo.mapserver.org/cgi-bin/wms","layers":"continents","version":"1.3.0"}}'
 * ></tucbs-map-preview>
 * ```
 */
@customElement("tucbs-map-preview")
export class TucbsMapPreview extends LitElement {
  private readonly _autoId = `tucbs-map-preview-${++tucbsMapPreviewInstanceCounter}`;
  private get hostId(): string {
    return this.id || this._autoId;
  }

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===

  /** Önizlenen katman için API anahtarı; write-only (okuma her zaman maskelenmiş bir değer döner). */

  // Bu component ana <tucbs-map>'ten TAMAMEN BAGIMSIZ, kendi Map
  // instance'ini kuruyor (bkz. _mountMap()) -- yani apiKey'i ana haritadan
  // MIRAS ALMAZ, ayri ayri verilmesi gerekir. Onizlenen katman (apiKey
  // gerektiren "yetkili kurum" bir WMS olabilir) icin bu property olmadan
  // önizleme anahtarsiz kalirdi.
  // `#apiKey` GERCEK ES private field'inda tutulur, get/set cifti TucbsMap.ts
  // ile AYNI "write-only" deseni uygular (bkz o dosyadaki yorum) -- disaridan
  // okuma maskelenir, sadece _mountMap() (asagida, GERCEK #apiKey ile) gercek
  // degeri kullanir.
  #apiKey = "";
  @property({ attribute: "api-key" })
  set apiKey(value: string) {
    const old = this.#apiKey;
    this.#apiKey = value;
    this.requestUpdate("apiKey", old);
  }
  get apiKey(): string {
    return this.#apiKey ? "••••••" : "";
  }
  /** Gösterilecek altlık harita (basemap) kimliği. */
  @property() basemap: BasemapId = "hgm-temel";
  // Degistiginde: aktifken previewMap.setBasemap() otomatik cagirilir.

  /** Harita görünüm modu ("2D" veya "3D"). */
  @property() mode: "2D" | "3D" = "2D";
  // Varsayilan 2D — hem onizleme icin yeterli hem de kaynak-tasarruflu (3D
  // globe aydinlatma/atmosfer maliyeti olusmaz).

  /** Önizleme kutusunun CSS genişliği (ör. "300px"). */
  @property() width = "300px";

  /** Önizleme kutusunun CSS yüksekliği (ör. "200px"). */
  @property() height = "200px";

  /** Önizlenecek katman tanımı (`{layerType, options}`) — bkz. `PreviewLayerSpec`. */
  @property({ type: Object }) layer: PreviewLayerSpec | undefined;
  // Set/degisince: onceki onizleme katmani kaldirilir, yenisi eklenir — kamera
  // KASITLI OLARAK katmana zoom yapmaz, her zaman DEFAULT_INITIAL_EXTENT'te
  // (Turkiye) sabit kalir (bkz. _syncLayer()). Hem LOCAL (GeoJSON/KML/KMZ/
  // SHP/CSV) hem REMOTE (WMS/WMTS/WFS/WCS/GeoTIFF) katmanlari kapsar.

  /** `layer` ile aynı şekle sahip, HTML attribute (`layer-options`) üzerinden JSON string olarak verilebilen alternatif katman tanımı; ikisi de doluysa bu önceliklidir. */
  @property({ type: Object, attribute: "layer-options" }) layerOptions:
    | PreviewLayerSpec
    | undefined;
  // `layer` ile ayni sekle ({layerType, options}) sahip, EK bir property —
  // `TucbsMap.mapOptions` deseniyle ayni: `{type: Object}` oldugundan Lit
  // HTML attribute olarak verilen JSON string'i otomatik JSON.parse() eder
  // (ör. index.html icinde <tucbs-map-preview layer-options='{"layerType":...}'>).
  // Ikisi de doluysa layerOptions oncelikli sayilir (bkz. _syncLayer()).
  /** Yakınlaştır/uzaklaştır butonlarının gösterilip gösterilmeyeceği. */
  @property({
    attribute: "show-zoom-buttons",
    converter: (value) => value !== "false",
  })
  showZoomButtons = true;
  // false verilirse yakinlastir/uzaklastir butonlari hic render edilmez.
  // `type: Boolean` KULLANILMIYOR: Lit'in yerlesik Boolean donusturucusu native
  // HTML boolean attribute semantigini izler (deger degil, SADECE var/yok olma
  // durumuna bakar — show-zoom-buttons="false" bile "var" oldugu icin true'ya
  // cevrilirdi). Bunun yerine attribute'un string degerine gercekten bakan
  // ozel bir converter kullanilir.

  /** true ise katman eklendiğinde kamera, sabit varsayılan görünüm yerine katmanın kendi konumuna yaklaştırılır (varsayılan false). */
  @property({ type: Boolean, attribute: "zoom-to-layer" }) zoomToLayer = false;
  // true ise _syncLayer() kamerayi HER ZAMAN DEFAULT_INITIAL_EXTENT'e (Turkiye)
  // sabitlemek yerine, katman eklendiginde LayerManager.zoomToLayer() ile o
  // katmanin GERCEK konumuna yaklastirir (bkz asagidaki _syncLayer) -- AMA
  // SADECE kendi ozel/yerel bir kapsama alani varsa. Globe'u tam (ya da
  // neredeyse tam) kaplayan katmanlar (bkz isGloballyExtentedLayer) icin bu
  // "yaklasma" kamerayi TUM GEZEGENI gorecek kadar UZAKLASTIRIR, onizleme
  // olarak ise yaramaz -- bu durumda yine Turkiye gorunumune dusulur.
  // Varsayilan false: bu bilesenin mevcut/diger tuketicileri (varsa) BUNDAN
  // ETKILENMEZ, sadece acikca isteyen (bkz TucbsServiceUpload._ensurePreviewEl)
  // true verir.
  // `type: Boolean` burada GUVENLI: bu ozellik SADECE JS property atamasiyla
  // (el.zoomToLayer = true) kullanilmasi bekleniyor, showZoomButtons'taki HTML
  // attribute-string gotcha'sina maruz kalmiyor.

  // === Internal State ===
  @state() private _active = false;
  @state() private _mapInstance: Map | null = null;
  @state() private _loading = false;
  // WFS gibi bazi katmanlar (once GeoJSON, basarisiz olursa GML+donusum
  // denemesi — bkz. LayerManager) agdan veri cekmek icin uzun surebiliyor;
  // bu sure boyunca .preview-box'ta bir spinner gosterilir (bkz. render()).
  // _syncLayer basina true'ya cekilip finally'de false'a doner.
  private _observer: IntersectionObserver | undefined;
  private _resizeObserver: ResizeObserver | undefined;
  private _currentLayerId: string | undefined;
  // apiKey (instance veya global) hicbir Lit property'sini DEGISTIRMEDEN
  // sonradan gecerli hale gelebilir (orn. configureTucbs() gec cagrilirsa) --
  // bu durumda updated()'daki changed.has("apiKey") kontrolu (property DEGERI
  // hic degismedigi icin) HABERSIZ kalir. registerApiKeyRefresh() bu tek
  // canli bildirim kanalidir (bkz core/config.ts WHY yorumu).
  private _unregisterApiKeyRefresh: (() => void) | undefined;
  @state() private _basemapBlocked = false;
  // apiKey gerektiren bir HGM altligi, apiKey yok/gecersiz oldugu icin
  // yuklenmediginde true -- bkz _syncBasemap().

  /** Bileşenin kendi bağımsız Core JS API `Map` instance'ı (bileşen aktif değilken `null`). */
  get map(): Map | null {
    return this._mapInstance;
  }

  /** Shadow DOM yerine Light DOM kullanır (Cesium widgets.css'in sızabilmesi için, bkz aşağıdaki WHY yorumu). */
  protected override createRenderRoot(): HTMLElement {
    // Cesium'un widgets.css'i document <head>'e enjekte ediliyor; Shadow DOM
    // kullanilirsa bu global stil sizmaz ve canvas 0x0 kalir (TucbsMap ile ayni sebep).
    return this;
  }

  /** Lit lifecycle: bileşen DOM'a bağlandığında görünürlük tabanlı lazy-mount için IntersectionObserver kurar. */
  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.id) this.id = this._autoId;
    this._observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        this._requestActivate();
      } else {
        this._requestDeactivate();
      }
    });
    this._observer.observe(this);
  }

  /** Lit lifecycle: bileşen DOM'dan kaldırıldığında observer'ı durdurur ve haritayı deaktive eder. */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._requestDeactivate();
  }

  /** Lit lifecycle: `basemap`/`mode`/`apiKey`/`layer`/`layerOptions` değişikliklerine göre haritayı senkronize eder. */
  override updated(changed: PropertyValues): void {
    if (!this._mapInstance) return;
    // apiKey degisimi de basemap ile AYNI kosula eklendi: instance apiKey
    // sonradan set edilirse (orn. TucbsServiceUpload/TucbsLayerList'in push
    // mekanizmasi gec tetiklenirse) VEYA configureTucbs() global anahtari
    // sonradan gelirse, ilk mount aninda bloklanmis bir basemap SESSIZCE
    // kilitli kalmasin diye _syncBasemap() burada yeniden calistirilir.
    if (changed.has("basemap") || changed.has("apiKey")) void this._syncBasemap();
    if (changed.has("mode")) this._mapInstance.setMode(this.mode);
    if (changed.has("layer") || changed.has("layerOptions")) {
      void this._syncLayer();
      void this._syncBasemap();
    }
  }

  // === Gorunurluk tabanli lazy-mount ===

  private _requestActivate(): void {
    if (this._active) {
      previewViewerPool.touch(this.hostId);
      return;
    }
    previewViewerPool.activate(this.hostId, () => this._deactivate());
    this._active = true;
    void this.updateComplete.then(() => this._mountMap());
  }

  private _requestDeactivate(): void {
    if (!this._active) return;
    previewViewerPool.release(this.hostId);
    this._deactivate();
  }

  private _mountMap(): void {
    if (this._mapInstance || !this._active) return;
    const container = this.renderRoot.querySelector(
      `#${this.hostId}-host`,
    ) as HTMLElement | null;
    if (!container) return;

    this._mapInstance = new Map(container, {
      // TucbsMap.ts'teki AYNI korumayla (bkz o dosyadaki new Map() cagrisi):
      // "" (apiKey hic verilmemis) burada KOSULSUZ gecirilirse Map/LayerManager
      // bunu "bos bir key VERILDI" sanip (yalnizca undefined ile karsilastirir)
      // OGC istekleri icin dogrudan yerine yerel /wms-proxy'yi zorunlu kilar --
      // apiKey gerektirmeyen acik/genel WMS/WMTS servisleri boylece
      // gereksiz yere key isteyen bir proxy'ye takilip kalirdi.
      ...(this.#apiKey ? { apiKey: this.#apiKey } : {}),
      // basemap KASITLI OLARAK burada verilmiyor (bkz asagidaki _syncBasemap()
      // cagrisi) -- HGM altliklari icin apiKey dogrulanmadan hicbir karo istegi
      // atilmasin diye (bkz HGM_GATED_BASEMAP_IDS).
      timeline: false,
      animation: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: false,
    });
    this._mapInstance.setMode(this.mode);
    // Kucuk onizleme kutusu icin gereksiz piksel render'ini azaltir (resolutionScale=0.75).
    // resolutionScale bir Viewer constructor secenegi degil, calisma zamani property'si
    // oldugundan mevcut Map.setQuality() araciligiyla ayarlanir.
    this._mapInstance.setQuality(75);
    // Basemap karolari yuklenmeden once Cesium'un globe'u varsayilan (koyu
    // mavi) bir "okyanus" renginde cizilir; bu, onizleme kutusunun kendi
    // placeholder arka planiyla (.preview-box background) uyusmayip kisa bir
    // renk "flash"i gibi goruluyordu. Ayni notru rengi burada da kullanarak
    // gecis gorunmez hale getirilir.
    this._mapInstance.viewer.scene.globe.baseColor =
      Color.fromCssColorString("#f4f4f4");
    // Cesium, canvas boyutunu SADECE constructor aninda container'in o anki
    // clientWidth/clientHeight'ini okuyarak belirler ve sonrasinda KENDILIGINDEN
    // takip etmez (bkz. viewer.resize()). Bu bilesen ilk render'inda genellikle
    // henuz layout tamamlanmadan (flex/dialog ic ice yerlesimlerde container
    // hala 0x0 olabiliyor) mount edildigi icin canvas 0x0 boyutunda kalip hicbir
    // sey cizilmiyordu. ResizeObserver, observe() cagrildiktan hemen sonra bir
    // kez GARANTI olarak (gercek boyut ne olursa olsun) ve sonrasinda her
    // gercek boyut degisiminde tetiklenir; bu yuzden zamanlamaya guvenmek
    // yerine dogrudan bunu kullanmak en saglam cozum. Kamera da HER resize'da
    // yeniden DEFAULT_INITIAL_EXTENT'e fit edilir — cunku Rectangle.setView
    // ile yapilan kamera konumlandirmasi viewport'un o anki en/boy oranina
    // baglidir: ilk mount aninda (henuz nihai boyuta ulasilmadan) hesaplanan
    // kamera, boyut sonradan (dialog ile esitlenince) degisince HAFIFCE
    // kaymis gorunuyordu.
    this._resizeObserver = new ResizeObserver(() => {
      this._mapInstance?.resize();
      this._mapInstance?.setExtent(DEFAULT_INITIAL_EXTENT);
    });
    this._resizeObserver.observe(container);
    // Instance apiKey verilmis olsa da kosulsuz abone olunur -- _syncBasemap()
    // zaten ensureEffectiveApiKeyValid() ile dogru onceligi (instance > global)
    // koruyarak calisir, gereksiz bir rotasyonda tekrar cagrilmasi zararsizdir.
    this._unregisterApiKeyRefresh = registerApiKeyRefresh(() => {
      void this._syncBasemap();
    });
    void this._syncBasemap();
    void this._syncLayer();
  }

  private _deactivate(): void {
    this._active = false;
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    this._unregisterApiKeyRefresh?.();
    this._unregisterApiKeyRefresh = undefined;
    this._mapInstance?.destroy();
    this._mapInstance = null;
    this._currentLayerId = undefined;
  }

  // === Basemap senkronizasyonu ===

  // basemap uygulamanin TEK noktasi -- hem ilk mount'ta (_mountMap) hem de
  // runtime'da basemap property'si degisince (updated()) buradan gecer.
  // HGM_GATED_BASEMAP_IDS'te olmayan (acik/custom) bir basemap icin apiKey
  // dogrulamasi hic yapilmaz, dogrudan uygulanir. Gated bir HGM id'si icin
  // ensureEffectiveApiKeyValid() ile instance-veya-global apiKey birlikte
  // cozulup dogrulanir (TucbsMap._prepareMap() ile ayni mekanizma) --
  // basarisizsa hicbir karo istegi atilmadan _basemapBlocked true'ya cekilir
  // (bkz render()'daki gosterge).
  private async _syncBasemap(): Promise<void> {
    const map = this._mapInstance;
    if (!map) return;
    if (!HGM_GATED_BASEMAP_IDS.has(this.basemap)) {
      this._basemapBlocked = false;
      map.setBasemap(this.basemap);
      return;
    }
    try {
      await ensureEffectiveApiKeyValid(
        this.#apiKey || undefined,
        getUcbpApiBase(),
      );
    } catch (err) {
      // ne instance ne global apiKey varsa (reason==="missing-key"): SADECE
      // gercekten ACIK bir katman onizleniyorsa (layer/layer-options verilmis
      // VE bu katmanin URL'i apiKey gerektiren bir desene uymuyorsa) basemap
      // SESSIZCE atlanir, katman onizlemesi engellenmez. Katman YOKSA VEYA
      // katmanin kendisi de apiKey gerektiriyorsa (o da zaten yuklenemeyecek)
      // alarm karti gosterilir. apiKey (instance veya global) VERILMIS ama
      // GECERSIZSE bu gercek bir yapilandirma hatasidir, katman olsa da
      // olmasa da uyari HER ZAMAN gosterilir.
      const noKeyAnywhere =
        err instanceof ApiKeyValidationError && err.reason === "missing-key";
      const spec = this.layerOptions ?? this.layer;
      const url = spec
        ? (spec.options as { readonly url?: string }).url
        : undefined;
      const layerIsOpen =
        !!spec && (!url || !map.layerManager.layerRequiresApiKey(url));
      this._basemapBlocked = !(noKeyAnywhere && layerIsOpen);
      map.setBasemap(null);
      return;
    }
    this._basemapBlocked = false;
    map.setBasemap(this.basemap);
  }

  // === Katman senkronizasyonu ===

  // Ayni anda iki _syncLayer() cagrisinin (kullanici hizlica bir katmandan
  // digerine gecerse) birbirinin isini bozmasini (yanlis katmani silme,
  // iki katmani ust uste birakma) onlemek icin her cagri kendi "nesil"
  // numarasini alir; await sonrasi nesil hala guncelse islem gecerlidir.
  private readonly _syncGeneration = new AsyncGeneration();

  private async _syncLayer(): Promise<void> {
    const map = this._mapInstance;
    if (!map) return;

    const generation = this._syncGeneration.next();
    const previousLayerId = this._currentLayerId;
    const spec = this.layerOptions ?? this.layer;

    if (!spec) {
      this._loading = false;
      if (previousLayerId) map.layerManager.removeLayer(previousLayerId);
      this._currentLayerId = undefined;
      map.setExtent(DEFAULT_INITIAL_EXTENT);
      return;
    }

    this._loading = true;
    try {
      // ESKI katman, YENI katman gercekten gorsel olarak hazir olana kadar
      // KASITLI OLARAK kaldirilmiyor — aksi halde (once sil, sonra ekle
      // sirasinda) kisa bir sure sadece basemap gorunup "flash" ediyordu.
      const managed = await this._addLayer(map, spec);
      if (!this._syncGeneration.isCurrent(generation)) {
        // Bu await surerken kullanici baska bir katmana gecmis (yeni bir
        // _syncLayer() cagrisi baslamis) — bu eski cagri artik gecersiz,
        // az once eklenen katmani hemen geri al ki ust uste kalmasin.
        map.layerManager.removeLayer(managed.id);
        return;
      }
      this._currentLayerId = managed.id;
      if (this.zoomToLayer && !isGloballyExtentedLayer(managed)) {
        // Katmanin GERCEK konumuna yaklasilir (bkz yukaridaki zoomToLayer
        // property yorumu) -- WMS icin Cesium'un kendi GetCapabilities'ten
        // okudugu, WCS icin TucbsServiceUpload'un DescribeCoverage +
        // proj4 reprojeksiyonuyla kurdugu rectangle'a dayanir. Katmanin
        // konumu HENUZ bilinmiyorsa (orn. WCS'te bbox kesfedilemedi)
        // LayerManager.zoomToLayer() false doner -- bu durumda sessizce
        // varsayilan (Turkiye) gorunume duser, onizleme HICBIR ZAMAN
        // "hicbir yere odaklanmamis" kalmaz.
        const zoomed = await map.layerManager
          .zoomToLayer(managed.id)
          .catch(() => false);
        if (!zoomed) map.setExtent(DEFAULT_INITIAL_EXTENT);
      } else {
        // Katman eklensin, kaldirilsin ya da hic olmasin FARK ETMEKSIZIN
        // kamera HER ZAMAN DEFAULT_INITIAL_EXTENT'e (Turkiye) zorlanir --
        // bu bilesenin varsayilan davranisi (bkz yukaridaki zoomToLayer
        // property yorumu).
        map.setExtent(DEFAULT_INITIAL_EXTENT);
      }

      if (IMAGERY_LAYER_TYPES.has(spec.layerType)) {
        // WMS/WMTS/WCS/GEOTIFF/XYZ: karo tabanli, agdan gelmesi zaman alabilir.
        // DataSource tabanli katmanlar (GeoJSON/KML/.../WFS) icin _addLayer()'in
        // await'i zaten "hazir" anlamina gelir (entity'ler bir sonraki karede
        // aninda cizilir), bu yuzden onlar icin ekstra bekleme gerekmez.
        await this._waitForTilesLoaded(map);
        if (!this._syncGeneration.isCurrent(generation)) return;
      }

      if (previousLayerId && previousLayerId !== this._currentLayerId) {
        map.layerManager.removeLayer(previousLayerId);
      }
    } finally {
      // Bu cagri hala GECERLI ("nesil" degismedi) ise spinner'i kapat. Eger
      // bu arada daha yeni bir _syncLayer() baslamissa (generation degisti),
      // o cagri kendi basinda _loading'i zaten true yapmistir — burada false
      // yaparsak YENI/gecerli yuklemenin spinner'ini erken kapatirdik.
      if (this._syncGeneration.isCurrent(generation)) this._loading = false;
    }
  }

  // globe.tilesLoaded, o anki kamera goruntusu icin (basemap + tum imagery
  // katmanlari dahil) bekleyen karo kalmadiginda true olur. Sonsuza kadar
  // beklememek icin (orn. kirik/yavas bir demo sunucusu) bir guvenlik
  // zaman asimi da var.
  private _waitForTilesLoaded(map: Map, timeoutMs = 5000): Promise<void> {
    return new Promise((resolve) => {
      const globe = map.viewer.scene.globe;
      if (globe.tilesLoaded) {
        resolve();
        return;
      }
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        globe.tileLoadProgressEvent.removeEventListener(onProgress);
        clearTimeout(timer);
        resolve();
      };
      const onProgress = (pending: number) => {
        if (pending === 0) finish();
      };
      globe.tileLoadProgressEvent.addEventListener(onProgress);
      // TimerBag BILEREK kullanilmaz: zaman asimi iptal edilirse karolar hic
      // bitmediginde Promise cozulmez, _waitForTilesLoaded'i bekleyen yukleme
      // akisi asili kalir ve tileLoadProgressEvent dinleyicisi kaldirilmaz.
      // eslint-disable-next-line no-restricted-syntax -- guvenlik zaman asimi Promise'i her durumda cozmeli (bkz ustteki yorum).
      const timer = setTimeout(finish, timeoutMs);
    });
  }

  private async _addLayer(
    map: Map,
    spec: PreviewLayerSpec,
  ): Promise<ManagedLayer> {
    switch (spec.layerType) {
      case "WMS":
        return map.layerManager.add("WMS", spec.options as WMSLayerOptions);
      case "WMTS":
        return map.layerManager.add("WMTS", spec.options as WMTSLayerOptions);
      case "WFS":
        return map.layerManager.add("WFS", spec.options as WFSLayerOptions);
      case "WCS":
        return map.layerManager.add("WCS", spec.options as WCSLayerOptions);
      case "GEOTIFF":
        return map.layerManager.add(
          "GEOTIFF",
          spec.options as GeoTiffLayerOptions,
        );
      case "GEOJSON":
      case "KML":
      case "KMZ":
      case "SHP":
      case "CSV":
        return map.layerManager.add(
          spec.layerType,
          spec.options as LocalLayerOptions,
        );
      case "XYZ":
        throw new LayerOperationError(
          "LAYER_PREVIEW_UNSUPPORTED_XYZ",
          "TucbsMapPreview: XYZ katmani onizlemede desteklenmiyor.",
        );
      case "DRAWING":
        throw new LayerOperationError(
          "LAYER_PREVIEW_UNSUPPORTED_DRAWING",
          "TucbsMapPreview: DRAWING katmani onizlemede desteklenmiyor.",
        );
      case "MEASURE":
        throw new LayerOperationError(
          "LAYER_PREVIEW_UNSUPPORTED_MEASURE",
          "TucbsMapPreview: MEASURE katmani onizlemede desteklenmiyor.",
        );
    }
  }

  // === Zoom butonlari ===
  // Cesium'un varsayilan zoomIn()/zoomOut() miktari (defaultZoomAmount=100000m)
  // kameranin o anki yuksekliginden BAGIMSIZ sabit bir mesafedir; kucuk bir
  // onizlemede yukseklik birkac yuz metreden (dar bir GeoJSON katmanina
  // odaklanmis) global olcege (WMS "continents" gibi) kadar degisebildigi
  // icin sabit deger bazen fark edilmeyecek kadar kucuk kaliyor. Bunun yerine
  // her tiklamada mevcut yuksekligin bir orani kadar hareket edilir.
  private static readonly ZOOM_STEP_RATIO = 0.5;

  private _zoomIn(): void {
    const viewer = this._mapInstance?.viewer;
    if (!viewer) return;
    zoomInProportional(
      viewer.camera,
      TucbsMapPreview.ZOOM_STEP_RATIO,
      viewer.scene.screenSpaceCameraController.minimumZoomDistance,
    );
  }

  private _zoomOut(): void {
    const viewer = this._mapInstance?.viewer;
    if (!viewer) return;
    zoomOutProportional(
      viewer.camera,
      TucbsMapPreview.ZOOM_STEP_RATIO,
      viewer.scene.screenSpaceCameraController.maximumZoomDistance,
    );
  }

  /** Bileşenin şablonunu render eder: önizleme kutusu, zoom butonları, yükleniyor/basemap-engellendi overlay'leri. */
  override render() {
    // <style> blogu ve neden static styles KULLANILMADIGI: bkz
    // map/mapPreviewStyles.ts (Faz 3.5b'de oraya tasindi).
    return html`
      ${mapPreviewStyles}
      <div
        class="preview-box"
        style="width: ${this.width}; height: ${this.height};"
      >
        ${this._active
          ? html`
              ${this.showZoomButtons
                ? html`
                    <div class="zoom-controls">
                      <button
                        class="zoom-button"
                        type="button"
                        aria-label="Yakınlaştır"
                        @click=${this._zoomIn}
                      >
                        ${ICON_ZOOM_IN}
                      </button>
                      <button
                        class="zoom-button"
                        type="button"
                        aria-label="Uzaklaştır"
                        @click=${this._zoomOut}
                      >
                        ${ICON_ZOOM_OUT}
                      </button>
                    </div>
                  `
                : null}
              <div id="${this.hostId}-host" class="map-host"></div>
              ${this._loading
                ? html`<div class="loading-overlay">
                    <div class="spinner"></div>
                  </div>`
                : null}
              ${!this._loading && this._basemapBlocked
                ? html`<div class="basemap-blocked-overlay" role="alert">
                    <div class="basemap-blocked-overlay__panel">
                      <p class="basemap-blocked-overlay__title">API Anahtarı Eksik</p>
                      <p class="basemap-blocked-overlay__msg">
                        Bu altlık harita için geçerli bir apiKey gereklidir.
                      </p>
                    </div>
                  </div>`
                : null}
            `
          : html`<div class="placeholder"></div>`}
      </div>
    `;
  }
}
