// KARAKTERIZASYON/UNIT TESTLERI -- God Component kilavuzu GC-03 yardimci
// sinif cikarma plani, Faz 2: buildLayerMenuActions() artik SAF bir karar
// fonksiyonu (LayerManager/DOM/jsdom GEREKMEZ) -- bu dosya
// ../TucbsLayerList.menuActions.characterization.test.ts'teki (Faz 1,
// _openMenuPortal uzerinden jsdom ile dolayli kapsanan) AYNI davranisi
// IZOLE/mock'suz olarak sabitler. O dosya (TucbsLayerList'in bu fonksiyonu
// DOGRU flags/callbacks ile cagirdigini dogrulayan entegrasyon testi
// olarak) AYNEN KALIR -- bu, onun TEKRARI degil, EK/izole kapsamdir.
import { describe, expect, it, vi } from "vitest";
import { buildLayerMenuActions, type MenuActionCallbacks, type MenuActionFlags, type MenuActionLayer } from "./LayerMenuActions.js";
import type { LayerMenuAction } from "./LayerMenuPortal.js";
import type { LayerType } from "@tucbs/core";

function makeLayer(overrides: Partial<MenuActionLayer> = {}): MenuActionLayer {
  return { styleMode: "solid", layerType: "GEOJSON" as LayerType, ...overrides };
}

function makeFlags(overrides: Partial<MenuActionFlags> = {}): MenuActionFlags {
  return {
    styleEditorAvailable: false,
    legendAvailable: false,
    layerExportAvailable: false,
    isAnalysisResult: false,
    isGeoTiffExportAvailable: false,
    ...overrides,
  };
}

function makeCallbacks(): MenuActionCallbacks {
  return {
    zoomToLayer: vi.fn(),
    bringToFront: vi.fn(),
    remove: vi.fn(),
    openStyleEditor: vi.fn(),
    toggleLegend: vi.fn(),
    exportLayer: vi.fn(),
    exportLayerKml: vi.fn(),
    exportLayerShapefile: vi.fn(),
    exportLayerAsGeoTiff: vi.fn(),
  };
}

function labelsOf(actions: LayerMenuAction[]): string[] {
  return actions.map((action) => action.label);
}

describe("buildLayerMenuActions (internal/LayerMenuActions.ts) -- izole, mock'suz", () => {
  it("hiçbir bayrak açık değilken SADECE sabit 3 aksiyon döner", () => {
    const actions = buildLayerMenuActions(makeLayer(), makeFlags(), makeCallbacks());
    expect(labelsOf(actions)).toEqual(["Yakınlaş", "En Üste Taşı", "Kaldır"]);
  });

  it("sabit 3 aksiyonun onClick'leri DOĞRU callback'e bağlanır", () => {
    const callbacks = makeCallbacks();
    const actions = buildLayerMenuActions(makeLayer(), makeFlags(), callbacks);
    actions[0]!.onClick();
    actions[1]!.onClick();
    actions[2]!.onClick();
    expect(callbacks.zoomToLayer).toHaveBeenCalledOnce();
    expect(callbacks.bringToFront).toHaveBeenCalledOnce();
    expect(callbacks.remove).toHaveBeenCalledOnce();
  });

  it("styleEditorAvailable true ise 'Stil Düzenle' 3 sabitten SONRA eklenir ve onClick openStyleEditor'ı çağırır", () => {
    const callbacks = makeCallbacks();
    const actions = buildLayerMenuActions(makeLayer(), makeFlags({ styleEditorAvailable: true }), callbacks);
    expect(labelsOf(actions)).toEqual(["Yakınlaş", "En Üste Taşı", "Kaldır", "Stil Düzenle"]);
    actions[3]!.onClick();
    expect(callbacks.openStyleEditor).toHaveBeenCalledOnce();
  });

  it("legendAvailable + styleMode!=='solid' + layerType DRAWING/MEASURE dışındaysa 'Lejant' eklenir", () => {
    const actions = buildLayerMenuActions(
      makeLayer({ styleMode: "gradient", layerType: "WMS" as LayerType }),
      makeFlags({ legendAvailable: true }),
      makeCallbacks(),
    );
    expect(labelsOf(actions)).toContain("Lejant");
  });

  it("legendAvailable true AMA styleMode==='solid' ise 'Lejant' EKLENMEZ", () => {
    const actions = buildLayerMenuActions(
      makeLayer({ styleMode: "solid" }),
      makeFlags({ legendAvailable: true }),
      makeCallbacks(),
    );
    expect(labelsOf(actions)).not.toContain("Lejant");
  });

  it("legendAvailable true AMA layerType DRAWING veya MEASURE ise 'Lejant' EKLENMEZ", () => {
    const flags = makeFlags({ legendAvailable: true });
    expect(
      labelsOf(
        buildLayerMenuActions(makeLayer({ styleMode: "gradient", layerType: "DRAWING" }), flags, makeCallbacks()),
      ),
    ).not.toContain("Lejant");
    expect(
      labelsOf(
        buildLayerMenuActions(makeLayer({ styleMode: "gradient", layerType: "MEASURE" }), flags, makeCallbacks()),
      ),
    ).not.toContain("Lejant");
  });

  it("layerExportAvailable + layerType DRAWING ise 'GeoJSON Olarak Dışa Aktar' menünün EN SONUNA eklenir", () => {
    const callbacks = makeCallbacks();
    const actions = buildLayerMenuActions(
      makeLayer({ layerType: "DRAWING" }),
      makeFlags({ layerExportAvailable: true }),
      callbacks,
    );
    const labels = labelsOf(actions);
    expect(labels[labels.length - 1]).toBe("GeoJSON Olarak Dışa Aktar");
    actions[actions.length - 1]!.onClick();
    expect(callbacks.exportLayer).toHaveBeenCalledOnce();
  });

  it("layerExportAvailable + isAnalysisResult true ise alt-menülü 'Dışa Aktar' (GeoJSON/KML/Shapefile) eklenir", () => {
    const callbacks = makeCallbacks();
    const actions = buildLayerMenuActions(
      makeLayer({ layerType: "GEOJSON" }),
      makeFlags({ layerExportAvailable: true, isAnalysisResult: true }),
      callbacks,
    );
    const exportAction = actions.find((action) => action.label === "Dışa Aktar");
    expect(exportAction).toBeDefined();
    expect(labelsOf(exportAction!.children ?? [])).toEqual(["GeoJSON", "KML", "Shapefile (ZIP)"]);

    exportAction!.children![0]!.onClick();
    exportAction!.children![1]!.onClick();
    exportAction!.children![2]!.onClick();
    expect(callbacks.exportLayer).toHaveBeenCalledOnce();
    expect(callbacks.exportLayerKml).toHaveBeenCalledOnce();
    expect(callbacks.exportLayerShapefile).toHaveBeenCalledOnce();
  });

  it("üst 'Dışa Aktar' satırının kendi onClick'i (alt menü varken) hiçbir şey yapmaz", () => {
    const actions = buildLayerMenuActions(
      makeLayer(),
      makeFlags({ layerExportAvailable: true, isAnalysisResult: true }),
      makeCallbacks(),
    );
    const exportAction = actions.find((action) => action.label === "Dışa Aktar");
    expect(exportAction!.onClick()).toBeUndefined();
  });

  it("layerExportAvailable + layerType WMS + isGeoTiffExportAvailable true ise 'GeoTIFF Olarak Dışa Aktar' eklenir", () => {
    const callbacks = makeCallbacks();
    const actions = buildLayerMenuActions(
      makeLayer({ layerType: "WMS" }),
      makeFlags({ layerExportAvailable: true, isGeoTiffExportAvailable: true }),
      callbacks,
    );
    expect(labelsOf(actions)).toContain("GeoTIFF Olarak Dışa Aktar");
    actions.find((a) => a.label === "GeoTIFF Olarak Dışa Aktar")!.onClick();
    expect(callbacks.exportLayerAsGeoTiff).toHaveBeenCalledOnce();
  });

  it("layerExportAvailable + layerType WCS + isGeoTiffExportAvailable false ise 'GeoTIFF Olarak Dışa Aktar' EKLENMEZ", () => {
    const actions = buildLayerMenuActions(
      makeLayer({ layerType: "WCS" }),
      makeFlags({ layerExportAvailable: true, isGeoTiffExportAvailable: false }),
      makeCallbacks(),
    );
    expect(labelsOf(actions)).not.toContain("GeoTIFF Olarak Dışa Aktar");
  });

  it("layerExportAvailable + isGeoTiffExportAvailable true AMA layerType WMS/WCS DEĞİLSE 'GeoTIFF Olarak Dışa Aktar' EKLENMEZ", () => {
    const actions = buildLayerMenuActions(
      makeLayer({ layerType: "GEOJSON" }),
      makeFlags({ layerExportAvailable: true, isGeoTiffExportAvailable: true }),
      makeCallbacks(),
    );
    expect(labelsOf(actions)).not.toContain("GeoTIFF Olarak Dışa Aktar");
  });
});
