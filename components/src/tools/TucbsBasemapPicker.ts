import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import {
  ChevronRight16 as ChevronRightIcon,
  Close16 as CloseIcon,
  Checkmark16 as CheckmarkIcon,
  WarningAltFilled16 as WarningIcon,
  Map16 as MapIcon,
} from "@carbon/icons";
import type { Map as TucbsMapInstance, BasemapId, ManagedLayer } from "@tucbs/core";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { bindMapByElementId, standardMapBindingMessages } from "../shared/util/bindTucbsMap.js";
import { TimerBag } from "../shared/util/TimerBag.js";
import { SIYASI_THUMB, TEMEL_THUMB, ORTOFOTO_THUMB, YUKSEKLIK_THUMB } from "./BasemapThumbnails.js";

const ICON_CHEVRON_RIGHT = unsafeSVG(iconNodeToString(ChevronRightIcon));
const ICON_CLOSE = unsafeSVG(iconNodeToString(CloseIcon));
const ICON_CHECK = unsafeSVG(iconNodeToString(CheckmarkIcon));
const ICON_WARNING = unsafeSVG(iconNodeToString(WarningIcon));
const ICON_MAP = unsafeSVG(iconNodeToString(MapIcon));

// _select()'in basalttigi "pending" durumunun GORUNUR hale gelmesi icin
// beklenen sure -- kullanici bildirimi: "Altlık Haritalarda hızlıca
// ulaşabiliyorsak KESİNLİKLE loading olmasın", yani normal/hizli yuklenen
// (cogu) durumda spinner HIC yanip sonmemeli.
//
// ONCEKI deger (400ms) BU AMACI SAGLAMIYORDU: olculdu (bkz kullanici
// bildirimi "HGM erişimimde hiçbir sıkıntı yokken bile her defasında
// çıkıyor") -- saglikli/sorunsuz bir HGM altlik yuklemesi bile (tam
// ekranlik ONLARCA karo + ucbp-api proxy zinciri uzerinden tek tek istek)
// rahatlikla 1-3+ saniye surebiliyor; yani "basemap:recovered" (bkz
// Map.ts watchBasemap/onProgress) neredeyse HER ZAMAN 400ms'den GEC
// geliyordu, banner PRATIKTE HER degisimde goruniyordu. Map.ts'teki
// FALLBACK_DELAY_MS (3000ms, gorsel yedek goruntu) VE
// BASEMAP_UNAVAILABLE_DELAY_MS (10000ms, kesin basarisizlik) esikleriyle
// AYNI hiyerarsiyi koruyacak sekilde (indikator > 400ms ama < FALLBACK_DELAY_MS
// gostermeli -- yedek goruntu gorunmeden ONCE "yukleniyor" gorunmesi mantikli)
// 1500ms'ye cikarildi: tipik/saglikli bir tam-altlik yuklemesini sessizce
// kapsarken, gercekten gozle gorulur bir gecikme oldugunda hala makul bir
// surede (FALLBACK_DELAY_MS'den once) haber veriyor.
const PENDING_INDICATOR_DELAY_MS = 1500;

interface BasemapConfig {
  readonly id: BasemapId;
  readonly label: string;
  // tucbs-react'teki (harita-3d/index.tsx, mapBackendToBasemaps) AYNI
  // gercek altlik harita onizlemeleri -- ayri asset dosyalari YERINE
  // base64 data URI olarak gomulu (bkz. tools/BasemapThumbnails.ts):
  // bu bilesen tek dosyalik bagimsiz bir ESM bundle olarak dagitildigindan
  // (bkz. ComponentAPIAllComponentsTest'in import-map + statik dosya
  // sunucusu deseni) tuketicinin ayrica bir "mapImages/" klasoru
  // kopyalamasina GEREK KALMAZ.
  readonly thumbnail: string;
}

// map.types.ts'teki BasemapId union'inin (bilinen literal degerlerin) calisma zamani karsiligi.
const DEFAULT_BASEMAPS: readonly BasemapConfig[] = [
  { id: "hgm-siyasi", label: "HGM Siyasi", thumbnail: SIYASI_THUMB },
  { id: "hgm-yukseklik", label: "HGM Yükseklik", thumbnail: YUKSEKLIK_THUMB },
  { id: "hgm-ortofoto", label: "HGM Ortofoto", thumbnail: ORTOFOTO_THUMB },
  { id: "hgm-temel", label: "HGM Temel", thumbnail: TEMEL_THUMB },
];

/**
 * `tucbs-basemap-picker`: altlık harita seçici. Kart-grid tasarımı.
 * `tucbs-settings-tool` sayfada mevcutsa (o kendi actigi "Ayarlar" panelinin
 * icine bu bileseni `.embedded=true` ile ACIKCA gomer) bu bilesen salt
 * icerik (baslik+grid, kendi toggle/kapatma UI'i OLMADAN) render edilir.
 * Aksi halde (embedded=false, varsayilan) TucbsLayerList'teki toggle-btn/
 * panel deseniyle AYNI sekilde kendi kendine yeter: bir toggle butonu
 * gosterir, tiklaninca AYNI konumda (sag-ust, :host'un kendi position:fixed
 * ankraji) kart panelini acar, panelin sag-ust kosesindeki X ile kapatilir.
 * Harita SIKISTIRILMAZ/kaydirilmaz -- TucbsLayerList'in kendi paneli gibi
 * sadece haritanin ustunde yuzen bir kart.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-basemap-picker mapElementId="map" active-basemap="hgm-temel"></tucbs-basemap-picker>
 * ```
 */
@customElement("tucbs-basemap-picker")
export class TucbsBasemapPicker extends LitElement {
  static override readonly styles = css`
    :host {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      color: var(--cds-text-primary, #161616);
      font: inherit;
      cursor: pointer;
    }

    .toggle-btn:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
    }

    .toggle-arrow {
      display: inline-flex;
      color: var(--cds-icon-secondary, #6f6f6f);
    }

    .panel {
      background: #fafcfd;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      min-width: 280px;
      max-width: 360px;
      padding: 1rem;
    }

    .title {
      display: block;
      font-weight: 700;
      font-size: 0.875rem;
      margin-bottom: 0.875rem;
    }

    /* Bagimsiz modda (bkz. embedded) baslik + kapatma (X) butonu bir satirda --
       TucbsLayerList'teki ".header" ile ayni fikir. Embedded modda (Ayarlar
       panelinin icinde) bu satir/buton hic YOK, sadece duz ".title" kullanilir. */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.875rem;
    }

    .header .title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0;
    }

    .title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      line-height: 0;
      color: #0f62fe;
    }

    .title-icon svg {
      width: 1rem;
      height: 1rem;
      display: block;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      flex: none;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--cds-icon-secondary, #6f6f6f);
      cursor: pointer;
    }

    .close-btn:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
      color: var(--cds-icon-primary, #161616);
    }

    .close-btn svg {
      width: 1rem;
      height: 1rem;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .card {
      position: relative;
      aspect-ratio: 3 / 2;
      display: flex;
      align-items: flex-end;
      padding: 0;
      border: 2px solid transparent;
      border-radius: 10px;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      font: inherit;
      cursor: pointer;
    }

    .card::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 55%);
    }

    .card.selected {
      border-color: #0f62fe;
      box-shadow: 0 0 0 2px rgba(15, 98, 254, 0.35);
    }

    .card:disabled {
      cursor: not-allowed;
      opacity: 0.45;
      filter: grayscale(60%);
    }

    .check-badge {
      position: absolute;
      top: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 1.375rem;
      border-radius: 999px;
      background: #0f62fe;
      color: #ffffff;
    }

    .check-badge svg {
      width: 14px;
      height: 14px;
    }

    .card-label {
      position: relative;
      z-index: 1;
      padding: 0.5rem 0.625rem;
      font-weight: 600;
      font-size: 0.75rem;
      color: #ffffff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    }

    .error-banner {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      padding: 0.5rem 0.625rem;
      border-radius: 6px;
      background: var(--cds-support-error-inverse, #fff1f1);
      color: var(--cds-support-error, #da1e28);
      font-size: 0.75rem;
      line-height: 1.3;
    }

    .error-banner svg {
      flex: none;
      width: 1rem;
      height: 1rem;
      margin-top: 0.0625rem;
    }

    .toggle-btn.has-error {
      border-color: var(--cds-support-error, #da1e28);
      color: var(--cds-support-error, #da1e28);
    }

    .loading-banner {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      padding: 0.5rem 0.625rem;
      border-radius: 6px;
      background: var(--cds-layer-01, #f4f4f4);
      color: var(--cds-text-secondary, #525252);
      font-size: 0.75rem;
      line-height: 1.3;
    }

    .loading-spinner {
      flex: none;
      width: 1rem;
      height: 1rem;
      border: 2px solid var(--cds-border-subtle, #e0e0e0);
      border-top-color: var(--cds-interactive, #0f62fe);
      border-radius: 50%;
      animation: basemap-loading-spin 0.7s linear infinite;
    }

    @keyframes basemap-loading-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  // === Public Properties (HTML attribute olarak ayarlanabilir) ===
  /**
   * Opsiyonel: bağlanılacak `tucbs-map` elementinin DOM id'si (Senaryo 2
   * bağlama). `map` property binding'i ile de doğrudan verilebilir
   * (Senaryo 1) — TucbsLayerList'teki aynı Senaryo 1/2 bağlama mantığı.
   */
  @property() mapElementId = "";

  /**
   * Aktif altlık harita ID'si. Dışarıdan (attribute/JS) set edilirse
   * `map.setBasemap()` çağrılır; haritanın basemap'i başka bir yerden
   * değiştirilse bile bu değer otomatik senkronize kalır (bkz. `_onLayerAdd`).
   */
  @property({ attribute: "active-basemap" }) activeBasemap: BasemapId | "" = "";

  // === JS-only Properties (canli referans / dizi veri, attribute olarak set edilemez) ===
  /**
   * Core JS API `Map` instance'ı. `tucbs-map` ile property binding olarak da
   * gelir (Senaryo 1), `mapElementId` ile de otomatik bağlanır (Senaryo 2).
   */
  @property({ attribute: false }) map: TucbsMapInstance | undefined;

  /**
   * Listede gösterilecek altlık harita seçenekleri. Varsayılan: `BasemapId`
   * union'ındaki tüm bilinen değerler (bkz. `map.types.ts`).
   */
  @property({ attribute: false }) basemaps: readonly BasemapConfig[] = DEFAULT_BASEMAPS;

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz. `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  /**
   * `tucbs-settings-tool` bu bileşeni kendi "Ayarlar" paneline gömerken
   * `true` verir (bkz. `TucbsSettingsTool._renderIntoPanel()`) — bu özel
   * kopya kendi toggle butonunu/kapatma UI'ini göstermez, sadece içerik
   * (başlık+grid) olarak render edilir.
   */

  // WHY (acik property, TucbsLayerList'teki "cIplak marker tag" DOM-
  // sorgusu deseni DEGIL): tucbs-settings-tool, tucbs-toolbar'in kendi
  // shadow DOM'unda yasar -- `document.querySelector("tucbs-settings-
  // tool")` shadow DOM sinirini asamayacagi icin bu en yaygin kullanimda
  // (toolbar icinde) HER ZAMAN yanlis negatif (`null`) donerdi. Bu
  // bileseni FIILEN olusturan/gomen taraf (TucbsSettingsTool) zaten
  // elinde dogrudan referans tuttugu icin, TucbsToolbar'in `.map=${this.
  // map}` ile yaptigi gibi ACIKCA bildirmesi tek guvenilir yol.
  @property({ type: Boolean, attribute: false }) embedded = false;

  @state() private _open = false;
  // Bagimsiz moddaki (bkz. embedded) panelin acik/kapali durumu --
  // TucbsLayerList'teki `_open`/toggle-btn/panel deseniyle ayni.
  // `embedded=true` iken kullanilmaz.

  @state() private _error = false;
  // Map.watchBasemap()'in yaydigi "basemap:error" event'i (bkz
  // _onBasemapError) ile set edilir. Bu event SADECE HGM/Turksat proxy'sinin
  // GERCEKTEN (birkac tekrar deneme hakki da tukendikten SONRA -- bkz Map.ts
  // BASEMAP_ERROR_RETRY_LIMIT) basarisiz oldugu KESINLESINCE yayilir --
  // SADECE beklenen surede (bkz Map.ts FALLBACK_DELAY_MS) yanit gecikmesinde
  // ARTIK YAYILMAZ (eskiden oyleydi, ama altlik haritalar arasinda hizlica
  // gezinirken HGM'in bir anlik yavaslamasini bile "erisilemiyor" gibi
  // gosterip yanlis-pozitif uretiyordu -- kullanici bildirimi: "HGM'e
  // normalde erisebiliyorum ama gezinirken bir anda uyari geldi, ne alaka").
  // UCUNCU TARAF bir tile servisine (OSM/CARTO vb.) SESSIZCE fallback
  // YAPILMAZ (ticari/kurumsal API dagitiminda lisans/ToS riski -- bkz proje
  // gecmisi); bunun yerine kullaniciya bu acik hata banner'i gosterilir VE
  // altlik harita secim grid'i devre disi birakilir (bkz _renderCard/
  // _renderGrid'teki ?disabled) -- HGM'e erisim yokken baska bir HGM katmani
  // secmenin bir anlami yok. "basemap:recovered" (bkz _onBasemapRecovered)
  // gelince temizlenir -- WHY "layer:add" DEGIL: o event, tile'lar gercekten
  // yuklenmeden, henuz setBasemap() cagrilir cagrilmaz senkron olarak
  // yayiliyor; bu yuzden yedek gosterildikten SONRA HGM'in gercekten
  // iyilesmesini yakalayamazdi.

  @state() private _pending = false;
  // "layer:add" senkron yayildigi ANDA (bkz _onLayerAdd) baslatilan bir
  // zamanlayicidan PENDING_INDICATOR_DELAY_MS sonra, o deneme HALA
  // "basemap:error"/"basemap:recovered" ile sonuclanmadiysa true olur.
  // Boylece normal/hizli yuklenen (cogu) durumda spinner HIC gorunmez --
  // sadece HGM gozle gorulur derecede gecikince (kullanici bildirimi: "10sn
  // sırasında BasemapPicker'da loading olsun") devreye girer.

  private readonly _customCssState: CustomCssState = { sheet: null };
  private _pendingTimer: number | null = null;
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  private readonly _onLayerAdd = (payload: { readonly layer: ManagedLayer }) => {
    if (!payload.layer.isBasemap) return;
    this.activeBasemap = payload.layer.title;

    // BILEREK burada (_select() DEGIL): "layer:add" setBasemap()'in HER
    // cagrilis yolunda (kullanicinin picker'da tikladigi TIKLAMA, Map
    // constructor'inin İLK acilista otomatik cagirdigi setBasemap(), ya da
    // disaridan `active-basemap` attribute'unun degismesi) senkron olarak
    // yayilir -- SADECE _select()'e (yani picker'daki tiklamaya) baglarsak
    // sayfa ilk acilista (kullanici HENUZ hicbir karta tiklamadan) HGM
    // yavas kalirsa (World Imagery yedegi gorunse bile) picker'da NE
    // "disabled" NE "loading" gorunmuyordu -- kullanici bildirimi: "World
    // Imagery geliyor, Altlık Haritaları açıyorum ve disabled DEĞİL! Loading
    // koyalım diyorum".
    this._clearPendingTimer();
    this._pending = false;
    this._pendingTimer = this._timers.setTimeout(() => {
      this._pendingTimer = null;
      this._pending = true;
    }, PENDING_INDICATOR_DELAY_MS);
  };

  private readonly _onBasemapError = () => {
    this._clearPendingTimer();
    this._pending = false;
    this._error = true;
  };

  private readonly _onBasemapRecovered = () => {
    this._clearPendingTimer();
    this._pending = false;
    this._error = false;
  };

  private _clearPendingTimer(): void {
    if (this._pendingTimer !== null) {
      this._timers.clearTimeout(this._pendingTimer);
      this._pendingTimer = null;
    }
  }

  /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken bekleyen zamanlayıcıyı temizler ve haritaya bağlıysa event dinleyicilerini çözer. */
  override disconnectedCallback(): void {
    // _timers (TimerBag) bekleyen zamanlayiciyi super.disconnectedCallback()
    // icinde zaten iptal eder; _clearPendingTimer yine de burada kalir cunku
    // iptalin yaninda _pendingTimer'i da null'a ceker (bilesen DOM'a geri
    // eklenince eski id'yle kalmasin).
    this._clearPendingTimer();
    if (this.map) this._unbindMap(this.map);
    super.disconnectedCallback();
  }

  /**
   * Lit yaşam döngüsü: `map` henüz atanmamışsa `mapElementId` ile eşleşen
   * `tucbs-map` elementini bulur ve varsa doğrudan, yoksa elementin `ready`
   * event'ini bekleyerek `map` özelliğini atar.
   */

  // === Yasam Dongusu: Map baglama ===
  override firstUpdated(): void {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-basemap-picker", "gizli"),
    });
  }

  /**
   * Lit yaşam döngüsü: reaktif özellik değişikliklerini işler — `customCss`
   * değiştiğinde shadow DOM'a yeniden uygulanır, `map` değiştiğinde önceki
   * haritadan çözülüp yenisine bağlanılır, `activeBasemap` dışarıdan
   * değiştirildiğinde (haritanın güncel basemap'inden farklıysa)
   * `map.setBasemap()` çağrılır.
   *
   * @param changed - Değişen reactive property'lerin Lit tarafından sağlanan haritası.
   */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-basemap-picker");
    }

    if (changed.has("map")) {
      const previous = changed.get("map") as TucbsMapInstance | undefined;
      if (previous) this._unbindMap(previous);
      if (this.map) this._bindMap(this.map);
    }

    if (changed.has("activeBasemap") && this.activeBasemap && this.map) {
      // _onLayerAdd zaten haritanin gercek basemap'ini activeBasemap'e yansitiyor;
      // burada tekrar ayni degeri map.setBasemap()'e geri gondermemek icin (gereksiz
      // katman yeniden olusturma/flicker) haritanin GUNCEL basemap'iyle karsilastiriyoruz.
      // (Bir bayrakla degil, dogrudan kaynakla karsilastirmak Lit'in ayni-deger atamalarinda
      // "changed" tetiklememesi yuzunden olusabilecek kalici/senkron-disi durumlari onler.)
      const current = this.map.layerManager
        .getLayers()
        .find((layer) => layer.isBasemap)?.title;
      if (current !== this.activeBasemap) {
        this.map.setBasemap(this.activeBasemap);
      }
    }
  }

  private _bindMap(map: TucbsMapInstance): void {
    map.layerManager.on("layer:add", this._onLayerAdd);
    map.layerManager.on("basemap:error", this._onBasemapError);
    map.layerManager.on("basemap:recovered", this._onBasemapRecovered);
    this._syncFromMap(map);

    // Baglanma ANINDA map.basemapStatus'u DOGRUDAN okuruz -- SADECE
    // event'lere guvenmek yeterli degil: Map constructor'i (sayfanin ILK
    // acilisindaki otomatik setBasemap()) "layer:add"i bu bilesen HENUZ
    // baglanmadan (mapElementId ile "ready" event'ini beklerken) COKTAN
    // yaymis olabilir -- kullanici bildirimi: "World Imagery geliyor,
    // Altlık Haritaları açıyorum ve disabled DEĞİL! Loading koyalım diyorum"
    // (yani NE hata NE loading gorunmuyordu, cunku kacirilmis bir olaya
    // guveniliyordu).
    if (map.basemapStatus === "unavailable") {
      this._error = true;
    } else if (map.basemapStatus === "loading") {
      // Bu deneme ne kadar suredir yukleniyor bilinmiyor -- PENDING_INDICATOR_DELAY_MS
      // debounce'unu (bkz _onLayerAdd) burada ATLAYIP HEMEN gosteriyoruz;
      // "gec de olsa dogru" "hic gostermemek"ten iyidir.
      this._pending = true;
    }
  }

  private _unbindMap(map: TucbsMapInstance): void {
    map.layerManager.off("layer:add", this._onLayerAdd);
    map.layerManager.off("basemap:error", this._onBasemapError);
    map.layerManager.off("basemap:recovered", this._onBasemapRecovered);
  }

  // Haritadaki mevcut aktif basemap'i listede secili hale getirir (ör. baglanma aninda
  // harita zaten bir basemap ile acilmissa, secim ilk render'da dogru gorunur).
  private _syncFromMap(map: TucbsMapInstance): void {
    const active = map.layerManager.getLayers().find((layer) => layer.isBasemap);
    if (active) this.activeBasemap = active.title;
  }

  private _select(id: BasemapId): void {
    // ?disabled=${this._error || this._pending} zaten native olarak
    // tiklamayi engelliyor -- burasi sadece programatik/beklenmedik bir
    // tetiklemeye karsi ek guvenlik. _pending de dahil (kullanici bildirimi:
    // "loading sırasında disabled olması lazım altlık haritaların") --
    // devam eden bir yukleme varken baska bir karta tiklamak Map.ts'teki
    // generation'i ilerletip HALA CIKMAMIS eski yuklemenin sonucunu (basari/
    // hata) yeni secime yanlislikla uygulanmis gibi GORDURMEZ ama kafa
    // karistirici bir ara durum yaratirdi.
    if (this._error || this._pending) return;

    // Onceki secimden kalma (henuz sonuclanmamis) bir zamanlayici varsa
    // (hizlica baska bir basemap'e gecildi) iptal edilir -- Map.ts'teki
    // generation kontrolu ayni sekilde eski watcher'i zaten gecersiz
    // sayiyor, burada da eski "pending" gostergesinin YANLIS basemap icin
    // asilı kalmamasi gerekir.
    this._clearPendingTimer();
    this._pending = false;
    this._pendingTimer = this._timers.setTimeout(() => {
      this._pendingTimer = null;
      this._pending = true;
    }, PENDING_INDICATOR_DELAY_MS);

    this.activeBasemap = id;
  }

  private _openPanel(): void {
    this._open = true;
  }

  private _closePanel(): void {
    this._open = false;
  }

  private _renderCard(basemap: BasemapConfig) {
    const selected = basemap.id === this.activeBasemap;
    return html`
      <button
        type="button"
        class="card ${selected ? "selected" : ""}"
        style="background-image: url('${basemap.thumbnail}')"
        role="radio"
        aria-checked=${selected}
        ?disabled=${this._error || this._pending}
        aria-disabled=${this._error || this._pending}
        @click=${() => this._select(basemap.id)}
      >
        ${selected ? html`<span class="check-badge">${ICON_CHECK}</span>` : nothing}
        <span class="card-label">${basemap.label}</span>
      </button>
    `;
  }

  private _renderGrid() {
    return html`
      <div class="grid" role="radiogroup" aria-label="Altlık Haritalar" aria-disabled=${this._error || this._pending}>
        ${repeat(this.basemaps, (basemap) => basemap.id, (basemap) => this._renderCard(basemap))}
      </div>
    `;
  }

  // HGM/Turksat proxy'sine erisilemedigi (bkz _onBasemapError) durumda
  // gosterilen acik hata bildirimi -- ucuncu taraf bir haritaya sessizce
  // dusulmedigini kullaniciya bildirir.
  private _renderErrorBanner() {
    if (!this._error) return nothing;
    return html`
      <div class="error-banner" role="alert">
        ${ICON_WARNING}
        <span>Altlık Haritalar servisine erişilemiyor.</span>
      </div>
    `;
  }

  // Sadece HGM gozle gorulur derecede gecikince (bkz PENDING_INDICATOR_DELAY_MS)
  // gorunur -- normal/hizli yuklenen durumda HIC render edilmez. _error ile
  // AYNI ANDA gorunmez (biri diger onu zaten temizler, bkz _onBasemapError/
  // _onBasemapRecovered), ama gene de ikisi ayni banner alanini paylastigi
  // icin acikca birbirini dislar.
  private _renderLoadingBanner() {
    if (!this._pending || this._error) return nothing;
    return html`
      <div class="loading-banner" role="status">
        <span class="loading-spinner"></span>
        <span>Altlık Haritalar yükleniyor…</span>
      </div>
    `;
  }

  /**
   * Bileşenin şablonunu render eder: bağımsız modda toggle butonu/panel,
   * embedded modda salt başlık+grid içerik; haritaya bağlı değilse gizli kalır.
   */
  override render() {
    // Haritaya baglanmadiysa (mapElementId verilmedi/bulunamadi ve map
    // programatik atanmadi) bilesen tamamen gizli kalir.
    if (!this.map) return nothing;

    // Embedded (Ayarlar paneli icinde): salt icerik, kendi baslik disinda
    // hicbir toggle/kapatma UI'i yok -- kapatma disaridaki (tucbs-settings-
    // tool) chrome'a ait.
    if (this.embedded) {
      return html`
        <div class="panel">
          <span class="title">Altlık Haritalar</span>
          ${this._renderErrorBanner()}
          ${this._renderLoadingBanner()}
          ${this._renderGrid()}
        </div>
      `;
    }

    // Bagimsiz mod: TucbsLayerList'teki toggle-btn/panel deseniyle ayni --
    // harita SIKISTIRILMAZ, panel her zaman AYNI (sag-ust) konumda acilir/kapanir.
    if (!this._open) {
      return html`
        <button type="button" class="toggle-btn ${this._error ? "has-error" : ""}" @click=${() => this._openPanel()}>
          Altlık Haritalar
          ${this._error ? ICON_WARNING : nothing}
          <span class="toggle-arrow" aria-hidden="true">${ICON_CHEVRON_RIGHT}</span>
        </button>
      `;
    }

    return html`
      <div class="panel">
        <div class="header">
          <span class="title"><span class="title-icon">${ICON_MAP}</span>Altlık Haritalar</span>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this._closePanel()}>
            ${ICON_CLOSE}
          </button>
        </div>
        ${this._renderErrorBanner()}
        ${this._renderLoadingBanner()}
        ${this._renderGrid()}
      </div>
    `;
  }
}
