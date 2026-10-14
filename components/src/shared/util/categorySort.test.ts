import { describe, expect, it } from "vitest";
import { compareCategoryKeys } from "./categorySort.js";

// Gercek hatalar plani H4.2: TucbsLegendPanel'den tasinan kategori anahtari
// karsilastiricisi (bilesen ciktisi ayrica TucbsLegendPanel karakterizasyon
// testinde dondurulur).
describe("compareCategoryKeys", () => {
  const sort = (keys: string[]) => [...keys].sort(compareCategoryKeys);

  it("ikisi de sayiya benzeyen anahtarlari sayisal karsilastirir", () => {
    expect(sort(["10", "9", "2", "100", "-3", "1.5"])).toEqual(["-3", "1.5", "2", "9", "10", "100"]);
  });

  it("metinleri ve karisik ciftleri metin olarak karsilastirir", () => {
    expect(sort(["b", "c", "a"])).toEqual(["a", "b", "c"]);
    expect(sort(["10", "b", "9", "a", "2", "100"])).toEqual(["2", "9", "10", "100", "a", "b"]);
  });

  it("sayinin kanonik yazimi olmayan anahtarlar metin sayilir", () => {
    expect(compareCategoryKeys("01", "1")).toBe(-1);
    expect(compareCategoryKeys("1.0", "1")).toBe(1);
    expect(compareCategoryKeys("", "0")).toBe(-1);
  });

  it("esit anahtarlar icin 0 doner", () => {
    expect(compareCategoryKeys("a", "a")).toBe(0);
    expect(compareCategoryKeys("7", "7")).toBe(0);
  });
});
