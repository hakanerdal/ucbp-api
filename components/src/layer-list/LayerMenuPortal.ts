import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

/** Katman "..." menüsündeki tek bir aksiyon maddesi. */
export interface LayerMenuAction {
  /** Maddenin ikonu (render edilebilir SVG düğümü). */
  icon: unknown;
  /** Maddenin görünen metni. */
  label: string;
  /** Maddeye tıklanınca çağrılır. Alt menü varsa üst satır tıklanınca çalışmaz. */
  onClick: () => void;
  /** Varsa satırın sağına açılan alt menü. Analiz sonucu Dışa Aktar için. */
  children?: LayerMenuAction[];
}

/**
 * `tucbs-layer-menu-portal`: `TucbsLayerList`'in katman satırındaki "..."
 * (kebap) menüsünün içeriğini `document.body`'ye DOĞRUDAN portal eder (tek
 * bir instance, `TucbsLayerList` tarafından olusturulup yeniden kullanılır).
 *
 * WHY: menü eskiden `.layer-options` içinde `position:absolute` idi ve
 * `.layer-options{position:relative}` kendi containing block'unu zaten
 * sağladığı için `tucbs-slide-over-panel`'in `.panel{transform:...}`
 * sorunundan (bkz. SlideOverPanel.ts) ETKİLENMİYORDU -- ama
 * `.panel-body{overflow-y:auto}` CSS spec'i gereği KARŞI eksende
 * (overflow-x) de örtük olarak "auto" olur, bu da satırın sağına taşan
 * (160px+ genişlikte) menüyü panelin dar (~320-360px) genişliğinde YATAYDA
 * KIRPIYORDU. Bu bileşen `position:fixed` + tıklanan butonun
 * `getBoundingClientRect()`'i ile hesaplanan mutlak ekran koordinatlarını
 * kullanarak bu kırpma sınırının TAMAMEN dışında (haritanın ÜSTÜNDE) render
 * edilir.
 */
@customElement("tucbs-layer-menu-portal")
export class TucbsLayerMenuPortal extends LitElement {
  static override readonly styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1100;
      display: none;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
    }

    :host([open]) {
      display: block;
    }

    .layer-menu {
      display: flex;
      flex-direction: column;
      min-width: 160px;
      padding: 0.25rem 0;
      background: var(--cds-layer-01, #ffffff);
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    .layer-menu-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border: none;
      background: transparent;
      color: var(--cds-text-primary, #161616);
      font-size: 0.8125rem;
      text-align: left;
      cursor: pointer;
    }

    .layer-menu-item:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
    }

    .layer-menu-branch {
      position: relative;
    }

    .layer-menu-item .chevron {
      margin-left: auto;
    }

    .layer-submenu {
      display: none;
      position: absolute;
      left: 100%;
      top: 0;
      min-width: 160px;
      padding: 0.25rem 0;
      background: var(--cds-layer-01, #ffffff);
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    .layer-menu-branch:hover .layer-submenu,
    .layer-menu-branch:focus-within .layer-submenu {
      display: flex;
      flex-direction: column;
    }
  `;

  /** Menünün görünür olup olmadığı (`open` attribute'una reflect edilir). */
  @property({ type: Boolean, reflect: true }) open = false;
  /** Menüde gösterilecek aksiyon listesi. */
  @property({ attribute: false }) actions: LayerMenuAction[] = [];
  /** Menünün ekrandaki mutlak X koordinatı (piksel). */
  @property({ type: Number }) x = 0;
  /** Menünün ekrandaki mutlak Y koordinatı (piksel). */
  @property({ type: Number }) y = 0;

  /** `x`/`y` değiştiğinde host'un `transform`'unu günceller. */
  override updated(changed: PropertyValues): void {
    if (changed.has("x") || changed.has("y")) {
      this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  }

  override render() {
    return html`
      <div class="layer-menu" role="menu">
        ${this.actions.map((action) =>
          action.children?.length
            ? html`
                <div class="layer-menu-branch">
                  <button type="button" class="layer-menu-item" role="menuitem" aria-haspopup="true">
                    ${action.icon}<span>${action.label}</span><span class="chevron">›</span>
                  </button>
                  <div class="layer-submenu" role="menu">
                    ${action.children.map(
                      (child) => html`
                        <button
                          type="button"
                          class="layer-menu-item"
                          role="menuitem"
                          @click=${child.onClick}
                        >
                          ${child.icon}<span>${child.label}</span>
                        </button>
                      `,
                    )}
                  </div>
                </div>
              `
            : html`
                <button
                  type="button"
                  class="layer-menu-item"
                  role="menuitem"
                  @click=${action.onClick}
                >
                  ${action.icon}<span>${action.label}</span>
                </button>
              `,
        )}
      </div>
    `;
  }
}
