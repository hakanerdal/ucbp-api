// TucbsError altyapisi -- @tucbs/core icin merkezi hata sistemi.
//
// Tasarim: her hata hem semantik bir "code" (kaynak kodda karsilastirma
// icin, ör. err.code === "LAYER_NOT_FOUND") hem kisa bir "number" (ör.
// "E101" -- dokumantasyon/destek/sartname "hata kodu" karsiligi) tasir.
// Numaralandirma araliklidir ve APPEND-ONLY'dir (numara asla yeniden
// kullanilmaz, silinen kod numarasi bos birakilir):
//   E0xx = ApiKey/config hatalari
//   E1xx = LayerOperationError
//   E2xx = OgcRequestError
//   E3xx = AnalysisRequestError
//   E4xx = GeometryError (CRS/koordinat)
//
// Bu dosya Faz 0 kapsaminda SADECE altyapiyi ve ApiKeyValidationError'in
// tasinmasini icerir -- LayerManager/AnalysisManager/wfsCapabilities/
// geojsonCrs/DrawingManager/components throw siteleri Faz 1-8'de
// kademeli olarak buraya tasinacak (bkz
// project_ucbp_api_tucbserror_uygulama_plani_fazli hafiza kaydi).
// TucbsErrorCode union'i her fazda YENI kodlarla genisleyecek.
//
// Faz 1: wfsCapabilities.ts (4 site, OgcRequestError, E2xx) +
// layers/sources/geojsonCrs.ts (3 site, GeometryError, E4xx) +
// DrawingManager.ts (1 site, taban TucbsError dogrudan -- alt sinifa
// ozgu bir OGC/layer/analysis/geometri hatasi olmadigindan E0xx
// "ApiKey/config/genel dahili hata" arastirmasina dahil edildi).
//
// Faz 2: analysis/AnalysisManager.ts (10 site, hepsi AnalysisRequestError,
// E3xx) -- buffer() ve intersection() metodlari AYNI 5 hata durumunu
// (apiKey eksik / ag hatasi / istek basarisiz / analiz basarisiz /
// yanitta geojson yok) BIREBIR ayni mesajlarla tekrarladigindan, 10 site
// 5 PAYLASILAN koda indirgendi (append-only kural numaraya degil KOD
// SAYISINA uygulanir -- iki cagri sitesinin AYNI anlamsal hatayi
// paylasmasi normaldir).
//
// Faz 3: LayerManager.ts (27 site) -- 17 site LayerOperationError (E1xx),
// 10 site OgcRequestError (yeni E205-E213 + GetCapabilities
// HTTP-basarisizligi icin Faz 1'deki OGC_CAPABILITIES_REQUEST_FAILED/E201
// KODU TEKRAR KULLANILDI -- WFS GetCapabilities ile LayerManager'in genel
// fetchXml() GetCapabilities hatasi ANLAMSAL olarak aynidir, yeni kod
// acmak duplikasyon olurdu).
//
// Faz 5: @tucbs/components -- TucbsMapPreview.ts (3 site, onizlemede
// XYZ/DRAWING/MEASURE desteklenmiyor) + TucbsLayerList.ts (2 site,
// layerManager hazir degil / yetkili katman eklenirken eksik servis
// bilgisi). Hepsi LayerOperationError, E1xx devami (E118-E122) --
// LayerManager.ts'teki E105-E107 (XYZ/DRAWING/MEASURE) ile ANLAMSAL
// olarak benzer ama mesaj metni ve cagri baglami (add() vs onizleme)
// FARKLI oldugundan KOD TEKRAR KULLANILMADI, yeni kod acildi (Faz
// 3'teki E201 tekrar-kullanim kararindan farkli olarak, burada
// mesajlar BIREBIR ayni degil).
//
// Faz 6 (bu fazda eklendi): TucbsServiceUpload.ts (3 site) -- 2 site
// OgcRequestError (GetCapabilities HTTP-basarisizligi icin MESAJ
// BIREBIR AYNI oldugundan Faz 1/3'teki OGC_CAPABILITIES_REQUEST_FAILED/
// E201 KODU TEKRAR KULLANILDI; XML parse hatasi icin mesaj farkli
// oldugundan yeni OGC_SERVICE_DISCOVERY_PARSE_FAILED/E214 acildi), 1
// site LayerOperationError (yeni LAYER_WMTS_TILEMATRIXSET_MISSING/E123
// -- orijinal envanterde OgcRequestError olarak sayilmisti, ama bu bir
// AG istegi degil, katman eklemeden ONCE yapilan bir DOGRULAMA hatasi;
// Faz 5'teki LAYER_AUTHORIZED_ADD_MISSING_INFO/E122 ile AYNI turden
// "WMTS icin gerekli bilgi eksik" durumu -- tutarlilik icin
// LayerOperationError'a alindi, plandaki ilk kabaca kategorizasyondan
// bilinçli bir sapma).

/** `@tucbs/core` tarafından fırlatılabilecek tüm hataların semantik kodu (bkz `getErrorCodes()`). */
export type TucbsErrorCode =
  | "API_KEY_MISSING"
  | "API_KEY_INVALID"
  | "INTERNAL_INDEX_OUT_OF_RANGE"
  | "OGC_CAPABILITIES_REQUEST_FAILED"
  | "OGC_CAPABILITIES_EXCEPTION"
  | "OGC_CAPABILITIES_PARSE_FAILED"
  | "OGC_FEATURE_TYPE_NOT_FOUND"
  | "CRS_UNRESOLVED_UNSUPPORTED"
  | "CRS_CLAIMED_WGS84_INVALID"
  | "CRS_MISSING_UNSUPPORTED"
  | "ANALYSIS_API_KEY_MISSING"
  | "ANALYSIS_NETWORK_ERROR"
  | "ANALYSIS_REQUEST_FAILED"
  | "ANALYSIS_UNSUCCESSFUL"
  | "ANALYSIS_RESPONSE_MISSING_GEOJSON"
  | "LAYER_AUTHORIZED_LIST_API_KEY_MISSING"
  | "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE"
  | "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED"
  | "LAYER_STYLE_NOT_VECTOR"
  | "LAYER_TYPE_UNSUPPORTED_XYZ"
  | "LAYER_TYPE_UNSUPPORTED_DRAWING"
  | "LAYER_TYPE_UNSUPPORTED_MEASURE"
  | "LAYER_WMS_LAYERS_EMPTY"
  | "LAYER_GEOTIFF_UNSUPPORTED"
  | "LAYER_SHP_PACKAGE_MISSING"
  | "LAYER_CSV_PACKAGE_MISSING"
  | "LAYER_CSV_LATLON_NOT_FOUND"
  | "LAYER_NOT_FOUND"
  | "LAYER_ID_ALREADY_EXISTS"
  | "LAYER_TYPE_MISMATCH"
  | "LAYER_SERVICE_OPTIONS_NOT_FOUND"
  | "LAYER_NOT_RASTER"
  | "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED"
  | "OGC_GEOTIFF_DOWNLOAD_FAILED"
  | "OGC_WFS_JSON_FORMAT_UNSUPPORTED"
  | "OGC_WFS_GEOJSON_REQUEST_FAILED"
  | "OGC_WFS_REQUEST_FAILED"
  | "OGC_WFS_EXCEPTION"
  | "OGC_WFS_OL_PACKAGE_MISSING"
  | "OGC_WCS_REQUEST_FAILED"
  | "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND"
  | "LAYER_PREVIEW_UNSUPPORTED_XYZ"
  | "LAYER_PREVIEW_UNSUPPORTED_DRAWING"
  | "LAYER_PREVIEW_UNSUPPORTED_MEASURE"
  | "LAYER_MANAGER_NOT_READY"
  | "LAYER_AUTHORIZED_ADD_MISSING_INFO"
  | "OGC_SERVICE_DISCOVERY_PARSE_FAILED"
  | "LAYER_WMTS_TILEMATRIXSET_MISSING";

/** Bir hata kodunun `getErrorCodes()` registry'sindeki tam kaydı. */
export interface TucbsErrorInfo {
  /** Semantik hata kodu. */
  code: TucbsErrorCode;
  /** Kısa dokümantasyon numarası (ör. `"E101"`), şartname "hata kodu" karşılığıdır. */
  number: string;
  /** Kullanıcıya gösterilebilecek kısa başlık. */
  title: string;
  /** Hatanın ne anlama geldiğini açıklayan uzun metin. */
  description: string;
}

export const ERROR_REGISTRY = {
  API_KEY_MISSING: {
    code: "API_KEY_MISSING",
    number: "E001",
    title: "API Anahtarı Eksik",
    description: "Ne instance ne configureTucbs() ile ayarlanmış global apiKey sağlanmış.",
  },
  API_KEY_INVALID: {
    code: "API_KEY_INVALID",
    number: "E002",
    title: "API Anahtarı Geçersiz",
    description: "Sağlanan apiKey backend tarafından reddedildi veya doğrulama isteği başarısız oldu.",
  },
  INTERNAL_INDEX_OUT_OF_RANGE: {
    code: "INTERNAL_INDEX_OUT_OF_RANGE",
    number: "E003",
    title: "İç Durum Hatası",
    description: "Beklenen bir dizi indeksi bulunamadı (iç tutarlılık hatası).",
  },
  OGC_CAPABILITIES_REQUEST_FAILED: {
    code: "OGC_CAPABILITIES_REQUEST_FAILED",
    number: "E201",
    title: "GetCapabilities İsteği Başarısız",
    description: "WFS GetCapabilities isteği HTTP hata koduyla döndü.",
  },
  OGC_CAPABILITIES_EXCEPTION: {
    code: "OGC_CAPABILITIES_EXCEPTION",
    number: "E202",
    title: "GetCapabilities OGC Exception",
    description: "WFS GetCapabilities yanıtı bir OGC ExceptionReport/ServiceExceptionReport döndürdü.",
  },
  OGC_CAPABILITIES_PARSE_FAILED: {
    code: "OGC_CAPABILITIES_PARSE_FAILED",
    number: "E203",
    title: "GetCapabilities Ayrıştırma Hatası",
    description: "WFS GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı.",
  },
  OGC_FEATURE_TYPE_NOT_FOUND: {
    code: "OGC_FEATURE_TYPE_NOT_FOUND",
    number: "E204",
    title: "FeatureType Bulunamadı",
    description: "WFS GetCapabilities yanıtında hiç FeatureType bulunamadı.",
  },
  CRS_UNRESOLVED_UNSUPPORTED: {
    code: "CRS_UNRESOLVED_UNSUPPORTED",
    number: "E401",
    title: "Koordinat Sistemi Tanınamadı",
    description: "GeoJSON'daki koordinat sistemi (CRS) çözülemedi ve koordinatlar WGS84 ile uyumlu değil.",
  },
  CRS_CLAIMED_WGS84_INVALID: {
    code: "CRS_CLAIMED_WGS84_INVALID",
    number: "E402",
    title: "Koordinatlar WGS84 İle Uyumsuz",
    description: "GeoJSON WGS84/CRS84 olduğunu belirtiyor ama koordinatlar geçerli bir enlem/boylam aralığında değil.",
  },
  CRS_MISSING_UNSUPPORTED: {
    code: "CRS_MISSING_UNSUPPORTED",
    number: "E403",
    title: "Koordinat Sistemi Bilgisi Yok",
    description: "GeoJSON'da CRS bilgisi yok ve koordinatlar geçerli bir enlem/boylam aralığında değil.",
  },
  ANALYSIS_API_KEY_MISSING: {
    code: "ANALYSIS_API_KEY_MISSING",
    number: "E301",
    title: "Analiz İçin API Anahtarı Eksik",
    description: "AnalysisManager'a apiKey tanımlanmadan analiz isteği yapıldı.",
  },
  ANALYSIS_NETWORK_ERROR: {
    code: "ANALYSIS_NETWORK_ERROR",
    number: "E302",
    title: "Analiz Ağ Hatası",
    description: "Analiz isteği ağ seviyesinde (fetch) başarısız oldu.",
  },
  ANALYSIS_REQUEST_FAILED: {
    code: "ANALYSIS_REQUEST_FAILED",
    number: "E303",
    title: "Analiz İsteği Başarısız",
    description: "Analiz backend'i HTTP hata koduyla döndü.",
  },
  ANALYSIS_UNSUCCESSFUL: {
    code: "ANALYSIS_UNSUCCESSFUL",
    number: "E304",
    title: "Analiz Başarısız",
    description: "Analiz backend'i HTTP 200 döndü ama isSuccess/success=false işaretledi.",
  },
  ANALYSIS_RESPONSE_MISSING_GEOJSON: {
    code: "ANALYSIS_RESPONSE_MISSING_GEOJSON",
    number: "E305",
    title: "Analiz Yanıtı Eksik",
    description: "Analiz backend'i başarılı yanıt döndü ama sonuç geojson içermiyor.",
  },
  LAYER_AUTHORIZED_LIST_API_KEY_MISSING: {
    code: "LAYER_AUTHORIZED_LIST_API_KEY_MISSING",
    number: "E101",
    title: "Yetkili Katman Listesi İçin API Anahtarı Gerekli",
    description: "getAuthorizedLayers() apiKey ayarlanmadan çağrıldı.",
  },
  LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE: {
    code: "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE",
    number: "E102",
    title: "GeoTIFF Export Desteklenmiyor",
    description: "GeoTIFF export sadece WMS/WCS katmanlarında desteklenir.",
  },
  LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED: {
    code: "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED",
    number: "E103",
    title: "GeoTIFF Export Yapılandırılmamış",
    description: "Katman GeoTIFF export için gerekli tiffFormat seçeneğine sahip değil.",
  },
  LAYER_STYLE_NOT_VECTOR: {
    code: "LAYER_STYLE_NOT_VECTOR",
    number: "E104",
    title: "Stil Sadece Vektör Katmanlarda",
    description: "applyLayerStyle() sadece vektör (Entity tabanlı) katmanlarda kullanılabilir.",
  },
  LAYER_TYPE_UNSUPPORTED_XYZ: {
    code: "LAYER_TYPE_UNSUPPORTED_XYZ",
    number: "E105",
    title: "XYZ Katmanı add() İle Desteklenmiyor",
    description: "XYZ katmanı add() ile eklenemez, Map.setBasemap() kullanılmalı.",
  },
  LAYER_TYPE_UNSUPPORTED_DRAWING: {
    code: "LAYER_TYPE_UNSUPPORTED_DRAWING",
    number: "E106",
    title: "DRAWING Katmanı add() İle Desteklenmiyor",
    description: "DRAWING katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez.",
  },
  LAYER_TYPE_UNSUPPORTED_MEASURE: {
    code: "LAYER_TYPE_UNSUPPORTED_MEASURE",
    number: "E107",
    title: "MEASURE Katmanı add() İle Desteklenmiyor",
    description: "MEASURE katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez.",
  },
  LAYER_WMS_LAYERS_EMPTY: {
    code: "LAYER_WMS_LAYERS_EMPTY",
    number: "E108",
    title: "WMS layers Parametresi Boş",
    description: "WMS katmanı eklenirken layers (ogcLayerName) parametresi boş.",
  },
  LAYER_GEOTIFF_UNSUPPORTED: {
    code: "LAYER_GEOTIFF_UNSUPPORTED",
    number: "E109",
    title: "GeoTIFF Katmanı Desteklenmiyor",
    description: "GeoTIFF katmanı mevcut Cesium sürümünde desteklenmiyor.",
  },
  LAYER_SHP_PACKAGE_MISSING: {
    code: "LAYER_SHP_PACKAGE_MISSING",
    number: "E110",
    title: "shpjs Paketi Eksik",
    description: "SHP katmanı için gereken \"shpjs\" paketi tüketici uygulamaya eklenmemiş.",
  },
  LAYER_CSV_PACKAGE_MISSING: {
    code: "LAYER_CSV_PACKAGE_MISSING",
    number: "E111",
    title: "papaparse Paketi Eksik",
    description: "CSV katmanı için gereken \"papaparse\" paketi tüketici uygulamaya eklenmemiş.",
  },
  LAYER_CSV_LATLON_NOT_FOUND: {
    code: "LAYER_CSV_LATLON_NOT_FOUND",
    number: "E112",
    title: "CSV'de lat/lon Sütunu Bulunamadı",
    description: "CSV içinde lat/lon sütunları otomatik tespit edilemedi.",
  },
  LAYER_NOT_FOUND: {
    code: "LAYER_NOT_FOUND",
    number: "E113",
    title: "Katman Bulunamadı",
    description: "Verilen id'ye sahip bir katman yönetimde kayıtlı değil.",
  },
  LAYER_ID_ALREADY_EXISTS: {
    code: "LAYER_ID_ALREADY_EXISTS",
    number: "E114",
    title: "Katman ID'si Zaten Kayıtlı",
    description: "Verilen id ile zaten bir katman eklenmiş.",
  },
  LAYER_TYPE_MISMATCH: {
    code: "LAYER_TYPE_MISMATCH",
    number: "E115",
    title: "Katman Tipi Uyuşmuyor",
    description: "Katman beklenen tipte (WMS/WMTS) değil.",
  },
  LAYER_SERVICE_OPTIONS_NOT_FOUND: {
    code: "LAYER_SERVICE_OPTIONS_NOT_FOUND",
    number: "E116",
    title: "Servis Seçenekleri Bulunamadı",
    description: "Katman için orijinal servis seçenekleri (serviceLayerOptions) bulunamadı.",
  },
  LAYER_NOT_RASTER: {
    code: "LAYER_NOT_RASTER",
    number: "E117",
    title: "Katman Raster Değil",
    description: "İşlem sadece raster (ImageryLayer) katmanlarda desteklenir.",
  },
  OGC_AUTHORIZED_LAYERS_REQUEST_FAILED: {
    code: "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED",
    number: "E205",
    title: "Yetkili Katman Listesi Alınamadı",
    description: "getAuthorizedLayers() isteği HTTP hata koduyla döndü.",
  },
  OGC_GEOTIFF_DOWNLOAD_FAILED: {
    code: "OGC_GEOTIFF_DOWNLOAD_FAILED",
    number: "E206",
    title: "GeoTIFF İndirilemedi",
    description: "GeoTIFF export isteği HTTP hata koduyla döndü.",
  },
  OGC_WFS_JSON_FORMAT_UNSUPPORTED: {
    code: "OGC_WFS_JSON_FORMAT_UNSUPPORTED",
    number: "E207",
    title: "WFS JSON Format İlan Etmiyor",
    description: "WFS sunucusu GetCapabilities yanıtında JSON çıktı formatı ilan etmiyor.",
  },
  OGC_WFS_GEOJSON_REQUEST_FAILED: {
    code: "OGC_WFS_GEOJSON_REQUEST_FAILED",
    number: "E208",
    title: "WFS GeoJSON İsteği Başarısız",
    description: "WFS GetFeature (GeoJSON çıktı) isteği başarısız oldu.",
  },
  OGC_WFS_REQUEST_FAILED: {
    code: "OGC_WFS_REQUEST_FAILED",
    number: "E209",
    title: "WFS İsteği Başarısız",
    description: "WFS GetFeature (GML çıktı) isteği HTTP hata koduyla döndü.",
  },
  OGC_WFS_EXCEPTION: {
    code: "OGC_WFS_EXCEPTION",
    number: "E210",
    title: "WFS OGC Exception",
    description: "WFS GetFeature yanıtı bir OGC ExceptionReport döndürdü.",
  },
  OGC_WFS_OL_PACKAGE_MISSING: {
    code: "OGC_WFS_OL_PACKAGE_MISSING",
    number: "E211",
    title: "ol Paketi Eksik",
    description: "WFS GML yanıtını okumak için gereken \"ol\" paketi tüketici uygulamaya eklenmemiş.",
  },
  OGC_WCS_REQUEST_FAILED: {
    code: "OGC_WCS_REQUEST_FAILED",
    number: "E212",
    title: "WCS İsteği Başarısız",
    description: "WCS GetCoverage isteği HTTP hata koduyla döndü.",
  },
  OGC_WCS_MULTIPART_IMAGE_NOT_FOUND: {
    code: "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND",
    number: "E213",
    title: "WCS Multipart Görsel Bulunamadı",
    description: "Multipart WCS yanıtında görsel (image) parçası bulunamadı.",
  },
  LAYER_PREVIEW_UNSUPPORTED_XYZ: {
    code: "LAYER_PREVIEW_UNSUPPORTED_XYZ",
    number: "E118",
    title: "XYZ Katmanı Önizlemede Desteklenmiyor",
    description: "TucbsMapPreview XYZ katman tipini önizlemede desteklemiyor.",
  },
  LAYER_PREVIEW_UNSUPPORTED_DRAWING: {
    code: "LAYER_PREVIEW_UNSUPPORTED_DRAWING",
    number: "E119",
    title: "DRAWING Katmanı Önizlemede Desteklenmiyor",
    description: "TucbsMapPreview DRAWING katman tipini önizlemede desteklemiyor.",
  },
  LAYER_PREVIEW_UNSUPPORTED_MEASURE: {
    code: "LAYER_PREVIEW_UNSUPPORTED_MEASURE",
    number: "E120",
    title: "MEASURE Katmanı Önizlemede Desteklenmiyor",
    description: "TucbsMapPreview MEASURE katman tipini önizlemede desteklemiyor.",
  },
  LAYER_MANAGER_NOT_READY: {
    code: "LAYER_MANAGER_NOT_READY",
    number: "E121",
    title: "Harita Hazır Değil",
    description: "Katman eklenmeye çalışıldığında LayerManager henüz hazır değildi.",
  },
  LAYER_AUTHORIZED_ADD_MISSING_INFO: {
    code: "LAYER_AUTHORIZED_ADD_MISSING_INFO",
    number: "E122",
    title: "Yetkili Katman Eklenemedi",
    description: "Yetkili katman için gerekli servis bilgisi (ör. WMTS TileMatrixSet) eksik.",
  },
  OGC_SERVICE_DISCOVERY_PARSE_FAILED: {
    code: "OGC_SERVICE_DISCOVERY_PARSE_FAILED",
    number: "E214",
    title: "Servis Keşfi Ayrıştırma Hatası",
    description: "TucbsServiceUpload'da GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı.",
  },
  LAYER_WMTS_TILEMATRIXSET_MISSING: {
    code: "LAYER_WMTS_TILEMATRIXSET_MISSING",
    number: "E123",
    title: "TileMatrixSet Bilgisi Bulunamadı",
    description: "Keşfedilen WMTS katmanı için TileMatrixSet bilgisi bulunamadı.",
  },
} satisfies Record<TucbsErrorCode, TucbsErrorInfo>;

/**
 * Dokümante edilmiş tüm hata kodlarını programatik olarak döndürür (şartname gereksinimi).
 *
 * @example
 * ```ts
 * import { getErrorCodes } from "@tucbs/core";
 *
 * const codes = getErrorCodes();
 * console.log(codes.LAYER_NOT_FOUND.number, codes.LAYER_NOT_FOUND.title);
 * ```
 */
export function getErrorCodes(): Record<TucbsErrorCode, TucbsErrorInfo> {
  return ERROR_REGISTRY;
}

/**
 * @tucbs/core'un tüm özel hatalarının taban sınıfı.
 *
 * @example
 * ```ts
 * try {
 *   map.layerManager.setVisible("olmayan-katman-id", true);
 * } catch (err) {
 *   if (err instanceof TucbsError) {
 *     console.error(err.code, err.number, err.message); // "LAYER_NOT_FOUND", "E113", ...
 *   }
 * }
 *
 * const codes = getErrorCodes();
 * console.log(codes.LAYER_NOT_FOUND);
 * // { code: "LAYER_NOT_FOUND", number: "E113", title: "Katman Bulunamadı", description: "..." }
 * ```
 */
export class TucbsError extends Error {
  /** Hatanın semantik kodu (bkz `getErrorCodes()`). */
  readonly code: TucbsErrorCode;
  /** Hatanın numarası (`E0xx`-`E4xx` aralıklı, append-only). */
  readonly number: string;
  /** Hatanın kullanıcıya gösterilecek kısa başlığı. */
  readonly title: string;

  constructor(code: TucbsErrorCode, message?: string, title?: string) {
    const info = ERROR_REGISTRY[code];
    super(message ?? info.description);
    this.name = "TucbsError";
    this.code = code;
    this.number = info.number;
    this.title = title ?? info.title;
  }
}

/** Katman ekleme/kaldırma/tip-kontrolü gibi ağ-dışı LayerManager hataları. */
export class LayerOperationError extends TucbsError {
  constructor(code: TucbsErrorCode, message?: string, title?: string) {
    super(code, message, title);
    this.name = "LayerOperationError";
  }
}

/** WMS/WMTS/WFS/WCS/GetCapabilities gibi gerçek OGC ağ istekleri başarısız olduğunda. */
export class OgcRequestError extends TucbsError {
  constructor(code: TucbsErrorCode, message?: string, title?: string) {
    super(code, message, title);
    this.name = "OgcRequestError";
  }
}

/** AnalysisManager'ın coğrafi analiz istekleri başarısız olduğunda. */
export class AnalysisRequestError extends TucbsError {
  constructor(code: TucbsErrorCode, message?: string, title?: string) {
    super(code, message, title);
    this.name = "AnalysisRequestError";
  }
}

/** CRS/koordinat doğrulama hataları. */
export class GeometryError extends TucbsError {
  constructor(code: TucbsErrorCode, message?: string, title?: string) {
    super(code, message, title);
    this.name = "GeometryError";
  }
}

/** `ApiKeyValidationError`'ın constructor'ına verilebilecek opsiyonel seçenekler. */
export interface ApiKeyValidationErrorOptions {
  /** Hatanın kullanıcıya gösterilecek başlığı. @default "API Hatası" */
  title?: string;
  /** Doğrulamanın başarısız olma nedeni (backend'den geliyorsa). */
  reason?: string;
  /** Backend'in döndürdüğü ham hata gövdesi/detayı (varsa). */
  detail?: string;
  /** Hata kodu. @default "API_KEY_INVALID" */
  code?: TucbsErrorCode;
}

/**
 * apiKey doğrulama başarısız olduğunda fırlatılır (validate 401 vb.).
 * `auth/validateApiKey.ts`'ten buraya taşındı -- public şekli
 * (constructor imzası, `title` varsayılan davranışı) AYNEN korunuyor,
 * davranışsal fark YOK. `code` varsayılanı "API_KEY_INVALID"; apiKey hiç
 * verilmemiş senaryosunda `ensureEffectiveApiKeyValid()` açıkça
 * "API_KEY_MISSING" geçirir.
 */
export class ApiKeyValidationError extends TucbsError {
  /** Doğrulamanın başarısız olma nedeni (backend'den geliyorsa). */
  readonly reason?: string;
  /** Backend'in döndürdüğü ham hata gövdesi/detayı (varsa). */
  readonly detail?: string;

  constructor(message: string, opts?: ApiKeyValidationErrorOptions) {
    // "API Hatası" varsayılanı BİREBİR eski davranış -- registry'deki
    // "title" alanı sadece getErrorCodes()/dokümantasyon içindir, bu
    // sınıfın runtime varsayılanını EZMEZ (opts?.title verilmemişse hep
    // "API Hatası" kalır, eskisi gibi).
    super(opts?.code ?? "API_KEY_INVALID", message, opts?.title ?? "API Hatası");
    this.name = "ApiKeyValidationError";
    if (opts?.reason !== undefined) this.reason = opts.reason;
    if (opts?.detail !== undefined) this.detail = opts.detail;
  }
}
