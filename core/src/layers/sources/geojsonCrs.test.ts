// ensureGeoJsonCrsSupport'un complexity duzeltmesinden (21/20 esik asimi --
// bkz project_ucbp_api_eslint_uyari_backlog_20260929) ONCE yazilan
// karakterizasyon testleri -- bu modulun Map.ts'ten FARKLI olarak Cesium
// Viewer/WebGL bagimliligi YOK (sadece Cartesian3/GeoJsonDataSource, ikisi
// de WebGL'siz insa edilebilir), bu yuzden karakterizasyon-once kurali
// TERS CEVRILMEDEN (normal sirayla: once test, sonra refactor) uygulanir.
//
// Modul-seviyesi iki paylasilan cache (proj4DefRequests Map'i VE Cesium'un
// GeoJsonDataSource.crsNames statik tablosu) testler ARASI sizmasin diye
// HER test kendi BENZERSIZ crs anahtarini/EPSG kodunu kullanir.
import { afterEach, describe, expect, it, vi } from "vitest";
import { GeoJsonDataSource } from "cesium";
import { ensureGeoJsonCrsSupport } from "./geojsonCrs.js";
import { ensureProj4Def } from "../ogc/proj4Defs.js";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ensureGeoJsonCrsSupport", () => {
  it("geojson bir obje degilse (null/string) null doner", async () => {
    await expect(ensureGeoJsonCrsSupport(null)).resolves.toBeNull();
    await expect(ensureGeoJsonCrsSupport("not-an-object")).resolves.toBeNull();
  });

  it("crs alani yok + koordinatlar gecerli WGS84 araliginda ise null doner (throw yok)", async () => {
    const result = await ensureGeoJsonCrsSupport({ type: "Point", coordinates: [30, 40] });
    expect(result).toBeNull();
  });

  it("crs alani yok + koordinatlar GECERSIZ araliktaysa CRS_MISSING_UNSUPPORTED firlatir", async () => {
    await expect(
      ensureGeoJsonCrsSupport({ type: "Point", coordinates: [500000, 4400000] }),
    ).rejects.toMatchObject({ code: "CRS_MISSING_UNSUPPORTED" });
  });

  it("crs var ama properties.name/code cikartilamiyorsa (bos obje) sessizce null doner", async () => {
    const result = await ensureGeoJsonCrsSupport({
      type: "Point",
      coordinates: [30, 40],
      crs: {},
    });
    expect(result).toBeNull();
  });

  it("Cesium'un 3 sabit builtin CRS yazimindan biri + gecerli koordinat -> null doner, crsNames'e KAYIT YAPILMAZ", async () => {
    delete (GeoJsonDataSource.crsNames as Record<string, unknown>)["EPSG:4326"];
    const result = await ensureGeoJsonCrsSupport({
      type: "Point",
      coordinates: [30, 40],
      crs: { type: "name", properties: { name: "EPSG:4326" } },
    });
    expect(result).toBeNull();
    // shouldRegister=false (Cesium'un kendi 3 sabit yazimindan biri, zaten
    // native destekleniyor) -- BIZ defaultCrsFunction eklemedik, tablo BOS kalir.
    expect(GeoJsonDataSource.crsNames["EPSG:4326"]).toBeUndefined();
  });

  it("builtin CRS + GECERSIZ koordinat -> CRS_CLAIMED_WGS84_INVALID firlatir", async () => {
    await expect(
      ensureGeoJsonCrsSupport({
        type: "Point",
        coordinates: [500000, 4400000],
        crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::4326" } },
      }),
    ).rejects.toMatchObject({ code: "CRS_CLAIMED_WGS84_INVALID" });
  });

  it("EPSG kodu cikartilamayan bilinmeyen crs adi + gecerli koordinat -> suspicious-unresolved-crs doner VE crsNames'e kayit yapilir", async () => {
    // "EPSG" gecmeli (extractEpsgCode'un ilk kontrolu) ama SONU rakamla
    // BITMEMELI (aksi halde extractEpsgCode o rakami epsgCode SANIR).
    const key = "EPSG:Belirsiz";
    const result = await ensureGeoJsonCrsSupport({
      type: "Point",
      coordinates: [30, 40],
      crs: { type: "name", properties: { name: key } },
    });
    expect(result).toEqual({ kind: "suspicious-unresolved-crs", crsName: key });
    expect(typeof GeoJsonDataSource.crsNames[key]).toBe("function");
  });

  it("ayni durum (cikartilamayan EPSG) + GECERSIZ koordinat -> CRS_UNRESOLVED_UNSUPPORTED firlatir", async () => {
    const key = "EPSG:BelirsizYok";
    await expect(
      ensureGeoJsonCrsSupport({
        type: "Point",
        coordinates: [500000, 4400000],
        crs: { type: "name", properties: { name: key } },
      }),
    ).rejects.toMatchObject({ code: "CRS_UNRESOLVED_UNSUPPORTED" });
  });

  it("standart-disi bir yazimla (tam URL) WGS84 belirtilmis (epsgCode==='4326' ama Cesium'un 3 sabitinden BIRI DEGIL) -> null doner VE crsNames'e KAYIT YAPILIR (shouldRegister=true)", async () => {
    // "EPSG:4326" / "urn:ogc:def:crs:EPSG::4326" / "urn:ogc:def:crs:OGC:1.3:CRS84"
    // DISINDA, ama extractEpsgCode'un YINE DE "4326" cikardigi bir yazim --
    // bu yuzden CESIUM_BUILTIN_CRS_NAMES kontrolunu GECER, sonraki
    // "epsgCode==='4326'" dalina duser (bkz kod yorumu: "Standart-disi bir
    // yazimla... WGS84 belirtilmis").
    const key = "http://www.opengis.net/def/crs/EPSG/0/4326";
    delete (GeoJsonDataSource.crsNames as Record<string, unknown>)[key];
    const result = await ensureGeoJsonCrsSupport({
      type: "Point",
      coordinates: [30, 40],
      crs: { type: "name", properties: { name: key } },
    });
    expect(result).toBeNull();
    expect(typeof GeoJsonDataSource.crsNames[key]).toBe("function");
  });

  it("deprecated 'EPSG' tipi + code SAYISAL DEGIL -> epsgCode cikartilamaz, suspicious-unresolved-crs yoluna duser (crsName=key, key='EPSG:<ham-deger>')", async () => {
    const result = await ensureGeoJsonCrsSupport({
      type: "Point",
      coordinates: [30, 40],
      crs: { type: "EPSG", properties: { code: "Tanımsız" } },
    });
    expect(result).toEqual({ kind: "suspicious-unresolved-crs", crsName: "EPSG:Tanımsız" });
  });

  it("deprecated 'EPSG' tipi + gercek sayisal kod (numericCodeString yolu, epsg.io basarili) -> reprojected doner", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        expect(url).toBe("https://epsg.io/23036.proj4");
        return {
          ok: true,
          text: async () =>
            "+proj=utm +zone=36 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs",
        };
      }),
    );

    const result = await ensureGeoJsonCrsSupport({
      type: "Point",
      coordinates: [30, 40],
      crs: { type: "EPSG", properties: { code: 23036 } },
    });

    expect(result).toEqual({ kind: "reprojected", fromEpsg: "EPSG:23036" });
  });

  it("gercek/cozulen bir EPSG kodu (epsg.io basarili yanit) -> reprojected doner VE crsNames'e gercek donusum fonksiyonu kaydedilir", async () => {
    const key = "urn:ogc:def:crs:EPSG::23035";
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        expect(url).toBe("https://epsg.io/23035.proj4");
        return {
          ok: true,
          text: async () =>
            "+proj=utm +zone=35 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs",
        };
      }),
    );

    const result = await ensureGeoJsonCrsSupport({
      type: "Point",
      coordinates: [30, 40],
      crs: { type: "name", properties: { name: key } },
    });

    expect(result).toEqual({ kind: "reprojected", fromEpsg: "EPSG:23035" });
    const registered = GeoJsonDataSource.crsNames[key];
    expect(typeof registered).toBe("function");
    const cartesian = registered!([500000, 4400000, 0]);
    expect(Number.isFinite(cartesian.x)).toBe(true);
    expect(Number.isFinite(cartesian.y)).toBe(true);
    expect(Number.isFinite(cartesian.z)).toBe(true);
  });

  it("epsg.io basarisiz yanit donerse (404) suspicious-unresolved-crs yoluna duser", async () => {
    const key = "urn:ogc:def:crs:EPSG::999901";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 404 })),
    );

    const result = await ensureGeoJsonCrsSupport({
      type: "Point",
      coordinates: [30, 40],
      crs: { type: "name", properties: { name: key } },
    });

    expect(result).toEqual({ kind: "suspicious-unresolved-crs", crsName: "EPSG:999901" });
  });

  it("proj4 paketi hic yuklu degilse (dinamik import basarisiz) suspicious-unresolved-crs yoluna duser", async () => {
    vi.doMock("proj4", () => {
      throw new Error("proj4 modulu bulunamadi (simule edilmis)");
    });
    vi.resetModules();
    const { ensureGeoJsonCrsSupport: ensureWithoutProj4 } = await import("./geojsonCrs.js");

    const key = "urn:ogc:def:crs:EPSG::999902";
    const result = await ensureWithoutProj4({
      type: "Point",
      coordinates: [30, 40],
      crs: { type: "name", properties: { name: key } },
    });

    // Bu asamada crsName ARTIK "fromEpsg" formatindadir (ham key DEGIL) --
    // epsgCode basariyla cikarildiktan SONRA (proj4 import'u BURADA basarisiz
    // oluyor), bkz kod: resolveOrRejectUnresolvedCrs(key, fromEpsg, ...).
    expect(result).toEqual({ kind: "suspicious-unresolved-crs", crsName: "EPSG:999902" });

    vi.doUnmock("proj4");
    vi.resetModules();
  });
});

// Gercek hatalar planı H1.1 -- epsg.io isteginin cache davranisi. H1.2'de
// ogc/proj4Defs.ts ile birlestirildi, H1.3'te gecici hatalarin kalici
// cache'lenmesi duzeltildi (404/bos tanim cache'te kalir).
describe("ensureGeoJsonCrsSupport -- epsg.io istek cache'i (karakterizasyon)", () => {
  const UTM35_DEF = "+proj=utm +zone=35 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs";
  const pointWithCrs = (code: string) => ({
    type: "Point",
    coordinates: [30, 40],
    crs: { type: "name", properties: { name: `urn:ogc:def:crs:EPSG::${code}` } },
  });

  // H1.3 DUZELTMESI: eskiden gecici bir ag hatasiyla basarisiz olan istegin
  // `false` sonucu kalici cache'leniyordu ("BILINEN" testi) -- ayni EPSG
  // kodlu sonraki GeoJSON/WFS/SHP katmanlari da cozulemeyen CRS yoluna
  // dusuyordu. Artik bir sonraki katman tekrar dener ve dogru donusturulur.
  it("ag hatasiyla basarisiz olan EPSG istegi bir sonraki katmanda tekrar denenir", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValue({ ok: true, text: async () => UTM35_DEF });
    vi.stubGlobal("fetch", fetchMock);

    expect(await ensureGeoJsonCrsSupport(pointWithCrs("999811"))).toEqual({
      kind: "suspicious-unresolved-crs",
      crsName: "EPSG:999811",
    });
    expect(await ensureGeoJsonCrsSupport(pointWithCrs("999811"))).toEqual({
      kind: "reprojected",
      fromEpsg: "EPSG:999811",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("404 ile basarisiz olan EPSG istegi ayni oturumda tekrar denenmez", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValue({ ok: true, text: async () => UTM35_DEF });
    vi.stubGlobal("fetch", fetchMock);

    const unresolved = { kind: "suspicious-unresolved-crs", crsName: "EPSG:999812" };
    expect(await ensureGeoJsonCrsSupport(pointWithCrs("999812"))).toEqual(unresolved);
    expect(await ensureGeoJsonCrsSupport(pointWithCrs("999812"))).toEqual(unresolved);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  // H1.2: geojsonCrs ile ogc/proj4Defs artik AYNI cache'i paylasiyor
  // (registerProj4Def) -- eskiden ayni EPSG kodu icin WCS ve GeoJSON yollari
  // ayri ayri epsg.io'ya istek atiyordu ("BILINEN" testi).
  it("ogc/proj4Defs ile ortak cache kullanir; ayni kod icin tek istek gider", async () => {
    const fetchMock = vi.fn(async () => ({ ok: false, status: 404 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "warn").mockImplementation(() => {});

    await ensureProj4Def("999813");
    await ensureGeoJsonCrsSupport(pointWithCrs("999813"));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
