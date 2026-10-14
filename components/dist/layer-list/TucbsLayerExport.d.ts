import { LitElement } from 'lit';
import { LayerManager } from '@tucbs/core';
/**
 * `tucbs-layer-export`: TucbsLayerList'in katman "..." (kebap) menüsüne
 * eklenen dışa aktarma aksiyonlarının varlığını belirleyen "çıplak marker"
 * -- aynı TucbsFileUpload/TucbsServiceUpload/TucbsStyleEditor/
 * TucbsLegendPanel deseni (bkz TucbsLayerList._layerExportMarker):
 * tüketicinin HTML'inde bu tag varsa ilgili menü öğe(leri) görünür.
 * Digerlerinden farklı olarak (dialog/panel değil, doğrudan indirme
 * olduğu için) hiçbir görsel çıktı üretmez ve document.body'ye AYRICA
 * portallanmaz -- bare marker'ın kendisi zaten fonksiyonel instance'dır
 * (bkz exportLayer/exportLayerAsGeoTiff). Gerçek yakalama/indirme mantığı
 * (TucbsMapExport/exportJPEG ile AYNI kural gereği) @tucbs/core'da
 * (LayerManager.exportLayerGeoJSON/exportLayerAsGeoTiff) yaşar, burası
 * sadece ince bir tetikleyicidir.
 */
export declare class TucbsLayerExport extends LitElement {
    /**
     * SADECE Çizim Katmanı (DRAWING) için sunulur (bkz TucbsLayerList).
     *
     * @example
     * ```ts
     * layerExport.exportLayer(map.layerManager, "katman-id", "katmanim");
     * ```
     */
    exportLayer(layerManager: LayerManager, id: string, title: string): void;
    /** Analiz sonucu katmanı KML indirir. Çizim menüsü bu metodu çağırmaz. */
    exportLayerKml(layerManager: LayerManager, id: string, title: string): void;
    /** Analiz sonucu katmanı Shapefile zip indirir. Çizim menüsü bu metodu çağırmaz. */
    exportLayerShapefile(layerManager: LayerManager, id: string, title: string): void;
    /**
     * SADECE sunucusu tiff/geotiff destekleyen WMS/WCS katmanları için
     * sunulur (bkz LayerManager.isGeoTiffExportAvailable). GeoJSON export'un
     * aksine ağdan gerçek bir GetMap/GetCoverage isteği attığı için
     * başarısız olabilir -- çağıran taraf (TucbsLayerList) hatayı yakalar.
     *
     * @example
     * ```ts
     * await layerExport.exportLayerAsGeoTiff(map.layerManager, "katman-id", "katmanim");
     * ```
     */
    exportLayerAsGeoTiff(layerManager: LayerManager, id: string, title: string): Promise<void>;
}
//# sourceMappingURL=TucbsLayerExport.d.ts.map