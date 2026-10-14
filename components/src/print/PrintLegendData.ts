import type { LayerManager, ManagedLayer, LayerStyleSpec, PaletteKind } from "@tucbs/core";
import { compareCategoryKeys } from "../shared/util/categorySort.js";
import { sampleFromPaletteCss } from "../shared/util/gradientSampling.js";
import { binLegendRows, gradientLegendRows, type LegendRow } from "../shared/util/legendRows.js";

// LegendRow Faz 3.4b'de shared/util/legendRows.ts'e tasindi; yazdirma
// modulleri (PrintLegendPagination/PrintLegendBuilder) buradan okumaya
// devam eder.
export type { LegendRow };

// `TucbsLegendPanel.ts`'in gorsel/veri mantigiyla BIREBIR ayni (WMS/WMTS
// servis grafigi + vektor gradient/bin/enum), ama SONUCU onceden hesaplanmis
// (renk+etiket) duz veriye indirger -- DOM insa eden taraf (bkz
// PrintLegendBuilder.ts) boylece TAMAMEN "aptal" bir render katmani olarak
// kalir.
/** Bir katmanın, yazdırma önizlemesindeki lejant bölümü için önceden hesaplanmış girdisi. */
export type PrintLegendEntry =
  /** WMS/WMTS servis grafiği (görsel URL'i). */
  | { readonly layerTitle: string; readonly kind: "image"; readonly imageUrl: string }
  | {
      readonly layerTitle: string;
      // FAZ 2.7: "gradient" (Surekli) ARTIK yatay bir bar+iki uc etiketi
      // OLARAK DEGIL, "bin"/"enum" ile AYNI dikey renk-kutucuklu satir
      // listesi olarak render edilir -- canli TucbsLegendPanel.ts'teki
      // GRADIENT_LEGEND_STEPS=7 esit araliklı ORNEK satir yaklasimiyla
      // BIREBIR AYNI (bkz buildGradientEntry) -- kullanici acikca "Yazdır
      // dediğimizde yatay bar gibi gözüküyor, bu hatalı; ekteki 2. görsel
      // (LegendPanel) gibi olmalı" bildirdi. Bu yuzden veri sekli de artik
      // "bin"/"enum" ile AYNI (rows+displayColumn) -- render/sayfalama
      // katmanlari (bkz PrintLegendBuilder.ts/PrintLegendPagination.ts) bu
      // ucunu TEK bir yol olarak isler.
      /** Sürekli renk rampası, sabit aralıklı bin veya kategorik (enum) vektör stili. */
      readonly kind: "gradient" | "bin" | "enum";
      readonly rows: readonly LegendRow[];
      readonly displayColumn: string;
    }
  // FAZ 2.3: bir "bin"/"enum" girdisi TEK kolona sigmayacak kadar buyukse,
  // sayfalama (bkz PrintLegendPagination.ts) bunu bu ayri "list-columns"
  // turune donusturur -- satirlar ONCEDEN N kolona bolunmus halde tasinir,
  // boylece DOM insa eden taraf (bkz PrintLegendBuilder.ts) HER kolonun
  // basina (1.si GORUNUR, digerleri `visibility:hidden`) AYNI basligin bir
  // kopyasini koyarak kolonlarin BIREBIR hizali baslamasini saglayabilir --
  // tarayicinin kendi `columns:` oto-akisina birakilsaydi (eski davranis)
  // baslik SADECE 1. kolonda gorunup digerleri sayfa ustunden baslayarak
  // HIZASIZ goruntu olusuyordu (kullanici geri bildirimi).
  /** Tek koloni aşan bir bin/enum listesinin, hizalama için önceden N koloma bölünmüş hali. */
  | {
      readonly layerTitle: string;
      readonly kind: "list-columns";
      readonly displayColumn: string;
      readonly columnGroups: readonly (readonly LegendRow[])[];
    }
  /** Lejant çözülemedi/uygulanmadı (`message` kullanıcıya gösterilecek nedendir). */
  | { readonly layerTitle: string; readonly kind: "empty"; readonly message: string };

// "Veri Setleri" bolumunde (bkz PrintPreviewInputBuilder.ts) HEM lejant
// listesi HEM sade katman-adi listesi AYNI "gorunur/basemap-olmayan katman"
// tanimini kullanir -- tek dogru kaynak, iki yerde tekrar YAZILMAZ.
function getVisibleDataLayers(layers: readonly ManagedLayer[]): ManagedLayer[] {
  return layers.filter((layer) => !layer.isBasemap && layer.cesiumObject.show !== false);
}

// FAZ 3.4: "Veri Setleri" basligi ALTINDA -- Lejant Goster KAPALIYKEN --
// gosterilecek sade katman-adi listesi icin. `collectPrintLegendEntries`'in
// aksine hicbir AG cagrisi (WMS/WMTS lejant grafigi) YAPMAZ -- sadece
// senkron bir isim listesi, bu yuzden Lejant Goster kapaliyken (onceki
// tasarimin bilinCli hedefi, bkz PrintPreviewInputBuilder.ts
// resolvePrintLegendEntries WHY yorumu) performans/ag maliyeti YOKTUR.
/**
 * Görünür (basemap olmayan, gizlenmemiş) katmanların adlarını döner — hiçbir ağ çağrısı yapmaz.
 * @param layers - Taranacak katman listesi (`LayerManager.getLayers()`).
 * @returns Görünür katmanların başlıkları.
 */
export function collectVisibleDatasetNames(layers: readonly ManagedLayer[]): string[] {
  return getVisibleDataLayers(layers).map((layer) => layer.title);
}

/**
 * Yazdirma onizlemesindeki lejant bolumu icin, GORUNUR (basemap olmayan)
 * katmanlarin lejant verisini `TucbsLegendPanel.ts` ile AYNI kaynaklardan
 * (WMS GetLegendGraphic / WMTS capabilities / vektor stil) cozer. Bir
 * katmanin cozumu basarisiz olursa (ag hatasi, servis hatasi) TUM onizlemeyi
 * dusurmez -- `Promise.allSettled` ile o katman icin "Lejant yuklenemedi"
 * girdisi uretilir.
 */
export async function collectPrintLegendEntries(
  layerManager: LayerManager,
  layers: readonly ManagedLayer[],
): Promise<PrintLegendEntry[]> {
  const visible = getVisibleDataLayers(layers);
  const settled = await Promise.allSettled(visible.map((layer) => resolveLegendEntry(layerManager, layer)));
  return settled.map((result, index) =>
    result.status === "fulfilled" ? result.value : buildEmptyEntry(visible[index]!.title, "Lejant yüklenemedi."),
  );
}

async function resolveLegendEntry(layerManager: LayerManager, layer: ManagedLayer): Promise<PrintLegendEntry> {
  if (layer.layerType === "WMS") {
    return buildImageEntry(layer.title, layerManager.getWmsLegendGraphicUrl(layer.id));
  }
  if (layer.layerType === "WMTS") {
    const styles = await layerManager.getWmtsAvailableStyles(layer.id);
    const legendUrl = styles[0]?.legendUrl;
    return legendUrl ? buildImageEntry(layer.title, legendUrl) : buildEmptyEntry(layer.title, "Lejant bulunamadı.");
  }
  return buildVectorEntry(layer.title, layerManager.getLayerStyle(layer.id));
}

function buildImageEntry(layerTitle: string, imageUrl: string): PrintLegendEntry {
  return { layerTitle, kind: "image", imageUrl };
}

function buildEmptyEntry(layerTitle: string, message: string): PrintLegendEntry {
  return { layerTitle, kind: "empty", message };
}

function buildVectorEntry(layerTitle: string, style: LayerStyleSpec | undefined): PrintLegendEntry {
  if (!style) return buildEmptyEntry(layerTitle, "Henüz stil uygulanmadı.");
  switch (style.fill.mode) {
    case "gradient":
      return buildGradientEntry(
        layerTitle,
        style.fill.column,
        style.fill.palette,
        style.fill.paletteKind,
        style.fill.min,
        style.fill.max,
      );
    case "bin":
      return buildBinEntry(
        layerTitle,
        style.fill.column,
        style.fill.palette,
        style.fill.paletteKind,
        style.fill.min,
        style.fill.max,
        style.fill.binCount,
      );
    case "enum":
      return buildEnumEntry(layerTitle, style.fill.column, style.fill.colors);
    case "solid":
    case "off":
    default:
      return buildEmptyEntry(layerTitle, "Bu katman sabit renkli, lejant gerekmiyor.");
  }
}

// TucbsLegendPanel.ts'teki "gradient" dalıyla BIREBIR AYNI ornekleme --
// GRADIENT_LEGEND_STEPS adet esit araliklı, TEK degerli satir, yuksekten
// dusuge siralanir (t=1 -> max, t=0 -> min). Faz 3.4b'den beri ikisi de
// shared/util/legendRows.ts gradientLegendRows'u kullanir.
// Renkler de lejant paneliyle (ve haritayla) AYNI kuralla, paletteKind
// gozetilerek orneklenir (gercek hatalar plani 3.4c): ESKIDEN burada
// paletteKind'i yok sayan sampleGradientCss kullaniliyordu -- qualitative
// (orn. Set2/Tableau10) bir palette yazdirma lejanti, haritada GERCEKTEN
// gorunen (karistirmasiz, en yakin palet rengi) yerine karisim renkleri
// gosteriyordu.
function buildGradientEntry(
  layerTitle: string,
  displayColumn: string,
  palette: readonly string[],
  paletteKind: PaletteKind | undefined,
  min: number | undefined,
  max: number | undefined,
): PrintLegendEntry {
  if (min === undefined || max === undefined) return buildEmptyEntry(layerTitle, "Aralık hesaplanamadı.");
  const rows = gradientLegendRows(min, max, (t) => sampleFromPaletteCss(palette, t, paletteKind));
  return { layerTitle, kind: "gradient", rows, displayColumn };
}

// buildGradientEntry ile ayni renk kurali (paletteKind, bkz yukarisi).
function buildBinEntry(
  layerTitle: string,
  displayColumn: string,
  palette: readonly string[],
  paletteKind: PaletteKind | undefined,
  min: number | undefined,
  max: number | undefined,
  binCount: number,
): PrintLegendEntry {
  if (min === undefined || max === undefined) return buildEmptyEntry(layerTitle, "Aralık hesaplanamadı.");
  const rows = binLegendRows(min, max, binCount, (t) => sampleFromPaletteCss(palette, t, paletteKind));
  return { layerTitle, kind: "bin", rows, displayColumn };
}

// Kategoriler lejant paneliyle (ve StyleEditor'un "Degerler" listesiyle)
// AYNI sirada gosterilir (gercek hatalar plani 3.4c; kural: bkz
// shared/util/categorySort.ts compareCategoryKeys, H4.1 karari "lejant
// panelinin kurali her yerde kullanilsin"). ESKIDEN Object.entries sirasi
// kullaniliyordu: tam sayi gibi anahtarlar once, ondalikli/metin anahtarlar
// eklenme sirasiyla sona -- yazdirma lejanti paneldekinden farkli siradaydi.
function buildEnumEntry(layerTitle: string, displayColumn: string, colors: Record<string, string>): PrintLegendEntry {
  const entries = Object.entries(colors);
  if (entries.length === 0) return buildEmptyEntry(layerTitle, "Kategori bulunamadı.");
  const sorted = [...entries].sort(([a], [b]) => compareCategoryKeys(a, b));
  return {
    layerTitle,
    kind: "enum",
    rows: sorted.map(([value, color]) => ({ color, label: value })),
    displayColumn,
  };
}
