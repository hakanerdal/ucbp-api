// @vitest-environment jsdom
//
// suspend() sadece durum DEGISTIGINDE "interaction:suspend" yayar.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ScreenSpaceEventHandler, type Viewer } from "cesium";
import { InteractionManager } from "./InteractionManager.js";

const evt = () => ({ addEventListener: vi.fn(() => vi.fn()) });

describe("InteractionManager -- interaction:suspend", () => {
  let im: InteractionManager;
  let onSuspend: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    const canvas = document.createElement("canvas");
    const viewer = {
      scene: {
        canvas,
        preRender: evt(),
        postRender: evt(),
        morphStart: evt(),
        morphComplete: evt(),
      },
      camera: { moveStart: evt(), moveEnd: evt(), changed: evt() },
      screenSpaceEventHandler: new ScreenSpaceEventHandler(canvas),
    } as unknown as Viewer;
    im = new InteractionManager(viewer);
    onSuspend = vi.fn();
    im.on("interaction:suspend", onSuspend);
  });

  it("suspend() olayi bir kez yayar ve durumu isSuspended'a yansitir", () => {
    im.suspend();
    expect(onSuspend).toHaveBeenCalledTimes(1);
    expect(im.isSuspended()).toBe(true);
  });

  it("zaten durdurulmusken tekrar suspend() olayi tekrar yaymaz", () => {
    im.suspend();
    im.suspend();
    expect(onSuspend).toHaveBeenCalledTimes(1);
  });

  it("resume() sonrasi tekrar suspend() olayi yeniden yayar", () => {
    im.suspend();
    im.resume();
    im.suspend();
    expect(onSuspend).toHaveBeenCalledTimes(2);
  });

  it("resume() olay yaymaz", () => {
    im.suspend();
    onSuspend.mockClear();
    im.resume();
    expect(onSuspend).not.toHaveBeenCalled();
  });
});
