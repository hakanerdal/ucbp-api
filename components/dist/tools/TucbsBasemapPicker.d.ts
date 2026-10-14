import { LitElement, nothing, PropertyValues } from 'lit';
import { Map as TucbsMapInstance, BasemapId } from '@tucbs/core';
interface BasemapConfig {
    readonly id: BasemapId;
    readonly label: string;
    readonly thumbnail: string;
}
/**
 * `tucbs-basemap-picker`: altlık harita seçici. Kart-grid tasarımı.
 * `tucbs-settings-tool` sayfada mevcutsa (o kendi actigi "Ayarlar" panelinin
 * icine bu bileseni `.embedded=true` ile ACIKCA gomer) bu bilesen salt
 * icerik (baslik+grid, kendi toggle/kapatma UI'i OLMADAN) render edilir.
 * Aksi halde (embedded=false, varsayilan) TucbsLayerList'teki toggle-btn/
 * panel deseniyle AYNI sekilde kendi kendine yeter: bir toggle butonu
 * gosterir, tiklaninca AYNI konumda (sag-ust, :host'un kendi position:fixed
 * ankraji) kart panelini acar, panelin sag-ust kosesindeki X ile kapatilir.
 * Harita SIKISTIRILMAZ/kaydirilmaz -- TucbsLayerList'in kendi paneli gibi
 * sadece haritanin ustunde yuzen bir kart.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-basemap-picker mapElementId="map" active-basemap="hgm-temel"></tucbs-basemap-picker>
 * ```
 */
export declare class TucbsBasemapPicker extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /**
     * Opsiyonel: bağlanılacak `tucbs-map` elementinin DOM id'si (Senaryo 2
     * bağlama). `map` property binding'i ile de doğrudan verilebilir
     * (Senaryo 1) — TucbsLayerList'teki aynı Senaryo 1/2 bağlama mantığı.
     */
    mapElementId: string;
    /**
     * Aktif altlık harita ID'si. Dışarıdan (attribute/JS) set edilirse
     * `map.setBasemap()` çağrılır; haritanın basemap'i başka bir yerden
     * değiştirilse bile bu değer otomatik senkronize kalır (bkz. `_onLayerAdd`).
     */
    activeBasemap: BasemapId | "";
    /**
     * Core JS API `Map` instance'ı. `tucbs-map` ile property binding olarak da
     * gelir (Senaryo 1), `mapElementId` ile de otomatik bağlanır (Senaryo 2).
     */
    map: TucbsMapInstance | undefined;
    /**
     * Listede gösterilecek altlık harita seçenekleri. Varsayılan: `BasemapId`
     * union'ındaki tüm bilinen değerler (bkz. `map.types.ts`).
     */
    basemaps: readonly BasemapConfig[];
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz. `./internal/CustomCss.ts`). */
    customCss: string;
    /**
     * `tucbs-settings-tool` bu bileşeni kendi "Ayarlar" paneline gömerken
     * `true` verir (bkz. `TucbsSettingsTool._renderIntoPanel()`) — bu özel
     * kopya kendi toggle butonunu/kapatma UI'ini göstermez, sadece içerik
     * (başlık+grid) olarak render edilir.
     */
    embedded: boolean;
    private _open;
    private _error;
    private _pending;
    private readonly _customCssState;
    private _pendingTimer;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    private readonly _onLayerAdd;
    private readonly _onBasemapError;
    private readonly _onBasemapRecovered;
    private _clearPendingTimer;
    /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken bekleyen zamanlayıcıyı temizler ve haritaya bağlıysa event dinleyicilerini çözer. */
    disconnectedCallback(): void;
    /**
     * Lit yaşam döngüsü: `map` henüz atanmamışsa `mapElementId` ile eşleşen
     * `tucbs-map` elementini bulur ve varsa doğrudan, yoksa elementin `ready`
     * event'ini bekleyerek `map` özelliğini atar.
     */
    firstUpdated(): void;
    /**
     * Lit yaşam döngüsü: reaktif özellik değişikliklerini işler — `customCss`
     * değiştiğinde shadow DOM'a yeniden uygulanır, `map` değiştiğinde önceki
     * haritadan çözülüp yenisine bağlanılır, `activeBasemap` dışarıdan
     * değiştirildiğinde (haritanın güncel basemap'inden farklıysa)
     * `map.setBasemap()` çağrılır.
     *
     * @param changed - Değişen reactive property'lerin Lit tarafından sağlanan haritası.
     */
    updated(changed: PropertyValues): void;
    private _bindMap;
    private _unbindMap;
    private _syncFromMap;
    private _select;
    private _openPanel;
    private _closePanel;
    private _renderCard;
    private _renderGrid;
    private _renderErrorBanner;
    private _renderLoadingBanner;
    /**
     * Bileşenin şablonunu render eder: bağımsız modda toggle butonu/panel,
     * embedded modda salt başlık+grid içerik; haritaya bağlı değilse gizli kalır.
     */
    render(): import('lit').TemplateResult<1> | typeof nothing;
}
export {};
//# sourceMappingURL=TucbsBasemapPicker.d.ts.map