// @vitest-environment jsdom
//
// Adim 9 Faz 0b -- Ornek 2 (private static/standalone saf fonksiyonlar
// Viewer/WebGL olmadan test edilemiyordu) test kapsami tamamlama:
// parseWmsStyles/parseWmtsStyles standalone export edilmis fonksiyonlardir
// (bkz project_ucbp_api_god_component_refactor_arastirma_ozeti) ama
// oncesinde hicbir module-ozel test dosyalari yoktu, sadece tam-Viewer'li
// LayerManager.characterization.test.ts uzerinden dolayli kapsaniyordu.
// DOMParser jsdom'da mevcut, Cesium Viewer'a hic ihtiyac yok.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchWcsCoverageExtents, parseWmsStyles, parseWmtsStyles } from "./capabilities.js";

function parseXml(xml: string): Document {
  return new DOMParser().parseFromString(xml, "application/xml");
}

describe("parseWmsStyles", () => {
  const WMS_CAPABILITIES = `<?xml version="1.0"?>
<WMS_Capabilities>
  <Capability>
    <Layer>
      <Layer>
        <Name>il_sinirlari</Name>
        <Style><Name>varsayilan</Name><Title>Varsayılan</Title></Style>
        <Style><Name>koyu-tema</Name><Title>Koyu Tema</Title></Style>
      </Layer>
      <Layer>
        <Name>baska-katman</Name>
        <Style><Name>baska-stil</Name><Title>Başka Stil</Title></Style>
      </Layer>
    </Layer>
  </Capability>
</WMS_Capabilities>`;

  it("istenen katmanin SADECE kendi altindaki Style elemanlarini okur, baska katmanlari KARISTIRMAZ", () => {
    const styles = parseWmsStyles(parseXml(WMS_CAPABILITIES), "il_sinirlari");
    expect(styles).toEqual([
      { name: "varsayilan", title: "Varsayılan" },
      { name: "koyu-tema", title: "Koyu Tema" },
    ]);
  });

  it("Title eksikse Name'i baslik olarak kullanir", () => {
    const xml = parseXml(`<WMS_Capabilities><Capability><Layer><Layer>
      <Name>katman</Name><Style><Name>stil-1</Name></Style>
    </Layer></Layer></Capability></WMS_Capabilities>`);
    expect(parseWmsStyles(xml, "katman")).toEqual([{ name: "stil-1", title: "stil-1" }]);
  });

  it("katman bulunamazsa bos dizi doner", () => {
    expect(parseWmsStyles(parseXml(WMS_CAPABILITIES), "olmayan-katman")).toEqual([]);
  });
});

describe("parseWmtsStyles", () => {
  const WMTS_CAPABILITIES = `<?xml version="1.0"?>
<Capabilities xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
  <Contents>
    <Layer>
      <ows:Identifier>il_sinirlari</ows:Identifier>
      <Style isDefault="false">
        <ows:Identifier>gece</ows:Identifier>
        <ows:Title>Gece</ows:Title>
        <LegendURL xlink:href="https://example.com/legend-gece.png"/>
      </Style>
      <Style isDefault="true">
        <ows:Identifier>varsayilan</ows:Identifier>
        <ows:Title>Varsayılan</ows:Title>
        <LegendURL xlink:href="https://example.com/legend-varsayilan.png"/>
      </Style>
    </Layer>
  </Contents>
</Capabilities>`;

  it("isDefault=true olan stili ONE ALIR (siralama), legendUrl'i LegendURL/xlink:href'ten okur", () => {
    const styles = parseWmtsStyles(parseXml(WMTS_CAPABILITIES), "il_sinirlari");
    expect(styles).toEqual([
      { name: "varsayilan", title: "Varsayılan", legendUrl: "https://example.com/legend-varsayilan.png" },
      { name: "gece", title: "Gece", legendUrl: "https://example.com/legend-gece.png" },
    ]);
  });

  it("LegendURL yoksa legendUrl bos string doner", () => {
    const xml = parseXml(`<Capabilities xmlns:ows="http://www.opengis.net/ows/1.1"><Contents><Layer>
      <ows:Identifier>katman</ows:Identifier>
      <Style><ows:Identifier>stil</ows:Identifier><ows:Title>Stil</ows:Title></Style>
    </Layer></Contents></Capabilities>`);
    expect(parseWmtsStyles(xml, "katman")).toEqual([{ name: "stil", title: "Stil", legendUrl: "" }]);
  });

  it("katman bulunamazsa bos dizi doner", () => {
    expect(parseWmtsStyles(parseXml(WMTS_CAPABILITIES), "olmayan-katman")).toEqual([]);
  });
});

// Adim 10 Faz 1 -- fetchWcsCoverageExtents/parseWcsCoverageEnvelope (ikincisi
// export edilmemis, sadece fetchWcsCoverageExtents uzerinden dolayli test
// edilebilir) icin HIC test yoktu. parseWcsCoverageEnvelope'in DEGREE
// (WGS84) ve PROJEKLI (proj4/EPSG donusumu) iki dalini da kapsar.
describe("fetchWcsCoverageExtents", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("REQUEST=DescribeCoverage")) {
        return new Response(DESCRIBE_COVERAGE_XML, { status: 200 });
      }
      if (url.includes("epsg.io")) {
        // EPSG:3857 (Web Mercator) -- gercek proj4 tanimi, orijin (0,0) HER
        // IKI CRS'te de (0,0)'a esler, bu yuzden test beklenen degeri elle
        // hesaplamaya gerek kalmadan tam sayida dogrulanabilir.
        return new Response(
          "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs",
          { status: 200 }
        );
      }
      throw new Error("beklenmeyen fetch cagrisi: " + url);
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const DESCRIBE_COVERAGE_XML = `<?xml version="1.0"?>
<wcs:CoverageDescriptions xmlns:wcs="http://www.opengis.net/wcs/2.0" xmlns:gml="http://www.opengis.net/gml/3.2">
  <wcs:CoverageDescription>
    <wcs:CoverageId>cov-deg</wcs:CoverageId>
    <gml:boundedBy>
      <gml:Envelope srsName="EPSG:4326" axisLabels="Lat Long" uomLabels="deg deg">
        <gml:lowerCorner>39.9 32.8</gml:lowerCorner>
        <gml:upperCorner>40.0 32.9</gml:upperCorner>
      </gml:Envelope>
    </gml:boundedBy>
  </wcs:CoverageDescription>
  <wcs:CoverageDescription>
    <wcs:CoverageId>cov-proj</wcs:CoverageId>
    <gml:boundedBy>
      <gml:Envelope srsName="EPSG:3857" axisLabels="E N" uomLabels="m m">
        <gml:lowerCorner>0 0</gml:lowerCorner>
        <gml:upperCorner>0 0</gml:upperCorner>
      </gml:Envelope>
    </gml:boundedBy>
  </wcs:CoverageDescription>
  <wcs:CoverageDescription>
    <wcs:CoverageId>cov-none</wcs:CoverageId>
  </wcs:CoverageDescription>
</wcs:CoverageDescriptions>`;

  it("DERECE (WGS84) CRS'li zarfi axisLabels sirasina gore west/south/east/north'a esler", async () => {
    const result = await fetchWcsCoverageExtents("https://demo.example.org/wcs", ["cov-deg"]);
    expect(result.get("cov-deg")).toEqual({ south: 39.9, west: 32.8, north: 40.0, east: 32.9 });
  });

  it("PROJEKLI (proj4/EPSG donusumu) CRS'li zarfi WGS84'e cevirir", async () => {
    const result = await fetchWcsCoverageExtents("https://demo.example.org/wcs", ["cov-proj"]);
    const box = result.get("cov-proj");
    expect(box).toBeDefined();
    expect(box!.west).toBeCloseTo(0, 6);
    expect(box!.east).toBeCloseTo(0, 6);
    expect(box!.south).toBeCloseTo(0, 6);
    expect(box!.north).toBeCloseTo(0, 6);
  });

  it("<boundedBy> olmayan coverage'i sonuc Map'ine hic EKLEMEZ (undefined donup atlanir)", async () => {
    const result = await fetchWcsCoverageExtents("https://demo.example.org/wcs", ["cov-none"]);
    expect(result.has("cov-none")).toBe(false);
  });

  it("coverageIds bos ise fetch hic tetiklenmez, bos Map doner", async () => {
    const result = await fetchWcsCoverageExtents("https://demo.example.org/wcs", []);
    expect(result.size).toBe(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
