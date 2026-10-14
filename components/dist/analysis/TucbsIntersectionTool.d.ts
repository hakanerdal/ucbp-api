import { LitElement } from 'lit';
import { Map as TucbsMapCore } from '@tucbs/core';
/**
 * Kesişim form UI — tucbs-harita-analiz IntersectionPanel.tsx kalıbı.
 * Panel içinde açılır; HTTP yalnızca @tucbs/core Map.runIntersection üzerinden.
 *
 * @fires tucbs-intersection-run - Kesişim hesaplaması başlatıldığında (Çalıştır'a tıklanınca) yayılır;
 * `detail` içinde `mapElementId`, `labelA`, `labelB` bulunur.
 */
export declare class TucbsIntersectionTool extends LitElement {
    static readonly styles: import('lit').CSSResult[];
    /** Haritanın bağlı olduğu host elementin `id`'si; `map` verilmemişse bununla `document.getElementById` üzerinden bulunur. */
    mapElementId: string;
    /** Doğrudan bağlanacak `@tucbs/core` `Map` referansı; verilirse `mapElementId` yerine bu kullanılır. */
    map: TucbsMapCore | null;
    /** Shadow DOM köküne uygulanacak özel CSS metni. */
    customCss: string;
    private _labelA;
    private _labelB;
    private _status;
    private _message;
    private _helpOpen;
    private _featureA;
    private _featureB;
    private _pendingSlot;
    private _map;
    private _mapHost;
    private readonly _customCssState;
    private readonly _onEntityClick;
    private readonly _onMapReady;
    /** Bileşen DOM'a bağlandığında haritaya bağlanır. */
    connectedCallback(): void;
    /** Bileşen DOM'dan kaldırıldığında harita bağlantısını ve identify baskılamasını kaldırır. */
    disconnectedCallback(): void;
    /**
     * `customCss` değiştiğinde stil uygular; `mapElementId` veya `map` değiştiğinde
     * harita bağlantısını yeniden kurar.
     */
    updated(changed: Map<string, unknown>): void;
    private _resolveMap;
    private _resolveMapHost;
    private _bindMap;
    private _attachInteraction;
    private _unbindMap;
    /** Form altındaki satır yerine toast basar. */
    private _note;
    private _beginSelection;
    private _onInputClick;
    private _onRefreshSlot;
    /** Sonuçtan sonra iki seçim ve kırmızı vurgu kalkar. */
    private _clearForm;
    private _syncHighlight;
    private _onSwitchToDatasets;
    private _onRun;
    /** Bileşenin şablonunu render eder. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsIntersectionTool.d.ts.map