import { LitElement, html, css, render, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { ChartLine16 as ChartLineIcon } from "@carbon/icons";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId } from "../shared/util/bindTucbsMap.js";
import { PanelLayoutController } from "../shared/ui/PanelLayoutController.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";
import "../shared/ui/SlideOverPanel.js";
import type { TucbsSlideOverPanel } from "../shared/ui/SlideOverPanel.js";
import "./TucbsAnalysisPanel.js";
import type { TucbsAnalysisPanel } from "./TucbsAnalysisPanel.js";

const ICON_ANALYSIS = unsafeSVG(iconNodeToString(ChartLineIcon));

const EMBED_ANALYSIS_PANEL_CSS = `
  :host {
    position: static !important;
    inset: auto !important;
    z-index: auto !important;
  }
  .shell {
    border: none;
    padding: 0;
    background: transparent;
  }
`;

/**
 * `tucbs-analysis-tool`: toolbar analiz girişi — sağdan slide-over panelde
 * `tucbs-analysis-panel`'i (tampon vb.) KENDİ İÇİNDE GÖMER. `tucbs-toolbar`
 * içinde `analysis` id ile kullanılır; `TucbsApp`'in toolbar'ında koşulsuz
 * her zaman bulunur (harici bir `<tucbs-analysis-panel>` marker tag'i
 * ARANMAZ — bkz. `TucbsApp.ts`).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-analysis-tool mapElementId="map" panel-width="360px"></tucbs-analysis-tool>
 * ```
 */
@customElement("tucbs-analysis-tool")
export class TucbsAnalysisTool extends LitElement {
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

  /** Opsiyonel: `tucbs-map` elementinin ID'si (Senaryo 2 bağlama). */
  @property() mapElementId = "";

  /** Analiz panelinin genişliği. */
  @property({ attribute: "panel-width" }) panelWidth = "360px";

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz. `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  /** Core JS API `Map` referansı. Senaryo 1: property binding ile doğrudan atanır; Senaryo 2: `mapElementId` üzerinden `firstUpdated()` içinde otomatik bağlanır. */
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  @state() private _open = false;

  private readonly _layoutController = new PanelLayoutController(this);
  private _panelEl: TucbsSlideOverPanel | null = null;
  private readonly _customCssState: CustomCssState = { sheet: null };

  /** Analiz panelini (`tucbs-slide-over-panel`) `document.body`'ye ekler ve içeriğini ilk kez render eder. */
  override connectedCallback(): void {
    super.connectedCallback();
    // Ayni tarafta (right) baska bir arac (ör. Yazdır/Ayarlar) acilirsa bu
    // panel de kapatilsin -- bkz PanelLayoutController.onExclusiveClose WHY yorumu.
    this._layoutController.onExclusiveClose = () => {
      if (this._open) this._toggle();
    };
    const panel = document.createElement("tucbs-slide-over-panel") as TucbsSlideOverPanel;
    panel.panelTitle = "Coğrafi Analiz";
    panel.panelWidth = this.panelWidth;
    panel.onCloseRequest = () => this._toggle();
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._renderIntoPanel();
  }

  /** Bileşen DOM'dan kaldırıldığında haritadan bağ çözer ve panel elementini DOM'dan kaldırır. */
  override disconnectedCallback(): void {
    if (this.map) this._layoutController.unbindMap(this.map);
    this._panelEl?.remove();
    this._panelEl = null;
    super.disconnectedCallback();
  }

  /** İlk render sonrası `map`i (programatik atanmadıysa) `mapElementId` üzerinden haritaya bağlar. */
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      noIdMessage:
        '[tucbs-analysis-tool] "mapElementId" verilmedi ve "map" atanmadı; analiz paneli haritaya bağlanamayabilir.',
      missingElementMessage: (mapElementId) => `[tucbs-analysis-tool] mapElementId="${mapElementId}" bulunamadı.`,
    });
  }

  /** `customCss`/`map`/`panelWidth` değişimlerini işler (shadow DOM'a stil uygulama, layout bağlama/panel genişliği) ve panel içeriğini yeniden render eder. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-analysis-tool");
    }

    if (changed.has("map")) {
      const previous = changed.get("map") as TucbsMapInstance | undefined;
      if (previous) this._layoutController.unbindMap(previous);
      if (this.map) this._layoutController.bindMap(this.map);
    }

    if (changed.has("panelWidth") && this._open) {
      this._layoutController.setOpen(true, this.panelWidth);
    }

    if (this._panelEl) this._panelEl.panelWidth = this.panelWidth;
    this._renderIntoPanel();
  }

  private _renderIntoPanel(): void {
    if (!this._panelEl) return;
    this._panelEl.open = this._open;
    render(
      html`
        <span slot="icon" style="display:inline-flex;align-items:center;justify-content:center;line-height:0;width:1.25rem;height:1.25rem">${ICON_ANALYSIS}</span>
        <tucbs-analysis-panel
          .map=${this.map}
          .mapElementId=${this.mapElementId}
          custom-css=${EMBED_ANALYSIS_PANEL_CSS}
        ></tucbs-analysis-panel>
      `,
      this._panelEl,
    );
  }

  private _toggle(): void {
    this._open = !this._open;
    if (!this._open) {
      // Bkz TucbsAnalysisPanel.resetActiveTool WHY yorumu -- panel "← Analiz"
      // oku yerine dogrudan kapatilirsa aktif arac (varsa) burada listeye
      // dondurulur, aksi halde identify sonsuza kadar suspend kalir.
      this._panelEl
        ?.querySelector<TucbsAnalysisPanel>("tucbs-analysis-panel")
        ?.resetActiveTool();
    }
    this._layoutController.setOpen(this._open, this.panelWidth);
    this._renderIntoPanel();
  }

  /** Toolbar'daki dairesel "Coğrafi Analiz" butonunu render eder. */
  override render() {
    return html`
      <button
        type="button"
        class="tool-button ${this._open ? "active" : ""}"
        aria-label="Coğrafi Analiz"
        data-tooltip="Coğrafi Analiz"
        aria-pressed=${this._open}
        @click=${this._toggle}
      >
        ${ICON_ANALYSIS}
      </button>
    `;
  }
}
