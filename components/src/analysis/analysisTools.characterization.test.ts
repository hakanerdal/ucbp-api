// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Klasor yapisi ve seçici bölme planı, Faz 0.4-c.
// TucbsBufferTool ile TucbsIntersectionTool'un (Faz 2.3'te ortak harita
// baglama kismi AnalysisMapBinding controller'ina, ortak CSS
// analysisToolStyles.ts'e alinacak) MEVCUT davranisini dondurur:
//   - harita baglama/cozme sirasi (entity:click dinleme, identify
//     duraklatma/devam ettirme, secim vurgusunun temizlenmesi),
//   - 'ready' olayinda host'ta hala harita yoksa dinleyicinin YENIDEN
//     kurulmasi (11 aractaki "tek seferlik" davranistan FARKLI),
//   - secim, dogrulama, calistirma, basari/hata mesajlari ve olay detaylari.
//
// Entity'ler gercek Cesium Entity'leridir (entityToGeoJSON @tucbs/core'dan
// gercekten calisir); harita ise cagrilari sirasiyla kaydeden bir ikizdir.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Cartesian3, Entity, PolygonHierarchy } from "cesium";
import { AnalysisRequestError } from "@tucbs/core";
import * as toastUi from "../shared/ui/toast.js";
import "./TucbsBufferTool.js";
import "./TucbsIntersectionTool.js";
import type { TucbsBufferTool } from "./TucbsBufferTool.js";
import type { TucbsIntersectionTool } from "./TucbsIntersectionTool.js";

type Handler = (detail: { entity: Entity }) => void;

interface FakeAnalysisMap {
  /** Haritaya yapilan cagrilarin sirali kaydi (orn. "on:entity:click", "suspendIdentify"). */
  calls: string[];
  /** showSelectionHighlight'a her cagrida verilen feature listeleri. */
  highlights: unknown[][];
  /** InteractionManager'in entity:click olayini tetikler. */
  clickEntity(entity: Entity): void;
  /** Kayitli entity:click dinleyici sayisi. */
  listenerCount(): number;
  runBuffer: ReturnType<typeof vi.fn>;
  runIntersection: ReturnType<typeof vi.fn>;
  interactionManager: unknown;
  showSelectionHighlight(features: unknown[]): void;
  clearSelectionHighlight(): void;
}

/** Analiz araclarinin dokundugu Map yuzeyini taklit eden, cagrilari kaydeden ikiz. */
function createFakeAnalysisMap(): FakeAnalysisMap {
  const handlers = new Set<Handler>();
  const calls: string[] = [];
  const highlights: unknown[][] = [];
  return {
    calls,
    highlights,
    clickEntity: (entity) => [...handlers].forEach((handler) => handler({ entity })),
    listenerCount: () => handlers.size,
    runBuffer: vi.fn(async () => ({})),
    runIntersection: vi.fn(async () => ({})),
    interactionManager: {
      on: (event: string, handler: Handler) => {
        calls.push(`on:${event}`);
        handlers.add(handler);
      },
      off: (event: string, handler: Handler) => {
        calls.push(`off:${event}`);
        handlers.delete(handler);
      },
      suspendIdentify: () => calls.push("suspendIdentify"),
      resumeIdentify: () => calls.push("resumeIdentify"),
    },
    showSelectionHighlight: (features) => {
      highlights.push(features);
    },
    clearSelectionHighlight: () => calls.push("clearSelectionHighlight"),
  };
}

const pointEntity = () => new Entity({ id: "p1", position: Cartesian3.fromDegrees(30, 40) });
const polygonEntity = (id: string) =>
  new Entity({
    id,
    polygon: { hierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArray([30, 40, 31, 40, 31, 41])) },
  });
const emptyEntity = () => new Entity({ id: "bos" });

/** `tucbs-map` yerine gecen, id'li sahte host element. */
function addMapHost(id: string, map?: unknown): HTMLElement & { map?: unknown } {
  const host = document.createElement("div") as HTMLElement & { map?: unknown };
  host.id = id;
  if (map !== undefined) host.map = map;
  document.body.appendChild(host);
  return host;
}

const shadow = (el: Element) => el.shadowRoot!;
const statusText = (el: Element) => shadow(el).querySelector(".status")?.textContent?.trim() ?? "";
const runButton = (el: Element) => shadow(el).querySelector<HTMLButtonElement>("button.run")!;
const textInputs = (el: Element) =>
  [...shadow(el).querySelectorAll<HTMLInputElement>('input[type="text"]')].map((input) => input.value);

let errorSpy: ReturnType<typeof vi.spyOn>;
let toastSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  toastSpy = vi.spyOn(toastUi, "showToast").mockImplementation(() => {});
});

const lastToast = () => {
  const call = toastSpy.mock.calls.at(-1);
  return call ? String(call[1]) : "";
};

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe.each(["tucbs-buffer-tool", "tucbs-intersection-tool"])(
  "%s -- harita baglama (karakterizasyon)",
  (tag) => {
    async function mount(props: Record<string, unknown>) {
      const el = document.createElement(tag) as HTMLElement & { updateComplete: Promise<boolean> };
      Object.assign(el, props);
      document.body.appendChild(el);
      await el.updateComplete;
      return el;
    }

    // BILINEN DAVRANIS: connectedCallback haritaya baglanir, ardindan ilk
    // updated() "map"/"mapElementId"yi degismis sayip baglantiyi BIR KEZ
    // sokup yeniden kurar -- identify kisa sureligine devam edip tekrar
    // duraklar, vurgu temizlenir. Sonuc (tek dinleyici, identify duraklatilmis)
    // dogru; ara adimlar Faz 2.3'te AYNEN korunmali ya da ayri bir 🐞 commit'i
    // ile bilincli olarak degistirilmeli.
    const INITIAL_BIND_SEQUENCE = [
      "on:entity:click",
      "suspendIdentify",
      "off:entity:click",
      "clearSelectionHighlight",
      "resumeIdentify",
      "on:entity:click",
      "suspendIdentify",
    ];

    it("map property'si verilince entity:click'i dinler ve identify'i duraklatir", async () => {
      const map = createFakeAnalysisMap();
      await mount({ map });
      expect(map.calls).toEqual(INITIAL_BIND_SEQUENCE);
      expect(map.listenerCount()).toBe(1);
    });

    it("mapElementId'deki host map'i hazir tasiyorsa ona baglanir", async () => {
      const map = createFakeAnalysisMap();
      addMapHost("map", map);
      await mount({ mapElementId: "map" });
      expect(map.calls).toEqual(INITIAL_BIND_SEQUENCE);
      expect(map.listenerCount()).toBe(1);
    });

    it("'ready' geldiginde host'ta hala map yoksa dinleyiciyi YENIDEN kurar; sonraki 'ready'de baglanir", async () => {
      const host = addMapHost("map");
      await mount({ mapElementId: "map" });
      host.dispatchEvent(new Event("ready"));
      const map = createFakeAnalysisMap();
      host.map = map;
      host.dispatchEvent(new Event("ready"));
      expect(map.calls).toEqual(["on:entity:click", "suspendIdentify"]);
    });

    it("DOM'dan kaldirilinca dinlemeyi birakir, vurguyu temizler, identify'i devam ettirir", async () => {
      const map = createFakeAnalysisMap();
      const el = await mount({ map });
      map.calls.length = 0;
      el.remove();
      expect(map.calls).toEqual(["off:entity:click", "clearSelectionHighlight", "resumeIdentify"]);
      expect(map.listenerCount()).toBe(0);
    });

    it("map degisince eskisinden tamamen cozulur, yenisine baglanir", async () => {
      const first = createFakeAnalysisMap();
      const el = await mount({ map: first });
      const second = createFakeAnalysisMap();
      first.calls.length = 0;
      Object.assign(el, { map: second });
      await el.updateComplete;
      expect(first.calls).toEqual(["off:entity:click", "clearSelectionHighlight", "resumeIdentify"]);
      expect(second.calls).toEqual(["on:entity:click", "suspendIdentify"]);
    });
  },
);

describe("tucbs-buffer-tool -- secim, dogrulama, calistirma (karakterizasyon)", () => {
  async function mountBuffer(props: Partial<TucbsBufferTool> = {}) {
    const map = createFakeAnalysisMap();
    const el = document.createElement("tucbs-buffer-tool") as TucbsBufferTool;
    Object.assign(el, { map, ...props });
    document.body.appendChild(el);
    await el.updateComplete;
    return { el, map };
  }

  async function typeDistance(el: TucbsBufferTool, value: string) {
    const input = shadow(el).querySelector<HTMLInputElement>('input[type="number"]')!;
    input.value = value;
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;
  }

  async function select(el: TucbsBufferTool, map: FakeAnalysisMap, entity: Entity) {
    map.clickEntity(entity);
    await el.updateComplete;
  }

  it("baglanirken distanceM verilmisse mesafe kutusunu doldurur", async () => {
    const { el } = await mountBuffer({ distanceM: 100 });
    expect(shadow(el).querySelector<HTMLInputElement>('input[type="number"]')!.value).toBe("100");
  });

  it("nokta secilince etiketi gosterir ve secimi vurgular", async () => {
    const { el, map } = await mountBuffer();
    await select(el, map, pointEntity());
    expect(el.selectedLabel).toBe("Point p1");
    expect(textInputs(el)).toEqual(["= Point p1"]);
    expect(map.highlights.at(-1)).toEqual([
      expect.objectContaining({ type: "Feature", id: "p1", geometry: expect.objectContaining({ type: "Point" }) }),
    ]);
  });

  it("geometrisi olmayan entity secilince hata mesaji verir", async () => {
    const { el, map } = await mountBuffer();
    await select(el, map, emptyEntity());
    expect(lastToast()).toBe("Seçilen özellikten GeoJSON üretilemedi.");
    expect(toastSpy).toHaveBeenCalledWith("error", "Seçilen özellikten GeoJSON üretilemedi.");
  });

  it("calistir butonu secim ve mesafe olmadan pasiftir", async () => {
    const { el, map } = await mountBuffer();
    expect(runButton(el).disabled).toBe(true);
    await select(el, map, pointEntity());
    expect(runButton(el).disabled).toBe(true);
    await typeDistance(el, "250");
    expect(runButton(el).disabled).toBe(false);
  });

  it("secim kutusuna tiklama secime gore bilgi mesaji verir", async () => {
    const { el, map } = await mountBuffer();
    shadow(el).querySelector<HTMLInputElement>('input[type="text"]')!.click();
    await el.updateComplete;
    expect(lastToast()).toBe("Haritada bir noktaya, çizgiye veya alana tıklayın.");
    await select(el, map, pointEntity());
    shadow(el).querySelector<HTMLInputElement>('input[type="text"]')!.click();
    await el.updateComplete;
    expect(lastToast()).toBe("Seçili: Point p1");
  });

  it("yeniden sec butonu secimi ve vurguyu temizler", async () => {
    const { el, map } = await mountBuffer();
    await select(el, map, pointEntity());
    shadow(el).querySelector<HTMLButtonElement>("button.refresh")!.click();
    await el.updateComplete;
    expect(el.selectedLabel).toBe("");
    expect(lastToast()).toBe("Haritada bir noktaya / çizgiye / alana tıklayın.");
    expect(map.highlights.at(-1)).toEqual([]);
  });

  it("gecersiz mesafede calismaz ve uyarir", async () => {
    const { el, map } = await mountBuffer();
    await select(el, map, pointEntity());
    await typeDistance(el, "-5");
    runButton(el).click();
    await el.updateComplete;
    expect(lastToast()).toBe("Geçerli bir mesafe (metre) girin.");
    expect(map.runBuffer).not.toHaveBeenCalled();
  });

  it("secim yokken calistirilirsa uyarir (UI'dan ulasilamayan koruma -- dogrudan cagri)", async () => {
    const { el, map } = await mountBuffer();
    await (el as unknown as { _onRun(): Promise<void> })._onRun();
    await el.updateComplete;
    expect(lastToast()).toBe("Lütfen haritada bir nesne seçin.");
    expect(map.runBuffer).not.toHaveBeenCalled();
  });

  it("harita kopmussa 'Harita henüz hazır değil.' der", async () => {
    const { el, map } = await mountBuffer();
    await select(el, map, pointEntity());
    await typeDistance(el, "250");
    el.map = null;
    await el.updateComplete;
    runButton(el).click();
    await el.updateComplete;
    expect(lastToast()).toBe("Harita henüz hazır değil.");
  });

  it("basarili calistirmada olay yayar, runBuffer'i dogru argumanlarla cagirir, formu temizler", async () => {
    const { el, map } = await mountBuffer({ mapElementId: "" });
    const runEvents: CustomEvent[] = [];
    document.body.addEventListener("tucbs-buffer-run", (event) => runEvents.push(event as CustomEvent));
    await select(el, map, pointEntity());
    await typeDistance(el, "250");
    await el.updateComplete;
    map.calls.length = 0;

    runButton(el).click();
    await vi.waitFor(() => expect(lastToast()).toBe("Tampon katmanı eklendi."));

    expect(runEvents.map((event) => event.detail)).toEqual([
      { mapElementId: "", distanceM: 250, selectedLabel: "Point p1" },
    ]);
    expect(map.runBuffer).toHaveBeenCalledTimes(1);
    const [request, options] = map.runBuffer.mock.calls[0]!;
    expect(options).toEqual({ title: "Tampon sonucu (250m)" });
    expect(request.distanceM).toBe(250);
    expect(request.geojson).toMatchObject({ type: "Feature", id: "p1", properties: {} });
    expect(request.geojson.geometry.type).toBe("Point");
    expect(request.geojson.geometry.coordinates[0]).toBeCloseTo(30, 9);
    expect(request.geojson.geometry.coordinates[1]).toBeCloseTo(40, 9);

    expect(toastSpy).toHaveBeenCalledWith("success", "Tampon katmanı eklendi.");
    expect(el.selectedLabel).toBe("");
    expect(el.distanceM).toBeNull();
    expect(map.highlights.at(-1)).toEqual([]);
    // Basari identify'i GERI ACMAZ -- yalnizca aractan cikinca acilir.
    expect(map.calls).not.toContain("resumeIdentify");
  });

  it("baslik yalniz mesafeyi icerir", async () => {
    const { el, map } = await mountBuffer();
    await select(el, map, pointEntity());
    await typeDistance(el, "75");
    runButton(el).click();
    await vi.waitFor(() => expect(map.runBuffer).toHaveBeenCalled());
    expect(map.runBuffer.mock.calls[0]![1]).toEqual({ title: "Tampon sonucu (75m)" });
  });

  it("calisirken buton 'İşleniyor...' der ve ikinci calistirma yok sayilir", async () => {
    const { el, map } = await mountBuffer();
    let resolveRun!: () => void;
    map.runBuffer.mockImplementation(() => new Promise<void>((resolve) => (resolveRun = resolve)));
    await select(el, map, pointEntity());
    await typeDistance(el, "250");
    runButton(el).click();
    await el.updateComplete;
    expect(runButton(el).textContent?.trim()).toBe("İşleniyor...");
    expect(statusText(el)).toBe("İşleniyor…");
    await (el as unknown as { _onRun(): Promise<void> })._onRun();
    expect(map.runBuffer).toHaveBeenCalledTimes(1);
    resolveRun();
    await vi.waitFor(() => expect(lastToast()).toBe("Tampon katmanı eklendi."));
  });

  it.each([
    {
      name: "TucbsError: mesaj gosterilir ve kod/numara ile loglanir",
      error: new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", "Ağ hatası: kopuk"),
      message: "Ağ hatası: kopuk",
      logged: true,
    },
    { name: "duz Error: mesaj gosterilir, loglanmaz", error: new Error("patladi"), message: "patladi", logged: false },
    { name: "Error olmayan deger: varsayilan mesaj", error: "x", message: "Tampon üretimi başarısız.", logged: false },
  ])("hata -- $name", async ({ error, message, logged }) => {
    const { el, map } = await mountBuffer();
    map.runBuffer.mockRejectedValue(error);
    await select(el, map, pointEntity());
    await typeDistance(el, "250");
    runButton(el).click();
    await vi.waitFor(() => expect(lastToast()).toBe(message));
    expect(toastSpy).toHaveBeenCalledWith("error", message);
    if (logged) {
      const err = error as AnalysisRequestError;
      expect(errorSpy).toHaveBeenCalledWith(`[tucbs-buffer-tool] ${err.code} (${err.number}): ${err.message}`);
    } else {
      expect(errorSpy).not.toHaveBeenCalled();
    }
    // Hata sonrasi secim korunur (form temizlenmez).
    expect(el.selectedLabel).toBe("Point p1");
  });
});

describe("tucbs-intersection-tool -- secim, dogrulama, calistirma (karakterizasyon)", () => {
  async function mountIntersection() {
    const map = createFakeAnalysisMap();
    const el = document.createElement("tucbs-intersection-tool") as TucbsIntersectionTool;
    Object.assign(el, { map });
    document.body.appendChild(el);
    await el.updateComplete;
    return { el, map };
  }

  const slotInput = (el: Element, index: 0 | 1) =>
    shadow(el).querySelectorAll<HTMLInputElement>('input[type="text"]')[index]!;
  const refreshButton = (el: Element, index: 0 | 1) =>
    shadow(el).querySelectorAll<HTMLButtonElement>("button.refresh")[index]!;

  async function selectInto(el: TucbsIntersectionTool, map: FakeAnalysisMap, index: 0 | 1, entity: Entity) {
    slotInput(el, index).click();
    await el.updateComplete;
    map.clickEntity(entity);
    await el.updateComplete;
  }

  it("bir slot secim beklemiyorken entity tiklamasi yok sayilir", async () => {
    const { el, map } = await mountIntersection();
    map.clickEntity(polygonEntity("a"));
    await el.updateComplete;
    expect(textInputs(el)).toEqual(["", ""]);
    expect(map.highlights).toEqual([]);
  });

  it("slot kutusuna tiklama ilgili secim mesajini verir", async () => {
    const { el } = await mountIntersection();
    slotInput(el, 0).click();
    await el.updateComplete;
    expect(lastToast()).toBe("Lütfen ilk poligonu seçin — haritada bir alana tıklayın.");
    slotInput(el, 1).click();
    await el.updateComplete;
    expect(lastToast()).toBe("Lütfen ikinci poligonu seçin — haritada bir alana tıklayın.");
  });

  it("iki poligon secilince etiketler dolar, ikisi birlikte vurgulanir, buton aktiflesir", async () => {
    const { el, map } = await mountIntersection();
    await selectInto(el, map, 0, polygonEntity("a"));
    expect(textInputs(el)).toEqual(["= Polygon a", ""]);
    expect(map.highlights.at(-1)).toHaveLength(1);
    expect(runButton(el).disabled).toBe(true);
    await selectInto(el, map, 1, polygonEntity("b"));
    expect(textInputs(el)).toEqual(["= Polygon a", "= Polygon b"]);
    expect(map.highlights.at(-1)).toHaveLength(2);
    expect(statusText(el)).toBe("");
    expect(runButton(el).disabled).toBe(false);
  });

  it("poligon olmayan secim reddedilir, slot secim beklemeye devam eder", async () => {
    const { el, map } = await mountIntersection();
    await selectInto(el, map, 0, pointEntity());
    expect(lastToast()).toBe("Kesişim için yalnızca poligon seçin.");
    expect(textInputs(el)).toEqual(["", ""]);
    map.clickEntity(polygonEntity("a"));
    await el.updateComplete;
    expect(textInputs(el)).toEqual(["= Polygon a", ""]);
  });

  it("geometrisi olmayan entity secilince hata mesaji verir", async () => {
    const { el, map } = await mountIntersection();
    await selectInto(el, map, 0, emptyEntity());
    expect(lastToast()).toBe("Seçilen özellikten GeoJSON üretilemedi.");
  });

  it("yeniden sec butonu yalnizca o slotu temizleyip yeniden secime gecer", async () => {
    const { el, map } = await mountIntersection();
    await selectInto(el, map, 0, polygonEntity("a"));
    await selectInto(el, map, 1, polygonEntity("b"));
    refreshButton(el, 1).click();
    await el.updateComplete;
    expect(textInputs(el)).toEqual(["= Polygon a", ""]);
    expect(lastToast()).toBe("Lütfen ikinci poligonu seçin — haritada bir alana tıklayın.");
    expect(map.highlights.at(-1)).toHaveLength(1);
  });

  it("veri kumesi anahtari henuz desteklenmiyor mesaji verir", async () => {
    const { el } = await mountIntersection();
    shadow(el).querySelector<HTMLButtonElement>("button.switch")!.click();
    await el.updateComplete;
    expect(lastToast()).toBe("Veri kümesi seçimi bu sürümde henüz desteklenmiyor.");
  });

  it("iki poligon yokken calistirilirsa uyarir (UI'dan ulasilamayan koruma -- dogrudan cagri)", async () => {
    const { el, map } = await mountIntersection();
    await (el as unknown as { _onRun(): Promise<void> })._onRun();
    await el.updateComplete;
    expect(lastToast()).toBe("Her iki seçim de poligon olmalıdır.");
    expect(map.runIntersection).not.toHaveBeenCalled();
  });

  it("harita kopmussa 'Harita henüz hazır değil.' der", async () => {
    const { el, map } = await mountIntersection();
    await selectInto(el, map, 0, polygonEntity("a"));
    await selectInto(el, map, 1, polygonEntity("b"));
    el.map = null;
    await el.updateComplete;
    runButton(el).click();
    await el.updateComplete;
    expect(lastToast()).toBe("Harita henüz hazır değil.");
  });

  it("basarili calistirmada olay yayar, runIntersection'i dogru argumanlarla cagirir, formu temizler", async () => {
    const { el, map } = await mountIntersection();
    const runEvents: CustomEvent[] = [];
    document.body.addEventListener("tucbs-intersection-run", (event) => runEvents.push(event as CustomEvent));
    await selectInto(el, map, 0, polygonEntity("a"));
    await selectInto(el, map, 1, polygonEntity("b"));
    map.calls.length = 0;

    runButton(el).click();
    await vi.waitFor(() => expect(lastToast()).toBe("Kesişim tamamlandı."));

    expect(runEvents.map((event) => event.detail)).toEqual([
      { mapElementId: "", labelA: "Polygon a", labelB: "Polygon b" },
    ]);
    expect(map.runIntersection).toHaveBeenCalledTimes(1);
    const [request, options] = map.runIntersection.mock.calls[0]!;
    expect(options).toEqual({ title: "Kesişim sonucu" });
    expect(request.geojsonA).toMatchObject({ type: "Feature", id: "a", geometry: { type: "Polygon" } });
    expect(request.geojsonB).toMatchObject({ type: "Feature", id: "b", geometry: { type: "Polygon" } });
    expect(request.geojsonA.geometry.coordinates[0]).toHaveLength(4);

    expect(toastSpy).toHaveBeenCalledWith("success", "Kesişim tamamlandı.");
    expect(textInputs(el)).toEqual(["", ""]);
    expect(map.highlights.at(-1)).toEqual([]);
    expect(map.calls).not.toContain("resumeIdentify");
  });

  it.each([
    {
      name: "TucbsError: mesaj gosterilir ve kod/numara ile loglanir",
      error: new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", "İstek başarısız (HTTP 500)"),
      message: "İstek başarısız (HTTP 500)",
      logged: true,
    },
    { name: "duz Error: mesaj gosterilir, loglanmaz", error: new Error("patladi"), message: "patladi", logged: false },
    { name: "Error olmayan deger: varsayilan mesaj", error: 42, message: "Kesişim hesaplanamadı.", logged: false },
  ])("hata -- $name", async ({ error, message, logged }) => {
    const { el, map } = await mountIntersection();
    map.runIntersection.mockRejectedValue(error);
    await selectInto(el, map, 0, polygonEntity("a"));
    await selectInto(el, map, 1, polygonEntity("b"));
    runButton(el).click();
    await vi.waitFor(() => expect(lastToast()).toBe(message));
    expect(toastSpy).toHaveBeenCalledWith("error", message);
    if (logged) {
      const err = error as AnalysisRequestError;
      expect(errorSpy).toHaveBeenCalledWith(`[tucbs-intersection-tool] ${err.code} (${err.number}): ${err.message}`);
    } else {
      expect(errorSpy).not.toHaveBeenCalled();
    }
    expect(textInputs(el)).toEqual(["= Polygon a", "= Polygon b"]);
  });
});
