/** Bir lejant listesindeki tek bir renk-etiket satırı (bin/enum/gradient girdilerinde kullanılır). */
export interface LegendRow {
    /** Satırın renk swatch'ı (hex/rgb). */
    readonly color: string;
    /** Satırın etiketi (değer aralığı veya kategori adı). */
    readonly label: string;
}
/** Paletin `t` (0-1) konumundaki rengini döndüren örnekleyici. */
export type LegendColorSampler = (t: number) => string;
/** Sürekli (Gradient) lejantındaki örnek satır sayısı. */
export declare const GRADIENT_LEGEND_STEPS = 7;
/**
 * Sürekli (Gradient) lejant satırları: `steps` adet eşit aralıklı, tek değerli örnek, yüksekten düşüğe (t=1 → max, t=0 → min).
 * @param min - Aralığın alt ucu.
 * @param max - Aralığın üst ucu.
 * @param sample - Renk örnekleyici.
 * @param steps - Satır sayısı (varsayılan {@link GRADIENT_LEGEND_STEPS}).
 * @returns Lejant satırları.
 */
export declare function gradientLegendRows(min: number, max: number, sample: LegendColorSampler, steps?: number): LegendRow[];
/**
 * Kesikli (Bin) lejant satırları: eşit genişlikte `binCount` sınıf, küçükten büyüğe; tek sınıfta paletin ortası (t=0.5) kullanılır.
 * @param min - Aralığın alt ucu.
 * @param max - Aralığın üst ucu.
 * @param binCount - Sınıf sayısı.
 * @param sample - Renk örnekleyici.
 * @returns Lejant satırları (`"alt – üst"` etiketli).
 */
export declare function binLegendRows(min: number, max: number, binCount: number, sample: LegendColorSampler): LegendRow[];
//# sourceMappingURL=legendRows.d.ts.map