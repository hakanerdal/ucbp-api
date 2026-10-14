// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kilavuzu GC-03 (TucbsLayerList)
// yardimci-sinif cikarma plani, Faz 1: layer-list/LayerMenuActions.ts'e
// TASINMADAN ONCE, katman "..." (kebap) menusunun _openMenuPortal()
// tarafindan uretilen aksiyon listesini SABITLER. Bu davranis su ana kadar
// HICBIR testte DOGRUDAN kapsanmiyordu. Bundan sonraki herhangi bir
// tasima/refactor bu sonuclari BOZMAMALI.
//
// jsdom GEREKLI: gercek custom element + connectedCallback'te olusturulan
// _menuPortalEl (tucbs-layer-menu-portal) gerekiyor.
import { afterEach, describe, expect, it } from "vitest";
import "./TucbsLayerList.js";
import type { TucbsLayerList } from "./TucbsLayerList.js";
import type { TucbsLayerMenuPortal, LayerMenuAction } from "./LayerMenuPortal.js";
import type { LayerManager, LayerType } from "@tucbs/core";

interface TestLayer {
  id: string;
  title: string;
  visible: boolean;
  opacity: number;
  fill: string;
  styleMode: string | undefined;
  layerType: LayerType;
  analysisResult: boolean;
}

type LayerListInternals = {
  _menuPortalEl: TucbsLayerMenuPortal | null;
  _styleEditorAvailable: boolean;
  _legendAvailable: boolean;
  _layerExportAvailable: boolean;
  layerManager: LayerManager | undefined;
  _openMenuPortal(layer: TestLayer, anchor: HTMLElement): void;
};

function makeLayer(overrides: Partial<TestLayer> = {}): TestLayer {
  return {
    id: "layer-1",
    title: "Test Katmanı",
    visible: true,
    opacity: 1,
    fill: "#ff0000",
    styleMode: "solid",
    layerType: "GEOJSON",
    analysisResult: false,
    ...overrides,
  };
}

// `layerManager` gercek bir @property oldugu icin atama, TucbsLayerList'in
// updated()'inda _bindLayerManager()'i (on/off/getLayers cagiran) TETIKLER --
// bu yuzden fake'in _openMenuPortal'in okudugu 2 metodun (isAnalysisResult/
// isGeoTiffExportAvailable) YANINDA bu cagrilari da GUVENLE yutmasi gerekir,
// aksi halde asenkron bir "layerManager.on is not a function" unhandled
// rejection'i BASKA bir testin sirasinda patlar.
function makeFakeLayerManager(
  overrides: {
    isAnalysisResult?: (id: string) => boolean;
    isGeoTiffExportAvailable?: (id: string) => boolean;
  } = {},
): LayerManager {
  return {
    isAnalysisResult: overrides.isAnalysisResult ?? (() => false),
    isGeoTiffExportAvailable: overrides.isGeoTiffExportAvailable ?? (() => false),
    hasApiKey: false,
    getLayers: () => [],
    on: () => {},
    off: () => {},
  } as unknown as LayerManager;
}

function labelsOf(actions: LayerMenuAction[]): string[] {
  return actions.map((action) => action.label);
}

function makeAnchor(rect: Partial<DOMRect> = {}): HTMLButtonElement {
  const anchor = document.createElement("button");
  anchor.getBoundingClientRect = () =>
    ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON: () => ({}),
      ...rect,
    }) as DOMRect;
  return anchor;
}

describe("TucbsLayerList katman kebap menüsü (_openMenuPortal) aksiyon listesi karakterizasyonu", () => {
  let el: TucbsLayerList;

  afterEach(() => {
    el.remove();
  });

  async function setup(): Promise<LayerListInternals> {
    el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(el);
    await el.updateComplete;
    return el as unknown as LayerListInternals;
  }

  it("hiçbir özellik bayrağı açık değilken SADECE sabit 3 aksiyon görünür (Yakınlaş/En Üste Taşı/Kaldır)", async () => {
    const internals = await setup();
    internals._openMenuPortal(makeLayer(), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).toEqual([
      "Yakınlaş",
      "En Üste Taşı",
      "Kaldır",
    ]);
  });

  it("_styleEditorAvailable true ise 'Stil Düzenle' 3 sabitten SONRA eklenir", async () => {
    const internals = await setup();
    internals._styleEditorAvailable = true;
    internals._openMenuPortal(makeLayer(), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).toEqual([
      "Yakınlaş",
      "En Üste Taşı",
      "Kaldır",
      "Stil Düzenle",
    ]);
  });

  it("_legendAvailable + styleMode!=='solid' + layerType DRAWING/MEASURE dışındaysa 'Lejant' eklenir", async () => {
    const internals = await setup();
    internals._legendAvailable = true;
    internals._openMenuPortal(makeLayer({ styleMode: "gradient", layerType: "WMS" }), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).toContain("Lejant");
  });

  it("_legendAvailable true AMA styleMode==='solid' ise 'Lejant' EKLENMEZ", async () => {
    const internals = await setup();
    internals._legendAvailable = true;
    internals._openMenuPortal(makeLayer({ styleMode: "solid" }), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).not.toContain("Lejant");
  });

  it("_legendAvailable true AMA layerType DRAWING/MEASURE ise 'Lejant' EKLENMEZ", async () => {
    const internals = await setup();
    internals._legendAvailable = true;

    internals._openMenuPortal(makeLayer({ styleMode: "gradient", layerType: "DRAWING" }), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).not.toContain("Lejant");

    internals._openMenuPortal(makeLayer({ styleMode: "gradient", layerType: "MEASURE" }), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).not.toContain("Lejant");
  });

  it("_layerExportAvailable + layerType DRAWING ise 'GeoJSON Olarak Dışa Aktar' menünün EN SONUNA eklenir", async () => {
    const internals = await setup();
    internals._layerExportAvailable = true;
    internals.layerManager = makeFakeLayerManager();
    await el.updateComplete;
    internals._openMenuPortal(makeLayer({ layerType: "DRAWING" }), makeAnchor());
    const labels = labelsOf(internals._menuPortalEl!.actions);
    expect(labels[labels.length - 1]).toBe("GeoJSON Olarak Dışa Aktar");
  });

  it("_layerExportAvailable + layerManager.isAnalysisResult() true ise alt-menülü 'Dışa Aktar' (GeoJSON/KML/Shapefile) eklenir", async () => {
    const internals = await setup();
    internals._layerExportAvailable = true;
    internals.layerManager = makeFakeLayerManager({ isAnalysisResult: () => true });
    await el.updateComplete;
    internals._openMenuPortal(makeLayer({ layerType: "GEOJSON", analysisResult: false }), makeAnchor());
    const exportAction = internals._menuPortalEl!.actions.find((action) => action.label === "Dışa Aktar");
    expect(exportAction).toBeDefined();
    expect(labelsOf(exportAction!.children ?? [])).toEqual(["GeoJSON", "KML", "Shapefile (ZIP)"]);
  });

  it("layerManager YOKSA analysisResult için layer.analysisResult'a düşülür (fallback)", async () => {
    const internals = await setup();
    internals._layerExportAvailable = true;
    internals.layerManager = undefined;
    internals._openMenuPortal(makeLayer({ analysisResult: true }), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).toContain("Dışa Aktar");
  });

  it("_layerExportAvailable + layerType WMS + isGeoTiffExportAvailable true ise 'GeoTIFF Olarak Dışa Aktar' eklenir", async () => {
    const internals = await setup();
    internals._layerExportAvailable = true;
    internals.layerManager = makeFakeLayerManager({ isGeoTiffExportAvailable: () => true });
    await el.updateComplete;
    internals._openMenuPortal(makeLayer({ layerType: "WMS" }), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).toContain("GeoTIFF Olarak Dışa Aktar");
  });

  it("_layerExportAvailable + layerType WCS + isGeoTiffExportAvailable false ise 'GeoTIFF Olarak Dışa Aktar' EKLENMEZ", async () => {
    const internals = await setup();
    internals._layerExportAvailable = true;
    internals.layerManager = makeFakeLayerManager({ isGeoTiffExportAvailable: () => false });
    await el.updateComplete;
    internals._openMenuPortal(makeLayer({ layerType: "WCS" }), makeAnchor());
    expect(labelsOf(internals._menuPortalEl!.actions)).not.toContain("GeoTIFF Olarak Dışa Aktar");
  });

  it("menü portalı anchor'ın getBoundingClientRect()'ine göre konumlanır (x = right+4, y = top) ve açılır", async () => {
    const internals = await setup();
    internals._openMenuPortal(makeLayer(), makeAnchor({ right: 100, top: 50 }));
    expect(internals._menuPortalEl!.x).toBe(104);
    expect(internals._menuPortalEl!.y).toBe(50);
    expect(internals._menuPortalEl!.open).toBe(true);
  });
});
