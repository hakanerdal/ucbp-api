import { LitElement, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type * as cesium from "cesium";
import {
  Map,
  LayerManager,
  DrawingManager,
  InteractionManager,
  AnalysisManager,
  TucbsError,
  ensureEffectiveApiKeyValid,
  getUcbpApiBase,
  type MapOptions,
  type BasemapId,
  type MapExtent,
} from "@tucbs/core";
import type { ApiKeyAuthState } from "../shared/util/bindTucbsMap.js";
import { WriteOnlyApiKey } from "../shared/util/WriteOnlyApiKey.js";

let tucbsMapInstanceCounter = 0;

/**
 * Cesium tabanlı ana harita web component'i (`<tucbs-map>`) — Core JS API'nin
 * (`Map`/`LayerManager`/`DrawingManager`/`InteractionManager`/`AnalysisManager`)
 * DOM üzerinden kullanılmasını sağlar.
 * @fires ready - apiKey doğrulanıp harita (Cesium `Viewer`) başarıyla kurulduğunda; `detail: { map: Map }`.
 * @fires error - apiKey doğrulaması başarısız olduğunda (harita hiç kurulmaz); `detail: { error, message, title, code?, number? }`.
 *
 * @example
 * ```html
 * <tucbs-map
 *   id="map"
 *   api-key="YOUR_API_KEY"
 *   basemap="hgm-temel"
 *   mode="3D"
 *   quality="70"
 * ></tucbs-map>
 * <script type="module">
 *   const mapEl = document.getElementById("map");
 *   mapEl.addEventListener("ready", (event) => {
 *     const map = event.detail.map; // Core JS API `Map` instance'ı
 *     console.log(map.layerManager.getLayers());
 *   });
 *   mapEl.addEventListener("error", (event) => {
 *     console.error(event.detail.code, event.detail.message);
 *   });
 * </script>
 * ```
 */
@customElement("tucbs-map")
export class TucbsMap extends LitElement {
  // this.id bossa (kullanici id vermemisse) benzersiz bir fallback uretir,
  // boylece birden fazla id'siz <tucbs-map> ayni container id'sini uretmez.
  private readonly _autoId = `tucbs-map-${++tucbsMapInstanceCounter}`;
  private get hostId(): string {
    return this.id || this._autoId;
  }
  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  // apiKey, `#apiKeyState` (WriteOnlyApiKey, shared/util/WriteOnlyApiKey.ts)
  // icinde tutulur; asagidaki get/set cifti Lit'in "custom property
  // accessor" mekanizmasi (bkz Lit docs) ile bunu HTML attribute/JS
  // property olarak YAZILABILIR ama OKUNAMAZ hale getirir. Amac: DOM
  // Inspector'da veya `document.querySelector(...).apiKey` ile sayfadaki
  // BASKA bir script (3.parti widget, XSS payload'i) tarafindan gercek
  // anahtarin sifir-efor okunmasini engellemek (bkz.
  // project_ucbp_api_global_import_seviyesi_apikey_arastirma guvenlik
  // degerlendirmesi). Gercek deger sadece bu sinif icinden (`.real` ile,
  // firstUpdated()/_prepareMap()/_grantApiKeyTo() icinde) kullanilir.
  //
  // GUVENLIK: bu alan digerleri gibi (`private readonly`) DEGIL, GERCEK ES
  // private (`#`) olmali -- yoksa `el._apiKeyState.real` ile gercek anahtar
  // disaridan okunabilir hale gelir (bkz WriteOnlyApiKey.ts basindaki UYARI).
  #apiKeyState = new WriteOnlyApiKey(this);
  /** Harita apiKey'i — yalnızca yazılabilir; `get` güvenlik nedeniyle her zaman maskelenmiş döner (bkz yukarıdaki `#apiKeyState` WHY notu). */
  @property({ attribute: "api-key" })
  set apiKey(value: string) {
    this.#apiKeyState.write(value);
  }
  get apiKey(): string {
    return this.#apiKeyState.masked;
  }
  /** Analiz backend'i (ucbp-api) için X-API-Key değeri. */
  @property() authToken = "";
  /** JWT Bearer token; TUCBS API kimlik doğrulaması için. */
  @property() proxyBase = "";

  // Eski attribute; analiz URL’si core .env (VITE_ANALYSIS_API_BASE) ile sabit.
  /** Başlangıç altlık harita kimliği; değiştiğinde `map.setBasemap()` otomatik çağrılır. */
  @property() basemap: BasemapId = "hgm-siyasi";
  /**
   * Harita ilk yüklendiğinde ortalanacak bölge (west/south/east/north, derece).
   * HTML attribute olarak JSON string kabul eder, ör:
   * `initialExtent='{"west":22.94,"south":34.05,"east":47.39,"north":42.7}'`.
   * Sadece `firstUpdated()` sırasında kullanılır; sonradan değiştirilmesi haritayı
   * otomatik hareket ettirmez (çalışma zamanında `map.setExtent()` kullanılmalı).
   * `mapOptions.camera` verilmişse yok sayılır.
   */
  @property({ type: Object }) initialExtent: MapExtent | undefined;
  /** Harita modu ("2D"/"3D"); değiştiğinde `map.setMode()` otomatik çağrılır. */
  @property() mode: "2D" | "3D" = "3D";
  /** Render kalitesi (0-100); değiştiğinde `map.setQuality()` otomatik çağrılır. */
  @property({ type: Number }) quality = 70;
  /**
   * Core JS API'nin `MapOptions`'ını olduğu gibi tek bir property olarak alır
   * (camera, cesiumOptions, timeline, animation, vb.) — `firstUpdated()` içindeki
   * varsayılan değerlerin üzerine yazılır. HTML attribute olarak JSON string
   * kabul eder, ör: `mapOptions='{"camera":{"longitude":35,...}}'`.
   */
  @property({ type: Object }) mapOptions: MapOptions | undefined;
  /** `#cesium-host` CSS genişliği ("100%", "800px" gibi herhangi bir CSS boyut değeri). */
  @property() mapWidth = "100%";
  /** `#cesium-host` CSS yüksekliği ("100%", "600px" gibi herhangi bir CSS boyut değeri). */
  @property() mapHeight = "100%";
  // === Internal State ===
  /** @internal Gerçek Core JS API `Map` instance'ı; dışarıya {@link map} getter'ı ile (apiKey doğrulanmışsa) açılır. */
  @state() _mapInstance: Map | null = null;

  // firstUpdated() sirasinda basemap/mode/quality zaten Map() constructor'ina
  // options olarak gecirilir; updated()'in ayni ilk dongude bu degerleri
  // "degismis" sanip tekrar setBasemap()/setMode()/setQuality() cagirmasini
  // (gereksiz tekrar) engellemek icin kullanilir.
  private _skipInitialPropertySync = false;
  /** Validate hatası — harita üstünde sade overlay (modal değil). */
  @state() private _authError: { title: string; message: string } | null = null;
  @state() private _apiKeyAuthState: ApiKeyAuthState = "none";

  /** apiKey doğrulama durumu ("none" / "pending" / "ok" / "failed"). */
  get apiKeyAuthState(): ApiKeyAuthState {
    return this._apiKeyAuthState;
  }

  private _isMapApiExposed(): boolean {
    return this._apiKeyAuthState === "ok";
  }

  // === Public Getter'lar (Core JS API'ye erisim) ===
  /** Core JS API `Map` instance'ı; apiKey doğrulanana kadar `null`. */
  get map(): Map | null {
    if (!this._isMapApiExposed()) {
      return null;
    }
    return this._mapInstance;
  }
  /** Core JS API `LayerManager`'ı; apiKey doğrulanana kadar `undefined`. */
  get layerManager(): LayerManager | undefined {
    if (!this._isMapApiExposed()) {
      return undefined;
    }
    return this._mapInstance?.layerManager;
  }
  /** Core JS API `DrawingManager`'ı; apiKey doğrulanana kadar `undefined`. */
  get drawing(): DrawingManager | undefined {
    if (!this._isMapApiExposed()) {
      return undefined;
    }
    return this._mapInstance?.drawingManager;
  }
  /** Core JS API `InteractionManager`'ı; apiKey doğrulanana kadar `undefined`. */
  get interaction(): InteractionManager | undefined {
    if (!this._isMapApiExposed()) {
      return undefined;
    }
    return this._mapInstance?.interactionManager;
  }
  /** Core JS API `AnalysisManager`'ı; apiKey doğrulanana kadar `undefined`. */
  get analysisManager(): AnalysisManager | undefined {
    if (!this._isMapApiExposed()) {
      return undefined;
    }
    return this._mapInstance?.analysisManager;
  }
  /** Cesium `Viewer` instance'ı; apiKey doğrulanana kadar `undefined`. */
  get viewer(): cesium.Viewer | undefined {
    if (!this._isMapApiExposed()) {
      return undefined;
    }
    return this._mapInstance?.viewer;
  }

  /**
   * Gercek apiKey degerini DOGRUDAN hedefin apiKey setter'ina yazar (PUSH).
   * Hedef (ör. TucbsServiceUpload) bunu kendi basina OKUYAMAZ -- write-only
   * getter deseni (bkz yukaridaki #apiKeyState yorumu) hala geçerli; sadece bu
   * metodu cagirarak TucbsMap'in KENDI bildigi degeri "vermesini" isteyebilir.
   * Transfer TucbsMap'in KENDI closure'i icinde gerceklesir, disaridan
   * okunabilir yeni bir yuzey acilmaz.
   */
  _grantApiKeyTo(target: { apiKey: string }): void {
    target.apiKey = this.#apiKeyState.real;
  }

  // Cesium'un kendi widgets.css'i document <head>'e enjekte ediliyor; Shadow DOM
  // kullanılırsa bu global stil sızmaz ve canvas 0x0 kalır. Bu yüzden Light DOM'a geçiyoruz.
  /** Shadow DOM yerine Light DOM kullanır (bkz yukarıdaki WHY yorumu). */
  protected override createRenderRoot(): HTMLElement {
    return this;
  }
  // === Yasam Dongusu ===
  /** Bileşen DOM'a bağlandığında: `id` yoksa otomatik-üretilen id'yi atar. */
  override connectedCallback(): void {
    super.connectedCallback();
    // mapElementId ile baglanan diger bilesenler (TucbsLayerList, TucbsBasemapPicker,
    // TucbsFileUpload) document.getElementById(mapElementId) kullaniyor — bu yuzden
    // uretilen otomatik id, sadece ic container div'de degil, <tucbs-map>'in kendi
    // id attribute'unda da gorunur olmali.
    if (!this.id) {
      this.id = this._autoId;
    }
  }
  /** İlk render sonrası: apiKey'i doğrulayıp haritayı (Cesium `Viewer`'ı) kurar (bkz {@link _prepareMap}). */
  override firstUpdated(): void {
    // Attribute bazen accessor’a binmezse (geç upgrade) — doğrudan oku
    const attrKey = this.getAttribute("api-key");
    if (attrKey && !this.#apiKeyState.real) {
      this.#apiKeyState.writeDirect(attrKey);
    }
    // apiKey hic verilmemis/bos OLABILIR -- bu durumda bile Map hemen
    // basarisiz sayilmaz, cunku configureTucbs() ile ayarlanmis GLOBAL bir
    // apiKey olabilir (bkz asagidaki _prepareMap -> ensureEffectiveApiKeyValid).
    // Ne instance ne global anahtar yoksa (veya gecersizse) Map (Viewer+
    // basemap) HIC KURULMAZ -- apiKey dogrulanmadan hicbir network istegi
    // (basemap dahil) atilmamasi icin Map kurulumu dogrulamadan SONRAYA
    // alinir. Bu durumda layerManager de olusmaz -- ona bagli
    // TucbsServiceUpload/TucbsLayerList gibi bilesenler de islevsiz kalir;
    // bu KABUL EDILEN bir sonuc (kullanici karari).
    void this._prepareMap();
  }

  /** apiKey'i (instance veya global) Map kurulmadan ONCE dogrular; basarisizsa Map hic kurulmaz. */
  private async _prepareMap(): Promise<void> {
    this._apiKeyAuthState = "pending";
    try {
      await ensureEffectiveApiKeyValid(this.#apiKeyState.real || undefined, getUcbpApiBase());
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const title = err instanceof TucbsError ? err.title : "API Hatası";
      console.error("[tucbs-map] apiKey validate başarısız:", message);
      this._apiKeyAuthState = "failed";
      this._authError = { title, message };
      this.dispatchEvent(new CustomEvent("error", {
        detail: err instanceof TucbsError
          ? { error: err, message, title, code: err.code, number: err.number }
          : { error: err, message, title },
        bubbles: true,
        composed: true,
      }));
      return;
    }

    const containerid = `#${this.hostId}-host`;
    const container = this.renderRoot.querySelector(containerid) as HTMLElement;

    const options: MapOptions = {
      timeline: false,
      animation: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: false,
      basemap: this.basemap,
      // Kosulsuz "apiKey: this.#apiKeyState.real" -- gercek deger bos string
      // oldugunda bile (global anahtara guvenilen senaryo) CORE Map'in
      // kendi "options.apiKey ?? getGlobalApiKey()" dususunu TETIKLEMEZDI
      // ("" ?? icin "var" sayilir, undefined degil). Bu yuzden bos ise HIC
      // geçirilmez -- Map kendi global dususunu dogru uygulayabilsin.
      ...(this.#apiKeyState.real ? { apiKey: this.#apiKeyState.real } : {}),
      ...(this.initialExtent !== undefined ? { initialExtent: this.initialExtent } : {}),
      ...this.mapOptions,
    };

    this._mapInstance = new Map(container, options);
    // MapOptions'ta "quality" alani YOK (bkz. @tucbs/core map.types.ts) --
    // basemap'in aksine constructor'a options ile gecirilemiyor, bu yuzden
    // "quality" attribute'unun gercekten etkili olmasi icin ayrica ve
    // ACIKCA setQuality() cagirilmasi GEREKIYOR. Bu satir olmadan
    // quality="70" gibi bir attribute hicbir zaman uygulanmiyordu (Cesium
    // kendi varsayilaninda kaliyordu) -- asagidaki _skipInitialPropertySync
    // bayragi SADECE bu cagriyla birlikte "quality zaten uygulandi"
    // varsayimini dogru kilar.
    this._mapInstance.setQuality(this.quality);
    this._skipInitialPropertySync = true;
    this._apiKeyAuthState = "ok";
    this._authError = null;
    this.dispatchEvent(new CustomEvent("ready", {
      detail: { map: this._mapInstance },
      bubbles: true,
      composed: true,
    }));
  }
  /** Reactive attribute değişikliklerini (basemap/mode/quality) Core JS API'ye iletir. */
  override updated(changed: PropertyValues): void {
    if (!this._mapInstance) return;
    // Ilk guncelleme dongusunde basemap/mode/quality zaten new Map(options)
    // ile uygulanmisti; ayni dongude updated() de calisip bunlari "degismis"
    // sayarak tekrar cagirmasin diye bir kez atlaniyor.
    if (this._skipInitialPropertySync) {
      this._skipInitialPropertySync = false;
      return;
    }
    if (changed.has("basemap")) this._mapInstance.setBasemap(this.basemap);
    if (changed.has("mode")) this._mapInstance.setMode(this.mode);
    if (changed.has("quality")) this._mapInstance.setQuality(this.quality);
  }
  /** Bileşen DOM'dan kaldırıldığında haritayı (Cesium `Viewer`'ı) yok eder. */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._mapInstance?.destroy();
    this._mapInstance = null;
  }
  // === Render ===
  /** Bileşenin şablonunu render eder (harita container'ı + apiKey hata overlay'i). */

  // Light DOM'da :host geçersiz olduğundan stil, gerçek etiket adı ile ekleniyor.
  override render() {
    return html`
      <style>
        tucbs-map {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }
        #${this.hostId}-host {
          width: ${this.mapWidth};
          height: ${this.mapHeight};
        }
        .tucbs-map-auth-error {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(127, 29, 29, 0.45);
          box-sizing: border-box;
        }
        .tucbs-map-auth-error__panel {
          max-width: 420px;
          width: 100%;
          background: #fef2f2;
          color: #111827;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 18px 20px;
          box-shadow: 0 10px 40px rgba(127, 29, 29, 0.2);
          font-family: Segoe UI, system-ui, sans-serif;
        }
        .tucbs-map-auth-error__title {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 700;
          color: #991b1b;
        }
        .tucbs-map-auth-error__msg {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.5;
          color: #7f1d1d;
          word-break: break-word;
        }
      </style>
      <div id="${this.hostId}-host"></div>
      ${this._authError
        ? html`
            <div class="tucbs-map-auth-error" role="alert">
              <div class="tucbs-map-auth-error__panel">
                <p class="tucbs-map-auth-error__title">${this._authError.title}</p>
                <p class="tucbs-map-auth-error__msg">${this._authError.message}</p>
              </div>
            </div>
          `
        : null}
    `;
  }
}
