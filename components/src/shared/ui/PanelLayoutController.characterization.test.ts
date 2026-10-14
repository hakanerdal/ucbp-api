// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- ESLint uyarilari plani, Faz 1 (shared/ui):
// harita container'i boyut degistirirken map.resize()'in kare basina en fazla
// bir kez cagrilmasini ve unbindMap'in bekleyen kareyi iptal etmesini,
// requestAnimationFrame TimerBag'e tasinmadan ONCE dondurur.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import { PanelLayoutController } from "./PanelLayoutController.js";

let resizeCallbacks: Array<() => void> = [];

class FakeResizeObserver {
  constructor(callback: () => void) {
    resizeCallbacks.push(callback);
  }
  observe(): void {}
  disconnect(): void {}
}

/** Lit bileseni gibi davranan (controller eklenebilen) sahte host. */
function createHost(): HTMLElement {
  return Object.assign(document.createElement("div"), {
    addController: () => {},
    removeController: () => {},
    requestUpdate: () => {},
    updateComplete: Promise.resolve(true),
  });
}

function createMap(): { map: TucbsMapInstance; resize: ReturnType<typeof vi.fn> } {
  const resize = vi.fn();
  const map = { viewer: { container: document.createElement("div") }, resize } as unknown as TucbsMapInstance;
  return { map, resize };
}

function notifyResize(): void {
  for (const callback of resizeCallbacks) callback();
}

beforeEach(() => {
  resizeCallbacks = [];
  vi.stubGlobal("ResizeObserver", FakeResizeObserver);
  vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("PanelLayoutController harita yeniden boyutlandirma", () => {
  it("ayni karedeki birden cok boyut degisikligi map.resize'i bir kez cagirir", () => {
    const controller = new PanelLayoutController(createHost() as never);
    const { map, resize } = createMap();
    controller.bindMap(map);
    notifyResize();
    notifyResize();
    expect(resize).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(resize).toHaveBeenCalledTimes(1);
    controller.unbindMap(map);
  });

  it("kare calistiktan sonra gelen yeni degisiklik yeniden planlanir", () => {
    const controller = new PanelLayoutController(createHost() as never);
    const { map, resize } = createMap();
    controller.bindMap(map);
    notifyResize();
    vi.advanceTimersToNextFrame();
    notifyResize();
    vi.advanceTimersToNextFrame();
    expect(resize).toHaveBeenCalledTimes(2);
    controller.unbindMap(map);
  });

  it("unbindMap bekleyen kareyi iptal eder; yalnizca kendi son resize'i calisir", () => {
    const controller = new PanelLayoutController(createHost() as never);
    const { map, resize } = createMap();
    controller.bindMap(map);
    notifyResize();
    controller.unbindMap(map);
    expect(resize).toHaveBeenCalledTimes(1);
    vi.advanceTimersToNextFrame();
    expect(resize).toHaveBeenCalledTimes(1);
  });
});
