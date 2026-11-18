import { ImageryFeatureInfo, ImageryGeometryHint, LayerManager, LayerType, PickedFeatureDetail } from '@tucbs/core';
/** Kimlik sorgulama panelinde tek bir sonuç satırı (vektör ya da raster feature). */
export interface IdentifyResultItem {
    /** Sonucun ait olduğu katmanın başlığı; bulunamazsa feature adı ya da `"—"`. */
    readonly layerTitle: string;
    /** Katman türü; katman `LayerManager`'da bulunamazsa `undefined`. */
    readonly layerType: LayerType | undefined;
    /** Öznitelik tablosunda gösterilecek ad-değer çiftleri. */
    readonly propertyEntries: ReadonlyArray<[string, unknown]>;
    /** Vektör sonucun Cesium Entity'si; "Yakınlaş" bunun çerçevesine gider. */
    readonly entity?: PickedFeatureDetail["entity"];
    /** Raster sonucun sunucudan gelen geometrisi; varsa "Yakınlaş" tıklanan nokta yerine bunu kullanır. */
    readonly geometryHint?: ImageryGeometryHint | undefined;
}
/** Vektör tıklama sonucunu (`entity:click`) panel satırına çevirir; `layerId`/`featureId` öznitelikleri tabloya alınmaz. */
export declare function toResultItem(feature: PickedFeatureDetail, layerManager: LayerManager | undefined): IdentifyResultItem;
/** GetFeatureInfo sonuçlarını panel satırlarına çevirir; gösterilecek alanı olmayanları eler. */
export declare function toImageryResultItems(features: readonly ImageryFeatureInfo[], layerManager: LayerManager | undefined): IdentifyResultItem[];
/** Tüm sonuçlardan verilen sayfaya (0 tabanlı) düşen satırları döndürür. */
export declare function pagedTableItems(tableItems: readonly IdentifyResultItem[], accordionPage: number, pageSize: number): IdentifyResultItem[];
/** Satırın tüm sonuçlar içindeki 1 tabanlı sıra numarasını döndürür. */
export declare function itemGlobalIndex(tableItems: readonly IdentifyResultItem[], item: IdentifyResultItem): number;
/** Kompakt panelin en büyük genişliği (px). */
export declare const COMPACT_PANEL_MAX_WIDTH = 720;
/** Sonuç satırının yatay iç boşluk ve kenarlık toplamı (px). */
export declare const COMPACT_ITEM_BODY_CHROME = 34;
/** Kompakt panelin ekran kenarlarına bıraktığı toplam boşluk (px). */
export declare const VIEWPORT_MARGIN = 32;
/** Verilen ekran genişliğinde kompakt paneldeki satır gövdesinin alabileceği en büyük genişliği (px) döndürür. */
export declare function compactItemBodyMaxWidth(viewportWidth: number): number;
/** Öznitelik değerini tabloda gösterilecek metne çevirir; nesneler JSON olur, boş değer `"—"` olur, uzun geometri metinleri koordinat sonlarında kırılabilir. */
export declare function formatPropertyValue(value: unknown): string;
//# sourceMappingURL=resultItems.d.ts.map