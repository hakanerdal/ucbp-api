import { FillStyle, LayerStyleSpec } from '@tucbs/core';
import { hexToRgb, sampleFromPaletteCss } from '../shared/util/gradientSampling.js';
export { hexToRgb, sampleFromPaletteCss };
/** Stil editörünün palet listesindeki bir renk paleti. */
export interface GradientPaletteOption {
    /** Paletin kimliği (ör. `"Viridis"`). */
    readonly value: string;
    /** Listede görünen ad. */
    readonly label: string;
    /** Paletin renkleri (hex), baştan sona. */
    readonly colors: readonly string[];
}
/** Paletin türü: sıralı, iki yönlü ya da nitel (karışımsız). */
export type PaletteKind = "sequential" | "diverging" | "qualitative";
/** Kayıtlı ya da başlangıç rengi yoksa kullanılan dolgu rengi. */
export declare const DEFAULT_FILL_COLOR = "#1ecfb0";
/** Stil editörünün sunduğu renk paletleri. */
export declare const GRADIENT_PALETTES: readonly GradientPaletteOption[];
/** Varsayılan paletin kimliği (listenin ilki). */
export declare const DEFAULT_GRADIENT_PALETTE: string;
/** Palet adının türünü döndürür; tanınmayan adlar `"sequential"` sayılır. */
export declare function paletteKindOf(name: string): PaletteKind;
/** Min/Max alanına yazılan metinden rakam, tek ondalık nokta ve (izinliyse) baştaki eksi dışındaki karakterleri ve anlamsız baştaki sıfırları temizler. */
export declare function sanitizeNumericInput(raw: string, allowNegative: boolean): string;
/** Veri sütunundaki sayısal değerlerin gerçek aralığı. */
export interface ColumnRange {
    /** Sütundaki en küçük değer. */
    readonly min: number;
    /** Sütundaki en büyük değer. */
    readonly max: number;
}
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
export declare function checkGradientBound(value: string, edited: "min" | "max", other: string, range: ColumnRange | null): GradientBoundCheck;
/** Haritaya fiilen uygulanacak Min/Max değerlerini hesaplar: değerleri veri aralığına kenetler, Min'in Max'ı geçmesini engeller. */
export declare function computeMinMax(gradientMin: string, gradientMax: string, range: ColumnRange | null): {
    /** Uygulanacak alt sınır; Min alanı boşsa yok. */
    min?: number;
    /** Uygulanacak üst sınır; Max alanı boşsa yok. */
    max?: number;
};
/** `buildFillStyle()`'a verilen form durumu -- TucbsStyleEditor'in ilgili `this.*` alanlarinin saf kopyasi. */
export interface FillStyleFormState {
    /** Renk modu: `"solid"`, `"gradient"`, `"bin"`, `"enum"` ya da `"off"`. */
    readonly colorMode: string;
    /** Dolgu opaklığı (0-100). */
    readonly fillOpacityPercent: number;
    /** Sabit dolgu rengi (hex). */
    readonly fillColor: string;
    /** Renklendirmede kullanılan veri sütunu. */
    readonly dataColumn: string;
    /** Uygulanacak palet renkleri (ters çevirme uygulanmış). */
    readonly paletteColors: readonly string[];
    /** Paletin türü; karışım yöntemini belirler. */
    readonly paletteKind: PaletteKind;
    /** Min alanı (boş = otomatik). */
    readonly gradientMin: string;
    /** Max alanı (boş = otomatik). */
    readonly gradientMax: string;
    /** Veri sütununun gerçek aralığı; bilinmiyorsa `null`. */
    readonly columnRange: ColumnRange | null;
    /** Bin modunda sınıf sayısı. */
    readonly binCount: number;
    /** Enum modunda kategori -> renk eşlemesi. */
    readonly categoryColors: Record<string, string>;
}
/** Form durumundan `LayerManager.applyLayerStyle()`'a verilecek `FillStyle`'ı üretir. */
export declare function buildFillStyle(state: FillStyleFormState): FillStyle;
/**
 * Kategori değerlerini sıralar.
 * @param sort `"source"` (verideki sıra), `"desc"` (azalan) ya da artan sıra için başka bir değer.
 */
export declare function sortCategoryValues(values: (string | number)[], sort: string): (string | number)[];
/**
 * Keşfedilen her değer için bir renk garanti eder: önceden seçilmiş (kullanıcının
 * değiştirdiği) değerler korunur, yeni ya da eksik değerlere aktif paletten sırayla
 * (palet boyu aşılırsa başa sararak) renk atanır.
 */
export declare function autoFillCategoryColors(values: (string | number)[], existing: Record<string, string>, palette: readonly string[]): Record<string, string>;
/**
 * Kayıtlı `FillStyle`'ın renk dizisinden (ad ve ters çevirme bilgisi taşımaz) hangi
 * `GRADIENT_PALETTES` girişinin, düz mü ters mi kullanıldığını bulur.
 * @returns Eşleşen palet; hiçbiri eşleşmezse `undefined`.
 */
export declare function findPaletteName(colors: readonly string[]): {
    /** Bulunan paletin kimliği. */
    name: string;
    /** Renkler paletin ters çevrilmiş hâliyle mi eşleşti. */
    reversed: boolean;
} | undefined;
/**
 * Bir rengi (hex veya `hsl(...)`) native `<input type="color">`'ın kabul ettiği hex formatına çevirir.
 * @param color - Dönüştürülecek renk (`"#rrggbb"` veya `"hsl(h, s%, l%)"`).
 * @returns Hex renk (tanınamayan bir format verilirse `"#000000"`).
 */
export declare function toHexColor(color: string): string;
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
/**
 * Kayıtlı bir katman stilinden stil editörünün form alanlarını hesaplar (`buildFillStyle`'ın ters yönü).
 * @param style - `LayerManager.getLayerStyle()` sonucu; yoksa varsayılanlar kullanılır.
 * @param initialFillColor - Kayıtlı sabit dolgu yoksa kullanılacak dolgu rengi.
 * @param initialFillOpacity - Kayıtlı sabit dolgu yoksa kullanılacak opaklık (0-1).
 * @param defaults - Bileşenin varsayılan değerleri.
 * @returns Form alanları; kategori değerleri sıralanmamış.
 */
export declare function deriveStyleEditorState(style: LayerStyleSpec | undefined, initialFillColor: string | undefined, initialFillOpacity: number | undefined, defaults: StyleEditorFormDefaults): StyleEditorFormState;
//# sourceMappingURL=fillStyleSpec.d.ts.map