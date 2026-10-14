import {
  ImageryLayer,
  JulianDate,
  PropertyBag,
  Color,
  Entity,
  type Viewer,
  type DataSource,
  type DataSourceCollection,
} from "cesium";

import type { FeatureCollection } from "geojson";

import { EventEmitter } from "../shared/EventEmitter.js";
import { type CrsCheckResult } from "./sources/geojsonCrs.js";
import { getUcbpApiBase } from "../shared/apiDefaults.js";
import { ApiKeyPolicy } from "../auth/ApiKeyPolicy.js";
import { LayerOperationError } from "../shared/TucbsError.js";
import * as layerExporter from "./export/LayerExporter.js";
import { OutlineGeometry } from "./style/OutlineGeometry.js";
import { OpacityController } from "./style/OpacityController.js";
import { CameraHighlight } from "./CameraHighlight.js";
import { LayerStyleEngine } from "./style/LayerStyleEngine.js";
import { LocalSourceLoader } from "./sources/LocalSourceLoader.js";
import { OgcLayerFactory } from "./ogc/OgcLayerFactory.js";
import { ShapeLayerBridge } from "./sources/ShapeLayerBridge.js";
import type {
  ManagedLayer,
  LayerType,
  WMSLayerOptions,
  WMTSLayerOptions,
  WFSLayerOptions,
  WCSLayerOptions,
  GeoTiffLayerOptions,
  LocalLayerOptions,
  OutlineStyle,
  LayerStyleSpec,
  ServiceStyleOption,
  DrawnShape,
  AuthorizedLayerInfo,
} from "../types/index.js";
import type { LayerManagerEventMap } from "../types/events.types.js";
import type { GeographicBoundingBox } from "./ogc/capabilities.js";

/**
 * Haritadaki tüm katmanları (WMS/WMTS/WFS/WCS/GEOTIFF/GEOJSON/KML/KMZ/SHP/CSV,
 * Çizim ve Ölçü katmanları dahil) ekler, kaldırır, stiller ve sorgular.
 *
 * @example
 * ```ts
 * const layerManager = map.layerManager;
 * layerManager.on("layer:add", ({ layer }) => {
 *   console.log("Yeni katman eklendi:", layer.id);
 * });
 * const layer = await layerManager.add("WMS", {
 *   id: "world-continents",
 *   title: "World Continents (WMS)",
 *   url: "https://demo.mapserver.org/cgi-bin/wms",
 *   layers: "continents",
 *   version: "1.3.0",
 * });
 * layerManager.setVisible(layer.id, true);
 * ```
 */
export class LayerManager extends EventEmitter<LayerManagerEventMap> {
  // TucbsStyleEditor'un DEFAULT_OUTLINE_COLOR/WIDTH'iyle AYNI deger --
  // katman ilk eklendiginde ve "Sifirla" sonrasinda ayni maviye/genislige
  // donulmesi bekleniyor (bkz. recordInitialStyle cagrilari).
  private static readonly DEFAULT_OUTLINE_COLOR_HEX = "#1a73e8";
  private static readonly DEFAULT_OUTLINE_COLOR = Color.fromCssColorString(
    LayerManager.DEFAULT_OUTLINE_COLOR_HEX
  );

  private readonly viewer: Viewer;
  private readonly items: Map<string, ManagedLayer> = new Map();
  private readonly analysisResultIds = new Set<string>();
  // Outline companion/risk WeakSet'leri + saf simplifikasyon metotlari (bkz
  // project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi) --
  // Viewer'in TAMAMINA degil, sadece clock.currentTime'a ihtiyac duyan saf
  // modul.
  private readonly outlineGeometry: OutlineGeometry;
  // Bir DataSource'un opakligini (opaklik CallbackProperty sarmalayicilari
  // uzerinden) yoneten, Viewer'in TAMAMINA degil sadece sahne render'ini
  // yeniden istemeye ihtiyac duyan saf modul (bkz
  // project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi).
  private readonly opacityController: OpacityController;
  // Dolgu/dis-hat stil hesaplamasi + ekleme-ani renklendirmesi (bkz
  // project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi) --
  // OutlineGeometry/OpacityController'a (sibling-module DI) ve Viewer'in
  // saat/render-istegi/olay-yayini icin canli okuma fonksiyonlarina ihtiyac
  // duyar, Viewer'in TAMAMINA degil.
  private readonly styleEngine: LayerStyleEngine;
  // Yerel dosya (GEOJSON/KML/KMZ/SHP/CSV) yukleme mantigi (bkz
  // project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi, Adim 7)
  // -- Viewer'a BAGLI (dataSources.add/scene.camera/scene.canvas), ama
  // register/style/outline gibi LayerManager'a ozgu islemlere sibling-module
  // DI (deps nesnesi) ile baglanir; OutlineGeometry/LayerStyleEngine gibi
  // ham instance yerine LayerManager'in KENDI delege metotlarini alir --
  // bkz LocalSourceLoaderDeps yorumu (bazi delegeler, ör. addPolygonOutlines,
  // birden fazla modulu birlestiren cross-cutting mantik icerir).
  private readonly localSourceLoader: LocalSourceLoader;
  // Cizim Katmani VE Olcu Katmani'ndaki (bkz _addDrawnShape/_addMeasuredShape)
  // orkestrasyonu + sirali "id" oznitelik sayaci (bkz ShapeLayerBridge'in
  // kendi drawnShapeCounters yorumu) -- localSourceLoader ile AYNI sibling-
  // module DI deseni: Viewer'a BAGLI (viewer.entities/dataSources), ama
  // register/style/outline gibi LayerManager'a ozgu islemlere LayerManager'in
  // KENDI delege metotlarini alir (addPolygonOutlineCompanion, ör.
  // outlineGeometry+opacityController'i birlestiren cross-cutting mantik
  // icerdigi icin ham instance yerine wrapper'i verilir).
  private readonly shapeLayerBridge: ShapeLayerBridge;
  // WMS/WMTS/WFS/WCS/GeoTIFF ekleme + sunucu-tanimli stil secimi + OGC servis
  // kesfi (bkz project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef
  // Yapi, Adim 8) -- localSourceLoader/shapeLayerBridge ile AYNI sibling-
  // module DI deseni: Viewer'a BAGLI (imageryLayers/dataSources), ama
  // register/style/bookkeeping gibi LayerManager'a ozgu islemlere
  // LayerManager'in KENDI delege metotlarini alir.
  private readonly ogcLayerFactory: OgcLayerFactory;
  // apiKey/trustedApiKeyHosts/OGC-proxy URL kurma mantigi (bkz
  // project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi) --
  // Viewer gerektirmeyen, tek basina test edilebilir saf modul.
  private readonly apiKeyPolicy: ApiKeyPolicy;
  // Kamera uçuşu (zoomToLayer/zoomToEntity) + geçici entity vurgusu
  // (highlightEntity/clearHighlight) -- bkz project_ucbp_api_god_component_layermanager_adim9_temizlik,
  // Adım 10. Viewer'a BAĞLI (camera/clock/dataSources), ama katman stili
  // okuma/kayıt-defteri erişimi gibi LayerManager'a özgü işlemlere
  // LayerManager'ın KENDİ delege metotlarını alır (sibling-module DI, aynı
  // ogcLayerFactory/shapeLayerBridge deseni).
  private readonly cameraHighlight: CameraHighlight;

  /** @param viewer - Katmanların yönetileceği Cesium `Viewer`. */
  constructor(viewer: Viewer) {
    super();
    this.viewer = viewer;
    // getUcbpApiBase() burada BIR KEZ degil, HER cagrida CANLI okunsun diye
    // bir provider fonksiyonu olarak geciliyor -- configureTucbs({apiBase})
    // bu LayerManager kurulduktan SONRA cagrilsa bile ApiKeyPolicy dogru
    // (guncel) degeri gormeye devam eder (mevcut davranisla birebir ayni).
    this.apiKeyPolicy = new ApiKeyPolicy({ apiBase: () => getUcbpApiBase() });
    // Ayni "canli okuma" deseni -- OutlineGeometry Viewer'in TAMAMINA degil
    // sadece clock.currentTime'a ihtiyac duyar.
    this.outlineGeometry = new OutlineGeometry({
      getCurrentTime: () => this.viewer.clock.currentTime,
    });
    // Ayni "canli okuma" deseni -- OpacityController Viewer'in TAMAMINA
    // degil sadece sahne render'ini yeniden istemeye ihtiyac duyar.
    this.opacityController = new OpacityController({
      requestRender: () => this.viewer.scene.requestRender(),
    });
    // Ayni "canli okuma" deseni + sibling-module DI (bkz yukaridaki
    // styleEngine yorumu) -- outlineGeometry/opacityController BU
    // constructor'da zaten olusturuldugu icin dogrudan referans verilebilir.
    this.styleEngine = new LayerStyleEngine({
      outlineGeometry: this.outlineGeometry,
      opacityController: this.opacityController,
      getCurrentTime: () => this.viewer.clock.currentTime,
      requestRender: () => this.viewer.scene.requestRender(),
      emitStyle: (id, style) => this.emit("layer:style", { id, style }),
      waitForRenderSettle: () => this.waitForRenderSettle(),
    });
    this.localSourceLoader = new LocalSourceLoader(viewer, {
      styleEngine: this.styleEngine,
      outlineGeometry: this.outlineGeometry,
      addPolygonOutlines: (dataSource, color, width) => this.addPolygonOutlines(dataSource, color, width),
      register: (id, title, layerType, cesiumObject, isBasemap, initialFillColor) =>
        this.register(id, title, layerType, cesiumObject, isBasemap, initialFillColor),
      emitCrsCheckResult: (id, result) => this.emitCrsCheckResult(id, result),
      waitForRenderSettle: () => this.waitForRenderSettle(),
      defaultOutlineColor: LayerManager.DEFAULT_OUTLINE_COLOR,
      defaultOutlineColorHex: LayerManager.DEFAULT_OUTLINE_COLOR_HEX,
    });
    this.shapeLayerBridge = new ShapeLayerBridge(viewer, {
      getItem: (id) => this.items.get(id),
      getStyle: (id) => this.styleEngine.getStyle(id),
      applyEntityStyle: (entity, color, outline, isShapeLayer) =>
        this.applyEntityStyle(entity, color, outline, isShapeLayer),
      addPolygonOutlineCompanion: (dataSource, entity, color, width, clampToGround) =>
        this.addPolygonOutlineCompanion(dataSource, entity, color, width, clampToGround),
      tagEntities: (dataSource, layerId) => this.tagEntities(dataSource, layerId),
      register: (id, title, layerType, cesiumObject, isBasemap, initialFillColor) =>
        this.register(id, title, layerType, cesiumObject, isBasemap, initialFillColor),
      recordInitialStyle: (id, colorHex, fillOpacity, outline) =>
        this.styleEngine.recordInitialStyle(id, colorHex, fillOpacity, outline),
      removeLayer: (id) => this.removeLayer(id),
      defaultOutlineColorHex: LayerManager.DEFAULT_OUTLINE_COLOR_HEX,
    });
    this.ogcLayerFactory = new OgcLayerFactory(viewer, {
      apiKeyPolicy: this.apiKeyPolicy,
      styleEngine: this.styleEngine,
      outlineGeometry: this.outlineGeometry,
      requireLayer: (id) => this.requireLayer(id),
      setItem: (id, managed) => this.items.set(id, managed),
      register: (id, title, layerType, cesiumObject, isBasemap, initialFillColor) =>
        this.register(id, title, layerType, cesiumObject, isBasemap, initialFillColor),
      addPolygonOutlines: (dataSource, color, width) => this.addPolygonOutlines(dataSource, color, width),
      emitCrsCheckResult: (id, result) => this.emitCrsCheckResult(id, result),
      emitFeaturesTruncated: (id, totalCount, loadedCount) =>
        this.emit("layer:features-truncated", { id, totalCount, loadedCount }),
      waitForRenderSettle: () => this.waitForRenderSettle(),
      defaultOutlineColor: LayerManager.DEFAULT_OUTLINE_COLOR,
      defaultOutlineColorHex: LayerManager.DEFAULT_OUTLINE_COLOR_HEX,
    });
    this.cameraHighlight = new CameraHighlight(viewer, {
      requireLayer: (id) => this.requireLayer(id),
      getLayerStyle: (id) => this.getLayerStyle(id),
    });
  }

  /**
   * apiKey ile ilgili ayarlari (Map.ts constructor'indan) gec-yapilandirir.
   * Sadece verilen alanlar guncellenir, digerleri oldugu gibi kalir --
   * boylece Map.ts, MapOptions'ta apiKey verilmemisse bu metodu hic
   * cagirmayabilir ya da kismi bir nesne geciebilir.
   */
  configure(options: {
    readonly apiKey?: string;
    readonly trustedApiKeyHosts?: readonly string[];
    readonly apiKeyDiscoveryUrl?: string;
  }): void {
    this.apiKeyPolicy.configure(options);
    if (options.apiKey !== undefined) {
      // configureTucbs() rotasyonu (bkz Map.ts registerApiKeyRefresh) bu
      // configure()'i HALIHAZIRDA baglanmis bir LayerManager uzerinde
      // tekrar cagirabilir -- TucbsLayerList gibi tuketiciler apiKey'in
      // (yeniden) set edildigini CANLI olarak bu event ile ogrenir (ör.
      // "yetkili katmanlari getir" butonunun gorunurlugu).
      this.emit("apiKey:change", { hasApiKey: true });
    }
  }

  /** apiKey configure() ile atanmis mi -- SADECE varligi, degerin kendisi
   * degil (gercek deger ApiKeyPolicy icinde #apiKey olarak kapali kalir). */
  get hasApiKey(): boolean {
    return this.apiKeyPolicy.hasApiKey;
  }

  /**
   * apiKey’e göre yetkili WMS/WFS/WMTS listesi — {@code GET /layers} + {@code X-API-Key}.
   * Checklist: getLayerList eşdeğeri.
   *
   * @example
   * ```ts
   * const authorizedLayers = await map.layerManager.getAuthorizedLayers();
   * console.log(`${authorizedLayers.length} yetkili katman bulundu.`);
   * ```
   */
  async getAuthorizedLayers(): Promise<AuthorizedLayerInfo[]> {
    return this.apiKeyPolicy.getAuthorizedLayers();
  }

  /** {@link getAuthorizedLayers} alias (checklist getLayerList). */
  async getLayerList(): Promise<AuthorizedLayerInfo[]> {
    return this.apiKeyPolicy.getLayerList();
  }

  /**
   * Bir {@link AuthorizedLayerInfo}'nun {@link addAuthorizedLayer} ile
   * eklenebilir olup olmadigini bildirir (servisUrl + cozumlenmis katman
   * adi + WMTS ise wmtsTileMatrixSet sarti). Gercek mantik
   * `auth/ApiKeyPolicy.ts`'te (bkz. GC-03 Adim 3 — hem Lit bilesen hem
   * baska bir UI katmani AYNI kaynagi kullanabilsin diye).
   *
   * @example
   * ```ts
   * const addable = authorizedLayers.filter((info) => map.layerManager.canAddAuthorizedLayer(info));
   * ```
   */
  canAddAuthorizedLayer(info: AuthorizedLayerInfo): boolean {
    return this.apiKeyPolicy.canAddAuthorizedLayer(info);
  }

  /**
   * {@link getAuthorizedLayers}'tan donen bir {@link AuthorizedLayerInfo}'yu
   * haritaya ekler — servis turune gore WMS/WFS/WMTS olarak {@link add}'a
   * yonlendirir. {@link canAddAuthorizedLayer} false donuyorsa
   * `LayerOperationError` firlatir.
   *
   * @example
   * ```ts
   * const authorizedLayers = await map.layerManager.getAuthorizedLayers();
   * await map.layerManager.addAuthorizedLayer(authorizedLayers[0]);
   * ```
   */
  async addAuthorizedLayer(info: AuthorizedLayerInfo): Promise<ManagedLayer> {
    const resolved = this.apiKeyPolicy.resolveAddOptions(info);
    if (resolved.layerType === "WMS") return this.add("WMS", resolved.options);
    if (resolved.layerType === "WFS") return this.add("WFS", resolved.options);
    return this.add("WMTS", resolved.options);
  }

  // ── apiKey ic yardimcilari (auth/ApiKeyPolicy.ts'e delege) ────────────────

  /**
   * URL'in apiKey gerektiren bir servis deseni (ucbp-api OGC proxy veya
   * configure edilmis trustedApiKeyHosts) tasiyip tasimadigini, apiKey'in
   * o an var olup olmadigindan BAGIMSIZ olarak bildirir. Tuketiciler
   * (ör. TucbsMapPreview) bunu, apiKey yok/gecersizken bir katmanin
   * gercekten acik olup olmadigina karar vermek icin kullanir.
   */
  layerRequiresApiKey(url: string): boolean {
    return this.apiKeyPolicy.layerRequiresApiKey(url);
  }

  // ── Sorgulama ────────────────────────────────────────────────────────────

  /** Yönetilen tüm katmanları (basemap dahil) döndürür. */
  getLayers(): ManagedLayer[] {
    return Array.from(this.items.values());
  }

  /** Kimliği verilen katmanı döndürür, yoksa `undefined`. */
  getLayerById(id: string): ManagedLayer | undefined {
    return this.items.get(id);
  }

  // ── Katman stili: vektör (WFS + LOCAL) ─────────────────────────────────────
  // Sadece Entity-tabanlı (GeoJsonDataSource/KmlDataSource/CustomDataSource)
  // katmanlarda geçerli. WMS/WMTS için bkz. "Katman stili: WMS/WMTS" bölümü.

  /** Katmanın entity'lerindeki gerçek veri kolonlarını (layerId/featureId hariç) döndürür. */
  getEntityPropertyNames(id: string): string[] {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) return [];

    const names = new Set<string>();
    for (const entity of managed.cesiumObject.entities.values) {
      const bag = entity.properties;
      if (bag === undefined) continue;
      for (const name of bag.propertyNames) {
        if (name === "layerId" || name === "featureId") continue;
        names.add(name);
      }
    }
    return Array.from(names);
  }

  /** Bir kolonun tüm benzersiz değerlerini (kategorik/enum stil için) döndürür. */
  getUniqueColumnValues(id: string, column: string): (string | number)[] {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) return [];

    const time = this.viewer.clock.currentTime;
    const values = new Set<string | number>();
    for (const entity of managed.cesiumObject.entities.values) {
      const value = this.readProperty(entity, column, time);
      if (value !== null) values.add(value);
    }
    return Array.from(values);
  }

  /** Bir katmanin (entity-tabanli) GERCEK ozellik/sekil sayisini dondurur --
   * addPolygonOutlineCompanion ile eklenen ic companion polyline'lar (bkz
   * outlineCompanionEntities) HARIC tutulur (bkz getLayerGeoJSON'daki ayni
   * filtre). Entity-tabanli olmayan (ImageryLayer) katmanlarda undefined
   * doner. TucbsStyleEditor gibi tuketiciler bunu, cok BUYUK katmanlarda
   * (bkz kullanici bildirimi: 27458 ozellikli bir WFS katmaninda "Dış Hat
   * Genişliği" degisikligi -- Cesium geometriyi HER entity icin yeniden
   * insa etmesi gerektigi icin -- gorunur bir etki olmadan surekli
   * "yükleniyor" gosterip bitiyordu) pahali/geometri-etkileyen stil
   * kontrollerini devre disi birakmak icin kullanir. */
  getFeatureCount(id: string): number | undefined {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) return undefined;
    let count = 0;
    for (const entity of managed.cesiumObject.entities.values) {
      if (!this.isOutlineCompanion(entity)) count++;
    }
    return count;
  }

  /** Bir katmanın (entity-tabanli herhangi bir katman -- TucbsLayerList
   * SADECE Cizim Katmani/DRAWING icin bu aksiyonu menuye ekler, bkz
   * TucbsLayerList._openMenuPortal) tum sekillerini GeoJSON FeatureCollection
   * olarak dondurur (TucbsLayerExport'un indirme aksiyonu icin).
   * Entity-tabanli olmayan (ImageryLayer) katmanlarda undefined doner.
   * addPolygonOutlineCompanion ile eklenen ic companion polyline'lar (bkz
   * outlineCompanionEntities) HARIC tutulur -- bunlar poligonun dis hattini
   * gostermek icin eklenmis gorsel bir workaround, sekli TEKRAR eden sahte
   * bir LineString feature olarak disa aktarilmamali. */
  getLayerGeoJSON(id: string): FeatureCollection | undefined {
    return layerExporter.getLayerGeoJSON(
      this.requireLayer(id),
      this.viewer.clock.currentTime,
      (entity) => this.isOutlineCompanion(entity),
    );
  }

  /** getLayerGeoJSON()'i bir ".geojson" dosyasi olarak indirir -- TucbsLayerExport
   * bu ince tetikleyici cagriyi yapar (bkz TucbsMapExport/exportJPEG ile AYNI
   * "yakalama/indirme mantigi @tucbs/core'da" kurali). Entity-tabanli olmayan
   * bir katman icin (getLayerGeoJSON undefined donerse) sessizce hicbir sey
   * yapmaz.
   *
   * @example
   * ```ts
   * map.layerManager.exportLayerGeoJSON("katman-id", "katmanim");
   * ```
   */
  exportLayerGeoJSON(id: string, filename = "katman"): void {
    layerExporter.exportLayerGeoJSON(this.getLayerGeoJSON(id), filename);
  }

  /** Analiz sonucu katmanı KML indirir. Geometri GeoJSON indirmesiyle aynıdır. */
  exportLayerKml(id: string, filename = "katman"): void {
    layerExporter.exportLayerKml(this.getLayerGeoJSON(id), filename);
  }

  /** Analiz sonucu katmanı Shapefile zip indirir. Geometri GeoJSON indirmesiyle aynıdır. */
  exportLayerShapefile(id: string, filename = "katman"): void {
    layerExporter.exportLayerShapefile(this.getLayerGeoJSON(id), filename);
  }

  /** Tampon veya kesişim katmanını işaretler. Üç nokta menüsü Dışa Aktar'ı buna bakar. */
  markAnalysisResult(id: string): void {
    this.analysisResultIds.add(id);
  }

  /** Katman tampon/kesişim sonucu mu. Yüklenen GEOJSON bu kümede değildir. */
  isAnalysisResult(id: string): boolean {
    return this.analysisResultIds.has(id);
  }

  /** id'li katman WMS/WCS ise VE kesif sirasinda sunucunun GeoTIFF-uyumlu
   * bir formati (tiffFormat) desteklediği tespit edildiyse true doner --
   * TucbsLayerList "GeoTIFF Olarak Dışa Aktar" menu ogesini SADECE bu true
   * ise gosterir (bkz TucbsServiceUpload capabilities format kesfi). */
  isGeoTiffExportAvailable(id: string): boolean {
    return layerExporter.isGeoTiffExportAvailable(this.items.get(id), this.ogcLayerFactory.getServiceOptions(id));
  }

  /** WMS GetMap / WCS GetCoverage'i sunucunun desteklediği GeoTIFF-uyumlu
   * formatla (bkz isGeoTiffExportAvailable) yeniden istekleyip ".tif" olarak
   * indirir. Cesium/canvas'a HIC dokunmaz -- WCS'in resolveWcsImageUrl'i ile
   * AYNI "ham HTTP indirme" deseninde (bkz o metod), tek fark burada format
   * PNG'ye SABITLENMIYOR, sunucunun kendi GeoTIFF ciktisi ISTENIYOR.
   * Desteklenmiyorsa (isGeoTiffExportAvailable false) hata firlatir --
   * cagiran taraf (TucbsLayerExport) bunu yakalar.
   *
   * @example
   * ```ts
   * await map.layerManager.exportLayerAsGeoTiff("katman-id", "katmanim");
   * ```
   */
  async exportLayerAsGeoTiff(id: string, filename = "katman"): Promise<void> {
    const managed = this.requireLayer(id);
    await layerExporter.exportLayerAsGeoTiff(
      managed,
      this.ogcLayerFactory.getServiceOptions(id),
      filename,
      (serviceType, url) => this.apiKeyPolicy.resolveOgcProxyUrl(serviceType, url),
      {
        mergeApiKeyHeader: (headers, url) => this.apiKeyPolicy.mergeApiKeyHeader(headers, url),
        buildAuthHeaders: (authToken) => this.apiKeyPolicy.buildAuthHeaders(authToken),
      },
    );
  }

  /** Bir kolonun sayısal min/max aralığını döndürür (gradient/bin modunda min/max verilmezse otomatik kullanılır). */
  getColumnRange(id: string, column: string): { min: number; max: number } | null {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) return null;
    return this.styleEngine.getColumnRange(
      managed.cesiumObject,
      this.viewer.clock.currentTime,
      column
    );
  }

  /**
   * Katmanın dolgu/dış-hat stilini uygular. Sadece Entity tabanlı (WFS/LOCAL)
   * katmanlarda çalışır. Gradient/bin modunda `min`/`max`'tan verilmeyen uç
   * getColumnRange() ile veri aralığından otomatik hesaplanır; verilen uç
   * aynen kullanılır (tucbs-react'teki "min===max===v her zaman" bug'ı burada
   * YOK — bkz. project_ucbp_api_styleeditor_arastirma memory). Ters aralık
   * (`min` > `max`, uçlardan biri veriden gelince de oluşabilir) düzeltilmez;
   * geçerli bir aralık vermek çağıranın sorumluluğundadır.
   *
   * @example
   * ```ts
   * await map.layerManager.applyLayerStyle("katman-id", {
   *   fill: { mode: "solid", color: "#3388ff", opacity: 0.6 },
   *   outline: { enabled: true, color: "#1d4e89", width: 2 },
   * });
   * ```
   */
  // Donen Promise, GENISLIK gercekten degistiyse (bkz asagidaki widthChanged)
  // waitForRenderSettle() ile cozulur -- cagiran taraf (TucbsStyleEditor)
  // bu Promise'i "Uygulanıyor…" gostergesini ne kadar sure tutacagini
  // bilmek icin kullanabilir. Renk/opaklik gibi geometriye dokunmayan
  // degisikliklerde HEMEN cozulur (yapay bir bekleme EKLENMEZ).
  async applyLayerStyle(id: string, spec: LayerStyleSpec): Promise<void> {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) {
      throw new LayerOperationError(
        "LAYER_STYLE_NOT_VECTOR",
        `applyLayerStyle sadece vektör (Entity tabanlı) katmanlarda kullanılabilir: "${id}"`
      );
    }
    await this.styleEngine.applyLayerStyle(
      id,
      managed.cesiumObject,
      managed.layerType === "DRAWING" || managed.layerType === "MEASURE",
      spec
    );
  }

  /** Bir vektor katmana en son uygulanan stili döndürür (TucbsLegendPanel için). */
  getLayerStyle(id: string): LayerStyleSpec | undefined {
    return this.styleEngine.getStyle(id);
  }

  /** Katmana eklenirken atanan ilk (random) rengi döndürür — sonraki stil
   * değişikliklerinden etkilenmez. TucbsStyleEditor'ün "Sıfırla" işlevi
   * için kullanılır. */
  getInitialFillColor(id: string): string | undefined {
    return this.items.get(id)?.initialFillColor;
  }

  /** Basemap HARİÇ tüm imagery (WMS/WMTS/WCS/GEOTIFF) katmanlarının Cesium `ImageryLayer`'larını döndürür. */
  getImageryLayers(): ImageryLayer[] {
    return Array.from(this.items.values())
      .filter(
        (m): m is ManagedLayer & { cesiumObject: ImageryLayer } =>
          !m.isBasemap && m.cesiumObject instanceof ImageryLayer
      )
      .map((m) => m.cesiumObject);
  }

  /** SADECE basemap olarak işaretli imagery katmanlarının Cesium `ImageryLayer`'larını döndürür. */
  getBasemapLayers(): ImageryLayer[] {
    return Array.from(this.items.values())
      .filter(
        (m): m is ManagedLayer & { cesiumObject: ImageryLayer } =>
          m.isBasemap && m.cesiumObject instanceof ImageryLayer
      )
      .map((m) => m.cesiumObject);
  }

  /** Cesium `Viewer`'ın `dataSources` koleksiyonunu doğrudan döndürür. */
  getDataSourceLayers(): DataSourceCollection {
    return this.viewer.dataSources;
  }

  /** Belirli bir katman türündeki (`WMS`/`WFS`/... ) tüm yönetilen katmanları döndürür. */
  getLayerByType(layerType: LayerType): ManagedLayer[] {
    return Array.from(this.items.values()).filter(
      (m) => m.layerType === layerType
    );
  }

  // ── Kamera ───────────────────────────────────────────────────────────────

  /**
   * Kamerayı, katmanın tüm görünür alanına (extent) düz tepeden bakışla yakınlaştırır.
   *
   * @example
   * ```ts
   * await map.layerManager.zoomToLayer("katman-id");
   * ```
   */
  async zoomToLayer(id: string): Promise<boolean> {
    return this.cameraHighlight.zoomToLayer(id);
  }

  /** Kamerayı, tek bir entity'nin çerçevesine düz tepeden bakışla yakınlaştırır. */
  async zoomToEntity(entity: Entity, options?: { duration?: number }): Promise<boolean> {
    return this.cameraHighlight.zoomToEntity(entity, options);
  }

  /** Bir entity'yi, kendi stiline dokunmadan sabit renkli bir "outline" ile geçici olarak vurgular. */
  highlightEntity(entity: Entity): void {
    this.cameraHighlight.highlightEntity(entity);
  }

  /** {@link highlightEntity} ile eklenen geçici vurguyu kaldırır (aktif vurgu yoksa no-op). */
  clearHighlight(): void {
    this.cameraHighlight.clearHighlight();
  }

  // ── add() overloads ───────────────────────────────────────────────────────

  /**
   * Haritaya yeni bir katman ekler (WMS/WMTS/WFS/WCS/GEOTIFF/GEOJSON/KML/KMZ/SHP/CSV).
   * @param layerType - Eklenecek katmanın türü; `options`'ın şekli buna göre belirlenir.
   * @param options - Katman türüne özgü seçenekler (bkz ilgili `*LayerOptions` tipi).
   * @returns Eklenen katmanın `ManagedLayer` kaydı.
   * @throws {LayerOperationError} `id` zaten kullanılıyorsa veya `layerType` "XYZ"/"DRAWING"/"MEASURE" ise (bunlar `add()` ile desteklenmez).
   *
   * @example
   * ```ts
   * const layer = await map.layerManager.add("WMS", {
   *   id: "world-continents",
   *   title: "World Continents (WMS)",
   *   url: "https://demo.mapserver.org/cgi-bin/wms",
   *   layers: "continents",
   *   version: "1.3.0",
   * });
   * ```
   */
  add(layerType: "WMS", options: WMSLayerOptions): Promise<ManagedLayer>;

  /**
   * Haritaya yeni bir WMTS (Web Map Tile Service) katmanı ekler.
   * @param layerType - `"WMTS"`.
   * @param options - WMTS katman seçenekleri (bkz `WMTSLayerOptions`).
   * @returns Eklenen katmanın `ManagedLayer` kaydı.
   * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
   *
   * @example
   * ```ts
   * const layer = await map.layerManager.add("WMTS", {
   *   id: "hgm-ortofoto",
   *   title: "HGM Ortofoto (WMTS)",
   *   url: "https://cdn.tucbs.gov.tr/wmts",
   *   layer: "ortofoto",
   *   tileMatrixSetID: "GoogleMapsCompatible",
   * });
   * ```
   */
  add(layerType: "WMTS", options: WMTSLayerOptions): Promise<ManagedLayer>;

  /**
   * Haritaya yeni bir WFS (Web Feature Service) katmanı ekler.
   * @param layerType - `"WFS"`.
   * @param options - WFS katman seçenekleri (bkz `WFSLayerOptions`).
   * @returns Eklenen katmanın `ManagedLayer` kaydı.
   * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
   *
   * @example
   * ```ts
   * const layer = await map.layerManager.add("WFS", {
   *   id: "il-sinirlari",
   *   title: "İl Sınırları (WFS)",
   *   url: "https://demo.mapserver.org/cgi-bin/wfs",
   *   typeName: "il_sinirlari",
   * });
   * ```
   */
  add(layerType: "WFS", options: WFSLayerOptions): Promise<ManagedLayer>;

  /**
   * Haritaya yeni bir WCS (Web Coverage Service) katmanı ekler.
   * @param layerType - `"WCS"`.
   * @param options - WCS katman seçenekleri (bkz `WCSLayerOptions`).
   * @returns Eklenen katmanın `ManagedLayer` kaydı.
   * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
   *
   * @example
   * ```ts
   * const layer = await map.layerManager.add("WCS", {
   *   id: "arazi-yukseklik",
   *   title: "Arazi Yükseklik Modeli (WCS)",
   *   url: "https://demo.mapserver.org/cgi-bin/wcs",
   *   coverageId: "dem",
   * });
   * ```
   */
  add(layerType: "WCS", options: WCSLayerOptions): Promise<ManagedLayer>;

  /**
   * Haritaya yeni bir GeoTIFF katmanı ekler. Not: mevcut Cesium sürümünde
   * (≥1.143) henüz desteklenmiyor (bkz `LayerManager.addGeoTiff`).
   * @param layerType - `"GEOTIFF"`.
   * @param options - GeoTIFF katman seçenekleri (bkz `GeoTiffLayerOptions`).
   * @returns Eklenen katmanın `ManagedLayer` kaydı.
   * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
   *
   * @example
   * ```ts
   * const layer = await map.layerManager.add("GEOTIFF", {
   *   id: "uydu-goruntusu",
   *   title: "Uydu Görüntüsü (GeoTIFF)",
   *   url: "https://example.com/data/goruntu.tif",
   * });
   * ```
   */
  add(
    layerType: "GEOTIFF",
    options: GeoTiffLayerOptions
  ): Promise<ManagedLayer>;

  /**
   * Haritaya yerel bir dosyadan (GeoJSON/KML/KMZ/SHP/CSV) katman ekler.
   * Aşağıdaki örnek GeoJSON içindir; KML/KMZ/SHP/CSV için `layerType` ve
   * `data`'nın formatı değişir, `options`'ın diğer alanları aynıdır.
   * @param layerType - `"GEOJSON" | "KML" | "KMZ" | "SHP" | "CSV"`.
   * @param options - Yerel katman seçenekleri (bkz `LocalLayerOptions`).
   * @returns Eklenen katmanın `ManagedLayer` kaydı.
   * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
   *
   * @example
   * ```ts
   * const layer = await map.layerManager.add("GEOJSON", {
   *   id: "kendi-verim",
   *   title: "Kendi Verim (GeoJSON)",
   *   layerType: "GEOJSON",
   *   data: { type: "FeatureCollection", features: [] },
   * });
   * ```
   */
  add(
    layerType: "GEOJSON" | "KML" | "KMZ" | "SHP" | "CSV",
    options: LocalLayerOptions
  ): Promise<ManagedLayer>;
  async add(
    layerType: LayerType,
    options:
      | WMSLayerOptions
      | WMTSLayerOptions
      | WFSLayerOptions
      | WCSLayerOptions
      | GeoTiffLayerOptions
      | LocalLayerOptions
  ): Promise<ManagedLayer> {
    this.assertUniqueId(options.id);

    switch (layerType) {
      case "WMS":
        return this.addWMS(options as WMSLayerOptions);
      case "WMTS":
        return this.addWMTS(options as WMTSLayerOptions);
      case "WFS":
        return this.addWFS(options as WFSLayerOptions);
      case "WCS":
        return this.addWCS(options as WCSLayerOptions);
      case "GEOTIFF":
        return this.addGeoTiff(options as GeoTiffLayerOptions);
      case "GEOJSON":
      case "KML":
      case "KMZ":
        return this.addLocalKmlGeoJson(layerType, options as LocalLayerOptions);
      case "SHP":
        return this.addShp(options as LocalLayerOptions);
      case "CSV":
        return this.addCsv(options as LocalLayerOptions);
      case "XYZ":
        throw new LayerOperationError(
          "LAYER_TYPE_UNSUPPORTED_XYZ",
          "XYZ katmanı add() ile desteklenmiyor. Map.setBasemap() kullanın."
        );
      case "DRAWING":
        throw new LayerOperationError(
          "LAYER_TYPE_UNSUPPORTED_DRAWING",
          '"DRAWING" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.'
        );
      case "MEASURE":
        throw new LayerOperationError(
          "LAYER_TYPE_UNSUPPORTED_MEASURE",
          '"MEASURE" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.'
        );
    }
  }

  // ── Görünürlük & Opaklık ─────────────────────────────────────────────────

  /**
   * Bir katmanın görünürlüğünü ayarlar.
   *
   * @example
   * ```ts
   * map.layerManager.setVisible("katman-id", false);
   * ```
   */
  setVisible(id: string, visible: boolean): void {
    const managed = this.requireLayer(id);
    managed.cesiumObject.show = visible;
    this.emit("layer:visibility", { id, visible });
  }

  /**
   * Bir katmanın opaklığını (0-1 arası, sınırlanır) ayarlar.
   *
   * @example
   * ```ts
   * map.layerManager.setOpacity("katman-id", 0.5);
   * ```
   */
  setOpacity(id: string, opacity: number): void {
    const clamped = Math.max(0, Math.min(1, opacity));
    const managed = this.requireLayer(id);

    if (managed.cesiumObject instanceof ImageryLayer) {
      managed.cesiumObject.alpha = clamped;
    } else {
      this.setDataSourceOpacity(managed.cesiumObject, clamped);
    }
    this.emit("layer:opacity", { id, opacity: clamped });
  }

  // ── Z-sıra ───────────────────────────────────────────────────────────────

  // raise/lower/raiseToTop/lowerToBottom birbirinin harfi harfine kopyasiydi
  // (tek fark cagrilan Cesium koleksiyon metodunun adiydi) -- Adim 9
  // (Temizlik) kapsaminda tek bir ozel yardimciya indirildi (bkz
  // project_ucbp_api_god_component_refactor_arastirma_ozeti, GC-01 2.2
  // Ornek 3). imageryLayers/dataSources ayni metod isimlerini (raise/
  // lower/raiseToTop/lowerToBottom/indexOf) FARKLI parametre tipleriyle
  // (ImageryLayer vs DataSource) bildirdigi icin TS statik olarak union
  // uzerinden guvenli cagrimayi dogrulayamiyor -- "as never" cast'i burada
  // BILEREK kullaniliyor (runtime'da managed.cesiumObject ile collection
  // instanceof kontrolune gore ZATEN eslesiyor).
  private _move(id: string, op: "raise" | "lower" | "raiseToTop" | "lowerToBottom"): void {
    const managed = this.requireLayer(id);
    const collection = managed.cesiumObject instanceof ImageryLayer
      ? this.viewer.imageryLayers
      : this.viewer.dataSources;
    const oldIndex = collection.indexOf(managed.cesiumObject as never);
    (collection[op] as (x: unknown) => void)(managed.cesiumObject as never);
    const newIndex = collection.indexOf(managed.cesiumObject as never);
    this.reindexLayerOrder();
    this.emit("layer:reorder", { id, oldIndex, newIndex, layer: managed });
  }

  /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde bir sıra yukarı taşır. */
  raise(id: string): void {
    this._move(id, "raise");
  }

  /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde bir sıra aşağı taşır. */
  lower(id: string): void {
    this._move(id, "lower");
  }

  /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde en üste taşır. */
  raiseToTop(id: string): void {
    this._move(id, "raiseToTop");
  }

  /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde en alta taşır. */
  lowerToBottom(id: string): void {
    this._move(id, "lowerToBottom");
  }

  /** TucbsLayerList sürükle-bırak yeniden sıralaması için: basemap hariç tüm katmanların yeni z-sırasını tek çağrıda uygular. */

  // TucbsLayerList'teki surukle-birak yeniden siralama icin: basemap HARIC
  // TUM katmanlarin YENI z-sirasini (en usttekinden en alttakine, yani
  // raiseToTop()'un "index 0" varsayimiyla TUTARLI) TEK cagride uygular.
  // WHY (BUNUN YERINE tek-adimlik raise()/lower() cagrilarinin bir
  // DONGUDE, KARISIK liste indeks farki kadar tekrarlanmasi NEDEN YANLIS):
  // Cesium'da imagery (WMS/WMTS/WCS) ve dataSource (GEOJSON/KML/WFS/...)
  // katmanlari AYRI koleksiyonlardir (viewer.imageryLayers / viewer.
  // dataSources); TucbsLayerList'in gosterdigi liste ise IKI turu de
  // KARISIK sirada tutar. Suruklenen bir imagery katmani, listede araya
  // giren dataSource katmanlari kadar "fazladan" raise()/lower() adimi
  // alirdi -- ama bu adimlar SADECE imagery koleksiyonu icinde uygulanir,
  // ve imageryLayers[0] HER ZAMAN basemap'e ayrilmistir (bkz Map.
  // setBasemap). Fazladan bir lower() cagrisi, katman zaten basemap'in
  // hemen ustundeyken (index 1) onu basemap'le (index 0) YER
  // DEGISTIRIRDI -- katman artik basemap'in ALTINDA kalip haritada
  // GORSEL OLARAK TAMAMEN KAYBOLURDU (basemap tum globe'u kapladigi
  // icin), listede ise HALA GORUNMEYE devam ederdi (bkz kullanici
  // bildirimi: "sadece TucbsServiceUpload/WMS-WMTS-WCS katmanlarinda,
  // TucbsFileUpload/dataSource katmanlarinda degil" -- bu asimetri tam
  // olarak bu kok nedenle ortusuyor). Bu metod bunun yerine her katmani
  // KENDI koleksiyonu icinde, KENDI turdeslerine gore dogru sirada
  // raiseToTop() ile (alttan basa dogru islenerek) yeniden konumlandirir
  // -- basemap'e ASLA dokunmaz (o zaten `orderedIds` icinde YER ALMAZ,
  // bkz TucbsLayerList._syncFromLayerManager'in isBasemap filtresi).
  reorder(orderedIds: readonly string[]): void {
    // "layer:reorder" payload'u icin (bkz asagisi) -- suruklenen katman
    // TucbsLayerList tarafindan HER ZAMAN `orderedIds[0]` olarak gecilir
    // (bkz TucbsLayerList._endDrag: dragged.id degistirilen listenin
    // basina degil, YENI konumuna splice edilir; burada sadece raporlama
    // amacli "en ilgili" id secilir, geri kalan mantik TUM id'ler icin
    // esit calisir). Gercek koleksiyon-ici eski index'i, asagidaki
    // raiseToTop() dongusu BASLAMADAN ONCE okunur.
    const primaryId = orderedIds[0];
    const primaryManaged = primaryId !== undefined ? this.items.get(primaryId) : undefined;
    const primaryIsImagery = primaryManaged?.cesiumObject instanceof ImageryLayer;
    const primaryOldIndex = primaryManaged
      ? primaryIsImagery
        ? this.viewer.imageryLayers.indexOf(primaryManaged.cesiumObject as ImageryLayer)
        : this.viewer.dataSources.indexOf(primaryManaged.cesiumObject as DataSource)
      : -1;

    const imageryIds: string[] = [];
    const dataSourceIds: string[] = [];
    for (const id of orderedIds) {
      const managed = this.items.get(id);
      if (managed === undefined) continue;
      if (managed.cesiumObject instanceof ImageryLayer) {
        imageryIds.push(id);
      } else {
        dataSourceIds.push(id);
      }
    }

    for (let i = imageryIds.length - 1; i >= 0; i--) {
      const managed = this.items.get(imageryIds[i]!);
      if (managed?.cesiumObject instanceof ImageryLayer) {
        this.viewer.imageryLayers.raiseToTop(managed.cesiumObject);
      }
    }
    for (let i = dataSourceIds.length - 1; i >= 0; i--) {
      const managed = this.items.get(dataSourceIds[i]!);
      if (managed !== undefined && !(managed.cesiumObject instanceof ImageryLayer)) {
        this.viewer.dataSources.raiseToTop(managed.cesiumObject);
      }
    }

    this.reindexLayerOrder();

    // "layer:reorder" dinleyicileri (bkz TucbsLayerList._onLayerReorder)
    // payload'un icerigini KULLANMAZ, sadece listeyi yeniden senkronlamak
    // icin tetiklenmesini bekler -- tek-adimlik raise/lower ile AYNI event
    // sekli (id/oldIndex/newIndex/layer) burada da korunur.
    if (primaryManaged !== undefined && primaryId !== undefined) {
      const primaryNewIndex = primaryIsImagery
        ? this.viewer.imageryLayers.indexOf(primaryManaged.cesiumObject as ImageryLayer)
        : this.viewer.dataSources.indexOf(primaryManaged.cesiumObject as DataSource);
      this.emit("layer:reorder", {
        id: primaryId,
        oldIndex: primaryOldIndex,
        newIndex: primaryNewIndex,
        layer: primaryManaged,
      });
    }
  }

  // ── Kaldırma ─────────────────────────────────────────────────────────────

  /**
   * Katmanı haritadan ve tüm iç bookkeeping (stil/apiKey/sayaç kayıtları) yapılarından kaldırır.
   *
   * @example
   * ```ts
   * map.layerManager.removeLayer("katman-id");
   * ```
   */
  removeLayer(id: string): void {
    const managed = this.requireLayer(id);

    if (managed.cesiumObject instanceof ImageryLayer) {
      this.viewer.imageryLayers.remove(managed.cesiumObject, true);
    } else {
      void this.viewer.dataSources.remove(managed.cesiumObject, true);
    }

    this.items.delete(id);
    this.analysisResultIds.delete(id);
    this.ogcLayerFactory.deleteServiceOptions(id);
    this.styleEngine.deleteStyle(id);
    this.shapeLayerBridge.deleteCounter(id);
    this.emit("layer:remove", { layer: managed });
  }

  // ── İç: WMS/WMTS/WFS/WCS/GeoTIFF ────────────────────────────────────────
  // Orkestrasyon layers/ogc/OgcLayerFactory.ts'e tasindi (bkz Adim 8/Faz 2) --
  // asagidaki delegeler ISIM/IMZA/JSDoc AYNEN korunur: 5 tanesi (addWMS/
  // addWMTS/addWFS/addWCS/addGeoTiff) add() dispatcher'i tarafindan
  // DOGRUDAN cagrilir, digerleri (setWmsStyle vb.) public API yuzeyidir
  // (bkz kural 3 -- yuzey sabit).

  private addWMS(options: WMSLayerOptions): Promise<ManagedLayer> {
    return this.ogcLayerFactory.addWMS(options);
  }

  private addWMTS(options: WMTSLayerOptions): Promise<ManagedLayer> {
    return this.ogcLayerFactory.addWMTS(options);
  }

  /** Bir WMS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
  async getWmsAvailableStyles(id: string): Promise<ServiceStyleOption[]> {
    return this.ogcLayerFactory.getWmsAvailableStyles(id);
  }

  /** WMS katmanını seçilen sunucu-tanımlı stille (STYLES parametresiyle) yeniden kurar. */
  async setWmsStyle(id: string, styleName: string): Promise<void> {
    return this.ogcLayerFactory.setWmsStyle(id, styleName);
  }

  /** WMS GetLegendGraphic URL'ini (apiKey varsa query parametresiyle) oluşturur. */
  getWmsLegendGraphicUrl(id: string, styleName?: string): string {
    return this.ogcLayerFactory.getWmsLegendGraphicUrl(id, styleName);
  }

  /** Bir WMTS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
  async getWmtsAvailableStyles(id: string): Promise<ServiceStyleOption[]> {
    return this.ogcLayerFactory.getWmtsAvailableStyles(id);
  }

  /** WMTS katmanını seçilen sunucu-tanımlı stille yeniden kurar. */
  async setWmtsStyle(id: string, styleName: string): Promise<void> {
    return this.ogcLayerFactory.setWmtsStyle(id, styleName);
  }

  // WFS de lokal vektor katmanlari gibi varsayilan olarak zemine oturtulur.
  // Cesium, zemine oturan (GroundPrimitive) poligonlari oturmayanlardan
  // AYRI bir geciste ve her zaman onlarin altinda cizer; iki tur karisinca
  // Katman Yonetimi'ndeki sira haritaya yansimiyordu (WFS hep ustte
  // kaliyordu). Zemine oturan katmanlar ise kendi aralarinda
  // viewer.dataSources sirasiyla cizilir (her dataSource'un
  // OrderedGroundPrimitiveCollection'i raiseToTop ile birlikte tasinir), bu
  // yuzden reorder() ek bir islem gerektirmez. Kutup/antimeridyen poligonlari
  // OutlineGeometry.disableRiskyPolygonOutlines zeminden ayirir.
  private addWFS(options: WFSLayerOptions): Promise<ManagedLayer> {
    return this.ogcLayerFactory.addWFS({
      ...options,
      clampToGround: options.clampToGround ?? true,
    });
  }

  private addWCS(options: WCSLayerOptions): Promise<ManagedLayer> {
    return this.ogcLayerFactory.addWCS(options);
  }

  private addGeoTiff(options: GeoTiffLayerOptions): Promise<ManagedLayer> {
    return this.ogcLayerFactory.addGeoTiff(options);
  }

  // ── İç: GeoJSON / KML / KMZ ──────────────────────────────────────────────

  private addLocalKmlGeoJson(
    layerType: "GEOJSON" | "KML" | "KMZ",
    options: LocalLayerOptions
  ): Promise<ManagedLayer> {
    return this.localSourceLoader.addLocalKmlGeoJson(layerType, options);
  }

  // ── İç: SHP ──────────────────────────────────────────────────────────────

  private addShp(options: LocalLayerOptions): Promise<ManagedLayer> {
    return this.localSourceLoader.addShp(options);
  }

  // ── İç: CSV ──────────────────────────────────────────────────────────────

  private addCsv(options: LocalLayerOptions): Promise<ManagedLayer> {
    return this.localSourceLoader.addCsv(options);
  }

  // ── İç: Basemap (Map sınıfı tarafından kullanılır) ───────────────────────

  /** @internal */
  _addBasemapImageryLayer(
    id: string,
    title: string,
    imageryLayer: ImageryLayer
  ): ManagedLayer {
    return this.register(id, title, "XYZ", imageryLayer, true);
  }

  /** @internal */
  _removeBasemapLayers(): void {
    for (const managed of this.items.values()) {
      if (managed.isBasemap && managed.cesiumObject instanceof ImageryLayer) {
        this.viewer.imageryLayers.remove(managed.cesiumObject, true);
        this.items.delete(managed.id);
      }
    }
  }

  // ── İç: Çizim Katmanı (Map'in DrawingManager köprüsü) ────────────────────
  // Orkestrasyon layers/sources/ShapeLayerBridge.ts'e tasindi (bkz Adim 7/Faz 3) --
  // asagidaki 3 metod SADECE ince delege; isim/imza AYNEN korunur cunku
  // Map.ts (draw:complete/draw:remove dinleyicileri) bunlari DOGRUDAN
  // cagirir (bkz kural 3 -- public/internal yuzey sabit).

  /** @internal */
  _addDrawnShape(id: string, title: string, shape: DrawnShape): Promise<ManagedLayer> {
    return this.shapeLayerBridge.addDrawnShape(id, title, shape);
  }

  /** @internal */
  _addMeasuredShape(id: string, title: string, shape: DrawnShape): Promise<ManagedLayer> {
    return this.shapeLayerBridge.addMeasuredShape(id, title, shape);
  }

  /** @internal */
  _removeDrawnShape(id: string, entity: Entity): void {
    this.shapeLayerBridge.removeDrawnShape(id, entity);
  }

  // ── Yardımcılar ──────────────────────────────────────────────────────────

  private register(
    id: string,
    title: string,
    layerType: LayerType,
    cesiumObject: ImageryLayer | DataSource,
    isBasemap: boolean,
    initialFillColor?: string
  ): ManagedLayer {
    if ("entities" in cesiumObject) {
      this.tagEntities(cesiumObject, id);
    }
    const managed: ManagedLayer = Object.freeze({
      id,
      title,
      layerType,
      cesiumObject,
      isBasemap,
      ...(initialFillColor !== undefined ? { initialFillColor } : {}),
    });
    this.items.set(id, managed);
    this.emit("layer:add", { layer: managed });
    return managed;
  }

  // addWFS/addLocalKmlGeoJson/addShp -- UCUNUN de ensureGeoJsonCrsSupport()
  // sonucunu register()'dan hemen sonra AYNI sekilde event'e cevirmesi
  // gerektigi icin (bkz layers/sources/geojsonCrs.ts CrsCheckResult), tekrari
  // onlemek amaciyla buraya alindi.
  private emitCrsCheckResult(id: string, result: CrsCheckResult | null): void {
    if (!result) return;
    switch (result.kind) {
      case "reprojected":
        this.emit("layer:crs-reprojected", { id, fromEpsg: result.fromEpsg, toEpsg: "EPSG:4326" });
        break;
      case "suspicious-unresolved-crs":
        this.emit("layer:crs-unresolved", { id, crsName: result.crsName });
        break;
    }
  }

  // InteractionManager'in entity:click payload'indaki layerId/featureId alanlarini
  // doldurabilmesi icin her DataSource-tabanli katmanin entity'lerini etiketler
  // (bkz claude-code-interactionmanager-drawingmanager-mimarisi-v1.md §3.4).
  private tagEntities(dataSource: DataSource, layerId: string): void {
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.properties === undefined) {
        entity.properties = new PropertyBag();
      }
      if (!entity.properties.hasProperty("layerId")) {
        entity.properties.addProperty("layerId", layerId);
      }
      if (!entity.properties.hasProperty("featureId")) {
        entity.properties.addProperty("featureId", entity.id);
      }
    }
    dataSource.entities.resumeEvents();
  }

  // raise/lower Cesium koleksiyonlarinin (imageryLayers / dataSources) sirasini
  // degistirir ama "items" Map'inin ekleme sirasini degistirmez; getLayers()
  // gercek z-sirasini donsun diye ImageryLayer'lari kendi koleksiyonundaki,
  // DataSource'lari da kendi koleksiyonundaki guncel sıraya gore yeniden
  // siralar (iki tur birbirine karisik oldugunda goreli sira korunur).
  private reindexLayerOrder(): void {
    const imageryIndex = new Map<ImageryLayer, number>();
    for (let i = 0; i < this.viewer.imageryLayers.length; i++) {
      imageryIndex.set(this.viewer.imageryLayers.get(i), i);
    }

    const dataSourceIndex = new Map<DataSource, number>();
    for (let i = 0; i < this.viewer.dataSources.length; i++) {
      dataSourceIndex.set(this.viewer.dataSources.get(i), i);
    }

    const orderOf = (managed: ManagedLayer): number =>
      (managed.cesiumObject instanceof ImageryLayer
        ? imageryIndex.get(managed.cesiumObject)
        : dataSourceIndex.get(managed.cesiumObject)) ?? Number.POSITIVE_INFINITY;

    // ML-04 duzeltmesi: TEK bir Array.sort comparator'iyla heterojen
    // (imagery+dataSource) bir siralamayi -- ayni-tur ciftler icin GERCEK
    // Cesium index'i, farkli-tur ciftler icin ise "onemsiz/return 0" --
    // dayatmak JS'in tutarli-comparator sartini ihlal ediyordu: "return 0"
    // TUM cift-elemanlar icin gecerli bir esdegerlik tanimlamiyordu, bu da
    // sonucu implementation-defined kiliyordu (bkz
    // project_ucbp_api_god_component_refactor_arastirma_ozeti, Adim 9 ML-04
    // -- somut tekrar uretim: 3+ karisik-tur katmanda raiseToTop() sonrasi
    // getLayers() gercek Cesium sirasini YANSITMIYORDU). Duzeltme: sort()
    // yerine, HER BIRI kendi icinde HOMOJEN (dolayisiyla ZATEN tutarli) iki
    // alt-listeye ayriliyor, sonra orijinal (bu cagriDAN ONCEKI) dizilisteki
    // "hangi slot imagery, hangi slot dataSource" deseni korunarak
    // birlestiriliyor -- boylece hem ayni-tur elemanlar GERCEK Cesium
    // index'ine gore (fonksiyonun asil amaci) hem farkli-tur elemanlarin
    // GORELI sirasi (WHY yorumundaki "karisik turler icin goreli sira
    // korunur" niyeti) HER durumda KESIN ve tutarli sekilde saglanir.
    const entries = Array.from(this.items.entries());
    const imageryEntries = entries
      .filter(([, m]) => m.cesiumObject instanceof ImageryLayer)
      .sort(([, a], [, b]) => orderOf(a) - orderOf(b));
    const dataSourceEntries = entries
      .filter(([, m]) => !(m.cesiumObject instanceof ImageryLayer))
      .sort(([, a], [, b]) => orderOf(a) - orderOf(b));

    let imageryCursor = 0;
    let dataSourceCursor = 0;
    const merged = entries.map(([, managed]) =>
      managed.cesiumObject instanceof ImageryLayer
        ? imageryEntries[imageryCursor++]!
        : dataSourceEntries[dataSourceCursor++]!
    );

    this.items.clear();
    for (const [id, managed] of merged) this.items.set(id, managed);
  }

  private requireLayer(id: string): ManagedLayer {
    const managed = this.items.get(id);
    if (managed === undefined) {
      throw new LayerOperationError("LAYER_NOT_FOUND", `Katman bulunamadı: "${id}"`);
    }
    return managed;
  }

  private assertUniqueId(id: string): void {
    if (this.items.has(id)) {
      throw new LayerOperationError("LAYER_ID_ALREADY_EXISTS", `"${id}" id'li katman zaten eklenmiş.`);
    }
  }

  /**
   * ML-12 düzeltmesi: OGC GetCapabilities'i apiKey header + proxy KURALLARIYLA
   * çeker. `TucbsServiceUpload` (GC-05) gibi ayrı bir `LayerManager`
   * referansına sahip tüketiciler de servis keşfi için bunu kullanır --
   * eskiden bu tüketiciler proxy/apiKey'den TAMAMEN habersiz çıplak `fetch`
   * kullanıyordu (bkz project_ucbp_api_ogc_capabilities_uygulama_plani, ML-12).
   * layers/ogc/OgcLayerFactory.ts'e delege (bkz Adim 8/Faz 2).
   */
  async getCapabilitiesDocument(
    baseUrl: string,
    serviceType: "WMS" | "WMTS" | "WFS" | "WCS",
    version: string,
    authToken?: string,
  ): Promise<Document> {
    return this.ogcLayerFactory.getCapabilitiesDocument(baseUrl, serviceType, version, authToken);
  }

  /**
   * Faz 5b (ML-12'nin DescribeCoverage boşluğu): WCS coverage'larının gerçek
   * coğrafi kapsama alanlarını `getCapabilitiesDocument` ile AYNI apiKey/proxy
   * politikasından geçirerek çeker -- eskiden bu istek proxy'siz gittiği için
   * CORS-korumalı sunucularda sessizce başarısız olup katmanlar global
   * (-180,-90,180,90) dikdörtgene düşüyordu (bkz
   * project_ucbp_api_ogc_capabilities_uygulama_plani Faz 5b).
   * layers/ogc/OgcLayerFactory.ts'e delege (bkz Adim 8/Faz 2).
   */
  async getWcsCoverageExtents(
    rawUrl: string,
    coverageIds: readonly string[],
    authToken?: string,
  ): Promise<Map<string, GeographicBoundingBox>> {
    return this.ogcLayerFactory.getWcsCoverageExtents(rawUrl, coverageIds, authToken);
  }

  // Katman EKLENDIKTEN ya da genislik gibi GEOMETRI gerektiren bir stil
  // degisikligi UYGULANDIKTAN SONRA, Cesium GeometryVisualizer/
  // ClassificationPrimitive gibi entity'leri genellikle ASENKRON (worker'lar
  // uzerinden, birden fazla render karesi suren) olarak GORSEL primitive'lere
  // cevirir. Cesium'un Entity/DataSource API'sinde "primitive artik ekranda
  // hazir" diyen PUBLIC bir sinyal YOK (bkz kullanici bildirimi: buyuk
  // katmanlarda -- 68-86MB'lik Ulkeler_Polygon gibi -- hem ilk yuklemede hem
  // de Dis Hat Genislik degisikliginde ekran BIR SURE eski/bos haliyle
  // kaliyordu). add()/applyLayerStyle()'in dondurdugu Promise, cagiran
  // tarafin (ör. TucbsFileUpload/TucbsStyleEditor) bu sure boyunca bir
  // "Yukleniyor…" gostergesi tutabilmesi icin BU bekleme penceresini de
  // kapsayacak sekilde genisletilir. requestAnimationFrame yerine BILEREK
  // scene.postRender kullanilir -- bu, Cesium'un KENDI render dongusune
  // (surekli render modu varsayilaninda HER karede calisir) bagli oldugu
  // icin bagimsiz bir zamanlayicidan daha guvenilirdir. Kesin bir tamamlanma
  // sinyali OLMADIGINDAN bu SADECE bir TAHMIN -- cok buyuk veri kumelerinde
  // gercek gorsel tamamlanma bu pencereden biraz daha uzun surebilir, ama
  // "hic beklemeden hemen kapatmak"tan cok daha dogru bir yaklasim.
  private waitForRenderSettle(frames = 60): Promise<void> {
    return new Promise((resolve) => {
      let remaining = frames;
      const listener = (): void => {
        remaining -= 1;
        if (remaining <= 0) {
          this.viewer.scene.postRender.removeEventListener(listener);
          resolve();
        }
      };
      this.viewer.scene.postRender.addEventListener(listener);
    });
  }

  /** Bu entity'nin KENDİSİ bir outline companion'i mi (ayri bir polyline
   * olarak eklenmis, poligonun gercek bir ozelligi degil)? */
  private isOutlineCompanion(entity: Entity): boolean {
    return this.outlineGeometry.isOutlineCompanion(entity);
  }

  /** Bu (poligon) entity'nin bir outline companion'i VAR mi -- varsa native
   * polygon.outline/outlineColor/outlineWidth alanlarina DOKUNULMAMALI. */
  private hasOutlineCompanion(entity: Entity): boolean {
    return this.outlineGeometry.hasOutlineCompanion(entity);
  }

  /** Bu (poligon) entity antimeridyen/kutup crash riski tasidigi icin native
   * outline'i BILEREK kapatilmis mi -- tekrar acilmamali. */
  private hasRiskyOutline(entity: Entity): boolean {
    return this.outlineGeometry.hasRiskyOutline(entity);
  }

  // Cesium, clampToGround (zemine oturan/GroundPrimitive) poligonlarda
  // outline'i framework seviyesinde sessizce kapatir (bkz.
  // @cesium/engine/Source/DataSources/GeometryUpdater.js: "outlineEnabled &&
  // onTerrain" kontrolu) -- WebGL kisitlamasi, bizim kodumuzdaki bir hata
  // degil. clampToGround:false durumda da outlineWidth>1 coğu GPU/tarayicida
  // GL_LINE_WIDTH sinirlamasi yuzunden PRATIKTE gorunmuyor (gercek headless
  // testle Cizim Katmani icin dogrulandi) -- ayni companion-polyline
  // teknigi HER IKI durumda da kullanilir (bkz addPolygonOutlineCompanion),
  // companion'in KENDI clampToGround'u ilgili poligonla ayni tutulur.
  private addPolygonOutlines(
    dataSource: DataSource,
    color: Color,
    width: number
  ): void {
    this.outlineGeometry.addPolygonOutlines(dataSource, color, width);
    // bkz OpacityController.ensureDynamicFillColor WHY yorumu -- companion
    // eklenen HER entity'nin dolgusu HER ZAMAN dinamik kalmali.
    for (const entity of dataSource.entities.values) {
      if (this.outlineGeometry.hasOutlineCompanion(entity)) {
        this.opacityController.ensureDynamicFillColor(dataSource, entity);
      }
    }
  }

  // Bir poligon entity'sinin kose koordinatlarindan AYRI bir polyline
  // "outline" entity'si ekler (bkz yukaridaki addPolygonOutlines yorumu) --
  // hem TOPLU ilk yukleme (addPolygonOutlines) HEM DE Cizim Katmani'na TEK
  // TEK eklenen poligonlar (_addDrawnShape, clampToGround:false) bu ORTAK
  // helper'i kullanir. Companion, applyLayerStyle()'daki mevcut
  // outlineCompanionEntities dongusu tarafindan otomatik olarak
  // renk/genislik guncellemesi alir.
  private addPolygonOutlineCompanion(
    dataSource: DataSource,
    entity: Entity,
    color: Color,
    width: number,
    clampToGround: boolean
  ): void {
    this.outlineGeometry.addPolygonOutlineCompanion(
      dataSource,
      entity,
      color,
      width,
      clampToGround
    );
    // bkz OpacityController.ensureDynamicFillColor WHY yorumu -- companion
    // eklenen HER entity'nin dolgusu HER ZAMAN dinamik kalmali.
    if (this.outlineGeometry.hasOutlineCompanion(entity)) {
      this.opacityController.ensureDynamicFillColor(dataSource, entity);
    }
  }

  // layers/style/LayerStyleEngine.ts'e delege (public -- getUniqueColumnValues de kullanir).
  private readProperty(
    entity: Entity,
    column: string,
    time: JulianDate
  ): string | number | null {
    return this.styleEngine.readProperty(entity, column, time);
  }

  // layers/style/LayerStyleEngine.ts'e delege (public -- _addDrawnShape/
  // _addMeasuredShape applyLayerStyle'dan BAGIMSIZ dogrudan cagirir).
  private applyEntityStyle(
    entity: Entity,
    color: Color | undefined,
    outline: OutlineStyle,
    isShapeLayer: boolean
  ): void {
    this.styleEngine.applyEntityStyle(entity, color, outline, isShapeLayer);
  }

  // layers/style/OpacityController.ts'e delege.
  private setDataSourceOpacity(dataSource: DataSource, opacity: number): void {
    this.opacityController.setDataSourceOpacity(dataSource, opacity);
  }

  // ── Kaynak temizleme ─────────────────────────────────────────────────────

  /** Tüm event dinleyicilerini ve iç katman kaydını temizler (Cesium katmanlarının kendisini kaldırmaz). */
  destroy(): void {
    this.removeAllListeners();
    this.items.clear();
  }
}
