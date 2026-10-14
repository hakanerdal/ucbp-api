// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTI -- God Component kilavuzu GC-04 5.4 Adim 6, Kural 5
// (9.2: "taşımadan ÖNCE mevcut davranışı donduran bir test yazın"): bu dosya
// TucbsIdentifyPanel._onEntityClick/_onImageryClick/_onMapClick arasindaki
// yaris cozumleme mantigi (_lastClickHadEntity/_pendingVectorClick/
// _vectorCommitted uc bagimsiz alan) `identify/vectorClickState.ts`'teki tek
// ayirt edici union'a tasinmadan ONCE yazildi -- amac, tasimadan once VE
// sonra AYNI sonuclari vermesini dogrulamak (davranis SIFIR degismeli).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type {
  EntityInteractionDetail,
  ImageryInteractionDetail,
  InteractionManager,
  InteractionManagerEventMap,
  LayerManager,
  MapInteractionDetail,
  PickedFeatureDetail,
} from "@tucbs/core";
import "./TucbsIdentifyPanel.js";
import type { TucbsIdentifyPanel } from "./TucbsIdentifyPanel.js";

type Listener<K extends keyof InteractionManagerEventMap> = (
  payload: InteractionManagerEventMap[K],
) => void;

function createFakeInteractionManager() {
  const listeners = new Map<string, Set<Listener<keyof InteractionManagerEventMap>>>();
  const im = {
    isIdentifySuspended: () => false,
    on(event: string, listener: Listener<keyof InteractionManagerEventMap>) {
      let set = listeners.get(event);
      if (!set) {
        set = new Set();
        listeners.set(event, set);
      }
      set.add(listener);
      return im;
    },
    off(event: string, listener: Listener<keyof InteractionManagerEventMap>) {
      listeners.get(event)?.delete(listener);
      return im;
    },
    emit<K extends keyof InteractionManagerEventMap>(event: K, payload: InteractionManagerEventMap[K]) {
      for (const listener of listeners.get(event) ?? []) {
        listener(payload);
      }
    },
    flyToPosition: () => {},
    flyToExtent: () => {},
  };
  return im as unknown as InteractionManager & { emit: typeof im.emit };
}

function fakeLayerManager(): LayerManager {
  return {
    getLayers: () => [],
    clearHighlight: () => {},
    highlightEntity: () => {},
    zoomToEntity: async () => {},
  } as unknown as LayerManager;
}

function fakeEntityFeature(properties: Record<string, unknown>): PickedFeatureDetail {
  return {
    entity: {} as unknown as PickedFeatureDetail["entity"],
    layerId: null,
    featureId: null,
    properties,
  };
}

function entityClick(position: [number, number], properties: Record<string, unknown>): EntityInteractionDetail {
  const feature = fakeEntityFeature(properties);
  return { ...feature, position, screenPos: { x: 0, y: 0 }, features: [feature] };
}

function mapClick(position: [number, number]): MapInteractionDetail {
  return { position, screenPos: { x: 0, y: 0 } };
}

function imageryClick(
  position: [number, number],
  featureProperties: Record<string, unknown>[],
): ImageryInteractionDetail {
  return {
    position,
    screenPos: { x: 0, y: 0 },
    features: featureProperties.map((properties) => ({
      imageryLayer: {} as unknown as ImageryInteractionDetail["features"][number]["imageryLayer"],
      name: null,
      properties,
      description: null,
      geometryHint: undefined,
    })),
  };
}

describe("TucbsIdentifyPanel entity/imagery click yaris cozumlemesi", () => {
  let el: TucbsIdentifyPanel;
  let im: ReturnType<typeof createFakeInteractionManager>;

  beforeEach(async () => {
    vi.useFakeTimers();
    el = document.createElement("tucbs-identify-panel") as TucbsIdentifyPanel;
    im = createFakeInteractionManager();
    el.layerManager = fakeLayerManager();
    document.body.appendChild(el);
    await el.updateComplete;
    el.interactionManager = im;
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
    vi.useRealTimers();
  });

  function state() {
    return el as unknown as {
      _tableOpen: boolean;
      _tableItems: { layerTitle: string; propertyEntries: readonly unknown[] }[];
      _tableSource: string;
      _tableLon: number;
      _tableLat: number;
      _basicOpen: boolean;
      _basicLon: number;
      _basicLat: number;
    };
  }

  it("SADECE entity:click (imagery hic gelmez) -- setTimeout(0) sonrasi vektor-only tablo acilir", () => {
    im.emit("entity:click", entityClick([29, 41], { il: "Ankara" }));
    expect(state()._tableOpen).toBe(false);

    vi.runAllTimers();

    expect(state()._tableOpen).toBe(true);
    expect(state()._tableSource).toBe("vector");
    expect(state()._tableItems).toHaveLength(1);
    expect(state()._tableLon).toBe(29);
  });

  it("entity:click + SENKRON (setTimeout'tan ONCE) imagery:click, raster sonucu VARSA -- hemen 'mixed' acilir, sonraki timeout ikinci kez acmaz", () => {
    im.emit("entity:click", entityClick([29, 41], { il: "Ankara" }));
    im.emit("imagery:click", imageryClick([29, 41], [{ sehir: "İstanbul" }]));

    expect(state()._tableOpen).toBe(true);
    expect(state()._tableSource).toBe("mixed");
    expect(state()._tableItems).toHaveLength(2);

    const itemsBeforeTimeout = state()._tableItems;
    vi.runAllTimers();
    expect(state()._tableItems).toBe(itemsBeforeTimeout);
  });

  it("entity:click + SENKRON imagery:click, raster sonucu YOKSA (bos properties) -- 'vector' olarak acilir (mixed DEGIL)", () => {
    im.emit("entity:click", entityClick([29, 41], { il: "Ankara" }));
    im.emit("imagery:click", imageryClick([29, 41], [{}]));

    expect(state()._tableOpen).toBe(true);
    expect(state()._tableSource).toBe("vector");
    expect(state()._tableItems).toHaveLength(1);
  });

  it("entity:click, vektor timeout ONCE ateslenir (vector-only acilir), imagery:click SONRA (asenkron) gelirse -- raster sonuclari AYNI tabloya eklenir, source 'mixed' olur", () => {
    im.emit("entity:click", entityClick([29, 41], { il: "Ankara" }));
    vi.runAllTimers();
    expect(state()._tableOpen).toBe(true);
    expect(state()._tableSource).toBe("vector");

    im.emit("imagery:click", imageryClick([29, 41], [{ sehir: "İstanbul" }]));

    expect(state()._tableSource).toBe("mixed");
    expect(state()._tableItems).toHaveLength(2);
  });

  it("SADECE imagery:click (entity hic yok), sonuc VARSA -- 'imagery' kaynagiyla hemen acilir", () => {
    im.emit("imagery:click", imageryClick([29, 41], [{ sehir: "İstanbul" }]));

    expect(state()._tableOpen).toBe(true);
    expect(state()._tableSource).toBe("imagery");
    expect(state()._tableItems).toHaveLength(1);
  });

  it("SADECE imagery:click (entity hic yok), sonuc BOSSA -- tablo acilmaz, basit kart (_basicOpen) acilir", () => {
    im.emit("imagery:click", imageryClick([29, 41], [{}]));

    expect(state()._tableOpen).toBe(false);
    expect(state()._basicOpen).toBe(true);
    expect(state()._basicLon).toBe(29);
  });

  it("SADECE map:click (entity yok, imagery hic sorgulanmaz) -- setTimeout(0) sonrasi koordinat karti acilir", () => {
    im.emit("map:click", mapClick([32, 39]));
    expect(state()._basicOpen).toBe(false);

    // NOT: runAllTimers() DEGIL -- kart acilinca kendi 4sn'lik otomatik
    // kapanma zamanlayicisini da kurar (bkz _scheduleBasicDismiss), o da
    // ayni kuyruga girer ve runAllTimers() ONU DA tuketip karti tekrar
    // kapatirdi. Sadece ilk setTimeout(0)'a kadar ilerlenir.
    vi.advanceTimersByTime(0);

    expect(state()._basicOpen).toBe(true);
    expect(state()._basicLon).toBe(32);
    expect(state()._basicLat).toBe(39);
  });

  it("map:click SONRASI SENKRON imagery:querying baslarsa -- koordinat karti setTimeout(0)'da bile ACILMAZ (imagery:click'i bekler)", () => {
    im.emit("map:click", mapClick([32, 39]));
    im.emit("imagery:querying", undefined as never);

    vi.advanceTimersByTime(0);

    expect(state()._basicOpen).toBe(false);
  });
  it("interaction:suspend (cizim/olcum basladi) acik koordinat kartini kapatir, tabloya dokunmaz", () => {
    im.emit("map:click", mapClick([29, 41]));
    // runAllTimers kartin kendiliginden kapanma zamanlayicisini da calistirirdi.
    vi.advanceTimersByTime(1);
    expect(state()._basicOpen).toBe(true);

    im.emit("interaction:suspend", {});

    expect(state()._basicOpen).toBe(false);
  });

  it("interaction:suspend acik oznitelik tablosunu KAPATMAZ", () => {
    im.emit("entity:click", entityClick([29, 41], { il: "Ankara" }));
    vi.runAllTimers();
    expect(state()._tableOpen).toBe(true);

    im.emit("interaction:suspend", {});

    expect(state()._tableOpen).toBe(true);
  });
});
