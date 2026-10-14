import { LitElement, nothing, PropertyValues } from 'lit';
import { LayerManager, Map as TucbsMapInstance } from '@tucbs/core';
/**
 * Haritadaki katmanları listeleyen, sürükle-bırak sıralanabilen, her katman için
 * görünürlük/opaklık/stil/lejant/dışa-aktarma aksiyonları sunan panel (`<tucbs-layer-list>`).
 * `LayerManager`'ın `layer:*` event'lerini dinleyerek listeyi canlı senkronlar.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya (ve `LayerManager`'a) otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-map id="map" api-key="YOUR_API_KEY" basemap="hgm-temel"></tucbs-map>
 *
 * <tucbs-layer-list
 *   mapElementId="map"
 *   panel-width="360px"
 *   collapsible
 * ></tucbs-layer-list>
 * ```
 */
export declare class TucbsLayerList extends LitElement {
    #private;
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Core JS API `LayerManager` referansı. */
    layerManager: LayerManager | undefined;
    /** Core JS API `Map` instance'ı — panel açıldığında haritayı soldan sıkıştırmak için kullanılır. */
    map: TucbsMapInstance | undefined;
    /** Opsiyonel: `tucbs-map` element'inin ID'si (2A: `ready` + property ile aynı işlemi yapar; W3C standardı değildir — kolaylık için). */
    mapElementId: string;
    /** Harita apiKey'i — yalnızca yazılabilir; `get` güvenlik nedeniyle her zaman maskelenmiş döner (bkz yukarıdaki `#apiKeyState` WHY notu). */
    set apiKey(value: string);
    get apiKey(): string;
    /** Panelin (ve açıldığında haritanın soldan daralacağı miktarın) genişliği. */
    panelWidth: string;
    /** Panelin daraltılabilir olup olmadığı. */
    collapsible: boolean;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM içine enjekte edebileceği keyfi CSS metni (bkz {@link _applyCustomCss}). */
    customCss: string;
    private _open;
    private _layers;
    private _openMenuId;
    private _geoTiffExportingId;
    private _uploadOpen;
    private _fileUploadAvailable;
    private _serviceUploadOpen;
    private _serviceUploadAvailable;
    private _styleEditorAvailable;
    private _legendAvailable;
    private _layerExportAvailable;
    private _legendOpenIds;
    private _authorizedLayersAvailable;
    private _authorizedLayersFetching;
    private _hasApiKey;
    private _fileUploadMarker;
    private _serviceUploadMarker;
    private _styleEditorMarker;
    private _legendMarker;
    private _layerExportMarker;
    private _authorizedLayersMarker;
    private readonly _fileUploadPortal;
    private readonly _serviceUploadPortal;
    private readonly _styleEditorPortal;
    private readonly _authorizedLayersPortal;
    private readonly _fileUploadWatcher;
    private readonly _serviceUploadWatcher;
    private readonly _styleEditorWatcher;
    private readonly _legendWatcher;
    private readonly _layerExportWatcher;
    private readonly _authorizedLayersWatcher;
    private _menuPortalEl;
    private _tooltipPortalEl;
    private readonly _colorById;
    private readonly _opacityById;
    private readonly _dragReorder;
    private readonly _overlayCoordinator;
    private readonly _customCssState;
    private readonly _layoutController;
    private readonly _opacityRaf;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    private readonly _onDocumentPointerDown;
    private readonly _onDocumentKeyDown;
    private readonly _onWindowScrollOrResize;
    private _showPortalTooltip;
    private _hidePortalTooltip;
    private readonly _onLayerAdd;
    private readonly _onLayerRemove;
    private readonly _onLayerReorder;
    private readonly _onLayerVisibility;
    private readonly _onLayerOpacity;
    private readonly _onLayerStyle;
    /** Bileşen DOM'a bağlandığında: global dinleyicileri, portal elementlerini ve sıra dışı bileşen (upload/style-editor/legend/export) varlık bayraklarını kurar. */
    connectedCallback(): void;
    /** Bileşen DOM'dan kaldırıldığında: global dinleyicileri, portalları ve bekleyen RAF/sürükleme durumunu temizler. */
    disconnectedCallback(): void;
    /** `layerManager`/`map` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
    firstUpdated(): void;
    /** Reactive property değişikliklerini (customCss/map/layerManager/apiKey vb.) işler ve bağlı Core JS API instance'larını senkronlar. */
    updated(changed: PropertyValues): void;
    private _bindLayerManager;
    private _unbindLayerManager;
    private readonly _onApiKeyChange;
    private _syncFromLayerManager;
    private _toLayerItem;
    private _openPanel;
    private _closePanel;
    private _closeStyleEditorIfOpen;
    private _closeAuthorizedLayersIfOpen;
    private _openUpload;
    private _closeUpload;
    private _openServiceUpload;
    private _closeServiceUpload;
    /**
     * "Yetkili Katmanlarımı Getir" butonu — diğer serbest kutuları kapatıp
     * `<tucbs-authorized-layers>` portalının `fetchAndOpen()`'ını tetikler
     * (bkz GC-03 4.4 Adım 3, asıl fetch/dialog mantığı artık o bileşende).
     */
    private _openAuthorizedLayers;
    private _setVisible;
    private _setLayerColor;
    private _setOpacity;
    private _applyOpacity;
    private _updateOpacitySlider;
    private _remove;
    private _bringToFront;
    private _zoomToLayer;
    private _closeMenu;
    private _toggleMenu;
    private _openMenuPortal;
    private _openStyleEditor;
    private _toggleLegend;
    private _exportLayer;
    /** Analiz sonucu katmanı KML indirir. Çizim menüsü bu yolu kullanmaz. */
    private _exportLayerKml;
    /** Analiz sonucu katmanı Shapefile zip indirir. Çizim menüsü bu yolu kullanmaz. */
    private _exportLayerShapefile;
    private _exportLayerAsGeoTiff;
    private _applyReorder;
    /** Bileşenin şablonunu render eder (`layerManager` bağlanmamışsa tamamen gizli kalır). */
    render(): import('lit').TemplateResult<1> | typeof nothing;
    private _renderHeader;
    private _renderLayerRow;
}
//# sourceMappingURL=TucbsLayerList.d.ts.map