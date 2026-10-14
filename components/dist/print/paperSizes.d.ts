/** `<tucbs-print-tool>`'un desteklediği ISO 216 kağıt boyutu. */
export type PaperSize = "a0" | "a1" | "a2" | "a3" | "a4" | "a5";
/** Sayfa yönü (yatay/dikey). */
export type PageOrientation = "landscape" | "portrait";
export declare const PAPER_SIZES_MM: Record<PaperSize, {
    readonly widthMm: number;
    readonly heightMm: number;
    readonly label: string;
}>;
export declare const ORIENTATION_LABELS: Record<PageOrientation, string>;
/**
 * Verilen kağıt boyutu ve yöne göre nihai sayfa boyutunu (mm) döner.
 * @param paperSize - ISO 216 kağıt boyutu.
 * @param orientation - Sayfa yönü; `"landscape"` verilirse genişlik/yükseklik yer değiştirir.
 * @returns `{ widthMm, heightMm }`.
 */
export declare function getPageDimensionsMm(paperSize: PaperSize, orientation: PageOrientation): {
    widthMm: number;
    heightMm: number;
};
//# sourceMappingURL=paperSizes.d.ts.map