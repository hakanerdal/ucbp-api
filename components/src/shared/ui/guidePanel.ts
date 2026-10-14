import { html, css, render as litRender } from "lit";
import "@carbon/web-components/es/components/notification/index.js";

// Kalici (kendiliginden KAPANMAYAN) yonlendirme paneli -- toast.ts ile ayni
// gorunum, ama islem bitene kadar (hideGuide) ekranda kalir.
// Toast'tan AYRI bir element'tir (ayni anda gelen gecici toast'lar guide'i
// silmez) ve SAG USTTE durur: sag kenardaki toolbar sutununu (buton 2.25rem
// + 1rem kenar boslugu) KAPATMASIN diye sagdan toolbar genisligi kadar iceride.
const GUIDE_STYLES = css`
  :host {
    position: fixed;
    top: 16px;
    right: 4.5rem;
    z-index: 2100;
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 0.875rem;
    width: 380px;
    max-width: calc(100vw - 6rem);
  }

  cds-inline-notification {
    width: 100%;
    max-width: none;
  }

  /* Baslik VE liste TEK bloktadir (subtitle slot'u): Carbon'un title/subtitle
     kutulari yan yana (flex-wrap) dizildiginden, maddeler kisaldiginda baslik
     listenin soluna kayiyordu. */
  .guide-title {
    margin: 0;
    font-weight: 600;
  }

  ul {
    margin: 0.25rem 0 0;
    padding-left: 1.1rem;
  }

  li {
    margin: 0.125rem 0;
  }
`;

let activeGuideEl: HTMLDivElement | null = null;

/**
 * Sağ üstte, madde madde yönlendirme gösteren kalıcı bir panel açar; `hideGuide()` çağrılana kadar kaybolmaz.
 * Zaten açık bir panel varsa içeriği yenisiyle değiştirilir.
 * @param title - Panel başlığı (ör. aracın adı).
 * @param steps - Alt alta madde madde gösterilecek yönlendirmeler.
 */
export function showGuide(title: string, steps: readonly string[]): void {
  hideGuide();

  const el = document.createElement("div");
  document.body.appendChild(el);
  const shadow = el.attachShadow({ mode: "open" });
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(GUIDE_STYLES.cssText);
  shadow.adoptedStyleSheets = [sheet];
  activeGuideEl = el;

  litRender(
    html`
      <cds-inline-notification kind="info" role="status" hide-close-button low-contrast>
        <div slot="subtitle">
          <p class="guide-title">${title}</p>
          <ul>
            ${steps.map((step) => html`<li>${step}</li>`)}
          </ul>
        </div>
      </cds-inline-notification>
    `,
    shadow,
  );
}

/** Açık yönlendirme panelini (varsa) kaldırır. */
export function hideGuide(): void {
  activeGuideEl?.remove();
  activeGuideEl = null;
}
