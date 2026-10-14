/** `WriteOnlyApiKey`'i tutan host'un ihtiyaç duyduğu minimum Lit arayüzü. */
export interface WriteOnlyApiKeyHost {
    requestUpdate(name?: PropertyKey, oldValue?: unknown): void;
}
/**
 * Bir apiKey değerini "yazılabilir ama okunamaz" tutan saf durum sınıfı.
 * Gerçek değer sadece `real` ile (sınıf İÇİNDEN) okunur; `masked` dışarıya
 * (örn. bileşenin public `get apiKey()`'i içinden) döndürülecek değerdir.
 *
 * @example
 * ```ts
 * #apiKeyState = new WriteOnlyApiKey(this);
 *
 * @property({ attribute: "api-key" })
 * set apiKey(value: string) {
 *   this.#apiKeyState.write(value);
 * }
 * get apiKey(): string {
 *   return this.#apiKeyState.masked;
 * }
 * ```
 */
export declare class WriteOnlyApiKey {
    #private;
    private readonly host;
    constructor(host: WriteOnlyApiKeyHost);
    /** Gerçek değeri `value ?? ""` olarak yazar ve host'ta `requestUpdate("apiKey", eskiDeğer)` tetikler. */
    write(value: string): void;
    /** Gerçek değeri `requestUpdate` TETİKLEMEDEN doğrudan yazar (TucbsMap.ts'in geç-attribute-binding telafisi için). */
    writeDirect(value: string): void;
    /** Dışarıya dönecek, maskelenmiş değer -- değer boşsa `""`, doluysa `"••••••"`. */
    get masked(): string;
    /** Gerçek değer -- SADECE sınıf içinden (host'un kendi metotlarından) okunmalı, asla dışarıya döndürülmemeli. */
    get real(): string;
}
//# sourceMappingURL=WriteOnlyApiKey.d.ts.map