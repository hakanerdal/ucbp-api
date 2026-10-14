// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- ESLint uyarilari plani, Faz 1 (app/): ciplak
// setTimeout/requestAnimationFrame cagrilari TimerBag'e tasinmadan ONCE,
// TucbsBusyOverlay/TucbsInfoBar/TucbsQualityBar'in zamanlayici davranisini
// dondurur: gecikmeli gosterim/en az gorunme suresi, kare basina en fazla bir
// guncelleme ve bilesen DOM'dan kalkinca bekleyen zamanlayicinin calismamasi
// (eski kodda disconnectedCallback'teki elle iptal satirlari saglar).
//
// Faz 2 (C grubu): TucbsToolbar'in "mapElementId verilmedi" uyarisini bir
// kare ertelemesi. ESKIDEN "BILINEN:" testi, erteleme ciplak
// requestAnimationFrame oldugu icin bilesen o kare icinde DOM'dan kalksa bile
// yanlis uyari basildigini kilitliyordu; kare TimerBag'e alininca cevrildi.
//
// BusyOverlay alan sifirlama: DOM'dan kaldirilip geri eklenen overlay. ESKIDEN
// "BILINEN:" testi, iptal edilen gosterme zamanlayicisinin alani (_showTimer)
// sifirlanmadigi icin sonraki "mesgul" olayinda overlay'in gorunmedigini
// kilitliyordu; alanlar disconnectedCallback'te sifirlaninca cevrildi.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./TucbsBusyOverlay.js";
import "./TucbsInfoBar.js";
import "./TucbsQualityBar.js";
import "./TucbsToolbar.js";
import type { TucbsBusyOverlay } from "./TucbsBusyOverlay.js";
import type { TucbsInfoBar } from "./TucbsInfoBar.js";
import type { TucbsQualityBar } from "./TucbsQualityBar.js";

beforeEach(() => {
  vi.useFakeTimers({
    toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame", "Date"],
  });
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

function setBusy(busy: boolean): void {
  document.dispatchEvent(new CustomEvent("tucbs-busy-changed", { detail: { busy, message: "Test" } }));
}

describe("TucbsBusyOverlay zamanlayicilari", () => {
  function mount(): TucbsBusyOverlay {
    const el = document.createElement("tucbs-busy-overlay") as TucbsBusyOverlay;
    document.body.appendChild(el);
    return el;
  }

  it("mesgul olunca 150ms beklenir, sonra gorunur", () => {
    const el = mount();
    setBusy(true);
    vi.advanceTimersByTime(149);
    expect(el.active).toBe(false);
    vi.advanceTimersByTime(1);
    expect(el.active).toBe(true);
  });

  it("150ms'ten kisa suren islemde hic gorunmez", () => {
    const el = mount();
    setBusy(true);
    vi.advanceTimersByTime(100);
    setBusy(false);
    vi.advanceTimersByTime(500);
    expect(el.active).toBe(false);
  });

  it("gorundukten sonra en az 300ms ekranda kalir", () => {
    const el = mount();
    setBusy(true);
    vi.advanceTimersByTime(150);
    vi.advanceTimersByTime(100);
    setBusy(false);
    expect(el.active).toBe(true);
    vi.advanceTimersByTime(199);
    expect(el.active).toBe(true);
    vi.advanceTimersByTime(1);
    expect(el.active).toBe(false);
  });

  it("gosterme zamanlayicisi beklerken DOM'dan kalkarsa gorunur hale gelmez", () => {
    const el = mount();
    setBusy(true);
    el.remove();
    vi.advanceTimersByTime(500);
    expect(el.active).toBe(false);
  });

  it("gizleme zamanlayicisi beklerken DOM'dan kalkarsa gorunur kalir (zamanlayici calismaz)", () => {
    const el = mount();
    setBusy(true);
    vi.advanceTimersByTime(150);
    setBusy(false);
    el.remove();
    vi.advanceTimersByTime(500);
    expect(el.active).toBe(true);
  });
});

describe("TucbsBusyOverlay DOM'a geri eklenince", () => {
  /** Gosterme zamanlayicisi beklerken overlay'i DOM'dan kaldirip geri ekler. */
  function remountWhileShowPending(): TucbsBusyOverlay {
    const el = document.createElement("tucbs-busy-overlay") as TucbsBusyOverlay;
    document.body.appendChild(el);
    setBusy(true);
    el.remove();
    document.body.appendChild(el);
    return el;
  }

  it("gosterme zamanlayicisi beklerken kaldirilip geri eklenirse sonraki mesgul olayinda 150ms sonra gorunur", () => {
    const el = remountWhileShowPending();
    setBusy(true);
    vi.advanceTimersByTime(149);
    expect(el.active).toBe(false);
    vi.advanceTimersByTime(1);
    expect(el.active).toBe(true);
  });

  it("bir 'mesgul bitti' olayindan sonraki mesgul olayinda yine 150ms sonra gorunur", () => {
    const el = remountWhileShowPending();
    setBusy(false);
    setBusy(true);
    vi.advanceTimersByTime(150);
    expect(el.active).toBe(true);
  });
});

describe("TucbsInfoBar kare basina guncelleme", () => {
  type InfoBarInternals = {
    _onCameraChanged(): void;
    _onMapMouseMove(detail: { position: [number, number] }): void;
    _computeScale(): number | null;
    _sampleHeight(lon: number, lat: number): number;
  };

  async function mount(): Promise<{ el: TucbsInfoBar; internals: InfoBarInternals }> {
    const el = document.createElement("tucbs-info-bar") as TucbsInfoBar;
    document.body.appendChild(el);
    await el.updateComplete;
    const internals = el as unknown as InfoBarInternals;
    internals._computeScale = vi.fn(() => 1000);
    internals._sampleHeight = vi.fn(() => 5);
    return { el, internals };
  }

  it("ayni karedeki birden cok kamera degisikligi olcegi bir kez hesaplar", async () => {
    const { internals } = await mount();
    internals._onCameraChanged();
    internals._onCameraChanged();
    expect(internals._computeScale).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(internals._computeScale).toHaveBeenCalledTimes(1);
  });

  it("ayni karedeki fare hareketlerinden yalnizca sonuncusu islenir", async () => {
    const { internals } = await mount();
    internals._onMapMouseMove({ position: [30, 40] });
    internals._onMapMouseMove({ position: [32, 41] });
    vi.advanceTimersToNextFrame();
    expect(internals._sampleHeight).toHaveBeenCalledTimes(1);
    expect(internals._sampleHeight).toHaveBeenCalledWith(32, 41);
  });

  it("bekleyen kareler DOM'dan kalkinca calismaz", async () => {
    const { el, internals } = await mount();
    internals._onCameraChanged();
    internals._onMapMouseMove({ position: [30, 40] });
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(internals._computeScale).not.toHaveBeenCalled();
    expect(internals._sampleHeight).not.toHaveBeenCalled();
  });
});

describe("TucbsQualityBar kare basina kalite guncellemesi", () => {
  type QualityBarInternals = { _onSliderInput(event: Event): void };

  async function mount(): Promise<{ el: TucbsQualityBar; setQuality: ReturnType<typeof vi.fn> }> {
    const setQuality = vi.fn();
    const el = document.createElement("tucbs-quality-bar") as TucbsQualityBar;
    el.map = { setQuality, viewer: { resolutionScale: 0.75 } } as unknown as TucbsQualityBar["map"];
    document.body.appendChild(el);
    await el.updateComplete;
    return { el, setQuality };
  }

  function input(el: TucbsQualityBar, value: number): void {
    const target = { value: String(value), style: { setProperty: () => {} } };
    (el as unknown as QualityBarInternals)._onSliderInput({ target } as unknown as Event);
  }

  it("ayni karedeki surukleme degerlerinden yalnizca sonuncusu haritaya uygulanir", async () => {
    const { el, setQuality } = await mount();
    input(el, 40);
    input(el, 60);
    expect(setQuality).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(setQuality).toHaveBeenCalledTimes(1);
    expect(setQuality).toHaveBeenCalledWith(60);
  });

  it("bekleyen kalite guncellemesi DOM'dan kalkinca calismaz", async () => {
    const { el, setQuality } = await mount();
    input(el, 40);
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(setQuality).not.toHaveBeenCalled();
  });
});

describe("TucbsToolbar haritasiz uyari (Faz 2)", () => {
  /** Yalnizca bu bilesenin "mapElementId verilmedi" uyarisini sayar (icerdeki araclarin uyarilari haric). */
  function toolbarWarnings(warn: ReturnType<typeof vi.spyOn>): number {
    return warn.mock.calls.filter((args) => String(args[0]).startsWith("[tucbs-toolbar]")).length;
  }

  async function mount(): Promise<{ el: HTMLElement; warn: ReturnType<typeof vi.spyOn> }> {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const el = document.createElement("tucbs-toolbar");
    document.body.appendChild(el);
    await (el as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete;
    return { el, warn };
  }

  it("ne map ne mapElementId verilmisse uyari bir kare sonra basilir", async () => {
    const { warn } = await mount();
    expect(toolbarWarnings(warn)).toBe(0);
    vi.advanceTimersToNextFrame();
    expect(toolbarWarnings(warn)).toBe(1);
    warn.mockRestore();
  });

  it("bilesen o kare icinde DOM'dan kalkarsa uyari basilmaz", async () => {
    const { el, warn } = await mount();
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(toolbarWarnings(warn)).toBe(0);
    warn.mockRestore();
  });
});
