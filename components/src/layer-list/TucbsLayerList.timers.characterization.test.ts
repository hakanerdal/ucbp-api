// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- ESLint uyarilari plani, Faz 1 (layer-list):
// katman opaklik bar'inin requestAnimationFrame'i TimerBag'e tasinmadan
// ONCE davranisi dondurur: katman basina kare basina en fazla bir
// guncelleme (en son deger), katmanlar birbirinden bagimsiz, bilesen
// DOM'dan kalkinca bekleyen guncelleme calismaz (eski kodda
// disconnectedCallback'teki elle iptal saglar).
//
// Faz 2 (C grubu): "mapElementId verilmedi" uyarisinin bir kare
// ertelenmesi. ESKIDEN "BILINEN:" testi, erteleme ciplak
// requestAnimationFrame oldugu icin bilesen o kare icinde DOM'dan kalksa bile
// yanlis uyari basildigini kilitliyordu; kare TimerBag'e alininca cevrildi.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./TucbsLayerList.js";
import type { TucbsLayerList } from "./TucbsLayerList.js";

type LayerListInternals = {
  _setOpacity(id: string, opacity: number): void;
  _applyOpacity(id: string, opacity: number): void;
};

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
  // mapElementId verilmedigi icin bilesen bir kare sonra uyari basar (bkz
// asagidaki "haritasiz uyari" testleri).
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

async function mount(): Promise<{ el: TucbsLayerList; internals: LayerListInternals }> {
  const el = document.createElement("tucbs-layer-list") as TucbsLayerList;
  document.body.appendChild(el);
  await el.updateComplete;
  const internals = el as unknown as LayerListInternals;
  internals._applyOpacity = vi.fn();
  return { el, internals };
}

describe("TucbsLayerList opaklik bar'i kare basina guncelleme", () => {
  it("ayni karedeki surukleme degerlerinden yalnizca sonuncusu uygulanir", async () => {
    const { internals } = await mount();
    internals._setOpacity("a", 0.2);
    internals._setOpacity("a", 0.6);
    expect(internals._applyOpacity).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(internals._applyOpacity).toHaveBeenCalledTimes(1);
    expect(internals._applyOpacity).toHaveBeenCalledWith("a", 0.6);
  });

  it("farkli katmanlarin guncellemeleri birbirini iptal etmez", async () => {
    const { internals } = await mount();
    internals._setOpacity("a", 0.2);
    internals._setOpacity("b", 0.7);
    vi.advanceTimersToNextFrame();
    expect(internals._applyOpacity).toHaveBeenCalledTimes(2);
    expect(internals._applyOpacity).toHaveBeenCalledWith("a", 0.2);
    expect(internals._applyOpacity).toHaveBeenCalledWith("b", 0.7);
  });

  it("bekleyen opaklik guncellemesi DOM'dan kalkinca calismaz", async () => {
    const { el, internals } = await mount();
    internals._setOpacity("a", 0.2);
    internals._setOpacity("b", 0.7);
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(internals._applyOpacity).not.toHaveBeenCalled();
  });
});

describe("TucbsLayerList haritasiz uyari (Faz 2)", () => {
  /** Yalnizca "mapElementId verilmedi" uyarisini sayar. */
  function noIdWarnings(): number {
    return vi
      .mocked(console.warn)
      .mock.calls.filter((args) => String(args[0]).startsWith('[tucbs-layer-list] "mapElementId" verilmedi')).length;
  }

  it("ne layerManager ne mapElementId verilmisse uyari bir kare sonra basilir", async () => {
    await mount();
    expect(noIdWarnings()).toBe(0);
    vi.advanceTimersToNextFrame();
    expect(noIdWarnings()).toBe(1);
  });

  it("bilesen o kare icinde DOM'dan kalkarsa uyari basilmaz", async () => {
    const { el } = await mount();
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(noIdWarnings()).toBe(0);
  });
});
