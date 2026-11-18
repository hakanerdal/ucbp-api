import { LitElement } from 'lit';
import { Map as TucbsMapCore } from '@tucbs/core';
/**
 * Kama tampon: nokta, mesafe ve açı aralığı. HTTP Map.runWedgeBuffer.
 */
export declare class TucbsWedgeBufferTool extends LitElement {
    static readonly styles: import('lit').CSSResult[];
    /** Haritanın bağlı olduğu host elementin `id`'si; `map` verilmemişse bununla `document.getElementById` üzerinden bulunur. */
    mapElementId: string;
    /** Doğrudan bağlanacak `@tucbs/core` `Map` referansı; verilirse `mapElementId` yerine bu kullanılır. */
    map: TucbsMapCore | null;
    /** Shadow DOM köküne uygulanacak özel CSS metni. */
    customCss: string;
    private _label;
    private _distance;
    private _start;
    private _end;
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
    /** Nokta, pozitif mesafe ve artan açı aralığıyla kama üretir. */
    private _run;
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsWedgeBufferTool.d.ts.map