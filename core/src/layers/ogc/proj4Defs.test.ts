// KARAKTERIZASYON TESTLERI -- Gercek hatalar planı H1.1: ogc/proj4Defs.ts'in
// (WCS DescribeCoverage zarflarinin projekli CRS donusumu) MEVCUT
// davranisini dondurur; H1.2'de layers/sources/geojsonCrs.ts'teki kopyasiyla
// birlestirildi (H1.2), H1.3'te gecici hatayla basarisiz EPSG isteginin
// kalici cache'lenmesi duzeltildi (404/bos tanim cache'te kalir).
//
// Modul-seviyesi paylasilan cache (proj4DefRequests Map'i VE proj4'un kendi
// defs() tablosu) testler ARASI sizmasin diye HER test kendi BENZERSIZ EPSG
// kodunu kullanir (bkz geojsonCrs.test.ts'teki ayni yaklasim).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ensureProj4Def, extractEpsgCode, registerProj4Def, type Proj4 } from "./proj4Defs.js";

const UTM35_DEF = "+proj=utm +zone=35 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs";

/** proj4Defs'in "tanim alinamadi" uyarisinin birebir metni. */
const fetchFailedWarning = (code: string) =>
  `[ogc/proj4Defs] EPSG:${code} icin proj4 tanimi epsg.io'dan alinamadi ` +
  `(agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.`;

let warnSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("extractEpsgCode (ogc/proj4Defs.ts)", () => {
  it("URL, URN ve duz EPSG yazimlarindan sondaki kodu cikarir", () => {
    expect(extractEpsgCode("http://www.opengis.net/def/crs/EPSG/0/2056")).toBe("2056");
    expect(extractEpsgCode("urn:ogc:def:crs:EPSG::2056")).toBe("2056");
    expect(extractEpsgCode(" EPSG:2056 ")).toBe("2056");
  });

  it("EPSG gecmiyorsa ya da sonda rakam yoksa undefined doner", () => {
    expect(extractEpsgCode("urn:ogc:def:crs:OGC:1.3:CRS84")).toBeUndefined();
    expect(extractEpsgCode("EPSG:Tanımsız")).toBeUndefined();
  });
});

describe("ensureProj4Def (ogc/proj4Defs.ts)", () => {
  it("epsg.io basarili yanitta tanimi kaydeder, proj4'u dondurur; ikinci cagri istek atmaz", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, text: async () => UTM35_DEF }));
    vi.stubGlobal("fetch", fetchMock);

    const proj4 = await ensureProj4Def("999801");
    expect(proj4).toBeDefined();
    expect(fetchMock).toHaveBeenCalledWith("https://epsg.io/999801.proj4");
    expect(proj4!.defs("EPSG:999801")).toBeDefined();

    expect(await ensureProj4Def("999801")).toBe(proj4);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("epsg.io 404 donerse undefined doner ve birebir metinle uyarir", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 404 })));
    expect(await ensureProj4Def("999802")).toBeUndefined();
    expect(warnSpy.mock.calls).toEqual([[fetchFailedWarning("999802")]]);
  });

  it("epsg.io bos tanim donerse undefined doner", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, text: async () => "  " })));
    expect(await ensureProj4Def("999803")).toBeUndefined();
  });

  // H1.3 DUZELTMESI: eskiden gecici bir ag hatasiyla basarisiz olan istegin
  // `false` sonucu kalici cache'leniyordu ("BILINEN" testi) -- artik bir
  // sonraki cagrida tekrar denenir.
  it("ag hatasiyla basarisiz olan EPSG istegi bir sonraki cagrida tekrar denenir", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValue({ ok: true, text: async () => UTM35_DEF });
    vi.stubGlobal("fetch", fetchMock);

    expect(await ensureProj4Def("999804")).toBeUndefined();
    const proj4 = await ensureProj4Def("999804");
    expect(proj4).toBeDefined();
    expect(proj4!.defs("EPSG:999804")).toBeDefined();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it.each([500, 503, 429])("HTTP %i (gecici) ile basarisiz olan istek bir sonraki cagrida tekrar denenir", async (status) => {
    const code = `99981${status}`;
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status })
      .mockResolvedValue({ ok: true, text: async () => UTM35_DEF });
    vi.stubGlobal("fetch", fetchMock);

    expect(await ensureProj4Def(code)).toBeUndefined();
    expect(await ensureProj4Def(code)).toBeDefined();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("registerProj4Def: es zamanli cagrilar ayni istegi paylasir; gecici hatadan sonraki cagri tekrar dener", async () => {
    const { default: proj4 } = (await import("proj4")) as unknown as { default: Proj4 };
    let rejectFirst!: (error: Error) => void;
    const fetchMock = vi
      .fn()
      .mockImplementationOnce(() => new Promise((_resolve, reject) => (rejectFirst = reject)))
      .mockResolvedValue({ ok: true, text: async () => UTM35_DEF });
    vi.stubGlobal("fetch", fetchMock);

    const first = registerProj4Def(proj4, "999807");
    const second = registerProj4Def(proj4, "999807");
    rejectFirst(new TypeError("Failed to fetch"));
    expect(await Promise.all([first, second])).toEqual([false, false]);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(await registerProj4Def(proj4, "999807")).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("404 ile basarisiz olan EPSG istegi ayni oturumda tekrar denenmez", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValue({ ok: true, text: async () => UTM35_DEF });
    vi.stubGlobal("fetch", fetchMock);

    expect(await ensureProj4Def("999805")).toBeUndefined();
    expect(await ensureProj4Def("999805")).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("proj4 paketi yuklu degilse istek atmadan undefined doner ve birebir metinle uyarir", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.doMock("proj4", () => {
      throw new Error("proj4 modulu bulunamadi (simule edilmis)");
    });
    vi.resetModules();
    const { ensureProj4Def: ensureWithoutProj4 } = await import("./proj4Defs.js");

    expect(await ensureWithoutProj4("999806")).toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(warnSpy.mock.calls).toEqual([
      [
        `[ogc/proj4Defs] EPSG:999806 icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil ` +
          `(peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.`,
      ],
    ]);

    vi.doUnmock("proj4");
    vi.resetModules();
  });
});
