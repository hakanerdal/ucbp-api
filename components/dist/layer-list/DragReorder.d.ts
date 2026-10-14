/**
 * Pointer tabanli surukle-birak ile `.layer-item[data-layer-id]` ogelerinin
 * bir liste icindeki gorsel sirasini degistiren saf DOM/pointer mekanigi.
 */
export declare class DragReorder {
    private readonly onReorder;
    private state;
    /**
     * @param onReorder Bir surukleme bittiginde cagirilir. `draggedId`
     * suruklenen ogenin (`item.dataset.layerId`) kimligi -- element bu
     * veri-niteligini tasimiyorsa `undefined` olabilir. `nextId` (varsa)
     * suruklenenin birakildigi yerde ONUNE gelen ogenin kimligidir;
     * listenin SONUNA birakildiysa `undefined`.
     */
    constructor(onReorder: (draggedId: string | undefined, nextId: string | undefined) => void);
    /** Surukle-birak baslatir (bir `.drag-handle`'in pointerdown handler'indan cagirilir). */
    start(event: PointerEvent, item: HTMLElement, handle: HTMLElement, list: HTMLElement): void;
    private move;
    private movePlaceholder;
    private end;
    /** Aktif bir surukleme varken cagrilirsa window dinleyicilerini temizler (ör. bilesen kaldirilirken/disconnectedCallback). */
    dispose(): void;
}
//# sourceMappingURL=DragReorder.d.ts.map