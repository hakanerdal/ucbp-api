import type { Entity, JulianDate } from "cesium";
import type { FeatureCollection } from "geojson";
import { entityToGeoJSON } from "../../analysis/entityToGeoJSON.js";
import { LayerOperationError, OgcRequestError } from "../../shared/TucbsError.js";
import { triggerDownload } from "../../shared/download.js";
import { featureCollectionToKml, featureCollectionToShapefileZip } from "./vectorExport.js";
import type { ManagedLayer, WCSLayerOptions, WMSLayerOptions, WMTSLayerOptions } from "../../types/index.js";

// LayerManager.resolveOgcProxyUrl/mergeApiKeyHeader/buildAuthHeaders ile AYNI
// sekiller -- Viewer'a degil, LayerManager'in apiKeyPolicy'sine bagli
// oldugu icin buraya sibling-module DI ile gecilir (bkz
// project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi, ayni
// desen layers/ogc/capabilities.ts'teki authContext'te de kullanildi).
type ResolveOgcProxyUrl = (
  serviceType: "wms" | "wmts" | "wfs" | "wcs",
  upstreamUrl: string,
) => string;

interface AuthContext {
  mergeApiKeyHeader(
    headers: Record<string, string> | undefined,
    url: string,
  ): Record<string, string> | undefined;
  buildAuthHeaders(authToken: string | undefined): Record<string, string> | undefined;
}

/** Bir katmanın (entity-tabanli herhangi bir katman -- TucbsLayerList
 * SADECE Cizim Katmani/DRAWING icin bu aksiyonu menuye ekler, bkz
 * TucbsLayerList._openMenuPortal) tum sekillerini GeoJSON FeatureCollection
 * olarak dondurur (TucbsLayerExport'un indirme aksiyonu icin).
 * Entity-tabanli olmayan (ImageryLayer) katmanlarda undefined doner.
 * addPolygonOutlineCompanion ile eklenen ic companion polyline'lar (bkz
 * outlineCompanionEntities) HARIC tutulur -- bunlar poligonun dis hattini
 * gostermek icin eklenmis gorsel bir workaround, sekli TEKRAR eden sahte
 * bir LineString feature olarak disa aktarilmamali. */
export function getLayerGeoJSON(
  managed: ManagedLayer,
  currentTime: JulianDate,
  isOutlineCompanion: (entity: Entity) => boolean,
): FeatureCollection | undefined {
  if (!("entities" in managed.cesiumObject)) return undefined;

  const features = managed.cesiumObject.entities.values
    .filter((entity) => !isOutlineCompanion(entity))
    .map((entity) => entityToGeoJSON(entity, currentTime))
    .filter((feature) => feature !== null);

  return { type: "FeatureCollection", features };
}

/** getLayerGeoJSON()'i bir ".geojson" dosyasi olarak indirir -- TucbsLayerExport
 * bu ince tetikleyici cagriyi yapar (bkz TucbsMapExport/exportJPEG ile AYNI
 * "yakalama/indirme mantigi @tucbs/core'da" kurali). Entity-tabanli olmayan
 * bir katman icin (getLayerGeoJSON undefined donerse) sessizce hicbir sey
 * yapmaz.
 *
 * @example
 * ```ts
 * map.layerManager.exportLayerGeoJSON("katman-id", "katmanim");
 * ```
 */
/** Aynı katman GeoJSON'undan GeoJSON, KML veya shapefile indirir. Çizim yalnız GeoJSON çağırır. */
export function exportLayerVector(
  geojson: FeatureCollection | undefined,
  filename: string,
  format: "geojson" | "kml" | "shp",
): void {
  if (!geojson) return;
  const file = vectorFile(geojson, format);
  triggerDownload(file.blob, `${filename}-${Date.now()}.${file.extension}`);
}

export function exportLayerGeoJSON(geojson: FeatureCollection | undefined, filename: string): void {
  exportLayerVector(geojson, filename, "geojson");
}

/** Analiz sonucu katmanın KML indirmesi. GeoJSON ile aynı geometri, farklı dosya. */
export function exportLayerKml(geojson: FeatureCollection | undefined, filename: string): void {
  exportLayerVector(geojson, filename, "kml");
}

/** Analiz sonucu katmanın Shapefile (ZIP) indirmesi. GeoJSON ile aynı geometri. */
export function exportLayerShapefile(geojson: FeatureCollection | undefined, filename: string): void {
  exportLayerVector(geojson, filename, "shp");
}

/** ZIP baytlarını Blob'un kabul ettiği ayrı bir ArrayBuffer'a kopyalar. */
function bytesAsBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function vectorFile(
  geojson: FeatureCollection,
  format: "geojson" | "kml" | "shp",
): { blob: Blob; extension: string } {
  if (format === "kml") {
    return {
      blob: new Blob([featureCollectionToKml(geojson)], { type: "application/vnd.google-earth.kml+xml" }),
      extension: "kml",
    };
  }
  if (format === "shp") {
    return {
      blob: new Blob([bytesAsBuffer(featureCollectionToShapefileZip(geojson))], { type: "application/zip" }),
      extension: "zip",
    };
  }
  return {
    blob: new Blob([JSON.stringify(geojson, null, 2)], { type: "application/geo+json" }),
    extension: "geojson",
  };
}

// Export icin makul bir raster boyutu ustunde tutar -- aksi halde kita/
// ulke olcegindeki bir katman native cozunurlukte tarayicinin
// indiremeyecegi (veya sunucunun REDDEDECEGI, bkz asagisi) kadar buyuk
// bir dosyaya yol acabilir.
export const GEOTIFF_EXPORT_MAX_WMS_DIMENSION = 2048;

export function geoTiffExportDimensions(
  bbox: WMSLayerOptions["geographicBoundingBox"],
  maxDimension: number,
): { width: number; height: number } {
  if (!bbox) return { width: maxDimension, height: Math.round(maxDimension / 2) };
  const lonSpan = Math.max(bbox.east - bbox.west, 1e-6);
  const latSpan = Math.max(bbox.north - bbox.south, 1e-6);
  const width =
    lonSpan >= latSpan
      ? maxDimension
      : Math.max(64, Math.round((maxDimension * lonSpan) / latSpan));
  const height =
    latSpan >= lonSpan
      ? maxDimension
      : Math.max(64, Math.round((maxDimension * latSpan) / lonSpan));
  return { width, height };
}

// WMS spec'i GetMap icin BBOX/WIDTH/HEIGHT'i ZORUNLU kilar (WCS'teki gibi
// "atlanirsa tam kapsama alani donsun" kolayligi yok) -- katmanin
// capabilities'ten kesfedilen geographicBoundingBox'i (yoksa dunya
// geneli) kullanilir. Versiyon KASITLI OLARAK her zaman 1.3.0'a
// sabitlenir (CRS=CRS:84, lon/lat sirasi bbox'la birebir eslesir) --
// GeoTIFF/tiff format destegi arayan sunucularin (bkz TucbsServiceUpload
// format kesfi) ezici cogunlugu zaten 1.3.0 destekler; bu, 1.1.x'teki
// SRS= parametre adi/eksen sirasi farkliligini elemekle basitlik
// kazandirir (bkz proje dokumantasyonu: docs/geotiff-export-arastirmasi.md §6).
export function buildWmsGeoTiffExportUrl(
  options: WMSLayerOptions,
  resolveOgcProxyUrl: ResolveOgcProxyUrl,
): string {
  const base = resolveOgcProxyUrl("wms", options.url);
  const { width, height } = geoTiffExportDimensions(
    options.geographicBoundingBox,
    GEOTIFF_EXPORT_MAX_WMS_DIMENSION,
  );
  const bbox = options.geographicBoundingBox;
  const params = new URLSearchParams({
    SERVICE: "WMS",
    REQUEST: "GetMap",
    VERSION: "1.3.0",
    LAYERS: options.layers,
    STYLES: "",
    FORMAT: options.tiffFormat as string,
    TRANSPARENT: "false",
    WIDTH: String(width),
    HEIGHT: String(height),
    CRS: "CRS:84",
    BBOX: bbox
      ? `${bbox.west},${bbox.south},${bbox.east},${bbox.north}`
      : "-180,-90,180,90",
  });
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${params.toString()}`;
}

// WCS'in aksine WMS'in BBOX zorunlulugu yok: GetCoverage'da SUBSET
// atlanirsa sunucu coverage'i TAM kapsama alaninda/native cozunurlukte
// doner (bkz addWCS'teki AYNI varsayim). SCALESIZE (yalniz 2.x'te
// desteklenir) sadece asiri buyuk indirmeleri sinirlamak icin eklenir --
// addWCS'teki GeoServer-URN/duz-x-y "once dene, olmazsa digerine dus"
// mantigi burada KASITLI OLARAK tekrarlanmiyor (export tek seferlik bir
// HTTP indirme, ImageryProvider kurulumu gibi senkron basari GEREKMIYOR);
// yaygin uyumlu duz "x(...)":"y(...)" formu yeterli kabul edilir.
//
// maxSize: addWCS() ile AYNI options.maxSize (varsayilan 2048) kullanilir
// -- AYRI/daha yuksek bir export sabiti (once 4096 denenmisti) bazi WCS
// sunucularinin kendi sunucu-tarafi MAXSIZE limitini asip 400 Bad
// Request'e yol acabiliyor (ornek: service.geo.llv.li, MAXSIZE=4000
// -- bkz kullanici bildirimi). addWCS()'in kullandigi deger zaten o
// katman icin GERCEKTEN calistigi KANITLANMIS (haritaya eklenirken
// basariyla yuklenmis) bir deger oldugundan export icin de guvenli kabul
// edilir; kullanici .maxSize'i acikca yukseltmisse (bkz WCSLayerOptions)
// o tercih burada da saygi gorur.
export function buildWcsGeoTiffExportUrl(
  options: WCSLayerOptions,
  resolveOgcProxyUrl: ResolveOgcProxyUrl,
): string {
  const base = resolveOgcProxyUrl("wcs", options.url);
  const version = options.version ?? "2.0.1";
  const params: Record<string, string> = {
    service: "WCS",
    version,
    request: "GetCoverage",
    coverageId: options.coverageId,
    format: options.tiffFormat as string,
  };
  if (version.startsWith("2.")) {
    const max = options.maxSize ?? 2048;
    if (Number.isFinite(max)) params["SCALESIZE"] = `x(${max}),y(${max})`;
  }
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${new URLSearchParams(params).toString()}`;
}

/** id'li katman WMS/WCS ise VE kesif sirasinda sunucunun GeoTIFF-uyumlu
 * bir formati (tiffFormat) desteklediği tespit edildiyse true doner --
 * TucbsLayerList "GeoTIFF Olarak Dışa Aktar" menu ogesini SADECE bu true
 * ise gosterir (bkz TucbsServiceUpload capabilities format kesfi). */
export function isGeoTiffExportAvailable(
  managed: ManagedLayer | undefined,
  options: WMSLayerOptions | WMTSLayerOptions | WCSLayerOptions | undefined,
): boolean {
  if (!managed || (managed.layerType !== "WMS" && managed.layerType !== "WCS")) {
    return false;
  }
  return !!options && "tiffFormat" in options && !!options.tiffFormat;
}

/** WMS GetMap / WCS GetCoverage'i sunucunun desteklediği GeoTIFF-uyumlu
 * formatla (bkz isGeoTiffExportAvailable) yeniden istekleyip ".tif" olarak
 * indirir. Cesium/canvas'a HIC dokunmaz -- WCS'in resolveWcsImageUrl'i ile
 * AYNI "ham HTTP indirme" deseninde (bkz o metod), tek fark burada format
 * PNG'ye SABITLENMIYOR, sunucunun kendi GeoTIFF ciktisi ISTENIYOR.
 * Desteklenmiyorsa (isGeoTiffExportAvailable false) hata firlatir --
 * cagiran taraf (TucbsLayerExport) bunu yakalar.
 *
 * @example
 * ```ts
 * await map.layerManager.exportLayerAsGeoTiff("katman-id", "katmanim");
 * ```
 */
export async function exportLayerAsGeoTiff(
  managed: ManagedLayer,
  options: WMSLayerOptions | WMTSLayerOptions | WCSLayerOptions | undefined,
  filename: string,
  resolveOgcProxyUrl: ResolveOgcProxyUrl,
  authContext: AuthContext,
): Promise<void> {
  if (managed.layerType !== "WMS" && managed.layerType !== "WCS") {
    throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", `Katman WMS/WCS değil, GeoTIFF export desteklenmiyor: "${managed.id}"`);
  }
  if (!options || !("tiffFormat" in options) || !options.tiffFormat) {
    throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", `Katman GeoTIFF export desteklemiyor: "${managed.id}"`);
  }

  const url =
    managed.layerType === "WMS"
      ? buildWmsGeoTiffExportUrl(options as WMSLayerOptions, resolveOgcProxyUrl)
      : buildWcsGeoTiffExportUrl(options as WCSLayerOptions, resolveOgcProxyUrl);

  const headers = authContext.mergeApiKeyHeader(authContext.buildAuthHeaders(options.authToken), url);
  const response = await fetch(url, headers ? { headers } : undefined);
  if (!response.ok) {
    throw new OgcRequestError("OGC_GEOTIFF_DOWNLOAD_FAILED", `GeoTIFF indirilemedi: ${response.status} ${response.statusText}`);
  }

  // ArcGIS ImageServer gibi bazi WCS sunuculari (bkz resolveWcsImageUrl'in
  // AYNI kontrolu) GetCoverage yanitini duz bir GeoTIFF olarak degil,
  // multipart/related MIME zarfi icinde (GML metadata parcasi + goruntu
  // parcasi bir arada) donuyor. Bu ACILMADAN indirilseydi ".tif" uzantili
  // ama GERCEKTE gecersiz (MIME sinir/basliklariyla sarilmis) bir dosya
  // inerdi -- WMS GetMap yanitlari multipart OLMADIGINDAN bu kontrol
  // onlar icin no-op'tur (asagidaki else dalina duser).
  const contentType = response.headers.get("content-type") ?? "";
  const buffer = await response.arrayBuffer();
  const boundaryMatch = /boundary="?([^";]+)"?/i.exec(contentType);
  let blob: Blob;
  if (contentType.includes("multipart/") && boundaryMatch) {
    const { bytes, mimeType } = extractMultipartImage(
      new Uint8Array(buffer),
      boundaryMatch[1]!,
    );
    const imageBuffer = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength,
    ) as ArrayBuffer;
    blob = new Blob([imageBuffer], { type: mimeType });
  } else {
    blob = new Blob([buffer], { type: contentType || (options.tiffFormat as string) });
  }

  triggerDownload(blob, `${filename}-${Date.now()}.tif`);
}

// Multipart govdesi icinde "Content-Type: image/..." basligina sahip ilk
// parcayi bulup ham baytlarini dondurur.
export function extractMultipartImage(
  bytes: Uint8Array,
  boundary: string
): { bytes: Uint8Array; mimeType: string } {
  // Sinir isaretleri ve baslıklar ASCII oldugu icin iso-8859-1 (byte<->char
  // birebir) ile metne cevirip aramalari burada yapiyoruz; bulunan indeksler
  // orijinal bayt dizisindeki konumlarla birebir eslesiyor.
  const text = new TextDecoder("iso-8859-1").decode(bytes);
  const boundaryMarker = `--${boundary}`;

  let searchFrom = 0;
  while (searchFrom < text.length) {
    const partStart = text.indexOf(boundaryMarker, searchFrom);
    if (partStart === -1) break;
    const contentStart = partStart + boundaryMarker.length;
    const nextBoundary = text.indexOf(boundaryMarker, contentStart);
    if (nextBoundary === -1) break;

    // Sunucuya gore satir sonu CRLF (\r\n\r\n) ya da sadece LF (\n\n)
    // olabiliyor (orn. ArcGIS ImageServer sadece LF kullaniyor); ikisini
    // de deneyip hangisi once geliyorsa onu kullaniyoruz.
    const sepCrlf = text.indexOf("\r\n\r\n", contentStart);
    const sepLf = text.indexOf("\n\n", contentStart);
    const headerEnd =
      sepCrlf !== -1 && (sepLf === -1 || sepCrlf <= sepLf) ? sepCrlf : sepLf;
    const sepLen = headerEnd === sepCrlf ? 4 : 2;
    if (headerEnd === -1 || headerEnd >= nextBoundary) {
      searchFrom = nextBoundary;
      continue;
    }
    const mimeMatch = /content-type:\s*([^\r\n;]+)/i.exec(
      text.slice(contentStart, headerEnd)
    );
    const mimeType = mimeMatch?.[1]?.trim();
    if (mimeType?.startsWith("image/")) {
      const bodyStart = headerEnd + sepLen;
      let bodyEnd = nextBoundary;
      if (text[bodyEnd - 2] === "\r" && text[bodyEnd - 1] === "\n") bodyEnd -= 2;
      else if (text[bodyEnd - 1] === "\n") bodyEnd -= 1;
      return { bytes: bytes.slice(bodyStart, bodyEnd), mimeType };
    }
    searchFrom = nextBoundary;
  }
  throw new OgcRequestError("OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "Multipart WCS yanıtında görsel parçası bulunamadı.");
}
