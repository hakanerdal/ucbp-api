import { LayerOperationError, OgcRequestError } from "../shared/TucbsError.js";
import type {
  AuthorizedLayerInfo,
  WFSLayerOptions,
  WMSLayerOptions,
  WMTSLayerOptions,
} from "../types/index.js";

/**
 * LayerManager'in apiKey/trustedApiKeyHosts/OGC-proxy URL kurma mantigini
 * barindiran, Cesium Viewer'a ihtiyac duymayan saf modul (bkz
 * project_ucbp_api_god_component_refactor_kurallari, 2.3 Hedef Yapi ve
 * Ek-A). LayerManager.ts'ten TEK SATIR bile davranis degisikligi
 * OLMADAN tasinmistir (Faz 2). ML-07 (isKnownGatedUrl'un host yerine dize
 * alt-dizgesine bakan kisayolu) Faz 3'te AYRI bir commit'te duzeltildi --
 * bkz isOwnBackendUrl ve LayerManager.characterization.test.ts "ML-07"
 * test bloğu.
 */
export class ApiKeyPolicy {
  // apiKey'in fetch/Resource-tabanli (header tasiyabilen) isteklere eklendigi
  // header adi -- backend'deki ucbp-api'nin ApiKeyAuthFilter'iyla ayni.
  private static readonly API_KEY_HEADER_NAME = "X-API-Key";
  // apiKey'in header TASIYAMAYAN isteklere (WMS/WMTS GetLegendGraphic --
  // tarayicinin <img> etiketiyle cekilir) eklendigi query-string parametre
  // adi. Bu yol, backend'de ayri bir WMS/WMTS Proxy katmani hazir olana kadar
  // gercek bir sunucudan anahtara gore dogrulanmis yanit ALMAZ -- URL burada
  // sadece DOGRU BICIMDE olusturulur (bkz. attachApiKeyToUrl).
  private static readonly API_KEY_QUERY_PARAM_NAME = "tucbsapikey";

  // Map.ts uzerinden configure() ile atanir. undefined ise apiKey mekanizmasi
  // tamamen devre disi kalir (mevcut authToken/Bearer davranisi degismez).
  // GERCEK (ES private) bir field -- TypeScript'in `private`
  // anahtar sozcugu sadece derleme-zamaninda kontrol eder, derlenen JS'te
  // silinir ve disaridan (ör. sayfada calisan baska bir script, XSS
  // payload'i) runtime'da hala okunabilir kalirdi. # ile gercekten
  // disaridan erisilemez hale gelir (bkz.
  // project_ucbp_api_global_import_seviyesi_apikey_arastirma guvenlik
  // bolumu).
  #apiKey: string | undefined;
  // apiKey'in OTOMATIK eklenecegi host'lar (bkz. types/map.types.ts
  // MapOptions.trustedApiKeyHosts). Bu listede olmayan bir host'a giden
  // istege apiKey KESINLIKLE eklenmez -- kullanicinin TucbsServiceUpload ile
  // ekledigi keyfi 3.taraf servislere anahtar sizmasini engelleyen tek
  // savunma katmani budur.
  private trustedApiKeyHosts: readonly string[] | undefined;
  // getAuthorizedLayers() → GET /layers (varsayılan: apiBase()/layers).
  private apiKeyDiscoveryUrl: string | undefined;
  // ucbp-api kokunu HER cagrida CANLI okur (sabit bir string DEGIL) --
  // configureTucbs({apiBase}) LayerManager kurulduktan SONRA cagrilirsa bile
  // dogru degeri gormeye devam etmek icin (bkz LayerManager.ts constructor'i,
  // getUcbpApiBase() ile ayni "her zaman canlı oku" davranışını korur).
  private readonly getApiBase: () => string;

  constructor(options: { readonly apiBase: () => string }) {
    this.getApiBase = options.apiBase;
  }

  /**
   * apiKey ile ilgili ayarlari (Map.ts constructor'indan) gec-yapilandirir.
   * Sadece verilen alanlar guncellenir, digerleri oldugu gibi kalir --
   * boylece Map.ts, MapOptions'ta apiKey verilmemisse bu metodu hic
   * cagirmayabilir ya da kismi bir nesne geciebilir.
   */
  configure(options: {
    readonly apiKey?: string;
    readonly trustedApiKeyHosts?: readonly string[];
    readonly apiKeyDiscoveryUrl?: string;
  }): void {
    if (options.apiKey !== undefined) {
      this.#apiKey = options.apiKey;
    }
    if (options.trustedApiKeyHosts !== undefined) {
      this.trustedApiKeyHosts = options.trustedApiKeyHosts;
    }
    if (options.apiKeyDiscoveryUrl !== undefined) {
      this.apiKeyDiscoveryUrl = options.apiKeyDiscoveryUrl;
    }
  }

  /** apiKey configure() ile atanmis mi -- SADECE varligi, degerin kendisi
   * degil (#apiKey gercek private field olarak kapali kalir). */
  get hasApiKey(): boolean {
    return this.#apiKey !== undefined;
  }

  /** {@link LayerManager.getAuthorizedLayers} implementasyonu -- apiKey'e
   * gore yetkili WMS/WFS/WMTS listesi, {@code GET /layers} + {@code X-API-Key}. */
  async getAuthorizedLayers(): Promise<AuthorizedLayerInfo[]> {
    if (this.#apiKey === undefined) {
      throw new LayerOperationError(
        "LAYER_AUTHORIZED_LIST_API_KEY_MISSING",
        "getAuthorizedLayers() icin apiKey gerekli — Map/LayerManager.configure({apiKey}) ile atayin."
      );
    }
    const discoveryUrl =
      this.apiKeyDiscoveryUrl ??
      `${this.getApiBase().replace(/\/+$/, "")}/layers`;
    const response = await fetch(discoveryUrl, {
      headers: { [ApiKeyPolicy.API_KEY_HEADER_NAME]: this.#apiKey },
    });
    if (!response.ok) {
      throw new OgcRequestError(
        "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED",
        `Yetkili katman listesi alinamadi: ${response.status} ${response.statusText}`
      );
    }
    const data = (await response.json()) as
      | AuthorizedLayerInfo[]
      | { object?: AuthorizedLayerInfo[]; isSuccess?: boolean; mesaj?: string };
    const raw = Array.isArray(data) ? data : data.object ?? [];
    return raw.map((item) => this.normalizeAuthorizedLayer(item));
  }

  /** {@link getAuthorizedLayers} alias (checklist getLayerList). */
  async getLayerList(): Promise<AuthorizedLayerInfo[]> {
    return this.getAuthorizedLayers();
  }

  /**
   * {@link LayerManager.canAddAuthorizedLayer} implementasyonu -- bir
   * AuthorizedLayerInfo'nun {@link resolveAddOptions}/`LayerManager.add()`
   * ile eklenebilir olup olmadigini bildirir (GC-03 Adim 3 kapsaminda
   * `TucbsAuthorizedLayers.ts`'teki ORIJINAL `_authorizedCanAdd`'in TEK
   * SATIR davranis degisikligi olmadan buraya tasinmis hali -- artik hem
   * Lit bilesen hem baska bir UI katmani (ör. React) AYNI kaynagi kullanir).
   */
  canAddAuthorizedLayer(info: AuthorizedLayerInfo): boolean {
    const tur = (info.servisTuru || "").toUpperCase();
    if (!info.servisUrl?.trim() || !this.resolveOgcLayerName(info.ogcLayerName, info.katmanAdi)) {
      return false;
    }
    if (tur === "WMTS") return !!info.wmtsTileMatrixSet?.trim();
    return tur === "WMS" || tur === "WFS";
  }

  /**
   * {@link LayerManager.addAuthorizedLayer} implementasyonu -- bir
   * AuthorizedLayerInfo'yu `LayerManager.add()`'in bekledigi
   * `{layerType, options}` ciftine cozer (ORIJINAL
   * `_resolvedOgcLayerName`+`_addOneAuthorizedLayer`'in options-eslestirme
   * kismi, AYNI sekilde tasinmistir). {@link canAddAuthorizedLayer} false
   * donuyorsa `LayerOperationError` firlatir -- `add()`'i KENDISI cagirmaz,
   * caller (`LayerManager.addAuthorizedLayer`) sonucu mevcut `add()`
   * dispatcher'ina verir.
   */
  resolveAddOptions(
    info: AuthorizedLayerInfo
  ):
    | { readonly layerType: "WMS"; readonly options: WMSLayerOptions }
    | { readonly layerType: "WFS"; readonly options: WFSLayerOptions }
    | { readonly layerType: "WMTS"; readonly options: WMTSLayerOptions } {
    if (!this.canAddAuthorizedLayer(info)) {
      throw new LayerOperationError(
        "LAYER_AUTHORIZED_ADD_MISSING_INFO",
        info.servisTuru?.toUpperCase() === "WMTS"
          ? "WMTS için TileMatrixSet eksik."
          : "Eksik servis bilgisi."
      );
    }
    const tur = info.servisTuru.toUpperCase() as "WMS" | "WFS" | "WMTS";
    const id = `authorized-${this.authorizedLayerKey(info)}-${Date.now()}`;
    const layerName = this.resolveOgcLayerName(info.ogcLayerName, info.katmanAdi);
    const title = info.katmanAdi || layerName;
    if (tur === "WMS") {
      return { layerType: "WMS", options: { id, title, url: info.servisUrl, layers: layerName } };
    }
    if (tur === "WFS") {
      return { layerType: "WFS", options: { id, title, url: info.servisUrl, typeName: layerName } };
    }
    return {
      layerType: "WMTS",
      options: {
        id,
        title,
        url: info.servisUrl,
        layer: layerName,
        tileMatrixSetID: info.wmtsTileMatrixSet as string,
      },
    };
  }

  // ORIJINAL _authorizedKey (TucbsAuthorizedLayers.ts) ile AYNI anahtar
  // formatu -- sadece resolveAddOptions()'in id uretimi icin, UI'daki
  // secim-listesi anahtarindan (checkbox kimligi) BAGIMSIZ bir amac.
  private authorizedLayerKey(info: AuthorizedLayerInfo): string {
    return info.id ?? `${info.servisTuru}|${info.servisUrl}|${info.ogcLayerName}`;
  }

  private normalizeAuthorizedLayer(item: AuthorizedLayerInfo): AuthorizedLayerInfo {
    const ogc = this.resolveOgcLayerName(item.ogcLayerName, item.katmanAdi);
    const servisUrl = this.rewriteOpaqueOgcUrl(item.servisUrl);
    const servisTuru = item.servisTuru.toUpperCase() as AuthorizedLayerInfo["servisTuru"];
    return {
      ...item,
      servisTuru,
      ...(ogc && ogc !== item.ogcLayerName ? { ogcLayerName: ogc } : {}),
      ...(servisUrl !== item.servisUrl ? { servisUrl } : {}),
    };
  }

  private resolveOgcLayerName(
    ogcLayerName?: string,
    katmanAdi?: string,
  ): string {
    for (const raw of [ogcLayerName, katmanAdi]) {
      if (!raw) continue;
      const t = raw.trim();
      if (!t || t.toLowerCase() === "undefined" || t.toLowerCase() === "null") {
        continue;
      }
      return t;
    }
    return "";
  }

  // ── apiKey ic yardimcilari ───────────────────────────────────────────────

  /**
   * Verilen URL'in host'u trustedApiKeyHosts listesinde mi kontrol eder.
   * URL ayristirilamazsa (goreli/bicimsiz URL) GUVENLI TARAFTA kalinir --
   * host bilinmiyorsa apiKey EKLENMEZ (fail-closed).
   */
  private isTrustedApiKeyHost(url: string): boolean {
    if (this.#apiKey === undefined) return false;
    return this.isKnownGatedUrl(url);
  }

  /**
   * URL'in apiKey gerektiren bir servis deseni (ucbp-api OGC proxy veya
   * configure edilmis trustedApiKeyHosts) tasiyip tasimadigini, apiKey'in
   * o an var olup olmadigindan BAGIMSIZ olarak bildirir. Tuketiciler
   * (ör. TucbsMapPreview) bunu, apiKey yok/gecersizken bir katmanin
   * gercekten acik olup olmadigina karar vermek icin kullanir.
   */
  layerRequiresApiKey(url: string): boolean {
    return this.isKnownGatedUrl(url);
  }

  private isKnownGatedUrl(url: string): boolean {
    // K4/K5: ucbp-api OGC proxy — her zaman key ekle (header veya query).
    if (this.isOwnBackendUrl(url)) return true;
    if (this.trustedApiKeyHosts === undefined || this.trustedApiKeyHosts.length === 0) {
      return false;
    }
    try {
      // NOT: burada BILEREK window.location.origin taban ALINMIYOR --
      // ML-07 duzeltmesi SADECE isOwnBackendUrl'e ait, bu dal (kullanicinin
      // configure({trustedApiKeyHosts}) ile verdigi 3.taraf host listesi)
      // davranis degisikligi kapsami DISINDA, orijinal haliyle korunuyor.
      return this.trustedApiKeyHosts.includes(new URL(url).hostname);
    } catch {
      return false;
    }
  }

  /**
   * ML-07 DUZELTMESI (Faz 3): eskiden burada `url.includes("/wms-proxy/") ||
   * url.includes("/ogc/")` gibi TUM URL dizgesine bakan bir alt-dizge
   * (substring) kisayolu vardi -- path'inde tesaduf eseri "/ogc/" veya
   * "/wms-proxy/" gecen UCUNCU TARAF bir sunucu (ör. OGC API Features
   * konvansiyonunu kullanan bircok gercek GIS sunucusu) yanlislikla
   * "kendi backend'imiz" sayilip apiKey o sunucuya sizdirilabiliyordu.
   * Simdi HOST karsilastirmasi yapilir (asagidaki trustedApiKeyHosts
   * kontrolüyle AYNI desen, `new URL(..., window.location.origin)` --
   * apiBase() goreli bir yol da olabilir, bkz wfsCapabilities.ts:54'teki
   * ayni cozumleme deseni) -- host eslesmiyorsa artik path'te ne yazarsa
   * yazsin GUVENLI TARAFTA (apiKey eklenmez) kalinir.
   */
  private isOwnBackendUrl(url: string): boolean {
    try {
      const target = new URL(url, window.location.origin);
      const base = new URL(this.getApiBase(), window.location.origin);
      if (target.hostname !== base.hostname) return false;
      return target.pathname.includes("/wms-proxy/") || target.pathname.includes("/ogc/");
    } catch {
      return false;
    }
  }

  /**
   * /layers servisUrl sunucuda api-public-base-url ile üretilir (dev URL kalabilir).
   * Opaque /ogc/ yollarını her zaman apiBase() ile hizalar.
   */
  private rewriteOpaqueOgcUrl(url: string | undefined): string {
    if (!url?.includes("/ogc/")) {
      return url ?? "";
    }
    const ogcIdx = url.indexOf("/ogc/");
    const pathAndQuery = url.substring(ogcIdx);
    const base = this.getApiBase().replace(/\/+$/, "");
    return `${base}${pathAndQuery}`;
  }

  /**
   * apiKey varsa opaque {@code /ogc/{type}/{id}} veya legacy {@code /wms-proxy/{type}?url=} kullanır.
   */
  resolveOgcProxyUrl(
    serviceType: "wms" | "wmts" | "wfs" | "wcs",
    upstreamUrl: string,
  ): string {
    if (this.#apiKey === undefined) return upstreamUrl;
    if (upstreamUrl.includes("/ogc/")) {
      return this.rewriteOpaqueOgcUrl(upstreamUrl);
    }
    if (upstreamUrl.includes("/wms-proxy/")) {
      return upstreamUrl;
    }
    const base = `${this.getApiBase().replace(/\/+$/, "")}/wms-proxy/${serviceType}`;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}url=${encodeURIComponent(upstreamUrl)}`;
  }

  /**
   * fetch/Resource-tabanli (header tasiyabilen) istekler icin: host
   * guvenilirse mevcut header'lara apiKey'i EKLER, degilse header'lari
   * OLDUGU GIBI dondurur. WMS/WMTS tile, WFS GetFeature, WCS GetCoverage ve
   * ortak GetCapabilities istekleri bu yolu kullanir -- bu istekler zaten
   * fetch()/Cesium Resource uzerinden gittigi icin header EKLENMESI, bu
   * gelistirme kapsaminda UCTAN UCA calisir (backend'de ayrica bir proxy
   * gerektirmez, ilgili sunucu header'i okuyabilir).
   */
  mergeApiKeyHeader(
    headers: Record<string, string> | undefined,
    url: string
  ): Record<string, string> | undefined {
    if (!this.isTrustedApiKeyHost(url)) return headers;
    return { ...headers, [ApiKeyPolicy.API_KEY_HEADER_NAME]: this.#apiKey as string };
  }

  /**
   * Header TASIYAMAYAN istekler (WMS/WMTS GetLegendGraphic — tarayicida
   * `<img src>` ile cekilir) icin: host guvenilirse apiKey'i query-string
   * parametresi (tucbsapikey) olarak URL'e ekler. NOT: bu SADECE URL'i dogru
   * bicimde olusturur -- gercek bir sunucudan anahtara gore dogrulanmis yanit
   * alinmasi, backend'deki WMS/WMTS Proxy katmani (ayri, henuz onaylanmamis
   * bir gelistirme) hazir olduguna baglidir.
   */
  attachApiKeyToUrl(url: string): string {
    if (!this.isTrustedApiKeyHost(url)) return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${ApiKeyPolicy.API_KEY_QUERY_PARAM_NAME}=${encodeURIComponent(this.#apiKey as string)}`;
  }

  buildAuthHeaders(
    authToken: string | undefined
  ): Record<string, string> | undefined {
    if (authToken === undefined) return undefined;
    return { Authorization: `Bearer ${authToken}` };
  }
}
