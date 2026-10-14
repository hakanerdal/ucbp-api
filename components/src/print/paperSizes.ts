/** `<tucbs-print-tool>`'un desteklediği ISO 216 kağıt boyutu. */
export type PaperSize = "a0" | "a1" | "a2" | "a3" | "a4" | "a5";
/** Sayfa yönü (yatay/dikey). */
export type PageOrientation = "landscape" | "portrait";

// ISO 216 kagit olculeri (mm, PORTRE taban -- genislik<yukseklik) -- v17
// SS8.3 magic-number yasagi geregi adlandirilmis sabit olarak tutulur.
export const PAPER_SIZES_MM: Record<
  PaperSize,
  { readonly widthMm: number; readonly heightMm: number; readonly label: string }
> = {
  a0: { widthMm: 841, heightMm: 1189, label: "A0" },
  a1: { widthMm: 594, heightMm: 841, label: "A1" },
  a2: { widthMm: 420, heightMm: 594, label: "A2" },
  a3: { widthMm: 297, heightMm: 420, label: "A3" },
  a4: { widthMm: 210, heightMm: 297, label: "A4" },
  a5: { widthMm: 148, heightMm: 210, label: "A5" },
};

export const ORIENTATION_LABELS: Record<PageOrientation, string> = { landscape: "Yatay", portrait: "Dikey" };

/**
 * Verilen kağıt boyutu ve yöne göre nihai sayfa boyutunu (mm) döner.
 * @param paperSize - ISO 216 kağıt boyutu.
 * @param orientation - Sayfa yönü; `"landscape"` verilirse genişlik/yükseklik yer değiştirir.
 * @returns `{ widthMm, heightMm }`.
 */
export function getPageDimensionsMm(
  paperSize: PaperSize,
  orientation: PageOrientation,
): { widthMm: number; heightMm: number } {
  const base = PAPER_SIZES_MM[paperSize];
  return orientation === "landscape"
    ? { widthMm: base.heightMm, heightMm: base.widthMm }
    : { widthMm: base.widthMm, heightMm: base.heightMm };
}
