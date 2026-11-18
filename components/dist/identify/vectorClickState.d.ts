import { IdentifyResultItem } from './resultItems.js';
/** Hesaplanmış ama henüz tabloya açılmamış vektör tıklama sonucu. */
export interface PendingVectorClick {
    /** Vektör sonuç satırları. */
    readonly items: IdentifyResultItem[];
    /** Tıklanan noktanın boylamı (derece). */
    readonly lon: number;
    /** Tıklanan noktanın enlemi (derece). */
    readonly lat: number;
}
/** `TucbsIdentifyPanel`'in vektör ve raster tıklama sonuçlarını sıralamak için tuttuğu durum. */
export type VectorClickState = {
    /** Bu tıklamada Entity bulunmadı; raster sonuç tek başına işlenir. */
    readonly kind: "neutral";
} | {
    /** Vektör sonuçları hesaplandı, tabloya açılmayı bekliyor. */
    readonly kind: "entityPending";
    /** Bekleyen vektör sonucu. */
    readonly pendingVectorClick: PendingVectorClick;
} | {
    /** Vektör sonuçları tabloya açıldı; geç gelen raster sonuçlar eklenir. */
    readonly kind: "entityCommitted";
};
/** Başlangıç ve sıfırlama durumu (`"neutral"`). */
export declare const NEUTRAL_VECTOR_CLICK_STATE: VectorClickState;
/** map:click (Entity YOK) veya YENI bir tiklama basladiginda -- onceki tiklamanin durumu ne olursa olsun sifirlanir. */
export declare function toNeutral(): VectorClickState;
/** entity:click -- vektor sonuclari hesaplandi, commit HENUZ beklemede. */
export declare function toEntityPending(pendingVectorClick: PendingVectorClick): VectorClickState;
/** Vektor sonuclari commit edildi (tablo acildi) -- pendingVectorClick artik tutulmaz (tip seviyesinde). */
export declare function toEntityCommitted(): VectorClickState;
//# sourceMappingURL=vectorClickState.d.ts.map