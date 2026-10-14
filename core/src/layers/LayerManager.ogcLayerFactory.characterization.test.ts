// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Adim 8 (layers/ogc/OgcLayerFactory.ts) ONCESI
// WMTS ekleme, WMS/WMTS sunucu-tanimli stil degisimi, WCS ekleme (ML-08'in
// DUZELTME ONCESI mevcut davranisi DAHIL) ve GeoTIFF'in MEVCUT davranisini
// dondurur (bkz project_ucbp_api_god_component_refactor_kurallari, madde 1).
// LayerManager.ts'e TEK SATIR bile dokunmadan yazildi. WMS/WFS/GeoJSON zaten
// LayerManager.characterization.test.ts'te karakterize edilmis (1087 satir --
// bu yeni dosya Adim 7/Faz 1 ile AYNI gerekceyle check-file-length esigine
// yaklastirmamak icin AYRI acildi), tekrar edilmedi. addWFS/GML-fallback
// (ML-13) de zaten orada (satir 311-340) karakterize edilmis -- Adim 8/Faz 4'te
// (ML-13 duzeltmesi) YERINDE guncellenecek, burada tekrar yazilmadi.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Rectangle, SingleTileImageryProvider, type Viewer } from "cesium";
import { LayerManager } from "./LayerManager.js";
import { createFakeViewer } from "../__tests__/fixtures/fakeViewer.js";
import { asImageryLayer } from "../__tests__/fixtures/cesiumObject.js";
import { LayerOperationError } from "../shared/TucbsError.js";
import type { WCSLayerOptions, WMTSLayerOptions } from "../types/index.js";

describe("LayerManager.add() karakterizasyonu -- ogc/OgcLayerFactory adaylari (Adim 8 Faz 1)", () => {
  let layerManager: LayerManager;
  let viewer: Viewer;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    viewer = createFakeViewer();
    layerManager = new LayerManager(viewer);
    fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      throw new Error("beklenmeyen fetch cagrisi: " + String(input));
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe("WMTS", () => {
    it("provider'a beklenen url/layer/style/tileMatrixSetID'i gecirir, fetch tetiklemez, layer:add yayinlar", async () => {
      const onLayerAdd = vi.fn();
      layerManager.on("layer:add", onLayerAdd);

      const managed = await layerManager.add("WMTS", {
        id: "wmts-1",
        title: "Test WMTS",
        url: "https://demo.mapserver.org/cgi-bin/wmts",
        layer: "il_sinirlari",
        tileMatrixSetID: "GoogleMapsCompatible",
      });

      expect(fetchMock).not.toHaveBeenCalled();
      expect(managed.id).toBe("wmts-1");
      expect(managed.layerType).toBe("WMTS");

      const provider = asImageryLayer(managed).imageryProvider as unknown as {
        _resource: { url: string };
      };
      // WMTS options.url'de {} sablon parantezi olmadigindan KVP moduna
      // dusuyor (bkz WebMapTileServiceImageryProvider kaynagi) -- layer/
      // style/tilematrixset/format query parametresi olarak eklenir.
      expect(provider._resource.url).toContain("layer=il_sinirlari");
      expect(provider._resource.url).toContain("style=default");
      expect(provider._resource.url).toContain("tilematrixset=GoogleMapsCompatible");

      expect(onLayerAdd).toHaveBeenCalledTimes(1);
    });
  });

  describe("setWmsStyle / setWmtsStyle / getWmsLegendGraphicUrl (mevcut davranis)", () => {
    it("setWmsStyle: ayni z-sira indeksinde YENI bir ImageryLayer kurar, " +
      "provider URL'i STYLES parametresini tasir, serviceLayerOptions guncellenir", async () => {
      const managed = await layerManager.add("WMS", {
        id: "wms-style",
        title: "Test WMS",
        url: "https://demo.mapserver.org/cgi-bin/wms",
        layers: "il_sinirlari",
      });
      const oldLayer = asImageryLayer(managed);
      const oldIndex = viewer.imageryLayers.indexOf(oldLayer);

      await layerManager.setWmsStyle("wms-style", "koyu-tema");

      const updated = layerManager.getLayerById("wms-style")!;
      const newLayer = asImageryLayer(updated);
      expect(newLayer).not.toBe(oldLayer);
      expect(viewer.imageryLayers.indexOf(newLayer)).toBe(oldIndex);
      const provider = newLayer.imageryProvider as unknown as { _resource: { url: string } };
      expect(provider._resource.url).toContain("styles=koyu-tema");
    });

    it("setWmtsStyle: ayni desenin WMTS esdegeri (style alani guncellenir)", async () => {
      const options: WMTSLayerOptions = {
        id: "wmts-style",
        title: "Test WMTS",
        url: "https://demo.mapserver.org/cgi-bin/wmts",
        layer: "il_sinirlari",
        tileMatrixSetID: "GoogleMapsCompatible",
      };
      const managed = await layerManager.add("WMTS", options);
      const oldLayer = asImageryLayer(managed);

      await layerManager.setWmtsStyle("wmts-style", "gece");

      const updated = layerManager.getLayerById("wmts-style")!;
      expect(updated.cesiumObject).not.toBe(oldLayer);
      const provider = asImageryLayer(updated).imageryProvider as unknown as { _resource: { url: string } };
      expect(provider._resource.url).toContain("style=gece");
    });

    it("getWmsLegendGraphicUrl: GetLegendGraphic/sld_version/layer/style parametrelerini icerir", async () => {
      await layerManager.add("WMS", {
        id: "wms-legend",
        title: "Test WMS",
        url: "https://demo.mapserver.org/cgi-bin/wms",
        layers: "il_sinirlari",
      });

      const url = layerManager.getWmsLegendGraphicUrl("wms-legend", "ozel-stil");
      expect(url).toContain("request=GetLegendGraphic");
      expect(url).toContain("sld_version=1.1.0");
      expect(url).toContain("layer=il_sinirlari");
      expect(url).toContain("style=ozel-stil");
    });
  });

  describe("WCS (ML-08 -- DUZELTILDI)", () => {
    function stubImageFetch(): void {
      fetchMock.mockImplementation(async () =>
        new Response(new Uint8Array([1, 2, 3]), {
          status: 200,
          headers: { "content-type": "image/png" },
        })
      );
    }

    beforeEach(() => {
      // resolveWcsImageUrl() -> URL.createObjectURL: jsdom'da uygulanmamis
      // (Adim 6/KL-09'da da karsilasilan AYNI kisit) -- dogrudan vi.fn()
      // atamasi (spyOn DEGIL, jsdom'da metod hic yok).
      (URL as unknown as { createObjectURL: () => string }).createObjectURL = vi.fn(
        () => "blob:fake-wcs-image"
      );
      (URL as unknown as { revokeObjectURL: () => void }).revokeObjectURL = vi.fn();
      // SingleTileImageryProvider.fromUrl gercek goruntu decode'u gerektirir
      // (Point-SHP/PinBuilder ile AYNI jsdom-canvas kisiti sinifi) -- burada
      // MOCK'lanarak atlaniyor, testin odagi SADECE resolveWcsImageUrl'e
      // GIDEN URL'in proxy'li olup olmadigi. ImageryLayerCollection.
      // addImageryProvider() -> "ready" placeholder olusturuken (Imagery.
      // createPlaceholder) imageryProvider.tilingScheme.tileXYToRectangle'i
      // SENKRON okudugu icin minimal bir tilingScheme stub'u sart.
      vi.spyOn(SingleTileImageryProvider, "fromUrl").mockResolvedValue({
        tilingScheme: { tileXYToRectangle: () => Rectangle.MAX_VALUE },
      } as unknown as SingleTileImageryProvider);
    });

    it("apiKey configure edilmisken GetCoverage istegi PROXY'DEN GECER " +
      "(ML-08 duzeltmesi)", async () => {
      layerManager.configure({ apiKey: "test-key" });
      stubImageFetch();

      const options: WCSLayerOptions = {
        id: "wcs-1",
        title: "Test WCS",
        url: "https://demo.mapserver.org/cgi-bin/wcs",
        coverageId: "kapsam-1",
        // SCALESIZE dallanmasini (urnAxes deneme/geri-dusme) devre disi
        // birakip TEK bir fetch cagrisina indirger -- bu testin odagi
        // SCALESIZE degil, proxy kullanimi.
        maxSize: Infinity,
      };
      const managed = await layerManager.add("WCS", options);

      expect(managed.layerType).toBe("WCS");
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const fetchedUrl = String(fetchMock.mock.calls[0]![0]);
      // WMS/WMTS/WFS'in HEPSI apiKey varken resolveOgcProxyUrl ile
      // "/wms-proxy/wcs?url=..." bicimine donusuyordu -- addWCS eskiden BUNU
      // YAPMIYORDU, ham options.url'e gidiyordu (ML-08). Adim 8/Faz 3'te
      // duzeltildi: GetCoverage goruntu istegi de artik ayni proxy kuralindan
      // geciyor.
      expect(fetchedUrl).toContain("/wms-proxy/wcs?url=");
      expect(fetchedUrl).toContain(encodeURIComponent("https://demo.mapserver.org/cgi-bin/wcs"));
    });

    it("apiKey configure EDILMEMISKEN GetCoverage istegi ham URL'e gider " +
      "(resolveOgcProxyUrl no-op, davranis degismedi)", async () => {
      stubImageFetch();

      const options: WCSLayerOptions = {
        id: "wcs-2",
        title: "Test WCS",
        url: "https://demo.mapserver.org/cgi-bin/wcs",
        coverageId: "kapsam-1",
        maxSize: Infinity,
      };
      await layerManager.add("WCS", options);

      const fetchedUrl = String(fetchMock.mock.calls[0]![0]);
      expect(fetchedUrl.startsWith("https://demo.mapserver.org/cgi-bin/wcs?")).toBe(true);
      expect(fetchedUrl).not.toContain("wms-proxy");
    });
  });

  describe("addGeoTiff (mevcut davranis -- Cesium >=1.143'te desteklenmiyor)", () => {
    it("LAYER_GEOTIFF_UNSUPPORTED hatasi firlatir", async () => {
      await expect(
        layerManager.add("GEOTIFF", {
          id: "geotiff-1",
          title: "Test GeoTIFF",
          url: "https://example.com/cog.tif",
        })
      ).rejects.toMatchObject({ code: "LAYER_GEOTIFF_UNSUPPORTED" } satisfies Partial<LayerOperationError>);
    });
  });
});
