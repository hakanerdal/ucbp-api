// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kılavuzu, "Çapraz Tekrarlar"
// (write-only apiKey get/set) kalıcılığı, Faz 2: TucbsApp.ts'in `apiKey`
// get/set'inin (TEK SATIR dokunulmadan, taşıma ÖNCESİ) mevcut maskeleme
// davranışını dondurur -- bu dosya olmadan TucbsApp.ts'in kendi apiKey
// davranışı için SIFIR test vardı.
//
// ÖNEMLİ: element KASITLI OLARAK document.body'ye eklenmez. TucbsApp.ts'in
// render()'ı içinde gömülü <tucbs-map> var; element bağlanırsa alt
// tucbs-map da bağlanır ve gerçek Cesium Viewer kurmaya çalışır (jsdom'da
// patlar). apiKey get/set'i saf bir private-field okuma/yazma olduğu için
// bağlantısız bir element üzerinde test edilebilir.
//
// GÜNCELLEME (Faz 4, disclosed davranış değişikliği): TucbsApp.ts'in
// setter'ı artık `value ?? ""` uyguluyor -- TucbsMap.ts/TucbsLayerList.ts
// ile AYNI sertleşme, bkz project_ucbp_api_writeonly_apikey_uygulama_plani.
// Aşağıdaki son test bu YENİ davranışı sabitler (öncesinde bu senaryo için
// test yoktu).
import { describe, expect, it } from "vitest";
import "./TucbsApp.js";
import type { TucbsApp } from "./TucbsApp.js";

function makeEl(): TucbsApp {
  return document.createElement("tucbs-app") as TucbsApp;
}

describe("TucbsApp.apiKey -- write-only maskeleme (karakterizasyon)", () => {
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

  it("apiKey = null/undefined verilirse \"\" olarak varsayılan alınır (?? \"\" sertleşmesi, Faz 4)", () => {
    const el = makeEl();
    // @ts-expect-error -- null/undefined'ın gerçek dünyada attribute kaldırımından gelebileceğini doğrular
    el.apiKey = null;
    expect(el.apiKey).toBe("");
  });
});
