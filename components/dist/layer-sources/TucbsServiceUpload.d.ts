import { LitElement, PropertyValues } from 'lit';
import { LayerManager } from '@tucbs/core';
/**
 * Bir OGC servis URL'inden (WMS/WMTS/WFS/WCS) GetCapabilities ile katman keşfeden,
 * seçilen katmanları önizleyip haritaya ekleyen diyalog (`<tucbs-service-upload>`).
 * @fires tucbs-service-upload-closed - Diyalog kapatıldığında (`open` false yapılır); `detail` yok.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya (ve `LayerManager`'a) otomatik bağlanır (Senaryo 2).
 * Alternatif olarak, `TucbsLayerList`'in katman "..." menüsüyle AYNI şekilde,
 * `mapElementId` VERİLMEDEN çıplak bir marker (`<tucbs-service-upload>`) olarak
 * da eklenebilir — bu durumda `TucbsLayerList` kendi `layerManager`/`apiKey`'ini
 * portal ile bu marker'a aktarır (bkz `TucbsLayerList._syncServiceUploadPortal`).
 *
 * @example
 * ```html
 * <tucbs-service-upload mapElementId="map"></tucbs-service-upload>
 * ```
 */
export declare class TucbsServiceUpload extends LitElement {
    #private;
    static readonly styles: import('lit').CSSResult;
    /** Diyaloğun açık olup olmadığı (`open` attribute'una reflect edilir). */
    open: boolean;
    /** Core JS API `LayerManager` referansı. */
    layerManager: LayerManager | undefined;
    /** Opsiyonel: `tucbs-map` element'inin ID'si (2A: `ready` + property ile aynı işlemi yapar; W3C standardı değildir — kolaylık için). */
    mapElementId: string;
    /** Harita apiKey'i — yalnızca yazılabilir; `get` güvenlik nedeniyle her zaman maskelenmiş döner (bkz yukarıdaki `#apiKey` WHY notu). */
    set apiKey(value: string);
    get apiKey(): string;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
    customCss: string;
    private readonly _customCssState;
    private _serviceType;
    private _serviceUrl;
    private _discovering;
    private readonly _discovery;
    private _discoveryError;
    private _discoveredItems;
    private _discoveredTiffFormat;
    private _selectedIdentifiers;
    private _addError;
    private _previewIdentifier;
    private _previewSpec;
    private readonly _drag;
    private static readonly PREVIEW_HEIGHT_PX;
    private _previewEl;
    private _discoveredListEl?;
    private _scrollThumbEl?;
    private readonly _listScroll;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    /** Bileşen DOM'a bağlandığında pencere `resize` dinleyicisini kurar (önizleme konumu/scroll-thumb senkronu için). */
    connectedCallback(): void;
    /** Bileşen DOM'dan kaldırıldığında `resize` dinleyicisini ve gömülü önizleme elementini kaldırır. */
    disconnectedCallback(): void;
    private readonly _onWindowResize;
    private _ensurePreviewEl;
    private _syncPreviewPosition;
    private _updatePreview;
    /** `layerManager` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
    firstUpdated(): void;
    /** Reactive property değişikliklerini işler, önizlemeyi ve liste scroll-thumb'unu günceller. */
    updated(changedProperties: PropertyValues<this>): void;
    private _close;
    private _resetDiscovery;
    private _toggleSelected;
    private _togglePreview;
    private _previewSpecFor;
    private _resetFields;
    private _selectServiceType;
    private _setServiceUrl;
    private _addOneLayer;
    private _addSelectedLayers;
    private _addButtonLabel;
    /** Bileşenin şablonunu render eder (`open` false ise boş şablon). */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsServiceUpload.d.ts.map