import type { PrintLegendEntry, LegendRow } from "./PrintLegendData.js";

// Tek bir lejant satirinin (swatch+etiket) YAKLASIK basili yuksekligi (mm) --
// gercek `page.pdf()` ciktisindan (150dpi PNG'ye cevrilip piksel araligi
// olculerek, bkz Faz 2.1 arastirmasi) turetildi (~3.1-3.2mm/satir), guvenli
// tarafta kalmak icin biraz cömert tutuldu (satirlarin kesilmesindense
// fazladan devam sayfasi tercih edilir).
export const LEGEND_ROW_HEIGHT_MM = 3.4;

// Lejant sutun sayisi -- kullanici "sağa doğru böl" istedigi icin (uzun
// kategori listelerinde sayfa genisligini daha iyi kullanmak amaciyla)
// Faz 2'deki 2'den 3'e cikarildi. FAZ 3.5'ten beri SADECE TEK bir cok-uzun
// listenin KENDI ICINDEKI acik CSS Grid boluntisune (addMultiColumnChunk/
// buildListColumnsGrid) uygulanir -- FARKLI veri setlerinin lejantlari
// ARTIK bu sayidan BAGIMSIZ, her zaman TEK sutunda alt alta sıralanir (bkz
// PrintPreviewStyles.ts .legend-section WHY yorumu).
export const LEGEND_COLUMNS_PER_PAGE = 3;

// Resim/gradient/bos-mesaj gibi "kompakt" girdilerin (satir sayisi olmayan,
// ama yine de dikey yer kaplayan) sayfalama butcesindeki sabit maliyeti --
// baslik+icerik icin yeterince comert (ör. bir WMS lejant gorseli birkac
// satirlik yer kaplayabilir).
const COMPACT_ENTRY_ROW_COST = 4;

// FAZ 2.2/2.3: bin/enum basliginin (3 satir + aralar) bir VERI satirina
// (LEGEND_ROW_HEIGHT_MM) gore YAKLASIK dikey maliyeti. FAZ 2.3'ten
// itibaren bu maliyet HER kolonda AYRI AYRI odenir (bkz addList/
// splitIntoColumns WHY yorumu) -- eskiden (Faz 2.1) sayfa basina TEK
// SEFER odeniyordu, cunku baslik SADECE 1. kolonda goruniyordu; simdi
// hizalama icin HER kolonun basinda (gorunur veya gizli) ayni yukseklikte
// bir kopya oldugundan HER kolonun kendi satir kapasitesinden dusulmesi
// gerekir.
//
// FAZ 2.6'da YENIDEN olculerek DUZELTILDI: gercek tarayicida
// getBoundingClientRect ile olculen 3 satirlik baslik (title 1mm margin +
// subtitle 3mm margin + column-repeat 3mm margin, bkz PrintLegendBuilder.ts
// buildEntryHeaderLines / PrintPreviewStyles.ts .legend-entry-title/
// -subtitle/-column) toplam ~21.5mm cikti -- eski deger (4 satir birimi =
// 4*3.4mm = 13.6mm) bunu ~8mm KUCUMSUYORDU. Bu YETERSIZ tahmin, ozellikle
// sayfa1 butcesinin ZATEN dar oldugu durumlarda (ör. A5 Yatay + baslik da
// bu sayfaya tasindiginda, bkz PrintPreviewBuilder.ts appendDatasetsSection
// page1Empty dali) izgaranin EN ALT satirinin sayfa sinirini asip
// kirpilmasina yol aciyordu (gercek kullanici bildirimi: "Lejant kısmında
// en alt satır kırpılmış"). 21.5mm/3.4mm ~= 6.3 satir birimi; "kesilmesindense
// fazladan sayfa" prensibiyle (bkz OUTLINE_SIMPLIFY_* ve CONTINUATION_PAGE_
// SAFETY_MARGIN_MM'deki AYNI felsefe) bir ust tam sayiya YUVARLANDI.
const LIST_HEADER_ROW_COST = 7;

const LEGEND_CONTINUATION_SUFFIX = " (devam)";

/** `paginateLegendEntries()`'in sonucu. */
export interface LegendPaginationResult {
  /** Sayfa 1'in (haritanın altındaki rezerve alan) bütçesine sığan girdiler. */
  readonly page1Entries: readonly PrintLegendEntry[];
  /** Sığmayan girdiler için oluşturulan devam sayfaları (her biri o sayfanın girdi listesi). */
  readonly continuationPages: readonly (readonly PrintLegendEntry[])[];
}

// Tek bir `.dataset-name-list li` satirinin YAKLASIK basili yuksekligi (mm)
// -- `.dataset-name-list li` CSS'i (bkz PrintPreviewStyles.ts) 1mm+1mm dikey
// padding + 1px alt kenarlik + 10px yazi tipi (~satir yuksekligi ~3mm) tasir;
// LEGEND_ROW_HEIGHT_MM icin kullanilan "kesilmesindense fazladan sayfa"
// prensibiyle AYNI sekilde comert yuvarlanir.
const DATASET_NAME_ROW_HEIGHT_MM = 5.5;

/** `paginateDatasetNames()`'in sonucu. */
export interface DatasetNamePaginationResult {
  /** Sayfa 1'in bütçesine sığan katman adları. */
  readonly page1Names: readonly string[];
  /** Sığmayan adlar için oluşturulan devam sayfaları (her biri o sayfanın ad listesi). */
  readonly continuationPages: readonly (readonly string[])[];
}

/**
 * "Lejant Goster" KAPALIYKEN gosterilen sade katman-adi listesi icin --
 * `paginateLegendEntries()`'in AYNI prensibini (satirlar JS tarafinda,
 * sayfa yuksekligine gore ONCEDEN gruplara ayrilir; CSS'in kendi
 * sayfalamasina/`overflow:hidden`in sessizce kirpmasina GUVENILMEZ) çok
 * daha basit bir veri sekli (duz string listesi, swatch/bin/enum YOK) icin
 * uygular. Bug: A5 Yatay gibi kucuk sayfalarda `.datasets-section` sabit
 * yukseklik+`overflow:hidden` kullandigindan, sigmayan isimler DOM'da VAR
 * ama GORUNMEZ oluyordu (4 katmandan sadece 2'si gorunuyordu) -- bu fonksiyon
 * artik sigmayan isimleri devam sayfalarina tasir.
 */
export function paginateDatasetNames(
  names: readonly string[],
  page1HeightMm: number,
  fullPageHeightMm: number,
): DatasetNamePaginationResult {
  const page1Capacity = Math.max(1, Math.floor(page1HeightMm / DATASET_NAME_ROW_HEIGHT_MM));
  const fullPageCapacity = Math.max(1, Math.floor(fullPageHeightMm / DATASET_NAME_ROW_HEIGHT_MM));
  const page1Names = names.slice(0, page1Capacity);
  const continuationPages: (readonly string[])[] = [];
  for (let index = page1Capacity; index < names.length; index += fullPageCapacity) {
    continuationPages.push(names.slice(index, index + fullPageCapacity));
  }
  return { page1Names, continuationPages };
}

/** Verilen mm yukseklikte, TEK bir kolonun kac VERI satiri barindirabilecegini hesaplar (baslik HARIC). */
function computeRowsPerColumn(availableHeightMm: number): number {
  return Math.max(1, Math.floor(availableHeightMm / LEGEND_ROW_HEIGHT_MM));
}

function splitIntoColumns(rows: readonly LegendRow[], capacityPerColumn: number): readonly (readonly LegendRow[])[] {
  const groups: LegendRow[][] = [];
  for (let index = 0; index < rows.length; index += capacityPerColumn) {
    groups.push(rows.slice(index, index + capacityPerColumn));
  }
  return groups;
}

/**
 * Onceden CSS'in otomatik sayfalamasina (`break-inside:avoid` + tasan
 * icerik) GUVENMEK yerine -- bu, tek basina binlerce (cogunlukla bos)
 * sayfa uretebiliyordu (bkz Faz 2.1 arastirmasi, 919 kategorili gercek
 * veriyle olculerek bulundu: 4137 sayfa) -- satirlar BURADA, JS tarafinda,
 * HER parcanin kendi sayfasina/butcesine GUVENLE sigacagi garantilenerek
 * onceden gruplara ayrilir. `entries` sirayla islenir: sayfa 1'in
 * (haritanin altindaki rezerve alan) butcesine sigan girdiler oldugu gibi
 * kalir; sigmayan buyuk (bin/enum) listeler AYRI "devam sayfalarina"
 * atanir. FAZ 2.3: bir listenin bir PARCASI birden fazla kolona
 * yayilacaksa (`kind:"list-columns"`), kolon hizalamasi icin acik bir
 * CSS Grid olarak insa edilir (bkz PrintLegendBuilder.ts
 * buildListColumnsGrid). FAZ 2.4: bu parca artik HER ZAMAN yeni bos bir
 * sayfaya atanmaz -- kullanici, sayfa 1'de (varsa kompakt girdilerden)
 * kalan boslugun ONCE kullanilmasini, ancak SONRA yeni sayfaya
 * gecilmesini istedi (bkz addMultiColumnChunk WHY yorumu).
 */
export function paginateLegendEntries(
  entries: readonly PrintLegendEntry[],
  page1HeightMm: number,
  fullPageHeightMm: number,
): LegendPaginationResult {
  const paginator = new LegendPaginator(page1HeightMm, fullPageHeightMm);
  for (const entry of entries) {
    if (entry.kind === "bin" || entry.kind === "enum" || entry.kind === "gradient") paginator.addList(entry);
    else paginator.addCompact(entry);
  }
  return paginator.result();
}

class LegendPaginator {
  private readonly pages: PrintLegendEntry[][] = [[]];
  private remaining: number;
  private rowsPerColumnForCurrentPage: number;
  private readonly fullPageRowsPerColumn: number;
  private readonly fullPageHeightMm: number;
  // FAZ 2.4/2.6/3.5: mevcut sayfada simdiye kadar akan girdilerin (kompakt
  // girdiler -- ör. Antalya -- VE addSingleColumnChunk ile eklenen kucuk
  // bin/enum listeleri, bkz o metodun WHY yorumu) TUKETTIGI GERCEK mm
  // yukseklik -- `addMultiColumnChunk()`'in, ayni sayfada (varsa) SONRA
  // gelen TEK bir cok-uzun listenin ic Grid'ine (bkz PrintLegendBuilder.ts
  // buildListColumnsGrid) ayrilabilecek GERCEK kalan mm payini dogru
  // hesaplayabilmesi icin. FAZ 3.5'ten beri `.legend-section` ARTIK hicbir
  // zaman CSS `columns:` acmadigindan (bkz PrintPreviewStyles.ts WHY
  // yorumu) `remaining` de ARTIK TEK sutunluk (carpimsiz) bir row-butcesi
  // -- yani bu ikisi (row-birimli `remaining` vs mm-birimli
  // `compactHeightMmOnCurrentPage`) her an SAYISAL OLARAK orantili/tutarli.
  // Yine de ayri tutulur: `addMultiColumnChunk()` doğrudan mm cinsinden
  // calisir (kendi capacityPerColumn hesabi icin row-birimine GERI
  // CEVIRMEYE gerek kalmaz).
  private currentPageHeightMm: number;
  private compactHeightMmOnCurrentPage = 0;

  constructor(page1HeightMm: number, fullPageHeightMm: number) {
    this.currentPageHeightMm = page1HeightMm;
    this.fullPageHeightMm = fullPageHeightMm;
    this.rowsPerColumnForCurrentPage = computeRowsPerColumn(page1HeightMm);
    this.fullPageRowsPerColumn = computeRowsPerColumn(fullPageHeightMm);
    // FAZ 3.5: `.legend-section` ARTIK CSS `columns:` (masonry) baglami
    // ACMIYOR (bkz PrintPreviewStyles.ts WHY yorumu) -- kompakt girdiler
    // VE kucuk tek-kolonluk listeler (addCompact/addSingleColumnChunk) ARTIK
    // her zaman TEK bir dikey sutunda akiyor, 3 CSS sutununa
    // DAGITILMIYORLAR. Bu yuzden sayfa basina toplam satir-butcesi ARTIK
    // `LEGEND_COLUMNS_PER_PAGE` ile CARPILMAZ -- eskiden bu carpim, CSS'in
    // bu girdileri 3 sutuna esit dagitacagini (dolayisiyla TEK sutunun
    // sadece 1/3 yukseklik kaplayacagini) varsayiyordu; artik hepsi TEK
    // sutunda ust uste akip GERCEKTE 3 KAT fazla dikey yer kapladigindan bu
    // varsayim (duzeltilmeseydi) sabit-yukseklik+overflow:hidden kutunun
    // ALT KISMINI SESSIZCE KIRPARDI. `LEGEND_COLUMNS_PER_PAGE`, TEK bir cok
    // uzun listenin KENDI ICINDE (addMultiColumnChunk/buildListColumnsGrid,
    // bu disaridaki masonry baglamindan BAGIMSIZ acik bir CSS Grid) hala
    // 3 sutuna bolunebilmesi icin ORADA kullanilmaya devam eder.
    this.remaining = this.rowsPerColumnForCurrentPage;
  }

  addCompact(entry: PrintLegendEntry): void {
    this.ensureRoomFor(COMPACT_ENTRY_ROW_COST);
    this.currentPage().push(entry);
    this.remaining -= COMPACT_ENTRY_ROW_COST;
    this.compactHeightMmOnCurrentPage += COMPACT_ENTRY_ROW_COST * LEGEND_ROW_HEIGHT_MM;
  }

  addList(entry: Extract<PrintLegendEntry, { kind: "bin" | "enum" | "gradient" }>): void {
    let rows = entry.rows;
    let isFirstChunk = true;
    while (rows.length > 0) {
      const singleColumnCapacity = Math.max(1, this.rowsPerColumnForCurrentPage - LIST_HEADER_ROW_COST);
      if (rows.length <= singleColumnCapacity) {
        rows = this.addSingleColumnChunk(entry, isFirstChunk, rows);
      } else {
        rows = this.addMultiColumnChunk(entry, isFirstChunk, rows);
      }
      isFirstChunk = false;
    }
  }

  // Kalan satirlar TEK kolona sigacak kadar azsa -- diger kompakt girdilerle
  // AYNI sayfayi/butceyi paylasir, `.legend-section`in (FAZ 3.5'ten beri
  // HER ZAMAN tek-sutunlu) duz blok akisinda digerlerinin ALTINA eklenir.
  private addSingleColumnChunk(
    entry: Extract<PrintLegendEntry, { kind: "bin" | "enum" | "gradient" }>,
    isFirstChunk: boolean,
    rows: readonly LegendRow[],
  ): readonly LegendRow[] {
    this.ensureRoomFor(LIST_HEADER_ROW_COST + 1);
    const capacityNow = Math.max(1, this.rowsPerColumnForCurrentPage - LIST_HEADER_ROW_COST);
    const takeCount = Math.min(rows.length, capacityNow);
    const title = isFirstChunk ? entry.layerTitle : entry.layerTitle + LEGEND_CONTINUATION_SUFFIX;
    this.currentPage().push({ ...entry, layerTitle: title, rows: rows.slice(0, takeCount) });
    this.remaining -= takeCount + LIST_HEADER_ROW_COST;
    // FAZ 2.6: bu girdi de addCompact() gibi GERCEK mm tuketimini
    // `compactHeightMmOnCurrentPage`e ekler -- ayni sayfada SONRA bir
    // list-columns izgarasi gelirse (addMultiColumnChunk), o izgaranin
    // kullanabilecegi GERCEK kalan yuksekligi bu onceki girdiler kadar
    // azaltir. Eskiden SADECE addCompact() bu GERCEK mm tuketimini
    // izliyordu -- addSingleColumnChunk() (kucuk bin/enum girdileri, ör. 5
    // kategorili bir "Alan_Km") bunu HIC izlemedigi icin, buyuk bir listenin
    // (ör. 900+ ilce) hemen ONCESINDE boyle kucuk bir liste varsa
    // addMultiColumnChunk() mevcut sayfada GERCEKTE olandan FAZLA yer var
    // saniyor, bu da izgaranin EN ALT satirinin sayfa sinirini asip
    // kirpilmasina yol aciyordu (gercek kullanici bildirimi: "Lejant
    // kisminda en alt satir kirpilmis").
    this.compactHeightMmOnCurrentPage += (LIST_HEADER_ROW_COST + takeCount) * LEGEND_ROW_HEIGHT_MM;
    return rows.slice(takeCount);
  }

  // Kalan satirlar TEK koloni asiyorsa -- FAZ 2.4: kullanici, Faz 2.3'un
  // HER ZAMAN yeni BOS bir sayfaya gecen davranisini ISTEMEDI ("öncelikle
  // ilk sayfayi da kullanmani istiyorum, sonra ikinci sayfadan devam et").
  // Bu yuzden ONCE mevcut sayfada (varsa kompakt girdilerden) kalan GERCEK
  // mm yukseklik kullanilir; hicbir satira yetmiyorsa (capacityPerColumn<1)
  // yeni (tam) bir sayfaya gecilip OYLE hesaplanir. Tahmin BILINCLI olarak
  // MUHAFAZAKAR tutulur (`compactHeightMmOnCurrentPage` COMPACT_ENTRY_ROW_COST
  // ile AYNI comert sabiti kullanir) -- `.legend-section` sabit yukseklik+
  // overflow:hidden kullandigindan (CSS'in KENDI sayfalamasina
  // GUVENILMIYOR), yanlis-iyimser bir tahmin satirlarin SESSIZCE
  // kirpilmasina yol acardi; bu oturumun yerlesik prensibiyle tutarli
  // sekilde "satirlarin kesilmesindense fazladan devam sayfasi tercih
  // edilir".
  private addMultiColumnChunk(
    entry: Extract<PrintLegendEntry, { kind: "bin" | "enum" | "gradient" }>,
    isFirstChunk: boolean,
    rows: readonly LegendRow[],
  ): readonly LegendRow[] {
    const availableHeightMm = this.currentPageHeightMm - this.compactHeightMmOnCurrentPage;
    let capacityPerColumn = Math.max(0, Math.floor(availableHeightMm / LEGEND_ROW_HEIGHT_MM) - LIST_HEADER_ROW_COST);
    if (capacityPerColumn < 1) {
      this.advancePage();
      capacityPerColumn = Math.max(1, this.rowsPerColumnForCurrentPage - LIST_HEADER_ROW_COST);
    }
    const takeCount = Math.min(rows.length, capacityPerColumn * LEGEND_COLUMNS_PER_PAGE);
    const columnGroups = splitIntoColumns(rows.slice(0, takeCount), capacityPerColumn);
    const title = isFirstChunk ? entry.layerTitle : entry.layerTitle + LEGEND_CONTINUATION_SUFFIX;
    this.currentPage().push({ layerTitle: title, kind: "list-columns", displayColumn: entry.displayColumn, columnGroups });
    this.advancePage();
    return rows.slice(takeCount);
  }

  result(): LegendPaginationResult {
    // `addMultiColumnChunk()`, bir sonraki chunk/girdi icin sayfayi HER
    // ZAMAN "kapatir" (advancePage()) -- bu, isleyecek baska hicbir sey
    // kalmadiginda (son chunk sonrasi) BOS bir sayfanin onceden
    // olusturulmus olmasina yol acar. `.legend-continuation-page`
    // `break-before:page` kullandigindan, bos bile olsa `doc.body`'ye
    // eklenirse TAMAMEN BOS bir fiziksel sayfa uretir (gercek page.pdf()
    // ciktisinda olculerek bulundu) -- bu yuzden BOS sayfalar burada
    // filtrelenir.
    return {
      page1Entries: this.pages[0]!,
      continuationPages: this.pages.slice(1).filter((page) => page.length > 0),
    };
  }

  private currentPage(): PrintLegendEntry[] {
    return this.pages[this.pages.length - 1]!;
  }

  private advancePage(): void {
    this.pages.push([]);
    this.currentPageHeightMm = this.fullPageHeightMm;
    this.rowsPerColumnForCurrentPage = this.fullPageRowsPerColumn;
    this.remaining = this.rowsPerColumnForCurrentPage;
    this.compactHeightMmOnCurrentPage = 0;
  }

  // FAZ 2.5: A5 Yatay + Lejant Goster gibi sayfa 1'in (rezerve uyari
  // kutusu+baslik yuzunden, bkz PrintPreviewStyles.ts DATASETS_HEADER_BLOCK_MM)
  // NEREDEYSE SIFIRA yakin bir satir butcesine (ör. 2mm) dustugu durumlarda
  // bulunan hata: eski kural "sayfa BOSSA HER ZAMAN buraya zorla sigdir,
  // asla ilerleme" idi -- bu, TAM bir sayfaya rahatca sigacak (kucuk, tek
  // satirlik) bir girdiyi bile, sirf sayfa1 BOS diye, gercekte 2mm'lik
  // `.legend-section` kutusuna zorluyor, `overflow:hidden` de basligi
  // GORUNUP satirlarin KIRPILMASINA yol aciyordu (gercek kullanici
  // bildirimi: A5 Yatay + Lejant Goster'de ilk veri setinin basligi
  // gorunuyor ama altindaki renk satirlari hic gorunmuyordu). Ayrim simdi
  // ACIKCA yapiliyor: girdi TAM bir sayfaya (fullPageRowsPerColumn) sigacak
  // kadar kucukse, BOS bile olsa mevcut (kucultulmus) sayfaya ZORLANMAZ --
  // once TAM kapasiteli bir sonraki sayfaya gecilir. Girdi TAM bir sayfaya
  // bile sigmayacak kadar buyukse (needed>fullPageCapacity) eski "ilerleme
  // garantisi" davranisi KORUNUR -- aksi halde sonsuz "hep bos sayfaya gec"
  // dongusune girilirdi.
  private ensureRoomFor(needed: number): void {
    if (this.remaining >= needed) return;
    if (this.currentPage().length === 0 && needed > this.fullPageRowsPerColumn) return;
    this.advancePage();
  }
}
