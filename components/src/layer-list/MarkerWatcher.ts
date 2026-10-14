// WHY: TucbsLayerList'in "çıplak marker" keşfi (bkz. God Component kılavuzu
// GC-03 4.4 Adım 6, "KL-02") eskiden `connectedCallback` içinde BİR KEZ
// yapılan `document.querySelector` taramasıydı -- iki sınırlaması vardı:
// (a) `document`'ten DEĞİL, çağıranın KENDİ kökünden (`getRootNode()`)
// aranmıyordu, bu yüzden TucbsLayerList gerçek bir Shadow DOM içine
// gömülseydi kardeş marker'ı BULAMAZDI (bkz
// TucbsLayerList.siblingDiscovery.characterization.test.ts); (b) TEK
// SEFERLİKTİ -- marker `connectedCallback` SONRASINDA DOM'a eklenirse (ör.
// geç bağlanan bir SPA sarmalayıcısı) hiç yakalanmazdı. Bu sınıf ikisini de
// çözer: `host.getRootNode()`'dan arar VE bir `MutationObserver` ile o kökü
// canlı izler -- marker sonradan eklenir/kaldırılırsa `onChange` tekrar
// çağrılır.
//
// ":not([data-tucbs-portal])" DIŞLAMASI ZORUNLU: TucbsLayerList'in kendi
// portalladığı kopya (bkz PortalHost.ensure()) AYNI etiket adını taşır --
// MutationObserver bu kopyanın KENDİ eklenişini de bir mutasyon olarak
// görüp yeniden tarama yapar; dışlama olmasaydı, tüketicinin GERÇEK
// marker'ı kaldırıldığında sorgu YANLIŞLIKLA bu portal kopyasını "marker"
// sanıp `onChange`'i hatalı bir elementle tetikler, gerçek kaldırma hiç
// fark edilmezdi (deneyle bulundu -- bkz commit geçmişi).

/**
 * Bir "çıplak marker" custom element'in (`tagName`) `host`'un kendi
 * kökünde (document veya shadow root) var olup olmadığını canlı izler.
 */
export class MarkerWatcher<T extends Element = Element> {
  private observer: MutationObserver | null = null;
  private current: T | null = null;

  /** @param onChange Marker'ın varlığı (keşfedilen element VEYA `null`) DEĞİŞTİĞİNDE çağırılır -- `start()` ilk taramada da bir kez çağırır. */
  constructor(
    private readonly host: HTMLElement,
    private readonly tagName: string,
    private readonly onChange: (marker: T | null) => void,
  ) {}

  /** İlk taramayı yapar ve kökü canlı izlemeye başlar (bir kez, `host.connectedCallback()`'ten çağrılmalı). */
  start(): void {
    const root = this.host.getRootNode() as Document | ShadowRoot;
    this.evaluate(root);
    this.observer = new MutationObserver(() => this.evaluate(root));
    this.observer.observe(root, { childList: true, subtree: true });
  }

  private evaluate(root: Document | ShadowRoot): void {
    const marker = root.querySelector<T>(`${this.tagName}:not([data-tucbs-portal])`);
    if (marker !== this.current) {
      this.current = marker;
      this.onChange(marker);
    }
  }

  /** İzlemeyi durdurur (`host.disconnectedCallback()`'ten çağrılmalı). */
  dispose(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.current = null;
  }
}
