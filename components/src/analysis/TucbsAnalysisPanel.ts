import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import type { Map as TucbsMapInstance } from "@tucbs/core";

// Araç custom element kayıtları (dışarıya ayrı “tool” olarak verilmez)
import { TucbsBufferTool } from "./TucbsBufferTool.js";
import { TucbsIntersectionTool } from "./TucbsIntersectionTool.js";
import { TucbsBoundaryTool } from "./TucbsBoundaryTool.js";
import { TucbsClipTool } from "./TucbsClipTool.js";
import { TucbsDifferenceTool, TucbsSubtractTool, TucbsUnionTool } from "./TucbsTwoFeatureTool.js";
import { TucbsWedgeBufferTool } from "./TucbsWedgeBufferTool.js";

void TucbsBufferTool;
void TucbsIntersectionTool;
void TucbsBoundaryTool;
void TucbsClipTool;
void TucbsDifferenceTool;
void TucbsSubtractTool;
void TucbsUnionTool;
void TucbsWedgeBufferTool;

type AnalysisToolId =
  | "sinir"
  | "tampon"
  | "kirp"
  | "fark"
  | "kesisim"
  | "cikarma"
  | "birlestir"
  | "kama";

interface AnalysisToolDef {
  id: AnalysisToolId;
  label: string;
}

/** Portal Coğrafi İşlemler sırası. */
const TOOLS: AnalysisToolDef[] = [
  { id: "sinir", label: "Sınır" },
  { id: "tampon", label: "Tampon" },
  { id: "kirp", label: "Kırp" },
  { id: "fark", label: "Fark" },
  { id: "kesisim", label: "Kesişim" },
  { id: "cikarma", label: "Çıkarma" },
  { id: "birlestir", label: "Birleştir" },
  { id: "kama", label: "Kama Tampon" },
];

/**
 * **NOT:** Bu bağımsız bir "bileşen" DEĞİLDİR — `TucbsAnalysisTool` (ve onun
 * üzerinden `TucbsApp`) tarafından otomatik olarak gömülür. Tüketicinin
 * kendi `index.html`'ine ayrıca `<tucbs-analysis-panel>` eklemesi GEREKMEZ
 * ve önerilmez.
 *
 * Tek analiz girişi (tüketici: tucbs-analysis-panel).
 * Araç formları src/analysis/ altında; panel seçim + gömme yapar. Kullanıcı
 * coğrafi işlem seçince panel ilgili formu açar. Formlar ayrı custom element
 * olarak tüketici HTML'ine yazılmaz.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-analysis-panel mapElementId="map"></tucbs-analysis-panel>
 * ```
 */
@customElement("tucbs-analysis-panel")
export class TucbsAnalysisPanel extends LitElement {
  static override readonly styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      color: #111827;
      font-size: 13px;
    }

    .shell {
      padding: 8px 12px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .heading {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
    }

    .hint {
      margin: 0 0 12px;
      font-size: 12.5px;
      color: #6b7280;
    }

    .tool-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .tool-list button {
      width: 100%;
      text-align: left;
      padding: 10px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #f9fafb;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      color: #111827;
    }

    .tool-list button:hover {
      background: #eff6ff;
      border-color: #bfdbfe;
    }

    .back {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      margin: 0 0 10px;
      padding: 0;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #f9fafb;
      font: inherit;
      font-size: 1.15rem;
      line-height: 1;
      cursor: pointer;
      color: #111827;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    .back:hover {
      background: #eff6ff;
      border-color: #93c5fd;
      color: #1d4ed8;
    }

    .back:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
  `;

  /** Bağlı tucbs-map id — araçlara iletilir (Senaryo 2) */
  @property() mapElementId = "";

  /** Doğrudan Map referansı — tucbs-app / toolbar Senaryo 1 */
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _activeTool: AnalysisToolId | null = null;

  private readonly _customCssState: CustomCssState = { sheet: null };

  /** `customCss` degistiginde ozel CSS'i shadow DOM'a yeniden uygular. */
  override updated(changed: Map<string, unknown>): void {
    if (changed.has("customCss")) {
      applyCustomCss(
        this.shadowRoot,
        this.customCss,
        this._customCssState,
        "tucbs-analysis-panel",
      );
    }
  }

  private _openTool(id: AnalysisToolId): void {
    this._activeTool = id;
  }

  private _backToList(): void {
    this._activeTool = null;
  }

  /**
   * Aktif aracı temizler; panel araç listesine döner.
   *
   * @example
   * ```ts
   * analysisPanel.resetActiveTool();
   * ```
   */

  // TucbsAnalysisTool, slide-over panel "← Analiz" oku yerine DOGRUDAN
  // kapatildiginda (X butonu veya toolbar'daki ana butona tekrar basilinca)
  // cagirir -- aktif aracin (varsa) <tucbs-buffer-tool>/<tucbs-intersection-tool>
  // DOM'dan kaldirilmasini saglar, boylece o aracin disconnectedCallback'i
  // InteractionManager.resumeIdentify()'i tetikler. Bu cagri olmasaydi
  // kullanici paneli "geri" oku yerine dogrudan kapattiginda arac DOM'da
  // (gorunmez ama BAGLI) kalir, identify SONSUZA KADAR suspend edilmis
  // kalirdi (bkz kullanici geri bildirimi: "hic geri gelmiyor").
  resetActiveTool(): void {
    this._activeTool = null;
  }

  private _renderToolList() {
    return html`
      <div class="shell">
        <h3 class="heading">Coğrafi Analiz</h3>
        <p class="hint">Bir araç seçin.</p>
        <ul class="tool-list">
          ${TOOLS.map(
            (t) => html`
              <li>
                <button type="button" @click=${() => this._openTool(t.id)}>
                  ${t.label}
                </button>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }

  private _toolTag(): string {
    switch (this._activeTool) {
      case "sinir":
        return "tucbs-boundary-tool";
      case "tampon":
        return "tucbs-buffer-tool";
      case "kirp":
        return "tucbs-clip-tool";
      case "fark":
        return "tucbs-difference-tool";
      case "kesisim":
        return "tucbs-intersection-tool";
      case "cikarma":
        return "tucbs-subtract-tool";
      case "birlestir":
        return "tucbs-union-tool";
      case "kama":
        return "tucbs-wedge-buffer-tool";
      default:
        return "";
    }
  }

  /** Seçilen coğrafi işlem formunu geri okuyla açar. */
  private _renderActiveTool() {
    const tag = this._toolTag();
    if (!tag) return null;
    return html`
      <div class="shell">
        <button
          type="button"
          class="back"
          aria-label="Araç listesine dön"
          title="Geri"
          @click=${this._backToList}
        >←</button>
        ${tag === "tucbs-boundary-tool"
          ? html`<tucbs-boundary-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-boundary-tool>`
          : tag === "tucbs-buffer-tool"
            ? html`<tucbs-buffer-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-buffer-tool>`
            : tag === "tucbs-clip-tool"
              ? html`<tucbs-clip-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-clip-tool>`
              : tag === "tucbs-difference-tool"
                ? html`<tucbs-difference-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-difference-tool>`
                : tag === "tucbs-intersection-tool"
                  ? html`<tucbs-intersection-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-intersection-tool>`
                  : tag === "tucbs-subtract-tool"
                    ? html`<tucbs-subtract-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-subtract-tool>`
                    : tag === "tucbs-union-tool"
                      ? html`<tucbs-union-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-union-tool>`
                      : html`<tucbs-wedge-buffer-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-wedge-buffer-tool>`}
      </div>
    `;
  }

  /** Aktif araç varsa onu (geri okuyla birlikte), yoksa araç seçim listesini render eder. */
  override render() {
    if (this._activeTool) {
      return this._renderActiveTool();
    }
    return this._renderToolList();
  }
}
