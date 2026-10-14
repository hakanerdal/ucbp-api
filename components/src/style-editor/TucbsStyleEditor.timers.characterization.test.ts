// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- ESLint uyarilari plani, Faz 1 (style-editor):
// dolgu opakligi ve stil uygulama requestAnimationFrame'leri TimerBag'e
// tasinmadan ONCE davranisi dondurur: opaklikta en son deger kazanir; stil
// uygulama planliyken yeni cagrilar yeniden planlamaz, yalnizca uygulanacak
// en guncel genisligi gunceller; bilesen DOM'dan kalkinca bekleyen kareler
// calismaz (eski kodda disconnectedCallback'teki elle iptal saglar).
//
// Faz 2 (B grubu): her render sonrasi bir kare sonra yapilan liste olcumu.
// ESKIDEN "BILINEN:" testi, olcum karesi ciplak requestAnimationFrame oldugu
// icin bilesen DOM'dan kalksa bile calistigini kilitliyordu; kare TimerBag'e
// alininca cevrildi.
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import type { LayerManager } from "@tucbs/core";
import { TucbsStyleEditor } from "./TucbsStyleEditor.js";
import { createFakeLayerManager } from "../__tests__/fixtures/fakeLayerManager.js";

type StyleEditorInternals = {
  _fillOpacity: number;
  _setFillOpacity(value: number): void;
  _scheduleApplyStyle(outlineWidthOverride?: string): void;
};

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

/** Editoru acar ve acilistan kalan bekleyen kareleri bosaltir. */
async function open(): Promise<{
  el: TucbsStyleEditor;
  internals: StyleEditorInternals;
  apply: MockInstance<LayerManager["applyLayerStyle"]>;
}> {
  const el = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
  document.body.appendChild(el);
  el.layerManager = createFakeLayerManager();
  el.openFor("layer-1", "Katman", "GEOJSON" as never);
  await el.updateComplete;
  vi.advanceTimersToNextFrame();
  vi.advanceTimersToNextFrame();
  const apply = vi.spyOn(el.layerManager, "applyLayerStyle");
  return { el, internals: el as unknown as StyleEditorInternals, apply };
}

describe("TucbsStyleEditor dolgu opakligi", () => {
  it("ayni karedeki degerlerden yalnizca sonuncusu state'e yazilir ve stil bir kez planlanir", async () => {
    const { internals } = await open();
    const schedule = vi.fn();
    internals._scheduleApplyStyle = schedule;
    internals._setFillOpacity(30);
    internals._setFillOpacity(55);
    vi.advanceTimersToNextFrame();
    expect(internals._fillOpacity).toBe(55);
    expect(schedule).toHaveBeenCalledTimes(1);
  });

  it("bekleyen opaklik guncellemesi DOM'dan kalkinca calismaz", async () => {
    const { el, internals } = await open();
    const before = internals._fillOpacity;
    const schedule = vi.fn();
    internals._scheduleApplyStyle = schedule;
    internals._setFillOpacity(before === 30 ? 31 : 30);
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(internals._fillOpacity).toBe(before);
    expect(schedule).not.toHaveBeenCalled();
  });
});

describe("TucbsStyleEditor stil uygulama", () => {
  it("planliyken gelen cagrilar yeniden planlamaz; tek uygulamada en guncel genislik kullanilir", async () => {
    const { internals, apply } = await open();
    internals._scheduleApplyStyle("3");
    internals._scheduleApplyStyle("4");
    expect(apply).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(apply).toHaveBeenCalledTimes(1);
    expect(apply.mock.calls[0]?.[1]).toMatchObject({ outline: { width: 4 } });
  });

  it("bekleyen stil uygulamasi DOM'dan kalkinca calismaz", async () => {
    const { el, internals, apply } = await open();
    internals._scheduleApplyStyle("3");
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(apply).not.toHaveBeenCalled();
  });
});

describe("TucbsStyleEditor liste olcumu (Faz 2)", () => {
  type ListInternals = { _categoryScroll: { sync(): void }; _legendScroll: { sync(): void } };
  type Statics = { _fitListToRows(list: HTMLDivElement | undefined, rowSelector: string): void };

  /** Editoru acar, yeni bir render tetikler; planlanan olcum karesi bekletilir (calistirilmaz). */
  async function renderAgain(): Promise<{ el: TucbsStyleEditor; fit: ReturnType<typeof vi.fn>; sync: ReturnType<typeof vi.fn> }> {
    const { el } = await open();
    const fit = vi.fn();
    vi.spyOn(TucbsStyleEditor as unknown as Statics, "_fitListToRows").mockImplementation(fit);
    const sync = vi.fn();
    const internals = el as unknown as ListInternals;
    internals._categoryScroll.sync = sync;
    internals._legendScroll.sync = sync;
    el.requestUpdate();
    await el.updateComplete;
    return { el, fit, sync };
  }

  it("render sonrasi bir kare sonra iki liste olculur ve scroll gostergeleri senkronlanir", async () => {
    const { fit, sync } = await renderAgain();
    expect(fit).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(fit).toHaveBeenCalledTimes(2);
    expect(sync).toHaveBeenCalledTimes(2);
  });

  it("bilesen DOM'dan kalkinca bekleyen olcum karesi calismaz", async () => {
    const { el, fit, sync } = await renderAgain();
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(fit).not.toHaveBeenCalled();
    expect(sync).not.toHaveBeenCalled();
  });
});
