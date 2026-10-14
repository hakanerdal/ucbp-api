import { Map as TucbsMapCore } from '@tucbs/core';
export type SelectedFeature = {
    type: "Feature";
    id?: string | number | undefined;
    properties: Record<string, unknown>;
    geometry: object & {
        type?: string;
    };
};
/**
 * Analiz formunun harita tıklamasını seçime çevirir; identify araç açıkken susar.
 */
export declare class AnalysisMapBind {
    private readonly resolve;
    private readonly onPick;
    private readonly onBadGeoJson;
    private map;
    private host;
    private readonly onReady;
    constructor(resolve: () => {
        map: TucbsMapCore | null;
        mapElementId: string;
    }, onPick: (feature: SelectedFeature, label: string) => void, onBadGeoJson: () => void);
    /** Haritayı bulur ve entity tıklamasını dinler. */
    attach(): void;
    /** Dinleyiciyi ve identify askısını kaldırır. */
    detach(): void;
    current(): TucbsMapCore | null;
    /** Seçili nesneleri kırmızı vurguyla gösterir. */
    highlight(features: SelectedFeature[]): void;
    private listen;
    private readonly onClick;
}
/** Poligon veya çoklu poligon. */
export declare function isPolygonFeature(feature: SelectedFeature | null): boolean;
/** Nokta veya çoklu nokta. */
export declare function isPointFeature(feature: SelectedFeature | null): boolean;
//# sourceMappingURL=analysisMapBind.d.ts.map