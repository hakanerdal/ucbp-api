import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "@carbon/web-components/es/components/checkbox/index.js";
import "../shared/ui/TooltipPortal.js";
import type { TucbsTooltipPortal } from "../shared/ui/TooltipPortal.js";
import { TucbsError } from "@tucbs/core";
import type { AuthorizedLayerInfo, LayerManager } from "@tucbs/core";
import { authorizedLayersStyles } from "./authorizedLayersStyles.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { showToast } from "../shared/ui/toast.js";
import { beginBusy, endBusy } from "../shared/util/busy.js";
import { iconNodeToString, type CarbonIconNode } from "../shared/util/CarbonIcon.js";
import { DraggablePanelController } from "../shared/ui/DraggablePanelController.js";
import { ApiKey20 as ApiKeyIcon, Close16 as CloseIcon, Link16 as LinkIcon } from "@carbon/icons";

function carbonIcon(node: CarbonIconNode) {
  return unsafeSVG(iconNodeToString(node));
}

const ICON_API_KEY = carbonIcon(ApiKeyIcon);
const ICON_CLOSE = carbonIcon(CloseIcon);
const ICON_LINK = carbonIcon(LinkIcon);

/**
 * `TucbsLayerList`'in "Yetkili Katmanlar" (apiKey ile `GET /layers` → seç →
 * haritaya ekle) bloğunu barındıran bağımsız, `document.body`'ye portallanan
 * bileşen (bkz. God Component kılavuzu GC-03 4.4 Adım 3).
 *
 * `<tucbs-layer-list>`'in `layer-list/PortalHost.ts` üzerinden `ensure()`'ladığı
 * bir kopya olarak kullanılır; tüketicinin HTML'inde bir `<tucbs-authorized-layers>`
 * "çıplak marker" etiketi bulunmadıkça hiç oluşturulmaz (bkz TucbsLayerList.ts'teki
 * `_authorizedLayersAvailable` alanı).
 *
 * @example
 * ```html
 * <tucbs-authorized-layers></tucbs-authorized-layers>
 * ```
 */
@customElement("tucbs-authorized-layers")
export class TucbsAuthorizedLayers extends LitElement {
  static override readonly styles = authorizedLayersStyles;

  /** Core JS API `LayerManager` referansı — `TucbsLayerList` tarafından senkronlanır. */
  @property({ attribute: false }) layerManager: LayerManager | undefined;

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  private readonly _customCssState: CustomCssState = { sheet: null };

  @state() private _authorizedLayersLoading = false;
  @state() private _authorizedPickerOpen = false;
  @state() private _authorizedItems: AuthorizedLayerInfo[] = [];
  @state() private _authorizedSelectedKeys: string[] = [];
  @state() private _authorizedFetchError = "";
  @state() private _authorizedAddError = "";
  @state() private _tokenUrlDialogOpen = false;
  @state() private _tokenUrlDialogValue = "";
  @state() private _tokenUrlDialogTitle = "";

  /** Picker açık mı (dışarıdan, ör. karşılıklı-dışlama için okunur). */
  get open(): boolean {
    return this._authorizedPickerOpen;
  }

  // Bu bilesen kendi bagimsiz tooltip portalini kurar -- TucbsLayerList'in
  // PAYLASILAN _tooltipPortalEl'ine artik erisimi yok (ayri custom element).
  // "URL Göster" butonu ".authorized-list"in overflow:auto kirpma sinirina
  // flush yasli oldugu icin CSS-only (data-tooltip) degil, bu portal GEREKLI
  // (bkz TucbsLayerList.ts'teki ORIJINAL _showPortalTooltip WHY yorumu).
  private _tooltipPortalEl: TucbsTooltipPortal | null = null;

  // Yetkili katmanlar diyalogunu (TucbsFileUpload/TucbsServiceUpload'daki ile
  // AYNI yontem) haritada istenen yere surukleyebilmek icin: baslangicta
  // merkezde (transform: translate(-50%,-50%)) konumlanan diyalog, ilk
  // surukleme basinda ekrandaki gercek konumuna sabitlenir (left/top,
  // transform: none) ki surukleme sirasinda ZIPLAMASIN (bkz
  // shared/ui/DraggablePanelController.ts).
  private readonly _dialogDrag = new DraggablePanelController(this, {
    getPanel: (header) => {
      const dialogEl = header.closest(".authorized-dialog");
      return dialogEl instanceof HTMLElement ? dialogEl : null;
    },
    ignoreSelector: ".authorized-dialog-close",
  });

  // Yetkili katmanlar listesinde AYNI ANDA 4 ogenin gorunmesi (dialog daha
  // kompakt dursun diye 5'ten dusuruldu -- bkz kullanici bildirimi), 5.'ten
  // itibaren dikey scroll cikmasi istendi. Satirlar sabit yukseklikte DEGIL
  // (baslik/meta metni tek veya cift satira sarabiliyor, cds-checkbox'in
  // shadow DOM'undaki label'a text-overflow/line-clamp ile MUDAHALE
  // EDEMEYIZ) -- bu yuzden "4 satir" sabit bir CSS max-height ile (ornegin
  // satir sayisi * varsayilan yukseklik) GUVENILIR sekilde ifade edilemez:
  // bazi satirlar bundan kisa/uzun olur, 4. satir ya erken kesilir ya da
  // fazladan bosluk kalir. Bunun yerine ilk 4 (veya daha azsa tumu) satirin
  // GERCEK render edilmis yuksekligi toplanip konteynira piksel olarak
  // uygulanir; 4'ten az oge varsa max-height kaldirilir (scroll GEREKMEZ).
  private static readonly AUTHORIZED_VISIBLE_ROWS = 4;

  /** Lit yaşam döngüsü: bileşen DOM'a bağlandığında satır ipuçları için `document.body`'ye bir tooltip portalı ekler. */
  override connectedCallback(): void {
    super.connectedCallback();
    this._tooltipPortalEl = document.createElement(
      "tucbs-tooltip-portal",
    ) as TucbsTooltipPortal;
    document.body.appendChild(this._tooltipPortalEl);
  }

  /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken tooltip portalını kaldırır. */
  override disconnectedCallback(): void {
    this._tooltipPortalEl?.remove();
    this._tooltipPortalEl = null;
    // Surukleme surerken kaldirilirsa _dialogDrag kendi hostDisconnected()'inda
    // baslik dinleyicilerini kaldirir (bkz DraggablePanelController).
    super.disconnectedCallback();
  }

  /** `customCss` değişince stili uygular; seçim diyaloğu açıkken liste yüksekliğini görünür satır sayısına göre yeniden ayarlar. */
  override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-authorized-layers");
    }
    if (this._authorizedPickerOpen) this._syncAuthorizedListMaxHeight();
  }

  /**
   * Yetkili katmanlar: GET /layers → seçim dialogu (coğrafi veri servisi gibi).
   * Otomatik haritaya ekleme yok. `TucbsLayerList`'in "Yetkili Katmanlarımı
   * Getir" butonu tarafından çağrılır.
   */
  async fetchAndOpen(): Promise<void> {
    if (!this.layerManager || this._authorizedLayersLoading) return;
    this._authorizedLayersLoading = true;
    // Servis bilgisi getirilirken arka planda diger bilesenlerle etkilesim
    // devam ETMEMELI (bkz kullanici bildirimi, ServiceDiscoveryController.discover
    // ile AYNI kategori) -- global overlay tum sayfayi kilitler.
    beginBusy("Yetkili katmanlar getiriliyor…");
    this._authorizedFetchError = "";
    this._authorizedAddError = "";
    try {
      const authorized = await this.layerManager.getAuthorizedLayers();
      this._authorizedItems = authorized;
      this._authorizedSelectedKeys = [];
      this._authorizedPickerOpen = true;
      if (authorized.length === 0) {
        this._authorizedFetchError = "Bu API key için yetkili katman bulunamadı.";
      }
    } catch (error) {
      if (error instanceof TucbsError) {
        console.error(`[tucbs-authorized-layers] ${error.code} (${error.number}): ${error.message}`);
      }
      this._authorizedItems = [];
      this._authorizedPickerOpen = true;
      this._authorizedFetchError =
        error instanceof Error
          ? error.message
          : "Yetkili katman listesi alınamadı.";
    } finally {
      this._authorizedLayersLoading = false;
      endBusy();
    }
  }

  closePicker(): void {
    this._authorizedPickerOpen = false;
    this._authorizedAddError = "";
    this._closeTokenUrlDialog();
  }

  private _openTokenUrlDialog(info: AuthorizedLayerInfo): void {
    const url = info.tokenUrl?.trim();
    if (!url) {
      showToast("warning", "Bu katman için token URL bulunamadı.");
      return;
    }
    this._tokenUrlDialogTitle = info.katmanAdi || info.ogcLayerName || "Token URL";
    this._tokenUrlDialogValue = url;
    this._tokenUrlDialogOpen = true;
  }

  private _closeTokenUrlDialog(): void {
    this._tokenUrlDialogOpen = false;
    this._tokenUrlDialogValue = "";
    this._tokenUrlDialogTitle = "";
  }

  private async _copyTokenUrl(): Promise<void> {
    const url = this._tokenUrlDialogValue.trim();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      showToast("info", "Token URL panoya kopyalandı.");
    } catch {
      showToast("error", "Panoya kopyalanamadı.");
    }
  }

  private _authorizedKey(info: AuthorizedLayerInfo): string {
    return (
      info.id ??
      `${info.servisTuru}|${info.servisUrl}|${info.ogcLayerName}`
    );
  }

  // GC-03 Adim 3 (Faz 7): eklenebilirlik mantigi artik
  // LayerManager.canAddAuthorizedLayer()'a tasindi (bkz
  // auth/ApiKeyPolicy.canAddAuthorizedLayer) -- hem bu Lit bilesen hem
  // baska bir UI katmani (ör. React) AYNI kaynagi kullanir.
  private _authorizedCanAdd(info: AuthorizedLayerInfo): boolean {
    return this.layerManager?.canAddAuthorizedLayer(info) ?? false;
  }

  private _toggleAuthorizedSelected(key: string, checked: boolean): void {
    this._authorizedSelectedKeys = checked
      ? [...this._authorizedSelectedKeys, key]
      : this._authorizedSelectedKeys.filter((k) => k !== key);
  }

  private async _addSelectedAuthorizedLayers(): Promise<void> {
    if (!this.layerManager) {
      this._authorizedAddError = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const toAdd = this._authorizedItems.filter((info) => {
      const key = this._authorizedKey(info);
      return (
        this._authorizedSelectedKeys.includes(key) &&
        this._authorizedCanAdd(info)
      );
    });
    if (toAdd.length === 0) return;

    // Katman(lar) eklenirken arka planda diger bilesenlerle etkilesim devam
    // ETMEMELI (bkz kullanici bildirimi) -- global overlay tum sayfayi kilitler.
    beginBusy("Katmanlar ekleniyor…");
    this._authorizedAddError = "";
    const failed: string[] = [];

    for (const info of toAdd) {
      try {
        // GC-03 Adim 3 (Faz 7): mapping/validation mantigi artik
        // LayerManager.addAuthorizedLayer()'da (bkz _authorizedCanAdd WHY
        // yorumu ile AYNI gerekce).
        await this.layerManager.addAuthorizedLayer(info);
      } catch {
        failed.push(info.katmanAdi || info.ogcLayerName);
      }
    }

    this._authorizedSelectedKeys =
      failed.length === 0
        ? []
        : toAdd
            .filter((info) =>
              failed.includes(info.katmanAdi || info.ogcLayerName),
            )
            .map((info) => this._authorizedKey(info));
    endBusy();

    if (failed.length === 0) {
      this.closePicker();
    } else {
      this._authorizedAddError = `${failed.length}/${toAdd.length} katman eklenemedi: ${failed.join(", ")}`;
    }
  }

  private _authorizedAddButtonLabel(): string {
    const n = this._authorizedSelectedKeys.filter((key) => {
      const info = this._authorizedItems.find(
        (item) => this._authorizedKey(item) === key,
      );
      return info && this._authorizedCanAdd(info);
    }).length;
    if (n > 1) return `Haritaya Ekle (${n})`;
    return "Haritaya Ekle";
  }

  private _syncAuthorizedListMaxHeight(): void {
    const list = this.shadowRoot?.querySelector<HTMLElement>(".authorized-list");
    if (!list) return;

    const rows = Array.from(list.querySelectorAll<HTMLElement>(".authorized-row"));
    const visibleCount = TucbsAuthorizedLayers.AUTHORIZED_VISIBLE_ROWS;
    if (rows.length <= visibleCount) {
      list.style.maxHeight = "";
      return;
    }

    // offsetHeight HER SATIR icin AYRI AYRI en yakin tam piksele
    // yuvarlaniyor (spec geregi tam sayi) -- bu yuvarlamalari toplamak,
    // satirlarin GERCEK (subpiksel) toplam yuksekliginden 1-2px FAZLA
    // cikabiliyor, bu da konteynirin son gorunur satirdan biraz uzun
    // kesilmesine ve bir sonraki (gizli) satirin ust kenarinin ince bir
    // "ikinci border" gibi sizmasina yol aciyordu. getBoundingClientRect()
    // ise subpiksel hassasiyette oldugundan, son gorunecek satirin GERCEK
    // alt kenariyla konteynirin GERCEK ust kenari arasindaki farki
    // (yuvarlama hatasiz) veriyor.
    const lastVisibleRow = rows[visibleCount - 1];
    if (!lastVisibleRow) return;

    // Satirlarin kendi border-bottom'u YOK (bkz ".authorized-row" WHY
    // yorumu) -- bu yuzden kesim noktasi ile listenin KENDI kutu kenarligi
    // arasinda cakisma/cift cizgi riski kalmadi, ekstra bir duzeltme
    // gerekmiyor.
    const listTop = list.getBoundingClientRect().top;
    const rowBottom = lastVisibleRow.getBoundingClientRect().bottom;
    const visibleHeight = rowBottom - listTop;
    list.style.maxHeight = `${visibleHeight}px`;
  }

  // Kirpma sinirina flush yasli "URL Göster" butonunun tooltip'ini
  // _tooltipPortalEl uzerinden gosterir/gizler -- bkz. field yorumu.
  private _showPortalTooltip(anchor: HTMLElement, text: string): void {
    if (!this._tooltipPortalEl) return;
    const rect = anchor.getBoundingClientRect();
    this._tooltipPortalEl.text = text;
    this._tooltipPortalEl.x = rect.left;
    this._tooltipPortalEl.y = rect.bottom + 6;
    this._tooltipPortalEl.open = true;
  }

  private _hidePortalTooltip(): void {
    if (this._tooltipPortalEl) this._tooltipPortalEl.open = false;
  }

  /** Bileşenin şablonunu render eder: seçim diyaloğu kapalıyken hiçbir şey, açıkken yetkili katman seçim diyaloğu. */
  override render() {
    if (!this._authorizedPickerOpen) return nothing;
    return this._renderAuthorizedPicker();
  }

  private _renderAuthorizedPicker() {
    const selectableCount = this._authorizedSelectedKeys.filter((key) => {
      const info = this._authorizedItems.find(
        (item) => this._authorizedKey(item) === key,
      );
      return info && this._authorizedCanAdd(info);
    }).length;

    return html`
      <div
        class="authorized-dialog"
        role="dialog"
        aria-label="Yetkili katmanlar"
      >
        <div
          class="authorized-dialog-header"
          @pointerdown=${(event: PointerEvent) => this._dialogDrag.start(event)}
        >
          <span class="authorized-dialog-title"><span class="title-icon">${ICON_API_KEY}</span>Yetkili Katmanlar</span>
          <button
            type="button"
            class="authorized-dialog-close"
            data-tooltip="Kapat"
            aria-label="Kapat"
            @click=${() => this.closePicker()}
          >
            ${ICON_CLOSE}
          </button>
        </div>
        <div class="authorized-dialog-body">
          ${this._authorizedFetchError
            ? html`<div class="authorized-error">
                ${this._authorizedFetchError}
              </div>`
            : nothing}
          ${this._authorizedItems.length > 0
            ? html`
                <div class="authorized-list" role="group" aria-label="Katmanlar">
                  ${this._authorizedItems.map((info) => {
                    const key = this._authorizedKey(info);
                    const canAdd = this._authorizedCanAdd(info);
                    const title = info.katmanAdi || info.ogcLayerName;
                    const metaParts = [
                      info.servisTuru,
                      info.ogcLayerName !== title ? info.ogcLayerName : "",
                      info.ustKurumAdi,
                    ].filter(Boolean);
                    const disabledHint =
                      !canAdd &&
                      info.servisTuru?.toUpperCase() === "WMTS" &&
                      !info.wmtsTileMatrixSet
                        ? " (TileMatrixSet eksik)"
                        : !canAdd
                          ? " (eksik bilgi)"
                          : "";
                    return html`
                      <div
                        class="authorized-row ${canAdd
                          ? ""
                          : "authorized-row--disabled"}"
                      >
                        <div class="authorized-row-main">
                          <cds-checkbox
                            title=${title}
                            ?disabled=${!canAdd}
                            .checked=${this._authorizedSelectedKeys.includes(key)}
                            @cds-checkbox-changed=${(
                              event: CustomEvent<{ checked?: boolean }>,
                            ) => {
                              if (!canAdd) return;
                              this._toggleAuthorizedSelected(
                                key,
                                !!event.detail?.checked,
                              );
                            }}
                          >
                            ${title}${disabledHint}
                          </cds-checkbox>
                          <button
                            type="button"
                            class="authorized-token-btn"
                            aria-label="URL Göster"
                            ?disabled=${!info.tokenUrl?.trim()}
                            @click=${(event: Event) => {
                              event.stopPropagation();
                              this._hidePortalTooltip();
                              this._openTokenUrlDialog(info);
                            }}
                            @mouseenter=${(event: MouseEvent) =>
                              this._showPortalTooltip(event.currentTarget as HTMLElement, "URL Göster")}
                            @mouseleave=${() => this._hidePortalTooltip()}
                            @focus=${(event: FocusEvent) =>
                              this._showPortalTooltip(event.currentTarget as HTMLElement, "URL Göster")}
                            @blur=${() => this._hidePortalTooltip()}
                          >
                            ${ICON_LINK}
                          </button>
                        </div>
                        <div class="authorized-meta">
                          ${metaParts.join(" · ")}
                        </div>
                      </div>
                    `;
                  })}
                </div>
                <div class="authorized-add-error">${this._authorizedAddError}</div>
                <button
                  type="button"
                  class="authorized-add-btn"
                  ?disabled=${selectableCount === 0}
                  @click=${() => this._addSelectedAuthorizedLayers()}
                >
                  ${this._authorizedAddButtonLabel()}
                </button>
              `
            : nothing}
        </div>
      </div>
      ${this._tokenUrlDialogOpen ? this._renderTokenUrlDialog() : nothing}
    `;
  }

  private _renderTokenUrlDialog() {
    return html`
      <div
        class="token-url-dialog"
        role="dialog"
        aria-label="Token URL"
      >
        <div class="token-url-dialog-header">
          <span>${this._tokenUrlDialogTitle}</span>
          <button
            type="button"
            class="authorized-dialog-close"
            data-tooltip="Kapat"
            aria-label="Kapat"
            @click=${() => this._closeTokenUrlDialog()}
          >
            ${ICON_CLOSE}
          </button>
        </div>
        <div class="token-url-dialog-body">
          <pre class="token-url-value">${this._tokenUrlDialogValue}</pre>
          <div class="token-url-actions">
            <button
              type="button"
              class="token-url-btn"
              @click=${() => this._closeTokenUrlDialog()}
            >
              Kapat
            </button>
            <button
              type="button"
              class="token-url-btn token-url-btn--primary"
              @click=${() => this._copyTokenUrl()}
            >
              Kopyala
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
