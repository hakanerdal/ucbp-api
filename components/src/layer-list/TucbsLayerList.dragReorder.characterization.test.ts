// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kilavuzu GC-03 Adım 5 SONRASI:
// _applyReorder(draggedId, nextId)'in iş mantığını (yeni sırayı `_layers`'a
// uygulamak + `layerManager.reorder()` çağrısı) sabitler. Pointer/DOM
// mekaniği artık layer-list/DragReorder.ts'te (bkz DragReorder.test.ts) --
// bu dosya SADECE TucbsLayerList'te KALAN iş-mantığı yüzeyini test eder,
// bu yüzden Adım 5 ÖNCESİ (`_endDrag`'i DOM simülasyonuyla dolaylı tetikleyen)
// halinden çok daha basit: `_applyReorder` artık saf `(draggedId, nextId)`
// girdisi alan bir metot, DOM/pointer kurulumuna hiç gerek yok.
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import "./TucbsLayerList.js";
import type { TucbsLayerList } from "./TucbsLayerList.js";
import type { LayerManager, LayerType, ManagedLayer } from "@tucbs/core";

interface LayerItemFixture {
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
  _layers: LayerItemFixture[];
  _applyReorder(draggedId: string | undefined, nextId: string | undefined): void;
};

function makeLayer(id: string): LayerItemFixture {
  return {
    id,
    title: id,
    visible: true,
    opacity: 1,
    fill: "#000000",
    styleMode: "solid",
    layerType: "GEOJSON",
    analysisResult: false,
  };
}

function createFakeLayerManager(reorderSpy: (ids: string[]) => void): LayerManager {
  const fake = {
    getLayers: () => [] as ManagedLayer[],
    reorder: (ids: string[]) => reorderSpy(ids),
    on: (_event: string, _cb: (...args: unknown[]) => void) => {},
    off: (_event: string, _cb: (...args: unknown[]) => void) => {},
  };
  return fake as unknown as LayerManager;
}

describe("TucbsLayerList sürükle-bırak yeniden sıralama -- iş mantığı (GC-03 Adım 5 sonrası)", () => {
  let el: TucbsLayerList;

  beforeEach(() => {
    el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  function apply(
    draggedId: string | undefined,
    nextId: string | undefined,
    layers: LayerItemFixture[],
  ): { reorderCalls: string[][] } {
    const internals = el as unknown as LayerListInternals;
    internals._layers = layers;
    const reorderCalls: string[][] = [];
    el.layerManager = createFakeLayerManager((ids) => reorderCalls.push(ids));

    internals._applyReorder(draggedId, nextId);

    return { reorderCalls };
  }

  it("katmanı son sıraya sürüklerse (sonraki komşu yok) _layers sona taşınır ve reorder() TAM yeni sırayla çağrılır", () => {
    const { reorderCalls } = apply("A", undefined, [makeLayer("A"), makeLayer("B"), makeLayer("C")]);

    const internals = el as unknown as LayerListInternals;
    expect(internals._layers.map((l) => l.id)).toEqual(["B", "C", "A"]);
    expect(reorderCalls).toEqual([["B", "C", "A"]]);
  });

  it("katmanı iki katman arasına sürüklerse _layers o konuma eklenir", () => {
    const { reorderCalls } = apply("C", "B", [makeLayer("A"), makeLayer("B"), makeLayer("C")]);

    const internals = el as unknown as LayerListInternals;
    expect(internals._layers.map((l) => l.id)).toEqual(["A", "C", "B"]);
    expect(reorderCalls).toEqual([["A", "C", "B"]]);
  });

  it("katman AYNI konuma bırakılırsa (sıra değişmezse) reorder() HİÇ çağrılmaz", () => {
    const { reorderCalls } = apply("A", "B", [makeLayer("A"), makeLayer("B"), makeLayer("C")]);

    expect(reorderCalls).toEqual([]);
  });

  it("draggedId _layers içinde bulunamazsa (ör. undefined) hiçbir şey değişmez, reorder() çağrılmaz", () => {
    const { reorderCalls } = apply(undefined, "B", [makeLayer("A"), makeLayer("B")]);

    const internals = el as unknown as LayerListInternals;
    expect(internals._layers.map((l) => l.id)).toEqual(["A", "B"]);
    expect(reorderCalls).toEqual([]);
  });
});
