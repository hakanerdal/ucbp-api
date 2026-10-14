import { LayerType } from '@tucbs/core';
import { LayerMenuAction } from './LayerMenuPortal.js';
/** `buildLayerMenuActions`'ın karar vermek için okuduğu minimal katman alanları. */
export interface MenuActionLayer {
    styleMode: string | undefined;
    layerType: LayerType;
}
/** Hangi ek aksiyonların görünebileceğine dair, `LayerManager`'dan ÖNCEDEN okunmuş bayraklar. */
export interface MenuActionFlags {
    styleEditorAvailable: boolean;
    legendAvailable: boolean;
    layerExportAvailable: boolean;
    isAnalysisResult: boolean;
    isGeoTiffExportAvailable: boolean;
}
/** Her aksiyonun tıklanınca çağıracağı geri çağırım. */
export interface MenuActionCallbacks {
    zoomToLayer: () => void;
    bringToFront: () => void;
    remove: () => void;
    openStyleEditor: () => void;
    toggleLegend: () => void;
    exportLayer: () => void;
    exportLayerKml: () => void;
    exportLayerShapefile: () => void;
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