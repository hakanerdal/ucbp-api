// @vitest-environment jsdom
//
// Basemap kumesi Faz 2 -- BasemapController Map.ts'ten SAF TASINDIKTAN SONRA
// yazilan birim testleri (bkz project_ucbp_api_map_kamera_kumesi_cameracontrol
// sonundaki 2. bolme adayi -- ayni "Map, Viewer'i KENDI icinde olusturuyor"
// gerekcesiyle sira tersine cevrilir: karakterizasyon tasima-oncesi jsdom'da
// imkansizdi). BasemapWatcher.test.ts ile AYNI desen (createFakeEvent, elle
// sahte viewer) -- gercek Cesium Event/ImageryLayerCollection sinifina
// ihtiyac YOK, sadece kullanilan yuzey (addEventListener/removeEventListener,
// imageryLayers.addImageryProvider/remove/contains) sahtelenir. UrlTemplate/
// SingleTileImageryProvider GERCEK Cesium siniflari olarak insa edilir --
// WebGL gerektirmezler (LayerManager.characterization.test.ts ile AYNI
// gerekce).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Viewer } from "cesium";
import { BasemapController, type BasemapControllerDeps } from "./BasemapController.js";

// UrlTemplateImageryProvider/SingleTileImageryProvider GERCEK Cesium
// siniflari olarak insa edilebilir (WebGL gerektirmezler) AMA ikisi de
// verilen url'i Cesium'un KENDI Resource sinifi uzerinden gecirip yeniden
// normalize/encode eder (query-string encode) -- bu, TEST ETMEK ISTEDIGIMIZ
// seyle (resolveBasemapUrl/appendTucbsApiKeyQuery'nin URUTTUGU HAM string)
// ILGISIZ bir Cesium ic detayi. Bu yuzden ikisi de ham `options.url`'i
// AYNEN saklayan hafif sahtelerle degistirilir -- BasemapController'in
// KENDI mantigi test edilir, Cesium'un URL normalizasyonu degil.
vi.mock("cesium", async (importOriginal) => {
  const actual = await importOriginal<typeof import("cesium")>();
  return {
    ...actual,
    UrlTemplateImageryProvider: vi.fn((options: { url: string }) => {
      const self = {
      __kind: "url-template",
      __resolveTiles: false,
      url: options.url,
      // watchBasemap() provider.errorEvent'e abone olur -- bu testlerde hic
      // hata senaryosu TETIKLENMEDIGI icin (BasemapWatcher.test.ts zaten
      // ayrintili kapsiyor) no-op yeterli.
      errorEvent: { addEventListener: () => undefined, removeEventListener: () => undefined },
      // BasemapController requestImage'i sarip Request'leri izler (bkz
      // trackProviderRequests) -- sahte: hic cozulmeyen (askida) bir istek.
      // __resolveTiles=true iken istek basariyla doner (HGM tile verdi).
      requestImage: vi.fn(() => (self.__resolveTiles ? Promise.resolve({}) : new Promise<never>(() => undefined))),
      };
      return self;
    }),
    SingleTileImageryProvider: vi.fn((options: { url: string }) => ({
      __kind: "single-tile",
      url: options.url,
    })),
  };
});

function createFakeEvent<TListener extends (...args: never[]) => void>() {
  const listeners = new Set<TListener>();
  return {
    addEventListener: (listener: TListener) => listeners.add(listener),
    removeEventListener: (listener: TListener) => listeners.delete(listener),
    fire: (...args: Parameters<TListener>) => {
      for (const listener of [...listeners]) (listener as (...a: Parameters<TListener>) => void)(...args);
    },
    get listenerCount() {
      return listeners.size;
    },
  };
}

function createFakeViewer() {
  const tileLoadProgressEvent = createFakeEvent<(pendingTileCount: number) => void>();
  const addedLayers: unknown[] = [];
  const addImageryProvider = vi.fn((provider: unknown, index: number) => {
    const layer = { __provider: provider, __index: index };
    addedLayers.push(layer);
    return layer;
  });
  const remove = vi.fn();
  const contains = vi.fn(() => true);
  const viewer = {
    scene: { globe: { tileLoadProgressEvent } },
    imageryLayers: { addImageryProvider, remove, contains },
  } as unknown as Viewer;
  return { viewer, tileLoadProgressEvent, addImageryProvider, remove, contains, addedLayers };
}

function createFakeDeps(
  overrides: Partial<{ proxyBase: string; apiKey: string | undefined }> = {},
): BasemapControllerDeps & Record<string, ReturnType<typeof vi.fn>> {
  return {
    removeBasemapLayers: vi.fn(),
    addBasemapImageryLayer: vi.fn(),
    removeLayer: vi.fn(),
    emit: vi.fn(),
    getProxyBase: vi.fn(() => overrides.proxyBase ?? ""),
    getApiKey: vi.fn(() => overrides.apiKey),
  };
}

describe("BasemapController (Basemap kumesi Faz 2)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("__TUCBS_ATLAS_BASE__", "https://atlas.harita.gov.tr");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("set(null) / set(undefined): status 'ready'e doner, currentBasemapId temizlenir, hicbir imagery katmani eklenmez", () => {
    const { viewer, addImageryProvider } = createFakeViewer();
    const deps = createFakeDeps();
    const controller = new BasemapController(viewer, deps);

    controller.set(null);
    expect(controller.status).toBe("ready");
    expect(controller.currentBasemapId).toBeUndefined();
    expect(deps.removeBasemapLayers).toHaveBeenCalledTimes(1);
    expect(addImageryProvider).not.toHaveBeenCalled();

    controller.set(undefined);
    expect(controller.status).toBe("ready");
    expect(deps.removeBasemapLayers).toHaveBeenCalledTimes(2);
  });

  it("set({ id: '' }): bos id de ayni sekilde 'ready'e doner, hicbir katman eklenmez", () => {
    const { viewer, addImageryProvider } = createFakeViewer();
    const controller = new BasemapController(viewer, createFakeDeps());

    controller.set({ id: "" as never });

    expect(controller.status).toBe("ready");
    expect(controller.currentBasemapId).toBeUndefined();
    expect(addImageryProvider).not.toHaveBeenCalled();
  });

  it("set('hgm-temel'): proxyBase bossa dogrudan HGM URL'i kurulur (apiKey yoksa tucbsapikey eklenmez), index=0'a eklenir", () => {
    const { viewer, addImageryProvider } = createFakeViewer();
    const deps = createFakeDeps();
    const controller = new BasemapController(viewer, deps);

    controller.set("hgm-temel");

    expect(controller.status).toBe("loading");
    expect(controller.currentBasemapId).toBe("hgm-temel");
    expect(addImageryProvider).toHaveBeenCalledTimes(1);
    const [provider, index] = addImageryProvider.mock.calls[0]!;
    expect(index).toBe(0);
    expect((provider as { url: string }).url).toBe(
      "https://atlas.harita.gov.tr/temel/{z}/{x}/{y}.png",
    );
    expect(deps.addBasemapImageryLayer).toHaveBeenCalledTimes(1);
    const [, basemapId] = vi.mocked(deps.addBasemapImageryLayer).mock.calls[0]!;
    expect(basemapId).toBe("hgm-temel");
  });

  it("set('hgm-ortofoto'): proxyBase + apiKey birlikte verilince ikisi de URL'e islenir (proxied + tucbsapikey query)", () => {
    const { viewer, addImageryProvider } = createFakeViewer();
    const deps = createFakeDeps({
      proxyBase: "https://dev-ucbp-api.turksat.com.tr/proxyservice/proxyservice/getByUrl?url=",
      apiKey: "abc123",
    });
    const controller = new BasemapController(viewer, deps);

    controller.set("hgm-ortofoto");

    const [provider] = addImageryProvider.mock.calls[0]!;
    expect((provider as { url: string }).url).toBe(
      "https://dev-ucbp-api.turksat.com.tr/proxyservice/proxyservice/getByUrl?url=" +
        "https://atlas.harita.gov.tr/ortofotoservis/{z}/{x}/{y}.png" +
        // proxyBase zaten "?url=" icerdigi icin appendTucbsApiKeyQuery "&" ayiricisini kullanir.
        "&tucbsapikey=abc123",
    );
  });

  it("set('hgm-siyasi') ve set('hgm-yukseklik'): dogru path'lere eslenir", () => {
    const { viewer, addImageryProvider } = createFakeViewer();
    const controller = new BasemapController(viewer, createFakeDeps());

    controller.set("hgm-siyasi");
    expect((addImageryProvider.mock.calls[0]![0] as { url: string }).url).toContain("/siyasi/");

    controller.set("hgm-yukseklik");
    expect((addImageryProvider.mock.calls[1]![0] as { url: string }).url).toContain("/yukseklik/");
  });

  it("set(): bilinmeyen/ozel id AYNEN URL olarak kullanilir (apiKey/proxy islenmez)", () => {
    const { viewer, addImageryProvider } = createFakeViewer();
    const deps = createFakeDeps({ apiKey: "should-not-appear" });
    const controller = new BasemapController(viewer, deps);

    controller.set("https://example.com/{z}/{x}/{y}.png");

    const [provider] = addImageryProvider.mock.calls[0]!;
    expect((provider as { url: string }).url).toBe("https://example.com/{z}/{x}/{y}.png");
  });

  it("ardisik iki set(): ONCEKI altligin gec gelen tile'i yeni altlik icin 'recovered' URETMEZ", async () => {
    const { viewer, addedLayers } = createFakeViewer();
    const deps = createFakeDeps();
    const controller = new BasemapController(viewer, deps);
    type P = { __resolveTiles: boolean; requestImage: (...a: unknown[]) => unknown };

    controller.set("hgm-ortofoto");
    const eski = (addedLayers[0] as { __provider: P }).__provider;
    controller.set("hgm-siyasi");

    eski.__resolveTiles = true;
    eski.requestImage(0, 0, 1);
    await Promise.resolve();
    await Promise.resolve();

    expect(controller.status).toBe("loading");
    expect(deps.emit).not.toHaveBeenCalled();
  });

  it("stop(): zamanlayicilari iptal eder -- sonrasinda fallback/hata tetiklenmez (ML-02'nin BasemapController seviyesinde yeniden kaniti)", () => {
    const { viewer } = createFakeViewer();
    const deps = createFakeDeps();
    const controller = new BasemapController(viewer, deps);

    controller.set("hgm-temel");
    controller.stop();

    vi.advanceTimersByTime(10000);

    expect(deps.removeLayer).not.toHaveBeenCalled();
    expect(deps.emit).not.toHaveBeenCalled();
  });

  it("basari yolu: altligin KENDI tile'i basariyla donerse status 'ready' olur ve fallback (varsa) temizlenir", async () => {
    const { viewer, remove, addedLayers } = createFakeViewer();
    const controller = new BasemapController(viewer, createFakeDeps());

    controller.set("hgm-temel");
    vi.advanceTimersByTime(3000); // FALLBACK_DELAY_MS -- yedek eklenir
    expect(controller.status).toBe("loading");

    const provider = (addedLayers[0] as { __provider: { __resolveTiles: boolean; requestImage: (...a: unknown[]) => unknown } }).__provider;
    provider.__resolveTiles = true;
    provider.requestImage(0, 0, 1);
    await Promise.resolve();
    await Promise.resolve();

    expect(controller.status).toBe("ready");
    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove.mock.calls[0]![1]).toBe(true);
  });

  it("guvenlik agi: 10sn icinde ne basari ne kesin hata olursa status 'unavailable' olur ve deps.removeLayer/emit cagrilir", () => {
    const { viewer } = createFakeViewer();
    const deps = createFakeDeps();
    const controller = new BasemapController(viewer, deps);

    controller.set("hgm-temel");
    vi.advanceTimersByTime(10000);

    expect(controller.status).toBe("unavailable");
    expect(deps.removeLayer).toHaveBeenCalledTimes(1);
    expect(deps.emit).toHaveBeenCalledTimes(1);
    expect(deps.emit).toHaveBeenCalledWith("basemap:error", { id: "hgm-temel" });
  });

  it("yeni set(): onceki altligin ucustaki Request'leri iptal edilir (slotlar yeni altliga acilir), iptal edilen yeni altligi etkilemez", () => {
    const { viewer, addedLayers } = createFakeViewer();
    const controller = new BasemapController(viewer, createFakeDeps());
    const makeRequest = () => ({ cancel: vi.fn() });

    controller.set("hgm-ortofoto");
    const ortofotoProvider = (addedLayers[0] as { __provider: { requestImage: (...a: unknown[]) => unknown } }).__provider;
    const r1 = makeRequest();
    const r2 = makeRequest();
    ortofotoProvider.requestImage(1, 1, 5, r1);
    ortofotoProvider.requestImage(1, 2, 5, r2);

    controller.set("hgm-siyasi");
    expect(r1.cancel).toHaveBeenCalledTimes(1);
    expect(r2.cancel).toHaveBeenCalledTimes(1);

    const siyasiProvider = (addedLayers[1] as { __provider: { requestImage: (...a: unknown[]) => unknown } }).__provider;
    const r3 = makeRequest();
    siyasiProvider.requestImage(1, 1, 5, r3);
    expect(r3.cancel).not.toHaveBeenCalled();
  });

  it("kesin hata/guvenlik agi (removeBasemapLayer) ve stop(): bekleyen Request'ler iptal edilir", () => {
    const { viewer, addedLayers } = createFakeViewer();
    const controller = new BasemapController(viewer, createFakeDeps());
    controller.set("hgm-temel");
    const provider = (addedLayers[0] as { __provider: { requestImage: (...a: unknown[]) => unknown } }).__provider;
    const r1 = { cancel: vi.fn() };
    provider.requestImage(0, 0, 1, r1);

    vi.advanceTimersByTime(10000); // unavailableTimer -> removeBasemapLayer
    expect(r1.cancel).toHaveBeenCalledTimes(1);

    controller.set("hgm-temel");
    // addedLayers[1] unavailableTimer'in ekledigi fallback (single-tile) katmani.
    const provider2 = (addedLayers[addedLayers.length - 1] as { __provider: { requestImage: (...a: unknown[]) => unknown } }).__provider;
    const r2 = { cancel: vi.fn() };
    provider2.requestImage(0, 0, 1, r2);
    controller.stop();
    expect(r2.cancel).toHaveBeenCalledTimes(1);
  });

  it("status getter: baslangicta 'ready'", () => {
    const { viewer } = createFakeViewer();
    const controller = new BasemapController(viewer, createFakeDeps());
    expect(controller.status).toBe("ready");
  });
});
