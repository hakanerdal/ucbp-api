import { LitElement, PropertyValues } from 'lit';
import { LayerManager, LayerType } from '@tucbs/core';
/**
 * WMS/WMTS icin gercek GetLegendGraphic (WMS) / capabilities <LegendURL>
 * (WMTS) gorseli, vektor (WFS/LOCAL) katmanlar icin ise LayerManager'a en son
 * uygulanan stile (bkz. TucbsStyleEditor -> applyLayerStyle) gore gradient
 * bari / bin araliklari / kategori listesi gosterir (bkz.
 * project_ucbp_api_styleeditor_arastirma memory). `mapElementId` YOK --
 * `layerManager`/`layerId`/`layerType`/`open` property'leri dogrudan
 * atanmalidir; gercek kullanimi genelde `TucbsLayerList`'in katman "⋮"
 * menusundeki "Lejant" secenegi uzerinden dolaylidir.
 *
 * @example
 * ```ts
 * const legendPanel = document.querySelector("tucbs-legend-panel");
 * legendPanel.layerManager = map.layerManager;
 * legendPanel.layerId = "katman-id";
 * legendPanel.layerType = "WMS";
 * legendPanel.open = true;
 * ```
 */
export declare class TucbsLegendPanel extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Lejantı gösterilecek katmanın id'si. */
    layerId: string;
    /** Katmanın tipi -- servis (WMS/WMTS) katmanı mı yoksa vektör (WFS/LOCAL) katmanı mı olduğunu belirler. */
    layerType: LayerType | "";
    /** Core JS API `LayerManager` referansı. */
    layerManager: LayerManager | undefined;
    /** Lejant panelinin açık/kapalı durumu (attribute olarak yansıtılır); `false` iken hiçbir içerik render edilmez. */
    open: boolean;
    /** Shadow DOM'a enjekte edilecek özel CSS metni (`custom-css` attribute'u). */
    customCss: string;
    private _legendUrl;
    private _loading;
    private _error;
    private _vectorStyle;
    private readonly _customCssState;
    private _listEl?;
    private _thumbEl?;
    private readonly _listScroll;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    private static readonly VISIBLE_LIST_ROWS;
    private get _isServiceLayer();
    private readonly _onLayerStyle;
    /**
     * Lit yaşam döngüsü: `layerManager` değiştiğinde `layer:style` olay
     * aboneliğini yeniler, `layerId`/`layerType`/`layerManager` değiştiğinde
     * lejantı yeniden yükler, `customCss` değiştiğinde shadow DOM'a stili
     * uygular; her render sonrası liste yüksekliğini ve scroll göstergesini
     * yeniden hesaplar.
     *
     * @param changed - Değişen property'lerin önceki değerlerini içeren harita (Lit tarafından sağlanır).
     */
    updated(changed: PropertyValues<this>): void;
    /** Bileşen DOM'dan kaldırılırken `layerManager` üzerindeki `layer:style` olay aboneliğini temizler. */
    disconnectedCallback(): void;
    private _loadLegend;
    /** Panel kapalıysa boş, açıksa servis (WMS/WMTS) veya vektör katman lejantını render eder. */
    render(): import('lit').TemplateResult<1>;
    private _renderServiceLegend;
    private _resolveGradientRange;
    private _renderVectorLegend;
    private _renderScrollableRows;
    private static _fitListToRows;
}
//# sourceMappingURL=TucbsLegendPanel.d.ts.map