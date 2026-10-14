import { LitElement, PropertyValues } from 'lit';
import { BasemapId } from '@tucbs/core';
/**
 * Ana uygulama konteyner component'i — tek tag ile tam harita uygulamasi
 * (v8/v14 dokumaninin "Senaryo 1" tasarimi). TUM component'leri (analiz
 * paneli dahil) dahili olarak barindirir; zoom/goto-coordinate/draw/
 * delete/measure/analysis/settings/print ARAcLARI sadece dahili
 * tucbs-toolbar uzerinden kullanilir (ayri standalone tag olarak sunulmaz --
 * FAZ 3.2: basemap-picker, FAZ 3.3: quality-bar de artik SADECE "settings"
 * panelinin GOMDUGU kopya uzerinden erisiliyor; "analysis" da kendi
 * `<tucbs-analysis-panel>`'ini kendi icinde gomer, bkz TucbsAnalysisTool.ts).
 *
 * @fires ready - Ic `<tucbs-map>`'in "ready" event'i yakalanip TucbsApp'in TEK
 * kaynakli kendi "ready" event'i olarak yeniden dispatch edilir; detail:
 * `{ map: TucbsMapInstance }`.
 * @fires error - Ic `<tucbs-map>`'in "error" event'i yakalanip aynen yeniden
 * dispatch edilir; detail: ic event'in detail'i (yapisi TucbsMap'e baglidir).
 *
 * @example
 * ```html
 * <tucbs-app
 *   api-key="YOUR_API_KEY"
 *   basemap="hgm-temel"
 *   mode="3D"
 * ></tucbs-app>
 * ```
 */
export declare class TucbsApp extends LitElement {
    #private;
    set apiKey(value: string);
    get apiKey(): string;
    /** Kullanilacak taban harita (basemap) kimligi. */
    basemap: BasemapId;
    /** Harita gorunum modu — 2D ya da 3D. */
    mode: "2D" | "3D";
    /** Harita kalite/detay seviyesi (0-100). */
    quality: number;
    /** Dahili `<tucbs-layer-list>` panelinin gosterilip gosterilmeyecegi. */
    showLayerList: boolean;
    /** Dahili `<tucbs-toolbar>`'in gosterilip gosterilmeyecegi. */
    showToolbar: boolean;
    /** Dahili `<tucbs-info-bar>`'in gosterilip gosterilmeyecegi. */
    showInfoBar: boolean;
    private _map;
    /** Shadow DOM yerine Light DOM kullanır (bkz yukarıdaki WHY yorumu). */
    protected createRenderRoot(): HTMLElement;
    private readonly _onMapReady;
    private readonly _onMapError;
    /**
     * `basemap`/`mode`/`quality` property'lerindeki degisiklikleri, harita
     * hazir oldugunda (`_map` atanmisken) ilgili `Map` metodlarina uygular.
     *
     * @param changed - Bu guncellemede degisen property'lerin eski degerleri.
     */
    updated(changed: PropertyValues): void;
    /**
     * Tam harita uygulamasini olusturur: dahili `<tucbs-layer-list>`,
     * `<tucbs-map>`, `<tucbs-toolbar>`, `<tucbs-identify-panel>`,
     * `<tucbs-info-bar>` ve varlik-tespiti icin kullanilan ciplak marker
     * tag'leri (`tucbs-file-upload`, `tucbs-service-upload`,
     * `tucbs-style-editor`, `tucbs-legend-panel`, `tucbs-layer-export`,
     * `tucbs-authorized-layers`).
     */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsApp.d.ts.map