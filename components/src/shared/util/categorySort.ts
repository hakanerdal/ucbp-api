// TucbsLegendPanel'in enum lejanti kategori anahtarlarini bu kuralla siralar
// (gercek hatalar plani H4.2'de oradan tasindi). Sayi gibi gorunen
// anahtarlar sayi olarak, digerleri metin olarak karsilastirilip kucukten
// buyuge siralanir -- TucbsStyleEditor._sortCategoryValues'in "asc"
// (varsayilan) davranisiyla AYNI mantik (H4.3'ten beri
// fillStyleSpec.sortCategoryValues da bu fonksiyonu kullanir).

/**
 * İki kategori anahtarını lejant sırası için karşılaştırır: ikisi de sayıya benziyorsa (ör. `"9"`, `"10"`) sayısal, değilse metin olarak.
 * @param a - Birinci anahtar.
 * @param b - İkinci anahtar.
 * @returns `Array.prototype.sort` karşılaştırıcısı sonucu (negatif: `a` önce, pozitif: `b` önce, 0: eşit).
 */
export function compareCategoryKeys(a: string, b: string): number {
  const aNum = Number(a);
  const bNum = Number(b);
  const aIsNumeric = Number.isFinite(aNum) && String(aNum) === a;
  const bIsNumeric = Number.isFinite(bNum) && String(bNum) === b;
  if (aIsNumeric && bIsNumeric) return aNum - bNum;
  return a < b ? -1 : a > b ? 1 : 0;
}
