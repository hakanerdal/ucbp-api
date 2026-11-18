import { LitElement, PropertyValues } from 'lit';
import { DrawingLayerChoice, DrawingLayerPickRequest } from '@tucbs/core';
/**
 * Biten bir çizimin hangi Çizim Katmanı'na ekleneceğini soran modal diyalog:
 * aracın türüyle uyumlu kayıtlı katmanlardan biri seçilir ya da yeni katman
 * adı girilir. Doğrudan değil, `pickDrawingLayer()` ile (body'ye portallanarak)
 * kullanılır.
 * @fires tucbs-draw-layer-result - Kullanıcı karar verince; `detail` seçim ya da iptalde `null`.
 */
export declare class TucbsDrawLayerDialog extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Seçimi istenen çizim (araç türü, uyumlu katmanlar, önerilen ad). */
    request: DrawingLayerPickRequest | undefined;
    private readonly _drag;
    private _form;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    private _fromOpenDropdown;
    private _fromButton;
    private readonly _onKeyDown;
    private _finish;
    private _confirm;
    protected render(): import('lit').TemplateResult<1> | null;
}
/**
 * Diyaloğu açar ve kullanıcının kararını bekler: seçim (`DrawingLayerChoice`)
 * ya da iptal/kapatma/Esc için `null`. `Map.setDrawingLayerPicker()` ile
 * doğrudan kullanılabilir.
 */
export declare function pickDrawingLayer(request: DrawingLayerPickRequest): Promise<DrawingLayerChoice | null>;
//# sourceMappingURL=TucbsDrawLayerDialog.d.ts.map