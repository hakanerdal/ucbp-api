// @vitest-environment jsdom
//
// Kamera kumesi Faz 2 -- setView/setExtent/flyTo/zoomTo/zoomToLayer Map.ts'ten
// SAF TASINDIKTAN SONRA yazilan birim testleri (bkz Adim 1/3'teki AYNI
// gerekce: Map, Viewer'i KENDI icinde olusturuyor/enjekte edilemiyor --
// project_ucbp_api_god_component_map_adim1_basemapwatcher). Ucu de saf
// `viewer` fonksiyonu oldugu icin deps objesi gerekmiyor.
import { describe, expect, it, vi } from "vitest";
import { Cartesian3, HeadingPitchRange, Math as CesiumMath, Rectangle, type Viewer } from "cesium";
import type { ManagedLayer } from "../types/index.js";
import { flyTo, setExtent, setView, zoomTo, zoomToLayer } from "./cameraControl.js";

function createFakeViewer() {
  const setViewSpy = vi.fn();
  const flyToSpy = vi.fn();
  const zoomToSpy = vi.fn<(target: unknown, offset: HeadingPitchRange) => Promise<boolean>>(async () => true);
  const viewer = {
    camera: { setView: setViewSpy, flyTo: flyToSpy },
    zoomTo: zoomToSpy,
  } as unknown as Viewer;
  return { viewer, setViewSpy, flyToSpy, zoomToSpy };
}

describe("setView", () => {
  it("varsayilan heading/pitch/roll (0/-90/0 derece) ile camera.setView'i cagirir", () => {
    const { viewer, setViewSpy } = createFakeViewer();

    setView(viewer, { longitude: 32.85, latitude: 39.93, height: 500000 });

    expect(setViewSpy).toHaveBeenCalledTimes(1);
    expect(setViewSpy).toHaveBeenCalledWith({
      destination: Cartesian3.fromDegrees(32.85, 39.93, 500000),
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: CesiumMath.toRadians(0),
      },
    });
  });

  it("verilen heading/pitch/roll'u dereceden radyana cevirir", () => {
    const { viewer, setViewSpy } = createFakeViewer();

    setView(viewer, { longitude: 10, latitude: 20, height: 1000, heading: 45, pitch: -30, roll: 5 });

    expect(setViewSpy).toHaveBeenCalledWith({
      destination: Cartesian3.fromDegrees(10, 20, 1000),
      orientation: {
        heading: CesiumMath.toRadians(45),
        pitch: CesiumMath.toRadians(-30),
        roll: CesiumMath.toRadians(5),
      },
    });
  });
});

describe("setExtent", () => {
  it("verilen bolgeyi Rectangle.fromDegrees ile camera.setView'e verir (orientation YOK)", () => {
    const { viewer, setViewSpy } = createFakeViewer();

    setExtent(viewer, { west: 26, south: 36, east: 45, north: 42 });

    expect(setViewSpy).toHaveBeenCalledTimes(1);
    expect(setViewSpy).toHaveBeenCalledWith({
      destination: Rectangle.fromDegrees(26, 36, 45, 42),
    });
  });
});

describe("flyTo", () => {
  it("setView ile AYNI destination/orientation'i camera.flyTo'ya (animasyonlu) verir", () => {
    const { viewer, flyToSpy } = createFakeViewer();

    flyTo(viewer, { longitude: 28.97, latitude: 41.01, height: 20000 });

    expect(flyToSpy).toHaveBeenCalledTimes(1);
    expect(flyToSpy).toHaveBeenCalledWith({
      destination: Cartesian3.fromDegrees(28.97, 41.01, 20000),
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: CesiumMath.toRadians(0),
      },
    });
  });
});

describe("zoomTo", () => {
  it("orientation VERMEDEN sadece konuma aninda ayarlar", () => {
    const { viewer, setViewSpy } = createFakeViewer();

    zoomTo(viewer, 35.0, 39.0, 1000000);

    expect(setViewSpy).toHaveBeenCalledTimes(1);
    expect(setViewSpy).toHaveBeenCalledWith({
      destination: Cartesian3.fromDegrees(35.0, 39.0, 1000000),
    });
  });
});

describe("zoomToLayer", () => {
  it("viewer.zoomTo'yu katman + top-down HeadingPitchRange(0, -PI/2, 0) ile cagirir, sonucu AYNEN iletir", async () => {
    const { viewer, zoomToSpy } = createFakeViewer();
    const layer = { cesiumObject: {} } as unknown as ManagedLayer;

    const result = await zoomToLayer(viewer, layer);

    expect(result).toBe(true);
    expect(zoomToSpy).toHaveBeenCalledTimes(1);
    const [target, range] = zoomToSpy.mock.calls[0]!;
    expect(target).toBe(layer.cesiumObject);
    expect(range).toBeInstanceOf(HeadingPitchRange);
    expect(range.heading).toBe(0);
    expect(range.pitch).toBeCloseTo(-CesiumMath.PI_OVER_TWO);
    expect(range.range).toBe(0);
  });
});
