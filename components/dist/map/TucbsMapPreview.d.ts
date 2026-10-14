import { LitElement, PropertyValues } from 'lit';
import { Map, BasemapId, LayerType, WMSLayerOptions, WMTSLayerOptions, WFSLayerOptions, WCSLayerOptions, GeoTiffLayerOptions, LocalLayerOptions } from '@tucbs/core';
/** `<tucbs-map-preview>`'in `layer` property'sinin kabul ettigi sekil — `LayerManager.add()` ile ayni {layerType, options} eslesmesini bilerek yansitir. */
export interface PreviewLayerSpec {
    /** Katmanın veri kaynağı/servis türü. */
    readonly layerType: LayerType;
    /** `layerType`'a karşılık gelen katman seçenekleri (`LayerManager.add()` ile aynı eşleşme). */
    readonly options: WMSLayerOptions | WMTSLayerOptions | WFSLayerOptions | WCSLayerOptions | GeoTiffLayerOptions | LocalLayerOptions;
}
/**
 * Bagimsiz, canli mini-Cesium onizleme bileseni. `TucbsMap`'ten farkli olarak
 * disaridan hicbir map/layerManager referansi almaz — kendi Core JS API `Map`
 * instance'ini kendi icinde olusturur (mevcut/ana haritadan tamamen bagimsiz,
 * ikinci bir Cesium Viewer).
 *
 * WHY (gorunurluk tabanli lazy-mount + paylasilan LRU havuzu): sayfada 10+
 * eszamanli aktif Viewer WebGL context limitini asabilir. Bu yuzden Viewer
 * sadece bilesen ekranda gorunurken kurulur; havuz doluysa en eski kullanilan
 * onizleme otomatik pasiflestirilir (bkz. map/PreviewViewerPool.ts).
 *
 * @example
 * ```html
 * <tucbs-map-preview
 *   api-key="YOUR_API_KEY"
 *   basemap="hgm-temel"
 *   width="320px"
 *   height="220px"
 *   layer-options='{"layerType":"WMS","options":{"id":"world-continents","title":"World Continents (WMS)","url":"https://demo.mapserver.org/cgi-bin/wms","layers":"continents","version":"1.3.0"}}'
 * ></tucbs-map-preview>
 * ```
 */
export declare class TucbsMapPreview extends LitElement {
    #private;
    private readonly _autoId;
    private get hostId();
    set apiKey(value: string);
    get apiKey(): string;
    /** Gösterilecek altlık harita (basemap) kimliği. */
    basemap: BasemapId;
    /** Harita görünüm modu ("2D" veya "3D"). */
    mode: "2D" | "3D";
    /** Önizleme kutusunun CSS genişliği (ör. "300px"). */
    width: string;
    /** Önizleme kutusunun CSS yüksekliği (ör. "200px"). */
    height: string;
    /** Önizlenecek katman tanımı (`{layerType, options}`) — bkz. `PreviewLayerSpec`. */
    layer: PreviewLayerSpec | undefined;
    /** `layer` ile aynı şekle sahip, HTML attribute (`layer-options`) üzerinden JSON string olarak verilebilen alternatif katman tanımı; ikisi de doluysa bu önceliklidir. */
    layerOptions: PreviewLayerSpec | undefined;
    /** Yakınlaştır/uzaklaştır butonlarının gösterilip gösterilmeyeceği. */
    showZoomButtons: boolean;
    /** true ise katman eklendiğinde kamera, sabit varsayılan görünüm yerine katmanın kendi konumuna yaklaştırılır (varsayılan false). */
    zoomToLayer: boolean;
    private _active;
    private _mapInstance;
    private _loading;
    private _observer;
    private _resizeObserver;
    private _currentLayerId;
    private _unregisterApiKeyRefresh;
    private _basemapBlocked;
    /** Bileşenin kendi bağımsız Core JS API `Map` instance'ı (bileşen aktif değilken `null`). */
    get map(): Map | null;
    /** Shadow DOM yerine Light DOM kullanır (Cesium widgets.css'in sızabilmesi için, bkz aşağıdaki WHY yorumu). */
    protected createRenderRoot(): HTMLElement;
    /** Lit lifecycle: bileşen DOM'a bağlandığında görünürlük tabanlı lazy-mount için IntersectionObserver kurar. */
    connectedCallback(): void;
    /** Lit lifecycle: bileşen DOM'dan kaldırıldığında observer'ı durdurur ve haritayı deaktive eder. */
    disconnectedCallback(): void;
    /** Lit lifecycle: `basemap`/`mode`/`apiKey`/`layer`/`layerOptions` değişikliklerine göre haritayı senkronize eder. */
    updated(changed: PropertyValues): void;
    private _requestActivate;
    private _requestDeactivate;
    private _mountMap;
    private _deactivate;
    private _syncBasemap;
    private readonly _syncGeneration;
    private _syncLayer;
    private _waitForTilesLoaded;
    private _addLayer;
    private static readonly ZOOM_STEP_RATIO;
    private _zoomIn;
    private _zoomOut;
    /** Bileşenin şablonunu render eder: önizleme kutusu, zoom butonları, yükleniyor/basemap-engellendi overlay'leri. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsMapPreview.d.ts.map