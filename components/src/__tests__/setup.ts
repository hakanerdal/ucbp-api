// jsdom (bkz TucbsStyleEditor.characterization.test.ts) ResizeObserver'i
// UYGULAMIYOR -- @carbon/web-components'in dropdown-item'i (secili oge
// isaretlenirken) bunu KOŞULSUZ kullaniyor. Gercek tarayicida/Vite dev
// server'inda hicbir sorun yok; SADECE jsdom'da eksik oldugu icin burada
// no-op bir polyfill yeterli (test, gercek boyut olcumlerine bakmiyor).
if (typeof globalThis.ResizeObserver === "undefined") {
  class NoopResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  // Test ortamina ozgu minimal polyfill (ResizeObserver tipine yapisal olarak uyar).
  globalThis.ResizeObserver = NoopResizeObserver;
}

// Node 22+ KENDI yerlesik `globalThis.localStorage`'ini getiriyor (bkz
// node:internal/webstorage) -- jsdom'un Window'u gercek bir custom element
// construct edilirken (ör. TucbsLayerList/TucbsStyleEditor portallari)
// BUNA erisiyor, ve Node'un yerlesik implementasyonu `--localstorage-file`
// CLI bayragi verilmeden "SecurityError: Cannot initialize local storage
// without a `--localstorage-file` path" firlatiyor. Gercek tarayicida
// (veya Vite dev server'inda) hicbir sorun yok -- bu SADECE Node'un komut
// satiri bayragi gerektiren yerlesik Storage API'siyle jsdom'un etkilesimine
// ozgu (test gercek kalici depolamaya bakmiyor, bellek-ici bir Map yeterli).
try {
  globalThis.localStorage?.getItem("__probe__");
} catch {
  class MemoryStorage implements Storage {
    private readonly map = new Map<string, string>();
    get length(): number {
      return this.map.size;
    }
    clear(): void {
      this.map.clear();
    }
    getItem(key: string): string | null {
      return this.map.has(key) ? this.map.get(key)! : null;
    }
    key(index: number): string | null {
      return [...this.map.keys()][index] ?? null;
    }
    removeItem(key: string): void {
      this.map.delete(key);
    }
    setItem(key: string, value: string): void {
      this.map.set(key, value);
    }
  }
  Object.defineProperty(globalThis, "localStorage", {
    value: new MemoryStorage(),
    writable: true,
    configurable: true,
  });
}

// jsdom `PointerEvent`'i uyguluyor ama Element.setPointerCapture/
// hasPointerCapture/releasePointerCapture'i HIC TANIMLAMIYOR --
// layer-list/DragReorder.ts (surukle-birak) bunlari KOŞULSUZ cagiriyor.
// Gercek tarayicida hicbir sorun yok; SADECE jsdom'da eksik oldugu icin
// burada no-op bir polyfill yeterli (capture'in GERCEK tarayici davranisi
// -- hover/pointer olaylarini yakalama -- zaten testler icin onemsiz,
// bkz DragReorder.ts'teki window-seviyesi dinleme WHY yorumu).
if (
  typeof globalThis.Element !== "undefined" &&
  typeof globalThis.Element.prototype.setPointerCapture !== "function"
) {
  globalThis.Element.prototype.setPointerCapture = function (): void {};
  globalThis.Element.prototype.releasePointerCapture = function (): void {};
  globalThis.Element.prototype.hasPointerCapture = function (): boolean {
    return false;
  };
}

// jsdom, ShadowRoot'ta `adoptedStyleSheets`'i HIC TANIMLAMIYOR (okununca
// `undefined` doner) -- shared/util/CustomCss.ts (bkz. o dosyanin WHY yorumu)
// `[...shadowRoot.adoptedStyleSheets, sheet]` ile yayarak kullandigi icin
// gercek tarayicida HER ZAMAN bos dizi olan bu alanin jsdom'da eksik olmasi
// "is not iterable" hatasina yol aciyor. attachShadow() sarmalanarak
// dondurulen her ShadowRoot'a varsayilan bos dizi atanir (CSSStyleSheet
// constructor'i/replaceSync'i jsdom'da zaten calisiyor, SADECE bu alan eksik).
if (typeof globalThis.Element !== "undefined") {
  const originalAttachShadow = globalThis.Element.prototype.attachShadow;
  globalThis.Element.prototype.attachShadow = function (
    this: Element,
    init: ShadowRootInit,
  ): ShadowRoot {
    const root = originalAttachShadow.call(this, init);
    if (!Array.isArray(root.adoptedStyleSheets)) {
      root.adoptedStyleSheets = [];
    }
    return root;
  };
}
