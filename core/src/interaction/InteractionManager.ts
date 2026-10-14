import {
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Entity,
  Cartographic,
  Cartesian3,
  JulianDate,
  Math as CesiumMath,
  Rectangle,
  type Viewer,
  type Scene,
  type Camera,
  type Cartesian2,
  type ImageryLayerFeatureInfo,
} from "cesium";

import { EventEmitter } from "../shared/EventEmitter.js";
import { isSelectionHighlightEntity } from "./SelectionHighlight.js";
import type {
  InteractionManagerEventMap,
  EntityInteractionDetail,
  MapInteractionDetail,
  PickedFeatureDetail,
  ImageryInteractionDetail,
  ImageryFeatureInfo,
  ImageryGeometryHint,
} from "../types/index.js";

// Cesium'un .d.ts'i ImageryLayerFeatureInfo.properties'i tiplemiyor (sadece
// name/description/position/data/imageryLayer bildiriliyor) ama runtime'da
// GetFeatureInfoFormat'in json/xml (GML/ESRI) parser'lari bu alani dinamik
// olarak dolduruyor (bkz Cesium kaynagi, imageryLayerFeatureInfoFromDataAndProperties).
type ImageryLayerFeatureInfoWithProperties = ImageryLayerFeatureInfo & {
  properties?: Record<string, unknown>;
};

// entity:click drillPick'inde taranacak en fazla hit sayisi -- CesiumIdentify.tsx
// (React tarafi) ile ayni limit, cok yogun cakisan noktalarda tarama maliyetini sinirlar.
const DRILL_PICK_LIMIT = 32;

// "Yakınlaş" butonunun (bkz TucbsIdentifyPanel._zoomToItem) GetFeatureInfo
// geometrisinden hesapladigi hedef (bkz ImageryGeometryHint, types/interaction.
// types.ts) -- ya bir ALAN (polygon/polyline, gercek bir bounding box) ya da
// TEK BIR NOKTA (koordinatlar tek bir konuma indirgeniyorsa, orn. bir
// "cities" katmanindaki nokta feature). Ikisi ayri tutulur cunku hedefe
// ulasma YONTEMI farkli: alan icin flyToExtent (bir dikdortgene sigacak
// sekilde), nokta icin flyToPosition (sabit bir yukseklikte tam o
// koordinata). ONCEDEN nokta durumu "anlamsiz extent" sayilip TAMAMEN
// ATILIYORDU, bu da GERCEK/hassas koordinat elde mumkunken tiklanan
// (kullanicinin PARMAGININ/imlecinin tam isabet ETMEMIS olabilecegi)
// NOKTAYA duşulmesine yol aciyordu -- yakin zoom'da bu kucuk sapma GOZLE
// GORULUR hale geliyordu (bkz kullanici geri bildirimi: "nokta feature'a
// zoom'ladık biraz yaklaştı ama merkezine zoom'lamadı").

// Toplanan [lon,lat] ciftlerinden ortak bbox hesaplama -- hem GeoJSON hem
// GML koordinat ayiklama fonksiyonlari bunu paylasir. Bbox tek bir noktaya
// indirgeniyorsa (west===east && south===north, orn. Point geometrisi) bunu
// ARTIK ATMIYORUZ -- GERCEK/hassas bir koordinat oldugundan "point" olarak
// donduruyoruz (bkz yukaridaki ImageryGeometryHint yorumu).
function boundingBoxFromPoints(points: ReadonlyArray<[number, number]>): ImageryGeometryHint | undefined {
  if (points.length === 0) return undefined;

  let west = Infinity;
  let south = Infinity;
  let east = -Infinity;
  let north = -Infinity;
  for (const [lon, lat] of points) {
    if (lon < west) west = lon;
    if (lon > east) east = lon;
    if (lat < south) south = lat;
    if (lat > north) north = lat;
  }

  if (west === east && south === north) return { kind: "point", longitude: west, latitude: south };
  return { kind: "extent", west, south, east, north };
}

// GeoJSON koordinat dizilerini (Point: [x,y] -- LineString/MultiPoint: [[x,y],...]
// -- Polygon/MultiLineString: [[[x,y],...],...] -- MultiPolygon: bir seviye daha
// derin) rekursif olarak duz [lon,lat] ciftlerine indirger. Derinlik GeoJSON
// spec'ine gore SABIT degildir (geometri turune gore degisir), bu yuzden "ilk
// eleman sayi mi" kontroluyle "yaprak" (tek bir koordinat) tespit edilir.
function flattenGeoJsonCoordinates(coords: unknown, out: [number, number][]): void {
  if (!Array.isArray(coords) || coords.length === 0) return;
  if (typeof coords[0] === "number") {
    const [lon, lat] = coords as [number, number];
    if (typeof lon === "number" && typeof lat === "number") out.push([lon, lat]);
    return;
  }
  for (const child of coords) flattenGeoJsonCoordinates(child, out);
}

// WMS GetFeatureInfo yaniti GeoJSON formatinda geldiyse (Cesium'un varsayilan
// format zincirinde "json" ONCELIKLI denenir -- bkz ImageryLayerFeatureInfo.data
// yorumu) `data`, sunucunun dondurdugu HAM GeoJSON Feature/FeatureCollection
// nesnesidir ve GERCEK geometriyi (polygon/line/point) icerir. XML/text
// formatina dustuyse (data GeoJSON DEGILSE) undefined doner.
function extractGeoJsonExtent(data: unknown): ImageryGeometryHint | undefined {
  if (data === null || typeof data !== "object") return undefined;
  const feature = data as { type?: unknown; geometry?: unknown; features?: unknown[] };

  const geometries: unknown[] =
    feature.type === "FeatureCollection" && Array.isArray(feature.features)
      ? feature.features
          .map((f) => (f as { geometry?: unknown } | undefined)?.geometry)
          .filter((g): g is object => g !== undefined && g !== null)
      : feature.geometry
        ? [feature.geometry]
        : [];
  if (geometries.length === 0) return undefined;

  const points: [number, number][] = [];
  for (const geometry of geometries) {
    const g = geometry as { type?: unknown; coordinates?: unknown; geometries?: unknown[] };
    if (g.type === "GeometryCollection" && Array.isArray(g.geometries)) {
      for (const sub of g.geometries) {
        flattenGeoJsonCoordinates((sub as { coordinates?: unknown } | undefined)?.coordinates, points);
      }
    } else {
      flattenGeoJsonCoordinates(g.coordinates, points);
    }
  }
  return boundingBoxFromPoints(points);
}

// GML koordinat metinlerini (gml:coordinates "x1,y1 x2,y2 ..." VEYA GML3
// gml:pos/gml:posList "x1 y1 x2 y2 ...") duz [lon,lat] ciftlerine cevirir --
// SADECE lon,lat sirasi denenir: demo.mapserver.org'un GERCEK msGMLOutput
// yanitinda dogrulandi (orn. "-0.366667,39.466667" = Valencia'nin lon,lat'i),
// bu coğu WMS/MapServer kurulumunun varsayilan cikti sirasidir. Bir sunucu
// FARKLI (lat,lon) sira kullanirsa bbox yanlis hesaplanir -- bu bilinen bir
// sinirlama, genel/kesin cozum GML'in kendi srsName'ini WMS 1.3.0 CRS
// eksen sirasi tablosuyla karsilastirmayi gerektirirdi.
function collectGmlCoordinates(node: Element, out: [number, number][]): void {
  for (const el of Array.from(node.getElementsByTagNameNS("*", "coordinates"))) {
    const text = el.textContent?.trim();
    if (!text) continue;
    for (const pair of text.split(/\s+/)) {
      const [lonStr, latStr] = pair.split(",");
      const lon = Number(lonStr);
      const lat = Number(latStr);
      if (Number.isFinite(lon) && Number.isFinite(lat)) out.push([lon, lat]);
    }
  }
  for (const tag of ["pos", "posList"]) {
    for (const el of Array.from(node.getElementsByTagNameNS("*", tag))) {
      const numbers = (el.textContent?.trim() ?? "").split(/\s+/).map(Number);
      for (let i = 0; i + 1 < numbers.length; i += 2) {
        const lon = numbers[i];
        const lat = numbers[i + 1];
        if (Number.isFinite(lon) && Number.isFinite(lat)) out.push([lon as number, lat as number]);
      }
    }
  }
}

// WMS GetFeatureInfo yaniti GML/XML formatinda geldiyse (bkz LayerManager.
// buildWmsProvider getFeatureInfoFormats -- "application/vnd.ogc.gml" birçok
// MapServer/GeoServer kurulumunda GERCEK veriyi dondurur, JSON'dan daha
// guvenilir), `data` bir GeoJSON nesnesi DEGIL bir XML `Element`'tir (bkz
// Cesium kaynagi imageryLayerFeatureInfoFromDataAndProperties) -- extractGeoJsonExtent
// bunu ANLAMAZ (sadece duz JS obje/array bekler).
function extractGmlExtent(data: unknown): ImageryGeometryHint | undefined {
  if (!(data instanceof Element)) return undefined;
  const points: [number, number][] = [];
  collectGmlCoordinates(data, points);
  return boundingBoxFromPoints(points);
}

// GetFeatureInfo yaniti JSON (GeoJSON) VEYA XML/GML olabilir (bkz yukaridaki
// iki fonksiyon) -- hangisi gelirse gelsin TEK bir yerden dener.
function extractImageryGeometry(data: unknown): ImageryGeometryHint | undefined {
  return extractGeoJsonExtent(data) ?? extractGmlExtent(data);
}

/**
 * Tüm Entity ve Cesium harita etkileşim event'lerini (mouse, camera, scene)
 * tek merkezden `EventEmitter` API'siyle aktarır.
 *
 * @example
 * ```ts
 * map.interactionManager.on("entity:click", (detail) => {
 *   console.log(detail.layerId, detail.properties);
 * });
 * ```
 */

// Ham ScreenSpaceEventHandler hicbir tuketiciye sizdirilmaz. suspend() tiklama/
// pick grubunu (entity:click/dblclick/rightclick VE map:click/dblclick/rightclick)
// durdurur -- DrawingManager aktifken TucbsIdentifyPanel'in araya girmemesi icin
// (v1'de sadece entity:* susturuluyordu, gercek kullanimda map:click'in kacip
// koordinat karti gosterdigi bulundu). map:mousemove/wheel/pinch* ve camera:*/
// scene:* ETKILENMEZ -- pan/zoom ve bunlara bagli UI (orn. quality-bar) cizim
// sirasinda calismaya devam eder (bkz claude-code-interactionmanager-
// drawingmanager-mimarisi-v1.md §3.5).
export class InteractionManager extends EventEmitter<InteractionManagerEventMap> {
  private readonly viewer: Viewer;
  private readonly handler: ScreenSpaceEventHandler;
  private readonly unsubscribers: Array<() => void> = [];
  private suspended = false;
  // suspend()'den BAGIMSIZ, DAHA DAR kapsamli bir bayrak: tampon/kesisim gibi
  // analiz araclari da secim icin dogrudan "entity:click"e abone olur (bkz
  // TucbsBufferTool/TucbsIntersectionTool) -- suspend() kullanilsaydi dispatchPick
  // emit'i TAMAMEN durdurup analiz aracinin KENDI dinleyicisini de susturur, secim
  // yapilamaz hale gelirdi. Bu yuzden event yayini burada ETKILENMEZ; sadece
  // TucbsIdentifyPanel kendi handler'larinda bu bayragi okuyup (ayni event'i
  // ALDIKTAN SONRA) hicbir seye tepki vermeden cikar -- boylece analiz araci
  // tikladigi feature'i secebilirken, ayni tiklamada identify'in oznitelik
  // tablosu/koordinat karti ARAYA GIRMEZ (bkz kullanici geri bildirimi).
  private identifySuspended = false;
  private hoverEnabled = false;
  private hoveredEntity: Entity | undefined;
  // Her dispatchPick() cagrisinda arttirilir -- pickImageryFeatures'in
  // asenkron GetFeatureInfo yaniti, kullanici bu arada baska bir yere
  // tiklamissa (yeni bir generation baslamissa) sessizce yok sayilir. Aksi
  // halde onceki (yavas) bir WMS sorgusunun yaniti, kullanicinin SONRADAN
  // tikladigi noktanin sonucunun ustune yazabilirdi (race condition).
  private pickGeneration = 0;

  /** Cesium `Scene` nesnesi (`viewer.scene`). */
  get scene(): Scene {
    return this.viewer.scene;
  }

  /** Cesium `Camera` nesnesi (`viewer.camera`). */
  get camera(): Camera {
    return this.viewer.camera;
  }

  /** @param viewer - Etkileşimlerin dinleneceği Cesium `Viewer`. */
  constructor(viewer: Viewer) {
    super();
    this.viewer = viewer;
    this.handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    this.bindMouseEvents();
    this.bindCameraEvents();
    this.bindSceneEvents();
  }

  /** Tıklama/pick event grubunu (`entity:*`/`map:*`/`imagery:*`) geçici olarak durdurur (bkz `DrawingManager`). */
  suspend(): void {
    if (this.suspended) return;
    this.suspended = true;
    // Tuketiciler (orn. TucbsIdentifyPanel koordinat karti) arac devraldiginda
    // kendi gecici UI'larini kapatabilsin diye -- sadece durum DEGISTIGINDE.
    this.emit("interaction:suspend", {});
  }

  /** `suspend()` ile durdurulan tıklama/pick event grubunu devam ettirir. */
  resume(): void {
    this.suspended = false;
  }

  /** Tıklama/pick event grubunun şu an durdurulmuş olup olmadığı. */
  isSuspended(): boolean {
    return this.suspended;
  }

  /** `TucbsIdentifyPanel`'in kendi tepkisini (öznitelik tablosu/koordinat kartı) geçici olarak durdurur, event yayınını ETKİLEMEZ (bkz `identifySuspended` alanı). */
  suspendIdentify(): void {
    this.identifySuspended = true;
  }

  /** `suspendIdentify()` ile durdurulan identify tepkisini devam ettirir. */
  resumeIdentify(): void {
    this.identifySuspended = false;
  }

  /** Identify tepkisinin şu an durdurulmuş olup olmadığı. */
  isIdentifySuspended(): boolean {
    return this.identifySuspended;
  }

  /** `entity:mouseenter`/`entity:mouseleave` hover event'lerinin açık olup olmadığını ayarlar; kapatılırken mevcut hover durumu sıfırlanır. */
  enableHover(enabled: boolean): void {
    this.hoverEnabled = enabled;
    if (!enabled) {
      this.hoveredEntity = undefined;
    }
  }

  /** Hover event'lerinin şu an açık olup olmadığı. */
  isHoverEnabled(): boolean {
    return this.hoverEnabled;
  }

  /**
   * Kamerayı verilen coğrafi konuma top-down (`pitch=-90`) uçurur.
   * @param longitude - Boylam (derece).
   * @param latitude - Enlem (derece).
   * @param options.height - Uçuş sonrası yükseklik (metre). @default 1000
   * @param options.duration - Uçuş süresi (saniye); verilmezse Cesium'un mesafeye göre otomatik hesapladığı süre kullanılır.
   *
   * @example
   * ```ts
   * map.interactionManager.flyToPosition(32.85, 39.93, { height: 5000 });
   * ```
   */

  // Map.flyTo ile AYNI top-down varsayilan (pitch=-90) -- TucbsIdentifyPanel'in
  // "Yakınlaş" butonu, entity'si olmayan (WMS/WMTS GetFeatureInfo) raster
  // sonuclar icin bunu kullanir: bu sonuclarin client-side bir geometrisi
  // yoktur, yakinlasabilecegimiz tek sey tiklanan noktadir (entity'si olan
  // vektor sonuclar LayerManager.zoomToEntity ile feature'in GERCEK
  // cercevesine yakinlasir, bu daha hassastir).
  flyToPosition(
    longitude: number,
    latitude: number,
    options?: { height?: number; duration?: number },
  ): void {
    const height = options?.height ?? 1000;
    // `exactOptionalPropertyTypes` acik oldugu icin `duration: undefined`
    // ACIKCA yazilamaz (Cesium'un kendi tipinde `duration?: number` ile
    // uyusmuyor) -- key SADECE gercekten verilmisse eklenir, boylece
    // verilmedigi durumda Cesium'un kendi otomatik hesaplamasi (WHY
    // yorumu) degismeden calisir.
    this.viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(longitude, latitude, height),
      orientation: { pitch: CesiumMath.toRadians(-90) },
      ...(options?.duration !== undefined ? { duration: options.duration } : {}),
    });
  }

  /**
   * Kamerayı verilen coğrafi dikdörtgene (derece) top-down uçurur.
   * @param duration - Uçuş süresi (saniye); verilmezse Cesium'un mesafeye göre otomatik hesapladığı süre kullanılır.
   *
   * @example
   * ```ts
   * map.interactionManager.flyToExtent(26, 36, 45, 42);
   * ```
   */

  // TucbsIdentifyPanel'in "Yakınlaş" butonu, WMS GetFeatureInfo yaniti GERCEK
  // geometri (GeoJSON) icerdiginde (bkz ImageryFeatureInfo.extent yorumu,
  // InteractionManager.extractGeoJsonExtent) tiklanan NOKTAYA sabit yukseklikte
  // ucmak (flyToPosition) veya katmanin TAMAMINA zoom yapmak (LayerManager.
  // zoomToLayer) yerine bunu kullanir -- entity'si olmayan raster sonuclarda
  // da (varsa) feature'in GERCEK sinirlarina hassas bir yakinlasma saglar.
  flyToExtent(
    west: number,
    south: number,
    east: number,
    north: number,
    options?: { duration?: number },
  ): void {
    this.viewer.camera.flyTo({
      destination: Rectangle.fromDegrees(west, south, east, north),
      orientation: { pitch: CesiumMath.toRadians(-90) },
      ...(options?.duration !== undefined ? { duration: options.duration } : {}),
    });
  }

  /** `ScreenSpaceEventHandler`'ı ve tüm camera/scene aboneliklerini yok eder, kayıtlı event dinleyicilerini temizler. */
  destroy(): void {
    if (!this.handler.isDestroyed()) {
      this.handler.destroy();
    }
    for (const unsubscribe of this.unsubscribers) {
      unsubscribe();
    }
    this.unsubscribers.length = 0;
    this.removeAllListeners();
  }

  // ── Mouse event'leri (entity grubu + map grubu) ────────────────────────────

  private bindMouseEvents(): void {
    this.handler.setInputAction(
      (event: ScreenSpaceEventHandler.PositionedEvent) =>
        this.dispatchPick(
          event.position,
          "entity:click",
          "map:click",
          "imagery:click"
        ),
      ScreenSpaceEventType.LEFT_CLICK
    );
    this.handler.setInputAction(
      (event: ScreenSpaceEventHandler.PositionedEvent) =>
        this.dispatchPick(
          event.position,
          "entity:dblclick",
          "map:dblclick",
          "imagery:dblclick"
        ),
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    this.handler.setInputAction(
      (event: ScreenSpaceEventHandler.PositionedEvent) =>
        this.dispatchPick(
          event.position,
          "entity:rightclick",
          "map:rightclick",
          "imagery:rightclick"
        ),
      ScreenSpaceEventType.RIGHT_CLICK
    );
    this.handler.setInputAction(
      (event: ScreenSpaceEventHandler.PositionedEvent) =>
        this.dispatchEntityOnly(event.position, "entity:mousedown"),
      ScreenSpaceEventType.LEFT_DOWN
    );
    this.handler.setInputAction(
      (event: ScreenSpaceEventHandler.PositionedEvent) =>
        this.dispatchEntityOnly(event.position, "entity:mouseup"),
      ScreenSpaceEventType.LEFT_UP
    );
    this.handler.setInputAction(
      (event: ScreenSpaceEventHandler.MotionEvent) =>
        this.handleMouseMove(event.endPosition),
      ScreenSpaceEventType.MOUSE_MOVE
    );
    this.handler.setInputAction(
      (delta: number) => this.emit("map:wheel", { delta }),
      ScreenSpaceEventType.WHEEL
    );
    this.handler.setInputAction(
      (event: ScreenSpaceEventHandler.TwoPointEvent) =>
        this.emit("map:pinchstart", this.buildMapDetail(event.position1)),
      ScreenSpaceEventType.PINCH_START
    );
    this.handler.setInputAction(
      () => this.emit("map:pinchend", {}),
      ScreenSpaceEventType.PINCH_END
    );
    this.handler.setInputAction(
      (event: ScreenSpaceEventHandler.TwoPointMotionEvent) => {
        const angle = Math.atan2(
          event.position2.y - event.position1.y,
          event.position2.x - event.position1.x
        );
        this.emit("map:pinchmove", {
          ...this.buildMapDetail(event.position1),
          angle,
        });
      },
      ScreenSpaceEventType.PINCH_MOVE
    );
  }

  private handleMouseMove(screenPos: Cartesian2): void {
    // map:mousemove kosulsuz yayilir — suspend() sadece entity:* grubunu durdurur.
    this.emit("map:mousemove", this.buildMapDetail(screenPos));

    if (!this.hoverEnabled || this.suspended) return;

    const entity = this.pickSelectableEntity(screenPos);

    if (entity === this.hoveredEntity) return;

    if (this.hoveredEntity !== undefined) {
      this.emit(
        "entity:mouseleave",
        this.buildEntityDetail(this.hoveredEntity, screenPos)
      );
    }
    this.hoveredEntity = entity;
    if (entity !== undefined) {
      this.emit("entity:mouseenter", this.buildEntityDetail(entity, screenPos));
    }
  }

  // suspended iken pick/tiklama grubu (entity:* VE map:*) tamamen susar --
  // DrawingManager aktifken TucbsIdentifyPanel'in (map:click -> koordinat
  // karti, entity:click -> oznitelik tablosu) araya girmemesi icin. Bos
  // zemine tiklamak onceden suspended iken bile map:click yayardi (sadece
  // entity dalinda kontrol vardi) -- bu, cizim sirasinda identify koordinat
  // kartinin gorunmesine yol aciyordu (gercek kullanimda bulundu).
  private dispatchPick(
    screenPos: Cartesian2,
    entityEvent: "entity:click" | "entity:dblclick" | "entity:rightclick",
    mapEvent: "map:click" | "map:dblclick" | "map:rightclick",
    imageryEvent: "imagery:click" | "imagery:dblclick" | "imagery:rightclick"
  ): void {
    if (this.suspended) return;
    this.pickGeneration++;
    const entity = this.pickSelectableEntity(screenPos);
    if (entity) {
      this.emit(entityEvent, this.buildEntityDetail(entity, screenPos));
    } else {
      this.emit(mapEvent, this.buildMapDetail(screenPos));
    }
    // Entity bulunmus olsa da AYNI ekran noktasinda gorunur bir WMS/WMTS
    // katmani olabilir -- bu kontrol atlanamaz, cunku genis kapsamli bir
    // vektor katmani (orn. tum kitayi/ulkeyi kaplayan bir WFS poligonu)
    // HER tiklamada bir Entity buldugundan, "entity varsa WMS'i hic sorma"
    // kurali WMS feature'larinin o poligonun ALTINDA/UZERINDE kaldigi HER
    // durumda sonsuza kadar gizlenmesine yol aciyordu (gercek kullanimda
    // bulundu, bkz kullanici geri bildirimi: "WMS icon isaretli feature'a
    // tikliyorum ama WMS sorgusu hic yapilmiyor"). GetFeatureInfo agi
    // bekledigi icin her durumda asenkron devam eder; entity bulunduysa
    // entityEvent zaten senkron yayildi, raster sonucu (varsa) gecince
    // tuketici buna EKLENIR (bkz TucbsIdentifyPanel).
    this.pickImageryFeatures(screenPos, imageryEvent);
  }

  /** Vurgu katmanını atlar; alttaki asıl objeyi seçer. */
  private pickSelectableEntity(screenPos: Cartesian2): Entity | undefined {
    const picks = this.scene.drillPick(screenPos, DRILL_PICK_LIMIT);
    for (const pick of picks) {
      const entity = pick?.id;
      if (!(entity instanceof Entity)) continue;
      if (isSelectionHighlightEntity(entity)) continue;
      return entity;
    }
    return undefined;
  }

  // scene.pick hicbir Entity bulamadiginda cagrilir. Cesium'un
  // ImageryLayerCollection.pickImageryLayerFeatures'i o an ekranda render
  // edilen TUM gorunur raster katmanlar icin GetFeatureInfo'yu paralel
  // sorgular (bkz Cesium kaynagi) -- WMS/WMTS ayrimini burada elle yapmaya
  // gerek yok, sadece pickFeatures'i destekleyen/gorunur katmanlar sonuca
  // dahil olur. Hicbir katman pickable degilse (orn. sadece basemap
  // gorunuyorsa) `undefined` doner.
  private pickImageryFeatures(
    screenPos: Cartesian2,
    imageryEvent: "imagery:click" | "imagery:dblclick" | "imagery:rightclick"
  ): void {
    // "queryable=0" katmanlar icin sorguyu ONCEDEN atlayan bir optimizasyon
    // burada BILEREK YOK -- birden fazla raster katman AYNI ANDA gorunurken
    // (orn. bir de sorgulanabilir bir WMS varsa) bu optimizasyon HICBIR ZAMAN
    // devreye giremiyordu (basemap/diger katman yuzunden), TUTARSIZ bir
    // deneyim yaratiyordu (bkz kullanici geri bildirimi: "sadece continents
    // varken Sorgulanıyor çıkmıyor ama cities de eklenince çıkıyor, kafa
    // karıştırıyor"). Artik HER durumda GetFeatureInfo denenir -- "Sorgulanıyor…"
    // HER ZAMAN tutarli sekilde gorunur, sonuc GERCEKTEN bos donerse
    // TucbsIdentifyPanel kullaniciyi ayrica bilgilendirir (bkz kullanici geri
    // bildirimi: "her queryable=0 WMS katmani icin uygulayalim").
    const generation = this.pickGeneration;
    const ray = this.camera.getPickRay(screenPos);
    if (!ray) return;

    const promise = this.viewer.imageryLayers.pickImageryLayerFeatures(
      ray,
      this.scene
    );
    if (!promise) return;

    // Agdan yanit gelmesi (bazi sunucularda json->xml->text format-fallback
    // zinciri yuzunden birden fazla istek gerekebiliyor, bkz Cesium kaynagi)
    // saniyeler surebilir -- TucbsIdentifyPanel bu sinyali koordinat kartinin
    // "Sorgulanıyor…" durumuna gecip erken kapanmasini/otomatik kaybolmasini
    // engellemek icin kullanir.
    this.emit("imagery:querying", this.buildMapDetail(screenPos));

    const finish = (infos: ImageryLayerFeatureInfoWithProperties[]): void => {
      // Suspended olduysa (orn. DrawingManager araya girdi) veya bu arada
      // baska bir tiklama/pick baslamissa (bkz pickGeneration) sonuc gec
      // kalmis sayilir ve atilir.
      if (this.suspended || generation !== this.pickGeneration) return;
      this.emit(imageryEvent, this.buildImageryDetail(infos, screenPos));
    };

    promise.then(finish).catch(() => {
      // GetFeatureInfo hatasi (CORS, sunucu desteklemiyor, bilinmeyen XML
      // semasi, ServiceExceptionReport, ...) "sonuc yok" sayilir -- WMS/WMTS
      // sunuculari cok cesitli/guvenilmez davranabilir, bu vektor identify
      // akisini bozmamali; yine de tuketicinin "Sorgulanıyor…" durumundan
      // cikabilmesi icin bos features ile tamamlanma sinyali verilir.
      finish([]);
    });
  }

  private buildImageryDetail(
    infos: ImageryLayerFeatureInfoWithProperties[],
    screenPos: Cartesian2
  ): ImageryInteractionDetail {
    const features: ImageryFeatureInfo[] = infos.map((info) => ({
      imageryLayer: info.imageryLayer,
      name: info.name ?? null,
      properties: info.properties ?? {},
      description: info.description ?? null,
      geometryHint: extractImageryGeometry(info.data),
    }));

    return {
      position: this.toLonLat(screenPos),
      screenPos: { x: screenPos.x, y: screenPos.y },
      features,
    };
  }

  // LEFT_DOWN/LEFT_UP icin map:* karsiligi katalogda yok (bkz v1 §3.3) — pick
  // bos donerse hicbir event yayilmaz.
  private dispatchEntityOnly(
    screenPos: Cartesian2,
    entityEvent: "entity:mousedown" | "entity:mouseup"
  ): void {
    if (this.suspended) return;
    const picked = this.scene.pick(screenPos);
    if (picked?.id instanceof Entity) {
      this.emit(entityEvent, this.buildEntityDetail(picked.id, screenPos));
    }
  }

  // ── Camera / Scene relay ────────────────────────────────────────────────

  private bindCameraEvents(): void {
    this.unsubscribers.push(
      this.camera.moveStart.addEventListener(() =>
        this.emit("camera:moveStart", {})
      ),
      this.camera.moveEnd.addEventListener(() =>
        this.emit("camera:moveEnd", {})
      ),
      this.camera.changed.addEventListener((percentage: number) =>
        this.emit("camera:changed", { percentage })
      )
    );
  }

  private bindSceneEvents(): void {
    this.unsubscribers.push(
      this.scene.preRender.addEventListener((_scene: Scene, time: JulianDate) =>
        this.emit("scene:preRender", { time })
      ),
      this.scene.postRender.addEventListener(
        (_scene: Scene, time: JulianDate) =>
          this.emit("scene:postRender", { time })
      ),
      this.scene.morphStart.addEventListener(() =>
        this.emit("scene:morphStart", {})
      ),
      this.scene.morphComplete.addEventListener(() =>
        this.emit("scene:morphComplete", {})
      )
    );
  }

  // ── Yardimcilar ──────────────────────────────────────────────────────────

  private buildMapDetail(screenPos: Cartesian2): MapInteractionDetail {
    return {
      position: this.toLonLat(screenPos),
      screenPos: { x: screenPos.x, y: screenPos.y },
    };
  }

  private buildEntityDetail(
    entity: Entity,
    screenPos: Cartesian2
  ): EntityInteractionDetail {
    return {
      ...this.resolveFeature(entity),
      position: this.toLonLat(screenPos),
      screenPos: { x: screenPos.x, y: screenPos.y },
      features: this.pickAllFeatures(screenPos, entity),
    };
  }

  // LayerManager.addPolygonOutlineCompanion, clampToGround poligonlarda
  // (Cesium'un native outline'i calismadigi icin) her poligona AYRI, gorsel
  // amacli sentetik bir dis-hat (polyline) entity ekler -- bu companion'in
  // GeoJSON'dan gelen GERCEK bir feature'i yok, "__tucbsOutlineOf" ile
  // sadece asil (dolgu) entity'nin id'sini tasir (bkz o metodun yorumu).
  private resolveFeature(entity: Entity): PickedFeatureDetail {
    const currentTime = JulianDate.now();
    const resolved =
      (entity.properties?.getValue(currentTime) as
        | Record<string, unknown>
        | undefined) ?? {};

    // Tiklama companion'a denk gelmisse (poligonun tam KENARINA tiklamak
    // gibi) asil entity'ye YONLENDIRILIR -- aksi halde companion'in BOS
    // properties'i yuzunden "Öznitelik bilgisi bulunamadı" gosterilir VE
    // (pickAllFeatures'daki dedup companion'i AYRI bir entity saydigindan)
    // ayni katman identify sonuclarinda MUKERRER listelenir (gercek
    // kullanici bildirimi: "Poligon B kenarina tikladim, 2 tane Poligon B
    // cikiyor, biri oznitelik bilgisi bulunamadi diyor").
    const outlineOf = resolved.__tucbsOutlineOf;
    if (typeof outlineOf === "string") {
      const original = entity.entityCollection?.getById(outlineOf);
      if (original && original !== entity) return this.resolveFeature(original);
    }

    const layerId = typeof resolved.layerId === "string" ? resolved.layerId : null;
    const featureId =
      typeof resolved.featureId === "string" ? resolved.featureId : null;

    // "__tucbsOutlineOf" internal bir isaret -- yukaridaki substitution
    // basarisiz olsa bile (ör. asil entity sonradan kaldirilmis) tuketiciye
    // (identify tablosu) SIZMAMALI.
    if ("__tucbsOutlineOf" in resolved) {
      const { __tucbsOutlineOf: _drop, ...rest } = resolved;
      return { entity, layerId, featureId, properties: rest };
    }

    return { entity, layerId, featureId, properties: resolved };
  }

  // scene.pick sadece en ustteki entity'yi dondurur -- ayni ekran noktasinda
  // ust uste binen farkli vektor katmanlardaki feature'lar drillPick olmadan
  // hic identify'e girmiyordu. "entity" (en ustteki, scene.pick'in bulduğu)
  // her zaman listenin basinda yer alir.
  //
  // Dedup, PICKLENEN entity yerine resolveFeature'in DONDURDUGU (companion
  // ise asil'a substitute edilmis) entity uzerinden yapilir -- aksi halde
  // ayni poligonun hem dolgusu hem dis-hat companion'i AYRI iki "hit" olarak
  // sayilip listede iki kez gorunurdu (bkz resolveFeature'daki WHY yorumu).
  private pickAllFeatures(
    screenPos: Cartesian2,
    primary: Entity
  ): PickedFeatureDetail[] {
    const primaryDetail = this.resolveFeature(primary);
    const features: PickedFeatureDetail[] = [primaryDetail];
    const seen = new Set<Entity>([primaryDetail.entity]);

    const picks = this.scene.drillPick(screenPos, DRILL_PICK_LIMIT);
    for (const pick of picks) {
      const entity = pick?.id;
      if (!(entity instanceof Entity)) continue;
      const detail = this.resolveFeature(entity);
      if (seen.has(detail.entity)) continue;
      seen.add(detail.entity);
      features.push(detail);
    }

    return features;
  }

  // Ellipsoid uzerinde yaklasik dunya konumu — terrain yuklu olmasa da calisir.
  private toLonLat(screenPos: Cartesian2): [number, number] {
    const cartesian: Cartesian3 | undefined = this.camera.pickEllipsoid(
      screenPos,
      this.scene.globe.ellipsoid
    );
    if (cartesian === undefined) return [0, 0];
    const cartographic = Cartographic.fromCartesian(cartesian);
    return [
      CesiumMath.toDegrees(cartographic.longitude),
      CesiumMath.toDegrees(cartographic.latitude),
    ];
  }
}
