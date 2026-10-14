import type { IdentifyResultItem } from "./resultItems.js";

export interface PendingVectorClick {
  readonly items: IdentifyResultItem[];
  readonly lon: number;
  readonly lat: number;
}

// TucbsIdentifyPanel._onEntityClick/_onImageryClick arasindaki yaris durumunu
// (bkz God Component kilavuzu GC-04 5.4 Adim 6) ONCEDEN uc BAGIMSIZ alan
// yonetiyordu: _lastClickHadEntity/_pendingVectorClick/_vectorCommitted --
// bu ucunun BIRLIKTE ancak belirli kombinasyonlarda anlamli olmasi (orn.
// _vectorCommitted=true iken _pendingVectorClick'in DE dolu olmasi hicbir
// zaman gecerli degildi) TIP SEVIYESINDE hicbir sekilde garanti edilmiyordu.
// Bu tek, ayirt edici (discriminated) union TIPI, gecersiz kombinasyonlari
// IMKANSIZ kilar; TucbsIdentifyPanel tek bir `_vectorClickState` alaninda
// tutar.
//
// - "neutral": Bu tiklamada (veya en son map:click'te) bir Entity BULUNMADI
//   -- _onMapClick her tiklamada buraya sifirlar. _onImageryClick bu
//   durumdayken gelirse SAF bir raster (WMS/WMTS) sonucu olarak islenir
//   (vektorle hicbir iliskisi yok).
// - "entityPending": _onEntityClick bir Entity BULDU, vektor sonuclari
//   HESAPLANDI ama HENUZ commit edilmedi (bkz _onEntityClick'teki
//   setTimeout(0) -- bir sonraki makrotaska kadar bekleyip ayni noktada
//   BASLAMIS olabilecek bir WMS/WMTS sorgusunun sonucunu, varsa, BEKLER).
//   _onEntityClick'in kendi setTimeout'u ile _onImageryClick asenkron olarak
//   YARISABILIR (agdan cok hizli/onceden cozulmus bir yanit gelirse
//   mikrotask, setTimeout'un makrotaskindan bile ONCE gelebilir) -- hangisi
//   ONCE gelirse tabloyu O acar (bkz asagidaki toEntityCommitted).
// - "entityCommitted": Vektor sonuclari ARTIK acildi/commit edildi (ya
//   vektor-timeout'u ya da erken gelen bir imagery:click tarafindan).
//   Ayni noktada BIR vektor feature VE bir raster feature cakisirsa
//   (orn. WFS + WMS ust uste) ikisi de gosterilmeli (bkz kullanici geri
//   bildirimi) -- bu durumda GEC gelen bir imagery:click, ZATEN acik olan
//   tabloya raster sonuclarini EKLER (commit etmez, sadece ekler).
export type VectorClickState =
  | { readonly kind: "neutral" }
  | { readonly kind: "entityPending"; readonly pendingVectorClick: PendingVectorClick }
  | { readonly kind: "entityCommitted" };

export const NEUTRAL_VECTOR_CLICK_STATE: VectorClickState = { kind: "neutral" };

/** map:click (Entity YOK) veya YENI bir tiklama basladiginda -- onceki tiklamanin durumu ne olursa olsun sifirlanir. */
export function toNeutral(): VectorClickState {
  return NEUTRAL_VECTOR_CLICK_STATE;
}

/** entity:click -- vektor sonuclari hesaplandi, commit HENUZ beklemede. */
export function toEntityPending(pendingVectorClick: PendingVectorClick): VectorClickState {
  return { kind: "entityPending", pendingVectorClick };
}

/** Vektor sonuclari commit edildi (tablo acildi) -- pendingVectorClick artik tutulmaz (tip seviyesinde). */
export function toEntityCommitted(): VectorClickState {
  return { kind: "entityCommitted" };
}
