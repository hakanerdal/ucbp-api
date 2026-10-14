import type { PrintPreviewContent } from "./PrintPreviewBuilder.js";
import { LEGEND_COLUMNS_PER_PAGE } from "./PrintLegendPagination.js";

// FAZ 2.7: v17 SS8.3 dosya-uzunlugu geregi (<=300 satir) `PrintPreviewBuilder.ts`'ten
// AYRISTIRILDI -- o dosya artik SADECE DOM insasina (createElement/appendChild),
// bu dosya ise SADECE CSS metni uretimine odaklanir (SRP). Faz 1.8'de
// TucbsPrintTool icin kurulan "stil vs mantik ayrimi" deseninin AYNISI.

// Lejant bolumu, harita goruntusunun ALTINDA, Faz 1.2'den beri (goruntu
// sadece sayfanin UST YARISINI kullanir, bkz TucbsPrintTool.ts
// IMAGE_TOP_HALF_RATIO) zaten BOS kalan alana yerlesir -- yeni bir "sigma
// olcumu" gerekmez, kalan yukseklik sayfa geometrisinden DOGRUDAN turetilir.
// `appendLegendContent()` (satir-butcesi hesabi icin, bkz PrintPreviewBuilder.ts)
// ile PAYLASILIR.
//
// FAZ 2.1'de bulunan hata: `.legend-section`'in KENDI `margin-top`'u bu
// hesaba dahil DEGILDI -- bu birkaç mm'lik fark, tum kutunun (height+
// overflow:hidden ile bolunemedigi icin) SAYFA 1'DEN SAYFA 2'YE
// KAYMASINA yol aciyordu (olculerek bulundu: harita sayfa 1'de dogru
// gorunuyordu ama ALTINDAKI lejant TAMAMEN sayfa 2'ye dusuyordu).
// `LEGEND_SECTION_MARGIN_TOP_MM`, CSS'teki `margin-top` degeriyle AYNI
// (tek dogru kaynak) -- DRY.
const LEGEND_SECTION_MARGIN_TOP_MM = 3;

// FAZ 2.2'de bulunan hata: bu fonksiyonun urettigi yukseklik, sayfada kalan
// alani SIFIR PAYLA (tam milimetresine kadar) dolduracak sekilde
// hesaplaniyordu -- her kagit boyutunda toplam (kenar+baslik+harita+lejant)
// sayfa yuksekligine TAM esitti. Farkli fiziksel mm degerlerindeki
// yuvarlama/alt-piksel farklari bu "tam sinirda" hesabi BAZI boyutlarda kil
// payi asiriyordu; Chromium'un yazdirma motoru da sigmayan bu flex-kutuyu
// (bolmek yerine) TAMAMEN bir sonraki sayfaya atiyordu (olculerek bulundu:
// A0/A1/A5 dikeyde lejant sayfa 2'den basliyordu, A2/A3/A4'te sorun YOKTU --
// boyuta gore rastgele gorunen bu desen, tam da sifir-paylı hesabin
// yuvarlamaya karsi kirilganligiyla eslesiyor). CONTINUATION_PAGE_SAFETY_MARGIN_MM
// ile AYNI cozum deseni: kucuk bir guvenlik payi birakmak -- 5mm payla
// A0/A1/A2/A5 dikeyin TUMU gercek page.pdf() ciktisinda dogrulanarak
// duzeldi.
const LEGEND_PAGE1_SAFETY_MARGIN_MM = 5;

/** Sayfa 1'de "Veri Setleri" sarmalayicisina (uyari kutusu+baslik+icerik) ayrilabilecek azami yukseklik (mm) -- `appendDatasetsSection()` ile PAYLASILIR. */
export function computeLegendMaxHeightMm(content: PrintPreviewContent): number {
  return Math.max(
    0,
    content.pageHeightMm -
      2 * content.pageMarginMm -
      content.headerHeightMm -
      content.footerHeightMm -
      content.imageHeightMm -
      LEGEND_SECTION_MARGIN_TOP_MM -
      LEGEND_PAGE1_SAFETY_MARGIN_MM,
  );
}

// FAZ 3.4: kullanicinin gonderdigi referans goruntudeki (3dmap RecordToolPanel.tsx
// .disclaimer/.section-title) uyari kutusu+baslik ARTIK sarmalayicinin
// (.datasets-section) EN USTUNDE, lejant SATIRLARINDAN ONCE yer aliyor --
// bu iki sabit blogun kendi yukseklikleri, satirlara ayrilabilecek payi
// ONCEDEN azaltir. Deger, 2-4 satira kadar SARABILEN (dar sayfalarda, ör.
// A5 Dikey) uyari metniyle basligin toplam yuksekligi icin GERCEK
// page.pdf() ciktisiyla olculerek kalibre edilmistir (bkz .print-disclaimer/
// .print-section-title CSS'i, buildLegendCss).
export const DATASETS_HEADER_BLOCK_MM = 34;

/** Sayfa 1'de LEJANT SATIRLARINA (uyari kutusu+baslik DUSULEREK) ayrilabilecek azami yukseklik (mm). */
export function computeDatasetsListMaxHeightMm(content: PrintPreviewContent): number {
  return Math.max(0, computeLegendMaxHeightMm(content) - DATASETS_HEADER_BLOCK_MM);
}

/** Yazdirma onizleme dokumaninin TUM CSS'ini (temel sayfa + lejant) tek bir `<style>` elemani olarak uretir. */
export function buildPageStyle(doc: Document, content: PrintPreviewContent): HTMLStyleElement {
  const style = doc.createElement("style");
  style.textContent = buildBasePageCss(content) + buildLegendCss(content);
  return style;
}

function buildBasePageCss(content: PrintPreviewContent): string {
  return `
    @page { size: ${content.pageWidthMm}mm ${content.pageHeightMm}mm; margin: 0; }
    /* Faz 2.1: tarayicilar varsayilan olarak CSS background renklerini
       (kullanici "Arka plan grafikleri" secenegini ACIKCA isaretlemedikce)
       GERCEK yazdirma/PDF ciktisinda basmaz -- lejant renk kutucuklari
       (.legend-swatch) TAMAMEN CSS background'a dayandigindan, bu olmadan
       renkler kullanicinin yazici ayarindan BAGIMSIZ olarak hep
       kayboluyordu (olculerek bulundu: page.pdf() + pdftoppm ile PDF
       piksellerinde renk YOKTU, DOM computed-style'da ise vardi -- fark
       SADECE gercek PRINT render'inda ortaya cikiyor).  */
    html, body { margin: 0; font-family: "IBM Plex Sans", system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    /* FAZ 2.6: genislik ARTIK 100% (kutuya-esnek) DEGIL, sayfanin GERCEK
       fiziksel mm boyutu -- boylece belge HER ZAMAN "dogal" (gercek
       yazdirma ciktisiyla BIREBIR orantili) boyutunda render olur; harita
       (yuzdesel olcekli) ile baslik/altbilgi/lejant (sabit mm) arasindaki
       oran ARTIK onizleme kutusunun boyutundan ETKILENMEZ. Kutuya
       sigdirma islemi BURADA DEGIL, PrintPreviewOverlayController.ts'te
       TEK bir olcekleme ile (SADECE ekranda, yazdirmada sifirlanarak)
       yapilir -- bkz o dosyanin WHY yorumu.
       FAZ 2.8: ayni gerekceyle YUKSEKLIK de artik sabit fiziksel mm --
       eskiden SADECE genislik sabitti, yukseklik icerige (baslik+harita+
       altbilgi) gore DOGAL olarak buzuluyordu. Lejant ACIKKEN bu fark
       gizli kaliyordu (lejant bolumunun KENDI sabit yuksekligi kalan
       alani dolduruyordu), lejant KAPALIYKEN doldurucu olmadigindan kutu
       kisaliyor, olceklendirme haritayi kutunun NEREDEYSE TAMAMINI
       kaplayacak sekilde buyutuyordu -- kullanicinin gercek yazdirma
       ciktisinda gormesi gereken "harita ust yaride, alt yari fiziksel
       olarak BOS" gorunumunu YANSITMIYORDU (kullanicinin gonderdigi
       referans goruntuyle olculerek dogrulandi). Icerik bu yukseklikten
       daha AZ yer kapladiginda (lejant yok/kisa) fazlasi sadece BOS
       kalir; daha FAZLA yer gerektiginde (overflow kisitlanmadigindan)
       kutu GORSEL olarak tasar, _fitPageToViewport'un GERCEK olculen
       offsetHeight'i buna gore uyum saglar -- kirpma riski yok. */
    .print-page { display: flex; flex-direction: column; align-items: center; width: ${content.pageWidthMm}mm; height: ${content.pageHeightMm}mm; padding: ${content.pageMarginMm}mm; box-sizing: border-box; }
    .print-header { width: 100%; text-align: center; box-sizing: border-box; overflow: hidden; height: ${content.headerHeightMm}mm; }
    .print-header h1 { margin: 0 0 2mm 0; font-size: 18px; font-weight: 600; }
    .print-header .print-date { font-size: 12px; color: #525252; }
    .map-frame { position: relative; width: 100%; }
    .map-frame::before { content: ""; display: block; padding-top: var(--frame-aspect-pct); }
    .map-frame img { display: block; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
    .north-arrow { position: absolute; width: 40px; height: 40px; }
    .north-arrow img { width: 100%; height: 100%; display: block; }
    .scale-bar { position: absolute; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.85); padding: 2px 6px; border-radius: 2px; }
    .print-footer { box-sizing: border-box; overflow: hidden; font-size: 10px; color: #525252; text-align: center; }
    .preview-toolbar { position: fixed; top: 16px; right: 16px; display: flex; gap: 8px; z-index: 1000; }
    .preview-toolbar-btn { padding: 8px 16px; border: none; border-radius: 4px; background: #0f62fe; color: #fff; font: inherit; cursor: pointer; }
    @media print { .preview-toolbar { display: none; } }
  `;
}

function buildLegendCss(content: PrintPreviewContent): string {
  const legendMaxHeightMm = computeLegendMaxHeightMm(content);
  const legendListMaxHeightMm = computeDatasetsListMaxHeightMm(content);
  return `
    /* FAZ 3.4: haritanin altindaki TUM bolumu (uyari kutusu+baslik+icerik)
       saran DIS kutu -- 3dmap referansiyla (RecordToolPanel.tsx) BIREBIR
       ayni renk/kenarlik degerleri KORUNARAK, mm-tabanli kompakt sayfa
       baglamimiza olceklendi (piksel degerleri DEGIL, renkler/kalinliklar
       aynen alindi -- kullanicinin ACIKCA istedigi "ayni renk"). Kesin
       height+overflow:hidden BURADA da (Faz 2.1'in .legend-section icin
       kesfettigi) AYNI Chromium sayfalama guvenlik agi geregi. */
    .datasets-section { width: 100%; margin-top: ${LEGEND_SECTION_MARGIN_TOP_MM}mm; box-sizing: border-box; }
    /* FAZ 3.5: uyari kutusunu (disclaimerWrapper, bkz PrintPreviewBuilder.ts
       appendDatasetsSection) TASIYAN .datasets-section artik bu (bounded
       olmayan) TEMEL kuralla auto-yukseklikte kalir -- asagidaki
       .datasets-section-bounded SADECE gercekten TUM kalan sayfa payini
       (legendMaxHeightMm) kaplayacak sarmalayicilara (bos-durum kutusu VE
       baslik+liste kutusu) uygulanir. Eskiden HER .datasets-section bu sabit
       yuksekligi aliyordu -- uyari kutusunu TEK BASINA saran (kucuk, ~birkac
       mm'lik) div de ayni tam-sayfa-payi yuksekligini alinca, hemen
       ARDINDAN gelen "Veri Setleri" basligi bu devasa (gorunmez, bos)
       kutunun ALTINA itiliyor, harita ile baslik arasinda dev bir bosluk
       olusuyordu (kullanici bulgusu: yazdirma onizlemesinde harita ile veri
       seti listesi arasinda gereksiz bosluk). */
    .datasets-section-bounded { height: ${legendMaxHeightMm}mm; overflow: hidden; }
    .print-disclaimer { margin: 0 0 4mm; padding: 2.5mm 3mm; background: #f0fdf4; border-left: 1mm solid #10b981; color: #065f46; line-height: 1.5; font-size: 9px; border-radius: 1mm; box-sizing: border-box; }
    .print-section-title { font-size: 13px; font-weight: 700; color: #111827; margin: 0 0 4mm; padding-bottom: 1.5mm; }
    .dataset-name-list { list-style: none; margin: 0; padding: 0; font-size: 10px; }
    .dataset-name-list li { padding: 1mm 0; border-bottom: 1px solid #e5e7eb; }
    .dataset-empty { text-align: center; padding: 8mm 0; color: #9ca3af; font-size: 10px; }
    /* FAZ 2.1: max-height YERINE kesin (definite) height -- Chromium'un
       @page sayfalama motoru, sadece max-height (+ overflow:hidden)
       verilen bir kutunun DOGAL (tasan) icerigini "sayfalama SIRASINDA"
       yine de barindirmaya calisip binlerce (cogunlukla bos) ek sayfa
       uretiyordu (919 kategorili gercek veriyle olculerek bulundu: 4137
       sayfa). Kesin height verilince bu davranis TAMAMEN duzeliyor
       (ayni veriyle 4137->2 sayfa, olculerek dogrulandi) -- artik asil
       guvenlik paginateLegendEntries()'in onceden dogru satir sayisini
       hesaplamasi, bu height+overflow:hidden ise SADECE ek bir
       guvenlik agi. FAZ 3.4: height ARTIK legendMaxHeightMm (TAM sarmalayici
       payi) DEGIL, legendListMaxHeightMm (uyari kutusu+baslik DUSULMUS satir
       payi) -- bu deger SADECE 1. sayfadaki (inline style OLMAYAN) kullanima
       uygulanir, devam sayfalari (bkz buildLegendContinuationPage) kendi
       inline height'ini AYRICA yazdigindan bu class-varsayilanindan
       ETKILENMEZ. */
    /* FAZ 3.5: kullanici, farkli veri setlerinin lejantlarinin CSS
       columns: masonry akisiyla YAN YANA (ayri sutunlarda) gorunmesini
       ISTEMEDI -- "Lejant açık veya değil her zaman Verisetleri varsa
       Lejantları alt alta gösterilecek". Bu yuzden .legend-section ARTIK
       coklu-sutun baglami ACMAZ, TUM girdiler (kompakt olsun/olmasin) DUZ
       blok akisinda ALT ALTA render olur -- TEK bir veri setinin KENDI COK
       UZUN kategori listesini okunabilirlik icin ic ice (acik CSS Grid ile,
       bkz PrintLegendBuilder.ts buildListColumnsGrid/.legend-list-columns)
       kendi ICINDE bolme ozelligi bundan ETKILENMEZ/KALDIRILMADI -- o, bu
       disaridaki masonry baglamindan TAMAMEN bagimsiz kendi Grid'ini kurar. */
    .legend-section { width: 100%; margin-top: ${LEGEND_SECTION_MARGIN_TOP_MM}mm; font-size: 10px; height: ${legendListMaxHeightMm}mm; overflow: hidden; box-sizing: border-box; }
    /* FAZ 3.4: .datasets-section icinde (SADECE sayfa 1) baslik zaten
       KENDI margin-bottom'uyla bosluk birakiyor -- .legend-section'in KENDI
       margin-top'u (devam sayfalarinda hala GEREKLI, o yuzden ASAGIDAKI
       temel kuraldan KALDIRILMADI) burada FAZLADAN/CIFT bosluk yaratirdi. */
    .datasets-section .legend-section { margin-top: 0; }
    .legend-continuation-page { break-before: page; box-sizing: border-box; }
    .legend-entry { break-inside: avoid; margin-bottom: 3mm; }
    /* FAZ 2.3/3.5: bkz PrintLegendBuilder.ts buildListColumnsGrid WHY yorumu --
       acik bir CSS Grid ile kolonlari HIZALI olusturur; .legend-section
       ARTIK HICBIR ZAMAN CSS columns: baglami acmadigindan (bkz yukarisi)
       bu Grid'in column-span:all'a ihtiyaci hic olmaz. */
    .legend-list-columns { display: grid; grid-template-columns: repeat(${LEGEND_COLUMNS_PER_PAGE}, 1fr); column-gap: 6mm; }
    /* FAZ 2.3: kullanici basligin ILK 2 satiri (katman adi + "Goruntuleme
       Degiskeni") arasindaki bosluk SATIRINI kaldirmayi, bunun yerine
       lejantin HEMEN USTUNDEKI alan-adi satiriyla lejant satirlari arasina
       bir bosluk satiri eklemeyi istedi -- toplam kaplanan dikey alan AYNI
       (1mm+3mm+3mm = eskiden 3mm+3mm+1mm), sadece boslugun YERI degisti,
       bu yuzden LIST_HEADER_ROW_COST kalibrasyonu ETKILENMEZ. */
    .legend-entry-title { font-weight: 600; margin-bottom: 1mm; }
    .legend-entry-subtitle { color: #525252; margin-bottom: 3mm; }
    .legend-entry-column { font-weight: 600; margin-bottom: 3mm; }
    .legend-image { max-width: 100%; display: block; }
    .legend-row { display: flex; align-items: center; gap: 4px; }
    .legend-swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; }
    .legend-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .legend-empty { color: #525252; }
  `;
}
