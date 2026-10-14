// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kilavuzu GC-02 3.5 Adim 6
// SONRASI (bkz. 9.2 Riski Düşüren Kurallar: "Sıra 5'ten itibaren, taşınan
// her modül için önce mevcut davranışı donduran bir test yazın" -- Adım
// 1-6 için bu test GERİYE DÖNÜK olarak yazıldı: taşıma zaten tamamlanmıştı,
// ama Adım 7'den itibaren yapılacak yeni taşımalar için render() çıktısının
// (kart sayısı/sırası/başlıkları, kaydırma çubuğu elemanlarının varlığı)
// AYNI kalmasını garanti eden bir güvenlik ağı olarak buradan sonra
// kullanılacak). TucbsStyleEditor.ts'e TEK SATIR bile dokunmadan yazıldı.
//
// jsdom GEREKLI: bir Lit custom element'i gerçekten construct edip
// shadowRoot'unu okuyoruz -- diğer testler (fillStyleSpec) bilerek "node"
// ortaminda kaliyor, bu dosya ISTISNA (bkz vitest.config.ts).
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import "./TucbsStyleEditor.js";
import type { TucbsStyleEditor } from "./TucbsStyleEditor.js";
import { createFakeLayerManager } from "../__tests__/fixtures/fakeLayerManager.js";

function cardTitles(el: TucbsStyleEditor): string[] {
  return [...(el.shadowRoot?.querySelectorAll(".card-title") ?? [])].map(
    (node) => node.textContent?.trim() ?? "",
  );
}

describe("TucbsStyleEditor render() karakterizasyonu", () => {
  let el: TucbsStyleEditor;

  beforeEach(() => {
    el = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  it("open=false iken bos sablon render eder (SADECE static styles <style> etiketi kalir)", async () => {
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".panel")).toBeNull();
    expect(cardTitles(el)).toEqual([]);
  });

  it("solid modda (varsayilan) SADECE Dolgu ve Dış Hat kartlarini render eder", async () => {
    el.layerManager = createFakeLayerManager();
    el.openFor("layer-1", "Test Katmanı", "GEOJSON", "#112233", 0.5);
    await el.updateComplete;

    expect(cardTitles(el)).toEqual(["Dolgu", "Dış Hat"]);
    expect(el.shadowRoot?.querySelector(".panel")).not.toBeNull();
    expect(el.shadowRoot?.querySelector('input[type="color"]')).not.toBeNull();
  });

  it("WMS/WMTS (servis) katmaninda <tucbs-service-style-card>'i render eder, Dolgu/Dış Hat'ı DEĞİL", async () => {
    el.layerManager = createFakeLayerManager({ wmsStyles: [] });
    el.openFor("layer-2", "Test WMS", "WMS");
    await el.updateComplete;

    // Sunucu Stili karti artik AYRI bir custom element'in (GC-02 3.5 Adim 7)
    // KENDI shadow root'unda -- parent'in .card-title sorgusu shadow DOM
    // sinirini GECEMEZ, bu yuzden ic ice sorgulaniyor.
    expect(cardTitles(el)).toEqual([]);
    const card = el.shadowRoot?.querySelector("tucbs-service-style-card");
    expect(card).not.toBeNull();
    await (card as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    const innerTitles = [
      ...(card?.shadowRoot?.querySelectorAll(".card-title") ?? []),
    ].map((node) => node.textContent?.trim());
    expect(innerTitles).toEqual(["Sunucu Stili"]);
  });

  it("openFor() AYNI WMS katmani icin (dialog kapanmadan) ikinci kez cagrilirsa sunucu stillerini YENIDEN sorgular", async () => {
    // Regresyon testi: <tucbs-service-style-card>'a cikarilirken (bkz
    // TucbsStyleEditor.ts openFor() WHY yorumu) ilk tasarim SADECE layerId
    // degisince yeniden yukluyordu -- ayni katman icin editor ZATEN
    // acikken tekrar acilirsa (orn. kullanici "Stil Duzenle" aksiyonuna
    // iki kez tiklarsa) hicbir sey tetiklenmiyordu. Orijinal davranis
    // openFor() HER cagrida KOSULSUZ yeniden sorguluyordu.
    let callCount = 0;
    el.layerManager = createFakeLayerManager({
      wmsStyles: [],
      onGetServiceStyles: () => callCount++,
    });

    el.openFor("layer-2", "Test WMS", "WMS");
    await el.updateComplete;
    await Promise.resolve();
    expect(callCount).toBe(1);

    el.openFor("layer-2", "Test WMS", "WMS");
    await el.updateComplete;
    await Promise.resolve();
    expect(callCount).toBe(2);
  });

  it("enum modda kesfedilen degerler kadar satirla Değerler kartini render eder", async () => {
    el.layerManager = createFakeLayerManager({
      entityPropertyNames: ["il_adi"],
      uniqueColumnValues: { il_adi: ["Ankara", "İstanbul", "İzmir"] },
    });
    el.openFor("layer-3", "Test Katmanı", "GEOJSON");
    await el.updateComplete;

    // Renk modunu enum'a (private @state) elle gecirip veri sutununu
    // seciyoruz -- gercek kullanicinin dropdown'dan yapacagi iki adimin
    // (bkz render()'daki cds-dropdown @cds-dropdown-selected) DOM
    // etkilesimi olmadan tetiklenmis hali.
    (el as unknown as { _colorMode: string })._colorMode = "enum";
    (el as unknown as { _onDataColumnChange(column: string): void })._onDataColumnChange("il_adi");
    await el.updateComplete;

    expect(cardTitles(el)).toEqual(["Dolgu", "Dış Hat", "Değerler"]);
    const rows = el.shadowRoot?.querySelectorAll(".category-values-list .legend-bin-row");
    expect(rows?.length).toBe(3);
  });

  it("gradient modda min/max cozuldukten sonra Lejant kartini GRADIENT_LEGEND_STEPS satirla render eder", async () => {
    el.layerManager = createFakeLayerManager({
      entityPropertyNames: ["nufus"],
      columnRanges: { nufus: { min: 0, max: 100 } },
    });
    el.openFor("layer-4", "Test Katmanı", "GEOJSON");
    await el.updateComplete;

    (el as unknown as { _colorMode: string })._colorMode = "gradient";
    (el as unknown as { _onDataColumnChange(column: string): void })._onDataColumnChange("nufus");
    await el.updateComplete;

    expect(cardTitles(el)).toEqual(["Dolgu", "Dış Hat", "Lejant"]);
    const rows = el.shadowRoot?.querySelectorAll(".legend-bin-list .legend-bin-row");
    expect(rows?.length).toBe(7); // GRADIENT_LEGEND_STEPS
  });
});
