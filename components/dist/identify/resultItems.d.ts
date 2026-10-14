import { ImageryFeatureInfo, ImageryGeometryHint, LayerManager, LayerType, PickedFeatureDetail } from '@tucbs/core';
export interface IdentifyResultItem {
    readonly layerTitle: string;
    readonly layerType: LayerType | undefined;
    readonly propertyEntries: ReadonlyArray<[string, unknown]>;
    readonly entity?: PickedFeatureDetail["entity"];
    readonly geometryHint?: ImageryGeometryHint | undefined;
}
export declare function toResultItem(feature: PickedFeatureDetail, layerManager: LayerManager | undefined): IdentifyResultItem;
export declare function toImageryResultItems(features: readonly ImageryFeatureInfo[], layerManager: LayerManager | undefined): IdentifyResultItem[];
export declare function pagedTableItems(tableItems: readonly IdentifyResultItem[], accordionPage: number, pageSize: number): IdentifyResultItem[];
export declare function itemGlobalIndex(tableItems: readonly IdentifyResultItem[], item: IdentifyResultItem): number;
export declare const COMPACT_PANEL_MAX_WIDTH = 720;
export declare const COMPACT_ITEM_BODY_CHROME = 34;
export declare const VIEWPORT_MARGIN = 32;
export declare function compactItemBodyMaxWidth(viewportWidth: number): number;
export declare function formatPropertyValue(value: unknown): string;
//# sourceMappingURL=resultItems.d.ts.map