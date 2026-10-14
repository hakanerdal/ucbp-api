import { LitElement, PropertyValues } from 'lit';
import { Map, LayerManager, DrawingManager, InteractionManager, AnalysisManager, MapOptions, BasemapId, MapExtent } from '@tucbs/core';
import { ApiKeyAuthState } from '../shared/util/bindTucbsMap.js';
import type * as cesium from "cesium";
/**
 * Cesium tabanlı ana harita web component'i (`<tucbs-map>`) — Core JS API'nin
 * (`Map`/`LayerManager`/`DrawingManager`/`InteractionManager`/`AnalysisManager`)
 * DOM üzerinden kullanılmasını sağlar.
 * @fires ready - apiKey doğrulanıp harita (Cesium `Viewer`) başarıyla kurulduğunda; `detail: { map: Map }`.
 * @fires error - apiKey doğrulaması başarısız olduğunda (harita hiç kurulmaz); `detail: { error, message, title, code?, number? }`.
 *
 * @example
 * ```html
 * <tucbs-map
 *   id="map"
 *   api-key="YOUR_API_KEY"
 *   basemap="hgm-temel"
 *   mode="3D"
 *   quality="70"
 * ></tucbs-map>
 * <script type="module">
 *   const mapEl = document.getElementById("map");
 *   mapEl.addEventListener("ready", (event) => {
 *     const map = event.detail.map; // Core JS API `Map` instance'ı
 *     console.log(map.layerManager.getLayers());
 *   });
 *   mapEl.addEventListener("error", (event) => {
 *     console.error(event.detail.code, event.detail.message);
 *   });
 * </script>
 * ```
 */
export declare class TucbsMap extends LitElement {
    #private;
    private readonly _autoId;
    private get hostId();
    /** Harita apiKey'i — yalnızca yazılabilir; `get` güvenlik nedeniyle her zaman maskelenmiş döner (bkz yukarıdaki `#apiKeyState` WHY notu). */
    set apiKey(value: string);
    get apiKey(): string;
    /** Analiz backend'i (ucbp-api) için X-API-Key değeri. */
    authToken: string;
    /** JWT Bearer token; TUCBS API kimlik doğrulaması için. */
    proxyBase: string;
    /** Başlangıç altlık harita kimliği; değiştiğinde `map.setBasemap()` otomatik çağrılır. */
    basemap: BasemapId;
    /**
     * Harita ilk yüklendiğinde ortalanacak bölge (west/south/east/north, derece).
     * HTML attribute olarak JSON string kabul eder, ör:
     * `initialExtent='{"west":22.94,"south":34.05,"east":47.39,"north":42.7}'`.
     * Sadece `firstUpdated()` sırasında kullanılır; sonradan değiştirilmesi haritayı
     * otomatik hareket ettirmez (çalışma zamanında `map.setExtent()` kullanılmalı).
     * `mapOptions.camera` verilmişse yok sayılır.
     */
    initialExtent: MapExtent | undefined;
    /** Harita modu ("2D"/"3D"); değiştiğinde `map.setMode()` otomatik çağrılır. */
    mode: "2D" | "3D";
    /** Render kalitesi (0-100); değiştiğinde `map.setQuality()` otomatik çağrılır. */
    quality: number;
    /**
     * Core JS API'nin `MapOptions`'ını olduğu gibi tek bir property olarak alır
     * (camera, cesiumOptions, timeline, animation, vb.) — `firstUpdated()` içindeki
     * varsayılan değerlerin üzerine yazılır. HTML attribute olarak JSON string
     * kabul eder, ör: `mapOptions='{"camera":{"longitude":35,...}}'`.
     */
    mapOptions: MapOptions | undefined;
    /** `#cesium-host` CSS genişliği ("100%", "800px" gibi herhangi bir CSS boyut değeri). */
    mapWidth: string;
    /** `#cesium-host` CSS yüksekliği ("100%", "600px" gibi herhangi bir CSS boyut değeri). */
    mapHeight: string;
    /** @internal Gerçek Core JS API `Map` instance'ı; dışarıya {@link map} getter'ı ile (apiKey doğrulanmışsa) açılır. */
    _mapInstance: Map | null;
    private _skipInitialPropertySync;
    /** Validate hatası — harita üstünde sade overlay (modal değil). */
    private _authError;
    private _apiKeyAuthState;
    /** apiKey doğrulama durumu ("none" / "pending" / "ok" / "failed"). */
    get apiKeyAuthState(): ApiKeyAuthState;
    private _isMapApiExposed;
    /** Core JS API `Map` instance'ı; apiKey doğrulanana kadar `null`. */
    get map(): Map | null;
    /** Core JS API `LayerManager`'ı; apiKey doğrulanana kadar `undefined`. */
    get layerManager(): LayerManager | undefined;
    /** Core JS API `DrawingManager`'ı; apiKey doğrulanana kadar `undefined`. */
    get drawing(): DrawingManager | undefined;
    /** Core JS API `InteractionManager`'ı; apiKey doğrulanana kadar `undefined`. */
    get interaction(): InteractionManager | undefined;
    /** Core JS API `AnalysisManager`'ı; apiKey doğrulanana kadar `undefined`. */
    get analysisManager(): AnalysisManager | undefined;
    /** Cesium `Viewer` instance'ı; apiKey doğrulanana kadar `undefined`. */
    get viewer(): cesium.Viewer | undefined;
    /**
     * Gercek apiKey degerini DOGRUDAN hedefin apiKey setter'ina yazar (PUSH).
     * Hedef (ör. TucbsServiceUpload) bunu kendi basina OKUYAMAZ -- write-only
     * getter deseni (bkz yukaridaki #apiKeyState yorumu) hala geçerli; sadece bu
     * metodu cagirarak TucbsMap'in KENDI bildigi degeri "vermesini" isteyebilir.
     * Transfer TucbsMap'in KENDI closure'i icinde gerceklesir, disaridan
     * okunabilir yeni bir yuzey acilmaz.
     */
    _grantApiKeyTo(target: {
        apiKey: string;
    }): void;
    /** Shadow DOM yerine Light DOM kullanır (bkz yukarıdaki WHY yorumu). */
    protected createRenderRoot(): HTMLElement;
    /** Bileşen DOM'a bağlandığında: `id` yoksa otomatik-üretilen id'yi atar. */
    connectedCallback(): void;
    /** İlk render sonrası: apiKey'i doğrulayıp haritayı (Cesium `Viewer`'ı) kurar (bkz {@link _prepareMap}). */
    firstUpdated(): void;
    /** apiKey'i (instance veya global) Map kurulmadan ONCE dogrular; basarisizsa Map hic kurulmaz. */
    private _prepareMap;
    /** Reactive attribute değişikliklerini (basemap/mode/quality) Core JS API'ye iletir. */
    updated(changed: PropertyValues): void;
    /** Bileşen DOM'dan kaldırıldığında haritayı (Cesium `Viewer`'ı) yok eder. */
    disconnectedCallback(): void;
    /** Bileşenin şablonunu render eder (harita container'ı + apiKey hata overlay'i). */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsMap.d.ts.map