/**
 * Bir "çıplak marker" custom element'in (`tagName`) `host`'un kendi
 * kökünde (document veya shadow root) var olup olmadığını canlı izler.
 */
export declare class MarkerWatcher<T extends Element = Element> {
    private readonly host;
    private readonly tagName;
    private readonly onChange;
    private observer;
    private current;
    /** @param onChange Marker'ın varlığı (keşfedilen element VEYA `null`) DEĞİŞTİĞİNDE çağırılır -- `start()` ilk taramada da bir kez çağırır. */
    constructor(host: HTMLElement, tagName: string, onChange: (marker: T | null) => void);
    /** İlk taramayı yapar ve kökü canlı izlemeye başlar (bir kez, `host.connectedCallback()`'ten çağrılmalı). */
    start(): void;
    private evaluate;
    /** İzlemeyi durdurur (`host.disconnectedCallback()`'ten çağrılmalı). */
    dispose(): void;
}
//# sourceMappingURL=MarkerWatcher.d.ts.map