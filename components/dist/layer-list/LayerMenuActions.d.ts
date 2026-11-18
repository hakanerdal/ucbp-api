import { LayerType } from '@tucbs/core';
import { LayerMenuAction } from './LayerMenuPortal.js';
/** `buildLayerMenuActions`'ın karar vermek için okuduğu minimal katman alanları. */
export interface MenuActionLayer {
    /** Katmanın dolgu modu; `"solid"` ise Lejant aksiyonu gösterilmez. */
    styleMode: string | undefined;
    /** Katman türü; dışa aktarma ve Lejant aksiyonlarını belirler. */
    layerType: LayerType;
}
/** Hangi ek aksiyonların görünebileceğine dair, `LayerManager`'dan ÖNCEDEN okunmuş bayraklar. */
export interface MenuActionFlags {
    /** Sayfada `<tucbs-style-editor>` var mı; varsa "Stil Düzenle" gösterilir. */
    styleEditorAvailable: boolean;
    /** Sayfada `<tucbs-legend-panel>` var mı; varsa "Lejant" gösterilebilir. */
    legendAvailable: boolean;
    /** Sayfada `<tucbs-layer-export>` var mı; dışa aktarma aksiyonlarının ön koşulu. */
    layerExportAvailable: boolean;
    /** Katman bir analiz sonucu mu; ise GeoJSON/KML/Shapefile alt menüsü gösterilir. */
    isAnalysisResult: boolean;
    /** Katmanın sunucusu GeoTIFF çıktısını destekliyor mu (WMS/WCS). */
    isGeoTiffExportAvailable: boolean;
}
/** Her aksiyonun tıklanınca çağıracağı geri çağırım. */
export interface MenuActionCallbacks {
    /** "Yakınlaş": haritayı katmana yakınlaştırır. */
    zoomToLayer: () => void;
    /** "En Üste Taşı": katmanı çizim sırasında en üste alır. */
    bringToFront: () => void;
    /** "Kaldır": katmanı haritadan kaldırır. */
    remove: () => void;
    /** "Stil Düzenle": stil editörünü bu katman için açar. */
    openStyleEditor: () => void;
    /** "Lejant": katmanın lejantını açar ya da kapatır. */
    toggleLegend: () => void;
    /** Katmanı GeoJSON olarak dışa aktarır. */
    exportLayer: () => void;
    /** Katmanı KML olarak dışa aktarır. */
    exportLayerKml: () => void;
    /** Katmanı Shapefile (ZIP) olarak dışa aktarır. */
    exportLayerShapefile: () => void;
    /** Katmanı GeoTIFF olarak dışa aktarır. */
    exportLayerAsGeoTiff: () => void;
}
/**
 * Katman "..." (kebap) menüsünde hangi aksiyonların, hangi sırada
 * görüneceğine karar verir -- `TucbsLayerList.ts`'teki `_openMenuPortal`'ın
 * (God Component kılavuzu GC-03 yardımcı-sınıf çıkarma planı, Faz 2) SAF
 * karar mantığı. `LayerManager`'a dokunmaz -- gerekli tüm sorgular `flags`
 * üzerinden ÖNCEDEN çözülmüş olarak gelir, bu yüzden mock'suz test edilebilir.
 */
export declare function buildLayerMenuActions(layer: MenuActionLayer, flags: MenuActionFlags, callbacks: MenuActionCallbacks): LayerMenuAction[];
//# sourceMappingURL=LayerMenuActions.d.ts.map