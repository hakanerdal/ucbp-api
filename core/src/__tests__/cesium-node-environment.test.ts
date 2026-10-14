import { describe, expect, it } from "vitest";

// LayerManager karakterizasyon testlerinin (bkz LayerManager.characterization.test.ts)
// DAYANDIGI ortam varsayimlarini belgeler ve korur -- eger bir Cesium surum
// guncellemesi bu varsayimlardan birini bozarsa, o test degil BU dosya
// kirilir ve neyin degistigi hemen anlasilir. bkz
// project_ucbp_api_layermanager_karakterizasyon_test_kapsami (hafiza):
// vi.mock("cesium",...) YERINE GERCEK Cesium siniflari kullanilabiliyor --
// TEK istisna Point geometrili GeoJSON'un pin/marker ikonu icin `document`
// (DOM) istemesi; bu yuzden karakterizasyon testlerinde Point YERINE
// Polygon/LineString geometri kullanilir.
describe("Cesium siniflari vitest 'node' ortaminda", () => {
  it("WebMapServiceImageryProvider DOM olmadan construct edilebiliyor", async () => {
    const { WebMapServiceImageryProvider } = await import("cesium");
    const provider = new WebMapServiceImageryProvider({
      url: "https://example.com/wms",
      layers: "test-layer",
    });
    expect(provider).toBeDefined();
  });

  it("Resource construct edilebiliyor (apiKey header senaryosu icin)", async () => {
    const { Resource } = await import("cesium");
    const r = new Resource({ url: "https://example.com", headers: { "x-api-key": "a" } });
    expect(r.url).toContain("example.com");
  });

  it("GeoJsonDataSource.load Polygon veriyle DOM/fetch OLMADAN calisiyor", async () => {
    const { GeoJsonDataSource } = await import("cesium");
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [32.8, 39.9],
                [32.9, 39.9],
                [32.9, 40.0],
                [32.8, 40.0],
                [32.8, 39.9],
              ],
            ],
          },
        },
      ],
    };
    const originalFetch = globalThis.fetch;
    let fetchCalled = false;
    globalThis.fetch = (async (...args: Parameters<typeof fetch>) => {
      fetchCalled = true;
      throw new Error("beklenmeyen fetch cagrisi: " + String(args[0]));
    }) as typeof fetch;
    try {
      const ds = await GeoJsonDataSource.load(geojson, { clampToGround: false });
      expect(ds.entities.values.length).toBe(1);
      expect(fetchCalled).toBe(false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("ImageryLayerCollection ve DataSourceCollection construct edilebiliyor (sahte Viewer icin)", async () => {
    const { ImageryLayerCollection, DataSourceCollection } = await import("cesium");
    const imageryLayers = new ImageryLayerCollection();
    const dataSources = new DataSourceCollection();
    expect(imageryLayers.length).toBe(0);
    expect(dataSources.length).toBe(0);
  });

  it("ImageryLayer construct edilebiliyor (viewer olmadan)", async () => {
    const { ImageryLayer, WebMapServiceImageryProvider } = await import("cesium");
    const provider = new WebMapServiceImageryProvider({
      url: "https://example.com/wms",
      layers: "test-layer",
    });
    const layer = new ImageryLayer(provider);
    expect(layer).toBeDefined();
  });
});
