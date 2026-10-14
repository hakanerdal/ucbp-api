import { ReactiveController, ReactiveControllerHost } from 'lit';
export declare class TimerBag implements ReactiveController {
    private readonly _timeoutIds;
    private readonly _frameIds;
    constructor(host: ReactiveControllerHost);
    hostDisconnected(): void;
    /** `window.setTimeout` sarmalayicisi -- id'yi izler, `fn` calistiktan sonra izlemeden düşer. */
    setTimeout(fn: () => void, ms: number): number;
    /** `setTimeout()`'un döndürdüğü id ile bekleyen bir zamanlayıcıyı iptal eder. `null` ile çağrılması güvenlidir (no-op). */
    clearTimeout(id: number | null): void;
    /** `requestAnimationFrame` sarmalayicisi -- id'yi izler, `fn` calistiktan sonra izlemeden düşer. */
    requestAnimationFrame(fn: () => void): number;
    /** `requestAnimationFrame()`'in döndürdüğü id ile bekleyen bir kareyi iptal eder. `null` ile çağrılması güvenlidir (no-op). */
    cancelAnimationFrame(id: number | null): void;
}
//# sourceMappingURL=TimerBag.d.ts.map