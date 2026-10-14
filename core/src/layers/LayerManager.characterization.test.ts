// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component ayristirmasi (bkz
// project_ucbp_api_god_component_refactor_kurallari, madde 1) ONCESI
// LayerManager.add()'in WMS/WFS/GeoJSON dallarinin MEVCUT davranisini
// dondurur. Bu dosya LayerManager.ts'e TEK SATIR bile dokunmadan yazildi.
// Kapsam/mock stratejisi: project_ucbp_api_layermanager_karakterizasyon_test_kapsami
// (hafiza) + packages/core/src/__tests__/cesium-node-environment.test.ts.
//
// jsdom GEREKLI: fetchWfsCapabilities() gercek `DOMParser` kullaniyor (Node'da
// yerlesik degil, doğrulandı). Diger testler (smoke, cesium-node-environment)
// bilerek "node" ortaminda kaliyor -- bu dosya ISTISNA.
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import { CallbackProperty, JulianDate, type Viewer } from "cesium";
import { LayerManager } from "./LayerManager.js";
import { createFakeViewer } from "../__tests__/fixtures/fakeViewer.js";
import { asDataSource, asImageryLayer } from "../__tests__/fixtures/cesiumObject.js";
import { LayerOperationError, OgcRequestError } from "../shared/TucbsError.js";
import type { ManagedLayer, WCSLayerOptions, WMSLayerOptions, WMTSLayerOptions } from "../types/index.js";

describe("LayerManager.add() karakterizasyonu", () => {
  let layerManager: LayerManager;
  let viewer: Viewer;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    viewer = createFakeViewer();
    layerManager = new LayerManager(viewer);
    // Varsayilan: beklenmeyen HER fetch cagrisi patlasin -- her testte
    // ihtiyac duyulan endpoint'ler ayrica stub'lanir.
    fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      throw new Error("beklenmeyen fetch cagrisi: " + String(input));
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("WMS", () => {
    it("provider'a beklenen url/layers/parameters/getFeatureInfo ayarlarini gecirir, fetch tetiklemez, layer:add yayinlar", async () => {
      const onLayerAdd = vi.fn();
      layerManager.on("layer:add", onLayerAdd);

      const managed = await layerManager.add("WMS", {
        id: "wms-1",
        title: "Test WMS",
        url: "https://demo.mapserver.org/cgi-bin/wms",
        layers: "il_sinirlari",
      });

      expect(fetchMock).not.toHaveBeenCalled();

      expect(managed.id).toBe("wms-1");
      expect(managed.layerType).toBe("WMS");
      expect(managed.isBasemap).toBe(false);

      const provider = asImageryLayer(managed).imageryProvider as unknown as {
        _resource: { url: string };
        _layers: string;
      };
      // Cesium provider'in kendi ic durumunu okuyoruz (public getter'lar
      // async/tile-bazli oldugu icin add() sirasinda henuz anlamli deger
      // tasimiyor) -- _layers dogrudan LAYERS parametresini, _resource.url
      // cozumlenmis GetMap sablon URL'ini tasir.
      expect(provider._layers).toBe("il_sinirlari");
      expect(provider._resource.url).toContain("layers=il_sinirlari");

      expect(onLayerAdd).toHaveBeenCalledTimes(1);
      expect(onLayerAdd.mock.calls[0]![0]).toEqual({ layer: managed });
    });

    it("layers bos ise LAYER_WMS_LAYERS_EMPTY hatasi firlatir (mevcut davranis)", async () => {
      await expect(
        layerManager.add("WMS", {
          id: "wms-empty",
          title: "Bos",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "   ",
        })
      ).rejects.toMatchObject({ code: "LAYER_WMS_LAYERS_EMPTY" } satisfies Partial<LayerOperationError>);
    });

    it("ayni id ikinci kez eklenirse hata firlatir (assertUniqueId, mevcut davranis)", async () => {
      await layerManager.add("WMS", {
        id: "wms-dup",
        title: "Test",
        url: "https://demo.mapserver.org/cgi-bin/wms",
        layers: "a",
      });
      await expect(
        layerManager.add("WMS", {
          id: "wms-dup",
          title: "Test 2",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "b",
        })
      ).rejects.toThrow();
    });
  });

  describe("getWmsAvailableStyles/getWmtsAvailableStyles (Adim 4 karakterizasyonu -- " +
    "ogc/capabilities.ts'e TASINMADAN once mevcut davranisi kilitler, bkz " +
    "project_ucbp_api_ogc_capabilities_uygulama_plani)", () => {
    const WMS_CAPABILITIES_XML_NO_PREFIX = `<?xml version="1.0" encoding="UTF-8"?>
<WMS_Capabilities xmlns="http://www.opengis.net/wms" version="1.3.0">
  <Capability>
    <Layer>
      <Layer queryable="1">
        <Name>il_sinirlari</Name>
        <Title>Il Sinirlari</Title>
        <Style>
          <Name>varsayilan</Name>
          <Title>Varsayilan</Title>
        </Style>
      </Layer>
    </Layer>
  </Capability>
</WMS_Capabilities>`;

    const WMS_CAPABILITIES_XML_PREFIXED = `<?xml version="1.0" encoding="UTF-8"?>
<wms:WMS_Capabilities xmlns:wms="http://www.opengis.net/wms" version="1.3.0">
  <wms:Capability>
    <wms:Layer>
      <wms:Layer queryable="1">
        <wms:Name>il_sinirlari</wms:Name>
        <wms:Title>Il Sinirlari</wms:Title>
        <wms:Style>
          <wms:Name>varsayilan</wms:Name>
          <wms:Title>Varsayilan</wms:Title>
        </wms:Style>
      </wms:Layer>
    </wms:Layer>
  </wms:Capability>
</wms:WMS_Capabilities>`;

    const WMTS_CAPABILITIES_XML_NO_PREFIX = `<?xml version="1.0" encoding="UTF-8"?>
<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" version="1.0.0">
  <Contents>
    <Layer>
      <ows:Identifier>il_sinirlari</ows:Identifier>
      <ows:Title>Il Sinirlari</ows:Title>
      <Style isDefault="true">
        <ows:Identifier>varsayilan</ows:Identifier>
        <ows:Title>Varsayilan</ows:Title>
      </Style>
    </Layer>
  </Contents>
</Capabilities>`;

    const WMTS_CAPABILITIES_XML_PREFIXED = `<?xml version="1.0" encoding="UTF-8"?>
<wmts:Capabilities xmlns:wmts="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" version="1.0.0">
  <wmts:Contents>
    <wmts:Layer>
      <ows:Identifier>il_sinirlari</ows:Identifier>
      <ows:Title>Il Sinirlari</ows:Title>
      <wmts:Style isDefault="true">
        <ows:Identifier>varsayilan</ows:Identifier>
        <ows:Title>Varsayilan</ows:Title>
      </wmts:Style>
    </wmts:Layer>
  </wmts:Contents>
</wmts:Capabilities>`;

    function stubCapabilitiesFetch(xml: string): void {
      fetchMock.mockImplementation(async () => ({
        ok: true,
        text: async () => xml,
      }));
    }

    it("namespace-prefixsiz WMS GetCapabilities: stil dogru okunur (REGRESYON YOK)", async () => {
      await layerManager.add("WMS", {
        id: "wms-styles-no-prefix",
        title: "Test",
        url: "https://demo.mapserver.org/cgi-bin/wms",
        layers: "il_sinirlari",
      });
      stubCapabilitiesFetch(WMS_CAPABILITIES_XML_NO_PREFIX);

      const styles = await layerManager.getWmsAvailableStyles("wms-styles-no-prefix");

      expect(styles).toHaveLength(1);
      expect(styles[0]!.name).toBe("varsayilan");
    });

    it("KARAKTERIZASYON (Adim 4'ten ONCE KIRMIZI, ML-12'nin kardesi): namespace-prefixli " +
      "(ör. <wms:Layer>/<wms:Name>) bir WMS GetCapabilities'te de stil dogru okunmalidir -- " +
      "SU AN findLayerByName/parseWmsStyles namespace-KOR (xml.getElementsByTagName(\"Name\")) " +
      "oldugu icin katmani BULAMIYOR, stiller SESSIZCE kayboluyor (bos dizi donuyor). Bu test " +
      "Adim 4'te (elementsByLocalName/childByLocalName birlesmesi) YESILE donecek.", async () => {
      await layerManager.add("WMS", {
        id: "wms-styles-prefixed",
        title: "Test",
        url: "https://demo.mapserver.org/cgi-bin/wms",
        layers: "il_sinirlari",
      });
      stubCapabilitiesFetch(WMS_CAPABILITIES_XML_PREFIXED);

      const styles = await layerManager.getWmsAvailableStyles("wms-styles-prefixed");

      expect(styles).toHaveLength(1);
      expect(styles[0]!.name).toBe("varsayilan");
    });

    it("namespace-prefixsiz WMTS GetCapabilities: stil dogru okunur (REGRESYON YOK)", async () => {
      await layerManager.add("WMTS", {
        id: "wmts-styles-no-prefix",
        title: "Test",
        url: "https://demo.example.org/wmts",
        layer: "il_sinirlari",
        tileMatrixSetID: "GoogleMapsCompatible",
      });
      stubCapabilitiesFetch(WMTS_CAPABILITIES_XML_NO_PREFIX);

      const styles = await layerManager.getWmtsAvailableStyles("wmts-styles-no-prefix");

      expect(styles).toHaveLength(1);
      expect(styles[0]!.name).toBe("varsayilan");
    });

    it("namespace-prefixli WMTS GetCapabilities: parseWmtsStyles ZATEN localName-bazli " +
      "(namespace-guvenli) oldugu icin BURADA regresyon YOK -- Adim 4 SADECE WMS tarafini " +
      "duzeltecek, bu test degismeden kalmali (guard)", async () => {
      await layerManager.add("WMTS", {
        id: "wmts-styles-prefixed",
        title: "Test",
        url: "https://demo.example.org/wmts",
        layer: "il_sinirlari",
        tileMatrixSetID: "GoogleMapsCompatible",
      });
      stubCapabilitiesFetch(WMTS_CAPABILITIES_XML_PREFIXED);

      const styles = await layerManager.getWmtsAvailableStyles("wmts-styles-prefixed");

      expect(styles).toHaveLength(1);
      expect(styles[0]!.name).toBe("varsayilan");
    });
  });

  describe("WFS", () => {
    const CAPABILITIES_XML = `<?xml version="1.0" encoding="UTF-8"?>
<wfs:WFS_Capabilities xmlns:wfs="http://www.opengis.net/wfs/2.0" version="2.0.0">
  <FeatureTypeList>
    <FeatureType>
      <Name>il_sinirlari</Name>
      <Title>Il Sinirlari</Title>
      <DefaultCRS>urn:ogc:def:crs:EPSG::4326</DefaultCRS>
      <OutputFormats><Format>application/json</Format></OutputFormats>
    </FeatureType>
  </FeatureTypeList>
</wfs:WFS_Capabilities>`;

    const GEOJSON_RESPONSE = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { ad: "Test Il" },
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

    function stubHappyPathFetch(): void {
      fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("GetCapabilities") || url.includes("request=GetCapabilities")) {
          return new Response(CAPABILITIES_XML, { status: 200 });
        }
        if (url.includes("GetFeature") || url.includes("request=GetFeature")) {
          return new Response(JSON.stringify(GEOJSON_RESPONSE), { status: 200 });
        }
        throw new Error("beklenmeyen WFS fetch cagrisi: " + url);
      });
    }

    it("proxy'siz URL'lerle GetCapabilities + GetFeature'a giden URL'leri ve layer:add'i kaydeder", async () => {
      stubHappyPathFetch();
      const onLayerAdd = vi.fn();
      layerManager.on("layer:add", onLayerAdd);

      const managed = await layerManager.add("WFS", {
        id: "wfs-1",
        title: "Test WFS",
        url: "https://demo.mapserver.org/cgi-bin/wfs",
        typeName: "il_sinirlari",
      });

      const calledUrls = fetchMock.mock.calls.map((c) => String(c[0]!));
      expect(calledUrls.some((u) => u.includes("GetCapabilities"))).toBe(true);
      expect(calledUrls.some((u) => u.includes("GetFeature"))).toBe(true);
      // apiKey configure() ile atanmadigi icin resolveOgcProxyUrl url'i
      // OLDUGU GIBI dondurur (mevcut davranis) -- proxy rewrite YOK.
      expect(calledUrls.every((u) => u.startsWith("https://demo.mapserver.org/cgi-bin/wfs"))).toBe(true);

      expect(managed.id).toBe("wfs-1");
      expect(managed.layerType).toBe("WFS");
      expect(onLayerAdd).toHaveBeenCalledTimes(1);
    });

    // Faz 2.6 oncesi: WFS (OgcLayerFactory) yolunun vektor son islemesi --
    // LayerManager'in addPolygonOutlines'i (companion + dinamik dolgu),
    // baslangic stilinin kaydi ve outline varsayilanlari. GeoJSON yolunun
    // esdegeri "Her Zaman Dinamik Materyal" bloğunda.
    it("poligon icin dis-hat companion'i olusur, dolgu CallbackProperty'ye sarilir, " +
      "baslangic stili (dolgu 0.5, varsayilan dis hat) kaydedilir", async () => {
      stubHappyPathFetch();
      const managed = await layerManager.add("WFS", {
        id: "wfs-outline",
        title: "Test WFS",
        url: "https://demo.mapserver.org/cgi-bin/wfs",
        typeName: "il_sinirlari",
      });

      const entities = asDataSource(managed).entities.values;
      const polygonEntity = entities.find((e) => e.polygon !== undefined && !e.id.endsWith("::outline"));
      expect(polygonEntity).toBeDefined();
      expect(entities.find((e) => e.id === `${polygonEntity!.id}::outline`)).toBeDefined();
      const material = polygonEntity!.polygon!.material as unknown as { color: unknown };
      expect(material.color).toBeInstanceOf(CallbackProperty);

      // Dolgu rengi rastgele (randomLayerColor) -- ilk renk kaydindan okunur.
      const fillColor = layerManager.getInitialFillColor("wfs-outline");
      expect(fillColor).toMatch(/^#[0-9a-f]{6}$/);
      expect(layerManager.getLayerStyle("wfs-outline")).toEqual({
        fill: { mode: "solid", color: fillColor, opacity: 0.5 },
        outline: { enabled: true, color: "#1a73e8", width: 2 },
      });
    });

    it("GetFeature JSON basarisiz olursa GML'e duser, GML de basarisiz olursa " +
      "orijinal JSON hatasi .cause olarak korunur (ML-13 duzeltmesi)", async () => {
      fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("GetCapabilities")) {
          return new Response(CAPABILITIES_XML, { status: 200 });
        }
        if (url.includes("GetFeature")) {
          // Hem JSON hem GML denemesi basarisiz olsun -- GML fallback'inin
          // gercekten tetiklendigini VE ikisi de basarisiz olunca orijinal
          // JSON hatasinin kaybolmadigini kanitlamak icin.
          return new Response("service exception", { status: 500 });
        }
        throw new Error("beklenmeyen fetch: " + url);
      });

      await expect(
        layerManager.add("WFS", {
          id: "wfs-gml-fallback",
          title: "Test",
          url: "https://demo.mapserver.org/cgi-bin/wfs",
          typeName: "il_sinirlari",
        })
      ).rejects.toMatchObject({
        cause: expect.objectContaining({ code: "OGC_WFS_GEOJSON_REQUEST_FAILED" }),
      });

      const getFeatureCalls = fetchMock.mock.calls.filter((c) => String(c[0]).includes("GetFeature"));
      expect(getFeatureCalls.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("GEOJSON", () => {
    const POLYGON_GEOJSON = {
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

    it("standart CRS'li (WGS84/CRS yok) veriyle fetch tetiklemeden ekler ve layer:add yayinlar", async () => {
      const onLayerAdd = vi.fn();
      layerManager.on("layer:add", onLayerAdd);

      const managed = await layerManager.add("GEOJSON", {
        id: "geojson-1",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
      });

      expect(fetchMock).not.toHaveBeenCalled();
      expect(managed.id).toBe("geojson-1");
      expect(managed.layerType).toBe("GEOJSON");
      expect(onLayerAdd).toHaveBeenCalledTimes(1);
    });
  });

  describe("ML-11 (Adim 5 Faz 3'te DUZELTILDI -- bkz render/OpacityController.ts DataSourceOpacityState.wrapped)", () => {
    const POLYGON_GEOJSON = {
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

    it("REGRESYON YOK: katman eklendiginde, setOpacity() HENUZ cagrilmamisken " +
      "poligon dolgu rengi ARTIK CallbackProperty'ye sarilmiyor (eski istekli/" +
      "eager israf giderildi -- bkz Faz 1'deki eski kanit). clampToGround:false " +
      "BILEREK verilir -- companion-outline'li (varsayilan clampToGround:true) " +
      "poligonlarda dolgu artik AYRI bir nedenle (bkz 'Her Zaman Dinamik " +
      "Materyal' describe bloğu) HER ZAMAN sarilir; bu test SADECE companion'i " +
      "OLMAYAN genel lazy-wrap davranisini kapsar.", async () => {
      const managed = await layerManager.add("GEOJSON", {
        id: "geojson-ml11-lazy",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
        clampToGround: false,
      });

      const polygonEntity = asDataSource(managed).entities.values.find((e) => e.polygon !== undefined);
      expect(polygonEntity).toBeDefined();
      const material = polygonEntity!.polygon!.material as unknown as { color: unknown };
      expect(material.color).not.toBeInstanceOf(CallbackProperty);
    });

    it("setOpacity() ILK KEZ 1'den farkli bir degerle cagrilinca sarmalama " +
      "TEMBEL olarak kurulur ve dogru opakligi yansitir", async () => {
      const managed = await layerManager.add("GEOJSON", {
        id: "geojson-ml11-lazy-2",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
      });
      const polygonEntity = asDataSource(managed).entities.values.find((e) => e.polygon !== undefined)!;

      layerManager.setOpacity("geojson-ml11-lazy-2", 0.3);

      const material = polygonEntity.polygon!.material as unknown as { color: CallbackProperty };
      expect(material.color).toBeInstanceOf(CallbackProperty);
      const result = material.color.getValue(JulianDate.now()) as { alpha: number };
      // Varsayilan dolgu rengi zaten alpha:0.5 -- opaklik CARPAN olarak
      // uygulanir (bkz OpacityController.createOpacityColorProperty), bu
      // yuzden sonuc 0.3 DEGIL 0.5*0.3=0.15 olmali.
      expect(result.alpha).toBeCloseTo(0.15);
    });
  });

  describe("Her Zaman Dinamik Materyal (companion-outline'li poligon dolgusu -- " +
    "Cesium'un STATIK materyal + ground-clamped companion ikilisini yanlis " +
    "compositing'e sokup companion'i gorunmez kilmasinin duzeltmesi, bkz " +
    "OpacityController.ensureDynamicFillColor)", () => {
    const POLYGON_GEOJSON = {
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

    it("REGRESYON YOK: companion-outline'i OLMAYAN (clampToGround:false) bir " +
      "poligonun dolgu rengi katman eklenirken sarilmaz -- bu duzeltme SADECE " +
      "companion'li entity'leri hedefler", async () => {
      const managed = await layerManager.add("GEOJSON", {
        id: "dynamic-fill-no-companion",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
        clampToGround: false,
      });

      const polygonEntity = asDataSource(managed).entities.values.find((e) => e.polygon !== undefined);
      const material = polygonEntity!.polygon!.material as unknown as { color: unknown };
      expect(material.color).not.toBeInstanceOf(CallbackProperty);
    });

    it("companion-outline'i OLAN (varsayilan clampToGround:true) bir poligonun " +
      "dolgu rengi, setOpacity() HIC cagrilmamis olsa dahi katman eklenirken " +
      "HEMEN CallbackProperty'ye sarilir", async () => {
      const managed = await layerManager.add("GEOJSON", {
        id: "dynamic-fill-with-companion",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
      });

      const polygonEntity = asDataSource(managed).entities.values.find((e) => e.polygon !== undefined);
      const companion = asDataSource(managed).entities.values.find(
        (e) => e.id === `${polygonEntity!.id}::outline`
      );
      expect(companion).toBeDefined();
      const material = polygonEntity!.polygon!.material as unknown as { color: unknown };
      expect(material.color).toBeInstanceOf(CallbackProperty);
    });
  });

  describe("applyLayerStyle (Adim 3 karakterizasyonu -- style/LayerStyleEngine.ts'e " +
    "TASINMADAN once mevcut davranisi kilitler, bkz " +
    "project_ucbp_api_god_component_refactor_kurallari)", () => {
    const POLYGON_GEOJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { deger: 42 },
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

    it("solid fill: entity.polygon.material.color'a dogru renk/opaklik yansir, " +
      "getLayerStyle() ile okunabilir ve layer:style yayinlanir", async () => {
      const onStyle = vi.fn();
      layerManager.on("layer:style", onStyle);
      const managed = await layerManager.add("GEOJSON", {
        id: "style-solid",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
        clampToGround: false,
      });

      await layerManager.applyLayerStyle("style-solid", {
        fill: { mode: "solid", color: "#3388ff", opacity: 0.6 },
        outline: { enabled: false, color: "#000000", width: 1 },
      });

      const polygonEntity = asDataSource(managed).entities.values.find((e) => e.polygon !== undefined)!;
      const color = (polygonEntity.polygon!.material as unknown as { color: { getValue: (t: JulianDate) => { red: number; alpha: number } } }).color;
      const value = color.getValue(JulianDate.now());
      expect(value.alpha).toBeCloseTo(0.6);
      expect(layerManager.getLayerStyle("style-solid")?.fill.mode).toBe("solid");
      expect(onStyle).toHaveBeenCalledWith(
        expect.objectContaining({ id: "style-solid" })
      );
    });

    it("gradient fill: min/max verilmemisse getColumnRange() ile veriden otomatik " +
      "hesaplanir ve COZUMLENMIS (min/max dolu) hali getLayerStyle()'a yansir", async () => {
      await layerManager.add("GEOJSON", {
        id: "style-gradient",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
        clampToGround: false,
      });

      await layerManager.applyLayerStyle("style-gradient", {
        fill: { mode: "gradient", column: "deger", palette: ["#000000", "#ffffff"], opacity: 1 },
        outline: { enabled: false, color: "#000000", width: 1 },
      });

      const resolved = layerManager.getLayerStyle("style-gradient");
      expect(resolved?.fill.mode).toBe("gradient");
      if (resolved?.fill.mode === "gradient") {
        expect(resolved.fill.min).toBe(42);
        expect(resolved.fill.max).toBe(42);
      }
    });

    it("companion-outline'li poligonlarda spec.fill companion'a HIC yansimaz -- " +
      "companion SADECE outline.enabled/color/width'ten etkilenir (varsayilan " +
      "clampToGround:true)", async () => {
      const managed = await layerManager.add("GEOJSON", {
        id: "style-companion",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
      });
      const polygonEntity = asDataSource(managed).entities.values.find((e) => e.polygon !== undefined)!;
      const companion = asDataSource(managed).entities.values.find(
        (e) => e.id === `${polygonEntity.id}::outline`
      )!;
      expect(companion).toBeDefined();

      await layerManager.applyLayerStyle("style-companion", {
        fill: { mode: "solid", color: "#ff0000", opacity: 1 },
        outline: { enabled: true, color: "#00ff00", width: 3 },
      });

      expect(companion.show).toBe(true);
      const companionColor = (companion.polyline!.material as unknown as { color: { getValue: (t: JulianDate) => { green: number } } }).color;
      expect(companionColor.getValue(JulianDate.now()).green).toBeCloseTo(1);
      expect((companion.polyline!.width as unknown as { getValue: () => number }).getValue()).toBe(3);

      // Dis hat kapali + opak dolgu: companion gizlenmez, ek yeri ortucu
      // olarak poligonun KENDI dolgu renginde 1 px cizilir (bkz
      // LayerStyleEngine.applyLayerStyle "ek yeri ortucu" yorumu).
      await layerManager.applyLayerStyle("style-companion", {
        fill: { mode: "solid", color: "#ff0000", opacity: 1 },
        outline: { enabled: false, color: "#00ff00", width: 3 },
      });
      expect(companion.show).toBe(true);
      const seamColor = companionColor.getValue(JulianDate.now()) as unknown as { red: number; green: number };
      expect(seamColor.red).toBeCloseTo(1);
      expect(seamColor.green).toBeCloseTo(0);
      expect((companion.polyline!.width as unknown as { getValue: () => number }).getValue()).toBe(1);

      // Dis hat kapali + yari saydam dolgu: ortucu YOK, companion gizlenir.
      await layerManager.applyLayerStyle("style-companion", {
        fill: { mode: "solid", color: "#ff0000", opacity: 0.5 },
        outline: { enabled: false, color: "#00ff00", width: 3 },
      });
      expect(companion.show).toBe(false);
    });

    it("flicker-onleme: AYNI renkle ikinci kez cagrildiginda entity.polygon.material " +
      "referansi DEGISMEZ (yerinde mutasyon, brand-new property atanmaz)", async () => {
      const managed = await layerManager.add("GEOJSON", {
        id: "style-no-flicker",
        title: "Test GeoJSON",
        layerType: "GEOJSON",
        data: POLYGON_GEOJSON,
        clampToGround: false,
      });
      const polygonEntity = asDataSource(managed).entities.values.find((e) => e.polygon !== undefined)!;

      await layerManager.applyLayerStyle("style-no-flicker", {
        fill: { mode: "solid", color: "#3388ff", opacity: 0.6 },
        outline: { enabled: false, color: "#000000", width: 1 },
      });
      const firstMaterial = polygonEntity.polygon!.material;

      await layerManager.applyLayerStyle("style-no-flicker", {
        fill: { mode: "solid", color: "#3388ff", opacity: 0.6 },
        outline: { enabled: false, color: "#000000", width: 1 },
      });
      const secondMaterial = polygonEntity.polygon!.material;

      expect(secondMaterial).toBe(firstMaterial);
    });
  });

  describe("ML-07 (Faz 3'te DUZELTILDI -- bkz auth/ApiKeyPolicy.ts isOwnBackendUrl)", () => {
    it("ucbp-api backend'imizle ILGISIZ, ucuncu taraf bir URL artik SADECE " +
      "path'inde '/ogc/' gectigi icin 'apiKey gerektirir' SAYILMIYOR -- host artik " +
      "gercekten karsilastiriliyor (bkz project_ucbp_api_god_component_refactor_kurallari " +
      "ML-07). Gercek dunya ornegi: OGC API Features standardini kullanan COGU sunucu " +
      "(ör. GeoServer) URL'inde tam olarak bu '/ogc/' segmentini tasir; bu sunucular " +
      "trustedApiKeyHosts'a HIC eklenmemis olsa bile ESKIDEN yanlislikla 'evet' " +
      "donuyordu, DUZELTME SONRASI 'hayir' donuyor.",
      () => {
        const thirdPartyUrl = "https://harici-gis.example.com/ogc/features/collections/il_sinirlari";

        // trustedApiKeyHosts HIC configure edilmedi, apiKey de yok -- host bizim
        // backend'imizle eslesmiyor, path'te "/ogc/" gecmesi ARTIK yeterli degil.
        expect(layerManager.layerRequiresApiKey(thirdPartyUrl)).toBe(false);
      }
    );

    it("REGRESYON YOK: kendi ucbp-api backend'imize giden bir /ogc/ yolu hala " +
      "'apiKey gerekir' olarak isaretleniyor (host gercekten eslesiyor)",
      () => {
        const ownBackendUrl = `${window.location.origin}/ucbp-api/ogc/wms/123`;

        expect(layerManager.layerRequiresApiKey(ownBackendUrl)).toBe(true);
      }
    );
  });

  describe("export/LayerExporter (Adim 6 Faz 1 karakterizasyonu -- export/LayerExporter.ts'e " +
    "TASINMADAN once getLayerGeoJSON/exportLayerGeoJSON/isGeoTiffExportAvailable/" +
    "exportLayerAsGeoTiff'in mevcut davranisini kilitler; Map.triggerDownload'in " +
    "kendi karakterizasyonu internal/download.ts dogunca Faz 2'de yazilacak)", () => {
    const POLYGON_GEOJSON = {
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

    describe("getLayerGeoJSON", () => {
      it("entity-tabanli bir katmanin tum sekillerini FeatureCollection olarak dondurur", async () => {
        const managed = await layerManager.add("GEOJSON", {
          id: "export-geojson-1",
          title: "Test",
          layerType: "GEOJSON",
          data: POLYGON_GEOJSON,
          clampToGround: false,
        });

        const result = layerManager.getLayerGeoJSON(managed.id);

        expect(result?.type).toBe("FeatureCollection");
        expect(result?.features).toHaveLength(1);
        expect(result?.features[0]?.geometry?.type).toBe("Polygon");
      });

      it("addPolygonOutlineCompanion ile eklenen ic companion entity'yi HARIC tutar " +
        "(varsayilan clampToGround:true, companion olusur)", async () => {
        const managed = await layerManager.add("GEOJSON", {
          id: "export-geojson-companion",
          title: "Test",
          layerType: "GEOJSON",
          data: POLYGON_GEOJSON,
        });

        const companion = asDataSource(managed).entities.values.find(
          (e) => e.id?.toString().endsWith("::outline")
        );
        expect(companion).toBeDefined();

        const result = layerManager.getLayerGeoJSON(managed.id);
        expect(result?.features).toHaveLength(1);
      });

      it("entity-tabanli OLMAYAN (WMS/ImageryLayer) bir katmanda undefined doner", async () => {
        const managed = await layerManager.add("WMS", {
          id: "export-wms-not-entity",
          title: "Test",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "il_sinirlari",
        });

        expect(layerManager.getLayerGeoJSON(managed.id)).toBeUndefined();
      });
    });

    describe("exportLayerGeoJSON", () => {
      // jsdom URL.createObjectURL/revokeObjectURL'i yerlesik olarak
      // UYGULAMAZ (bilinen jsdom kisitlamasi) -- spyOn var-olmayan bir
      // metodu spy'layamadigi icin dogrudan vi.fn() atiyoruz.
      let createObjectURLSpy: ReturnType<typeof vi.fn>;
      let revokeObjectURLSpy: ReturnType<typeof vi.fn>;
      let clickSpy: ReturnType<typeof vi.fn>;
      let createElementSpy: MockInstance<typeof document.createElement>;

      beforeEach(() => {
        vi.useFakeTimers();
        createObjectURLSpy = vi.fn().mockReturnValue("blob:mock-geojson");
        revokeObjectURLSpy = vi.fn();
        (URL as unknown as { createObjectURL: typeof createObjectURLSpy }).createObjectURL = createObjectURLSpy;
        (URL as unknown as { revokeObjectURL: typeof revokeObjectURLSpy }).revokeObjectURL = revokeObjectURLSpy;
        clickSpy = vi.fn();
        const realCreateElement = document.createElement.bind(document);
        createElementSpy = vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
          const el = realCreateElement(tag);
          if (tag === "a") (el as HTMLAnchorElement).click = clickSpy;
          return el;
        });
      });

      afterEach(() => {
        createElementSpy.mockRestore();
        vi.useRealTimers();
      });

      it("getLayerGeoJSON() ciktisini bir Blob'a sarip <a>.download uzerinden " +
        "indirmeyi TETIKLER, revokeObjectURL'i AYNI url ile 1000ms ERTELEYEREK " +
        "cagirir (KL-09 duzeltmesi, Faz 4)", async () => {
        const managed = await layerManager.add("GEOJSON", {
          id: "export-trigger-1",
          title: "Test",
          layerType: "GEOJSON",
          data: POLYGON_GEOJSON,
        });

        layerManager.exportLayerGeoJSON(managed.id, "katmanim");

        expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
        const blob = createObjectURLSpy.mock.calls[0]![0] as Blob;
        expect(blob.type).toBe("application/geo+json");
        const text = await blob.text();
        expect(JSON.parse(text)).toEqual(layerManager.getLayerGeoJSON(managed.id));

        expect(createElementSpy).toHaveBeenCalledWith("a");
        expect(clickSpy).toHaveBeenCalledTimes(1);
        expect(revokeObjectURLSpy).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1000);
        expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
        expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:mock-geojson");
      });

      it("filename verilmezse varsayilan 'katman' kok adini kullanir, " +
        "'{filename}-{timestamp}.geojson' desenine uyar", async () => {
        const managed = await layerManager.add("GEOJSON", {
          id: "export-trigger-default-name",
          title: "Test",
          layerType: "GEOJSON",
          data: POLYGON_GEOJSON,
        });

        layerManager.exportLayerGeoJSON(managed.id);

        const anchorCall = createElementSpy.mock.results.find(
          (r) => (r.value as HTMLElement).tagName === "A"
        );
        const anchor = anchorCall!.value as HTMLAnchorElement;
        expect(anchor.download).toMatch(/^katman-\d+\.geojson$/);
      });

      it("entity-tabanli OLMAYAN bir katmanda (getLayerGeoJSON undefined donunce) " +
        "hicbir DOM aksiyonu tetiklemeden SESSIZCE cikar", async () => {
        const managed = await layerManager.add("WMS", {
          id: "export-wms-noop",
          title: "Test",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "il_sinirlari",
        });

        layerManager.exportLayerGeoJSON(managed.id);

        expect(createObjectURLSpy).not.toHaveBeenCalled();
        expect(clickSpy).not.toHaveBeenCalled();
      });
    });

    // WCS katmanlari icin add() gercek bir goruntu fetch/decode akisi
    // (resolveWcsImageUrl -> SingleTileImageryProvider.fromUrl) gerektirir --
    // bu suit'te hic kullanilmayan ayri bir Cesium goruntu-mock altyapisi
    // ister. isGeoTiffExportAvailable/exportLayerAsGeoTiff SADECE items/
    // ogcLayerFactory.serviceLayerOptions'i okur (requireLayer -> items.get,
    // bkz LayerManager.ts) -- bu yuzden WCS durumunu, GERCEK addWCS()
    // akisini calistirmadan, bu iki private yapiyi DOGRUDAN besleyerek
    // kuruyoruz (Adim 8/Faz 2'de serviceLayerOptions layers/ogc/OgcLayerFactory.ts'e
    // tasindi, bkz o dosyanin kendi Map'i). Bu SADECE bir test kisayoludur,
    // uretim kodu items/serviceLayerOptions'i hep add() uzerinden yazar.
    type LayerManagerInternals = {
      items: Map<string, ManagedLayer>;
      ogcLayerFactory: {
        serviceLayerOptions: Map<string, WMSLayerOptions | WMTSLayerOptions | WCSLayerOptions>;
      };
    };
    function seedWcsLayer(id: string, options: Partial<WCSLayerOptions> & { url: string; coverageId: string }) {
      // url/coverageId, options'in zorunlu alanlari -- ...options ile gelir.
      const fullOptions: WCSLayerOptions = {
        id,
        title: "Test WCS",
        ...options,
      };
      const internals = layerManager as unknown as LayerManagerInternals;
      internals.items.set(id, {
        id,
        title: "Test WCS",
        layerType: "WCS",
        cesiumObject: {} as unknown as ManagedLayer["cesiumObject"],
        isBasemap: false,
      });
      internals.ogcLayerFactory.serviceLayerOptions.set(id, fullOptions);
    }

    describe("isGeoTiffExportAvailable", () => {
      it("tiffFormat configure edilmis bir WMS katmaninda true doner", async () => {
        const managed = await layerManager.add("WMS", {
          id: "geotiff-avail-wms-yes",
          title: "Test",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "il_sinirlari",
          tiffFormat: "image/tiff",
        });
        expect(layerManager.isGeoTiffExportAvailable(managed.id)).toBe(true);
      });

      it("tiffFormat configure EDILMEMIS bir WMS katmaninda false doner", async () => {
        const managed = await layerManager.add("WMS", {
          id: "geotiff-avail-wms-no",
          title: "Test",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "il_sinirlari",
        });
        expect(layerManager.isGeoTiffExportAvailable(managed.id)).toBe(false);
      });

      it("tiffFormat configure edilmis bir WCS katmaninda true doner", () => {
        seedWcsLayer("geotiff-avail-wcs-yes", {
          url: "https://service.example.com/wcs",
          coverageId: "cov-1",
          tiffFormat: "image/tiff",
        });
        expect(layerManager.isGeoTiffExportAvailable("geotiff-avail-wcs-yes")).toBe(true);
      });

      it("WMS/WCS OLMAYAN (GEOJSON) bir katman tipinde false doner", async () => {
        const managed = await layerManager.add("GEOJSON", {
          id: "geotiff-avail-wrong-type",
          title: "Test",
          layerType: "GEOJSON",
          data: POLYGON_GEOJSON,
        });
        expect(layerManager.isGeoTiffExportAvailable(managed.id)).toBe(false);
      });

      it("var olmayan bir id icin false doner", () => {
        expect(layerManager.isGeoTiffExportAvailable("hic-eklenmemis-katman")).toBe(false);
      });
    });

    describe("exportLayerAsGeoTiff", () => {
      let createObjectURLSpy: ReturnType<typeof vi.fn>;
      let revokeObjectURLSpy: ReturnType<typeof vi.fn>;
      let clickSpy: ReturnType<typeof vi.fn>;

      beforeEach(() => {
        vi.useFakeTimers();
        createObjectURLSpy = vi.fn().mockReturnValue("blob:mock-geotiff");
        revokeObjectURLSpy = vi.fn();
        (URL as unknown as { createObjectURL: typeof createObjectURLSpy }).createObjectURL = createObjectURLSpy;
        (URL as unknown as { revokeObjectURL: typeof revokeObjectURLSpy }).revokeObjectURL = revokeObjectURLSpy;
        clickSpy = vi.fn();
        const realCreateElement = document.createElement.bind(document);
        vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
          const el = realCreateElement(tag);
          if (tag === "a") (el as HTMLAnchorElement).click = clickSpy;
          return el;
        });
      });

      afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
      });

      it("WMS icin GetMap URL'ini SERVICE/REQUEST/VERSION(1.3.0 sabit)/LAYERS/" +
        "FORMAT(tiffFormat)/CRS(CRS:84)/BBOX ile kurar, .tif olarak indirir", async () => {
        const managed = await layerManager.add("WMS", {
          id: "geotiff-export-wms",
          title: "Test",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "il_sinirlari",
          tiffFormat: "image/tiff",
          geographicBoundingBox: { west: 32.8, south: 39.9, east: 32.9, north: 40.0 },
        });

        const tiffBytes = new Uint8Array([0x49, 0x49, 0x2a, 0x00]);
        fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
          const url = String(input);
          expect(url).toContain("SERVICE=WMS");
          expect(url).toContain("REQUEST=GetMap");
          expect(url).toContain("VERSION=1.3.0");
          expect(url).toContain("LAYERS=il_sinirlari");
          expect(url).toContain("FORMAT=image%2Ftiff");
          expect(url).toContain("CRS=CRS%3A84");
          expect(url).toContain("BBOX=32.8%2C39.9%2C32.9%2C40");
          return new Response(tiffBytes, {
            status: 200,
            headers: { "content-type": "image/tiff" },
          });
        });

        await layerManager.exportLayerAsGeoTiff(managed.id, "katmanim");

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
        const blob = createObjectURLSpy.mock.calls[0]![0] as Blob;
        expect(blob.type).toBe("image/tiff");
        expect(new Uint8Array(await blob.arrayBuffer())).toEqual(tiffBytes);
        expect(clickSpy).toHaveBeenCalledTimes(1);
        expect(revokeObjectURLSpy).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1000);
        expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:mock-geotiff");
      });

      it("WCS icin GetCoverage URL'ini service/version/request/coverageId/format ile " +
        "kurar, 2.x versiyonda SCALESIZE=x(maxSize),y(maxSize) ekler", async () => {
        seedWcsLayer("geotiff-export-wcs", {
          url: "https://service.example.com/wcs",
          coverageId: "cov-1",
          tiffFormat: "image/tiff",
          version: "2.0.1",
          maxSize: 1024,
        });

        const tiffBytes = new Uint8Array([0x49, 0x49, 0x2a, 0x00]);
        fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
          const url = String(input);
          expect(url).toContain("service=WCS");
          expect(url).toContain("version=2.0.1");
          expect(url).toContain("request=GetCoverage");
          expect(url).toContain("coverageId=cov-1");
          expect(url).toContain("format=image%2Ftiff");
          expect(url).toContain("SCALESIZE=x%281024%29%2Cy%281024%29");
          return new Response(tiffBytes, {
            status: 200,
            headers: { "content-type": "image/tiff" },
          });
        });

        await layerManager.exportLayerAsGeoTiff("geotiff-export-wcs");

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(clickSpy).toHaveBeenCalledTimes(1);
      });

      it("multipart/related yaniti (ArcGIS ImageServer tarzi) acip SADECE image/* " +
        "parcasini Blob'a sarar", async () => {
        seedWcsLayer("geotiff-export-multipart", {
          url: "https://service.example.com/wcs",
          coverageId: "cov-2",
          tiffFormat: "image/tiff",
        });

        const boundary = "BOUNDARY123";
        const imageBytes = new Uint8Array([0x01, 0x02, 0xff, 0xfe, 0x10]);
        const encoder = new TextEncoder();
        const header = encoder.encode(`--${boundary}\r\nContent-Type: image/tiff\r\n\r\n`);
        const footer = encoder.encode(`\r\n--${boundary}--\r\n`);
        const full = new Uint8Array(header.length + imageBytes.length + footer.length);
        full.set(header, 0);
        full.set(imageBytes, header.length);
        full.set(footer, header.length + imageBytes.length);

        fetchMock.mockResolvedValue(
          new Response(full, {
            status: 200,
            headers: { "content-type": `multipart/related; boundary="${boundary}"` },
          })
        );

        await layerManager.exportLayerAsGeoTiff("geotiff-export-multipart");

        const blob = createObjectURLSpy.mock.calls[0]![0] as Blob;
        expect(blob.type).toBe("image/tiff");
        expect(new Uint8Array(await blob.arrayBuffer())).toEqual(imageBytes);
      });

      it("WMS/WCS OLMAYAN bir katman icin LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE firlatir", async () => {
        const managed = await layerManager.add("GEOJSON", {
          id: "geotiff-export-wrong-type",
          title: "Test",
          layerType: "GEOJSON",
          data: POLYGON_GEOJSON,
        });

        await expect(layerManager.exportLayerAsGeoTiff(managed.id)).rejects.toMatchObject({
          code: "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE",
        } satisfies Partial<LayerOperationError>);
        expect(fetchMock).not.toHaveBeenCalled();
      });

      it("tiffFormat configure EDILMEMIS bir WMS katmani icin LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED firlatir", async () => {
        const managed = await layerManager.add("WMS", {
          id: "geotiff-export-not-configured",
          title: "Test",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "il_sinirlari",
        });

        await expect(layerManager.exportLayerAsGeoTiff(managed.id)).rejects.toMatchObject({
          code: "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED",
        } satisfies Partial<LayerOperationError>);
        expect(fetchMock).not.toHaveBeenCalled();
      });

      it("sunucu !ok donerse OGC_GEOTIFF_DOWNLOAD_FAILED firlatir", async () => {
        const managed = await layerManager.add("WMS", {
          id: "geotiff-export-download-failed",
          title: "Test",
          url: "https://demo.mapserver.org/cgi-bin/wms",
          layers: "il_sinirlari",
          tiffFormat: "image/tiff",
        });

        fetchMock.mockResolvedValue(new Response(null, { status: 500, statusText: "Internal Server Error" }));

        await expect(layerManager.exportLayerAsGeoTiff(managed.id)).rejects.toMatchObject({
          code: "OGC_GEOTIFF_DOWNLOAD_FAILED",
        } satisfies Partial<OgcRequestError>);
      });
    });
  });

  // Adim 9 (Temizlik) ONCESI -- z-sira dortlusunun (raise/lower/raiseToTop/
  // lowerToBottom) "_move()" tek yardimciya indirilmesinden ONCEKI mevcut
  // davranisini kilitler. Hic karakterizasyon testi yoktu.
  describe("Z-sira (raise/lower/raiseToTop/lowerToBottom, Adim 9 Faz 0 karakterizasyonu)", () => {
    const POLYGON_GEOJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [[[32.8, 39.9], [32.9, 39.9], [32.9, 40.0], [32.8, 40.0], [32.8, 39.9]]],
          },
        },
      ],
    };

    it("imagery katmaninda raise/lower/raiseToTop/lowerToBottom viewer.imageryLayers'i " +
      "degistirir ve dogru oldIndex/newIndex ile layer:reorder yayinlar", async () => {
      const a = await layerManager.add("WMS", { id: "z-i-a", title: "A", url: "https://demo.mapserver.org/cgi-bin/wms", layers: "a" });
      const b = await layerManager.add("WMS", { id: "z-i-b", title: "B", url: "https://demo.mapserver.org/cgi-bin/wms", layers: "b" });

      const onReorder = vi.fn();
      layerManager.on("layer:reorder", onReorder);

      expect(viewer.imageryLayers.indexOf(a.cesiumObject as never)).toBe(0);
      expect(viewer.imageryLayers.indexOf(b.cesiumObject as never)).toBe(1);

      layerManager.raise("z-i-a");
      expect(viewer.imageryLayers.indexOf(a.cesiumObject as never)).toBe(1);
      expect(onReorder).toHaveBeenLastCalledWith({ id: "z-i-a", oldIndex: 0, newIndex: 1, layer: expect.objectContaining({ id: "z-i-a" }) });

      layerManager.lower("z-i-a");
      expect(viewer.imageryLayers.indexOf(a.cesiumObject as never)).toBe(0);
      expect(onReorder).toHaveBeenLastCalledWith({ id: "z-i-a", oldIndex: 1, newIndex: 0, layer: expect.objectContaining({ id: "z-i-a" }) });

      layerManager.raiseToTop("z-i-a");
      expect(viewer.imageryLayers.indexOf(a.cesiumObject as never)).toBe(1);
      expect(onReorder).toHaveBeenLastCalledWith({ id: "z-i-a", oldIndex: 0, newIndex: 1, layer: expect.objectContaining({ id: "z-i-a" }) });

      layerManager.lowerToBottom("z-i-a");
      expect(viewer.imageryLayers.indexOf(a.cesiumObject as never)).toBe(0);
      expect(onReorder).toHaveBeenLastCalledWith({ id: "z-i-a", oldIndex: 1, newIndex: 0, layer: expect.objectContaining({ id: "z-i-a" }) });
    });

    it("dataSource katmaninda raise/lower/raiseToTop/lowerToBottom viewer.dataSources'i " +
      "degistirir ve dogru oldIndex/newIndex ile layer:reorder yayinlar", async () => {
      const a = await layerManager.add("GEOJSON", { id: "z-d-a", title: "A", layerType: "GEOJSON", data: POLYGON_GEOJSON });
      const b = await layerManager.add("GEOJSON", { id: "z-d-b", title: "B", layerType: "GEOJSON", data: POLYGON_GEOJSON });

      const onReorder = vi.fn();
      layerManager.on("layer:reorder", onReorder);

      expect(viewer.dataSources.indexOf(a.cesiumObject as never)).toBe(0);
      expect(viewer.dataSources.indexOf(b.cesiumObject as never)).toBe(1);

      layerManager.raise("z-d-a");
      expect(viewer.dataSources.indexOf(a.cesiumObject as never)).toBe(1);
      expect(onReorder).toHaveBeenLastCalledWith({ id: "z-d-a", oldIndex: 0, newIndex: 1, layer: expect.objectContaining({ id: "z-d-a" }) });

      layerManager.lowerToBottom("z-d-a");
      expect(viewer.dataSources.indexOf(a.cesiumObject as never)).toBe(0);
      expect(onReorder).toHaveBeenLastCalledWith({ id: "z-d-a", oldIndex: 1, newIndex: 0, layer: expect.objectContaining({ id: "z-d-a" }) });
    });
  });

  // Adim 9 Faz 0 karakterizasyonu -- setVisible'in iki dali (ImageryLayer/
  // DataSource) birebir ayni; tek satira inmeden ONCEKI davranisi kilitler.
  describe("setVisible (Adim 9 Faz 0 karakterizasyonu)", () => {
    it("imagery katmaninin .show'unu degistirir ve layer:visibility yayinlar", async () => {
      const managed = await layerManager.add("WMS", { id: "vis-i", title: "A", url: "https://demo.mapserver.org/cgi-bin/wms", layers: "a" });
      const onVisibility = vi.fn();
      layerManager.on("layer:visibility", onVisibility);

      layerManager.setVisible("vis-i", false);
      expect(managed.cesiumObject.show).toBe(false);
      expect(onVisibility).toHaveBeenCalledWith({ id: "vis-i", visible: false });

      layerManager.setVisible("vis-i", true);
      expect(managed.cesiumObject.show).toBe(true);
      expect(onVisibility).toHaveBeenCalledWith({ id: "vis-i", visible: true });
    });

    it("dataSource katmaninin .show'unu degistirir ve layer:visibility yayinlar", async () => {
      const managed = await layerManager.add("GEOJSON", {
        id: "vis-d",
        title: "A",
        layerType: "GEOJSON",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Polygon",
                coordinates: [[[32.8, 39.9], [32.9, 39.9], [32.9, 40.0], [32.8, 40.0], [32.8, 39.9]]],
              },
            },
          ],
        },
      });
      const onVisibility = vi.fn();
      layerManager.on("layer:visibility", onVisibility);

      layerManager.setVisible("vis-d", false);
      expect(managed.cesiumObject.show).toBe(false);
      expect(onVisibility).toHaveBeenCalledWith({ id: "vis-d", visible: false });
    });
  });

  // Adim 9 Faz 3'te ML-04 DUZELTILDI: eskiden (bkz git gecmisi) comparator'in
  // "farkli tur -> return 0" yaklasimi, D1'in I1/I2 arasina girdigi bu TAM
  // senaryoda somut olarak BOZULUYOR, raiseToTop() sonrasi getLayers()
  // gercek Cesium sirasini YANSITMIYORDU. Artik reindexLayerOrder ayri
  // homojen alt-listelere bolup orijinal slot desenini koruyarak birlestiriyor
  // -- bu test DUZELTME SONRASI dogru davranisi kilitler.
  describe("reindexLayerOrder / getLayers() sirasi (Adim 9 Faz 3 -- ML-04 duzeltildi)", () => {
    it("karisik turde (imagery+dataSource) katmanlarda, ayni-tur gruplari gercek " +
      "Cesium collection index'iyle, farkli-tur elemanlarin GORELI slot deseni ise korunur", async () => {
      const POLYGON_GEOJSON = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [[[32.8, 39.9], [32.9, 39.9], [32.9, 40.0], [32.8, 40.0], [32.8, 39.9]]],
            },
          },
        ],
      };

      // Eklenme sirasi: I1, D1, I2, D2 (karisik).
      await layerManager.add("WMS", { id: "ord-i1", title: "I1", url: "https://demo.mapserver.org/cgi-bin/wms", layers: "a" });
      await layerManager.add("GEOJSON", { id: "ord-d1", title: "D1", layerType: "GEOJSON", data: POLYGON_GEOJSON });
      await layerManager.add("WMS", { id: "ord-i2", title: "I2", url: "https://demo.mapserver.org/cgi-bin/wms", layers: "b" });
      await layerManager.add("GEOJSON", { id: "ord-d2", title: "D2", layerType: "GEOJSON", data: POLYGON_GEOJSON });

      // I1'i imagery koleksiyonunda en usta al -- I1/I2'nin GERCEK Cesium
      // index'i artik I2 < I1 olmali (reindexLayerOrder ile getLayers()'a yansir).
      layerManager.raiseToTop("ord-i1");

      const ids = layerManager.getLayers().map((l) => l.id);
      // ML-04 DUZELTILDI: I1 GERCEKTEN en usta tasindi (viewer.imageryLayers'ta
      // I2(0) < I1(1)); artik getLayers() de bunu DOGRU yansitiyor -- ayni-tur
      // (imagery) grup GERCEK Cesium index'ine gore siralaniyor (i2 once, i1
      // sonra), farkli-tur elemanlarin (D1/D2) ORIJINAL "slot" deseni ise
      // korunuyor (D1 hala 1. imagery ile 2. imagery arasindaki slotta, D2
      // hala en sonda) -- eskiden (duzeltme oncesi) bu D1'in araya girmesi
      // swap'i "yutup" ["i1","d1","i2","d2"] (yanlis, degismemis) donduruyordu.
      expect(ids).toEqual(["ord-i2", "ord-d1", "ord-i1", "ord-d2"]);
    });
  });
});
