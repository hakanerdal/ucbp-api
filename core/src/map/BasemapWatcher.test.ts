// @vitest-environment jsdom
//
// Adim 1 (GC-06) Faz 2 -- watchBasemap() Map.ts'ten SAF TASINDIKTAN SONRA
// yazilan birim testleri (bkz project_ucbp_api_god_component_map_adim1_basemapwatcher
// -- siranin tersine cevrilme gerekcesi: Map, Viewer'i KENDI icinde
// olusturuyor/enjekte edilemiyor, bu yuzden tasima-oncesi karakterizasyon
// jsdom'da imkansizdi). deps + viewer/provider'in kullanilan yuzeyi elle
// sahtelenir -- gercek Cesium Event sinifina ihtiyac YOK, sadece
// addEventListener/removeEventListener sozlesmesi gerekiyor (bkz
// fakeViewer.ts'teki postRender ile AYNI desen).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ImageryLayer, TileProviderError, UrlTemplateImageryProvider, Viewer } from "cesium";
import { type BasemapWatcherDeps, watchBasemap } from "./BasemapWatcher.js";

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

function createFakeDeps(isCurrentGeneration = true): BasemapWatcherDeps & Record<string, ReturnType<typeof vi.fn>> {
  return {
    ensureFallbackBasemap: vi.fn(),
    clearFallbackBasemap: vi.fn(),
    removeBasemapLayer: vi.fn(),
    emit: vi.fn(),
    setStatus: vi.fn(),
    isCurrentGeneration: vi.fn(() => isCurrentGeneration),
  };
}

describe("watchBasemap (Adim 1 Faz 2 -- BasemapWatcher.ts)", () => {
  let tileLoadProgressEvent: ReturnType<typeof createFakeEvent<(pendingTileCount: number) => void>>;
  let errorEvent: ReturnType<typeof createFakeEvent<(error: TileProviderError) => void>>;
  let viewer: Viewer;
  let provider: UrlTemplateImageryProvider;
  let requestImage: ReturnType<typeof vi.fn>;
  let resolveTile: () => void;
  const imageryLayer = {} as ImageryLayer;

  beforeEach(() => {
    vi.useFakeTimers();
    tileLoadProgressEvent = createFakeEvent();
    errorEvent = createFakeEvent();
    viewer = {
      scene: { globe: { tileLoadProgressEvent } },
      imageryLayers: { contains: vi.fn(() => true) },
    } as unknown as Viewer;
    requestImage = vi.fn(() => new Promise<unknown>((resolve) => { resolveTile = () => resolve({}); }));
    provider = { errorEvent, requestImage } as unknown as UrlTemplateImageryProvider;
  });

  // Bu provider'a ait bir tile istegi baslatip basariyla cozer.
  async function loadOneTile(): Promise<void> {
    provider.requestImage(0, 0, 1);
    resolveTile();
    await Promise.resolve();
    await Promise.resolve();
  }

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("Yol 0 -- 3sn icinde ne basari ne hata olursa SADECE ensureFallbackBasemap cagrilir, basemap:error/setStatus YAYILMAZ", () => {
    const deps = createFakeDeps();
    watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    vi.advanceTimersByTime(3000);

    expect(deps.ensureFallbackBasemap).toHaveBeenCalledTimes(1);
    expect(deps.setStatus).not.toHaveBeenCalled();
    expect(deps.emit).not.toHaveBeenCalled();
  });

  it("Yol 1 -- provider'in KENDI ilk tile'i basariyla donunce BASARILI kabul edilir: setStatus('ready') + clearFallbackBasemap + basemap:recovered, ve stop() sonraki zamanlayicilari da iptal eder", async () => {
    const deps = createFakeDeps();
    watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    await loadOneTile();

    expect(deps.setStatus).toHaveBeenCalledTimes(1);
    expect(deps.setStatus).toHaveBeenCalledWith("ready");
    expect(deps.clearFallbackBasemap).toHaveBeenCalledTimes(1);
    expect(deps.emit).toHaveBeenCalledTimes(1);
    expect(deps.emit).toHaveBeenCalledWith("basemap:recovered", { id: "hgm-ortofoto" });

    // handled=true sonrasi stopWatching() timer'lari zaten temizledigi icin
    // 10sn'ye kadar ilerletsek bile ensureFallbackBasemap/basemap:error TETIKLENMEMELI.
    vi.advanceTimersByTime(10000);
    expect(deps.ensureFallbackBasemap).not.toHaveBeenCalled();
    expect(deps.emit).toHaveBeenCalledTimes(1);
  });

  it("baska katmanlarin tile ilerlemesi (globe.tileLoadProgressEvent) YOKSAYILIR -- sadece bu provider'in kendi tile'i sayilir", () => {
    const deps = createFakeDeps();
    watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    tileLoadProgressEvent.fire(3);
    tileLoadProgressEvent.fire(0);

    expect(deps.setStatus).not.toHaveBeenCalled();
    expect(deps.emit).not.toHaveBeenCalled();
  });

  it("Yol 2 -- hata: BASEMAP_ERROR_RETRY_LIMIT (2) kadar error.retry=true ile devam eder, limit dolunca unavailable + basemap:error", () => {
    const deps = createFakeDeps();
    watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    const err1 = { timesRetried: 0, retry: false } as TileProviderError;
    const err2 = { timesRetried: 1, retry: false } as TileProviderError;
    const err3 = { timesRetried: 2, retry: false } as TileProviderError;

    errorEvent.fire(err1);
    expect(err1.retry).toBe(true);
    expect(deps.setStatus).not.toHaveBeenCalled();

    errorEvent.fire(err2);
    expect(err2.retry).toBe(true);
    expect(deps.setStatus).not.toHaveBeenCalled();

    errorEvent.fire(err3);
    expect(err3.retry).toBe(false);
    expect(deps.setStatus).toHaveBeenCalledTimes(1);
    expect(deps.setStatus).toHaveBeenCalledWith("unavailable");
    expect(deps.removeBasemapLayer).toHaveBeenCalledTimes(1);
    expect(deps.ensureFallbackBasemap).toHaveBeenCalledTimes(1);
    expect(deps.emit).toHaveBeenCalledTimes(1);
    expect(deps.emit).toHaveBeenCalledWith("basemap:error", { id: "hgm-ortofoto" });
  });

  it("onError: viewer.imageryLayers artik bu katmani ICERMIYORSA (zaten kaldirilmis) hicbir sey yapmaz", () => {
    viewer = {
      scene: { globe: { tileLoadProgressEvent } },
      imageryLayers: { contains: vi.fn(() => false) },
    } as unknown as Viewer;
    const deps = createFakeDeps();
    watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    errorEvent.fire({ timesRetried: 5, retry: false } as TileProviderError);

    expect(deps.setStatus).not.toHaveBeenCalled();
    expect(deps.ensureFallbackBasemap).not.toHaveBeenCalled();
  });

  it("Yol 3 -- guvenlik agi: 10sn icinde ne basari ne kesin hata olursa AYNI 'unavailable' sonucu ZORLA uygulanir", () => {
    const deps = createFakeDeps();
    watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    vi.advanceTimersByTime(10000);

    // 3sn'de Yol 0 (sadece gorsel yedek) da tetiklenmis olmali -- Yol 3
    // ONA EK olarak calisir, onun YERINE degil.
    expect(deps.ensureFallbackBasemap).toHaveBeenCalledTimes(2);
    expect(deps.setStatus).toHaveBeenCalledTimes(1);
    expect(deps.setStatus).toHaveBeenCalledWith("unavailable");
    expect(deps.removeBasemapLayer).toHaveBeenCalledTimes(1);
    expect(deps.emit).toHaveBeenCalledTimes(1);
    expect(deps.emit).toHaveBeenCalledWith("basemap:error", { id: "hgm-ortofoto" });
  });

  it("eskimis (stale) nesil: isCurrentGeneration false ise fallback/guvenlik-agi zamanlayicilari VE onError hicbir sey yapmaz", () => {
    const deps = createFakeDeps(false);
    watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    vi.advanceTimersByTime(10000);
    errorEvent.fire({ timesRetried: 5, retry: false } as TileProviderError);

    expect(deps.ensureFallbackBasemap).not.toHaveBeenCalled();
    expect(deps.setStatus).not.toHaveBeenCalled();
    expect(deps.removeBasemapLayer).not.toHaveBeenCalled();
    expect(deps.emit).not.toHaveBeenCalled();
  });

  it("eskimis (stale) nesilde gelen tile basariyi SAYILMAZ ve hicbir sey yayilmaz", async () => {
    const deps = createFakeDeps(false);
    watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    await loadOneTile();

    expect(deps.setStatus).not.toHaveBeenCalled();
    expect(deps.clearFallbackBasemap).not.toHaveBeenCalled();
    expect(deps.emit).not.toHaveBeenCalled();
  });

  it("dondurulen stop(): zamanlayicilari iptal eder VE event dinleyicilerini kaldirir -- sonrasinda hicbir sey tetiklenmez", async () => {
    const deps = createFakeDeps();
    const stop = watchBasemap(viewer, deps, 1, "hgm-ortofoto", imageryLayer, provider);

    expect(tileLoadProgressEvent.listenerCount).toBe(0);
    expect(errorEvent.listenerCount).toBe(1);

    stop();

    expect(errorEvent.listenerCount).toBe(0);

    vi.advanceTimersByTime(10000);
    await loadOneTile();
    errorEvent.fire({ timesRetried: 5, retry: false } as TileProviderError);

    expect(deps.ensureFallbackBasemap).not.toHaveBeenCalled();
    expect(deps.setStatus).not.toHaveBeenCalled();
    expect(deps.removeBasemapLayer).not.toHaveBeenCalled();
    expect(deps.emit).not.toHaveBeenCalled();
  });
});
