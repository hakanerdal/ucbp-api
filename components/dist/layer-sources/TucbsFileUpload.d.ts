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
 * Katman Listesi'nin "Veri Dosyası Ekle" düğmesiyle açılan pencere, sayfadaki
 * `<tucbs-file-upload>` etiketinin `accepted-types`, `max-file-size-mb` ve
 * `drag-drop` değerlerini kullanır; bu yüzden nitelikler o etikete yazılır.
 *
 * @example
 * ```html
 * <tucbs-file-upload mapElementId="map" accepted-types="geojson,kml,shp"></tucbs-file-upload>
 * ```
 *
 * @example
 * ```html
 * <!-- En fazla 20 MB, yalnızca tıklayıp seçerek -->
 * <tucbs-file-upload mapElementId="map" max-file-size-mb="20" drag-drop="false"></tucbs-file-upload>
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
    /** Kabul edilen azami dosya boyutu (MB). `0` (varsayılan), boş ya da geçersiz değer: sınır yok. Sınırı aşan dosya yüklenmez, pencerede hata gösterilir. */
    maxFileSizeMb: number;
    /** Dosyanın kutuya sürüklenip bırakılarak eklenip eklenemeyeceği (varsayılan açık). Yalnızca `"false"` değeri kapatır; kapalıyken kutuya tıklayıp dosya seçme çalışmaya devam eder. */
    dragDrop: boolean;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
    customCss: string;
    private _error;
    private _uploading;
    private readonly _customCssState;
    private readonly _drag;
    /** `layerManager` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
    firstUpdated(): void;
    /** Pencere yeniden açılırken önceki denemenin hatasını render'dan önce temizler. */
    willUpdate(changedProperties: PropertyValues<this>): void;
    /** Reactive property değişikliklerini işler: `customCss`'i uygular, `open` true yapıldığında sürüklemeden kalan konumu sıfırlar. */
    updated(changedProperties: PropertyValues<this>): void;
    /** Bileşen DOM'dan kaldırıldığında açık kalmış olabilecek toast'ı yok eder. */
    disconnectedCallback(): void;
    private _close;
    private _activeFormats;
    /** "Sadece GeoJSON, KML dosyaları desteklenir." -- etkin biçimlerle. */
    private _formatError;
    private _sizeError;
    private readonly _blockDropWhenDisabled;
    private _detectFormat;
    private _handleFileAdded;
    /** Bileşenin şablonunu render eder (yükleme sürerken bağımsız gösterge, `open` false ise boş şablon). */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsFileUpload.d.ts.map