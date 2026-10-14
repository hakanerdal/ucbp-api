import { describe, expect, it } from "vitest";
import { metersToReadable, sqmToReadable } from "./measureFormat.js";

describe("measureFormat", () => {
  it("metre/km ve m²/km² sinirini 1000 / 1_000_000'da degistirir", () => {
    expect(metersToReadable(999.994)).toBe("999.99 m");
    expect(metersToReadable(1000)).toBe("1.00 km");
    expect(sqmToReadable(999_999)).toBe("999999.00 m²");
    expect(sqmToReadable(1_000_000)).toBe("1.00 km²");
    expect(metersToReadable(NaN)).toBe("-");
    expect(sqmToReadable(Infinity)).toBe("-");
  });
});
