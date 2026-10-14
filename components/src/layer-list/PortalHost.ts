// WHY: TucbsLayerList icinde dosya/servis yukleme ve stil editoru
// dialoglarinin ucu de AYNI "ensure/sync/dispose" iskeletini tekrar
// ediyordu (bkz TucbsLayerList.ts alan yorumu -- bu diyaloglarin
// document.body'ye DOGRUDAN eklenmesinin/"portallanmasinin" nedeni orada
// aciklanir). God Component kilavuzu GC-03 4.4 Adim 1: bu tekrari TEK bir
// jenerik yardimciya indir. Uc cagiran arasindaki TEK fark hangi alanlarin
// senkronlandigi (customCss, open, apiKey vb.) ve (stil editorunde hic
// olmayan) bir kapanma olayinin dinlenip dinlenmedigi -- ikisi de
// constructor parametresi olarak disariya acilir.

/**
 * `document.body`'ye dogrudan eklenen ("portallanan") TEK bir custom element
 * instance'inin yasam dongusunu (olustur/senkronla/kaldir) yonetir.
 *
 * @typeParam T Portallanan custom element'in tipi.
 */
export class PortalHost<T extends HTMLElement> {
  private el: T | null = null;

  /**
   * @param tag Olusturulacak custom element'in etiket adi (ör. `"tucbs-file-upload"`).
   * @param sync `ensure()` ilk olusturmada VE her `update()` cagrisinda, portal elementine guncel durumu (ör. `open`/`customCss`) uygulamak icin cagrilir.
   * @param closeEvent Dinlenecek kapanma olayinin adi (ör. `"tucbs-file-upload-closed"`); bazi portallarda (ör. stil editoru) hic yok, bu durumda atlanir.
   * @param onClose `closeEvent` tetiklendiginde cagrilacak geri cagirim.
   */
  constructor(
    private readonly tag: string,
    private readonly sync: (el: T) => void,
    private readonly closeEvent?: string,
    private readonly onClose?: () => void,
  ) {}

  /** Portal elementi (henuz `ensure()` cagrilmadiysa veya `dispose()` edildiyse `null`). */
  get element(): T | null {
    return this.el;
  }

  /** Portal elementi yoksa olusturup body'ye ekler ve senkronlar; zaten varsa HICBIR SEY yapmaz (idempotent). */
  ensure(): void {
    if (this.el) return;
    const el = document.createElement(this.tag) as T;
    // GC-03 Adim 6 (Faz 3): layer-list/MarkerWatcher.ts'in "cIplak marker"
    // aramasi AYNI etiket adini tasiyan bu portal kopyasini tuketicinin
    // GERCEK marker'iyla KARISTIRMAMASI icin -- bkz MarkerWatcher.ts'teki
    // ":not([data-tucbs-portal])" disleme WHY yorumu.
    el.setAttribute("data-tucbs-portal", "");
    if (this.closeEvent && this.onClose) {
      el.addEventListener(this.closeEvent, this.onClose);
    }
    document.body.appendChild(el);
    this.el = el;
    this.sync(el);
  }

  /** Portal elementi varsa guncel durumu yeniden uygular; yoksa hicbir sey yapmaz (ensure() cagrilmamis/dispose edilmis olabilir). */
  update(): void {
    if (this.el) this.sync(this.el);
  }

  /** Portal elementini DOM'dan kaldirir ve ic referansi sifirlar. */
  dispose(): void {
    this.el?.remove();
    this.el = null;
  }
}
