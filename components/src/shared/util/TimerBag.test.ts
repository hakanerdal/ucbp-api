// @vitest-environment jsdom
//
// UNIT TESTLERI -- TimerBag'in kendi davranisini sabitler (ESLint uyarilari
// plani, Faz 0). Bilesenlerdeki ciplak setTimeout/requestAnimationFrame
// cagrilari (Faz 1-2) bu sinifa tasinmadan once, sinifin kendisinin
// dogru calistigi ve yeni eklenen cancelAnimationFrame'in iptal ettigi
// kareyi hostDisconnected'da tekrar iptal etmeye calismadigi gosterilir.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import { TimerBag } from "./TimerBag.js";

function createHost(): ReactiveControllerHost & { controllers: ReactiveController[] } {
  const controllers: ReactiveController[] = [];
  return {
    controllers,
    addController: (controller) => controllers.push(controller),
    removeController: () => {},
    requestUpdate: () => {},
    updateComplete: Promise.resolve(true),
  };
}

describe("TimerBag", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame"],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("kurulurken kendini host'a controller olarak ekler", () => {
    const host = createHost();
    const timers = new TimerBag(host);
    expect(host.controllers).toEqual([timers]);
  });

  it("setTimeout, fn'i verilen sure dolunca bir kez calistirir", () => {
    const timers = new TimerBag(createHost());
    const fn = vi.fn();
    timers.setTimeout(fn, 100);

    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("clearTimeout, bekleyen zamanlayiciyi iptal eder; null ile cagrilmasi guvenlidir", () => {
    const timers = new TimerBag(createHost());
    const fn = vi.fn();
    const id = timers.setTimeout(fn, 100);

    timers.clearTimeout(id);
    timers.clearTimeout(null);
    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();
  });

  it("requestAnimationFrame, fn'i bir sonraki karede bir kez calistirir", () => {
    const timers = new TimerBag(createHost());
    const fn = vi.fn();
    timers.requestAnimationFrame(fn);

    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersToNextFrame();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancelAnimationFrame, bekleyen kareyi iptal eder; null ile cagrilmasi guvenlidir", () => {
    const timers = new TimerBag(createHost());
    const fn = vi.fn();
    const id = timers.requestAnimationFrame(fn);

    timers.cancelAnimationFrame(id);
    timers.cancelAnimationFrame(null);
    vi.advanceTimersToNextFrame();
    expect(fn).not.toHaveBeenCalled();
  });

  it("cancelAnimationFrame ile iptal edilen kare izlemeden duser; hostDisconnected onu tekrar iptal etmez", () => {
    const timers = new TimerBag(createHost());
    const id = timers.requestAnimationFrame(() => {});
    timers.cancelAnimationFrame(id);

    const cancelSpy = vi.spyOn(globalThis, "cancelAnimationFrame");
    timers.hostDisconnected();
    expect(cancelSpy).not.toHaveBeenCalled();
    cancelSpy.mockRestore();
  });

  it("hostDisconnected, bekleyen TUM zamanlayicilari ve kareleri iptal eder", () => {
    const timers = new TimerBag(createHost());
    const timeoutFn = vi.fn();
    const frameFn = vi.fn();
    timers.setTimeout(timeoutFn, 50);
    timers.setTimeout(timeoutFn, 200);
    timers.requestAnimationFrame(frameFn);
    timers.requestAnimationFrame(frameFn);

    timers.hostDisconnected();
    vi.advanceTimersToNextFrame();
    vi.advanceTimersByTime(200);
    expect(timeoutFn).not.toHaveBeenCalled();
    expect(frameFn).not.toHaveBeenCalled();
  });

  it("calismis zamanlayici ve kareler izlemeden duser; hostDisconnected onlari iptal etmeye calismaz", () => {
    const timers = new TimerBag(createHost());
    timers.setTimeout(() => {}, 10);
    timers.requestAnimationFrame(() => {});
    vi.advanceTimersToNextFrame();
    vi.advanceTimersByTime(10);

    const clearSpy = vi.spyOn(window, "clearTimeout");
    const cancelSpy = vi.spyOn(globalThis, "cancelAnimationFrame");
    timers.hostDisconnected();
    expect(clearSpy).not.toHaveBeenCalled();
    expect(cancelSpy).not.toHaveBeenCalled();
    clearSpy.mockRestore();
    cancelSpy.mockRestore();
  });

  it("hostDisconnected sonrasinda yeni zamanlayici kurulabilir (bilesen DOM'a geri eklenince)", () => {
    const timers = new TimerBag(createHost());
    timers.hostDisconnected();
    const fn = vi.fn();
    timers.setTimeout(fn, 10);
    timers.requestAnimationFrame(fn);

    vi.advanceTimersToNextFrame();
    vi.advanceTimersByTime(10);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
