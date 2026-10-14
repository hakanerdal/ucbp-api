import { LitElement, PropertyValues } from 'lit';
import { LayerManager, LayerType } from '@tucbs/core';
import { toHexColor } from './fillStyleSpec.js';
export { toHexColor };
/**
 * Katman stili duzenleme diyalogu.
 * Su an sadece arayuz: girilen degerler yerel state'te tutulur. LayerManager/
 * ManagedLayer'a bir stil uygulama API'si (orn. layer.applyStyle()) eklendiginde
 * buradaki degerler ona baglanacak.
 * @fires tucbs-style-editor-closed - Diyalog kapatıldığında (`open` false yapılır); `detail` yok.
 */
export declare class TucbsStyleEditor extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Diyaloğun açık olup olmadığı (`open` attribute'una reflect edilir). */
    open: boolean;
    /** Core JS API `LayerManager` referansı. */
    layerManager: LayerManager | undefined;
    /** Düzenlenecek katmanın kimliği. */
    layerId: string;
    /** Düzenlenecek katmanın başlığı (diyalog üstünde gösterilir). */
    layerTitle: string;
    /** Düzenlenecek katmanın türü. */
    layerType: LayerType | "";
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
    customCss: string;
    private readonly _customCssState;
    private _colorMode;
    private _dataColumn;
    private _dataColumns;
    private _numericDataColumns;
    private _gradientPalette;
    private _gradientMin;
    private _gradientMax;
    private _gradientMinError;
    private _gradientMaxError;
    private _binCount;
    private _categorySort;
    private _paletteReversed;
    private _categoryValues;
    private _categoryColors;
    private _fillColor;
    private _fillOpacity;
    private _outlineEnabled;
    private _outlineColor;
    private _outlineWidth;
    private _featureCount;
    private _serviceStyleRequestId;
    private readonly _drag;
    private _categoryListEl?;
    private _categoryThumbEl?;
    private readonly _categoryScroll;
    private _legendListEl?;
    private _legendThumbEl?;
    private readonly _legendScroll;
    private _applyStyleRaf;
    private _pendingOutlineWidthOverride;
    private _fillOpacityRaf;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    /** Bileşen DOM'dan kaldırıldığında bekleyen RAF'ları iptal eder ve `layerManager` dinleyicisini kaldırır. */
    disconnectedCallback(): void;
    private readonly _onLayerStyle;
    /** Reactive property değişikliklerini (customCss/open/layerManager) işler ve liste scroll-thumb'larını yeniden senkronlar. */
    updated(changedProperties: PropertyValues<this>): void;
    /**
     * Diyalogu belirtilen katman icin, mevcut dolgu rengi/opakligiyla acar.
     *
     * @example
     * ```ts
     * const styleEditor = document.querySelector("tucbs-style-editor");
     * styleEditor.layerManager = map.layerManager;
     * styleEditor.openFor("world-continents", "World Continents (WMS)", "WMS", "#3388ff", 0.8);
     * ```
     */
    openFor(layerId: string, layerTitle: string, layerType: LayerType, initialFillColor?: string, initialFillOpacity?: number): void;
    private get _isServiceLayer();
    private get _isFixedSolidLayer();
    private get _outlineWidthDisabledByScale();
    /**
     * Diger panel/dialoglarla karsilikli disari kapatma icin genel API (bkz TucbsLayerList).
     *
     * @example
     * ```ts
     * styleEditor.close();
     * ```
     */
    close(): void;
    private _close;
    private _reset;
    private _updateOpacitySlider;
    private _setFillOpacity;
    private _loadDataColumns;
    private _onDataColumnChange;
    private _checkGradientBound;
    private _allowNegativeMin;
    private _allowNegativeMax;
    private _sortCategoryValues;
    private _loadCategoryValues;
    private _autoFillCategoryColors;
    private static _fitListToRows;
    private _activePaletteColors;
    private _buildFillStyle;
    private _scheduleApplyStyle;
    private _renderCategoryList;
    private _renderLegendCard;
    /** Bileşenin şablonunu render eder (`open` false ise boş şablon). */
    render(): import('lit').TemplateResult<1>;
    private readonly _fillCardHost;
    private _renderOutlineCard;
}
//# sourceMappingURL=TucbsStyleEditor.d.ts.map