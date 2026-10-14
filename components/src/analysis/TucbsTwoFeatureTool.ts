import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Map as TucbsMapCore, TucbsError } from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { showToast } from "../shared/ui/toast.js";
import { analysisHelpStyles, COGRAFI_HELP, renderAnalysisHelp, type AnalysisHelp } from "./analysisHelp.js";
import { geoToolStyles } from "./geoToolStyles.js";
import {
  AnalysisMapBind,
  isPolygonFeature,
  type SelectedFeature,
} from "./analysisMapBind.js";

type RunStatus = "idle" | "loading" | "error" | "success";
type Slot = "a" | "b";

export type TwoFeatureSpec = {
  title: string;
  labelA: string;
  placeholderA: string;
  labelB: string;
  placeholderB: string;
  eventName: string;
  success: string;
  fail: string;
  polygonOnlyMessage: string;
  bothPolygonMessage: string;
  help: AnalysisHelp;
  run: (
    map: TucbsMapCore,
    a: SelectedFeature,
    b: SelectedFeature,
  ) => Promise<unknown>;
};

/**
 * İki nesneli coğrafi form: fark, çıkarma, birleştir.
 * Kesişim kendi sınıfında durur. HTTP Map.run* üzerinden.
 */
export abstract class TucbsTwoFeatureTool extends LitElement {
  static override readonly styles = [geoToolStyles, analysisHelpStyles];

  @property() mapElementId = "";
  @property({ attribute: false }) map: TucbsMapCore | null = null;
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _labelA = "";
  @state() private _labelB = "";
  @state() private _status: RunStatus = "idle";
  @state() private _message = "";
  @state() private _helpOpen = false;

  private _featureA: SelectedFeature | null = null;
  private _featureB: SelectedFeature | null = null;
  private _pending: Slot | null = null;
  private readonly _css: CustomCssState = { sheet: null };
  private readonly _bind = new AnalysisMapBind(
    () => ({ map: this.map, mapElementId: this.mapElementId }),
    (feature, label) => this._accept(feature, label),
    () => {
      this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
    },
  );

  /** Alt sınıf başlık, etiket ve hangi Map metodunun çağrılacağını verir. */
  protected abstract spec(): TwoFeatureSpec;

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
      applyCustomCss(this.shadowRoot, this.customCss, this._css, this.tagName.toLowerCase());
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._bind.detach();
      this._bind.attach();
    }
  }

  /** Tıklanan nesneyi bekleyen slota yazar; poligon değilse reddeder. */
  private _accept(feature: SelectedFeature, label: string): void {
    if (!this._pending) return;
    if (!isPolygonFeature(feature)) {
      this._note("error", this.spec().polygonOnlyMessage);
      return;
    }
    if (this._pending === "a") {
      this._featureA = feature;
      this._labelA = label;
    } else {
      this._featureB = feature;
      this._labelB = label;
    }
    this._pending = null;
    this._status = "idle";
    this._message = "";
    this._bind.highlight([this._featureA, this._featureB].filter((f): f is SelectedFeature => f !== null));
  }

  private _arm(slot: Slot): void {
    this._pending = slot;
    this._note("info", slot === "a" ? "Lütfen birinci poligonu seçin." : "Lütfen ikinci poligonu seçin.");
  }

  private _refresh(slot: Slot): void {
    if (slot === "a") {
      this._featureA = null;
      this._labelA = "";
    } else {
      this._featureB = null;
      this._labelB = "";
    }
    this._arm(slot);
    this._bind.highlight([this._featureA, this._featureB].filter((f): f is SelectedFeature => f !== null));
  }

  private _clear(): void {
    this._featureA = null;
    this._featureB = null;
    this._labelA = "";
    this._labelB = "";
    this._pending = null;
    this._bind.highlight([]);
  }

  /** İki poligon doluysa ilgili coğrafi işlemi çalıştırır. */
  private async _run(): Promise<void> {
    const spec = this.spec();
    if (this._status === "loading") return;
    if (!isPolygonFeature(this._featureA) || !isPolygonFeature(this._featureB)) {
      this._note("error", spec.bothPolygonMessage);
      return;
    }
    const map = this._bind.current();
    if (!map) {
      this._bind.attach();
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._status = "loading";
    this._message = "İşleniyor…";
    this._pending = null;
    this.dispatchEvent(
      new CustomEvent(spec.eventName, {
        detail: { mapElementId: this.mapElementId, labelA: this._labelA, labelB: this._labelB },
        bubbles: true,
        composed: true,
      }),
    );
    try {
      await spec.run(map, this._featureA!, this._featureB!);
      this._clear();
      this._status = "idle";
      this._message = "";
      showToast("success", spec.success);
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[${this.tagName}] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : spec.fail);
    }
  }

  /** Form altındaki satır yerine toast basar. */
  private _note(kind: "info" | "error" | "success", message: string): void {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }

  private _slot(slot: Slot, label: string, placeholder: string, value: string) {
    const busy = this._status === "loading";
    return html`
      <label class="lbl">${label}</label>
      <div class="input-wrap">
        <input
          type="text"
          readonly
          placeholder=${placeholder}
          .value=${value ? `= ${value}` : ""}
          ?disabled=${busy}
          @click=${() => this._arm(slot)}
        />
        <button type="button" class="refresh" title="Yeniden seç" ?disabled=${busy} @click=${() => this._refresh(slot)}>⟳</button>
      </div>
    `;
  }

  override render() {
    const spec = this.spec();
    const busy = this._status === "loading";
    const canRun = isPolygonFeature(this._featureA) && isPolygonFeature(this._featureB) && !busy;
    return html`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">${spec.title}</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => { this._helpOpen = true; }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, spec.title, spec.help, () => { this._helpOpen = false; })}
        ${this._slot("a", spec.labelA, spec.placeholderA, this._labelA)}
        ${this._slot("b", spec.labelB, spec.placeholderB, this._labelB)}
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

@customElement("tucbs-difference-tool")
export class TucbsDifferenceTool extends TucbsTwoFeatureTool {
  protected spec(): TwoFeatureSpec {
    return {
      title: "Fark",
      labelA: "İlk poligon (kaynak)...",
      placeholderA: "Haritadan poligon seç",
      labelB: "İkinci poligon (çıkarılacak)...",
      placeholderB: "Poligon seçmek için buraya tıklayın",
      eventName: "tucbs-difference-run",
      success: "Fark tamamlandı.",
      fail: "Fark başarısız.",
      polygonOnlyMessage: "Fark için yalnızca poligon seçin.",
      bothPolygonMessage: "Her iki seçim de poligon olmalıdır.",
      help: COGRAFI_HELP.fark,
      run: (map, a, b) => map.runDifference({ geojsonA: a, geojsonB: b }, { title: "Fark sonucu" }),
    };
  }
}

@customElement("tucbs-subtract-tool")
export class TucbsSubtractTool extends TucbsTwoFeatureTool {
  protected spec(): TwoFeatureSpec {
    return {
      title: "Çıkarma",
      labelA: "Nesneyi şuradan kaldır:",
      placeholderA: "Haritadan nesne seç",
      labelB: "...ile örtüşüyor.",
      placeholderB: "Nesne seçmek için buraya tıklayın",
      eventName: "tucbs-subtract-run",
      success: "Çıkarma tamamlandı.",
      fail: "Çıkarma başarısız.",
      polygonOnlyMessage: "Çıkarma için yalnızca poligon seçin.",
      bothPolygonMessage: "Her iki seçim de poligon olmalıdır.",
      help: COGRAFI_HELP.cikarma,
      run: (map, a, b) => map.runSubtract({ geojsonA: a, geojsonB: b }, { title: "Çıkarma sonucu" }),
    };
  }
}

@customElement("tucbs-union-tool")
export class TucbsUnionTool extends TucbsTwoFeatureTool {
  protected spec(): TwoFeatureSpec {
    return {
      title: "Birleştir",
      labelA: "Birleştirilecek birinci...",
      placeholderA: "Haritadan nesne seç",
      labelB: "Birleştirilecek ikinci...",
      placeholderB: "Haritadan nesne seç",
      eventName: "tucbs-union-run",
      success: "Birleştirme tamamlandı.",
      fail: "Birleştirme başarısız.",
      polygonOnlyMessage: "Birleştirme için yalnızca poligon seçin.",
      bothPolygonMessage: "Her iki seçim de poligon olmalıdır.",
      help: COGRAFI_HELP.birlestir,
      run: (map, a, b) => map.runUnion({ geojsonA: a, geojsonB: b }, { title: "Birleştir sonucu" }),
    };
  }
}
