import type { PrintLegendEntry, LegendRow } from "./PrintLegendData.js";

// FAZ 3.4: 3dmap'teki (RecordToolPanel.tsx satir 281-282) yesil uyari mesaji.
// "yukarida siralanan kurumlar" ifadesi (kurumlar belirtilmedigi icin) kaldirildi,
// bu nedenle 3dmap metninden bilinçli olarak ayrisir.
const DISCLAIMER_TEXT =
  "Ulusal Coğrafi Bilgi Platformundan (UCBP) alınmıştır, bilgi amaçlıdır. Haritada yer alan coğrafi veriler ile ilgili sorumluluk, verilerin sahibi kurumlara aittir.";

const EMPTY_DATASETS_MESSAGE = "Haritada gösterilecek veri seti bulunmamaktadır.";

/** 3dmap'teki `.disclaimer` ile AYNI renk/kenarlik (bkz PrintPreviewStyles.ts .print-disclaimer). */
export function buildDisclaimerBox(doc: Document): HTMLElement {
  const box = doc.createElement("div");
  box.className = "print-disclaimer";
  box.textContent = DISCLAIMER_TEXT;
  return box;
}

/** 3dmap'teki `.section-title` ile AYNI renk/alt-cizgi (bkz PrintPreviewStyles.ts .print-section-title). */
export function buildDatasetsSectionTitle(doc: Document): HTMLElement {
  const title = doc.createElement("h2");
  title.className = "print-section-title";
  title.textContent = "Veri Setleri";
  return title;
}

/** Lejant Goster KAPALIYKEN -- sade katman-adi listesi, ag cagrisi YOK. */
export function buildDatasetNameList(doc: Document, names: readonly string[]): HTMLElement {
  const list = doc.createElement("ul");
  list.className = "dataset-name-list";
  for (const name of names) {
    const item = doc.createElement("li");
    item.textContent = name;
    list.appendChild(item);
  }
  return list;
}

/** Haritada gorunur (basemap olmayan) HIC katman yoksa -- 3dmap'in `emptyMap` durumuyla AYNI. */
export function buildEmptyDatasetsMessage(doc: Document): HTMLElement {
  const message = doc.createElement("p");
  message.className = "dataset-empty";
  message.textContent = EMPTY_DATASETS_MESSAGE;
  return message;
}

/**
 * Cozulmus lejant girdilerini, `PrintPreviewBuilder.ts`'in geri kalaniyla
 * AYNI CSP-guvenli yaklasimla (createElement/textContent, innerHTML YOK)
 * DOM'a insa eder. `entries` bossa `null` doner -- cagiran taraf boluma HIC
 * yer acmaz.
 */
export function buildLegendSection(doc: Document, entries: readonly PrintLegendEntry[]): HTMLElement | null {
  if (entries.length === 0) return null;
  const section = doc.createElement("div");
  // FAZ 3.5: `.legend-section` ARTIK HICBIR zaman CSS `columns:` (masonry)
  // baglami acmiyor (bkz PrintPreviewStyles.ts .legend-section WHY yorumu)
  // -- girdiler HER ZAMAN TEK sinifla, duz blok akisinda ALT ALTA render
  // olur; "list-columns" girdisi icin eskiden gerekli olan ayri
  // `-stacked` varyanti (Faz 2.4'un `column-span:all` kacinmasi) artik
  // GEREKSIZ (kok neden -- disaridaki columns: baglami -- tamamen ortadan
  // kalkti).
  section.className = "legend-section";
  for (const entry of entries) section.appendChild(buildLegendEntryElement(doc, entry));
  return section;
}

function buildLegendEntryElement(doc: Document, entry: PrintLegendEntry): HTMLElement {
  if (entry.kind === "list-columns") return buildListColumnsGrid(doc, entry);
  const wrapper = doc.createElement("div");
  wrapper.className = "legend-entry";
  wrapper.append(...buildLegendEntryHeader(doc, entry), buildLegendEntryContent(doc, entry));
  return wrapper;
}

// Faz 2.2: stillendirilmis (gradient/bin/enum) kolonu olan girdilerde
// kullanici tarafindan referans verilen ekran goruntusuyle BIREBIR eslesen
// 3 satirlik basligi -- dosya/katman adi, "Goruntuleme Degiskeni: <kolon>",
// kolonun kendisinin TEKRARI -- uretir; WMS/WMTS servis lejanti ve
// stillenmemis ("empty") girdilerde "Goruntuleme Degiskeni" kavrami hic
// olmadigindan TEK satirlik eski basligi korur. Bu baslik, buyuk bir
// kategori listesi devam sayfalarina bolununce (bkz PrintLegendPagination.ts
// addList) HER parca icin AYNEN tekrar uretilir -- kullanicinin acikca
// istedigi "her sayfa tekrarinda kolon ustunde tekrar yaz" davranisi.
function buildLegendEntryHeader(doc: Document, entry: Exclude<PrintLegendEntry, { kind: "list-columns" }>): HTMLElement[] {
  if (entry.kind !== "gradient" && entry.kind !== "bin" && entry.kind !== "enum") {
    return buildEntryHeaderLines(doc, entry.layerTitle, undefined);
  }
  return buildEntryHeaderLines(doc, entry.layerTitle, entry.displayColumn);
}

function buildEntryHeaderLines(doc: Document, layerTitle: string, displayColumn: string | undefined): HTMLElement[] {
  const title = doc.createElement("div");
  title.className = "legend-entry-title";
  title.textContent = layerTitle;
  if (displayColumn === undefined) return [title];
  const subtitle = doc.createElement("div");
  subtitle.className = "legend-entry-subtitle";
  subtitle.textContent = `Görüntüleme Değişkeni: ${displayColumn}`;
  const columnRepeat = doc.createElement("div");
  columnRepeat.className = "legend-entry-column";
  columnRepeat.textContent = displayColumn;
  return [title, subtitle, columnRepeat];
}

function buildLegendEntryContent(doc: Document, entry: Exclude<PrintLegendEntry, { kind: "list-columns" }>): HTMLElement {
  switch (entry.kind) {
    case "image":
      return buildImageContent(doc, entry.imageUrl);
    case "gradient":
    case "bin":
    case "enum":
      return buildRowsContent(doc, entry.rows);
    case "empty":
      return buildEmptyContent(doc, entry.message);
  }
}

// FAZ 2.3: bir kategori listesi TEK kolona sigmayacak kadar buyudugunde,
// tarayicinin dogal CSS `columns:` akisina birakmak (eski davranis) basligin
// SADECE 1. kolonun basinda gorunup 2./3. kolonlarin sayfa USTUNDEN
// baslamasina, dolayisiyla renk satirlarinin kolonlar arasinda HIZASIZ
// gorunmesine yol aciyordu (kullanici geri bildirimi, ekran goruntusuyle
// dogrulandi). Cozum: bu girdi `column-span:all` (bkz PrintPreviewBuilder.ts
// buildLegendCss .legend-list-columns) ile disaridaki multi-column
// baglamindan CIKARILIP, KENDI icinde acik bir CSS Grid olarak insa edilir.
// Ilk kolon GORUNUR basligi tasir; digerleri basligin AYNI markup'inin
// `visibility:hidden` bir kopyasini tasir -- boylece hizalama, bir mm
// degeri TAHMIN ETMEDEN (bu oturumda defalarca karsilasilan "sabit mm
// tahmini" kirilganligina yeniden girmemek icin BILINCLI tercih),
// tarayicinin GERCEK render ettigi yukseklige gore OTOMATIK saglanir.
function buildListColumnsGrid(doc: Document, entry: Extract<PrintLegendEntry, { kind: "list-columns" }>): HTMLElement {
  const grid = doc.createElement("div");
  grid.className = "legend-entry legend-list-columns";
  entry.columnGroups.forEach((rows, index) => {
    const column = doc.createElement("div");
    const header = doc.createElement("div");
    header.append(...buildEntryHeaderLines(doc, entry.layerTitle, entry.displayColumn));
    if (index > 0) header.style.visibility = "hidden";
    column.append(header, buildRowsContent(doc, rows));
    grid.appendChild(column);
  });
  return grid;
}

function buildImageContent(doc: Document, imageUrl: string): HTMLElement {
  const img = doc.createElement("img");
  img.className = "legend-image";
  img.src = imageUrl;
  img.alt = "Lejant";
  return img;
}

function buildRowsContent(doc: Document, rows: readonly LegendRow[]): HTMLElement {
  const wrapper = doc.createElement("div");
  for (const row of rows) {
    const rowEl = doc.createElement("div");
    rowEl.className = "legend-row";
    const swatch = doc.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.background = row.color;
    const value = doc.createElement("span");
    value.className = "legend-value";
    value.textContent = row.label;
    rowEl.append(swatch, value);
    wrapper.appendChild(rowEl);
  }
  return wrapper;
}

function buildEmptyContent(doc: Document, message: string): HTMLElement {
  const span = doc.createElement("span");
  span.className = "legend-empty";
  span.textContent = message;
  return span;
}

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
export function buildDatasetNameContinuationPage(
  doc: Document,
  names: readonly string[],
  pageWidthMm: number,
  sectionHeightMm: number,
  pageMarginMm: number,
  includeHeader = false,
): HTMLElement {
  const page = doc.createElement("div");
  page.className = "legend-continuation-page";
  page.style.padding = `${pageMarginMm}mm`;
  page.style.width = `${pageWidthMm}mm`;
  page.style.boxSizing = "border-box";
  if (includeHeader) {
    page.appendChild(buildDatasetsSectionTitle(doc));
  }
  const list = buildDatasetNameList(doc, names);
  list.style.height = `${sectionHeightMm}mm`;
  list.style.overflow = "hidden";
  page.appendChild(list);
  return page;
}

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
export function buildLegendContinuationPage(
  doc: Document,
  entries: readonly PrintLegendEntry[],
  pageWidthMm: number,
  sectionHeightMm: number,
  pageMarginMm: number,
  includeHeader = false,
): HTMLElement {
  const page = doc.createElement("div");
  page.className = "legend-continuation-page";
  page.style.padding = `${pageMarginMm}mm`;
  page.style.width = `${pageWidthMm}mm`;
  page.style.boxSizing = "border-box";
  if (includeHeader) {
    page.appendChild(buildDatasetsSectionTitle(doc));
  }
  const section = buildLegendSection(doc, entries);
  if (section) {
    section.style.height = `${sectionHeightMm}mm`;
    section.style.overflow = "hidden";
    page.appendChild(section);
  }
  return page;
}
