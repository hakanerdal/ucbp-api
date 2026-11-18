/** `<tucbs-print-tool>`'un desteklediği ISO 216 kağıt boyutu. */
export type PaperSize = "a0" | "a1" | "a2" | "a3" | "a4" | "a5";
/** Sayfa yönü (yatay/dikey). */
export type PageOrientation = "landscape" | "portrait";
/** Kağıt boyutlarının dikey yöndeki ölçüleri ve görünen adları. */
export declare const PAPER_SIZES_MM: Record<PaperSize, {
    /** Dikey yöndeki genişlik (mm). */
    readonly widthMm: number;
    /** Dikey yöndeki yükseklik (mm). */
    readonly heightMm: number;
    /** Seçicide görünen ad (ör. `"A4"`). */
    readonly label: string;
}>;
/** Sayfa yönlerinin seçicide görünen adları. */
export declare const ORIENTATION_LABELS: Record<PageOrientation, string>;
/**
 * Verilen kağıt boyutu ve yöne göre nihai sayfa boyutunu (mm) döner.
 * @param paperSize - ISO 216 kağıt boyutu.
 * @param orientation - Sayfa yönü; `"landscape"` verilirse genişlik/yükseklik yer değiştirir.
 * @returns `{ widthMm, heightMm }`.
 */
export declare function getPageDimensionsMm(paperSize: PaperSize, orientation: PageOrientation): {
    /** Sayfa genişliği (mm). */
    widthMm: number;
    /** Sayfa yüksekliği (mm). */
    heightMm: number;
};
/** Panel ilk açıldığında seçili gelen varsayılan kağıt boyutu. */
export declare const DEFAULT_PAPER_SIZE: PaperSize;
/** Panel ilk açıldığında seçili gelen varsayılan yön. */
export declare const DEFAULT_PAGE_ORIENTATION: PageOrientation;
/**
 * HTML niteliğinden gelen kağıt boyutu metnini doğrular; büyük/küçük harf
 * ve baştaki/sondaki boşluk önemsenmez (`"A3"` → `"a3"`).
 * @param value - `page-size` niteliğinin/özelliğinin değeri.
 * @returns Tanınan kağıt boyutu; tanınmazsa `null`.
 */
export declare function parsePaperSize(value: unknown): PaperSize | null;
/**
 * HTML niteliğinden gelen yön metnini doğrular; büyük/küçük harf ve
 * baştaki/sondaki boşluk önemsenmez (`"LANDSCAPE"` → `"landscape"`).
 * @param value - `page-orientation` niteliğinin/özelliğinin değeri.
 * @returns Tanınan yön; tanınmazsa `null`.
 */
export declare function parsePageOrientation(value: unknown): PageOrientation | null;
//# sourceMappingURL=paperSizes.d.ts.map