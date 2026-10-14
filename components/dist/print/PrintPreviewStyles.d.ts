import { PrintPreviewContent } from './PrintPreviewBuilder.js';
/** Sayfa 1'de "Veri Setleri" sarmalayicisina (uyari kutusu+baslik+icerik) ayrilabilecek azami yukseklik (mm) -- `appendDatasetsSection()` ile PAYLASILIR. */
export declare function computeLegendMaxHeightMm(content: PrintPreviewContent): number;
export declare const DATASETS_HEADER_BLOCK_MM = 34;
/** Sayfa 1'de LEJANT SATIRLARINA (uyari kutusu+baslik DUSULEREK) ayrilabilecek azami yukseklik (mm). */
export declare function computeDatasetsListMaxHeightMm(content: PrintPreviewContent): number;
/** Yazdirma onizleme dokumaninin TUM CSS'ini (temel sayfa + lejant) tek bir `<style>` elemani olarak uretir. */
export declare function buildPageStyle(doc: Document, content: PrintPreviewContent): HTMLStyleElement;
//# sourceMappingURL=PrintPreviewStyles.d.ts.map