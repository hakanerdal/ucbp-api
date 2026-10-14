// UNIT TESTLERI -- God Component kilavuzu, "Capraz Tekrarlar" (asenkron
// olcum nesil sayaci) kaliciligi, Faz 1: AsyncGeneration'in kendi
// (TucbsIdentifyPanel/TucbsMapPreview'dan bagimsiz) davranisini sabitler.
import { describe, expect, it } from "vitest";
import { AsyncGeneration } from "./AsyncGeneration.js";

describe("AsyncGeneration (internal/AsyncGeneration.ts) -- izole", () => {
  it("ilk next() 1 doner, isCurrent(1) true'dur", () => {
    const gen = new AsyncGeneration();
    const token = gen.next();
    expect(token).toBe(1);
    expect(gen.isCurrent(token)).toBe(true);
  });

  it("art arda next() cagrilari artan, benzersiz token'lar uretir", () => {
    const gen = new AsyncGeneration();
    const t1 = gen.next();
    const t2 = gen.next();
    const t3 = gen.next();
    expect([t1, t2, t3]).toEqual([1, 2, 3]);
  });

  it("yeni bir next() cagrisi ONCEKI token'i GECERSIZ kilar", () => {
    const gen = new AsyncGeneration();
    const oldToken = gen.next();
    const newToken = gen.next();
    expect(gen.isCurrent(oldToken)).toBe(false);
    expect(gen.isCurrent(newToken)).toBe(true);
  });

  it("hic next() cagrilmamisken isCurrent(0) true doner (baslangic durumu)", () => {
    const gen = new AsyncGeneration();
    expect(gen.isCurrent(0)).toBe(true);
  });

  it("gercek kullanim senaryosu: iki 'es zamanli' asenkron cagri, sadece SONUNCUSU gecerli kalir", async () => {
    const gen = new AsyncGeneration();
    const results: string[] = [];

    async function run(label: string, delayMs: number): Promise<void> {
      const token = gen.next();
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      if (!gen.isCurrent(token)) return;
      results.push(label);
    }

    const first = run("birinci", 20);
    const second = run("ikinci", 0);
    await Promise.all([first, second]);

    // "ikinci" daha kisa gecikmeyle ONCE biter ve gen'i kendi token'ina
    // ilerletir; "birinci" daha SONRA uyandiginda kendi token'inin artik
    // ESKI oldugunu gorup sonuc listesine HICBIR SEY eklemez.
    expect(results).toEqual(["ikinci"]);
  });
});
