import { LitElement, PropertyValues } from 'lit';
import { LayerManager, LayerType } from '@tucbs/core';
export declare class TucbsServiceStyleCard extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Core JS API `LayerManager` referansı. */
    layerManager: LayerManager | undefined;
    /** Stili sorgulanacak katmanın kimliği. */
    layerId: string;
    /** Katman türü ("WMS" veya "WMTS" olması beklenir). */
    layerType: LayerType | "";
    requestId: number;
    private _serviceStyles;
    private _serviceStylesLoading;
    private _serviceStylesError;
    private _selectedServiceStyle;
    /** `layerId`/`layerType`/`layerManager` değiştiğinde sunucu stillerini yeniden sorgular. */
    protected willUpdate(changed: PropertyValues<this>): void;
    private _loadServiceStyles;
    private _selectServiceStyle;
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsServiceStyleCard.d.ts.map