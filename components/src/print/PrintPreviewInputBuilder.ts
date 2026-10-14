import type { Map as TucbsMapInstance } from "@tucbs/core";
import { calculateScaleRatio } from "./scaleBar.js";
import { collectPrintLegendEntries, collectVisibleDatasetNames, type PrintLegendEntry } from "./PrintLegendData.js";
import type { PrintPreviewContent } from "./PrintPreviewBuilder.js";

// FAZ 2.7: v17 SS8.3 dosya-uzunlugu geregi (<=300 satir) `TucbsPrintTool.ts`'ten
// AYRISTIRILDI -- o dosya artik SADECE bilesen orkestrasyonuna (yasam
// dongusu, olay isleyicileri, panel render'i) odaklanir, bu dosya ise
// SADECE canli haritadan/bilesen durumundan `PrintPreviewContent`'in
// (`imageBlobUrl` HARIC) nasil turetildigine (SRP). `PrintPreviewBuilder.ts`
// (DOM CIKTISI insa eder) ile isim/sorumluluk simetrisi bilincli: bu dosya
// GIRDIYI insa eder.

const MM_PER_INCH = 25.4;

// FAZ 1.6: "1/N" olcek orani ARTIK PRINT_DPI'ye GORE degil, canli haritadaki
// mevcut "Olcek 1/N" gostergesiyle (bkz TucbsInfoBar.ts SCREEN_DPI) AYNI
// referansla (standart 96dpi ekran) hesaplanir -- kullanici, farkli sayfa
// boyutlari secince etiketin degismesini istemedi, HER sayfada AYNI (canli
// haritadaki) degeri istedi. Capture ANINDAKI olcum (groundMetersPerPixel),
// hangi kagit boyutu secilirse secilsin AYNI etikete donusur.
const SCREEN_DPI = 96;
const SCREEN_METERS_PER_PIXEL = MM_PER_INCH / SCREEN_DPI / 1000;

// Sayfa kenar bosluguyla (PrintPreviewBuilder'a AYNEN iletilir, tek dogru
// kaynak) + basligin (printTitle+tarih) + altbilginin (footerText) rezerve
// ettigi mm -- harita goruntusu bu ALANLAR DUSULEREK yakalanir, boylece
// toplam sayfa icerigi TAM 1 sayfaya sigar (2. sayfaya tasmaz).
const PAGE_MARGIN_MM = 8;
const HEADER_BLOCK_HEIGHT_MM = 14;
const FOOTER_BLOCK_HEIGHT_MM = 12;

// Harita goruntusunun azami yuksekligi, TAM sayfa yuksekliginin bu ORANIYLA
// sinirlandirilir (Faz 1.2 madde 3 -- goruntu sayfanin UST YARISINDA
// kalmali, alt yari bos kalir).
const IMAGE_TOP_HALF_RATIO = 0.5;

/** `buildPrintPreviewInput()`'a verilecek seçenekler. */
export interface PrintPreviewInputOptions {
  /** Canlı harita instance'ı (görüntü/kamera/katman verisi buradan okunur). */
  readonly map: TucbsMapInstance;
  /** Hedef sayfa boyutu (mm). */
  readonly pageDims: { readonly widthMm: number; readonly heightMm: number };
  /** Sayfa başlığı (boşsa başlık/tarih bloğu hiç gösterilmez). */
  readonly printTitle: string;
  /** Sayfa altbilgisi (boşsa altbilgi bloğu hiç gösterilmez). */
  readonly footerText: string;
  /** Kuzey oku gösterilsin mi. */
  readonly showNorthArrow: boolean;
  /** Ölçek oranı ("1/N") gösterilsin mi. */
  readonly showScaleBar: boolean;
  /** Lejant bölümü gösterilsin mi. */
  readonly showLegend: boolean;
}

/**
 * Canli haritadan (o anki ekran/kamera durumu) + bilesen ozelliklerinden
 * (`options`), `PrintPreviewOverlayController.show()`'un bekledigi
 * `PrintPreviewContent` (imageBlobUrl HARIC, blob capture cagiran tarafta
 * kalir) nesnesini derler. Lejant cozumlemesi ASENKRON oldugundan (WMTS
 * icin getCapabilities agi gerektirebilir) fonksiyonun TAMAMI async'tir.
 */
export async function buildPrintPreviewInput(
  options: PrintPreviewInputOptions,
): Promise<Omit<PrintPreviewContent, "imageBlobUrl">> {
  const { map, pageDims } = options;
  const headerHeightMm = options.printTitle ? HEADER_BLOCK_HEIGHT_MM : 0;
  const footerHeightMm = options.footerText ? FOOTER_BLOCK_HEIGHT_MM : 0;
  const contentDims = computeImageContentDimensionsMm(pageDims, headerHeightMm, footerHeightMm);
  const scaleRatioLabel = computeScaleRatioLabel(map, options.showScaleBar);
  // Faz 1.6 madde 3: letterbox-farkinda konumlandirma icin capture'in
  // KENDI en-boy orani gerekir (bkz PrintPreviewBuilder.ts computeVisibleImageOffsetPct).
  const canvas = map.viewer.canvas;
  const captureAspectRatio = canvas.clientHeight > 0 ? canvas.clientWidth / canvas.clientHeight : 1;
  const northArrowRotationDeg = -((map.viewer.camera.heading ?? 0) * 180) / Math.PI;
  // FAZ 3.4: "Veri Setleri" bolumu ARTIK Lejant Goster durumundan BAGIMSIZ
  // HER ZAMAN gosteriliyor -- katman ADLARI (ag cagrisi GEREKTIRMEYEN,
  // senkron) her durumda toplanir; TAM lejant cozumlemesi (WMS/WMTS agi
  // gerektirebilir) ise ONCEKI gibi SADECE showLegend true iken cagrilir.
  const datasetNames = collectVisibleDatasetNames(map.layerManager.getLayers());
  const legendEntries = await resolvePrintLegendEntries(map, options.showLegend);
  return {
    imageWidthMm: contentDims.contentWidthMm,
    imageHeightMm: contentDims.contentHeightMm,
    captureAspectRatio,
    printTitle: options.printTitle,
    printDate: new Date(),
    footerText: options.footerText,
    showNorthArrow: options.showNorthArrow,
    northArrowRotationDeg,
    showScaleBar: options.showScaleBar,
    scaleRatioLabel,
    pageWidthMm: pageDims.widthMm,
    pageHeightMm: pageDims.heightMm,
    pageMarginMm: PAGE_MARGIN_MM,
    headerHeightMm,
    footerHeightMm,
    showLegend: options.showLegend,
    datasetNames,
    legendEntries,
  };
}

// Lejant checkbox'i isaretliyse gorunur (basemap olmayan) katmanlarin
// lejantini cozer -- SADECE bu durumda cagrilir, kapaliyken (varsayilan)
// WMTS gibi asenkron/ag-gerektiren cozumlemeler HIC tetiklenmez.
async function resolvePrintLegendEntries(
  map: TucbsMapInstance,
  showLegend: boolean,
): Promise<readonly PrintLegendEntry[]> {
  if (!showLegend) return [];
  const layerManager = map.layerManager;
  return collectPrintLegendEntries(layerManager, layerManager.getLayers());
}

// Harita goruntusunun sayfaya YERLESTIRILECEGI icerik alanini hesaplar --
// baslik/altbilgi icin ayrilan mm dusulur, yukseklik AYRICA sayfanin UST
// YARISIYLA sinirlanir (Faz 1.2 madde 3 -- kullanici goruntunun alt
// yariya tasmasini istemedi; eskiden bu siniri baslik de ETKILIYORDU, bu
// TUTARSIZDI -- bkz Faz 1.3 madde 2 gerekcesi, artik ETKILEMEZ).
function computeImageContentDimensionsMm(
  pageDims: { readonly widthMm: number; readonly heightMm: number },
  headerHeightMm: number,
  footerHeightMm: number,
): { readonly contentWidthMm: number; readonly contentHeightMm: number } {
  const availableContentHeightMm = pageDims.heightMm - 2 * PAGE_MARGIN_MM - headerHeightMm - footerHeightMm;
  const topHalfHeightLimitMm = pageDims.heightMm * IMAGE_TOP_HALF_RATIO;
  return {
    contentWidthMm: pageDims.widthMm - 2 * PAGE_MARGIN_MM,
    contentHeightMm: Math.min(availableContentHeightMm, topHalfHeightLimitMm),
  };
}

// Faz 1.7: capture ANINDAKI (ekran) olcume gore hesaplanir (bkz
// SCREEN_METERS_PER_PIXEL dosya-ustu yorumu).
function computeScaleRatioLabel(map: TucbsMapInstance, showScaleBar: boolean): string | null {
  if (!showScaleBar) return null;
  const groundMetersPerPixel = map.measureGroundMetersPerPixel();
  return groundMetersPerPixel !== null
    ? calculateScaleRatio(groundMetersPerPixel, SCREEN_METERS_PER_PIXEL).label
    : null;
}
