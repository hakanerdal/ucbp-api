// @vitest-environment jsdom
//
// Cizim aktifken Cesium'un dahili LEFT_DOUBLE_CLICK handler'i (pickAndTrackObject:
// konumsuz entity'de viewer.zoomTo -> ~45 derece tilt ucusu) devre disi olmali,
// cizim bitince geri gelmeli.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScreenSpaceEventHandler, ScreenSpaceEventType, type Viewer } from "cesium";
import { DrawingManager } from "./DrawingManager.js";
import type { InteractionManager } from "./InteractionManager.js";

const DBL = ScreenSpaceEventType.LEFT_DOUBLE_CLICK;

describe("DrawingManager -- Cesium dahili cift-tik handler'i", () => {
  let canvas: HTMLCanvasElement;
  let cesiumHandler: ScreenSpaceEventHandler;
  let builtIn: ReturnType<typeof vi.fn>;
  let manager: DrawingManager;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    cesiumHandler = new ScreenSpaceEventHandler(canvas);
    builtIn = vi.fn();
    cesiumHandler.setInputAction(builtIn, DBL);
    const viewer = {
      scene: { canvas, screenSpaceCameraController: {} },
      screenSpaceEventHandler: cesiumHandler,
      entities: { add: vi.fn(), remove: vi.fn() },
      trackedEntity: undefined,
    } as unknown as Viewer;
    const interaction = { suspend: vi.fn(), resume: vi.fn() } as unknown as InteractionManager;
    manager = new DrawingManager(viewer, interaction);
  });

  afterEach(() => {
    if (!cesiumHandler.isDestroyed()) cesiumHandler.destroy();
  });

  it("arac aktifken dahili handler kaldirilir", () => {
    manager.activate("polygon");
    expect(cesiumHandler.getInputAction(DBL)).toBeUndefined();
  });

  it("deactivate sonrasi AYNI dahili handler geri konur", () => {
    manager.activate("polygon");
    manager.deactivate();
    expect(cesiumHandler.getInputAction(DBL)).toBe(builtIn);
  });

  it("araclar arasi gecis ve tekrar activate handler'i bozmaz/kaybetmez", () => {
    manager.activate("polygon");
    manager.activate("polyline");
    expect(cesiumHandler.getInputAction(DBL)).toBeUndefined();
    manager.deactivate();
    expect(cesiumHandler.getInputAction(DBL)).toBe(builtIn);
  });

  it("destroy aktif oturumda da handler'i geri koyar", () => {
    manager.activate("polygon");
    manager.destroy();
    expect(cesiumHandler.getInputAction(DBL)).toBe(builtIn);
  });
});
