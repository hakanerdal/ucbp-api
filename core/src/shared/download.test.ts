// @vitest-environment jsdom
//
// Map.ts:974-983'ten (Adim 6/Faz 2) BIREBIR tasindi, Faz 4'te KL-09
// duzeltmesini (revokeObjectURL'in ertelenmesi) kilitleyecek sekilde
// guncellendi. Map ornegi olusturmak gercek bir Cesium Viewer/DOM
// container gerektirdigi icin (LayerManager'in createFakeViewer()
// fixture'i gibi hafif bir yol yok) bu test, taşınan fonksiyonun YENI
// konumuna karsi yazildi -- triggerDownload zaten hicbir Map/this durumuna
// bagli degil (sadece blob/filename parametreleri, saf DOM API'leri), bu
// yuzden davranis karakterizasyonu acisindan eski/yeni konum farksiz.
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import { triggerDownload } from "./download.js";

describe("triggerDownload (Adim 6/Faz 2+4 karakterizasyonu)", () => {
  let createObjectURLSpy: ReturnType<typeof vi.fn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.fn>;
  let clickSpy: ReturnType<typeof vi.fn>;
  let createElementSpy: MockInstance<typeof document.createElement>;

  beforeEach(() => {
    vi.useFakeTimers();
    // jsdom URL.createObjectURL/revokeObjectURL'i yerlesik olarak UYGULAMAZ
    // (bilinen jsdom kisitlamasi) -- spyOn var-olmayan bir metodu
    // spy'layamadigi icin dogrudan vi.fn() atiyoruz.
    createObjectURLSpy = vi.fn().mockReturnValue("blob:mock-download");
    revokeObjectURLSpy = vi.fn();
    (URL as unknown as { createObjectURL: typeof createObjectURLSpy }).createObjectURL = createObjectURLSpy;
    (URL as unknown as { revokeObjectURL: typeof revokeObjectURLSpy }).revokeObjectURL = revokeObjectURLSpy;
    clickSpy = vi.fn();
    const realCreateElement = document.createElement.bind(document);
    createElementSpy = vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = realCreateElement(tag);
      if (tag === "a") (el as HTMLAnchorElement).click = clickSpy;
      return el;
    });
  });

  afterEach(() => {
    createElementSpy.mockRestore();
    vi.useRealTimers();
  });

  it("blob'u createObjectURL ile url'e cevirir, <a>.download'i verilen filename'e " +
    "AYNEN esitler (fonksiyon dosya adini kendisi uretmiyor, cagiran taraf uretir), " +
    "click() tetikler ve revokeObjectURL'i AYNI url ile 1000ms ERTELEYEREK cagirir " +
    "(KL-09 duzeltmesi, Faz 4 -- click() hemen sonrasi HENUZ cagrilmamis olmali)", () => {
    const blob = new Blob(["merhaba"], { type: "text/plain" });

    triggerDownload(blob, "katmanim-12345.geojson");

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(createObjectURLSpy).toHaveBeenCalledWith(blob);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    const anchorCall = createElementSpy.mock.results.find(
      (r) => (r.value as HTMLElement).tagName === "A"
    );
    const anchor = anchorCall!.value as HTMLAnchorElement;
    expect(anchor.download).toBe("katmanim-12345.geojson");
    expect(anchor.href).toContain("blob:mock-download");

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(999);
    expect(revokeObjectURLSpy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:mock-download");
  });

  it("olusturulan <a>'yi document.body'e ekleyip SONRASINDA kaldirir (remove())", () => {
    const blob = new Blob(["x"], { type: "text/plain" });
    let anchorInDomDuringClick = false;
    clickSpy.mockImplementation(function (this: HTMLAnchorElement) {
      anchorInDomDuringClick = document.body.contains(this);
    });

    triggerDownload(blob, "dosya.txt");

    expect(anchorInDomDuringClick).toBe(true);
    const anchorCall = createElementSpy.mock.results.find(
      (r) => (r.value as HTMLElement).tagName === "A"
    );
    const anchor = anchorCall!.value as HTMLAnchorElement;
    expect(document.body.contains(anchor)).toBe(false);
  });
});
