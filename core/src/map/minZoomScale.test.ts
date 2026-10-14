import { describe, expect, it, vi } from "vitest";
import type { Viewer } from "cesium";
import { installMinZoomScale, minZoomDistanceForScale, snapToMinAmount } from "./minZoomScale.js";

const FOVY = Math.PI / 3;

describe("minZoomDistanceForScale", () => {
  it("1/100 olcegi icin piksel basina 100*0.0254/96 m dusen yuksekligi verir", () => {
    const h = minZoomDistanceForScale(100, 1080, FOVY)!;
    const metersPerPixel = (2 * h * Math.tan(FOVY / 2)) / 1080;
    expect(metersPerPixel).toBeCloseTo((100 * 0.0254) / 96, 9);
  });

  it("canvas yuksekligiyle dogru orantilidir", () => {
    const a = minZoomDistanceForScale(100, 500, FOVY)!;
    const b = minZoomDistanceForScale(100, 1000, FOVY)!;
    expect(b / a).toBeCloseTo(2, 9);
  });

  it("gecersiz girdide null doner", () => {
    expect(minZoomDistanceForScale(100, 0, FOVY)).toBeNull();
    expect(minZoomDistanceForScale(100, 800, 0)).toBeNull();
    expect(minZoomDistanceForScale(NaN, 800, FOVY)).toBeNull();
  });
});

describe("snapToMinAmount", () => {
  it("sinirin hemen ustunde durduysa aradaki farki verir", () => {
    expect(snapToMinAmount(103, 100)).toBeCloseTo(3, 9);
  });
  it("sinirda/altindaysa veya pay disindaysa 0 verir", () => {
    expect(snapToMinAmount(100, 100)).toBe(0);
    expect(snapToMinAmount(100 + 1e-9, 100)).toBe(0); // float gurultusu
    expect(snapToMinAmount(99, 100)).toBe(0);
    expect(snapToMinAmount(107, 100)).toBe(0);
    expect(snapToMinAmount(110, 100)).toBe(0); // 1/110: kullanicinin kendi durusu
    expect(snapToMinAmount(5000, 100)).toBe(0);
  });
});

function fakeViewer(clientHeight: number, minimumZoomDistance = 10) {
  let listener: () => void = () => undefined;
  let moveEnd: () => void = () => undefined;
  const zoomIn = vi.fn();
  const removeSpy = vi.fn();
  const camera = {
    frustum: { fovy: FOVY },
    positionCartographic: { height: 0 },
    zoomIn,
    moveEnd: {
      addEventListener: (fn: () => void) => {
        moveEnd = fn;
        return removeSpy;
      },
    },
  };
  const controller = { minimumZoomDistance, maximumZoomDistance: 25_000_000 };
  const canvas = { clientHeight, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  const viewer = {
    scene: {
      canvas,
      camera,
      screenSpaceCameraController: controller,
      preRender: {
        addEventListener: (fn: () => void) => {
          listener = fn;
          return removeSpy;
        },
      },
    },
  } as unknown as Viewer;
  return { viewer, controller, canvas, camera, zoomIn, fire: () => listener(), fireMoveEnd: () => moveEnd(), removeSpy };
}

describe("installMinZoomScale", () => {
  it("maxScaleDenominator verilince maximumZoomDistance'i da olcege gore yazar", () => {
    const { viewer, controller, canvas, fire } = fakeViewer(1000);
    installMinZoomScale(viewer, 100, 25_000_000);
    fire();
    expect(controller.maximumZoomDistance).toBeCloseTo(
      minZoomDistanceForScale(25_000_000, 1000, FOVY)!,
      3,
    );
    (canvas as { clientHeight: number }).clientHeight = 500;
    fire();
    expect(controller.maximumZoomDistance).toBeCloseTo(
      minZoomDistanceForScale(25_000_000, 500, FOVY)!,
      3,
    );
  });

  it("maxScaleDenominator verilmezse maximumZoomDistance'a dokunmaz", () => {
    const { viewer, controller, fire } = fakeViewer(1000);
    const before = controller.maximumZoomDistance;
    installMinZoomScale(viewer, 100);
    fire();
    expect(controller.maximumZoomDistance).toBe(before);
  });

  it("her karede minimumZoomDistance'i olcege gore yazar ve canvas degisince guncellenir", () => {
    const { viewer, controller, canvas, fire } = fakeViewer(1000);
    installMinZoomScale(viewer, 100);
    fire();
    expect(controller.minimumZoomDistance).toBeCloseTo(minZoomDistanceForScale(100, 1000, FOVY)!, 9);
    canvas.clientHeight = 500;
    fire();
    expect(controller.minimumZoomDistance).toBeCloseTo(minZoomDistanceForScale(100, 500, FOVY)!, 9);
  });

  it("dondurulen fonksiyon dinleyiciyi kaldirir", () => {
    const { viewer, removeSpy } = fakeViewer(1000);
    installMinZoomScale(viewer, 100)();
    expect(removeSpy).toHaveBeenCalledTimes(2);
  });

  it("moveEnd'de sinirin hemen ustundeyse sinira yaklastirir, degilse dokunmaz", async () => {
    const { viewer, controller, camera, zoomIn, fireMoveEnd } = fakeViewer(1000, 100);
    installMinZoomScale(viewer, 100);
    controller.minimumZoomDistance = 100;
    vi.stubGlobal("requestAnimationFrame", (cb: (now: number) => void) => {
      setTimeout(() => cb(performance.now() + 1000), 0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", () => undefined);
    camera.positionCartographic.height = 103;
    fireMoveEnd();
    await new Promise((r) => setTimeout(r, 5));
    const total = zoomIn.mock.calls.reduce((a, [n]) => a + (n as number), 0);
    expect(total).toBeCloseTo(3, 9);
    zoomIn.mockClear();
    camera.positionCartographic.height = 110;
    fireMoveEnd();
    await new Promise((r) => setTimeout(r, 5));
    expect(zoomIn).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
