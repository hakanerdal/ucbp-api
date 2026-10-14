import { Cartesian3, GeoJsonDataSource } from "cesium";
import { GeometryError } from "../../shared/TucbsError.js";
import { extractEpsgCode, registerProj4Def } from "../ogc/proj4Defs.js";

// Cesium'un GeoJsonDataSource'u SADECE WGS84/CRS84'u tanir (bkz Cesium
// kaynagindaki crsNames tablosu); GeoJSON'un "crs" alaninda baska bir EPSG
// kodu (orn. "urn:ogc:def:crs:EPSG::23035") gelirse GeoJsonDataSource.load()
// dogrudan "Unknown crs name: ..." RuntimeError'i firlatir -- kullanicinin
// bildirdigi hata budur. Cesium bu tabloyu disaridan genisletmeye izin
// veriyor (bkz GeoJsonDataSource.crsNames JSDoc'u); burada geojson.load'dan
// ONCE ilgili "crs" adini proj4 tabanli bir donusum fonksiyonu olarak bu
// tabloya KAYDEDIYORUZ ki Cesium kendi akisinda otomatik kullansin ve veri
// haritada DOGRU konumda gorunsun.
// proj4'un TS tanimlari "export =" bicimindedir (bkz proj4/dist/index.d.ts),
// bu yuzden dinamik import()'un namespace TURU dogrudan Proj4'un kendisidir
// -- ["default"] YOKTUR (bkz asagidaki runtime "as unknown as {default:...}"
// donusumunun WHY yorumu).
type Proj4 = typeof import("proj4");

interface GeoJsonCrs {
  type?: string;
  properties?: { name?: string; code?: string | number };
}

// extractEpsgCode/registerProj4Def (epsg.io'dan tanim cekme + cache)
// ogc/proj4Defs.ts'tedir -- WCS yoluyla AYNI cache'i paylasir.

// Cesium'un GeoJsonDataSource'unun KENDI crsNames tablosundaki 3 sabit
// varsayilan yazim (bkz Cesium kaynagi) -- bunlarin HICBIRI icin ek islem
// (epsgCode cikarma/kayit) gerekmez, zaten native destekleniyorlar.
const CESIUM_BUILTIN_CRS_NAMES = new Set([
  "urn:ogc:def:crs:OGC:1.3:CRS84",
  "EPSG:4326",
  "urn:ogc:def:crs:EPSG::4326",
]);

// Cesium'un KENDI varsayilan (crsNames tablosunun disina hic cikmayan)
// donusumuyle BIREBIR ayni -- Cesium bunu export etmedigi icin (private
// modul-seviyesi fonksiyon) burada kopyalandi. "Cozemedigimiz" ama
// koordinatlari GECERLI enlem/boylam araliginda gorunen bir CRS icin (bkz
// asagidaki "unresolved" dali) SON CARE olarak bunu kullaniyoruz: katman
// ENGELLENMEDEN ham koordinat degerleriyle (derece SANILARAK) yuklenir --
// kullanici bildirimi: "engellemeyelim gösterelim fakat yine bir
// bilgilendirme yapalım".
function defaultCrsFunction(coordinates: readonly number[]): Cartesian3 {
  return Cartesian3.fromDegrees(coordinates[0]!, coordinates[1]!, coordinates[2]);
}

// Eski/deprecated GeoJSON "EPSG" tipindeki crs.properties.code alani
// (string | number) SAYISAL degilse (orn. bos, "Tanımsız" gibi bir metin)
// bunu bir EPSG kodu SANMAYALIM -- extractEpsgCode'un URN/URL bicimlerini
// ayikladigi gibi burada da SADECE rakamlardan olusan degerler kabul edilir.
function numericCodeString(code: string | number | undefined): string | undefined {
  if (code === undefined) return undefined;
  const trimmed = String(code).trim();
  return /^\d+$/.test(trimmed) ? trimmed : undefined;
}

// Gercek bir donusum uygulandiginda ("reprojected") ya da "crs" alani var
// ama gecerli/cozulebilir bir EPSG koduna karsilik gelmediginde HALA
// GECERLI/makul bir enlem-boylam araliginda kaldigi icin ham (WGS84 kabul
// eden) donusumle YINE DE gosterildiginde ("suspicious-unresolved-crs")
// cagiran tarafa (LayerManager) donulur -- tuketici UI'lari (orn.
// TucbsFileUpload) bunu kullaniciya bir bildirime cevirir (bkz kullanici
// bildirimi: "doğru dönüşüm yapılsa dahi bilgilendirme yapmamız lazım" /
// "crs alanı var ama epsg gerçek değilse yine göster haritada"). Koordinatlar
// GECERSIZ bir aralikta ise (bkz looksLikeWgs84) -- "crs" hic olmasa da,
// "crs" cozulemese de -- artik BLOKLANIR (throw), bkz asagidaki WHY yorumu.
/** `ensureGeoJsonCrsSupport()`'un bir GeoJSON'un `crs` alanını inceleme sonucu. */
export type CrsCheckResult =
  /** Gerçek/tanınan bir EPSG koduna proj4 ile başarıyla dönüşüm kaydedildi. */
  | { readonly kind: "reprojected"; readonly fromEpsg: string }
  /** `crs` alanı var ama çözülemedi; koordinatlar geçerli bir enlem/boylam aralığında olduğu için yine de ham (WGS84 kabul eden) dönüşümle gösteriliyor. */
  | { readonly kind: "suspicious-unresolved-crs"; readonly crsName: string };

// LayerManager, supheli (cozulemeyen) bir CRS icin clampToGround'u
// (GroundPolylineGeometry/classification primitive'i -- bkz
// applyLayerStyle'daki "pahali tessellation" WHY yorumu) kapatir: koordinatlar
// gercekte ne anlama geldigi bilinmeyen ham degerlerdir, kucuk bir gercek
// parselin (birkaç metre) kenarlari derece SANILDIGINDA cok daha uzun
// gorunebilir; ground-classification bu durumda kamera her
// yakinlastirildiginda/hareket ettirildiginde tüm kesisen terrain/imagery
// karolarini yeniden siniflandirmaya calisip donmasina/cokmesine yol acar
// (bkz kullanici bildirimi: "yakınlaş dediğimde hiçbir tepki yok ve bir
// süre sonra uygulama crash oluyor").
/**
 * Bir `CrsCheckResult`'ın "şüpheli/çözülemeyen" bir CRS'e mi işaret ettiğini kontrol eder.
 * @param result - `ensureGeoJsonCrsSupport()`'un döndürdüğü sonuç.
 * @returns `result` `null` değilse ve `"reprojected"` DIŞINDA bir `kind`'a sahipse `true`.
 */
export function isSuspiciousCrsResult(result: CrsCheckResult | null): boolean {
  return result !== null && result.kind !== "reprojected";
}

// coords[0]'a INDIKCE (Point=[lon,lat,...], LineString/MultiPoint=[[lon,lat],...],
// Polygon/MultiLineString=[[[lon,lat],...]], MultiPolygon bir seviye daha) EN SONUNDA
// duz bir [lon,lat] cifti bulur -- TUM koordinatlari degil, TEK bir temsili
// nokta yeterli (heuristik icin, bkz findFirstCoordinates).
function firstCoordinatePair(value: unknown): readonly [number, number] | undefined {
  let current: unknown = value;
  while (Array.isArray(current) && current.length > 0 && Array.isArray(current[0])) {
    current = current[0];
  }
  if (
    Array.isArray(current) &&
    current.length >= 2 &&
    typeof current[0] === "number" &&
    typeof current[1] === "number"
  ) {
    return [current[0], current[1]];
  }
  return undefined;
}

// FeatureCollection/Feature/GeometryCollection/duz Geometry -- herhangi bir
// GeoJSON kok nesnesinden ILK gecerli [lon,lat] ciftini bulana kadar iner
// (bkz kullanim: ensureGeoJsonCrsSupport'taki looksLikeWgs84 hesaplamasi).
function findFirstCoordinates(geojson: unknown): readonly [number, number] | undefined {
  if (typeof geojson !== "object" || geojson === null) return undefined;
  const obj = geojson as Record<string, unknown>;

  if (obj.type === "FeatureCollection" && Array.isArray(obj.features)) {
    for (const feature of obj.features as readonly unknown[]) {
      const coords = findFirstCoordinates(feature);
      if (coords) return coords;
    }
    return undefined;
  }
  if (obj.type === "Feature") return findFirstCoordinates(obj.geometry);
  if (obj.type === "GeometryCollection" && Array.isArray(obj.geometries)) {
    for (const geometry of obj.geometries as readonly unknown[]) {
      const coords = findFirstCoordinates(geometry);
      if (coords) return coords;
    }
    return undefined;
  }
  if ("coordinates" in obj) return firstCoordinatePair(obj.coordinates);
  return undefined;
}

// "crs" alani "name"/deprecated-"EPSG" tipinde olsa da EPSG kodu hic
// cikarilamadiginda, epsg.io'da gercek bir tanimi bulunamadiginda ya da
// proj4 paketi hic yuklu olmadiginda cagirilir -- SON CARE olarak
// varsayilan/ham (derece kabul eden) donusumu dener, AMA SADECE ilk
// koordinat GECERLI bir enlem/boylam araliginda gorunuyorsa (bkz
// looksLikeWgs84). Aksi halde Cesium'un 3D kure matematigi (sin/cos) bu
// degerleri anlamsiz bir "sarilma" ile rastgele noktalara dagitir --
// QGIS gibi DUZ 2D bir tuval bu degerleri oldugu gibi cizip TANINABILIR bir
// sekil gosterebilirken (bkz kullanici bildirimi: "QGIS'de tam istediğim
// gibi gösteriyor"), Cesium'da ayni veri COKUSMUS/CAPRAZ cizgi yiginina
// donusur -- bu durumda "gösterelim" katmanin TAMAMEN reddedilmesinden
// (acik bir hata mesajiyla) DAHA KOTU bir kullanici deneyimi olur, bu
// yuzden burada BLOKLANIR (throw).
function resolveOrRejectUnresolvedCrs(
  key: string,
  crsName: string,
  looksLikeWgs84: boolean
): CrsCheckResult {
  if (!looksLikeWgs84) {
    throw new GeometryError("CRS_UNRESOLVED_UNSUPPORTED", "Koordinat sistemi tanınamadı ve WGS84 ile uyumlu değil.");
  }
  GeoJsonDataSource.crsNames[key] = defaultCrsFunction;
  return { kind: "suspicious-unresolved-crs", crsName };
}

// "crs" WGS84/CRS84 OLDUGUNU IDDIA ediyor (Cesium'un kendi 3 sabit yazimindan
// biri, ya da standart-disi bir yazimla epsgCode'u "4326"ya cikan bir isim)
// -- ama bu IDDIAYA korusuzce guvenilmez (bkz kullanici bildirimi:
// "TK_PARSEL" -- crs=CRS84 etiketli ama degerler 473446/4413800 gibi UTM
// metre). looksLikeWgs84 GECERSIZSE bloklanir; gecerliyse (shouldRegister
// true oldugunda, yani Cesium'un kendi 3 sabit yazimindan biri OLMAYAN bir
// durumda) crsNames'e kaydedilir -- Cesium'un 3 sabit yazimi zaten native
// destekliyor, tekrar kaydetmeye gerek yok.
function acceptClaimedWgs84(
  key: string,
  looksLikeWgs84: boolean,
  shouldRegister: boolean
): null {
  if (!looksLikeWgs84) {
    throw new GeometryError("CRS_CLAIMED_WGS84_INVALID", "Koordinatlar WGS84 ile uyumlu değil.");
  }
  if (shouldRegister) GeoJsonDataSource.crsNames[key] = defaultCrsFunction;
  return null;
}

// GeoJSON'un "crs" alanini Cesium'un GeoJsonDataSource.load() cagrisindan
// ONCE inceler. Cozulebilen (gercek/taninan EPSG) bir CRS'i proj4 ile
// WGS84'e donusturur. "crs" alani hic yoksa (GeoJSON spesifikasyonu geregi
// WGS84 VARSAYILIR) ya da cozulemeyen bir CRS varsa, ilk koordinatin
// GECERLI bir enlem/boylam araliginda olup olmadigina (looksLikeWgs84)
// bakilir: gecerliyse katman ham/varsayilan donusumle YINE DE (sadece bir
// bilgilendirmeyle) gosterilir; GECERSIZSE (orn. etiketlenmemis ham UTM
// metre degerleri) katmanin yuklenmesi BURADA ENGELLENIR (throw) -- Cesium'un
// 3D kure matematigi bu degerleri anlamsiz/coken bir goruntuye cevirir,
// "gostermek" acik bir hatadan daha kotu bir sonuc olurdu (bkz kullanici
// bildirimi).
// findFirstCoordinates'in bulduğu temsili [lon,lat] çifti geçerli bir
// enlem/boylam aralığında mı (koordinat hiç yoksa "evet" kabul edilir --
// ensureGeoJsonCrsSupport'taki "crs" alanı hiç yoksa spesifikasyon geregi
// WGS84 varsayılır) -- ensureGeoJsonCrsSupport'un complexity'sini düşürmek
// için ayrı bir saf yardımcıya çıkarıldı (Faz 2, davranış AYNI -- bkz
// project_ucbp_api_eslint_uyari_backlog_20260929).
function computeLooksLikeWgs84(geojson: object): boolean {
  const firstCoords = findFirstCoordinates(geojson);
  return !firstCoords || (Math.abs(firstCoords[0]) <= 180 && Math.abs(firstCoords[1]) <= 90);
}

// "crs" alanı hiç yoksa veya obje değilse erken karar verir (native/WGS84
// varsayımı geçerliyse null, degilse throw); crs alanı GERÇEKTEN
// incelenmesi gerekiyorsa onu döner. ensureGeoJsonCrsSupport'un
// complexity'sini düşürmek için ayrı bir saf yardımcıya çıkarıldı (Faz 2,
// davranış AYNI).
function resolveCrsFieldOrThrow(geojson: object, looksLikeWgs84: boolean): GeoJsonCrs | null {
  const crs = "crs" in geojson ? (geojson as { crs?: GeoJsonCrs }).crs : undefined;
  if (!crs || typeof crs !== "object") {
    if (!looksLikeWgs84) {
      throw new GeometryError(
        "CRS_MISSING_UNSUPPORTED",
        "Bu dosyada geçerli koordinat sistemi (CRS) bilgisi yok."
      );
    }
    return null;
  }
  return crs;
}

/**
 * Bir GeoJSON'un `crs` alanını `GeoJsonDataSource.load()` çağrısından ÖNCE inceler; çözülebilen bir
 * EPSG kodu bulunursa proj4 ile WGS84'e dönüşümü Cesium'un `crsNames` tablosuna kaydeder.
 * @param geojson - İncelenecek GeoJSON nesnesi.
 * @returns `crs` alanı yoksa veya native destekleniyorsa `null`; çözüldüyse/şüpheliyse `CrsCheckResult`.
 * @throws {GeometryError} `crs` alanı çözülemiyor VE koordinatlar geçerli bir enlem/boylam aralığında değilse.
 */
export async function ensureGeoJsonCrsSupport(
  geojson: unknown
): Promise<CrsCheckResult | null> {
  if (typeof geojson !== "object" || geojson === null) return null;

  const looksLikeWgs84 = computeLooksLikeWgs84(geojson);
  const crs = resolveCrsFieldOrThrow(geojson, looksLikeWgs84);
  if (!crs) return null;

  // Eski/deprecated GeoJSON "EPSG" tipi crs.properties.code kullanir; guncel
  // "name" tipi ise crs.properties.name'i dogrudan tablo anahtari yapar --
  // Cesium'un kendi arama mantigiyla (bkz GeoJsonDataSource kaynagi) birebir
  // ayni anahtarlari kullanmaliyiz, aksi halde kayit kullanilmaz.
  const isDeprecatedEpsgType = crs.type === "EPSG";
  const key = isDeprecatedEpsgType ? `EPSG:${crs.properties?.code}` : crs.properties?.name;
  if (!key || typeof key !== "string") return null;

  // Cesium'un KENDI 3 sabit varsayilan yazimindan biriyse (bkz
  // CESIUM_BUILTIN_CRS_NAMES) zaten native destekleniyor -- extractEpsgCode
  // bunlardan "urn:ogc:def:crs:OGC:1.3:CRS84" icin BASARISIZ olur (icinde
  // "EPSG" gecmez), bu yuzden epsgCode mantigina hic GIRMEDEN erken donulur
  // (shouldRegister=false: Cesium zaten biliyor, tekrar kaydetmeye gerek yok).
  if (CESIUM_BUILTIN_CRS_NAMES.has(key)) return acceptClaimedWgs84(key, looksLikeWgs84, false);

  const epsgCode = isDeprecatedEpsgType
    ? numericCodeString(crs.properties?.code)
    : extractEpsgCode(key);

  if (!epsgCode) {
    // EPSG kodu hic cikarilamadi (orn. "EPSG:Tanımsız").
    return resolveOrRejectUnresolvedCrs(key, key, looksLikeWgs84);
  }

  if (epsgCode === "4326") {
    // Standart-disi bir yazimla (orn. tam bir opengis.net URL'i) WGS84
    // belirtilmis -- Cesium'un kendi tablosunda bu TAM anahtar olmadigi
    // icin (sadece 3 sabit yazim biliyor) shouldRegister=true.
    return acceptClaimedWgs84(key, looksLikeWgs84, true);
  }

  const fromEpsg = `EPSG:${epsgCode}`;

  let proj4: Proj4;
  try {
    // proj4'un TS tanimlari CJS "export =" bicimindeymis gibi gorunse de
    // (bkz proj4/dist/index.d.ts) paket.json "module" alani gercekte ESM
    // build'ini (default export'lu) isaret ediyor -- Vite/bundler dinamik
    // import() ile bunu yukler; TS'in dinamik import() tip cikarimi ise
    // "export ="i "default" alani OLMADAN modellediginden burada acikca
    // "default" alanina eristik.
    ({ default: proj4 } = (await import("proj4")) as unknown as { default: Proj4 });
  } catch {
    // proj4 paketi tuketici uygulamaya hic eklenmemis.
    return resolveOrRejectUnresolvedCrs(key, fromEpsg, looksLikeWgs84);
  }

  if (!(await registerProj4Def(proj4, epsgCode))) {
    // EPSG kodu SAYISAL ama epsg.io'da GERCEK bir tanimi yok (orn. var
    // olmayan/yanlis yazilmis bir kod).
    return resolveOrRejectUnresolvedCrs(key, fromEpsg, looksLikeWgs84);
  }

  GeoJsonDataSource.crsNames[key] = (coordinates: number[]) => {
    const [lon, lat] = proj4(fromEpsg, "EPSG:4326", [coordinates[0]!, coordinates[1]!]);
    return Cartesian3.fromDegrees(lon!, lat!, coordinates[2]);
  };
  return { kind: "reprojected", fromEpsg };
}
