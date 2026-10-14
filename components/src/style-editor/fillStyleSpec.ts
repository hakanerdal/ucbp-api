import type { FillStyle, LayerStyleSpec } from "@tucbs/core";
import { hexToRgb, sampleFromPaletteCss } from "../shared/util/gradientSampling.js";
import { compareCategoryKeys } from "../shared/util/categorySort.js";
import { formatLegendNumber } from "../shared/util/legendFormat.js";

// sampleFromPaletteCss shared/util/gradientSampling.ts'e tasindi (TucbsLegendPanel
// de kullaniyor); mevcut import'lar bozulmasin diye buradan da export edilir.
export { hexToRgb, sampleFromPaletteCss };

// GC-02 3.3 "Test Edilemeyen Saf Mantık" (bkz God Component kilavuzu):
// TucbsStyleEditor.ts'in stil hesaplama/palet mantigi bir Lit bilesenin
// private/static uyeleriydi -- DOM'a hicbir ihtiyaci olmadigi halde bu
// yuzden test edilemiyordu. Bu modul o mantigin PARAMETRE alan, DOM'suz saf
// hallerini barindirir; TucbsStyleEditor bunlari kendi `this.*` state'inden
// degerleri toplayip cagiran ince sarmalayicilar araciligiyla kullanir --
// davranis DEGISMEDI, sadece test edilebilir hale geldi (bkz
// fillStyleSpec.test.ts).

export interface GradientPaletteOption {
  readonly value: string;
  readonly label: string;
  readonly colors: readonly string[];
}

export type PaletteKind = "sequential" | "diverging" | "qualitative";

export const DEFAULT_FILL_COLOR = "#1ecfb0";

// Siralama onemli: dropdown'da bu sirayla listelenir. tucbs-react/3dmap'teki
// vector-style/color.ts PALETTES ile BIREBIR ayni (deger/isim/hex) -- referans
// uygulamayla ayni renk secenekleri sunulsun diye (bkz.
// project_ucbp_api_styleeditor_arastirma memory). Renkler gradient/bin modunda
// LayerManager.applyLayerStyle()'a fill.palette olarak gidip gercekten
// uygulaniyor; enum modunda otomatik kategori renk atamasinin kaynagidir.
export const GRADIENT_PALETTES: readonly GradientPaletteOption[] = [
  // sequential
  { value: "Viridis", label: "Viridis", colors: ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"] },
  { value: "Plasma", label: "Plasma", colors: ["#0d0887", "#6a00a8", "#b12a90", "#e16462", "#fca636", "#f0f921"] },
  { value: "Magma", label: "Magma", colors: ["#000004", "#3b0f70", "#8c2981", "#de4968", "#fe9f6d", "#fcfdbf"] },
  { value: "Inferno", label: "Inferno", colors: ["#000004", "#420a68", "#932667", "#dd513a", "#fca50a", "#fcffa4"] },
  { value: "Cividis", label: "Cividis", colors: ["#00224e", "#123570", "#3b496c", "#575d6d", "#88892a", "#fee838"] },
  {
    value: "Turbo",
    label: "Turbo",
    colors: [
      "#30123b", "#4145ab", "#4675ed", "#39a2fc", "#1bcfd4", "#24eca6",
      "#61fc6c", "#a4fc3b", "#d1e834", "#f3c63a", "#fe9b2d", "#f36315",
      "#d93806", "#b11901", "#7a0403",
    ],
  },
  { value: "Blues", label: "Blues", colors: ["#f7fbff", "#c6dbef", "#6baed6", "#3182bd", "#08519c"] },
  { value: "Greens", label: "Greens", colors: ["#f7fcf5", "#c7e9c0", "#74c476", "#31a354", "#006d2c"] },
  { value: "Oranges", label: "Oranges", colors: ["#fff5eb", "#fdd0a2", "#f16913", "#d94801", "#7f2704"] },
  { value: "Reds", label: "Reds", colors: ["#fff5f0", "#fcbba1", "#fb6a4a", "#cb181d", "#67000d"] },
  { value: "Purples", label: "Purples", colors: ["#fcfbfd", "#dadaeb", "#9e9ac8", "#6a51a3", "#3f007d"] },
  { value: "YlOrRd", label: "YlOrRd", colors: ["#ffffcc", "#fed976", "#fd8d3c", "#e31a1c", "#800026"] },
  { value: "YlGnBu", label: "YlGnBu", colors: ["#ffffd9", "#c7e9b4", "#41b6c4", "#225ea8", "#081d58"] },
  // diverging
  {
    value: "Spectral",
    label: "Spectral",
    colors: ["#9e0142", "#f46d43", "#fee08b", "#ffffbf", "#e6f598", "#66c2a5", "#5e4fa2"],
  },
  { value: "RdYlGn", label: "RdYlGn", colors: ["#a50026", "#f46d43", "#ffffbf", "#a6d96a", "#006837"] },
  { value: "RdYlBu", label: "RdYlBu", colors: ["#a50026", "#f46d43", "#ffffbf", "#74add1", "#313695"] },
  { value: "BrBG", label: "BrBG", colors: ["#543005", "#bf812d", "#f6e8c3", "#c7eae5", "#35978f", "#003c30"] },
  { value: "RdBu", label: "RdBu", colors: ["#67001f", "#d6604d", "#f7f7f7", "#4393c3", "#2166ac"] },
  { value: "PiYG", label: "PiYG", colors: ["#8e0152", "#de77ae", "#f7f7f7", "#7fbc41", "#276419"] },
  // qualitative
  {
    value: "Set2",
    label: "Set2",
    colors: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
  },
  {
    value: "Set3",
    label: "Set3",
    colors: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"],
  },
  {
    value: "Tableau10",
    label: "Tableau10",
    colors: [
      "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
      "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ac",
    ],
  },
  {
    value: "Dark2",
    label: "Dark2",
    colors: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
  },
  {
    value: "Paired",
    label: "Paired",
    colors: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00"],
  },
  {
    value: "Accent",
    label: "Accent",
    colors: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
  },
];
export const DEFAULT_GRADIENT_PALETTE = GRADIENT_PALETTES[0]!.value;

// tucbs-react/3dmap'teki vector-style/color.ts PALETTE_KIND ile birebir ayni --
// qualitative paletlerde LayerManager karistirma yapmaz (bkz. sampleDiscrete),
// sequential/diverging'de dogrusal karisim (lerp) uygulanir.
const PALETTE_KIND: Record<string, PaletteKind> = {
  Viridis: "sequential",
  Plasma: "sequential",
  Magma: "sequential",
  Inferno: "sequential",
  Cividis: "sequential",
  Turbo: "sequential",
  Blues: "sequential",
  Greens: "sequential",
  Oranges: "sequential",
  Reds: "sequential",
  Purples: "sequential",
  YlOrRd: "sequential",
  YlGnBu: "sequential",
  Spectral: "diverging",
  RdYlGn: "diverging",
  RdYlBu: "diverging",
  BrBG: "diverging",
  RdBu: "diverging",
  PiYG: "diverging",
  Set2: "qualitative",
  Set3: "qualitative",
  Tableau10: "qualitative",
  Dark2: "qualitative",
  Paired: "qualitative",
  Accent: "qualitative",
};

export function paletteKindOf(name: string): PaletteKind {
  return PALETTE_KIND[name] ?? "sequential";
}

// Min/Max alanlarina rakam, (izin verilmisse) TEK bir bastaki eksi ("-")
// ve TEK bir ondalik nokta disinda HICBIR karakterin girilmesine izin
// vermez (bkz kullanici bildirimi: "Min Max alanları sadece numeric değer
// kabul etmeli") -- Bin Sayisi/Genislik alanlarindaki AYNI "rakam disi
// karakterleri aninda temizle" deseniyle (bkz o alanlardaki @input
// yorumlari). allowNegative false ise (bkz _allowNegativeMin/Max --
// veri sutunundaki gercek sinir zaten negatif DEGILSE) "-" karakteri
// HICBIR sekilde kabul edilmez (bkz kullanici sorusu: "min 0 iken yine
// de - yazabiliyorum, bu normal mi?" -- HAYIR, degildi).
export function sanitizeNumericInput(raw: string, allowNegative: boolean): string {
  const negative = allowNegative && raw.trimStart().startsWith("-");
  let digits = raw.replace(/[^0-9.]/g, "");
  const dotIndex = digits.indexOf(".");
  if (dotIndex !== -1) {
    digits = digits.slice(0, dotIndex + 1) + digits.slice(dotIndex + 1).replace(/\./g, "");
  }
  // Bin Sayisi'ndaki AYNI "anlamsiz bastaki sifirlari temizle" deseni
  // (bkz o alandaki yorum) -- "8000" yerine "0008000" yazilabilmesi
  // saçma (bkz kullanici bildirimi). Ondalik kismi (varsa) DOKUNULMADAN
  // korunur -- "0.5" gibi GECERLI bir bastaki tek sifir bozulmaz.
  const secondDotIndex = digits.indexOf(".");
  const intPart = secondDotIndex === -1 ? digits : digits.slice(0, secondDotIndex);
  const fracPart = secondDotIndex === -1 ? "" : digits.slice(secondDotIndex);
  const trimmedInt = intPart.replace(/^0+(?=\d)/, "");
  return (negative ? "-" : "") + trimmedInt + fracPart;
}

export interface ColumnRange {
  readonly min: number;
  readonly max: number;
}

// Min/Max alanina yazilan degerin gecerliligi. Gercek hatalar plani H6.2
// (kullanici bildirimi 2026-10-07): ESKIDEN burada clampGradientRange()
// vardi ve alanlarin input isleyicisinde HER TUSTA cagriliyordu -- aralik
// disi deger sinira, diger alani gecen deger o alanin degerine
// KENETLENIYORDU ("Min gercek min'in altinda OLAMAZ, Max gercek max'in
// ustunde OLAMAZ"; "Min degerini sonsuz girebiliyorum, Max'i gecemez
// mantiken"). Her tusta kenetleme yazilmakta olan sayiyi bozuyordu: Min=20
// iken Max'a "50" yazilinca ilk hane "5" Min'in altinda kaldigi icin alan
// 20 olup "0" arkasina ekleniyor, sonuc 100 oluyordu. Kural ayni (Min/Max
// veri araliginin icinde, Min <= Max) ama ARTIK gecersiz deger KENETLENMEZ,
// REDDEDILIR: state'e yazilmaz, kullaniciya uyari gosterilir, Enter'a
// basinca ya da alandan cikinca alan son gecerli degere doner (bkz
// fillCard.ts renderMinMaxFields). Bos ("Otomatik") her zaman gecerli;
// tamamlanmamis bir sayi (orn. tek basina "-") gecersiz ama uyarisizdir --
// kullanici henuz yaziyor.

/** {@link checkGradientBound} sonucu. */
export interface GradientBoundCheck {
  /** Değer state'e yazılıp haritaya uygulanabilir mi. */
  readonly valid: boolean;
  /** Geçersizse kullanıcıya gösterilecek uyarı; geçerliyse ya da sayı henüz tamamlanmamışsa boş. */
  readonly message: string;
}

/**
 * Min veya Max alanına yazılan değerin geçerli olup olmadığını denetler.
 * @param value - Temizlenmiş alan değeri (boş = otomatik).
 * @param edited - Düzenlenen alan.
 * @param other - Diğer alanın son geçerli değeri (boş = otomatik).
 * @param range - Veri sütununun gerçek aralığı; bilinmiyorsa `null`.
 * @returns Geçerlilik ve (geçersizse) uyarı metni.
 */
export function checkGradientBound(
  value: string,
  edited: "min" | "max",
  other: string,
  range: ColumnRange | null,
): GradientBoundCheck {
  if (value === "") return { valid: true, message: "" };
  const number = Number(value);
  if (!Number.isFinite(number)) return { valid: false, message: "" };
  if (range && (number < range.min || number > range.max)) {
    return {
      valid: false,
      message: `Değer ${formatLegendNumber(range.min)} ile ${formatLegendNumber(range.max)} arasında olmalı.`,
    };
  }
  const otherNumber = other === "" ? Number.NaN : Number(other);
  if (Number.isFinite(otherNumber)) {
    if (edited === "min" && number > otherNumber) {
      return { valid: false, message: `Min, Max değerinden (${formatLegendNumber(otherNumber)}) büyük olamaz.` };
    }
    if (edited === "max" && number < otherNumber) {
      return { valid: false, message: `Max, Min değerinden (${formatLegendNumber(otherNumber)}) küçük olamaz.` };
    }
  }
  return { valid: true, message: "" };
}

// exactOptionalPropertyTypes: true altinda "min: undefined" ile hic
// key'in olmamasi FARKLI seyler -- bos birakilan min/max alanlari icin
// key'i tamamen atlamamiz gerekiyor (LayerManager de "verilmemisse
// otomatik hesapla" mantigini presence/absence uzerinden kuruyor).
// Harita/Lejant'a GERCEKTEN uygulanan min/max degerinin, UI'daki herhangi
// bir kenar durumundan (odak/render zamanlamasi, custom element tuhafliklari
// vb.) bagimsiz olarak HER ZAMAN veri sutunundaki gercek araligin icinde
// kalmasini garanti eden TEK yetkili nokta -- checkGradientBound() sadece
// UI'da YAZILAN degeri denetler, burasi ise FIILEN UYGULANAN degeri.
export function computeMinMax(
  gradientMin: string,
  gradientMax: string,
  range: ColumnRange | null,
): { min?: number; max?: number } {
  const result: { min?: number; max?: number } = {};
  if (gradientMin !== "") {
    const value = Number(gradientMin);
    result.min = range && Number.isFinite(value) ? Math.max(value, range.min) : value;
  }
  if (gradientMax !== "") {
    const value = Number(gradientMax);
    result.max = range && Number.isFinite(value) ? Math.min(value, range.max) : value;
  }
  // Min, Max'i GECEMEZ (bkz kullanici bildirimi) -- UI'daki
  // checkGradientBound()'un yakalayamadigi herhangi bir kenar durumuna
  // karsi burada da (fiilen uygulanan degerde) son bir guvenlik agi.
  if (result.min !== undefined && result.max !== undefined && result.min > result.max) {
    result.min = result.max;
  }
  return result;
}

/** `buildFillStyle()`'a verilen form durumu -- TucbsStyleEditor'in ilgili `this.*` alanlarinin saf kopyasi. */
export interface FillStyleFormState {
  readonly colorMode: string;
  readonly fillOpacityPercent: number;
  readonly fillColor: string;
  readonly dataColumn: string;
  readonly paletteColors: readonly string[];
  readonly paletteKind: PaletteKind;
  readonly gradientMin: string;
  readonly gradientMax: string;
  readonly columnRange: ColumnRange | null;
  readonly binCount: number;
  readonly categoryColors: Record<string, string>;
}

export function buildFillStyle(state: FillStyleFormState): FillStyle {
  const opacity = state.fillOpacityPercent / 100;
  switch (state.colorMode) {
    case "solid":
      return { mode: "solid", color: state.fillColor, opacity };
    case "gradient":
      return {
        mode: "gradient",
        column: state.dataColumn,
        palette: state.paletteColors,
        paletteKind: state.paletteKind,
        ...computeMinMax(state.gradientMin, state.gradientMax, state.columnRange),
        opacity,
      };
    case "bin":
      return {
        mode: "bin",
        column: state.dataColumn,
        palette: state.paletteColors,
        paletteKind: state.paletteKind,
        binCount: state.binCount,
        ...computeMinMax(state.gradientMin, state.gradientMax, state.columnRange),
        opacity,
      };
    case "enum":
      return {
        mode: "enum",
        column: state.dataColumn,
        colors: state.categoryColors,
        opacity,
      };
    case "off":
    default:
      return { mode: "off" };
  }
}

// Gercek hatalar plani H4.3: eskiden duz `<` karsilastirmasi kullaniliyordu --
// metin olarak gelen sayilar ("10" < "9") ve sayi/metin karisik diziler
// TucbsLegendPanel'in enum lejantindan FARKLI sirada gorunuyordu. Artik iki
// liste de ayni kurali (compareCategoryKeys) kullanir; degerler kendi
// tiplerinde (sayi/metin) kalir, yalnizca karsilastirma metin anahtari
// uzerinden yapilir (lejant da fill.colors'un metin anahtarlarini siralar).
export function sortCategoryValues(
  values: (string | number)[],
  sort: string,
): (string | number)[] {
  if (sort === "source") return values;
  const sorted = [...values].sort((a, b) => compareCategoryKeys(String(a), String(b)));
  return sort === "desc" ? sorted.reverse() : sorted;
}

// Kesfedilen HER deger icin bir renk garanti eder: onceden secilmis
// (kullanicinin degistirdigi) degerler korunur, yeni/eksik degerler aktif
// gradient paletinden sirayla (palet boyu asilirsa basa sararak) otomatik
// atanir -- tucbs-react'teki "sampleCategoryColor" deseniyle ayni fikir.
export function autoFillCategoryColors(
  values: (string | number)[],
  existing: Record<string, string>,
  palette: readonly string[],
): Record<string, string> {
  const next: Record<string, string> = {};
  values.forEach((value, index) => {
    const key = String(value);
    next[key] = existing[key] ?? palette[index % palette.length] ?? DEFAULT_FILL_COLOR;
  });
  return next;
}

function arraysEqual(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

// openFor()'da committed FillStyle'dan (sadece HEX renk DIZISI tasir,
// isim/ters-cevrilmis bilgisi tasimaz) hangi named GRADIENT_PALETTES
// girisinin (ve "Paleti ters cevir" durumunun) kullanildigini geri
// bulmak icin ters-arama.
export function findPaletteName(
  colors: readonly string[],
): { name: string; reversed: boolean } | undefined {
  for (const palette of GRADIENT_PALETTES) {
    if (arraysEqual(palette.colors, colors)) {
      return { name: palette.value, reversed: false };
    }
    if (arraysEqual([...palette.colors].reverse(), colors)) {
      return { name: palette.value, reversed: true };
    }
  }
  return undefined;
}

// TucbsLayerList katman renklerini hsl(...) formatinda tutuyor; native
// <input type="color"> ise sadece hex kabul ediyor. Zaten hex olan bir
// deger verilirse (orn. "#rrggbb") oldugu gibi kullanilir.
/**
 * Bir rengi (hex veya `hsl(...)`) native `<input type="color">`'ın kabul ettiği hex formatına çevirir.
 * @param color - Dönüştürülecek renk (`"#rrggbb"` veya `"hsl(h, s%, l%)"`).
 * @returns Hex renk (tanınamayan bir format verilirse `"#000000"`).
 */
export function toHexColor(color: string): string {
  const hslMatch = /hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/.exec(color);
  if (!hslMatch) return color.startsWith("#") ? color : "#000000";

  const h = Number(hslMatch[1]);
  const s = Number(hslMatch[2]) / 100;
  const l = Number(hslMatch[3]) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const sectors: readonly (readonly [number, number, number])[] = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ];
  const [r0, g0, b0] = sectors[Math.min(5, Math.floor(h / 60))] ?? sectors[0]!;

  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r0)}${toHex(g0)}${toHex(b0)}`;
}

// GC-02 Faz 3.1a: TucbsStyleEditor.openFor()'un kayitli stilden form
// alanlarini hesaplayan kismi (karmasiklik 27) buraya, DOM'suz saf bir
// fonksiyona tasindi -- buildFillStyle()'in (form -> FillStyle) ters yonu.
// Kategori degerleri SIRALANMADAN doner: siralama bilesende kalir, cunku
// "Verideki sira" secenegi layerManager'a ihtiyac duyar.

/** {@link deriveStyleEditorState}'in, kayıtlı stil yoksa veya bir alanı taşımıyorsa kullandığı varsayılanlar. */
export interface StyleEditorFormDefaults {
  /** Renk modu (ör. `"solid"`). */
  readonly colorMode: string;
  /** Dolgu opaklığı (0-100). */
  readonly fillOpacity: number;
  /** Dış hat açık mı. */
  readonly outlineEnabled: boolean;
  /** Dış hat rengi (hex). */
  readonly outlineColor: string;
  /** Dış hat genişliği (metin alanı değeri). */
  readonly outlineWidth: string;
  /** Bin sayısı (metin alanı değeri). */
  readonly binCount: string;
}

/** Stil editörünün, kayıtlı bir stilden geri yüklenen form alanları. */
export interface StyleEditorFormState {
  /** Renk modu. */
  readonly colorMode: string;
  /** Sabit dolgu rengi (hex). */
  readonly fillColor: string;
  /** Dolgu opaklığı (0-100). */
  readonly fillOpacity: number;
  /** Veri sütunu (gradient/bin/enum dışında boş). */
  readonly dataColumn: string;
  /** Seçili gradient paletinin adı. */
  readonly gradientPalette: string;
  /** Palet ters çevrilmiş mi. */
  readonly paletteReversed: boolean;
  /** Min alanı (boş = otomatik). */
  readonly gradientMin: string;
  /** Max alanı (boş = otomatik). */
  readonly gradientMax: string;
  /** Bin sayısı (metin alanı değeri). */
  readonly binCount: string;
  /** Kategori -> renk eşlemesi (kopya). */
  readonly categoryColors: Record<string, string>;
  /** Kategori değerleri, SIRALANMAMIŞ (sayıya benzeyen anahtarlar sayıya çevrilir). */
  readonly categoryValues: (string | number)[];
  /** Dış hat açık mı. */
  readonly outlineEnabled: boolean;
  /** Dış hat rengi (hex). */
  readonly outlineColor: string;
  /** Dış hat genişliği (metin alanı değeri). */
  readonly outlineWidth: string;
}

type RangeFill = Extract<FillStyle, { mode: "gradient" | "bin" }>;
type EnumFill = Extract<FillStyle, { mode: "enum" }>;

function restoreRangeFields(fill: RangeFill) {
  const foundPalette = findPaletteName(fill.palette);
  return {
    dataColumn: fill.column,
    ...(foundPalette && { gradientPalette: foundPalette.name, paletteReversed: foundPalette.reversed }),
    gradientMin: fill.min !== undefined ? String(fill.min) : "",
    gradientMax: fill.max !== undefined ? String(fill.max) : "",
    ...(fill.mode === "bin" && { binCount: String(fill.binCount) }),
  };
}

function restoreEnumFields(fill: EnumFill) {
  // "Degerler" burada BILEREK canli veriden YENIDEN KESFEDILMIYOR --
  // ONCEKI surum burada _loadCategoryValues() cagirip taze bir
  // getUniqueColumnValues() sorgusu yapiyordu; eger veri o an
  // commit edildigi andakinden FARKLI degerler iceriyorsa (orn. yeni
  // deger kesfedildi ama HENUZ tekrar uygulanmadi) "Degerler" ile
  // TucbsLegendPanel'in gosterdigi (fill.colors) ANINDA birbirinden
  // FARKLI gorunuyordu (bkz kullanici bildirimi). Artik "Degerler",
  // committed fill.colors'un ANAHTARLARINDAN turetilir -- iki panel
  // de AYNI kaynagi (fill.colors) okudugu icin acilista HER ZAMAN
  // birebir eslesir. Kullanici Veri Sutunu'nu ELLE yeniden secerse
  // (bkz _onDataColumnChange) canli yeniden kesif YINE devreye girer
  // -- o, apply'i de hemen tetikleyen ACIK bir kullanici eylemi.
  const categoryValues = Object.keys(fill.colors).map((key) => {
    const asNumber = Number(key);
    return Number.isFinite(asNumber) && String(asNumber) === key ? asNumber : key;
  });
  return { dataColumn: fill.column, categoryColors: { ...fill.colors }, categoryValues };
}

function restoreFillFields(fill: FillStyle | undefined): Partial<StyleEditorFormState> {
  if (fill?.mode === "gradient" || fill?.mode === "bin") return restoreRangeFields(fill);
  if (fill?.mode === "enum") return restoreEnumFields(fill);
  return {};
}

/**
 * Kayıtlı bir katman stilinden stil editörünün form alanlarını hesaplar (`buildFillStyle`'ın ters yönü).
 * @param style - `LayerManager.getLayerStyle()` sonucu; yoksa varsayılanlar kullanılır.
 * @param initialFillColor - Kayıtlı sabit dolgu yoksa kullanılacak dolgu rengi.
 * @param initialFillOpacity - Kayıtlı sabit dolgu yoksa kullanılacak opaklık (0-1).
 * @param defaults - Bileşenin varsayılan değerleri.
 * @returns Form alanları; kategori değerleri sıralanmamış.
 */
export function deriveStyleEditorState(
  style: LayerStyleSpec | undefined,
  initialFillColor: string | undefined,
  initialFillOpacity: number | undefined,
  defaults: StyleEditorFormDefaults,
): StyleEditorFormState {
  // ONCEKI surum burada HER ZAMAN _colorMode = DEFAULT_COLOR_MODE
  // ("solid") atayip SADECE fill.mode==="solid" ise fillColor/fillOpacity
  // geri yukluyordu -- katman zaten Kategorik/Gradient/Bin ile
  // stillendirilmis olsa bile diyalog HER ACILISTA "Sabit Renk"e
  // donuyordu, Veri Sutunu/palet/aralik kullanicinin ELLE TEKRAR secmesi
  // gerekiyordu. Bu da editorun (canli veriden TAZE kesfedilen) "Degerler"
  // listesi ile daha ONCE commit edilmis fill.colors/min-max arasinda bir
  // UYUSMAZLIK GORUNUMUNE yol aciyordu (bkz kullanici bildirimi: "Lejant
  // degerleri StyleEditor ile TucbsLegendPanel'de neden farkli" -- her
  // ikisi de kendi ANINDAKI DOGRU verisini gosteriyordu, sorun editorun
  // her acilista state'i sifirlayip kullaniciyi yeniden kesfetmeye
  // zorlamasiydi). Simdi commit edilmis MOD'un TAMAMI (sutun/palet/ters
  // cevirme/min-max/bin sayisi/kategori renkleri) geri yukleniyor.
  const solidFill = style?.fill.mode === "solid" ? style.fill : undefined;
  const initialColor = initialFillColor ? toHexColor(initialFillColor) : DEFAULT_FILL_COLOR;
  const initialOpacity =
    initialFillOpacity !== undefined ? Math.round(initialFillOpacity * 100) : defaults.fillOpacity;
  return {
    colorMode: style?.fill.mode ?? defaults.colorMode,
    fillColor: solidFill ? toHexColor(solidFill.color) : initialColor,
    fillOpacity: solidFill ? Math.round(solidFill.opacity * 100) : initialOpacity,
    dataColumn: "",
    gradientPalette: DEFAULT_GRADIENT_PALETTE,
    paletteReversed: false,
    gradientMin: "",
    gradientMax: "",
    binCount: defaults.binCount,
    categoryColors: {},
    categoryValues: [],
    ...restoreFillFields(style?.fill),
    outlineEnabled: style?.outline.enabled ?? defaults.outlineEnabled,
    outlineColor: style ? toHexColor(style.outline.color) : defaults.outlineColor,
    outlineWidth: style !== undefined ? String(style.outline.width) : defaults.outlineWidth,
  };
}
