import { LitElement, nothing, PropertyValues } from 'lit';
import { LayerManager } from '@tucbs/core';
/**
 * `TucbsLayerList`'in "Yetkili Katmanlar" (apiKey ile `GET /layers` → seç →
 * haritaya ekle) bloğunu barındıran bağımsız, `document.body`'ye portallanan
 * bileşen (bkz. God Component kılavuzu GC-03 4.4 Adım 3).
 *
 * `<tucbs-layer-list>`'in `layer-list/PortalHost.ts` üzerinden `ensure()`'ladığı
 * bir kopya olarak kullanılır; tüketicinin HTML'inde bir `<tucbs-authorized-layers>`
 * "çıplak marker" etiketi bulunmadıkça hiç oluşturulmaz (bkz TucbsLayerList.ts'teki
 * `_authorizedLayersAvailable` alanı).
 *
 * @example
 * ```html
 * <tucbs-authorized-layers></tucbs-authorized-layers>
 * ```
 */
export declare class TucbsAuthorizedLayers extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Core JS API `LayerManager` referansı — `TucbsLayerList` tarafından senkronlanır. */
    layerManager: LayerManager | undefined;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
    customCss: string;
    private readonly _customCssState;
    private _authorizedLayersLoading;
    private _authorizedPickerOpen;
    private _authorizedItems;
    private _authorizedSelectedKeys;
    private _authorizedFetchError;
    private _authorizedAddError;
    private _tokenUrlDialogOpen;
    private _tokenUrlDialogValue;
    private _tokenUrlDialogTitle;
    /** Picker açık mı (dışarıdan, ör. karşılıklı-dışlama için okunur). */
    get open(): boolean;
    private _tooltipPortalEl;
    private readonly _dialogDrag;
    private static readonly AUTHORIZED_VISIBLE_ROWS;
    /** Lit yaşam döngüsü: bileşen DOM'a bağlandığında satır ipuçları için `document.body`'ye bir tooltip portalı ekler. */
    connectedCallback(): void;
    /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken tooltip portalını kaldırır. */
    disconnectedCallback(): void;
    /** `customCss` değişince stili uygular; seçim diyaloğu açıkken liste yüksekliğini görünür satır sayısına göre yeniden ayarlar. */
    updated(changed: PropertyValues): void;
    /**
     * Yetkili katmanlar: GET /layers → seçim dialogu (coğrafi veri servisi gibi).
     * Otomatik haritaya ekleme yok. `TucbsLayerList`'in "Yetkili Katmanlarımı
     * Getir" butonu tarafından çağrılır.
     */
    fetchAndOpen(): Promise<void>;
    closePicker(): void;
    private _openTokenUrlDialog;
    private _closeTokenUrlDialog;
    private _copyTokenUrl;
    private _authorizedKey;
    private _authorizedCanAdd;
    private _toggleAuthorizedSelected;
    private _addSelectedAuthorizedLayers;
    private _authorizedAddButtonLabel;
    private _syncAuthorizedListMaxHeight;
    private _showPortalTooltip;
    private _hidePortalTooltip;
    /** Bileşenin şablonunu render eder: seçim diyaloğu kapalıyken hiçbir şey, açıkken yetkili katman seçim diyaloğu. */
    render(): import('lit').TemplateResult<1> | typeof nothing;
    private _renderAuthorizedPicker;
    private _renderTokenUrlDialog;
}
//# sourceMappingURL=TucbsAuthorizedLayers.d.ts.map