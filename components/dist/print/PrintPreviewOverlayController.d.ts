import { PrintPreviewContent } from './PrintPreviewBuilder.js';
/**
 * `TucbsPrintTool`'un yazdirma onizleme `<iframe>`'inin (overlay + boyutlandirma
 * + belge insasi + yazdirma tetikleme + kapatma) yasam donguslunu kapsuller
 * -- `PanelLayoutController` ile AYNI gerekce: bu, Lit panel-UI render'iyla
 * (bkz. TucbsPrintPanelContent) ILGISIZ, kendi icinde tutarli bir sorumluluk
 * (v17 SS8.3 SRP) oldugu icin `TucbsPrintTool`'dan AYRI bir sinifta yasar.
 */
export declare class PrintPreviewOverlayController {
    private _overlayEl;
    private _iframe;
    private _imageUrl;
    /**
     * Onizleme dokumanini kurup gosterir. `imageBlob`'un sahipligini alir --
     * `close()` cagrilana kadar olusturulan Object URL'i kendisi yonetir/iptal
     * eder.
     */
    show(imageBlob: Blob, content: Omit<PrintPreviewContent, "imageBlobUrl">): Promise<void>;
    /** Önizleme overlay'ini kapatır/DOM'dan kaldırır ve `show()`'un oluşturduğu Object URL'i iptal eder. */
    close(): void;
    private _paginatePreview;
    private _triggerNativePrint;
    private _ensureOverlay;
    private _sizeIframe;
}
//# sourceMappingURL=PrintPreviewOverlayController.d.ts.map