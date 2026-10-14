import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { ZoomIn16 as ZoomInIcon, ZoomOut16 as ZoomOutIcon, Home16 as HomeIcon } from "@carbon/icons";
import { Map as TucbsMapInstance, DEFAULT_INITIAL_EXTENT, type MapExtent } from "@tucbs/core";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";

// Cesium'un tekerlek zoom'u minimumZoomDistance'a tam oturmaz, ~%5 ustunde
// durur (10 m icin 10.5 m olculdu); "sinira geldi" kabul esigi buna gore.
const MIN_ZOOM_LIMIT_TOLERANCE = 1.1;

const ICON_ZOOM_IN = unsafeSVG(iconNodeToString(ZoomInIcon));
const ICON_ZOOM_OUT = unsafeSVG(iconNodeToString(ZoomOutIcon));
const ICON_DEFAULT_EXTENT = unsafeSVG(iconNodeToString(HomeIcon));

/**
 * Yakinlastir / Varsayilan Sinir / Uzaklastir butonlarindan olusan, `DrawingManager`'a
 * bagli olmayan bagimsiz kamera araci. `tucbs-toolbar` icinde bir arac olarak
 * kullanilabildigi gibi, toolbar disinda tek basina da embed edilebilir
 * (bkz. tucbs-taslak-web-component-metod-ihtiyac-analizi-v14 SS4.5).
 *
 * Yakinlastir/Uzaklastir, fare tekerleginin bir centigiyle ayni sekilde bir
 * olcek basamagi (1/100, 1/250, 1/500, ...) animasyonlu ilerler.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-zoom-tool mapElementId="map"></tucbs-zoom-tool>
 * ```
 */
@customElement("tucbs-zoom-tool")
export class TucbsZoomTool extends LitElement {
  static override readonly styles = [
    leftTooltipStyles,
    css`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .tool-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
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
      cursor: not-allowed;
      opacity: 0.4;
      color: var(--cds-text-disabled, #8d8d8d);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }
  `,
  ];

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  /** Baglanacak `tucbs-map` elementinin DOM ID'si. */

  // Opsiyonel: tucbs-map elementinin ID'si (Senaryo 2 baglama).
  @property() mapElementId = "";

  /** "Varsayilan Sinir" butonuna tiklandiginda kameranin donecegi hedef bolge. */

  // Verilmezse Map.ts'teki DEFAULT_INITIAL_EXTENT (Turkiye siniri) kullanilir.
  @property({ type: Object, attribute: "default-extent" }) defaultExtent: MapExtent | undefined;

  /** Shadow DOM'a enjekte edilecek serbest metin CSS. */

  // Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi
  // keyfi CSS metni. Bkz. ./internal/CustomCss.ts.
  @property({ attribute: "custom-css" }) customCss = "";

  // === JS-only Properties (canli referans, attribute olarak set edilemez) ===
  /** Baglanilan Core JS API `Map` instance'i. */

  // tucbs-toolbar icinde kullanildiginda container bunu property binding ile
  // dogrudan atar (Senaryo 1); tek basina kullanildiginda mapElementId ile
  // otomatik baglanir (Senaryo 2).
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  private readonly _customCssState: CustomCssState = { sheet: null };

  // Kamera azami/asgari zoom mesafesine dayandiginda ilgili buton pasif olur.
  @state() private _atMaxZoom = false;
  @state() private _atMinZoom = false;
  private _unsubscribeZoomLimits: (() => void) | undefined;

  /** `customCss` degistiginde shadow DOM'a enjekte edilen ozel stili gunceller. */
  override updated(changed: PropertyValues): void {
    if (changed.has("map")) this._watchZoomLimits();
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-zoom-tool");
    }
  }

  // === Yasam Dongusu: Map baglama ===
  /**
   * Ilk render sonrasi haritaya baglanir: `map` property binding ile zaten
   * atanmissa (Senaryo 1) hicbir sey yapmaz; aksi halde `mapElementId` ile
   * DOM'dan haritayi bulup `map`'i atar, gerekirse elementin `ready`
   * event'ini bekler (Senaryo 2).
   */
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-zoom-tool", "islevsiz"),
    });
  }

  // postRender her karede tetiklenir; kamera durunca (requestRenderMode ya da
  // degisim yoksa) hic cagrilmaz. Sadece sinir durumu DEGISINCE state yazilir,
  // yani gereksiz Lit render'i olusmaz.
  private _watchZoomLimits(): void {
    this._unsubscribeZoomLimits?.();
    this._unsubscribeZoomLimits = undefined;
    const viewer = this.map?.viewer;
    if (!viewer) return;
    const controller = viewer.scene.screenSpaceCameraController;
    const update = (): void => {
      const height = viewer.camera.positionCartographic.height;
      this._atMaxZoom = height >= controller.maximumZoomDistance * 0.999;
      this._atMinZoom = height <= controller.minimumZoomDistance * MIN_ZOOM_LIMIT_TOLERANCE;
    };
    update();
    this._unsubscribeZoomLimits = viewer.scene.postRender.addEventListener(update);
  }

  /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken kamera yakınlaştırma sınırı izleyicisini (`postRender` aboneliği) kaldırır. */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribeZoomLimits?.();
    this._unsubscribeZoomLimits = undefined;
  }

  /** Lit yaşam döngüsü: bileşen DOM'a yeniden eklendiğinde, harita bağlıysa kamera yakınlaştırma sınırı izleyicisini yeniden kurar. */
  override connectedCallback(): void {
    super.connectedCallback();
    // Eleman DOM'dan cikip tekrar eklendiginde "map" degismedigi icin
    // updated() yeniden abone olmaz.
    if (this.map && !this._unsubscribeZoomLimits) this._watchZoomLimits();
  }

  private _zoomIn(): void {
    this.map?.zoomInStep();
  }

  private _zoomOut(): void {
    this.map?.zoomOutStep();
  }

  private _goToDefaultExtent(): void {
    if (!this.map) return;
    this.map.setExtent(this.defaultExtent ?? DEFAULT_INITIAL_EXTENT);
  }

  /** Yakinlastir, Varsayilan Sinir ve Uzaklastir butonlarindan olusan buton grubunu render eder. */
  override render() {
    return html`
      <div class="tool-group">
        <button
          class="tool-button"
          type="button"
          aria-label="Varsayılan Sınır"
          data-tooltip="Varsayılan Sınır"
          @click=${this._goToDefaultExtent}
        >
          ${ICON_DEFAULT_EXTENT}
        </button>
        <button
          class="tool-button"
          type="button"
          aria-label="Yakınlaştır"
          data-tooltip="Yakınlaştır"
          ?disabled=${this._atMinZoom}
          @click=${this._zoomIn}
        >
          ${ICON_ZOOM_IN}
        </button>
        <button
          class="tool-button"
          type="button"
          aria-label="Uzaklaştır"
          data-tooltip="Uzaklaştır"
          ?disabled=${this._atMaxZoom}
          @click=${this._zoomOut}
        >
          ${ICON_ZOOM_OUT}
        </button>
      </div>
    `;
  }
}
