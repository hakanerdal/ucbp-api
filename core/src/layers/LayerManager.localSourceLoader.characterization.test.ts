// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Adim 7 (layers/sources/LocalSourceLoader.ts)
// ONCESI addLocalKmlGeoJson/addShp/addCsv/detectLatLonKeys/fileToText/
// fileToBlobUrl/fileToArrayBuffer/decodeTextBuffer'in MEVCUT davranisini
// dondurur (bkz project_ucbp_api_god_component_refactor_kurallari, madde 1).
// LayerManager.ts'e TEK SATIR bile dokunmadan yazildi.
//
// ESKIDEN detectLatLonKeys/fileToText/fileToBlobUrl/fileToArrayBuffer
// LayerManager'daki private delegeler uzerinden (layerManager as unknown as
// {...}) cagriliyordu; tasima sonrasi bu delegeler yalnizca bu testler icin
// duruyordu. Artik dogrudan bir LocalSourceLoader orneginde cagrilir (bkz
// docs/gelistirme/ADR-001-LayerManager-facade.md, "Bilinen artiklar").
//
// Gercek ornek dosyalar kullanilir (bkz kullanici talebi, 2026-09-28):
// kaynak kullanicinin api-demo-dosyalar klasoru; kucuk olanlar 2026-10-06'da
// __tests__/fixtures/local-sources/ altina ALINDI (testler her makinede/CI'da
// calissin diye). KMZ.kmz (2.6 MB) repoya alinmadi -- onu kullanan TEK test
// TUCBS_KMZ_FIXTURE ortam degiskeni (dosya yolu) verilmezse atlanir.
// shpjs/papaparse gercek paketlerdir, mock'lanmaz. KML/KMZ'nin TAM addLocalKmlGeoJson akisi
// (KmlDataSource.load(blob:...)) jsdom'da guvenilir test edilemiyor (jsdom
// blob: URL fetch/decode desteklemiyor -- Adim 6/WCS'teki AYNI kisit,
// bkz project_ucbp_api_layerexporter_uygulama_plani); bu yuzden KML/KMZ
// icin SADECE alt-seviye saf yardimcilar (fileToBlobUrl/fileToText/
// fileToArrayBuffer/decodeTextBuffer) test edilir, TAM akis Faz 4'un
// Playwright turuna birakilir.
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LayerManager } from "./LayerManager.js";
import { LocalSourceLoader, type LocalSourceLoaderDeps } from "./sources/LocalSourceLoader.js";
import { createFakeViewer } from "../__tests__/fixtures/fakeViewer.js";
import { LayerOperationError } from "../shared/TucbsError.js";

// jsdom ortaminda import.meta.url "file:" semali degil -- yol __dirname ile cozulur.
const FIXTURE_DIR = resolve(__dirname, "../__tests__/fixtures/local-sources");
/** Repoda olmayan KMZ.kmz'nin tam yolu; verilmezse KMZ testi atlanir. */
const KMZ_FIXTURE = process.env.TUCBS_KMZ_FIXTURE;

// detectLatLonKeys/fileToText/fileToBlobUrl/fileToArrayBuffer ne viewer'a ne
// deps'e dokunur -- bu yuzden bos bir deps nesnesiyle kurulmus ornek yeterli.
function createLoader(): LocalSourceLoader {
  return new LocalSourceLoader(createFakeViewer(), {} as LocalSourceLoaderDeps);
}

function readFixtureFile(name: string, mimeType: string): File {
  const buffer = readFileSync(resolve(FIXTURE_DIR, name));
  return new File([buffer], name, { type: mimeType });
}

describe("LocalSourceLoader adaylari (Adim 7 Faz 1 karakterizasyonu)", () => {
  let layerManager: LayerManager;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    layerManager = new LayerManager(createFakeViewer());
    fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      throw new Error("beklenmeyen fetch cagrisi: " + String(input));
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("addLocalKmlGeoJson (GEOJSON dali)", () => {
    it("gercek bir GeoJSON dosyasini (isikli_wgs84.geojson, 919 Polygon feature, " +
      "crs alani YOK) File olarak fetch tetiklemeden ekler; CRS temiz oldugu " +
      "icin layer:crs-reprojected/layer:crs-unresolved YAYINLANMAZ", async () => {
      const file = readFixtureFile("isikli_wgs84.geojson", "application/geo+json");
      const onCrsReprojected = vi.fn();
      const onCrsUnresolved = vi.fn();
      layerManager.on("layer:crs-reprojected", onCrsReprojected);
      layerManager.on("layer:crs-unresolved", onCrsUnresolved);

      const managed = await layerManager.add("GEOJSON", {
        id: "isikli-geojson",
        title: "Işıklı",
        layerType: "GEOJSON",
        data: file,
        clampToGround: false,
      });

      expect(fetchMock).not.toHaveBeenCalled();
      expect(managed.layerType).toBe("GEOJSON");
      expect(managed.initialFillColor).toMatch(/^#[0-9a-f]{6}$/i);
      expect("entities" in managed.cesiumObject).toBe(true);
      if ("entities" in managed.cesiumObject) {
        expect(managed.cesiumObject.entities.values.length).toBe(919);
      }
      expect(onCrsReprojected).not.toHaveBeenCalled();
      expect(onCrsUnresolved).not.toHaveBeenCalled();
    });

    it("ayni dosya duz obje (File DEGIL) olarak verildiginde de AYNI sekilde " +
      "eklenir (fileToText/JSON.parse dalindan GECMEZ)", async () => {
      const geojson = JSON.parse(
        readFileSync(`${FIXTURE_DIR}/isikli_wgs84.geojson`, "utf-8")
      );

      const managed = await layerManager.add("GEOJSON", {
        id: "isikli-geojson-object",
        title: "Işıklı (obje)",
        layerType: "GEOJSON",
        data: geojson,
        clampToGround: false,
      });

      expect(fetchMock).not.toHaveBeenCalled();
      if ("entities" in managed.cesiumObject) {
        expect(managed.cesiumObject.entities.values.length).toBe(919);
      }
    });

    it("varsayilan clampToGround (true) ile eklendiginde poligon sayisi kadar " +
      "dis-hat companion entity'si de olusur (addPolygonOutlines)", async () => {
      const file = readFixtureFile("isikli_wgs84.geojson", "application/geo+json");

      const managed = await layerManager.add("GEOJSON", {
        id: "isikli-geojson-clamped",
        title: "Işıklı (clamped)",
        layerType: "GEOJSON",
        data: file,
      });

      if ("entities" in managed.cesiumObject) {
        const companions = managed.cesiumObject.entities.values.filter((e) =>
          e.id?.toString().endsWith("::outline")
        );
        expect(companions.length).toBe(919);
      }
    });
  });

  describe("addShp", () => {
    // TR_Ilceler_P_SHP.zip Point geometrili (953 feature) -- Cesium'un
    // GeoJsonDataSource'u Point feature'lar icin PinBuilder ile bir
    // <canvas> uzerinde billboard gorseli uretiyor (PinBuilder.js ->
    // document.createElement("canvas").getContext("2d")); jsdom "canvas"
    // npm paketi kurulu olmadan bunu UYGULAMIYOR ("Not implemented:
    // HTMLCanvasElement's getContext()", calistirilarak DOGRULANDI). Bu,
    // KML/KMZ'nin blob: URL kisitiyla AYNI sinifta bir jsdom sinirlamasi --
    // shpjs'in copu (__MACOSX/._*) sessizce yok saydigi TAM addShp() akisi
    // Faz 4'un Playwright turuna birakiliyor (gercek tarayicida canvas var).
    it('"shpjs" paketi yuklenemezse LAYER_SHP_PACKAGE_MISSING firlatir (mevcut davranis, kod okumasi) -- ' +
      "shpjs gercekten kurulu oldugu icin bu dal pratikte tetiklenemiyor, ayri bir test yazilmadi", () => {
      expect(true).toBe(true);
    });

    it("orijinali WGS84 OLMAYAN (ED_1950/UTM Zone 35N, .prj icerir) bir SHP " +
      "zip'i (antalya_province.zip, 3 MultiPolygon feature, Polygon geometrisi " +
      "PinBuilder gerektirmedigi icin TAM add() akisi burada test edilebiliyor) " +
      "basariyla eklenir -- shpjs koordinatlari kendi icinde proj4 ile WGS84'e " +
      "cevirip cikan GeoJSON'a bir 'crs' alani BIRAKMIYOR (Node'da dogrudan " +
      "calistirilarak dogrulandi), bu yuzden LayerManager tarafinda 'supheli " +
      "CRS' olarak ISARETLENMEZ. Cesium'un GeoJsonDataSource'u HER MultiPolygon " +
      "feature'ini KENDI ic parcalarina (adalar/anklavlar) gore AYRI entity'lere " +
      "boluyor -- 3 feature 124 entity'ye karsilik geliyor (MEVCUT davranis, " +
      "calistirilarak dogrulandi).", async () => {
      const file = readFixtureFile("antalya_province.zip", "application/zip");
      const onCrsUnresolved = vi.fn();
      layerManager.on("layer:crs-unresolved", onCrsUnresolved);

      const managed = await layerManager.add("SHP", {
        id: "antalya-province",
        title: "Antalya",
        layerType: "SHP",
        data: file,
      });

      if ("entities" in managed.cesiumObject) {
        expect(managed.cesiumObject.entities.values.length).toBe(124);
      }
      expect(onCrsUnresolved).not.toHaveBeenCalled();
      // Faz 2.6-b oncesi eklendi: SHP katman turu ve baslangic dis hat stili
      // (WFS ile ortak vektor kuyruguna tasinirken korunmasi gerekenler).
      expect(managed.layerType).toBe("SHP");
      expect(layerManager.getLayerStyle("antalya-province")?.outline).toEqual({
        enabled: true,
        color: "#1a73e8",
        width: 2,
      });
    }, 20000);
  });

  describe("addCsv + detectLatLonKeys", () => {
    it("gercek bir CSV dosyasini (ankara-points.csv, basliklar 'name,lat,lon', " +
      "20 satir) File olarak ekler, detectLatLonKeys gercek basliklarla " +
      "eslesir, 20 noktanin TAMAMI Cartesian3.fromDegrees ile eklenir " +
      "(CSV'de nokta feature'lari Point degil dogrudan entity.point olarak " +
      "eklendigi icin PinBuilder/canvas GEREKMIYOR, SHP'nin aksine jsdom'da " +
      "sorunsuz calisiyor)", async () => {
      const file = readFixtureFile("ankara-points.csv", "text/csv");

      const managed = await layerManager.add("CSV", {
        id: "ankara-points",
        title: "Ankara Noktaları",
        layerType: "CSV",
        data: file,
      });

      expect(fetchMock).not.toHaveBeenCalled();
      expect(managed.layerType).toBe("CSV");
      if ("entities" in managed.cesiumObject) {
        expect(managed.cesiumObject.entities.values.length).toBe(20);
      }
    });

    it("lat/lon sutunu bulunamayan bir CSV icin LAYER_CSV_LATLON_NOT_FOUND firlatir", async () => {
      const csv = "isim,deger\nA,1\nB,2\n";
      const file = new File([csv], "sutunsuz.csv", { type: "text/csv" });

      await expect(
        layerManager.add("CSV", {
          id: "sutunsuz",
          title: "Sütunsuz",
          layerType: "CSV",
          data: file,
        })
      ).rejects.toMatchObject({
        code: "LAYER_CSV_LATLON_NOT_FOUND",
      } satisfies Partial<LayerOperationError>);
    });

    it("detectLatLonKeys buyuk/kucuk harf duyarsiz ve lat/latitude/y, " +
      "lon/lng/long/longitude/x varyasyonlarini tanir; eslesme yoksa null doner", () => {
      const loader = createLoader();
      const detect = loader.detectLatLonKeys.bind(loader);

      expect(detect({ LAT: 1, LON: 2 })).toEqual({ lat: "LAT", lon: "LON" });
      expect(detect({ Latitude: 1, Longitude: 2 })).toEqual({ lat: "Latitude", lon: "Longitude" });
      expect(detect({ y: 1, x: 2 })).toEqual({ lat: "y", lon: "x" });
      expect(detect({ lng: 2, lat: 1 })).toEqual({ lat: "lat", lon: "lng" });
      expect(detect({ isim: "A", deger: 1 })).toBeNull();
    });
  });

  describe("fileToText / fileToBlobUrl / fileToArrayBuffer / decodeTextBuffer " +
    "(KML/KMZ'nin TAM akisi jsdom'da test edilemiyor -- bkz dosya basi yorumu, " +
    "bu yuzden SADECE alt-seviye saf yardimcilar test ediliyor)", () => {
    it("fileToText, gercek bir KML dosyasinin (Mamak_Cigiltepe_52192_14.kml) " +
      "metnini dogru decode eder (Turkce karakterler -- ör. 'Çiğiltepe' -- BOZULMADAN)", async () => {
      const file = readFixtureFile("Mamak_Cigiltepe_52192_14.kml", "application/vnd.google-earth.kml+xml");
      const loader = createLoader();
      const fileToText = loader.fileToText.bind(loader);

      const text = await fileToText(file);
      expect(text).toContain("Çiğiltepe");
      expect(text).toContain("<?xml");
    });

    it.skipIf(!KMZ_FIXTURE)("fileToBlobUrl, gercek bir KMZ dosyasi (KMZ.kmz) icin blob: URL doner", () => {
      const createObjectURLSpy = vi.fn().mockReturnValue("blob:mock-kmz");
      (URL as unknown as { createObjectURL: typeof createObjectURLSpy }).createObjectURL = createObjectURLSpy;

      const file = new File([readFileSync(KMZ_FIXTURE!)], basename(KMZ_FIXTURE!), {
        type: "application/vnd.google-earth.kmz",
      });
      const loader = createLoader();
      const fileToBlobUrl = loader.fileToBlobUrl.bind(loader);

      const url = fileToBlobUrl(file);
      expect(url).toBe("blob:mock-kmz");
      expect(createObjectURLSpy).toHaveBeenCalledWith(file);
    });

    it("fileToArrayBuffer, gercek bir SHP zip dosyasinin (TR_Ilceler_P_SHP.zip) " +
      "tam bayt boyutuyla ArrayBuffer'ini doner", async () => {
      const file = readFixtureFile("TR_Ilceler_P_SHP.zip", "application/zip");
      const loader = createLoader();
      const fileToArrayBuffer = loader.fileToArrayBuffer.bind(loader);

      const buffer = await fileToArrayBuffer(file);
      expect(buffer.byteLength).toBe(file.size);
    });

    it("decodeTextBuffer, gecerli UTF-8 bayt dizisini oldugu gibi decode eder, " +
      "GECERSIZ UTF-8 (tek-baytlik Turkce karakter) bir diziyi Windows-1254'e duser", async () => {
      // ESKIDEN: "decodeTextBuffer modul-seviyesi bir fonksiyon (export
      // edilmemis)" -- bu, LayerManager icindeki haliyle dogruydu. Adim 7'de
      // (e2667513aa) layers/sources/LocalSourceLoader.ts'e tasinirken export
      // edildi (OgcLayerFactory de kullaniyor). Test yine fileToText'in donus
      // degeri uzerinden dolayli kalir (ayni TextDecoder mantigini calistirir).
      const utf8Buffer = new TextEncoder().encode("Merhaba Dünya").buffer;
      const utf8File = new File([utf8Buffer], "utf8.txt");
      const loader = createLoader();
      const fileToText = loader.fileToText.bind(loader);
      expect(await fileToText(utf8File)).toBe("Merhaba Dünya");

      // Windows-1254'te "İ" (0xDD) tek bayttir ve GECERSIZ bir UTF-8 devam
      // baytidir (fatal UTF-8 decode burada PATLAR, fallback tetiklenir).
      const win1254Bytes = new Uint8Array([0xDD, 0x73, 0x74, 0x61, 0x6e, 0x62, 0x75, 0x6c]); // "İstanbul" (Windows-1254)
      const win1254File = new File([win1254Bytes], "win1254.txt");
      const decoded = await fileToText(win1254File);
      expect(decoded).toBe("İstanbul");
    });
  });
});
