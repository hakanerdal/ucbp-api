import { DrawingLayerChoice, DrawingLayerPickRequest } from '@tucbs/core';
/** "Çizim Katmanı Seç/Oluştur" diyaloğunun form durumu. */
export interface DrawLayerDialogState {
    /** Seçili sekme: kayıtlı bir katman (`"existing"`) ya da yeni katman (`"new"`). */
    readonly mode: "existing" | "new";
    /** "Kayıtlı Katman" listesinde seçili katman ("" = seçim yok). */
    readonly layerId: string;
    /** "Yeni Katman" alanındaki ad. */
    readonly title: string;
}
/** Uygun kayıtlı katman varsa "Kayıtlı Katman", yoksa "Yeni Katman" seçili gelir. */
export declare function initialDrawLayerDialogState(request: DrawingLayerPickRequest): DrawLayerDialogState;
/** Yeni katman adının geçersizlik nedeni (geçerliyse `null`); yalnızca "Yeni Katman" modunda anlamlıdır. */
export declare function drawLayerTitleError(state: DrawLayerDialogState, request: DrawingLayerPickRequest): "empty" | "duplicate" | null;
/** "Tamam" düğmesinin etkin olup olmadığı. */
export declare function canConfirmDrawLayerDialog(state: DrawLayerDialogState, request: DrawingLayerPickRequest): boolean;
/** Form durumunu `resolveDrawingLayer`'ın beklediği seçime çevirir; geçerli değilse `null`. */
export declare function drawLayerDialogChoice(state: DrawLayerDialogState, request: DrawingLayerPickRequest): DrawingLayerChoice | null;
//# sourceMappingURL=drawLayerDialogState.d.ts.map