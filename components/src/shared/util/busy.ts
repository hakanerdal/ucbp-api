// Katman ekleme/servis kesfi gibi asenkron islemler surerken diger
// bilesenlerle (toolbar, layer-list vb.) etkilesimin devam ETMEMESI icin
// (bkz kullanici bildirimi: "arka planda bilesenlerle etkilesim devam
// ETMEMELI") paylasilan, referans-sayimli bir "mesgul" sinyali. TucbsBusyOverlay
// bunu document uzerinde dinleyip tam ekran kilitleyen bir overlay gosterir.
// Referans sayaci kullanilir cunku ayni anda birden fazla islem (orn. dosya
// yukleme + servis ekleme) cakisirsa, ilk biten overlay'i erken KALDIRMAMALI.
let refCount = 0;

// Tuketici HTML'ine elle <tucbs-busy-overlay> eklemesi GEREKMEZ -- toast.ts'teki
// (bkz o dosyanin WHY yorumu) ayni document.body-portal deseniyle, overlay
// ilk beginBusy() cagrisinda KENDILIGINDEN mount edilir. tucbs-app zaten
// KENDI govdesinde bir tane render ediyor (bkz TucbsApp.ts) -- document
// genelinde ikinciye gerek kalmasin diye once mevcut olup olmadigi kontrol
// edilir.
let overlayEnsured = false;

function ensureOverlay(): void {
  if (overlayEnsured || typeof document === "undefined") return;
  overlayEnsured = true;
  if (document.querySelector("tucbs-busy-overlay")) return;
  document.body.appendChild(document.createElement("tucbs-busy-overlay"));
}

function dispatch(message?: string): void {
  document.dispatchEvent(
    new CustomEvent("tucbs-busy-changed", {
      detail: { busy: refCount > 0, message },
    }),
  );
}

/**
 * "Meşgul" referans sayacını bir artırır ve `tucbs-busy-changed` event'ini yayar; ilk çağrıda overlay'i otomatik mount eder.
 * @param message - Overlay'de gösterilecek mesaj.
 */
export function beginBusy(message: string): void {
  ensureOverlay();
  refCount++;
  dispatch(message);
}

/** "Meşgul" referans sayacını bir azaltır (0'ın altına düşmez) ve `tucbs-busy-changed` event'ini yayar. */
export function endBusy(): void {
  refCount = Math.max(0, refCount - 1);
  dispatch();
}
