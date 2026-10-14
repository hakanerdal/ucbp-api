import { NORTH_ARROW_DATA_URI } from "./northArrowIcon.js";
import {
  buildLegendSection,
  buildLegendContinuationPage,
  buildDatasetNameContinuationPage,
  buildDisclaimerBox,
  buildDatasetsSectionTitle,
  buildDatasetNameList,
  buildEmptyDatasetsMessage,
} from "./PrintLegendBuilder.js";
import type { PrintLegendEntry } from "./PrintLegendData.js";
import { paginateLegendEntries, paginateDatasetNames } from "./PrintLegendPagination.js";
import {
  buildPageStyle,
  computeDatasetsListMaxHeightMm,
  DATASETS_HEADER_BLOCK_MM,
} from "./PrintPreviewStyles.js";

// Kuzey oku/olcek cubugunun GORUNUR goruntu kenarindan (letterbox
// dusuldukten sonraki) sabit ic bosluk mesafesi -- v17 SS8.3 magic-number
// yasagi geregi adlandirilmis sabit olarak tutulur.
const OVERLAY_INSET_PX = 12;

// Bir lejant devam sayfasinin TAM sayfa yuksekligine kadar kullanabilecegi
// paydan dusulen guvenlik payi (bkz appendLegendContent WHY yorumu, Faz 2.1).
const CONTINUATION_PAGE_SAFETY_MARGIN_MM = 10;

/** `buildPrintPreviewDocument()`'a verilecek, yazdırma önizlemesinin tüm içeriğini tanımlayan veri. */
export interface PrintPreviewContent {
  /** Yakalanan harita görüntüsünün Object URL'i. */
  readonly imageBlobUrl: string;
  /** Görüntünün sayfadaki genişliği (mm). */
  readonly imageWidthMm: number;
  /** Görüntünün sayfadaki yüksekliği (mm). */
  readonly imageHeightMm: number;
  /** Yakalanan görüntünün gerçek en/boy oranı (letterbox-farkında konumlandırma için). */
  readonly captureAspectRatio: number;
  /** Sayfa başlığı (boşsa başlık/tarih bloğu render edilmez). */
  readonly printTitle: string;
  /** Yakalama tarihi (başlık bloğunda gösterilir). */
  readonly printDate: Date;
  /** Sayfa altbilgisi (boşsa altbilgi bloğu render edilmez). */
  readonly footerText: string;
  /** Kuzey oku overlay'i gösterilsin mi. */
  readonly showNorthArrow: boolean;
  /** Kuzey oku ikonunun döndürüleceği açı (derece). */
  readonly northArrowRotationDeg: number;
  /** Ölçek oranı overlay'i gösterilsin mi. */
  readonly showScaleBar: boolean;
  /** Gösterilecek "1/N" ölçek etiketi (`showScaleBar` false ise `null`). */
  readonly scaleRatioLabel: string | null;
  /** Sayfa genişliği (mm). */
  readonly pageWidthMm: number;
  /** Sayfa yüksekliği (mm). */
  readonly pageHeightMm: number;
  /** Sayfa kenar boşluğu (mm). */
  readonly pageMarginMm: number;
  /** Başlık bloğunun rezerve ettiği yükseklik (mm). */
  readonly headerHeightMm: number;
  /** Altbilgi bloğunun rezerve ettiği yükseklik (mm). */
  readonly footerHeightMm: number;
  // FAZ 3.4: "Veri Setleri" bolumu (bkz appendDatasetsSection) HER ZAMAN
  // gosterilir, icerigi bu ikisine gore degisir -- `showLegend` Lejant
  // Goster checkbox'inin durumunu tasir (eskiden SADECE `legendEntries`in
  // bos/dolu olmasindan CIKARILAMAZDI: hem "lejant kapali" hem "lejant
  // acik ama katmanlarin hicbirinde stil yok" durumlari ayni bos diziyi
  // uretebilirdi -- ARTIK bu iki durum acikca ayirt edilebiliyor).
  // `datasetNames` GORUNUR (basemap olmayan) katman adlarinin SENKRON
  // (ag cagrisi gerektirmeyen) listesi -- lejant KAPALIYKEN sade liste
  // olarak, HER durumda "hic katman yok" bos-durum mesaji icin kullanilir.
  /** "Lejant Göster" checkbox'ının durumu. */
  readonly showLegend: boolean;
  /** Görünür (basemap olmayan) katmanların adları. */
  readonly datasetNames: readonly string[];
  /** `showLegend` true iken çözülmüş lejant girdileri (aksi halde boş dizi). */
  readonly legendEntries: readonly PrintLegendEntry[];
}

/** `buildPreviewToolbar()`'a verilecek buton callback'leri. */
export interface PreviewToolbarCallbacks {
  /** "Yazdır" butonuna tıklanınca çağrılır. */
  readonly onPrint: () => void;
  /** "Kapat" butonuna tıklanınca çağrılır. */
  readonly onClose: () => void;
}

/**
 * iframe'in (bos, `srcdoc` ile onceden yuklenmis) `contentDocument`'ini
 * harita goruntusu + (opsiyonel) baslik/tarih + (opsiyonel) kuzey oku +
 * (opsiyonel) olcek orani + (opsiyonel) altbilgiyi icerecek sekilde TAMAMEN
 * PROGRAMATIK DOM API'siyle (createElement/appendChild/textContent) kurar --
 * `document.write` ile dinamik string enjeksiyonu VE inline `<script>`/`on*=`
 * handler KULLANILMAZ: (a) OWASP/XSS (v17 SS8.5) -- tuketiciden gelen
 * `printTitle`/`footerText` hep `textContent` ile yazilir; (b) host
 * uygulamanin CSP'sine `srcdoc` uzerinden kalitan `script-src` kisitlamasi
 * hic devreye girmez, cunku calisan hicbir inline script YOK (bkz
 * project_ucbp_api_printtool_arastirma CSP bulgusu).
 *
 * Baslik bloğu (`printTitle`+tarih) SADECE `printTitle` doluysa render edilir
 * -- 3dmap referansiyla (RecordToolPanel.tsx) birebir ayni kuplaj: baslik
 * yoksa tarih de yok.
 *
 * Yazdir/Kapat butonlari -- Faz 1'in aksine -- artik BU dokumanin icinde
 * (3dmap'teki fixed toolbar deseniyle, `@media print`te gizli) gercek
 * `<button>` elemanlari olarak `buildPreviewToolbar()` ile eklenir, AMA
 * click davranisi inline `onclick="..."` (3dmap'in yaptigi, CSP-guvensiz)
 * DEGIL, host bilesenin (TucbsPrintTool) elindeki CANLI `iframe.contentWindow`
 * referansi uzerinden gercek `addEventListener` ile baglanir -- bu, host'un
 * zaten calismakta olan JS'inin bir DOM node'una listener eklemesidir, srcdoc
 * icinden calisan bir script DEGILDIR, dolayisiyla `script-src` CSP'sini
 * hic tetiklemez.
 */
export function buildPrintPreviewDocument(doc: Document, content: PrintPreviewContent): void {
  doc.title = content.printTitle || "Yazdır";
  doc.head.appendChild(buildPageStyle(doc, content));
  const page = doc.createElement("div");
  page.className = "print-page";
  if (content.printTitle) page.appendChild(buildHeader(doc, content));
  page.appendChild(buildImageContainer(doc, content));
  // `page` BURADA, devam sayfalari eklenmeden ONCE `doc.body`'ye eklenir --
  // aksi halde (Faz 2.1'de once yasanan hata) `appendLegendContent()`'in
  // devam sayfalarini `doc.body`'ye DOGRUDAN eklemesi, henuz body'ye hic
  // eklenmemis `page`'in DOM SIRASINDA devam sayfalarindan SONRAYA
  // dusmesine yol aciyordu -- PDF'in 1. sayfasi harita YERINE bir "(devam)"
  // sayfasi oluyordu (ölçülerek bulundu). `page`'in KENDI cocuklarina
  // (footer dahil) bundan SONRA da appendChild ile eklenebilmesi normal
  // DOM davranisidir -- element agaca eklendikten sonra da cocuk eklemek
  // guvenlidir, sadece "hangi ust elemente ait oldugu" degismez.
  doc.body.appendChild(page);
  appendDatasetsSection(doc, page, content);
  if (content.footerText) page.appendChild(buildFooter(doc, content.footerText, content.footerHeightMm));
}

// FAZ 3.4: haritanin altindaki bu bolum ARTIK Lejant Goster durumundan
// BAGIMSIZ HER ZAMAN gorunur -- 3dmap referansiyla (RecordToolPanel.tsx
// disclaimer/section-title) BIREBIR ayni uyari kutusu + "Veri Setleri"
// basligi HER ZAMAN eklenir; altindaki icerik 3 durumdan birine gore
// degisir: (1) hic gorunur katman yoksa bos-durum mesaji, (2) Lejant
// Goster KAPALIYKEN sade katman-adi listesi (ag cagrisi yok), (3) Lejant
// Goster ACIKKEN mevcut TAM lejant render+sayfalama pipeline'i (Faz 2.1-2.4)
// AYNEN, sadece artik bu yeni sarmalayicinin icinde.
//
// FAZ 2.6: uyari kutusu+baslik ARTIK sayfa 1'e KOSULSUZ eklenmiyor -- once
// sayfa 1'in (rezerve/kucultulmus) payiyla bir deneme sayfalamasi yapilir;
// eger bu payin GERCEKTEN hicbir isim/girdi barindiramadigi ortaya cikarsa
// (page1Empty, bkz asagisi -- ör. A5 Yatay gibi kucuk sayfalarda), uyari
// kutusu+baslik da icerikle BIRLIKTE ilk devam sayfasina TASINIR; TAM sayfa
// butcesinden (fullPageHeightMm) DATASETS_HEADER_BLOCK_MM kadari bu basligin
// kendisine ayrilir. Boylece sayfa 1'de "Veri Setleri" basligi TEK BASINA,
// altinda kocaman bos alanla YALNIZ kalmaz (gercek kullanici bildirimi:
// "Veri Setleri tek başına üstte kalıyorsa alt sayfada başlat").
// bos-durum icin (disclaimer+baslik+mesaj BIRLIKTE, tek sayfa) -- DRY.
function buildDatasetsSectionWrapper(doc: Document): HTMLElement {
  const wrapper = doc.createElement("div");
  wrapper.className = "datasets-section datasets-section-bounded";
  wrapper.appendChild(buildDisclaimerBox(doc));
  wrapper.appendChild(buildDatasetsSectionTitle(doc));
  return wrapper;
}

// SADECE "Veri Setleri" basligini tasiyan kutu -- uyari kutusu ARTIK ayri
// (bkz appendDatasetsSection'daki disclaimerWrapper) HER ZAMAN sayfa 1'de
// kaldigindan, bu kutu disclaimer'i TEKRAR icermez (kullanici acikca istedi:
// "sadece bu yazılı alan üstte eski yerinde kalsın").
function buildDatasetsSectionTitleWrapper(doc: Document): HTMLElement {
  const wrapper = doc.createElement("div");
  wrapper.className = "datasets-section datasets-section-bounded";
  wrapper.appendChild(buildDatasetsSectionTitle(doc));
  return wrapper;
}

function appendDatasetsSection(doc: Document, page: HTMLElement, content: PrintPreviewContent): void {
  if (content.datasetNames.length === 0) {
    const wrapper = buildDatasetsSectionWrapper(doc);
    wrapper.appendChild(buildEmptyDatasetsMessage(doc));
    page.appendChild(wrapper);
    return;
  }

  // Uyari kutusu (kullanici acikca istedi: "sadece bu yazılı alan üstte
  // eski yerinde kalsın") HER ZAMAN sayfa 1'de/eski konumunda kalir --
  // "Veri Setleri" basligi+icerigi ise (asagidaki page1Empty durumunda)
  // yine de devam sayfasina tasinabilir.
  const disclaimerWrapper = doc.createElement("div");
  disclaimerWrapper.className = "datasets-section";
  disclaimerWrapper.appendChild(buildDisclaimerBox(doc));
  page.appendChild(disclaimerWrapper);

  // Devam sayfalarinin `.legend-section`'i (ve sade isim listesi devam
  // sayfalari) TAM sayfa yuksekligini (fullPageHeightMm) DEGIL, bundan
  // CONTINUATION_PAGE_SAFETY_MARGIN_MM kadar AZINI kullanir -- kutu "tam
  // sayfayi sinirina kadar doldurunca" Chromium'un sayfalama motoru
  // ARDINDAN fazladan bir BOS sayfa ekliyordu (olculerek bulundu: her
  // devam sayfasindan SONRA 1 bos sayfa, 4 devam sayfasi -> 4 fazladan
  // bos sayfa). Kucuk bir pay birakinca bu ortadan kalkiyor.
  const fullPageHeightMm = content.pageHeightMm - 2 * content.pageMarginMm - CONTINUATION_PAGE_SAFETY_MARGIN_MM;
  // Sayfa 1'deki satir-butcesi ARTIK `.datasets-section`in TAM yuksekligi
  // DEGIL (bkz computeDatasetsListMaxHeightMm WHY yorumu) -- uyari kutusu+
  // baslik bu payin bir kismini ONCEDEN tuketiyor.
  const legendListMaxHeightMm = computeDatasetsListMaxHeightMm(content);
  // Basligin KENDISI ilk devam sayfasina tasindiginda, o (TAM boyutlu)
  // sayfanin da bir kismini tuketir -- yukaridaki AYNI DATASETS_HEADER_BLOCK_MM
  // burada da dusulur.
  const fullPageListHeightMm = Math.max(0, fullPageHeightMm - DATASETS_HEADER_BLOCK_MM);

  if (!content.showLegend) {
    // BUG FIX: bu dal onceden hicbir sayfalama yapmadan TUM isimleri sabit
    // yukseklikli+`overflow:hidden` `.datasets-section` icine dogruyordu --
    // kucuk sayfalarda (ör. A5 Yatay) sigmayan isimler DOM'da var ama
    // GORUNMEZ oluyordu (4 katmandan sadece 2'si gorunuyordu, kullanici
    // bulgusu). `paginateLegendEntries()` ile AYNI ilkeyle (sigmayan
    // icerik KIRPILMAZ, devam sayfasina TASINIR) simdi `paginateDatasetNames()`
    // kullanilir.
    const firstTry = paginateDatasetNames(content.datasetNames, legendListMaxHeightMm, fullPageHeightMm);
    const page1Empty = firstTry.page1Names.length === 0 && firstTry.continuationPages.length > 0;
    const { page1Names, continuationPages } = page1Empty
      ? paginateDatasetNames(content.datasetNames, fullPageListHeightMm, fullPageHeightMm)
      : firstTry;

    if (page1Empty) {
      doc.body.appendChild(
        buildDatasetNameContinuationPage(doc, page1Names, content.pageWidthMm, fullPageListHeightMm, content.pageMarginMm, true),
      );
    } else {
      const wrapper = buildDatasetsSectionTitleWrapper(doc);
      wrapper.appendChild(buildDatasetNameList(doc, page1Names));
      page.appendChild(wrapper);
    }
    for (const chunkNames of continuationPages) {
      doc.body.appendChild(
        buildDatasetNameContinuationPage(doc, chunkNames, content.pageWidthMm, fullPageHeightMm, content.pageMarginMm),
      );
    }
    return;
  }

  const firstTry = paginateLegendEntries(content.legendEntries, legendListMaxHeightMm, fullPageHeightMm);
  const page1Empty = firstTry.page1Entries.length === 0 && firstTry.continuationPages.length > 0;
  const { page1Entries, continuationPages } = page1Empty
    ? paginateLegendEntries(content.legendEntries, fullPageListHeightMm, fullPageHeightMm)
    : firstTry;

  if (page1Empty) {
    doc.body.appendChild(
      buildLegendContinuationPage(doc, page1Entries, content.pageWidthMm, fullPageListHeightMm, content.pageMarginMm, true),
    );
  } else {
    const wrapper = buildDatasetsSectionTitleWrapper(doc);
    const legendSection = buildLegendSection(doc, page1Entries);
    if (legendSection) wrapper.appendChild(legendSection);
    page.appendChild(wrapper);
  }
  for (const chunkEntries of continuationPages) {
    doc.body.appendChild(
      buildLegendContinuationPage(doc, chunkEntries, content.pageWidthMm, fullPageHeightMm, content.pageMarginMm),
    );
  }
}

/**
 * Önizleme belgesine sabit bir Yazdır/Kapat araç çubuğu ekler (`@media print`te gizli).
 * @param doc - İçine eklenecek `iframe.contentDocument`.
 * @param callbacks - Buton tıklama callback'leri.
 */
export function buildPreviewToolbar(doc: Document, callbacks: PreviewToolbarCallbacks): void {
  const toolbar = doc.createElement("div");
  toolbar.className = "preview-toolbar";
  const printBtn = doc.createElement("button");
  printBtn.type = "button";
  printBtn.className = "preview-toolbar-btn";
  printBtn.textContent = "Yazdır";
  printBtn.addEventListener("click", callbacks.onPrint);
  const closeBtn = doc.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "preview-toolbar-btn";
  closeBtn.textContent = "Kapat";
  closeBtn.addEventListener("click", callbacks.onClose);
  toolbar.append(printBtn, closeBtn);
  doc.body.appendChild(toolbar);
}

function buildHeader(doc: Document, content: PrintPreviewContent): HTMLDivElement {
  const header = doc.createElement("div");
  header.className = "print-header";
  const title = doc.createElement("h1");
  title.textContent = content.printTitle;
  const date = doc.createElement("div");
  date.className = "print-date";
  date.textContent = formatPrintTimestamp(content.printDate);
  header.append(title, date);
  return header;
}

function formatPrintTimestamp(date: Date): string {
  // 3dmap referansiyla (RecordToolPanel.tsx) BIREBIR ayni format.
  return date.toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// FAZ 1.5: kutunun YUKSEKLIGI artik `height:auto` + goruntunun KENDI (ekran
// capture'inden gelen, sayfa hedefiyle ARTIK ORTUSMEYEN) dogal en-boy orani
// yerine, HEDEF oranini (`aspectRatio`) sabitleyip `object-fit:contain` ile
// icerigi sigdiran bir yaklasimla belirleniyor. Onceki yaklasimda capture
// HER ZAMAN tam hedef boyutta alindigi icin dogal oran==hedef oran olup bu
// fark hic gorunmuyordu; capture artik EKRAN cozunurlugunde SABIT
// alindigindan (bkz Map.ts), Yatay gibi hedeften cok FARKLI oranli
// sayfalarda `height:auto` kutuyu GERCEK sayfa yuksekliginin UZERINE tasirip
// 2./3. sayfaya sarkmaya sebep oluyordu (olculerek bulundu).
//
// GENISLIK icin MUTLAK mm (`width: ${mm}mm`) DEGIL, `width:100%` kullanilir --
// mm'yi mutlak vermek yazdirma baglaminda (`@page` sayfa GERCEKTEN o mm
// boyutunda) dogru olsa da, EKRANDAKI kucuk onizleme iframe'inde (viewport'u
// mm DEGIL, birkac yuz CSS piksel) devasa bir kutunun sadece sol-ust kosesini
// gosterip onizlemeyi neredeyse BOS gostermeye yol acti (test ekran
// goruntusuyle bulundu).
//
// YUKSEKLIK icin CSS `aspect-ratio` ozelligi DENENDI ama Chromium'un
// yazdirma/`page.pdf()` motorunda GUVENILMEZ cikti (flex + yuzde-genislikli
// bir kutuda `@page` baglaminda YANLIS hesaplaniyor, olculerek bulundu --
// yuzde 0.5 yerine 0.2-1.7 arasi degisen, tutarsiz sonuclar). Bunun yerine
// CSS'in cok daha eski/evrensel desteklenen "padding-top yuzdesi" hilesi
// kullanilir: blok elemanlarda `padding-top` yuzdesi HER ZAMAN elemanin
// KENDI GENISLIGINE gore hesaplanir (yukseklige degil) -- bu, hem ekran hem
// yazdirma baglaminda ozdes/guvenilir sekilde calisir. `::before`
// pseudo-elemanina bu yuzdeyi CSS custom property (`--frame-aspect-pct`)
// olarak veriyoruz, gercek `<img>` ise kutunun uzerine `position:absolute`
// ile yerlesip `object-fit:contain` ile SIGDIRILIR.
// FAZ 1.6 madde 3: capture ARTIK her zaman `.map-frame`'in hedef oranini
// TAM doldurmuyor (Faz 1.5'ten beri ekran cozunurlugunde alindigi icin
// dogal orani hedeften FARKLI olabiliyor) -- `object-fit:contain` bu farki
// goruntunun ETRAFINDA bos kenar (letterbox) birakarak cozer. Kuzey oku/
// olcek cubugu ONCEDEN kutunun KOSESINE sabitleniyordu, bu yuzden letterbox
// varsa GORUNEN goruntunun DISINA (bos kenara) dusuyordu (kullanici
// sikayeti: "disarida kaliyor"). Bu fonksiyon, capture'in kendi en-boy orani
// (`captureAspectRatio`) ile kutunun hedef oranini karsilastirip GERCEKTEN
// GORUNUR goruntu dikdortgeninin (letterbox dusuldukten sonraki) kutu
// icindeki ofsetini -- kutunun KENDI genislik/yuksekliginin YUZDESI olarak --
// hesaplar. YUZDE kullanilmasi BILINCLI: `.map-frame`'in kendisi (Faz 1.5,
// padding-top yuzdesi hilesi) EKRANDAKI kucuk onizlemede VE gercek yazdirmada
// FARKLI mutlak px/mm boyutlarina sahiptir -- ofset MUTLAK mm olarak
// verilseydi (ilk denemede oldugu gibi), gercek fiziksel (1189mm gibi) boyuta
// gore hesaplanan ofset, kucuk onizleme kutusunun ICINE bile SIGMAYIP oku
// ekranin disina firlatiyordu (olculerek bulundu: A0 Yatay'da ofset
// frame'in kendi genisliginden BUYUK cikiyordu). Yuzde, `.map-frame`'in
// HANGI mutlak boyutta render edildiginden BAGIMSIZ, HER ZAMAN dogru orani verir.
function computeVisibleImageOffsetPct(
  imageWidthMm: number,
  imageHeightMm: number,
  captureAspectRatio: number
): { readonly offsetXPct: number; readonly offsetYPct: number } {
  const frameAspectRatio = imageWidthMm / imageHeightMm;
  if (captureAspectRatio > frameAspectRatio) {
    // Capture kutudan daha GENIS -- ustte/altta bos kenar olusur.
    const visibleHeightFraction = frameAspectRatio / captureAspectRatio;
    return { offsetXPct: 0, offsetYPct: ((1 - visibleHeightFraction) / 2) * 100 };
  }
  // Capture kutudan daha DAR/UZUN -- solda/sagda bos kenar olusur.
  const visibleWidthFraction = captureAspectRatio / frameAspectRatio;
  return { offsetXPct: ((1 - visibleWidthFraction) / 2) * 100, offsetYPct: 0 };
}

function buildImageContainer(doc: Document, content: PrintPreviewContent): HTMLDivElement {
  const frame = doc.createElement("div");
  frame.className = "map-frame";
  const aspectPct = (content.imageHeightMm / content.imageWidthMm) * 100;
  frame.style.setProperty("--frame-aspect-pct", `${aspectPct}%`);
  const img = doc.createElement("img");
  img.src = content.imageBlobUrl;
  frame.appendChild(img);
  const { offsetXPct, offsetYPct } = computeVisibleImageOffsetPct(
    content.imageWidthMm,
    content.imageHeightMm,
    content.captureAspectRatio
  );
  if (content.showNorthArrow) {
    frame.appendChild(buildNorthArrow(doc, content.northArrowRotationDeg, offsetXPct, offsetYPct));
  }
  if (content.showScaleBar && content.scaleRatioLabel) {
    frame.appendChild(buildScaleBar(doc, content.scaleRatioLabel, offsetXPct, offsetYPct));
  }
  return frame;
}

function buildNorthArrow(doc: Document, rotationDeg: number, offsetXPct: number, offsetYPct: number): HTMLDivElement {
  const arrow = doc.createElement("div");
  arrow.className = "north-arrow";
  arrow.style.top = `calc(${offsetYPct}% + ${OVERLAY_INSET_PX}px)`;
  arrow.style.right = `calc(${offsetXPct}% + ${OVERLAY_INSET_PX}px)`;
  arrow.style.transform = `rotate(${rotationDeg}deg)`;
  const img = doc.createElement("img");
  img.src = NORTH_ARROW_DATA_URI;
  img.alt = "Kuzey Oku";
  arrow.appendChild(img);
  return arrow;
}

function buildScaleBar(doc: Document, ratioLabel: string, offsetXPct: number, offsetYPct: number): HTMLDivElement {
  const container = doc.createElement("div");
  container.className = "scale-bar";
  container.style.left = `calc(${offsetXPct}% + ${OVERLAY_INSET_PX}px)`;
  container.style.bottom = `calc(${offsetYPct}% + ${OVERLAY_INSET_PX}px)`;
  container.textContent = ratioLabel;
  return container;
}

function buildFooter(doc: Document, footerText: string, footerHeightMm: number): HTMLDivElement {
  const footer = doc.createElement("div");
  footer.className = "print-footer";
  footer.style.height = `${footerHeightMm}mm`;
  footer.style.paddingTop = "6mm";
  footer.textContent = footerText;
  return footer;
}
