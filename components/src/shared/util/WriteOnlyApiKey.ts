// WHY: TucbsMap.ts/TucbsApp.ts/TucbsLayerList.ts'te BIREBIR AYNI "write-only
// apiKey" deseni UC KERE tekrarlanıyordu (bkz God Component kılavuzu, "Çapraz
// Tekrarlar" bölümü): `#apiKey` gerçek ES private field + `@property` setter
// (gerçek değeri yazar) + getter (HER ZAMAN maskelenmiş döner). Amaç: DOM
// Inspector'da veya `document.querySelector(...).apiKey` ile sayfadaki BAŞKA
// bir script (3.parti widget, XSS payload'ı) tarafından gerçek anahtarın
// sıfır-efor okunmasını engellemek (bkz
// project_ucbp_api_global_import_seviyesi_apikey_arastirma güvenlik
// değerlendirmesi). Bu sınıf o tekrarı tek yere indirir.
//
// GÜVENLİK UYARISI (host'u yazan kişiye): bu sınıfın örneğini TUTAN alan
// BU PROJENİN diğer composition-çıkarmalarındaki (PortalHost, TimerBag,
// ExclusiveOverlayCoordinator, AsyncGeneration) `private readonly` kalıbıyla
// TUTULMAMALI -- o kalıp sadece TypeScript derleme-zamanı bir işaretleyici,
// çalışan JS'te hiçbir koruma sağlamaz. Eğer host `private readonly
// _apiKeyState = new WriteOnlyApiKey(this)` yazarsa,
// `el._apiKeyState.real` ile gerçek anahtar DIŞARIDAN okunabilir hale gelir
// -- bugünkünden (tamamen erişilemez `#apiKey`) DAHA KÖTÜ bir durum. Host
// MUTLAKA gerçek ES private field kullanmalı:
//   #apiKeyState = new WriteOnlyApiKey(this);   // "private" (TS) DEĞİL

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
export class WriteOnlyApiKey {
  #value = "";

  constructor(private readonly host: WriteOnlyApiKeyHost) {}

  /** Gerçek değeri `value ?? ""` olarak yazar ve host'ta `requestUpdate("apiKey", eskiDeğer)` tetikler. */
  write(value: string): void {
    const old = this.#value;
    this.#value = value ?? "";
    this.host.requestUpdate("apiKey", old);
  }

  /** Gerçek değeri `requestUpdate` TETİKLEMEDEN doğrudan yazar (TucbsMap.ts'in geç-attribute-binding telafisi için). */
  writeDirect(value: string): void {
    this.#value = value;
  }

  /** Dışarıya dönecek, maskelenmiş değer -- değer boşsa `""`, doluysa `"••••••"`. */
  get masked(): string {
    return this.#value ? "••••••" : "";
  }

  /** Gerçek değer -- SADECE sınıf içinden (host'un kendi metotlarından) okunmalı, asla dışarıya döndürülmemeli. */
  get real(): string {
    return this.#value;
  }
}
