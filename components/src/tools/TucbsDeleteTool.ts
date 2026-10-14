import "@carbon/web-components/es/components/notification/index.js";

import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { TrashCan16 as TrashCanIcon } from "@carbon/icons";
import { Map as TucbsMapInstance } from "@tucbs/core";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";

const ICON_TRASH_CAN = unsafeSVG(iconNodeToString(TrashCanIcon));

/**
 * Cizilen TUM sekilleri (nokta/cizgi/alan/dikdortgen/daire/serbest-cizim) VE
 * ileride yazilacak olcum araci sonuclarini (v1 SS5 karari geregi
 * `DrawingManager`'in ayni `polyline`/`polygon` araclarini yeniden kullanacagi
 * icin AYNI `shapes` deposunda tutulacak) tek bir aksiyonla siler. `tucbs-toolbar`
 * icinde bir arac olarak kullanilabildigi gibi, toolbar disinda tek basina da
 * embed edilebilir (TucbsZoomTool ile ayni konvansiyon).
 *
 * Geri alinamaz bir eylem oldugu icin tek tiklamada SILMEZ -- `cds-actionable-
 * notification` (kind="warning") ile bir onay gosterilir, sadece bildirimin
 * eylem butonuna tiklanirsa gercek silme gerceklesir.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-delete-tool mapElementId="map"></tucbs-delete-tool>
 * ```
 */
@customElement("tucbs-delete-tool")
export class TucbsDeleteTool extends LitElement {
  static override readonly styles = [
    leftTooltipStyles,
    css`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .delete-tool {
      position: relative;
      display: inline-flex;
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

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }

    .confirm {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      width: 18rem;
    }

    /* cds-actionable-notification-button kendi boyutunu daima size="sm" olarak
       zorluyor (bkz. Carbon kaynak kodu); daha kucuk gorunmesi icin kendi
       ::part(button)'ini burada override ediyoruz. */
    cds-actionable-notification-button::part(button) {
      font-size: 0.75rem;
      padding-block: 0.25rem;
      padding-inline: 0.75rem;
      min-block-size: auto;
    }
  `,
  ];

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  /** Baglanilacak `tucbs-map` elementinin HTML id'si (Senaryo 2 - otomatik baglama); opsiyoneldir. */
  @property() mapElementId = "";

  /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni (bkz. ./internal/CustomCss.ts). */
  @property({ attribute: "custom-css" }) customCss = "";

  // === JS-only Properties (canli referans, attribute olarak set edilemez) ===
  /** Core JS API `Map` referansi. */

  // tucbs-toolbar icinde kullanildiginda container bunu property binding ile
  // dogrudan atar (Senaryo 1); tek basina kullanildiginda mapElementId ile
  // otomatik baglanir (Senaryo 2).
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  // === Internal State ===
  @state() private _confirming = false;

  private readonly _customCssState: CustomCssState = { sheet: null };

  /** `customCss` degistiginde shadow DOM'a yeniden uygular. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-delete-tool");
    }
  }

  // === Yasam Dongusu: Map baglama ===
  /** `mapElementId` ile eslesen elementten `map` referansini alir (henuz `map` atanmamissa). */
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-delete-tool", "islevsiz"),
    });
  }

  private _openConfirm(): void {
    // Cizim yoksa silinecek bir sey yok -- uyari bildirimi hic acilmasin.
    if ((this.map?.drawingManager.getShapes().length ?? 0) === 0) return;
    this._confirming = true;
  }

  private _cancel(): void {
    this._confirming = false;
  }

  private _confirmDelete(): void {
    const drawingManager = this.map?.drawingManager;
    this._confirming = false;
    if (!drawingManager) return;
    // Devam eden bir cizim/olcum oturumu varsa once onu iptal et (yarim kalan
    // gecici vertex/onizleme entity'lerini temizler, kamera kilidini acar),
    // sonra tamamlanmis TUM sekilleri sil.
    if (drawingManager.isActive()) drawingManager.deactivate();
    drawingManager.clearAll();
  }

  /** Sil butonunu ve (`_confirming` true iken) onay bildirimini render eder. */
  override render() {
    return html`
      <div class="delete-tool">
        ${this._confirming
          ? html`
              <cds-actionable-notification
                class="confirm"
                kind="warning"
                title="Tüm çizimler kalıcı olarak silinecektir. Emin misiniz?"
                action-button-label="Sil"
                @cds-notification-closed=${this._cancel}
              >
                <cds-actionable-notification-button slot="action" @click=${this._confirmDelete}>
                  Sil
                </cds-actionable-notification-button>
              </cds-actionable-notification>
            `
          : null}
        <button
          class="tool-button"
          type="button"
          data-tooltip="Tümünü Sil"
          aria-label="Tümünü Sil"
          @click=${this._openConfirm}
        >
          ${ICON_TRASH_CAN}
        </button>
      </div>
    `;
  }
}
