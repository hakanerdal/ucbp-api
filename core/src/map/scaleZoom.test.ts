// UNIT TESTLERI -- olcek basamagi secimi, hedef yukseklik, animasyonlu adimin
// min/max siniri ve birikmesi, tekerlek birikimi/kilidi. Gercek Cesium
// tekerlek/animasyon davranisi burada degil, headless Chrome'da canli olculur.
import { describe, expect, it, vi } from "vitest";
import type { Camera, Viewer } from "cesium";
import {
  ZOOM_SCALE_STEPS,
  easeOut,
  flyScaleStep,
  installScaleWheelZoom,
  nextScaleStep,
  planStepAmount,
  snapScaleForDisplay,
  wheelDeltaPixels,
} from "./scaleZoom.js";

describe("nextScaleStep", () => {
  it("yakinlasirken bir alttaki basamagi verir", () => {
    expect(nextScaleStep(5_000_000, 1)).toBe(2_500_000);
    expect(nextScaleStep(4_000, 1)).toBe(2_500);
    expect(nextScaleStep(110, 1)).toBe(100);
  });
  it("uzaklasirken bir ustteki basamagi verir", () => {
    expect(nextScaleStep(2_500, -1)).toBe(5_000);
    expect(nextScaleStep(3_000, -1)).toBe(5_000);
    expect(nextScaleStep(100, -1)).toBe(250);
  });
  it("basamaga %3 icinde yakinsa o basamakta sayilir", () => {
    expect(nextScaleStep(103, 1)).toBeNull(); // Cesium'un 1/100 artigi
    expect(nextScaleStep(5_100, 1)).toBe(2_500);
    expect(nextScaleStep(5_100, -1)).toBe(10_000);
  });
  it("uclarda: en kucukten yakinlasma null, en buyukten uzaklasma Infinity", () => {
    expect(nextScaleStep(100, 1)).toBeNull();
    expect(nextScaleStep(50, 1)).toBeNull();
    expect(nextScaleStep(25_000_000, -1)).toBe(Infinity);
    expect(nextScaleStep(136_000_000, 1)).toBe(25_000_000);
  });
  it("gecersiz girdide null doner", () => {
    expect(nextScaleStep(0, 1)).toBeNull();
    expect(nextScaleStep(NaN, -1)).toBeNull();
  });
  it("basamaklar kesin artan", () => {
    ZOOM_SCALE_STEPS.forEach((s, i) => i > 0 && expect(s).toBeGreaterThan(ZOOM_SCALE_STEPS[i - 1]!));
  });
});

describe("snapScaleForDisplay", () => {
  it("basamaga binde 5 icindeki olcegi tam basamak yapar", () => {
    expect(snapScaleForDisplay(2_499_843)).toBe(2_500_000);
    expect(snapScaleForDisplay(100.2)).toBe(100);
  });
  it("uzaktakini aynen birakir", () => {
    expect(snapScaleForDisplay(2_450_000)).toBe(2_450_000);
    expect(snapScaleForDisplay(102_286)).toBe(102_286);
  });
});

describe("planStepAmount", () => {
  const g = { scale: 5_000, distance: 1_000 };
  it("yakinlasirken mesafeyi hedef/olcek oraniyla kisaltir", () => {
    expect(planStepAmount(g, 1, 1_000, 1e9)).toBeCloseTo(500, 6); // 5000 -> 2500
  });
  it("uzaklasirken mesafeyi uzatir", () => {
    expect(planStepAmount(g, -1, 1_000, 1e9)).toBeCloseTo(1_000, 6); // 5000 -> 10000
  });
  it("en kucuk basamakta yakinlasma icin adim yok", () => {
    expect(planStepAmount({ scale: 100, distance: 29 }, 1, 29, 1e9)).toBeNull();
  });
  it("en ust basamaktan uzaklasma maxHeight'a gider; maxHeight'ta adim yok", () => {
    const top = { scale: 25_000_000, distance: 5_000 };
    expect(planStepAmount(top, -1, 5_000, 9_000)).toBe(4_000);
    expect(planStepAmount(top, -1, 9_000, 9_000)).toBeNull();
  });
  it("uzaklasma maxHeight'i asmaz", () => {
    expect(planStepAmount(g, -1, 1_000, 1_400)).toBe(400);
  });
});

const vec = (x: number, y: number, z: number) => ({
  x,
  y,
  z,
  clone() {
    return vec(this.x, this.y, this.z);
  },
});

interface FlyOptions {
  destination: { x: number };
  duration: number;
  easingFunction: (t: number) => number;
  complete: () => void;
  cancel: () => void;
}

// Kamera +x ekseninde `distance` uzakta, -x yonune bakiyor; zemin orijinde
// ve olcek mesafeyle dogru orantili (scale = distance * SCALE_PER_M).
const SCALE_PER_M = 5; // distance 1000 m -> 1/5000
function createCamera(distance: number) {
  const flights: FlyOptions[] = [];
  const camera = {
    position: vec(distance, 0, 0),
    direction: vec(-1, 0, 0),
    up: vec(0, 0, 1),
    get positionCartographic() {
      return { height: camera.position.x };
    },
    flyTo: vi.fn((options: FlyOptions) => {
      flights.at(-1)?.cancel();
      flights.push(options);
    }),
  };
  const measure = () => ({
    scale: camera.position.x * SCALE_PER_M,
    distance: camera.position.x,
  });
  return { camera, cam: camera as unknown as Camera, flights, measure };
}
const MAX = 1e12;

describe("flyScaleStep", () => {
  it("yakinlasirken kamerayi bir alt basamaga goturen animasyonlu ucus baslatir", () => {
    const { camera, cam, measure } = createCamera(1_000); // 1/5000
    flyScaleStep(cam, 1, measure, MAX);
    expect(camera.flyTo).toHaveBeenCalledTimes(1);
    expect(camera.flyTo.mock.calls[0]![0].destination.x * SCALE_PER_M).toBeCloseTo(2_500, 6);
  });

  it("uzaklasirken bir ust basamaga gider", () => {
    const { camera, cam, measure } = createCamera(1_000);
    flyScaleStep(cam, -1, measure, MAX);
    expect(camera.flyTo.mock.calls[0]![0].destination.x * SCALE_PER_M).toBeCloseTo(10_000, 6);
  });

  it("art arda adimlar birikir (kamera henuz hareket etmemisken)", () => {
    const { camera, cam, measure } = createCamera(1_000);
    flyScaleStep(cam, 1, measure, MAX);
    flyScaleStep(cam, 1, measure, MAX);
    expect(camera.flyTo.mock.calls[1]![0].destination.x * SCALE_PER_M).toBeCloseTo(1_000, 6);
  });

  it("ucus bitince birikim sifirlanir, olcum yeniden alinir", () => {
    const { camera, cam, flights, measure } = createCamera(1_000);
    flyScaleStep(cam, 1, measure, MAX);
    flights[0]!.complete();
    camera.position.x = 500; // 1/2500
    flyScaleStep(cam, 1, measure, MAX);
    expect(camera.flyTo.mock.calls[1]![0].destination.x * SCALE_PER_M).toBeCloseTo(1_000, 6);
  });

  it("arazi/egim: hedef yukseklikten degil OLCULEN olcekten hesaplanir", () => {
    const { camera, cam } = createCamera(1_000);
    // Zemin 900 m yukarida: kamera zemine 100 m uzakta, olcek 1/5000.
    const measure = () => ({ scale: 5_000, distance: 100 });
    flyScaleStep(cam, 1, measure, MAX);
    // 5000 -> 2500: zemine uzaklik 50 m'ye inmeli (50 m ilerle), yukseklik hesabi 500 m ilerletirdi.
    expect(camera.flyTo.mock.calls[0]![0].destination.x).toBeCloseTo(950, 6);
  });

  it("en kucuk basamakta ucus baslatmaz", () => {
    const { camera, cam, measure } = createCamera(20); // 1/100
    flyScaleStep(cam, 1, measure, MAX);
    expect(camera.flyTo).not.toHaveBeenCalled();
  });

  it("olcum yoksa (zemin secilemedi) ucus baslatmaz", () => {
    const { camera, cam } = createCamera(1_000);
    flyScaleStep(cam, 1, () => null, MAX);
    expect(camera.flyTo).not.toHaveBeenCalled();
  });

  it("en ust basamaktan uzaklasma maximumZoomDistance'a gider, asmaz", () => {
    const { camera, cam, measure } = createCamera(5_000_000); // 1/25.000.000
    flyScaleStep(cam, -1, measure, 8_000_000);
    expect(camera.flyTo.mock.calls[0]![0].destination.x).toBeCloseTo(8_000_000, 3);
    const atMax = createCamera(8_000_000);
    flyScaleStep(atMax.cam, -1, atMax.measure, 8_000_000);
    expect(atMax.camera.flyTo).not.toHaveBeenCalled();
  });

  it("250 ms easeOut animasyonu kullanir", () => {
    const { camera, cam, measure } = createCamera(1_000);
    flyScaleStep(cam, 1, measure, MAX);
    const options = camera.flyTo.mock.calls[0]![0];
    expect(options.duration).toBe(0.25);
    expect(options.easingFunction).toBe(easeOut);
    expect(easeOut(0)).toBe(0);
    expect(easeOut(1)).toBe(1);
  });
});

describe("wheelDeltaPixels", () => {
  it("deltaMode'u piksele cevirir", () => {
    expect(wheelDeltaPixels(100, 0)).toBe(100);
    expect(wheelDeltaPixels(3, 1)).toBe(48);
    expect(wheelDeltaPixels(1, 2)).toBe(400);
  });
});

// Gercek `measureGround` yolunu (3 pick) calistiran sahte viewer: kamera
// +x'te `distance` uzakta, zemin orijinde, olcek mesafeyle orantili.
function createViewer(distance: number) {
  const { camera, flights } = createCamera(distance);
  const canvas = new EventTarget() as unknown as HTMLCanvasElement;
  Object.assign(canvas, { clientWidth: 1000, clientHeight: 800 });
  const controller = {
    maximumZoomDistance: 1e12,
    zoomEventTypes: ["WHEEL"] as unknown,
  };
  const metersPerPixel = () => (camera.position.x * SCALE_PER_M * 0.0254) / 96;
  Object.assign(camera, {
    getPickRay: (p: { x: number }) => ({ px: p.x }),
  });
  const globe = {
    pick: (ray: { px: number }) => vec(0, (ray.px - 500) * metersPerPixel(), 0),
  };
  const viewer = {
    camera: camera as unknown as Camera,
    scene: { canvas, globe, camera, screenSpaceCameraController: controller },
  } as unknown as Viewer;
  return { viewer, camera, flights, canvas, controller };
}

describe("installScaleWheelZoom", () => {
  const wheel = (canvas: HTMLCanvasElement, deltaY: number, deltaMode = 0) => {
    const event = Object.assign(new Event("wheel", { cancelable: true }), { deltaY, deltaMode });
    canvas.dispatchEvent(event);
    return event;
  };

  it("Cesium'un WHEEL zoom'unu kapatir, kaldirinca geri yukler", () => {
    const { viewer, controller } = createViewer(1_000);
    const restore = installScaleWheelZoom(viewer);
    expect(controller.zoomEventTypes).not.toContain("WHEEL");
    restore();
    expect(controller.zoomEventTypes).toEqual(["WHEEL"]);
  });

  it("bir centik (deltaY=-100) bir basamak yakinlastirir ve sayfa kaydirmasini engeller", () => {
    const { viewer, camera, canvas } = createViewer(1_000);
    installScaleWheelZoom(viewer);
    const event = wheel(canvas, -100);
    expect(event.defaultPrevented).toBe(true);
    expect(camera.flyTo.mock.calls[0]![0].destination.x * SCALE_PER_M).toBeCloseTo(2_500, 6);
  });

  it("deltaY > 0 uzaklastirir", () => {
    const { viewer, camera, canvas } = createViewer(1_000);
    installScaleWheelZoom(viewer);
    wheel(canvas, 100);
    expect(camera.flyTo.mock.calls[0]![0].destination.x * SCALE_PER_M).toBeCloseTo(10_000, 6);
  });

  it("kucuk (trackpad) deltalar esige kadar birikir, tek adim atar", () => {
    const { viewer, camera, canvas } = createViewer(1_000);
    installScaleWheelZoom(viewer);
    wheel(canvas, -15);
    wheel(canvas, -15);
    expect(camera.flyTo).not.toHaveBeenCalled();
    wheel(canvas, -15);
    expect(camera.flyTo).toHaveBeenCalledTimes(1);
  });

  it("adimdan hemen sonraki kucuk (atalet) deltalar yok sayilir", () => {
    const { viewer, camera, canvas } = createViewer(1_000);
    installScaleWheelZoom(viewer);
    wheel(canvas, -100);
    for (let i = 0; i < 10; i++) wheel(canvas, -10);
    expect(camera.flyTo).toHaveBeenCalledTimes(1);
  });

  it("art arda centikler (buyuk delta) kilide takilmaz, basamaklar birikir", () => {
    const { viewer, camera, canvas } = createViewer(1_000);
    installScaleWheelZoom(viewer);
    wheel(canvas, -100);
    wheel(canvas, -100);
    expect(camera.flyTo.mock.calls[1]![0].destination.x * SCALE_PER_M).toBeCloseTo(1_000, 6);
  });

  it("yon degisince birikim sifirlanir", () => {
    const { viewer, camera, canvas } = createViewer(1_000);
    installScaleWheelZoom(viewer);
    wheel(canvas, -30);
    wheel(canvas, 30); // yon degisti, birikim 0'dan baslar
    expect(camera.flyTo).not.toHaveBeenCalled();
  });
});
