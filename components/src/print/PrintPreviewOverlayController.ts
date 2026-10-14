import {
  buildPrintPreviewDocument,
  buildPreviewToolbar,
  type PrintPreviewContent,
} from "./PrintPreviewBuilder.js";

// FAZ 2.5: kullanici, A4 Dikey gibi standart sayfalarda onizlemenin
// PRATIKTE cok dar kaldigini bildirdi (eski en-boy-orani-korumali tasarimda
// kutu yukseklik tavanina (1000px) takilip genisligi ~700px'e dusuyordu) --
// genislik artik sayfanin en-boy oranindan TURETILMIYOR, 3dmap referansinin
// (RecordToolPanel.tsx `window.open(...,"width=1024,height=960")`)
// GENISLIK degeri baslangicta AYNEN kullanilmisti; kullanicinin ACIKCA
// istedigi gibi YUKSEKLIK ise ONCEKI (Faz 1) formulumuzla DEGISTIRILMEDEN
// kaliyor, artik genislikten TAMAMEN BAGIMSIZ hesaplaniyor. Bu, eski
// tasarimin "3dmap'in sabit boyutu ekstrem en-boy oranlarinda kirpar"
// endisesini yeniden GETIRMEZ: onizleme icerigi gercek fiziksel mm DEGIL,
// iframe'in KENDI genisligine gore yuzdesel olcekleniyor (bkz
// PrintPreviewBuilder.ts .map-frame padding-top yuzdesi) -- sadece
// kenar/baslik/altbilgi/lejant sabit mm'dir; oran uyusmazliginda veri
// KIRPILMAZ, gerekirse iframe'in kendi kaydirma cubugu devreye girer.
// Gercek yazdirma ciktisi (@page mm boyutu) bu ekran-onizleme boyutundan
// TAMAMEN BAGIMSIZDIR.
//
// FAZ 2.10: 1024px deger, Lejant ACIKKEN + Yatay yon secildiginde ekranda
// istenmeyen yatay kaydirma cubugu olusturuyordu. Kok neden: TUM ISO 216
// (A0-A5) kagitlari AYNI sabit en-boy oranina (1:root(2) = ~1:1.4142)
// sahip -- `_paginatePreview()`'in olcek hesabi `min(genislikOrani,
// yukseklikOrani)` oldugundan, kutunun KENDI orani (1024/850 = ~1.20)
// sayfa oranindan (1.41) DUSUK oldugu surece olcek HER ZAMAN GENISLIK
// tarafindan sinirlaniyor -- yatay sayfa kutunun TAM genisligine (bazen
// yuvarlama nedeniyle 1-2px FAZLASINA) oturup sol/sag bosluk BIRAKMIYOR,
// bu ufak tasma yatay kaydirma cubugunu tetikliyordu (kullanici ekran
// goruntusuyle bildirdi). Genislik, azami yukseklik tavaninin (1000px)
// root(2) katindan (~1414px) BUYUK bir degere (1450px) cikarilarak kutunun
// KENDI orani HER ZAMAN sayfa oranindan BUYUK tutulur -- boylece olcek
// ARTIK HER ZAMAN YUKSEKLIK tarafindan sinirlanir, genislikte sayfa
// boyutundan BAGIMSIZ olarak DAIMA bir miktar sol/sag bosluk kalir (hem
// tasma/kaydirma onlenir hem de kullanicinin istedigi gorsel bosluk elde
// edilir). Dikey sayfalarda zaten daha once de genislik hicbir zaman
// sinirlayici OLMADIGINDAN (dikey oran < kutu orani) bu degisiklik dikey
// davranisi ETKILEMEZ.
const PREVIEW_WIDTH_PX = 1450;
const PREVIEW_MAX_HEIGHT_PX = 1000;
const PREVIEW_VIEWPORT_WIDTH_RATIO = 0.9;
const PREVIEW_VIEWPORT_HEIGHT_RATIO = 0.85;

// `body`'nin (bkz _paginatePreview stil sablonu) dikey `padding` (ust+alt)
// VE sayfalar arasi `gap`i -- olcek hesabi (`_paginatePreview`) bu "sayfa
// DISI" pikselleri iframe.clientHeight'TEN ONCEDEN dusmezse, TEK sayfalik
// bir onizleme bile (WHY yorumunun vaat ettigi "kaydirmadan tam gorunur"
// garantisine RAGMEN) iframe'in KENDI yuksekliginden padding kadar (2*24=48px)
// TASIP istenmeyen bir dikey kaydirma cubugu dogurtuyordu (kullanici
// bulgusu: "her sey tek sayfaya sigabiliyorsa kaydirma cikmasin").
const PREVIEW_PAGE_GAP_PX = 24;
const PREVIEW_BODY_PADDING_PX = 24;

/**
 * `TucbsPrintTool`'un yazdirma onizleme `<iframe>`'inin (overlay + boyutlandirma
 * + belge insasi + yazdirma tetikleme + kapatma) yasam donguslunu kapsuller
 * -- `PanelLayoutController` ile AYNI gerekce: bu, Lit panel-UI render'iyla
 * (bkz. TucbsPrintPanelContent) ILGISIZ, kendi icinde tutarli bir sorumluluk
 * (v17 SS8.3 SRP) oldugu icin `TucbsPrintTool`'dan AYRI bir sinifta yasar.
 */
export class PrintPreviewOverlayController {
  private _overlayEl: HTMLDivElement | null = null;
  private _iframe: HTMLIFrameElement | null = null;
  private _imageUrl: string | null = null;

  /**
   * Onizleme dokumanini kurup gosterir. `imageBlob`'un sahipligini alir --
   * `close()` cagrilana kadar olusturulan Object URL'i kendisi yonetir/iptal
   * eder.
   */
  async show(imageBlob: Blob, content: Omit<PrintPreviewContent, "imageBlobUrl">): Promise<void> {
    this._imageUrl = URL.createObjectURL(imageBlob);
    const iframe = this._ensureOverlay();
    this._sizeIframe(iframe);
    await new Promise<void>((resolve) => {
      iframe.addEventListener("load", () => resolve(), { once: true });
      iframe.srcdoc = "<!doctype html><html><head></head><body></body></html>";
    });
    const doc = iframe.contentDocument;
    if (!doc) return;
    buildPrintPreviewDocument(doc, { ...content, imageBlobUrl: this._imageUrl });
    this._paginatePreview(doc, iframe);
    buildPreviewToolbar(doc, {
      onPrint: () => this._triggerNativePrint(),
      onClose: () => this.close(),
    });
  }

  /** Önizleme overlay'ini kapatır/DOM'dan kaldırır ve `show()`'un oluşturduğu Object URL'i iptal eder. */
  close(): void {
    this._overlayEl?.remove();
    this._overlayEl = null;
    this._iframe = null;
    if (this._imageUrl) {
      URL.revokeObjectURL(this._imageUrl);
      this._imageUrl = null;
    }
  }

  // FAZ 2.6: `.print-page` `PrintPreviewBuilder.ts`'te GERCEK fiziksel mm
  // boyutunda ("dogal boyut") render ediliyor -- bu, ekran onizleme
  // kutusundan (1024x850) COK daha buyuk (ör. A0) veya kucuk (ör. A5
  // Yatay) olabilir. Kullanici "ilk sayfanin TAMAMINI bir kerede,
  // kaydirma olmadan gorebilir miyiz" istedigi icin, dogal boyut
  // OLCULEREK (96dpi gibi bir varsayim ELLE kodlanmadan, tarayicinin
  // GERCEK hesapladigi px degeri kullanilarak) kutuya TAM sigacak tek bir
  // olcek orani hesaplanip TUM sayfalara AYNI `transform:scale()`
  // uygulanir -- KUCUK sayfalar BUYUTULUR, BUYUK sayfalar KUCULTULUR
  // (kullanicinin ACIKCA onayladigi tasarim karari).
  //
  // FAZ 2.9: eskiden SADECE 1. sayfa (`.print-page`) bu sarmalama/olcekleme
  // islemini goruyordu -- lejant devam sayfalari (`.legend-continuation-page`)
  // `doc.body`'ye DOGRUDAN, hicbir olcekleme/ortalama OLMADAN ekleniyordu.
  // Kullanici gercek 919-kategorili senaryoda ekran onizlemesinde 2.
  // sayfadan itibaren lejant kolonlarinin 1. sayfaya gore SOLA KAYDIGINI
  // bildirdi (gercek yazdirma ciktisinda sorun YOKTU, cunku orada TUM
  // olcekleme `@media print` ile sifirlaniyor -- fark SADECE ekran
  // onizlemesine ozguydu). Kok neden: 1. sayfa kendi `.print-page-viewport`
  // sarmalayicisiyla ORTALANIP olceklenirken, devam sayfalari body'nin
  // normal (sol-hizali) akisinda DOGAL (olceksiz) boyutunda kaliyordu --
  // iki FARKLI yerlesim mantigi ayni ekranda cakisiyordu. Cozum: ARTIK
  // TUM sayfalar (1. sayfa + devam sayfalari) AYNI mekanizmadan geciyor,
  // HER biri kendi `.print-page-viewport`'una sarilip AYNI tek olcekle
  // (1. sayfanin dogal boyutundan hesaplanan) merkezlenip dikey olarak
  // istifleniyor -- boylece hizalari HER ZAMAN ozdes.
  //
  // Bu istif ayrica kullanicinin 2. istegini (sayfalari "Yazdir" iletisim
  // kutusundaki gibi AYRI AYRI, sinirlari GORUNUR sekilde gostermek)
  // karsilar: `body` gri arka plana donusturulup sayfalar arasina
  // bosluk+golge eklenir (native yazdirma onizlemesinin beyaz sayfa
  // kartlari deseniyle AYNI), boylece sayfanin nerede bittigi HER ZAMAN
  // gorsel olarak nettir. 1. sayfa GENE kutuya tam sigacak sekilde
  // olceklendigi icin (Faz 2.6'nin garantisi KORUNUR) TEK BASINA hala
  // kaydirmadan tam gorunur; devam sayfalari varsa iframe'in KENDI
  // (tarayici varsayilani, `overflow` HICBIR YERDE kisitlanmadigi icin
  // otomatik devreye giren) dikey kaydirmasiyla sirayla asagida ortaya
  // cikar -- bu, native yazdirma onizlemesinin "kaydirdikca sonraki
  // sayfayi gor" davranisiyla AYNIDIR, ayrica bir PDF render kutuphanesi
  // GEREKTIRMEZ.
  //
  // `.print-page-viewport` sarmalayicisi olceklenmis FOOTPRINT'i (px
  // cinsinden SABIT genislik/yukseklik) rezerve eder -- sadece
  // `transform:scale` kullanilsaydi (sarmalayici OLMADAN) tarayici normal
  // akista HALA dogal (buyuk) boyutu ayirir, gorsel olarak kucuk gorunse
  // bile ALTINDA/YANINDA fazladan bosluk birakirdi. `@media print` altinda
  // TUM bu stiller sifirlanir -- gercek yazdirma her zaman GERCEK fiziksel
  // `@page` mm boyutunu kullanir, bu TAMAMEN ekran-onizlemesine ozgu bir
  // davranistir.
  private _paginatePreview(doc: Document, iframe: HTMLIFrameElement): void {
    const pages = Array.from(doc.querySelectorAll<HTMLElement>(".print-page, .legend-continuation-page"));
    const firstPage = pages[0];
    if (!firstPage) return;
    const naturalWidthPx = firstPage.offsetWidth;
    const naturalHeightPx = firstPage.offsetHeight;
    if (naturalWidthPx === 0 || naturalHeightPx === 0) return;
    // Olceklenmis sayfa(lar) + aralarindaki gap + body padding'i TOPLAMDA
    // iframe.clientHeight'i asmamali -- bkz PREVIEW_PAGE_GAP_PX/
    // PREVIEW_BODY_PADDING_PX WHY yorumu.
    const chromeHeightPx = 2 * PREVIEW_BODY_PADDING_PX + Math.max(0, pages.length - 1) * PREVIEW_PAGE_GAP_PX;
    const availableHeightPx = Math.max(0, iframe.clientHeight - chromeHeightPx);
    const scale = Math.min(iframe.clientWidth / naturalWidthPx, availableHeightPx / naturalHeightPx);
    for (const page of pages) {
      const viewport = doc.createElement("div");
      viewport.className = "print-page-viewport";
      page.replaceWith(viewport);
      viewport.appendChild(page);
    }
    const style = doc.createElement("style");
    style.textContent = `
      @media screen {
        html, body { background: #e0e0e0; }
        body { display: flex; flex-direction: column; align-items: center; gap: ${PREVIEW_PAGE_GAP_PX}px; padding: ${PREVIEW_BODY_PADDING_PX}px 0; box-sizing: border-box; }
        .print-page-viewport { width: ${Math.round(naturalWidthPx * scale)}px; height: ${Math.round(naturalHeightPx * scale)}px; overflow: hidden; flex: none; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.35); }
        .print-page, .legend-continuation-page { transform: scale(${scale}); transform-origin: top left; }
      }
      @media print {
        html, body { background: none; }
        body { display: block; padding: 0; }
        .print-page-viewport { width: auto; height: auto; overflow: visible; background: none; box-shadow: none; }
        .print-page, .legend-continuation-page { transform: none; }
      }
    `;
    doc.head.appendChild(style);
  }

  private _triggerNativePrint(): void {
    this._iframe?.contentWindow?.print();
  }

  private _ensureOverlay(): HTMLIFrameElement {
    if (this._iframe) return this._iframe;
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:2rem;overflow:auto;";
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "background:#fff;border:none;box-shadow:0 4px 16px rgba(0,0,0,0.3);flex:none;";
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
    this._overlayEl = overlay;
    this._iframe = iframe;
    return iframe;
  }

  // FAZ 2.5: genislik/yukseklik artik BIRBIRINDEN BAGIMSIZ (sayfanin en-boy
  // oranindan turetilmiyor) -- bkz dosya-ustu PREVIEW_WIDTH_PX WHY yorumu.
  // Gercek yazdirma cozunurlugu bundan tamamen BAGIMSIZDIR, sadece
  // EKRANDAKI onizleme kutusunun boyutudur.
  private _sizeIframe(iframe: HTMLIFrameElement): void {
    const widthPx = Math.min(window.innerWidth * PREVIEW_VIEWPORT_WIDTH_RATIO, PREVIEW_WIDTH_PX);
    const heightPx = Math.min(window.innerHeight * PREVIEW_VIEWPORT_HEIGHT_RATIO, PREVIEW_MAX_HEIGHT_PX);
    iframe.style.width = `${Math.round(widthPx)}px`;
    iframe.style.height = `${Math.round(heightPx)}px`;
  }
}
