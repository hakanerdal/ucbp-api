import { Map as TucbsMapCore } from '@tucbs/core';
/** Haritada tıklanıp analize seçilen nesne (GeoJSON Feature). */
export type SelectedFeature = {
    /** GeoJSON türü; her zaman `"Feature"`. */
    type: "Feature";
    /** Nesnenin kimliği (varsa). */
    id?: string | number | undefined;
    /** Nesnenin öznitelikleri. */
    properties: Record<string, unknown>;
    /** GeoJSON geometrisi. */
    geometry: object & {
        /** Geometri türü (ör. `"Polygon"`). */
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
    /** Bağlı haritayı döndürür; henüz bağlanmadıysa `map` ya da `mapElementId` üzerinden çözmeyi dener. */
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