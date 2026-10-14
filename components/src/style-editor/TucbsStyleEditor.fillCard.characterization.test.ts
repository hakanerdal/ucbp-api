// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- Klasor yapisi ve seçici bölme planı, Faz 0.4-g.
// Faz 3.1b'de _renderFillCard (295 satir) style-editor/fillCard.ts'e template
// fonksiyonlari olarak TASINACAK. Bu bir saf tasima olmali; bu dosya stil
// kartlari alaninin render ciktisini her renk modunda BIREBIR dondurur:
//   - Lit yorum isaretleri ayiklanmis HTML (yapi, sinif, attribute, metin),
//   - HTML'de gorunmeyen property baglamalari (.value/.checked/disabled).
// Snapshot dosyasi: __snapshots__/TucbsStyleEditor.fillCard.characterization.test.ts.snap
import { afterEach, describe, expect, it } from "vitest";
import type { LayerStyleSpec } from "@tucbs/core";
import "./TucbsStyleEditor.js";
import type { TucbsStyleEditor } from "./TucbsStyleEditor.js";
import { createFakeLayerManager } from "../__tests__/fixtures/fakeLayerManager.js";

const OUTLINE = { enabled: true, color: "#1a73e8", width: 2 };
const VIRIDIS = ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"];

/** Stil kartlari alaninin HTML'ini Lit isaretlerinden ve bosluk farklarindan arindirir. */
function normalizedHtml(root: Element): string {
  return root.innerHTML
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

/** HTML'de gorunmeyen property degerlerini form kontrolleri icin listeler. */
function controlProperties(root: Element): string[] {
  const selector = "input, select, textarea, button, [class^='cds-'], cds-dropdown, cds-text-input, cds-number-input, cds-slider, cds-checkbox, cds-multi-select";
  return [...root.querySelectorAll<HTMLElement & { value?: unknown; checked?: unknown; disabled?: unknown }>(selector)].map(
    (control) =>
      [
        control.localName,
        control.getAttribute("class") ?? "",
        `value=${JSON.stringify(control.value ?? null)}`,
        `checked=${JSON.stringify(control.checked ?? null)}`,
        `disabled=${JSON.stringify(control.disabled ?? null)}`,
      ].join(" | "),
  );
}

/** Editoru verilen stil ve katman turuyle acip stil kartlari alaninin ciktisini dondurur. */
async function renderCards(style: LayerStyleSpec | undefined, layerType = "GEOJSON") {
  const el = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
  document.body.appendChild(el);
  el.layerManager = createFakeLayerManager({
    ...(style && { layerStyle: style }),
    entityPropertyNames: ["ad", "nufus", "tur"],
    columnRanges: { nufus: { min: 0, max: 100 }, ad: null, tur: null },
    uniqueColumnValues: { tur: ["konut", "ticari", "sanayi"] },
    featureCount: 12,
  });
  el.openFor("layer-1", "Katman", layerType as never, "#336699", 0.6);
  await el.updateComplete;
  await el.updateComplete;
  const cards = el.shadowRoot!.querySelector(".style-cards")!;
  return { html: normalizedHtml(cards), controls: controlProperties(cards) };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("TucbsStyleEditor stil kartlari render ciktisi (karakterizasyon)", () => {
  it.each<[string, LayerStyleSpec | undefined, string?]>([
    ["stil yok (varsayilan solid)", undefined],
    ["solid", { fill: { mode: "solid", color: "#112233", opacity: 0.5 }, outline: OUTLINE }],
    [
      "gradient",
      { fill: { mode: "gradient", column: "nufus", palette: VIRIDIS, min: 10, max: 90, opacity: 1 }, outline: OUTLINE },
    ],
    [
      "bin",
      { fill: { mode: "bin", column: "nufus", palette: VIRIDIS, binCount: 4, min: 0, max: 100, opacity: 1 }, outline: OUTLINE },
    ],
    [
      "enum",
      { fill: { mode: "enum", column: "tur", colors: { konut: "#ff0000", ticari: "#00ff00", sanayi: "#0000ff" }, opacity: 1 }, outline: OUTLINE },
    ],
    ["off", { fill: { mode: "off" } as LayerStyleSpec["fill"], outline: { enabled: false, color: "#000000", width: 1 } }],
    ["cizim katmani (mod secimi gizli)", undefined, "DRAWING"],
  ])("%s", async (_name, style, layerType) => {
    expect(await renderCards(style, layerType)).toMatchSnapshot();
  });
});

// Gercek hatalar plani H3.1: lejant kartindaki sayi etiketleri
// (formatLegendNumber). Yukaridaki snapshot'lar 10-90 / 0-100 araligini
// kullandigi icin kayan nokta hatasini gostermez.
describe("TucbsStyleEditor lejant karti sayi etiketleri (karakterizasyon -- H3.1)", () => {
  /** Lejant kartindaki deger etiketlerini okur. */
  async function legendLabels(style: LayerStyleSpec) {
    await renderCards(style);
    const el = document.querySelector("tucbs-style-editor")!;
    return [...el.shadowRoot!.querySelectorAll(".legend-value")].map((node) => node.textContent!.trim());
  }

  it("gradient 0-60 lejantinda 40/20/10 ondaliksiz gosterilir (H3.3)", async () => {
    expect(
      await legendLabels({
        fill: { mode: "gradient", column: "nufus", palette: VIRIDIS, min: 0, max: 60, opacity: 1 },
        outline: OUTLINE,
      }),
    ).toEqual(["60", "50", "40", "30", "20", "10", "0"]);
  });

  it("bin 0-29 (7 sinif) lejantinda son sinir '29' gosterilir (H3.3)", async () => {
    expect(
      await legendLabels({
        fill: { mode: "bin", column: "nufus", palette: VIRIDIS, binCount: 7, min: 0, max: 29, opacity: 1 },
        outline: OUTLINE,
      }),
    ).toEqual([
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

// Faz 3.4a: lejant kartinin RENKLERI. Sequential palet (Viridis) renkleri
// yukaridaki snapshot'larda donmus durumda; burada qualitative palet (karisim
// YOK, en yakin palet rengi -- haritadaki gibi) ve tek sinifli bin.
describe("TucbsStyleEditor lejant karti renkleri (karakterizasyon -- Faz 3.4a)", () => {
  const SET2 = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"];

  /** Lejant kartindaki satirlari (swatch rengi + etiket) okur. */
  async function legendRows(style: LayerStyleSpec) {
    await renderCards(style);
    const el = document.querySelector("tucbs-style-editor")!;
    return [...el.shadowRoot!.querySelectorAll(".legend-bin-list .legend-bin-row")].map((row) => ({
      color: (row.querySelector(".legend-swatch")!.getAttribute("style") ?? "").replace(/^background:/, ""),
      label: row.querySelector(".legend-value")!.textContent!.replace(/\s+/g, " ").trim(),
    }));
  }

  it("gradient (qualitative Set2): karisim yok, en yakin palet rengi kullanilir", async () => {
    const rows = await legendRows({
      fill: { mode: "gradient", column: "nufus", palette: SET2, paletteKind: "qualitative", min: 0, max: 60, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows.map((row) => row.color)).toEqual([
      "#b3b3b3",
      "#e5c494",
      "#ffd92f",
      "#a6d854",
      "#8da0cb",
      "#fc8d62",
      "#66c2a5",
    ]);
  });

  it("bin (qualitative Set2): karisim yok, en yakin palet rengi kullanilir", async () => {
    const rows = await legendRows({
      fill: { mode: "bin", column: "nufus", palette: SET2, paletteKind: "qualitative", binCount: 3, min: 0, max: 30, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows).toEqual([
      { color: "#66c2a5", label: "0 – 10" },
      { color: "#a6d854", label: "10 – 20" },
      { color: "#b3b3b3", label: "20 – 30" },
    ]);
  });

  it("bin: tek sinifta paletin ortasi kullanilir", async () => {
    const rows = await legendRows({
      fill: { mode: "bin", column: "nufus", palette: VIRIDIS, binCount: 1, min: 0, max: 10, opacity: 1 },
      outline: OUTLINE,
    });
    expect(rows).toEqual([{ color: "rgb(33, 145, 140)", label: "0 – 10" }]);
  });
});

// Gercek hatalar plani H4.1/H4.3: "Degerler" listesi varsayilan "Artan"
// sirasi (sortCategoryValues) artik lejant paneliyle ayni: 2, 9, 10, 100,
// a, b (bkz TucbsLegendPanel karakterizasyon testi). Eskiden fark yalnizca
// Veri Sutunu secilince, degerler CANLI veriden (getUniqueColumnValues)
// geldiginde gorunuyordu -- acilista kayitli stilden geri yuklenen degerler
// sayiya cevrildigi ve Object.keys tam sayi anahtarlari one aldigi icin
// sira tesadufen dogru cikiyordu.
describe("TucbsStyleEditor Degerler listesi siralamasi (karakterizasyon -- H4.1)", () => {
  /** Enum stilli bir katmanla editoru acar, Veri Sutunu'nu yeniden secip "Degerler" listesindeki etiketleri okur. */
  async function categoryLabels(uniqueValues: (string | number)[]) {
    const el = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
    document.body.appendChild(el);
    el.layerManager = createFakeLayerManager({
      layerStyle: {
        fill: {
          mode: "enum",
          column: "kod",
          colors: Object.fromEntries(uniqueValues.map((value) => [String(value), "#123456"])),
          opacity: 1,
        },
        outline: OUTLINE,
      },
      entityPropertyNames: ["kod"],
      columnRanges: { kod: null },
      uniqueColumnValues: { kod: uniqueValues },
    });
    el.openFor("layer-1", "Katman", "GEOJSON" as never, "#336699", 0.6);
    await el.updateComplete;
    (el as unknown as { _onDataColumnChange(column: string): void })._onDataColumnChange("kod");
    await el.updateComplete;
    return [...el.shadowRoot!.querySelectorAll(".category-values-list .legend-value")].map(
      (node) => node.textContent!.trim(),
    );
  }

  it("metin olarak gelen sayi degerleri sayisal siralanir (lejant paneliyle ayni)", async () => {
    expect(await categoryLabels(["10", "b", "9", "a", "2", "100"])).toEqual(["2", "9", "10", "100", "a", "b"]);
  });

  it("sayi ve metin karisik canli veride once sayilar, sonra metinler gelir", async () => {
    expect(await categoryLabels([10, "b", 9, "a", 2])).toEqual(["2", "9", "10", "a", "b"]);
  });
});
