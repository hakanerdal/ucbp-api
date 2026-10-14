// WHY: TucbsLayerList'teki surukle-birak mekanigi (pointer capture, yer
// tutucu konumlandirma, window seviyesinde dinleyici yonetimi) `_layers`/
// `LayerManager`'dan TAMAMEN bagimsiz, saf DOM/pointer fizigi -- God
// Component kilavuzu GC-03 4.4 Adim 5: bu mantik TucbsLayerList'e ozgu
// degil, ayri bir module tasinir. TucbsLayerList.ts'ten TEK SATIR davranis
// degisikligi OLMADAN tasinmistir; surukleme bittiginde `onReorder`
// callback'i cagrilir, yeni siranin `_layers`'a uygulanmasi VE
// `LayerManager.reorder()` cagrisi (is mantigi) caller'da (TucbsLayerList)
// kalir.

interface DragState {
  handle: HTMLElement;
  item: HTMLElement;
  list: HTMLElement;
  placeholder: HTMLElement;
  pointerId: number;
  offsetY: number;
  onMove: (event: PointerEvent) => void;
  onEnd: (event: PointerEvent) => void;
}

/**
 * Pointer tabanli surukle-birak ile `.layer-item[data-layer-id]` ogelerinin
 * bir liste icindeki gorsel sirasini degistiren saf DOM/pointer mekanigi.
 */
export class DragReorder {
  private state: DragState | null = null;

  /**
   * @param onReorder Bir surukleme bittiginde cagirilir. `draggedId`
   * suruklenen ogenin (`item.dataset.layerId`) kimligi -- element bu
   * veri-niteligini tasimiyorsa `undefined` olabilir. `nextId` (varsa)
   * suruklenenin birakildigi yerde ONUNE gelen ogenin kimligidir;
   * listenin SONUNA birakildiysa `undefined`.
   */
  constructor(
    private readonly onReorder: (draggedId: string | undefined, nextId: string | undefined) => void,
  ) {}

  /** Surukle-birak baslatir (bir `.drag-handle`'in pointerdown handler'indan cagirilir). */
  start(event: PointerEvent, item: HTMLElement, handle: HTMLElement, list: HTMLElement): void {
    if (event.button !== 0 || this.state) return;

    event.preventDefault();
    handle.setPointerCapture(event.pointerId);

    const rect = item.getBoundingClientRect();
    const placeholder = document.createElement("div");
    placeholder.className = "layer-placeholder";
    placeholder.style.height = `${rect.height}px`;

    item.after(placeholder);
    item.classList.add("layer-item--dragging");
    item.style.left = `${rect.left}px`;
    item.style.top = `${rect.top}px`;
    item.style.width = `${rect.width}px`;

    const state: DragState = {
      handle,
      item,
      list,
      placeholder,
      pointerId: event.pointerId,
      offsetY: event.clientY - rect.top,
      onMove: (moveEvent) => this.move(moveEvent),
      onEnd: (endEvent) => this.end(endEvent),
    };

    // "window"'a BILEREK eklenir, "handle"'a DEGIL: eskiden dinleyiciler
    // sadece handle.setPointerCapture()'un basariyla teslim ettigi olaylara
    // guveniyordu -- capture herhangi bir nedenle (ör. surukleme sirasinda
    // handle'in Lit tarafindan yeniden render/degistirilmesi, tarayici
    // tuhafligi) dusup pointerup/pointercancel handle'a HIC ulasmazsa,
    // end() ASLA cagrilmiyor, state sonsuza dek dolu kaliyor ve tum panel
    // "donmus" gorunuyordu (bkz kullanici bildirimi: surukleme yer
    // tutucusu/oge takili kalip komple panel tepkisiz kaliyordu). window
    // seviyesinde dinlemek, capture basarisiz olsa bile (olay normal bubble
    // ile window'a ulasir) bu kilitlenmeyi imkansiz kilar -- setPointerCapture
    // yine de CAGRILIYOR (bkz yukarisi) cunku surukleme sirasinda imlecin
    // ALTINDAKI diger elementlerin hover/pointer olaylarini yanlislikla
    // almasini onlemek icin faydali, sadece TEK guvenlik agi olarak buna
    // guvenilmiyor.
    window.addEventListener("pointermove", state.onMove);
    window.addEventListener("pointerup", state.onEnd);
    window.addEventListener("pointercancel", state.onEnd);

    this.state = state;
  }

  private move(event: PointerEvent): void {
    const state = this.state;
    // window'daki dinleyiciler bu suruklemeyle ilgisiz TUM pointer'lardan
    // (ör. ikinci bir parmak/baska bir cihaz) olay alabilir -- sadece
    // surukelemeyi baslatan pointerId'yi isleriz.
    if (!state || event.pointerId !== state.pointerId) return;

    event.preventDefault();
    state.item.style.top = `${event.clientY - state.offsetY}px`;
    this.movePlaceholder(event.clientY);
  }

  private movePlaceholder(clientY: number): void {
    const state = this.state;
    if (!state) return;

    const siblings = [
      ...state.list.querySelectorAll<HTMLElement>(".layer-item[data-layer-id]"),
    ].filter((el) => el !== state.item);

    const insertBefore = siblings.find((el) => {
      const rect = el.getBoundingClientRect();
      return clientY < rect.top + rect.height / 2;
    });

    state.list.insertBefore(state.placeholder, insertBefore ?? null);
  }

  private end(event: PointerEvent): void {
    const state = this.state;
    // Bkz move() WHY yorumu -- window artik bu suruklemeyle ilgisiz
    // pointer'lardan da olay alabilir.
    if (!state || event.pointerId !== state.pointerId) return;

    window.removeEventListener("pointermove", state.onMove);
    window.removeEventListener("pointerup", state.onEnd);
    window.removeEventListener("pointercancel", state.onEnd);

    if (state.handle.hasPointerCapture(event.pointerId)) {
      state.handle.releasePointerCapture(event.pointerId);
    }

    const draggedId = state.item.dataset.layerId;
    const nextId = (state.placeholder.nextElementSibling as HTMLElement | null)
      ?.dataset.layerId;

    state.placeholder.remove();
    state.item.classList.remove("layer-item--dragging");
    state.item.removeAttribute("style");

    this.state = null;

    this.onReorder(draggedId, nextId);
  }

  /** Aktif bir surukleme varken cagrilirsa window dinleyicilerini temizler (ör. bilesen kaldirilirken/disconnectedCallback). */
  dispose(): void {
    if (!this.state) return;
    window.removeEventListener("pointermove", this.state.onMove);
    window.removeEventListener("pointerup", this.state.onEnd);
    window.removeEventListener("pointercancel", this.state.onEnd);
    this.state = null;
  }
}
