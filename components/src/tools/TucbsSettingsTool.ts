import { LitElement, html, css, render, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { Settings16 as SettingsIcon } from "@carbon/icons";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { PanelLayoutController } from "../shared/ui/PanelLayoutController.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";
import "../shared/ui/SlideOverPanel.js";
import type { TucbsSlideOverPanel } from "../shared/ui/SlideOverPanel.js";
import "./TucbsBasemapPicker.js";
import "../app/TucbsQualityBar.js";

const ICON_SETTINGS = unsafeSVG(iconNodeToString(SettingsIcon));

// tucbs-basemap-picker/tucbs-quality-bar tek basina kullanildiklarinda
// haritanin uzerinde YUZEN (:host{position:fixed}) bagimsiz widget'lardir
// (tucbs-basemap-picker ayrica KENDI toggle butonunu/panelini de gosterir --
// bkz. TucbsBasemapPicker.embedded). Bu panelin icine gomduklerinde SADECE
// bu konumlanmayi (applyCustomCss ile, bkz. shared/util/CustomCss.ts)
// NOTRLESTIRIP panelin normal (flex) akisina ("static") birakiyoruz --
// KENDI govde suslerini (border/golge/radius/renk) ise HICBIR SEKILDE
// override ETMIYORUZ: ikisinin de KENDI varsayilan ".panel" karti
// (#fafcfd, kenarlik, golge) zaten Ayarlar panelindekiyle AYNI tasarim
// (bkz. TucbsBasemapPicker.ts ve TucbsQualityBar.ts'in kendi styles'i) --
// tek bir yerde tanimli, iki farkli CSS kopyasi bakim yuku YOK.
const EMBED_BASEMAP_CSS = `
  :host {
    position: static !important;
    inset: auto !important;
    z-index: auto !important;
  }
`;

const EMBED_QUALITY_CSS = `
  :host {
    position: static !important;
    inset: auto !important;
    z-index: auto !important;
  }
`;

/**
 * `tucbs-settings-tool`: harita AYARLARINI ("Altlık Haritalar" + "Harita
 * Kalitesi") tek bir toolbar butonunun actigi, sagdan sola kayarak acilan
 * tam-yukseklik bir panelde toplayan arac. `tucbs-toolbar` icinde bir arac
 * olarak (`tools="...,settings"`) kullanilabildigi gibi, diger tum
 * tucbs-*-tool bilesenleri gibi tek basina da embed edilebilir.
 *
 * Gercek panel govdesi paylasilan `tucbs-slide-over-panel`'dir (bkz. o
 * dosyanin WHY yorumu: `document.body`'ye PORTAL edilir, cunku
 * `tucbs-toolbar`'in bazi konumlarda kendi :host'una uyguladigi `transform`
 * fixed-position torunlar icin viewport DISINDA bir containing block
 * olusturuyordu). Icerik (basemap-picker + quality-bar), panelin light
 * DOM'una Lit'in `render()` fonksiyonuyla DOGRUDAN yazilir (bkz.
 * _renderIntoPanel()) -- boylece `.map=${...}` gibi property binding'ler
 * normal bir Lit template'indeki gibi calisir, tek fark hedefin bu
 * bilesenin KENDI shadow root'u degil, portal edilmis panelin light DOM'u
 * olmasidir.
 *
 * Panel acildiginda haritanin CESIUM CONTAINER'ini VE (varsa, bkz.
 * PanelLayoutController) ata `tucbs-toolbar`'i panel genisligi kadar sola
 * "iterek" yer acar -- kamera KONUMU/ACISI/ZOOM'u HICBIR SEKILDE
 * degistirilmez, sadece canvas'in fiziksel boyutu (dolayisiyla en-boy
 * orani) degisir.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-settings-tool mapElementId="map" panel-width="360px"></tucbs-settings-tool>
 * ```
 */
@customElement("tucbs-settings-tool")
export class TucbsSettingsTool extends LitElement {
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
  /** Baglanacak `tucbs-map` elementinin HTML `id`'si (opsiyonel). */

  @property() mapElementId = "";
  // Opsiyonel: tucbs-map elementinin ID'si. Diger tum tucbs-*-tool
  // bilesenleriyle ayni Senaryo 1/2 baglama deseni.

  /** Panelin genisligi (herhangi bir CSS boyut degeri, ör. "360px"). */

  @property({ attribute: "panel-width" }) panelWidth = "360px";
  // Panelin (ve haritanin/toolbar'in daralacagi/kayacagi miktarin)
  // genisligi. Herhangi bir CSS boyut degeri olabilir.

  /** Bu bilesenin KENDI (.tool-button) shadow DOM'una enjekte edilecek keyfi CSS metni. */

  @property({ attribute: "custom-css" }) customCss = "";
  // Tuketicinin, bu bilesenin KENDI (.tool-button) shadow DOM'una enjekte
  // edebilecegi keyfi CSS metni. Panelin KENDI gorunumu icin
  // tucbs-slide-over-panel'in kendi custom-css'i (varsa) ayrica verilmelidir.

  // === JS-only Properties (canli referans, attribute olarak set edilemez) ===
  /** Core JS API `Map` instance referansi; ayarlar panelinin baglanacagi harita. */

  @property({ attribute: false }) map: TucbsMapInstance | undefined;
  // Core JS API Map instance'i. tucbs-toolbar icinde kullanildiginda
  // container tarafindan property binding ile atanir (Senaryo 1),
  // mapElementId ile de otomatik baglanir (Senaryo 2).

  @state() private _open = false;

  private readonly _layoutController = new PanelLayoutController(this);
  private _panelEl: TucbsSlideOverPanel | null = null;
  private readonly _customCssState: CustomCssState = { sheet: null };

  /**
   * Lit yasam dongusu: bilesen DOM'a baglandiginda paylasilan
   * `tucbs-slide-over-panel`'i olusturup `document.body`'ye portal eder,
   * baslik/genislik/kapatma callback'ini ayarlar ve ilk icerigi panele render eder.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    // Ayni tarafta (right) baska bir arac (ör. Yazdır/Analiz) acilirsa bu
    // panel de kapatilsin -- bkz PanelLayoutController.onExclusiveClose WHY yorumu.
    this._layoutController.onExclusiveClose = () => {
      if (this._open) this._toggle();
    };
    const panel = document.createElement("tucbs-slide-over-panel") as TucbsSlideOverPanel;
    panel.panelTitle = "Ayarlar";
    panel.panelWidth = this.panelWidth;
    panel.onCloseRequest = () => this._toggle();
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._renderIntoPanel();
  }

  /**
   * Lit yasam dongusu: bilesen DOM'dan kaldirildiginda haritadan/layout
   * controller'dan ayrilir ve portal edilmis paneli DOM'dan kaldirir.
   */
  override disconnectedCallback(): void {
    if (this.map) this._layoutController.unbindMap(this.map);
    this._panelEl?.remove();
    this._panelEl = null;
    super.disconnectedCallback();
  }

  // === Yasam Dongusu: Map baglama ===
  /**
   * Lit yasam dongusu: ilk render sonrasi haritaya baglanir -- `map`
   * property binding ile zaten atanmissa (Senaryo 1) hicbir sey yapmaz,
   * aksi halde `mapElementId` ile referans verilen `tucbs-map` elementini
   * bulup (varsa `ready` event'ini bekleyerek) `map`'i atar (Senaryo 2).
   */
  override firstUpdated(): void {
    // "sync": bu arac "mapElementId yok" uyarisini diger araclardan farkli
    // olarak bir kare ERTELEMEDEN basar (mevcut davranis, bkz
    // tools.mapBinding.characterization.test).
    bindMapByElementId(this, {
      noIdTiming: "sync",
      ...standardMapBindingMessages("tucbs-settings-tool", "islevsiz"),
    });
  }

  /**
   * Lit yasam dongusu: `customCss` degistiginde shadow DOM'a yeniden uygular,
   * `map` degistiginde layout controller'in bind/unbind islemlerini yapar,
   * `panelWidth` degisip panel aciksa yeni genisligi uygular ve panelin
   * icerigini (basemap-picker/quality-bar) yeniden render eder.
   *
   * @param changed - Degisen property'leri iceren Lit `PropertyValues` haritasi.
   */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-settings-tool");
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
    // tucbs-slide-over-panel'in ".panel-body"si zaten dikey flex + gap
    // (bkz. SlideOverPanel.ts) -- burada ayrica bir sarmalayici/divider
    // div'e gerek yok, iki dogrudan cocuk KENDI kart govdeleriyle
    // otomatik araliklanir.
    render(
      html`
        <span slot="icon">${ICON_SETTINGS}</span>
        <tucbs-basemap-picker
          .map=${this.map}
          .embedded=${true}
          custom-css=${EMBED_BASEMAP_CSS}
        ></tucbs-basemap-picker>
        <tucbs-quality-bar .map=${this.map} custom-css=${EMBED_QUALITY_CSS}></tucbs-quality-bar>
      `,
      this._panelEl,
    );
  }

  private _toggle(): void {
    // Diger toolbar araclariyla (TucbsZoomTool/TucbsDrawTool/vb.) AYNI
    // desen: map yoksa buton GORUNMEYE devam eder ama tiklama sessizce
    // no-op olur -- boylece bos bir panel ACILMAZ (eskiden butona
    // tiklaninca panel aciliyor, icindeki embedded basemap-picker/
    // quality-bar ise map olmadigi icin bomboş kaliyordu).
    if (!this.map) return;
    this._open = !this._open;
    this._layoutController.setOpen(this._open, this.panelWidth);
    this._renderIntoPanel();
  }

  /** Toolbar butonunu render eder; tiklaninca ayarlar panelini acip kapatir. */
  override render() {
    return html`
      <button
        type="button"
        class="tool-button ${this._open ? "active" : ""}"
        aria-label="Ayarlar"
        data-tooltip="Ayarlar"
        aria-pressed=${this._open}
        @click=${this._toggle}
      >
        ${ICON_SETTINGS}
      </button>
    `;
  }
}
