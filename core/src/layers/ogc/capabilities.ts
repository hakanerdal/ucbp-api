import { Rectangle } from "cesium";
import { OgcRequestError } from "../../shared/TucbsError.js";
import type { ServiceStyleOption } from "../../types/index.js";
import { ensureProj4Def, extractEpsgCode } from "./proj4Defs.js";

// ML-12: eskiden LayerManager tarafi (fetchXml) apiKey header+proxy
// kullanirken, GC-05/TucbsServiceUpload tarafi (fetchCapabilitiesDocument)
// ciplak fetch(url) yapiyordu -- CORS izni olmayan sunucularda "Servis
// Kesfi" sessizce basarisiz oluyordu. Bu iki ayri uygulama TEK
// getCapabilities()'te birlesir; `authContext` (LayerManager.apiKeyPolicy
// zaten bu sekli yapisal olarak karsilar, sibling-module DI ile gecilir --
// bkz project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi)
// VERILMEZSE (ör. henuz bir LayerManager'a baglanmamis bir TucbsServiceUpload)
// apiKey header'i eklenmeden, DOGRUDAN (eski fetchCapabilitiesDocument ile
// AYNI) davranisla devam eder -- yani proxy/apiKey YOKSA bile kesif
// TAMAMEN calismaz hale gelmez, sadece CORS-korumali sunucularda basarisiz
// olmaya devam eder (bu durum artik LayerManager'a baglanildiginda otomatik
// duzelir).
/**
 * OGC GetCapabilities XML'ini çeker ve okur -- `authContext` verilirse
 * (LayerManager'ın private `apiKeyPolicy`'si) apiKey header'ı eklenir;
 * `url` zaten proxy'lenmiş olmalıdır (bkz `LayerManager.getCapabilitiesDocument`).
 */
export async function getCapabilities(
  url: string,
  authToken: string | undefined,
  authContext?: {
    mergeApiKeyHeader(headers: Record<string, string> | undefined, url: string): Record<string, string> | undefined;
    buildAuthHeaders(authToken: string | undefined): Record<string, string> | undefined;
  },
): Promise<Document> {
  const headers = authContext?.mergeApiKeyHeader(authContext.buildAuthHeaders(authToken), url);
  const response = await fetch(url, headers ? { headers } : undefined);
  if (!response.ok) {
    throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", `GetCapabilities isteği başarısız: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) {
    throw new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "GetCapabilities yanıtı XML olarak ayrıştırılamadı.");
  }
  return doc;
}

// WMS 1.3.0 (ve 1.1.x) GetCapabilities: <Layer><Name>{layerName}</Name>...
// <Style><Name/><Title/></Style>...</Layer> — istenen katmanı isimle bulup
// SADECE onun altındaki <Style> elemanlarını okur (kök/başka katmanların
// stillerini KARIŞTIRMAMAK için).
export function parseWmsStyles(xml: Document, layerName: string): Omit<ServiceStyleOption, "legendUrl">[] {
  const layerEl = elementsByLocalName(xml, "Layer").find(
    (layer) => childByLocalName(layer, "Name")?.textContent?.trim() === layerName,
  );
  if (!layerEl) return [];

  const styles: Omit<ServiceStyleOption, "legendUrl">[] = [];
  for (const styleEl of Array.from(layerEl.children)) {
    if (styleEl.localName !== "Style") continue;
    const name = childByLocalName(styleEl, "Name")?.textContent?.trim();
    if (!name) continue;
    const title = childByLocalName(styleEl, "Title")?.textContent?.trim() ?? name;
    styles.push({ name, title });
  }
  return styles;
}

// WMTS 1.0.0 GetCapabilities: <Layer><ows:Identifier/>...<Style><ows:Identifier/>
// <ows:Title/><LegendURL xlink:href="..."/></Style></Layer>. LegendURL WMTS
// spec'inin bir parçası (WMS'ten farklı olarak GENELDE ayrı bir istek
// GEREKTİRMEZ) — bulunamazsa legendUrl bos string donuyor, UI lejant
// gorselini gizler.
export function parseWmtsStyles(xml: Document, layerName: string): ServiceStyleOption[] {
  const layerEl = elementsByLocalName(xml, "Layer").find(
    (layer) => childByLocalName(layer, "Identifier")?.textContent?.trim() === layerName,
  );
  if (!layerEl) return [];

  const styles: (ServiceStyleOption & { isDefault: boolean })[] = [];
  for (const styleEl of Array.from(layerEl.children)) {
    if (styleEl.localName !== "Style") continue;
    const name = childByLocalName(styleEl, "Identifier")?.textContent?.trim();
    if (!name) continue;
    const title = childByLocalName(styleEl, "Title")?.textContent?.trim() ?? name;
    const legendUrl = childByLocalName(styleEl, "LegendURL")?.getAttribute("xlink:href") ?? "";
    const isDefault = styleEl.getAttribute("isDefault") === "true";
    styles.push({ name, title, legendUrl, isDefault });
  }
  // WMTS spec'inde <Style isDefault="true"> katmanin su anki/varsayilan
  // stilini isaretler; TucbsLegendPanel'in "aktif stil bu" varsayimiyla ilk
  // sirada gostermesi icin one aliniyor (ServiceStyleOption disari isDefault
  // sizdirmiyor -- API yuzeyini buyutmemek icin sadece siralamada kullanilir).
  styles.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
  return styles.map((style) => ({ name: style.name, title: style.title, legendUrl: style.legendUrl }));
}

// ── Servis keşfi (eski components/TucbsServiceUpload.ts modül-seviyesi
// fonksiyonları -- bkz project_ucbp_api_ogc_capabilities_uygulama_plani) ──

// SERVICE/REQUEST/VERSION disindaki mevcut sorgu parametreleri (orn. bazi
// cgi-bin uclarinin gerektirdigi "map=...") KORUNUR — sadece bu ucu set/
// override edilir, boylece kullanici zaten tam bir GetCapabilities URL'si
// yapistirmis olsa da (eski kullanim) bozulmaz.
export function buildCapabilitiesUrl(
  baseUrl: string,
  serviceType: string,
  version: string,
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("SERVICE", serviceType);
  url.searchParams.set("REQUEST", "GetCapabilities");
  url.searchParams.set("VERSION", version);
  return url.toString();
}

export interface GeographicBoundingBox {
  west: number;
  south: number;
  east: number;
  north: number;
}

export interface DiscoveredItem {
  identifier: string;
  title: string;
  tileMatrixSetID?: string;
  // Sadece WMS icin doldurulur -- GeoTIFF export'ta BBOX/WIDTH-HEIGHT
  // hesaplamasi icin kullanilir (bkz LayerManager.buildWmsGeoTiffExportUrl).
  geographicBoundingBox?: GeographicBoundingBox;
}

// Namespace on-eki (wms:, ows:, wfs: vb.) sunucudan sunucuya degistigi icin
// tag adini namespace'ten bagimsiz (yerel ad) aramak daha guvenilir.
function elementsByLocalName(
  root: Document | Element,
  tagName: string,
): Element[] {
  return Array.from(root.getElementsByTagNameNS("*", tagName));
}

function childByLocalName(
  element: Element,
  tagName: string,
): Element | undefined {
  return Array.from(element.children).find(
    (child) => child.localName === tagName,
  );
}

// WMS 1.3.0 <EX_GeographicBoundingBox> (alt elementler) VEYA 1.1.x
// <LatLonBoundingBox minx=".." miny=".." maxx=".." maxy=".."/> (attribute)
// bicimlerinden birini okur -- hangisi kullanilirsa kullanilsin sonuc AYNI
// WGS84 lon/lat kutusu. Layer kendi bbox'ini bildirmiyorsa (bazi katmanlar
// bunu ATLAYIP sadece parent <Layer>'da miras birakir) undefined doner --
// export bu durumda dunya geneline (bkz LayerManager) duser.
function parseWmsGeographicBoundingBox(
  layer: Element,
): GeographicBoundingBox | undefined {
  const exBbox = childByLocalName(layer, "EX_GeographicBoundingBox");
  if (exBbox) {
    const west = childByLocalName(exBbox, "westBoundLongitude")?.textContent;
    const east = childByLocalName(exBbox, "eastBoundLongitude")?.textContent;
    const south = childByLocalName(exBbox, "southBoundLatitude")?.textContent;
    const north = childByLocalName(exBbox, "northBoundLatitude")?.textContent;
    if (west && east && south && north) {
      const box = {
        west: Number(west),
        south: Number(south),
        east: Number(east),
        north: Number(north),
      };
      if (Object.values(box).every(Number.isFinite)) return box;
    }
  }

  const llBbox = childByLocalName(layer, "LatLonBoundingBox");
  if (llBbox) {
    const box = {
      west: Number(llBbox.getAttribute("minx")),
      south: Number(llBbox.getAttribute("miny")),
      east: Number(llBbox.getAttribute("maxx")),
      north: Number(llBbox.getAttribute("maxy")),
    };
    if (Object.values(box).every(Number.isFinite)) return box;
  }

  return undefined;
}

function parseWmsCapabilities(doc: Document): DiscoveredItem[] {
  // Sadece "Name" (katman kimligi) tasiyan yaprak <Layer>'lar secilebilir;
  // ust katmanlar genelde gruplama amacli olup Name icermez.
  const items: DiscoveredItem[] = [];
  for (const layer of elementsByLocalName(doc, "Layer")) {
    const nameEl = childByLocalName(layer, "Name");
    if (!nameEl?.textContent) continue;
    const titleEl = childByLocalName(layer, "Title");
    const geographicBoundingBox = parseWmsGeographicBoundingBox(layer);
    items.push({
      identifier: nameEl.textContent.trim(),
      title: titleEl?.textContent?.trim() || nameEl.textContent.trim(),
      ...(geographicBoundingBox && { geographicBoundingBox }),
    });
  }
  return items;
}

// WMS <Capability><Request><GetMap><Format> listesinde image/geotiff veya
// image/tiff varsa dondurur (image/geotiff ONCELIKLI -- daha acik isimli
// oldugu icin -- ama coğu GeoServer kurulumu SADECE image/tiff listeler ve
// bu da zaten gercek/coğrafi-referansli bir GeoTIFF'tir, bkz.
// docs/geotiff-export-arastirmasi.md §4.1). Hicbiri yoksa undefined --
// sunucu GeoTIFF export desteklemiyor demektir.
export function parseWmsTiffFormat(doc: Document): string | undefined {
  const getMapEl = elementsByLocalName(doc, "GetMap")[0];
  if (!getMapEl) return undefined;
  const formats = new Set(
    elementsByLocalName(getMapEl, "Format")
      .map((el) => el.textContent?.trim().toLowerCase())
      .filter((value): value is string => !!value),
  );
  if (formats.has("image/geotiff")) return "image/geotiff";
  if (formats.has("image/tiff")) return "image/tiff";
  return undefined;
}

// WCS 2.x <wcs:ServiceMetadata><wcs:formatSupported> listesi (WCS 1.x'te
// bu bilgi capabilities'te garanti degildir -- DescribeCoverage gerekebilir,
// bu durumda undefined donup export sunulmaz).
export function parseWcsTiffFormat(doc: Document): string | undefined {
  const formats = new Set(
    elementsByLocalName(doc, "formatSupported")
      .map((el) => el.textContent?.trim().toLowerCase())
      .filter((value): value is string => !!value),
  );
  if (formats.has("image/geotiff")) return "image/geotiff";
  if (formats.has("image/tiff")) return "image/tiff";
  return undefined;
}

function parseWmtsCapabilities(doc: Document): DiscoveredItem[] {
  const items: DiscoveredItem[] = [];
  for (const layer of elementsByLocalName(doc, "Layer")) {
    const idEl = childByLocalName(layer, "Identifier");
    if (!idEl?.textContent) continue;
    const titleEl = childByLocalName(layer, "Title");
    const tmsLinkEl = childByLocalName(layer, "TileMatrixSetLink");
    const tmsEl = tmsLinkEl
      ? childByLocalName(tmsLinkEl, "TileMatrixSet")
      : undefined;
    items.push({
      identifier: idEl.textContent.trim(),
      title: titleEl?.textContent?.trim() || idEl.textContent.trim(),
      ...(tmsEl?.textContent && { tileMatrixSetID: tmsEl.textContent.trim() }),
    });
  }
  return items;
}

function parseWfsCapabilities(doc: Document): DiscoveredItem[] {
  const items: DiscoveredItem[] = [];
  for (const featureType of elementsByLocalName(doc, "FeatureType")) {
    const nameEl = childByLocalName(featureType, "Name");
    if (!nameEl?.textContent) continue;
    const titleEl = childByLocalName(featureType, "Title");
    items.push({
      identifier: nameEl.textContent.trim(),
      title: titleEl?.textContent?.trim() || nameEl.textContent.trim(),
    });
  }
  return items;
}

function parseWcsCapabilities(doc: Document): DiscoveredItem[] {
  // WCS 2.0.x: <CoverageSummary><CoverageId>/<Title>
  // WCS 1.1.x: <CoverageSummary><Identifier>/<Title> (CoverageId yerine Identifier kullanir)
  const items: DiscoveredItem[] = [];
  for (const summary of elementsByLocalName(doc, "CoverageSummary")) {
    const idEl =
      childByLocalName(summary, "CoverageId") ??
      childByLocalName(summary, "Identifier");
    if (!idEl?.textContent) continue;
    const titleEl = childByLocalName(summary, "Title");
    items.push({
      identifier: idEl.textContent.trim(),
      title: titleEl?.textContent?.trim() || idEl.textContent.trim(),
    });
  }
  if (items.length > 0) return items;

  // WCS 1.0.0 fallback: <CoverageOfferingBrief><name>/<label>
  for (const brief of elementsByLocalName(doc, "CoverageOfferingBrief")) {
    const nameEl = childByLocalName(brief, "name");
    if (!nameEl?.textContent) continue;
    const labelEl = childByLocalName(brief, "label");
    items.push({
      identifier: nameEl.textContent.trim(),
      title: labelEl?.textContent?.trim() || nameEl.textContent.trim(),
    });
  }
  return items;
}

// WCS 2.x GetCapabilities'teki <CoverageSummary> ozeti (yukaridaki
// parseWcsCapabilities) -- WMS'in aksine -- HICBIR kapsama alani bilgisi
// tasimaz; bu, katmanlar haritaya eklendiginde/onizlendiginde varsayilan
// GLOBAL rectangle'a (-180,-90,180,90 -- bkz LayerManager.addWCS) yayilip
// yanlis konumda gorunmelerine yol aciyordu (bkz kullanici bildirimi).
// Gercek kapsama alani ayri bir DescribeCoverage istegiyle
// <gml:boundedBy><gml:Envelope> icinde gelir; WCS 2.0 COVERAGEID parametresi
// virgulle ayrilmis birden fazla id kabul ettigi icin TUM kesfedilen
// katmanlar icin TEK istekte cekilir.
async function parseWcsCoverageEnvelope(
  descriptionEl: Element,
): Promise<GeographicBoundingBox | undefined> {
  const boundedByEl = childByLocalName(descriptionEl, "boundedBy");
  const envelopeEl = boundedByEl
    ? childByLocalName(boundedByEl, "Envelope")
    : undefined;
  if (!envelopeEl) return undefined;

  const lowerText = childByLocalName(envelopeEl, "lowerCorner")?.textContent?.trim();
  const upperText = childByLocalName(envelopeEl, "upperCorner")?.textContent?.trim();
  if (!lowerText || !upperText) return undefined;
  const lower = lowerText.split(/\s+/).map(Number);
  const upper = upperText.split(/\s+/).map(Number);
  if (lower.length < 2 || upper.length < 2) return undefined;
  if (![...lower, ...upper].every(Number.isFinite)) return undefined;

  const axisLabels = (envelopeEl.getAttribute("axisLabels") ?? "")
    .trim()
    .toLowerCase();
  const uomLabels = (envelopeEl.getAttribute("uomLabels") ?? "").toLowerCase();

  if (uomLabels.includes("deg")) {
    // Zaten dereceli/coğrafi bir CRS -- axisLabels EPSG kaydina gore "lat
    // long" (orn. EPSG:4258/ETRS89) VEYA "long lat" olabilir; ilk eksenin
    // turune gore lowerCorner/upperCorner'i dogru west/south/east/north'a
    // esler.
    const latFirst = axisLabels.startsWith("lat");
    return latFirst
      ? { south: lower[0]!, west: lower[1]!, north: upper[0]!, east: upper[1]! }
      : { west: lower[0]!, south: lower[1]!, east: upper[0]!, north: upper[1]! };
  }

  // Coverage'in KENDI (genelde projekli, orn. Isvicre LV95/EPSG:2056 metre
  // cinsinden) native CRS'inde donmus -- boyle bir zarfi dogrudan enlem/
  // boylam derecesi SANIP kullanmak tamamen yanlis bir konuma yol acardi
  // (bkz kullanici bildirimi: OI.OrthoimageCoverage2018 tum globe'u
  // kapliyordu). proj4 ile WGS84'e ceviriyoruz -- coverage'in tam 4 kosesini
  // (2 degil) donusturup min/max almak, egik/donmus projeksiyonlarda SADECE
  // 2 kaba koseyi cevirmekten daha guvenilir bir yaklasik kutu verir.
  const srsName = envelopeEl.getAttribute("srsName") ?? "";
  return resolveProjectedEnvelope(srsName, axisLabels, lower, upper);
}

// parseWcsCoverageEnvelope'in projekli (WGS84 disi) CRS dali -- Adim 10 Faz 3'te
// cyclomatic complexity'yi 20 esiginin altina cekmek icin ayri fonksiyona
// cikarildi (davranis DEGISMEDI, saf tasima).
async function resolveProjectedEnvelope(
  srsName: string,
  axisLabels: string,
  lower: readonly number[],
  upper: readonly number[],
): Promise<GeographicBoundingBox | undefined> {
  const epsgCode = extractEpsgCode(srsName);
  if (!epsgCode) return undefined;
  const proj4 = await ensureProj4Def(epsgCode);
  if (!proj4) return undefined;

  try {
    // axisLabels "x y"/"E N" gibi projekli eksenlerde genelde [x,y]
    // sirasindadir; "y x" gibi ters bir bicim gorulursu ceviriyoruz.
    const yFirst = axisLabels.startsWith("y") || axisLabels.startsWith("n");
    const toXY = (pair: readonly number[]): [number, number] =>
      yFirst ? [pair[1]!, pair[0]!] : [pair[0]!, pair[1]!];
    const [lx, ly] = toXY(lower);
    const [ux, uy] = toXY(upper);
    const corners: Array<[number, number]> = [
      [lx, ly],
      [ux, uy],
      [lx, uy],
      [ux, ly],
    ];
    const from = `EPSG:${epsgCode}`;
    const projected = corners.map((xy) => proj4(from, "EPSG:4326", xy));
    const lons = projected.map((p) => p[0]);
    const lats = projected.map((p) => p[1]);
    const box = {
      west: Math.min(...lons),
      east: Math.max(...lons),
      south: Math.min(...lats),
      north: Math.max(...lats),
    };
    if (!Object.values(box).every(Number.isFinite)) return undefined;
    return box;
  } catch {
    return undefined;
  }
}

// Faz 5'te (ML-12) ANA kesif istegi (getCapabilities) apiKey/proxy'ye
// baglanmisti; DescribeCoverage BILINCLI OLARAK ayri birakilmisti (bkz
// project_ucbp_api_ogc_capabilities_uygulama_plani Faz 5 raporu) -- Faz 5b
// bu boslugu kapatir: `authToken`/`authContext` OPSIYONEL (varsayilan
// undefined -- eski, proxy'siz davranisla BIREBIR ayni) verilirse
// (LayerManager.getWcsCoverageExtents cagirir) istek de proxy'den gecer.
export async function fetchWcsCoverageExtents(
  rawUrl: string,
  coverageIds: readonly string[],
  authToken?: string,
  authContext?: {
    mergeApiKeyHeader(headers: Record<string, string> | undefined, url: string): Record<string, string> | undefined;
    buildAuthHeaders(authToken: string | undefined): Record<string, string> | undefined;
  },
): Promise<Map<string, GeographicBoundingBox>> {
  const result = new Map<string, GeographicBoundingBox>();
  if (coverageIds.length === 0) return result;
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("SERVICE", "WCS");
    // DescribeCoverage icin de VERSION KASITLI OLARAK 2.0.1'e sabitlenir --
    // ayni sebep GetCoverage export'unda oldugu gibi (bkz
    // LayerManager.buildWcsGeoTiffExportUrl WHY yorumu): bu uctaki gercek
    // WCS operasyonlari icin kesif sirasinda basarili olan surum
    // GUVENILIR degil (bazi MapServer kurulumlari GetCapabilities'te
    // desteklediğini bildirdigi bir surumde DescribeCoverage/GetCoverage'i
    // reddedebiliyor).
    url.searchParams.set("VERSION", "2.0.1");
    url.searchParams.set("REQUEST", "DescribeCoverage");
    url.searchParams.set("COVERAGEID", coverageIds.join(","));
    const doc = await getCapabilities(url.toString(), authToken, authContext);
    for (const descEl of elementsByLocalName(doc, "CoverageDescription")) {
      const idEl = childByLocalName(descEl, "CoverageId");
      const id = idEl?.textContent?.trim();
      if (!id) continue;
      const box = await parseWcsCoverageEnvelope(descEl);
      if (box) result.set(id, box);
    }
  } catch {
    // DescribeCoverage her WCS sunucusunda/surumde garanti degil -- basarisiz
    // olursa katmanlar sessizce eski (global rectangle) davranisina duser,
    // asil kesif akisi (parseWcsCapabilities) BUNDAN ETKILENMEZ.
  }
  return result;
}

// item.geographicBoundingBox (varsa -- bkz fetchWcsCoverageExtents) Cesium
// Rectangle'a cevrilir; WCSLayerOptions.rectangle olarak verilince
// LayerManager.addWCS() artik SABIT global (-180,-90,180,90) yerine
// katmanin GERCEK konumunu kullanir (bkz o metoddaki "options.rectangle ??
// Rectangle.fromDegrees(-180,-90,180,90)" varsayilani).
export function wcsRectangleFor(item: DiscoveredItem): Rectangle | undefined {
  const box = item.geographicBoundingBox;
  if (!box) return undefined;
  return Rectangle.fromDegrees(box.west, box.south, box.east, box.north);
}

export function parseCapabilities(
  serviceType: string,
  doc: Document,
): DiscoveredItem[] {
  switch (serviceType) {
    case "WMS":
      return parseWmsCapabilities(doc);
    case "WMTS":
      return parseWmtsCapabilities(doc);
    case "WFS":
      return parseWfsCapabilities(doc);
    case "WCS":
      return parseWcsCapabilities(doc);
    default:
      return [];
  }
}

// Kok elementin adindan/namespace'inden yanitin gercekte hangi OGC servisine
// ait oldugunu tahmin eder. Kullanici yanlis servis turu secip dogru bir
// GetCapabilities URL'si girdiginde ("0 katman bulundu" yerine) net bir
// uyusmazlik mesaji verebilmek icin kullanilir.
export function detectServiceType(doc: Document): string | undefined {
  const root = doc.documentElement;
  const rootLocalName = root.localName;
  const namespaceUri = root.namespaceURI ?? "";

  if (
    rootLocalName === "WMS_Capabilities" ||
    rootLocalName === "WMT_MS_Capabilities" ||
    namespaceUri.includes("/wms")
  ) {
    return "WMS";
  }
  if (rootLocalName === "WFS_Capabilities" || namespaceUri.includes("/wfs")) {
    return "WFS";
  }
  if (namespaceUri.includes("/wmts")) return "WMTS";
  if (namespaceUri.includes("/wcs") || rootLocalName === "WCS_Capabilities")
    return "WCS";
  return undefined;
}
