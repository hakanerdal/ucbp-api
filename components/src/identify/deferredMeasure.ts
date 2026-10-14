import type { TimerBag } from "../shared/util/TimerBag.js";

// TucbsIdentifyPanel'deki _resetAccordionOpen ve _scheduleScrollThumbSync
// BIREBIR AYNI iki adimli duzeltme/olcum desenini paylasiyordu (bkz God
// Component kilavuzu GC-04 5.4 Adim 2): cds-accordion-item gibi cocuk custom
// element'ler ilk render'ini/acilma-kapanma gecisini HEMEN degil bir sonraki
// karede ya da kisa bir gecikmeyle tamamlayabildigi icin TEK bir rAF
// yetmiyor -- ayni fonksiyon HEM bir animasyon karesinde HEM DE 150ms sonra
// tekrar calistirilir. Bu fonksiyon o iki cagriyi tekilleştirir; verilen
// `timers` (bkz shared/util/TimerBag.ts) sayesinde host DOM'dan kaldirilirsa
// bekleyen ikinci cagri da otomatik iptal olur.
export function deferredMeasure(timers: TimerBag, fn: () => void): void {
  timers.requestAnimationFrame(fn);
  timers.setTimeout(fn, 150);
}
