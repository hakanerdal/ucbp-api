// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- ESLint uyarilari plani, Faz 2 (B grubu):
// onizlemenin konumunun ve kesfedilen katman listesinin scroll gostergesinin
// bir kare sonra yeniden olculmesini dondurur. ESKIDEN "BILINEN:" testleri,
// bu kareler ciplak requestAnimationFrame oldugu icin bilesen DOM'dan kalksa
// bile calistiklarini kilitliyordu; kareler TimerBag'e alininca cevrildi.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./TucbsServiceUpload.js";
import type { TucbsServiceUpload } from "./TucbsServiceUpload.js";

vi.mock("../map/TucbsMapPreview.js", () => {
  /** Yalnizca kendisine atanan degerleri tutan sahte onizleme elementi. */
  class FakeMapPreview extends HTMLElement {
    layerOptions: unknown;
    apiKey = "";
    width = "";
    height = "";
  }
  if (!customElements.get("tucbs-map-preview")) customElements.define("tucbs-map-preview", FakeMapPreview);
  return { TucbsMapPreview: FakeMapPreview };
});

type ServiceUploadInternals = {
  _listScroll: { sync(): void };
  _syncPreviewPosition(): void;
  _updatePreview(): void;
};

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

/** Diyalogu acik halde ekler; ilk render'in planladigi kareler bekletilir (calistirilmaz). */
async function mount(): Promise<{ el: TucbsServiceUpload; internals: ServiceUploadInternals }> {
  const el = document.createElement("tucbs-service-upload") as TucbsServiceUpload;
  el.open = true;
  document.body.appendChild(el);
  await el.updateComplete;
  return { el, internals: el as unknown as ServiceUploadInternals };
}

/** Onizlemenin gorunur oldugu durumu (en az bir kesfedilen katman) render tetiklemeden kurar. */
function withDiscoveredItem(el: TucbsServiceUpload): void {
  Object.defineProperty(el, "_discoveredItems", { value: [{ name: "yollar", title: "Yollar" }], configurable: true });
}

describe("TucbsServiceUpload kesfedilen liste scroll gostergesi", () => {
  it("render sonrasi bir kare sonra senkronlanir", async () => {
    const { internals } = await mount();
    const sync = vi.fn();
    internals._listScroll.sync = sync;
    vi.advanceTimersToNextFrame();
    expect(sync).toHaveBeenCalled();
  });

  it("bilesen DOM'dan kalkinca bekleyen senkron karesi calismaz", async () => {
    const { el, internals } = await mount();
    const sync = vi.fn();
    internals._listScroll.sync = sync;
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(sync).not.toHaveBeenCalled();
  });
});

describe("TucbsServiceUpload onizleme konumu", () => {
  it("hemen ve bir kare sonra tekrar olculur", async () => {
    const { el, internals } = await mount();
    vi.advanceTimersToNextFrame();
    withDiscoveredItem(el);
    const position = vi.fn();
    internals._syncPreviewPosition = position;
    internals._updatePreview();
    expect(position).toHaveBeenCalledTimes(1);
    vi.advanceTimersToNextFrame();
    expect(position).toHaveBeenCalledTimes(2);
  });

  it("bilesen DOM'dan kalkinca ikinci olcum karesi calismaz", async () => {
    const { el, internals } = await mount();
    vi.advanceTimersToNextFrame();
    withDiscoveredItem(el);
    const position = vi.fn();
    internals._syncPreviewPosition = position;
    internals._updatePreview();
    el.remove();
    vi.advanceTimersToNextFrame();
    expect(position).toHaveBeenCalledTimes(1);
  });
});
