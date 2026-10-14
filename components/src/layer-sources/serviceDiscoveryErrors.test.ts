import { describe, expect, it } from "vitest";
import { OgcRequestError } from "@tucbs/core";
import { classifyDiscoveryError, discoveryErrorMessage } from "./serviceDiscoveryErrors.js";

// TucbsServiceUpload kesif hatalarinin siniflandirmasi ve mesajlari (bilesen
// uzerinden ayrica TucbsServiceUpload.characterization.test'te dondurulur).
describe("classifyDiscoveryError", () => {
  it("ayristirma kodlu OgcRequestError 'parse', digerleri 'server' sayilir", () => {
    expect(classifyDiscoveryError(new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "XML bozuk"))).toEqual({
      kind: "parse",
      detail: "XML bozuk",
    });
    expect(classifyDiscoveryError(new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "500 Hata"))).toEqual({
      kind: "server",
      detail: "500 Hata",
    });
  });

  it("OgcRequestError olmayan hatalar 'network' sayilir; Error olmayan degerin metni alinir", () => {
    expect(classifyDiscoveryError(new TypeError("Failed to fetch"))).toEqual({ kind: "network", detail: "Failed to fetch" });
    expect(classifyDiscoveryError("kopuk")).toEqual({ kind: "network", detail: "kopuk" });
  });
});

describe("discoveryErrorMessage", () => {
  it("kategoriye gore sabit mesaj verir; yalnizca sunucu hatasi ham ayrintiyi gosterir", () => {
    expect(discoveryErrorMessage({ kind: "network", detail: "Failed to fetch" })).toBe(
      "Servis adresine ulaşılamadı.\nAdresi kontrol edin veya sunucunun CORS/erişim izinlerini doğrulayın.",
    );
    expect(discoveryErrorMessage({ kind: "server", detail: "500 Hata" })).toBe("Sunucu bir hata döndürdü.\n500 Hata");
    expect(discoveryErrorMessage({ kind: "parse", detail: "XML bozuk" })).toBe(
      "Sunucunun yanıtı geçerli bir XML olarak ayrıştırılamadı.\nAdresin doğru bir GetCapabilities uç noktası olduğundan emin olun.",
    );
  });

  it("hic hata yoksa genel mesaj verir", () => {
    expect(discoveryErrorMessage(undefined)).toBe(
      "Servis adresinden geçerli bir yanıt alınamadı.\nAdresi ve seçili servis türünü kontrol edin.",
    );
  });
});
