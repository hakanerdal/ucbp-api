// PUBLIC YUZEY KORUMA TESTI -- God Component kılavuzu §9.2 "Public yüzey
// dokunulmaz" kuralinin (index.ts export listesi DEGISMEMELI; degisirse
// obfuscator'in korunan isim listesi -- SD-04 -- da guncellenmeli)
// otomatiklestirilmis hali. Klasor yapisi tasimasi (Faz 1) ve sonraki
// birlestirme/bolme adimlari boyunca, bir import yolunun yanlislikla bir
// export'u dusurmesini veya yeniden adlandirmasini yakalar.
//
// Yalnizca RUNTIME export'lar kontrol edilir; type-only export'lar calisma
// zamaninda yok oldugu icin buradan gorulemez -- onlar `dist/index.d.ts`
// karsilastirmasiyla dogrulanir.
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";

// src/index.ts'in 2026-10-05 itibariyla runtime export listesi (alfabetik).
// Bu liste BILEREK elle yazildi: degistirmek, public API'yi degistirmek
// demektir ve bilincli bir karar olmalidir.
const EXPECTED_RUNTIME_EXPORTS = [
  "AnalysisManager",
  "AnalysisRequestError",
  "ApiKeyValidationError",
  "DEFAULT_ANALYSIS_API_BASE",
  "DEFAULT_INITIAL_EXTENT",
  "DEFAULT_UCBP_API_BASE",
  "DrawingManager",
  "GeometryError",
  "HGM_BASEMAP_IDS",
  "InteractionManager",
  "LayerManager",
  "LayerOperationError",
  "MEASURE_LAYER_ID",
  "Map",
  "OgcRequestError",
  "TucbsError",
  "buildCapabilitiesUrl",
  "configureTucbs",
  "detectServiceType",
  "ensureEffectiveApiKeyValid",
  "entityToGeoJSON",
  "featureLabel",
  "fetchWcsCoverageExtents",
  "getCapabilities",
  "getErrorCodes",
  "getProxyBase",
  "getUcbpApiBase",
  "parseCapabilities",
  "parseWcsTiffFormat",
  "parseWmsTiffFormat",
  "registerApiKeyRefresh",
  "validateApiKey",
  "wcsRectangleFor",
];

/** vite.config.lib.ts'teki RESERVED_EXPORT_NAMES dizisini metin olarak okur (config dosyasi export etmedigi icin). */
function readReservedExportNames(): string[] {
  const source = readFileSync(new URL("../../vite.config.lib.ts", import.meta.url), "utf-8");
  const block = /const RESERVED_EXPORT_NAMES = \[([\s\S]*?)\]\.map/.exec(source)?.[1];
  if (block === undefined) throw new Error("RESERVED_EXPORT_NAMES blogu bulunamadi");
  const withoutComments = block.replace(/\/\/.*$/gm, "");
  return [...withoutComments.matchAll(/"([^"]+)"/g)].map((match) => match[1]!).sort();
}

describe("@tucbs/core public yuzeyi", () => {
  let indexModule: Record<string, unknown>;

  // index.ts'in (Cesium dahil) ilk yuklemesi tam test kosusunda 3.4-3.9 sn
  // suruyor ve yuk altinda varsayilan 5 sn test suresini asabiliyor (Faz 1
  // Commit 8'de 6.1 sn ile goruldu) -- modul BIR KEZ, uzun sureyle yuklenir.
  beforeAll(async () => {
    indexModule = await import("../index.js");
  }, 60_000);

  it("index.ts'in runtime export listesi degismemis", () => {
    const exports = Object.keys(indexModule).sort();
    expect(exports).toEqual([...EXPECTED_RUNTIME_EXPORTS].sort());
  });

  it("obfuscator'in korunan isim listesinde (SD-04) her runtime export var", () => {
    const reserved = new Set(readReservedExportNames());
    const unreserved = EXPECTED_RUNTIME_EXPORTS.filter((name) => !reserved.has(name));
    expect(unreserved).toEqual([]);
  });

  it("korunan isim listesinde index.ts'te olmayan (bayat) bir isim yok", () => {
    const exported = new Set(EXPECTED_RUNTIME_EXPORTS);
    const stale = readReservedExportNames().filter((name) => !exported.has(name));
    expect(stale).toEqual([]);
  });
});
