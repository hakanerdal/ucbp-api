import { FillStyle, LayerStyleSpec } from '@tucbs/core';
import { hexToRgb, sampleFromPaletteCss } from '../shared/util/gradientSampling.js';
export { hexToRgb, sampleFromPaletteCss };
export interface GradientPaletteOption {
    readonly value: string;
    readonly label: string;
    readonly colors: readonly string[];
}
export type PaletteKind = "sequential" | "diverging" | "qualitative";
export declare const DEFAULT_FILL_COLOR = "#1ecfb0";
export declare const GRADIENT_PALETTES: readonly GradientPaletteOption[];
export declare const DEFAULT_GRADIENT_PALETTE: string;
export declare function paletteKindOf(name: string): PaletteKind;
export declare function sanitizeNumericInput(raw: string, allowNegative: boolean): string;
export interface ColumnRange {
    readonly min: number;
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
export declare function computeMinMax(gradientMin: string, gradientMax: string, range: ColumnRange | null): {
    min?: number;
    max?: number;
};
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
export declare function buildFillStyle(state: FillStyleFormState): FillStyle;
export declare function sortCategoryValues(values: (string | number)[], sort: string): (string | number)[];
export declare function autoFillCategoryColors(values: (string | number)[], existing: Record<string, string>, palette: readonly string[]): Record<string, string>;
export declare function findPaletteName(colors: readonly string[]): {
    name: string;
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