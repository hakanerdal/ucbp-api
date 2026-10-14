import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { Ruler16 as RulerIcon, Area16 as AreaIcon, RulerAlt16 as MainIcon } from "@carbon/icons";
import {
  Cartesian2,
  Cartesian3,
  CallbackPositionProperty,
  CallbackProperty,
  Color,
  HeightReference,
  LabelStyle,
  Math as CesiumMath,
  VerticalOrigin,
  type Entity,
} from "cesium";
import {
  Map as TucbsMapInstance,
  MEASURE_LAYER_ID,
  type DrawingManager,
  type DrawTool,
  type DrawnShape,
  type LayerManager,
  type ManagedLayer,
} from "@tucbs/core";
import { iconNodeToString, type CarbonIconNode } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";
import { hideGuide, showGuide } from "../shared/ui/guidePanel.js";
import { drawGuide } from "./drawHints.js";
import { metersToReadable, sqmToReadable } from "./measureFormat.js";

type MeasureMode = "distance" | "area";

const MODE_TOOL: Record<MeasureMode, DrawTool> = {
  distance: "polyline",
  area: "polygon",
};

const MODE_ICON_NODES: Record<MeasureMode, CarbonIconNode> = {
  distance: RulerIcon,
  area: AreaIcon,
};

// Etiket, yonlendirme paneli basligiyla ayni kaynaktan (drawHints) gelir.
function modeLabel(mode: MeasureMode): string {
  return drawGuide(MODE_TOOL[mode], "measure").title;
}

// Hicbir mod aktif degilken ana butonun ikonu: flyout'taki Mesafe/Alan
// ikonlarindan bilincli olarak farkli.
const MAIN_ICON = unsafeSVG(iconNodeToString(MainIcon));

const iconCache = new Map<MeasureMode, ReturnType<typeof unsafeSVG>>();

function iconFor(mode: MeasureMode) {
  const cached = iconCache.get(mode);
  if (cached) return cached;
  const icon = unsafeSVG(iconNodeToString(MODE_ICON_NODES[mode]));
  iconCache.set(mode, icon);
  return icon;
}

// DrawingManager'in KENDI basit formulu (chord distance + equirectangular
// izdusum, EllipsoidGeodesic/Bevis&Cambareri DEGIL) -- canli onizleme sayisi
// ile draw:complete'te gelen DrawnShape.area/length AYNI formulden gelsin
// diye BILEREK tekrarlaniyor (DrawingManager.computeArea/projectMeters ile
// birebir ayni, ama private oldugundan buraya kopyalanmasi gerekti).
const EARTH_RADIUS_METERS = 6378137;

function projectMeters(coordinate: readonly [number, number], lat0: number): [number, number] {
  const x =
    CesiumMath.toRadians(coordinate[0]) * Math.cos(CesiumMath.toRadians(lat0)) * EARTH_RADIUS_METERS;
  const y = CesiumMath.toRadians(coordinate[1]) * EARTH_RADIUS_METERS;
  return [x, y];
}

function polygonAreaMeters(coordinates: readonly [number, number][]): number {
  if (coordinates.length < 3) return 0;
  const first = coordinates[0];
  if (first === undefined) return 0;
  const lat0 = first[1];
  const projected = coordinates.map((c) => projectMeters(c, lat0));
  let sum = 0;
  for (let i = 0; i < projected.length; i++) {
    const p1 = projected[i];
    const p2 = projected[(i + 1) % projected.length];
    if (p1 === undefined || p2 === undefined) continue;
    sum += p1[0] * p2[1] - p2[0] * p1[1];
  }
  return Math.abs(sum) / 2;
}

function toCartesian(coordinate: readonly [number, number]): Cartesian3 {
  return Cartesian3.fromDegrees(coordinate[0], coordinate[1]);
}

function centroidOf(coordinates: readonly (readonly [number, number])[]): Cartesian3 {
  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (const c of coordinates) {
    const p = toCartesian(c);
    cx += p.x;
    cy += p.y;
    cz += p.z;
  }
  const n = coordinates.length || 1;
  return new Cartesian3(cx / n, cy / n, cz / n);
}

function perimeterMeters(coordinates: readonly (readonly [number, number])[]): number {
  if (coordinates.length < 2) return 0;
  const cartesians = coordinates.map(toCartesian);
  let total = 0;
  for (let i = 0; i < cartesians.length - 1; i++) {
    total += Cartesian3.distance(
      cartesians[i] as Cartesian3,
      cartesians[i + 1] as Cartesian3
    );
  }
  if (cartesians.length >= 3) {
    total += Cartesian3.distance(
      cartesians[cartesians.length - 1] as Cartesian3,
      cartesians[0] as Cartesian3
    );
  }
  return total;
}

const LABEL_FONT = "13px sans-serif";
const SEGMENT_LABEL_BG = Color.BLACK.withAlpha(0.5);
const AREA_LABEL_BG = Color.BLACK.withAlpha(0.45);
const TOTAL_LABEL_BG = Color.fromCssColorString("#1d4ed8").withAlpha(0.8);
const HIDDEN_POS = Cartesian3.fromDegrees(0, 0, -1);

/**
 * Mesafe/alan olcum araci. TucbsDrawTool ile AYNI flyout deseni (ana buton +
 * sola acilan 2 secenek: Mesafe Ölç/Alan Ölç). "Yol C" mimarisi (v14 SS4.16,
 * v8 SS19) geregi ayri bir ScreenSpaceEventHandler KURULMAZ -- DrawingManager'in
 * ZATEN VAR OLAN "polyline"/"polygon" araclari `activate(tool, "measure")`
 * ile yeniden kullanilir.
 *
 * ONEMLI -- "source" tabanli sahiplik: TucbsDrawTool da AYNI "polyline"/
 * "polygon" degerlerini (duz cizim icin) kullaniyor. Bu component SADECE
 * `source === "measure"` ile baslayan oturumlara etiket ekler -- DrawTool'un
 * normal cizimlerini yanlislikla "olcum" sanip etiketlemez (bkz
 * project_ucbp_api_tucbstoolbar_mimarisi memory onaltinci tur).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-measure-tool mapElementId="map"></tucbs-measure-tool>
 * ```
 */
@customElement("tucbs-measure-tool")
export class TucbsMeasureTool extends LitElement {
  static override readonly styles = [
    leftTooltipStyles,
    css`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .measure-tool {
      position: relative;
      display: inline-flex;
    }

    .flyout {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button.active {
      background: var(--cds-background-selected, #e0e0e0);
      border-color: var(--cds-border-strong-01, #8d8d8d);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }

    /* Ana buton toolbar'da SABIT durdugu icin (aktif/pasif fark etmeksizin,
       sadece ikonu degisir) tooltip'i DAIMA leftTooltipStyles'in varsayilan
       SOL konumunda kalir -- aktiflik durumuna gore konum degistirmek
       (once altta, tiklayinca solda) kullanici tarafindan tutarsiz/yanlis
       bulundu (bkz. feedback). SADECE flyout'taki alt secenekler altta acilir. */

    /* Flyout'taki alt secenek butonlari (Mesafe Olc/Alan Olc) DAIMA butonun
       ALTINDA tooltip gosterir -- ana butonun aksine flyout'un actigi
       yonden bagimsiz. */
    .tool-button:not(.main-button)[data-tooltip]::after {
      top: calc(100% + 0.5rem);
      right: auto;
      left: 50%;
      transform: translateX(-50%);
    }
  `,
  ];

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  /**
   * Bağlanılacak `tucbs-map` elementinin DOM id'si (Senaryo 2 bağlama;
   * `firstUpdated()` bu id ile elementi bulup `map` özelliğini atar).
   */
  @property() mapElementId = "";

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz. ./internal/CustomCss.ts). */
  @property({ attribute: "custom-css" }) customCss = "";

  // === JS-only Properties ===
  /**
   * Bağlı `TucbsMapInstance` referansı. Senaryo 2'de `mapElementId`
   * aracılığıyla `firstUpdated()` içinde otomatik atanır; Senaryo 1'de
   * (attribute yok, JS-only property) doğrudan da atanabilir.
   */
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  // === Internal State ===
  @state() private _activeMode: MeasureMode | null = null;
  @state() private _flyoutOpen = false;

  private readonly _customCssState: CustomCssState = { sheet: null };

  // Cesium entity/oturum takibi -- Lit reactivity GEREKMEZ (Cesium kendi
  // render dongusune sahip, CallbackProperty her frame otomatik okunur).
  private _committedCoords: [number, number][] = [];
  private _livePreviewCoord: [number, number] | undefined;
  private _pendingLabels: Entity[] = [];
  private _liveSegmentLabel: Entity | undefined;
  private _liveAreaLabel: Entity | undefined;
  private readonly _shapeLabels = new Map<string, Entity[]>();

  // `_activeMode`, "source==='measure'" ile baslayan HERHANGI bir
  // aktivasyonu (TucbsDrawTool'un source==='draw' mirror'ina benzer sekilde)
  // GORSEL olarak yansitir -- ayni sayfada BIRDEN FAZLA tucbs-measure-tool
  // instance'i (ör. toolbar-ici + standalone) varsa hepsi "aktif" gorunur.
  // AMA etiket ENTITY'lerini SADECE aktivasyonu GERCEKTEN BASLATAN instance
  // olusturmali -- aksi halde her instance kendi PARALEL etiket setini
  // ekler ve haritada AYNI olcum icin cift etiket gorunur (gercek Playwright
  // testiyle bulunan bir bug). `_isSessionOwner`, `activate()` cagrisindan
  // hemen once senkron olarak set edilen bir "iddia" bayragidir; draw:start
  // handler'i bunu tuketip GERCEKTEN BIZIM cagirdigimiz oturumu ayirt eder.
  private _claimingActivation = false;
  private _isSessionOwner = false;

  private readonly _onDrawStart = ({
    tool,
    source,
  }: {
    readonly tool: DrawTool;
    readonly source?: string;
  }): void => {
    if (source !== "measure") {
      this._activeMode = null;
      this._isSessionOwner = false;
      return;
    }
    this._activeMode = tool === "polyline" ? "distance" : "area";
    this._flyoutOpen = false;
    // Oturum bitene (draw:cancel) kadar kalici yonlendirme paneli (bkz TucbsDrawTool).
    const { title, steps } = drawGuide(tool, "measure");
    showGuide(title, steps);
    this._isSessionOwner = this._claimingActivation;
    this._claimingActivation = false;
    if (this._isSessionOwner) {
      this._committedCoords = [];
      this._livePreviewCoord = undefined;
      this._pendingLabels = [];
      this._ensureLiveLabels();
    }
  };

  // SADECE bize ait bir oturum varken (_isSessionOwner) temizlik yapar --
  // baska bir kaynaktan (ör. TucbsDrawTool) VEYA AYNI turden BASKA BIR
  // tucbs-measure-tool instance'indan gelen draw:cancel bizim icin no-op
  // olmali (bkz TucbsDrawTool._onDrawCancel ile ayni mantik).
  private readonly _onDrawCancel = (): void => {
    if (this._isSessionOwner) {
      this._removeLiveLabels();
      this._removePendingLabels();
    }
    this._activeMode = null;
    this._isSessionOwner = false;
    hideGuide();
  };

  // Esc ile iptal edilen yarim kalmis olcumun segment etiketlerini ve canli
  // onizleme durumunu temizler; arac aktif kalir, canli etiketler yeni olcum
  // icin korunur (konum yok -> gizlenirler).
  private readonly _onAbort = (): void => {
    if (!this._isSessionOwner) return;
    this._removePendingLabels();
  };

  private readonly _onVertex = ({
    coordinates,
  }: {
    readonly coordinates: [number, number];
  }): void => {
    if (!this._isSessionOwner) return;
    const previous = this._committedCoords[this._committedCoords.length - 1];
    this._committedCoords.push(coordinates);
    if (previous !== undefined) {
      this._pendingLabels.push(this._addStaticSegmentLabel(previous, coordinates));
    }
  };

  private readonly _onMove = ({
    coordinates,
  }: {
    readonly coordinates: [number, number];
  }): void => {
    if (!this._isSessionOwner) return;
    this._livePreviewCoord = coordinates;
  };

  private readonly _onComplete = ({ shape }: { readonly shape: DrawnShape }): void => {
    if (!this._isSessionOwner) return;

    // Cift-tik ile bitirmede DrawingManager'in kendi ic dedup'i (finishMulti
    // VertexViaDoubleClick) SON vertex'i siler -- biz draw:vertex'i PASIF
    // dinledigimizden bu "hayalet" son vertex'in etiketini de eklemis
    // oluyoruz. Nihai shape.coordinates ile karsilastirip fazlaligi geri al.
    while (this._committedCoords.length > shape.coordinates.length) {
      this._committedCoords.pop();
      const ghost = this._pendingLabels.pop();
      if (ghost) this._removeEntity(ghost);
    }

    if (this._activeMode === "distance" && shape.length !== undefined) {
      this._pendingLabels.push(this._addTotalDistanceLabel(shape));
    } else if (
      this._activeMode === "area" &&
      shape.area !== undefined &&
      shape.perimeter !== undefined
    ) {
      this._pendingLabels.push(this._addAreaSummaryLabel(shape));
    }


    this._shapeLabels.set(shape.id, this._pendingLabels);
    this._pendingLabels = [];
    this._committedCoords = [];
    this._livePreviewCoord = undefined;
  };

  // TucbsDeleteTool (veya dogrudan drawingManager.removeShape/clearAll)
  // sekli sildiginde bu component'in kendi etiket entity'lerini de otomatik
  // temizler -- ekstra silme kodu GEREKMEZ, sadece bu event'e abone olmak
  // yeterli (bkz plan SS5).
  private readonly _onRemove = ({ id }: { readonly id: string }): void => {
    const labels = this._shapeLabels.get(id);
    if (!labels) return;
    for (const label of labels) this._removeEntity(label);
    this._shapeLabels.delete(id);
  };

  // Olcu Katmani (bkz MEASURE_LAYER_ID) TucbsLayerList uzerinden gizlenirse/
  // silinirse, bu component'in AYRICA ekledigi (LayerManager'in Olcu
  // Katmani DataSource'una DEGIL, dogrudan viewer.entities'e -- bkz
  // _ensureLiveLabels/_addStaticSegmentLabel/_addTotalDistanceLabel/
  // _addAreaSummaryLabel) etiket entity'leri katmanin gorunurluk/silme
  // davranisina KENDILIGINDEN dahil olmaz (baska bir DataSource'a ait
  // degiller) -- LayerManager'in "layer:visibility"/"layer:remove"
  // event'lerini dinleyip bu etiketleri de senkron tutariz.
  private readonly _onMeasureLayerVisibility = ({
    id,
    visible,
  }: {
    readonly id: string;
    readonly visible: boolean;
  }): void => {
    if (id !== MEASURE_LAYER_ID) return;
    for (const entity of this._allLabelEntities()) entity.show = visible;
  };

  private readonly _onMeasureLayerRemove = ({
    layer,
  }: {
    readonly layer: ManagedLayer;
  }): void => {
    if (layer.id !== MEASURE_LAYER_ID) return;
    for (const entity of this._allLabelEntities()) this._removeEntity(entity);
    this._shapeLabels.clear();
    this._pendingLabels = [];
    this._liveSegmentLabel = undefined;
    this._liveAreaLabel = undefined;
  };

  // Su an ekranda takip edilen TUM etiket entity'leri -- devam eden oturumun
  // henuz sekle baglanmamis etiketleri (_pendingLabels), tamamlanmis her
  // seklin etiketleri (_shapeLabels), ve kalici canli onizleme etiketleri
  // (_liveSegmentLabel/_liveAreaLabel, bkz _ensureLiveLabels).
  private _allLabelEntities(): Entity[] {
    const all: Entity[] = [...this._pendingLabels];
    for (const labels of this._shapeLabels.values()) all.push(...labels);
    if (this._liveSegmentLabel) all.push(this._liveSegmentLabel);
    if (this._liveAreaLabel) all.push(this._liveAreaLabel);
    return all;
  }

  private _bindLayerManager(layerManager: LayerManager): void {
    layerManager.on("layer:visibility", this._onMeasureLayerVisibility);
    layerManager.on("layer:remove", this._onMeasureLayerRemove);
  }

  private _unbindLayerManager(layerManager: LayerManager): void {
    layerManager.off("layer:visibility", this._onMeasureLayerVisibility);
    layerManager.off("layer:remove", this._onMeasureLayerRemove);
  }

  /**
   * Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken DrawingManager/
   * LayerManager event aboneliklerini ve tüm canlı/bekleyen etiket
   * entity'lerini temizler.
   */
  override disconnectedCallback(): void {
    if (this.map) {
      this._unbindDrawingManager(this.map.drawingManager);
      this._unbindLayerManager(this.map.layerManager);
    }
    this._removeLiveLabels();
    this._removePendingLabels();
    if (this._activeMode !== null) hideGuide();
    super.disconnectedCallback();
  }

  /**
   * Lit yaşam döngüsü: `customCss` değiştiğinde shadow DOM'a enjekte eder;
   * `map` değiştiğinde önceki haritanın DrawingManager/LayerManager
   * bağlarını çözüp yenisine bağlanır.
   *
   * @param changed - Değişen reactive property'lerin Lit tarafından
   *   sağlanan haritası.
   */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-measure-tool");
    }

    if (changed.has("map")) {
      const previous = changed.get("map") as TucbsMapInstance | undefined;
      if (previous) {
        this._unbindDrawingManager(previous.drawingManager);
        this._unbindLayerManager(previous.layerManager);
      }
      if (this.map) {
        this._bindDrawingManager(this.map.drawingManager);
        this._bindLayerManager(this.map.layerManager);
      }
    }
  }

  private _bindDrawingManager(drawingManager: DrawingManager): void {
    drawingManager.on("draw:start", this._onDrawStart);
    drawingManager.on("draw:cancel", this._onDrawCancel);
    drawingManager.on("draw:abort", this._onAbort);
    drawingManager.on("draw:vertex", this._onVertex);
    drawingManager.on("draw:move", this._onMove);
    drawingManager.on("draw:complete", this._onComplete);
    drawingManager.on("draw:remove", this._onRemove);
  }

  private _unbindDrawingManager(drawingManager: DrawingManager): void {
    drawingManager.off("draw:start", this._onDrawStart);
    drawingManager.off("draw:cancel", this._onDrawCancel);
    drawingManager.off("draw:abort", this._onAbort);
    drawingManager.off("draw:vertex", this._onVertex);
    drawingManager.off("draw:move", this._onMove);
    drawingManager.off("draw:complete", this._onComplete);
    drawingManager.off("draw:remove", this._onRemove);
  }

  /**
   * Lit yaşam döngüsü: `map` henüz atanmamışsa `mapElementId` ile eşleşen
   * elementi bulur ve varsa doğrudan, yoksa elementin `ready` event'ini
   * bekleyerek `map` özelliğini atar.
   */

  // === Yasam Dongusu: Map baglama (Zoom/Draw/Delete ile ayni desen) ===
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-measure-tool", "islevsiz"),
    });
  }

  private _onMainButtonClick(): void {
    this._flyoutOpen = !this._flyoutOpen;
  }

  private _selectMode(mode: MeasureMode): void {
    const drawingManager = this.map?.drawingManager;
    if (!drawingManager) return;
    if (this._activeMode === mode) {
      drawingManager.deactivate();
    } else {
      // activate() senkron olarak draw:start'i tetikler -- bayrak, ondan
      // HEMEN once set edilir ki _onDrawStart "bu aktivasyonu BEN mi
      // istedim" sorusunu dogru cevaplayabilsin (bkz yukaridaki alan yorumu).
      this._claimingActivation = true;
      drawingManager.activate(MODE_TOOL[mode], "measure");
    }
    this._flyoutOpen = false;
  }

  // ── Cesium label entity'leri ─────────────────────────────────────────────

  private _removeEntity(entity: Entity): void {
    this.map?.viewer.entities.remove(entity);
  }

  private _removeLiveLabels(): void {
    if (this._liveSegmentLabel) {
      this._removeEntity(this._liveSegmentLabel);
      this._liveSegmentLabel = undefined;
    }
    if (this._liveAreaLabel) {
      this._removeEntity(this._liveAreaLabel);
      this._liveAreaLabel = undefined;
    }
  }

  private _removePendingLabels(): void {
    for (const label of this._pendingLabels) this._removeEntity(label);
    this._pendingLabels = [];
    this._committedCoords = [];
    this._livePreviewCoord = undefined;
  }

  private _liveSegmentMidpoint(): Cartesian3 | undefined {
    const last = this._committedCoords[this._committedCoords.length - 1];
    if (last === undefined || this._livePreviewCoord === undefined) return undefined;
    return Cartesian3.midpoint(toCartesian(last), toCartesian(this._livePreviewCoord), new Cartesian3());
  }

  private _liveSegmentDistance(): number | undefined {
    const last = this._committedCoords[this._committedCoords.length - 1];
    if (last === undefined || this._livePreviewCoord === undefined) return undefined;
    return Cartesian3.distance(toCartesian(last), toCartesian(this._livePreviewCoord));
  }

  private _livePolygonCoords(): [number, number][] {
    return this._livePreviewCoord
      ? [...this._committedCoords, this._livePreviewCoord]
      : [...this._committedCoords];
  }

  // tucbs-react MeasureToolPanel.tsx'teki Entity.label + CallbackProperty +
  // HIDDEN_POS teknigi BIREBIR (bkz plan SS4) -- sadece VERI kaynagi farkli
  // (DrawingManager.on(...) event'leri, dogrudan ScreenSpaceEventHandler
  // DEGIL).
  private _ensureLiveLabels(): void {
    const viewer = this.map?.viewer;
    if (!viewer) return;

    if (this._liveSegmentLabel === undefined) {
      this._liveSegmentLabel = viewer.entities.add({
        position: new CallbackPositionProperty(() => this._liveSegmentMidpoint() ?? HIDDEN_POS, false),
        label: {
          text: new CallbackProperty(() => {
            const d = this._liveSegmentDistance();
            return d === undefined ? "" : metersToReadable(d);
          }, false),
          show: new CallbackProperty(() => this._liveSegmentMidpoint() !== undefined, false),
          showBackground: true,
          backgroundColor: SEGMENT_LABEL_BG,
          font: LABEL_FONT,
          style: LabelStyle.FILL,
          pixelOffset: new Cartesian2(0, -12),
          heightReference: HeightReference.CLAMP_TO_GROUND,
          verticalOrigin: VerticalOrigin.BOTTOM,
        },
      });
    }

    if (this._liveAreaLabel === undefined) {
      this._liveAreaLabel = viewer.entities.add({
        position: new CallbackPositionProperty(() => {
          const pts = this._livePolygonCoords();
          return pts.length >= 3 ? centroidOf(pts) : HIDDEN_POS;
        }, false),
        label: {
          text: new CallbackProperty(() => {
            const pts = this._livePolygonCoords();
            if (pts.length < 3) return "";
            const area = polygonAreaMeters(pts);
            const perimeter = perimeterMeters(pts);
            return `Alan: ${sqmToReadable(area)}\nÇevre: ${metersToReadable(perimeter)}`;
          }, false),
          show: new CallbackProperty(
            () => this._activeMode === "area" && this._livePolygonCoords().length >= 3,
            false,
          ),
          showBackground: true,
          backgroundColor: AREA_LABEL_BG,
          font: LABEL_FONT,
          style: LabelStyle.FILL,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });
    }
  }

  private _addStaticSegmentLabel(
    previous: readonly [number, number],
    current: readonly [number, number],
  ): Entity {
    const p1 = toCartesian(previous);
    const p2 = toCartesian(current);
    const midpoint = Cartesian3.midpoint(p1, p2, new Cartesian3());
    const distance = Cartesian3.distance(p1, p2);
    return this.map!.viewer.entities.add({
      position: midpoint,
      label: {
        text: metersToReadable(distance),
        showBackground: true,
        backgroundColor: SEGMENT_LABEL_BG,
        font: LABEL_FONT,
        style: LabelStyle.FILL,
        pixelOffset: new Cartesian2(0, -12),
        heightReference: HeightReference.CLAMP_TO_GROUND,
        verticalOrigin: VerticalOrigin.BOTTOM,
      },
    });
  }

  // tucbs-react'te YOK -- kullanici istegiyle EKLENDI (bkz plan SS4, "Biri
  // cizgi cizip... toplam cizgi olcusunu de yazacak"). Son segment
  // etiketinden ayirt edilsin diye ters yonde offset + farkli renk.
  private _addTotalDistanceLabel(shape: DrawnShape): Entity {
    const lastCoord = shape.coordinates[shape.coordinates.length - 1];
    const position = lastCoord ? toCartesian(lastCoord) : HIDDEN_POS;
    return this.map!.viewer.entities.add({
      position,
      label: {
        text: `Toplam: ${metersToReadable(shape.length ?? 0)}`,
        showBackground: true,
        backgroundColor: TOTAL_LABEL_BG,
        fillColor: Color.WHITE,
        font: LABEL_FONT,
        style: LabelStyle.FILL,
        pixelOffset: new Cartesian2(0, 14),
        heightReference: HeightReference.CLAMP_TO_GROUND,
        verticalOrigin: VerticalOrigin.TOP,
      },
    });
  }

  private _addAreaSummaryLabel(shape: DrawnShape): Entity {
    const position = centroidOf(shape.coordinates);
    return this.map!.viewer.entities.add({
      position,
      label: {
        text: `Alan: ${sqmToReadable(shape.area ?? 0)}\nÇevre: ${metersToReadable(shape.perimeter ?? 0)}`,
        showBackground: true,
        backgroundColor: AREA_LABEL_BG,
        font: LABEL_FONT,
        style: LabelStyle.FILL,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    });
  }

  /**
   * Bileşenin şablonunu render eder: ana ölçüm butonu ve (`_flyoutOpen`
   * iken) Mesafe Ölç/Alan Ölç seçenek butonlarını içeren flyout.
   */
  override render() {
    // Aktifken calisan olcum modunun IKONU ve ETIKETI (ör. "Mesafe Ölç"),
    // pasifken sabit ikon ve jenerik "Ölçüm" (bkz TucbsDrawTool.ts ayni mantik).
    const mainIcon = this._activeMode !== null ? iconFor(this._activeMode) : MAIN_ICON;
    const mainLabel = this._activeMode !== null ? modeLabel(this._activeMode) : "Ölçüm";

    return html`
      <div class="measure-tool">
        ${this._flyoutOpen
          ? html`
              <div class="flyout">
                ${(["distance", "area"] as const).map(
                  (mode) => html`
                    <button
                      class="tool-button ${mode === this._activeMode ? "active" : ""}"
                      type="button"
                      aria-label=${modeLabel(mode)}
                      data-tooltip=${modeLabel(mode)}
                      @click=${() => this._selectMode(mode)}
                    >
                      ${iconFor(mode)}
                    </button>
                  `,
                )}
              </div>
            `
          : null}
        <button
          class="tool-button main-button ${this._activeMode !== null ? "active" : ""}"
          type="button"
          aria-label=${mainLabel}
          data-tooltip=${mainLabel}
          @click=${this._onMainButtonClick}
        >
          ${mainIcon}
        </button>
      </div>
    `;
  }
}
