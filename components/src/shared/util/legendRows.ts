import { formatLegendNumber } from "./legendFormat.js";

// God component refactor Faz 3.4b: Surekli (Gradient) ve Kesikli (Bin)
// lejant satiri uretimi TucbsLegendPanel, TucbsStyleEditor ve
// print/PrintLegendData'da UC AYRI kopya olarak yaziliydi (ornekleme sayisi
// GRADIENT_LEGEND_STEPS de uc kez tanimliydi); H3 (sayi etiketleri) ve H4
// (siralama) duzeltmeleri her kopyaya tek tek yapilmak zorunda kalmisti.
// Satir matematigi (adim konumu t, deger/aralik, etiket) artik TEK yerde;
// renk ornekleyici parametre olarak verilir -- her kullanici kendi renk
// kuralini (paletteKind'li ya da degil) bugunku haliyle korur.

/** Bir lejant listesindeki tek bir renk-etiket satırı (bin/enum/gradient girdilerinde kullanılır). */
export interface LegendRow {
  /** Satırın renk swatch'ı (hex/rgb). */
  readonly color: string;
  /** Satırın etiketi (değer aralığı veya kategori adı). */
  readonly label: string;
}

/** Paletin `t` (0-1) konumundaki rengini döndüren örnekleyici. */
export type LegendColorSampler = (t: number) => string;

// Surekli (Gradient) Lejant kartinda kac ornek (swatch+deger) satiri
// gosterilecegi -- referans uygulamadaki Lejant panelinin AYNI sayida
// (0'dan max'a esit araliklı 7 deger) gosterdigi tespit edildi (bkz
// kullanici bildirimi, ekran goruntusu karsilastirmasi).
// TucbsStyleEditor ve TucbsLegendPanel AYNI degeri kullanir -- iki
// bilesendeki Lejant gorunumunun (StyleEditor'un canli onizlemesi vs.
// katman-listesi paneli) TUTARLI kalmasi icin.
// ESKIDEN print/PrintLegendData.ts'te de "tek dogru kaynak burada
// tekrarlanamadigindan (o dosya bu paketin PUBLIC bir komponenti, bu ise
// internal), deger BILEREK birebir kopyalanir" notuyla ayri bir kopya
// vardi; bu modul internal oldugundan uc kullanici da artik buradan okur.
/** Sürekli (Gradient) lejantındaki örnek satır sayısı. */
export const GRADIENT_LEGEND_STEPS = 7;

/**
 * Sürekli (Gradient) lejant satırları: `steps` adet eşit aralıklı, tek değerli örnek, yüksekten düşüğe (t=1 → max, t=0 → min).
 * @param min - Aralığın alt ucu.
 * @param max - Aralığın üst ucu.
 * @param sample - Renk örnekleyici.
 * @param steps - Satır sayısı (varsayılan {@link GRADIENT_LEGEND_STEPS}).
 * @returns Lejant satırları.
 */
export function gradientLegendRows(
  min: number,
  max: number,
  sample: LegendColorSampler,
  steps: number = GRADIENT_LEGEND_STEPS,
): LegendRow[] {
  return Array.from({ length: steps }, (_, index) => {
    const t = steps <= 1 ? 1 : 1 - index / (steps - 1);
    const value = min + t * (max - min);
    return { color: sample(t), label: formatLegendNumber(value) };
  });
}

/**
 * Kesikli (Bin) lejant satırları: eşit genişlikte `binCount` sınıf, küçükten büyüğe; tek sınıfta paletin ortası (t=0.5) kullanılır.
 * @param min - Aralığın alt ucu.
 * @param max - Aralığın üst ucu.
 * @param binCount - Sınıf sayısı.
 * @param sample - Renk örnekleyici.
 * @returns Lejant satırları (`"alt – üst"` etiketli).
 */
export function binLegendRows(min: number, max: number, binCount: number, sample: LegendColorSampler): LegendRow[] {
  const step = (max - min) / binCount;
  return Array.from({ length: binCount }, (_, index) => {
    const low = min + step * index;
    const high = min + step * (index + 1);
    const t = binCount <= 1 ? 0.5 : index / (binCount - 1);
    return { color: sample(t), label: `${formatLegendNumber(low)} – ${formatLegendNumber(high)}` };
  });
}
