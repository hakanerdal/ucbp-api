import { LitElement, PropertyValues } from 'lit';
import { InteractionManager, LayerManager } from '@tucbs/core';
/**
 * Haritada tıklanan bir feature/piksel için öznitelik tablosu veya koordinat
 * kartı gösteren panel (`<tucbs-identify-panel>`) — `InteractionManager`'ın
 * `entity:click`/`map:click` event'lerini dinler.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-identify-panel mapElementId="map"></tucbs-identify-panel>
 * ```
 */
export declare class TucbsIdentifyPanel extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Core JS API `InteractionManager` referansı. */
    interactionManager: InteractionManager | undefined;
    /** Opsiyonel: tıklanan entity'nin ait olduğu katmanın başlığını/türünü (breadcrumb) göstermek için; verilmezse breadcrumb `layerId`'yi gösterir. */
    layerManager: LayerManager | undefined;
    /** Opsiyonel: `tucbs-map` element'inin ID'si — TucbsLayerList'teki aynı desenle (Senaryo 2A/2B) `InteractionManager`'a kendisi bağlanır. */
    mapElementId: string;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
    customCss: string;
    private readonly _customCssState;
    private _basicOpen;
    private _basicLon;
    private _basicLat;
    private _imageryPending;
    private _vectorClickState;
    private _tableOpen;
    private _tableItems;
    private _tableLon;
    private _tableLat;
    private _accordionPage;
    private _tableSource;
    private readonly _attrPanelEl?;
    /** Tüm setTimeout/rAF çağrılarını izler (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    private _basicDismissTimer;
    private readonly _drag;
    private readonly _onMapClick;
    private readonly _onInteractionSuspend;
    private readonly _onImageryQuerying;
    private get _accordionPageCount();
    private get _isCompactPanel();
    private readonly _compactItemBoxGeneration;
    private _syncCompactItemBox;
    private readonly _itemTitleGroupWidthGeneration;
    private _syncItemTitleGroupWidth;
    private get _pagedTableItems();
    private _goToAccordionPage;
    private _itemGlobalIndex;
    private _openTable;
    private _resetAccordionOpen;
    private _openAccordionItem;
    private readonly _onEntityClick;
    private readonly _onImageryClick;
    private readonly _onAccordionItemBeforeToggle;
    private readonly _onAccordionItemToggled;
    /** `interactionManager`/`layerManager` eksikse, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
    firstUpdated(): void;
    /** Reactive property değişikliklerini işler: `interactionManager` bağını yeniler, tablo diyaloğu açılış/kapanışını ve accordion/scroll durumunu senkronlar. */
    updated(changed: PropertyValues): void;
    /** Bileşen DOM'dan kaldırıldığında `interactionManager` dinleyicisini kaldırır ve bekleyen zamanlayıcıları temizler. */
    disconnectedCallback(): void;
    private _bind;
    private _unbind;
    private _scheduleBasicDismiss;
    private _clearBasicDismiss;
    private _syncScrollThumbFor;
    private _scheduleScrollThumbSync;
    private _startThumbDrag;
    /**
     * Konum/Bilgi Al koordinat kartını ve öznitelik tablosunu kapatır (diğer diyaloglarla karşılıklı kapatma için).
     *
     * @example
     * ```ts
     * identifyPanel.close();
     * ```
     */
    close(): void;
    private _closeBasic;
    private _closeTable;
    private _zoomToItem;
    private _renderZoomButton;
    private _renderPropertyTable;
    /** Bileşenin şablonunu render eder (koordinat kartı veya öznitelik tablosu/accordion). */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsIdentifyPanel.d.ts.map