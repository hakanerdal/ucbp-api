/**
 * `document.body`'ye dogrudan eklenen ("portallanan") TEK bir custom element
 * instance'inin yasam dongusunu (olustur/senkronla/kaldir) yonetir.
 *
 * @typeParam T Portallanan custom element'in tipi.
 */
export declare class PortalHost<T extends HTMLElement> {
    private readonly tag;
    private readonly sync;
    private readonly closeEvent?;
    private readonly onClose?;
    private el;
    /**
     * @param tag Olusturulacak custom element'in etiket adi (ör. `"tucbs-file-upload"`).
     * @param sync `ensure()` ilk olusturmada VE her `update()` cagrisinda, portal elementine guncel durumu (ör. `open`/`customCss`) uygulamak icin cagrilir.
     * @param closeEvent Dinlenecek kapanma olayinin adi (ör. `"tucbs-file-upload-closed"`); bazi portallarda (ör. stil editoru) hic yok, bu durumda atlanir.
     * @param onClose `closeEvent` tetiklendiginde cagrilacak geri cagirim.
     */
    constructor(tag: string, sync: (el: T) => void, closeEvent?: string | undefined, onClose?: (() => void) | undefined);
    /** Portal elementi (henuz `ensure()` cagrilmadiysa veya `dispose()` edildiyse `null`). */
    get element(): T | null;
    /** Portal elementi yoksa olusturup body'ye ekler ve senkronlar; zaten varsa HICBIR SEY yapmaz (idempotent). */
    ensure(): void;
    /** Portal elementi varsa guncel durumu yeniden uygular; yoksa hicbir sey yapmaz (ensure() cagrilmamis/dispose edilmis olabilir). */
    update(): void;
    /** Portal elementini DOM'dan kaldirir ve ic referansi sifirlar. */
    dispose(): void;
}
//# sourceMappingURL=PortalHost.d.ts.map