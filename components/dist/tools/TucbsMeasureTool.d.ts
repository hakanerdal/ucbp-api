import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/**
 * Mesafe/alan olcum araci. TucbsDrawTool ile AYNI flyout deseni (ana buton +
 * sola acilan 2 secenek: Mesafe Ölç/Alan Ölç). "Yol C" mimarisi (v14 SS4.16,
 * v8 SS19) geregi ayri bir ScreenSpaceEventHandler KURULMAZ -- DrawingManager'in
 * ZATEN VAR OLAN "polyline"/"polygon" araclari `activate(tool, "measure")`
 * ile yeniden kullanilir.
 *
 * ONEMLI -- "source" tabanli sahiplik: TucbsDrawTool da AYNI "polyline"/
 * "polygon" degerlerini (duz cizim icin) kullaniyor. Bu component SADECE
 * `source === "measure"` ile baslayan oturumlara etiket ekler -- DrawTool'un
 * normal cizimlerini yanlislikla "olcum" sanip etiketlemez (bkz
 * project_ucbp_api_tucbstoolbar_mimarisi memory onaltinci tur).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-measure-tool mapElementId="map"></tucbs-measure-tool>
 * ```
 */
export declare class TucbsMeasureTool extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /**
     * Bağlanılacak `tucbs-map` elementinin DOM id'si (Senaryo 2 bağlama;
     * `firstUpdated()` bu id ile elementi bulup `map` özelliğini atar).
     */
    mapElementId: string;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz. ./internal/CustomCss.ts). */
    customCss: string;
    /**
     * Bağlı `TucbsMapInstance` referansı. Senaryo 2'de `mapElementId`
     * aracılığıyla `firstUpdated()` içinde otomatik atanır; Senaryo 1'de
     * (attribute yok, JS-only property) doğrudan da atanabilir.
     */
    map: TucbsMapInstance | undefined;
    private _activeMode;
    private _flyoutOpen;
    private readonly _customCssState;
    private _committedCoords;
    private _livePreviewCoord;
    private _pendingLabels;
    private _liveSegmentLabel;
    private _liveAreaLabel;
    private readonly _shapeLabels;
    private _claimingActivation;
    private _isSessionOwner;
    private readonly _onDrawStart;
    private readonly _onDrawCancel;
    private readonly _onVertex;
    private readonly _onMove;
    private readonly _onComplete;
    private readonly _onRemove;
    private readonly _onMeasureLayerVisibility;
    private readonly _onMeasureLayerRemove;
    private _allLabelEntities;
    private _bindLayerManager;
    private _unbindLayerManager;
    /**
     * Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken DrawingManager/
     * LayerManager event aboneliklerini ve tüm canlı/bekleyen etiket
     * entity'lerini temizler.
     */
    disconnectedCallback(): void;
    /**
     * Lit yaşam döngüsü: `customCss` değiştiğinde shadow DOM'a enjekte eder;
     * `map` değiştiğinde önceki haritanın DrawingManager/LayerManager
     * bağlarını çözüp yenisine bağlanır.
     *
     * @param changed - Değişen reactive property'lerin Lit tarafından
     *   sağlanan haritası.
     */
    updated(changed: PropertyValues): void;
    private _bindDrawingManager;
    private _unbindDrawingManager;
    /**
     * Lit yaşam döngüsü: `map` henüz atanmamışsa `mapElementId` ile eşleşen
     * elementi bulur ve varsa doğrudan, yoksa elementin `ready` event'ini
     * bekleyerek `map` özelliğini atar.
     */
    firstUpdated(): void;
    private _onMainButtonClick;
    private _selectMode;
    private _removeEntity;
    private _removeLiveLabels;
    private _removePendingLabels;
    private _liveSegmentMidpoint;
    private _liveSegmentDistance;
    private _livePolygonCoords;
    private _ensureLiveLabels;
    private _addStaticSegmentLabel;
    private _addTotalDistanceLabel;
    private _addAreaSummaryLabel;
    /**
     * Bileşenin şablonunu render eder: ana ölçüm butonu ve (`_flyoutOpen`
     * iken) Mesafe Ölç/Alan Ölç seçenek butonlarını içeren flyout.
     */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsMeasureTool.d.ts.map