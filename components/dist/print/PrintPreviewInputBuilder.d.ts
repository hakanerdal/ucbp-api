import { Map as TucbsMapInstance } from '@tucbs/core';
import { PrintPreviewContent } from './PrintPreviewBuilder.js';
/** `buildPrintPreviewInput()`'a verilecek seçenekler. */
export interface PrintPreviewInputOptions {
    /** Canlı harita instance'ı (görüntü/kamera/katman verisi buradan okunur). */
    readonly map: TucbsMapInstance;
    /** Hedef sayfa boyutu (mm). */
    readonly pageDims: {
        readonly widthMm: number;
        readonly heightMm: number;
    };
    /** Sayfa başlığı (boşsa başlık/tarih bloğu hiç gösterilmez). */
    readonly printTitle: string;
    /** Sayfa altbilgisi (boşsa altbilgi bloğu hiç gösterilmez). */
    readonly footerText: string;
    /** Kuzey oku gösterilsin mi. */
    readonly showNorthArrow: boolean;
    /** Ölçek oranı ("1/N") gösterilsin mi. */
    readonly showScaleBar: boolean;
    /** Lejant bölümü gösterilsin mi. */
    readonly showLegend: boolean;
}
/**
 * Canli haritadan (o anki ekran/kamera durumu) + bilesen ozelliklerinden
 * (`options`), `PrintPreviewOverlayController.show()`'un bekledigi
 * `PrintPreviewContent` (imageBlobUrl HARIC, blob capture cagiran tarafta
 * kalir) nesnesini derler. Lejant cozumlemesi ASENKRON oldugundan (WMTS
 * icin getCapabilities agi gerektirebilir) fonksiyonun TAMAMI async'tir.
 */
export declare function buildPrintPreviewInput(options: PrintPreviewInputOptions): Promise<Omit<PrintPreviewContent, "imageBlobUrl">>;
//# sourceMappingURL=PrintPreviewInputBuilder.d.ts.map