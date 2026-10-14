// KARAKTERIZASYON TESTLERI -- God Component kilavuzu GC-04 5.4 Adim 5:
// TucbsIdentifyPanel._toResultItem/_toImageryResultItem(s)/_pagedTableItems/
// _itemGlobalIndex, bu dosyaya tasinmadan ONCE mevcut davranislarini
// dondurmek icin yazildi.
import { describe, expect, it } from "vitest";
import type { ImageryFeatureInfo, LayerManager, ManagedLayer, PickedFeatureDetail } from "@tucbs/core";
import {
  compactItemBodyMaxWidth,
  formatPropertyValue,
  itemGlobalIndex,
  pagedTableItems,
  toImageryResultItems,
  toResultItem,
  type IdentifyResultItem,
} from "./resultItems.js";

function fakeLayerManager(layers: ManagedLayer[]): LayerManager {
  return { getLayers: () => layers } as unknown as LayerManager;
}

function fakeManagedLayer(overrides: Partial<ManagedLayer>): ManagedLayer {
  return {
    id: "layer-1",
    title: "Test Katmanı",
    layerType: "GEOJSON",
    cesiumObject: {},
    isBasemap: false,
    ...overrides,
  } as unknown as ManagedLayer;
}

describe("toResultItem", () => {
  it("layerId ile eslesen katmanin basligini/turunu kullanir, layerId/featureId'yi propertyEntries'ten eler", () => {
    const layer = fakeManagedLayer({ id: "layer-1", title: "İl Sınırları", layerType: "WFS" });
    const feature: PickedFeatureDetail = {
      entity: {} as unknown as PickedFeatureDetail["entity"],
      layerId: "layer-1",
      featureId: "f-42",
      properties: { layerId: "layer-1", featureId: "f-42", il_adi: "Ankara" },
    };

    const item = toResultItem(feature, fakeLayerManager([layer]));

    expect(item.layerTitle).toBe("İl Sınırları");
    expect(item.layerType).toBe("WFS");
    expect(item.propertyEntries).toEqual([["il_adi", "Ankara"]]);
    expect(item.entity).toBe(feature.entity);
  });

  it("eslesen katman bulunamazsa layerId, o da yoksa featureId, o da yoksa em-dash gosterir", () => {
    const feature: PickedFeatureDetail = {
      entity: {} as unknown as PickedFeatureDetail["entity"],
      layerId: "bilinmeyen-katman",
      featureId: null,
      properties: {},
    };

    const item = toResultItem(feature, fakeLayerManager([]));
    expect(item.layerTitle).toBe("bilinmeyen-katman");
  });
});

describe("toImageryResultItems", () => {
  function fakeImageryFeature(overrides: Partial<ImageryFeatureInfo>): ImageryFeatureInfo {
    return {
      imageryLayer: {} as unknown as ImageryFeatureInfo["imageryLayer"],
      name: null,
      properties: {},
      description: null,
      geometryHint: undefined,
      ...overrides,
    };
  }

  it("cesiumObject ile eslesen katmanin basligini/turunu kullanir", () => {
    const cesiumObject = {} as unknown as ManagedLayer["cesiumObject"];
    const layer = fakeManagedLayer({ title: "Dünya WMS", layerType: "WMS", cesiumObject });
    const feature = fakeImageryFeature({
      imageryLayer: cesiumObject as unknown as ImageryFeatureInfo["imageryLayer"],
      properties: { sehir: "İstanbul" },
    });

    const items = toImageryResultItems([feature], fakeLayerManager([layer]));

    expect(items[0]?.layerTitle).toBe("Dünya WMS");
    expect(items[0]?.layerType).toBe("WMS");
    expect(items[0]?.propertyEntries).toEqual([["sehir", "İstanbul"]]);
  });

  it("properties bossa ve description varsa, HTML etiketlerini temizleyip tek 'Bilgi' satiri olarak dondurur", () => {
    const feature = fakeImageryFeature({
      properties: {},
      description: "<p>Merhaba   <b>Dünya</b></p>",
    });

    const items = toImageryResultItems([feature], fakeLayerManager([]));

    expect(items[0]?.propertyEntries).toEqual([["Bilgi", "Merhaba Dünya"]]);
  });

  it("hem properties hem description bossa (gosterilecek hicbir seyi olmayan) sonucu tamamen eler", () => {
    const feature = fakeImageryFeature({ properties: {}, description: null });
    const items = toImageryResultItems([feature], fakeLayerManager([]));
    expect(items).toEqual([]);
  });
});

describe("pagedTableItems / itemGlobalIndex", () => {
  const items: IdentifyResultItem[] = Array.from({ length: 7 }, (_, i) => ({
    layerTitle: `Sonuç ${i + 1}`,
    layerType: undefined,
    propertyEntries: [],
  }));

  it("pagedTableItems verilen sayfayi pageSize'a gore dilimler", () => {
    expect(pagedTableItems(items, 0, 5)).toEqual(items.slice(0, 5));
    expect(pagedTableItems(items, 1, 5)).toEqual(items.slice(5, 7));
  });

  it("itemGlobalIndex, item hangi sayfada olursa olsun TUM sete gore 1 tabanli global sirasini doner", () => {
    expect(itemGlobalIndex(items, items[0] as IdentifyResultItem)).toBe(1);
    expect(itemGlobalIndex(items, items[6] as IdentifyResultItem)).toBe(7);
  });
});

describe("compactItemBodyMaxWidth", () => {
  it("genis ekranda 720px panelden accordion paddingini dusurur", () => {
    expect(compactItemBodyMaxWidth(1920)).toBe(686);
  });

  it("dar ekranda viewport kenar bosluguna gore kucuk kalir", () => {
    expect(compactItemBodyMaxWidth(500)).toBe(434);
  });

  it("cok dar viewport'ta negatif donmez", () => {
    expect(compactItemBodyMaxWidth(40)).toBe(0);
  });
});

describe("formatPropertyValue", () => {
  it("null/undefined icin tire dondurur", () => {
    expect(formatPropertyValue(null)).toBe("—");
    expect(formatPropertyValue(undefined)).toBe("—");
  });

  it("duz metni degistirmez", () => {
    expect(formatPropertyValue("Arsa")).toBe("Arsa");
    expect(formatPropertyValue(42)).toBe("42");
  });

  it("virgulden sonra gorunmez kirma firsati ekler", () => {
    expect(formatPropertyValue("a,b")).toBe("a,\u200Bb");
  });

  it("WKT'de X/Y arasindaki boslugu kirilmaz yapar, koordinatlar arasi virgulde kirma birakir", () => {
    const out = formatPropertyValue("POLYGON((1.5 2.5,3 4))");
    expect(out).toBe("POLYGON((1.5\u00A02.5,\u200B3\u00A04))");
  });

  it("WKT olmayan metindeki bosluklara dokunmaz", () => {
    expect(formatPropertyValue("Sokak 12 3")).toBe("Sokak 12 3");
  });

  it("GeoJSON koordinat ciftinin icindeki virgulu bolmez, ciftler arasini boler", () => {
    const out = formatPropertyValue({ coordinates: [[1.5, 2.5], [3, 4]] });
    expect(out).toBe('{"coordinates":[[1.5,2.5],\u200B[3,4]]}');
  });
});
