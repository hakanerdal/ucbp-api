import { ReactiveController, ReactiveControllerHost } from 'lit';
export declare function syncVirtualScrollbar(list: HTMLElement, thumb: HTMLElement): void;
export declare function startVirtualScrollbarDrag(event: PointerEvent, list: HTMLElement, onDragEnd?: () => void): () => void;
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