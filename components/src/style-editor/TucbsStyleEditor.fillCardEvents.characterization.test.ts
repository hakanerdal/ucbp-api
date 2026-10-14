// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component Faz 3.1b onkosulu. "Dolgu"
// kartinin OLAY ISLEYICILERINI (renk modu, veri sutunu, palet, Min/Max,
// Bin Sayisi, kategori sirasi, palet ters cevirme, sabit renk, opaklik)
// dondurur. TucbsStyleEditor.fillCard.characterization.test yalnizca render
// ciktisini dondurur; isleyiciler 3.1b'de style-editor/fillCard.ts'e
// tasinirken bunlarin davranisinin degismedigini bu dosya garanti eder.
// Form durumu private alanlardan (openFor testindeki ayni desen), uygulanan
// stil sahte layerManager.applyLayerStyle cagrilarindan okunur.
import { afterEach, describe, expect, it, vi } from "vitest";
import type { LayerStyleSpec } from "@tucbs/core";
import "./TucbsStyleEditor.js";
import type { TucbsStyleEditor } from "./TucbsStyleEditor.js";
import { createFakeLayerManager } from "../__tests__/fixtures/fakeLayerManager.js";

const OUTLINE = { enabled: false, color: "#000000", width: 1 };
const VIRIDIS = ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"];

type Form = Record<string, unknown>;

/** Bilesenin private form alanini okur. */
const field = (el: TucbsStyleEditor, name: string): unknown => (el as unknown as Form)[`_${name}`];

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/** Editoru verilen stille acar; applyLayerStyle cagrilarini kaydeder. */
async function openWith(style?: LayerStyleSpec) {
  const manager = createFakeLayerManager({
    ...(style && { layerStyle: style }),
    entityPropertyNames: ["ad", "nufus", "tur"],
    columnRanges: { nufus: { min: 10, max: 100 }, ad: null, tur: null },
    uniqueColumnValues: { tur: ["konut", "ticari", "sanayi"] },
    featureCount: 12,
  });
  const applied = vi.spyOn(manager, "applyLayerStyle");
  const el = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
  document.body.appendChild(el);
  el.layerManager = manager;
  el.openFor("layer-1", "Katman", "GEOJSON" as never, "#336699", 0.6);
  await el.updateComplete;
  await el.updateComplete;
  return { el, applied };
}

/** "Dolgu" kartinda verilen etiketin altindaki kontrolu bulur. */
function control<T extends Element = HTMLElement & { value: string }>(el: TucbsStyleEditor, label: string, selector: string): T {
  const span = [...el.shadowRoot!.querySelectorAll(".field-label")].find((node) =>
    node.textContent!.trim().startsWith(label),
  );
  if (!span) throw new Error(`"${label}" etiketi bulunamadi`);
  return span.parentElement!.querySelector<T>(selector)!;
}

/** cds-dropdown secimini taklit eder. */
async function select(el: TucbsStyleEditor, label: string, value: string) {
  control(el, label, "cds-dropdown").dispatchEvent(
    new CustomEvent("cds-dropdown-selected", { detail: { item: { value } } }),
  );
  await el.updateComplete;
}

/** Metin/sayi alanina deger yazip verilen olayi tetikler; alanin son degerini dondurur. */
async function typeInto(el: TucbsStyleEditor, input: HTMLElement & { value: string }, value: string, type = "input") {
  input.value = value;
  input.dispatchEvent(new Event(type));
  await el.updateComplete;
  return input.value;
}

const minInput = (el: TucbsStyleEditor) => el.shadowRoot!.querySelector<HTMLElement & { value: string }>('cds-text-input[label="Min"]')!;
const maxInput = (el: TucbsStyleEditor) => el.shadowRoot!.querySelector<HTMLElement & { value: string }>('cds-text-input[label="Max"]')!;

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// Ilk test Carbon bilesenlerini ilk kez yukledigi icin tek basina ~1,5 sn
// suruyor; tum paket paralel kosarken varsayilan 5 sn asilabiliyor.
describe("TucbsStyleEditor Dolgu karti olay isleyicileri (karakterizasyon -- Faz 3.1b)", { timeout: 20_000 }, () => {
  it("renk modu: yeni modda gecersiz kalan sutun sifirlanir ve stil uygulanir", async () => {
    const { el, applied } = await openWith({
      fill: { mode: "enum", column: "tur", colors: { konut: "#ff0000" }, opacity: 1 },
      outline: OUTLINE,
    });
    await select(el, "Renk Modu", "gradient");
    expect(field(el, "colorMode")).toBe("gradient");
    expect(field(el, "dataColumn")).toBe("");
    await nextFrame();
    expect(applied).toHaveBeenCalledTimes(1);
    expect(applied.mock.calls[0]![1].fill.mode).toBe("gradient");
  });

  it("renk modu: sutun yeni modda gecerliyse korunur ve araligi yeniden okunur", async () => {
    const { el } = await openWith({
      fill: { mode: "gradient", column: "nufus", palette: VIRIDIS, min: 20, max: 30, opacity: 1 },
      outline: OUTLINE,
    });
    await select(el, "Renk Modu", "bin");
    expect(field(el, "dataColumn")).toBe("nufus");
    expect([field(el, "gradientMin"), field(el, "gradientMax")]).toEqual(["10", "100"]);
  });

  it("veri sutunu secimi gradient'te araligi doldurur ve stil uygulanir", async () => {
    const { el, applied } = await openWith();
    await select(el, "Renk Modu", "gradient");
    await nextFrame();
    applied.mockClear();
    await select(el, "Veri Sütunu", "nufus");
    expect([field(el, "dataColumn"), field(el, "gradientMin"), field(el, "gradientMax")]).toEqual(["nufus", "10", "100"]);
    await nextFrame();
    expect(applied).toHaveBeenCalledTimes(1);
  });

  // H6.2'den beri aralik disi deger kenetlenmez, reddedilir (eskiden
  // "-5" -> "10", "150" -> "100" kenetleniyordu; bkz H6.1/H6.2 testleri).
  it("Min/Max: rakam disi karakterler temizlenir; aralik disi deger state'e yazilmaz, uyari gosterilir", async () => {
    const { el } = await openWith({
      fill: { mode: "gradient", column: "nufus", palette: VIRIDIS, opacity: 1 },
      outline: OUTLINE,
    });
    expect(await typeInto(el, minInput(el), "a1b2")).toBe("12");
    expect(field(el, "gradientMin")).toBe("12");
    expect(await typeInto(el, minInput(el), "-5")).toBe("5");
    expect(field(el, "gradientMin")).toBe("12");
    expect(field(el, "gradientMinError")).toBe("Değer 10 ile 100 arasında olmalı.");
    expect(await typeInto(el, maxInput(el), "150")).toBe("150");
    expect(field(el, "gradientMax")).toBe("");
    expect(field(el, "gradientMaxError")).toBe("Değer 10 ile 100 arasında olmalı.");
  });

  it("Min/Max focusout: tamamlanmamis sayi 'Otomatik'e (bos) doner", async () => {
    const { el } = await openWith({
      fill: { mode: "gradient", column: "v", palette: VIRIDIS, opacity: 1 },
      outline: OUTLINE,
    });
    expect(await typeInto(el, minInput(el), "-")).toBe("-");
    expect(await typeInto(el, minInput(el), "-", "focusout")).toBe("");
    expect(field(el, "gradientMin")).toBe("");
    expect(await typeInto(el, maxInput(el), "-")).toBe("-");
    expect(await typeInto(el, maxInput(el), "-", "focusout")).toBe("");
    expect(field(el, "gradientMax")).toBe("");
  });

  it("Bin Sayisi: yazarken yalniz rakam kalir ve gecerli deger uygulanir; focusout'ta gecersiz deger duzenleme basindakine doner", async () => {
    const { el } = await openWith({
      fill: { mode: "bin", column: "nufus", palette: VIRIDIS, binCount: 4, opacity: 1 },
      outline: OUTLINE,
    });
    const input = control(el, "Bin Sayısı", "cds-number-input");
    // cds-number-input'un kendi value setter'i jsdom'da sayi olmayan metni
    // bosaltiyor; isleyicinin KENDI temizligini olcmek icin alan duz bir
    // ozellige cevrilir.
    Object.defineProperty(input, "value", { configurable: true, writable: true, value: "" });
    expect(await typeInto(el, input, "a03")).toBe("3");
    expect(field(el, "binCount")).toBe("3");
    expect(await typeInto(el, input, "12", "focusout")).toBe("4");
    expect(field(el, "binCount")).toBe("4");
    expect(await typeInto(el, input, "0", "focusout")).toBe("4");
    expect(field(el, "binCount")).toBe("4");
  });

  it("Bin Sayisi: artir/azalt olayi yalniz yon bilgisi varsa ve deger 1-9 ise uygulanir", async () => {
    const { el } = await openWith({
      fill: { mode: "bin", column: "nufus", palette: VIRIDIS, binCount: 4, opacity: 1 },
      outline: OUTLINE,
    });
    const input = control(el, "Bin Sayısı", "cds-number-input");
    input.dispatchEvent(new CustomEvent("cds-number-input", { detail: { value: 7 } }));
    expect(field(el, "binCount")).toBe("4");
    input.dispatchEvent(new CustomEvent("cds-number-input", { detail: { value: 6.4, direction: "up" } }));
    expect(field(el, "binCount")).toBe("6");
    // Carbon odaktan cikarken de yon bilgisiyle gonderir; yazilmis gecersiz
    // deger (H6.3) state'e yazilmaz.
    input.dispatchEvent(new CustomEvent("cds-number-input", { detail: { value: 12, direction: "up" } }));
    input.dispatchEvent(new CustomEvent("cds-number-input", { detail: { value: 0, direction: "down" } }));
    expect(field(el, "binCount")).toBe("6");
  });

  it("kategori sirasi ve palet ters cevirme: degerler yeniden siralanir, renkler yeniden uretilir", async () => {
    const { el, applied } = await openWith({
      fill: { mode: "enum", column: "tur", colors: { konut: "#111111", ticari: "#222222", sanayi: "#333333" }, opacity: 1 },
      outline: OUTLINE,
    });
    await select(el, "Kategori Sırası", "desc");
    expect(field(el, "categorySort")).toBe("desc");
    expect(field(el, "categoryValues")).toEqual(["ticari", "sanayi", "konut"]);

    const before = field(el, "categoryColors");
    el.shadowRoot!.querySelector('cds-checkbox[label-text="Paleti ters çevir"]')!.dispatchEvent(new CustomEvent("cds-checkbox-changed", { detail: { checked: true } }));
    await el.updateComplete;
    expect(field(el, "paletteReversed")).toBe(true);
    expect(field(el, "categoryColors")).not.toEqual(before);
    expect(Object.keys(field(el, "categoryColors") as object).sort()).toEqual(["konut", "sanayi", "ticari"]);
    await nextFrame();
    expect(applied).toHaveBeenCalled();
  });

  it("palet secimi: Kategorik'te renkler yeniden uretilir, Gradient'te yalniz palet degisir", async () => {
    const { el } = await openWith({
      fill: { mode: "enum", column: "tur", colors: { konut: "#111111", ticari: "#222222", sanayi: "#333333" }, opacity: 1 },
      outline: OUTLINE,
    });
    await select(el, "Renk Paleti", "Plasma");
    expect(field(el, "gradientPalette")).toBe("Plasma");
    expect(field(el, "categoryColors")).not.toEqual({ konut: "#111111", ticari: "#222222", sanayi: "#333333" });
    document.body.innerHTML = "";

    const gradient = await openWith({
      fill: { mode: "gradient", column: "nufus", palette: VIRIDIS, opacity: 1 },
      outline: OUTLINE,
    });
    await select(gradient.el, "Renk Paleti", "Plasma");
    expect(field(gradient.el, "gradientPalette")).toBe("Plasma");
    expect(field(gradient.el, "categoryColors")).toEqual({});
  });

  it("sabit renk ve opaklik: renk aninda, opaklik bir kare sonra uygulanir; opaklik etiketi guncellenir", async () => {
    const { el, applied } = await openWith({ fill: { mode: "solid", color: "#112233", opacity: 0.5 }, outline: OUTLINE });
    const color = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="color"][aria-label="Dolgu rengi"]')!;
    color.value = "#abcdef";
    color.dispatchEvent(new Event("input"));
    expect(field(el, "fillColor")).toBe("#abcdef");

    const slider = el.shadowRoot!.querySelector<HTMLInputElement>("input.opacity-slider")!;
    slider.value = "30";
    slider.dispatchEvent(new Event("input"));
    expect(field(el, "fillOpacity")).toBe(50);
    await nextFrame();
    await nextFrame();
    await el.updateComplete;
    expect(field(el, "fillOpacity")).toBe(30);
    expect(control(el, "Opaklık", "input").closest("div")!.querySelector(".field-label")!.textContent).toBe("Opaklık (30%)");
    expect(applied.mock.calls.at(-1)![1].fill).toEqual({ mode: "solid", color: "#abcdef", opacity: 0.3 });
  });
});

// Gercek hatalar plani H6.1 (kullanici bildirimi 2026-10-07): alanlara
// GERCEK tus tus yazma (Carbon bilesenin ic <input>'u uzerinden; Carbon'un
// kendi dinleyicileri de calisir). Iki hata "BILINEN" olarak dondurulur:
//   - Min/Max kenetlemesi HER TUSTA calisiyor: yazilan sayinin ilk hanesi
//     Min'in altinda kalinca alan Min'e esitlenip kalan haneler arkasina
//     ekleniyor ("50" yazilamiyor); aralik disi deger reddedilmek yerine
//     sinira ya da diger alana cekiliyor.
//   - Bin Sayisi yazarken ve Enter'da uygulanmiyor, yalniz odaktan cikinca;
//     9'dan buyuk deger sessizce 9'a indiriliyor.
// H6.2'de Min/Max, H6.3'te Bin Sayisi duzeltildi (BILINEN testleri cevrildi).
describe("TucbsStyleEditor Dolgu karti tus tus yazma (karakterizasyon -- H6.1)", { timeout: 20_000 }, () => {
  /** Carbon alaninin shadow DOM'undaki gercek <input>. */
  const innerInput = (host: Element) => host.shadowRoot!.querySelector("input")!;

  /** Alani bosaltip metni tus tus yazar; alanin son gorunen degerini dondurur. */
  async function typeKeys(el: TucbsStyleEditor, host: Element, text: string) {
    const input = innerInput(host);
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    await el.updateComplete;
    for (const char of text) {
      input.value += char;
      input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      await el.updateComplete;
    }
    return input.value;
  }

  /** Enter tusunu taklit eder. */
  async function pressEnter(el: TucbsStyleEditor, host: Element) {
    innerInput(host).dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, composed: true }));
    await el.updateComplete;
  }

  /** Alandan cikisi taklit eder (Carbon'un blur'u + bilesenin focusout'u). */
  async function leave(el: TucbsStyleEditor, host: Element) {
    const input = innerInput(host);
    input.dispatchEvent(new FocusEvent("blur"));
    input.dispatchEvent(new FocusEvent("focusout", { bubbles: true, composed: true }));
    await el.updateComplete;
  }

  const gradient = () =>
    openWith({ fill: { mode: "gradient", column: "nufus", palette: VIRIDIS, min: 20, max: 80, opacity: 1 }, outline: OUTLINE });

  it("Min=20 iken Max'a '50' yazilabilir: ara deger '5' alani bozmaz, uyari '50'de kalkar, harita 50 ile guncellenir", async () => {
    const { el, applied } = await gradient();
    expect(await typeKeys(el, maxInput(el), "5")).toBe("5");
    expect(field(el, "gradientMaxError")).toBe("Değer 10 ile 100 arasında olmalı.");
    expect(maxInput(el)).toMatchObject({ invalid: true, invalidText: "Değer 10 ile 100 arasında olmalı." });
    expect(await typeKeys(el, maxInput(el), "15")).toBe("15");
    expect(field(el, "gradientMaxError")).toBe("Max, Min değerinden (20) küçük olamaz.");

    expect(await typeKeys(el, maxInput(el), "50")).toBe("50");
    expect(field(el, "gradientMax")).toBe("50");
    expect(field(el, "gradientMaxError")).toBe("");
    expect(maxInput(el)).toMatchObject({ invalid: false });
    await nextFrame();
    expect(applied.mock.calls.at(-1)![1].fill).toMatchObject({ min: 20, max: 50 });
  });

  it("aralik disi ya da Min'in altindaki Max hicbir seyi degistirmez; alandan cikinca son gecerli degere doner", async () => {
    const { el, applied } = await gradient();
    expect(await typeKeys(el, maxInput(el), "150")).toBe("150");
    expect(field(el, "gradientMaxError")).toBe("Değer 10 ile 100 arasında olmalı.");
    await leave(el, maxInput(el));
    expect(innerInput(maxInput(el)).value).toBe("80");
    expect([field(el, "gradientMax"), field(el, "gradientMaxError")]).toEqual(["80", ""]);

    expect(await typeKeys(el, maxInput(el), "5")).toBe("5");
    await leave(el, maxInput(el));
    expect(innerInput(maxInput(el)).value).toBe("80");
    expect([field(el, "gradientMin"), field(el, "gradientMax")]).toEqual(["20", "80"]);
    await nextFrame();
    expect(applied.mock.calls.at(-1)![1].fill).toMatchObject({ min: 20, max: 80 });
  });

  it("gecersiz sonuc, duzenleme sirasinda uygulanan GECERLI ara degere degil duzenleme basindaki degere doner", async () => {
    const { el, applied } = await openWith({
      fill: { mode: "gradient", column: "nufus", palette: VIRIDIS, min: 10, max: 80, opacity: 1 },
      outline: OUTLINE,
    });
    expect(await typeKeys(el, maxInput(el), "15")).toBe("15");
    expect(field(el, "gradientMax")).toBe("15");
    expect(await typeKeys(el, maxInput(el), "150")).toBe("150");
    await leave(el, maxInput(el));
    expect([innerInput(maxInput(el)).value, field(el, "gradientMax")]).toEqual(["80", "80"]);
    await nextFrame();
    expect(applied.mock.calls.at(-1)![1].fill).toMatchObject({ min: 10, max: 80 });
  });

  it("aralik disi ya da Max'in ustundeki Min reddedilir; Enter da son gecerli degere dondurur", async () => {
    const { el } = await gradient();
    expect(await typeKeys(el, minInput(el), "5")).toBe("5");
    expect(field(el, "gradientMinError")).toBe("Değer 10 ile 100 arasında olmalı.");
    expect(await typeKeys(el, minInput(el), "90")).toBe("90");
    expect(field(el, "gradientMinError")).toBe("Min, Max değerinden (80) büyük olamaz.");
    await pressEnter(el, minInput(el));
    expect(innerInput(minInput(el)).value).toBe("20");
    expect([field(el, "gradientMin"), field(el, "gradientMinError")]).toEqual(["20", ""]);
    expect(minInput(el)).toMatchObject({ invalid: false });
  });

  it("gecerli deger Enter'la onaylanir; bos alan 'Otomatik' olarak kabul edilir", async () => {
    const { el, applied } = await gradient();
    expect(await typeKeys(el, minInput(el), "35")).toBe("35");
    await pressEnter(el, minInput(el));
    expect([innerInput(minInput(el)).value, field(el, "gradientMin")]).toEqual(["35", "35"]);
    expect(await typeKeys(el, maxInput(el), "")).toBe("");
    await leave(el, maxInput(el));
    expect([innerInput(maxInput(el)).value, field(el, "gradientMax")]).toEqual(["", ""]);
    await nextFrame();
    expect(applied.mock.calls.at(-1)![1].fill).toMatchObject({ min: 35 });
    expect("max" in applied.mock.calls.at(-1)![1].fill).toBe(false);
  });

  const bin = () =>
    openWith({ fill: { mode: "bin", column: "nufus", palette: VIRIDIS, binCount: 4, min: 10, max: 100, opacity: 1 }, outline: OUTLINE });

  it("Bin Sayisi yazarken aninda uygulanir; Enter ve odaktan cikis degeri korur", async () => {
    const { el, applied } = await bin();
    const input = control(el, "Bin Sayısı", "cds-number-input");
    expect(await typeKeys(el, input, "7")).toBe("7");
    await nextFrame();
    expect(field(el, "binCount")).toBe("7");
    expect(applied.mock.calls.at(-1)![1].fill).toMatchObject({ mode: "bin", binCount: 7 });

    await pressEnter(el, input);
    await leave(el, input);
    await nextFrame();
    expect([innerInput(input).value, field(el, "binCount")]).toEqual(["7", "7"]);
    expect(applied.mock.calls.at(-1)![1].fill).toMatchObject({ binCount: 7 });
  });

  it("Bin Sayisi'na 9'dan buyuk deger 9'a indirilmez; odaktan cikinca ara deger '1'e degil duzenleme basindaki degere doner", async () => {
    const { el, applied } = await bin();
    const input = control(el, "Bin Sayısı", "cds-number-input");
    expect(await typeKeys(el, input, "12")).toBe("12");
    expect(field(el, "binCount")).toBe("1");
    await leave(el, input);
    await nextFrame();
    expect([innerInput(input).value, field(el, "binCount")]).toEqual(["4", "4"]);
    expect(applied.mock.calls.at(-1)![1].fill).toMatchObject({ binCount: 4 });
  });

  it("Bin Sayisi'na 0 ya da bos deger uygulanmaz; Enter duzenleme basindaki degere dondurur", async () => {
    const { el, applied } = await bin();
    const input = control(el, "Bin Sayısı", "cds-number-input");
    expect(await typeKeys(el, input, "0")).toBe("0");
    await nextFrame();
    expect(field(el, "binCount")).toBe("4");
    expect(applied).not.toHaveBeenCalled();
    await pressEnter(el, input);
    expect([innerInput(input).value, field(el, "binCount")]).toEqual(["4", "4"]);

    expect(await typeKeys(el, input, "")).toBe("");
    await pressEnter(el, input);
    await nextFrame();
    expect([innerInput(input).value, field(el, "binCount")]).toEqual(["4", "4"]);
    expect(applied).not.toHaveBeenCalled();

    // Ayni duzenlemede once gecerli deger (canli uygulanir), sonra bos alan:
    // Enter ara deger "7"ye degil duzenleme basindaki "4"e dondurur.
    expect(await typeKeys(el, input, "7")).toBe("7");
    expect(field(el, "binCount")).toBe("7");
    expect(await typeKeys(el, input, "")).toBe("");
    await pressEnter(el, input);
    await nextFrame();
    expect([innerInput(input).value, field(el, "binCount")]).toEqual(["4", "4"]);
    expect(applied.mock.calls.at(-1)![1].fill).toMatchObject({ binCount: 4 });
  });
});
