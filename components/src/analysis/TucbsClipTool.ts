import {
  Cartesian2,
  Cartesian3,
  Cartographic,
  HorizontalOrigin,
  ConstantProperty,
  Math as CesiumMath,
  PolygonHierarchy,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  VerticalOrigin,
  type Entity,
  type Viewer,
} from "cesium";
import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Map as TucbsMapCore, TucbsError, type DrawnShape } from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { showToast } from "../shared/ui/toast.js";
import { analysisHelpStyles, COGRAFI_HELP, renderAnalysisHelp } from "./analysisHelp.js";
import { geoToolStyles } from "./geoToolStyles.js";
import { AnalysisMapBind, type SelectedFeature } from "./analysisMapBind.js";

type RunStatus = "idle" | "loading" | "error" | "success";
type CornerId = "KB" | "KD" | "GD" | "GB";

const CORNER_IDS: readonly CornerId[] = ["KB", "KD", "GD", "GB"];
const CORNER_LABEL: Record<CornerId, string> = {
  KB: "Kuzey-batı",
  KD: "Kuzey-doğu",
  GD: "Güney-doğu",
  GB: "Güney-batı",
};
const KM_PER_DEG = 111.32;

interface Bbox {
  west: number;
  south: number;
  east: number;
  north: number;
}

interface CoordPair {
  lon: string;
  lat: string;
}

/**
 * Kırp formu: nesne seçimi ve dikdörtgen maske. HTTP Map.runClip.
 */
@customElement("tucbs-clip-tool")
export class TucbsClipTool extends LitElement {
  static override readonly styles = [
    geoToolStyles,
    analysisHelpStyles,
    css`
      .area-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }
      .area-size { font-size: 13px; color: #374151; }
      .area-actions { display: flex; align-items: center; gap: 8px; }
      button.link {
        background: transparent;
        border: none;
        color: #6b7280;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
      }
      button.link:disabled { color: #9ca3af; cursor: not-allowed; }
      .title-row { margin-bottom: 16px; }
      .hint { margin: 0 0 8px; font-size: 12px; color: #6b7280; }
      .corners {
        margin: 4px 0 8px;
        padding: 10px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: #f9fafb;
      }
      .corners h4 { margin: 0 0 8px; font-size: 12px; }
      .corner { margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
      .corner:last-of-type { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
      .corner-head { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.6rem;
        height: 1.25rem;
        padding: 0 6px;
        border-radius: 999px;
        background: #da1e28;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
      }
      .corner-name { font-size: 12px; color: #374151; }
      .corner-fields {
        display: grid;
        grid-template-columns: calc(50% - 4px) calc(50% - 4px);
        gap: 8px;
        width: 100%;
      }
      .corner-fields label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        font-size: 11px;
        color: #6b7280;
      }
      .corner-fields input {
        width: 100%;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
        margin: 0;
        padding: 6px 8px;
      }
      .foot { margin: 6px 0 0; font-size: 11px; color: #9ca3af; }
    `,
  ];

  @property() mapElementId = "";
  @property({ attribute: false }) map: TucbsMapCore | null = null;
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _label = "";
  @state() private _drawing = false;
  @state() private _status: RunStatus = "idle";
  @state() private _message = "";
  @state() private _helpOpen = false;
  @state() private _picking = false;
  @state() private _box: Bbox | null = null;
  @state() private _coords: Record<CornerId, CoordPair> = emptyCoords();

  private _feature: SelectedFeature | null = null;
  private _mask: SelectedFeature | null = null;
  private _shapeId: string | null = null;
  private _shapeEntity: Entity | null = null;
  private _handles: Entity[] = [];
  private _drag: CornerId | null = null;
  private _pointer: ScreenSpaceEventHandler | null = null;
  private readonly _css: CustomCssState = { sheet: null };
  private readonly _bind = new AnalysisMapBind(
    () => ({ map: this.map, mapElementId: this.mapElementId }),
    (feature, label) => {
      if (feature.properties.tucbsClipHandle) return;
      if (!this._picking || this._drawing) return;
      this._feature = feature;
      this._label = label;
      this._picking = false;
      this._status = "idle";
      this._message = "";
      this._bind.highlight([feature]);
    },
    () => {
      this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
    },
  );

  private readonly _onDrawComplete = (payload: { readonly shape: DrawnShape }): void => {
    if (payload.shape.source !== "tucbs-clip" || payload.shape.tool !== "rectangle") return;
    const box = boxFromCoordinates(payload.shape.coordinates);
    if (!box) return;
    this._shapeId = payload.shape.id;
    this._shapeEntity = payload.shape.entity;
    this._applyBox(box);
    this._endDrawMode();
    this._placeHandles();
  };

  private readonly _onDrawCancel = (): void => {
    this._drawing = false;
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this._bind.attach();
    this._listenDraw(true);
  }

  override disconnectedCallback(): void {
    this._stopDraw(true);
    this._listenDraw(false);
    this._bind.detach();
    super.disconnectedCallback();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._css, "tucbs-clip-tool");
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._listenDraw(false);
      this._dropPointer();
      this._bind.detach();
      this._bind.attach();
      this._listenDraw(true);
    }
  }

  /** Form altındaki satır yerine toast basar. */
  private _note(kind: "info" | "error" | "success", message: string): void {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }

  /** Çizim olaylarını haritaya bağlar veya koparır. */
  private _listenDraw(on: boolean): void {
    const manager = this._bind.current()?.drawingManager;
    if (!manager) return;
    const method = on ? "on" : "off";
    manager[method]("draw:complete", this._onDrawComplete);
    manager[method]("draw:cancel", this._onDrawCancel);
  }

  /** Dikdörtgen çizmeyi başlatır; önceki maske silinir. */
  private _startDraw(): void {
    const map = this._bind.current();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._clearMask(map);
    this._drawing = true;
    this._picking = false;
    this._note("info", "Haritada dikdörtgen çizin.");
    map.drawingManager.activate("rectangle", "tucbs-clip");
  }

  /** Nesne seçimine geçmeden önce açık çizim oturumunu kapatır. */
  private _armPick(): void {
    this._endDrawMode();
    this._picking = true;
    this._note("info", "Haritadan nesne seç.");
  }

  /** Çizim modundan çıkar; tamamlanmış dikdörtgeni silmez. */
  private _endDrawMode(): void {
    const map = this._bind.current();
    if (map?.drawingManager.getActiveTool() === "rectangle") map.drawingManager.deactivate();
    this._drawing = false;
  }

  private _clearMask(map: TucbsMapCore | null): void {
    this._removeHandles();
    if (map && this._shapeId) map.drawingManager.removeShape(this._shapeId);
    this._shapeId = null;
    this._shapeEntity = null;
    this._mask = null;
    this._box = null;
    this._coords = emptyCoords();
  }

  private _stopDraw(removeShape: boolean): void {
    this._endDrawMode();
    this._dropPointer();
    if (removeShape) this._clearMask(this._bind.current());
    this._drawing = false;
  }

  /** Köşe kutusunu ve kırpma maskesini aynı dikdörtgene yazar. */
  private _applyBox(box: Bbox): void {
    this._box = box;
    this._coords = coordsFromBox(box);
    this._mask = maskFromBox(box);
    this._paintPolygon(box);
    this._status = "idle";
    this._message = "";
  }

  /** Yazılan köşeyi blur veya Enter ile dikdörtgene işler. */
  private _applyCorner(id: CornerId): void {
    const box = this._box;
    if (!box) return;
    const raw = this._coords[id];
    const lon = Number(raw.lon);
    const lat = Number(raw.lat);
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
      this._coords = coordsFromBox(box);
      return;
    }
    const next = boxFromCorner(box, id, lon, lat);
    if (!next) {
      this._coords = coordsFromBox(box);
      this._note("error", "Köşeler geçerli bir dikdörtgen oluşturmuyor.");
      return;
    }
    this._applyBox(next);
    this._placeHandles();
  }

  private _setCoord(id: CornerId, field: "lon" | "lat", value: string): void {
    this._coords = { ...this._coords, [id]: { ...this._coords[id], [field]: value } };
  }

  /** Haritadaki dikdörtgen dolgusunu köşe kutusuna çeker. */
  private _paintPolygon(box: Bbox): void {
    const polygon = this._shapeEntity?.polygon;
    if (!polygon) return;
    polygon.hierarchy = new ConstantProperty(
      new PolygonHierarchy(Cartesian3.fromDegreesArray(flatRing(box))),
    );
    this._bind.current()?.viewer.scene.requestRender();
  }

  /** Köşe tutamaçlarını dikdörtgenin dört ucuna KB/KD/GD/GB yazısıyla koyar. */
  private _placeHandles(): void {
    const map = this._bind.current();
    const box = this._box;
    if (!map || !box) return;
    this._removeHandles();
    const viewer = map.viewer;
    const points = cornerPoints(box);
    for (const id of CORNER_IDS) {
      const point = points[id];
      this._handles.push(viewer.entities.add({
        name: `tucbs-clip-${id}`,
        position: Cartesian3.fromDegrees(point.lon, point.lat),
        properties: { tucbsClipHandle: id } as never,
        billboard: {
          image: cornerBadge(id),
          width: 36,
          height: 22,
          verticalOrigin: VerticalOrigin.CENTER,
          horizontalOrigin: HorizontalOrigin.CENTER,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      }));
    }
    this._ensurePointer(viewer);
    viewer.scene.requestRender();
  }

  private _removeHandles(): void {
    const viewer = this._bind.current()?.viewer;
    if (!viewer) {
      this._handles = [];
      return;
    }
    for (const handle of this._handles) viewer.entities.remove(handle);
    this._handles = [];
    this._drag = null;
    viewer.scene.screenSpaceCameraController.enableInputs = true;
  }

  /** Köşe noktasını sürükleyince dikdörtgeni günceller. */
  private _ensurePointer(viewer: Viewer): void {
    if (this._pointer) return;
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((event: { position: Cartesian2 }) => {
      const id = this._cornerAt(viewer, event.position);
      if (!id) return;
      this._drag = id;
      viewer.scene.screenSpaceCameraController.enableInputs = false;
    }, ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction((event: { endPosition: Cartesian2 }) => {
      if (!this._drag || !this._box) return;
      const lonLat = groundLonLat(viewer, event.endPosition);
      if (!lonLat) return;
      const next = boxFromCorner(this._box, this._drag, lonLat[0], lonLat[1]);
      if (!next) return;
      this._applyBox(next);
      this._moveHandles(next);
    }, ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(() => {
      this._drag = null;
      viewer.scene.screenSpaceCameraController.enableInputs = true;
    }, ScreenSpaceEventType.LEFT_UP);
    this._pointer = handler;
  }

  private _cornerAt(viewer: Viewer, position: Cartesian2): CornerId | null {
    const picked = viewer.scene.pick(position) as { id?: Entity } | undefined;
    const name = picked?.id?.name ?? "";
    if (!name.startsWith("tucbs-clip-")) return null;
    const id = name.slice("tucbs-clip-".length) as CornerId;
    return CORNER_IDS.includes(id) ? id : null;
  }

  private _moveHandles(box: Bbox): void {
    const points = cornerPoints(box);
    for (const handle of this._handles) {
      const id = (handle.name ?? "").slice("tucbs-clip-".length) as CornerId;
      const point = points[id];
      if (!point) continue;
      handle.position = Cartesian3.fromDegrees(point.lon, point.lat) as never;
    }
  }

  private _dropPointer(): void {
    this._removeHandles();
    this._pointer?.destroy();
    this._pointer = null;
  }

  /** Nesne ve dikdörtgen doluysa kırpar. */
  private async _run(): Promise<void> {
    if (this._status === "loading") return;
    if (!this._feature || !this._mask) {
      this._note("error", "Kırpılacak nesne ve dikdörtgen alan gerekli.");
      return;
    }
    const map = this._bind.current();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._status = "loading";
    this._message = "İşleniyor…";
    this.dispatchEvent(
      new CustomEvent("tucbs-clip-run", {
        detail: { mapElementId: this.mapElementId, label: this._label },
        bubbles: true,
        composed: true,
      }),
    );
    try {
      await map.runClip(
        { geojsonA: this._feature, geojsonB: this._mask },
        { title: "Kırpma sonucu" },
      );
      this._feature = null;
      this._label = "";
      this._picking = false;
      this._clearMask(map);
      this._bind.highlight([]);
      this._status = "idle";
      this._message = "";
      showToast("success", "Kırpma işlemi tamamlandı.");
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-clip-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Kırpma başarısız.");
    }
  }

  override render() {
    const busy = this._status === "loading";
    const box = this._box;
    const canRun = Boolean(this._feature && this._mask && box) && !busy && !this._drawing;
    const size = box ? formatSize(box) : "";
    return html`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kırpma</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => { this._helpOpen = true; }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Kırpma", COGRAFI_HELP.kirp, () => { this._helpOpen = false; })}
        <label class="lbl">Kırpılacak nesne</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritadan nesne seç"
            .value=${this._label ? `= ${this._label}` : ""}
            ?disabled=${busy || this._drawing}
            @click=${this._armPick}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => {
              this._feature = null;
              this._label = "";
              this._armPick();
              this._bind.highlight([]);
            }}
          >⟳</button>
        </div>
        <label class="lbl">Kırpma alanı (dikdörtgen)</label>
        <div class="area-row">
          <span class="area-size">${this._drawing ? "Çiziliyor…" : size}</span>
          <div class="area-actions">
            ${box && !this._drawing
              ? html`<button type="button" class="link" ?disabled=${busy} @click=${() => this._clearMask(this._bind.current())}>Temizle</button>`
              : null}
            <button class="secondary" type="button" ?disabled=${busy || this._drawing} @click=${this._startDraw}>
              ${this._drawing ? "Çiziliyor" : box ? "Yeniden çiz" : "Dikdörtgen çiz"}
            </button>
          </div>
        </div>
        ${box
          ? html`
            <div class="corners">
              <h4>Köşe koordinatları</h4>
              ${CORNER_IDS.map((id) => html`
                <div class="corner">
                  <div class="corner-head">
                    <span class="badge">${id}</span>
                    <span class="corner-name">${CORNER_LABEL[id]}</span>
                  </div>
                  <div class="corner-fields">
                    <label>
                      Boylam
                      <input
                        .value=${this._coords[id].lon}
                        ?disabled=${busy || this._drawing}
                        @input=${(event: Event) => this._setCoord(id, "lon", (event.target as HTMLInputElement).value)}
                        @blur=${() => this._applyCorner(id)}
                        @keydown=${(event: KeyboardEvent) => {
                          if (event.key === "Enter") this._applyCorner(id);
                        }}
                      />
                    </label>
                    <label>
                      Enlem
                      <input
                        .value=${this._coords[id].lat}
                        ?disabled=${busy || this._drawing}
                        @input=${(event: Event) => this._setCoord(id, "lat", (event.target as HTMLInputElement).value)}
                        @blur=${() => this._applyCorner(id)}
                        @keydown=${(event: KeyboardEvent) => {
                          if (event.key === "Enter") this._applyCorner(id);
                        }}
                      />
                    </label>
                  </div>
                </div>
              `)}
              <p class="foot">Enter veya alandan çıkınca uygulanır. Köşeleri haritada da sürükleyebilirsiniz.</p>
            </div>
          `
          : html`<p class="hint">Haritada sürükleyerek çizin.</p>`}
        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._run}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this._message ? html`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
}

const CORNER_BADGE: Partial<Record<CornerId, HTMLCanvasElement>> = {};

/** Köşe tutamacı: kırmızı kapsül, beyaz KB/KD/GD/GB. */
function cornerBadge(id: CornerId): HTMLCanvasElement {
  const cached = CORNER_BADGE[id];
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = 72;
  canvas.height = 44;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.fillStyle = "#dc2626";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(2, 2, 68, 40, 20);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 22px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(id, 36, 23);
  CORNER_BADGE[id] = canvas;
  return canvas;
}

function emptyCoords(): Record<CornerId, CoordPair> {
  return {
    KB: { lon: "", lat: "" },
    KD: { lon: "", lat: "" },
    GD: { lon: "", lat: "" },
    GB: { lon: "", lat: "" },
  };
}

/** Dört köşeden batı-güney-doğu-kuzey kutusunu çıkarır. */
function boxFromCoordinates(coordinates: readonly [number, number][]): Bbox | null {
  if (coordinates.length < 2) return null;
  const lons = coordinates.map((c) => c[0]);
  const lats = coordinates.map((c) => c[1]);
  return normalizeBox(Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats));
}

/** Tek köşeyi kaydırır; çöken kutu reddedilir. */
function boxFromCorner(box: Bbox, id: CornerId, lon: number, lat: number): Bbox | null {
  let { west, south, east, north } = box;
  if (id === "KB") {
    west = lon;
    north = lat;
  } else if (id === "KD") {
    east = lon;
    north = lat;
  } else if (id === "GD") {
    east = lon;
    south = lat;
  } else {
    west = lon;
    south = lat;
  }
  return normalizeBox(west, south, east, north);
}

function normalizeBox(west: number, south: number, east: number, north: number): Bbox | null {
  const w = Math.min(west, east);
  const e = Math.max(west, east);
  const s = Math.min(south, north);
  const n = Math.max(south, north);
  if (e - w < 1e-8 || n - s < 1e-8) return null;
  return { west: w, south: s, east: e, north: n };
}

function coordsFromBox(box: Bbox): Record<CornerId, CoordPair> {
  const points = cornerPoints(box);
  const out = emptyCoords();
  for (const id of CORNER_IDS) {
    out[id] = { lon: points[id].lon.toFixed(6), lat: points[id].lat.toFixed(6) };
  }
  return out;
}

function cornerPoints(box: Bbox): Record<CornerId, { lon: number; lat: number }> {
  return {
    KB: { lon: box.west, lat: box.north },
    KD: { lon: box.east, lat: box.north },
    GD: { lon: box.east, lat: box.south },
    GB: { lon: box.west, lat: box.south },
  };
}

function flatRing(box: Bbox): number[] {
  return [box.west, box.south, box.east, box.south, box.east, box.north, box.west, box.north];
}

/** Kırpma isteğinin maske poligonu; halka kapanır. */
function maskFromBox(box: Bbox): SelectedFeature {
  const ring: [number, number][] = [
    [box.west, box.south],
    [box.east, box.south],
    [box.east, box.north],
    [box.west, box.north],
    [box.west, box.south],
  ];
  const geometry = { type: "Polygon", coordinates: [ring] };
  return { type: "Feature", properties: {}, geometry };
}

/** En ve boyu km cinsinden yazar; enlem kosinüsü boylamı kısaltır. */
function formatSize(box: Bbox): string {
  const midLat = ((box.south + box.north) / 2) * (Math.PI / 180);
  const heightKm = Math.abs(box.north - box.south) * KM_PER_DEG;
  const widthKm = Math.abs(box.east - box.west) * KM_PER_DEG * Math.cos(midLat);
  return `${widthKm.toFixed(2)} × ${heightKm.toFixed(2)} km`;
}

/** İmlecin yeryüzündeki boylam ve enlemi; gökyüzü tıklanınca boş. */
function groundLonLat(viewer: Viewer, position: Cartesian2): [number, number] | null {
  const ray = viewer.camera.getPickRay(position);
  if (!ray) return null;
  const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
  if (!cartesian) return null;
  const carto = Cartographic.fromCartesian(cartesian);
  return [CesiumMath.toDegrees(carto.longitude), CesiumMath.toDegrees(carto.latitude)];
}

declare global {
  interface HTMLElementTagNameMap {
    "tucbs-clip-tool": TucbsClipTool;
  }
}
