import type { ReactiveController, ReactiveControllerHost } from "lit";

// TucbsStyleEditor, TucbsServiceUpload, TucbsFileUpload, TucbsIdentifyPanel
// (oznitelik paneli) ve TucbsAuthorizedLayers (yetkili katmanlar diyalogu)
// BIREBIR AYNI "baslik cubugundan surukle" ucslusunu (_startDrag/_moveDrag/
// _endDrag) tekrarliyordu (bkz God Component kilavuzu, Capraz Tekrarlar).
// Bu sinif o desenin tek kopyasidir: baslikta sol tikla basilinca pointer
// yakalanir, hareketlerde panelin left/top'u tutma noktasi sabit kalacak
// sekilde guncellenir, pointerup/pointercancel'da dinleyiciler kaldirilir.
//
// TucbsGoToCoordinate BILEREK kapsam disi: paneli toolbar kaymasindan
// bagimsiz bir TABAN konumda tutup kaymayi ayrica `translate` ile ekliyor
// ve transform'u sifirlamiyor -- onu da kapsamak bu sinifi, kazanilan
// tekrardan daha fazla karmasiklastirirdi.
//
// ReactiveController olarak yazildi (bkz VirtualScrollbar): host surukleme
// sirasinda DOM'dan kaldirilirsa hostDisconnected() baslik dinleyicilerini
// kaldirip durumu sifirlar. Eskiden bes kopyanin hicbiri bunu yapmiyordu --
// kopuk baslik hareket olaylarina tepki vermeye devam ediyordu
// (TucbsAuthorizedLayers'in disconnectedCallback'i ise window'dan, hic
// eklenmemis dinleyicileri kaldirmaya calisiyordu).

/** {@link DraggablePanelController} seçenekleri. */
export interface DraggablePanelOptions {
  /** Sürüklenecek paneli döndürür (başlık elemanı verilir); `null`/`undefined` ise sürükleme başlamaz. */
  readonly getPanel: (header: HTMLElement) => HTMLElement | null | undefined;
  /** Bu seçiciye uyan bir elemanın içinden başlayan basışlar sürüklemeyi başlatmaz (ör. kapat butonu). */
  readonly ignoreSelector: string;
  /** Her hareketten sonra çağrılır (ör. panele bağlı bir önizlemenin konumunu senkronlamak için). */
  readonly onMove?: () => void;
}

/** Bir paneli başlık çubuğundan sürüklenebilir yapan Lit reactive controller. */
export class DraggablePanelController implements ReactiveController {
  private _header: HTMLElement | null = null;
  private _panel: HTMLElement | null = null;
  private _offset: { x: number; y: number } | null = null;

  /**
   * @param host - Controller'ın bağlanacağı Lit bileşeni; DOM'dan kaldırılınca süren sürükleme iptal edilir.
   * @param options - Sürüklenecek panel, sürüklemeyi başlatmayan elemanlar ve hareket geri çağrısı.
   */
  constructor(
    host: ReactiveControllerHost,
    private readonly options: DraggablePanelOptions,
  ) {
    host.addController(this);
  }

  /** Lit yaşam döngüsü: host DOM'dan kaldırılınca süren sürüklemeyi iptal eder (bkz {@link cancel}). */
  hostDisconnected(): void {
    this.cancel();
  }

  /**
   * Başlığın `pointerdown` olayında çağrılır; sol tık değilse veya `ignoreSelector`'e uyan bir elemandan başladıysa yok sayılır.
   * @param event - Başlık elemanında (`currentTarget`) yakalanan `pointerdown` olayı.
   */
  start(event: PointerEvent): void {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest(this.options.ignoreSelector)) return;

    const header = event.currentTarget as HTMLElement;
    const panel = this.options.getPanel(header);
    if (!panel) return;

    const rect = panel.getBoundingClientRect();

    // Switch from centered (transform-based) positioning to absolute
    // top/left pinned at the current on-screen spot, so dragging doesn't jump.
    panel.style.left = `${rect.left}px`;
    panel.style.top = `${rect.top}px`;
    panel.style.transform = "none";

    this._header = header;
    this._panel = panel;
    this._offset = { x: event.clientX - rect.left, y: event.clientY - rect.top };

    header.setPointerCapture(event.pointerId);
    header.addEventListener("pointermove", this._move);
    header.addEventListener("pointerup", this._end);
    header.addEventListener("pointercancel", this._end);
  }

  /**
   * Süren sürüklemenin durumunu sıfırlar ve başlık dinleyicilerini kaldırır (sürükleme yoksa bir şey yapmaz).
   */
  cancel(): void {
    this._removeListeners();
    this._reset();
  }

  private readonly _move = (event: PointerEvent): void => {
    if (!this._offset || !this._panel) return;
    this._panel.style.left = `${event.clientX - this._offset.x}px`;
    this._panel.style.top = `${event.clientY - this._offset.y}px`;
    this.options.onMove?.();
  };

  private readonly _end = (event: PointerEvent): void => {
    const header = event.currentTarget as HTMLElement;
    header.removeEventListener("pointermove", this._move);
    header.removeEventListener("pointerup", this._end);
    header.removeEventListener("pointercancel", this._end);
    if (header.hasPointerCapture(event.pointerId)) header.releasePointerCapture(event.pointerId);
    this._reset();
  };

  private _removeListeners(): void {
    this._header?.removeEventListener("pointermove", this._move);
    this._header?.removeEventListener("pointerup", this._end);
    this._header?.removeEventListener("pointercancel", this._end);
  }

  private _reset(): void {
    this._header = null;
    this._panel = null;
    this._offset = null;
  }
}
