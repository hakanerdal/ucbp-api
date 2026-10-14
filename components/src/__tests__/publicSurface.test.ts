// @vitest-environment jsdom
//
// PUBLIC YUZEY KORUMA TESTI -- God Component kılavuzu §9.2 "Public yüzey
// dokunulmaz" kuralinin (index.ts export listesi DEGISMEMELI; degisirse
// obfuscator'in korunan isim listesi -- SD-04 -- da guncellenmeli)
// otomatiklestirilmis hali. Klasor yapisi tasimasi (Faz 1) ve sonraki
// birlestirme/bolme adimlari boyunca bir import yolunun yanlislikla bir
// export'u veya bir custom element kaydini dusurmesini yakalar.
//
// Elementler KASITLI OLARAK olusturulmaz/DOM'a eklenmez: yalnizca modul
// yuklemesi sirasindaki @customElement kayitlari kontrol edilir (TucbsMap'in
// firstUpdated()'i gercek bir Cesium Viewer kurar, jsdom'da calismaz).
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

// src/index.ts'in 2026-10-05 itibariyla runtime export listesi (alfabetik).
// Bu liste BILEREK elle yazildi: degistirmek, public API'yi degistirmek
// demektir ve bilincli bir karar olmalidir.
const EXPECTED_RUNTIME_EXPORTS = [
  "TucbsAnalysisPanel",
  "TucbsAnalysisTool",
  "TucbsApp",
  "TucbsAuthorizedLayers",
  "TucbsBasemapPicker",
  "TucbsBusyOverlay",
  "TucbsDeleteTool",
  "TucbsDrawTool",
  "TucbsFileUpload",
  "TucbsGoToCoordinate",
  "TucbsIdentifyPanel",
  "TucbsInfoBar",
  "TucbsLayerExport",
  "TucbsLayerList",
  "TucbsLegendPanel",
  "TucbsMap",
  "TucbsMapExport",
  "TucbsMapPreview",
  "TucbsMeasureTool",
  "TucbsPrintTool",
  "TucbsQualityBar",
  "TucbsServiceUpload",
  "TucbsSettingsTool",
  "TucbsStyleEditor",
  "TucbsToolbar",
  "TucbsZoomTool",
];

// index.ts yuklendiginde kayitli olmasi gereken TUM custom element tag'leri.
// Tag adlari tuketicinin HTML'inde dogrudan kullanildigi icin (orn.
// ComponentAPIAllComponentsTest/index.html) export listesinden BAGIMSIZ bir
// public yuzeydir; ic bilesen tag'leri de (analiz formlari, portal'lar)
// global kayit oldugu icin dahildir.
const EXPECTED_CUSTOM_ELEMENT_TAGS = [
  "tucbs-analysis-panel",
  "tucbs-analysis-tool",
  "tucbs-app",
  "tucbs-authorized-layers",
  "tucbs-basemap-picker",
  "tucbs-boundary-tool",
  "tucbs-buffer-tool",
  "tucbs-clip-tool",
  "tucbs-busy-overlay",
  "tucbs-delete-tool",
  "tucbs-difference-tool",
  "tucbs-draw-tool",
  "tucbs-file-upload",
  "tucbs-goto-coordinate",
  "tucbs-identify-panel",
  "tucbs-info-bar",
  "tucbs-intersection-tool",
  "tucbs-layer-export",
  "tucbs-layer-list",
  "tucbs-layer-menu-portal",
  "tucbs-legend-panel",
  "tucbs-map",
  "tucbs-map-export",
  "tucbs-map-preview",
  "tucbs-measure-tool",
  "tucbs-print-panel-content",
  "tucbs-print-tool",
  "tucbs-quality-bar",
  "tucbs-service-style-card",
  "tucbs-service-upload",
  "tucbs-settings-tool",
  "tucbs-slide-over-panel",
  "tucbs-subtract-tool",
  "tucbs-style-editor",
  "tucbs-toolbar",
  "tucbs-tooltip-portal",
  "tucbs-union-tool",
  "tucbs-wedge-buffer-tool",
  "tucbs-zoom-tool",
];

/** vite.config.lib.ts'teki RESERVED_EXPORT_NAMES dizisini metin olarak okur (config dosyasi export etmedigi icin). */
function readReservedExportNames(): string[] {
  // jsdom ortaminda import.meta.url "file:" semali degil -- yol __dirname ile cozulur.
  const source = readFileSync(resolve(__dirname, "../../vite.config.lib.ts"), "utf-8");
  const block = /const RESERVED_EXPORT_NAMES = \[([\s\S]*?)\]\.map/.exec(source)?.[1];
  if (block === undefined) throw new Error("RESERVED_EXPORT_NAMES blogu bulunamadi");
  const withoutComments = block.replace(/\/\/.*$/gm, "");
  return [...withoutComments.matchAll(/"([^"]+)"/g)].map((match) => match[1]!).sort();
}

describe("@tucbs/components public yuzeyi", () => {
  let indexModule: Record<string, CustomElementConstructor>;

  // Tum bilesenlerin (Carbon + Lit + @tucbs/core) ilk yuklemesi varsayilan
  // 5 sn test suresini asabiliyor -- modul BIR KEZ, uzun sureyle yuklenir.
  beforeAll(async () => {
    indexModule = (await import("../index.js")) as Record<string, CustomElementConstructor>;
  }, 60_000);

  it("index.ts'in runtime export listesi degismemis", () => {
    const exports = Object.keys(indexModule).sort();
    expect(exports).toEqual([...EXPECTED_RUNTIME_EXPORTS].sort());
  });

  it("obfuscator'in korunan isim listesi (SD-04) export listesiyle birebir ayni", () => {
    expect(readReservedExportNames()).toEqual([...EXPECTED_RUNTIME_EXPORTS].sort());
  });

  it("index.ts yuklenince tum custom element tag'leri kayitli", () => {
    const missing = EXPECTED_CUSTOM_ELEMENT_TAGS.filter((tag) => customElements.get(tag) === undefined);
    expect(missing).toEqual([]);
  });

  it("her public bilesen sinifi beklenen tag'e kayitli (sinif <-> tag eslesmesi bozulmamis)", () => {
    const tagByClass = Object.fromEntries(
      EXPECTED_RUNTIME_EXPORTS.map((name) => [name, customElements.getName(indexModule[name]!)]),
    );
    expect(tagByClass).toEqual({
      TucbsAnalysisPanel: "tucbs-analysis-panel",
      TucbsAnalysisTool: "tucbs-analysis-tool",
      TucbsApp: "tucbs-app",
      TucbsAuthorizedLayers: "tucbs-authorized-layers",
      TucbsBasemapPicker: "tucbs-basemap-picker",
      TucbsBusyOverlay: "tucbs-busy-overlay",
      TucbsDeleteTool: "tucbs-delete-tool",
      TucbsDrawTool: "tucbs-draw-tool",
      TucbsFileUpload: "tucbs-file-upload",
      TucbsGoToCoordinate: "tucbs-goto-coordinate",
      TucbsIdentifyPanel: "tucbs-identify-panel",
      TucbsInfoBar: "tucbs-info-bar",
      TucbsLayerExport: "tucbs-layer-export",
      TucbsLayerList: "tucbs-layer-list",
      TucbsLegendPanel: "tucbs-legend-panel",
      TucbsMap: "tucbs-map",
      TucbsMapExport: "tucbs-map-export",
      TucbsMapPreview: "tucbs-map-preview",
      TucbsMeasureTool: "tucbs-measure-tool",
      TucbsPrintTool: "tucbs-print-tool",
      TucbsQualityBar: "tucbs-quality-bar",
      TucbsServiceUpload: "tucbs-service-upload",
      TucbsSettingsTool: "tucbs-settings-tool",
      TucbsStyleEditor: "tucbs-style-editor",
      TucbsToolbar: "tucbs-toolbar",
      TucbsZoomTool: "tucbs-zoom-tool",
    });
  });
});
