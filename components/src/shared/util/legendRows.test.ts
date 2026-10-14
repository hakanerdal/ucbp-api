import { describe, expect, it } from "vitest";
import { GRADIENT_LEGEND_STEPS, binLegendRows, gradientLegendRows } from "./legendRows.js";

/** Ornekleyiciye verilen t degerini renk olarak geri dondurur. */
const echo = (t: number) => `t=${t}`;

describe("gradientLegendRows", () => {
  it("varsayilan 7 adim; yuksekten dusuge, t=1'den t=0'a", () => {
    const rows = gradientLegendRows(0, 60, echo);
    expect(rows).toHaveLength(GRADIENT_LEGEND_STEPS);
    expect(rows.map((row) => row.label)).toEqual(["60", "50", "40", "30", "20", "10", "0"]);
    expect(rows[0]!.color).toBe("t=1");
    expect(rows.at(-1)!.color).toBe("t=0");
  });

  it("tek adimda t=1 (max) kullanilir", () => {
    expect(gradientLegendRows(0, 10, echo, 1)).toEqual([{ color: "t=1", label: "10" }]);
  });
});

describe("binLegendRows", () => {
  it("esit genislikte siniflar, kucukten buyuge; t=0'dan t=1'e", () => {
    expect(binLegendRows(0, 100, 3, echo)).toEqual([
      { color: "t=0", label: "0 – 33.33" },
      { color: "t=0.5", label: "33.33 – 66.67" },
      { color: "t=1", label: "66.67 – 100" },
    ]);
  });

  it("tek sinifta paletin ortasi (t=0.5) kullanilir", () => {
    expect(binLegendRows(0, 1, 1, echo)).toEqual([{ color: "t=0.5", label: "0 – 1" }]);
  });
});
