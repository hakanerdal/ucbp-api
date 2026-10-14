import { OgcRequestError } from "@tucbs/core";

// Servis kesfinin (eski TucbsServiceUpload._fetchCapabilities) hata siniflandirmasi ve kullanici
// mesaji (Faz 6/4e) buraya tasindi -- metodun karmasikligi gercek hatalar
// plani H2.2'nin nesil kontrolleriyle ESLint sinirini (20) asmisti. Davranis
// ve mesaj metinleri DEGISMEDI. Faz 3.3'te kesif akisinin geri kalani
// ServiceDiscoveryController'a cikarildi.

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
export function classifyDiscoveryError(err: unknown): DiscoveryFailure {
  // getCapabilities/getCapabilitiesDocument sunucu hatasinda (4xx/5xx)
  // veya XML parse basarisizliginda OgcRequestError firlatir (bkz
  // ogc/capabilities.ts) -- kodu server/parse ayrimini yapar. Baska
  // her sey (DNS/baglanti/CORS ile hic ulasilamama) duz bir fetch
  // TypeError'idir, "network" sayilir. Ham tarayici mesaji (ör.
  // "Failed to fetch") kullaniciya GOSTERILMEZ -- versiyona/tarayiciya
  // gore degistigi icin kafa karistirir; sadece SEBEP KATEGORISI
  // sabit bir Turkce mesaja cevrilir.
  if (err instanceof OgcRequestError) {
    return {
      kind: err.code === "OGC_SERVICE_DISCOVERY_PARSE_FAILED" ? "parse" : "server",
      detail: err.message,
    };
  }
  return { kind: "network", detail: err instanceof Error ? err.message : String(err) };
}

/**
 * Tüm sürümler denendikten sonra kullanıcıya gösterilecek keşif hatası mesajını üretir.
 * @param failure - Son denemenin hatası; hiçbir deneme hata atmadıysa `undefined`.
 * @returns Kullanıcıya gösterilecek (iki satırlı) Türkçe mesaj.
 */
export function discoveryErrorMessage(failure: DiscoveryFailure | undefined): string {
  switch (failure?.kind) {
    case "network":
      return "Servis adresine ulaşılamadı.\nAdresi kontrol edin veya sunucunun CORS/erişim izinlerini doğrulayın.";
    case "server":
      return `Sunucu bir hata döndürdü.\n${failure.detail}`;
    case "parse":
      return "Sunucunun yanıtı geçerli bir XML olarak ayrıştırılamadı.\nAdresin doğru bir GetCapabilities uç noktası olduğundan emin olun.";
    default:
      // Hicbir istek hata FIRLATMADI (sunucu HER surum icin gecerli
      // ama 0 katman iceren bir yanit dondurdu) -- bu durumda daha
      // spesifik bir sebep YOK, adres/servis turu uyusmazligi olasi.
      return "Servis adresinden geçerli bir yanıt alınamadı.\nAdresi ve seçili servis türünü kontrol edin.";
  }
}
