import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * `tucbs-tooltip-portal`: tek bir tooltip metnini `document.body`'ye
 * DOĞRUDAN portal eder (tek instance, `TucbsLayerList` tarafından
 * oluşturulup yeniden kullanılır) -- `TucbsLayerMenuPortal` ile AYNI
 * gerekçe (bkz. o dosyanın WHY yorumu): `.options-btn` satırın EN SAGINA
 * yaslı (bkz. TucbsLayerList `.layer-actions{margin-left:auto}`), bu yüzden
 * SAGA açılan bir tooltip `tucbs-slide-over-panel`'in
 * `.panel-body{overflow-y:auto}`'sunun CSS spec geregi karşı eksende de
 * uyguladığı örtük "auto" kırpmasına takılıp görünmez olurdu. Bu bileşen
 * `position:fixed` + butonun `getBoundingClientRect()`'i ile hesaplanan
 * mutlak ekran koordinatlarını kullanarak bu kırpma sınırının TAMAMEN
 * dışında (haritanın ÜSTÜNDE) render edilir.
 */
@customElement("tucbs-tooltip-portal")
export class TucbsTooltipPortal extends LitElement {
  static override readonly styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1100;
      display: none;
      pointer-events: none;
    }

    :host([open]) {
      display: block;
    }

    .tooltip {
      background: rgba(22, 22, 22, 0.9);
      color: #ffffff;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.75rem;
      line-height: 1.4;
      white-space: nowrap;
    }
  `;

  /** Tooltip'in görünür olup olmadığı (`open` attribute'una reflect edilir). */
  @property({ type: Boolean, reflect: true }) open = false;
  /** Gösterilecek tooltip metni. */
  @property() text = "";
  /** Tooltip'in ekrandaki mutlak X koordinatı (piksel). */
  @property({ type: Number }) x = 0;
  /** Tooltip'in ekrandaki mutlak Y koordinatı (piksel). */
  @property({ type: Number }) y = 0;

  /** `x`/`y` değiştiğinde host'un `transform`'unu günceller. */
  override updated(changed: PropertyValues): void {
    if (changed.has("x") || changed.has("y")) {
      this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  }

  override render() {
    return html`<div class="tooltip">${this.text}</div>`;
  }
}
