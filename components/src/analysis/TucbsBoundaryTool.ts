import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Map as TucbsMapCore, TucbsError } from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { showToast } from "../shared/ui/toast.js";
import { analysisHelpStyles, COGRAFI_HELP, renderAnalysisHelp } from "./analysisHelp.js";
import { geoToolStyles } from "./geoToolStyles.js";
import { AnalysisMapBind, type SelectedFeature } from "./analysisMapBind.js";

type RunStatus = "idle" | "loading" | "error" | "success";
type BoundaryType = "bbox" | "convex";
type OutputGeometry = "polygon" | "line";

/**
 * Sınır formu: nesne, sınır tipi ve çıktı geometrisi. HTTP Map.runBoundary.
 */
@customElement("tucbs-boundary-tool")
export class TucbsBoundaryTool extends LitElement {
  static override readonly styles = [geoToolStyles, analysisHelpStyles];

  @property() mapElementId = "";
  @property({ attribute: false }) map: TucbsMapCore | null = null;
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _label = "";
  @state() private _boundaryType: BoundaryType = "bbox";
  @state() private _output: OutputGeometry = "polygon";
  @state() private _status: RunStatus = "idle";
  @state() private _message = "";
  @state() private _helpOpen = false;
  @state() private _picking = false;

  private _feature: SelectedFeature | null = null;
  private readonly _css: CustomCssState = { sheet: null };
  private readonly _bind = new AnalysisMapBind(
    () => ({ map: this.map, mapElementId: this.mapElementId }),
    (feature, label) => {
      if (!this._picking) return;
      this._feature = feature;
      this._label = label;
      this._picking = false;
      this._status = "idle";
      this._message = "";
      this._bind.highlight([feature]);
    },
    () => {
      this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
    },
  );

  override connectedCallback(): void {
    super.connectedCallback();
    this._bind.attach();
  }

  override disconnectedCallback(): void {
    this._bind.detach();
    super.disconnectedCallback();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._css, "tucbs-boundary-tool");
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._bind.detach();
      this._bind.attach();
    }
  }

  /** Form altındaki satır yerine toast basar. */
  private _note(kind: "info" | "error" | "success", message: string): void {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }

  /** Seçim ve tipler doluysa sınır üretir. */
  private async _run(): Promise<void> {
    if (this._status === "loading") return;
    if (!this._feature) {
      this._note("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    const map = this._bind.current();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._status = "loading";
    this._message = "İşleniyor…";
    this._picking = false;
    this.dispatchEvent(
      new CustomEvent("tucbs-boundary-run", {
        detail: {
          mapElementId: this.mapElementId,
          boundaryType: this._boundaryType,
          outputGeometry: this._output,
        },
        bubbles: true,
        composed: true,
      }),
    );
    try {
      await map.runBoundary(
        {
          geojson: this._feature,
          boundaryType: this._boundaryType,
          outputGeometry: this._output,
        },
        { title: this._boundaryType === "bbox" ? "Sınırlayıcı kutu" : "Dışbükey zarf" },
      );
      this._feature = null;
      this._label = "";
      this._boundaryType = "bbox";
      this._output = "polygon";
      this._bind.highlight([]);
      this._status = "idle";
      this._message = "";
      showToast("success", "Sınır tamamlandı.");
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-boundary-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Sınır üretimi başarısız.");
    }
  }

  override render() {
    const busy = this._status === "loading";
    return html`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Sınır</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => { this._helpOpen = true; }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Sınır", COGRAFI_HELP.sinir, () => { this._helpOpen = false; })}
        <label class="lbl">Nesne seç</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritadan nesne seç"
            .value=${this._label ? `= ${this._label}` : ""}
            ?disabled=${busy}
            @click=${() => {
              this._picking = true;
              this._note("info", "Haritadan bir nesne seçin.");
            }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => {
              this._feature = null;
              this._label = "";
              this._picking = true;
              this._bind.highlight([]);
            }}
          >⟳</button>
        </div>
        <label class="lbl">Sınır tipi</label>
        <select
          .value=${this._boundaryType}
          ?disabled=${busy}
          @change=${(e: Event) => {
            this._boundaryType = (e.target as HTMLSelectElement).value as BoundaryType;
          }}
        >
          <option value="bbox">Sınırlayıcı Kutu</option>
          <option value="convex">Dışbükey Zarf</option>
        </select>
        <label class="lbl">Çıktı geometrisi</label>
        <select
          .value=${this._output}
          ?disabled=${busy}
          @change=${(e: Event) => {
            this._output = (e.target as HTMLSelectElement).value as OutputGeometry;
          }}
        >
          <option value="polygon">Poligon</option>
          <option value="line">Çizgi</option>
        </select>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!this._feature || busy} @click=${this._run}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this._message ? html`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
}
