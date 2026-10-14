import { LitElement, PropertyValues } from 'lit';
import { LayerManager } from '@tucbs/core';
/**
 * GeoJSON/KML/KMZ/SHP(ZIP)/CSV dosyalarını sürükle-bırak veya dosya seçici ile
 * haritaya katman olarak yükleten diyalog (`<tucbs-file-upload>`, `cds-file-uploader`
 * tabanlı).
 * @fires tucbs-file-upload-closed - Diyalog kapatıldığında (`open` false yapılır); `detail` yok.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya (ve `LayerManager`'a) otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-file-upload mapElementId="map" accepted-types="geojson,kml,shp"></tucbs-file-upload>
 * ```
 */
export declare class TucbsFileUpload extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Diyaloğun açık olup olmadığı (`open` attribute'una reflect edilir). */
    open: boolean;
    /** Core JS API `LayerManager` referansı. */
    layerManager: LayerManager | undefined;
    /** Opsiyonel: `tucbs-map` element'inin ID'si (2A: `ready` + property ile aynı işlemi yapar; W3C standardı değildir — kolaylık için). */
    mapElementId: string;
    /** Virgülle ayrılmış dosya uzantıları (örn. `"geojson,kml"`). Boş ise desteklenen tüm formatlar (geojson, kml, kmz, shp ZIP paketi, csv) kabul edilir. */
    acceptedTypes: string;
    /** Kabul edilen azami dosya boyutu (MB). */
    maxFileSizeMb: number;
    /** Sürükle-bırak ile dosya yüklemenin etkin olup olmadığı. */
    dragDrop: boolean;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
    customCss: string;
    private _error;
    private _uploading;
    private readonly _customCssState;
    private readonly _drag;
    /** `layerManager` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
    firstUpdated(): void;
    /** Reactive property değişikliklerini işler: `customCss`'i uygular, `open` true yapıldığında sürüklemeden kalan konumu sıfırlar. */
    updated(changedProperties: PropertyValues<this>): void;
    /** Bileşen DOM'dan kaldırıldığında açık kalmış olabilecek toast'ı yok eder. */
    disconnectedCallback(): void;
    private _close;
    private _activeFormats;
    private _detectFormat;
    private _handleFileAdded;
    /** Bileşenin şablonunu render eder (yükleme sürerken bağımsız gösterge, `open` false ise boş şablon). */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsFileUpload.d.ts.map