// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God component refactor Faz 3.5a. TucbsMapPreview'in
// HIC testi yoktu; 3.5b'de render() icine gomulu 123 satirlik <style> blogu
// map/mapPreviewStyles.ts'e tasinacak. Bu dosya bilesenin MEVCUT davranisini
// dondurur:
//   - render ciktisi (gomulu <style> METNI DAHIL) pasif/aktif durumlarda,
//   - gorunurluk tabanli lazy-mount: havuz kaydi, Map kurulumu, pasiflestirme,
//   - basemap apiKey kapisi (acik/HGM altlik, uyari karti),
//   - katman senkronu (layerOptions onceligi, yukleniyor gostergesi, eski
//     katmanin yenisi hazir olunca kaldirilmasi, zoomToLayer),
//   - zoom butonlari.
// Cesium Viewer kurmamak icin core'un Map sinifi, apiKey dogrulamasi,
// PreviewViewerPool ve CameraZoom sahteleriyle degistirilir; jsdom'da
// olmayan IntersectionObserver/ResizeObserver elle tetiklenen ikizlerle
// saglanir.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const pool = vi.hoisted(() => ({
  activate: vi.fn(),
  touch: vi.fn(),
  release: vi.fn(),
}));
vi.mock("./PreviewViewerPool.js", () => ({ previewViewerPool: pool }));

const zoom = vi.hoisted(() => ({ zoomInProportional: vi.fn(), zoomOutProportional: vi.fn() }));
vi.mock("../shared/util/CameraZoom.js", () => zoom);

const core = vi.hoisted(() => ({
  maps: [] as FakeMapLike[],
  ensureEffectiveApiKeyValid: vi.fn(),
  unregister: vi.fn(),
  registerApiKeyRefresh: vi.fn(),
}));

interface FakeMapLike {
  container: HTMLElement;
  options: Record<string, unknown>;
  calls: string[];
  layerManager: {
    add: ReturnType<typeof vi.fn>;
    removeLayer: ReturnType<typeof vi.fn>;
    zoomToLayer: ReturnType<typeof vi.fn>;
    layerRequiresApiKey: ReturnType<typeof vi.fn>;
  };
  viewer: { camera: object; scene: { globe: { baseColor: unknown; tilesLoaded: boolean }; screenSpaceCameraController: object } };
}

vi.mock("@tucbs/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tucbs/core")>();
  /** Viewer kurmadan cagrilari kaydeden Map ikizi. */
  class FakeMap {
    calls: string[] = [];
    layerManager = {
      add: vi.fn(async (_type: string, options: { id: string }) => ({ id: options.id, cesiumObject: {} })),
      removeLayer: vi.fn(),
      zoomToLayer: vi.fn(async () => true),
      layerRequiresApiKey: vi.fn(() => false),
    };
    viewer = {
      camera: {},
      scene: {
        globe: { baseColor: undefined as unknown, tilesLoaded: true },
        screenSpaceCameraController: { minimumZoomDistance: 1, maximumZoomDistance: 2 },
      },
    };
    constructor(
      public container: HTMLElement,
      public options: Record<string, unknown>,
    ) {
      core.maps.push(this as unknown as FakeMapLike);
    }
    setMode(mode: string) {
      this.calls.push(`setMode:${mode}`);
    }
    setQuality(quality: number) {
      this.calls.push(`setQuality:${quality}`);
    }
    setBasemap(id: string | null) {
      this.calls.push(`setBasemap:${id}`);
    }
    setExtent(extent: unknown) {
      this.calls.push(`setExtent:${extent === actual.DEFAULT_INITIAL_EXTENT ? "DEFAULT" : JSON.stringify(extent)}`);
    }
    resize() {
      this.calls.push("resize");
    }
    destroy() {
      this.calls.push("destroy");
    }
  }
  return {
    ...actual,
    Map: FakeMap,
    ensureEffectiveApiKeyValid: core.ensureEffectiveApiKeyValid,
    registerApiKeyRefresh: core.registerApiKeyRefresh,
  };
});

import { ApiKeyValidationError } from "@tucbs/core";
import "./TucbsMapPreview.js";
import type { TucbsMapPreview } from "./TucbsMapPreview.js";

/** Elle tetiklenen IntersectionObserver ikizi; son kurulanin callback'ini tutar. */
let intersect: (visible: boolean) => void = () => {};
let resizeCallbacks: (() => void)[] = [];

class FakeIntersectionObserver {
  constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
    intersect = (visible) => callback([{ isIntersecting: visible }]);
  }
  observe() {}
  disconnect() {}
}

class FakeResizeObserver {
  constructor(callback: () => void) {
    resizeCallbacks.push(callback);
  }
  observe() {}
  disconnect() {}
}

/** Light DOM ciktisini Lit isaretlerinden ve bosluk farklarindan arindirir. */
function normalizedHtml(el: Element): string {
  return el.innerHTML
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

const settle = async (el: TucbsMapPreview) => {
  for (let i = 0; i < 5; i++) {
    await el.updateComplete;
    await Promise.resolve();
  }
};

/** Bileseni sabit id ile DOM'a ekler (istege bagli ozelliklerle). */
async function mount(props: Partial<TucbsMapPreview> & Record<string, unknown> = {}) {
  const el = document.createElement("tucbs-map-preview") as TucbsMapPreview;
  el.id = "pv";
  Object.assign(el, props);
  document.body.appendChild(el);
  await settle(el);
  return el;
}

/** Bileseni gorunur yapip Map kurulumunu bekler. */
async function activate(el: TucbsMapPreview) {
  intersect(true);
  await settle(el);
  return core.maps.at(-1)!;
}

const WMS = { layerType: "WMS", options: { id: "wms-1", title: "W", url: "https://srv.test/wms", layers: "a" } } as const;
const WFS = { layerType: "WFS", options: { id: "wfs-1", title: "F", url: "https://srv.test/wfs", typeName: "b" } } as const;

beforeEach(() => {
  core.maps = [];
  resizeCallbacks = [];
  core.ensureEffectiveApiKeyValid.mockReset().mockResolvedValue(undefined);
  core.unregister.mockReset();
  core.registerApiKeyRefresh.mockReset().mockReturnValue(core.unregister);
  pool.activate.mockReset();
  pool.touch.mockReset();
  pool.release.mockReset();
  zoom.zoomInProportional.mockReset();
  zoom.zoomOutProportional.mockReset();
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  vi.stubGlobal("ResizeObserver", FakeResizeObserver);
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("TucbsMapPreview render ciktisi (karakterizasyon -- Faz 3.5a)", () => {
  it("pasif: gomulu <style> + boyutlu onizleme kutusu + placeholder", async () => {
    const el = await mount({ width: "320px", height: "220px" });
    expect(normalizedHtml(el)).toMatchSnapshot();
  });

  it("aktif: zoom butonlari ve harita konteyneri", async () => {
    const el = await mount();
    await activate(el);
    // <style> blogu pasif snapshot'ta donduruldu; burada yalniz kutu.
    expect(normalizedHtml(el.querySelector(".preview-box")!)).toMatchSnapshot();
  });

  it("show-zoom-buttons='false' zoom butonlarini gizler; baska her deger gosterir", async () => {
    const el = await mount();
    el.setAttribute("show-zoom-buttons", "false");
    await activate(el);
    expect(el.querySelector(".zoom-controls")).toBeNull();
    el.setAttribute("show-zoom-buttons", "");
    await settle(el);
    expect(el.querySelectorAll(".zoom-button")).toHaveLength(2);
  });

  it("<style> etiketi tek ve Light DOM'da; shadow root yok", async () => {
    const el = await mount();
    expect(el.shadowRoot).toBeNull();
    expect(el.querySelectorAll(":scope > style")).toHaveLength(1);
  });
});

describe("TucbsMapPreview lazy-mount yasam dongusu (karakterizasyon -- Faz 3.5a)", () => {
  it("gorununce havuza kaydolur, Map'i harita konteynerinde ve onizleme ayarlariyla kurar", async () => {
    const el = await mount();
    expect(core.maps).toHaveLength(0);
    const map = await activate(el);

    expect(pool.activate).toHaveBeenCalledWith("pv", expect.any(Function));
    expect(map.container).toBe(el.querySelector("#pv-host"));
    expect(map.options).toEqual({
      timeline: false,
      animation: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: false,
    });
    expect(map.calls.slice(0, 2)).toEqual(["setMode:2D", "setQuality:75"]);
    expect(String(map.viewer.scene.globe.baseColor)).toBe("(0.9568627450980393, 0.9568627450980393, 0.9568627450980393, 1)");
    expect(core.registerApiKeyRefresh).toHaveBeenCalledTimes(1);
    expect(el.map).toBe(map);
  });

  it("apiKey verilmisse Map'e gecirilir; disaridan okuma maskelenir", async () => {
    const el = await mount({ apiKey: "gizli" } as never);
    const map = await activate(el);
    expect(map.options.apiKey).toBe("gizli");
    expect(el.apiKey).toBe("••••••");
  });

  it("zaten aktifken tekrar gorununce yalniz havuzda tazelenir", async () => {
    const el = await mount();
    await activate(el);
    intersect(true);
    await settle(el);
    expect(pool.touch).toHaveBeenCalledWith("pv");
    expect(core.maps).toHaveLength(1);
  });

  it("gorunumden cikinca havuzdan ayrilir, Map yok edilir, placeholder doner", async () => {
    const el = await mount();
    const map = await activate(el);
    intersect(false);
    await settle(el);
    expect(pool.release).toHaveBeenCalledWith("pv");
    expect(map.calls.at(-1)).toBe("destroy");
    expect(core.unregister).toHaveBeenCalledTimes(1);
    expect(el.map).toBeNull();
    expect(el.querySelector(".placeholder")).not.toBeNull();
  });

  it("havuz tahliye ederse (onEvict) havuza bildirmeden pasiflesir", async () => {
    const el = await mount();
    const map = await activate(el);
    const onEvict = pool.activate.mock.calls[0]![1] as () => void;
    onEvict();
    await settle(el);
    expect(map.calls.at(-1)).toBe("destroy");
    expect(pool.release).not.toHaveBeenCalled();
    expect(el.querySelector(".placeholder")).not.toBeNull();
  });

  it("DOM'dan kaldirilinca havuzdan ayrilir ve Map yok edilir", async () => {
    const el = await mount();
    const map = await activate(el);
    el.remove();
    expect(pool.release).toHaveBeenCalledWith("pv");
    expect(map.calls.at(-1)).toBe("destroy");
  });

  it("her boyut degisiminde resize + varsayilan gorunume sigdirma", async () => {
    const el = await mount();
    const map = await activate(el);
    map.calls.length = 0;
    resizeCallbacks.at(-1)!();
    expect(map.calls).toEqual(["resize", "setExtent:DEFAULT"]);
  });

  it("mode degisince Map.setMode cagrilir", async () => {
    const el = await mount();
    const map = await activate(el);
    el.mode = "3D";
    await settle(el);
    expect(map.calls).toContain("setMode:3D");
  });
});

describe("TucbsMapPreview basemap apiKey kapisi (karakterizasyon -- Faz 3.5a)", () => {
  it("acik (HGM olmayan) altlik dogrulamasiz uygulanir", async () => {
    const el = await mount({ basemap: "https://tile.test/{z}/{x}/{y}.png" } as never);
    const map = await activate(el);
    expect(core.ensureEffectiveApiKeyValid).not.toHaveBeenCalled();
    expect(map.calls).toContain("setBasemap:https://tile.test/{z}/{x}/{y}.png");
  });

  it("HGM altlik: dogrulama basariliysa uygulanir, uyari yok", async () => {
    const el = await mount({ apiKey: "k" } as never);
    const map = await activate(el);
    expect(core.ensureEffectiveApiKeyValid).toHaveBeenCalledWith("k", expect.any(String));
    expect(map.calls).toContain("setBasemap:hgm-temel");
    expect(el.querySelector(".basemap-blocked-overlay")).toBeNull();
  });

  it("HGM altlik, hic apiKey yok ve katman yok: altlik kaldirilir, uyari karti gosterilir", async () => {
    core.ensureEffectiveApiKeyValid.mockRejectedValue(new ApiKeyValidationError("yok", { reason: "missing-key" }));
    const el = await mount();
    const map = await activate(el);
    expect(map.calls).toContain("setBasemap:null");
    expect(el.querySelector(".basemap-blocked-overlay")?.textContent?.replace(/\s+/g, " ").trim()).toBe(
      "API Anahtarı Eksik Bu altlık harita için geçerli bir apiKey gereklidir.",
    );
  });

  it("HGM altlik, hic apiKey yok ama acik bir katman onizleniyor: altlik sessizce atlanir", async () => {
    core.ensureEffectiveApiKeyValid.mockRejectedValue(new ApiKeyValidationError("yok", { reason: "missing-key" }));
    const el = await mount({ layerOptions: WMS } as never);
    const map = await activate(el);
    expect(map.calls).toContain("setBasemap:null");
    expect(el.querySelector(".basemap-blocked-overlay")).toBeNull();
  });

  it("apiKey verilmis ama gecersizse katman olsa da uyari gosterilir", async () => {
    core.ensureEffectiveApiKeyValid.mockRejectedValue(new ApiKeyValidationError("gecersiz", { reason: "invalid" }));
    const el = await mount({ apiKey: "k", layerOptions: WMS } as never);
    await activate(el);
    expect(el.querySelector(".basemap-blocked-overlay")).not.toBeNull();
  });

  it("apiKey yenilenince (registerApiKeyRefresh) altlik yeniden denenir", async () => {
    core.ensureEffectiveApiKeyValid.mockRejectedValueOnce(new ApiKeyValidationError("yok", { reason: "missing-key" }));
    const el = await mount();
    const map = await activate(el);
    expect(el.querySelector(".basemap-blocked-overlay")).not.toBeNull();
    const refresh = core.registerApiKeyRefresh.mock.calls[0]![0] as () => void;
    refresh();
    await settle(el);
    expect(map.calls.at(-1)).toBe("setBasemap:hgm-temel");
    expect(el.querySelector(".basemap-blocked-overlay")).toBeNull();
  });
});

describe("TucbsMapPreview katman senkronu (karakterizasyon -- Faz 3.5a)", () => {
  it("katman yoksa varsayilan gorunume sigdirilir", async () => {
    const el = await mount();
    const map = await activate(el);
    expect(map.layerManager.add).not.toHaveBeenCalled();
    expect(map.calls).toContain("setExtent:DEFAULT");
  });

  it("layerOptions, layer'a gore onceliklidir; tur bazinda LayerManager.add'e gecirilir", async () => {
    const el = await mount({ layer: WFS, layerOptions: WMS } as never);
    const map = await activate(el);
    expect(map.layerManager.add.mock.calls).toEqual([["WMS", WMS.options]]);
  });

  it("layer-options attribute'u JSON olarak okunur", async () => {
    const el = document.createElement("tucbs-map-preview") as TucbsMapPreview;
    el.id = "pv";
    el.setAttribute("layer-options", JSON.stringify(WFS));
    document.body.appendChild(el);
    const map = await activate(el);
    expect(map.layerManager.add.mock.calls).toEqual([["WFS", WFS.options]]);
  });

  it("katman eklenirken yukleniyor gostergesi gorunur; bitince kalkar", async () => {
    const el = await mount({ layerOptions: WFS } as never);
    let finish!: (value: unknown) => void;
    intersect(true);
    await el.updateComplete;
    const map = core.maps.at(-1)!;
    // Ilk add cagrisi zaten cozuldu; ikinci katmani bekletip gostergeyi olc.
    await settle(el);
    map.layerManager.add.mockImplementationOnce(() => new Promise((resolve) => (finish = resolve)));
    el.layerOptions = WMS as never;
    await settle(el);
    expect(el.querySelector(".loading-overlay .spinner")).not.toBeNull();
    finish({ id: "wms-1", cesiumObject: {} });
    await settle(el);
    expect(el.querySelector(".loading-overlay")).toBeNull();
  });

  it("katman degisince eski katman yeni katman eklendikten SONRA kaldirilir", async () => {
    const el = await mount({ layerOptions: WFS } as never);
    const map = await activate(el);
    el.layerOptions = WMS as never;
    await settle(el);
    const order = [
      ...map.layerManager.add.mock.invocationCallOrder.map((n, i) => [n, `add:${map.layerManager.add.mock.calls[i]![0]}`] as const),
      ...map.layerManager.removeLayer.mock.invocationCallOrder.map(
        (n, i) => [n, `remove:${map.layerManager.removeLayer.mock.calls[i]![0]}`] as const,
      ),
    ]
      .sort((a, b) => a[0] - b[0])
      .map(([, label]) => label);
    expect(order).toEqual(["add:WFS", "add:WMS", "remove:wfs-1"]);
  });

  it("katman kaldirilinca (layerOptions undefined) kaldirilir ve varsayilan gorunume donulur", async () => {
    const el = await mount({ layerOptions: WFS } as never);
    const map = await activate(el);
    map.calls.length = 0;
    el.layerOptions = undefined;
    await settle(el);
    expect(map.layerManager.removeLayer).toHaveBeenCalledWith("wfs-1");
    expect(map.calls).toContain("setExtent:DEFAULT");
  });

  it("zoomToLayer: yerel kapsamli katmana yaklasir; yaklasilamazsa varsayilan gorunum", async () => {
    const el = await mount({ layerOptions: WFS, zoomToLayer: true } as never);
    const map = await activate(el);
    expect(map.layerManager.zoomToLayer).toHaveBeenCalledWith("wfs-1");
    expect(map.calls).not.toContain("setExtent:DEFAULT");

    map.layerManager.zoomToLayer.mockResolvedValueOnce(false);
    el.layerOptions = WMS as never;
    await settle(el);
    expect(map.calls.at(-1)).toBe("setExtent:DEFAULT");
  });

  it("zoomToLayer: kuresel kapsamli imagery katmanina yaklasilmaz, varsayilan gorunum kullanilir", async () => {
    const el = await mount({ zoomToLayer: true } as never);
    const map = await activate(el);
    map.layerManager.add.mockResolvedValueOnce({
      id: "wms-1",
      cesiumObject: { imageryProvider: { rectangle: { west: -Math.PI, east: Math.PI, south: -1.5, north: 1.5 } } },
    });
    el.layerOptions = WMS as never;
    await settle(el);
    expect(map.layerManager.zoomToLayer).not.toHaveBeenCalled();
    expect(map.calls.at(-1)).toBe("setExtent:DEFAULT");
  });
});

describe("TucbsMapPreview zoom butonlari (karakterizasyon -- Faz 3.5a)", () => {
  it("yakinlastir/uzaklastir oransal yardimcilari 0.5 orani ve kamera sinirlariyla cagirir", async () => {
    const el = await mount();
    const map = await activate(el);
    const [zoomIn, zoomOut] = [...el.querySelectorAll<HTMLButtonElement>(".zoom-button")];
    zoomIn!.click();
    zoomOut!.click();
    expect(zoom.zoomInProportional).toHaveBeenCalledWith(map.viewer.camera, 0.5, 1);
    expect(zoom.zoomOutProportional).toHaveBeenCalledWith(map.viewer.camera, 0.5, 2);
  });
});
