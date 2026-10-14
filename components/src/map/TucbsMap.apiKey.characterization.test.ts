// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kılavuzu, "Çapraz Tekrarlar"
// (write-only apiKey get/set) kalıcılığı, Faz 2: TucbsMap.ts'in `apiKey`
// get/set'inin (TEK SATIR dokunulmadan, taşıma ÖNCESİ) mevcut maskeleme
// davranışını dondurur -- bu dosya olmadan TucbsMap.ts'in kendi apiKey
// davranışı için SIFIR test vardı.
//
// ÖNEMLİ: element KASITLI OLARAK document.body'ye eklenmez (connectedCallback
// çağrılmaz). TucbsMap.ts'in firstUpdated()'ı gerçek bir Cesium Viewer
// (WebGL/canvas) kurar; jsdom'da bu patlar/asılı kalır. apiKey get/set'i
// saf bir private-field okuma/yazma + requestUpdate (DOM/Cesium'a dokunmaz)
// olduğu için bağlantısız bir element üzerinde test edilebilir.
import { describe, expect, it } from "vitest";
import "./TucbsMap.js";
import type { TucbsMap } from "./TucbsMap.js";

function makeEl(): TucbsMap {
  return document.createElement("tucbs-map") as TucbsMap;
}

describe("TucbsMap.apiKey -- write-only maskeleme (karakterizasyon)", () => {
  it("başlangıçta apiKey \"\" döner", () => {
    const el = makeEl();
    expect(el.apiKey).toBe("");
  });

  it("apiKey set edildikten SONRA get HER ZAMAN maskelenmiş döner, gerçek değer asla okunmaz", () => {
    const el = makeEl();
    el.apiKey = "gercek-anahtar";
    expect(el.apiKey).toBe("••••••");
    expect(el.apiKey).not.toBe("gercek-anahtar");
  });

  it("apiKey = \"\" olarak set edilirse get yine \"\" döner (maskelenmiş değil)", () => {
    const el = makeEl();
    el.apiKey = "once-bir-deger";
    el.apiKey = "";
    expect(el.apiKey).toBe("");
  });
});
