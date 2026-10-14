// KARAKTERIZASYON TESTLERI -- Gercek hatalar plani H3.1: yazdirma
// onizlemesinin vektor lejant satirlarini dondurur. Sayi etiketleri
// shared/util/legendFormat.formatLegendNumber ile uretilir (H3.2'ye kadar
// burada yerel bir kopyasi vardi; bkz legendFormat.test.ts).
import { describe, expect, it } from "vitest";
import type { LayerStyleSpec, ManagedLayer } from "@tucbs/core";
import { createFakeLayerManager } from "../__tests__/fixtures/fakeLayerManager.js";
import { collectPrintLegendEntries } from "./PrintLegendData.js";

const OUTLINE = { enabled: false, color: "#000000", width: 1 } as const;
const BLACK_WHITE = ["#000000", "#ffffff"];

const LAYER = {
  id: "layer-1",
  title: "Nufus",
  layerType: "GEOJSON",
  isBasemap: false,
  cesiumObject: { show: true },
} as unknown as ManagedLayer;

/** Verilen vektor stiliyle tek katmanin yazdirma lejant satir etiketlerini doner. */
async function labels(fill: LayerStyleSpec["fill"]): Promise<string[]> {
  const [entry] = await collectPrintLegendEntries(
    createFakeLayerManager({ layerStyle: { fill, outline: OUTLINE } as LayerStyleSpec }),
    [LAYER],
  );
  if (!entry || !("rows" in entry)) throw new Error(`satirli lejant bekleniyordu: ${JSON.stringify(entry)}`);
  return entry.rows.map((row) => row.label);
}

describe("PrintLegendData vektor lejant etiketleri (karakterizasyon -- H3.1)", () => {
  it("bin: tam sayi sinirlar ondaliksiz, digerleri 2 haneli", async () => {
    expect(await labels({ mode: "bin", column: "v", palette: BLACK_WHITE, binCount: 3, min: 0, max: 10, opacity: 1 })).toEqual([
      "0 – 3.33",
      "3.33 – 6.67",
      "6.67 – 10",
    ]);
  });

  it("gradient: min/max yoksa 'Aralık hesaplanamadı.' girdisi uretilir", async () => {
    const [entry] = await collectPrintLegendEntries(
      createFakeLayerManager({
        layerStyle: { fill: { mode: "gradient", column: "v", palette: BLACK_WHITE, opacity: 1 }, outline: OUTLINE } as LayerStyleSpec,
      }),
      [LAYER],
    );
    expect(entry).toEqual({ layerTitle: "Nufus", kind: "empty", message: "Aralık hesaplanamadı." });
  });

  // Lejant adimlari kayan nokta hatasi tasir; eskiden matematiksel olarak tam
  // sayi olan degerler ".00" ile gosteriliyordu (H3.3'te duzeltildi).
  it("gradient 0-60 lejantinda 40/20/10 ondaliksiz gosterilir", async () => {
    expect(await labels({ mode: "gradient", column: "v", palette: BLACK_WHITE, min: 0, max: 60, opacity: 1 })).toEqual([
      "60",
      "50",
      "40",
      "30",
      "20",
      "10",
      "0",
    ]);
  });

  it("bin 0-29 (7 sinif) lejantinda son sinir '29' gosterilir", async () => {
    expect(await labels({ mode: "bin", column: "v", palette: BLACK_WHITE, binCount: 7, min: 0, max: 29, opacity: 1 })).toEqual([
      "0 – 4.14",
      "4.14 – 8.29",
      "8.29 – 12.43",
      "12.43 – 16.57",
      "16.57 – 20.71",
      "20.71 – 24.86",
      "24.86 – 29",
    ]);
  });
});

// Faz 3.4a: lejant satiri uretimi (gradient/bin) TucbsLegendPanel,
// TucbsStyleEditor ve burada uc ayri kopya; 3.4b'de shared/util/legendRows.ts'e
// toplanacak. Etiketler yukarida donduruldu; burada RENKLER ve siralama.
// 3.4a'da iki fark "BILINEN" olarak donduruldu, 3.4c'de duzeltildi (artik
// lejant paneliyle ayni, bkz TucbsLegendPanel karakterizasyon testi):
//   - renk ornekleme paletteKind'i yok sayiyordu (sampleGradientCss):
//     qualitative palette en yakin palet rengi yerine karisim gosteriliyordu;
//   - Kategorik (enum) satirlar Object.entries sirasindaydi (tam sayi
//     anahtarlar once, digerleri eklenme sirasiyla), siralanmiyordu.
describe("PrintLegendData vektor lejant renkleri (karakterizasyon -- Faz 3.4a)", () => {
  const RGB = ["#ff0000", "#00ff00", "#0000ff"];

  /** Tek katmanin yazdirma lejant satirlarini (renk + etiket) doner. */
  async function rows(fill: LayerStyleSpec["fill"]) {
    const [entry] = await collectPrintLegendEntries(
      createFakeLayerManager({ layerStyle: { fill, outline: OUTLINE } as LayerStyleSpec }),
      [LAYER],
    );
    if (!entry || !("rows" in entry)) throw new Error(`satirli lejant bekleniyordu: ${JSON.stringify(entry)}`);
    return entry.rows;
  }

  it("gradient (sequential): 7 adim, ustten alta azalan deger, dogrusal karisim", async () => {
    expect(await rows({ mode: "gradient", column: "v", palette: BLACK_WHITE, min: 0, max: 60, opacity: 1 })).toEqual([
      { color: "rgb(255, 255, 255)", label: "60" },
      { color: "rgb(213, 213, 213)", label: "50" },
      { color: "rgb(170, 170, 170)", label: "40" },
      { color: "rgb(128, 128, 128)", label: "30" },
      { color: "rgb(85, 85, 85)", label: "20" },
      { color: "rgb(42, 42, 42)", label: "10" },
      { color: "rgb(0, 0, 0)", label: "0" },
    ]);
  });

  it("bin (sequential): her sinif icin aralik etiketi ve dogrusal renk", async () => {
    expect(await rows({ mode: "bin", column: "v", palette: BLACK_WHITE, binCount: 4, min: 0, max: 100, opacity: 1 })).toEqual([
      { color: "rgb(0, 0, 0)", label: "0 – 25" },
      { color: "rgb(85, 85, 85)", label: "25 – 50" },
      { color: "rgb(170, 170, 170)", label: "50 – 75" },
      { color: "rgb(255, 255, 255)", label: "75 – 100" },
    ]);
  });

  it("bin: tek sinifta paletin ortasi kullanilir; 3 haneli hex desteklenir", async () => {
    expect(await rows({ mode: "bin", column: "v", palette: ["#000", "#fff"], binCount: 1, min: 0, max: 1, opacity: 1 })).toEqual([
      { color: "rgb(128, 128, 128)", label: "0 – 1" },
    ]);
  });

  it("gradient (qualitative): karisim YOK, en yakin palet rengi aynen kullanilir (lejant paneliyle ayni)", async () => {
    const fill = { mode: "gradient", column: "v", palette: RGB, paletteKind: "qualitative", min: 0, max: 60, opacity: 1 } as const;
    expect((await rows(fill)).map((row) => row.color)).toEqual([
      "#0000ff",
      "#0000ff",
      "#00ff00",
      "#00ff00",
      "#00ff00",
      "#ff0000",
      "#ff0000",
    ]);
  });

  it("bin (qualitative): karisim YOK, en yakin palet rengi aynen kullanilir (lejant paneliyle ayni)", async () => {
    const fill = { mode: "bin", column: "v", palette: RGB, paletteKind: "qualitative", binCount: 4, min: 0, max: 4, opacity: 1 } as const;
    expect((await rows(fill)).map((row) => row.color)).toEqual(["#ff0000", "#00ff00", "#00ff00", "#0000ff"]);
  });

  it("enum: sayilar sayisal, sonra metinler alfabetik siralanir (lejant paneliyle ayni)", async () => {
    const colors = { b: "#111111", "15.04": "#222222", a: "#333333", "9": "#444444" };
    expect(await rows({ mode: "enum", column: "v", colors, opacity: 1 })).toEqual([
      { color: "#444444", label: "9" },
      { color: "#222222", label: "15.04" },
      { color: "#333333", label: "a" },
      { color: "#111111", label: "b" },
    ]);
  });
});
