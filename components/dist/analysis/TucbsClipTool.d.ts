import { LitElement } from 'lit';
import { Map as TucbsMapCore } from '@tucbs/core';
/**
 * Kırp formu: nesne seçimi ve dikdörtgen maske. HTTP Map.runClip.
 */
export declare class TucbsClipTool extends LitElement {
    static readonly styles: import('lit').CSSResult[];
    mapElementId: string;
    map: TucbsMapCore | null;
    customCss: string;
    private _label;
    private _drawing;
    private _status;
    private _message;
    private _helpOpen;
    private _picking;
    private _box;
    private _coords;
    private _feature;
    private _mask;
    private _shapeId;
    private _shapeEntity;
    private _handles;
    private _drag;
    private _pointer;
    private readonly _css;
    private readonly _bind;
    private readonly _onDrawComplete;
    private readonly _onDrawCancel;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    /** Form altındaki satır yerine toast basar. */
    private _note;
    /** Çizim olaylarını haritaya bağlar veya koparır. */
    private _listenDraw;
    /** Dikdörtgen çizmeyi başlatır; önceki maske silinir. */
    private _startDraw;
    /** Nesne seçimine geçmeden önce açık çizim oturumunu kapatır. */
    private _armPick;
    /** Çizim modundan çıkar; tamamlanmış dikdörtgeni silmez. */
    private _endDrawMode;
    private _clearMask;
    private _stopDraw;
    /** Köşe kutusunu ve kırpma maskesini aynı dikdörtgene yazar. */
    private _applyBox;
    /** Yazılan köşeyi blur veya Enter ile dikdörtgene işler. */
    private _applyCorner;
    private _setCoord;
    /** Haritadaki dikdörtgen dolgusunu köşe kutusuna çeker. */
    private _paintPolygon;
    /** Köşe tutamaçlarını dikdörtgenin dört ucuna KB/KD/GD/GB yazısıyla koyar. */
    private _placeHandles;
    private _removeHandles;
    /** Köşe noktasını sürükleyince dikdörtgeni günceller. */
    private _ensurePointer;
    private _cornerAt;
    private _moveHandles;
    private _dropPointer;
    /** Nesne ve dikdörtgen doluysa kırpar. */
    private _run;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "tucbs-clip-tool": TucbsClipTool;
    }
}
//# sourceMappingURL=TucbsClipTool.d.ts.map