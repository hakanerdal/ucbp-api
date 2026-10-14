import type { Viewer } from "cesium";

/** Desteklenen bir altlık harita (basemap) kimliği, veya özel bir tile URL şablonu. */
export type BasemapId =
  | "hgm-temel"
  | "hgm-ortofoto"
  | "hgm-siyasi"
  | "hgm-yukseklik"
  | (string & Record<never, never>);

/** `BasemapId` union'ının, apiKey gerektiren HGM/Turksat proxy altlık haritalarının çalışma-zamanı karşılığı. */

// resolveBasemapUrl() (Map.ts) ve tuketicilerin (or. TucbsMapPreview) "bu
// basemap apiKey gerektirir mi" sorusunu TEK bir yerden cevaplamasi icin.
export const HGM_BASEMAP_IDS = [
  "hgm-temel",
  "hgm-ortofoto",
  "hgm-siyasi",
  "hgm-yukseklik",
] as const;

/** Bir altlık haritayı kimliğiyle seçmek için kullanılan seçenek nesnesi. */
export interface BasemapOptions {
  /** Altlık harita kimliği. */
  readonly id: BasemapId;
}

// Map.basemapStatus'un SORGULANABILIR (event kacirilsa bile) anlik durumu --
// "loading": setBasemap() cagrildi, henuz ne basari (recovered) ne kesin
// basarisizlik (unavailable) belli; "ready": tile'lar basariyla yuklendi;
// "unavailable": HGM/Turksat proxy'sine gercekten erisilemiyor (Map.ts'teki
// BASEMAP_ERROR_RETRY_LIMIT/BASEMAP_UNAVAILABLE_DELAY_MS ile kesinlesti).
// TucbsBasemapPicker gibi tuketiciler bu GETTER'i (SADECE event dinlemek
// yerine) BAGLANMA ANINDA da okuyabilir -- bkz kullanici bildirimi: "World
// Imagery geliyor, Altlık Haritaları açıyorum ve disabled DEĞİL, loading da
// yok" (picker, olay ZATEN gecmisse/ilk yuklemede kacirilmissa event'e
// guvenerek bu durumu hic yakalayamiyordu).
export type BasemapStatus = "loading" | "ready" | "unavailable";

/** Kameranın konumu ve bakış açısı. */
export interface CameraOptions {
  /** Boylam (derece). */
  readonly longitude: number;
  /** Enlem (derece). */
  readonly latitude: number;
  /** Yerden yükseklik (metre). */
  readonly height: number;
  /** Yön açısı, kuzeyden saat yönünde (derece). @default 0 */
  readonly heading?: number;
  /** Yukarı/aşağı bakış açısı; -90 tam tepeden bakış. (derece). @default -90 */
  readonly pitch?: number;
  /** Yatay eksen etrafında dönüş (derece). @default 0 */
  readonly roll?: number;
}

/** Derece cinsinden bir dikdörtgen coğrafi bölge. */

// Derece cinsinden bir dikdortgen bolge (Cesium Rectangle.fromDegrees sirasiyla:
// west, south, east, north). camera'dan farkli olarak nokta degil, ekrana sigacak
// bir bolgeyi ifade eder (ör. Turkiye sinirlari).
export interface MapExtent {
  /** Batı sınırı (derece boylam). */
  readonly west: number;
  /** Güney sınırı (derece enlem). */
  readonly south: number;
  /** Doğu sınırı (derece boylam). */
  readonly east: number;
  /** Kuzey sınırı (derece enlem). */
  readonly north: number;
}

/**
 * `new Map(...)` constructor'ına verilen harita başlatma seçenekleri.
 *
 * @example
 * ```ts
 * const options: MapOptions = {
 *   basemap: "hgm-temel",
 *   apiKey: "YOUR_API_KEY",
 *   camera: { longitude: 32.85, latitude: 39.93, height: 500000 },
 *   timeline: false,
 *   animation: false,
 * };
 * ```
 */
export interface MapOptions {
  /** Başlangıç altlık haritası (kimlik veya `BasemapOptions`); verilmezse basemap yüklenmez. */
  readonly basemap?: BasemapOptions | BasemapId | null;
  /** Bu harita instance'ına özel apiKey; verilmezse `configureTucbs()` ile ayarlanmış global apiKey kullanılır. */
  readonly apiKey?: string;

  /** apiKey'in otomatik olarak ekleneceği host'ların allowlist'i. */

  // apiKey'in otomatik eklenecegi host allowlist'i. Sadece bu listedeki
  // host'lara giden WMS/WMTS/WFS/WCS isteklerine apiKey eklenir; listede
  // olmayan (ör. kullanicinin ServiceUpload ile ekledigi keyfi 3.taraf WMS)
  // host'lara apiKey hic gonderilmez -- sizinti riskini sinirlar.
  readonly trustedApiKeyHosts?: readonly string[];
  /** Yetkili katman keşfi (`getAuthorizedLayers()`) için özel adres. @default "{DEFAULT_UCBP_API_BASE}/layers" */
  readonly apiKeyDiscoveryUrl?: string;
  /** Başlangıç kamera konumu. */
  readonly camera?: CameraOptions;

  /** Harita ilk yüklendiğinde ortalanacak bölge. */

  // Harita ilk yuklendiginde ortalanacak bolge. `camera` verilmisse `camera` oncelikli olur.
  readonly initialExtent?: MapExtent;
  /** Cesium zaman çizelgesi widget'ının gösterilip gösterilmeyeceği. */
  readonly timeline?: boolean;
  /** Cesium animasyon widget'ının gösterilip gösterilmeyeceği. */
  readonly animation?: boolean;
  /** Cesium altlık harita seçici widget'ının gösterilip gösterilmeyeceği. */
  readonly baseLayerPicker?: boolean;
  /** Cesium adres/konum arama (geocoder) widget'ının gösterilip gösterilmeyeceği. */
  readonly geocoder?: boolean;
  /** Cesium "ana konuma dön" düğmesinin gösterilip gösterilmeyeceği. */
  readonly homeButton?: boolean;
  /** Cesium 2D/3D/Columbus View sahne modu seçicisinin gösterilip gösterilmeyeceği. */
  readonly sceneModePicker?: boolean;
  /** Cesium gezinme yardımı düğmesinin gösterilip gösterilmeyeceği. */
  readonly navigationHelpButton?: boolean;
  /** Cesium bilgi kutusunun (feature tıklamasında açılan panel) gösterilip gösterilmeyeceği. */
  readonly infoBox?: boolean;
  /** Cesium seçim göstergesinin (seçili feature çerçevesi) gösterilip gösterilmeyeceği. */
  readonly selectionIndicator?: boolean;
  /** Cesium gölgelerin (shadows) açık olup olmadığı. */
  readonly shadows?: boolean;
  /** Cesium saat/animasyonun otomatik oynatılıp oynatılmayacağı. */
  readonly shouldAnimate?: boolean;
  /** Cesium tam ekran düğmesinin gösterilip gösterilmeyeceği. */
  readonly fullscreenButton?: boolean;
  /** Cesium `Viewer` constructor'ına doğrudan geçilecek ek seçenekler (ileri düzey özelleştirme). */
  readonly cesiumOptions?: Viewer.ConstructorOptions;
}
