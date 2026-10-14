// `TucbsLegendPanel` (canli lejant paneli) ve `PrintLegendData` (yazdirma
// onizlemesindeki lejant, bkz Faz 2) AYNI gradient renk enterpolasyon
// mantigina ihtiyac duyar -- v17 SS8.1 DRY geregi (3+ kullanim yerine burada
// iki kullanim olsa da, ikisi de GORSEL DOGRULUK acisindan BIREBIR ayni
// sonucu uretmek ZORUNDA, ayrik kopyalar zamanla sapabilir) tek bir yerde
// tutulur.

import type { PaletteKind } from "@tucbs/core";

// ESKIDEN burada `paletteKind` gozetmeyen (her zaman dogrusal karisim
// yapan) bir `sampleGradientCss(palette, t)` sarmalayicisi da vardi; tek
// kullanicisi yazdirma lejantiydi ve qualitative paletlerde haritadan farkli
// renk gosteriyordu. Gercek hatalar plani 3.4c'de yazdirma da
// sampleFromPaletteCss'e gecti, sarmalayici kaldirildi.

// Kesikli (Bin) Lejant kartindaki her satirin swatch rengini hesaplar --
// LayerManager.sampleGradient/sampleDiscrete (private; @tucbs/core disina
// cikarilmasi -- public API yuzeyini buyutmemek icin -- tercih edilmedi)
// ile BIREBIR AYNI matematik: qualitative paletlerde
// karistirma YOK (en yakin palet rengine yuvarlanir), sequential/
// diverging'de dogrusal karisim (lerp). Lejant'ta gorunen renk, haritada
// GERCEKTEN uygulanan renkle boylece HER ZAMAN birebir eslesir.
//
// TucbsStyleEditor (style-editor/fillStyleSpec.ts uzerinden) ve
// TucbsLegendPanel AYNI fonksiyonu kullanir. TucbsLegendPanel'in ONCEKI
// kendi kopyasi paletteKind'i HIC gozetmiyordu -- qualitative (orn.
// Set2/Tableau10) bir palet Bin/Gradient'te secilse bile HER ZAMAN dogrusal
// karisim (lerp) uyguluyordu; bu, haritada (karistirmasiz, en yakin renge
// yuvarlanan) GERCEKTEN gorunen renkten FARKLI bir lejant renginin
// gosterilmesine yol aciyordu. `paletteKind` verilmezse (undefined)
// dogrusal karisim yapilir.

/**
 * Paletin `t` (0-1) konumundaki rengini, palet turune gore (qualitative: en yakin renk, diger: dogrusal karisim) CSS `rgb()` olarak dondurur.
 * @param palette - Hex renk paleti.
 * @param t - 0-1 arasi konum (disindaki degerler sinirlanir).
 * @param paletteKind - Palet turu; `undefined` ise dogrusal karisim.
 * @returns CSS renk metni (bos palette `"#808080"`).
 */
export function sampleFromPaletteCss(
  palette: readonly string[],
  t: number,
  paletteKind: PaletteKind | undefined,
): string {
  if (palette.length === 0) return "#808080";
  const clamped = Math.max(0, Math.min(1, t));
  if (paletteKind === "qualitative") {
    const index = Math.round(clamped * (palette.length - 1));
    return palette[index]!;
  }
  if (palette.length === 1) return palette[0]!;
  const scaled = clamped * (palette.length - 1);
  const lowIndex = Math.floor(scaled);
  const highIndex = Math.min(palette.length - 1, lowIndex + 1);
  const localT = scaled - lowIndex;
  const low = hexToRgb(palette[lowIndex]!);
  const high = hexToRgb(palette[highIndex]!);
  const r = Math.round(low[0] + (high[0] - low[0]) * localT);
  const g = Math.round(low[1] + (high[1] - low[1]) * localT);
  const b = Math.round(low[2] + (high[2] - low[2]) * localT);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Bir hex renk kodunu (3 veya 6 haneli, `#` opsiyonel) `[r, g, b]` bileşenlerine çevirir.
 * @param hex - Dönüştürülecek hex renk (ör. `"#3388ff"` veya `"#38f"`).
 * @returns `[r, g, b]` (0-255 aralığında).
 */
export function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized.length === 3 ? normalized.replace(/(.)/g, "$1$1") : normalized, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}
