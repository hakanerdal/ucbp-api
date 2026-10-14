// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- ESLint uyarilari plani, Faz 1 (tools/): "yukleniyor"
// gostergesinin gecikmeli zamanlayicisi TimerBag'e tasinmadan ONCE davranisi
// dondurur: altlik katmani eklenince ya da secilince gosterge 1500ms sonra
// acilir, hata/kurtarma gelirse acilmaz, bilesen DOM'dan kalkinca bekleyen
// zamanlayici calismaz (eski kodda disconnectedCallback'teki
// _clearPendingTimer saglar).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./TucbsBasemapPicker.js";
import type { TucbsBasemapPicker } from "./TucbsBasemapPicker.js";

type BasemapPickerInternals = {
  _pending: boolean;
  _onLayerAdd(payload: { layer: { isBasemap: boolean; title: string } }): void;
  _onBasemapError(): void;
  _select(id: string): void;
};

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame"] });
  // mapElementId verilmedigi icin bilesen bir kare sonra uyari basar (Faz 3/D).
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

async function mount(): Promise<{ el: TucbsBasemapPicker; internals: BasemapPickerInternals }> {
  const el = document.createElement("tucbs-basemap-picker") as TucbsBasemapPicker;
  document.body.appendChild(el);
  await el.updateComplete;
  return { el, internals: el as unknown as BasemapPickerInternals };
}

const BASEMAP_LAYER = { layer: { isBasemap: true, title: "Temel" } };

describe("TucbsBasemapPicker yukleniyor gostergesi", () => {
  it("altlik katmani eklenince gosterge 1500ms sonra acilir", async () => {
    const { internals } = await mount();
    internals._onLayerAdd(BASEMAP_LAYER);
    vi.advanceTimersByTime(1499);
    expect(internals._pending).toBe(false);
    vi.advanceTimersByTime(1);
    expect(internals._pending).toBe(true);
  });

  it("sure dolmadan hata gelirse gosterge acilmaz", async () => {
    const { internals } = await mount();
    internals._onLayerAdd(BASEMAP_LAYER);
    vi.advanceTimersByTime(500);
    internals._onBasemapError();
    vi.advanceTimersByTime(2000);
    expect(internals._pending).toBe(false);
  });

  it("altlik secilince gosterge 1500ms sonra acilir", async () => {
    const { internals } = await mount();
    internals._select("Siyasi");
    vi.advanceTimersByTime(1500);
    expect(internals._pending).toBe(true);
  });

  it("art arda gelen ekleme onceki zamanlayiciyi yeniden baslatir", async () => {
    const { internals } = await mount();
    internals._onLayerAdd(BASEMAP_LAYER);
    vi.advanceTimersByTime(1000);
    internals._onLayerAdd(BASEMAP_LAYER);
    vi.advanceTimersByTime(1000);
    expect(internals._pending).toBe(false);
    vi.advanceTimersByTime(500);
    expect(internals._pending).toBe(true);
  });

  it("bekleyen zamanlayici DOM'dan kalkinca calismaz (ekleme ve secim)", async () => {
    const first = await mount();
    first.internals._onLayerAdd(BASEMAP_LAYER);
    first.el.remove();
    const second = await mount();
    second.internals._select("Siyasi");
    second.el.remove();
    vi.advanceTimersByTime(2000);
    expect(first.internals._pending).toBe(false);
    expect(second.internals._pending).toBe(false);
  });
});
