// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTI -- God Component kilavuzu GC-04 5.4 Adim 2: taşımadan
// ONCE, TucbsIdentifyPanel._resetAccordionOpen/_scheduleScrollThumbSync'in
// BIREBIR AYNI mevcut davranisini (bkz deferredMeasure.ts yorumu: rAF + 150ms
// setTimeout, host koparsa ikinci cagrinin iptali) dondurur.
import { describe, expect, it, vi } from "vitest";
import type { ReactiveControllerHost } from "lit";
import { TimerBag } from "../shared/util/TimerBag.js";
import { deferredMeasure } from "./deferredMeasure.js";

const fakeHost: ReactiveControllerHost = {
  addController: () => {},
  removeController: () => {},
  requestUpdate: () => {},
  updateComplete: Promise.resolve(true),
};

describe("deferredMeasure", () => {
  it("fn'i hem bir sonraki animasyon karesinde HEM DE 150ms sonra tekrar calistirir", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame"],
    });
    try {
      const timers = new TimerBag(fakeHost);
      const fn = vi.fn();
      deferredMeasure(timers, fn);

      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersToNextFrame();
      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(150);
      expect(fn).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it("host kopunca (hostDisconnected) bekleyen rAF/setTimeout iptal olur, fn hic calismaz", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame"],
    });
    try {
      const timers = new TimerBag(fakeHost);
      const fn = vi.fn();
      deferredMeasure(timers, fn);

      timers.hostDisconnected();
      vi.advanceTimersToNextFrame();
      vi.advanceTimersByTime(150);

      expect(fn).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});
