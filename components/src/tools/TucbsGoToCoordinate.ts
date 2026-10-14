import { LitElement, html, css, render, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "@carbon/web-components/es/components/text-input/index.js";
import { Location16 as LocationIcon } from "@carbon/icons";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";
import { PanelLayoutController } from "../shared/ui/PanelLayoutController.js";
import "../shared/ui/SlideOverPanel.js";
import type { TucbsSlideOverPanel } from "../shared/ui/SlideOverPanel.js";
import { GOTO_COORDINATE_PIN_URL, GOTO_COORDINATE_PIN_OPTIONS } from "../assets/gotoCoordinatePin.js";

const ICON_LOCATION = unsafeSVG(iconNodeToString(LocationIcon));

// Panel icerigi tucbs-slide-over-panel'in LIGHT DOM'una (document'in kendisi)
// render edildigi icin (bkz _renderIntoPanel) bu bilesenin shadow stilleri
// oraya ULASMAZ -- stiller icerikle birlikte bir <style> olarak basilir ve
// diger sayfa elementlerine SIZMAMASI icin tamamen `.tucbs-goto-*` onekli.
const PANEL_CONTENT_STYLES = `
  .tucbs-goto-field-label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.75rem;
  }

  .tucbs-goto-card cds-text-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--cds-border-strong-01, #8d8d8d);
    border-radius: 4px;
  }

  .tucbs-goto-card cds-text-input:focus-within {
    border-color: var(--cds-interactive, #0f62fe);
  }

  .tucbs-goto-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .tucbs-goto-error {
    font-size: 0.75rem;
    color: var(--cds-text-error, #da1e28);
  }

  .tucbs-goto-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    border: none;
    border-radius: 4px;
    background: var(--cds-interactive, #0f62fe);
    color: #ffffff;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
  }

  .tucbs-goto-submit:hover:not(:disabled) {
    background: var(--cds-button-primary-hover, #0353e9);
  }

  .tucbs-goto-submit:disabled {
    background: var(--cds-button-disabled, #c6c6c6);
    color: var(--cds-text-on-color-disabled, #8d8d8d);
    cursor: not-allowed;
  }
`;

/**
 * `tucbs-goto-coordinate`: toolbar butonuna basinca (Ayarlar gibi) sagdan
 * kayarak acilan paylasilan `tucbs-slide-over-panel` icinde Enlem/Boylam
 * formunu gosteren, girilen koordinata kamerayi animasyonla goturup
 * haritaya pin dusuren arac. Panel acilinca haritayi (ve varsa toolbar'i)
 * panel genisligi kadar iter (bkz. PanelLayoutController); ayni tarafta
 * baska bir panel (Ayarlar/Analiz/Yazdir) acilirsa kapanir. Diger tum
 * tucbs-*-tool bilesenleri gibi `tucbs-toolbar` icinde
 * (`tools="...,goto-coordinate"`) kullanilabildigi gibi tek basina da embed
 * edilebilir.
 *
 * @fires tucbs-goto-coordinate-closed - Panel kapandiginda tetiklenir
 *   (kapat butonu, tekrar buton tiklamasi ya da baska panelin acilmasi);
 *   detay yok.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-goto-coordinate mapElementId="map"></tucbs-goto-coordinate>
 * ```
 */
@customElement("tucbs-goto-coordinate")
export class TucbsGoToCoordinate extends LitElement {
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
  /** Opsiyonel: tucbs-map elementinin ID'si (Senaryo 2 baglama). */
  @property() mapElementId = "";

  /** Panelin genisligi (herhangi bir CSS boyut degeri, ör. "360px"). */
  @property({ attribute: "panel-width" }) panelWidth = "360px";

  /** Bilesenin `.tool-button` shadow DOM'una enjekte edilecek serbest bicimli CSS metni. */

  // Tuketicinin, bu bilesenin KENDI (.tool-button) shadow DOM'una enjekte
  // edebilecegi keyfi CSS metni. Panelin KENDI gorunumu icin
  // tucbs-slide-over-panel'in custom-css'i ayrica gerekir (bkz.
  // TucbsSettingsTool ile ayni kisit).
  @property({ attribute: "custom-css" }) customCss = "";

  // === JS-only Properties (canli referans, attribute olarak set edilemez) ===
  /** Core JS API `Map` instance referansi; Senaryo 1'de property binding ile, Senaryo 2'de otomatik atanir. */

  // Core JS API Map instance'i. tucbs-toolbar icinde kullanildiginda
  // container tarafindan property binding ile atanir (Senaryo 1),
  // mapElementId ile de otomatik baglanir (Senaryo 2).
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  @state() private _open = false;
  @state() private _lat = "";
  @state() private _lon = "";

  private readonly _layoutController = new PanelLayoutController(this);
  private _panelEl: TucbsSlideOverPanel | null = null;
  private readonly _customCssState: CustomCssState = { sheet: null };

  // === Yasam Dongusu ===

  /** Paylasilan slide-over paneli olusturup `document.body`'ye portal eder (bkz. SlideOverPanel.ts WHY yorumu). */
  override connectedCallback(): void {
    super.connectedCallback();
    // Ayni tarafta (right) baska bir panel (Ayarlar/Analiz/Yazdir) acilirsa
    // bu panel de kapansin -- bkz PanelLayoutController.onExclusiveClose.
    this._layoutController.onExclusiveClose = () => {
      if (this._open) this._close();
    };
    const panel = document.createElement("tucbs-slide-over-panel") as TucbsSlideOverPanel;
    panel.panelTitle = "Koordinata Git";
    panel.panelWidth = this.panelWidth;
    panel.onCloseRequest = () => this._close();
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._renderIntoPanel();
  }

  /** Haritadan/layout controller'dan ayrilir, pin'i temizler ve portal edilmis paneli kaldirir. */
  override disconnectedCallback(): void {
    if (this.map) this._layoutController.unbindMap(this.map);
    this.map?.clearMarker();
    this._panelEl?.remove();
    this._panelEl = null;
    super.disconnectedCallback();
  }

  /** Ilk render sonrasi `map`i (programatik atanmadiysa) `mapElementId` uzerinden haritaya baglar. */
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-goto-coordinate", "islevsiz"),
    });
  }

  /** `customCss`/`map`/`panelWidth` degisimlerini isler ve panel icerigini yeniden render eder. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-goto-coordinate");
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

  private _toggle(): void {
    // Diger toolbar araclariyla AYNI desen: map yoksa tiklama sessizce
    // no-op -- bos/islevsiz bir panel ACILMAZ.
    if (!this.map) return;
    if (this._open) this._close();
    else this._openPanel();
  }

  private _openPanel(): void {
    this._open = true;
    this._layoutController.setOpen(true, this.panelWidth);
    this._renderIntoPanel();
  }

  private _close(): void {
    this._open = false;
    this._layoutController.setOpen(false, this.panelWidth);
    // Kullanici bildirimi: "diyalog kapandığında pin kaldırılacak".
    this.map?.clearMarker();
    // Kullanici bildirimi: "butona tekrar tıkladığımda diyalog açıldığında
    // field'lar sıfırlanmış olsun" -- bir sonraki acilis bos degerlerle render eder.
    this._lat = "";
    this._lon = "";
    this._renderIntoPanel();
    this.dispatchEvent(new CustomEvent("tucbs-goto-coordinate-closed", { bubbles: true, composed: true }));
  }

  private _isValid(lat: number, lon: number): boolean {
    return Number.isFinite(lat) && lat >= -90 && lat <= 90 && Number.isFinite(lon) && lon >= -180 && lon <= 180;
  }

  // StyleEditor'daki Min/Max alanlarinin ayni sanitizasyon deseni (bkz
  // TucbsStyleEditor._sanitizeNumericInput yorumu): rakam disi HERHANGI bir
  // karakter aninda temizlenir, en fazla tek "-" (basta) ve tek ondalik
  // ayirici kabul edilir. Ondalik ayirici nokta VEYA virgul olabilir
  // ("39.925" ve "39,925" -- Turkce klavye/yerel); ilk yazilan korunur,
  // sonrakiler atilir. cds-text-input duz bir metin kutusu oldugundan
  // (cds-number-input'un aksine) `.value` her tus vurusunda guncellenebilir --
  // Carbon'un deger'i yeniden yazip kullanicinin yazdigini bozma riski YOK.
  private static _sanitizeCoordinateInput(raw: string): string {
    const negative = raw.trimStart().startsWith("-");
    const digits = raw.replace(/[^0-9.,]/g, "");
    const sepIndex = digits.search(/[.,]/);
    const cleaned =
      sepIndex === -1
        ? digits
        : digits.slice(0, sepIndex + 1) + digits.slice(sepIndex + 1).replaceAll(/[.,]/g, "");
    return (negative ? "-" : "") + cleaned;
  }

  // Virgullu girisi sayiya cevirir; bos alan NaN (eskiden Number("") === 0
  // oldugundan bos formda "Git" 0,0'a gidebiliyordu).
  private static _parseCoordinate(text: string): number {
    return text.trim() === "" ? Number.NaN : Number(text.replace(",", "."));
  }

  private _handleCoordInput(event: Event, field: "lat" | "lon"): void {
    const target = event.target as HTMLInputElement;
    const sanitized = TucbsGoToCoordinate._sanitizeCoordinateInput(target.value);
    if (target.value !== sanitized) target.value = sanitized;
    if (field === "lat") this._lat = sanitized;
    else this._lon = sanitized;
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") this._submit();
  }

  private _submit(): void {
    const lat = TucbsGoToCoordinate._parseCoordinate(this._lat);
    const lon = TucbsGoToCoordinate._parseCoordinate(this._lon);
    if (!this._isValid(lat, lon) || !this.map) return;

    // Yukseklik ACIKCA 1000m'ye sabitlenir (kullanici bildirimi: "1000m
    // iyiymiş, Google Maps'in bir koordinat arattığında yaptığı zoom
    // neyse onu koyalım"). Google'in "yakin/haritalar zoom seviyesi <->
    // kamera yuksekligi" donusumunde yaygin kullanilan formul
    // (h = 591657550.5 / 2^zoom) ile z=19 (Google'in duz bir "lat,lon"
    // aramasinda -- adres/POI DEGIL -- tipik olarak kullandigi yakinlik)
    // ~1128m veriyor; InteractionManager.flyToPosition'in kendi varsayilani
    // (1000m) da zaten bu araliga cok yakin -- bu yuzden burada ACIKCA
    // ayni deger yazilir (ONCEKI 5000m denemesi FAZLA uzak hissettirmisti).
    // Sure ACIKCA 1.5sn'ye sabitlenir -- Cesium'un mesafeye gore otomatik
    // hesapladigi varsayilan (~3sn'ye kadar) kullanici bildirimine gore
    // ("süreyi düşürelim") FAZLA uzun hissettiriyordu.
    // Pin: gri daire + beyaz halka icinde beyaz sivri uclu pin
    // (ayri cizim) (bkz. assets/gotoCoordinatePin.ts) -- yuksek cozunurluklu PNG,
    // 32x32px'e kucultulerek gosterilir (yuksek DPI'da keskin).
    this.map.dropMarker(lon, lat, GOTO_COORDINATE_PIN_URL, GOTO_COORDINATE_PIN_OPTIONS);
    this.map.interactionManager.flyToPosition(lon, lat, { height: 1000, duration: 1.5 });
  }

  private _renderIntoPanel(): void {
    if (!this._panelEl) return;
    this._panelEl.open = this._open;

    const lat = TucbsGoToCoordinate._parseCoordinate(this._lat);
    const lon = TucbsGoToCoordinate._parseCoordinate(this._lon);
    const valid = this._isValid(lat, lon);
    const showError = (this._lat !== "" || this._lon !== "") && !valid;

    render(
      html`
        <style>
          ${PANEL_CONTENT_STYLES}
        </style>
        <span slot="icon">${ICON_LOCATION}</span>
        <div class="tucbs-goto-card">
          <div>
            <span class="tucbs-goto-field-label">Enlem</span>
            <cds-text-input
              size="sm"
              label="Enlem"
              hide-label
              placeholder="ör. 39.925 veya 39,925"
              .value=${this._lat}
              @input=${(event: Event) => this._handleCoordInput(event, "lat")}
              @keydown=${(event: KeyboardEvent) => this._handleKeydown(event)}
            ></cds-text-input>
          </div>
          <div>
            <span class="tucbs-goto-field-label">Boylam</span>
            <cds-text-input
              size="sm"
              label="Boylam"
              hide-label
              placeholder="ör. 32.854 veya 32,854"
              .value=${this._lon}
              @input=${(event: Event) => this._handleCoordInput(event, "lon")}
              @keydown=${(event: KeyboardEvent) => this._handleKeydown(event)}
            ></cds-text-input>
          </div>
          ${showError
            ? html`<span class="tucbs-goto-error">Enlem -90..90, Boylam -180..180 aralığında olmalı</span>`
            : ""}
          <button type="button" class="tucbs-goto-submit" ?disabled=${!valid} @click=${() => this._submit()}>
            Git
          </button>
        </div>
      `,
      this._panelEl,
    );
  }

  /** Toolbar'daki dairesel "Koordinata Git" butonunu render eder. */
  override render() {
    return html`
      <button
        type="button"
        class="tool-button ${this._open ? "active" : ""}"
        aria-label="Koordinata Git"
        data-tooltip="Koordinata Git"
        aria-pressed=${this._open}
        @click=${this._toggle}
      >
        ${ICON_LOCATION}
      </button>
    `;
  }
}
