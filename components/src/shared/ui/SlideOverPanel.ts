import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { Close16 as CloseIcon } from "@carbon/icons";
import { iconNodeToString } from "../util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../util/CustomCss.js";

const ICON_CLOSE = unsafeSVG(iconNodeToString(CloseIcon));

/**
 * `tucbs-slide-over-panel`: ekranin bir kenarindan (bkz. `side`) tam-
 * yukseklik acilan genel-amacli panel govdesi. `TucbsSettingsTool`'un
 * actigi "Ayarlar" paneli `side="right"` (varsayilan) ile, `TucbsLayerList`'in
 * "Katman Yonetimi"'i `side="left"` ile kullanir -- ikisi de AYNI govdeyi
 * (baslik+kapatma+govde+gecis animasyonu) paylasir, sadece hangi kenardan
 * acilip hangi yone kaydigi degisir. Icerik (`<slot>`) VE baslik yanindaki
 * ikon (`<slot name="icon">`, opsiyonel) tuketiciye birakilir.
 *
 * NOT: `TucbsBasemapPicker`'in KENDI bagimsiz modu (tucbs-settings-tool
 * sayfada yoksa) bunu KULLANMAZ -- TucbsLayerList'teki ESKI toggle-btn/
 * panel deseriyle ayni sekilde, harita sikistirmadan/kaydirmadan sadece
 * haritanin ustunde yuzen bir kart acar/kapatir (bkz. TucbsBasemapPicker.ts).
 *
 * `TucbsLayerList` gibi kendisi zaten TOP-LEVEL bir tag olarak kullanilan
 * (baska bir bilesenin shadow DOM'una gomulmeyen) tuketiciler bunu KENDI
 * shadow root'larinda NORMAL bir cocuk olarak (portal OLMADAN) kullanabilir
 * -- `position:fixed` zaten dogru sekilde viewport'a gore konumlanir.
 * `document.body`'ye DOGRUDAN eklenmesi ("portal") SADECE `TucbsSettingsTool`
 * gibi `tucbs-toolbar`'in kendi shadow DOM'unda yasayan tuketiciler icin
 * GEREKIR -- cagiran bilesenin KENDI shadow DOM agacinin icinde DEGIL.
 * WHY: cagiran bilesen
 * (ör. `tucbs-settings-tool`) genelde `tucbs-toolbar` icinde bir arac
 * olarak kullanilir; TucbsToolbar bazi konumlarda kendini ortalamak icin
 * kendi :host'una `transform` uygular (bkz. TucbsToolbar.POSITION_STYLES).
 * CSS spec'ine gore `transform` tasiyan HERHANGI bir ATA, `position:fixed`
 * torunlari icin YENI bir "containing block" olusturur -- yani panel,
 * viewport'a DEGIL o atanin kendi (icerige-gore-boyutlanan, kucuk)
 * kutusuna hapsolup yanlis/kirpilmis konum-boyutta cizilir. `document.
 * body`'ye dogrudan eklenmis bagimsiz bir element bu transform zincirinin
 * TAMAMEN disinda kalir.
 */
@customElement("tucbs-slide-over-panel")
export class TucbsSlideOverPanel extends LitElement {
  static override readonly styles = css`
    :host {
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }

    .panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      display: flex;
      flex-direction: column;
      background: var(--cds-layer-01, #ffffff);
      border-left: 1px solid var(--cds-border-subtle, #e0e0e0);
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
      transform: translateX(100%);
      transition: transform 240ms cubic-bezier(0.2, 0, 0.38, 0.9);
    }

    .panel.open {
      transform: translateX(0);
    }

    /* "side" (varsayilan "right"): panelin hangi ekran kenarindan
       acildigini/kapaninca hangi yone kaydigini belirler -- Ayarlar paneli
       sagdan/sola, TucbsLayerList'in "Katman Yonetimi"'i (bkz.
       TucbsLayerList.ts) soldan/saga acilir. Sadece konum/kayma yonu
       (left/right, translateX isareti, kenarlik/golge yonu) degisir; geri
       kalan her sey (baslik, kapatma butonu, govde) AYNI. */
    :host([side="left"]) .panel {
      right: auto;
      left: 0;
      border-left: none;
      border-right: 1px solid var(--cds-border-subtle, #e0e0e0);
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
      transform: translateX(-100%);
    }

    :host([side="left"]) .panel.open {
      transform: translateX(0);
    }

    .panel-header {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
      min-height: 3.5rem;
      box-sizing: border-box;
    }

    .panel-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 0;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.25;
    }

    .panel-title > span {
      display: inline-flex;
      align-items: center;
      line-height: 1.25;
    }

    ::slotted([slot="icon"]) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 1.25rem;
      height: 1.25rem;
      line-height: 0;
      color: #0f62fe;
    }

    .panel-close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      flex: none;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--cds-icon-secondary, #525252);
      cursor: pointer;
    }

    .panel-close-btn:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
      color: var(--cds-icon-primary, #161616);
    }

    .panel-close-btn svg {
      width: 1.25rem;
      height: 1.25rem;
      display: block;
    }

    /* Icerik tam beyaz bir zemine, dikey olarak aralikli (gap) kartlar
       seklinde yerlesir -- tuketicinin gomdugu her bilesen (bkz.
       TucbsSettingsTool) KENDI hafifce farkli tonlu (#fafcfd) kart
       govdesini bu beyaz zemine karsi gosterir; boylece birden fazla ayar
       grubu birbirinden net sekilde ayrisir (ic cizgi/divider yerine
       bosluk+ince kontrast ile). */
    .panel-body {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      background: var(--cds-layer-01, #ffffff);
    }
  `;

  /** Panel başlığı. */
  @property() panelTitle = "";
  /** Panelin hangi ekran kenarından açılacağı. */
  @property({ reflect: true }) side: "left" | "right" = "right";
  /** Panelin açık/kapalı durumu (`open` attribute'una reflect edilir). */
  @property({ type: Boolean, reflect: true }) open = false;
  /** Panelin genişliği. */
  @property({ attribute: "panel-width" }) panelWidth = "360px";
  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni. */
  @property({ attribute: "custom-css" }) customCss = "";
  // Varsayilan `true` MEVCUT tuketicilerin (TucbsSettingsTool, TucbsLayerList)
  // davranisini DEGISTIRMEZ. `TucbsPrintTool` icerigi sabit/kisa oldugundan
  // `false` verir.
  /** Gövde (`.panel-body`) taşarsa dikey scroll gösterilsin mi. */
  @property({ type: Boolean, attribute: "scroll-body" }) scrollBody = true;

  // Cagiran bilesen bunu kendi toggle mantigina baglar, boylece toggle
  // butonunun `active` durumu ve harita/toolbar kaymasi da dogru sekilde
  // geri alinir.
  /** Panelin kendi kapatma (X) butonu tetiklendiğinde çağrılır. */
  @property({ attribute: false }) onCloseRequest: (() => void) | undefined;

  private readonly _customCssState: CustomCssState = { sheet: null };

  /** `customCss` değiştiğinde özel CSS'i shadow DOM'a yeniden uygular. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-slide-over-panel");
    }
  }

  private _close(): void {
    this.onCloseRequest?.();
  }

  override render() {
    return html`
      <aside
        class="panel ${this.open ? "open" : ""}"
        style="width: ${this.panelWidth}"
        ?inert=${!this.open}
        aria-hidden=${this.open ? nothing : "true"}
      >
        <div class="panel-header">
          <div class="panel-title">
            <slot name="icon"></slot>
            <span>${this.panelTitle}</span>
          </div>
          <button type="button" class="panel-close-btn" aria-label="Kapat" @click=${this._close}>
            ${ICON_CLOSE}
          </button>
        </div>
        <div class="panel-body" style="overflow-y: ${this.scrollBody ? "auto" : "visible"}">
          <slot></slot>
        </div>
      </aside>
    `;
  }
}
