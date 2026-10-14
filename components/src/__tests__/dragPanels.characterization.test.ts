// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Klasor yapisi ve seçici bölme planı, Faz 0.4-b.
// Bes bilesendeki elle yazilmis "baslik cubugundan surukle" kopyasinin
// (_startDrag/_moveDrag/_endDrag ve TucbsAuthorizedLayers'ta
// _startDialogDrag/... -- Faz 2.4'te DraggablePanelController'a indirilecek)
// MEVCUT davranisini, bilesene ozgu farklarla birlikte dondurur:
//   - suruklenen eleman: host'un kendisi (StyleEditor/ServiceUpload/
//     FileUpload) ya da shadow DOM'daki .attr-panel (IdentifyPanel) /
//     .authorized-dialog (AuthorizedLayers),
//   - surukleme BASLATMAYAN butonlar (ServiceUpload'da ek olarak .reset-btn),
//   - ServiceUpload'un her harekette onizleme konumunu senkronlamasi.
// Faz 2.4 🐞: surukleme sirasinda bilesen kaldirilinca bes bilesende de
// dinleyiciler temizlenir (DraggablePanelController.hostDisconnected).
// TucbsGoToCoordinate bilerek kapsam disi (toolbar kaymasi hesabi var,
// transform sifirlamiyor -- Faz 2.2'de controller'a gecirilmeyecek).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LitElement } from "lit";
import { createFakeLayerManager } from "./fixtures/fakeLayerManager.js";
import "../layer-sources/TucbsFileUpload.js";
import "../identify/TucbsIdentifyPanel.js";
import "../layer-sources/TucbsServiceUpload.js";
import "../style-editor/TucbsStyleEditor.js";
import "../layer-sources/TucbsAuthorizedLayers.js";

interface DragCase {
  /** Custom element tag'i. */
  tag: string;
  /** Surukleme baslatan baslik elemaninin shadow DOM secicisi. */
  headerSelector: string;
  /** Surukleme BASLATMAMASI gereken buton secicileri. */
  ignoredSelectors: string[];
  /** Bileseni surukleme basligi gorunur olacak sekilde acar. */
  open: (el: LitElement) => void;
  /** Konumu degisen eleman: host'un kendisi ya da shadow DOM'daki bir panel. */
  panel: (el: LitElement) => HTMLElement;
}

const hostPanel = (el: LitElement): HTMLElement => el;

const CASES: DragCase[] = [
  {
    tag: "tucbs-style-editor",
    headerSelector: ".header",
    ignoredSelectors: [".close-btn"],
    open: (el) => {
      const editor = el as LitElement & {
        layerManager: unknown;
        openFor(id: string, title: string, type: string): void;
      };
      editor.layerManager = createFakeLayerManager();
      editor.openFor("layer-1", "Test Katmanı", "GEOJSON");
    },
    panel: hostPanel,
  },
  {
    tag: "tucbs-service-upload",
    headerSelector: ".header",
    ignoredSelectors: [".close-btn", ".reset-btn"],
    open: (el) => Object.assign(el, { open: true }),
    panel: hostPanel,
  },
  {
    tag: "tucbs-file-upload",
    headerSelector: ".header",
    ignoredSelectors: [".close-btn"],
    open: (el) => Object.assign(el, { open: true }),
    panel: hostPanel,
  },
  {
    tag: "tucbs-identify-panel",
    headerSelector: ".attr-header",
    ignoredSelectors: [".attr-close-btn"],
    open: () => {},
    panel: (el) => el.shadowRoot!.querySelector<HTMLElement>(".attr-panel")!,
  },
  {
    tag: "tucbs-authorized-layers",
    headerSelector: ".authorized-dialog-header",
    ignoredSelectors: [".authorized-dialog-close"],
    open: (el) => Object.assign(el, { _authorizedPickerOpen: true }),
    panel: (el) => el.shadowRoot!.querySelector<HTMLElement>(".authorized-dialog")!,
  },
];

const RECT = { left: 100, top: 50, width: 300, height: 200, right: 400, bottom: 250, x: 100, y: 50 };

/** jsdom'da PointerEvent kurucusu olmayabildigi icin pointerId eklenmis bir MouseEvent uretir. */
function pointer(
  type: string,
  init: { button?: number; clientX?: number; clientY?: number; pointerId?: number } = {},
): MouseEvent {
  const event = new MouseEvent(type, {
    bubbles: true,
    composed: true,
    button: init.button ?? 0,
    clientX: init.clientX ?? 0,
    clientY: init.clientY ?? 0,
  });
  Object.defineProperty(event, "pointerId", { value: init.pointerId ?? 1 });
  return event;
}

/** Bileseni olusturur, acar, DOM'a ekler; suruklenen panelin konumunu sabit bir dikdortgene sabitler. */
async function mount(tc: DragCase): Promise<{ el: LitElement; header: HTMLElement; panel: HTMLElement }> {
  const el = document.createElement(tc.tag) as LitElement;
  document.body.appendChild(el);
  tc.open(el);
  await el.updateComplete;
  const header = el.shadowRoot!.querySelector<HTMLElement>(tc.headerSelector);
  if (!header) throw new Error(`${tc.tag}: ${tc.headerSelector} bulunamadi`);
  const panel = tc.panel(el);
  panel.getBoundingClientRect = () => RECT as DOMRect;
  return { el, header, panel };
}

/** Panelin konumla ilgili inline stilleri. */
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

describe.each(CASES)("$tag -- baslik cubugundan surukleme (karakterizasyon)", (tc) => {
  it("sol tik disindaki tuslarla surukleme baslamaz", async () => {
    const { header, panel } = await mount(tc);
    const before = position(panel);
    header.dispatchEvent(pointer("pointerdown", { button: 2, clientX: 130, clientY: 80 }));
    expect(position(panel)).toEqual(before);
    expect(captureSpy).not.toHaveBeenCalled();
  });

  it.each(tc.ignoredSelectors)("%s uzerinde basilinca surukleme baslamaz", async (selector) => {
    const { el, panel } = await mount(tc);
    const before = position(panel);
    const button = el.shadowRoot!.querySelector<HTMLElement>(selector);
    expect(button).not.toBeNull();
    button!.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    expect(position(panel)).toEqual(before);
    expect(captureSpy).not.toHaveBeenCalled();
  });

  it("baslangicta paneli mevcut konumuna sabitler, transform'u kaldirir ve pointer'i yakalar", async () => {
    const { header, panel } = await mount(tc);
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80, pointerId: 7 }));
    expect(position(panel)).toEqual({ left: "100px", top: "50px", transform: "none" });
    expect(captureSpy).toHaveBeenCalledTimes(1);
    expect(captureSpy.mock.contexts[0]).toBe(header);
    expect(captureSpy).toHaveBeenCalledWith(7);
  });

  it("hareket sirasinda tutma noktasi sabit kalacak sekilde paneli tasir", async () => {
    const { header, panel } = await mount(tc);
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    header.dispatchEvent(pointer("pointermove", { clientX: 200, clientY: 150 }));
    expect(position(panel)).toEqual({ left: "170px", top: "120px", transform: "none" });
    header.dispatchEvent(pointer("pointermove", { clientX: 31, clientY: 31 }));
    expect(position(panel)).toEqual({ left: "1px", top: "1px", transform: "none" });
  });

  it.each(["pointerup", "pointercancel"])("%s sonrasi hareket paneli tasimaz", async (endType) => {
    const { header, panel } = await mount(tc);
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    header.dispatchEvent(pointer(endType));
    const after = position(panel);
    header.dispatchEvent(pointer("pointermove", { clientX: 500, clientY: 500 }));
    expect(position(panel)).toEqual(after);
  });

  it("bitiste pointer yalnizca hala yakalanmissa birakilir", async () => {
    const { header } = await mount(tc);
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80, pointerId: 3 }));
    header.dispatchEvent(pointer("pointerup", { pointerId: 3 }));
    expect(releaseSpy).not.toHaveBeenCalled();

    vi.spyOn(Element.prototype, "hasPointerCapture").mockReturnValue(true);
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80, pointerId: 4 }));
    header.dispatchEvent(pointer("pointerup", { pointerId: 4 }));
    expect(releaseSpy).toHaveBeenCalledTimes(1);
    expect(releaseSpy).toHaveBeenCalledWith(4);
  });

  // Faz 2.4 🐞 DUZELTMESI: eskiden surukleme ortasinda bilesen DOM'dan
  // kaldirilirsa baslik dinleyicileri temizlenmiyordu ("BILINEN" testi);
  // artik DraggablePanelController.hostDisconnected() kaldiriyor.
  it("surukleme sirasinda bilesen kaldirilirsa dinleyiciler temizlenir, panel tasinmaz", async () => {
    const { el, header, panel } = await mount(tc);
    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    el.remove();
    header.dispatchEvent(pointer("pointermove", { clientX: 200, clientY: 150 }));
    expect(position(panel)).toEqual({ left: "100px", top: "50px", transform: "none" });
  });
});

describe("tucbs-service-upload -- surukleme sirasinda onizleme senkronu (karakterizasyon)", () => {
  it("her harekette onizleme konumunu bir kez senkronlar, bitisten sonra senkronlamaz", async () => {
    const tc = CASES.find((c) => c.tag === "tucbs-service-upload")!;
    const { el, header } = await mount(tc);
    const sync = vi.fn();
    (el as unknown as { _syncPreviewPosition: () => void })._syncPreviewPosition = sync;

    header.dispatchEvent(pointer("pointerdown", { clientX: 130, clientY: 80 }));
    expect(sync).not.toHaveBeenCalled();
    header.dispatchEvent(pointer("pointermove", { clientX: 200, clientY: 150 }));
    header.dispatchEvent(pointer("pointermove", { clientX: 210, clientY: 160 }));
    expect(sync).toHaveBeenCalledTimes(2);
    header.dispatchEvent(pointer("pointerup"));
    header.dispatchEvent(pointer("pointermove", { clientX: 220, clientY: 170 }));
    expect(sync).toHaveBeenCalledTimes(2);
  });
});
