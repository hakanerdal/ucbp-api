// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- TucbsClipTool (Kirpma). typecheck duzeltmesi
// (TUCBS1-1402, H2-H4) "davranis degismedi" iddiasini kaynak okumaya degil
// teste dayandirmak icin yazildi; aracin MEVCUT davranisini dondurur:
//   - cizilen dikdortgenden uretilen kirpma maskesi (kapali GeoJSON halkasi)
//     ve runClip'e giden istek,
//   - harita dikdortgeninin poligonu (ConstantProperty icinde PolygonHierarchy)
//     ve kose koordinati elle degisince hem poligonun hem maskenin guncellenmesi,
//   - "?" dugmesiyle acilan Kirpma yardim penceresi.
//
// Entity'ler gercek Cesium Entity'leridir (entityToGeoJSON @tucbs/core'dan
// gercekten calisir); harita ise aracin dokundugu yuzeyi taklit eden bir ikizdir.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Cartesian3, ConstantProperty, Entity, JulianDate, PolygonHierarchy } from "cesium";
import * as toastUi from "../shared/ui/toast.js";
import { COGRAFI_HELP } from "./analysisHelp.js";
import "./TucbsClipTool.js";
import type { TucbsClipTool } from "./TucbsClipTool.js";

type ClickHandler = (detail: { entity: Entity }) => void;
type DrawHandler = (payload: { shape: unknown }) => void;

interface FakeClipMap {
  /** InteractionManager'in entity:click olayini tetikler. */
  clickEntity(entity: Entity): void;
  /** DrawingManager'in draw:complete olayini tetikler. */
  completeDraw(shape: unknown): void;
  runClip: ReturnType<typeof vi.fn>;
  interactionManager: unknown;
  drawingManager: unknown;
  viewer: unknown;
  showSelectionHighlight(features: unknown[]): void;
  clearSelectionHighlight(): void;
}

/** Kirpma aracinin dokundugu Map yuzeyini taklit eden ikiz. */
function createFakeClipMap(): FakeClipMap {
  const clickHandlers = new Set<ClickHandler>();
  const drawHandlers = new Set<DrawHandler>();
  let activeTool: string | null = null;
  return {
    clickEntity: (entity) => [...clickHandlers].forEach((handler) => handler({ entity })),
    completeDraw: (shape) => [...drawHandlers].forEach((handler) => handler({ shape })),
    runClip: vi.fn(async () => ({})),
    interactionManager: {
      on: (_event: string, handler: ClickHandler) => clickHandlers.add(handler),
      off: (_event: string, handler: ClickHandler) => clickHandlers.delete(handler),
      suspendIdentify: () => {},
      resumeIdentify: () => {},
    },
    drawingManager: {
      on: (event: string, handler: DrawHandler) => {
        if (event === "draw:complete") drawHandlers.add(handler);
      },
      off: (event: string, handler: DrawHandler) => {
        if (event === "draw:complete") drawHandlers.delete(handler);
      },
      activate: (tool: string) => {
        activeTool = tool;
      },
      deactivate: () => {
        activeTool = null;
      },
      getActiveTool: () => activeTool,
      removeShape: () => {},
    },
    viewer: {
      entities: { add: (options: unknown) => options, remove: () => true },
      scene: {
        canvas: document.createElement("canvas"),
        requestRender: () => {},
        screenSpaceCameraController: { enableInputs: true },
      },
    },
    showSelectionHighlight: () => {},
    clearSelectionHighlight: () => {},
  };
}

// 30-32 derece boylam, 40-41 derece enlem; DrawingManager'in dikdortgen koseleri.
const RECT_COORDS: [number, number][] = [
  [30, 40],
  [32, 40],
  [32, 41],
  [30, 41],
];

/** DrawingManager'in "tucbs-clip" kaynakli dikdortgen sekli; poligonu gercek bir Entity'dir. */
function drawnRectangle() {
  const entity = new Entity({
    id: "clip-rect",
    polygon: { hierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArray([30, 40, 32, 40, 32, 41, 30, 41])) },
  });
  return { id: "s1", source: "tucbs-clip", tool: "rectangle", coordinates: RECT_COORDS, entity };
}

const sourceEntity = () =>
  new Entity({
    id: "park",
    polygon: { hierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArray([30.5, 40.2, 31.5, 40.2, 31.5, 40.8])) },
  });

const shadow = (el: Element) => el.shadowRoot!;
const runButton = (el: Element) => shadow(el).querySelector<HTMLButtonElement>("button.run")!;
const cornerInputs = (el: Element) => [...shadow(el).querySelectorAll<HTMLInputElement>(".corner-fields input")];
const hierarchyPositions = (entity: Entity) =>
  (entity.polygon!.hierarchy!.getValue(JulianDate.now()) as PolygonHierarchy).positions;

async function mountClipTool(map: FakeClipMap): Promise<TucbsClipTool> {
  const el = document.createElement("tucbs-clip-tool") as TucbsClipTool;
  el.map = map as never;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/** Dikdortgeni cizer, kaynak nesneyi secer; Calistir'a hazir hale getirir. */
async function drawAndPick(el: TucbsClipTool, map: FakeClipMap) {
  const shape = drawnRectangle();
  map.completeDraw(shape);
  await el.updateComplete;
  shadow(el).querySelector<HTMLInputElement>('input[type="text"]')!.click();
  map.clickEntity(sourceEntity());
  await el.updateComplete;
  return shape;
}

beforeEach(() => {
  vi.spyOn(toastUi, "showToast").mockImplementation(() => {});
  // jsdom canvas cizemez; kose rozetleri (cornerBadge) bu durumda bos canvas'la devam eder.
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("tucbs-clip-tool -- kirpma maskesi (karakterizasyon)", () => {
  it("cizilen dikdortgenden kapali halkali bir GeoJSON poligon maskesi uretip runClip'e gonderir", async () => {
    const map = createFakeClipMap();
    const el = await mountClipTool(map);
    await drawAndPick(el, map);

    expect(runButton(el).disabled).toBe(false);
    runButton(el).click();
    await el.updateComplete;

    expect(map.runClip).toHaveBeenCalledTimes(1);
    const [request, options] = map.runClip.mock.calls[0]!;
    expect(options).toEqual({ title: "Kırpma sonucu" });
    expect(request.geojsonA.geometry.type).toBe("Polygon");
    expect(request.geojsonB).toEqual({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[[30, 40], [32, 40], [32, 41], [30, 41], [30, 40]]],
      },
    });
  });

  it("dikdortgen yokken Calistir pasiftir", async () => {
    const map = createFakeClipMap();
    const el = await mountClipTool(map);
    expect(runButton(el).disabled).toBe(true);
  });
});

describe("tucbs-clip-tool -- harita dikdortgeni (karakterizasyon)", () => {
  it("cizim bitince poligon ConstantProperty icinde dort koseli bir PolygonHierarchy olur", async () => {
    const map = createFakeClipMap();
    const el = await mountClipTool(map);
    const shape = drawnRectangle();
    map.completeDraw(shape);
    await el.updateComplete;

    expect(shape.entity.polygon!.hierarchy).toBeInstanceOf(ConstantProperty);
    expect(hierarchyPositions(shape.entity)).toEqual(
      Cartesian3.fromDegreesArray([30, 40, 32, 40, 32, 41, 30, 41]),
    );
  });

  it("kose kutulari dikdortgenin koselerini 6 basamakla gosterir (KB, KD, GD, GB)", async () => {
    const map = createFakeClipMap();
    const el = await mountClipTool(map);
    map.completeDraw(drawnRectangle());
    await el.updateComplete;

    expect(cornerInputs(el).map((input) => input.value)).toEqual([
      "30.000000", "41.000000",
      "32.000000", "41.000000",
      "32.000000", "40.000000",
      "30.000000", "40.000000",
    ]);
  });

  it("KD boylami elle degisip alandan cikilinca poligon da maske de yeni dikdortgene gecer", async () => {
    const map = createFakeClipMap();
    const el = await mountClipTool(map);
    const shape = await drawAndPick(el, map);

    const kdLon = cornerInputs(el)[2]!;
    kdLon.value = "33";
    kdLon.dispatchEvent(new Event("input"));
    kdLon.dispatchEvent(new Event("blur"));
    await el.updateComplete;

    expect(shape.entity.polygon!.hierarchy).toBeInstanceOf(ConstantProperty);
    expect(hierarchyPositions(shape.entity)).toEqual(
      Cartesian3.fromDegreesArray([30, 40, 33, 40, 33, 41, 30, 41]),
    );
    runButton(el).click();
    await el.updateComplete;
    const [request] = map.runClip.mock.calls[0]!;
    expect(request.geojsonB.geometry.coordinates).toEqual([
      [[30, 40], [33, 40], [33, 41], [30, 41], [30, 40]],
    ]);
  });
});

describe("tucbs-clip-tool -- yardim (karakterizasyon)", () => {
  it("'?' dugmesi Kirpma basligi ve kirp yardim metniyle pencere acar, x ile kapanir", async () => {
    const map = createFakeClipMap();
    const el = await mountClipTool(map);
    expect(shadow(el).querySelector(".help-card")).toBeNull();

    shadow(el).querySelector<HTMLButtonElement>("button.help")!.click();
    await el.updateComplete;

    const card = shadow(el).querySelector(".help-card")!;
    expect(card.querySelector("h3")?.textContent).toBe("Kırpma");
    expect(card.textContent).toContain(COGRAFI_HELP.kirp.ne[0]);
    expect(card.querySelectorAll("ol")[0]!.querySelectorAll("li")).toHaveLength(COGRAFI_HELP.kirp.adimlar.length);

    card.querySelector<HTMLButtonElement>(".help-close")!.click();
    await el.updateComplete;
    expect(shadow(el).querySelector(".help-card")).toBeNull();
  });
});
