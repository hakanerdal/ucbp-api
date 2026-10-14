import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { Download16 as DownloadIcon } from "@carbon/icons";
import { Map as TucbsMapInstance } from "@tucbs/core";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";

const ICON_DOWNLOAD = unsafeSVG(iconNodeToString(DownloadIcon));

/**
 * O anki harita goruntusunu (kamera + tum entity/feature'lar, UI butonlari
 * HARIC) JPEG olarak indirir. Yakalama/indirme mantigi `@tucbs/core`'da
 * (`Map.exportJPEG()`, tucbs-react RecordToolPanel.tsx'ten porte edildi) --
 * bu component sadece ince bir tetikleyici buton. `tucbs-toolbar` icinde bir
 * arac olarak kullanilabildigi gibi, toolbar disinda tek basina da embed
 * edilebilir (TucbsZoomTool ile ayni konvansiyon).
 *
 * v14/v8 dokumanlarindaki genis kapsamli tasarim (format secimi, yazdirma
 * gorunumu, mail gonderme, GeoTIFF) BILEREK kapsam disi -- bu turde SADECE
 * JPG indirme. Yazdirma gorunumu sonraki bir surumde ayri bir `TucbsPrintTool`
 * olarak eklenecek.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-map-export mapElementId="map" filename="harita"></tucbs-map-export>
 * ```
 */
@customElement("tucbs-map-export")
export class TucbsMapExport extends LitElement {
  static override readonly styles = [
    leftTooltipStyles,
    css`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
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

    .tool-button:hover:not(:disabled) {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button:disabled {
      cursor: progress;
      opacity: 0.6;
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

  /** Indirilen dosyanin adi (uzantisiz). */

  // Map.exportJPEG() sonuna otomatik `-${Date.now()}.jpg` ekler (v14 SS4.14
  // ile ayni konvansiyon).
  @property() filename = "tucbs-harita";

  /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni. Bkz. ./internal/CustomCss.ts. */
  @property({ attribute: "custom-css" }) customCss = "";

  // === JS-only Properties ===

  /** Senaryo 2: `mapElementId` uzerinden otomatik cozulur; ayrica programatik olarak da atanabilir. Baglanti kurulana kadar bilesen islevsiz kalir. */
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  // === Internal State ===
  @state() private _busy = false;

  private readonly _customCssState: CustomCssState = { sheet: null };

  /** `customCss` degistiginde shadow DOM'a enjekte edilen ozel stili gunceller. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-map-export");
    }
  }

  // === Yasam Dongusu: Map baglama (Zoom/Draw/Delete ile ayni desen) ===
  /** `mapElementId` uzerinden (veya `ready` olayini bekleyerek) `map` referansini coze; hicbiri saglanmazsa uyari loglar. */
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-map-export", "islevsiz"),
    });
  }

  private async _onClick(): Promise<void> {
    if (this._busy || !this.map) return;
    this._busy = true;
    try {
      await this.map.exportJPEG(this.filename);
    } finally {
      this._busy = false;
    }
  }

  /** Bilesenin indirme dugmesini (JPG ikonu) render eder. */
  override render() {
    return html`
      <button
        class="tool-button"
        type="button"
        aria-label="Haritayı İndir (JPG)"
        data-tooltip="Haritayı İndir (JPG)"
        ?disabled=${this._busy}
        @click=${this._onClick}
      >
        ${ICON_DOWNLOAD}
      </button>
    `;
  }
}
