// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Klasor yapisi ve seçici bölme planı, Faz 0.4-a.
// 11 aracin `firstUpdated()` icindeki birebir kopya "mapElementId ile
// haritaya baglan" blogunun (Faz 2.1'de tek bir yardimciya indirilecek)
// MEVCUT davranisini, araca ozgu farklarla birlikte dondurur:
//   - uyari metinleri (arac tag'i, "islevsiz"/"gizli kalacak" eki,
//     TucbsAnalysisTool'un farkli metinleri),
//   - "mapElementId yok" uyarisinin zamanlamasi (9 arac bir kare erteler,
//     TucbsSettingsTool ve TucbsPrintTool SENKRON uyarir),
//   - "ready" dinleyicisinin `once` olmasi.
//
// `map` olarak createDeepStub kullanilir: araclarin updated()'i atanan
// haritanin derinliklerine erisiyor; burada yalnizca kimlik (===) dogrulanir.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LitElement } from "lit";
import { createDeepStub } from "./fixtures/deepStub.js";
import "../analysis/TucbsAnalysisTool.js";
import "../tools/TucbsBasemapPicker.js";
import "../tools/TucbsDeleteTool.js";
import "../tools/TucbsDrawTool.js";
import "../tools/TucbsGoToCoordinate.js";
import "../tools/TucbsMapExport.js";
import "../tools/TucbsMeasureTool.js";
import "../print/TucbsPrintTool.js";
import "../app/TucbsQualityBar.js";
import "../tools/TucbsSettingsTool.js";
import "../tools/TucbsZoomTool.js";

type ToolElement = LitElement & { map?: unknown; mapElementId: string };

interface ToolCase {
  /** Custom element tag'i. */
  tag: string;
  /** "mapElementId yok" uyarisi bir kare sonra mi ("raf") yoksa hemen mi ("sync") basiliyor. */
  noIdTiming: "raf" | "sync";
  /** "mapElementId yok" uyarisinin birebir metni. */
  noIdMessage: string;
  /** "mapElementId ile element bulunamadi" uyarisinin birebir metni. */
  missingElementMessage: (id: string) => string;
}

const standard = (tag: string, suffix: "islevsiz" | "gizli", noIdTiming: "raf" | "sync" = "raf"): ToolCase => ({
  tag,
  noIdTiming,
  noIdMessage: `[${tag}] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin ${suffix} kalacak.`,
  missingElementMessage: (id) =>
    `[${tag}] mapElementId="${id}" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin ${suffix} kalacak.`,
});

const CASES: ToolCase[] = [
  {
    tag: "tucbs-analysis-tool",
    noIdTiming: "raf",
    noIdMessage:
      '[tucbs-analysis-tool] "mapElementId" verilmedi ve "map" atanmadı; analiz paneli haritaya bağlanamayabilir.',
    missingElementMessage: (id) => `[tucbs-analysis-tool] mapElementId="${id}" bulunamadı.`,
  },
  standard("tucbs-basemap-picker", "gizli"),
  standard("tucbs-delete-tool", "islevsiz"),
  standard("tucbs-draw-tool", "islevsiz"),
  standard("tucbs-goto-coordinate", "islevsiz"),
  standard("tucbs-map-export", "islevsiz"),
  standard("tucbs-measure-tool", "islevsiz"),
  standard("tucbs-print-tool", "islevsiz", "sync"),
  standard("tucbs-quality-bar", "gizli"),
  standard("tucbs-settings-tool", "islevsiz", "sync"),
  standard("tucbs-zoom-tool", "islevsiz"),
];

/** Bir sonraki animasyon karesini bekler (aracin kendi rAF'i ondan once kaydedildigi icin once o calisir). */
const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

let warnSpy: ReturnType<typeof vi.spyOn>;

/** Yalnizca ilgili aracin `[tag]` onekli uyarilarini dondurur (Lit dev-mode vb. uyarilari ayiklanir). */
function toolWarnings(tag: string): string[] {
  return warnSpy.mock.calls
    .map((args) => String(args[0]))
    .filter((message) => message.startsWith(`[${tag}]`));
}

/** Araci olusturur, istege bagli property'lerini atar, DOM'a ekler ve ilk render'i bekler. */
async function mount(tag: string, props: Partial<ToolElement> = {}): Promise<ToolElement> {
  const el = document.createElement(tag) as ToolElement;
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/** `tucbs-map` yerine gecen, id'li sahte host element; `map` sonradan atanabilir. */
function addMapHost(id: string, map?: unknown): HTMLElement & { map?: unknown } {
  const host = document.createElement("div") as HTMLElement & { map?: unknown };
  host.id = id;
  if (map !== undefined) host.map = map;
  document.body.appendChild(host);
  return host;
}

beforeEach(() => {
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  document.body.innerHTML = "";
  warnSpy.mockRestore();
});

describe.each(CASES)("$tag -- mapElementId ile haritaya baglanma (karakterizasyon)", (tc) => {
  it("map property olarak verilmisse mapElementId'ye hic bakmaz, uyari basmaz", async () => {
    const map = createDeepStub("map");
    const el = await mount(tc.tag, { map, mapElementId: "olmayan-id" });
    await nextFrame();
    expect(el.map).toBe(map);
    expect(toolWarnings(tc.tag)).toEqual([]);
  });

  it("host element map'i HAZIR tasiyorsa hemen baglanir", async () => {
    const map = createDeepStub("map");
    addMapHost("map", map);
    const el = await mount(tc.tag, { mapElementId: "map" });
    expect(el.map).toBe(map);
    expect(toolWarnings(tc.tag)).toEqual([]);
  });

  it("host element map'i henuz tasimiyorsa 'ready' olayinda baglanir; dinleyici tek seferliktir", async () => {
    const host = addMapHost("map");
    const el = await mount(tc.tag, { mapElementId: "map" });
    expect(el.map).toBeUndefined();

    const first = createDeepStub("first");
    host.map = first;
    host.dispatchEvent(new Event("ready"));
    await el.updateComplete;
    expect(el.map).toBe(first);

    host.map = createDeepStub("second");
    host.dispatchEvent(new Event("ready"));
    await el.updateComplete;
    expect(el.map).toBe(first);
    expect(toolWarnings(tc.tag)).toEqual([]);
  });

  it("'ready' geldiginde host'ta hala map yoksa baglanmaz ve dinleyici tukenir", async () => {
    const host = addMapHost("map");
    const el = await mount(tc.tag, { mapElementId: "map" });

    host.dispatchEvent(new Event("ready"));
    host.map = createDeepStub("late");
    host.dispatchEvent(new Event("ready"));
    await el.updateComplete;
    expect(el.map).toBeUndefined();
  });

  it("mapElementId ile element bulunamazsa hemen, birebir metinle uyarir", async () => {
    const el = await mount(tc.tag, { mapElementId: "olmayan-id" });
    expect(el.map).toBeUndefined();
    expect(toolWarnings(tc.tag)).toEqual([tc.missingElementMessage("olmayan-id")]);
  });

  it(`mapElementId ve map ikisi de yoksa uyarir (zamanlama: ${tc.noIdTiming})`, async () => {
    await mount(tc.tag);
    if (tc.noIdTiming === "sync") {
      expect(toolWarnings(tc.tag)).toEqual([tc.noIdMessage]);
    } else {
      expect(toolWarnings(tc.tag)).toEqual([]);
      await nextFrame();
      expect(toolWarnings(tc.tag)).toEqual([tc.noIdMessage]);
    }
  });

  if (tc.noIdTiming === "raf") {
    it("ilk kare icinde map programatik atanirsa ertelenmis uyari basilmaz", async () => {
      const el = await mount(tc.tag);
      el.map = createDeepStub("parent-map");
      await nextFrame();
      expect(toolWarnings(tc.tag)).toEqual([]);
    });
  }
});
