import { describe, expect, it } from "vitest";
import type { LayerStyleSpec } from "@tucbs/core";
import {
  buildFillStyle,
  checkGradientBound,
  deriveStyleEditorState,
  sortCategoryValues,
  toHexColor,
  type FillStyleFormState,
  type StyleEditorFormDefaults,
} from "./fillStyleSpec.js";

// God Component kilavuzu GC-02 3.5 Adim 5: buildFillStyle() artik saf bir
// fonksiyon (bkz fillStyleSpec.ts WHY yorumu) -- TucbsStyleEditor'un beş
// renk modunun (solid/gradient/bin/enum, +off) her birinde dogru FillStyle
// urettigini DOM/Cesium olmadan dogrulayan ilk birim testleri.

const BASE_STATE: FillStyleFormState = {
  colorMode: "solid",
  fillOpacityPercent: 50,
  fillColor: "#ff0000",
  dataColumn: "nufus",
  paletteColors: ["#000000", "#ffffff"],
  paletteKind: "sequential",
  gradientMin: "",
  gradientMax: "",
  columnRange: null,
  binCount: 5,
  categoryColors: {},
};

describe("buildFillStyle", () => {
  it("solid: dolgu rengini ve opakligi (0-1 araligina cevirerek) uygular", () => {
    const style = buildFillStyle({ ...BASE_STATE, colorMode: "solid", fillColor: "#3388ff", fillOpacityPercent: 46 });
    expect(style).toEqual({ mode: "solid", color: "#3388ff", opacity: 0.46 });
  });

  it("gradient (min/max verilmis): kullanicinin girdigi min/max degerleri (veri araligiyla kenetlenerek) kullanilir", () => {
    const style = buildFillStyle({
      ...BASE_STATE,
      colorMode: "gradient",
      gradientMin: "10",
      gradientMax: "20",
      columnRange: { min: 0, max: 100 },
    });
    expect(style).toEqual({
      mode: "gradient",
      column: "nufus",
      palette: ["#000000", "#ffffff"],
      paletteKind: "sequential",
      min: 10,
      max: 20,
      opacity: 0.5,
    });
  });

  it("gradient (otomatik): min/max alanlari bos birakilirsa sonucta hic min/max anahtari OLMAZ", () => {
    const style = buildFillStyle({
      ...BASE_STATE,
      colorMode: "gradient",
      gradientMin: "",
      gradientMax: "",
      columnRange: { min: 0, max: 100 },
    });
    expect(style).toEqual({
      mode: "gradient",
      column: "nufus",
      palette: ["#000000", "#ffffff"],
      paletteKind: "sequential",
      opacity: 0.5,
    });
    expect(style).not.toHaveProperty("min");
    expect(style).not.toHaveProperty("max");
  });

  it("bin: binCount ve min/max ile birlikte bin stili uretir", () => {
    const style = buildFillStyle({
      ...BASE_STATE,
      colorMode: "bin",
      binCount: 8,
      gradientMin: "5",
      gradientMax: "50",
      columnRange: { min: 0, max: 100 },
    });
    expect(style).toEqual({
      mode: "bin",
      column: "nufus",
      palette: ["#000000", "#ffffff"],
      paletteKind: "sequential",
      binCount: 8,
      min: 5,
      max: 50,
      opacity: 0.5,
    });
  });

  it("enum: kategori-renk eslemesini oldugu gibi tasir", () => {
    const categoryColors = { Ankara: "#ff0000", Istanbul: "#00ff00" };
    const style = buildFillStyle({ ...BASE_STATE, colorMode: "enum", categoryColors });
    expect(style).toEqual({
      mode: "enum",
      column: "nufus",
      colors: categoryColors,
      opacity: 0.5,
    });
  });

  it("off: bilinmeyen/off modda sadece mode alanini doner", () => {
    const style = buildFillStyle({ ...BASE_STATE, colorMode: "off" });
    expect(style).toEqual({ mode: "off" });
  });
});

// Gercek hatalar plani H4.1/H4.3: TucbsStyleEditor "Degerler" listesinin
// siralamasi. Eskiden TucbsLegendPanel'in enum lejantindan farkli bir kural
// kullaniyordu; artik ikisi de shared/util/categorySort.compareCategoryKeys
// kullanir (sayiya benzeyenler sayisal, digerleri metin).
describe("sortCategoryValues (karakterizasyon -- H4.1)", () => {
  it("source: girdiyi aynen (ayni dizi) dondurur", () => {
    const values = ["c", 10, "a"];
    expect(sortCategoryValues(values, "source")).toBe(values);
  });

  it("asc/desc: gercek sayilar sayisal, metinler alfabetik siralanir; girdi degismez", () => {
    const numbers = [10, 9, 2, 100];
    expect(sortCategoryValues(numbers, "asc")).toEqual([2, 9, 10, 100]);
    expect(sortCategoryValues(numbers, "desc")).toEqual([100, 10, 9, 2]);
    expect(numbers).toEqual([10, 9, 2, 100]);
    expect(sortCategoryValues(["konut", "ticari", "arsa"], "asc")).toEqual(["arsa", "konut", "ticari"]);
  });

  it("metin olarak saklanmis sayilar sayisal siralanir", () => {
    expect(sortCategoryValues(["10", "9", "2", "100"], "asc")).toEqual(["2", "9", "10", "100"]);
    expect(sortCategoryValues(["10", "9", "2", "100"], "desc")).toEqual(["100", "10", "9", "2"]);
  });

  it("sayi ve metin karisik dizide once sayilar (sayisal), sonra metinler gelir; tipler korunur", () => {
    expect(sortCategoryValues([10, "b", 9, "a", 2], "asc")).toEqual([2, 9, 10, "a", "b"]);
    expect(sortCategoryValues([10, "b", 9, "a", 2], "desc")).toEqual(["b", "a", 10, 9, 2]);
  });
});

// God Component Faz 3.1a: TucbsStyleEditor.openFor()'tan tasinan saf form
// durumu hesabi (bilesen uzerinden ayrica TucbsStyleEditor.openFor
// karakterizasyon testinde dondurulur).
describe("deriveStyleEditorState", () => {
  const DEFAULTS: StyleEditorFormDefaults = {
    colorMode: "solid",
    fillOpacity: 46,
    outlineEnabled: true,
    outlineColor: "#1a73e8",
    outlineWidth: "2",
    binCount: "5",
  };
  const OUTLINE = { enabled: false, color: "hsl(0, 100%, 50%)", width: 3 };
  const VIRIDIS = ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"];
  const BASE = {
    dataColumn: "",
    gradientPalette: "Viridis",
    paletteReversed: false,
    gradientMin: "",
    gradientMax: "",
    binCount: "5",
    categoryColors: {},
    categoryValues: [],
  };
  const derive = (style: LayerStyleSpec | undefined, color?: string, opacity?: number) =>
    deriveStyleEditorState(style, color, opacity, DEFAULTS);

  it("stil yoksa varsayilanlar, baslangic rengi/opakligi ya da onlarin varsayilanlari kullanilir", () => {
    expect(derive(undefined)).toEqual({
      ...BASE,
      colorMode: "solid",
      fillColor: "#1ecfb0",
      fillOpacity: 46,
      outlineEnabled: true,
      outlineColor: "#1a73e8",
      outlineWidth: "2",
    });
    expect(derive(undefined, "hsl(120, 100%, 50%)", 0.25)).toMatchObject({ fillColor: "#00ff00", fillOpacity: 25 });
  });

  it("solid: kayitli renk/opaklik baslangic degerlerine baskin gelir; dis hat geri yuklenir", () => {
    expect(
      derive({ fill: { mode: "solid", color: "#112233", opacity: 0.5 }, outline: OUTLINE }, "#ffffff", 0.9),
    ).toEqual({
      ...BASE,
      colorMode: "solid",
      fillColor: "#112233",
      fillOpacity: 50,
      outlineEnabled: false,
      outlineColor: "#ff0000",
      outlineWidth: "3",
    });
  });

  it("gradient (min/max verilmis): sutun, palet ve aralik metin olarak geri yuklenir", () => {
    expect(
      derive({ fill: { mode: "gradient", column: "nufus", palette: VIRIDIS, min: 0, max: 90.5, opacity: 1 }, outline: OUTLINE }),
    ).toMatchObject({ colorMode: "gradient", dataColumn: "nufus", gradientPalette: "Viridis", gradientMin: "0", gradientMax: "90.5", binCount: "5" });
  });

  it("gradient (otomatik): min/max yoksa alanlar bos; ters palet taninir; bilinmeyen palet varsayilani korur", () => {
    expect(
      derive({ fill: { mode: "gradient", column: "v", palette: [...VIRIDIS].reverse(), opacity: 1 }, outline: OUTLINE }),
    ).toMatchObject({ gradientPalette: "Viridis", paletteReversed: true, gradientMin: "", gradientMax: "" });
    expect(
      derive({ fill: { mode: "gradient", column: "v", palette: ["#010101", "#020202"], opacity: 1 }, outline: OUTLINE }),
    ).toMatchObject({ gradientPalette: "Viridis", paletteReversed: false });
  });

  it("bin: bin sayisi metin olarak geri yuklenir; dolgu rengi/opakligi baslangic degerlerinden gelir", () => {
    expect(
      derive({ fill: { mode: "bin", column: "v", palette: VIRIDIS, binCount: 7, min: 1, max: 9, opacity: 1 }, outline: OUTLINE }, "#abcdef", 0.3),
    ).toMatchObject({ colorMode: "bin", binCount: "7", gradientMin: "1", gradientMax: "9", fillColor: "#abcdef", fillOpacity: 30 });
  });

  it("enum: renkler kopyalanir, sayisal gorunen anahtarlar sayiya cevrilir, degerler SIRALANMAZ", () => {
    const colors = { "10": "#aa0000", "2": "#00aa00", x: "#0000aa", "07": "#111111" };
    const state = derive({ fill: { mode: "enum", column: "tur", colors, opacity: 1 }, outline: OUTLINE });
    expect(state).toMatchObject({ colorMode: "enum", dataColumn: "tur", categoryColors: colors });
    expect(state.categoryColors).not.toBe(colors);
    expect(state.categoryValues).toEqual([2, 10, "x", "07"]);
  });

  it("off: sutun bos kalir", () => {
    expect(derive({ fill: { mode: "off" } as LayerStyleSpec["fill"], outline: OUTLINE })).toMatchObject({ colorMode: "off", dataColumn: "" });
  });
});

describe("toHexColor", () => {
  it("hsl'yi hex'e cevirir, hex'i aynen birakir, taninmayani siyaha cevirir", () => {
    expect(toHexColor("hsl(240, 100%, 50%)")).toBe("#0000ff");
    expect(toHexColor("#123456")).toBe("#123456");
    expect(toHexColor("red")).toBe("#000000");
  });
});

// Gercek hatalar plani H6.2: Min/Max alaninin gecerlilik kurali (eskiden
// clampGradientRange ile her tusta KENETLENIYORDU; artik gecersiz deger
// reddedilir -- bkz TucbsStyleEditor.fillCardEvents karakterizasyon testi).
describe("checkGradientBound", () => {
  const RANGE = { min: 10, max: 100 };

  it("bos deger (Otomatik) her zaman gecerli", () => {
    expect(checkGradientBound("", "min", "50", RANGE)).toEqual({ valid: true, message: "" });
  });

  it("tamamlanmamis sayi gecersiz ama uyarisiz", () => {
    expect(checkGradientBound("-", "min", "", RANGE)).toEqual({ valid: false, message: "" });
  });

  it("veri araligi disi gecersiz; sinirlar dahil", () => {
    expect(checkGradientBound("9.5", "min", "", RANGE)).toEqual({ valid: false, message: "Değer 10 ile 100 arasında olmalı." });
    expect(checkGradientBound("100.5", "max", "", RANGE)).toEqual({ valid: false, message: "Değer 10 ile 100 arasında olmalı." });
    expect(checkGradientBound("10", "min", "", RANGE).valid).toBe(true);
    expect(checkGradientBound("100", "max", "", RANGE).valid).toBe(true);
  });

  it("Min Max'i, Max Min'i gecemez; esitlik gecerli; diger alan bossa denetlenmez", () => {
    expect(checkGradientBound("60", "min", "50", RANGE)).toEqual({ valid: false, message: "Min, Max değerinden (50) büyük olamaz." });
    expect(checkGradientBound("40", "max", "50", RANGE)).toEqual({ valid: false, message: "Max, Min değerinden (50) küçük olamaz." });
    expect(checkGradientBound("50", "min", "50", RANGE).valid).toBe(true);
    expect(checkGradientBound("90", "min", "", RANGE).valid).toBe(true);
  });

  it("aralik bilinmiyorsa yalniz Min/Max sirasi denetlenir; ondalik sinirlar okunur bicimde yazilir", () => {
    expect(checkGradientBound("-1e6", "min", "", null).valid).toBe(true);
    expect(checkGradientBound("0", "min", "1", { min: 0.125, max: 2 / 3 }).message).toBe("Değer 0.13 ile 0.67 arasında olmalı.");
  });
});
