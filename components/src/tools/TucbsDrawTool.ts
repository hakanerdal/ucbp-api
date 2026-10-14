import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import {
  DotMark16 as PointIcon,
  ChartLine16 as PolylineIcon,
  LassoPolygon16 as PolygonIcon,
  SquareOutline16 as RectangleIcon,
  CircleOutline16 as CircleIcon,
  Pen16 as FreehandIcon,
  Shapes16 as MainIcon,
} from "@carbon/icons";
import { Map as TucbsMapInstance, type DrawingManager, type DrawTool } from "@tucbs/core";
import { iconNodeToString, type CarbonIconNode } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { leftTooltipStyles } from "../shared/ui/TooltipStyles.js";
import { hideGuide, showGuide } from "../shared/ui/guidePanel.js";
import { drawGuide } from "./drawHints.js";

const TOOL_ICON_NODES: Partial<Record<DrawTool, CarbonIconNode>> = {
  point: PointIcon,
  polyline: PolylineIcon,
  polygon: PolygonIcon,
  rectangle: RectangleIcon,
  circle: CircleIcon,
  freehand: FreehandIcon,
};

// Hicbir arac aktif degilken ana (toolbar) butonunun ikonu: flyout'taki geometri ikonlarindan
// (nokta/cizgi/alan/dikdortgen/daire/serbest) bilinçli olarak farkli.
const MAIN_ICON = unsafeSVG(iconNodeToString(MainIcon));

const iconCache = new Map<DrawTool, ReturnType<typeof unsafeSVG>>();

function iconFor(tool: DrawTool) {
  const cached = iconCache.get(tool);
  if (cached) return cached;
  const node = TOOL_ICON_NODES[tool];
  const icon = node ? unsafeSVG(iconNodeToString(node)) : unsafeSVG("");
  iconCache.set(tool, icon);
  return icon;
}

/**
 * Birden fazla cizim geometrisini ("point"/"polyline"/"polygon" -- v1
 * kapsami) tek bir "grup" butonda toplayan bagimsiz cizim araci. Ana
 * butona tiklaninca SOLA acilan bir flyout ile hangi geometrinin
 * cizilecegi secilir; pasifken ana butonda sabit bir ikon, aktifken secilen
 * aracin ikonu gorunur. Varsayilan arac YOKTUR.
 * `tucbs-toolbar` icinde bir arac olarak kullanilabildigi gibi, toolbar
 * disinda tek basina da embed edilebilir.
 *
 * WHY (tek component + dahili flyout, 6 duz instance DEGIL): v14 SS11.6
 * "ayri bir `<tucbs-tool-group>` sarmalayici" onerisini degerlendirip
 * REDDETTI -- "aktif aracin ikonu ayni butonda gorunsun" gereksinimi
 * jenerik bir sarmalayicida DrawTool'a ozgu bilgi gerektirip coupling
 * yaratirdi. Bkz. project_ucbp_api_tucbstoolbar_mimarisi memory.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-draw-tool
 *   mapElementId="map"
 *   tools="point,polyline,polygon,rectangle,circle,freehand"
 * ></tucbs-draw-tool>
 * ```
 */
@customElement("tucbs-draw-tool")
export class TucbsDrawTool extends LitElement {
  static override readonly styles = [
    leftTooltipStyles,
    css`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .draw-tool {
      position: relative;
      display: inline-flex;
    }

    .flyout {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      display: flex;
      flex-direction: row;
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

    /* Ana buton toolbar'da SABIT durdugu icin (aktif/pasif fark etmeksizin,
       sadece ikonu degisir) tooltip'i DAIMA leftTooltipStyles'in varsayilan
       SOL konumunda kalir -- aktiflik durumuna gore konum degistirmek
       (once altta, tiklayinca solda) kullanici tarafindan tutarsiz/yanlis
       bulundu (bkz. feedback). SADECE flyout'taki alt secenekler altta acilir. */

    /* Flyout'taki alt secenek butonlari (Nokta/Cizgi/Alan) DAIMA butonun
       ALTINDA tooltip gosterir -- ana butonun aksine flyout'un actigi
       yonden bagimsiz. */
    .tool-button:not(.main-button)[data-tooltip]::after {
      top: calc(100% + 0.5rem);
      right: auto;
      left: 50%;
      transform: translateX(-50%);
    }
  `,
  ];

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  /** Opsiyonel: `tucbs-map` elementinin ID'si (Senaryo 2 - otomatik baglama icin). */
  @property() mapElementId = "";

  /** Flyout'ta gosterilecek geometri ID'leri, virgulle ayrilmis (DrawTool union'inin bir alt kumesi). */
  @property() tools = "point,polyline,polygon";
  // v1 kapsami: sadece point/polyline/polygon icin ikon tanimli.

  /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni (bkz. `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  // === JS-only Properties (canli referans, attribute olarak set edilemez) ===
  /**
   * Core JS API `Map` instance'i. `tucbs-toolbar` icinde kullanildiginda
   * container bunu property binding ile dogrudan atar (Senaryo 1); tek
   * basina kullanildiginda `mapElementId` ile otomatik baglanir (Senaryo 2).
   */
  @property({ attribute: false }) map: TucbsMapInstance | undefined;
  // DrawingManager, ZoomTool/BasemapPicker ile ayni konvansiyonla `.map`
  // uzerinden (`this.map.drawingManager`) turetilir -- ayri bir
  // `.drawingManager` property'si YOK.

  // === Internal State ===
  @state() private _activeTool: DrawTool | null = null;
  @state() private _flyoutOpen = false;

  private readonly _customCssState: CustomCssState = { sheet: null };

  private _toolIds(): DrawTool[] {
    return this.tools
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean) as DrawTool[];
  }

  private readonly _onDrawStart = ({
    tool,
    source,
  }: {
    readonly tool: DrawTool;
    readonly source?: string;
  }): void => {
    // Baska bir arac (bu instance'in kendi listesinde olmayan) aktiflestiyse
    // bu instance otomatik pasiflesir -- merkezi bir koordinatore gerek
    // kalmadan mutual-exclusion (self-managed active-tool deseni). `source
    // === "draw"` sarti: TucbsMeasureTool de AYNI DrawTool degerlerini
    // ("polyline"/"polygon") FARKLI amacla (olcum) kullaniyor -- bu kontrol
    // olmadan bir TucbsMeasureTool aktivasyonu buradaki butonu da yanlislikla
    // "aktif" gosterirdi. Diger TucbsDrawTool instance'lari (source="draw")
    // birbirini ONCEDEN OLDUGU GIBI mirror etmeye devam eder.
    this._activeTool =
      source === "draw" && this._toolIds().includes(tool) ? tool : null;
    // Nasil cizilecegi/bitirilecegi/cikilacagi: oturum bitene (draw:cancel)
    // kadar kalici panel; tekil panel oldugundan mirror eden instance'lar
    // ayni paneli idempotent sekilde yeniden kurar.
    if (source === "draw") {
      const { title, steps } = drawGuide(tool, "draw");
      showGuide(title, steps);
    }
    this._flyoutOpen = false;
  };

  // SADECE acikca deactivate() cagrildiginda (draw:cancel) sifirlanir.
  // draw:complete artik sifirlamiyor -- DrawingManager surekli cizim modunda
  // sekil tamamlaninca ayni araci aktif tutuyor (bkz. DrawingManager.
  // completeShape()), bu component da UI'da ayni aracin aktif gorunmesini
  // KORUMALI (aksi halde araç hala calisirken buton yanlislikla jenerik
  // gorunume donerdi).
  private readonly _onDrawCancel = (): void => {
    this._activeTool = null;
    hideGuide();
  };

  /** Bilesen DOM'dan kaldirilirken DrawingManager event aboneliklerini iptal eder. */
  override disconnectedCallback(): void {
    if (this.map) this._unbindDrawingManager(this.map.drawingManager);
    if (this._activeTool !== null) hideGuide();
    super.disconnectedCallback();
  }

  /**
   * `customCss` degistiginde ozel CSS'i yeniden uygular; `map` degistiginde
   * onceki DrawingManager'dan cikip yenisine baglanir.
   */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-draw-tool");
    }

    if (changed.has("map")) {
      const previous = changed.get("map") as TucbsMapInstance | undefined;
      if (previous) this._unbindDrawingManager(previous.drawingManager);
      if (this.map) this._bindDrawingManager(this.map.drawingManager);
    }
  }

  private _bindDrawingManager(drawingManager: DrawingManager): void {
    drawingManager.on("draw:start", this._onDrawStart);
    drawingManager.on("draw:cancel", this._onDrawCancel);
  }

  private _unbindDrawingManager(drawingManager: DrawingManager): void {
    drawingManager.off("draw:start", this._onDrawStart);
    drawingManager.off("draw:cancel", this._onDrawCancel);
  }

  // === Yasam Dongusu: Map baglama ===
  /**
   * Ilk render sonrasi haritaya baglanmayi dener: `map` zaten atanmissa (Senaryo 1)
   * hicbir sey yapmaz; aksi halde `mapElementId` ile eslesen elementi bulup
   * haritasina baglanir (Senaryo 2), gerekirse elementin `ready` olayini bekler.
   */
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-draw-tool", "islevsiz"),
    });
  }

  // Ana buton her zaman sadece flyout'u acar/kapatir; arac secimi flyout'tan yapilir.
  private _onMainButtonClick(): void {
    this._flyoutOpen = !this._flyoutOpen;
  }

  private _selectTool(tool: DrawTool): void {
    const drawingManager = this.map?.drawingManager;
    if (!drawingManager) return;
    if (this._activeTool === tool) {
      drawingManager.deactivate();
    } else {
      drawingManager.activate(tool, "draw");
    }
    this._flyoutOpen = false;
  }

  /** Ana butonu ve (aciksa) arac secim flyout'unu render eder. */
  override render() {
    // Aktifken calisan aracin IKONU ve ETIKETI (ör. "Alan Çiz"), pasifken sabit ikon ve jenerik "Çizim".
    const mainIcon = this._activeTool !== null ? iconFor(this._activeTool) : MAIN_ICON;
    const mainLabel = this._activeTool !== null ? drawGuide(this._activeTool, "draw").title : "Çizim";

    return html`
      <div class="draw-tool">
        ${this._flyoutOpen
          ? html`
              <div class="flyout">
                ${this._toolIds().map(
                  (tool) => html`
                    <button
                      class="tool-button ${tool === this._activeTool ? "active" : ""}"
                      type="button"
                      aria-label=${drawGuide(tool, "draw").title}
                      data-tooltip=${drawGuide(tool, "draw").title}
                      @click=${() => this._selectTool(tool)}
                    >
                      ${iconFor(tool)}
                    </button>
                  `,
                )}
              </div>
            `
          : null}
        <button
          class="tool-button main-button ${this._activeTool !== null ? "active" : ""}"
          type="button"
          aria-label=${mainLabel}
          data-tooltip=${mainLabel}
          @click=${this._onMainButtonClick}
        >
          ${mainIcon}
        </button>
      </div>
    `;
  }
}
