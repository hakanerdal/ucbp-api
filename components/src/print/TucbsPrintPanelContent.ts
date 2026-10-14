import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PAPER_SIZES_MM, ORIENTATION_LABELS, type PaperSize, type PageOrientation } from "./paperSizes.js";

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
@customElement("tucbs-print-panel-content")
export class TucbsPrintPanelContent extends LitElement {
  static override readonly styles = css`
    :host {
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
    }
    .panel {
      background: #fafcfd;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .row {
      display: flex;
      gap: 0.5rem;
    }
    .field {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      font-weight: 600;
    }
    select {
      padding: 0.5rem;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      font: inherit;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .download-btn {
      margin-bottom: 0.75rem;
    }
    .btn {
      width: 100%;
      padding: 0.625rem;
      border: none;
      border-radius: 4px;
      background: var(--cds-interactive, #0f62fe);
      color: #fff;
      font: inherit;
      cursor: pointer;
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: default;
    }
  `;

  /** Seçili kağıt boyutu. */
  @property({ attribute: false }) paperSize: PaperSize = "a4";
  /** Seçili sayfa yönü. */
  @property({ attribute: false }) orientation: PageOrientation = "portrait";
  /** "Kuzey Oku Göster" checkbox'ının gösterilip gösterilmeyeceği. */
  @property({ type: Boolean, attribute: false }) showNorthArrowCheckbox = true;
  /** "Ölçek Oranı Göster" checkbox'ının gösterilip gösterilmeyeceği. */
  @property({ type: Boolean, attribute: false }) showScaleBarCheckbox = true;
  /** "Lejant Göster" checkbox'ının gösterilip gösterilmeyeceği. */
  @property({ type: Boolean, attribute: false }) showLegendCheckbox = true;
  /** "Kuzey Oku Göster" checkbox'ının işaretli durumu. */
  @property({ type: Boolean, attribute: false }) showNorthArrow = true;
  /** "Ölçek Oranı Göster" checkbox'ının işaretli durumu. */
  @property({ type: Boolean, attribute: false }) showScaleBar = true;
  /** "Lejant Göster" checkbox'ının işaretli durumu. */
  @property({ type: Boolean, attribute: false }) showLegend = false;
  /** İndir/Yazdır butonlarının devre dışı (meşgul) olup olmadığı. */
  @property({ type: Boolean, attribute: false }) busy = false;

  // === Callback props (SlideOverPanel.onCloseRequest ile AYNI desen) ===
  /** Kağıt boyutu seçici değiştiğinde çağrılır. */
  @property({ attribute: false }) onPaperSizeChange: ((value: PaperSize) => void) | undefined;
  /** Yön seçici değiştiğinde çağrılır. */
  @property({ attribute: false }) onOrientationChange: ((value: PageOrientation) => void) | undefined;
  /** "Kuzey Oku Göster" checkbox'ı değiştiğinde çağrılır. */
  @property({ attribute: false }) onNorthArrowToggle: ((checked: boolean) => void) | undefined;
  /** "Ölçek Oranı Göster" checkbox'ı değiştiğinde çağrılır. */
  @property({ attribute: false }) onScaleBarToggle: ((checked: boolean) => void) | undefined;
  /** "Lejant Göster" checkbox'ı değiştiğinde çağrılır. */
  @property({ attribute: false }) onLegendToggle: ((checked: boolean) => void) | undefined;
  /** "İndir" butonuna tıklanınca çağrılır. */
  @property({ attribute: false }) onDownloadClick: (() => void) | undefined;
  /** "Yazdır" butonuna tıklanınca çağrılır. */
  @property({ attribute: false }) onPrintClick: (() => void) | undefined;

  override render() {
    return html`
      <button
        type="button"
        class="btn download-btn"
        ?disabled=${this.busy}
        @click=${() => this.onDownloadClick?.()}
      >
        Harita İndir (JPG)
      </button>
      <div class="panel">
        <div class="row">
          <label class="field">
            Kağıt Boyutu
            <select
              @change=${(e: Event) =>
                this.onPaperSizeChange?.((e.target as HTMLSelectElement).value as PaperSize)}
            >
              ${Object.entries(PAPER_SIZES_MM).map(
                ([key, config]) =>
                  html`<option value=${key} ?selected=${key === this.paperSize}>${config.label}</option>`,
              )}
            </select>
          </label>
          <label class="field">
            Yön
            <select
              @change=${(e: Event) =>
                this.onOrientationChange?.((e.target as HTMLSelectElement).value as PageOrientation)}
            >
              ${Object.entries(ORIENTATION_LABELS).map(
                ([key, label]) =>
                  html`<option value=${key} ?selected=${key === this.orientation}>${label}</option>`,
              )}
            </select>
          </label>
        </div>
        ${this.showNorthArrowCheckbox
          ? html`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this.showNorthArrow}
                @change=${(e: Event) => this.onNorthArrowToggle?.((e.target as HTMLInputElement).checked)}
              />
              Kuzey Oku Göster
            </label>`
          : ""}
        ${this.showScaleBarCheckbox
          ? html`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this.showScaleBar}
                @change=${(e: Event) => this.onScaleBarToggle?.((e.target as HTMLInputElement).checked)}
              />
              Ölçek Oranı Göster
            </label>`
          : ""}
        ${this.showLegendCheckbox
          ? html`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this.showLegend}
                @change=${(e: Event) => this.onLegendToggle?.((e.target as HTMLInputElement).checked)}
              />
              Lejant Göster
            </label>`
          : ""}
        <button type="button" class="btn" ?disabled=${this.busy} @click=${() => this.onPrintClick?.()}>
          Yazdır
        </button>
      </div>
    `;
  }
}
