import { PrintLegendEntry } from './PrintLegendData.js';
/** 3dmap'teki `.disclaimer` ile AYNI renk/kenarlik (bkz PrintPreviewStyles.ts .print-disclaimer). */
export declare function buildDisclaimerBox(doc: Document): HTMLElement;
/** 3dmap'teki `.section-title` ile AYNI renk/alt-cizgi (bkz PrintPreviewStyles.ts .print-section-title). */
export declare function buildDatasetsSectionTitle(doc: Document): HTMLElement;
/** Lejant Goster KAPALIYKEN -- sade katman-adi listesi, ag cagrisi YOK. */
export declare function buildDatasetNameList(doc: Document, names: readonly string[]): HTMLElement;
/** Haritada gorunur (basemap olmayan) HIC katman yoksa -- 3dmap'in `emptyMap` durumuyla AYNI. */
export declare function buildEmptyDatasetsMessage(doc: Document): HTMLElement;
/**
 * Cozulmus lejant girdilerini, `PrintPreviewBuilder.ts`'in geri kalaniyla
 * AYNI CSP-guvenli yaklasimla (createElement/textContent, innerHTML YOK)
 * DOM'a insa eder. `entries` bossa `null` doner -- cagiran taraf boluma HIC
 * yer acmaz.
 */
export declare function buildLegendSection(doc: Document, entries: readonly PrintLegendEntry[]): HTMLElement | null;
/**
 * `paginateDatasetNames()`'in urettigi bir "devam sayfasi" parcasini --
 * `buildLegendContinuationPage()` ile AYNI `.legend-continuation-page`
 * (`break-before:page`) kalibiyla, ama sade isim listesi icin insa eder.
 * `includeHeader` -- bkz `buildLegendContinuationPage`'deki AYNI parametrenin
 * WHY yorumu: sayfa 1'in payi HICBIR ismi barindiramadigi durumda, "Veri
 * Setleri" basligi da BU (ilk) devam sayfasina tasinir -- uyari kutusu
 * ARTIK HER ZAMAN sayfa 1'de/eski yerinde kaldigindan (kullanici acikca
 * istedi) burada TEKRAR eklenmez.
 */
export declare function buildDatasetNameContinuationPage(doc: Document, names: readonly string[], pageWidthMm: number, sectionHeightMm: number, pageMarginMm: number, includeHeader?: boolean): HTMLElement;
/**
 * `paginateLegendEntries()`'in urettigi bir "devam sayfasi" parcasini,
 * ana harita sayfasiyla AYNI `@page` boyutunda TAM bir sayfa olarak insa
 * eder -- `.legend-continuation-page` CSS'i (bkz PrintPreviewBuilder.ts
 * buildLegendCss) `break-before:page` ile bunu HER ZAMAN yeni bir fiziksel
 * sayfada baslatir (CSS'in en eski/en guvenilir sayfalama ozelligi --
 * `aspect-ratio`/`max-height`+fragmentation gibi bu oturumda GUVENILMEZ
 * cikan yeni/riskli ozelliklerden FARKLI, evrensel desteklenir).
 *
 * FAZ 2.6: `includeHeader` -- sayfa 1'in (rezerve/kucultulmus) payi HICBIR
 * girdiyi barindiramadigi (bkz PrintPreviewBuilder.ts appendDatasetsSection
 * page1Empty kontrolu) durumda true gecilir: "Veri Setleri" basligi da bu
 * (ilk) devam sayfasina TASINIR -- aksi halde sayfa 1'de SADECE bu baslik,
 * altinda kocaman bos alanla YALNIZ kalirdi (gercek kullanici bildirimi:
 * "Veri Setleri tek başına üstte kalıyorsa alt sayfada başlat"). Uyari
 * kutusu ARTIK HER ZAMAN sayfa 1'de/eski yerinde kaldigindan (kullanici
 * acikca istedi) burada TEKRAR eklenmez.
 */
export declare function buildLegendContinuationPage(doc: Document, entries: readonly PrintLegendEntry[], pageWidthMm: number, sectionHeightMm: number, pageMarginMm: number, includeHeader?: boolean): HTMLElement;
//# sourceMappingURL=PrintLegendBuilder.d.ts.map