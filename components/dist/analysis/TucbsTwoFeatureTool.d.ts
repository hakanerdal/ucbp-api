import { LitElement } from 'lit';
import { Map as TucbsMapCore } from '@tucbs/core';
import { AnalysisHelp } from './analysisHelp.js';
import { SelectedFeature } from './analysisMapBind.js';
/** Alt sınıfın `TucbsTwoFeatureTool` formuna verdiği metinler ve çalıştırılacak analiz. */
export type TwoFeatureSpec = {
    /** Form başlığı. */
    title: string;
    /** Birinci seçim alanının etiketi. */
    labelA: string;
    /** Birinci alan boşken görünen metin. */
    placeholderA: string;
    /** İkinci seçim alanının etiketi. */
    labelB: string;
    /** İkinci alan boşken görünen metin. */
    placeholderB: string;
    /** Analiz başlarken yayılan olayın adı (ör. `tucbs-difference-run`). */
    eventName: string;
    /** Başarı bildirimi. */
    success: string;
    /** Hata mesajı olmayan başarısızlıkta gösterilen metin. */
    fail: string;
    /** Seçilen nesne poligon değilse gösterilen uyarı. */
    polygonOnlyMessage: string;
    /** İki seçimden biri eksikse ya da poligon değilse gösterilen uyarı. */
    bothPolygonMessage: string;
    /** Yardım penceresinin içeriği. */
    help: AnalysisHelp;
    /** Analizi çalıştıran fonksiyon; seçilen iki poligonu `Map`'e gönderir. */
    run: (map: TucbsMapCore, a: SelectedFeature, b: SelectedFeature) => Promise<unknown>;
};
/**
 * İki nesneli coğrafi form: fark, çıkarma, birleştir.
 * Kesişim kendi sınıfında durur. HTTP Map.run* üzerinden.
 */
export declare abstract class TucbsTwoFeatureTool extends LitElement {
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