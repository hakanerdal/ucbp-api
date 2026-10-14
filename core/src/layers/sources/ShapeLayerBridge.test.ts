// Adim 9 Faz 0b -- Ornek 2 (standalone saf fonksiyonlar hic module-ozel
// testi yoktu) test kapsami tamamlama: geometryToWkt/roundMeters/
// roundCoordinate hicbir Cesium Viewer'a ihtiyac duymaz (ShapeLayerBridge
// SINIFI Viewer gerektirir ama bu 3 fonksiyon modul-seviyesinde bagimsiz
// export edilmis saf fonksiyonlardir) -- oncesinde SADECE tam-Viewer'li
// LayerManager.shapeLayerBridge.characterization.test.ts uzerinden dolayli
// kapsaniyordu.
import { describe, expect, it } from "vitest";
import type { Geometry } from "geojson";
import { geometryToWkt, roundCoordinate, roundMeters } from "./ShapeLayerBridge.js";

describe("roundMeters", () => {
  it("2 ondalik basamaga yuvarlar", () => {
    expect(roundMeters(123.456789)).toBe(123.46);
    expect(roundMeters(0.001)).toBe(0);
  });
});

describe("roundCoordinate", () => {
  it("6 ondalik basamaga (yaklasik 11cm) yuvarlar", () => {
    expect(roundCoordinate(32.123456789)).toBe(32.123457);
  });
});

describe("geometryToWkt", () => {
  it("Point geometrisini POINT (x y) olarak cevirir, koordinatlar yuvarlanir", () => {
    const geometry: Geometry = { type: "Point", coordinates: [32.123456789, 39.987654321] };
    expect(geometryToWkt(geometry)).toBe("POINT (32.123457 39.987654)");
  });

  it("LineString geometrisini LINESTRING (x1 y1, x2 y2, ...) olarak cevirir", () => {
    const geometry: Geometry = {
      type: "LineString",
      coordinates: [[32.8, 39.9], [32.9, 40.0]],
    };
    expect(geometryToWkt(geometry)).toBe("LINESTRING (32.8 39.9, 32.9 40)");
  });

  it("Polygon geometrisini POLYGON ((halka)) olarak cevirir, birden fazla halkayi virgulle ayirir", () => {
    const geometry: Geometry = {
      type: "Polygon",
      coordinates: [
        [[32.8, 39.9], [32.9, 39.9], [32.9, 40.0], [32.8, 39.9]],
        [[32.85, 39.92], [32.87, 39.92], [32.87, 39.94], [32.85, 39.92]],
      ],
    };
    expect(geometryToWkt(geometry)).toBe(
      "POLYGON ((32.8 39.9, 32.9 39.9, 32.9 40, 32.8 39.9), (32.85 39.92, 32.87 39.92, 32.87 39.94, 32.85 39.92))"
    );
  });

  it("desteklenmeyen bir geometri turunde bos string doner (exhaustiveness fallback)", () => {
    const geometry = { type: "MultiPoint", coordinates: [] } as unknown as Geometry;
    expect(geometryToWkt(geometry)).toBe("");
  });
});
