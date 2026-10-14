// Lejant satirlarindaki sayi etiketi kurali TucbsLegendPanel._formatNumber,
// PrintLegendData.formatNumber ve fillStyleSpec.formatLegendNumber
// (TucbsStyleEditor lejant karti) olarak UC KERE birebir kopyalanmisti
// (gercek hatalar plani H3.2); uc lejant da ayni ciktiyi vermeli, bu yuzden
// kural artik tek yerde.

// Gercek hatalar plani H3.3: lejant adimlari (min + t * (max - min),
// t = 1 - i/(steps-1)) ve bin sinirlari (min + step * i) kayan nokta hatasi
// tasir -- 0-60 araliginda 40 yerine 40.00000000000001 cikar ve eskiden
// Number.isInteger'dan gecemeyip "40.00" gosteriliyordu. En yakin tam
// sayiya bu kadar yakin degerler tam sayi sayilir. Tolerans GORELI:
// mutlak 1e-9 buyuk araliklarda yetmiyordu (0-60.000.000 araliginda hata
// 7.45e-9); 1e-12 x |deger| bu hesaplarin tipik hatasinin (~1e-15 goreli)
// yaklasik 1000 kati pay birakir, buyuk sayilarda bile 0.5 gibi gercek
// ondaliklari yutmaz.
const INTEGER_RELATIVE_TOLERANCE = 1e-12;

/**
 * Lejant satırındaki bir sayıyı etikete çevirir: tam sayılar (kayan nokta hatası taşıyanlar dahil) ondalıksız, diğerleri 2 ondalık haneyle.
 * @param value - Biçimlendirilecek değer; `undefined` ise `"?"` döner.
 * @returns Lejantta gösterilecek metin.
 */
export function formatLegendNumber(value: number | undefined): string {
  if (value === undefined) return "?";
  const rounded = Math.round(value);
  const tolerance = INTEGER_RELATIVE_TOLERANCE * Math.max(1, Math.abs(value));
  return Math.abs(value - rounded) <= tolerance ? String(rounded) : value.toFixed(2);
}
