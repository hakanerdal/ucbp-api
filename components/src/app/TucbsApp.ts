import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Map as TucbsMapInstance, BasemapId } from "@tucbs/core";
import "../map/TucbsMap.js";
import "./TucbsToolbar.js";
import "../layer-list/TucbsLayerList.js";
import "./TucbsInfoBar.js";
import "../identify/TucbsIdentifyPanel.js";
import "../layer-sources/TucbsFileUpload.js";
import "../layer-sources/TucbsServiceUpload.js";
import "../style-editor/TucbsStyleEditor.js";
import "../layer-list/TucbsLegendPanel.js";
import "../layer-list/TucbsLayerExport.js";
import "../layer-sources/TucbsAuthorizedLayers.js";
import "./TucbsBusyOverlay.js";
import { WriteOnlyApiKey } from "../shared/util/WriteOnlyApiKey.js";

// FAZ 3.2: goto-coordinate/settings/print eklendi -- ucu de artik TucbsToolbar
// icinde (BUILTIN_TOOLS + kendi importlari, bkz TucbsToolbar.ts) kendi kendine
// yeten arac tag'leri, TucbsApp'in ayrica bir import/standalone-render
// satirina ihtiyaci yok (mevcut zoom/draw/measure/delete ile AYNI desen).
// "settings" kendi panelinde basemap-picker'i GOMDUGU icin (bkz
// TucbsSettingsTool.ts) `tucbs-basemap-picker` ARTIK standalone render()
// TAG'i OLARAK KALDIRILDI (asagida) -- aksi halde ayni haritayi kontrol eden
// iki kopya olurdu. `map-export` toolbar aracindan CIKARILDI -- yerine
// katman-bazli disa aktarim icin `tucbs-layer-export` marker-tag olarak
// eklendi (asagida, diger ciplak marker tag'lerin yaninda; TucbsLayerList
// bunu document.querySelector ile bulup portal olarak kullanir). "analysis"
// HER ZAMAN dahildir -- TucbsAnalysisTool kendi slide-over panelini VE
// icine gomdugu <tucbs-analysis-panel>'i kendi kendine olusturup map'i
// toolbar'dan zaten aldigi icin (bkz TucbsAnalysisTool.ts), harici bir
// <tucbs-analysis-panel> marker'i tespit etmeye GEREK YOK (eskiden
// _hasAnalysisPanel/_syncAnalysisPanelFlag/_wireAnalysisPanel ile boyle bir
// tespit yapiliyordu -- tucbs-analysis-panel'in henuz bos iskelet oldugu
// donemden kalma, kaldirildi).
const TOOLBAR_TOOLS = "zoom,goto-coordinate,draw,measure,analysis,delete,settings,print";
// draw-tool'un flyout'unda 6 aracin tumu (nokta/cizgi/alan/dikdortgen/daire/
// serbest cizim) gorunsun diye TucbsToolbar'in toolProps mekanizmasiyla ic
// draw-tool'a iletiliyor (varsayilan sadece point/polyline/polygon gosterir).
const TOOLBAR_TOOL_PROPS: Record<string, Record<string, unknown>> = {
  draw: { tools: "point,polyline,polygon,rectangle,circle,freehand" },
};

/**
 * Ana uygulama konteyner component'i — tek tag ile tam harita uygulamasi
 * (v8/v14 dokumaninin "Senaryo 1" tasarimi). TUM component'leri (analiz
 * paneli dahil) dahili olarak barindirir; zoom/goto-coordinate/draw/
 * delete/measure/analysis/settings/print ARAcLARI sadece dahili
 * tucbs-toolbar uzerinden kullanilir (ayri standalone tag olarak sunulmaz --
 * FAZ 3.2: basemap-picker, FAZ 3.3: quality-bar de artik SADECE "settings"
 * panelinin GOMDUGU kopya uzerinden erisiliyor; "analysis" da kendi
 * `<tucbs-analysis-panel>`'ini kendi icinde gomer, bkz TucbsAnalysisTool.ts).
 *
 * @fires ready - Ic `<tucbs-map>`'in "ready" event'i yakalanip TucbsApp'in TEK
 * kaynakli kendi "ready" event'i olarak yeniden dispatch edilir; detail:
 * `{ map: TucbsMapInstance }`.
 * @fires error - Ic `<tucbs-map>`'in "error" event'i yakalanip aynen yeniden
 * dispatch edilir; detail: ic event'in detail'i (yapisi TucbsMap'e baglidir).
 *
 * @example
 * ```html
 * <tucbs-app
 *   api-key="YOUR_API_KEY"
 *   basemap="hgm-temel"
 *   mode="3D"
 * ></tucbs-app>
 * ```
 */
@customElement("tucbs-app")
export class TucbsApp extends LitElement {
  // === Public Properties (HTML attribute olarak ayarlanabilir) ===

  /**
   * Dahili `<tucbs-map>`'e oldugu gibi iletilecek API anahtari. Yazma-amaçli
   * (write-only) property — get her zaman maskelenmis deger doner (bos ya da
   * "••••••"), gercek deger sadece render() icindeki ic aktarimda kullanilir.
   */

  // <tucbs-app> tek-tag sarmalayici oldugu icin, onu kullanan bir tuketicinin
  // apiKey verebilecegi TEK yer burasi -- daha once bu property yoktu ve
  // <tucbs-app apiKey="..."> yazilsa bile ic tucbs-map'e hic ulasmiyordu.
  // Gercek deger `#apiKeyState` (WriteOnlyApiKey, shared/util/WriteOnlyApiKey.ts)
  // icinde tutulur -- TucbsMap.ts ile AYNI "write-only" deseni uygular (bkz o
  // dosyadaki yorum) -- disaridan okuma maskelenir, sadece render()'daki ic
  // aktarim (asagida, GERCEK .real ile) gercek degeri kullanir.
  //
  // GUVENLIK: bu alan digerleri gibi (`private readonly`) DEGIL, GERCEK ES
  // private (`#`) olmali -- yoksa `el._apiKeyState.real` ile gercek anahtar
  // disaridan okunabilir hale gelir (bkz WriteOnlyApiKey.ts basindaki UYARI).
  #apiKeyState = new WriteOnlyApiKey(this);
  // DAVRANIS DEGISIKLIGI (disclosed, ayri commit): artik `value ?? ""`
  // varsayilani uygulaniyor -- TucbsMap.ts/TucbsLayerList.ts ile AYNI
  // sertlesme, onceden SADECE bu dosyada yoktu (bkz
  // project_ucbp_api_writeonly_apikey_uygulama_plani). null/undefined
  // artik sessizce "" olarak saklanir; onceki davranis null/undefined'i
  // OLDUGU GIBI sakliyordu (get zaten `? : ""` ile ayni gorunumu
  // verdiginden PRATIKTE gözlemlenebilir fark yoktu).
  @property({ attribute: "api-key" })
  set apiKey(value: string) {
    this.#apiKeyState.write(value);
  }
  get apiKey(): string {
    return this.#apiKeyState.masked;
  }

  /** Kullanilacak taban harita (basemap) kimligi. */
  @property() basemap: BasemapId = "hgm-temel";

  /** Harita gorunum modu — 2D ya da 3D. */
  @property() mode: "2D" | "3D" = "3D";

  /** Harita kalite/detay seviyesi (0-100). */
  @property({ type: Number }) quality = 70;

  /** Dahili `<tucbs-layer-list>` panelinin gosterilip gosterilmeyecegi. */
  @property({ attribute: "show-layer-list", type: Boolean }) showLayerList = true;

  /** Dahili `<tucbs-toolbar>`'in gosterilip gosterilmeyecegi. */
  @property({ attribute: "show-toolbar", type: Boolean }) showToolbar = true;

  /** Dahili `<tucbs-info-bar>`'in gosterilip gosterilmeyecegi. */
  @property({ attribute: "show-info-bar", type: Boolean }) showInfoBar = true;

  // === Internal State ===
  @state() private _map: TucbsMapInstance | null = null;

  // tucbs-map (ve dolayisiyla dahili Cesium widgets.css'i) Shadow DOM
  // sinirini gecemedigi icin -- ayrica tucbs-layer-list'in kendi
  // "document.querySelector('tucbs-file-upload')" tarzi varlik-tespiti da
  // ust-seviye document'e bakiyor -- TucbsApp de TucbsMap ile AYNI nedenle
  // Light DOM kullanir (kendi Shadow root'unu olusturmaz).
  /** Shadow DOM yerine Light DOM kullanır (bkz yukarıdaki WHY yorumu). */
  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  private readonly _onMapReady = (event: Event): void => {
    // Ic <tucbs-map>'in "ready"si disari sizmasin -- TucbsApp kendi
    // "ready"sini TEK kaynak olarak asagida yeniden dispatch eder.
    // stopPropagation olmadan, Light DOM'da bu event appEl'e kadar
    // bubbling yapip TucbsApp'in kendi re-dispatch'iyle CIFT tetiklemeye
    // yol aciyordu (appEl'e baglanan bir "ready" dinleyicisi hem bu ic
    // event'i hem TucbsApp'in kendi event'ini yakaliyordu).
    event.stopPropagation();
    const { map } = (event as CustomEvent<{ map: TucbsMapInstance }>).detail;
    this._map = map;
    this.dispatchEvent(
      new CustomEvent("ready", { detail: { map }, bubbles: true, composed: true }),
    );
  };

  private readonly _onMapError = (event: Event): void => {
    event.stopPropagation();
    const detail = (event as CustomEvent).detail;
    this.dispatchEvent(
      new CustomEvent("error", { detail, bubbles: true, composed: true }),
    );
  };

  /**
   * `basemap`/`mode`/`quality` property'lerindeki degisiklikleri, harita
   * hazir oldugunda (`_map` atanmisken) ilgili `Map` metodlarina uygular.
   *
   * @param changed - Bu guncellemede degisen property'lerin eski degerleri.
   */
  override updated(changed: PropertyValues): void {
    if (!this._map) return;
    if (changed.has("basemap")) this._map.setBasemap(this.basemap);
    if (changed.has("mode")) this._map.setMode(this.mode);
    if (changed.has("quality")) this._map.setQuality(this.quality);
  }

  /**
   * Tam harita uygulamasini olusturur: dahili `<tucbs-layer-list>`,
   * `<tucbs-map>`, `<tucbs-toolbar>`, `<tucbs-identify-panel>`,
   * `<tucbs-info-bar>` ve varlik-tespiti icin kullanilan ciplak marker
   * tag'leri (`tucbs-file-upload`, `tucbs-service-upload`,
   * `tucbs-style-editor`, `tucbs-legend-panel`, `tucbs-layer-export`,
   * `tucbs-authorized-layers`).
   */
  override render() {
    return html`
      <style>
        tucbs-app {
          display: block;
          width: 100%;
          height: 100%;
        }
      </style>

      ${this.showLayerList
        ? html`<tucbs-layer-list
            .layerManager=${this._map?.layerManager}
            .map=${this._map ?? undefined}
            .apiKey=${this.#apiKeyState.real}
          ></tucbs-layer-list>`
        : nothing}

      <tucbs-map
        .apiKey=${this.#apiKeyState.real}
        .basemap=${this.basemap}
        .mode=${this.mode}
        .quality=${this.quality}
        @ready=${this._onMapReady}
        @error=${this._onMapError}
      ></tucbs-map>

      ${this.showToolbar
        ? html`<tucbs-toolbar
            .map=${this._map ?? undefined}
            tools=${TOOLBAR_TOOLS}
            .toolProps=${TOOLBAR_TOOL_PROPS}
          ></tucbs-toolbar>`
        : nothing}

      <tucbs-identify-panel
        .interactionManager=${this._map?.interactionManager}
        .layerManager=${this._map?.layerManager}
      ></tucbs-identify-panel>

      ${this.showInfoBar
        ? html`<tucbs-info-bar .interactionManager=${this._map?.interactionManager}></tucbs-info-bar>`
        : nothing}

      <!-- tucbs-layer-list kendi ic-taraf file-upload/service-upload/style-
           editor/legend-panel butonlarini SADECE bu tag'lerin kendi KOKUNDE
           (this.getRootNode() -- document VEYA bir shadow root, bkz GC-03
           4.4 Adim 6/internal/MarkerWatcher.ts) var oldugunu gorunce
           gosterir; bir MutationObserver ile bu CANLI izlenir (sonradan
           eklenir/kaldirilirsa buton da canli guncellenir). Bu ciplak/bagsiz
           tag'ler SADECE o tespit icin var, gercek isleyisi tucbs-layer-list
           kendi ic bunyesinde .layerManager binding'iyle yapar (bkz.
           TucbsLayerList _openStyleEditor/_openServiceUpload). tucbs-map-preview
           de benzer sekilde tucbs-service-upload tarafindan document.body'ye
           dogrudan portal olarak eklenir -- burada ayrica tag olarak GEREKMEZ. -->
      <tucbs-file-upload></tucbs-file-upload>
      <tucbs-service-upload></tucbs-service-upload>
      <tucbs-style-editor></tucbs-style-editor>
      <tucbs-legend-panel></tucbs-legend-panel>
      <tucbs-layer-export></tucbs-layer-export>
      <tucbs-authorized-layers></tucbs-authorized-layers>
      <tucbs-busy-overlay></tucbs-busy-overlay>
    `;
  }
}
