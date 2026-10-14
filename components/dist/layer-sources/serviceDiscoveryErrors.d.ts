/** Servis keşfinde bir sürüm denemesinin başarısızlık kategorisi ve ham ayrıntısı. */
export interface DiscoveryFailure {
    /** `network`: sunucuya hiç ulaşılamadı; `server`: sunucu hata döndürdü; `parse`: yanıt XML olarak ayrıştırılamadı. */
    readonly kind: "network" | "server" | "parse";
    /** Hatanın ham mesajı (yalnızca `server` için kullanıcıya gösterilir). */
    readonly detail: string;
}
/**
 * GetCapabilities isteğinin attığı hatayı kategorisine ayırır.
 * @param err - `getCapabilities`/`getCapabilitiesDocument` çağrısının attığı değer.
 * @returns Hatanın kategorisi ve ham mesajı.
 */
export declare function classifyDiscoveryError(err: unknown): DiscoveryFailure;
/**
 * Tüm sürümler denendikten sonra kullanıcıya gösterilecek keşif hatası mesajını üretir.
 * @param failure - Son denemenin hatası; hiçbir deneme hata atmadıysa `undefined`.
 * @returns Kullanıcıya gösterilecek (iki satırlı) Türkçe mesaj.
 */
export declare function discoveryErrorMessage(failure: DiscoveryFailure | undefined): string;
//# sourceMappingURL=serviceDiscoveryErrors.d.ts.map