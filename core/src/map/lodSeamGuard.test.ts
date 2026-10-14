import { describe, expect, it } from "vitest";
import { EllipsoidTerrainProvider, Math as CesiumMath, SceneMode, type Viewer } from "cesium";
import { installLodSeamGuard } from "./lodSeamGuard.js";

// Gercek canvas olculerinden (1800px, resolutionScale 0.7): esik ~1.91M m.
function createViewer(overrides: { height?: number; pitchDeg?: number; mode?: SceneMode; terrain?: unknown } = {}) {
  const listeners: Array<() => void> = [];
  const globe = { maximumScreenSpaceError: 2 };
  const camera = {
    pitch: CesiumMath.toRadians(overrides.pitchDeg ?? -90),
    positionCartographic: { height: overrides.height ?? 1_828_000 },
    frustum: { fovy: 0.5938, aspectRatio: 1.887, sseDenominator: 0.6112581421420323 },
  };
  const scene = {
    mode: overrides.mode ?? SceneMode.SCENE3D,
    globe,
    camera,
    terrainProvider: overrides.terrain ?? new EllipsoidTerrainProvider(),
    drawingBufferHeight: 667,
    pixelRatio: 0.7,
    isDestroyed: () => false,
    preRender: {
      addEventListener: (fn: () => void) => {
        listeners.push(fn);
        return () => listeners.splice(listeners.indexOf(fn), 1);
      },
    },
  };
  const frame = (): void => listeners.forEach((fn) => fn());
  return { viewer: { scene } as unknown as Viewer, globe, camera, frame, listeners };
}

describe("installLodSeamGuard", () => {
  it("esigin altindaki duz tepeden bakista sse'yi degistirir, bandin disinda geri yukler", () => {
    const { viewer, globe, camera, frame } = createViewer();
    installLodSeamGuard(viewer);

    frame();
    expect(globe.maximumScreenSpaceError).not.toBe(2);

    camera.positionCartographic.height = 1_000_000; // band disi
    frame();
    expect(globe.maximumScreenSpaceError).toBe(2);
  });

  it("egik bakista (pitch != -90) sse'ye dokunmaz", () => {
    const { viewer, globe, frame } = createViewer({ pitchDeg: -45 });
    installLodSeamGuard(viewer);
    frame();
    expect(globe.maximumScreenSpaceError).toBe(2);
  });

  it("3D disinda veya gercek arazi varken sse'ye dokunmaz", () => {
    const flat = createViewer({ mode: SceneMode.SCENE2D });
    installLodSeamGuard(flat.viewer);
    flat.frame();
    expect(flat.globe.maximumScreenSpaceError).toBe(2);

    const terrain = createViewer({ terrain: {} });
    installLodSeamGuard(terrain.viewer);
    terrain.frame();
    expect(terrain.globe.maximumScreenSpaceError).toBe(2);
  });

  it("dis kodun sse degisikligini yeni taban olarak benimser", () => {
    const { viewer, globe, camera, frame } = createViewer({ height: 1_000_000 });
    installLodSeamGuard(viewer);
    frame();
    globe.maximumScreenSpaceError = 4; // disaridan degistirildi
    frame();
    expect(globe.maximumScreenSpaceError).toBe(4);
    camera.positionCartographic.height = 1_000_000;
    frame();
    expect(globe.maximumScreenSpaceError).toBe(4);
  });

  it("kaldirilinca dinleyiciyi siler ve orijinal degeri geri yukler", () => {
    const { viewer, globe, frame, listeners } = createViewer();
    const remove = installLodSeamGuard(viewer);
    frame();
    expect(globe.maximumScreenSpaceError).not.toBe(2);

    remove();
    expect(listeners).toHaveLength(0);
    expect(globe.maximumScreenSpaceError).toBe(2);
  });
});
