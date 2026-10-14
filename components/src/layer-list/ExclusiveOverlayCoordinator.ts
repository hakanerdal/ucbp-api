// WHY: TucbsLayerList icinde 4 "serbest kutu" (Veri Dosyasi Ekle/Cografi
// Veri Servisi Ekle/Stil Duzenle/Yetkili Katmanlar) ayni anda acik kalirsa
// ust uste binip alttakini tiklanamaz/okunamaz hale getiriyordu (bkz
// kullanici ekran goruntusu) -- her biri acilirken DIGER UCUNU kapatmasi
// gerekiyordu. Bu, her "ac" metodunun diger 3'unu ELLE kapatmasina yol
// aciyordu (4 metod, her biri 2-3 satir tekrar) -- 5. bir kutu eklenseydi
// MEVCUT 4 metodun HEPSININ guncellenmesi gerekirdi ("shotgun surgery"
// riski). Bu jenerik sinif, her kutunun kendi kapatma fonksiyonunu BIR KEZ
// register ettigi, "birini ac" dendiginde digerlerinin KENDILIGINDEN
// kapatildigi TEK bir yere indirger (God Component kilavuzu GC-03
// yardimci-sinif cikarma plani, Faz 3).

/**
 * Aynı anda sadece BİRİNİN açık kalması gereken, birbirinden habersiz
 * "serbest kutuların" karşılıklı dışlamasını yönetir.
 *
 * @typeParam Id Kayıtlı kutuların kimlikleri için kapalı bir birleşim tipi.
 */
export class ExclusiveOverlayCoordinator<Id extends string> {
  private readonly closers = new Map<Id, () => void>();

  /**
   * Bir kutunun kapatma fonksiyonunu kaydeder -- genelde `connectedCallback`
   * içinde, bileşenin ömrü boyunca bir kez (aynı `id` ile tekrar çağrılması
   * sadece önceki kaydı değiştirir, hata vermez).
   */
  register(id: Id, close: () => void): void {
    this.closers.set(id, close);
  }

  /** `id` ile kayıtlı kutu HARİÇ, kayıtlı diğer tüm kutuların kapatma fonksiyonlarını çağırır. */
  closeOthers(id: Id): void {
    for (const [otherId, close] of this.closers) {
      if (otherId !== id) close();
    }
  }
}
