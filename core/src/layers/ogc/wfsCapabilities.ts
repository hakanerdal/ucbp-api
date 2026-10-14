import { OgcRequestError } from "../../shared/TucbsError.js";

/** Bir WFS servisinin GetCapabilities yanıtında bulunan tek bir feature type'ın ayrıştırılmış bilgisi. */
export type WfsFeatureTypeInfo = {
  /** Feature type'ın adı (ör. `"ns:il_sinirlari"`). */
  readonly name: string;
  /** Feature type'ın kullanıcıya gösterilen başlığı (varsa). */
  readonly title?: string;
  /** Feature type'ın varsayılan koordinat referans sistemi (WFS 2.0 `DefaultCRS`). */
  readonly defaultCRS?: string;
  /** Feature type'ın varsayılan koordinat referans sistemi (WFS 1.x `DefaultSRS`). */
  readonly defaultSRS?: string;
  /** Bu feature type için sunucunun ilan ettiği çıktı formatları (varsa). */
  readonly outputFormats?: readonly string[];
};

/** Bir WFS servisinin GetCapabilities yanıtından ayrıştırılmış özeti. */
export type WfsCapabilities = {
  /** Servisin desteklediği WFS protokol sürümü. */
  readonly version: string;
  /** Servisin sunduğu tüm feature type'lar. */
  readonly featureTypes: readonly WfsFeatureTypeInfo[];
  /** Servisin (GetFeature işlemi için) OperationsMetadata'da ilan ettiği genel çıktı formatları. */
  readonly outputFormats: readonly string[];
};

/** Bir GetFeature isteği için hesaplanmış, isteğe hazır nihai parametre seti (bkz `buildWfsGetFeaturePlan`). */
export type WfsGetFeaturePlan = {
  /** İstekte kullanılacak WFS protokol sürümü. */
  readonly version: string;
  /** İstenecek feature type adı. */
  readonly typeName: string;
  /** İstenecek koordinat referans sistemi. */
  readonly srsName: string;
  /** Seçilen GeoJSON-uyumlu çıktı formatı; hiçbiri bulunamadıysa `null` (bu durumda GML'e düşülür). */
  readonly jsonOutputFormat: string | null;
  /** Tek istekte alınacak azami feature sayısı. */
  readonly maxFeatures: number;
};

const els = (root: Document | Element, localName: string) =>
  Array.from(root.getElementsByTagNameNS("*", localName));
const el = (root: Document | Element, localName: string) =>
  els(root, localName)[0];
const txt = (root: Document | Element, localName: string) =>
  el(root, localName)?.textContent?.trim();

/**
 * GetCapabilities URL'si.
 * {@code /wms-proxy/wfs?url=} kullanıldığında {@code url} (ve varsa {@code tucbsapikey})
 * korunmalı; aksi halde proxy 400 (PROXY_URL_ZORUNLU) döner.
 */
function buildWfsCapabilitiesUrl(raw: string): string {
  const u = new URL(raw, window.location.origin);
  const capsUrl = new URL(`${u.origin}${u.pathname}`);
  for (const [key, value] of u.searchParams.entries()) {
    const k = key.toLowerCase();
    if (k === "url" || k === "tucbsapikey") {
      capsUrl.searchParams.set(key, value);
    }
  }
  capsUrl.searchParams.set("service", "WFS");
  capsUrl.searchParams.set("request", "GetCapabilities");
  capsUrl.searchParams.set("acceptVersions", "2.0.0,1.1.0,1.0.0");
  return capsUrl.toString();
}

/**
 * Bir yanıt metninin bir OGC ExceptionReport/ServiceExceptionReport (hata) olup olmadığını kontrol eder.
 * @param text - Kontrol edilecek ham yanıt metni.
 * @returns Metin bir OGC exception belgesiyse `true`.
 */
export function isOgcExceptionXml(text: string): boolean {
  const t = text.trimStart();
  return (
    t.startsWith("<") &&
    (t.includes("ExceptionReport") || t.includes("ServiceExceptionReport"))
  );
}

/** Attribute içindeki entity olmayan & → &amp; (proxy rewrite kaynaklı bozuk XML). */
function repairBareAmpersands(xml: string): string {
  return xml.replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/gi, "&amp;");
}

/**
 * Bir WFS servisinden GetCapabilities isteği atar ve yanıt XML'ini `WfsCapabilities`'e ayrıştırır.
 * @param url - WFS servisinin temel adresi (GetCapabilities parametreleri otomatik eklenir).
 * @param fetchOptions - `fetch()`'e iletilecek ek seçenekler.
 * @returns Ayrıştırılmış `WfsCapabilities`.
 * @throws {OgcRequestError} İstek başarısız olursa, sunucu bir OGC exception dönerse veya XML ayrıştırılamazsa.
 */
export async function fetchWfsCapabilities(
  url: string,
  fetchOptions: RequestInit = {}
): Promise<WfsCapabilities> {
  const response = await fetch(buildWfsCapabilitiesUrl(url), fetchOptions);
  if (!response.ok) {
    throw new OgcRequestError(
      "OGC_CAPABILITIES_REQUEST_FAILED",
      `WFS GetCapabilities başarısız: ${response.status} ${response.statusText}`
    );
  }
  const xml = await response.text();
  if (isOgcExceptionXml(xml)) {
    throw new OgcRequestError("OGC_CAPABILITIES_EXCEPTION", "WFS GetCapabilities OGC Exception döndü.");
  }

  // Proxy rewrite bazen href'e ham & yazar; geçersiz XML → FeatureType boş kalır.
  const safeXml = repairBareAmpersands(xml);
  const doc = new DOMParser().parseFromString(safeXml, "application/xml");
  if (doc.querySelector("parsererror")) {
    throw new OgcRequestError("OGC_CAPABILITIES_PARSE_FAILED", "WFS GetCapabilities XML parse edilemedi.");
  }
  const version = doc.documentElement.getAttribute("version") || "2.0.0";

  const featureTypes: WfsFeatureTypeInfo[] = [];
  for (const node of els(doc, "FeatureType")) {
    const name = txt(node, "Name") || "";
    if (!name) continue;
    const outputFormats = els(node, "OutputFormats").flatMap((of) =>
      els(of, "Format")
        .map((f) => f.textContent?.trim() || "")
        .filter(Boolean)
    );
    const title = txt(node, "Title");
    const defaultCRS = txt(node, "DefaultCRS");
    const defaultSRS = txt(node, "DefaultSRS");
    featureTypes.push({
      name,
      ...(title ? { title } : {}),
      ...(defaultCRS ? { defaultCRS } : {}),
      ...(defaultSRS ? { defaultSRS } : {}),
      ...(outputFormats.length ? { outputFormats } : {}),
    });
  }

  const opMeta = el(doc, "OperationsMetadata");
  let outputFormats: string[] = [];
  if (opMeta) {
    const getFeatureOp = els(opMeta, "Operation").find(
      (op) => (op.getAttribute("name") || "") === "GetFeature"
    );
    const ofParam = els(getFeatureOp ?? opMeta, "Parameter").find(
      (p) => (p.getAttribute("name") || "").toLowerCase() === "outputformat"
    );
    if (ofParam) {
      outputFormats = els(ofParam, "Value")
        .map((v) => v.textContent?.trim() || "")
        .filter(Boolean);
    }
  }
  if (!outputFormats.length) {
    const seen = new Set<string>();
    outputFormats = featureTypes
      .flatMap((ft) => ft.outputFormats || [])
      .filter((f) => !seen.has(f) && seen.add(f));
  }

  return { version, featureTypes, outputFormats };
}

function normName(name: string): string {
  return name.trim().toLowerCase();
}

function localTypeName(name: string): string {
  const idx = name.lastIndexOf(":");
  return idx >= 0 ? name.slice(idx + 1) : name;
}

/**
 * Verilen ipucu (hint) adıyla eşleşen feature type'ı bulur (önce tam ad, sonra yerel/ön-eksiz ad eşleşmesiyle dener).
 * @param hint - Aranacak feature type adı (tam veya yerel); verilmezse/eşleşmezse ilk feature type döner.
 * @param featureTypes - İçinde aranacak feature type listesi.
 * @returns Eşleşen `WfsFeatureTypeInfo` (bulunamazsa listenin ilk elemanı).
 * @throws {OgcRequestError} `featureTypes` boşsa.
 */
export function resolveWfsFeatureType(
  hint: string | undefined,
  featureTypes: readonly WfsFeatureTypeInfo[]
): WfsFeatureTypeInfo {
  if (!featureTypes.length) {
    throw new OgcRequestError("OGC_FEATURE_TYPE_NOT_FOUND", "WFS FeatureType bulunamadı.");
  }
  const h = hint?.trim();
  if (h) {
    const exact = featureTypes.find((ft) => normName(ft.name) === normName(h));
    if (exact) return exact;
    const local = normName(localTypeName(h));
    const byLocal = featureTypes.find(
      (ft) => normName(localTypeName(ft.name)) === local
    );
    if (byLocal) return byLocal;
  }
  return featureTypes[0]!;
}

/**
 * Verilen format listesinden, tercih sırasına göre bir GeoJSON-uyumlu çıktı formatı seçer.
 * @param formats - Aday çıktı formatları (sunucunun ilan ettiği).
 * @returns Seçilen format (listedeki orijinal yazımıyla); uygun bir tane bulunamazsa `null`.
 */
export function pickJsonOutput(formats: readonly string[]): string | null {
  const prefs = [
    "application/geo+json",
    "application/json;subtype=geojson",
    "application/json",
    "geojson",
    "json",
    "esrigeojson",
    "geojson+gzip",
    "geojson+zip",
  ];
  const norm = formats.map((f) => f.toLowerCase().replace(/\s+/g, ""));
  for (const p of prefs) {
    const i = norm.findIndex((f) => f === p || f.includes(p));
    if (i >= 0) return formats[i] ?? null;
  }
  return null;
}

/**
 * Verilen opsiyonel argümanları `caps` (GetCapabilities sonucu) ile birleştirerek nihai bir `WfsGetFeaturePlan` hesaplar.
 * @param args - `url`/`typeNameHint`/`version`/`srsName`/`outputFormat`/`maxFeatures` (hepsi opsiyonel, verilmezse capabilities'ten türetilir) ve zorunlu `caps`.
 * @returns Hesaplanmış `WfsGetFeaturePlan`.
 */
export function buildWfsGetFeaturePlan(args: {
  url: string;
  typeNameHint?: string;
  version?: string;
  srsName?: string;
  outputFormat?: string;
  maxFeatures?: number;
  caps: WfsCapabilities;
}): WfsGetFeaturePlan {
  const ft = resolveWfsFeatureType(args.typeNameHint, args.caps.featureTypes);
  const version = args.version || args.caps.version || "2.0.0";
  const srsName =
    args.srsName || ft.defaultCRS || ft.defaultSRS || "EPSG:4326";
  const jsonOutputFormat =
    args.outputFormat ||
    pickJsonOutput(ft.outputFormats || []) ||
    pickJsonOutput(args.caps.outputFormats);
  const maxFeatures = args.maxFeatures ?? 5000;
  return {
    version,
    typeName: ft.name,
    srsName,
    jsonOutputFormat,
    maxFeatures,
  };
}

/**
 * Bir `WfsGetFeaturePlan`'ı `URLSearchParams`'a yazar (WFS 1.x/2.0 arasındaki `typeName`/`typeNames` ve `maxFeatures`/`count` parametre adı farkını gözeterek).
 * @param params - Parametrelerin yazılacağı `URLSearchParams`.
 * @param plan - Yazılacak plan.
 * @param outputFormat - Verilirse `outputFormat` parametresi olarak eklenir (verilmezse eklenmez, sunucunun varsayılanı kullanılır).
 */
export function appendWfsGetFeatureParams(
  params: URLSearchParams,
  plan: WfsGetFeaturePlan,
  outputFormat?: string
): void {
  params.set("service", "WFS");
  params.set("request", "GetFeature");
  params.set("version", plan.version);
  const isV2 = plan.version.startsWith("2.");
  params.set(isV2 ? "typeNames" : "typeName", plan.typeName);
  params.set("srsName", plan.srsName);
  if (outputFormat) {
    params.set("outputFormat", outputFormat);
  }
  const limitParam = isV2 ? "count" : "maxFeatures";
  params.set(limitParam, String(plan.maxFeatures));
}
