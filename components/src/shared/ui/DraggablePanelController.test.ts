// @vitest-environment jsdom
//
// UNIT TESTLERI -- Faz 2.4: DraggablePanelController'in kendi (bilesenlerden
// bagimsiz) davranisini sabitler. Bes bilesenin bu controller'la birlikte
// calistigi __tests__/dragPanels.characterization.test'te ayrica dondurulur.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactiveControllerHost } from "lit";
import { DraggablePanelController } from "./DraggablePanelController.js";

const RECT = { left: 100, top: 50, width: 300, height: 200, right: 400, bottom: 250, x: 100, y: 50 };

/** jsdom'da PointerEvent kurucusu olmayabildigi icin pointerId eklenmis bir MouseEvent uretir. */
function pointer(
  type: string,
  init: { button?: number; clientX?: number; clientY?: number; pointerId?: number } = {},
): PointerEvent {
  const event = new MouseEvent(type, {
    bubbles: true,
    button: init.button ?? 0,
    clientX: init.clientX ?? 0,
    clientY: init.clientY ?? 0,
  });
  Object.defineProperty(event, "pointerId", { value: init.pointerId ?? 1 });
  return event as PointerEvent;
}

/** Panel + icinde baslik + baslikta kapat butonu kurar; baslik pointerdown'i controller'a baglanir. */
function setup(options: { onMove?: () => void; noPanel?: boolean } = {}) {
  const panel = document.createElement("div");
  const header = document.createElement("div");
  const close = document.createElement("button");
  close.className = "close-btn";
  header.appendChild(close);
  panel.appendChild(header);
  document.body.appendChild(panel);
  panel.getBoundingClientRect = () => RECT as DOMRect;

  const getPanel = vi.fn((_header: HTMLElement) => (options.noPanel ? null : panel));
  const host = { addController: vi.fn() };
  const drag = new DraggablePanelController(host as unknown as ReactiveControllerHost, {
    getPanel,
    ignoreSelector: ".close-btn",
    ...(options.onMove ? { onMove: options.onMove } : {}),
  });
  header.addEventListener("pointerdown", (event) => drag.start(event as PointerEvent));
  return { panel, header, close, drag, getPanel, host };
}

const position = (panel: HTMLElement) => ({
  left: panel.style.left,
  top: panel.style.top,
  transform: panel.style.transform,
});

let captureSpy: ReturnType<typeof vi.spyOn>;
let releaseSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  captureSpy = vi.spyOn(Element.prototype, "setPointerCapture");
  releaseSpy = vi.spyOn(Element.prototype, "releasePointerCapture");
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("DraggablePanelController (shared/ui/DraggablePanelController.ts) -- izole", () => {
  it("sol tik disindaki tuslarla surukleme baslamaz, panel sorulmaz", () => {
    const { header, panel, getPanel } = setup();
    header.dispatchEvent(pointer("pointerdown", { button: 1 }));
    expect(getPanel).not.toHaveBeenCalled();
    expect(position(panel)).toEqual({ left: "", top: "", transform: "" });
    expect(captureSpy).not.toHaveBeenCalled();
  });

  it("ignoreSelector'e uyan elemandan baslayan basis surukleme baslatmaz", () => {
    const { close, panel } = setup();
    close.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    expect(position(panel)).toEqual({ left: "", top: "", transform: "" });
    expect(captureSpy).not.toHaveBeenCalled();
  });

  it("getPanel panel dondurmezse surukleme baslamaz", () => {
    const { header, getPanel } = setup({ noPanel: true });
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    expect(getPanel).toHaveBeenCalledWith(header);
    expect(captureSpy).not.toHaveBeenCalled();
  });

  it("baslangicta paneli mevcut konumuna sabitler, transform'u kaldirir, baslikta pointer'i yakalar", () => {
    const { header, panel } = setup();
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80, pointerId: 9 }));
    expect(position(panel)).toEqual({ left: "100px", top: "50px", transform: "none" });
    expect(captureSpy.mock.contexts[0]).toBe(header);
    expect(captureSpy).toHaveBeenCalledWith(9);
  });

  it("hareketlerde tutma noktasi sabit kalir ve her harekette onMove cagrilir", () => {
    const onMove = vi.fn();
    const { header, panel } = setup({ onMove });
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    header.dispatchEvent(pointer("pointermove", { clientX: 200, clientY: 150 }));
    expect(position(panel)).toEqual({ left: "170px", top: "120px", transform: "none" });
    header.dispatchEvent(pointer("pointermove", { clientX: 31, clientY: 31 }));
    expect(position(panel)).toEqual({ left: "1px", top: "1px", transform: "none" });
    expect(onMove).toHaveBeenCalledTimes(2);
  });

  it.each(["pointerup", "pointercancel"])("%s sonrasi hareket paneli tasimaz, onMove cagrilmaz", (endType) => {
    const onMove = vi.fn();
    const { header, panel } = setup({ onMove });
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    header.dispatchEvent(pointer(endType));
    header.dispatchEvent(pointer("pointermove", { clientX: 500, clientY: 500 }));
    expect(position(panel)).toEqual({ left: "100px", top: "50px", transform: "none" });
    expect(onMove).not.toHaveBeenCalled();
  });

  it("bitiste pointer yalnizca hala yakalanmissa birakilir", () => {
    const { header } = setup();
    header.dispatchEvent(pointer("pointerdown", { pointerId: 3 }));
    header.dispatchEvent(pointer("pointerup", { pointerId: 3 }));
    expect(releaseSpy).not.toHaveBeenCalled();

    vi.spyOn(Element.prototype, "hasPointerCapture").mockReturnValue(true);
    header.dispatchEvent(pointer("pointerdown", { pointerId: 4 }));
    header.dispatchEvent(pointer("pointerup", { pointerId: 4 }));
    expect(releaseSpy).toHaveBeenCalledTimes(1);
    expect(releaseSpy).toHaveBeenCalledWith(4);
  });

  it("cancel() surukleme sirasinda dinleyicileri kaldirir; sonraki hareket paneli tasimaz", () => {
    const { header, panel, drag } = setup();
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    drag.cancel();
    header.dispatchEvent(pointer("pointermove", { clientX: 200, clientY: 150 }));
    expect(position(panel)).toEqual({ left: "100px", top: "50px", transform: "none" });
  });

  it("kendini host'a controller olarak kaydeder", () => {
    const { host, drag } = setup();
    expect(host.addController).toHaveBeenCalledWith(drag);
  });

  it("hostDisconnected() surukleme sirasinda dinleyicileri kaldirir; sonraki hareket paneli tasimaz", () => {
    const onMove = vi.fn();
    const { header, panel, drag } = setup({ onMove });
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    drag.hostDisconnected();
    header.dispatchEvent(pointer("pointermove", { clientX: 200, clientY: 150 }));
    expect(position(panel)).toEqual({ left: "100px", top: "50px", transform: "none" });
    expect(onMove).not.toHaveBeenCalled();
  });

  it("cancel() surukleme yokken bir sey yapmaz; sonraki surukleme normal calisir", () => {
    const { header, panel, drag } = setup();
    drag.cancel();
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    header.dispatchEvent(pointer("pointermove", { clientX: 200, clientY: 150 }));
    expect(position(panel)).toEqual({ left: "170px", top: "120px", transform: "none" });
  });
});
