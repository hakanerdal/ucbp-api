import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  Map as TucbsMapCore,
  entityToGeoJSON,
  featureLabel,
  TucbsError,
  type EntityInteractionDetail,
} from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { showToast } from "../shared/ui/toast.js";
import { analysisHelpStyles, COGRAFI_HELP, renderAnalysisHelp } from "./analysisHelp.js";

type RunStatus = "idle" | "loading" | "error" | "success";
type SelectionSlot = "a" | "b";

/** Minimal GeoJSON Feature — geojson paket tipine bağımlılık yok */
type SelectedFeature = {
  type: "Feature";
  id?: string | number | undefined;
  properties: Record<string, unknown>;
  geometry: object & { type?: string };
};

type MapHost = HTMLElement & {
  map?: TucbsMapCore | null;
  addEventListener: HTMLElement["addEventListener"];
  removeEventListener: HTMLElement["removeEventListener"];
};

function isPolygonFeature(feature: SelectedFeature | null): boolean {
  const t = feature?.geometry?.type;
  return t === "Polygon" || t === "MultiPolygon";
}

/**
 * Kesişim form UI — tucbs-harita-analiz IntersectionPanel.tsx kalıbı.
 * Panel içinde açılır; HTTP yalnızca @tucbs/core Map.runIntersection üzerinden.
 *
 * @fires tucbs-intersection-run - Kesişim hesaplaması başlatıldığında (Çalıştır'a tıklanınca) yayılır;
 * `detail` içinde `mapElementId`, `labelA`, `labelB` bulunur.
 */
@customElement("tucbs-intersection-tool")
export class TucbsIntersectionTool extends LitElement {
  static override readonly styles = [css`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      color: #111827;
    }

    .panel {
      padding: 0;
    }

    .title {
      margin: 0 0 6px;
      font-size: 16px;
      font-weight: 600;
    }

    .info {
      margin: 0 0 12px;
      padding: 8px 10px;
      font-size: 12.5px;
      line-height: 1.4;
      color: #374151;
      background: #f3f4f6;
      border-radius: 8px;
    }

    .row-between {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    label.lbl {
      display: block;
      font-weight: 600;
      font-size: 12.5px;
      margin-bottom: 4px;
    }

    .switch {
      background: transparent;
      border: none;
      color: #2563eb;
      font-size: 12px;
      cursor: pointer;
      padding: 0;
      text-decoration: underline;
    }

    .switch:disabled {
      color: #9ca3af;
      cursor: not-allowed;
      text-decoration: none;
    }

    .input-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    input[type="text"] {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 34px 10px 10px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #f9fafb;
      font-size: 13px;
      outline: none;
      color: inherit;
      cursor: pointer;
    }

    .refresh {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      color: #9ca3af;
      line-height: 1;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 4px;
    }

    button.run {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
    }

    button.run:disabled {
      background: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }

    .status {
      margin: 8px 0 0;
      font-size: 12.5px;
    }

    .status.error {
      color: #da1e28;
    }

    .status.success {
      color: #198038;
    }

    .status.loading {
      color: #525252;
    }
  `, analysisHelpStyles];

  /** Haritanın bağlı olduğu host elementin `id`'si; `map` verilmemişse bununla `document.getElementById` üzerinden bulunur. */
  @property() mapElementId = "";

  /** Doğrudan bağlanacak `@tucbs/core` `Map` referansı; verilirse `mapElementId` yerine bu kullanılır. */
  @property({ attribute: false }) map: TucbsMapCore | null = null;

  /** Shadow DOM köküne uygulanacak özel CSS metni. */
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _labelA = "";
  @state() private _labelB = "";
  @state() private _status: RunStatus = "idle";
  @state() private _message = "";
  @state() private _helpOpen = false;

  private _featureA: SelectedFeature | null = null;
  private _featureB: SelectedFeature | null = null;
  private _pendingSlot: SelectionSlot | null = null;
  private _map: TucbsMapCore | null = null;
  private _mapHost: MapHost | null = null;
  private readonly _customCssState: CustomCssState = { sheet: null };

  private readonly _onEntityClick = (detail: EntityInteractionDetail): void => {
    if (!this._pendingSlot) return;

    const feature = entityToGeoJSON(detail.entity);
    if (!feature) {
      this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
      return;
    }

    const selected: SelectedFeature = {
      type: "Feature",
      id: feature.id,
      properties: (feature.properties ?? {}) as Record<string, unknown>,
      geometry: feature.geometry as object & { type?: string },
    };

    const gtype = selected.geometry?.type;
    if (gtype !== "Polygon" && gtype !== "MultiPolygon") {
      this._note("error", "Kesişim için yalnızca poligon seçin.");
      return;
    }

    const label = featureLabel(feature);
    if (this._pendingSlot === "a") {
      this._featureA = selected;
      this._labelA = label;
    } else {
      this._featureB = selected;
      this._labelB = label;
    }

    this._pendingSlot = null;
    this._status = "idle";
    this._message = "";
    this._syncHighlight();
  };

  private readonly _onMapReady = (): void => {
    this._bindMap();
  };

  /** Bileşen DOM'a bağlandığında haritaya bağlanır. */
  override connectedCallback(): void {
    super.connectedCallback();
    this._bindMap();
  }

  /** Bileşen DOM'dan kaldırıldığında harita bağlantısını ve identify baskılamasını kaldırır. */
  override disconnectedCallback(): void {
    this._unbindMap();
    super.disconnectedCallback();
  }

  /**
   * `customCss` değiştiğinde stil uygular; `mapElementId` veya `map` değiştiğinde
   * harita bağlantısını yeniden kurar.
   */
  override updated(changed: Map<string, unknown>): void {
    if (changed.has("customCss")) {
      applyCustomCss(
        this.shadowRoot,
        this.customCss,
        this._customCssState,
        "tucbs-intersection-tool",
      );
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._unbindMap();
      this._bindMap();
    }
  }

  private _resolveMap(): TucbsMapCore | null {
    if (this.map) return this.map;
    return this._resolveMapHost()?.map ?? null;
  }

  private _resolveMapHost(): MapHost | null {
    if (!this.mapElementId) return null;
    return document.getElementById(this.mapElementId) as MapHost | null;
  }

  private _bindMap(): void {
    if (this.map) {
      this._attachInteraction(this.map);
      return;
    }

    const host = this._resolveMapHost();
    if (!host) return;
    this._mapHost = host;

    if (host.map) {
      this._attachInteraction(host.map);
      return;
    }

    host.addEventListener("ready", this._onMapReady, { once: true });
  }

  private _attachInteraction(map: TucbsMapCore): void {
    if (this._map === map) return;
    if (this._map) {
      this._map.interactionManager.off("entity:click", this._onEntityClick);
      this._map.interactionManager.resumeIdentify();
    }
    this._map = map;
    map.interactionManager.on("entity:click", this._onEntityClick);
    // Bu arac ta AYNI "entity:click"i secim icin kullandigindan (bkz
    // _onEntityClick), TucbsIdentifyPanel'in oznitelik tablosu/koordinat
    // karti araciyla AYNI tiklamaya tepki verip araya girmesin diye
    // (bkz kullanici geri bildirimi) -- InteractionManager'in kendi
    // event yayinini DURDURMAZ, sadece identify'e "araya girme" sinyali verir.
    map.interactionManager.suspendIdentify();
  }

  private _unbindMap(): void {
    if (this._map) {
      this._map.interactionManager.off("entity:click", this._onEntityClick);
      this._map.clearSelectionHighlight();
      this._map.interactionManager.resumeIdentify();
      this._map = null;
    }
    if (this._mapHost) {
      this._mapHost.removeEventListener("ready", this._onMapReady);
      this._mapHost = null;
    }
  }

  /** Form altındaki satır yerine toast basar. */
  private _note(kind: "info" | "error" | "success", message: string): void {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }

  private _beginSelection(slot: SelectionSlot): void {
    this._pendingSlot = slot;
    this._status = "idle";
    this._note(
      "info",
      slot === "a"
        ? "Lütfen ilk poligonu seçin — haritada bir alana tıklayın."
        : "Lütfen ikinci poligonu seçin — haritada bir alana tıklayın.",
    );
  }

  private _onInputClick(slot: SelectionSlot): void {
    this._beginSelection(slot);
  }

  private _onRefreshSlot(slot: SelectionSlot): void {
    if (slot === "a") {
      this._featureA = null;
      this._labelA = "";
    } else {
      this._featureB = null;
      this._labelB = "";
    }
    this._beginSelection(slot);
    this._syncHighlight();
  }

  /** Sonuçtan sonra iki seçim ve kırmızı vurgu kalkar. */
  private _clearForm(): void {
    this._featureA = null;
    this._featureB = null;
    this._labelA = "";
    this._labelB = "";
    this._pendingSlot = null;
    this._syncHighlight();
  }

  private _syncHighlight(): void {
    const features = [this._featureA, this._featureB].filter((feature) => feature !== null);
    this._map?.showSelectionHighlight(features);
  }

  private _onSwitchToDatasets(): void {
    this._note("info", "Veri kümesi seçimi bu sürümde henüz desteklenmiyor.");
  }

  private async _onRun(): Promise<void> {
    if (this._status === "loading") return;

    if (!isPolygonFeature(this._featureA) || !isPolygonFeature(this._featureB)) {
      this._note("error", "Her iki seçim de poligon olmalıdır.");
      return;
    }

    if (!this._map) {
      this._bindMap();
    }
    const map = this._resolveMap();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._map = map;

    this._status = "loading";
    this._message = "İşleniyor…";
    this._pendingSlot = null;

    this.dispatchEvent(
      new CustomEvent("tucbs-intersection-run", {
        detail: {
          mapElementId: this.mapElementId,
          labelA: this._labelA,
          labelB: this._labelB,
        },
        bubbles: true,
        composed: true,
      }),
    );

    try {
      await map.runIntersection(
        {
          geojsonA: this._featureA!,
          geojsonB: this._featureB!,
        },
        { title: "Kesişim sonucu" },
      );

      this._clearForm();
      this._status = "idle";
      this._message = "";
      showToast("success", "Kesişim tamamlandı.");
      // Basarili sonuc identify'i GERI ACMAZ (bkz TucbsBufferTool._onRun ayni
      // WHY yorumu / kullanici geri bildirimi: "farkli feature secip analize
      // devam edebiliyor, cakisma oluyor yine") -- identify sadece aractan
      // GERCEKTEN cikildiginda (_unbindMap -> resumeIdentify) geri gelir.
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-intersection-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Kesişim hesaplanamadı.");
    }
  }

  /** Bileşenin şablonunu render eder. */
  override render() {
    const busy = this._status === "loading";
    const canRun =
      isPolygonFeature(this._featureA) &&
      isPolygonFeature(this._featureB) &&
      !busy;

    return html`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kesişim</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => { this._helpOpen = true; }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Kesişim", COGRAFI_HELP.kesisim, () => { this._helpOpen = false; })}

        <div class="row-between">
          <label class="lbl">Arasındaki kesişme...</label>
          <button
            type="button"
            class="switch"
            ?disabled=${busy}
            @click=${this._onSwitchToDatasets}
          >
            Veri kümelerine geç
          </button>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Poligon seç"
            .value=${this._labelA ? `= ${this._labelA}` : ""}
            ?disabled=${busy}
            @click=${() => this._onInputClick("a")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => this._onRefreshSlot("a")}
          >
            ⟳
          </button>
        </div>

        <div class="row-between">
          <label class="lbl">Ve...</label>
          <button
            type="button"
            class="switch"
            ?disabled=${busy}
            @click=${this._onSwitchToDatasets}
          >
            Veri kümelerine geç
          </button>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Poligon seç"
            .value=${this._labelB ? `= ${this._labelB}` : ""}
            ?disabled=${busy}
            @click=${() => this._onInputClick("b")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => this._onRefreshSlot("b")}
          >
            ⟳
          </button>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._onRun}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>

        ${this._message
          ? html`<p class="status ${this._status}">${this._message}</p>`
          : null}
      </div>
    `;
  }
}
