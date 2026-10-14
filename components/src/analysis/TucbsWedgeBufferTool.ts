import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Map as TucbsMapCore, TucbsError } from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { showToast } from "../shared/ui/toast.js";
import { analysisHelpStyles, COGRAFI_HELP, renderAnalysisHelp } from "./analysisHelp.js";
import { geoToolStyles } from "./geoToolStyles.js";
import { AnalysisMapBind, isPointFeature, type SelectedFeature } from "./analysisMapBind.js";

type RunStatus = "idle" | "loading" | "error" | "success";

/**
 * Kama tampon: nokta, mesafe ve açı aralığı. HTTP Map.runWedgeBuffer.
 */
@customElement("tucbs-wedge-buffer-tool")
export class TucbsWedgeBufferTool extends LitElement {
  static override readonly styles = [geoToolStyles, analysisHelpStyles];

  @property() mapElementId = "";
  @property({ attribute: false }) map: TucbsMapCore | null = null;
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _label = "";
  @state() private _distance = "";
  @state() private _start = "0";
  @state() private _end = "90";
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
      if (!isPointFeature(feature)) {
        this._note("error", "Kama tampon sadece nokta geometrileri için kullanılabilir.");
        return;
      }
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
      applyCustomCss(this.shadowRoot, this.customCss, this._css, "tucbs-wedge-buffer-tool");
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

  /** Nokta, pozitif mesafe ve artan açı aralığıyla kama üretir. */
  private async _run(): Promise<void> {
    if (this._status === "loading") return;
    if (!isPointFeature(this._feature)) {
      this._note("error", "Lütfen haritada bir nokta seçin.");
      return;
    }
    const distance = Number(this._distance);
    const start = Number(this._start);
    const end = Number(this._end);
    if (!Number.isFinite(distance) || distance <= 0) {
      this._note("error", "Geçerli bir mesafe girin.");
      return;
    }
    if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) {
      this._note("error", "Başlangıç açısı bitiş açısından küçük olmalıdır.");
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
      new CustomEvent("tucbs-wedge-buffer-run", {
        detail: { mapElementId: this.mapElementId, distanceM: distance, startAngle: start, endAngle: end },
        bubbles: true,
        composed: true,
      }),
    );
    try {
      await map.runWedgeBuffer(
        { geojson: this._feature!, distanceM: distance, startAngle: start, endAngle: end },
        { title: `Kama tampon (${distance}m, ${start}°–${end}°)` },
      );
      this._feature = null;
      this._label = "";
      this._distance = "";
      this._start = "0";
      this._end = "90";
      this._bind.highlight([]);
      this._status = "idle";
      this._message = "";
      showToast("success", "Kama tampon eklendi.");
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-wedge-buffer-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Kama tampon başarısız.");
    }
  }

  override render() {
    const busy = this._status === "loading";
    const canRun = Boolean(this._feature && this._distance) && !busy;
    return html`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kama Tampon</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => { this._helpOpen = true; }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Kama Tampon", COGRAFI_HELP.kama, () => { this._helpOpen = false; })}
        <label class="lbl">Nokta seç...</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Nokta seçmek için buraya tıklayın"
            .value=${this._label ? `= ${this._label}` : ""}
            ?disabled=${busy}
            @click=${() => {
              this._picking = true;
              this._note("info", "Haritadan bir nokta seçin.");
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
        <label class="lbl">Mesafe</label>
        <div class="distance-row">
          <input
            type="number"
            min="0"
            step="any"
            placeholder="Mesafe girin"
            .value=${this._distance}
            ?disabled=${busy}
            @input=${(e: Event) => {
              this._distance = (e.target as HTMLInputElement).value;
            }}
          />
          <span class="unit">m</span>
        </div>
        <label class="lbl">Başlangıç Açısı</label>
        <input
          type="number"
          step="any"
          placeholder="Başlangıç açısı"
          .value=${this._start}
          ?disabled=${busy}
          @input=${(e: Event) => {
            this._start = (e.target as HTMLInputElement).value;
          }}
        />
        <label class="lbl">Bitiş Açısı</label>
        <input
          type="number"
          step="any"
          placeholder="Bitiş açısı"
          .value=${this._end}
          ?disabled=${busy}
          @input=${(e: Event) => {
            this._end = (e.target as HTMLInputElement).value;
          }}
        />
        <p class="hint">0° = Kuzey, 90° = Doğu, 180° = Güney, 270° = Batı</p>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._run}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this._message ? html`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
}
