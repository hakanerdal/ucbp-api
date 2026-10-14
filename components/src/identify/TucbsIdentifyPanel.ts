import { LitElement, html, nothing, render as litRender, type PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/accordion/index.js";
import type {
  InteractionManager,
  LayerManager,
  EntityInteractionDetail,
  MapInteractionDetail,
  ImageryInteractionDetail,
} from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { whenTucbsMapReady, type TucbsMapElement } from "../shared/util/bindTucbsMap.js";
import { syncVirtualScrollbar, startVirtualScrollbarDrag } from "../shared/ui/VirtualScrollbar.js";
import { TimerBag } from "../shared/util/TimerBag.js";
import { deferredMeasure } from "./deferredMeasure.js";
import { AsyncGeneration } from "../shared/util/AsyncGeneration.js";
import { iconNodeToString, type CarbonIconNode } from "../shared/util/CarbonIcon.js";
import { identifyPanelStyles } from "./identifyPanelStyles.js";
import { showToast } from "../shared/ui/toast.js";
import { DraggablePanelController } from "../shared/ui/DraggablePanelController.js";
import {
  compactItemBodyMaxWidth,
  formatPropertyValue,
  itemGlobalIndex,
  pagedTableItems,
  toImageryResultItems,
  toResultItem,
  type IdentifyResultItem,
} from "./resultItems.js";
import {
  NEUTRAL_VECTOR_CLICK_STATE,
  toEntityCommitted,
  toEntityPending,
  toNeutral,
  type VectorClickState,
} from "./vectorClickState.js";

import {
  Location16 as LocationIcon,
  Information20 as InformationIcon,
  Close16 as CloseIcon,
  ZoomIn20 as ZoomInIcon,
} from "@carbon/icons";

function carbonIcon(node: CarbonIconNode) {
  return unsafeSVG(iconNodeToString(node));
}

const ICON_LOCATION = carbonIcon(LocationIcon);
const ICON_INFORMATION = carbonIcon(InformationIcon);
const ICON_CLOSE = carbonIcon(CloseIcon);
const ICON_ZOOM_IN = carbonIcon(ZoomInIcon);

// Basit koordinat kartı bu sure sonra kendiliginden kaybolur.
const BASIC_DISMISS_MS = 4000;

// Ayni noktada cok sayida feature cakisirsa (yogun bir GeoJSON/WFS katmani)
// accordion diyalog ekran disina tasabiliyordu -- bir sayfada en fazla bu
// kadar sonuc gosterilir, gerisi sayfalama ile erisilir.
const IDENTIFY_PAGE_SIZE = 5;

// Baslik sutunu hizalamasi (bkz _syncItemTitleGroupWidth) icin ustsinir --
// cok uzun bir katman ismi sutunu sinirsiz genisletip rozet/tip etiketi/
// zoom ikonunu SABIT 720px panelin disina itmesin diye; bu sinirin
// uzerindeki basliklar mevcut ellipsis (bkz .item-title-text CSS) ile
// kirpilmaya devam eder. Rozet (item-title-suffix) ve tip etiketi
// (attr-type-tag) icin ayrica bir ustsinir gerekmez -- ikisi de zaten kisa/
// sinirli bir deger kumesinden gelir (1-3 haneli sira numarasi, GEOJSON/
// WMS/WFS gibi bilinen katman turleri).
const MAX_ITEM_TITLE_WIDTH = 250;

// "Yakınlaş" butonunun (bkz _zoomToItem) camera ucus suresi -- Cesium'un
// mesafeye gore OTOMATIK hesapladigi varsayilan sure (uzak bir noktadan
// yakinlasirken birkac saniyeye kadar cikabiliyor) yerine SABIT/kisa bir
// deger kullanilir (bkz kullanici geri bildirimi: "bu zoom'lama işi daha
// hızlı olsun").
const ZOOM_FLIGHT_DURATION_SECONDS = 0.6;

// Enlem: pozitifse N, negatifse S. Boylam: pozitifse E, negatifse W.
function formatLat(lat: number): string {
  return `${Math.abs(lat).toFixed(5)}° ${lat >= 0 ? "N" : "S"}`;
}

function formatLon(lon: number): string {
  return `${Math.abs(lon).toFixed(5)}° ${lon >= 0 ? "E" : "W"}`;
}

/**
 * Haritada tıklanan bir feature/piksel için öznitelik tablosu veya koordinat
 * kartı gösteren panel (`<tucbs-identify-panel>`) — `InteractionManager`'ın
 * `entity:click`/`map:click` event'lerini dinler.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-identify-panel mapElementId="map"></tucbs-identify-panel>
 * ```
 */
@customElement("tucbs-identify-panel")
export class TucbsIdentifyPanel extends LitElement {
  static override readonly styles = identifyPanelStyles;

  /** Core JS API `InteractionManager` referansı. */

  // Senaryo 1: property binding ile gelir.
  // Senaryo 2: ready event sonrasi mapElementId ile JS ile atanir.
  @property({ attribute: false }) interactionManager: InteractionManager | undefined;

  /** Opsiyonel: tıklanan entity'nin ait olduğu katmanın başlığını/türünü (breadcrumb) göstermek için; verilmezse breadcrumb `layerId`'yi gösterir. */
  @property({ attribute: false }) layerManager: LayerManager | undefined;

  /** Opsiyonel: `tucbs-map` element'inin ID'si — TucbsLayerList'teki aynı desenle (Senaryo 2A/2B) `InteractionManager`'a kendisi bağlanır. */
  @property() mapElementId = "";

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  private readonly _customCssState: CustomCssState = { sheet: null };

  @state() private _basicOpen = false;
  @state() private _basicLon = 0;
  @state() private _basicLat = 0;
  // Bir WMS/WMTS GetFeatureInfo sorgusu GERCEKTEN suruyorsa (bkz
  // InteractionManager "imagery:querying") true olur, sorgu bitince
  // (basarili/basarisiz farketmez) hemen false olur -- ".loading-card"
  // (bkz render()) BIREBIR bu degere baglidir: sorgu suruyorken KESINLIKLE
  // gosterilir, surmuyorken KESINLIKLE gosterilmez (bkz kullanici geri
  // bildirimi) -- entity bulunmus olmasi bu kurali DEGISTIRMEZ (bkz
  // InteractionManager.dispatchPick: entity bulunsa da GetFeatureInfo HER
  // ZAMAN denenir, cunku genis kapsamli bir vektor katmani WMS feature'larini
  // sonsuza kadar gizleyebilirdi). Sorgu suruyorken HICBIR diyalog acilmaz
  // (bkz _onEntityClick/_onMapClick) -- "Sorgulanıyor" bitmeden diyalog
  // gelmez (bkz kullanici geri bildirimi).
  @state() private _imageryPending = false;
  // _onEntityClick/_onImageryClick arasindaki yaris durumu (bkz
  // identify/vectorClickState.ts) -- eskiden UC bagimsiz alan
  // (_lastClickHadEntity/_pendingVectorClick/_vectorCommitted) olarak
  // tutuluyordu, simdi TEK bir ayirt edici (discriminated) union'da.
  private _vectorClickState: VectorClickState = NEUTRAL_VECTOR_CLICK_STATE;

  @state() private _tableOpen = false;
  @state() private _tableItems: IdentifyResultItem[] = [];
  @state() private _tableLon = 0;
  @state() private _tableLat = 0;
  @state() private _accordionPage = 0;
  // entity:click (vektör) ile imagery:click (WMS/WMTS) aynı _tableItems
  // şeklini paylaşır; ikisi AYNI tıklamada çakışırsa (bkz _vectorClickState /
  // identify/vectorClickState.ts) sonuçlar birleştirilip "mixed" olarak
  // işaretlenir. Breadcrumb rozeti buna göre VEKTÖR/RASTER rozetlerini yan
  // yana gösterir (bkz render()).
  @state() private _tableSource: "vector" | "imagery" | "mixed" = "vector";

  @query(".attr-panel") private readonly _attrPanelEl?: HTMLDivElement;
  /** Tüm setTimeout/rAF çağrılarını izler (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);
  private _basicDismissTimer: number | null = null;
  private readonly _drag = new DraggablePanelController(this, {
    getPanel: () => this._attrPanelEl,
    ignoreSelector: ".attr-close-btn",
  });

  private readonly _onMapClick = (detail: MapInteractionDetail): void => {
    // Bir analiz araci (tampon/kesisim) secim icin AYNI "entity:click"e
    // abone oldugundan (bkz InteractionManager.identifySuspended yorumu),
    // event yayini engellenmez -- burada, KENDI PAYIMIZA hicbir seye tepki
    // vermeden cikariz: kullanici analiz araciyla feature secerken identify
    // koordinat karti/oznitelik tablosu ARAYA GIRMEZ.
    if (this.interactionManager?.isIdentifySuspended()) return;
    this._tableOpen = false;
    this._imageryPending = false;
    this._vectorClickState = toNeutral();
    const [lon, lat] = detail.position;
    // "imagery:querying" (varsa) InteractionManager.dispatchPick icinde bu
    // event'ten HEMEN sonra, ayni senkron cagri zincirinde yayilir -- bir
    // sonraki makrotaska (setTimeout 0) birakip o an hala baslamamis mi diye
    // bakiyoruz. Baslamadiysa (bu noktada hic WMS/WMTS katmani yok demektir)
    // koordinat kartini gecikmesizce aciyoruz; basladiysa hic kart acmadan
    // sorgu sonucunu (_onImageryClick) bekleriz.
    this._timers.setTimeout(() => {
      if (this._imageryPending) return;
      this._basicLon = lon;
      this._basicLat = lat;
      this._basicOpen = true;
      this._scheduleBasicDismiss();
    }, 0);
  };

  // Bir arac (cizim/olcum) etkilesimi devraldiginda koordinat karti, aracin
  // yonlendirme paneliyle ust uste binmesin diye kapanir (oznitelik tablosu
  // ayri bir diyalog; ona dokunulmaz).
  private readonly _onInteractionSuspend = (): void => {
    this._closeBasic();
  };

  private readonly _onImageryQuerying = (): void => {
    if (this.interactionManager?.isIdentifySuspended()) return;
    this._imageryPending = true;
  };

  private get _accordionPageCount(): number {
    return Math.max(1, Math.ceil(this._tableItems.length / IDENTIFY_PAGE_SIZE));
  }

  // Sayfalama YOKKEN (bkz _accordionPageCount) ".attr-panel" artik SABIT
  // 640px yerine icerige gore boyutlanir (bkz ".attr-panel--auto" CSS'i) --
  // 5'ten FAZLA sonucta (sayfalama devrede) bu HER ZAMAN false doner ve
  // mevcut sabit yukseklik akisi degismeden kalir.
  private get _isCompactPanel(): boolean {
    return this._accordionPageCount <= 1;
  }

  // _tableItems'daki HER item FARKLI boyutta bir tablo tasiyabilir (orn. bir
  // WMS sonucu 2 satir, bir GEOJSON sonucu 6 satir) -- Carbon'un
  // cds-accordion-item'i KAPALI durumda icerigini render agacindan tamamen
  // cikardigindan (yalnizca ACIK olan item'in .item-body'si DOM'da var olur),
  // ".attr-panel--auto"nun "fit-content" boyutu SADECE o an acik olan item'e
  // gore hesaplaniyordu -- kullanici baska bir item'i actiginda diyalog GOZLE
  // GORULUR sekilde buyuyup kuculuyordu (bkz kullanici geri bildirimi:
  // "diyalog size'i oynak olmamali... hangi accordion item en buyuk size'li
  // ise onu kullanalim"). Cozum: TUM item'lerin tablosu, GORUNMEZ/ekran disi
  // bir olcum kutusunda (shadowRoot'un DOGRUDAN cocugu -- ".attr-panel"in
  // KARDESIdir, ondan custom property MIRAS ALMAZ, olcum HER ZAMAN sifirdan/
  // tarafsizdir) TEK TEK render edilip GERCEK genislik/yukseklikleri olculur;
  // en buyugu ".item-body"ye (bkz o CSS kurali) min-width/min-height custom
  // property olarak KILITLENIR. Panelin KENDI genisligi/yuksekligi dogrudan
  // DEGISTIRILMEZ -- boylece drag sirasindaki (bkz .attr-panel--auto
  // max-width yorumu) reflow/ResizeObserver riskine hic girilmez, sadece
  // icerik hangi item acilirsa acilsin ayni alani kaplar.
  //
  // ONEMLI: cds-table (ve alt bilesenleri satir/hucre) kendi ILK render'ini
  // SENKRON degil, LitElement'in mikrotask tabanli guncelleme dongusuyle
  // zamanlar -- box'i olusturup HEMEN ayni cagri yigininda getBoundingClientRect
  // okursak tablo henuz DOM'a hic yazilmamis (bos) olur ve kilit degeri YANLIS
  // (cok kucuk) hesaplanir (bkz kullanici geri bildirimi: "WMS secilince
  // kucyuluyor" -- ilk versiyon TAM OLARAK bu senkron olcum hatasi yuzunden
  // calismiyordu). Her item'den SONRA bir animasyon karesi kadar await
  // edilir: mikrotask kuyrugu (ic ice gecmis TUM alt custom element'lerin
  // KENDI guncelleme mikrotasklari dahil) bir sonraki animasyon karesinden
  // ONCE TAMAMEN bosaltildigindan, bu bekleme GERCEK/nihai render'i garanti
  // eder.
  private readonly _compactItemBoxGeneration = new AsyncGeneration();

  private async _syncCompactItemBox(): Promise<void> {
    const panel = this._attrPanelEl;
    if (!panel) return;
    if (!this._isCompactPanel || this._tableItems.length <= 1) {
      panel.style.removeProperty("--tucbs-item-min-width");
      panel.style.removeProperty("--tucbs-item-min-height");
      return;
    }

    // Olcum bittiginde _tableItems ARTIK FARKLI bir sonuc setiyse (kullanici
    // hizlica baska bir noktaya tikladiysa) eskimis/yanlis bir kilit degeri
    // YAZILMASIN diye her cagriya kendi jetonu verilir.
    const token = this._compactItemBoxGeneration.next();
    const items = this._tableItems;

    const probe = document.createElement("div");
    probe.style.cssText =
      `position:fixed;top:-99999px;left:-99999px;visibility:hidden;width:max-content;max-width:${compactItemBodyMaxWidth(window.innerWidth)}px;`;
    this.shadowRoot?.appendChild(probe);

    let maxWidth = 0;
    let maxHeight = 0;
    for (const item of items) {
      const box = document.createElement("div");
      box.className = "item-body";
      probe.replaceChildren(box);
      litRender(this._renderPropertyTable(item.propertyEntries), box);
      await new Promise<void>((resolve) => this._timers.requestAnimationFrame(() => resolve()));
      if (!this._compactItemBoxGeneration.isCurrent(token)) {
        probe.remove();
        return;
      }
      const rect = box.getBoundingClientRect();
      maxWidth = Math.max(maxWidth, rect.width);
      maxHeight = Math.max(maxHeight, rect.height);
    }
    probe.remove();

    if (!this._compactItemBoxGeneration.isCurrent(token)) return;
    if (maxWidth > 0) panel.style.setProperty("--tucbs-item-min-width", `${Math.ceil(maxWidth)}px`);
    if (maxHeight > 0) panel.style.setProperty("--tucbs-item-min-height", `${Math.ceil(maxHeight)}px`);
  }

  // TUM item'lerin (sadece o an gorunen SAYFA degil -- bkz _tableItems)
  // baslik/rozet/tip-etiketi SUTUNLARINI AYRI AYRI olcup, HER birini kendi
  // CSS kuraline (bkz .item-title-text/.item-title-suffix/.item-title-group
  // .attr-type-tag) sabit genislik olarak kilitler -- boylece hangi
  // satirin baslik/tip metni ne kadar farkli uzunlukta olursa olsun HER
  // sutun (ve onu izleyen zoom ikonu) HER SATIRDA AYNI x-konumunda baslar.
  // TEK bir "grup toplam genisligi" kilitlemek YETERSIZ kalmisti (bkz
  // kullanici geri bildirimi: "Beyza ile baslayan en uzun ama kayma var")
  // -- grubun DIS boyutu sabitlense bile ICERIDEKI ogeler varsayilan flex
  // davranisiyla birbirine "paketleniyor", her satirin rozeti/etiketi KENDI
  // baslik uzunluguna gore farkli x'te kaliyordu (aralarindaki 4 GEOJSON
  // satiri SADECE ayni metni paylastigi icin TESADUFEN hizali gorunuyordu).
  // TUM sonuc setine bakilmasi, sayfa gecislerinde de hizalamanin
  // BOZULMAMASINI saglar. Bu, ".attr-panel"in DIS boyutunu (720x640, bkz
  // _syncCompactItemBox yorumu) DEGISTIRMEZ -- 5'ten fazla sonuctaki
  // (sayfalama) SABIT boyut akisini ihlal etmeden, SADECE ic hizalamayi
  // etkiler; bu yuzden compact/paged ayrimi olmadan HER ZAMAN calisir.
  //
  // ONEMLI: Carbon'un cds-accordion-item'i, slotlanan "title" icerigine
  // KENDI font boyutunu (--cds-body-01-font-size, ~14px) flat-tree
  // uzerinden miras birakir -- bu bizim shadow root'umuzun font-size:10px
  // degerinden FARKLI. Yanlis (kucuk) bir olcum almamak icin sutunlar,
  // izole <span>'lar yerine GERCEK bir <cds-accordion-item>'in "title"
  // slotuna yerlestirilerek olculur (bkz _syncCompactItemBox'taki cds-table
  // icin ayni "gercek bilesen icinde olc" prensibi).
  private readonly _itemTitleGroupWidthGeneration = new AsyncGeneration();

  private async _syncItemTitleGroupWidth(): Promise<void> {
    const panel = this._attrPanelEl;
    if (!panel) return;
    if (this._tableItems.length <= 1) {
      panel.style.removeProperty("--tucbs-item-title-width");
      panel.style.removeProperty("--tucbs-item-suffix-width");
      panel.style.removeProperty("--tucbs-item-tag-width");
      return;
    }

    const token = this._itemTitleGroupWidthGeneration.next();
    const items = this._tableItems;

    const probeHost = document.createElement("cds-accordion-item");
    probeHost.style.cssText =
      "position:fixed;top:-99999px;left:-99999px;visibility:hidden;";
    this.shadowRoot?.appendChild(probeHost);

    let maxTitleWidth = 0;
    let maxSuffixWidth = 0;
    let maxTagWidth = 0;
    for (const item of items) {
      const group = document.createElement("span");
      group.slot = "title";
      group.className = "item-title-group";

      const textEl = document.createElement("span");
      textEl.className = "item-title-text";
      textEl.textContent = item.layerTitle;
      group.appendChild(textEl);

      const suffixEl = document.createElement("span");
      suffixEl.className = "item-title-suffix";
      suffixEl.textContent = String(this._itemGlobalIndex(item));
      group.appendChild(suffixEl);

      const hasTag =
        !!item.layerType && item.layerType !== "DRAWING" && item.layerType !== "MEASURE";
      let tagEl: HTMLSpanElement | null = null;
      if (hasTag) {
        tagEl = document.createElement("span");
        tagEl.className = "attr-type-tag";
        tagEl.textContent = item.layerType as string;
        group.appendChild(tagEl);
      }

      probeHost.replaceChildren(group);
      await new Promise<void>((resolve) => this._timers.requestAnimationFrame(() => resolve()));
      if (!this._itemTitleGroupWidthGeneration.isCurrent(token)) {
        probeHost.remove();
        return;
      }
      maxTitleWidth = Math.max(maxTitleWidth, textEl.getBoundingClientRect().width);
      maxSuffixWidth = Math.max(maxSuffixWidth, suffixEl.getBoundingClientRect().width);
      if (tagEl) maxTagWidth = Math.max(maxTagWidth, tagEl.getBoundingClientRect().width);
    }
    probeHost.remove();

    if (!this._itemTitleGroupWidthGeneration.isCurrent(token)) return;
    const clampedTitle = Math.min(Math.ceil(maxTitleWidth), MAX_ITEM_TITLE_WIDTH);
    if (clampedTitle > 0) panel.style.setProperty("--tucbs-item-title-width", `${clampedTitle}px`);
    if (maxSuffixWidth > 0) panel.style.setProperty("--tucbs-item-suffix-width", `${Math.ceil(maxSuffixWidth)}px`);
    if (maxTagWidth > 0) panel.style.setProperty("--tucbs-item-tag-width", `${Math.ceil(maxTagWidth)}px`);
  }

  private get _pagedTableItems(): IdentifyResultItem[] {
    return pagedTableItems(this._tableItems, this._accordionPage, IDENTIFY_PAGE_SIZE);
  }

  private _goToAccordionPage(page: number): void {
    this._accordionPage = Math.max(0, Math.min(page, this._accordionPageCount - 1));
  }

  private _itemGlobalIndex(item: IdentifyResultItem): number {
    return itemGlobalIndex(this._tableItems, item);
  }

  // Tabloyu (vektor-only, raster-only VEYA vektor+raster birlikte) TEK bir
  // yerden acar -- hem _onEntityClick'in setTimeout'u hem de _onImageryClick
  // buraya yonlenir, _vectorClickState'in "entityCommitted"e gecisiyle
  // ikisinden SADECE ilk gelen gercekten "acar", diger sadece "zaten acik"
  // durumunu bulur.
  private _openTable(
    items: IdentifyResultItem[],
    lon: number,
    lat: number,
    source: "vector" | "imagery" | "mixed",
  ): void {
    this._vectorClickState = toEntityCommitted();
    this._basicOpen = false;
    this._clearBasicDismiss();
    // Stil Editörü ile ayni ekran alanini kapladiklarindan ust uste binmesinler:
    // oznitelik tablosu acilirken acik Stil Editörü kapatilir (karsiligi icin
    // bkz TucbsStyleEditor.openFor -> tucbs-identify-panel close()).
    for (const editor of document.querySelectorAll<HTMLElement & { open: boolean; close(): void }>(
      "tucbs-style-editor",
    )) {
      if (editor.open) editor.close();
    }
    this._tableSource = source;
    this._tableItems = items;
    this._accordionPage = 0;
    this._tableLon = lon;
    this._tableLat = lat;
    this._tableOpen = true;
    // Sayfalama gecisinde de ayni fixup gerektigi icin (bkz updated())
    // dogrudan burada degil, merkezi yerden tetiklenir.
  }

  // cds-accordion-item'lar .map() ile KEYSIZ render edildiginden (bkz render()),
  // Lit ayni pozisyondaki DOM node'unu YENI bir tiklamada da YENIDEN KULLANIR.
  // _onAccordionItemToggled ise kullanici bir item'i actiginda DIGERLERINI
  // Lit'in DIREKTIF sistemi DISINDAN (dogrudan ".open = false" atayarak)
  // kapatiyor -- Lit bu harici degisiklikten HABERSIZ kalip "?open=${index===0}"
  // icin kendi ONBELLEGINDEKI (ilk render'daki) degeri gecerli sayabiliyor,
  // boylece YENI bir sorguda (farkli/yeni _tableItems ile) index 0'in GERCEKTE
  // acilmasi gerekirken kapali kalabiliyordu (bkz kullanici geri bildirimi:
  // "her zaman ilk item acik gelecek"). Render'dan SONRA acik durumu ELLE
  // (Lit'i by-pass ederek) index 0 = acik / digerleri = kapali olarak zorluyoruz.
  private _resetAccordionOpen(): void {
    const fix = () => {
      const items = this.shadowRoot?.querySelectorAll<HTMLElement & { open: boolean }>(
        "cds-accordion-item:not(.accordion-filler)",
      );
      items?.forEach((item, index) => {
        item.open = index === 0;
      });
    };
    deferredMeasure(this._timers, fix);
  }

  // _resetAccordionOpen ile AYNI Lit-by-pass teknigi (bkz o metodun yorumu),
  // ama sabit index 0 yerine PARAMETRE olarak verilen index'i acar --
  // "Yakınlaş" butonuna basildiginda o feature'in oznitelik tablosu da
  // GORUNUR olsun diye (bkz _zoomToItem) kullanilir. _tableItems/_accordionPage
  // DEGISMEDIGINDEN updated() burada TETIKLENMEZ, yani _resetAccordionOpen
  // ARDINDAN bu acmayi ustune YAZMAZ.
  private _openAccordionItem(index: number): void {
    const items = this.shadowRoot?.querySelectorAll<HTMLElement & { open: boolean }>(
      "cds-accordion-item:not(.accordion-filler)",
    );
    items?.forEach((item, i) => {
      item.open = i === index;
    });
    this._scheduleScrollThumbSync();
  }

  private readonly _onEntityClick = (detail: EntityInteractionDetail): void => {
    if (this.interactionManager?.isIdentifySuspended()) return;
    this._imageryPending = false;
    // SENKRON olarak (asagidaki setTimeout'tan ONCE) atanir -- GetFeatureInfo
    // yaniti teorik olarak bir mikrotask uzerinden setTimeout(0)'dan bile ONCE
    // gelebilirse (bkz identify/vectorClickState.ts "entityPending" yorumu),
    // _onImageryClick'in bu vektor sonuclarina HER ZAMAN erisebilmesi icin
    // closure degil, paylasilan bu alan kullanilir.
    const [lon, lat] = detail.position;
    this._vectorClickState = toEntityPending({
      items: detail.features.map((feature) => toResultItem(feature, this.layerManager)),
      lon,
      lat,
    });

    // Ayni noktada bir WMS/WMTS sorgusu da baslayabilir (bkz InteractionManager
    // dispatchPick, entity bulunsa da GetFeatureInfo denenir) -- basladiysa,
    // panel HENUZ acilmadan (bir sonraki makrotaska kadar) bekleyip vektor VE
    // (varsa) raster sonuclarini TEK SEFERDE birlikte aciyoruz; boylece
    // "Sorgulanıyor" loading'i bitmeden HICBIR diyalog gelmemis olur (bkz
    // kullanici geri bildirimi).
    this._timers.setTimeout(() => {
      if (this._vectorClickState.kind !== "entityPending" || this._imageryPending) return;
      const { pendingVectorClick } = this._vectorClickState;
      this._openTable(pendingVectorClick.items, pendingVectorClick.lon, pendingVectorClick.lat, "vector");
    }, 0);
  };

  // WMS/WMTS gibi raster katmanlar Entity degil ImageryLayer oldugundan
  // scene.pick bunlari bulamaz -- InteractionManager bu durumda GetFeatureInfo
  // sorgusunu kendisi yapip (agdan yanit gelmesi gerektigi icin map:click/
  // entity:click'ten SONRA, asenkron) "imagery:click" ile sonucu yayar. Sorgu
  // tamamlandiginda (basarili VEYA basarisiz/bos) bu event HER ZAMAN tetiklenir.
  // InteractionManager artik entity bulunsa da GetFeatureInfo'yu HER ZAMAN
  // dener (bkz dispatchPick) -- ayni noktada BIR vektor feature VE bir raster
  // feature cakisirsa (orn. WFS + WMS ust uste) ikisi de gosterilmeli (bkz
  // kullanici geri bildirimi). pickGeneration sayesinde bu event HER ZAMAN
  // EN SON tiklamaya karsilik gelir (bkz InteractionManager.pickImageryFeatures);
  // bu yuzden _vectorClickState'in "neutral" DISINDA olmasi, "hangi
  // tiklamanin senkron dali calisti" sorusuna guvenilir bir cevap verir.
  private readonly _onImageryClick = (detail: ImageryInteractionDetail): void => {
    if (this.interactionManager?.isIdentifySuspended()) return;
    this._imageryPending = false;

    if (this._vectorClickState.kind !== "neutral") {
      const rasterItems = toImageryResultItems(detail.features, this.layerManager);

      if (this._vectorClickState.kind === "entityPending") {
        // Vektor sonucu HENUZ acilmadi (_onEntityClick'in setTimeout'u bu
        // event'ten SONRA calisacakti) -- burada BIRLIKTE aciyoruz.
        const { pendingVectorClick } = this._vectorClickState;
        const vectorItems = pendingVectorClick.items;
        this._openTable(
          [...vectorItems, ...rasterItems],
          pendingVectorClick.lon,
          pendingVectorClick.lat,
          rasterItems.length > 0 ? "mixed" : "vector",
        );
        return;
      }

      // Vektor sonucu zaten acildi -- kullanici panel acikken kapatmadiysa
      // raster sonucunu (varsa, GERCEKTEN bir seyse) AYNI tabloya ekle.
      if (this._tableOpen && rasterItems.length > 0) {
        this._tableItems = [...this._tableItems, ...rasterItems];
        this._tableSource = "mixed";
      }
      return;
    }

    const imageryItems = toImageryResultItems(detail.features, this.layerManager);
    const [lon, lat] = detail.position;

    if (imageryItems.length === 0) {
      // Buraya SADECE gercekten sorgulanabilir bir raster katman VARSA
      // gelinir -- hicbir katman sorgulanabilir degilse InteractionManager
      // sorguyu hic baslatmaz, bu event hic yayilmaz (bkz kullanici geri
      // bildirimi: "World continents queryable=0 ise Sorgulanıyor
      // çıkmasın" -- ONA VERILEN cozum). Yani bu noktada GERCEKTEN bir
      // GetFeatureInfo denendi ama sonuc bos döndü -- kullanici "hiçbir şey
      // olmadı" sanmasin diye kisa bir bilgi mesaji gosterilir (bkz
      // kullanici geri bildirimi: "Sorgulanıyor tüm WMS'ler için olsun
      // belki sonuç dönmezse uyarabiliriz" -- ayni Projeksiyon donusumu
      // toast'i, bkz TucbsFileUpload showToast kullanimi).
      showToast("info", "Bu konumda öznitelik bilgisi bulunamadı.");
      this._basicLon = lon;
      this._basicLat = lat;
      this._basicOpen = true;
      this._scheduleBasicDismiss();
      return;
    }

    this._openTable(imageryItems, lon, lat, "imagery");
  };

  // Birden fazla sonuc oldugunda HER ZAMAN tam olarak 1 item acik kalir --
  // hepsi kapaninca hem accordion'un toplam yuksekligi degisir hem de
  // kullaniciya "kucculmus" hissi verir. "beingtoggled" cancelable oldugu icin
  // (bkz. Carbon accordion-item.js _handleUserInitiatedToggle) TEK acik
  // item'i kapatma girisimini burada iptal ediyoruz.
  private readonly _onAccordionItemBeforeToggle = (event: Event): void => {
    const detail = (event as CustomEvent<{ open: boolean }>).detail;
    if (detail.open) return;

    const accordion = event.currentTarget as HTMLElement;
    const items = accordion.querySelectorAll("cds-accordion-item");
    const openCount = Array.from(items).filter(
      (item) => (item as HTMLElement & { open: boolean }).open,
    ).length;
    if (openCount <= 1) event.preventDefault();
  };

  // Carbon'un varsayilani coklu-acik'tir; burada acilan item disindaki
  // TUMUNU programatik olarak kapatarak (dogrudan ".open=false" atamasi
  // _handleUserInitiatedToggle'i TETIKLEMEZ, bkz. Carbon kaynagi) klasik
  // "her an sadece 1 item acik" accordion davranisina donusturuyoruz.
  private readonly _onAccordionItemToggled = (event: Event): void => {
    const detail = (event as CustomEvent<{ open: boolean }>).detail;
    if (detail.open) {
      const openedItem = event.target as HTMLElement;
      const accordion = event.currentTarget as HTMLElement;
      for (const item of accordion.querySelectorAll("cds-accordion-item")) {
        if (item !== openedItem) (item as HTMLElement & { open: boolean }).open = false;
      }
    }
    this._scheduleScrollThumbSync();
  };

  /** `interactionManager`/`layerManager` eksikse, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
  override firstUpdated(): void {
    // Senaryo 1: interactionManager/layerManager property binding ile
    // disaridan zaten atanmis olabilir; yine de "mapElementId" verilmisse
    // eksik olani (orn. sadece interactionManager atanmis, layerManager
    // atanmamis) tamamlamaya calisiriz.
    if (!this.mapElementId) return;

    // Senaryo 2: "mapElementId" ile tucbs-map elementinin id'si verilmis.
    const mapEl = document.getElementById(this.mapElementId) as TucbsMapElement | null;
    if (!mapEl) return;

    const connect = () => {
      if (!this.interactionManager && mapEl.interaction) {
        this.interactionManager = mapEl.interaction;
      }
      if (!this.layerManager && mapEl.layerManager) {
        this.layerManager = mapEl.layerManager;
      }
    };

    whenTucbsMapReady(mapEl, connect);
  }

  /** Reactive property değişikliklerini işler: `interactionManager` bağını yeniler, tablo diyaloğu açılış/kapanışını ve accordion/scroll durumunu senkronlar. */
  override updated(changed: PropertyValues): void {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-identify-panel");
    }

    if (changed.has("interactionManager")) {
      const previous = changed.get("interactionManager") as InteractionManager | undefined;
      if (previous) this._unbind(previous);
      if (this.interactionManager) this._bind(this.interactionManager);
    }

    // Tablo her acilista (surukleme ile tasinmis olsa da) ortalanmis
    // konumuna doner — TucbsStyleEditor'daki ayni davranis.
    if (changed.has("_tableOpen") && this._tableOpen) {
      this._attrPanelEl?.style.removeProperty("left");
      this._attrPanelEl?.style.removeProperty("top");
      this._attrPanelEl?.style.removeProperty("transform");
    }

    // Diyalog KAPANDIGINDA (kapat butonu, bos zemine tiklama, vs. -- "_tableOpen"
    // false'a donen HER yol) "Yakınlaş" butonunun eklemis olabilecegi gecici
    // stroke vurgusu (bkz _zoomToItem/highlightEntity) kaldirilir -- zamanlayici
    // OLMADIGINDAN (bkz highlightEntity WHY yorumu) tek temizlik noktasi burasi.
    if (changed.has("_tableOpen") && !this._tableOpen) {
      this.layerManager?.clearHighlight();
    }

    if (changed.has("_tableOpen") || changed.has("_tableItems")) {
      this._scheduleScrollThumbSync();
      void this._syncCompactItemBox();
      void this._syncItemTitleGroupWidth();
    }

    // Sayfalama (_goToAccordionPage) de "_tableOpen"/"_tableItems" degismeden
    // FARKLI bir 5'li item seti gosterir -- accordion DOM node'lari pozisyona
    // gore YENIDEN KULLANILDIGINDAN (bkz _resetAccordionOpen yorumu), her
    // sayfa gecisinde de index 0'in gercekten acik oldugunu ELLE garanti
    // etmemiz gerekir; aksi halde onceki sayfada acik kalmis bir item'in
    // DOM'u yeni sayfada YANLIS veriyle acik gorunebilir ya da hicbiri acik
    // olmayabilir (kullanici geri bildirimi: "hepsi kapali kesinlikle
    // olmayacak").
    if (changed.has("_tableOpen") || changed.has("_tableItems") || changed.has("_accordionPage")) {
      this._resetAccordionOpen();
    }
  }

  /** Bileşen DOM'dan kaldırıldığında `interactionManager` dinleyicisini kaldırır ve bekleyen zamanlayıcıları temizler. */
  override disconnectedCallback(): void {
    if (this.interactionManager) this._unbind(this.interactionManager);
    this._clearBasicDismiss();
    super.disconnectedCallback();
  }

  private _bind(interactionManager: InteractionManager): void {
    interactionManager.on("map:click", this._onMapClick);
    interactionManager.on("interaction:suspend", this._onInteractionSuspend);
    interactionManager.on("entity:click", this._onEntityClick);
    interactionManager.on("imagery:click", this._onImageryClick);
    interactionManager.on("imagery:querying", this._onImageryQuerying);
  }

  private _unbind(interactionManager: InteractionManager): void {
    interactionManager.off("map:click", this._onMapClick);
    interactionManager.off("interaction:suspend", this._onInteractionSuspend);
    interactionManager.off("entity:click", this._onEntityClick);
    interactionManager.off("imagery:click", this._onImageryClick);
    interactionManager.off("imagery:querying", this._onImageryQuerying);
  }

  private _scheduleBasicDismiss(): void {
    this._clearBasicDismiss();
    this._basicDismissTimer = this._timers.setTimeout(() => {
      this._basicDismissTimer = null;
      this._basicOpen = false;
    }, BASIC_DISMISS_MS);
  }

  private _clearBasicDismiss(): void {
    this._timers.clearTimeout(this._basicDismissTimer);
    this._basicDismissTimer = null;
  }

  // Native scrollbar tamamen gizli (bkz. .attr-body/.item-body CSS'i); bunun
  // yerine ilgili .scroll-thumb/.item-scroll-thumb'in top/height'ini
  // syncVirtualScrollbar (bkz shared/ui/VirtualScrollbar.ts --
  // TucbsStyleEditor/TucbsServiceUpload ile PAYLASILAN tek hesap) ile
  // hesaplatiyoruz. Tek bir sabit ciftle degil, PARAMETRE olarak aliyoruz:
  // accordion modunda birden fazla ".item-body" olabilir (sadece acik olan
  // gorunur/olculebilir), tek sonucta ise ".attr-body" kullanilir.
  private _syncScrollThumbFor(body: HTMLElement): void {
    const wrap = body.closest(".attr-body-wrap, .item-body-wrap");
    const thumb = wrap?.querySelector<HTMLElement>(".scroll-thumb, .item-scroll-thumb");
    if (thumb) syncVirtualScrollbar(body, thumb);
  }

  // cds-accordion-item gibi cocuk custom element'ler ilk render'ini/acilma-
  // kapanma gecisini (bkz. Carbon accordion 110ms transition) HEMEN degil bir
  // sonraki frame'de veya kisa bir gecikmeyle tamamlayabiliyor — tek bir rAF
  // yetmedigi icin (TucbsServiceUpload._updatePreview'daki ayni sebep) kisa
  // bir setTimeout ile ikinci bir olcum daha yapiyoruz. Kapali (gizli)
  // ".item-body"lerin olcumu zararsizdir (scrollHeight===clientHeight -> thumb
  // gizli kalir), bu yuzden hepsini ayirt etmeden tarayabiliriz.
  private _scheduleScrollThumbSync(): void {
    const sync = () => {
      this.shadowRoot
        ?.querySelectorAll<HTMLElement>(".attr-body, .item-body")
        .forEach((body) => this._syncScrollThumbFor(body));
    };
    deferredMeasure(this._timers, sync);
  }

  // .scroll-thumb/.item-scroll-thumb'a tiklayip surukleyerek ilgili kutuyu
  // kaydirir -- hesap startVirtualScrollbarDrag'de (bkz
  // shared/ui/VirtualScrollbar.ts). Surukleme durumu kapali degiskenlerde
  // degil, o fonksiyonun KENDI closure'inda tutulur — boylece ayni anda
  // birden fazla ".item-body" olsa bile her surukleme kendi body/thumb
  // ciftine dogru baglanir.
  private _startThumbDrag(event: PointerEvent): void {
    const thumb = event.currentTarget as HTMLElement;
    const wrap = thumb.closest(".attr-body-wrap, .item-body-wrap");
    const body = wrap?.querySelector<HTMLElement>(".attr-body, .item-body");
    if (!body) return;
    startVirtualScrollbarDrag(event, body);
  }

  /**
   * Konum/Bilgi Al koordinat kartını ve öznitelik tablosunu kapatır (diğer diyaloglarla karşılıklı kapatma için).
   *
   * @example
   * ```ts
   * identifyPanel.close();
   * ```
   */
  close(): void {
    this._closeBasic();
    this._closeTable();
  }

  private _closeBasic(): void {
    this._clearBasicDismiss();
    this._basicOpen = false;
  }

  private _closeTable(): void {
    this._tableOpen = false;
  }

  // Vektor sonuclarda (entity dolu) feature'in KENDI cercevesine yakinlasip
  // (bkz zoomToEntity) AYNI zamanda SABIT (animasyonsuz) gecici bir stroke
  // vurgusu ekler (bkz highlightEntity) -- cakisan/yakin feature'larda salt
  // zoom, HANGISININ vurgulandigini ayirt etmeye yetmeyebilir. Bu vurgu
  // zamanlayiciyla KENDI KENDINE kaybolmaz -- diyalog kapaninca (bkz
  // updated() "_tableOpen" -> false dali) clearHighlight() ile kaldirilir.
  // Raster (WMS/WMTS) sonuclarda ise (entity yok, client-side geometri/
  // vurgulanacak bir sey yok) sadece tiklanan NOKTAYA yakinlasir -- bkz
  // IdentifyResultItem.entity yorumu. "accordionIndex" SADECE coklu sonucta
  // (accordion) verilir -- o feature'in oznitelik tablosu da GORUNUR olsun
  // diye ilgili cds-accordion-item'i acar (bkz _openAccordionItem); tek
  // sonucta (breadcrumb) zaten tablo tek basina acik oldugundan gerek yoktur.
  private _zoomToItem(item: IdentifyResultItem, accordionIndex?: number): void {
    // Onceki bir "Yakınlaş" tiklamasindan kalan vurgu (bkz highlightEntity),
    // dialog HENUZ kapanmadan (bkz updated() "_tableOpen" -> false dali)
    // BASKA bir item'a gecildiginde temizlenmiyordu -- kullanici ayni
    // diyalogda once bir GEOJSON feature'ina "Yakınlaş" deyip ARDINDAN
    // (dialogu kapatmadan) entity'si olmayan bir WMS/WMTS sonucuna
    // "Yakınlaş" derse, eski turkuaz vurgu EKRANDA KALIYOR ve flyToPosition
    // hedefi zaten yakinsa kamera "hic hareket etmemis" gibi gorunuyordu
    // (bkz kullanici geri bildirimi: "WMS'e zoom'layinca GeoJSON'a
    // zoom'luyor gibi duruyor" -- aslinda WMS'in KENDI zoom'u dogru
    // calisiyordu, sadece ONCEKI vurgu hala gorunurdu). Her "Yakınlaş"
    // tiklamasinda ONCE eski vurgu temizlenir, SADECE bu item'in entity'si
    // varsa YENIDEN eklenir.
    this.layerManager?.clearHighlight();
    if (item.entity) {
      void this.layerManager?.zoomToEntity(item.entity, { duration: ZOOM_FLIGHT_DURATION_SECONDS });
      this.layerManager?.highlightEntity(item.entity);
    } else if (item.geometryHint?.kind === "extent") {
      // Raster (WMS/WMTS) sonucun KENDI entity'si yok ama sunucu GetFeatureInfo
      // yanitini GERCEK geometri (bir ALAN) iceren GeoJSON/GML olarak
      // dondurduyse (bkz IdentifyResultItem.geometryHint yorumu) tiklanan
      // feature'in GERCEK sinirlarina yakinlasilir.
      const { west, south, east, north } = item.geometryHint;
      this.interactionManager?.flyToExtent(west, south, east, north, {
        duration: ZOOM_FLIGHT_DURATION_SECONDS,
      });
    } else if (item.geometryHint?.kind === "point") {
      // Geometri TEK BIR NOKTAYA indirgeniyorsa (orn. bir "cities" katmanindaki
      // nokta feature) bu GERCEK/hassas koordinata uculuyor -- tiklanan
      // NOKTAYA (this._tableLon/_tableLat, kullanicinin imlecinin tam isabet
      // ETMEMIS olabilecegi) degil, sunucunun bildirdigi KESIN konuma (bkz
      // kullanici geri bildirimi: "nokta feature'a zoom'ladık biraz yaklaştı
      // ama merkezine zoom'lamadı").
      const { longitude, latitude } = item.geometryHint;
      this.interactionManager?.flyToPosition(longitude, latitude, {
        duration: ZOOM_FLIGHT_DURATION_SECONDS,
      });
    } else {
      // Sunucu sadece HTML/text dondurduyse (geometri hic yok) tiklanan
      // NOKTAYA sabit yukseklikte ucmak, katmanin TAMAMINA (orn. dunya
      // capinda bir raster) zoom yapmaktan HER ZAMAN daha isabetli --
      // tiklanan nokta zaten o feature'in konumuna yakindir (bkz kullanici
      // geri bildirimi: "World cities katmaninda bir sehre zoom'layinca
      // alakasiz bir yere -- katmanin tum dunya kapsamina -- gidiyor").
      this.interactionManager?.flyToPosition(this._tableLon, this._tableLat, {
        duration: ZOOM_FLIGHT_DURATION_SECONDS,
      });
    }
    if (accordionIndex !== undefined) this._openAccordionItem(accordionIndex);
  }

  // Katman turu rozetinin (attr-type-tag) hemen yanina yerlesecek sekilde
  // hem breadcrumb'ta hem de accordion item basliklarinda (slot="title")
  // KULLANILABILMESI icin gercek <button> DEGIL role="button" tasiyan bir
  // <span> doner (bkz .zoom-btn WHY yorumu) -- accordion baglaminda click/
  // keydown, o title'in KENDI expando <button>'ini TETIKLEMESIN diye elle
  // stopPropagation edilir; breadcrumb'ta bu gereksiz ama zararsizdir (orada
  // zaten baska bir tiklanabilir ata yok).
  private _renderZoomButton(item: IdentifyResultItem, accordionIndex?: number) {
    const zoom = () => this._zoomToItem(item, accordionIndex);
    return html`
      <span
        class="zoom-btn"
        role="button"
        tabindex="0"
        title="Yakınlaş"
        aria-label="Yakınlaş"
        @click=${(event: MouseEvent) => {
          event.stopPropagation();
          zoom();
        }}
        @keydown=${(event: KeyboardEvent) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          event.stopPropagation();
          zoom();
        }}
      >
        ${ICON_ZOOM_IN}
      </span>
    `;
  }

  private _renderPropertyTable(entries: ReadonlyArray<[string, unknown]>) {
    return entries.length === 0
      ? html`<div class="attr-empty">Öznitelik bilgisi bulunamadı.</div>`
      : html`
          <cds-table size="sm" use-zebra-styles use-static-width>
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Alan</cds-table-header-cell>
                <cds-table-header-cell>Değer</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              ${entries.map(
                ([key, value]) => html`
                  <cds-table-row>
                    <cds-table-cell>${key}</cds-table-cell>
                    <cds-table-cell>${formatPropertyValue(value)}</cds-table-cell>
                  </cds-table-row>
                `,
              )}
            </cds-table-body>
          </cds-table>
        `;
  }

  /** Bileşenin şablonunu render eder (koordinat kartı veya öznitelik tablosu/accordion). */
  override render() {
    // Ayni noktada birden fazla vektor katman/feature cakisirsa (bkz.
    // InteractionManager.ts pickAllFeatures) sonuclar Accordion ile, tek
    // sonucta ise dogrudan tablo ile gosterilir.
    const singleItem = this._tableItems.length === 1 ? this._tableItems[0] : undefined;

    // Coklu sonucta breadcrumb satiri bos kalacagindan hic render edilmez;
    // "N sonuç bulundu" sayaci header'da basligin yaninda gosterilir.
    const breadcrumb = !singleItem ? nothing : html`
      <div class="attr-breadcrumb ${singleItem ? "attr-breadcrumb-single" : ""}">
        ${singleItem?.layerType &&
        singleItem.layerType !== "DRAWING" &&
        singleItem.layerType !== "MEASURE"
          ? html`<span class="attr-type-tag">${singleItem.layerType}</span>`
          : nothing}
        ${singleItem ? this._renderZoomButton(singleItem) : nothing}
        ${singleItem
          ? html`<span class="attr-layer-title" title=${singleItem.layerTitle}>${singleItem.layerTitle}</span>`
          : nothing}
      </div>
    `;

    // Tek sonucta klasik kaydirilabilir kutu; birden fazla sonucta ise HER
    // item kendi sabit-yukseklikli kutusunu tasir (bkz. .item-body CSS'i) —
    // boylece kapali item basliklari disaridaki bir scroll'un altinda
    // kaybolmadan HER ZAMAN normal akista/gorunur kalir, sadece acik olanin
    // kendi tablosu gerekirse kendi icinde kayar.
    const body = singleItem
      ? html`
          <div class="attr-body-wrap">
            <div class="attr-body" @scroll=${(event: Event) => this._syncScrollThumbFor(event.currentTarget as HTMLElement)}>
              ${this._renderPropertyTable(singleItem.propertyEntries)}
            </div>
            <div class="scroll-thumb" @pointerdown=${(event: PointerEvent) => this._startThumbDrag(event)}></div>
          </div>
        `
      : html`
          <div class="accordion-wrap">
            <cds-accordion
              size="sm"
              @cds-accordion-item-beingtoggled=${this._onAccordionItemBeforeToggle}
              @cds-accordion-item-toggled=${this._onAccordionItemToggled}
            >
              ${this._pagedTableItems.map(
                (item, index) => html`
                  <cds-accordion-item title=${item.layerTitle} ?open=${index === 0}>
                    <span slot="title" class="item-title">
                      <span class="item-title-group">
                        <span class="item-title-text">${item.layerTitle}</span>
                        <span class="item-title-suffix">${this._itemGlobalIndex(item)}</span>
                        <span class="item-title-tag-slot">
                          ${item.layerType &&
                          item.layerType !== "DRAWING" &&
                          item.layerType !== "MEASURE"
                            ? html`<span class="attr-type-tag">${item.layerType}</span>`
                            : nothing}
                        </span>
                      </span>
                      ${this._renderZoomButton(item, index)}
                    </span>
                    <div class="item-body-wrap">
                      <div class="item-body" @scroll=${(event: Event) => this._syncScrollThumbFor(event.currentTarget as HTMLElement)}>
                        ${this._renderPropertyTable(item.propertyEntries)}
                      </div>
                      <div class="item-scroll-thumb" @pointerdown=${(event: PointerEvent) => this._startThumbDrag(event)}></div>
                    </div>
                  </cds-accordion-item>
                `,
              )}
              ${this._accordionPageCount > 1
                ? Array.from({ length: IDENTIFY_PAGE_SIZE - this._pagedTableItems.length }).map(
                    () => html`<cds-accordion-item class="accordion-filler" disabled></cds-accordion-item>`,
                  )
                : nothing}
            </cds-accordion>
            ${this._accordionPageCount > 1
              ? html`
                  <div class="accordion-pager">
                    <button
                      type="button"
                      class="pager-btn"
                      aria-label="Önceki sayfa"
                      ?disabled=${this._accordionPage === 0}
                      @click=${() => this._goToAccordionPage(this._accordionPage - 1)}
                    >
                      ‹
                    </button>
                    <span class="pager-status">Sayfa ${this._accordionPage + 1} / ${this._accordionPageCount}</span>
                    <button
                      type="button"
                      class="pager-btn"
                      aria-label="Sonraki sayfa"
                      ?disabled=${this._accordionPage >= this._accordionPageCount - 1}
                      @click=${() => this._goToAccordionPage(this._accordionPage + 1)}
                    >
                      ›
                    </button>
                  </div>
                `
              : nothing}
          </div>
        `;

    return html`
      <div class="coord-card" ?hidden=${!this._basicOpen}>
        <span class="coord-icon">${ICON_LOCATION}</span>
        <div class="coord-body">
          <span class="coord-title">Koordinat</span>
          <span class="coord-value">${formatLat(this._basicLat)}, ${formatLon(this._basicLon)}</span>
        </div>
        <button type="button" class="coord-close-btn" aria-label="Kapat" @click=${() => this._closeBasic()}>
          ${ICON_CLOSE}
        </button>
      </div>

      <div class="loading-card" ?hidden=${!this._imageryPending}>
        <span class="loading-spinner"></span>
        <span>Sorgulanıyor…</span>
      </div>

      <div
        class=${classMap({ "attr-panel": true, "attr-panel--auto": this._isCompactPanel })}
        ?hidden=${!this._tableOpen}
      >
        <div class="attr-header" @pointerdown=${(event: PointerEvent) => this._drag.start(event)}>
          <div class="attr-header-title-group">
            <span class="attr-header-icon">${ICON_INFORMATION}</span>
            <div class="attr-header-text">
              <span class="attr-title">Konum/Bilgi Al</span>
            </div>
          </div>
          ${singleItem
            ? nothing
            : html`<span class="attr-result-count">${this._tableItems.length} sonuç bulundu</span>`}
          <button type="button" class="attr-close-btn" aria-label="Kapat" @click=${() => this._closeTable()}>
            ${ICON_CLOSE}
          </button>
        </div>

        ${breadcrumb}

        ${body}

        <div class="attr-footer">
          <span>Enlem/Boylam</span>
          <span class="attr-footer-value">${formatLat(this._tableLat)}, ${formatLon(this._tableLon)}</span>
        </div>
      </div>
    `;
  }
}
