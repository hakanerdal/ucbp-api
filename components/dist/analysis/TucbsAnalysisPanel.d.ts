import { LitElement } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/**
 * **NOT:** Bu bağımsız bir "bileşen" DEĞİLDİR — `TucbsAnalysisTool` (ve onun
 * üzerinden `TucbsApp`) tarafından otomatik olarak gömülür. Tüketicinin
 * kendi `index.html`'ine ayrıca `<tucbs-analysis-panel>` eklemesi GEREKMEZ
 * ve önerilmez.
 *
 * Tek analiz girişi (tüketici: tucbs-analysis-panel).
 * Araç formları src/analysis/ altında; panel seçim + gömme yapar. Kullanıcı
 * coğrafi işlem seçince panel ilgili formu açar. Formlar ayrı custom element
 * olarak tüketici HTML'ine yazılmaz.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-analysis-panel mapElementId="map"></tucbs-analysis-panel>
 * ```
 */
export declare class TucbsAnalysisPanel extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Bağlı tucbs-map id — araçlara iletilir (Senaryo 2) */
    mapElementId: string;
    /** Doğrudan Map referansı — tucbs-app / toolbar Senaryo 1 */
    map: TucbsMapInstance | undefined;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
    customCss: string;
    private _activeTool;
    private readonly _customCssState;
    /** `customCss` degistiginde ozel CSS'i shadow DOM'a yeniden uygular. */
    updated(changed: Map<string, unknown>): void;
    private _openTool;
    private _backToList;
    /**
     * Aktif aracı temizler; panel araç listesine döner.
     *
     * @example
     * ```ts
     * analysisPanel.resetActiveTool();
     * ```
     */
    resetActiveTool(): void;
    private _renderToolList;
    private _toolTag;
    /** Seçilen coğrafi işlem formunu geri okuyla açar. */
    private _renderActiveTool;
    /** Aktif araç varsa onu (geri okuyla birlikte), yoksa araç seçim listesini render eder. */
    render(): import('lit').TemplateResult<1> | null;
}
//# sourceMappingURL=TucbsAnalysisPanel.d.ts.map