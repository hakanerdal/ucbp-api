import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance, DrawTool } from '@tucbs/core';
/**
 * Birden fazla cizim geometrisini ("point"/"polyline"/"polygon" -- v1
 * kapsami) tek bir "grup" butonda toplayan bagimsiz cizim araci. Ana
 * butona tiklaninca SOLA acilan bir flyout ile hangi geometrinin
 * cizilecegi secilir; secilen aracin ikonu ana butonda gorunur kalir.
 * `tucbs-toolbar` icinde bir arac olarak kullanilabildigi gibi, toolbar
 * disinda tek basina da embed edilebilir.
 *
 * WHY (tek component + dahili flyout, 6 duz instance DEGIL): v14 SS11.6
 * "ayri bir `<tucbs-tool-group>` sarmalayici" onerisini degerlendirip
 * REDDETTI -- "aktif aracin ikonu ayni butonda gorunsun" gereksinimi
 * jenerik bir sarmalayicida DrawTool'a ozgu bilgi gerektirip coupling
 * yaratirdi. Bkz. project_ucbp_api_tucbstoolbar_mimarisi memory.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-draw-tool
 *   mapElementId="map"
 *   tools="point,polyline,polygon,rectangle,circle,freehand"
 *   default-tool="polygon"
 * ></tucbs-draw-tool>
 * ```
 */
export declare class TucbsDrawTool extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Opsiyonel: `tucbs-map` elementinin ID'si (Senaryo 2 - otomatik baglama icin). */
    mapElementId: string;
    /** Flyout'ta gosterilecek geometri ID'leri, virgulle ayrilmis (DrawTool union'inin bir alt kumesi). */
    tools: string;
    /** Hicbir arac aktif degilken ana butonda gosterilecek varsayilan arac. */
    defaultTool: DrawTool;
    /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni (bkz. `./internal/CustomCss.ts`). */
    customCss: string;
    /**
     * Core JS API `Map` instance'i. `tucbs-toolbar` icinde kullanildiginda
     * container bunu property binding ile dogrudan atar (Senaryo 1); tek
     * basina kullanildiginda `mapElementId` ile otomatik baglanir (Senaryo 2).
     */
    map: TucbsMapInstance | undefined;
    private _activeTool;
    private _flyoutOpen;
    private readonly _customCssState;
    private _toolIds;
    private readonly _onDrawStart;
    private readonly _onDrawCancel;
    /** Bilesen DOM'dan kaldirilirken DrawingManager event aboneliklerini iptal eder. */
    disconnectedCallback(): void;
    /**
     * `customCss` degistiginde ozel CSS'i yeniden uygular; `map` degistiginde
     * onceki DrawingManager'dan cikip yenisine baglanir.
     */
    updated(changed: PropertyValues): void;
    private _bindDrawingManager;
    private _unbindDrawingManager;
    /**
     * Ilk render sonrasi haritaya baglanmayi dener: `map` zaten atanmissa (Senaryo 1)
     * hicbir sey yapmaz; aksi halde `mapElementId` ile eslesen elementi bulup
     * haritasina baglanir (Senaryo 2), gerekirse elementin `ready` olayini bekler.
     */
    firstUpdated(): void;
    private _onMainButtonClick;
    private _selectTool;
    /** Aktif/varsayilan araci gosteren ana butonu ve (aciksa) arac secim flyout'unu render eder. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsDrawTool.d.ts.map