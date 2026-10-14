// @vitest-environment jsdom
//
// God Component kilavuzu GC-03 4.4 Adim 5: TucbsLayerList'ten tasinan
// surukle-birak pointer/DOM mekaniginin IZOLE birim testleri
// (TucbsLayerList'ten BAGIMSIZ -- is-mantigi karsilastirmasi icin bkz
// TucbsLayerList.dragReorder.characterization.test.ts).
//
// jsdom GEREKLI. setPointerCapture/hasPointerCapture/releasePointerCapture
// icin __tests__/setup.ts'teki no-op polyfill kullanilir (bkz o dosyanin WHY
// yorumu) -- gercek konumlandirma/capture davranisi SADECE gercek tarayici
// Playwright testiyle dogrulanir.
import { afterEach, describe, expect, it, vi } from "vitest";
import { DragReorder } from "./DragReorder.js";

function rect(top: number, height = 40): DOMRect {
  return {
    top,
    left: 0,
    width: 200,
    height,
    bottom: top + height,
    right: 200,
    x: 0,
    y: top,
    toJSON() {},
  } as DOMRect;
}

function makeItem(layerId: string, top: number): HTMLElement {
  const el = document.createElement("div");
  el.className = "layer-item";
  el.dataset.layerId = layerId;
  el.getBoundingClientRect = () => rect(top);
  return el;
}

function setup(ids: string[]): { list: HTMLElement; items: HTMLElement[] } {
  const list = document.createElement("div");
  document.body.appendChild(list);
  const items = ids.map((id, i) => makeItem(id, i * 40));
  items.forEach((item) => list.appendChild(item));
  return { list, items };
}

describe("DragReorder", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("sol tık DIŞINDA bir butonla başlatılmaya çalışılırsa HİÇBİR ŞEY yapmaz", () => {
    const { list, items } = setup(["A", "B"]);
    const dragReorder = new DragReorder(() => {});

    dragReorder.start(
      new PointerEvent("pointerdown", { button: 1, pointerId: 1, clientY: 0 }),
      items[0]!,
      items[0]!,
      list,
    );

    expect(list.querySelector(".layer-placeholder")).toBeNull();
  });

  it("start() yer tutucu oluşturur, sürüklenen öğeye dragging class'ı ve inline konum ekler", () => {
    const { list, items } = setup(["A", "B", "C"]);
    const dragReorder = new DragReorder(() => {});

    dragReorder.start(
      new PointerEvent("pointerdown", { button: 0, pointerId: 1, clientY: 10 }),
      items[0]!,
      items[0]!,
      list,
    );

    expect(list.querySelector(".layer-placeholder")).not.toBeNull();
    expect(items[0]!.classList.contains("layer-item--dragging")).toBe(true);
    expect(items[0]!.style.left).toBe("0px");
  });

  it("zaten sürükleniyorken ikinci start() çağrısı YOKSAYILIR (ikinci yer tutucu eklenmez)", () => {
    const { list, items } = setup(["A", "B"]);
    const dragReorder = new DragReorder(() => {});

    dragReorder.start(
      new PointerEvent("pointerdown", { button: 0, pointerId: 1, clientY: 0 }),
      items[0]!,
      items[0]!,
      list,
    );
    dragReorder.start(
      new PointerEvent("pointerdown", { button: 0, pointerId: 2, clientY: 0 }),
      items[1]!,
      items[1]!,
      list,
    );

    expect(list.querySelectorAll(".layer-placeholder").length).toBe(1);
  });

  it("pointermove ile yer tutucu doğru komşunun ÖNÜNE taşınır", () => {
    const { list, items } = setup(["A", "B", "C"]);
    const dragReorder = new DragReorder(() => {});
    dragReorder.start(
      new PointerEvent("pointerdown", { button: 0, pointerId: 1, clientY: 10 }),
      items[0]!,
      items[0]!,
      list,
    );

    // B'nin ortasi(60) ONCESINDE, C'nin ortasi(100) ONCESINDE -- C'nin onune gelmeli.
    window.dispatchEvent(new PointerEvent("pointermove", { pointerId: 1, clientY: 70 }));

    const placeholder = list.querySelector(".layer-placeholder")!;
    expect(placeholder.nextElementSibling).toBe(items[2]);
  });

  it("pointermove ile yer tutucu HİÇBİR komşunun önüne gelmiyorsa listenin SONUNA taşınır", () => {
    const { list, items } = setup(["A", "B", "C"]);
    const dragReorder = new DragReorder(() => {});
    dragReorder.start(
      new PointerEvent("pointerdown", { button: 0, pointerId: 1, clientY: 10 }),
      items[0]!,
      items[0]!,
      list,
    );

    // C'nin ortasindan (100) SONRA -- hicbir komsunun onune gelmez.
    window.dispatchEvent(new PointerEvent("pointermove", { pointerId: 1, clientY: 110 }));

    const placeholder = list.querySelector(".layer-placeholder")!;
    expect(placeholder.nextElementSibling).toBeNull();
    expect(list.lastElementChild).toBe(placeholder);
  });

  it("pointerup ile onReorder(draggedId, nextId) doğru sırayla çağrılır, DOM temizlenir", () => {
    const { list, items } = setup(["A", "B", "C"]);
    const onReorder = vi.fn();
    const dragReorder = new DragReorder(onReorder);
    dragReorder.start(
      new PointerEvent("pointerdown", { button: 0, pointerId: 1, clientY: 10 }),
      items[0]!,
      items[0]!,
      list,
    );
    window.dispatchEvent(new PointerEvent("pointermove", { pointerId: 1, clientY: 70 }));

    window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 1 }));

    expect(onReorder).toHaveBeenCalledWith("A", "C");
    expect(list.querySelector(".layer-placeholder")).toBeNull();
    expect(items[0]!.classList.contains("layer-item--dragging")).toBe(false);
    expect(items[0]!.getAttribute("style")).toBeNull();
  });

  it("farklı bir pointerId'den gelen pointermove/pointerup YOKSAYILIR", () => {
    const { list, items } = setup(["A", "B"]);
    const onReorder = vi.fn();
    const dragReorder = new DragReorder(onReorder);
    dragReorder.start(
      new PointerEvent("pointerdown", { button: 0, pointerId: 1, clientY: 0 }),
      items[0]!,
      items[0]!,
      list,
    );

    window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 99 }));

    expect(onReorder).not.toHaveBeenCalled();
    expect(list.querySelector(".layer-placeholder")).not.toBeNull();
  });

  it("dispose() aktif sürüklemeyi iptal eder -- SONRAKİ pointerup onReorder'ı TETİKLEMEZ", () => {
    const { list, items } = setup(["A", "B"]);
    const onReorder = vi.fn();
    const dragReorder = new DragReorder(onReorder);
    dragReorder.start(
      new PointerEvent("pointerdown", { button: 0, pointerId: 1, clientY: 0 }),
      items[0]!,
      items[0]!,
      list,
    );

    dragReorder.dispose();
    window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 1 }));

    expect(onReorder).not.toHaveBeenCalled();
  });

  it("dispose() sürükleme YOKKEN çağrılırsa hata fırlatmaz (guard)", () => {
    const dragReorder = new DragReorder(() => {});
    expect(() => dragReorder.dispose()).not.toThrow();
  });
});
