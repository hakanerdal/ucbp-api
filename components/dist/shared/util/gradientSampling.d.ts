import { PaletteKind } from '@tucbs/core';
/**
 * Paletin `t` (0-1) konumundaki rengini, palet turune gore (qualitative: en yakin renk, diger: dogrusal karisim) CSS `rgb()` olarak dondurur.
 * @param palette - Hex renk paleti.
 * @param t - 0-1 arasi konum (disindaki degerler sinirlanir).
 * @param paletteKind - Palet turu; `undefined` ise dogrusal karisim.
 * @returns CSS renk metni (bos palette `"#808080"`).
 */
export declare function sampleFromPaletteCss(palette: readonly string[], t: number, paletteKind: PaletteKind | undefined): string;
/**
 * Bir hex renk kodunu (3 veya 6 haneli, `#` opsiyonel) `[r, g, b]` bileşenlerine çevirir.
 * @param hex - Dönüştürülecek hex renk (ör. `"#3388ff"` veya `"#38f"`).
 * @returns `[r, g, b]` (0-255 aralığında).
 */
export declare function hexToRgb(hex: string): [number, number, number];
//# sourceMappingURL=gradientSampling.d.ts.map