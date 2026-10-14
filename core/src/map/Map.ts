import {
  Viewer,
  Color,
} from "cesium";

import { installLodSeamGuard } from "./lodSeamGuard.js";
import { installMinZoomScale } from "./minZoomScale.js";
import { installScaleWheelZoom, scaleZoomStep } from "./scaleZoom.js";
import { createMarkerOverlay, type MarkerOverlayOptions } from "./markerOverlay.js";
import { LayerManager } from "../layers/LayerManager.js";
import { InteractionManager } from "../interaction/InteractionManager.js";
import { DrawingManager } from "../interaction/DrawingManager.js";
import { AnalysisManager } from "../analysis/AnalysisManager.js";
import { SelectionHighlight, type HighlightFeature } from "../interaction/SelectionHighlight.js";
import { triggerDownload } from "../shared/download.js";
import { BasemapController } from "./BasemapController.js";
import { nextFrame, captureCanvasBlob, measureGroundMetersPerPixel } from "./canvasCapture.js";
import {
  setView as setCameraView,
  setExtent as setCameraExtent,
  flyTo as flyCameraTo,
  zoomTo as zoomCameraTo,
  zoomToLayer as zoomCameraToLayer,
} from "./cameraControl.js";
import { validateApiKey } from "../auth/validateApiKey.js";
import { getUcbpApiBase, getProxyBase } from "../shared/apiDefaults.js";
import { getGlobalApiKey, registerApiKeyRefresh } from "../config.js";
import type {
  MapOptions,
  BasemapOptions,
  BasemapId,
  BasemapStatus,
  CameraOptions,
  MapExtent,
  ManagedLayer,
  DrawnShape,
  BoundaryAnalysisRequest,
  BufferAnalysisRequest,
  IntersectionAnalysisRequest,
  WedgeBufferAnalysisRequest,
} from "../types/index.js";

const DRAWING_LAYER_ID = "__tucbs_drawing_layer__";
const DRAWING_LAYER_TITLE = "Çizim Katmanı";
/** Ölçüm (measure) katmanının sabit id'si. */

// disari (components paketine) export edilir -- TucbsMeasureTool, bu
// katmanin "layer:visibility"/"layer:remove" olaylarini kendi etiket
// entity'lerine (bkz o dosyadaki _shapeLabels/live label yorumlari)
// yansitmak icin ayni id ile karsilastirma yapar.
export const MEASURE_LAYER_ID = "__tucbs_measure_layer__";
const MEASURE_LAYER_TITLE = "Ölçü Katmanı";

// Ilk kare cizilmeden onceki gecici azami yukseklik (metre); olcek tabanli
// hesap ilk karede bunun yerini alir (bkz MAX_ZOOM_OUT_SCALE_DENOMINATOR).
const MAX_ZOOM_DISTANCE_METERS = 25_000_000;

// Azami uzaklasma olcegi 1/N; yakinlasma siniri gibi ekran/fov'a gore her
// karede yukseklige cevrilir. Zoom basamaklarinin (scaleZoom.ts) son basamagi.
const MAX_ZOOM_OUT_SCALE_DENOMINATOR = 25_000_000;

// Azami yakinlasma olcegi 1/N (bilgi cubugundaki "Olcek 1/N" ile ayni
// tanim). Kamera yuksekligi sabit degil; ekran/fov'a gore her karede
// bu olcegi verecek sekilde hesaplanir (bkz minZoomScale.ts).
const MAX_ZOOM_SCALE_DENOMINATOR = 100;

// Ilk kare cizilmeden onceki gecici asgari yukseklik (metre); olcek tabanli
// hesap ilk karede bunun yerini alir.
const MIN_ZOOM_DISTANCE_METERS = 10;

/** `options.camera` ve `options.initialExtent` hiç verilmezse haritanın ilk açılışta ortalanacağı varsayılan bölge (Türkiye sınırı). */
export const DEFAULT_INITIAL_EXTENT: MapExtent = {
  west: 22.94,
  south: 34.05,
  east: 47.39,
  north: 42.7,
};

/**
 * `@tucbs/core`'un giriş noktası — bir Cesium `Viewer`'ı sarmalar, altlık
 * harita/marker/kamera yönetimini üstlenir ve `LayerManager`/
 * `InteractionManager`/`DrawingManager`/`AnalysisManager` alt sistemlerini
 * tek bir örnekte birleştirir.
 */
export class Map {
  /** Sarmalanan Cesium `Viewer` nesnesi. */
  readonly viewer: Viewer;
  /** Katman ekleme/kaldırma/stil yönetimi. */
  readonly layerManager: LayerManager;
  private readonly selectionHighlight: SelectionHighlight;
  /** Mouse/camera/scene etkileşim event'leri. */
  readonly interactionManager: InteractionManager;
  /** Çizim/ölçüm araçları. */
  readonly drawingManager: DrawingManager;
  /** Tampon/kesişim gibi coğrafi analiz istekleri. */
  readonly analysisManager: AnalysisManager;

  // Basemap kumesinin (setBasemap/fallback/resolveBasemapUrl + tum ilgili
  // state) saf tasimasi -- bkz map/BasemapController.ts,
  // project_ucbp_api_map_kamera_kumesi_cameracontrol sonundaki 2. bolme
  // adayi. deps Map'in KENDI wrapper metodlarina isaret eder.
  private readonly basemapController: BasemapController;

  // dropMarker()'in en son ekledigi tekil marker -- clearMarker() VEYA bir
  // sonraki dropMarker() cagrisi onceki marker'i kaldirir, bu yuzden ayni
  // anda en fazla BIR marker olur (bkz TucbsGoToCoordinate: "Git"e tekrar
  // basmak eskiyi biriktirmek yerine TASIR).
  private _removeMarker: (() => void) | undefined;

  // (4b) Sadece bu Map'in apiKey'i GLOBAL config'e bagimliysa (options.apiKey
  // verilmediyse) dolu -- configureTucbs() sonradan farkli bir degerle
  // tekrar cagrilirsa bu instance'i canli guncellemek icin kullanilir (bkz
  // project_ucbp_api_configuretucbs_4risk_kapatma_arastirma). destroy()
  // icinde cagrilmali, aksi halde registry'de sonsuza dek tutulur.
  #unregisterApiKeyRefresh: (() => void) | undefined;
  #removeLodSeamGuard: (() => void) | undefined;
  #removeMinZoomScale: (() => void) | undefined;
  #removeScaleWheelZoom: (() => void) | undefined;
  #apiKey: string | undefined;

  /**
   * @param container - Haritanın oluşturulacağı DOM elementi veya id'si.
   * @param options - Başlangıç harita seçenekleri.
   *
   * @example
   * ```ts
   * const map = new Map(document.getElementById("map-container")!, {
   *   basemap: "hgm-temel",
   *   apiKey: "YOUR_API_KEY",
   *   camera: { longitude: 32.85, latitude: 39.93, height: 500000 },
   * });
   * ```
   */
  constructor(container: Element | string, options: MapOptions = {}) {
    // Cesium ion "credit" (attribution) gosterimi, kullanicinin acik istegiyle
    // gizli/DOM'a eklenmemis bir container'a yonlendirilir; canvas'in yaninda
    // varsayilan olarak olusan gorunur credit kutusu boylece hic gorunmez.
    const hiddenCreditContainer = document.createElement("div");
    hiddenCreditContainer.style.display = "none";

    this.viewer = new Viewer(
      container,
      this.buildViewerOptions(options, hiddenCreditContainer),
    );

    // Hicbir imagery katmani (ne HGM ne fallback) henuz yuklenmemisken
    // Cesium'un varsayilani duz SIYAH bir globe -- kullaniciya "harita hic
    // acilmadi" izlenimi veriyordu. Ilk boyanacak kare bu olsun diye (asil
    // basemap/fallback'in agdan gelmesini beklemeden) globe'a hemen makul bir
    // "su" rengi veriyoruz.
    this.viewer.scene.globe.baseColor = Color.fromCssColorString("#a3c6e0");

    // Kullanici cok fazla uzaklastirinca (tekerlek/pinch) kamera Cesium'un
    // sayisal sinirlarina gidip hata veriyordu; yerkure tamamen gorunup biraz
    // daha pay kalacak bir uzakliktan oteye gidilemesin.
    this.viewer.scene.screenSpaceCameraController.maximumZoomDistance =
      MAX_ZOOM_DISTANCE_METERS;
    this.viewer.scene.screenSpaceCameraController.minimumZoomDistance =
      MIN_ZOOM_DISTANCE_METERS;

    // Instance-seviyesi apiKey (options.apiKey, component attribute'undan
    // gelir) verilmisse HER ZAMAN configureTucbs() ile ayarlanmis global
    // degeri ezer -- ArcGIS'in class-level>global modeliyle tutarli (bkz
    // project_ucbp_api_configuretucbs_uygulama_plani).
    const effectiveApiKey = options.apiKey ?? getGlobalApiKey();
    this.#apiKey = effectiveApiKey;

    this.layerManager = new LayerManager(this.viewer);
    this.selectionHighlight = new SelectionHighlight(this.viewer);
    // apiKey daha once SADECE AnalysisManager'a (asagida) gidiyordu --
    // WMS/WMTS/WFS/WCS istekleri hic haberdar degildi. LayerManager.configure()
    // ile ayni apiKey (ve onun otomatik ekleneceği host allowlist'i/discovery
    // ucu) katman ekleme/lejant/capabilities yollarina da tasinir.
    this.layerManager.configure({
      ...(effectiveApiKey !== undefined && { apiKey: effectiveApiKey }),
      ...(options.trustedApiKeyHosts !== undefined && {
        trustedApiKeyHosts: options.trustedApiKeyHosts,
      }),
      ...(options.apiKeyDiscoveryUrl !== undefined && {
        apiKeyDiscoveryUrl: options.apiKeyDiscoveryUrl,
      }),
    });
    this.interactionManager = new InteractionManager(this.viewer);
    this.drawingManager = new DrawingManager(
      this.viewer,
      this.interactionManager,
    );
    this.analysisManager = new AnalysisManager({
      apiKey: effectiveApiKey ?? "",
    });
    this.basemapController = new BasemapController(this.viewer, {
      removeBasemapLayers: () => this.layerManager._removeBasemapLayers(),
      addBasemapImageryLayer: (id, basemapId, layer) =>
        this.layerManager._addBasemapImageryLayer(id, basemapId, layer),
      removeLayer: (id) => this.layerManager.removeLayer(id),
      emit: (event, payload) => this.layerManager.emit(event, payload),
      getProxyBase: () => getProxyBase(),
      getApiKey: () => this.#apiKey,
    });

    // (4b) Bu Map global apiKey'e bagimliysa (kendi apiKey'i verilmedi),
    // sonraki bir configureTucbs() rotasyonunu ANINDA yansitmak icin kayit
    // olunur -- aksi halde LayerManager/AnalysisManager eski (donmus)
    // anahtari sayfa yenilenene kadar tutardi. Instance-level apiKey
    // VERILMISSE bu bloka hic girilmez -- oncelik zinciri (instance > global)
    // rotasyondan etkilenmez.
    if (options.apiKey === undefined) {
      this.registerGlobalApiKeyRotation(effectiveApiKey);
    }

    // TucbsDrawTool ile yapilan cizimler (source==="draw") tek, kalici bir
    // "Cizim Katmani"nda, TucbsMeasureTool ile yapilan olcumler (source===
    // "measure") AYNI lazy-katman desenini kullanan ayri bir "Olcu Katmani"nda
    // toplanir -- ilk sekil tamamlaninca katman lazy olusur, harita bos ise
    // hic olusmaz. Ikisi AYNI DrawTool degerlerini ("polyline"/"polygon")
    // KASITLI OLARAK farkli source'larla kullanir (bkz DrawingManager.ts
    // activate() yorumu, source-tabanli sahiplik konvansiyonu) -- bu yuzden
    // wireShapeSource() ile tek bir yerde kurulup source'a gore ayristirilir.
    // draw:remove de simetrik olarak dinlenir -- TucbsDeleteTool'un
    // clearAll()/removeShape() cagrisi sekli KENDI viewer.entities'inden
    // degil (artik tasindigi icin no-op), buradan katmanin DataSource'undan
    // siler; katman son sekil de silinince tamamen kaldirilir (bkz
    // LayerManager._removeDrawnShape, source'tan BAGIMSIZ generic).
    this.wireShapeSource("draw", DRAWING_LAYER_ID, DRAWING_LAYER_TITLE, (id, title, shape) =>
      this.layerManager._addDrawnShape(id, title, shape),
    );
    this.wireShapeSource("measure", MEASURE_LAYER_ID, MEASURE_LAYER_TITLE, (id, title, shape) =>
      this.layerManager._addMeasuredShape(id, title, shape),
    );

    if (options.camera !== undefined) {
      this.setView(options.camera);
    } else {
      this.setExtent(options.initialExtent ?? DEFAULT_INITIAL_EXTENT);
    }

    // Duz tepeden bakista iki farkli altlik seviyesinin yan yana cizilmesini
    // (Home'da bildirilen bant bozulmasi) her karede onler -- bkz lodSeamGuard.ts.
    this.#removeLodSeamGuard = installLodSeamGuard(this.viewer);
    this.#removeMinZoomScale = installMinZoomScale(
      this.viewer,
      MAX_ZOOM_SCALE_DENOMINATOR,
      MAX_ZOOM_OUT_SCALE_DENOMINATOR,
    );
    // Tekerlek centigi = bir olcek basamagi (1/100, 1/250, ... bkz scaleZoom.ts).
    this.#removeScaleWheelZoom = installScaleWheelZoom(this.viewer);

    this.setBasemap(options.basemap);
  }

  /**
   * apiKey varsa GET /auth/validate (core auth). Yoksa no-op.
   * Geçersizse throw — TucbsMap ready yerine error event basar.
   *
   * @example
   * ```ts
   * try {
   *   await map.ensureApiKeyValid();
   * } catch (err) {
   *   console.error("ApiKey geçersiz:", err);
   * }
   * ```
   */
  async ensureApiKeyValid(): Promise<void> {
    await validateApiKey(this.#apiKey ?? "", getUcbpApiBase());
  }

  /**
   * Tampon analizi: AnalysisManager → backend → sonuç GEOJSON katmanı.
   *
   * @example
   * ```ts
   * const layer = await map.runBuffer({
   *   geojson: sourceFeature,
   *   distanceM: 500,
   * });
   * console.log("Tampon katmanı eklendi:", layer.id);
   * ```
   */
  async runBuffer(
    request: BufferAnalysisRequest,
    layerOpts?: { readonly id?: string; readonly title?: string },
  ): Promise<ManagedLayer> {
    const result = await this.analysisManager.buffer(request);
    const id = layerOpts?.id ?? `buffer-${Date.now()}`;
    const title = layerOpts?.title ?? `Tampon sonucu (${request.distanceM}m)`;
    this.layerManager.markAnalysisResult(id);
    const layer = await this.layerManager.add("GEOJSON", {
      id,
      title,
      data: result.geojson as object,
      layerType: "GEOJSON",
      clampToGround: true,
    });
    return layer;
  }

  /**
   * Kesişim analizi: AnalysisManager → backend → sonuç GEOJSON katmanı.
   *
   * @example
   * ```ts
   * const layer = await map.runIntersection({
   *   geojsonA: featureA,
   *   geojsonB: featureB,
   * });
   * console.log("Kesişim katmanı eklendi:", layer.id);
   * ```
   */
  async runIntersection(
    request: IntersectionAnalysisRequest,
    layerOpts?: { readonly id?: string; readonly title?: string },
  ): Promise<ManagedLayer> {
    const result = await this.analysisManager.intersection(request);
    const id = layerOpts?.id ?? `intersection-${Date.now()}`;
    const title = layerOpts?.title ?? "Kesişim sonucu";
    this.layerManager.markAnalysisResult(id);
    const layer = await this.layerManager.add("GEOJSON", {
      id,
      title,
      data: result.geojson,
      layerType: "GEOJSON",
      clampToGround: true,
    });
    return layer;
  }

  /** Sınır analizi: worker geometrisini olduğu gibi katmana yazar. */
  async runBoundary(
    request: BoundaryAnalysisRequest,
    layerOpts?: { readonly id?: string; readonly title?: string },
  ): Promise<ManagedLayer> {
    const result = await this.analysisManager.boundary(request);
    return this.addAnalysisGeoJson(
      layerOpts?.id ?? `boundary-${Date.now()}`,
      layerOpts?.title ?? "Sınır sonucu",
      result.geojson,
    );
  }

  /** Kırpma: kaynak ve maske. */
  async runClip(
    request: IntersectionAnalysisRequest,
    layerOpts?: { readonly id?: string; readonly title?: string },
  ): Promise<ManagedLayer> {
    const result = await this.analysisManager.clip(request);
    return this.addAnalysisGeoJson(
      layerOpts?.id ?? `clip-${Date.now()}`,
      layerOpts?.title ?? "Kırpma sonucu",
      result.geojson,
    );
  }

  /** Fark: ikinci poligon birinciden çıkarılır. */
  async runDifference(
    request: IntersectionAnalysisRequest,
    layerOpts?: { readonly id?: string; readonly title?: string },
  ): Promise<ManagedLayer> {
    const result = await this.analysisManager.difference(request);
    return this.addAnalysisGeoJson(
      layerOpts?.id ?? `difference-${Date.now()}`,
      layerOpts?.title ?? "Fark sonucu",
      result.geojson,
    );
  }

  /** Çıkarma: örtüşen parça kaynaktan silinir. */
  async runSubtract(
    request: IntersectionAnalysisRequest,
    layerOpts?: { readonly id?: string; readonly title?: string },
  ): Promise<ManagedLayer> {
    const result = await this.analysisManager.subtract(request);
    return this.addAnalysisGeoJson(
      layerOpts?.id ?? `subtract-${Date.now()}`,
      layerOpts?.title ?? "Çıkarma sonucu",
      result.geojson,
    );
  }

  /** Birleştir: iki poligon tek alan olur. */
  async runUnion(
    request: IntersectionAnalysisRequest,
    layerOpts?: { readonly id?: string; readonly title?: string },
  ): Promise<ManagedLayer> {
    const result = await this.analysisManager.union(request);
    return this.addAnalysisGeoJson(
      layerOpts?.id ?? `union-${Date.now()}`,
      layerOpts?.title ?? "Birleştir sonucu",
      result.geojson,
    );
  }

  /** Kama tampon: açı dilimini katmana yazar. */
  async runWedgeBuffer(
    request: WedgeBufferAnalysisRequest,
    layerOpts?: { readonly id?: string; readonly title?: string },
  ): Promise<ManagedLayer> {
    const result = await this.analysisManager.wedgeBuffer(request);
    return this.addAnalysisGeoJson(
      layerOpts?.id ?? `wedge-${Date.now()}`,
      layerOpts?.title ?? "Kama tampon sonucu",
      result.geojson,
    );
  }

  /** Analiz GeoJSON'unu clamp'li katman olarak ekler. */
  private async addAnalysisGeoJson(id: string, title: string, geojson: object): Promise<ManagedLayer> {
    this.layerManager.markAnalysisResult(id);
    return this.layerManager.add("GEOJSON", {
      id,
      title,
      data: geojson,
      layerType: "GEOJSON",
      clampToGround: true,
    });
  }

  // ── Kamera ───────────────────────────────────────────────────────────────

  /**
   * Kamerayı verilen konum/açıya anında (uçuş animasyonu olmadan) ayarlar.
   *
   * @example
   * ```ts
   * map.setView({ longitude: 32.85, latitude: 39.93, height: 500000 });
   * ```
   */
  setView(cameraOptions: CameraOptions): void {
    setCameraView(this.viewer, cameraOptions);
  }

  /**
   * Nokta yerine bir bölgeyi (ör. Türkiye sınırı) ekrana sığacak şekilde ortalar.
   *
   * @example
   * ```ts
   * map.setExtent({ west: 26, south: 36, east: 45, north: 42 });
   * ```
   */
  setExtent(extent: MapExtent): void {
    setCameraExtent(this.viewer, extent);
  }

  /**
   * Kamerayı verilen konum/açıya uçuş animasyonuyla götürür.
   *
   * @example
   * ```ts
   * map.flyTo({ longitude: 28.97, latitude: 41.01, height: 20000 });
   * ```
   */
  flyTo(cameraOptions: CameraOptions): void {
    flyCameraTo(this.viewer, cameraOptions);
  }

  /**
   * Kamerayı verilen coğrafi konuma (varsayılan yönle) anında ayarlar.
   *
   * @example
   * ```ts
   * map.zoomTo(35.0, 39.0, 1000000);
   * ```
   */
  zoomTo(longitude: number, latitude: number, height: number): void {
    zoomCameraTo(this.viewer, longitude, latitude, height);
  }

  /** Kamerayı bir sonraki olcek basamağına (ör. 1/5.000 → 1/2.500) animasyonlu yaklaştırır; fare tekerleğinin bir çentiğiyle aynıdır. */
  zoomInStep(): void {
    scaleZoomStep(this.viewer, 1);
  }

  /** Kamerayı bir sonraki olcek basamağına (ör. 1/2.500 → 1/5.000) animasyonlu uzaklaştırır; fare tekerleğinin bir çentiğiyle aynıdır. */
  zoomOutStep(): void {
    scaleZoomStep(this.viewer, -1);
  }

  /** Kamerayı verilen katmanın kapsama alanına (extent'ine) top-down yaklaştırır. */
  async zoomToLayer(layer: ManagedLayer): Promise<boolean> {
    return zoomCameraToLayer(this.viewer, layer);
  }

  // ── Marker ───────────────────────────────────────────────────────────────

  /**
   * Verilen konuma tekil bir ikon marker'ı ekler; önceki marker (varsa) kaldırılır.
   * @param longitude - Boylam (derece).
   * @param latitude - Enlem (derece).
   * @param iconUrl - Marker ikonunun URL'si (ör. bir SVG data-URI).
   * @param options - Opsiyonel. `width`/`height`: ikonun ekrandaki boyutu (CSS px); verilmezse görüntünün
   *   kendi piksel boyutu kullanılır. Marker, Cesium tuvaline değil harita container'ının üstüne bir `<img>`
   *   olarak çizilir (bu yüzden `setQuality()` düşük olsa bile keskindir). `anchor`: koordinata oturan nokta —
   *   `"bottom"` (varsayılan, pin ucu) veya `"center"` (dairesel ikon). Yüksek çözünürlüklü bir görüntüyü küçük göstermek keskinliği artırır.
   *
   * @example
   * ```ts
   * map.dropMarker(32.85, 39.93, "https://example.com/pin.svg");
   * map.dropMarker(32.85, 39.93, "https://example.com/pin@8x.png", { width: 30, height: 36 });
   * ```
   */
  // iconUrl caginin sorumlulugu: hangi ikonun kullanilacagi bir UI/tasarim
  // karari (bkz TucbsGoToCoordinate -- Carbon'un dolu "location" ikonunu bir
  // SVG data-URI'sine cevirip verir), core paketi @carbon/icons'a bagimli
  // OLMAMALI -- burasi sadece Cesium billboard'ini kurar. verticalOrigin
  // BOTTOM: ikonun UCU (Carbon'un LocationFilled path'inde alt-orta nokta)
  // TAM koordinatta dursun, ikonun ORTASI degil (gercek harita pini gibi).
  // disableDepthTestDistance ile 3D Tiles/terrain'in ARKASINDA kalsa bile
  // marker HER ZAMAN gorunur -- LayerManager'in identify highlight'iyla
  // (bkz. LayerManager.ts ~759) AYNI teknik.
  dropMarker(
    longitude: number,
    latitude: number,
    iconUrl: string,
    options: MarkerOverlayOptions = {},
  ): void {
    this.clearMarker();
    this._removeMarker = createMarkerOverlay(this.viewer, longitude, latitude, iconUrl, options);
  }

  /**
   * `dropMarker()` ile eklenen marker'ı kaldırır (yoksa no-op).
   *
   * @example
   * ```ts
   * map.clearMarker();
   * ```
   */
  clearMarker(): void {
    this._removeMarker?.();
    this._removeMarker = undefined;
  }

  // ── Basemap ───────────────────────────────────────────────────────────────

  /** Altlık haritanın yükleme durumu (`"loading"`/`"ready"`/`"unavailable"`). */
  get basemapStatus(): BasemapStatus {
    return this.basemapController.status;
  }

  /**
   * Altlık haritayı ayarlar/değiştirir (`null`/`undefined` altlık haritayı tamamen kaldırır).
   *
   * @example
   * ```ts
   * map.setBasemap("hgm-ortofoto");
   * ```
   */
  setBasemap(basemap?: BasemapOptions | BasemapId | null): void {
    this.basemapController.set(basemap);
  }

  // ── Mod & kalite ─────────────────────────────────────────────────────────

  /** Sahne modunu 2D/3D arasında değiştirir (animasyonsuz, anında). */
  setMode(mode: "2D" | "3D"): void {
    if (mode === "2D") {
      this.viewer.scene.morphTo2D(0);
    } else {
      this.viewer.scene.morphTo3D(0);
    }
  }

  /** Render çözünürlük ölçeğini ayarlar (`quality`: 0-100 arası yüzde, Cesium `resolutionScale`'e 0.1-1.0 arasına eşlenir — 0.1 alt sınırdır, aşırı bulanıklığı/performans düşüşünü önler). */
  setQuality(quality: number): void {
    const clamped = Math.min(100, Math.max(0, quality));
    this.viewer.resolutionScale = Math.max(0.1, clamped / 100);
  }

  // ── Harita yönetimi ───────────────────────────────────────────────────────

  /** Harita canvas boyutunu, container'ının güncel boyutuna göre yeniden hesaplar. */
  resize(): void {
    this.viewer.resize();
  }

  // ── Disa aktarim ─────────────────────────────────────────────────────────

  /**
   * O anki kamera görüntüsünü (harita + tüm entity/feature'lar, UI butonları
   * hariç) JPEG olarak yakalayıp indirir.
   * @param filename - İndirilecek dosyanın adı (uzantısız, zaman damgası eklenir).
   * @param quality - JPEG sıkıştırma kalitesi (0-1).
   *
   * @example
   * ```ts
   * await map.exportJPEG("harita-goruntusu", 0.95);
   * ```
   */

  // tucbs-react RecordToolPanel.tsx'teki handleDownloadJpg/grabCanvasBlob'dan
  // PORTE EDILDI (bkz project_ucbp_api_tucbstoolbar_mimarisi memory onyedinci tur).
  async exportJPEG(filename = "tucbs-harita", quality = 0.92): Promise<void> {
    const blob = await this.captureScreenshotBlob(quality);
    triggerDownload(blob, `${filename}-${Date.now()}.jpg`);
  }

  /**
   * O anki kamera görüntüsünü indirmeden bir `Blob` olarak döndürür (ör. bir
   * `<img>`'e `blob:` URL olarak verilmek üzere).
   * @param quality - JPEG sıkıştırma kalitesi (0-1).
   */

  // TucbsPrintTool icin PORTE EDILDI (bkz project_ucbp_api_printtool_uygulama_plani
  // memory) -- exportJPEG() ile AYNI yakalama mantigini indirme YAPMADAN disari
  // acar (ör. bir <img>'e blob: URL olarak verilmek uzere).
  //
  // FAZ 1.5 KARARI: Faz 1.3/1.4'te burada, capture'i sayfa boyutuna gore
  // farkli piksel olculerde almak icin container'i GECICI resize edip
  // kamerayi/FOV'u yeniden sigdiran bir mekanizma vardi. Bu, Yazdir tiklanip
  // onizleme overlay'i acilmadan ONCE, kullanicinin GORDUGU canli haritada
  // (henuz hicbir sey onu ORTMEDIGI icin) belirgin bir zoom sicramasina yol
  // aciyordu (kullanici sikayeti) -- AYRICA farkli sayfa boyutlari icin
  // her seferinde YENIDEN hesaplanan kamera/FOV konumu, sayfa boyutuna gore
  // KUCUK ama gercek tutarsizliklar (extent'in "bazen genisleyip bazen
  // daralmasi") uretiyordu.
  //
  // Kullanicinin onerdigi/onayladigi cozum: kameraya/container'a HIC
  // dokunmadan, o ANKI ekran cozunurlugunde TEK bir goruntu yakalanir.
  // Farkli sayfa boyutlari icin bu AYNI goruntu sadece BUYUTULUP/KUCULTULUR
  // -- bu, TucbsPrintTool'daki `<img width=.. height=..>` HTML attribute
  // mekanizmasi tarafindan zaten OTOMATIK saglaniyor (bkz PrintPreviewBuilder.ts),
  // EK KOD GEREKTIRMEZ. Sonuc: zoom sicramasi tamamen ortadan kalkar (harita
  // capture SIRASINDA bile hicbir sekilde degismez); extent TUM sayfa
  // boyutlarinda MATEMATIKSEL OLARAK BIREBIR AYNI olur (ayni piksel verisi).
  // Bilinen odun: A0/A1 gibi buyuk sayfalarda ekran cozunurlugu buyuk olcude
  // buyutuldugunden goruntu netligi azalabilir -- kullaniciya bildirildi.
  async captureScreenshotBlob(quality = 0.92): Promise<Blob> {
    await nextFrame(this.viewer);
    return captureCanvasBlob(this.viewer, "image/jpeg", quality);
  }

  /**
   * Ekran merkezinde, arazi-farkında (`globe.pick`) ölçülen piksel-başına-yer-mesafesini
   * (metre) döndürür; harita globe'u göstermiyorsa (ör. açık uzay) `null` döner.
   */
  measureGroundMetersPerPixel(): number | null {
    return measureGroundMetersPerPixel(this.viewer);
  }

  // Viewer'a verilen kurucu secenekleri (Faz 2, constructor karmasikligi
  // duzeltmesi -- bkz project_ucbp_api_map_constructor_dry_karmasiklik).
  // Buradaki her "?? false" ESLint'in complexity kuralinda AYRI bir dal
  // sayildigi icin (12 adet) constructor'in KENDI karmasikligina dogrudan
  // katkida bulunuyordu -- davranis AYNI, sadece ayri bir metoda tasindi.
  private buildViewerOptions(
    options: MapOptions,
    hiddenCreditContainer: HTMLDivElement,
  ): ConstructorParameters<typeof Viewer>[1] {
    return {
      timeline: options.timeline ?? false,
      animation: options.animation ?? false,
      baseLayerPicker: options.baseLayerPicker ?? false,
      // Cesium, baseLayer verilmezse kendi varsayilan World Imagery katmanini
      // otomatik ekliyor; bu katman LayerManager'a hic kayitli olmadigindan
      // setBasemap()/_removeBasemapLayers() onu asla silemiyor ve bizim
      // basemap'imizin altinda kalici olarak birikiyor. false vererek
      // basemap yonetimini tamamen setBasemap()'e devrediyoruz (tek basemap garantisi).
      baseLayer: false,
      geocoder: options.geocoder ?? false,
      homeButton: options.homeButton ?? false,
      sceneModePicker: options.sceneModePicker ?? false,
      navigationHelpButton: options.navigationHelpButton ?? false,
      infoBox: options.infoBox ?? false,
      selectionIndicator: options.selectionIndicator ?? false,
      shadows: options.shadows ?? false,
      shouldAnimate: options.shouldAnimate ?? false,
      fullscreenButton: options.fullscreenButton ?? false,
      creditContainer: hiddenCreditContainer,
      ...options.cesiumOptions,
    };
  }

  // (4b) apiKey-rotasyon kaydinin gerceklestirilmesi (Faz 3, constructor
  // karmasikligi duzeltmesi -- bkz project_ucbp_api_map_constructor_dry_karmasiklik).
  // SADECE bu Map global apiKey'e bagimliysa (constructor'daki "options.apiKey
  // === undefined" kontrolunden SONRA) cagrilir.
  private registerGlobalApiKeyRotation(effectiveApiKey: string | undefined): void {
    // (4d) Gelistiricinin "farkli bir anahtar verdim sanip vermemis"
    // hatasini konsolda aninda yakalamasi icin tek-seferlik bilgi logu --
    // guvenlik kontrolu degil, sadece gorunurluk.
    if (effectiveApiKey !== undefined) {
      console.info(
        "[@tucbs/core] Bu Map instance'i configureTucbs() global apiKey'ini kullaniyor " +
          "(kendi apiKey attribute'u/options'u verilmedi). Farkli bir anahtar gerekiyorsa " +
          "Map/component'e acikca apiKey verin.",
      );
    }
    this.#unregisterApiKeyRefresh = registerApiKeyRefresh(() => {
      const rotatedKey = getGlobalApiKey();
      this.#apiKey = rotatedKey;
      this.layerManager.configure({
        ...(rotatedKey !== undefined && { apiKey: rotatedKey }),
      });
      this.analysisManager.configure({ apiKey: rotatedKey ?? "" });
      void this.ensureApiKeyValid().catch((err) => {
        console.error(
          "[@tucbs/core] apiKey rotasyon validate basarisiz:",
          err,
        );
      });
      // ML-03: apiKey URL'e gomulu oldugu icin (bkz BasemapController'daki
      // resolveBasemapUrl/appendTucbsApiKeyQuery) mevcut altlik yeniden
      // kurulmazsa ESKI anahtarla istek atmaya devam ederdi.
      if (this.basemapController.currentBasemapId !== undefined) {
        this.setBasemap(this.basemapController.currentBasemapId);
      }
    });
  }

  // draw:complete/draw:remove dinleyicilerinin "draw" (Cizim Katmani) ve
  // "measure" (Olcu Katmani) source'lari icin BIREBIR AYNI olan kurulumunu
  // (Faz 1, tekrarli kod DRY duzeltmesi -- bkz project_ucbp_api_map_constructor_dry_karmasiklik)
  // tek yerde birlestirir -- addShape, cagiranin KENDI _addDrawnShape/
  // _addMeasuredShape wrapper'ina isaret eder (diger sibling-module DI
  // moduelleriyle ayni desen, ham LayerManager metoduna degil).
  private wireShapeSource(
    source: "draw" | "measure",
    layerId: string,
    layerTitle: string,
    addShape: (id: string, title: string, shape: DrawnShape) => Promise<ManagedLayer>,
  ): void {
    this.drawingManager.on("draw:complete", ({ shape }) => {
      if (shape.source !== source) return;
      void addShape(layerId, layerTitle, shape);
    });
    this.drawingManager.on("draw:remove", ({ shape }) => {
      if (shape.source !== source) return;
      this.layerManager._removeDrawnShape(layerId, shape.entity);
    });
  }

  /** Seçili geometriyi katman listesine yazmadan kırmızı gösterir. Boş dizi vurguyu kaldırır. */
  showSelectionHighlight(features: readonly HighlightFeature[]): void {
    this.selectionHighlight.show(features);
  }

  /** Seçim vurgusunu haritadan kaldırır. */
  clearSelectionHighlight(): void {
    this.selectionHighlight.clear();
  }

  /** Tüm alt sistemleri (drawing/interaction/layer manager) ve Cesium `Viewer`'ı yok eder. */
  destroy(): void {
    this.clearMarker();
    this.selectionHighlight.clear();
    // ML-02: basemap izleyicisi durdurulmazsa, harita bu zamanlayicilar
    // dolmadan (bkz BASEMAP_UNAVAILABLE_DELAY_MS) yok edilirse unavailableTimer
    // tetiklenip yok edilmis viewer'a dokunur ve Cesium "This object was
    // destroyed" hatasi firlatir -- bkz project_ucbp_api_god_component_map_adim1_basemapwatcher.
    this.basemapController.stop();
    // (4b) Bu Map global apiKey'e bagimliysa kayitli refresh callback'i
    // kaldirilir -- aksi halde destroy edilmis instance registry'de
    // sonsuza dek tutulup bellek sizintisina yol acar.
    this.#unregisterApiKeyRefresh?.();
    this.#removeLodSeamGuard?.();
    this.#removeMinZoomScale?.();
    this.#removeScaleWheelZoom?.();
    this.drawingManager.destroy();
    this.interactionManager.destroy();
    this.layerManager.destroy();
    this.viewer.destroy();
  }

}
