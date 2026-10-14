import { ReactiveController, ReactiveControllerHost } from 'lit';
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
export declare class DraggablePanelController implements ReactiveController {
    private readonly options;
    private _header;
    private _panel;
    private _offset;
    /**
     * @param host - Controller'ın bağlanacağı Lit bileşeni; DOM'dan kaldırılınca süren sürükleme iptal edilir.
     * @param options - Sürüklenecek panel, sürüklemeyi başlatmayan elemanlar ve hareket geri çağrısı.
     */
    constructor(host: ReactiveControllerHost, options: DraggablePanelOptions);
    /** Lit yaşam döngüsü: host DOM'dan kaldırılınca süren sürüklemeyi iptal eder (bkz {@link cancel}). */
    hostDisconnected(): void;
    /**
     * Başlığın `pointerdown` olayında çağrılır; sol tık değilse veya `ignoreSelector`'e uyan bir elemandan başladıysa yok sayılır.
     * @param event - Başlık elemanında (`currentTarget`) yakalanan `pointerdown` olayı.
     */
    start(event: PointerEvent): void;
    /**
     * Süren sürüklemenin durumunu sıfırlar ve başlık dinleyicilerini kaldırır (sürükleme yoksa bir şey yapmaz).
     */
    cancel(): void;
    private readonly _move;
    private readonly _end;
    private _removeListeners;
    private _reset;
}
//# sourceMappingURL=DraggablePanelController.d.ts.map