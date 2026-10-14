import { LitElement } from 'lit';
import { Map as TucbsMapCore } from '@tucbs/core';
/**
 * Sınır formu: nesne, sınır tipi ve çıktı geometrisi. HTTP Map.runBoundary.
 */
export declare class TucbsBoundaryTool extends LitElement {
    static readonly styles: import('lit').CSSResult[];
    mapElementId: string;
    map: TucbsMapCore | null;
    customCss: string;
    private _label;
    private _boundaryType;
    private _output;
    private _status;
    private _message;
    private _helpOpen;
    private _picking;
    private _feature;
    private readonly _css;
    private readonly _bind;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    /** Form altındaki satır yerine toast basar. */
    private _note;
    /** Seçim ve tipler doluysa sınır üretir. */
    private _run;
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsBoundaryTool.d.ts.map