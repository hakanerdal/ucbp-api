import { ReactiveController, ReactiveControllerHost } from 'lit';
/** Özel kaydırma çubuğu thumb'ının konum ve yüksekliğini listenin kaydırma durumuna göre ayarlar. */
export declare function syncVirtualScrollbar(list: HTMLElement, thumb: HTMLElement): void;
/**
 * Thumb sürüklemesini başlatır; sürükleme listenin `scrollTop`'unu değiştirir.
 * @returns Sürüklemeyi durdurup dinleyicileri temizleyen fonksiyon.
 */
export declare function startVirtualScrollbarDrag(event: PointerEvent, list: HTMLElement, onDragEnd?: () => void): () => void;
/** Bir bileşendeki tek liste/thumb çifti için özel kaydırma çubuğu; host DOM'dan kaldırılınca süren sürüklemeyi temizler. */
export declare class VirtualScrollbar implements ReactiveController {
    private readonly host;
    private readonly getList;
    private readonly getThumb;
    private _stopDrag;
    constructor(host: ReactiveControllerHost, getList: () => HTMLElement | undefined, getThumb: () => HTMLElement | undefined);
    hostDisconnected(): void;
    /** Thumb'ın top/height'ini listenin güncel scroll durumuna göre yeniden hesaplar. */
    sync(): void;
    /** Thumb üzerinde `pointerdown` ile tetiklenir; sürüklemeyi başlatır. */
    startDrag(event: PointerEvent): void;
}
//# sourceMappingURL=VirtualScrollbar.d.ts.map