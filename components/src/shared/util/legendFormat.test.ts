import { describe, expect, it } from "vitest";
import { formatLegendNumber } from "./legendFormat.js";

// Gercek hatalar plani H3.1/H3.2: TucbsLegendPanel, TucbsStyleEditor lejant
// karti ve yazdirma lejantinin ortak sayi etiketi kurali (bkz o bilesenlerin
// karakterizasyon testleri).
describe("formatLegendNumber (karakterizasyon -- H3.1)", () => {
  it("tam sayilari ondaliksiz, digerlerini 2 haneli gosterir", () => {
    expect(formatLegendNumber(40)).toBe("40");
    expect(formatLegendNumber(0)).toBe("0");
    expect(formatLegendNumber(-5)).toBe("-5");
    expect(formatLegendNumber(10 / 3)).toBe("3.33");
    expect(formatLegendNumber(2.5)).toBe("2.50");
  });

  it("deger yoksa '?' doner", () => {
    expect(formatLegendNumber(undefined)).toBe("?");
  });

  // H3.3 DUZELTMESI: lejant adimlari (min + t * (max - min), t = 1 - i/(steps-1))
  // kayan nokta hatasi tasir; eskiden matematiksel olarak tam sayi olan
  // degerler Number.isInteger'dan gecemeyip ".00" ile gosteriliyordu.
  it("kayan nokta hatasi tasiyan tam sayi degerler ondaliksiz gosterilir", () => {
    expect(formatLegendNumber((1 - 2 / 6) * 60)).toBe("40");
    expect(formatLegendNumber((1 - 4 / 6) * 60)).toBe("20");
    expect(formatLegendNumber((29 / 7) * 7)).toBe("29");
    expect(formatLegendNumber((1 - 5 / 6) * 6)).toBe("1");
    expect(formatLegendNumber(-(1 - 2 / 6) * 60)).toBe("-40");
  });

  it("tolerans degerle olceklenir: buyuk araliklarda da hata yakalanir, gercek ondaliklar korunur", () => {
    expect(formatLegendNumber((1 - 2 / 6) * 60_000_000)).toBe("40000000");
    expect(formatLegendNumber((1 - 2 / 6) * 600_000_000_000)).toBe("400000000000");
    expect(formatLegendNumber(400_000_000_000.5)).toBe("400000000000.50");
    expect(formatLegendNumber(4.000001)).toBe("4.00");
    expect(formatLegendNumber(1e-13)).toBe("0");
  });
});
