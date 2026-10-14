import { GradientBoundCheck } from './fillStyleSpec.js';
/** Bin Sayısı alanının varsayılan değeri (kayıtlı/geçerli değer yoksa). */
export declare const DEFAULT_BIN_COUNT = "5";
/** Renk Modu dropdown seçeneği. */
export interface ColorModeOption {
    /** `FillStyle.mode` değeri. */
    value: string;
    /** Dropdown'da görünen ad. */
    label: string;
}
export declare const FILL_COLOR_MODES: readonly ColorModeOption[];
/** Kategori Sırası dropdown seçeneği. */
export interface CategorySortOption {
    /** `sortCategoryValues`'a geçen sıralama anahtarı. */
    value: string;
    /** Dropdown'da görünen ad. */
    label: string;
}
export declare const CATEGORY_SORT_OPTIONS: readonly CategorySortOption[];
/** Dolgu kartı template'lerinin stil editöründen okuyup yazdığı state ve çağırdığı metotlar. */
export interface FillCardHost {
    /** Renk modu (solid/gradient/bin/enum/off). */
    colorMode: string;
    /** Seçili veri sütunu. */
    dataColumn: string;
    /** Seçili gradient paletinin adı. */
    gradientPalette: string;
    /** Min alanı (boş = otomatik). */
    gradientMin: string;
    /** Max alanı (boş = otomatik). */
    gradientMax: string;
    /** Min alanındaki geçersiz değer uyarısı (boş = geçerli). */
    gradientMinError: string;
    /** Max alanındaki geçersiz değer uyarısı (boş = geçerli). */
    gradientMaxError: string;
    /** Bin sayısı (metin alanı değeri). */
    binCount: string;
    /** Kategori sırası anahtarı. */
    categorySort: string;
    /** Palet ters çevrilmiş mi. */
    paletteReversed: boolean;
    /** Kategori değerleri. */
    categoryValues: (string | number)[];
    /** Kategori -> renk eşlemesi. */
    categoryColors: Record<string, string>;
    /** Sabit dolgu rengi (hex). */
    fillColor: string;
    /** Dolgu opaklığı (0-100). */
    readonly fillOpacity: number;
    /** Tüm veri sütunları (Kategorik için). */
    readonly dataColumns: readonly string[];
    /** Sayısal veri sütunları (Gradient/Bin için). */
    readonly numericDataColumns: readonly string[];
    /** Renk Modu seçimi gizli mi (Çizim/Ölçü katmanı). */
    readonly isFixedSolidLayer: boolean;
    /** Min alanına negatif değer girilebilir mi. */
    allowNegativeMin(): boolean;
    /** Max alanına negatif değer girilebilir mi. */
    allowNegativeMax(): boolean;
    /** Min veya Max alanına yazılan değerin geçerliliğini denetler (veri aralığı, Min <= Max). */
    checkGradientBound(edited: "min" | "max", value: string): GradientBoundCheck;
    /** Stili (gecikmeli) haritaya uygular. */
    scheduleApplyStyle(): void;
    /** Kategori değerlerini seçili sıraya göre sıralar. */
    sortCategoryValues(values: (string | number)[]): (string | number)[];
    /** Her kategori değeri için bir renk garanti eder. */
    autoFillCategoryColors(values: (string | number)[], existing: Record<string, string>): Record<string, string>;
    /** Opaklık kaydırıcısının dolgu göstergesini günceller. */
    updateOpacitySlider(input: HTMLInputElement, value: number): void;
    /** Dolgu opaklığını ayarlar ve uygular. */
    setFillOpacity(value: number): void;
    /** Veri sütunu değişimini işler (aralık/kategori keşfi ve uygulama). */
    onDataColumnChange(column: string): void;
}
/**
 * Stil editörünün "Dolgu" kartını render eder.
 * @param host - Kartın okuyup yazdığı editör state'i ve metotları.
 * @returns Kartın Lit template'i.
 */
export declare function renderFillCard(host: FillCardHost): import('lit').TemplateResult<1>;
//# sourceMappingURL=fillCard.d.ts.map