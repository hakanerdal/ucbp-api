import { LitElement, html, css, render, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { Printer16 as PrinterIcon } from "@carbon/icons";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";
import { PanelLayoutController } from "../shared/ui/PanelLayoutController.js";
import "../shared/ui/SlideOverPanel.js";
import type { TucbsSlideOverPanel } from "../shared/ui/SlideOverPanel.js";
import { PrintPreviewOverlayController } from "./PrintPreviewOverlayController.js";
import { buildPrintPreviewInput } from "./PrintPreviewInputBuilder.js";
import "./TucbsPrintPanelContent.js";
import { getPageDimensionsMm, type PaperSize, type PageOrientation } from "./paperSizes.js";

export type { PaperSize, PageOrientation };

const ICON_PRINT = unsafeSVG(iconNodeToString(PrinterIcon));

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
@customElement("tucbs-print-tool")
export class TucbsPrintTool extends LitElement {
  static override readonly styles = [
    leftTooltipStyles,
    css`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }
    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }
    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }
    .tool-button.active {
      background: var(--cds-background-selected, #e0e0e0);
      border-color: var(--cds-border-strong-01, #8d8d8d);
    }
    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }
  `,
  ];

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  /** Bagli olunacak `tucbs-map` elementinin ID'si. */

  // Opsiyonel: tucbs-map elementinin ID'si. Diger tucbs-*-tool bilesenleriyle ayni desen.
  @property() mapElementId = "";

  /** Panelin genisligi. */
  @property({ attribute: "panel-width" }) panelWidth = "360px";

  /** Tuketicinin shadow DOM'a enjekte edebilecegi keyfi CSS metni. */
  @property({ attribute: "custom-css" }) customCss = "";

  /** "Indir" ile inen dosyanin adi (uzantisiz) -- TucbsMapExport ile ayni konvansiyon. */
  @property() filename = "tucbs-harita";

  /** Panel ilk acildiginda secili gelen kagit boyutu (A0-A5) -- kullanici panelde degistirebilir. */
  @property({ attribute: "page-size" }) pageSize: PaperSize = "a4";

  /** Panel ilk acildiginda secili gelen yon -- kagit boyutundan AYRI bir secici. */

  // Faz 1.6 madde 4: kullanici panel ilk acildiginda A4 Dikey gormek istedi.
  @property({ attribute: "page-orientation" }) pageOrientation: PageOrientation = "portrait";

  /** Yazdirma sayfasinin altinda gosterilecek serbest metin (ör. kurum atif metni). */

  // Varsayilan bos -- TUCBS'e ozgu bir metin HARDCODE edilmez, jenerik kalir.
  @property({ attribute: "footer-text" }) footerText = "";

  /** Yazdirma sayfasinin basligi (haritanin USTUNDE, tarihle birlikte render edilir). */

  // Bos verilirse (`printTitle=""`) BASLIK VE TARIH hic gosterilmez.
  @property({ attribute: "print-title" }) printTitle = "Harita Görünümü";

  /** Panelde "Lejant Goster" checkbox'inin gosterilip gosterilmeyecegi. */

  // Faz 2: isaretlenince gorunur (basemap olmayan) katmanlarin lejanti
  // haritanin ALTINA render edilir (bkz print/PrintLegendBuilder.ts).
  @property({ type: Boolean, attribute: "show-legend-checkbox" }) showLegendCheckbox = true;

  /** Panelde "Olcek Orani Goster" checkbox'inin gosterilip gosterilmeyecegi. */
  @property({ type: Boolean, attribute: "show-scale-bar-checkbox" }) showScaleBarCheckbox = true;

  /** Panelde "Kuzey Oku Goster" checkbox'inin gosterilip gosterilmeyecegi. */
  @property({ type: Boolean, attribute: "show-north-arrow-checkbox" }) showNorthArrowCheckbox = true;

  // === JS-only Properties ===
  /** Core JS API `Map` referansi -- `mapElementId` yerine programatik olarak da atanabilir. */
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  @state() private _open = false;
  @state() private _busy = false;
  @state() private _selectedPaperSize: PaperSize = this.pageSize;
  @state() private _selectedOrientation: PageOrientation = this.pageOrientation;
  @state() private _showNorthArrow = true;
  @state() private _showScaleBar = true;
  // Kuzey oku/olcek cubugunun aksine varsayilan KAPALI -- lejant ancak
  // katmanlara stil uygulanmissa (veya WMS/WMTS servis lejanti varsa)
  // anlamli, cogu ilk-acilis durumunda gosterilecek bir sey olmayabilir.
  @state() private _showLegend = false;

  private readonly _layoutController = new PanelLayoutController(this);
  private readonly _previewController = new PrintPreviewOverlayController();
  private readonly _customCssState: CustomCssState = { sheet: null };
  private _panelEl: TucbsSlideOverPanel | null = null;

  /** Yazdirma panelini `document.body`'ye ekler ve icerigini ilk kez render eder. */
  override connectedCallback(): void {
    super.connectedCallback();
    // Ayni tarafta (right) baska bir arac (ör. Ayarlar/Analiz) acilirsa bu
    // panel de kapatilsin -- bkz PanelLayoutController.onExclusiveClose WHY yorumu.
    this._layoutController.onExclusiveClose = () => {
      if (this._open) this._toggle();
    };
    const panel = document.createElement("tucbs-slide-over-panel") as TucbsSlideOverPanel;
    panel.panelTitle = "Yazdır";
    panel.panelWidth = this.panelWidth;
    panel.scrollBody = false;
    panel.onCloseRequest = () => this._toggle();
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._renderIntoPanel();
  }

  /** Haritadan bag cozer, panel elementini DOM'dan kaldirir ve acik onizlemeyi kapatir. */
  override disconnectedCallback(): void {
    if (this.map) this._layoutController.unbindMap(this.map);
    this._panelEl?.remove();
    this._panelEl = null;
    this._previewController.close();
    super.disconnectedCallback();
  }

  // === Yasam Dongusu: Map baglama (diger tool'larla ayni desen) ===
  /** `mapElementId` ile eslesen elementten `map` referansini alir (henuz `map` atanmamissa). */
  override firstUpdated(): void {
    // "sync": bu arac "mapElementId yok" uyarisini diger araclardan farkli
    // olarak bir kare ERTELEMEDEN basar (mevcut davranis, bkz
    // tools.mapBinding.characterization.test).
    bindMapByElementId(this, {
      noIdTiming: "sync",
      ...standardMapBindingMessages("tucbs-print-tool", "islevsiz"),
    });
  }

  /** `customCss`/`map`/`panelWidth` degisimlerini isler ve panel icerigini yeniden render eder. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-print-tool");
    }
    if (changed.has("map")) {
      const previous = changed.get("map") as TucbsMapInstance | undefined;
      if (previous) this._layoutController.unbindMap(previous);
      if (this.map) this._layoutController.bindMap(this.map);
    }
    if (changed.has("panelWidth") && this._open) this._layoutController.setOpen(true, this.panelWidth);
    if (this._panelEl) this._panelEl.panelWidth = this.panelWidth;
    this._renderIntoPanel();
  }

  private _toggle(): void {
    // Diger toolbar araclariyla (TucbsZoomTool/vb.) AYNI desen: map yoksa
    // buton GORUNMEYE devam eder ama tiklama sessizce no-op olur.
    if (!this.map) return;
    this._open = !this._open;
    this._layoutController.setOpen(this._open, this.panelWidth);
    this._renderIntoPanel();
  }

  private async _onDownloadClick(): Promise<void> {
    if (this._busy || !this.map) return;
    this._busy = true;
    try {
      await this.map.exportJPEG(this.filename);
    } finally {
      this._busy = false;
    }
  }

  private async _onPrintClick(): Promise<void> {
    if (this._busy || !this.map) return;
    this._busy = true;
    try {
      await this._openPreview();
    } finally {
      this._busy = false;
    }
  }

  private async _openPreview(): Promise<void> {
    if (!this.map) return;
    // Faz 1.5: harita KAMERAYA/container'a HIC dokunulmadan, o anki EKRAN
    // cozunurlugunde yakalanir (bkz Map.ts captureScreenshotBlob dosya-ustu
    // yorumu) -- Yazdir tiklaninca zoom sicramasi olmaz, extent AYNI kalir.
    const blob = await this.map.captureScreenshotBlob();
    const content = await buildPrintPreviewInput({
      map: this.map,
      pageDims: getPageDimensionsMm(this._selectedPaperSize, this._selectedOrientation),
      printTitle: this.printTitle,
      footerText: this.footerText,
      showNorthArrow: this._showNorthArrow,
      showScaleBar: this._showScaleBar,
      showLegend: this._showLegend,
    });
    await this._previewController.show(blob, content);
  }

  private _onPaperSizeChange(value: PaperSize): void {
    this._selectedPaperSize = value;
  }

  private _onOrientationChange(value: PageOrientation): void {
    this._selectedOrientation = value;
  }

  private _onNorthArrowToggle(checked: boolean): void {
    this._showNorthArrow = checked;
  }

  private _onScaleBarToggle(checked: boolean): void {
    this._showScaleBar = checked;
  }

  private _onLegendToggle(checked: boolean): void {
    this._showLegend = checked;
  }

  private _renderIntoPanel(): void {
    if (!this._panelEl) return;
    this._panelEl.open = this._open;
    render(
      html`
        <span slot="icon">${ICON_PRINT}</span>
        <tucbs-print-panel-content
          .paperSize=${this._selectedPaperSize}
          .orientation=${this._selectedOrientation}
          .showNorthArrowCheckbox=${this.showNorthArrowCheckbox}
          .showScaleBarCheckbox=${this.showScaleBarCheckbox}
          .showLegendCheckbox=${this.showLegendCheckbox}
          .showNorthArrow=${this._showNorthArrow}
          .showScaleBar=${this._showScaleBar}
          .showLegend=${this._showLegend}
          .busy=${this._busy}
          .onPaperSizeChange=${(value: PaperSize) => this._onPaperSizeChange(value)}
          .onOrientationChange=${(value: PageOrientation) => this._onOrientationChange(value)}
          .onNorthArrowToggle=${(checked: boolean) => this._onNorthArrowToggle(checked)}
          .onScaleBarToggle=${(checked: boolean) => this._onScaleBarToggle(checked)}
          .onLegendToggle=${(checked: boolean) => this._onLegendToggle(checked)}
          .onDownloadClick=${() => this._onDownloadClick()}
          .onPrintClick=${() => this._onPrintClick()}
        ></tucbs-print-panel-content>
      `,
      this._panelEl,
    );
  }

  /** Toolbar butonunu render eder (tiklaninca yazdirma panelini acar/kapatir). */
  override render() {
    return html`
      <button
        type="button"
        class="tool-button ${this._open ? "active" : ""}"
        aria-label="Yazdır"
        data-tooltip="Yazdır"
        aria-pressed=${this._open}
        @click=${this._toggle}
      >
        ${ICON_PRINT}
      </button>
    `;
  }
}
