import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Cartesian3, Cartographic } from "cesium";
import { measureGround, snapScaleForDisplay } from "@tucbs/core";
import type { InteractionManager, MapInteractionDetail } from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { whenTucbsMapReady, type TucbsMapElement } from "../shared/util/bindTucbsMap.js";
import { TimerBag } from "../shared/util/TimerBag.js";

/**
 * Harita altinda sabit duran, imlecin altindaki koordinati (enlem/boylam),
 * terrain yuksekligini ve kamera olcegini ("1/N") gosteren bilgi cubugu.
 * Degerler `InteractionManager` uzerindeki `map:mousemove`, `camera:changed`
 * ve `camera:moveEnd` olaylarina abone olunarak guncellenir.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-info-bar mapElementId="map"></tucbs-info-bar>
 * ```
 */
@customElement("tucbs-info-bar")
export class TucbsInfoBar extends LitElement {
  static override readonly styles = css`
    :host {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 900;
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 28px;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.75rem;
      /* Bar, Cesium canvas'inin uzerine bindigi icin altindaki
         pan/zoom etkilesimini bloklamamasi gerekir. */
      pointer-events: none;
    }

    /* Gorsel govde bilerek :host'tan ayri bir class'ta -- boylece tuketici
       customCss ile bunu ozellestirirken :host (custom property inheritance
       riski tasir) yerine sadece bu class'i hedefler. */
    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      background: rgba(38, 38, 38, 0.85);
      color: #f4f4f4;
    }

    .left {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      overflow: hidden;
      white-space: nowrap;
    }

    .right {
      flex: none;
      margin-left: 1rem;
      color: #c6c6c6;
      white-space: nowrap;
    }
  `;

  /** Core JS API `InteractionManager` referansi; imlec/kamera olaylarina buradan abone olunur. */

  // Senaryo 1: property binding ile gelir.
  // Senaryo 2: ready event sonrasi mapElementId ile JS ile atanir.
  @property({ attribute: false }) interactionManager: InteractionManager | undefined;

  /** Opsiyonel: `tucbs-map` element'inin ID'si; verilirse `interactionManager` buradan kendiliginden baglanir. */

  // TucbsLayerList'teki ayni desenle (Senaryo 2A/2B) InteractionManager'a kendi baglanir.
  @property() mapElementId = "";

  /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni. */

  // Bkz. ./internal/CustomCss.ts.
  @property({ attribute: "custom-css" }) customCss = "";

  /**
   * Sag alttaki altlik harita kaynak/telif metni. Varsayilani HGM'dir; HGM
   * DISINDA bir altlik kullanildiginda (ör. `basemap`'e ham bir XYZ URL'i
   * verilmisse) tuketici bunu DEGISTIRMELIDIR -- aksi halde bar, ekranda
   * olmayan bir kaynagi gosterir. Cesium'un kendi credit kutusu bu üründe
   * gizli oldugu icin (bkz. Map.ts hiddenCreditContainer) gorunur TEK
   * atif yeri burasidir.
   */
  @property() attribution =
    "EPSG:4326 Altlık Harita, Harita Genel Müdürlüğü (HGM) tarafından sağlanmaktadır.";

  private readonly _customCssState: CustomCssState = { sheet: null };

  @state() private _lon: number | null = null;
  @state() private _lat: number | null = null;
  @state() private _height: number | null = null;
  @state() private _scale: number | null = null;

  // Mousemove cok sik tetiklendigi icin state guncellemesi (ve dolayisiyla
  // re-render) frame basina en fazla bir kez uygulanir.
  private _mouseMoveRaf: number | null = null;
  private _pendingMouseDetail: MapInteractionDetail | null = null;
  private _cameraRaf: number | null = null;
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  private readonly _onMapMouseMove = (detail: MapInteractionDetail): void => {
    this._pendingMouseDetail = detail;
    if (this._mouseMoveRaf !== null) return;
    this._mouseMoveRaf = this._timers.requestAnimationFrame(() => {
      this._mouseMoveRaf = null;
      const pending = this._pendingMouseDetail;
      if (!pending) return;
      const [lon, lat] = pending.position;
      this._lon = lon;
      this._lat = lat;
      this._height = this._sampleHeight(lon, lat);
    });
  };

  private readonly _onCameraChanged = (): void => {
    if (this._cameraRaf !== null) return;
    this._cameraRaf = this._timers.requestAnimationFrame(() => {
      this._cameraRaf = null;
      this._scale = this._computeScale();
    });
  };

  /**
   * `interactionManager` disaridan verilmemisse, `mapElementId` ile
   * bulunan `tucbs-map` elementinin hazir olmasini bekleyip ondan alir.
   */
  override firstUpdated(): void {
    // Senaryo 1: interactionManager property binding ile disaridan zaten atanmis.
    if (this.interactionManager || !this.mapElementId) return;

    // Senaryo 2: "mapElementId" ile tucbs-map elementinin id'si verilmis.
    const mapEl = document.getElementById(this.mapElementId) as TucbsMapElement | null;
    if (!mapEl) return;

    whenTucbsMapReady(mapEl, (host) => {
      if (host.interaction) {
        this.interactionManager = host.interaction;
      }
    });
  }

  /**
   * `customCss` degistiginde ozel stili shadow DOM'a uygular; `interactionManager`
   * degistiginde onceki referanstan olay dinleyicilerini kaldirip yenisine baglar.
   */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-info-bar");
    }

    if (!changed.has("interactionManager")) return;
    const previous = changed.get("interactionManager") as InteractionManager | undefined;
    if (previous) this._unbind(previous);
    if (this.interactionManager) {
      this._bind(this.interactionManager);
      // Kamera henuz hic hareket etmeden de ilk olcek degeri hesaplanir.
      this._scale = this._computeScale();
    }
  }

  /** Baglanti kesildiginde olay dinleyicilerini ve bekleyen animation frame'leri temizler. */
  override disconnectedCallback(): void {
    if (this.interactionManager) this._unbind(this.interactionManager);
    // ESKIDEN _mouseMoveRaf/_cameraRaf burada cancelAnimationFrame ile elle
    // iptal ediliyordu; artik _timers (TimerBag) super.disconnectedCallback()
    // icinde (hostDisconnected) ikisini de iptal ediyor.
    super.disconnectedCallback();
  }

  // Kamera ucusu (zoom adimi) bittiginde camera:changed/moveEnd son kareyi
  // bildirmeyebiliyor ve olcek ara degerde takili kaliyordu; konum degistiyse
  // her karede yeniden hesaplanir (karsilastirma ucuz, hesap yalniz degisimde).
  private _lastCameraPosition: Cartesian3 | undefined;
  private _removePostRender: (() => void) | undefined;

  private readonly _onPostRender = (): void => {
    const camera = this.interactionManager?.camera;
    if (!camera) return;
    if (this._lastCameraPosition?.equals(camera.positionWC)) return;
    this._lastCameraPosition = camera.positionWC.clone(this._lastCameraPosition);
    this._onCameraChanged();
  };

  private _bind(interactionManager: InteractionManager): void {
    this._removePostRender = interactionManager.scene.postRender.addEventListener(this._onPostRender);
    interactionManager.on("map:mousemove", this._onMapMouseMove);
    interactionManager.on("camera:changed", this._onCameraChanged);
    interactionManager.on("camera:moveEnd", this._onCameraChanged);
  }

  private _unbind(interactionManager: InteractionManager): void {
    this._removePostRender?.();
    this._removePostRender = undefined;
    interactionManager.off("map:mousemove", this._onMapMouseMove);
    interactionManager.off("camera:changed", this._onCameraChanged);
    interactionManager.off("camera:moveEnd", this._onCameraChanged);
  }

  // Terrain yuklu degilse (veya o karo icin veri henuz gelmemisse) 0 doner —
  // ellipsoid uzerinde yukseklik tanim olarak 0'dir.
  private _sampleHeight(lon: number, lat: number): number {
    const globe = this.interactionManager?.scene.globe;
    if (!globe) return 0;
    const height = globe.getHeight(Cartographic.fromDegrees(lon, lat));
    return height ?? 0;
  }

  // Olcegi zoom adimlariyla AYNI olcumden (core measureGround) alir; basamaga
  // cok yakinsa tam basamak olarak gosterir (1/2.499.843 yerine 1/2.500).
  private _computeScale(): number | null {
    const scene = this.interactionManager?.scene;
    if (!scene) return null;
    const ground = measureGround(scene);
    return ground ? snapScaleForDisplay(ground.scale) : null;
  }

  private _formatLat(): string {
    if (this._lat === null) return "–";
    const suffix = this._lat >= 0 ? "N" : "S";
    return `Enlem ${Math.abs(this._lat).toFixed(5)}° ${suffix}`;
  }

  private _formatLon(): string {
    if (this._lon === null) return "–";
    const suffix = this._lon >= 0 ? "E" : "W";
    return `Boylam ${Math.abs(this._lon).toFixed(5)}° ${suffix}`;
  }

  private _formatHeight(): string {
    if (this._height === null) return "–";
    return `Yükseklik ${Math.round(this._height)} m`;
  }

  private _formatScale(): string {
    if (this._scale === null || !Number.isFinite(this._scale)) return "–";
    // "tr-TR" locale binlik ayirici olarak nokta kullanir (orn. "6.528.928").
    const formatted = Math.round(this._scale).toLocaleString("tr-TR");
    return `Ölçek 1/${formatted}`;
  }

  /** `interactionManager` yoksa hicbir sey render etmez; varsa koordinat/yukseklik/olcek satirini cizer. */
  override render() {
    if (!this.interactionManager) {
      return nothing;
    }
    return html`
      <div class="bar">
        <div class="left">
          <span>${this._formatLat()}</span>
          <span>${this._formatLon()}</span>
          <span>${this._formatHeight()}</span>
          <span>${this._formatScale()}</span>
        </div>
        <div class="right">${this.attribution}</div>
      </div>
    `;
  }
}
