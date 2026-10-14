import { describe, expect, it } from "vitest";

// Vitest kurulumunun (TS derlemesi + test runner) dogru calistigini
// kanitlayan minimal test. Cesium importu YOK -- Viewer gerektiren
// modullerin testi ayri bir konu (bkz. karakterizasyon testleri).
describe("vitest kurulumu", () => {
  it("calisiyor", () => {
    expect(1 + 1).toBe(2);
  });
});
