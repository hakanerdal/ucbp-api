import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
import { PaperSize, PageOrientation } from './paperSizes.js';
export type { PaperSize, PageOrientation };
/**
 * `tucbs-print-tool`: harita GUNCEL extent goruntusunu yazdirma/indirme
 * araci. `tucbs-settings-tool` ile AYNI desen: tek bir toolbar butonunun
 * actigi, sagdan kayan bir panelde "Sayfa Boyutu"+"Yon" secicileri +
 * secenek checkbox'lari + Indir/Yazdir butonlarini toplar (panelin GOVDESI
 * `print/TucbsPrintPanelContent.ts`'e, onizleme `<iframe>`'inin yasam
 * dongusu ise `print/PrintPreviewOverlayController.ts`'e devredilmistir
 * -- bkz o dosyalarin WHY yorumlari, v17 SS8.3 SRP/dosya-uzunlugu geregi
 * Faz 1.8'de ayristirildi). "Indir", `TucbsMapExport` ile BIREBIR ayni
 * `map.exportJPEG()` cagrisini yapar. "Yazdir", secilen sayfa boyutuna gore
 * YENIDEN yakalanan bir goruntuyu ayri bir onizlemede acar -- bkz
 * project_ucbp_api_printtool_arastirma (iframe vs window.open
 * degerlendirmesi) ve print/PrintPreviewBuilder.ts (CSP-guvenli
 * addEventListener gerekcesi).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-print-tool
 *   mapElementId="map"
 *   page-size="a4"
 *   page-orientation="landscape"
 * ></tucbs-print-tool>
 * ```
 */
export declare class TucbsPrintTool extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Bagli olunacak `tucbs-map` elementinin ID'si. */
    mapElementId: string;
    /** Panelin genisligi. */
    panelWidth: string;
    /** Tuketicinin shadow DOM'a enjekte edebilecegi keyfi CSS metni. */
    customCss: string;
    /** "Indir" ile inen dosyanin adi (uzantisiz) -- TucbsMapExport ile ayni konvansiyon. */
    filename: string;
    /** Panel ilk acildiginda secili gelen kagit boyutu (A0-A5) -- kullanici panelde degistirebilir. */
    pageSize: PaperSize;
    /** Panel ilk acildiginda secili gelen yon -- kagit boyutundan AYRI bir secici. */
    pageOrientation: PageOrientation;
    /** Yazdirma sayfasinin altinda gosterilecek serbest metin (ör. kurum atif metni). */
    footerText: string;
    /** Yazdirma sayfasinin basligi (haritanin USTUNDE, tarihle birlikte render edilir). */
    printTitle: string;
    /** Panelde "Lejant Goster" checkbox'inin gosterilip gosterilmeyecegi. */
    showLegendCheckbox: boolean;
    /** Panelde "Olcek Orani Goster" checkbox'inin gosterilip gosterilmeyecegi. */
    showScaleBarCheckbox: boolean;
    /** Panelde "Kuzey Oku Goster" checkbox'inin gosterilip gosterilmeyecegi. */
    showNorthArrowCheckbox: boolean;
    /** Core JS API `Map` referansi -- `mapElementId` yerine programatik olarak da atanabilir. */
    map: TucbsMapInstance | undefined;
    private _open;
    private _busy;
    private _selectedPaperSize;
    private _selectedOrientation;
    private _showNorthArrow;
    private _showScaleBar;
    private _showLegend;
    private readonly _layoutController;
    private readonly _previewController;
    private readonly _customCssState;
    private _panelEl;
    /** Yazdirma panelini `document.body`'ye ekler ve icerigini ilk kez render eder. */
    connectedCallback(): void;
    /** Haritadan bag cozer, panel elementini DOM'dan kaldirir ve acik onizlemeyi kapatir. */
    disconnectedCallback(): void;
    /** `mapElementId` ile eslesen elementten `map` referansini alir (henuz `map` atanmamissa). */
    firstUpdated(): void;
    /** `customCss`/`map`/`panelWidth` degisimlerini isler ve panel icerigini yeniden render eder. */
    updated(changed: PropertyValues): void;
    private _toggle;
    private _onDownloadClick;
    private _onPrintClick;
    private _openPreview;
    private _onPaperSizeChange;
    private _onOrientationChange;
    private _onNorthArrowToggle;
    private _onScaleBarToggle;
    private _onLegendToggle;
    private _renderIntoPanel;
    /** Toolbar butonunu render eder (tiklaninca yazdirma panelini acar/kapatir). */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsPrintTool.d.ts.map