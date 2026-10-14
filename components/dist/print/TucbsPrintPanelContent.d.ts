import { LitElement } from 'lit';
import { PaperSize, PageOrientation } from './paperSizes.js';
/**
 * `tucbs-print-panel-content`: `TucbsPrintTool`'un "Yazdır" panelinin
 * GOVDESI (Kagit Boyutu/Yon seciciler + Kuzey Oku/Olcek Orani checkbox'lari
 * + Harita Indir (JPG) butonu (kartin USTUNDE) + karttaki Yazdir butonu). Ayri bir bilesen olmasinin SEBEBI:
 * `TucbsPrintTool._renderIntoPanel()`, cikti `document.body`'ye portal
 * edilmis `tucbs-slide-over-panel`'in LIGHT DOM'una yazar (bkz.
 * TucbsPrintTool.ts baglama dosya-ustu yorumu) -- `TucbsPrintTool`'un
 * KENDI `static styles` blogu oraya HIC ETKI ETMEZ. `TucbsSettingsTool`
 * bu sorunu panel icerigini KENDI shadow DOM'u/`static styles`'i olan alt
 * bilesenlere (`tucbs-basemap-picker`, `tucbs-quality-bar`) devrederek
 * cozer; bu bilesen `TucbsPrintTool` icin AYNI cozumu uygular -- boylece
 * `TucbsPrintTool.ts` artik HICBIR inline `style="..."` metnine ihtiyac
 * duymaz (v17 SS8.3 tutarlilik/DRY).
 *
 * `TucbsBasemapPicker`'in aksine bagimsiz bir modu YOK -- SADECE
 * `TucbsPrintTool` tarafindan gomulur, bu yuzden (SlideOverPanel.ts ile
 * ayni gerekceyle) `internal/` altinda, public API yuzeyinin DISINDA tutulur.
 */
export declare class TucbsPrintPanelContent extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Seçili kağıt boyutu. */
    paperSize: PaperSize;
    /** Seçili sayfa yönü. */
    orientation: PageOrientation;
    /** "Kuzey Oku Göster" checkbox'ının gösterilip gösterilmeyeceği. */
    showNorthArrowCheckbox: boolean;
    /** "Ölçek Oranı Göster" checkbox'ının gösterilip gösterilmeyeceği. */
    showScaleBarCheckbox: boolean;
    /** "Lejant Göster" checkbox'ının gösterilip gösterilmeyeceği. */
    showLegendCheckbox: boolean;
    /** "Kuzey Oku Göster" checkbox'ının işaretli durumu. */
    showNorthArrow: boolean;
    /** "Ölçek Oranı Göster" checkbox'ının işaretli durumu. */
    showScaleBar: boolean;
    /** "Lejant Göster" checkbox'ının işaretli durumu. */
    showLegend: boolean;
    /** İndir/Yazdır butonlarının devre dışı (meşgul) olup olmadığı. */
    busy: boolean;
    /** Kağıt boyutu seçici değiştiğinde çağrılır. */
    onPaperSizeChange: ((value: PaperSize) => void) | undefined;
    /** Yön seçici değiştiğinde çağrılır. */
    onOrientationChange: ((value: PageOrientation) => void) | undefined;
    /** "Kuzey Oku Göster" checkbox'ı değiştiğinde çağrılır. */
    onNorthArrowToggle: ((checked: boolean) => void) | undefined;
    /** "Ölçek Oranı Göster" checkbox'ı değiştiğinde çağrılır. */
    onScaleBarToggle: ((checked: boolean) => void) | undefined;
    /** "Lejant Göster" checkbox'ı değiştiğinde çağrılır. */
    onLegendToggle: ((checked: boolean) => void) | undefined;
    /** "İndir" butonuna tıklanınca çağrılır. */
    onDownloadClick: (() => void) | undefined;
    /** "Yazdır" butonuna tıklanınca çağrılır. */
    onPrintClick: (() => void) | undefined;
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsPrintPanelContent.d.ts.map