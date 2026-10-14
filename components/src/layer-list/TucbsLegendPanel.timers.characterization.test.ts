// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- ESLint uyarilari plani, Faz 2 (B grubu): her
// render sonrasi bir kare sonra yapilan liste olcumunu (max-height + scroll
// gostergesi) dondurur. ESKIDEN "BILINEN:" testi, olcum karesi ciplak
// requestAnimationFrame oldugu icin bilesen DOM'dan kalksa bile calistigini
// (kopmus DOM uzerinde olcum) kilitliyordu; kare TimerBag'e alininca
// cevrildi.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TucbsLegendPanel } from "./TucbsLegendPanel.js";

type LegendPanelInternals = { _listScroll: { sync(): void } };
type LegendPanelStatics = { _fitListToRows(list: HTMLDivElement | undefined): void };

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

/** Paneli ekler ve ilk render'in planladigi olcum karesini bekletir (calistirmaz). */
async function mount(): Promise<{ el: TucbsLegendPanel; fit: ReturnType<typeof vi.fn>; sync: ReturnType<typeof vi.fn> }> {
  const fit = vi.fn();
  vi.spyOn(TucbsLegendPanel as unknown as LegendPanelStatics, "_fitListToRows").mockImplementation(fit);
  const el = document.createElement("tucbs-legend-panel") as TucbsLegendPanel;
  document.body.appendChild(el);
  await el.updateComplete;
  const sync = vi.fn();
  (el as unknown as LegendPanelInternals)._listScroll.sync = sync;
  return { el, fit, sync };
}

describe("TucbsLegendPanel liste olcumu", () => {
  it("render sonrasi bir kare sonra liste olculur ve scroll gostergesi senkronlanir", async () => {
    const { fit, sync } = await mount();
    expect(fit).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(fit).toHaveBeenCalled();
    expect(sync).toHaveBeenCalled();
  });

  it("bilesen DOM'dan kalkinca bekleyen olcum karesi calismaz", async () => {
    const { el, fit, sync } = await mount();
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(fit).not.toHaveBeenCalled();
    expect(sync).not.toHaveBeenCalled();
  });
});
