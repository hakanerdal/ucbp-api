// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Klasor yapisi ve seçici bölme planı, Faz 0.4-f.
// TucbsServiceUpload'un servis kesfi (eski _fetchCapabilities -- Faz 3.3'te
// ServiceDiscoveryController.discover'a cikarildi; 94 satir, karmasiklik 18) ve
// katman ekleme akisinin MEVCUT davranisini, gercek UI olaylari uzerinden
// (dropdown secimi, URL girisi, getir butonu, checkbox, ekle butonu)
// dondurur:
//   - surum adaylarinin sirasi ve her denemenin argumanlari,
//   - hata siniflandirmasi (ag / sunucu / ayristirma / gecersiz yanit) ve
//     birebir mesajlar, yanlis servis turu tespiti,
//   - WMS/WCS GeoTIFF format kesfi, WCS kapsam zarfi ve eksik zarf uyarisi,
//   - layerManager olmadan dogrudan GetCapabilities yolu,
//   - tur bazinda layerManager.add() argumanlari, kismi/toplu hata mesajlari.
//
// tucbs-map-preview gercek bir Cesium Viewer kurdugu icin, yalnizca atanan
// layerOptions'i kaydeden sahte bir elementle degistirilir; toast ise
// cagrilari kaydeden bir mock'tur.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LayerOperationError, OgcRequestError, type LayerManager } from "@tucbs/core";
import { showToast } from "../shared/ui/toast.js";
import "./TucbsServiceUpload.js";
import type { TucbsServiceUpload } from "./TucbsServiceUpload.js";

vi.mock("../shared/ui/toast.js", () => ({ showToast: vi.fn() }));

vi.mock("../map/TucbsMapPreview.js", () => {
  /** Yalnizca kendisine atanan degerleri tutan sahte onizleme elementi. */
  class FakeMapPreview extends HTMLElement {
    layerOptions: unknown;
    apiKey = "";
    zoomToLayer = false;
    width = "";
    height = "";
  }
  if (!customElements.get("tucbs-map-preview")) customElements.define("tucbs-map-preview", FakeMapPreview);
  return { TucbsMapPreview: FakeMapPreview };
});

const parse = (xml: string) => new DOMParser().parseFromString(xml, "application/xml");

const WMS_XML = `<WMS_Capabilities xmlns="http://www.opengis.net/wms" version="1.3.0"><Capability>
  <Request><GetMap><Format>image/png</Format><Format>image/geotiff</Format></GetMap></Request>
  <Layer><Title>Kok</Title>
    <Layer><Name>yollar</Name><Title>Yollar</Title><EX_GeographicBoundingBox>
      <westBoundLongitude>26</westBoundLongitude><eastBoundLongitude>45</eastBoundLongitude>
      <southBoundLatitude>36</southBoundLatitude><northBoundLatitude>42</northBoundLatitude>
    </EX_GeographicBoundingBox></Layer>
    <Layer><Name>binalar</Name></Layer>
  </Layer></Capability></WMS_Capabilities>`;

const WMTS_XML = `<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1"><Contents>
  <Layer><ows:Title>Orto</ows:Title><ows:Identifier>orto</ows:Identifier>
    <TileMatrixSetLink><TileMatrixSet>EPSG:3857</TileMatrixSet></TileMatrixSetLink></Layer>
  <Layer><ows:Identifier>notms</ows:Identifier></Layer>
</Contents></Capabilities>`;

const WFS_XML = `<wfs:WFS_Capabilities xmlns:wfs="http://www.opengis.net/wfs/2.0"><FeatureTypeList>
  <FeatureType><Name>ns:iller</Name><Title>İller</Title></FeatureType>
</FeatureTypeList></wfs:WFS_Capabilities>`;

const WCS_XML = `<wcs:Capabilities xmlns:wcs="http://www.opengis.net/wcs/2.0">
  <wcs:ServiceMetadata><wcs:formatSupported>image/tiff</wcs:formatSupported></wcs:ServiceMetadata>
  <wcs:Contents>
    <wcs:CoverageSummary><wcs:CoverageId>dem</wcs:CoverageId></wcs:CoverageSummary>
    <wcs:CoverageSummary><wcs:CoverageId>slope</wcs:CoverageId></wcs:CoverageSummary>
  </wcs:Contents></wcs:Capabilities>`;

const EMPTY_WMS_XML = `<WMS_Capabilities xmlns="http://www.opengis.net/wms"><Capability><Layer><Title>Bos</Title></Layer></Capability></WMS_Capabilities>`;

interface FakeServiceLayerManager {
  getCapabilitiesDocument: ReturnType<typeof vi.fn>;
  getWcsCoverageExtents: ReturnType<typeof vi.fn>;
  add: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
  off: ReturnType<typeof vi.fn>;
  /** on() ile kaydedilen dinleyicileri tetikler. */
  emit(event: string, payload: unknown): void;
}

// Faz 3.3 onkosulu: kesif ServiceDiscoveryController'a tasinirken yukaridaki
// testlerin kapsamadigi uc davranis -- WCS'te bilesen durumuna YAZMA SIRASI
// (liste ve TIFF formati zarf isteginden ONCE yazilir), layerManager yokken
// WCS zarf isteginin yolu ve layerManager'in kesif SIRASINDA (her await'ten
// sonra yeniden) okunmasi -- ile DOM'dan kaldirilip geri eklenen bilesende
// yeni kesfin calismasi.
describe("TucbsServiceUpload kesif yazma sirasi ve layerManager yolu (karakterizasyon -- Faz 3.3)", () => {
  function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((res) => {
      resolve = res;
    });
    return { promise, resolve };
  }

  it("WCS: zarf istegi surerken liste zaten yazilmistir ve mesgul gostergesi aciktir; zarflar gelince kutular eklenir", async () => {
    const manager = createFakeLayerManager(parse(WCS_XML));
    const extents = deferred<Map<string, unknown>>();
    manager.getWcsCoverageExtents.mockReturnValueOnce(extents.promise);
    const el = await mount(manager);
    await selectType(el, "WCS");
    await typeUrl(el, "https://srv.test/wcs");
    shadow(el).querySelector<HTMLButtonElement>("button.fetch-btn")!.click();
    await vi.waitFor(() => expect(manager.getWcsCoverageExtents).toHaveBeenCalledTimes(1));
    await el.updateComplete;
    // Zarf istegi bekletilirken gorulen durum; istek once cozulur ki basarisiz
    // bir beklenti global mesgul sayacini acik birakip sonraki testleri bozmasin.
    const during = {
      titles: discoveredTitles(el),
      busy: busyEvents.at(-1)?.busy,
      fetchDisabled: shadow(el).querySelector<HTMLButtonElement>("button.fetch-btn")!.disabled,
    };
    extents.resolve(new Map([["dem", { west: 26, south: 36, east: 45, north: 42 }]]));
    await vi.waitFor(() => expect(busyEvents.at(-1)?.busy).toBe(false));
    await el.updateComplete;
    expect(during).toEqual({ titles: ["dem", "slope"], busy: true, fetchDisabled: true });
    await check(el, "dem");
    await addSelected(el);
    expect(manager.add.mock.calls[0]![1]).toMatchObject({ coverageId: "dem", tiffFormat: "image/tiff" });
    expect(manager.add.mock.calls[0]![1].rectangle).toBeDefined();
  });

  it("layerManager yokken WCS zarflari ham adresle (sorgu dizesi korunarak) DescribeCoverage ile dogrudan istenir", async () => {
    const fetchMock = vi.fn(async (url: string) =>
      new Response(url.includes("DescribeCoverage") ? "<CoverageDescriptions/>" : WCS_XML, { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const el = await mount(undefined);
    await selectType(el, "WCS");
    await typeUrl(el, "https://srv.test/wcs?x=1");
    await fetchCapabilities(el);
    expect(fetchMock.mock.calls.map((call) => call[0])).toEqual([
      "https://srv.test/wcs?x=1&SERVICE=WCS&REQUEST=GetCapabilities&VERSION=2.1.0",
      "https://srv.test/wcs?x=1&SERVICE=WCS&VERSION=2.0.1&REQUEST=DescribeCoverage&COVERAGEID=dem%2Cslope",
    ]);
    expect(discoveredTitles(el)).toEqual(["dem", "slope"]);
    expect(vi.mocked(showToast).mock.calls).toEqual([
      ["warning", "2/2 katmanın tam konumu belirlenemedi; bu katmanlar haritada geniş bir alanda görünebilir."],
    ]);
  });

  it("kesif surerken layerManager baglanirsa WCS zarflari yeni baglanan yoneticiden istenir", async () => {
    const capabilities = deferred<Response>();
    const fetchMock = vi.fn(() => capabilities.promise);
    vi.stubGlobal("fetch", fetchMock);
    const el = await mount(undefined);
    await selectType(el, "WCS");
    await typeUrl(el, "https://srv.test/wcs?x=1");
    shadow(el).querySelector<HTMLButtonElement>("button.fetch-btn")!.click();
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const manager = createFakeLayerManager();
    el.layerManager = manager as unknown as LayerManager;
    capabilities.resolve(new Response(WCS_XML, { status: 200 }));
    await vi.waitFor(() => expect(busyEvents.at(-1)?.busy).toBe(false));
    expect(manager.getWcsCoverageExtents.mock.calls).toEqual([["https://srv.test/wcs", ["dem", "slope"]]]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("DOM'dan kaldirilip geri eklenen bilesende yeni kesif normal calisir", async () => {
    const manager = createFakeLayerManager(parse(WMS_XML));
    const el = await mount(manager);
    el.remove();
    document.body.appendChild(el);
    await el.updateComplete;
    await typeUrl(el, "https://srv.test/wms");
    await fetchCapabilities(el);
    expect(discoveredTitles(el)).toEqual(["Yollar", "binalar"]);
  });
});

/** Servis kesfi ve ekleme icin TucbsServiceUpload'un dokundugu LayerManager yuzeyinin ikizi. */
function createFakeLayerManager(doc?: Document): FakeServiceLayerManager {
  const listeners = new Map<string, Set<(payload: unknown) => void>>();
  const fake: FakeServiceLayerManager = {
    getCapabilitiesDocument: vi.fn(async () => doc),
    getWcsCoverageExtents: vi.fn(async () => new Map()),
    add: vi.fn(async () => ({})),
    on: vi.fn((event: string, cb: (payload: unknown) => void) => {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)!.add(cb);
    }),
    off: vi.fn((event: string, cb: (payload: unknown) => void) => listeners.get(event)?.delete(cb)),
    emit: (event, payload) => listeners.get(event)?.forEach((cb) => cb(payload)),
  };
  return fake;
}

const shadow = (el: Element) => el.shadowRoot!;
const errorTexts = (el: Element) =>
  [...shadow(el).querySelectorAll(".error-text")].map((node) => node.textContent ?? "");
const discoveredTitles = (el: Element) =>
  [...shadow(el).querySelectorAll(".discovered-row cds-checkbox")].map((node) => node.getAttribute("title"));
const addButton = (el: Element) => shadow(el).querySelector<HTMLButtonElement>("button.add-layer-btn");

let busyEvents: { busy: boolean; message?: string }[];
const onBusy = (event: Event) => busyEvents.push((event as CustomEvent).detail);

/** Bileseni (istege bagli layerManager ile) acik halde DOM'a ekler. */
async function mount(layerManager?: FakeServiceLayerManager): Promise<TucbsServiceUpload> {
  const el = document.createElement("tucbs-service-upload") as TucbsServiceUpload;
  Object.assign(el, { open: true, layerManager: layerManager as unknown as LayerManager | undefined });
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/** Dropdown'dan servis turu secer (cds-dropdown-selected olayi). */
async function selectType(el: TucbsServiceUpload, value: string) {
  shadow(el)
    .querySelector("cds-dropdown")!
    .dispatchEvent(new CustomEvent("cds-dropdown-selected", { detail: { item: { value } } }));
  await el.updateComplete;
}

/** URL kutusuna deger yazar (cds-text-input input olayi). */
async function typeUrl(el: TucbsServiceUpload, value: string) {
  const input = shadow(el).querySelector("cds-text-input") as HTMLElement & { value: string };
  input.value = value;
  input.dispatchEvent(new Event("input"));
  await el.updateComplete;
}

/** Getir butonuna basar ve kesfin bitmesini (meşgul durumunun kapanmasini) bekler. */
async function fetchCapabilities(el: TucbsServiceUpload) {
  shadow(el).querySelector<HTMLButtonElement>("button.fetch-btn")!.click();
  await vi.waitFor(() => expect(busyEvents.at(-1)?.busy).toBe(false));
  await el.updateComplete;
}

/** Verilen basliktaki katmanin checkbox'ini isaretler. */
async function check(el: TucbsServiceUpload, title: string) {
  const box = [...shadow(el).querySelectorAll(".discovered-row cds-checkbox")].find(
    (node) => node.getAttribute("title") === title,
  )!;
  box.dispatchEvent(new CustomEvent("cds-checkbox-changed", { detail: { checked: true } }));
  await el.updateComplete;
}

/** Ekle butonuna basar ve ekleme akisinin (meşgul durumunun) bitmesini bekler. */
async function addSelected(el: TucbsServiceUpload) {
  const before = busyEvents.length;
  addButton(el)!.click();
  await vi.waitFor(() => {
    expect(busyEvents.length).toBeGreaterThan(before);
    expect(busyEvents.at(-1)?.busy).toBe(false);
  });
  await el.updateComplete;
}

beforeEach(() => {
  busyEvents = [];
  document.addEventListener("tucbs-busy-changed", onBusy);
  vi.mocked(showToast).mockClear();
  vi.spyOn(Date, "now").mockReturnValue(1000);
});

afterEach(() => {
  document.removeEventListener("tucbs-busy-changed", onBusy);
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("TucbsServiceUpload servis kesfi (karakterizasyon)", () => {
  it("adres bossa istek atmadan uyarir", async () => {
    const manager = createFakeLayerManager();
    const el = await mount(manager);
    shadow(el).querySelector<HTMLButtonElement>("button.fetch-btn")!.click();
    await el.updateComplete;
    expect(errorTexts(el)).toEqual(["Servis adresi giriniz."]);
    expect(manager.getCapabilitiesDocument).not.toHaveBeenCalled();
    expect(busyEvents).toEqual([]);
  });

  it("gecersiz URL'de istek atmadan uyarir", async () => {
    const manager = createFakeLayerManager();
    const el = await mount(manager);
    await typeUrl(el, "adres-degil");
    await fetchCapabilities(el);
    expect(errorTexts(el)).toEqual(["Servis adresi geçerli bir URL değil."]);
    expect(manager.getCapabilitiesDocument).not.toHaveBeenCalled();
  });

  it("WMS: ilk surumde katman bulunca durur; sorgu dizesi atilmis taban adresle proxy yolunu kullanir", async () => {
    const manager = createFakeLayerManager(parse(WMS_XML));
    const el = await mount(manager);
    await typeUrl(el, "https://srv.test/wms?map=x&SERVICE=WMS");
    await fetchCapabilities(el);

    expect(manager.getCapabilitiesDocument.mock.calls).toEqual([["https://srv.test/wms", "WMS", "1.3.0"]]);
    expect(discoveredTitles(el)).toEqual(["Yollar", "binalar"]);
    expect(errorTexts(el)).toEqual([]);
    expect(busyEvents).toEqual([
      { busy: true, message: "Servis bilgileri getiriliyor…" },
      { busy: false, message: undefined },
    ]);
  });

  it("katman bulunamazsa sirayla tum surumleri dener, sonunda genel mesaj verir", async () => {
    const manager = createFakeLayerManager(parse(EMPTY_WMS_XML));
    const el = await mount(manager);
    await typeUrl(el, "https://srv.test/wms");
    await fetchCapabilities(el);
    expect(manager.getCapabilitiesDocument.mock.calls.map((call) => call[2])).toEqual([
      "1.3.0",
      "1.1.1",
      "1.1.0",
      "1.0.0",
    ]);
    expect(errorTexts(el)).toEqual([
      "Servis adresinden geçerli bir yanıt alınamadı.\nAdresi ve seçili servis türünü kontrol edin.",
    ]);
  });

  it("yanit baska bir servis turune aitse ilk denemede durup tur onerir", async () => {
    const manager = createFakeLayerManager(
      parse(`<WFS_Capabilities xmlns="http://www.opengis.net/wfs/2.0"><FeatureTypeList/></WFS_Capabilities>`),
    );
    const el = await mount(manager);
    await typeUrl(el, "https://srv.test/ows");
    await fetchCapabilities(el);
    expect(manager.getCapabilitiesDocument).toHaveBeenCalledTimes(1);
    expect(errorTexts(el)).toEqual([
      'Bu adres bir WFS servisi gibi görünüyor. Servis türünü "WFS" olarak değiştirip tekrar deneyin.',
    ]);
  });

  it.each([
    {
      name: "ayristirma hatasi",
      error: new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "XML bozuk"),
      message:
        "Sunucunun yanıtı geçerli bir XML olarak ayrıştırılamadı.\nAdresin doğru bir GetCapabilities uç noktası olduğundan emin olun.",
    },
    {
      name: "sunucu hatasi",
      error: new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "GetCapabilities isteği başarısız: 500 Hata"),
      message: "Sunucu bir hata döndürdü.\nGetCapabilities isteği başarısız: 500 Hata",
    },
    {
      name: "ag hatasi",
      error: new TypeError("Failed to fetch"),
      message:
        "Servis adresine ulaşılamadı.\nAdresi kontrol edin veya sunucunun CORS/erişim izinlerini doğrulayın.",
    },
  ])("tum surumler hata verirse SON hataya gore siniflandirir -- $name", async ({ error, message }) => {
    const manager = createFakeLayerManager();
    manager.getCapabilitiesDocument.mockRejectedValue(error);
    const el = await mount(manager);
    await typeUrl(el, "https://srv.test/wms");
    await fetchCapabilities(el);
    expect(manager.getCapabilitiesDocument).toHaveBeenCalledTimes(4);
    expect(errorTexts(el)).toEqual([message]);
  });

  it("onceki denemelerin hatasi degil, son denemenin hatasi gosterilir", async () => {
    const manager = createFakeLayerManager();
    manager.getCapabilitiesDocument
      .mockRejectedValueOnce(new TypeError("ag"))
      .mockRejectedValueOnce(new TypeError("ag"))
      .mockRejectedValueOnce(new TypeError("ag"))
      .mockRejectedValueOnce(new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "bozuk"));
    const el = await mount(manager);
    await typeUrl(el, "https://srv.test/wms");
    await fetchCapabilities(el);
    expect(errorTexts(el)[0]).toMatch(/^Sunucunun yanıtı geçerli bir XML/);
  });

  it("WMTS / WFS: tur secimi surum listesini ve ayristiriciyi degistirir", async () => {
    const manager = createFakeLayerManager(parse(WMTS_XML));
    const el = await mount(manager);
    await selectType(el, "WMTS");
    await typeUrl(el, "https://srv.test/wmts");
    await fetchCapabilities(el);
    expect(manager.getCapabilitiesDocument.mock.calls).toEqual([["https://srv.test/wmts", "WMTS", "1.0.0"]]);
    expect(discoveredTitles(el)).toEqual(["Orto", "notms"]);

    manager.getCapabilitiesDocument.mockResolvedValue(parse(WFS_XML));
    await selectType(el, "WFS");
    expect(discoveredTitles(el)).toEqual([]);
    await typeUrl(el, "https://srv.test/wfs");
    await fetchCapabilities(el);
    expect(manager.getCapabilitiesDocument.mock.calls.at(-1)).toEqual(["https://srv.test/wfs", "WFS", "2.0.2"]);
    expect(discoveredTitles(el)).toEqual(["İller"]);
  });

  it("WCS: kapsam zarflarini ister, eksik zarf icin uyari gosterir", async () => {
    const manager = createFakeLayerManager(parse(WCS_XML));
    manager.getWcsCoverageExtents.mockResolvedValue(
      new Map([["dem", { west: 26, south: 36, east: 45, north: 42 }]]),
    );
    const el = await mount(manager);
    await selectType(el, "WCS");
    await typeUrl(el, "https://srv.test/wcs?x=1");
    await fetchCapabilities(el);

    expect(manager.getCapabilitiesDocument.mock.calls).toEqual([["https://srv.test/wcs", "WCS", "2.1.0"]]);
    expect(manager.getWcsCoverageExtents.mock.calls).toEqual([["https://srv.test/wcs", ["dem", "slope"]]]);
    expect(discoveredTitles(el)).toEqual(["dem", "slope"]);
    expect(vi.mocked(showToast).mock.calls).toEqual([
      ["warning", "1/2 katmanın tam konumu belirlenemedi; bu katmanlar haritada geniş bir alanda görünebilir."],
    ]);
  });

  it("URL degisince onceki kesif sonucu temizlenir", async () => {
    const manager = createFakeLayerManager(parse(WMS_XML));
    const el = await mount(manager);
    await typeUrl(el, "https://srv.test/wms");
    await fetchCapabilities(el);
    expect(discoveredTitles(el)).toHaveLength(2);
    await typeUrl(el, "https://srv.test/baska");
    expect(discoveredTitles(el)).toEqual([]);
  });

  it("layerManager yoksa GetCapabilities'i dogrudan, surum parametreli URL ile ister", async () => {
    const fetchMock = vi.fn(async () => new Response(WMS_XML, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const el = await mount(undefined);
    await typeUrl(el, "https://srv.test/wms?map=x");
    await fetchCapabilities(el);
    expect(fetchMock.mock.calls).toEqual([
      ["https://srv.test/wms?map=x&SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0", undefined],
    ]);
    expect(discoveredTitles(el)).toEqual(["Yollar", "binalar"]);

    // layerManager yokken ekleme, meşgul gostergesini HIC acmadan doner.
    await check(el, "Yollar");
    const busyBefore = busyEvents.length;
    addButton(el)!.click();
    await el.updateComplete;
    expect(errorTexts(el)).toEqual(["Harita hazır değil, katman eklenemedi."]);
    expect(busyEvents.length).toBe(busyBefore);
  });
});

describe("TucbsServiceUpload katman ekleme (karakterizasyon)", () => {
  /** Verilen turde kesif yapip, istenen basliklari isaretlenmis halde dondurur. */
  async function discoverAndCheck(type: string, xml: string, titles: string[], manager = createFakeLayerManager()) {
    manager.getCapabilitiesDocument.mockResolvedValue(parse(xml));
    const el = await mount(manager);
    await selectType(el, type);
    await typeUrl(el, `https://srv.test/${type.toLowerCase()}`);
    await fetchCapabilities(el);
    for (const title of titles) await check(el, title);
    return { el, manager };
  }

  it("ekle butonu secim yokken pasif, cok secimde sayiyi gosterir", async () => {
    const { el } = await discoverAndCheck("WMS", WMS_XML, []);
    expect(addButton(el)!.disabled).toBe(true);
    expect(addButton(el)!.textContent!.trim()).toBe("Haritaya Ekle");
    await check(el, "Yollar");
    await check(el, "binalar");
    expect(addButton(el)!.textContent!.trim()).toBe("Haritaya Ekle (2)");
  });

  it("WMS: GeoTIFF formati ve cografi kutu ile ekler; basarida kapanir ve olay yayar", async () => {
    const { el, manager } = await discoverAndCheck("WMS", WMS_XML, ["Yollar"]);
    const closed = vi.fn();
    el.addEventListener("tucbs-service-upload-closed", closed);
    await addSelected(el);

    expect(manager.add.mock.calls).toEqual([
      [
        "WMS",
        {
          id: "service-yollar-1000",
          title: "Yollar",
          url: "https://srv.test/wms",
          layers: "yollar",
          tiffFormat: "image/geotiff",
          geographicBoundingBox: { west: 26, south: 36, east: 45, north: 42 },
        },
      ],
    ]);
    expect(closed).toHaveBeenCalledTimes(1);
    expect(el.open).toBe(false);
    expect(busyEvents.slice(-2)).toEqual([
      { busy: true, message: "Katmanlar ekleniyor…" },
      { busy: false, message: undefined },
    ]);
  });

  it("WMTS: TileMatrixSet ile ekler; TileMatrixSet'i olmayan katman hata verir ve secili kalir", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { el, manager } = await discoverAndCheck("WMTS", WMTS_XML, ["Orto", "notms"]);
    await addSelected(el);

    expect(manager.add.mock.calls).toEqual([
      [
        "WMTS",
        { id: "service-orto-1000", title: "Orto", url: "https://srv.test/wmts", layer: "orto", tileMatrixSetID: "EPSG:3857" },
      ],
    ]);
    expect(errorTexts(el)).toEqual(['"notms" eklenemedi: Bu katman için TileMatrixSet bilgisi bulunamadı.']);
    expect(addButton(el)!.textContent!.trim()).toBe("Haritaya Ekle");
    expect(el.open).toBe(true);
    const expected = new LayerOperationError("LAYER_WMTS_TILEMATRIXSET_MISSING", "x");
    expect(errorSpy).toHaveBeenCalledWith(
      `[tucbs-service-upload] LAYER_WMTS_TILEMATRIXSET_MISSING (${expected.number}): Bu katman için TileMatrixSet bilgisi bulunamadı.`,
    );
  });

  it("WFS: ekleme suresince kirpilma olayini dinler, yalnizca kendi katmani icin uyari gosterir", async () => {
    const manager = createFakeLayerManager();
    manager.add.mockImplementation(async (_type: string, options: { id: string }) => {
      manager.emit("layer:features-truncated", { id: "baska", totalCount: 9, loadedCount: 1 });
      manager.emit("layer:features-truncated", { id: options.id, totalCount: 5000, loadedCount: 1000 });
    });
    const { el } = await discoverAndCheck("WFS", WFS_XML, ["İller"], manager);
    await addSelected(el);

    expect(manager.add.mock.calls).toEqual([
      ["WFS", { id: "service-ns:iller-1000", title: "İller", url: "https://srv.test/wfs", typeName: "ns:iller" }],
    ]);
    expect(vi.mocked(showToast).mock.calls).toEqual([
      ["warning", "5000 özellikten sadece 1000 tanesi yüklendi; tamamı için filtre uygulayın."],
    ]);
    expect(manager.on.mock.calls.map((call) => call[0])).toEqual(["layer:features-truncated"]);
    expect(manager.off.mock.calls.map((call) => call[0])).toEqual(["layer:features-truncated"]);
    expect(manager.off.mock.calls[0]![1]).toBe(manager.on.mock.calls[0]![1]);
  });

  it("WCS: zarfi olan kapsama dikdortgen ekler, olmayana eklemez; TIFF formatini gecirir", async () => {
    const manager = createFakeLayerManager();
    manager.getWcsCoverageExtents.mockResolvedValue(
      new Map([["dem", { west: 26, south: 36, east: 45, north: 42 }]]),
    );
    const { el } = await discoverAndCheck("WCS", WCS_XML, ["dem", "slope"], manager);
    await addSelected(el);

    const [demCall, slopeCall] = manager.add.mock.calls;
    expect(demCall![0]).toBe("WCS");
    expect(demCall![1]).toMatchObject({
      id: "service-dem-1000",
      title: "dem",
      url: "https://srv.test/wcs",
      coverageId: "dem",
      tiffFormat: "image/tiff",
    });
    expect(demCall![1].rectangle).toBeDefined();
    expect(slopeCall![1]).toEqual({
      id: "service-slope-1000",
      title: "slope",
      url: "https://srv.test/wcs",
      coverageId: "slope",
      tiffFormat: "image/tiff",
    });
  });

  it("birden cok katman eklenemezse sayili toplu mesaj verir; Tucbs olmayan hata ham loglanir", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const manager = createFakeLayerManager();
    const raw = new Error("sunucu reddetti");
    manager.add.mockRejectedValue(raw);
    const { el } = await discoverAndCheck("WMS", WMS_XML, ["Yollar", "binalar"], manager);
    await addSelected(el);
    expect(errorTexts(el)).toEqual(["2/2 katman eklenemedi:\n• Yollar: sunucu reddetti\n• binalar: sunucu reddetti"]);
    expect(errorSpy).toHaveBeenCalledWith(raw);
    expect(addButton(el)!.textContent!.trim()).toBe("Haritaya Ekle (2)");
  });
});

describe("TucbsServiceUpload onizleme (karakterizasyon)", () => {
  it("onizleme dugmesi tur bazinda layerOptions uretir; ikinci basis kapatir", async () => {
    const manager = createFakeLayerManager(parse(WMTS_XML));
    const el = await mount(manager);
    await selectType(el, "WMTS");
    await typeUrl(el, "https://srv.test/wmts");
    await fetchCapabilities(el);

    const preview = document.querySelector("tucbs-map-preview") as HTMLElement & { layerOptions: unknown };
    expect(preview).not.toBeNull();
    const toggles = () => [...shadow(el).querySelectorAll<HTMLButtonElement>(".preview-toggle-btn")];

    toggles()[0]!.click();
    await el.updateComplete;
    expect(preview.layerOptions).toEqual({
      layerType: "WMTS",
      options: {
        id: "service-upload-preview-orto",
        title: "Orto",
        url: "https://srv.test/wmts",
        layer: "orto",
        tileMatrixSetID: "EPSG:3857",
      },
    });
    expect(toggles()[0]!.getAttribute("aria-pressed")).toBe("true");

    toggles()[1]!.click();
    await el.updateComplete;
    expect(preview.layerOptions).toBeUndefined();

    toggles()[1]!.click();
    await el.updateComplete;
    expect(preview.layerOptions).toBeUndefined();
    expect(toggles()[1]!.getAttribute("aria-pressed")).toBe("false");
  });

  it("WCS onizlemesi zarf varsa dikdortgen icerir", async () => {
    const manager = createFakeLayerManager(parse(WCS_XML));
    manager.getWcsCoverageExtents.mockResolvedValue(
      new Map([["dem", { west: 26, south: 36, east: 45, north: 42 }]]),
    );
    const el = await mount(manager);
    await selectType(el, "WCS");
    await typeUrl(el, "https://srv.test/wcs");
    await fetchCapabilities(el);
    shadow(el).querySelector<HTMLButtonElement>(".preview-toggle-btn")!.click();
    await el.updateComplete;
    const preview = document.querySelector("tucbs-map-preview") as HTMLElement & {
      layerOptions: { layerType: string; options: Record<string, unknown> };
    };
    expect(preview.layerOptions.layerType).toBe("WCS");
    expect(preview.layerOptions.options).toMatchObject({ id: "service-upload-preview-dem", coverageId: "dem" });
    expect(preview.layerOptions.options.rectangle).toBeDefined();
  });

  it.each([["WMS"], ["WFS"]])("%s onizleme spesifikasyonu", async (type) => {
    const xml = type === "WMS" ? WMS_XML : WFS_XML;
    const manager = createFakeLayerManager(parse(xml));
    const el = await mount(manager);
    await selectType(el, type);
    await typeUrl(el, `https://srv.test/${type.toLowerCase()}`);
    await fetchCapabilities(el);
    shadow(el).querySelector<HTMLButtonElement>(".preview-toggle-btn")!.click();
    await el.updateComplete;
    const preview = document.querySelector("tucbs-map-preview") as HTMLElement & { layerOptions: unknown };
    const expected: Record<string, unknown> = {
      WMS: {
        layerType: "WMS",
        options: { id: "service-upload-preview-yollar", title: "Yollar", url: "https://srv.test/wms", layers: "yollar" },
      },
      WFS: {
        layerType: "WFS",
        options: { id: "service-upload-preview-ns:iller", title: "İller", url: "https://srv.test/wfs", typeName: "ns:iller" },
      },
    };
    expect(preview.layerOptions).toEqual(expected[type]);
  });
});

// Gercek hatalar plani H2.1: kesif istegi surerken kullanici formu
// degistirirse ne oldugunu dondurur. Global mesgul overlay'i yalnizca fareyi
// kilitler; klavyeyle (Tab + yazma/secme) URL, servis turu ve "sifirla"
// hala degistirilebilir, bilesen de DOM'dan kaldirilabilir. H2.1'de eski
// yanitin yeni forma yazildigi "BILINEN:" olarak donduruldu; H2.2'de
// duzeltildi (bkz TucbsServiceUpload._discoveryGeneration): eski yanit yok
// sayilir, kalan surumler denenmez. Mesgul gostergesi her durumda kapanir.
describe("TucbsServiceUpload kesif surerken form degisimi (karakterizasyon -- H2.1)", () => {
  /** Disaridan cozulup reddedilebilen bir Promise. */
  function deferred<T>() {
    let resolve!: (value: T) => void;
    let reject!: (error: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }

  /** Ilk GetCapabilities istegi bekletilmis bir kesif baslatir (bitmesini beklemez). */
  async function startPendingDiscovery(type = "WMS") {
    const manager = createFakeLayerManager();
    const pending = deferred<Document>();
    manager.getCapabilitiesDocument.mockReturnValueOnce(pending.promise);
    const el = await mount(manager);
    if (type !== "WMS") await selectType(el, type);
    await typeUrl(el, `https://srv.test/${type.toLowerCase()}`);
    shadow(el).querySelector<HTMLButtonElement>("button.fetch-btn")!.click();
    await el.updateComplete;
    expect(manager.getCapabilitiesDocument).toHaveBeenCalledTimes(1);
    expect(busyEvents).toEqual([{ busy: true, message: "Servis bilgileri getiriliyor…" }]);
    return { el, manager, pending };
  }

  /** Mesgul gostergesinin kapanmasini bekler ve acilis/kapanislarin dengeli oldugunu dogrular. */
  async function waitDiscoveryEnd(el: TucbsServiceUpload) {
    await vi.waitFor(() => expect(busyEvents.at(-1)?.busy).toBe(false));
    await el.updateComplete;
    expect(busyEvents.filter((event) => event.busy)).toHaveLength(1);
    expect(busyEvents.filter((event) => !event.busy)).toHaveLength(1);
  }

  const urlValue = (el: Element) => (shadow(el).querySelector("cds-text-input") as HTMLElement & { value: string }).value;

  it("istek surerken getir butonu pasiftir; bitince tekrar aktif olur", async () => {
    const { el, pending } = await startPendingDiscovery();
    const fetchButton = shadow(el).querySelector<HTMLButtonElement>("button.fetch-btn")!;
    expect(fetchButton.disabled).toBe(true);
    pending.resolve(parse(WMS_XML));
    await waitDiscoveryEnd(el);
    expect(fetchButton.disabled).toBe(false);
  });

  it("istek surerken URL degistirilirse eski adresin yaniti yok sayilir", async () => {
    const { el, pending } = await startPendingDiscovery();
    await typeUrl(el, "https://srv.test/baska");
    expect(discoveredTitles(el)).toEqual([]);

    pending.resolve(parse(WMS_XML));
    await waitDiscoveryEnd(el);
    expect(urlValue(el)).toBe("https://srv.test/baska");
    expect(discoveredTitles(el)).toEqual([]);
    expect(errorTexts(el)).toEqual([]);
  });

  it("istek surerken sifirla'ya basilirsa eski yanit bos forma yazilmaz", async () => {
    const { el, pending } = await startPendingDiscovery();
    shadow(el).querySelector<HTMLButtonElement>("button.reset-btn")!.click();
    await el.updateComplete;
    expect(urlValue(el)).toBe("");

    pending.resolve(parse(WMS_XML));
    await waitDiscoveryEnd(el);
    expect(urlValue(el)).toBe("");
    expect(discoveredTitles(el)).toEqual([]);
  });

  it("istek surerken tur degistirilirse eski yanit yeni turun ayristiricisiyla okunmaz, hata yazilmaz", async () => {
    const { el, pending } = await startPendingDiscovery();
    await selectType(el, "WFS");
    expect(urlValue(el)).toBe("");

    pending.resolve(parse(WMS_XML));
    await waitDiscoveryEnd(el);
    expect(discoveredTitles(el)).toEqual([]);
    expect(errorTexts(el)).toEqual([]);
  });

  it("URL degistikten sonra eski adresin kalan surumleri denenmez, hatasi gosterilmez", async () => {
    const { el, manager, pending } = await startPendingDiscovery();
    manager.getCapabilitiesDocument.mockRejectedValue(new TypeError("Failed to fetch"));
    await typeUrl(el, "https://srv.test/baska");

    pending.reject(new TypeError("Failed to fetch"));
    await waitDiscoveryEnd(el);
    expect(manager.getCapabilitiesDocument.mock.calls).toEqual([["https://srv.test/wms", "WMS", "1.3.0"]]);
    expect(urlValue(el)).toBe("https://srv.test/baska");
    expect(errorTexts(el)).toEqual([]);
  });

  it("bilesen istek surerken DOM'dan kaldirilirsa WCS kesfi durur; zarf istegi atilmaz, uyari gosterilmez", async () => {
    const { el, manager, pending } = await startPendingDiscovery("WCS");
    manager.getWcsCoverageExtents.mockResolvedValue(new Map([["dem", { west: 26, south: 36, east: 45, north: 42 }]]));
    el.remove();

    pending.resolve(parse(WCS_XML));
    await waitDiscoveryEnd(el);
    expect(manager.getWcsCoverageExtents).not.toHaveBeenCalled();
    expect(showToast).not.toHaveBeenCalled();
  });

  it("WCS zarf istegi surerken URL degisirse zarflar uygulanmaz, uyari gosterilmez", async () => {
    const manager = createFakeLayerManager(parse(WCS_XML));
    const extents = deferred<Map<string, unknown>>();
    manager.getWcsCoverageExtents.mockReturnValueOnce(extents.promise);
    const el = await mount(manager);
    await selectType(el, "WCS");
    await typeUrl(el, "https://srv.test/wcs");
    shadow(el).querySelector<HTMLButtonElement>("button.fetch-btn")!.click();
    await vi.waitFor(() => expect(manager.getWcsCoverageExtents).toHaveBeenCalledTimes(1));
    await typeUrl(el, "https://srv.test/baska");

    extents.resolve(new Map([["dem", { west: 26, south: 36, east: 45, north: 42 }]]));
    await waitDiscoveryEnd(el);
    expect(discoveredTitles(el)).toEqual([]);
    expect(showToast).not.toHaveBeenCalled();
  });
});
