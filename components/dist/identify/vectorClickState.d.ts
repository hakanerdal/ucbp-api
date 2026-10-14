import { IdentifyResultItem } from './resultItems.js';
export interface PendingVectorClick {
    readonly items: IdentifyResultItem[];
    readonly lon: number;
    readonly lat: number;
}
export type VectorClickState = {
    readonly kind: "neutral";
} | {
    readonly kind: "entityPending";
    readonly pendingVectorClick: PendingVectorClick;
} | {
    readonly kind: "entityCommitted";
};
export declare const NEUTRAL_VECTOR_CLICK_STATE: VectorClickState;
/** map:click (Entity YOK) veya YENI bir tiklama basladiginda -- onceki tiklamanin durumu ne olursa olsun sifirlanir. */
export declare function toNeutral(): VectorClickState;
/** entity:click -- vektor sonuclari hesaplandi, commit HENUZ beklemede. */
export declare function toEntityPending(pendingVectorClick: PendingVectorClick): VectorClickState;
/** Vektor sonuclari commit edildi (tablo acildi) -- pendingVectorClick artik tutulmaz (tip seviyesinde). */
export declare function toEntityCommitted(): VectorClickState;
//# sourceMappingURL=vectorClickState.d.ts.map