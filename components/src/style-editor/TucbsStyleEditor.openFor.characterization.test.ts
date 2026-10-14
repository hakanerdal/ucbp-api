// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Klasor yapisi ve seçici bölme planı, Faz 0.4-g.
// TucbsStyleEditor.openFor()'un (karmasiklik 27 -- Faz 3.1'de form durumu
// hesabi fillStyleSpec.ts'e saf bir deriveStyleEditorState() fonksiyonu
// olarak cikarilacak) katmanin mevcut stilinden turettigi FORM DURUMUNU ve
// yan etkilerini dondurur.
//
// Form durumu, bilesenin reaktif (private) state alanlarindan okunur: bu
// alanlar Faz 3.1'de de bilesende kalacak (yeni fonksiyon yalnizca degerleri
// hesaplayip dondurecek), dolayisiyla bu test refactor boyunca gecerlidir.
import { afterEach, describe, expect, it, vi } from "vitest";
import type { LayerStyleSpec } from "@tucbs/core";
import "./TucbsStyleEditor.js";
import type { TucbsStyleEditor } from "./TucbsStyleEditor.js";
import { createFakeLayerManager, type FakeLayerManagerOptions } from "../__tests__/fixtures/fakeLayerManager.js";

const FORM_FIELDS = [
  "_colorMode",
  "_fillColor",
  "_fillOpacity",
  "_dataColumn",
  "_gradientPalette",
  "_paletteReversed",
  "_gradientMin",
  "_gradientMax",
  "_binCount",
  "_categorySort",
  "_categoryValues",
  "_categoryColors",
  "_outlineEnabled",
  "_outlineColor",
  "_outlineWidth",
] as const;

/** Bilesenin openFor()'un yazdigi form alanlarini duz bir nesne olarak okur. */
function formState(el: TucbsStyleEditor): Record<string, unknown> {
  const record = el as unknown as Record<string, unknown>;
  return Object.fromEntries(FORM_FIELDS.map((field) => [field.slice(1), record[field]]));
}

const DEFAULT_FORM = {
  colorMode: "solid",
  fillColor: "#1ecfb0",
  fillOpacity: 46,
  dataColumn: "",
  gradientPalette: "Viridis",
  paletteReversed: false,
  gradientMin: "",
  gradientMax: "",
  binCount: "5",
  categorySort: "asc",
  categoryValues: [],
  categoryColors: {},
  outlineEnabled: true,
  outlineColor: "#1a73e8",
  outlineWidth: "2",
};

const OUTLINE = { enabled: false, color: "#abcdef", width: 3 };
const PLASMA = ["#0d0887", "#6a00a8", "#b12a90", "#e16462", "#fca636", "#f0f921"];

/** Editoru DOM'a ekler, verilen secenekli sahte yoneticiyle openFor() cagirir. */
async function openWith(
  options: FakeLayerManagerOptions,
  args: { type?: string; initialFill?: string; initialOpacity?: number } = {},
): Promise<TucbsStyleEditor> {
  const el = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
  document.body.appendChild(el);
  el.layerManager = createFakeLayerManager(options);
  el.openFor("layer-1", "Katman", (args.type ?? "GEOJSON") as never, args.initialFill, args.initialOpacity);
  await el.updateComplete;
  return el;
}

const withStyle = (fill: LayerStyleSpec["fill"], outline = OUTLINE): LayerStyleSpec => ({ fill, outline });

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("TucbsStyleEditor.openFor -- form durumu (karakterizasyon)", () => {
  it("stil ve baslangic rengi yoksa tum alanlar varsayilan", async () => {
    const el = await openWith({});
    expect(formState(el)).toEqual(DEFAULT_FORM);
    expect(el.open).toBe(true);
    expect([el.layerId, el.layerTitle, el.layerType]).toEqual(["layer-1", "Katman", "GEOJSON"]);
  });

  it("stil yoksa baslangic rengi/opakligi kullanilir (hsl -> hex, 0-1 -> yuzde)", async () => {
    const el = await openWith({}, { initialFill: "hsl(0, 100%, 50%)", initialOpacity: 0.254 });
    expect(formState(el)).toMatchObject({ fillColor: "#ff0000", fillOpacity: 25 });
  });

  it("solid stil baslangic degerlerinden ONCELIKLIDIR; dis hat stilden gelir", async () => {
    const el = await openWith(
      { layerStyle: withStyle({ mode: "solid", color: "#112233", opacity: 0.5 }) },
      { initialFill: "#ffffff", initialOpacity: 1 },
    );
    expect(formState(el)).toEqual({
      ...DEFAULT_FORM,
      fillColor: "#112233",
      fillOpacity: 50,
      outlineEnabled: false,
      outlineColor: "#abcdef",
      outlineWidth: "3",
    });
  });

  it("gradient: kolon, adlandirilmis palet (ters cevrilmis) ve min/max geri yuklenir; dolgu opakligi YUKLENMEZ", async () => {
    const el = await openWith({
      layerStyle: withStyle({
        mode: "gradient",
        column: "nufus",
        palette: [...PLASMA].reverse(),
        min: 1,
        opacity: 0.8,
      }),
    });
    expect(formState(el)).toEqual({
      ...DEFAULT_FORM,
      colorMode: "gradient",
      dataColumn: "nufus",
      gradientPalette: "Plasma",
      paletteReversed: true,
      gradientMin: "1",
      gradientMax: "",
      outlineEnabled: false,
      outlineColor: "#abcdef",
      outlineWidth: "3",
    });
  });

  it("bin: taninmayan palet varsayilanda kalir, sinif sayisi metne cevrilir", async () => {
    const el = await openWith({
      layerStyle: withStyle({
        mode: "bin",
        column: "alan",
        palette: ["#000000", "#ffffff"],
        binCount: 7,
        min: 0,
        max: 100,
        opacity: 1,
      }),
    });
    expect(formState(el)).toMatchObject({
      colorMode: "bin",
      dataColumn: "alan",
      gradientPalette: "Viridis",
      paletteReversed: false,
      gradientMin: "0",
      gradientMax: "100",
      binCount: "7",
    });
  });

  it("enum: renkler kopyalanir, sayisal gorunen anahtarlar sayiya cevrilip artan siralanir", async () => {
    const colors = { "10": "#aa0000", "2": "#00aa00", x: "#0000aa", "07": "#111111" };
    const el = await openWith({ layerStyle: withStyle({ mode: "enum", column: "tur", colors, opacity: 1 }) });
    const state = formState(el);
    expect(state).toMatchObject({ colorMode: "enum", dataColumn: "tur", categoryColors: colors });
    expect(state.categoryColors).not.toBe(colors);
    // "07" sayiya CEVRILMEZ (String(7) !== "07"). Eskiden siralamada JS'in
    // karisik tur karsilastirmasi "07" < 10'u 7 < 10 olarak degerlendirip
    // [2, "07", 10, "x"] uretiyordu; gercek hatalar plani H4.3'ten beri
    // TucbsLegendPanel ile ayni kural (compareCategoryKeys) kullanilir:
    // "07" metin sayilir ve "07" < "2" (metin) oldugu icin basa gelir --
    // lejant paneli ayni anahtarlari ayni sirada gosterir.
    expect(state.categoryValues).toEqual(["07", 2, 10, "x"]);
  });

  it("off modunda kolon temizlenir", async () => {
    const el = await openWith({ layerStyle: withStyle({ mode: "off" } as LayerStyleSpec["fill"]) });
    expect(formState(el)).toMatchObject({ colorMode: "off", dataColumn: "" });
  });

  it("ikinci openFor onceki katmanin form durumunu tamamen sifirlar", async () => {
    const el = await openWith({
      layerStyle: withStyle({ mode: "enum", column: "tur", colors: { a: "#000000" }, opacity: 1 }),
    });
    el.layerManager = createFakeLayerManager({});
    el.openFor("layer-2", "Diger", "GEOJSON" as never);
    await el.updateComplete;
    expect(formState(el)).toEqual(DEFAULT_FORM);
  });
});

describe("TucbsStyleEditor.openFor -- yan etkiler (karakterizasyon)", () => {
  it("vektor katmanda kolonlari yukler: teknik kolonlar elenir, sayisal olanlar ayrilir; ozellik sayisi okunur", async () => {
    const el = await openWith({
      entityPropertyNames: ["ad", "nufus", "OBJECTID", "Shape_Length", "fid_1", "alan"],
      columnRanges: { nufus: { min: 0, max: 10 }, alan: { min: 1, max: 2 }, ad: null },
      featureCount: 42,
    });
    const record = el as unknown as Record<string, unknown>;
    expect(record._dataColumns).toEqual(["ad", "nufus", "alan"]);
    expect(record._numericDataColumns).toEqual(["nufus", "alan"]);
    expect(record._featureCount).toBe(42);
  });

  it("servis (WMS) katmaninda kolon yuklenmez", async () => {
    const el = await openWith({ entityPropertyNames: ["ad"], wmsStyles: [] }, { type: "WMS" });
    expect((el as unknown as Record<string, unknown>)._dataColumns).toEqual([]);
  });

  it("sayfadaki tum tucbs-identify-panel'leri kapatir", async () => {
    const panels = [0, 1].map(() => {
      const panel = document.createElement("tucbs-identify-panel") as HTMLElement & { close: () => void };
      panel.close = vi.fn();
      document.body.appendChild(panel);
      return panel;
    });
    await openWith({});
    panels.forEach((panel) => expect(panel.close).toHaveBeenCalledTimes(1));
  });
});
