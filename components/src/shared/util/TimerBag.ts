import type { ReactiveController, ReactiveControllerHost } from "lit";

// TucbsIdentifyPanel'de dokuz ayri setTimeout/requestAnimationFrame cagrisi
// vardi, bunlarin SADECE biri (_basicDismissTimer) disconnectedCallback()'te
// elle temizleniyordu (bkz God Component kilavuzu GC-04 5.4 Adim 1) -- geri
// kalan sekizi, panel bir goruntu (orn. dialog/route degisikligi) sirasinda
// DOM'dan kaldirilirsa geri cagrilari (callback'leri) artik var olmayan/
// yeniden kullanilan bir shadowRoot uzerinde calismaya devam edebiliyordu
// (sizinti). Bu sinif, host'un ReactiveController yasam dongusune (bkz
// shared/ui/VirtualScrollbar.ts'teki AYNI gerekce) baglanarak TUM
// setTimeout/requestAnimationFrame cagrilarini tek bir yerden izler ve
// hostDisconnected()'da hepsini birden iptal eder -- cagiran tarafin ayri
// ayri id alanlari tutup elle temizlemesine gerek kalmaz.
export class TimerBag implements ReactiveController {
  private readonly _timeoutIds = new Set<number>();
  private readonly _frameIds = new Set<number>();

  constructor(host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostDisconnected(): void {
    for (const id of this._timeoutIds) window.clearTimeout(id);
    this._timeoutIds.clear();
    for (const id of this._frameIds) cancelAnimationFrame(id);
    this._frameIds.clear();
  }

  /** `window.setTimeout` sarmalayicisi -- id'yi izler, `fn` calistiktan sonra izlemeden düşer. */
  setTimeout(fn: () => void, ms: number): number {
    const id = window.setTimeout(() => {
      this._timeoutIds.delete(id);
      fn();
    }, ms);
    this._timeoutIds.add(id);
    return id;
  }

  /** `setTimeout()`'un döndürdüğü id ile bekleyen bir zamanlayıcıyı iptal eder. `null` ile çağrılması güvenlidir (no-op). */
  clearTimeout(id: number | null): void {
    if (id === null) return;
    window.clearTimeout(id);
    this._timeoutIds.delete(id);
  }

  /** `requestAnimationFrame` sarmalayicisi -- id'yi izler, `fn` calistiktan sonra izlemeden düşer. */
  requestAnimationFrame(fn: () => void): number {
    const id = requestAnimationFrame(() => {
      this._frameIds.delete(id);
      fn();
    });
    this._frameIds.add(id);
    return id;
  }

  /** `requestAnimationFrame()`'in döndürdüğü id ile bekleyen bir kareyi iptal eder. `null` ile çağrılması güvenlidir (no-op). */
  cancelAnimationFrame(id: number | null): void {
    if (id === null) return;
    cancelAnimationFrame(id);
    this._frameIds.delete(id);
  }
}
