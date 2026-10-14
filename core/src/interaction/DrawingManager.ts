import {
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartesian3,
  Cartographic,
  CallbackProperty,
  Color,
  PolygonHierarchy,
  Math as CesiumMath,
  type Viewer,
  type Scene,
  type Entity,
  type Cartesian2,
} from "cesium";

import type { FeatureCollection, Geometry } from "geojson";
import { EventEmitter } from "../shared/EventEmitter.js";
import { TucbsError } from "../shared/TucbsError.js";
import type { InteractionManager } from "./InteractionManager.js";
import type { DrawingManagerEventMap, DrawTool, DrawnShape } from "../types/index.js";

const EARTH_RADIUS_METERS = 6378137;
const CIRCLE_SEGMENTS = 48;

// Ardisik ayni Cartesian3'leri eler -- onizleme noktasi son onaylanan
// vertex'le ayni pikselde ise (henuz fare hareket etmediyse) ardisik ayni
// nokta iki kez eklenir. Anahat onizlemesi (buildPositionsCallback) VE alan
// dolgu onizlemesi (ensureTempEntity'deki polygon.hierarchy CallbackProperty'si)
// AYNI korumayi paylasir -- artik crash'i onlemek icin ZORUNLU degil (bkz
// PolygonHierarchy-sarmalama notu), ama gereksiz ardisik-yineleme
// hesaplamalarindan kacinmak icin yine de faydali.
function dedupePositions(positions: readonly Cartesian3[]): Cartesian3[] {
  return positions.filter(
    (p, i) => i === 0 || !Cartesian3.equalsEpsilon(p, positions[i - 1] as Cartesian3, CesiumMath.EPSILON7)
  );
}

/**
 * 6 sabit çizim aracını (`point`/`polyline`/`polygon`/`rectangle`/`circle`/
 * `freehand`) yönetir; vertex yerleştirme kendi bağımsız
 * `ScreenSpaceEventHandler`'ıyla yapılır.
 *
 * @example
 * ```ts
 * map.drawingManager.activate("polygon");
 * // ... kullanıcı haritada çizim yapar ...
 * const geojson = map.drawingManager.toGeoJSON();
 * console.log(geojson.features);
 * ```
 *
 * @example
 * ```ts
 * map.drawingManager.on("draw:complete", ({ shape }) => {
 *   console.log(shape.id, shape.tool, shape.geometry);
 * });
 * ```
 */

// activate() sirasinda interactionManager.suspend() cagrilir (entity:* susar,
// map:*/camera:*/scene:* devam eder). Olcum (measure) bu araclarin disindadir;
// tucbs-measure-tool "polyline"/"polygon"'u yeniden kullanir (bkz v14 SS4.16),
// activate()'in opsiyonel `source` parametresiyle TucbsDrawTool'dan ayirt
// edilir (bkz asagidaki activate() yorumu).
export class DrawingManager extends EventEmitter<DrawingManagerEventMap> {
  private readonly viewer: Viewer;
  private readonly interactionManager: InteractionManager;
  private readonly handler: ScreenSpaceEventHandler;
  private readonly shapes = new Map<string, DrawnShape>();

  private activeTool: DrawTool | undefined;
  private activeSource: string | undefined;
  private positions: Cartesian3[] = [];
  private previewPosition: Cartesian3 | undefined;
  private tempEntity: Entity | undefined;
  private tempFillEntity: Entity | undefined;
  private tempVertexEntities: Entity[] = [];
  private freehandDragging = false;
  private builtInDoubleClickAction:
    | ReturnType<ScreenSpaceEventHandler["getInputAction"]>
    | undefined;

  /** Cesium `Scene` nesnesi (`viewer.scene`). */
  get scene(): Scene {
    return this.viewer.scene;
  }

  /**
   * @param viewer - Çizimin yapılacağı Cesium `Viewer`.
   * @param interactionManager - `activate()` sırasında `suspend()`/`resume()` çağrılacak `InteractionManager`.
   */
  constructor(viewer: Viewer, interactionManager: InteractionManager) {
    super();
    this.viewer = viewer;
    this.interactionManager = interactionManager;
    this.handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  }

  /**
   * Verilen çizim aracını etkinleştirir (aktif bir araç varsa önce `deactivate()` ile kapatılır).
   * @param tool - Etkinleştirilecek çizim aracı.
   * @param source - Aktivasyonun hangi bileşen türünden geldiğini belirtir (ör. `TucbsMeasureTool` vs `TucbsDrawTool` aynı `tool` değerini farklı amaçla paylaştığında); `DrawingManager` davranışını etkilemez, sadece emit edilen event payload'ında iletilir.
   *
   * @example
   * ```ts
   * map.drawingManager.activate("rectangle");
   * ```
   */
  activate(tool: DrawTool, source?: string): void {
    if (this.activeTool) this.deactivate();
    this.activeTool = tool;
    this.activeSource = source;
    this.positions = [];
    this.previewPosition = undefined;
    this.interactionManager.suspend();
    this.resetTrackedEntity();
    this.suspendBuiltInDoubleClick();
    // Sol-surukle yalnizca serbest cizimde cizim hareketi; diger araclar
    // tiklama ile calistigindan (Cesium surukleme sonrasi LEFT_CLICK
    // uretmez) kamera acik kalir ve harita cizim/olcum sirasinda kaydirilabilir.
    if (tool === "freehand") this.lockCamera();
    this.setCursor("crosshair");
    this.bindToolHandlers(tool);
    this.emit("draw:start", source === undefined ? { tool } : { tool, source });
  }

  /**
   * Aktif çizim aracını kapatır; yarım kalan çizim varsa iptal edilir (tamamlanmaz).
   *
   * @example
   * ```ts
   * map.drawingManager.deactivate();
   * ```
   */
  deactivate(): void {
    if (!this.activeTool) return;
    const tool = this.activeTool;
    const source = this.activeSource;
    this.finishSession();
    this.emit("draw:cancel", source === undefined ? { tool } : { tool, source });
  }

  /** Şu an etkin olan çizim aracı (yoksa `undefined`). */
  getActiveTool(): DrawTool | undefined {
    return this.activeTool;
  }

  /** Herhangi bir çizim aracının etkin olup olmadığı. */
  isActive(): boolean {
    return this.activeTool !== undefined;
  }

  /**
   * Tamamlanmış tüm şekillerin listesi.
   *
   * @example
   * ```ts
   * const shapes = map.drawingManager.getShapes();
   * console.log(shapes.length);
   * ```
   */
  getShapes(): DrawnShape[] {
    return [...this.shapes.values()];
  }

  /** Verilen id'ye sahip tamamlanmış şekli döndürür (yoksa `undefined`). */
  getShapeById(id: string): DrawnShape | undefined {
    return this.shapes.get(id);
  }

  /** Verilen id'ye sahip şekli haritadan ve kayıtlardan kaldırır. */
  removeShape(id: string): void {
    const shape = this.shapes.get(id);
    if (!shape) return;
    this.viewer.entities.remove(shape.entity);
    this.shapes.delete(id);
    this.emit("draw:remove", { id, shape });
  }

  /** Tamamlanmış tüm şekilleri haritadan ve kayıtlardan kaldırır. */
  clearAll(): void {
    for (const id of [...this.shapes.keys()]) this.removeShape(id);
  }

  /** Devam eden çizimde son eklenen vertex'i geri alır. */
  undo(): void {
    if (this.positions.length === 0) return;
    this.positions.pop();
    const marker = this.tempVertexEntities.pop();
    if (marker) this.viewer.entities.remove(marker);
  }

  /**
   * Tamamlanmış tüm şekilleri tek bir GeoJSON `FeatureCollection`'a dönüştürür.
   *
   * @example
   * ```ts
   * const featureCollection = map.drawingManager.toGeoJSON();
   * ```
   */
  toGeoJSON(): FeatureCollection {
    return {
      type: "FeatureCollection",
      features: this.getShapes().map((shape) => ({
        type: "Feature",
        properties: { id: shape.id, tool: shape.tool },
        geometry: shape.geometry,
      })),
    };
  }

  /** Aktif çizimi kapatır, `ScreenSpaceEventHandler`'ı yok eder ve kayıtlı event dinleyicilerini temizler. */
  destroy(): void {
    this.deactivate();
    this.handler.destroy();
    this.removeAllListeners();
  }

  // ── Arac baglama ─────────────────────────────────────────────────────────

  private bindToolHandlers(tool: DrawTool): void {
    // SAG TIK = araçtan TAMAMEN cik (yarim kalan cizim varsa o da IPTAL edilir,
    // TAMAMLANMAZ) -- TUM araclar icin gecerli (point/polyline/polygon/
    // rectangle/circle/freehand). Onceden sadece polyline/polygon'da "mevcut
    // vertex'lerle bitir, arac aktif kal" anlamina geliyordu (finishMultiVertex);
    // o davranis KALDIRILDI -- cift-tik/ESC hala o sekilde calisir, SADECE
    // sag-tik'in anlami degisti (kullanici talebi: sag-tik sonrasi arac pasif
    // olmali ki TucbsIdentifyPanel devreye girebilsin, bkz InteractionManager
    // suspend/resume).
    this.handler.setInputAction(() => this.deactivate(), ScreenSpaceEventType.RIGHT_CLICK);

    if (tool === "freehand") {
      this.handler.setInputAction(
        (e: ScreenSpaceEventHandler.PositionedEvent) => this.onFreehandDown(e.position),
        ScreenSpaceEventType.LEFT_DOWN
      );
      this.handler.setInputAction(
        () => this.onFreehandUp(),
        ScreenSpaceEventType.LEFT_UP
      );
      this.handler.setInputAction(
        (e: ScreenSpaceEventHandler.MotionEvent) => this.onFreehandMove(e.endPosition),
        ScreenSpaceEventType.MOUSE_MOVE
      );
      return;
    }

    this.handler.setInputAction(
      (e: ScreenSpaceEventHandler.PositionedEvent) => this.onVertexClick(e.position),
      ScreenSpaceEventType.LEFT_CLICK
    );
    this.handler.setInputAction(
      (e: ScreenSpaceEventHandler.MotionEvent) => this.onPreviewMove(e.endPosition),
      ScreenSpaceEventType.MOUSE_MOVE
    );
    if (tool === "polyline" || tool === "polygon") {
      this.handler.setInputAction(
        () => this.finishMultiVertexViaDoubleClick(),
        ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
      // ESC = TAMAMLA (mevcut vertex'lerle bitir), IPTAL DEGIL — cift-tik ile
      // ayni sonuca goturur (sag-tik ARTIK farkli: tamamen cikis, bkz yukarida).
      // ScreenSpaceEventHandler klavye event'i tanimadigindan (sadece canvas
      // mouse/touch), document seviyesinde ayri bir keydown dinleyicisi kullanilir.
      document.addEventListener("keydown", this.onEscapeKey);
    }
  }

  private unbindToolHandlers(): void {
    this.handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
    this.handler.removeInputAction(ScreenSpaceEventType.LEFT_DOWN);
    this.handler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
    this.handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
    this.handler.removeInputAction(ScreenSpaceEventType.RIGHT_CLICK);
    this.handler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    document.removeEventListener("keydown", this.onEscapeKey);
  }

  private readonly onEscapeKey = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") return;
    this.finishMultiVertex();
  };

  // ── Vertex-tabanli araclar (point/polyline/polygon/rectangle/circle) ──────

  private onVertexClick(screenPos: Cartesian2): void {
    const cartesian = this.toCartesian(screenPos);
    if (cartesian === undefined || this.activeTool === undefined) return;

    this.positions.push(cartesian);
    this.emitVertex(screenPos);
    this.ensureTempEntity();
    if (this.activeTool === "polygon" || this.activeTool === "polyline") {
      this.addVertexMarker(cartesian);
    }

    if (this.activeTool === "point") {
      this.completeShape();
      return;
    }
    if (
      (this.activeTool === "rectangle" || this.activeTool === "circle") &&
      this.positions.length >= 2
    ) {
      this.completeShape();
    }
  }

  private onPreviewMove(screenPos: Cartesian2): void {
    if (this.positions.length === 0 || this.activeTool === undefined) return;
    const cartesian = this.toCartesian(screenPos);
    if (cartesian === undefined) return;
    this.previewPosition = cartesian;
    this.emit("draw:move", {
      tool: this.activeTool,
      coordinates: this.toLonLat(cartesian),
      screenPos: { x: screenPos.x, y: screenPos.y },
    });
  }

  private finishMultiVertex(): void {
    const minVertices = this.activeTool === "polygon" ? 3 : 2;
    if (this.positions.length < minVertices) return;
    this.completeShape();
  }

  // Tarayici, cift tiklamada ayni ekran konumunda IKI ayri LEFT_CLICK (+bir
  // LEFT_DOUBLE_CLICK) uretir; onVertexClick() bu yuzden son noktayi iki kez
  // ekler. Bitirmeden once tekrarlanan son vertex'i (double-click'in ikinci
  // click bileseni) dusuruyoruz — aksi halde DrawnShape.coordinates'te
  // yinelenen bir kose olusur (gercek headless testle bulundu/dogrulandi).
  private finishMultiVertexViaDoubleClick(): void {
    if (this.positions.length >= 2) {
      this.positions.pop();
    }
    this.finishMultiVertex();
    // Cesium'un kendi dahili double-click handler'i (bkz. resetTrackedEntity
    // yorumu) AYNI fiziksel cift-tikta viewer.trackedEntity'i set etmis
    // olabilir -- burada geri sifirliyoruz. Sureli cizim modunda (arac aktif
    // kaliyor) finishSession() bu noktada CAGRILMADIGI icin bu cagri
    // ZORUNLU, sadece finishSession()'a guvenmek yetmez.
    this.resetTrackedEntity();
  }

  // ── Freehand ─────────────────────────────────────────────────────────────

  private onFreehandDown(screenPos: Cartesian2): void {
    this.freehandDragging = true;
    this.positions = [];
    const cartesian = this.toCartesian(screenPos);
    if (cartesian === undefined) return;
    this.positions.push(cartesian);
    this.emitVertex(screenPos);
    this.ensureTempEntity();
  }

  private onFreehandMove(screenPos: Cartesian2): void {
    if (!this.freehandDragging || this.activeTool === undefined) return;
    const cartesian = this.toCartesian(screenPos);
    if (cartesian === undefined) return;
    this.positions.push(cartesian);
    this.previewPosition = cartesian;
    this.emit("draw:move", {
      tool: this.activeTool,
      coordinates: this.toLonLat(cartesian),
      screenPos: { x: screenPos.x, y: screenPos.y },
    });
  }

  private onFreehandUp(): void {
    this.freehandDragging = false;
    if (this.positions.length >= 2) this.completeShape();
  }

  // ── Tamamlama ────────────────────────────────────────────────────────────

  private emitVertex(screenPos: Cartesian2): void {
    if (this.activeTool === undefined) return;
    const last = this.requireIndex(this.positions, this.positions.length - 1);
    this.emit("draw:vertex", {
      tool: this.activeTool,
      index: this.positions.length - 1,
      coordinates: this.toLonLat(last),
      screenPos: { x: screenPos.x, y: screenPos.y },
    });
  }

  // Bir sekil tamamlaninca arac KAPANMAZ -- surekli cizim modu: kullanici
  // farkli bir arac secmedikce (activate() eskisini otomatik kapatir) ya da
  // acikca deactivate() cagirmadikca (ör. TucbsDrawTool'da aktif araca
  // tekrar tiklamak) ayni arac hemen yeni bir sekil cizmeye hazir kalir.
  private completeShape(): void {
    if (this.activeTool === undefined || this.positions.length === 0) return;
    const built = this.buildShape(this.activeTool, this.positions);
    const shape: DrawnShape =
      this.activeSource === undefined ? built : { ...built, source: this.activeSource };
    this.shapes.set(shape.id, shape);
    this.clearTempEntity();
    this.resetSessionForContinuousDrawing();
    this.emit("draw:complete", { shape });
  }

  // Sadece devam eden cizim OTURUMUNUN durumunu sifirlar -- handler'lar
  // bagli kalir, kamera kilidi/interactionManager suspend durumu KORUNUR
  // (hala cizim modundayiz). Tam kapanis icin bkz. finishSession()/deactivate().
  private resetSessionForContinuousDrawing(): void {
    this.positions = [];
    this.previewPosition = undefined;
    this.freehandDragging = false;
  }

  private finishSession(): void {
    this.unbindToolHandlers();
    this.clearTempEntity();
    this.resetSessionForContinuousDrawing();
    this.activeTool = undefined;
    this.activeSource = undefined;
    this.unlockCamera();
    this.setCursor("default");
    this.resetTrackedEntity();
    this.restoreBuiltInDoubleClick();
    this.interactionManager.resume();
  }

  // ── Gecici onizleme entity'si ────────────────────────────────────────────

  private ensureTempEntity(): void {
    if (this.activeTool === undefined) return;

    if (this.tempEntity === undefined) {
      if (this.activeTool === "point") {
        this.tempEntity = this.viewer.entities.add({
          position: this.requireIndex(this.positions, 0),
          point: { pixelSize: 8, color: Color.YELLOW },
        });
      } else if (this.activeTool !== "rectangle" && this.activeTool !== "circle") {
        // Anahat (rubber-band) onizlemesi: mouse'un o anki konumuna kadar
        // canli takip eder (polyline/polygon/freehand icin ortak). Ham dizi
        // donduren bir CallbackProperty -- polyline API'si PolygonHierarchy
        // SARMALAMASI istemez, bu yuzden crash riski hic olmadi (bkz asagidaki
        // polygon-dolgu notu, sadece polygon.hierarchy icin gecerli bir
        // sorundu). Dikdortgen/daire icin bu duz-cizgi anahati BILEREK
        // olusturulmaz -- gercek sekli temsil etmiyor (asagida onlar icin
        // dogru sekilli CANLI dolgu onizlemesi var).
        this.tempEntity = this.viewer.entities.add({
          polyline: { positions: this.buildPositionsCallback(2), width: 2, material: Color.YELLOW },
        });
      }
    }

    // Alan/dikdortgen/daire icin CANLI dolgu onizlemesi -- BIR KEZ (lazy)
    // olusturulur, Cesium'un kendi render dongusu CallbackProperty'yi HER
    // FRAME otomatik yeniden degerlendirir (elle throttle/recreate GEREKMEZ).
    //
    // WHY guvenli (onceki "statik-fallback ZORUNLU" sonucu DUZELTILDI):
    // ONCEKI turde ham dizi donduren bir CallbackProperty polygon.hierarchy'ye
    // baglaninca (dedupe+min-3-nokta korumali olsa BILE) render dongusunu
    // KALICI cokertiyordu (`computeRectangleFromPositions`, "positions is
    // required" -- gercek headless testle bulundu). tucbs-react'in
    // `MeasureToolPanel.tsx`'indeki (Cesium tabanli, ayni teknigi kullanan)
    // canli alan-olcum onizlemesi arastirilinca TEK anlamli kod-seviyesi fark
    // bulundu: donus degerini `new PolygonHierarchy(...)` ile SARMALIYORLAR.
    // Izole Playwright deneyiyle DOGRULANDI: PolygonHierarchy-sarmali versiyon
    // AYNI adversarial senaryoda (ardisik-ayni-nokta, yogun/kolineer hareket,
    // kendi-kendini-kesen sekil) COKMEDI; ham-dizi versiyonu AYNI testte AYNI
    // hatayla tekrar coktu. Sonuc: kok neden "canli CallbackProperty" degil,
    // "PolygonHierarchy sarmalamadan raw array donmek" imis. Bkz.
    // project_ucbp_api_tucbstoolbar_mimarisi memory (dokuzuncu/onuncu tur).
    // Dikdortgen/daire icin de AYNI teknik -- geometri hesabi tamamlanmis
    // sekille (buildRectangleShape/buildCircleShape) AYNI paylasilan
    // helper'lardan (computeRectangleCoordinates/computeCircleRing) gelir.
    if (this.tempFillEntity === undefined) {
      if (this.activeTool === "polygon") {
        this.tempFillEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new CallbackProperty(() => {
              const raw = [
                ...this.positions,
                ...(this.previewPosition ? [this.previewPosition] : []),
              ];
              const deduped = dedupePositions(raw);
              return deduped.length >= 3 ? new PolygonHierarchy(deduped) : undefined;
            }, false),
            material: Color.CYAN.withAlpha(0.35),
          },
        });
      } else if (this.activeTool === "rectangle") {
        this.tempFillEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new CallbackProperty(() => {
              const first = this.positions[0];
              const second = this.previewPosition;
              if (first === undefined || second === undefined) return undefined;
              const coordinates = this.computeRectangleCoordinates(first, second);
              return new PolygonHierarchy(coordinates.map((c) => this.toCartesianFromLonLat(c)));
            }, false),
            material: Color.CYAN.withAlpha(0.35),
          },
        });
      } else if (this.activeTool === "circle") {
        this.tempFillEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new CallbackProperty(() => {
              const center = this.positions[0];
              const edge = this.previewPosition;
              if (center === undefined || edge === undefined) return undefined;
              const ring = this.computeCircleRing(center, edge);
              return new PolygonHierarchy(ring.map((c) => this.toCartesianFromLonLat(c)));
            }, false),
            material: Color.CYAN.withAlpha(0.35),
          },
        });
      }
    }
  }

  // Alan/cizgi cizerken her onaylanan vertex'te kucuk bir nokta isaretcisi
  // ekler -- sadece anahat/dolgu onizlemesiyle "sekil olusturdugum" arasindaki
  // gorsel farki netlestirmek icin (kullanici geri bildirimi, sonradan cizgiye
  // de genisletildi).
  private addVertexMarker(position: Cartesian3): void {
    this.tempVertexEntities.push(
      this.viewer.entities.add({
        position,
        point: { pixelSize: 6, color: Color.YELLOW, outlineColor: Color.BLACK, outlineWidth: 1 },
      })
    );
  }

  private buildPositionsCallback(minPoints: number): CallbackProperty {
    return new CallbackProperty(() => {
      const raw = [
        ...this.positions,
        ...(this.previewPosition ? [this.previewPosition] : []),
      ];
      const deduped = dedupePositions(raw);
      return deduped.length >= minPoints ? deduped : undefined;
    }, false);
  }

  private clearTempEntity(): void {
    if (this.tempEntity !== undefined) {
      this.viewer.entities.remove(this.tempEntity);
      this.tempEntity = undefined;
    }
    if (this.tempFillEntity !== undefined) {
      this.viewer.entities.remove(this.tempFillEntity);
      this.tempFillEntity = undefined;
    }
    for (const marker of this.tempVertexEntities) {
      this.viewer.entities.remove(marker);
    }
    this.tempVertexEntities = [];
  }

  // Cesium'un Viewer sinifi, BIZIM InteractionManager/DrawingManager'imizdan
  // TAMAMEN bagimsiz kendi dahili ScreenSpaceEventHandler'inda KOSULSUZ
  // olarak bir LEFT_DOUBLE_CLICK handler'i (pickAndTrackObject) baglar:
  // cift-tikladiginiz ekran konumu o an position'i olan bir Entity'yi (bizim
  // vertex isaretcilerimiz veya olcum etiketlerimiz gibi) isabet ettirirse
  // viewer.trackedEntity = o_entity atayip kamerayi o entity'yi takip etmeye
  // KILITLIYOR (nokta entity'lerin varsayilan takip kamerasi genelde duz/
  // yataylasmis gorunuyor) -- gercek kullanimda bulundu (bkz
  // project_ucbp_api_olcum_kamera_bug memory). Bu, bizim tamamlama
  // mantigimizdan (finishMultiVertexViaDoubleClick) BAGIMSIZ, ayni fiziksel
  // cift-tikta ayrica tetikleniyor. Duzeltme: trackedEntity'i sessizce geri
  // sifirliyoruz -- kamera takibi ancak render dongusunde (postUpdate/
  // preRender) gorsel etki yapiyor, bu yuzden ayni JS tick'i icinde senkron
  // sifirlamak gorsel bozulmayi hic ortaya cikmadan engelliyor.
  private resetTrackedEntity(): void {
    if (this.viewer.trackedEntity !== undefined) {
      this.viewer.trackedEntity = undefined;
    }
  }

  // Ayni dahili handler, cift-tiklanan entity'nin position'i YOKSA (ör.
  // yuklenmis GeoJSON poligonu) trackedEntity yerine viewer.zoomTo(entity)
  // cagirir; bu varsayilan HeadingPitchRange ile ~45 derece egimli bir ucus
  // baslatir -- vektor veri uzerinde cizimi cift-tikla bitirince harita
  // aniden tilt oluyordu. resetTrackedEntity() bunu yakalayamaz (ucus
  // asenkron), bu yuzden cizim suresince dahili LEFT_DOUBLE_CLICK handler'i
  // kaldirilir, oturum bitince geri konur.
  private suspendBuiltInDoubleClick(): void {
    if (this.builtInDoubleClickAction !== undefined) return;
    const cesiumHandler = this.viewer.screenSpaceEventHandler;
    const action = cesiumHandler.getInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    if (action === undefined) return;
    this.builtInDoubleClickAction = action;
    cesiumHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  private restoreBuiltInDoubleClick(): void {
    if (this.builtInDoubleClickAction === undefined) return;
    this.viewer.screenSpaceEventHandler.setInputAction(
      this.builtInDoubleClickAction as ScreenSpaceEventHandler.PositionedEventCallback,
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    this.builtInDoubleClickAction = undefined;
  }

  // Cizim/olcum suresince imlec crosshair; cikista tekrar standart ok (default).
  private setCursor(cursor: "crosshair" | "default"): void {
    this.viewer.scene.canvas.style.cursor = cursor;
  }

  private lockCamera(): void {
    this.viewer.scene.screenSpaceCameraController.enableRotate = false;
    this.viewer.scene.screenSpaceCameraController.enableTilt = false;
  }

  private unlockCamera(): void {
    this.viewer.scene.screenSpaceCameraController.enableRotate = true;
    this.viewer.scene.screenSpaceCameraController.enableTilt = true;
  }

  // ── Geometri hesabi ──────────────────────────────────────────────────────

  private buildShape(tool: DrawTool, positions: Cartesian3[]): DrawnShape {
    const id = crypto.randomUUID();
    const createdAt = Date.now();

    if (tool === "point") {
      const first = this.requireIndex(positions, 0);
      const coordinates = this.toLonLat(first);
      return {
        id,
        tool,
        entity: this.viewer.entities.add({
          position: first,
          point: { pixelSize: 8, color: Color.CYAN },
        }),
        positions,
        coordinates: [coordinates],
        geometry: { type: "Point", coordinates } as Geometry,
        createdAt,
      };
    }
    if (tool === "circle") return this.buildCircleShape(id, positions, createdAt);
    if (tool === "rectangle") return this.buildRectangleShape(id, positions, createdAt);
    if (tool === "polygon") return this.buildPolygonShape(id, positions, createdAt);
    return this.buildLineShape(id, tool, positions, createdAt);
  }

  private buildLineShape(
    id: string,
    tool: DrawTool,
    positions: Cartesian3[],
    createdAt: number
  ): DrawnShape {
    const coordinates = positions.map((p) => this.toLonLat(p));
    return {
      id,
      tool,
      entity: this.viewer.entities.add({
        polyline: { positions, width: 3, material: Color.CYAN },
      }),
      positions,
      coordinates,
      geometry: { type: "LineString", coordinates } as Geometry,
      length: this.computeLength(positions),
      createdAt,
    };
  }

  private buildPolygonShape(
    id: string,
    positions: Cartesian3[],
    createdAt: number
  ): DrawnShape {
    const coordinates = positions.map((p) => this.toLonLat(p));
    const firstCoordinate = this.requireIndex(coordinates, 0);
    const firstPosition = this.requireIndex(positions, 0);
    const ring = [...coordinates, firstCoordinate];
    return {
      id,
      tool: "polygon",
      entity: this.viewer.entities.add({
        polygon: { hierarchy: positions, material: Color.CYAN.withAlpha(0.4) },
      }),
      positions,
      coordinates,
      geometry: { type: "Polygon", coordinates: [ring] } as Geometry,
      area: this.computeArea(coordinates),
      perimeter: this.computeLength([...positions, firstPosition]),
      createdAt,
    };
  }

  private buildRectangleShape(
    id: string,
    positions: Cartesian3[],
    createdAt: number
  ): DrawnShape {
    const p1 = this.requireIndex(positions, 0);
    const p2 = this.requireIndex(positions, 1);
    const coordinates = this.computeRectangleCoordinates(p1, p2);
    const corners = coordinates.map((c) => this.toCartesianFromLonLat(c));
    const firstCorner = this.requireIndex(corners, 0);
    return {
      id,
      tool: "rectangle",
      entity: this.viewer.entities.add({
        polygon: { hierarchy: corners, material: Color.CYAN.withAlpha(0.4) },
      }),
      positions: corners,
      coordinates,
      geometry: { type: "Polygon", coordinates: [[...coordinates, this.requireIndex(coordinates, 0)]] } as Geometry,
      area: this.computeArea(coordinates),
      perimeter: this.computeLength([...corners, firstCorner]),
      createdAt,
    };
  }

  private buildCircleShape(
    id: string,
    positions: Cartesian3[],
    createdAt: number
  ): DrawnShape {
    const center = this.requireIndex(positions, 0);
    const edge = this.requireIndex(positions, 1);
    const radius = Cartesian3.distance(center, edge);
    const ring = this.computeCircleRing(center, edge);
    const corners = ring.map((c) => this.toCartesianFromLonLat(c));
    const firstRingPoint = this.requireIndex(ring, 0);
    return {
      id,
      tool: "circle",
      entity: this.viewer.entities.add({
        polygon: { hierarchy: corners, material: Color.CYAN.withAlpha(0.4) },
      }),
      positions: [center, edge],
      coordinates: [this.toLonLat(center)],
      geometry: { type: "Polygon", coordinates: [[...ring, firstRingPoint]] } as Geometry,
      area: Math.PI * radius * radius,
      perimeter: 2 * Math.PI * radius,
      radius,
      createdAt,
    };
  }

  private sampleCircleRing(
    center: [number, number],
    radiusMeters: number
  ): [number, number][] {
    const ring: [number, number][] = [];
    for (let i = 0; i < CIRCLE_SEGMENTS; i++) {
      const angle = (2 * Math.PI * i) / CIRCLE_SEGMENTS;
      const dx = radiusMeters * Math.cos(angle);
      const dy = radiusMeters * Math.sin(angle);
      ring.push(this.offsetMetersToLonLat(center, dx, dy));
    }
    return ring;
  }

  // Iki noktadan eksen-hizali dikdortgenin 4 kosesini (lon/lat) hesaplar --
  // hem tamamlanmis sekil (buildRectangleShape) HEM canli onizleme
  // (ensureTempEntity) TEK bu helper'i kullanir (DRY, davranis birebir ayni).
  private computeRectangleCoordinates(p1: Cartesian3, p2: Cartesian3): [number, number][] {
    const c1 = this.toLonLat(p1);
    const c2 = this.toLonLat(p2);
    const west = Math.min(c1[0], c2[0]);
    const east = Math.max(c1[0], c2[0]);
    const south = Math.min(c1[1], c2[1]);
    const north = Math.max(c1[1], c2[1]);
    return [
      [west, south],
      [east, south],
      [east, north],
      [west, north],
    ];
  }

  // Merkez+kenar noktasindan daire cemberini (lon/lat) hesaplar -- hem
  // tamamlanmis sekil (buildCircleShape) HEM canli onizleme
  // (ensureTempEntity) TEK bu helper'i kullanir (DRY, davranis birebir ayni).
  private computeCircleRing(center: Cartesian3, edge: Cartesian3): [number, number][] {
    const radius = Cartesian3.distance(center, edge);
    const centerLonLat = this.toLonLat(center);
    return this.sampleCircleRing(centerLonLat, radius);
  }

  // Ekvatorel-dikdortgen (equirectangular) izdusum — kucuk/orta olcekli
  // alan/cevre hesaplari icin yeterli dogruluk sağlar (bkz v1 §5, area/perimeter
  // Cartesian3 kirisim mesafesi + bu izdusumle tutarli tutulur).
  private computeArea(coordinates: [number, number][]): number {
    const lat0 = this.requireIndex(coordinates, 0)[1];
    const projected = coordinates.map((c) => this.projectMeters(c, lat0));
    let sum = 0;
    for (let i = 0; i < projected.length; i++) {
      const [x1, y1] = this.requireIndex(projected, i);
      const [x2, y2] = this.requireIndex(projected, (i + 1) % projected.length);
      sum += x1 * y2 - x2 * y1;
    }
    return Math.abs(sum) / 2;
  }

  private computeLength(positions: Cartesian3[]): number {
    let total = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      total += Cartesian3.distance(
        this.requireIndex(positions, i),
        this.requireIndex(positions, i + 1)
      );
    }
    return total;
  }

  private projectMeters(coordinate: [number, number], lat0: number): [number, number] {
    const x =
      CesiumMath.toRadians(coordinate[0]) *
      Math.cos(CesiumMath.toRadians(lat0)) *
      EARTH_RADIUS_METERS;
    const y = CesiumMath.toRadians(coordinate[1]) * EARTH_RADIUS_METERS;
    return [x, y];
  }

  private offsetMetersToLonLat(
    center: [number, number],
    dx: number,
    dy: number
  ): [number, number] {
    const lat =
      center[1] + CesiumMath.toDegrees(dy / EARTH_RADIUS_METERS);
    const lon =
      center[0] +
      CesiumMath.toDegrees(
        dx / (EARTH_RADIUS_METERS * Math.cos(CesiumMath.toRadians(center[1])))
      );
    return [lon, lat];
  }

  private toCartesianFromLonLat(coordinate: [number, number]): Cartesian3 {
    return Cartesian3.fromDegrees(coordinate[0], coordinate[1]);
  }

  private toCartesian(screenPos: Cartesian2): Cartesian3 | undefined {
    return this.viewer.camera.pickEllipsoid(screenPos, this.scene.globe.ellipsoid);
  }

  private toLonLat(cartesian: Cartesian3): [number, number] {
    const cartographic = Cartographic.fromCartesian(cartesian);
    return [
      CesiumMath.toDegrees(cartographic.longitude),
      CesiumMath.toDegrees(cartographic.latitude),
    ];
  }

  // noUncheckedIndexedAccess altinda dizi erisimini daralt (narrow) eder —
  // yalnizca uzunluk zaten dogrulanmis dizilerde cagrilir.
  private requireIndex<T>(items: readonly T[], index: number): T {
    const value = items[index];
    if (value === undefined) {
      throw new TucbsError(
        "INTERNAL_INDEX_OUT_OF_RANGE",
        `DrawingManager: beklenen index (${index}) dizide bulunamadi`
      );
    }
    return value;
  }
}
