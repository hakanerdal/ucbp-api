import { PrintLegendEntry } from './PrintLegendData.js';
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
export declare function buildPrintPreviewDocument(doc: Document, content: PrintPreviewContent): void;
/**
 * Önizleme belgesine sabit bir Yazdır/Kapat araç çubuğu ekler (`@media print`te gizli).
 * @param doc - İçine eklenecek `iframe.contentDocument`.
 * @param callbacks - Buton tıklama callback'leri.
 */
export declare function buildPreviewToolbar(doc: Document, callbacks: PreviewToolbarCallbacks): void;
//# sourceMappingURL=PrintPreviewBuilder.d.ts.map