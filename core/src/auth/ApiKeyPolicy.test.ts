// @vitest-environment jsdom
//
// ApiKeyPolicy'nin 19 uyesi icin izole birim testleri (Cesium/Viewer
// gerekmez -- bkz project_ucbp_api_god_component_refactor_kurallari 2.3
// Hedef Yapi). jsdom SADECE isOwnBackendUrl'in goreli apiBase()'i
// window.location.origin'e gore cozumleme davranisini test edebilmek icin
// (bkz wfsCapabilities.ts:54'teki ayni desen); testlerin geri kalani
// window'a hic ihtiyac duymaz.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiKeyPolicy } from "./ApiKeyPolicy.js";
import type { AuthorizedLayerInfo } from "../types/index.js";

function makeAuthorizedInfo(overrides: Partial<AuthorizedLayerInfo> = {}): AuthorizedLayerInfo {
  return {
    servisTuru: "WMS",
    servisUrl: "https://example.com/wms",
    ogcLayerName: "test:layer",
    katmanAdi: "Test Katmanı",
    ...overrides,
  };
}

describe("ApiKeyPolicy", () => {
  let policy: ApiKeyPolicy;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    policy = new ApiKeyPolicy({ apiBase: () => "https://ucbp-api.example.com/ucbp-api" });
    fetchMock = vi.fn(async () => {
      throw new Error("beklenmeyen fetch cagrisi");
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("configure / hasApiKey", () => {
    it("baslangicta apiKey yok", () => {
      expect(policy.hasApiKey).toBe(false);
    });

    it("configure({apiKey}) sonrasi hasApiKey true olur", () => {
      policy.configure({ apiKey: "k-1" });
      expect(policy.hasApiKey).toBe(true);
    });

    it("verilmeyen alanlar configure() sonrasi degismez (kismi guncelleme)", () => {
      policy.configure({ apiKey: "k-1", trustedApiKeyHosts: ["guvenilir.example.com"] });
      policy.configure({ apiKey: "k-2" }); // trustedApiKeyHosts BURADA verilmiyor
      expect(policy.layerRequiresApiKey("https://guvenilir.example.com/wms")).toBe(true);
    });
  });

  describe("layerRequiresApiKey / isOwnBackendUrl (ML-07)", () => {
    it("kendi backend'imize giden /ogc/ yolunu 'apiKey gerekir' olarak isaretler", () => {
      expect(
        policy.layerRequiresApiKey("https://ucbp-api.example.com/ucbp-api/ogc/wms/123")
      ).toBe(true);
    });

    it("kendi backend'imize giden /wms-proxy/ yolunu 'apiKey gerekir' olarak isaretler", () => {
      expect(
        policy.layerRequiresApiKey("https://ucbp-api.example.com/wms-proxy/wms?url=x")
      ).toBe(true);
    });

    it("ML-07 DUZELTILDI: path'inde '/ogc/' gecen ama HOST'u FARKLI ucuncu taraf " +
      "bir URL 'apiKey gerekir' SAYILMAZ",
      () => {
        expect(
          policy.layerRequiresApiKey("https://harici-gis.example.com/ogc/features/x")
        ).toBe(false);
      }
    );

    it("goreli apiBase() dogru sekilde window.location.origin'e gore cozumlenir", () => {
      const relativePolicy = new ApiKeyPolicy({ apiBase: () => "/ucbp-api" });
      const ownUrl = `${window.location.origin}/ucbp-api/ogc/wms/1`;
      expect(relativePolicy.layerRequiresApiKey(ownUrl)).toBe(true);
      expect(relativePolicy.layerRequiresApiKey("https://baska-host.example.com/ogc/wms/1")).toBe(
        false
      );
    });

    it("configure edilmis trustedApiKeyHosts icindeki host icin true doner", () => {
      policy.configure({ trustedApiKeyHosts: ["guvenilir.example.com"] });
      expect(policy.layerRequiresApiKey("https://guvenilir.example.com/herhangi-bir-yol")).toBe(
        true
      );
    });

    it("trustedApiKeyHosts'ta OLMAYAN bir host icin false doner", () => {
      policy.configure({ trustedApiKeyHosts: ["guvenilir.example.com"] });
      expect(policy.layerRequiresApiKey("https://baska.example.com/herhangi-bir-yol")).toBe(false);
    });

    it("bicimsiz/ayristirilamayan URL icin fail-closed (false) doner", () => {
      expect(policy.layerRequiresApiKey("::: gecersiz-url :::")).toBe(false);
    });
  });

  describe("mergeApiKeyHeader / attachApiKeyToUrl (fail-closed apiKey yoksa)", () => {
    it("apiKey yoksa host guvenilir olsa bile header EKLENMEZ", () => {
      const headers = policy.mergeApiKeyHeader(
        { "X-Custom": "1" },
        "https://ucbp-api.example.com/ucbp-api/ogc/wms/1"
      );
      expect(headers).toEqual({ "X-Custom": "1" });
    });

    it("apiKey varsa VE host guvenilirse header'a X-API-Key eklenir", () => {
      policy.configure({ apiKey: "gizli-anahtar" });
      const headers = policy.mergeApiKeyHeader(
        { "X-Custom": "1" },
        "https://ucbp-api.example.com/ucbp-api/ogc/wms/1"
      );
      expect(headers).toEqual({ "X-Custom": "1", "X-API-Key": "gizli-anahtar" });
    });

    it("apiKey varsa AMA host guvenilir degilse header eklenmez", () => {
      policy.configure({ apiKey: "gizli-anahtar" });
      const headers = policy.mergeApiKeyHeader(undefined, "https://harici.example.com/wms");
      expect(headers).toBeUndefined();
    });

    it("apiKey varsa VE host guvenilirse URL'e tucbsapikey query param eklenir", () => {
      policy.configure({ apiKey: "gizli-anahtar" });
      const url = policy.attachApiKeyToUrl("https://ucbp-api.example.com/ucbp-api/ogc/wms/1?x=1");
      expect(url).toBe(
        "https://ucbp-api.example.com/ucbp-api/ogc/wms/1?x=1&tucbsapikey=gizli-anahtar"
      );
    });

    it("apiKey yoksa attachApiKeyToUrl URL'i degistirmeden dondurur", () => {
      const url = policy.attachApiKeyToUrl("https://ucbp-api.example.com/ucbp-api/ogc/wms/1");
      expect(url).toBe("https://ucbp-api.example.com/ucbp-api/ogc/wms/1");
    });
  });

  describe("resolveOgcProxyUrl / rewriteOpaqueOgcUrl", () => {
    it("apiKey yoksa upstreamUrl OLDUGU GIBI doner", () => {
      expect(policy.resolveOgcProxyUrl("wms", "https://harici.example.com/wms")).toBe(
        "https://harici.example.com/wms"
      );
    });

    it("apiKey varsa VE upstreamUrl zaten /ogc/ iceriyorsa apiBase()'e hizalanir " +
      "(rewriteOpaqueOgcUrl)",
      () => {
        policy.configure({ apiKey: "k" });
        const result = policy.resolveOgcProxyUrl(
          "wms",
          "https://eski-dev-host.example.com/ogc/wms/42"
        );
        expect(result).toBe("https://ucbp-api.example.com/ucbp-api/ogc/wms/42");
      }
    );

    it("apiKey varsa VE upstreamUrl zaten /wms-proxy/ iceriyorsa OLDUGU GIBI doner", () => {
      policy.configure({ apiKey: "k" });
      const legacyUrl = "https://ucbp-api.example.com/wms-proxy/wms?url=x";
      expect(policy.resolveOgcProxyUrl("wms", legacyUrl)).toBe(legacyUrl);
    });

    it("apiKey varsa VE upstreamUrl opak bir OGC yolu degilse yeni bir " +
      "wms-proxy URL'i kurulur",
      () => {
        policy.configure({ apiKey: "k" });
        const result = policy.resolveOgcProxyUrl("wcs", "https://harici.example.com/wcs?x=1");
        expect(result).toBe(
          "https://ucbp-api.example.com/ucbp-api/wms-proxy/wcs?url=" +
            encodeURIComponent("https://harici.example.com/wcs?x=1")
        );
      }
    );
  });

  describe("buildAuthHeaders", () => {
    it("authToken yoksa undefined doner", () => {
      expect(policy.buildAuthHeaders(undefined)).toBeUndefined();
    });

    it("authToken varsa Bearer header'i doner", () => {
      expect(policy.buildAuthHeaders("tok-1")).toEqual({ Authorization: "Bearer tok-1" });
    });
  });

  describe("getAuthorizedLayers / getLayerList", () => {
    it("apiKey yoksa LAYER_AUTHORIZED_LIST_API_KEY_MISSING firlatir", async () => {
      await expect(policy.getAuthorizedLayers()).rejects.toMatchObject({
        code: "LAYER_AUTHORIZED_LIST_API_KEY_MISSING",
      });
    });

    it("varsayilan discoveryUrl apiBase()/layers'tir ve X-API-Key header'i tasir", async () => {
      policy.configure({ apiKey: "k-1" });
      fetchMock.mockResolvedValueOnce(
        new Response(JSON.stringify([]), { status: 200 })
      );
      await policy.getAuthorizedLayers();
      expect(fetchMock).toHaveBeenCalledWith(
        "https://ucbp-api.example.com/ucbp-api/layers",
        { headers: { "X-API-Key": "k-1" } }
      );
    });

    it("apiKeyDiscoveryUrl configure edilmisse o kullanilir", async () => {
      policy.configure({ apiKey: "k-1", apiKeyDiscoveryUrl: "https://ozel.example.com/layers" });
      fetchMock.mockResolvedValueOnce(new Response(JSON.stringify([]), { status: 200 }));
      await policy.getAuthorizedLayers();
      expect(fetchMock).toHaveBeenCalledWith(
        "https://ozel.example.com/layers",
        expect.anything()
      );
    });

    it("yanit basarisizsa OGC_AUTHORIZED_LAYERS_REQUEST_FAILED firlatir", async () => {
      policy.configure({ apiKey: "k-1" });
      fetchMock.mockResolvedValueOnce(new Response("", { status: 500 }));
      await expect(policy.getAuthorizedLayers()).rejects.toMatchObject({
        code: "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED",
      });
    });

    it("{object: [...]} zarfini duz diziye cevirir ve servisTuru'nu buyuk harfe " +
      "cevirir (normalizeAuthorizedLayer)",
      async () => {
        policy.configure({ apiKey: "k-1" });
        fetchMock.mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              isSuccess: true,
              object: [
                {
                  ogcLayerName: "undefined",
                  katmanAdi: "il_sinirlari",
                  servisTuru: "wms",
                  servisUrl: "https://eski-dev-host.example.com/ogc/wms/7",
                },
              ],
            }),
            { status: 200 }
          )
        );
        const result = await policy.getAuthorizedLayers();
        expect(result).toEqual([
          {
            ogcLayerName: "il_sinirlari", // resolveOgcLayerName: "undefined" atlanir, katmanAdi kullanilir
            katmanAdi: "il_sinirlari",
            servisTuru: "WMS",
            servisUrl: "https://ucbp-api.example.com/ucbp-api/ogc/wms/7", // rewriteOpaqueOgcUrl
          },
        ]);
      }
    );

    it("getLayerList, getAuthorizedLayers'a delege eder", async () => {
      policy.configure({ apiKey: "k-1" });
      fetchMock.mockResolvedValueOnce(new Response(JSON.stringify([]), { status: 200 }));
      const result = await policy.getLayerList();
      expect(result).toEqual([]);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  // GC-03 Adim 3 (Faz 6): TucbsAuthorizedLayers.ts'teki ORIJINAL
  // _authorizedCanAdd/_resolvedOgcLayerName/_addOneAuthorizedLayer'in buraya
  // tasinmis hali -- bkz LayerManager.canAddAuthorizedLayer/addAuthorizedLayer
  // (ince delegeler) ve TucbsAuthorizedLayers.characterization.test.ts (UI
  // entegrasyon yuzeyi, Faz 7'de bu metodlara yonlendirilecek).
  describe("canAddAuthorizedLayer / resolveAddOptions", () => {
    it("WMS: eklenebilir, options.layers = ogcLayerName, id 'authorized-' ile baslar", () => {
      const info = makeAuthorizedInfo({ servisTuru: "WMS", ogcLayerName: "il:sinir" });
      expect(policy.canAddAuthorizedLayer(info)).toBe(true);

      const resolved = policy.resolveAddOptions(info);
      expect(resolved.layerType).toBe("WMS");
      expect(resolved.options).toMatchObject({
        title: "Test Katmanı",
        url: "https://example.com/wms",
        layers: "il:sinir",
      });
      expect(resolved.options.id).toMatch(/^authorized-/);
    });

    it("WFS: eklenebilir, options.typeName = cozumlenmis katman adi", () => {
      const info = makeAuthorizedInfo({ servisTuru: "WFS", ogcLayerName: "test:wfslayer" });
      const resolved = policy.resolveAddOptions(info);
      expect(resolved.layerType).toBe("WFS");
      expect(resolved.options).toMatchObject({ typeName: "test:wfslayer" });
    });

    it("WMTS: tileMatrixSet VARSA eklenebilir, options.layer + tileMatrixSetID dolu", () => {
      const info = makeAuthorizedInfo({ servisTuru: "WMTS", wmtsTileMatrixSet: "EPSG:3857" });
      expect(policy.canAddAuthorizedLayer(info)).toBe(true);
      const resolved = policy.resolveAddOptions(info);
      expect(resolved.layerType).toBe("WMTS");
      expect(resolved.options).toMatchObject({ layer: "test:layer", tileMatrixSetID: "EPSG:3857" });
    });

    it("WMTS: tileMatrixSet YOKSA eklenemez, resolveAddOptions LAYER_AUTHORIZED_ADD_MISSING_INFO firlatir", () => {
      const info = makeAuthorizedInfo({ servisTuru: "WMTS" });
      expect(policy.canAddAuthorizedLayer(info)).toBe(false);
      expect(() => policy.resolveAddOptions(info)).toThrowError(
        expect.objectContaining({ code: "LAYER_AUTHORIZED_ADD_MISSING_INFO" })
      );
    });

    it("servisUrl eksikse eklenemez", () => {
      const info = makeAuthorizedInfo({ servisUrl: "" });
      expect(policy.canAddAuthorizedLayer(info)).toBe(false);
      expect(() => policy.resolveAddOptions(info)).toThrowError(
        expect.objectContaining({ code: "LAYER_AUTHORIZED_ADD_MISSING_INFO" })
      );
    });

    it("ogcLayerName 'undefined' string ise katmanAdi'na duser (resolveOgcLayerName ile AYNI fallback)", () => {
      const info = makeAuthorizedInfo({ ogcLayerName: "undefined", katmanAdi: "il_sinirlari" });
      const resolved = policy.resolveAddOptions(info);
      expect(resolved.options).toMatchObject({ layers: "il_sinirlari" });
    });

    it("katmanAdi yoksa title cozumlenmis katman adina duser", () => {
      const info = makeAuthorizedInfo({ katmanAdi: "" as unknown as string, ogcLayerName: "il:sinir" });
      const resolved = policy.resolveAddOptions(info);
      expect(resolved.options.title).toBe("il:sinir");
    });

    it("info.id varsa uretilen id onu kullanir (authorized-<id>-<timestamp>)", () => {
      const info = makeAuthorizedInfo({ id: "sepet-satiri-7" });
      const resolved = policy.resolveAddOptions(info);
      expect(resolved.options.id).toMatch(/^authorized-sepet-satiri-7-\d+$/);
    });
  });
});
