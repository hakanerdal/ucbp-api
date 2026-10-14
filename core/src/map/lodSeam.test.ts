import { describe, expect, it } from "vitest";
import {
  seamFreeScreenSpaceError,
  cornerDistanceRatio,
  lodTransitionDistances,
  type LodSeamParams,
} from "./lodSeam.js";

// Canli olcumdeki (1800px genislik, dpr2, resolutionScale 0.7) degerler:
// geometricError(5)=2446 -> esik ~1.91M; geometricError(4)=4892 -> esik ~3.82M.
const params: LodSeamParams = {
  geometricError: (level) => 156543.03 * 0.25 / 2 ** level / 8,
  drawingBufferHeight: 667,
  sseDenominator: 0.6112581421420323,
  maximumScreenSpaceError: 2,
  pixelRatio: 0.7,
  // Cesium yatay FOV'u 60 derece tutar -> 1.889 oraninda dikey FOV ~0.593 rad.
  fovy: 0.5932,
  aspectRatio: 1.889,
};

describe("cornerDistanceRatio", () => {
  it("kure egriligi: ayni acida yukseklik arttikca oran buyur", () => {
    expect(cornerDistanceRatio(Math.PI / 3, 1.9, 3_000_000)).toBeGreaterThan(
      cornerDistanceRatio(Math.PI / 3, 1.9, 500_000),
    );
  });

  it("1'den buyuk ve genis ekranda daha buyuktur", () => {
    const square = cornerDistanceRatio(Math.PI / 3, 1, 1_800_000);
    const wide = cornerDistanceRatio(Math.PI / 3, 2, 1_800_000);
    expect(square).toBeGreaterThan(1);
    expect(wide).toBeGreaterThan(square);
  });
});

describe("lodTransitionDistances", () => {
  it("artan sirada ve her seviye icin yarisi buyuklukte (geometricError ikiye katlanir)", () => {
    const d = lodTransitionDistances(params);
    for (let i = 1; i < d.length; i++) {
      expect(d[i]).toBeGreaterThan(d[i - 1]!);
      expect(d[i]! / d[i - 1]!).toBeCloseTo(2, 5);
    }
  });
});

describe("seamFreeScreenSpaceError", () => {
  const thresholds = lodTransitionDistances(params);
  const threshold = thresholds[Math.floor(thresholds.length / 2)]!;

  // Cesium kurali: esik ~ 1/sse. Yeni sse ile esikleri yeniden hesapla.
  function withSse(sse: number): LodSeamParams {
    return { ...params, maximumScreenSpaceError: sse };
  }

  it("bandin disindaki yukseklikte sse'yi aynen dondurur", () => {
    expect(seamFreeScreenSpaceError(threshold * 1.05, params)).toBe(params.maximumScreenSpaceError);
    const ratio = cornerDistanceRatio(params.fovy, params.aspectRatio, threshold);
    expect(seamFreeScreenSpaceError((threshold / ratio) * 0.9, params)).toBe(params.maximumScreenSpaceError);
  });

  it("esigin hemen altindaki yukseklikte sse'yi degistirir ve sonuc hicbir esigi bandin icinde birakmaz", () => {
    const height = threshold * 0.95;
    const sse = seamFreeScreenSpaceError(height, params);
    expect(sse).not.toBe(params.maximumScreenSpaceError);
    const ratio = cornerDistanceRatio(params.fovy, params.aspectRatio, height);
    for (const t of lodTransitionDistances(withSse(sse))) {
      expect(t > height && t < height * ratio).toBe(false);
    }
  });

  it("her yukseklikte (ve farkli ekran oranlarinda) band disi sse uretir; degisim ratio'yu asmaz", () => {
    for (const aspectRatio of [1, 1.33, 1.78, 2.4]) {
      // Cesium yatay FOV'u (60 derece) sabit tutar; dikey FOV ekran oranina gore daralir.
      const fovy = aspectRatio > 1 ? 2 * Math.atan(Math.tan(Math.PI / 6) / aspectRatio) : Math.PI / 3;
      const p = { ...params, aspectRatio, fovy };
      for (let h = 1_000; h < 20_000_000; h *= 1.05) {
        const sse = seamFreeScreenSpaceError(h, p);
        const ratio = cornerDistanceRatio(p.fovy, p.aspectRatio, h);
        expect(sse / p.maximumScreenSpaceError).toBeLessThanOrEqual(ratio * 1.02);
        expect(sse / p.maximumScreenSpaceError).toBeGreaterThanOrEqual(1 / (ratio * 1.02));
        for (const t of lodTransitionDistances({ ...p, maximumScreenSpaceError: sse })) {
          expect(t > h && t < h * ratio).toBe(false);
        }
      }
    }
  });

  it("pencere/cihaz boyutu (drawingBufferHeight, pixelRatio) degisince yeniden hesaplar", () => {
    const height = threshold * 0.95;
    const small = seamFreeScreenSpaceError(height, { ...params, drawingBufferHeight: 400 });
    const big = seamFreeScreenSpaceError(height, { ...params, drawingBufferHeight: 1400 });
    expect(small).toBeDefined();
    expect(big).toBeDefined();
    for (const [p, sse] of [
      [{ ...params, drawingBufferHeight: 400 }, small],
      [{ ...params, drawingBufferHeight: 1400 }, big],
    ] as const) {
      const ratio = cornerDistanceRatio(p.fovy, p.aspectRatio, height);
      for (const t of lodTransitionDistances({ ...p, maximumScreenSpaceError: sse })) {
        expect(t > height && t < height * ratio).toBe(false);
      }
    }
  });
});
