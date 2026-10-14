/**
 * Aynı anda sadece BİRİNİN açık kalması gereken, birbirinden habersiz
 * "serbest kutuların" karşılıklı dışlamasını yönetir.
 *
 * @typeParam Id Kayıtlı kutuların kimlikleri için kapalı bir birleşim tipi.
 */
export declare class ExclusiveOverlayCoordinator<Id extends string> {
    private readonly closers;
    /**
     * Bir kutunun kapatma fonksiyonunu kaydeder -- genelde `connectedCallback`
     * içinde, bileşenin ömrü boyunca bir kez (aynı `id` ile tekrar çağrılması
     * sadece önceki kaydı değiştirir, hata vermez).
     */
    register(id: Id, close: () => void): void;
    /** `id` ile kayıtlı kutu HARİÇ, kayıtlı diğer tüm kutuların kapatma fonksiyonlarını çağırır. */
    closeOthers(id: Id): void;
}
//# sourceMappingURL=ExclusiveOverlayCoordinator.d.ts.map