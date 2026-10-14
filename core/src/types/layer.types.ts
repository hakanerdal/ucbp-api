import type { ImageryLayer, DataSource, Rectangle } from "cesium";

/** Bir katmanın veri kaynağı/servis türü. */
export type LayerType =
  | "WMS"
  | "WMTS"
  | "WFS"
  | "WCS"
  | "GEOJSON"
  | "KML"
  | "KMZ"
  | "SHP"
  | "CSV"
  | "GEOTIFF"
  | "XYZ"
  | "DRAWING"
  | "MEASURE";

/** Haritaya eklenmiş, `LayerManager` tarafından yönetilen bir katmanın anlık durumu. */
export interface ManagedLayer {
  /** Katmanın benzersiz kimliği (`add()` çağrısında verilen `id`). */
  readonly id: string;
  /** Katmanın kullanıcıya gösterilen başlığı. */
  readonly title: string;
  /** Katmanın veri kaynağı/servis türü. */
  readonly layerType: LayerType;
  /** Katmanın altındaki Cesium nesnesi (raster katmanlarda `ImageryLayer`, vektör katmanlarda `DataSource`). */
  readonly cesiumObject: ImageryLayer | DataSource;
  /** Bu katmanın altlık harita (basemap) olarak mı eklendiği. */
  readonly isBasemap: boolean;
  /** Katman eklenirken atanan ilk (random) hex renk. Vektör katmanlar için
   * StyleEditor'ün "Sıfırla" işlevinin döneceği sabit referans noktasıdır;
   * sonraki style değişiklikleriyle güncellenmez. */
  readonly initialFillColor?: string;
}

/** `LayerManager.add("WMS", ...)` için WMS katman seçenekleri. */
export interface WMSLayerOptions {
  /** Katmanın benzersiz kimliği. */
  readonly id: string;
  /** Katmanın kullanıcıya gösterilen başlığı. */
  readonly title: string;
  /** WMS servisinin (GetCapabilities/GetMap) temel adresi. */
  readonly url: string;
  /** İstenecek WMS katman adı/adları (`LAYERS` parametresi). */
  readonly layers: string;
  /** WMS protokol sürümü. @default "1.3.0" */
  readonly version?: string;
  /** GetMap isteğine eklenecek ek query parametreleri. */
  readonly parameters?: Record<string, string>;
  /** Katmanın coğrafi kapsama alanı (verilmezse tüm dünya varsayılır). */
  readonly rectangle?: Rectangle;
  /** Servise erişim için kullanılacak yetkilendirme token'ı. */
  readonly authToken?: string;
  /** Bu katmanın gösterileceği en düşük zoom seviyesi. */
  readonly minimumLevel?: number;
  /** Bu katmanın gösterileceği en yüksek zoom seviyesi. */
  readonly maximumLevel?: number;
  /** GetMap isteklerinde istenecek tile genişliği (piksel). */
  readonly tileWidth?: number;
  /** GetMap isteklerinde istenecek tile yüksekliği (piksel). */
  readonly tileHeight?: number;
  /** Sunucunun `GetMap` icin desteklediği tespit edilen GeoTIFF-uyumlu format
   * ("image/geotiff" veya "image/tiff") -- TucbsServiceUpload capabilities
   * kesfinde doldurur. Yoksa bu katman icin GeoTIFF export sunulmaz (bkz
   * LayerManager.isGeoTiffExportAvailable/exportLayerAsGeoTiff). */
  readonly tiffFormat?: string;
  /** Katmanin WGS84 (EPSG:4326) cografi kapsama alani -- GeoTIFF export
   * icin BBOX/WIDTH-HEIGHT hesaplamasinda kullanilir (capabilities'teki
   * EX_GeographicBoundingBox/LatLonBoundingBox'tan turetilir). */
  readonly geographicBoundingBox?: {
    readonly west: number;
    readonly south: number;
    readonly east: number;
    readonly north: number;
  };
}

/** `LayerManager.add("WMTS", ...)` için WMTS katman seçenekleri. */
export interface WMTSLayerOptions {
  /** Katmanın benzersiz kimliği. */
  readonly id: string;
  /** Katmanın kullanıcıya gösterilen başlığı. */
  readonly title: string;
  /** WMTS servisinin temel adresi. */
  readonly url: string;
  /** İstenecek WMTS katman adı. */
  readonly layer: string;
  /** Sunucu tarafından tanımlı stil adı. */
  readonly style?: string;
  /** Kullanılacak TileMatrixSet adı. */
  readonly tileMatrixSetID: string;
  /** Tile görüntü formatı (MIME tipi, ör. `"image/png"`). */
  readonly format?: string;
  /** İstenecek tile genişliği (piksel). */
  readonly tileWidth?: number;
  /** İstenecek tile yüksekliği (piksel). */
  readonly tileHeight?: number;
  /** Bu katmanın gösterileceği en düşük zoom seviyesi. */
  readonly minimumLevel?: number;
  /** Bu katmanın gösterileceği en yüksek zoom seviyesi. */
  readonly maximumLevel?: number;
  /** Katmanın coğrafi kapsama alanı. */
  readonly rectangle?: Rectangle;
  /** Servise erişim için kullanılacak yetkilendirme token'ı. */
  readonly authToken?: string;
}

/** `LayerManager.add("WFS", ...)` için WFS katman seçenekleri. */
export interface WFSLayerOptions {
  /** Katmanın benzersiz kimliği. */
  readonly id: string;
  /** Katmanın kullanıcıya gösterilen başlığı. */
  readonly title: string;
  /** WFS servisinin temel adresi. */
  readonly url: string;
  /** İstenecek feature type adı (`typeName`/`typeNames` parametresi). */
  readonly typeName: string;
  /** WFS protokol sürümü. */
  readonly version?: "1.0.0" | "1.1.0" | "2.0.0";
  /** İstenecek çıktı formatı (verilmezse sunucunun GetCapabilities'te ilan ettiği bir GeoJSON formatı denenir, yoksa GML'e düşülür). */
  readonly outputFormat?: string;
  /** İstenecek koordinat referans sistemi. */
  readonly srsName?: string;
  /** Tek istekte alınacak azami feature sayısı. @default 5000 */
  readonly maxFeatures?: number;
  /** Servise erişim için kullanılacak yetkilendirme token'ı. */
  readonly authToken?: string;
  /** Geometrilerin yer yüzeyine (terrain) yapıştırılıp yapıştırılmayacağı. */
  readonly clampToGround?: boolean;
}

/** `LayerManager.add("WCS", ...)` için WCS katman seçenekleri. */
export interface WCSLayerOptions {
  /** Katmanın benzersiz kimliği. */
  readonly id: string;
  /** Katmanın kullanıcıya gösterilen başlığı. */
  readonly title: string;
  /** WCS servisinin temel adresi. */
  readonly url: string;
  /** İstenecek coverage kimliği. */
  readonly coverageId: string;
  /** WCS protokol sürümü. */
  readonly version?: string;
  /** İstenecek görüntü formatı. */
  readonly format?: string;
  /** Katmanın coğrafi kapsama alanı. */
  readonly rectangle?: Rectangle;
  /** Servise erişim için kullanılacak yetkilendirme token'ı. */
  readonly authToken?: string;
  /** Coverage'ı tek bir tile olarak (mozaiklemeden) iste. */
  readonly useSingleTile?: boolean;
  /** Sunucunun `GetCoverage` icin desteklediği tespit edilen GeoTIFF-uyumlu
   * format ("image/geotiff" veya "image/tiff") -- TucbsServiceUpload
   * capabilities kesfinde doldurur. Yoksa bu katman icin GeoTIFF export
   * sunulmaz (bkz LayerManager.isGeoTiffExportAvailable/exportLayerAsGeoTiff). */
  readonly tiffFormat?: string;
  /**
   * Sunucudan WCS 2.0 Scaling Extension (SCALESIZE) ile en fazla bu piksel
   * boyutuna kucultulmus bir goruntu istenir. Full-disc uydu goruntuleri
   * veya ulke/kita olcegindeki coverage'lar native cozunurlukte
   * tarayicinin decode edebileceginden (ve pratikte indirebileceginden)
   * cok daha buyuk olabiliyor. Native cozunurlugu zorlamak icin
   * `Infinity` verin (SCALESIZE gonderilmez).
   * @default 2048
   */
  readonly maxSize?: number;
}

/**
 * `LayerManager.add("GEOTIFF", ...)` için GeoTIFF katman seçenekleri.
 * Not: mevcut Cesium sürümünde (≥1.143) henüz desteklenmiyor (bkz
 * `LayerManager.addGeoTiff`).
 */
export interface GeoTiffLayerOptions {
  /** Katmanın benzersiz kimliği. */
  readonly id: string;
  /** Katmanın kullanıcıya gösterilen başlığı. */
  readonly title: string;
  /** GeoTIFF dosyasının adresi. */
  readonly url: string;
  /** Feature pick (tıklama sorgulama) desteğinin açık olup olmadığı. */
  readonly enablePickFeatures?: boolean;
  /** Cesium credit/attribution metni. */
  readonly credit?: string;
  /** Katmanın coğrafi kapsama alanı. */
  readonly rectangle?: Rectangle;
}

/** `LayerManager.add()` ile yerel dosyadan (GeoJSON/KML/KMZ/SHP/CSV) katman eklemek için seçenekler. */
export interface LocalLayerOptions {
  /** Katmanın benzersiz kimliği. */
  readonly id: string;
  /** Katmanın kullanıcıya gösterilen başlığı. */
  readonly title: string;
  /** Dosya içeriği (ayrıştırılmış nesne, ham metin, `ArrayBuffer` veya bir `File`). */
  readonly data: object | string | ArrayBuffer | File;
  /** Dosyanın formatı. */
  readonly layerType: "GEOJSON" | "KML" | "KMZ" | "SHP" | "CSV";
  /** Geometrilerin yer yüzeyine (terrain) yapıştırılıp yapıştırılmayacağı. */
  readonly clampToGround?: boolean;
}

// ── Katman stili (TucbsStyleEditor / LayerManager.applyLayerStyle) ─────────
// Sadece Entity-tabanli katmanlar (WFS + LOCAL) icin gecerli — WMS/WMTS
// raster katmanlar sunucu-tanimli "STYLES" secimiyle (bkz. getWmsAvailableStyles/
// setWmsStyle, getWmtsAvailableStyles/setWmtsStyle) ayri bir yoldan yonetilir.

/** Tek renkli (solid) katman dolgu stili. */
export interface SolidFillStyle {
  /** Stil modu ayırt edicisi. */
  readonly mode: "solid";
  /** Dolgu rengi (hex, ör. `"#3388ff"`). */
  readonly color: string;
  /** Dolgu opaklığı (0-1 arası). */
  readonly opacity: number;
}

/**
 * sequential/diverging: renkler bir rampa gibi ele alinir, degerler arasi
 * dogrusal karisim (lerp) uygulanir. qualitative: renkler AYRIK kategorik
 * setlerdir (orn. Set2/Tableau10) -- karistirilirsa palette'te olmayan
 * bulanik ara tonlar cikar, bu yuzden indeks bazli (karistirmasiz) secilir.
 * Verilmezse "sequential" gibi davranilir (mevcut lerp davranisi).
 */
export type PaletteKind = "sequential" | "diverging" | "qualitative";

/** Sürekli bir renk rampası (gradient) ile veri-odaklı katman dolgu stili. */
export interface GradientFillStyle {
  /** Stil modu ayırt edicisi. */
  readonly mode: "gradient";
  /** Renklendirmede kullanılacak öznitelik sütunu adı. */
  readonly column: string;
  /** Renk rampası (hex renk dizisi). */
  readonly palette: readonly string[];
  /** Renk rampasının yorumlanma biçimi. */
  readonly paletteKind?: PaletteKind;
  /** Verilmezse getColumnRange() ile veriden otomatik hesaplanir. */
  readonly min?: number;
  /** Aralığın üst sınırı. Verilmezse getColumnRange() ile veriden otomatik hesaplanır. */
  readonly max?: number;
  /** Dolgu opaklığı (0-1 arası). */
  readonly opacity: number;
}

/** Değerleri ayrık kutulara (bin) bölerek renklendiren katman dolgu stili. */
export interface BinFillStyle {
  /** Stil modu ayırt edicisi. */
  readonly mode: "bin";
  /** Renklendirmede kullanılacak öznitelik sütunu adı. */
  readonly column: string;
  /** Renk paleti (her kutu için bir renk). */
  readonly palette: readonly string[];
  /** Renk paletinin yorumlanma biçimi. */
  readonly paletteKind?: PaletteKind;
  /** Kutu (bin) sayısı. */
  readonly binCount: number;
  /** Verilmezse getColumnRange() ile veriden otomatik hesaplanir. */
  readonly min?: number;
  /** Aralığın üst sınırı. Verilmezse getColumnRange() ile veriden otomatik hesaplanır. */
  readonly max?: number;
  /** Dolgu opaklığı (0-1 arası). */
  readonly opacity: number;
}

/** Kategorik (ayrık) değerleri elle eşlenmiş renklerle gösteren katman dolgu stili. */
export interface EnumFillStyle {
  /** Stil modu ayırt edicisi. */
  readonly mode: "enum";
  /** Renklendirmede kullanılacak öznitelik sütunu adı. */
  readonly column: string;
  /**
   * Deger -> renk eslemesi. UI (TucbsStyleEditor), getUniqueColumnValues()
   * ile kesfettigi TUM degerleri palet sirasina gore otomatik doldurup
   * kullanicinin degistirdigi degerleri ustune yazarak bu haritayi tam
   * olusturur; applyLayerStyle burada sadece duz bir lookup yapar (siralama/
   * palet-dongusu mantigi burada degil, UI tarafinda).
   */
  readonly colors: Record<string, string>;
  /** Dolgu opaklığı (0-1 arası). */
  readonly opacity: number;
}

/** Dolgu kapalı — katman sadece dış hatla (outline) gösterilir. */
export interface OffFillStyle {
  /** Stil modu ayırt edicisi. */
  readonly mode: "off";
}

/** Bir katmanın dolgu stili — moda göre ayırt edilen 5 alternatiften biri. */
export type FillStyle =
  | SolidFillStyle
  | GradientFillStyle
  | BinFillStyle
  | EnumFillStyle
  | OffFillStyle;

/** Bir katmanın dış hat (kenar çizgisi) stili. */
export interface OutlineStyle {
  /** Dış hattın gösterilip gösterilmeyeceği. */
  readonly enabled: boolean;
  /** Dış hat rengi (hex). */
  readonly color: string;
  /** Dış hat kalınlığı (piksel). */
  readonly width: number;
}

/** `LayerManager.applyLayerStyle()`'a verilen tam katman stili (dolgu + dış hat). */
export interface LayerStyleSpec {
  /** Dolgu stili. */
  readonly fill: FillStyle;
  /** Dış hat stili. */
  readonly outline: OutlineStyle;
}

/** Sunucu tarafından tanımlı bir WMS/WMTS stil seçeneği (GetStyles/GetCapabilities'ten türetilir). */
export interface ServiceStyleOption {
  /** Stilin sunucu tarafındaki adı (`SLD_BODY`/`STYLES` parametresine karşılık gelir). */
  readonly name: string;
  /** Stilin kullanıcıya gösterilen başlığı. */
  readonly title: string;
  /** Bu stile ait lejant görüntüsünün adresi. */
  readonly legendUrl: string;
}

/**
 * `LayerManager.getAuthorizedLayers()` ile dönen, apiKey sahibinin erişim
 * izni olan tek bir WMS/WFS/WMTS servis/katman kaydı.
 */

// ── apiKey ile yetkili katman kesfi (bkz. LayerManager.getAuthorizedLayers) ─
// Backend'deki "yonetim-paneli" Api Key Talep sisteminin
// UcbpApiTalepServisResponseDto'suyla alan bazinda birebir eslesir; bir
// apiKey talebine (onaylanmis "ucbp_api_talep" kaydina) bagli, kullaniciya
// erisim izni verilmis tek bir WMS/WFS/WMTS servis/katman kaydini temsil eder.
export interface AuthorizedLayerInfo {
  /** Sepet satırı id (opsiyonel; backend döner). */
  readonly id?: string;

  /** Servis türü. */

  // Backend'den serbest string olarak gelebilir (case garantisi yok); bu
  // yuzden LayerManager.normalizeAuthorizedLayer() her zaman buyuk harfe
  // cevirip bu union'a uygun hale getirir -- tuketiciler bu alani dogrudan
  // union olarak guvenle karsilastirabilir.
  readonly servisTuru: "WMS" | "WFS" | "WMTS";

  /** Haritanın GetMap/GetFeature isteği için kullanacağı ucbp-api servis adresi. */

  // Opaque ucbp-api adresi (/ogc/...) — harita/SDK GetMap bu URL ile gider.
  readonly servisUrl: string;

  /** QGIS gibi masaüstü istemciler için token'lı servis adresi (opsiyonel). */

  // Geoservice tokenlı base (QGIS / kopyala); haritaya eklemede kullanılmaz. CVT IP/sahiplik.
  readonly tokenUrl?: string;

  /** OGC katman adı (WMS `"LAYERS"` / WFS `"typeName"` parametresi). */
  readonly ogcLayerName: string;

  /** Sadece WMTS servisleri için TileMatrixSet adı (opsiyonel). */
  readonly wmtsTileMatrixSet?: string;

  /** Katmanın insan-okunur (UI'da gösterilecek) adı. */
  readonly katmanAdi: string;

  /** Bu erişimin dayandığı Coğrafi Veri Talep projesinin adı (opsiyonel). */
  readonly projeAdi?: string;

  /** Katmanı paylaşan kurumun adı (opsiyonel). */
  readonly ustKurumAdi?: string;
}
