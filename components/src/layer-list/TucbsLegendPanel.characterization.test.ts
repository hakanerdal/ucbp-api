// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Klasor yapisi ve seçici bölme planı, Faz 0.4-e.
// TucbsLegendPanel'in lejant ciktisini ve kaydirma cubugunu dondurur. Bilesenin
// eski kendi kopyalari (_sampleFromPaletteCss/_hexToRgb ve _syncScrollThumb/
// _startThumbDrag govdeleri) Faz 2.2'de sirasiyla
// shared/util/gradientSampling.sampleFromPaletteCss ve shared/ui/VirtualScrollbar
// saf fonksiyonlarina gecirildi; bu testler o gecisin guvenlik agidir.
//
// ONEMLI: qualitative paletler AYRICA test edilir -- shared/util/gradientSampling
// .sampleGradientCss (3.4c'de kaldirildi) qualitative'i DESTEKLEMIYORDU; yanlis yardimciya gecis
// (ilk planlanan hedef) lejant renklerini haritadakinden farkli gosterirdi.
import { afterEach, describe, expect, it, vi } from "vitest";
import type { LayerManager, LayerStyleSpec, ServiceStyleOption } from "@tucbs/core";
import { AnalysisRequestError } from "@tucbs/core";
import { createFakeLayerManager, type FakeLayerManagerOptions } from "../__tests__/fixtures/fakeLayerManager.js";
import "./TucbsLegendPanel.js";
import type { TucbsLegendPanel } from "./TucbsLegendPanel.js";

const OUTLINE = { enabled: false, color: "#000000", width: 1 } as const;
const BLACK_WHITE = ["#000000", "#ffffff"];
const RGB = ["#ff0000", "#00ff00", "#0000ff"];

type LegendRow = { color: string; label: string };

/** Lejant satirlarini swatch'in ham style degeri ve etiket metni olarak okur. */
function rows(el: TucbsLegendPanel): LegendRow[] {
  return [...el.shadowRoot!.querySelectorAll(".legend-bin-row")].map((row) => ({
    color: (row.querySelector(".legend-swatch")!.getAttribute("style") ?? "").replace(/^background:/, ""),
    label: row.querySelector(".legend-value")!.textContent!.trim(),
  }));
}

const emptyText = (el: TucbsLegendPanel) =>
  el.shadowRoot!.querySelector(".legend-empty")?.textContent?.trim() ?? "";

/** Paneli verilen katman yoneticisi ve katman bilgisiyle acar. */
async function mount(
  layerManager: LayerManager,
  layerType = "GEOJSON",
): Promise<TucbsLegendPanel> {
  const el = document.createElement("tucbs-legend-panel") as TucbsLegendPanel;
  Object.assign(el, { layerManager, layerId: "layer-1", layerType, open: true });
  document.body.appendChild(el);
  await el.updateComplete;
  await el.updateComplete;
  return el;
}

/** Verilen stil (ve istege bagli kolon araligi) ile sahte yonetici kurup paneli acar. */
const mountWithStyle = (layerStyle: LayerStyleSpec | undefined, options: FakeLayerManagerOptions = {}) =>
  mount(createFakeLayerManager({ ...(layerStyle && { layerStyle }), ...options }));

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("TucbsLegendPanel vektor lejanti (karakterizasyon)", () => {
  it("kapaliyken hicbir sey render etmez", async () => {
    const el = await mountWithStyle(undefined);
    el.open = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".legend")).toBeNull();
  });

  it("stil yoksa bilgi mesaji gosterir", async () => {
    expect(emptyText(await mountWithStyle(undefined))).toBe("Henüz stil uygulanmadı.");
  });

  it.each(["solid", "off"] as const)("%s modda lejant gerekmez", async (mode) => {
    const fill = mode === "solid" ? { mode, color: "#123456", opacity: 1 } : { mode };
    const el = await mountWithStyle({ fill, outline: OUTLINE } as LayerStyleSpec);
    expect(emptyText(el)).toBe("Bu katman sabit renkli, lejant gerekmiyor.");
  });

  // Adim degeri `1 - i/(steps-1)` kayan nokta hatasi tasir: eskiden bazi tam
  // sayi degerler (40, 20, 10) "40.00" gibi gosteriliyordu -- gercek hatalar
  // plani H3.3'te duzeltildi (bkz shared/util/legendFormat.ts). Renkte ayni
  // sebeple 255/6 = 42.4999.. -> 42 yuvarlaniyor (degismedi).
  it("gradient (sequential): 7 adim, ustten alta azalan deger, dogrusal karisim", async () => {
    const el = await mountWithStyle({
      fill: { mode: "gradient", column: "v", palette: BLACK_WHITE, min: 0, max: 60, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows(el)).toEqual([
      { color: "rgb(255, 255, 255)", label: "60" },
      { color: "rgb(213, 213, 213)", label: "50" },
      { color: "rgb(170, 170, 170)", label: "40" },
      { color: "rgb(128, 128, 128)", label: "30" },
      { color: "rgb(85, 85, 85)", label: "20" },
      { color: "rgb(42, 42, 42)", label: "10" },
      { color: "rgb(0, 0, 0)", label: "0" },
    ]);
  });

  it("gradient (qualitative): karisim YOK, en yakin palet rengi aynen kullanilir", async () => {
    const el = await mountWithStyle({
      fill: { mode: "gradient", column: "v", palette: RGB, paletteKind: "qualitative", min: 0, max: 60, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows(el).map((row) => row.color)).toEqual([
      "#0000ff",
      "#0000ff",
      "#00ff00",
      "#00ff00",
      "#00ff00",
      "#ff0000",
      "#ff0000",
    ]);
  });

  it("gradient: min/max verilmemisse kolon araligindan, kismen verilmisse eksik ucu araliktan alir", async () => {
    const auto = await mountWithStyle(
      { fill: { mode: "gradient", column: "v", palette: BLACK_WHITE, opacity: 1 }, outline: OUTLINE },
      { columnRanges: { v: { min: 0, max: 6 } } },
    );
    expect(rows(auto).map((row) => row.label)).toEqual(["6", "5", "4", "3", "2", "1", "0"]);
    document.body.innerHTML = "";

    const partial = await mountWithStyle(
      { fill: { mode: "gradient", column: "v", palette: BLACK_WHITE, min: 3, opacity: 1 }, outline: OUTLINE },
      { columnRanges: { v: { min: 0, max: 6 } } },
    );
    expect(rows(partial).map((row) => row.label)).toEqual(["6", "5.50", "5", "4.50", "4", "3.50", "3"]);
  });

  it("gradient/bin: aralik hesaplanamazsa mesaj gosterir", async () => {
    const el = await mountWithStyle(
      { fill: { mode: "bin", column: "v", palette: BLACK_WHITE, binCount: 3, opacity: 1 }, outline: OUTLINE },
      { columnRanges: { v: null } },
    );
    expect(emptyText(el)).toBe("Aralık hesaplanamadı.");
  });

  it("bin (sequential): her sinif icin aralik etiketi ve dogrusal renk", async () => {
    const el = await mountWithStyle({
      fill: { mode: "bin", column: "v", palette: BLACK_WHITE, binCount: 4, min: 0, max: 100, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows(el)).toEqual([
      { color: "rgb(0, 0, 0)", label: "0 – 25" },
      { color: "rgb(85, 85, 85)", label: "25 – 50" },
      { color: "rgb(170, 170, 170)", label: "50 – 75" },
      { color: "rgb(255, 255, 255)", label: "75 – 100" },
    ]);
  });

  it("bin (qualitative) ve tam sayi olmayan sinir etiketleri", async () => {
    const el = await mountWithStyle({
      fill: { mode: "bin", column: "v", palette: RGB, paletteKind: "qualitative", binCount: 3, min: 0, max: 10, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows(el)).toEqual([
      { color: "#ff0000", label: "0 – 3.33" },
      { color: "#00ff00", label: "3.33 – 6.67" },
      { color: "#0000ff", label: "6.67 – 10" },
    ]);
  });

  // Gercek hatalar plani H3.1/H3.3: bin sinirlari da ayni hatayi tasir --
  // 29/7 * 7 = 29.000000000000004; eskiden "29.00" gosteriliyordu.
  it("bin sinirlarinda kayan nokta hatasi tasiyan tam sayi ondaliksiz gosterilir", async () => {
    const el = await mountWithStyle({
      fill: { mode: "bin", column: "v", palette: BLACK_WHITE, binCount: 7, min: 0, max: 29, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows(el).map((row) => row.label)).toEqual([
      "0 – 4.14",
      "4.14 – 8.29",
      "8.29 – 12.43",
      "12.43 – 16.57",
      "16.57 – 20.71",
      "20.71 – 24.86",
      "24.86 – 29",
    ]);
  });

  it("bin: tek sinifta paletin ortasi kullanilir; 3 haneli hex desteklenir", async () => {
    const el = await mountWithStyle({
      fill: { mode: "bin", column: "v", palette: ["#000", "#fff"], binCount: 1, min: 0, max: 1, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows(el)).toEqual([{ color: "rgb(128, 128, 128)", label: "0 – 1" }]);
  });

  it("enum: sayisal anahtarlar sayisal, metinler alfabetik siralanir", async () => {
    const numeric = await mountWithStyle({
      fill: { mode: "enum", column: "c", colors: { "10": "#aa0000", "2": "#00aa00", "1": "#0000aa" }, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows(numeric)).toEqual([
      { color: "#0000aa", label: "1" },
      { color: "#00aa00", label: "2" },
      { color: "#aa0000", label: "10" },
    ]);
    document.body.innerHTML = "";

    const text = await mountWithStyle({
      fill: { mode: "enum", column: "c", colors: { b: "#111111", c: "#222222", a: "#333333" }, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows(text).map((row) => row.label)).toEqual(["a", "b", "c"]);
  });

  // Gercek hatalar plani H4.1/H4.3: stil editorunun "Degerler" listesi de
  // artik ayni kurali kullanir (bkz shared/util/categorySort.ts).
  it("enum: sayiya benzeyen ve metin anahtarlar karisikken sayilar sayisal, metinler sonra alfabetik", async () => {
    const el = await mountWithStyle({
      fill: {
        mode: "enum",
        column: "c",
        colors: { "10": "#000001", b: "#000002", "9": "#000003", a: "#000004", "2": "#000005", "100": "#000006" },
        opacity: 1,
      },
      outline: OUTLINE,
    });
    expect(rows(el).map((row) => row.label)).toEqual(["2", "9", "10", "100", "a", "b"]);
  });

  it("enum: kategori yoksa mesaj gosterir", async () => {
    const el = await mountWithStyle({ fill: { mode: "enum", column: "c", colors: {}, opacity: 1 }, outline: OUTLINE });
    expect(emptyText(el)).toBe("Kategori bulunamadı.");
  });

  it("layer:style olayi yalnizca kendi katmani icin lejanti gunceller", async () => {
    const handlers: ((event: { id: string; style: LayerStyleSpec }) => void)[] = [];
    const manager = Object.assign(createFakeLayerManager(), {
      on: (_event: string, handler: (typeof handlers)[number]) => handlers.push(handler),
    });
    const el = await mount(manager as unknown as LayerManager);
    const enumStyle: LayerStyleSpec = {
      fill: { mode: "enum", column: "c", colors: { x: "#010203" }, opacity: 1 },
      outline: OUTLINE,
    };
    handlers.forEach((handler) => handler({ id: "baska-katman", style: enumStyle }));
    await el.updateComplete;
    expect(emptyText(el)).toBe("Henüz stil uygulanmadı.");
    handlers.forEach((handler) => handler({ id: "layer-1", style: enumStyle }));
    await el.updateComplete;
    expect(rows(el)).toEqual([{ color: "#010203", label: "x" }]);
  });
});

describe("TucbsLegendPanel servis lejanti (karakterizasyon)", () => {
  it("WMS: GetLegendGraphic URL'sini gorsel olarak gosterir", async () => {
    const manager = Object.assign(createFakeLayerManager(), {
      getWmsLegendGraphicUrl: (id: string) => `https://wms.test/legend?layer=${id}`,
    });
    const el = await mount(manager as unknown as LayerManager, "WMS");
    expect(el.shadowRoot!.querySelector("img.legend-image")!.getAttribute("src")).toBe(
      "https://wms.test/legend?layer=layer-1",
    );
  });

  it("WMTS: ilk stilin legendUrl'sini kullanir; yoksa 'Lejant bulunamadı.'", async () => {
    const styles: ServiceStyleOption[] = [
      { name: "s1", title: "S1", legendUrl: "https://wmts.test/l1.png" },
      { name: "s2", title: "S2", legendUrl: "https://wmts.test/l2.png" },
    ];
    const el = await mount(createFakeLayerManager({ wmtsStyles: styles }), "WMTS");
    await vi.waitFor(() =>
      expect(el.shadowRoot!.querySelector("img.legend-image")?.getAttribute("src")).toBe("https://wmts.test/l1.png"),
    );
    document.body.innerHTML = "";

    const empty = await mount(createFakeLayerManager({ wmtsStyles: [] }), "WMTS");
    await vi.waitFor(() => expect(emptyText(empty)).toBe("Lejant bulunamadı."));
  });

  it("hata: TucbsError loglanir ve mesaji gosterilir", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const failure = new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", "Ağ hatası: yok");
    const manager = Object.assign(createFakeLayerManager(), {
      getWmtsAvailableStyles: async () => {
        throw failure;
      },
    });
    const el = await mount(manager as unknown as LayerManager, "WMTS");
    await vi.waitFor(() => expect(emptyText(el)).toBe("Ağ hatası: yok"));
    expect(errorSpy).toHaveBeenCalledWith(
      `[tucbs-legend-panel] ${failure.code} (${failure.number}): ${failure.message}`,
    );
  });
});

describe("TucbsLegendPanel kaydirma cubugu (karakterizasyon)", () => {
  /** Liste ve thumb elemanlarina olcum degerleri atar (jsdom layout hesaplamaz). */
  function setGeometry(
    el: TucbsLegendPanel,
    geometry: { scrollHeight: number; clientHeight: number; scrollTop?: number; listTop?: number; thumbHeight?: number },
  ) {
    const list = el.shadowRoot!.querySelector<HTMLElement>(".legend-bin-list")!;
    const thumb = el.shadowRoot!.querySelector<HTMLElement>(".legend-scroll-thumb")!;
    Object.defineProperty(list, "scrollHeight", { configurable: true, value: geometry.scrollHeight });
    Object.defineProperty(list, "clientHeight", { configurable: true, value: geometry.clientHeight });
    list.scrollTop = geometry.scrollTop ?? 0;
    list.getBoundingClientRect = () => ({ top: geometry.listTop ?? 0 }) as DOMRect;
    Object.defineProperty(thumb, "offsetHeight", { configurable: true, value: geometry.thumbHeight ?? 0 });
    return { list, thumb };
  }

  const longEnum: LayerStyleSpec = {
    fill: {
      mode: "enum",
      column: "c",
      colors: Object.fromEntries(Array.from({ length: 20 }, (_, i) => [String(i), "#000000"])),
      opacity: 1,
    },
    outline: OUTLINE,
  };

  it("kaydirilacak mesafe yoksa thumb gizlenir", async () => {
    const el = await mountWithStyle(longEnum);
    const { list, thumb } = setGeometry(el, { scrollHeight: 100, clientHeight: 100 });
    list.dispatchEvent(new Event("scroll"));
    expect(thumb.style.display).toBe("none");
  });

  it("scroll olayinda thumb boyutu ve konumu orantili hesaplanir (en az 24px)", async () => {
    const el = await mountWithStyle(longEnum);
    const { list, thumb } = setGeometry(el, { scrollHeight: 400, clientHeight: 100, scrollTop: 150 });
    list.dispatchEvent(new Event("scroll"));
    expect({ display: thumb.style.display, height: thumb.style.height, top: thumb.style.top }).toEqual({
      display: "block",
      height: "25px",
      top: "37.5px",
    });

    const { list: tall, thumb: small } = setGeometry(el, { scrollHeight: 10000, clientHeight: 100 });
    tall.dispatchEvent(new Event("scroll"));
    expect(small.style.height).toBe("24px");
  });

  it("render sonrasi bir karede thumb senkronlanir", async () => {
    const el = await mountWithStyle(longEnum);
    const { thumb } = setGeometry(el, { scrollHeight: 400, clientHeight: 100 });
    el.requestUpdate();
    await el.updateComplete;
    await nextFrame();
    expect(thumb.style.display).toBe("block");
  });

  it("thumb surukleme listeyi orantili kaydirir; sol tik disi ve bitis sonrasi hareket etkisizdir", async () => {
    const el = await mountWithStyle(longEnum);
    const { list, thumb } = setGeometry(el, {
      scrollHeight: 400,
      clientHeight: 100,
      listTop: 10,
      thumbHeight: 25,
    });
    thumb.getBoundingClientRect = () => ({ top: 10 }) as DOMRect;
    const pointer = (type: string, clientY: number, button = 0) => {
      const event = new MouseEvent(type, { bubbles: true, composed: true, button, clientY, cancelable: true });
      Object.defineProperty(event, "pointerId", { value: 1 });
      return event;
    };

    thumb.dispatchEvent(pointer("pointerdown", 15, 2));
    thumb.dispatchEvent(pointer("pointermove", 60));
    expect(list.scrollTop).toBe(0);

    const down = pointer("pointerdown", 15);
    thumb.dispatchEvent(down);
    expect(down.defaultPrevented).toBe(true);
    thumb.dispatchEvent(pointer("pointermove", 52.5));
    expect(list.scrollTop).toBe(150);
    thumb.dispatchEvent(pointer("pointermove", 1000));
    expect(list.scrollTop).toBe(300);
    thumb.dispatchEvent(pointer("pointerup", 1000));
    thumb.dispatchEvent(pointer("pointermove", 15));
    expect(list.scrollTop).toBe(300);
  });

  // Gercek hatalar plani H5.1/H5.2: eskiden bilesen VirtualScrollbar SINIFINI
  // degil saf startVirtualScrollbarDrag fonksiyonunu kullaniyor ve donen
  // stop()'u yoksayiyordu -- surukleme surerken panel DOM'dan kaldirilirsa
  // (ornegin katman listesi lejanti kapatip paneli siler) thumb'a eklenen
  // dinleyiciler kaliyordu. Artik sinifin hostDisconnected'i suruklemeyi durdurur.
  it("surukleme surerken panel DOM'dan kaldirilirsa thumb dinleyicileri kaldirilir, hareket listeyi kaydirmaz", async () => {
    const el = await mountWithStyle(longEnum);
    const { list, thumb } = setGeometry(el, { scrollHeight: 400, clientHeight: 100, listTop: 10, thumbHeight: 25 });
    thumb.getBoundingClientRect = () => ({ top: 10 }) as DOMRect;
    const pointer = (type: string, clientY: number) => {
      const event = new MouseEvent(type, { bubbles: true, composed: true, button: 0, clientY, cancelable: true });
      Object.defineProperty(event, "pointerId", { value: 1 });
      return event;
    };

    thumb.dispatchEvent(pointer("pointerdown", 15));
    thumb.dispatchEvent(pointer("pointermove", 52.5));
    expect(list.scrollTop).toBe(150);

    el.remove();
    thumb.dispatchEvent(pointer("pointermove", 1000));
    expect(list.scrollTop).toBe(150);
  });
});
