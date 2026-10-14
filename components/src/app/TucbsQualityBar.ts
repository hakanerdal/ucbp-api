import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { Meter16 as MeterIcon } from "@carbon/icons";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { TimerBag } from "../shared/util/TimerBag.js";

const ICON_METER = unsafeSVG(iconNodeToString(MeterIcon));

/**
 * Harita render kalitesi/performans dengesini ayarlamak icin surgulu (slider)
 * kontrol paneli. Baglandigi Map instance'inin GUNCEL kalitesini
 * (viewer.resolutionScale) okuyarak baslar ve kullanici surukledikce
 * `map.setQuality()` cagirir (bkz. _onSliderInput, _syncFromMap).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-quality-bar mapElementId="map" position="bottom-right"></tucbs-quality-bar>
 * ```
 */
@customElement("tucbs-quality-bar")
export class TucbsQualityBar extends LitElement {
  static override readonly styles = css`
    :host {
      position: fixed;
      z-index: 950;
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.75rem;
    }

    /* TucbsInfoBar varsayilan olarak alt kenarda 28px yukseklikte sabit
       durur; "bottom-left"/"bottom-right" bu bar'in ustunde kalacak sekilde
       28px + bosluk kadar yukariya tasinir. */
    :host([position="bottom-left"]) {
      left: 0.75rem;
      bottom: calc(28px + 0.5rem);
    }

    :host([position="bottom-right"]) {
      right: 0.75rem;
      bottom: calc(28px + 0.5rem);
    }

    :host([position="top-left"]) {
      left: 0.75rem;
      top: 0.75rem;
    }

    :host([position="top-right"]) {
      right: 0.75rem;
      top: 0.75rem;
    }

    .panel {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      min-width: 240px;
      padding: 1rem;
      background: #fafcfd;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      color: var(--cds-text-primary, #161616);
    }

    .header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .title {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      line-height: 0;
      color: #0f62fe;
    }

    .title-icon svg {
      width: 1rem;
      height: 1rem;
      display: block;
    }

    .value-badge {
      font-weight: 700;
      font-size: 0.875rem;
      color: #0f62fe;
    }

    /* Deger, native <input>'in KENDI "--fill" custom property'siyle (bkz.
       TucbsLayerList'teki katman opaklik bar'i, AYNI desen) aninda -- Lit
       re-render'ina UGRAMADAN -- gorsellestirilir; surukleme sirasinda
       gercek yan etkiler (map.setQuality() + _quality state'i) RAF ile
       frame basina en fazla bir kez uygulanir (bkz. _onSliderInput). Bu,
       Carbon'un cds-slider'inin (denendi, geri alindi) hem surukleme
       jank'ine hem de RTL'de deger<->gorsel-konum tutarsizligina
       (slider.js: thumb HER ZAMAN fiziksel "left:rate%" ile cizilir, "isRtl"
       SADECE pointer->deger hesabini etkiler) yol acmasindan TAMAMEN
       kacinir. */
    .quality-slider {
      display: block;
      width: 100%;
      height: 4px;
      margin: 0;
      appearance: none;
      border-radius: 2px;
      background: linear-gradient(
        to right,
        #0f62fe 0%,
        #0f62fe var(--fill, 75%),
        var(--cds-border-subtle, #e0e0e0) var(--fill, 75%),
        var(--cds-border-subtle, #e0e0e0) 100%
      );
      cursor: pointer;
    }

    .quality-slider::-webkit-slider-thumb {
      width: 14px;
      height: 14px;
      appearance: none;
      border-radius: 50%;
      background: #0f62fe;
      cursor: pointer;
    }

    .quality-slider::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border: none;
      border-radius: 50%;
      background: #0f62fe;
      cursor: pointer;
    }

    .quality-labels {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--cds-text-secondary, #525252);
    }

    .quality-labels .center {
      color: var(--cds-text-placeholder, #a8a8a8);
    }
  `;

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  /** Baglanilacak `tucbs-map` elementinin id'si (opsiyonel). */

  // TucbsBasemapPicker'daki ayni desenle (Senaryo 1/2A/2B) InteractionManager
  // degil, Map instance'ina baglanir.
  @property() mapElementId = "";

  /** Bar'in harita uzerindeki konumu. Varsayilan `"bottom-left"`. */

  // Varsayilan sol-alt, TucbsInfoBar'in (varsa) ustunde kalacak sekilde
  // konumlanir; kullanici haritada baska bir yere koymak isterse bu
  // attribute/property ile degistirilebilir.
  @property({ reflect: true }) position: "bottom-left" | "bottom-right" | "top-left" | "top-right" =
    "bottom-left";

  /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni (bkz. ./internal/CustomCss.ts). */
  @property({ attribute: "custom-css" }) customCss = "";

  // === JS-only Properties (canli referans, attribute olarak set edilemez) ===
  /** Core JS API `Map` instance referansi. */

  // tucbs-map: property binding ile de gelir (Senaryo 1), mapElementId ile
  // de otomatik baglanir (Senaryo 2).
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  private readonly _customCssState: CustomCssState = { sheet: null };

  @state() private _quality = 75;
  // Slider'in gosterdigi deger. Map baglaninca haritanin GUNCEL kalitesinden
  // (viewer.resolutionScale) okunur; boylece tucbs-map'in kendi "quality"
  // attribute'u ile senkron baslar (bkz. _syncFromMap). Sabit varsayilan: 75.
  // 0 (Performans) solda, 100 (Kalite) sagda -- deger DOGRUDAN kalite
  // yuzdesine esittir.

  private _qualityRaf: number | null = null;
  // Slider suruklemesi sirasinda map.setQuality() (ve tetikledigi Cesium
  // render'i) frame basina en fazla bir kez cagrilir.
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  /** Bekleyen RAF (kalite guncelleme) varsa iptal eder, ardindan super'i cagirir. */
  override disconnectedCallback(): void {
    // ESKIDEN _qualityRaf burada cancelAnimationFrame ile elle iptal
    // ediliyordu; artik _timers (TimerBag) super.disconnectedCallback()
    // icinde (hostDisconnected) iptal ediyor. Override, API referansindaki
    // Turkce aciklama (Lit'in Ingilizce miras aciklamasi yerine) korunsun
    // diye duruyor.
    super.disconnectedCallback();
  }

  // === Yasam Dongusu: Map baglama ===
  /** Map instance'ina baglanir: property binding (Senaryo 1) veya `mapElementId` (Senaryo 2A/2B) uzerinden. */
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-quality-bar", "gizli"),
    });
  }

  /** `customCss` degisince ozel CSS'i yeniden uygular; `map` degisince bar'i haritanin guncel kalitesinden senkronlar. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-quality-bar");
    }

    if (changed.has("map") && this.map) this._syncFromMap(this.map);
  }

  private _syncFromMap(map: TucbsMapInstance): void {
    // tucbs-map'in kendi "quality" attribute'u artik firstUpdated()'da
    // ACIKCA uygulaniyor (bkz. TucbsMap.ts setQuality cagrisi) -- bu yuzden
    // burada bar'in kendi sabit varsayilanini haritaya YAZMAK yerine,
    // haritanin GUNCEL kalitesini (viewer.resolutionScale) OKUYUP bar'i ona
    // gore baslatiyoruz. Eskiden bu bilesen her bağlandığında haritanin
    // mevcut kalitesini (ör. quality="70" attribute'unu) sessizce 75'e
    // gecersiz kiliyordu -- artik sadece GORUNTULUYOR, degistirmiyor.
    this._quality = Math.round(map.viewer.resolutionScale * 100);
  }

  private _onSliderInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    input.style.setProperty("--fill", `${value}%`);
    this._timers.cancelAnimationFrame(this._qualityRaf);
    this._qualityRaf = this._timers.requestAnimationFrame(() => {
      this._qualityRaf = null;
      this._quality = value;
      this.map?.setQuality(value);
    });
  }

  /** Map baglanmadiysa `nothing` (bilesen gizli); baglandiysa kalite surgulu panelini cizer. */
  override render() {
    // Haritaya baglanmadiysa (mapElementId verilmedi/bulunamadi ve map
    // programatik atanmadi) bilesen tamamen gizli kalir.
    if (!this.map) return nothing;
    return html`
      <div class="panel">
        <div class="header-row">
          <span class="title"><span class="title-icon">${ICON_METER}</span>Harita Kalitesi</span>
          <span class="value-badge">%${this._quality}</span>
        </div>
        <input
          type="range"
          class="quality-slider"
          min="0"
          max="100"
          step="5"
          .value=${String(this._quality)}
          style="--fill: ${this._quality}%"
          @input=${this._onSliderInput}
        />
        <div class="quality-labels">
          <span>← Performans</span>
          <span class="center">Varsayılan</span>
          <span>Kalite →</span>
        </div>
      </div>
    `;
  }
}
