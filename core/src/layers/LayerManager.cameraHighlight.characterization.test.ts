// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Adim 10 (layers/CameraHighlight.ts) ONCESI
// zoomToLayer/zoomToEntity/highlightEntity/clearHighlight'in MEVCUT
// davranisini dondurur (bkz project_ucbp_api_god_component_refactor_kurallari,
// madde 1). Bu 4 metod icin HIC karakterizasyon testi yoktu. LayerManager.ts'e
// TEK SATIR bile dokunmadan yazildi (Adim 7/8 ile ayni gerekceyle AYRI dosya).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  Cartesian3,
  Entity,
  PointGraphics,
  PolygonGraphics,
  PolygonHierarchy,
  PolylineGraphics,
  type Viewer,
} from "cesium";
import { LayerManager } from "./LayerManager.js";
import { createFakeViewer } from "../__tests__/fixtures/fakeViewer.js";

describe("LayerManager -- kamera/vurgu karakterizasyonu (Adim 10 Faz 1)", () => {
  let layerManager: LayerManager;
  let viewer: Viewer;

  beforeEach(() => {
    viewer = createFakeViewer();
    layerManager = new LayerManager(viewer);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("beklenmeyen fetch cagrisi");
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe("zoomToLayer", () => {
    it("viewer.zoomTo'yu katman + top-down HeadingPitchRange ile cagirir", async () => {
      const managed = await layerManager.add("WMS", {
        id: "wms-1",
        title: "Test",
        url: "https://demo.mapserver.org/cgi-bin/wms",
        layers: "a",
      });
      const zoomToSpy = vi.spyOn(viewer, "zoomTo");

      const result = await layerManager.zoomToLayer("wms-1");

      expect(result).toBe(true);
      expect(zoomToSpy).toHaveBeenCalledTimes(1);
      expect(zoomToSpy.mock.calls[0]![0]).toBe(managed.cesiumObject);
    });
  });

  describe("zoomToEntity", () => {
    it("polygon geometrili entity'de camera.flyToBoundingSphere'i cagirir (gercek koordinatlardan bounding sphere)", async () => {
      const entity = new Entity({
        id: "e-polygon",
        polygon: new PolygonGraphics({
          hierarchy: new PolygonHierarchy([
            Cartesian3.fromDegrees(32.8, 39.9),
            Cartesian3.fromDegrees(32.9, 39.9),
            Cartesian3.fromDegrees(32.9, 40.0),
          ]),
        }),
      });
      const flySpy = vi.spyOn(viewer.camera, "flyToBoundingSphere");
      const zoomToSpy = vi.spyOn(viewer, "zoomTo");

      const result = await layerManager.zoomToEntity(entity);

      expect(result).toBe(true);
      expect(flySpy).toHaveBeenCalledTimes(1);
      expect(zoomToSpy).not.toHaveBeenCalled();
    });

    it("sadece nokta (position) geometrili entity'de viewer.zoomTo fallback'ine duser", async () => {
      const entity = new Entity({
        id: "e-point",
        position: Cartesian3.fromDegrees(32.8, 39.9),
        point: new PointGraphics({ pixelSize: 8 }),
      });
      const flySpy = vi.spyOn(viewer.camera, "flyToBoundingSphere");
      const zoomToSpy = vi.spyOn(viewer, "zoomTo");

      const result = await layerManager.zoomToEntity(entity);

      expect(result).toBe(true);
      expect(flySpy).not.toHaveBeenCalled();
      expect(zoomToSpy).toHaveBeenCalledTimes(1);
      expect(zoomToSpy.mock.calls[0]![0]).toBe(entity);
    });
  });

  describe("highlightEntity / clearHighlight", () => {
    it("polygon entity'yi ayri bir polyline vurgusu olarak highlightDataSource'a ekler (kendi stilini DEGISTIRMEZ)", async () => {
      const entity = new Entity({
        id: "e-polygon",
        polygon: new PolygonGraphics({
          hierarchy: new PolygonHierarchy([
            Cartesian3.fromDegrees(32.8, 39.9),
            Cartesian3.fromDegrees(32.9, 39.9),
            Cartesian3.fromDegrees(32.9, 40.0),
          ]),
        }),
      });
      const originalMaterial = entity.polygon!.material;

      layerManager.highlightEntity(entity);
      // viewer.dataSources.add() bir microtask sonra cozulur (bkz Cesium
      // DataSourceCollection.add -- Promise.resolve().then(...)) -- highlight
      // entity'nin KENDISI senkron eklenir ama koleksiyona kaydi ASENKRON.
      await Promise.resolve();

      expect(entity.polygon!.material).toBe(originalMaterial);
      const highlightLayers = viewer.dataSources;
      expect(highlightLayers.length).toBe(1);
      const highlightEntities = highlightLayers.get(0).entities.values;
      expect(highlightEntities.length).toBe(1);
      expect(highlightEntities[0]!.polyline).toBeInstanceOf(PolylineGraphics);
      // varsayilan outline genisligi (stil kaydi yok) 2 -- vurgu genisligi +4.
      expect((highlightEntities[0]!.polyline!.width as unknown as { getValue: () => number }).getValue()).toBe(6);
    });

    it("sadece nokta (position) geometrili entity'de PointGraphics vurgusu ekler", async () => {
      const entity = new Entity({
        id: "e-point",
        position: Cartesian3.fromDegrees(32.8, 39.9),
        point: new PointGraphics({ pixelSize: 8 }),
      });

      layerManager.highlightEntity(entity);
      await Promise.resolve();

      const highlightEntities = viewer.dataSources.get(0).entities.values;
      expect(highlightEntities.length).toBe(1);
      expect(highlightEntities[0]!.point).toBeInstanceOf(PointGraphics);
    });

    it("ne polygon/polyline ne position olan bir entity'de NO-OP'tur (hicbir sey eklemez, hata firlatmaz)", () => {
      const entity = new Entity({ id: "e-empty" });

      expect(() => layerManager.highlightEntity(entity)).not.toThrow();
      expect(viewer.dataSources.length).toBe(0);
    });

    it("ikinci cagri ONCEKI vurguyu kaldirip TEK vurgu birakir (removeAll + yeni ekleme)", async () => {
      const first = new Entity({
        id: "e-1",
        position: Cartesian3.fromDegrees(32.8, 39.9),
        point: new PointGraphics({ pixelSize: 8 }),
      });
      const second = new Entity({
        id: "e-2",
        position: Cartesian3.fromDegrees(33.0, 40.0),
        point: new PointGraphics({ pixelSize: 8 }),
      });

      layerManager.highlightEntity(first);
      layerManager.highlightEntity(second);
      await Promise.resolve();

      expect(viewer.dataSources.length).toBe(1);
      const entities = viewer.dataSources.get(0).entities.values;
      expect(entities.length).toBe(1);
    });

    it("clearHighlight aktif vurguyu kaldirir; vurgu YOKKEN de no-op'tur", async () => {
      const entity = new Entity({
        id: "e-1",
        position: Cartesian3.fromDegrees(32.8, 39.9),
        point: new PointGraphics({ pixelSize: 8 }),
      });
      layerManager.highlightEntity(entity);
      await Promise.resolve();
      expect(viewer.dataSources.get(0).entities.values.length).toBe(1);

      layerManager.clearHighlight();
      expect(viewer.dataSources.get(0).entities.values.length).toBe(0);

      expect(() => layerManager.clearHighlight()).not.toThrow();
    });
  });
});
