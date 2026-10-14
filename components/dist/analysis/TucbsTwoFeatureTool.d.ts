import { LitElement } from 'lit';
import { Map as TucbsMapCore } from '@tucbs/core';
import { AnalysisHelp } from './analysisHelp.js';
import { SelectedFeature } from './analysisMapBind.js';
export type TwoFeatureSpec = {
    title: string;
    labelA: string;
    placeholderA: string;
    labelB: string;
    placeholderB: string;
    eventName: string;
    success: string;
    fail: string;
    polygonOnlyMessage: string;
    bothPolygonMessage: string;
    help: AnalysisHelp;
    run: (map: TucbsMapCore, a: SelectedFeature, b: SelectedFeature) => Promise<unknown>;
};
/**
 * İki nesneli coğrafi form: fark, çıkarma, birleştir.
 * Kesişim kendi sınıfında durur. HTTP Map.run* üzerinden.
 */
export declare abstract class TucbsTwoFeatureTool extends LitElement {
    static readonly styles: import('lit').CSSResult[];
    mapElementId: string;
    map: TucbsMapCore | null;
    customCss: string;
    private _labelA;
    private _labelB;
    private _status;
    private _message;
    private _helpOpen;
    private _featureA;
    private _featureB;
    private _pending;
    private readonly _css;
    private readonly _bind;
    /** Alt sınıf başlık, etiket ve hangi Map metodunun çağrılacağını verir. */
    protected abstract spec(): TwoFeatureSpec;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    /** Tıklanan nesneyi bekleyen slota yazar; poligon değilse reddeder. */
    private _accept;
    private _arm;
    private _refresh;
    private _clear;
    /** İki poligon doluysa ilgili coğrafi işlemi çalıştırır. */
    private _run;
    /** Form altındaki satır yerine toast basar. */
    private _note;
    private _slot;
    render(): import('lit').TemplateResult<1>;
}
export declare class TucbsDifferenceTool extends TucbsTwoFeatureTool {
    protected spec(): TwoFeatureSpec;
}
export declare class TucbsSubtractTool extends TucbsTwoFeatureTool {
    protected spec(): TwoFeatureSpec;
}
export declare class TucbsUnionTool extends TucbsTwoFeatureTool {
    protected spec(): TwoFeatureSpec;
}
//# sourceMappingURL=TucbsTwoFeatureTool.d.ts.map