import type { ReactiveController, ReactiveControllerHost } from "lit";

// TucbsStyleEditor (Değerler / Lejant listeleri), TucbsIdentifyPanel ve
// TucbsServiceUpload'ta BİREBİR AYNI tekrarlanan _syncXScrollThumb/
// _startXThumbDrag/_onXThumbDragMove/_endXThumbDrag dörtlüsünün (bkz. God
// Component kılavuzu GC-02 3.2 "Birebir Kopya Kaydırma Çubuğu") tek,
// paylaşılan hesaplaması. Native scrollbar'ı (host'un CSS'inde
// scrollbar-width:none ile) tamamen gizleyip, görünen göstergeyi
// (.xxx-scroll-thumb) kendimiz çiziyoruz: thumb'ın top/height'i
// scrollTop/scrollHeight/clientHeight'tan hesaplanır.
//
// Sabit TEK bir liste/thumb çifti olan bileşenler (TucbsStyleEditor'ın iki
// listesi, TucbsServiceUpload'ın "Katmanlar" listesi, TucbsLegendPanel'in
// lejant listesi) asagidaki
// `VirtualScrollbar` sinifini kullanir. TucbsIdentifyPanel ise AYNI ANDA
// BIRDEN FAZLA liste/thumb cifti barindirabildigi (accordion'daki her acik
// ".item-body") icin bunlari sabit @query alanlariyla degil, DOM gezintisiyle
// (closest/querySelector) çağrı anında bulur -- bu yuzden sinifin
// KENDISINI degil, altindaki saf `syncVirtualScrollbar`/
// `startVirtualScrollbarDrag` fonksiyonlarini dogrudan kullanir. Ikisi de
// AYNI hesabi paylasir, sadece cagiran taraf farkli DOM cozumlemesi yapar.
// TucbsLegendPanel de (tek liste/thumb ciftine ragmen) eskiden saf
// fonksiyonlari kullaniyordu; sinifin hostDisconnected temizligine gecis
// gercek hatalar plani H5.2'de ayri bir davranis degisikligi olarak yapildi.
export function syncVirtualScrollbar(list: HTMLElement, thumb: HTMLElement): void {
  const { scrollHeight, clientHeight, scrollTop } = list;
  const scrollableDistance = scrollHeight - clientHeight;
  if (scrollableDistance <= 1) {
    thumb.style.display = "none";
    return;
  }

  thumb.style.display = "block";
  const thumbHeight = Math.max(24, (clientHeight / scrollHeight) * clientHeight);
  const maxThumbTop = clientHeight - thumbHeight;
  const thumbTop = (scrollTop / scrollableDistance) * maxThumbTop;
  thumb.style.height = `${thumbHeight}px`;
  thumb.style.top = `${thumbTop}px`;
}

// `event.currentTarget` (thumb'ın kendisi) üzerinde `pointerdown` ile
// tetiklenir -- panel BAŞLIĞINI sürüklemek için kullanılan
// `DraggablePanelController.start` (shared/ui/DraggablePanelController.ts) ile AYNI `setPointerCapture`/pointermove/
// pointerup/pointercancel deseni (bu dosyaya özgü icat edilmiş bir yöntem
// değil, kod tabanında zaten yerleşik bir yaklaşım). Sürüklemeyi başlatır
// ve sürüklemeyi durdurup dinleyicileri temizleyen bir `stop()` fonksiyonu
// döndürür -- `VirtualScrollbar` sınıfı
// bunu `hostDisconnected()` içinde (host, sürükleme bitmeden DOM'dan
// kaldırılırsa) çağırır; TucbsIdentifyPanel gibi dogrudan cagiran taraflar
// icin ise pointerup/pointercancel'da zaten kendiliginden cagrilir, donen
// deger yoksayilabilir.
//
// Thumb'in kendisi scrollTop'u DOGRUDAN YAZMAZ -- YENI scrollTop'u
// hesaplayip list.scrollTop'a atar; asil gorsel guncelleme (thumb'in
// top/height'i), bunun tetikledigi native "scroll" event'i uzerinden
// syncVirtualScrollbar()'in (bkz. template'teki @scroll baglama) tekrar
// cagrilmasiyla gelir.
export function startVirtualScrollbarDrag(
  event: PointerEvent,
  list: HTMLElement,
  onDragEnd?: () => void,
): () => void {
  const noop = (): void => {};
  if (event.button !== 0) return noop;

  event.preventDefault();
  const thumb = event.currentTarget as HTMLElement;
  const thumbRect = thumb.getBoundingClientRect();
  const dragOffsetY = event.clientY - thumbRect.top;

  const onMove = (moveEvent: PointerEvent): void => {
    const listRect = list.getBoundingClientRect();
    const maxThumbTop = list.clientHeight - thumb.offsetHeight;
    if (maxThumbTop <= 0) return;

    const rawTop = moveEvent.clientY - listRect.top - dragOffsetY;
    const clampedTop = Math.min(Math.max(rawTop, 0), maxThumbTop);
    const scrollableDistance = list.scrollHeight - list.clientHeight;
    list.scrollTop = (clampedTop / maxThumbTop) * scrollableDistance;
  };

  const stop = (endEvent?: PointerEvent): void => {
    thumb.removeEventListener("pointermove", onMove);
    thumb.removeEventListener("pointerup", onEnd);
    thumb.removeEventListener("pointercancel", onEnd);
    if (endEvent && thumb.hasPointerCapture(endEvent.pointerId)) {
      thumb.releasePointerCapture(endEvent.pointerId);
    }
    onDragEnd?.();
  };
  const onEnd = (endEvent: PointerEvent): void => stop(endEvent);

  thumb.setPointerCapture(event.pointerId);
  thumb.addEventListener("pointermove", onMove);
  thumb.addEventListener("pointerup", onEnd);
  thumb.addEventListener("pointercancel", onEnd);

  return () => stop();
}

// ReactiveController olarak seçilmesinin sebebi: hostDisconnected() otomatik
// çağrılır, böylece GC-04'teki (TucbsIdentifyPanel) temizlenmemiş dinleyici
// sorunu bu bileşenlerde tekrarlanmaz -- sürükleme sırasında host DOM'dan
// kaldırılırsa thumb'a eklenen pointermove/pointerup/pointercancel
// dinleyicileri burada temizlenir. SABİT tek liste/thumb çifti olan
// bileşenler (bkz dosya başındaki WHY) bu sınıfı kullanır.
export class VirtualScrollbar implements ReactiveController {
  private _stopDrag: (() => void) | null = null;

  constructor(
    private readonly host: ReactiveControllerHost,
    private readonly getList: () => HTMLElement | undefined,
    private readonly getThumb: () => HTMLElement | undefined,
  ) {
    host.addController(this);
  }

  hostDisconnected(): void {
    this._stopDrag?.();
    this._stopDrag = null;
  }

  /** Thumb'ın top/height'ini listenin güncel scroll durumuna göre yeniden hesaplar. */
  sync(): void {
    const list = this.getList();
    const thumb = this.getThumb();
    if (!list || !thumb) return;
    syncVirtualScrollbar(list, thumb);
  }

  /** Thumb üzerinde `pointerdown` ile tetiklenir; sürüklemeyi başlatır. */
  startDrag(event: PointerEvent): void {
    const list = this.getList();
    if (!list) return;
    this._stopDrag = startVirtualScrollbarDrag(event, list, () => {
      this._stopDrag = null;
    });
  }
}
