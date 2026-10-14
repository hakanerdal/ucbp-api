import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/**
 * `tucbs-analysis-tool`: toolbar analiz girişi — sağdan slide-over panelde
 * `tucbs-analysis-panel`'i (tampon vb.) KENDİ İÇİNDE GÖMER. `tucbs-toolbar`
 * içinde `analysis` id ile kullanılır; `TucbsApp`'in toolbar'ında koşulsuz
 * her zaman bulunur (harici bir `<tucbs-analysis-panel>` marker tag'i
 * ARANMAZ — bkz. `TucbsApp.ts`).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-analysis-tool mapElementId="map" panel-width="360px"></tucbs-analysis-tool>
 * ```
 */
export declare class TucbsAnalysisTool extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Opsiyonel: `tucbs-map` elementinin ID'si (Senaryo 2 bağlama). */
    mapElementId: string;
    /** Analiz panelinin genişliği. */
    panelWidth: string;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz. `./internal/CustomCss.ts`). */
    customCss: string;
    /** Core JS API `Map` referansı. Senaryo 1: property binding ile doğrudan atanır; Senaryo 2: `mapElementId` üzerinden `firstUpdated()` içinde otomatik bağlanır. */
    map: TucbsMapInstance | undefined;
    private _open;
    private readonly _layoutController;
    private _panelEl;
    private readonly _customCssState;
    /** Analiz panelini (`tucbs-slide-over-panel`) `document.body`'ye ekler ve içeriğini ilk kez render eder. */
    connectedCallback(): void;
    /** Bileşen DOM'dan kaldırıldığında haritadan bağ çözer ve panel elementini DOM'dan kaldırır. */
    disconnectedCallback(): void;
    /** İlk render sonrası `map`i (programatik atanmadıysa) `mapElementId` üzerinden haritaya bağlar. */
    firstUpdated(): void;
    /** `customCss`/`map`/`panelWidth` değişimlerini işler (shadow DOM'a stil uygulama, layout bağlama/panel genişliği) ve panel içeriğini yeniden render eder. */
    updated(changed: PropertyValues): void;
    private _renderIntoPanel;
    private _toggle;
    /** Toolbar'daki dairesel "Analiz" butonunu render eder. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsAnalysisTool.d.ts.map