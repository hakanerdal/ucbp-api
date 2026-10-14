import { LitElement, css, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html, unsafeStatic } from "lit/static-html.js";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import "../tools/TucbsZoomTool.js";
import "../tools/TucbsGoToCoordinate.js";
import "../tools/TucbsDrawTool.js";
import "../tools/TucbsDeleteTool.js";
import "../tools/TucbsMeasureTool.js";
import "../tools/TucbsMapExport.js";
import "../tools/TucbsSettingsTool.js";
// FAZ 3.2: diger TUM yerlesik araclardan FARKLI olarak bu import EKSIKTI --
// "print" SADECE tuketici `@tucbs/components` paketinin TAMAMINI (index.ts
// uzerinden) import ettiginde TESADUFEN calisiyordu (TucbsPrintTool.js orada
// AYRICA export edildigi icin). Sadece bu dosyayi/TucbsApp.js'i tek basina
// import eden (ör. agac-sallamali/parcali) bir tuketicide "print" SESSIZCE
// bozuk kalirdi -- kok neden burada, diger araclarla AYNI desenle duzeltildi.
import "../print/TucbsPrintTool.js";
import "../analysis/TucbsAnalysisTool.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { whenTucbsMapReady, type TucbsMapElement } from "../shared/util/bindTucbsMap.js";
import { TimerBag } from "../shared/util/TimerBag.js";

/** `<tucbs-toolbar>`'ın harita üzerindeki sabit konumu. */
export type TucbsToolbarPosition =
  | "right-center"
  | "top-right"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "bottom-left"
  | "left-center";

// position -> :host icin inline stil (7 sabit konum, TucbsBasemapPicker'daki
// position:fixed deseniyle tutarli). Statik CSS yerine burada tutulmasinin
// nedeni: her secenegin farkli bir top/right/bottom/left/transform
// kombinasyonu gerektirmesi -- willUpdate() icinde host'a dogrudan uygulanir.
const POSITION_STYLES: Record<TucbsToolbarPosition, Partial<CSSStyleDeclaration>> = {
  "right-center": { top: "50%", right: "1rem", bottom: "", left: "", transform: "translateY(-50%)" },
  "top-right": { top: "1rem", right: "1rem", bottom: "", left: "", transform: "" },
  "bottom-right": { bottom: "1rem", right: "1rem", top: "", left: "", transform: "" },
  "top-center": { top: "1rem", left: "50%", right: "", bottom: "", transform: "translateX(-50%)" },
  "top-left": { top: "1rem", left: "1rem", right: "", bottom: "", transform: "" },
  "bottom-left": { bottom: "1rem", left: "1rem", top: "", right: "", transform: "" },
  "left-center": { top: "50%", left: "1rem", right: "", bottom: "", transform: "translateY(-50%)" },
};

// Toolbar'in ONCEDEN TANIMLI id -> custom element etiket adi eslemesi.
// Yeni bir TUCBS araci yazildikca (measure/map-export) buraya tek satir
// eklenir -- kapali bir switch DEGIL, tuketici kod da kendi component'ini
// `registerTool()`/`custom-tools` ile AYNI mekanizmaya ekleyebilir.
const BUILTIN_TOOLS: Record<string, string> = {
  zoom: "tucbs-zoom-tool",
  "goto-coordinate": "tucbs-goto-coordinate",
  draw: "tucbs-draw-tool",
  delete: "tucbs-delete-tool",
  measure: "tucbs-measure-tool",
  "map-export": "tucbs-map-export",
  settings: "tucbs-settings-tool",
  print: "tucbs-print-tool",
  analysis: "tucbs-analysis-tool",
};

// `registerTool()`/`custom-tools` ile verilen etiket adi `unsafeStatic` ile
// DOGRUDAN HTML'e yazilir (bkz. _renderTool()) -- bu yuzden en azindan
// gecerli bir custom-element adi SEKLINDE olmayan string'ler (ör. bir HTML
// injection denemesi) burada reddedilir. Trust siniri: bu string'ler
// UYGULAMA GELISTIRICISININ kendi kodundan/HTML'inden gelir (son-kullanici
// serbest-metin girdisi degil) -- document.createElement(tagName) yazmakla
// ayni guven seviyesi, ama yine de ucretsiz bir savunma katmanidir (v17 SS8.5).
const CUSTOM_ELEMENT_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;

/**
 * `tucbs-toolbar`: arac CONTAINER'i. Icinde gosterdigi her arac (ör.
 * `tucbs-zoom-tool`) kendi basina da kullanilabilen bagimsiz bir Web
 * Component'tir -- toolbar sadece `tools` listesine gore bunlari sıralar ve
 * haritaya baglar (merkezi bir active-tool state'i TUTMAZ).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2). Her araca
 * `tool-props` JSON attribute'uyla (veya `setToolProps()` ile) ek property
 * geçilebilir — aşağıda `draw` aracına özel çizim geometrisi listesi iletiliyor.
 *
 * @example
 * ```html
 * <tucbs-map id="map" api-key="YOUR_API_KEY" basemap="hgm-temel"></tucbs-map>
 *
 * <tucbs-toolbar
 *   mapElementId="map"
 *   tools="zoom,goto-coordinate,draw,measure,delete,analysis,settings,print"
 *   tool-props='{"draw":{"tools":"point,polyline,polygon,rectangle,circle,freehand"}}'
 * ></tucbs-toolbar>
 * ```
 */
@customElement("tucbs-toolbar")
export class TucbsToolbar extends LitElement {
  static override readonly styles = css`
    :host {
      position: fixed;
      z-index: 1000;
      display: block;
    }

    .toolbar {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `;

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  /** Opsiyonel: `tucbs-map` elementinin DOM id'si (Senaryo 2 baglama). */
  @property() mapElementId = "";

  /** Toolbar'in harita uzerindeki sabit konumu (7 secenekten biri). */
  @property() position: TucbsToolbarPosition = "right-center";

  /** Virgulle ayrilmis, render sirasini belirleyen arac ID listesi. */

  // Reaktif: deger degisince (dogrudan atama, addTool()/removeTool() ile)
  // yeniden render olur.
  @property() tools = "zoom";

  /** id -> ozel HTML etiket adi eslemesi; bilinen ("zoom"/"draw" vb.) ID'lerin uzerine de yazilip ozellestirilebilir. */

  // index.html'den JSON attribute olarak (`custom-tools='{"my-tool":"my-custom-element"}'`,
  // `layerOptions` ile ayni {type:Object} JSON-parse deseni) VEYA JS'ten
  // registerTool() ile verilebilir -- ikisi de ayni property'ye yazar.
  @property({ type: Object, attribute: "custom-tools" }) customTools: Record<string, string> = {};

  /** id -> o araca dogrudan atanacak ek property'ler (ör. TucbsDrawTool'un `tools`/`defaultTool` gibi kendi ozellikleri). */

  // `.map` disinda toolbar TEK BASINA hicbir property iletmedigi icin (bkz.
  // _renderTool() eski hali) alt araclar toolbar icinde her zaman kendi
  // varsayilanlarini kullanmak zorundaydi -- bu, o kisidi kaldirir.
  // String-birlestirme/HTML enjeksiyonu YOK: degerler dogrudan DOM
  // property'si olarak atanir (`Object.assign`), bu yuzden customTools'taki
  // gibi ayri bir custom-element-adi regex dogrulamasina ihtiyac YOK.
  // index.html'den JSON attribute (`tool-props='{"draw":{"tools":"point,polygon"}}'`)
  // VEYA JS'ten setToolProps() ile verilebilir -- registerTool() ile AYNI
  // ikili-yol deseni.
  @property({ type: Object, attribute: "tool-props" }) toolProps: Record<string, Record<string, unknown>> = {};

  /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni. */

  // Bkz. ./internal/CustomCss.ts. NOT: bu SADECE toolbar'in KENDI (.toolbar)
  // shadow DOM'unu etkiler -- icine gomdugu tucbs-zoom-tool vb. araclarin
  // KENDI shadow root'larina sizmaz (duz class seciciler Shadow DOM sinirini
  // asamaz); her aracin kendi gorunumu icin kendi custom-css'i (varsa) ayrica
  // verilmelidir.
  @property({ attribute: "custom-css" }) customCss = "";

  // === JS-only Properties (canli referans, attribute olarak set edilemez) ===
  /** Core JS API `Map` instance'i. */

  // Senaryo 1: disaridan property binding. Senaryo 2: mapElementId ile
  // otomatik baglanir. Icerdeki her arac component'ine .map property binding
  // ile aynen aktarilir.
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  private readonly _customCssState: CustomCssState = { sheet: null };
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  // === JS-only Methods (calisma zamaninda arac ekleme/cikarma) ===
  /**
   * `tools` listesine bir arac id'si ekler (verilirse `index` konumuna, aksi halde sona).
   *
   * @param id - Eklenecek arac id'si.
   * @param index - Opsiyonel eklenecegi konum; verilmezse listenin sonuna eklenir.
   *
   * @example
   * ```ts
   * toolbar.addTool("delete");
   * ```
   */
  addTool(id: string, index?: number): void {
    const list = this._toolIds();
    if (index === undefined) list.push(id);
    else list.splice(index, 0, id);
    this.tools = list.join(",");
  }

  /**
   * `tools` listesinden verilen id'yi cikarir.
   *
   * @param id - Cikarilacak arac id'si.
   *
   * @example
   * ```ts
   * toolbar.removeTool("measure");
   * ```
   */
  removeTool(id: string): void {
    this.tools = this._toolIds()
      .filter((existing) => existing !== id)
      .join(",");
  }

  /**
   * Bir arac id'sini ozel bir custom element etiket adina baglar.
   *
   * @param id - Baglanacak arac id'si.
   * @param tagName - Kayit edilecek custom element etiket adi (gecerli bir custom-element adi olmalidir).
   *
   * @example
   * ```ts
   * toolbar.registerTool("my-tool", "my-custom-element");
   * toolbar.addTool("my-tool");
   * ```
   */

  // `tools`'a ayrica addTool(id) ile eklenmedikce bu KAYIT tek basina hicbir
  // sey render ETMEZ -- `tools` "ne gosterilecek/hangi sirada", `customTools`
  // "o ID hangi etikete karsilik gelir" sorusunu cevaplar, ikisi ayri
  // kaygilardir.
  registerTool(id: string, tagName: string): void {
    if (!CUSTOM_ELEMENT_NAME_PATTERN.test(tagName)) {
      console.warn(
        `[tucbs-toolbar] registerTool("${id}", "${tagName}") -- gecersiz custom element adi, yok sayildi.`,
      );
      return;
    }
    this.customTools = { ...this.customTools, [id]: tagName };
  }

  /**
   * Belirli bir arac id'sine ek property'ler atar (ör. `{tools:"point,polygon"}`).
   *
   * @param id - Property'lerin atanacagi arac id'si.
   * @param props - Ilgili arac component'ine dogrudan atanacak property'ler.
   *
   * @example
   * ```ts
   * toolbar.setToolProps("draw", { tools: "point,polygon" });
   * ```
   */

  // registerTool() ile AYNI JS-API deseni, `tool-props` attribute'unun
  // programatik esdegeri.
  setToolProps(id: string, props: Record<string, unknown>): void {
    this.toolProps = { ...this.toolProps, [id]: props };
  }

  private _toolIds(): string[] {
    return this.tools
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }

  // Gercek render icin kullanilacak etiket adini dondurur -- customTools
  // (registerTool() VEYA custom-tools attribute'u ile gelmis olabilir, HER
  // IKI yol da ayni property'ye yazdigindan burada tek noktadan dogrulanir)
  // BUILTIN_TOOLS'un onune gecer. Gecersiz bir custom-element adi (attribute
  // JSON'undan dogrudan gelmis, registerTool()'un regex kontrolunu atlamis
  // olabilir) burada da reddedilir -- tek gercek kapi budur.
  private _tagFor(id: string): string | undefined {
    const tagName = this.customTools[id] ?? BUILTIN_TOOLS[id];
    if (tagName && !CUSTOM_ELEMENT_NAME_PATTERN.test(tagName)) return undefined;
    return tagName;
  }

  /** `position` değiştiğinde host'a ilgili sabit-konum stillerini uygular; `tools`/`customTools` değiştiğinde bilinmeyen/geçersiz arac id'leri için uyarı loglar. */
  protected override willUpdate(changed: PropertyValues): void {
    if (changed.has("position")) {
      Object.assign(this.style, POSITION_STYLES[this.position]);
    }

    if (changed.has("tools") || changed.has("customTools")) {
      const unknown = this._toolIds().filter((id) => !this._tagFor(id));
      if (unknown.length > 0) {
        console.warn(
          `[tucbs-toolbar] Bilinmeyen/gecersiz arac id'leri: ${unknown.join(", ")} -- yok sayildi (registerTool() ile kayit edilmedi ya da gecersiz etiket adi).`,
        );
      }
    }
  }

  // === Yasam Dongusu: Map baglama ===
  /**
   * Ilk render'dan sonra haritaya baglanmayi dener: `map` disaridan zaten
   * atanmamissa `mapElementId` ile eslesen `tucbs-map` elementini bulup
   * hazir oldugunda `map` property'sini otomatik doldurur (Senaryo 2).
   */
  override firstUpdated(): void {
    // Senaryo 1: map property binding ile disaridan zaten atanmis.
    if (this.map) return;

    if (!this.mapElementId) {
      // Parent (tucbs-app) ".map"i asenkron cozup property binding ile gec
      // atayabilir -- yanlis-pozitif uyariyi onlemek icin bir kare
      // ertelenip tekrar kontrol edilir (bkz TucbsZoomTool.ts ayni yorum).
      // Kare _timers (TimerBag) ile planlanir: bilesen o kare icinde DOM'dan
      // kalkarsa iptal edilir. ESKIDEN ciplak requestAnimationFrame'di ve
      // kaldirilmis bilesen icin de yanlis uyari basiliyordu.
      this._timers.requestAnimationFrame(() => {
        if (this.map) return;
        console.warn(
          '[tucbs-toolbar] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin icerdeki araclar islevsiz kalacak.',
        );
      });
      return;
    }

    const mapEl = document.getElementById(this.mapElementId) as TucbsMapElement | null;
    if (!mapEl) {
      console.warn(
        `[tucbs-toolbar] mapElementId="${this.mapElementId}" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin icerdeki araclar islevsiz kalacak.`,
      );
      return;
    }

    whenTucbsMapReady(mapEl, (host) => {
      if (host.map) {
        this.map = host.map;
      }
    });
  }

  private _renderTool(id: string) {
    const tagName = this._tagFor(id);
    if (!tagName) return null;
    // unsafeStatic: tagName BUILTIN_TOOLS'tan (sabit) veya CUSTOM_ELEMENT_NAME_PATTERN
    // ile zaten dogrulanmis customTools'tan gelir -- _tagFor() bu kapiyi TEK
    // noktadan garanti eder (bkz. yukaridaki WHY yorumu). `data-tool-id`
    // SADECE _applyToolProps()'un DOM'da bu elementi bulabilmesi icin --
    // gorsel/islevsel bir etkisi yok.
    const tag = unsafeStatic(tagName);
    return html`<${tag} data-tool-id=${id} .map=${this.map}></${tag}>`;
  }

  // toolProps'taki her giris icin ilgili alt-arac elementini `data-tool-id`
  // ile bulup property'lerini DOGRUDAN atar (Object.assign) -- HTML string
  // birlestirme YOK, bu yuzden customTools'taki gibi ayri bir dogrulamaya
  // ihtiyac yok. Idempotent: ayni degerlerin tekrar atanmasi zararsizdir,
  // bu yuzden her `updated()` sonrasi guvenle tekrar cagrilabilir.
  private _applyToolProps(): void {
    for (const [id, props] of Object.entries(this.toolProps)) {
      const el = this.renderRoot.querySelector(`[data-tool-id="${id}"]`);
      if (el) Object.assign(el, props);
    }
  }

  /** `customCss` değiştiğinde özel CSS'i shadow DOM'a uygular; `toolProps`/`map`/`tools`/`customTools` değiştiğinde alt araçların property'lerini yeniden atar. */
  protected override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-toolbar");
    }

    if (changed.has("toolProps") || changed.has("map") || changed.has("tools") || changed.has("customTools")) {
      this._applyToolProps();
    }
  }

  /**
   * `map` henuz atanmamissa hicbir sey render etmez; atanmissa `tools`
   * listesindeki her arac id'sini sirasiyla ilgili custom element olarak render eder.
   */
  override render() {
    if (!this.map) {
      return nothing;
    }
    return html` <div class="toolbar">${this._toolIds().map((id) => this._renderTool(id))}</div> `;
  }
}
