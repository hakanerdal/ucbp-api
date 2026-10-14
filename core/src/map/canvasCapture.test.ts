// @vitest-environment jsdom
//
// Adim 3 (GC-06) Faz 2 -- nextFrame/captureCanvasBlob/measureGroundMetersPerPixel
// Map.ts'ten SAF TASINDIKTAN SONRA yazilan birim testleri (bkz Adim 1'deki
// AYNI gerekce: Map, Viewer'i KENDI icinde olusturuyor/enjekte edilemiyor --
// project_ucbp_api_god_component_map_adim1_basemapwatcher). Ucu de saf
// `viewer` fonksiyonu oldugu icin deps objesi bile gerekmiyor, viewer'in
// kullanilan yuzeyi elle sahtelenir.
import { describe, expect, it, vi } from "vitest";
import { Cartesian3, type Viewer } from "cesium";
import { captureCanvasBlob, measureGroundMetersPerPixel, nextFrame } from "./canvasCapture.js";

describe("nextFrame", () => {
  it("bir sonraki postRender'i bekler, requestRender'i tetikler, sonra kendini kaldirir", async () => {
    let capturedCallback: (() => void) | undefined;
    const removeEventListener = vi.fn();
    const requestRender = vi.fn();
    const viewer = {
      scene: {
        postRender: {
          addEventListener: (cb: () => void) => {
            capturedCallback = cb;
          },
          removeEventListener,
        },
        requestRender,
      },
    } as unknown as Viewer;

    const promise = nextFrame(viewer);
    expect(requestRender).toHaveBeenCalledTimes(1);
    expect(capturedCallback).toBeDefined();
    expect(removeEventListener).not.toHaveBeenCalled();

    capturedCallback!();
    await expect(promise).resolves.toBeUndefined();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith(capturedCallback);
  });
});

describe("captureCanvasBlob", () => {
  it("canvas.toBlob basariliysa dondurdugu Blob ile cozer", async () => {
    const fakeBlob = new Blob(["x"], { type: "image/jpeg" });
    const toBlob = vi.fn((cb: (b: Blob | null) => void) => cb(fakeBlob));
    const viewer = { canvas: { toBlob } } as unknown as Viewer;

    const result = await captureCanvasBlob(viewer, "image/jpeg", 0.9);

    expect(result).toBe(fakeBlob);
    expect(toBlob).toHaveBeenCalledWith(expect.any(Function), "image/jpeg", 0.9);
  });

  it("canvas.toBlob null Blob donerse reject eder", async () => {
    const toBlob = vi.fn((cb: (b: Blob | null) => void) => cb(null));
    const viewer = { canvas: { toBlob } } as unknown as Viewer;

    await expect(captureCanvasBlob(viewer, "image/png", 1)).rejects.toThrow("canvas.toBlob basarisiz oldu");
  });

  it("canvas.toBlob YOKSA (eski tarayici) toDataURL fallback'ine duser", async () => {
    const dataUrl = "data:image/png;base64," + btoa("hello");
    const toDataURL = vi.fn(() => dataUrl);
    const viewer = { canvas: { toDataURL } } as unknown as Viewer;

    const result = await captureCanvasBlob(viewer, "image/png", 1);

    expect(result.type).toBe("image/png");
    expect(result.size).toBe("hello".length);
    expect(toDataURL).toHaveBeenCalledWith("image/png", 1);
  });
});

describe("measureGroundMetersPerPixel", () => {
  it("ekran merkezinde iki komsu piksel arasindaki arazi mesafesinin yarisini metre cinsinden dondurur", () => {
    const leftPoint = new Cartesian3(0, 0, 0);
    const rightPoint = new Cartesian3(10, 0, 0);
    const getPickRay = vi.fn(() => ({}));
    const pick = vi.fn().mockReturnValueOnce(leftPoint).mockReturnValueOnce(rightPoint);
    const viewer = {
      scene: { globe: { pick } },
      camera: { getPickRay },
      canvas: { clientWidth: 800, clientHeight: 600 },
    } as unknown as Viewer;

    const result = measureGroundMetersPerPixel(viewer);

    expect(result).toBe(5);
    expect(getPickRay).toHaveBeenCalledTimes(2);
  });

  it("camera.getPickRay null donerse (kamera ufkun disinda) null doner, globe.pick hic cagrilmaz", () => {
    const getPickRay = vi.fn(() => undefined);
    const pick = vi.fn();
    const viewer = {
      scene: { globe: { pick } },
      camera: { getPickRay },
      canvas: { clientWidth: 800, clientHeight: 600 },
    } as unknown as Viewer;

    expect(measureGroundMetersPerPixel(viewer)).toBeNull();
    expect(pick).not.toHaveBeenCalled();
  });

  it("globe.pick null donerse (globe gorunmuyor, ör. acik uzay) null doner", () => {
    const getPickRay = vi.fn(() => ({}));
    const pick = vi.fn().mockReturnValueOnce(undefined).mockReturnValueOnce(new Cartesian3());
    const viewer = {
      scene: { globe: { pick } },
      camera: { getPickRay },
      canvas: { clientWidth: 800, clientHeight: 600 },
    } as unknown as Viewer;

    expect(measureGroundMetersPerPixel(viewer)).toBeNull();
  });
});
