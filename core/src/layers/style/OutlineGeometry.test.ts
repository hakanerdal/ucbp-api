// OutlineGeometry'nin 17 uyesi icin izole birim testleri. Douglas-Peucker/
// perpendicularDistance/uniformDecimate/polygonExtentMeters/
// simplifyOutlinePositions/risksAntimeridianOrPoleBug PRIVATE oldugu icin
// (bkz project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi)
// public yuzey (addPolygonOutlineCompanion/disableRiskyPolygonOutlines)
// uzerinden DOLAYLI test edilir -- gercek Cesium siniflari kullanilir
// (spike bulgusu: DOM/WebGL olmadan calisiyorlar, bkz
// cesium-node-environment.test.ts), hicbir mock yok.
import { describe, expect, it } from "vitest";
import {
  Cartesian3,
  Color,
  CustomDataSource,
  Entity,
  JulianDate,
  PolygonGraphics,
  PolygonHierarchy,
  PolylineGraphics,
} from "cesium";
import { OutlineGeometry } from "./OutlineGeometry.js";

function createOutlineGeometry(): OutlineGeometry {
  return new OutlineGeometry({ getCurrentTime: () => JulianDate.now() });
}

function addPolygonEntity(
  dataSource: CustomDataSource,
  id: string,
  lonLatPairs: readonly [number, number][]
): Entity {
  const positions = lonLatPairs.map(([lon, lat]) => Cartesian3.fromDegrees(lon, lat));
  return dataSource.entities.add(
    new Entity({
      id,
      polygon: new PolygonGraphics({ hierarchy: new PolygonHierarchy(positions) }),
    })
  );
}

const NORMAL_SQUARE: readonly [number, number][] = [
  [32.8, 39.9],
  [32.9, 39.9],
  [32.9, 40.0],
  [32.8, 40.0],
];

const ANTIMERIDIAN_CROSSING: readonly [number, number][] = [
  [179, 10],
  [-179, 10],
  [-179, 11],
  [179, 11],
];

const NEAR_POLE: readonly [number, number][] = [
  [10, 89.5],
  [11, 89.5],
  [11, 89.6],
  [10, 89.6],
];

describe("OutlineGeometry", () => {
  describe("addPolygonOutlineCompanion / isOutlineCompanion / hasOutlineCompanion", () => {
    it("companion polyline entity'si ekler, native outline'i kapatir, iki WeakSet'i de isaretler", () => {
      const og = createOutlineGeometry();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", NORMAL_SQUARE);

      og.addPolygonOutlineCompanion(ds, entity, Color.RED, 2, true);

      const companion = ds.entities.getById("poly-1::outline");
      expect(companion).toBeDefined();
      expect(companion!.polyline).toBeDefined();
      expect((companion!.properties?.getValue(JulianDate.now()) as { __tucbsOutlineOf: string })
        .__tucbsOutlineOf).toBe("poly-1");

      expect(entity.polygon!.outline?.getValue(JulianDate.now())).toBe(false);
      expect(og.hasOutlineCompanion(entity)).toBe(true);
      expect(og.isOutlineCompanion(companion!)).toBe(true);
      expect(og.isOutlineCompanion(entity)).toBe(false);
      expect(og.hasRiskyOutline(entity)).toBe(false);
    });

    it("hierarchy/positions eksikse (< 2 nokta) sessizce hicbir sey yapmaz", () => {
      const og = createOutlineGeometry();
      const ds = new CustomDataSource("test");
      const entity = ds.entities.add(
        new Entity({
          id: "poly-empty",
          polygon: new PolygonGraphics({ hierarchy: new PolygonHierarchy([Cartesian3.fromDegrees(32, 39)]) }),
        })
      );

      og.addPolygonOutlineCompanion(ds, entity, Color.RED, 2, true);

      expect(ds.entities.getById("poly-empty::outline")).toBeUndefined();
      expect(og.hasOutlineCompanion(entity)).toBe(false);
    });
  });

  describe("addPolygonOutlines", () => {
    it("dataSource'taki TUM poligon entity'lerine companion ekler, poligon-olmayanlari atlar", () => {
      const og = createOutlineGeometry();
      const ds = new CustomDataSource("test");
      addPolygonEntity(ds, "poly-a", NORMAL_SQUARE);
      addPolygonEntity(ds, "poly-b", NORMAL_SQUARE);
      ds.entities.add(new Entity({ id: "not-a-polygon" }));

      og.addPolygonOutlines(ds, Color.BLUE, 3);

      expect(ds.entities.getById("poly-a::outline")).toBeDefined();
      expect(ds.entities.getById("poly-b::outline")).toBeDefined();
      expect(ds.entities.getById("not-a-polygon::outline")).toBeUndefined();
    });
  });

  describe("disableRiskyPolygonOutlines / hasRiskyOutline (risksAntimeridianOrPoleBug dolayli testi)", () => {
    it("antimeridyeni gecen bir poligonun outline'ini kapatir ve isaretler", () => {
      const og = createOutlineGeometry();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "risky-antimeridian", ANTIMERIDIAN_CROSSING);

      og.disableRiskyPolygonOutlines(ds);

      expect(entity.polygon!.outline?.getValue(JulianDate.now())).toBe(false);
      expect(og.hasRiskyOutline(entity)).toBe(true);
    });

    it("kutba cok yakin bir poligonun outline'ini kapatir ve isaretler", () => {
      const og = createOutlineGeometry();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "risky-pole", NEAR_POLE);

      og.disableRiskyPolygonOutlines(ds);

      expect(entity.polygon!.outline?.getValue(JulianDate.now())).toBe(false);
      expect(og.hasRiskyOutline(entity)).toBe(true);
    });

    it("normal (riskli olmayan) bir poligona DOKUNMAZ", () => {
      const og = createOutlineGeometry();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "normal", NORMAL_SQUARE);

      og.disableRiskyPolygonOutlines(ds);

      expect(entity.polygon!.outline).toBeUndefined();
      expect(og.hasRiskyOutline(entity)).toBe(false);
    });
  });

  describe("flattenSuspiciousGeometry", () => {
    it("polygon.granularity'yi Math.PI yapar", () => {
      const og = createOutlineGeometry();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", NORMAL_SQUARE);

      og.flattenSuspiciousGeometry(ds);

      expect(entity.polygon!.granularity?.getValue(JulianDate.now())).toBe(Math.PI);
    });

    it("polyline.granularity'yi Math.PI yapar", () => {
      const og = createOutlineGeometry();
      const ds = new CustomDataSource("test");
      const entity = ds.entities.add(
        new Entity({
          id: "line-1",
          polyline: new PolylineGraphics({
            positions: [Cartesian3.fromDegrees(32, 39), Cartesian3.fromDegrees(33, 40)],
          }),
        })
      );

      og.flattenSuspiciousGeometry(ds);

      expect(entity.polyline!.granularity?.getValue(JulianDate.now())).toBe(Math.PI);
    });
  });

  describe("simplifyOutlinePositions zinciri (douglasPeucker/perpendicularDistance/" +
    "uniformDecimate/polygonExtentMeters -- addPolygonOutlineCompanion uzerinden dolayli)",
    () => {
      it("kucuk/basit bir poligonda outline nokta sayisi giristen fazla ARTMAZ", () => {
        const og = createOutlineGeometry();
        const ds = new CustomDataSource("test");
        const entity = addPolygonEntity(ds, "poly-1", NORMAL_SQUARE);

        og.addPolygonOutlineCompanion(ds, entity, Color.RED, 2, true);

        const companion = ds.entities.getById("poly-1::outline")!;
        const positions = companion.polyline!.positions!.getValue(JulianDate.now()) as Cartesian3[];
        // Kapanis noktasi (ilk noktanin tekrari) dahil giris: 4 nokta + 1 = 5.
        expect(positions.length).toBeGreaterThan(0);
        expect(positions.length).toBeLessThanOrEqual(5);
      });

      it("OUTLINE_MAX_VERTICES (1200) tavanini asan yogun bir poligonda outline " +
        "asla 1200 noktadan fazla olmaz (uniformDecimate guvenlik tavani)",
        () => {
          const og = createOutlineGeometry();
          const ds = new CustomDataSource("test");
          // 2000 noktalik ince bir daire -- Douglas-Peucker toleransi (kucuk
          // yaricap) noktalarin cogunu koruyacak kadar kucuk kalsin diye
          // yaricap KUCUK (yaklasik 500m) tutuluyor.
          const pointCount = 2000;
          const points: [number, number][] = [];
          for (let i = 0; i < pointCount; i++) {
            const angle = (2 * Math.PI * i) / pointCount;
            points.push([32.8 + 0.0001 * Math.cos(angle), 39.9 + 0.0001 * Math.sin(angle)]);
          }
          const entity = addPolygonEntity(ds, "poly-dense", points);

          og.addPolygonOutlineCompanion(ds, entity, Color.RED, 2, true);

          const companion = ds.entities.getById("poly-dense::outline")!;
          const positions = companion.polyline!.positions!.getValue(JulianDate.now()) as Cartesian3[];
          expect(positions.length).toBeLessThanOrEqual(1200);
        }
      );
    }
  );
});
