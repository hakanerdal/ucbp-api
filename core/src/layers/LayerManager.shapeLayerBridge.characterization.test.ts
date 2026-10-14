// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Adim 7 (layers/sources/ShapeLayerBridge.ts) ONCESI
// _addDrawnShape/_addMeasuredShape/_removeDrawnShape/buildDrawnShapeProperties/
// buildMeasuredShapeProperties/geometryToWkt/wktCoordinatePair/roundMeters/
// roundCoordinate/DRAWN_SHAPE_LABELS/MEASURED_SHAPE_LABELS/drawnShapeCounters'in
// MEVCUT davranisini dondurur (bkz project_ucbp_api_god_component_refactor_kurallari,
// madde 1). LayerManager.ts'e TEK SATIR bile dokunmadan yazildi.
//
// ESKIDEN saf yardimcilar (roundMeters/geometryToWkt/..._SHAPE_LABELS vb.)
// LayerManager'daki private static delegeler uzerinden
// (LayerManager as unknown as {...}) cagriliyordu; tasima sonrasi bu
// delegeler yalnizca bu testler icin duruyordu. Artik dogrudan
// layers/sources/ShapeLayerBridge.ts'in export'lari cagrilir (bkz
// docs/gelistirme/ADR-001-LayerManager-facade.md, "Bilinen artiklar").
import { Cartesian3, PropertyBag, type Viewer } from "cesium";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Geometry } from "geojson";
import { LayerManager } from "./LayerManager.js";
import {
  DRAWN_SHAPE_LABELS,
  MEASURED_SHAPE_LABELS,
  buildDrawnShapeProperties,
  buildMeasuredShapeProperties,
  geometryToWkt,
  roundCoordinate,
  roundMeters,
  wktCoordinatePair,
} from "./sources/ShapeLayerBridge.js";
import { createFakeViewer } from "../__tests__/fixtures/fakeViewer.js";
import type { DrawnShape, DrawTool } from "../types/index.js";

function buildShape(
  viewer: Viewer,
  overrides: {
    id?: string;
    tool?: DrawTool;
    geometry?: Geometry;
    length?: number;
    area?: number;
    perimeter?: number;
    radius?: number;
    createdAt?: number;
  } = {}
): DrawnShape {
  const geometry: Geometry = overrides.geometry ?? {
    type: "LineString",
    coordinates: [
      [32.8, 39.9],
      [32.9, 40.0],
    ],
  };
  // _addDrawnShape/_addMeasuredShape once this.viewer.entities.remove(entity)
  // cagiriyor -- gercek DrawingManager.buildPolygonShape/buildLineShape ile
  // AYNI sekilde, entity'nin ONCEDEN viewer.entities'e eklenmis olmasi gerekir.
  // Poligon icin GERCEK (en az 2 noktali) bir hierarchy sart -- OutlineGeometry.
  // addPolygonOutlineCompanion, positions.length < 2 ise SESSIZCE erken doner
  // (bkz layers/style/OutlineGeometry.ts:139), bos bir hierarchy companion
  // uretmez.
  const ringPositions = Cartesian3.fromDegreesArray([32.8, 39.9, 32.9, 39.9, 32.9, 40.0]);
  const entity = viewer.entities.add(
    geometry.type === "Polygon"
      ? { polygon: { hierarchy: ringPositions } }
      : { polyline: { positions: ringPositions } }
  );
  return {
    id: overrides.id ?? "shape-1",
    tool: overrides.tool ?? "polyline",
    entity,
    positions: [],
    coordinates: [],
    geometry,
    // Olcu alanlari yalnizca verildiyse eklenir (exactOptionalPropertyTypes);
    // ShapeLayerBridge bunlari "!== undefined" ile okudugu icin esdeger.
    ...(overrides.length !== undefined && { length: overrides.length }),
    ...(overrides.area !== undefined && { area: overrides.area }),
    ...(overrides.perimeter !== undefined && { perimeter: overrides.perimeter }),
    ...(overrides.radius !== undefined && { radius: overrides.radius }),
    createdAt: overrides.createdAt ?? Date.parse("2026-01-15T10:00:00+03:00"),
  };
}

describe("ShapeLayerBridge adaylari (Adim 7 Faz 1 karakterizasyonu)", () => {
  describe("saf statik yardimcilar", () => {
    it("roundMeters, 2 ondalige yuvarlar", () => {
      expect(roundMeters(123.4567)).toBe(123.46);
      expect(roundMeters(0.001)).toBe(0);
      expect(roundMeters(100)).toBe(100);
    });

    it("roundCoordinate, 6 ondalige (GPS hassasiyeti) yuvarlar", () => {
      expect(roundCoordinate(32.123456789)).toBe(32.123457);
      expect(roundCoordinate(39.9)).toBe(39.9);
    });

    it("wktCoordinatePair, iki yuvarlanmis koordinati bosluk ile birlestirir", () => {
      expect(wktCoordinatePair([32.123456789, 39.987654321])).toBe("32.123457 39.987654");
    });

    it("geometryToWkt, Point/LineString/Polygon icin dogru WKT metnini uretir", () => {
      expect(geometryToWkt({ type: "Point", coordinates: [32.8, 39.9] })).toBe(
        "POINT (32.8 39.9)"
      );
      expect(
        geometryToWkt({
          type: "LineString",
          coordinates: [
            [32.8, 39.9],
            [32.9, 40.0],
          ],
        })
      ).toBe("LINESTRING (32.8 39.9, 32.9 40)");
      expect(
        geometryToWkt({
          type: "Polygon",
          coordinates: [
            [
              [32.8, 39.9],
              [32.9, 39.9],
              [32.9, 40.0],
              [32.8, 39.9],
            ],
          ],
        })
      ).toBe("POLYGON ((32.8 39.9, 32.9 39.9, 32.9 40, 32.8 39.9))");
    });

    it("DRAWN_SHAPE_LABELS/MEASURED_SHAPE_LABELS, TucbsDrawTool.TOOL_LABELS ile " +
      "AYNI Turkce etiketleri tasir (bilerek AYRI kopya, bkz kod yorumu)", () => {
      expect(DRAWN_SHAPE_LABELS.polygon).toBe("Alan");
      expect(DRAWN_SHAPE_LABELS.polyline).toBe("Çizgi");
      expect(MEASURED_SHAPE_LABELS.polyline).toBe("Mesafe");
      expect(MEASURED_SHAPE_LABELS.polygon).toBe("Alan");
    });

    it("buildDrawnShapeProperties, alan sirasini (id ilk, geomwkt son) korur, " +
      "SADECE tanimli olcum alanlarini (length/area/perimeter/radius) ekler", () => {
      const shape = buildShape(createFakeViewer(), {
        tool: "circle",
        geometry: { type: "Point", coordinates: [32.8, 39.9] },
        length: 10.567,
        area: 20.001,
        perimeter: 30,
        radius: 5.5,
      });

      const props = buildDrawnShapeProperties(shape, 3);
      const keys = [...props.propertyNames];
      expect(keys).toEqual(["id", "sekil", "uzunluk_m", "alan_m2", "cevre_m", "yaricap_m", "olusturma_tarihi", "geomwkt"]);
      // PropertyBag'in her alani bir Property (ConstantProperty) sarmalayici
      // olarak tutulur -- ham degerleri okumak icin getValue() cagirilir.
      const value = props.getValue() as Record<string, unknown>;
      expect(value.id).toBe(3);
      expect(value.sekil).toBe("Daire");
      expect(value.uzunluk_m).toBe(10.57);
      expect(value.alan_m2).toBe(20);
      expect(value.cevre_m).toBe(30);
      expect(value.yaricap_m).toBe(5.5);
      expect(value.geomwkt).toBe("POINT (32.8 39.9)");
    });

    it("buildDrawnShapeProperties, length/area/perimeter/radius tanimsizken " +
      "ilgili alanlari HIC eklemez (ör. bir Nokta aracinda)", () => {
      const shape = buildShape(createFakeViewer(), {
        tool: "point",
        geometry: { type: "Point", coordinates: [32.8, 39.9] },
      });

      const props = buildDrawnShapeProperties(shape, 1);
      const keys = [...props.propertyNames];
      expect(keys).toEqual(["id", "sekil", "olusturma_tarihi", "geomwkt"]);
    });

    it("buildMeasuredShapeProperties, 'sekil' yerine 'olcum_turu' kullanir, " +
      "yaricap_m alanini HICBIR ZAMAN eklemez (olcum araci radius uretmez)", () => {
      const shape = buildShape(createFakeViewer(), {
        tool: "polygon",
        geometry: {
          type: "Polygon",
          coordinates: [[[32.8, 39.9], [32.9, 39.9], [32.9, 40.0], [32.8, 39.9]]],
        },
        area: 100,
        perimeter: 50,
        radius: 999, // buildMeasuredShapeProperties bunu OKUMAMALI
      });

      const props = buildMeasuredShapeProperties(shape, 2);
      const keys = [...props.propertyNames];
      expect(keys).toEqual(["id", "olcum_turu", "alan_m2", "cevre_m", "olusturma_tarihi", "geomwkt"]);
      const value = props.getValue() as Record<string, unknown>;
      expect(value.olcum_turu).toBe("Alan");
      expect(value["yaricap_m"]).toBeUndefined();
    });
  });

  describe("_addDrawnShape / _addMeasuredShape / _removeDrawnShape (Viewer'a bagli orkestrasyon)", () => {
    let viewer: Viewer;
    let layerManager: LayerManager;

    beforeEach(() => {
      viewer = createFakeViewer();
      layerManager = new LayerManager(viewer);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("ilk cagrida yeni bir DRAWING katmani olusturur, entity.properties'i " +
      "buildDrawnShapeProperties ile doldurur (sequentialId=1)", async () => {
      const shape = buildShape(viewer, {
        id: "cizim-1",
        tool: "polyline",
        length: 42,
      });

      const managed = await layerManager._addDrawnShape("cizim-1", "Çizim Katmanı", shape);

      expect(managed.layerType).toBe("DRAWING");
      expect("entities" in managed.cesiumObject).toBe(true);
      if ("entities" in managed.cesiumObject) {
        expect(managed.cesiumObject.entities.values.length).toBe(1);
      }
      const props = shape.entity.properties as unknown as PropertyBag;
      const value = props.getValue() as Record<string, unknown>;
      expect(value.id).toBe(1);
      expect(value.sekil).toBe("Çizgi");
      expect(value.uzunluk_m).toBe(42);
    });

    it("AYNI id ile ikinci kez cagrilinca YENI katman OLUSTURMAZ, mevcut " +
      "katmana ekler; drawnShapeCounters sirali artar (sequentialId=2)", async () => {
      const shape1 = buildShape(viewer, { id: "cizim-2", tool: "polyline" });
      const managed1 = await layerManager._addDrawnShape("cizim-2", "Çizim Katmanı", shape1);

      const shape2 = buildShape(viewer, { id: "cizim-2", tool: "point", geometry: { type: "Point", coordinates: [32.8, 39.9] } });
      const managed2 = await layerManager._addDrawnShape("cizim-2", "Çizim Katmanı", shape2);

      expect(managed2.id).toBe(managed1.id);
      if ("entities" in managed2.cesiumObject) {
        expect(managed2.cesiumObject.entities.values.length).toBe(2);
      }
      const props2 = shape2.entity.properties as unknown as PropertyBag;
      expect((props2.getValue() as Record<string, unknown>).id).toBe(2);
    });

    it("poligon sekil eklendiginde addPolygonOutlineCompanion ile bir " +
      "'::outline' companion entity'si de olusturur", async () => {
      const shape = buildShape(viewer, {
        id: "cizim-poligon",
        tool: "polygon",
        geometry: {
          type: "Polygon",
          coordinates: [[[32.8, 39.9], [32.9, 39.9], [32.9, 40.0], [32.8, 39.9]]],
        },
        area: 10,
        perimeter: 5,
      });

      const managed = await layerManager._addDrawnShape("cizim-poligon", "Çizim Katmanı", shape);

      if ("entities" in managed.cesiumObject) {
        const companion = managed.cesiumObject.entities.values.find((e) =>
          e.id?.toString().endsWith("::outline")
        );
        expect(companion).toBeDefined();
      }
    });

    it("_addMeasuredShape, AYNI mimariyi 'MEASURE' katman tipiyle ve " +
      "olcum_turu alaniyla uygular", async () => {
      const shape = buildShape(viewer, { id: "olcum-1", tool: "polyline", length: 100 });

      const managed = await layerManager._addMeasuredShape("olcum-1", "Ölçü Katmanı", shape);

      expect(managed.layerType).toBe("MEASURE");
      const props = shape.entity.properties as unknown as PropertyBag;
      const value = props.getValue() as Record<string, unknown>;
      expect(value.olcum_turu).toBe("Mesafe");
      expect(value.uzunluk_m).toBe(100);
    });

    it("_removeDrawnShape, entity'yi (ve varsa companion outline'ini) siler; " +
      "katmanin SON sekli silinince katman TAMAMEN kaldirilir (removeLayer)", async () => {
      const shape = buildShape(viewer, {
        id: "silinecek",
        tool: "polygon",
        geometry: {
          type: "Polygon",
          coordinates: [[[32.8, 39.9], [32.9, 39.9], [32.9, 40.0], [32.8, 39.9]]],
        },
      });
      await layerManager._addDrawnShape("silinecek", "Çizim Katmanı", shape);
      expect(layerManager.getLayerById("silinecek")).toBeDefined();

      layerManager._removeDrawnShape("silinecek", shape.entity);

      expect(layerManager.getLayerById("silinecek")).toBeUndefined();
    });

    it("_removeDrawnShape, birden fazla sekilden SADECE belirtileni siler, " +
      "katman diger sekille birlikte KALMAYA devam eder", async () => {
      const shape1 = buildShape(viewer, { id: "coklu", tool: "polyline" });
      await layerManager._addDrawnShape("coklu", "Çizim Katmanı", shape1);
      const shape2 = buildShape(viewer, { id: "coklu", tool: "point", geometry: { type: "Point", coordinates: [32.8, 39.9] } });
      await layerManager._addDrawnShape("coklu", "Çizim Katmanı", shape2);

      layerManager._removeDrawnShape("coklu", shape1.entity);

      const managed = layerManager.getLayerById("coklu");
      expect(managed).toBeDefined();
      if (managed && "entities" in managed.cesiumObject) {
        expect(managed.cesiumObject.entities.values.length).toBe(1);
      }
    });
  });
});
