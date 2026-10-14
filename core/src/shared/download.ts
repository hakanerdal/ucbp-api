// Map.exportJPEG ve layers/export/LayerExporter.ts'in AYNI blob-indirme
// tetikleyicisini paylasmasi icin (bkz KL-09 -- bu blok oncesinde
// Map.triggerDownload/LayerManager.exportLayerGeoJSON/
// LayerManager.exportLayerAsGeoTiff'te UC AYRI kopya olarak duruyordu).
//
// KL-09 duzeltmesi (Adim 6/Faz 4): revokeObjectURL, link.click()'ten HEMEN
// SONRA SENKRON cagrilirsa bazi tarayicilarda (ozellikle Firefox) tiklama
// ile tetiklenen indirme blob URL'i ASENKRON okudugu icin basarisiz
// olabiliyor (bkz PDF: "blob URL iptalini ertelemeyle guvene alin", kesin
// bir sure vermiyor). 1000ms bu tur sorunlar icin yaygin kabul goren
// guvenli bir varsayilan -- bu yuzden setTimeout ile erteleniyor. Ciplak
// setTimeout burada BILINCLI (core'da TimerBag yok -- bkz eslint.config.mjs
// core blogu; components shared/util/busy.ts ile AYNI gerekce; bkz
// project_ucbp_api_god_component_refactor_kurallari Adim 6/Faz 4).
export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // eslint-disable-next-line no-restricted-syntax -- tek seferlik URL iptali (KL-09); bir host'a bagli degil, iptal edilmesi gerekmez.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
