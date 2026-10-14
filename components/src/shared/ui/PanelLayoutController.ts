import type { ReactiveControllerHost } from "lit";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import { TimerBag } from "../util/TimerBag.js";

// Panel'in acilma/kapanma suresi -- hem panelin kendi transform gecisiyle
// (bkz. SlideOverPanel.ts, orada css`` icinde literal olarak tekrarlanir)
// hem burada haritanin/toolbar'in gecisiyle AYNI degerle kullanilir, boylece
// hepsi ayni anda/hizda hareket eder.
const TRANSITION_TIMING = "240ms cubic-bezier(0.2, 0, 0.38, 0.9)";

// `TucbsLayerList`'in ("left") ve `TucbsSettingsTool`'un ("right") panelleri
// AYNI ANDA acik olabilir ve İKİSİ DE AYNI harita container'ini (ve varsa
// tucbs-info-bar'i) daraltir. Bu yuzden her iki tarafin genislik katkisi
// MODUL-SEVIYESINDE PAYLASILAN bu degiskenlerde tutulur -- iki BAGIMSIZ
// `PanelLayoutController` instance'i KENDI panelWidth'ini dogrudan
// container.style.width/marginLeft'e YAZARSA, biri digerinin degerini
// KORUMADAN EZER. Ozellikle KAPANMA sirasinda (once "left" acikken "right"
// da acilip SONRA sadece "right" kapatilinca): eski kodda width kosulsuz
// "100%" yapiliyordu ama "left"in HALA acik olan marginLeft'i ORTADA
// KALIYORDU -- toplam genislik %100+panelWidth olup YATAY SCROLL'A yol
// aciyordu. Cozum: her iki controller de SADECE kendi tarafinin genislik
// degerini bu paylasilan duruma yazar, gercek DOM stili ise HER ZAMAN
// ikisinin BILESIMINDEN (bkz. _applyCombinedLayout) yeniden hesaplanir.
let sharedLeftWidth: string | null = null;
let sharedRightWidth: string | null = null;

// Bu bilesimin uygulanacagi TUM elementler -- harita container'i (Cesium
// canvas'inin boyutunu degistirmek icin, ayrica ResizeObserver+map.resize()
// gerektirir) VE varsa `tucbs-info-bar` (sadece gorsel genislik/margin,
// Cesium ile ilgisi yok -- "Katman Yonetimi ve/veya Ayarlar acikken
// TucbsInfoBar de AYNI oranda daralsin" istegi). Modul-seviyesinde, HER IKI
// controller de AYNI elementleri (ayni harita/info-bar'a bagli oldugu icin)
// ekler -- bir Set oldugundan tekrar eklemeler zararsizdir.
const layoutTargets = new Set<HTMLElement>();

// Ayni tarafta (ör. "right": Yazdir/Ayarlar/Analiz ucu) BIRDEN FAZLA
// PanelLayoutController ES ZAMANLI "acik" olabiliyordu -- her biri KENDI
// `_open` state'ini bagimsiz tuttugu icin (bkz TucbsPrintTool/
// TucbsSettingsTool/TucbsAnalysisTool) bir arac acikken digeri acilinca
// ikisi de gorunur kaliyor, SONRA biri kapatilinca `setOpen(false, ...)`
// paylasilan `sharedRightWidth`'i KOSULSUZ null'a cekip HALA acik olan
// digerinin payini de siliyor, ustune toolbar kaydirmasini da sifirliyordu
// (harita/panel hala acikken toolbar sagdan-yapisik konumuna donuyordu).
// Cozum: her taraf icin O AN acik olan TEK controller burada tutulur; yeni
// bir controller open=true ile gelince, ayni taraftaki ONCEKI controller
// (kendisi degilse) `onExclusiveClose` araciligiyla ONCE kapatilir --
// boylece sahibinin `_open`/panel state'i de dogru sekilde false'a duser,
// sadece bu sinifin ic durumu degil.
const openControllerBySide: Record<"left" | "right", PanelLayoutController | null> = {
  left: null,
  right: null,
};

function applyCombinedLayout(): void {
  const parts: string[] = [];
  if (sharedLeftWidth) parts.push(sharedLeftWidth);
  if (sharedRightWidth) parts.push(sharedRightWidth);
  const width = parts.length ? `calc(100% - ${parts.join(" - ")})` : "100%";
  const marginLeft = sharedLeftWidth ?? "";
  for (const el of layoutTargets) {
    el.style.width = width;
    el.style.marginLeft = marginLeft;
  }
}

/**
 * Sagdan/soldan kayan bir panel (bkz. SlideOverPanel.ts) acildiginda
 * haritayi VE -sadece "right" tarafta, varsa- ata `tucbs-toolbar`'i panele
 * yer acacak sekilde "iten" mantik. `TucbsSettingsTool`'un "Ayarlar" paneli
 * (side="right", varsayilan) ile `TucbsLayerList`'in "Katman Yonetimi"
 * paneli (side="left") AYNI sinifi paylasir; ikisinin ayni anda acik
 * olabilecegi durum icin bkz. yukaridaki `sharedLeftWidth`/`sharedRightWidth`
 * WHY yorumu.
 *
 * NOT: `TucbsBasemapPicker`'in KENDI bagimsiz modu (tucbs-settings-tool
 * sayfada yoksa) bu sinifi KULLANMAZ -- o, ESKI toggle-btn/panel deseriyle
 * harita SIKISTIRMADAN, sadece haritanin ustunde yuzen bir kart acar/kapatir
 * (bkz. TucbsBasemapPicker.ts).
 *
 * Harita: `map.viewer.container`'i (Cesium'un DOGRUDAN constructor'a
 * verdigi DOM elementi) panel genisligi kadar daraltip her boyut
 * degisiminde (ResizeObserver ile, gecis ANIMASYONU boyunca surekli)
 * `map.resize()` cagirir -- kamera KONUMU/ACISI/ZOOM'u HICBIR SEKILDE
 * degistirilmez (setExtent/lookAt YOK), sadece canvas'in fiziksel boyutu
 * degisir. Cesium canvas boyutunu SADECE constructor aninda okuyup
 * sonradan KENDILIGINDEN takip ETMEDIGI icin (bkz. TucbsMapPreview'daki
 * ayni WHY yorumu) ResizeObserver+resize() burada da TEK saglam yol.
 * `left` tarafin acik genisligi VARSA (baska bir controller'dan bile olsa)
 * SADECE `width` daraltmak yetmez -- bosluk container'in kendi baslangic
 * (sol) kenarindan degil, varsayilan olarak SAGDAN acilir (width azalinca
 * container SOL'da ayni yerde kalip SAGDAN kisalir). Bu yuzden `left` acikken
 * AYRICA `margin-left` uygulanir -- container'in gorunur baslangici o kadar
 * SAGA kayar, boylece bosluk dogru sekilde SOL'da acilir.
 *
 * `tucbs-info-bar`: ayni width/margin-left ikilisiyle (ResizeObserver/
 * map.resize() OLMADAN, sadece gorsel) daraltilir -- boylece alt bilgi
 * cubugu da acik panel(ler)in ALTINA degil, sadece GORUNEN harita alaninin
 * genisligine yayilir.
 *
 * Toolbar: yalnizca CAGIRAN element (`hostForToolbarLookup`) GERCEKTEN bir
 * `tucbs-toolbar`'in shadow DOM'u icinde ise (yani `tucbs-toolbar` onun
 * kendi shadow-host'u ise) devreye girer -- baska bir deyisle SADECE
 * `TucbsSettingsTool` gibi toolbar'in kendi ic aracina uygulanir. Sadece
 * "right-center"/"top-right"/"bottom-right" konumlarinda anlamli oldugu
 * icin diger (sol/orta) konumlarda hicbir sey yapmaz -- `TucbsLayerList`
 * (side="left") zaten bir toolbar'in ic araci OLMADIGI icin bu kisim onun
 * icin dogal olarak no-op'tur. `transform` DEGIL, ondan BAGIMSIZ `translate`
 * CSS property'si kullanilir -- TucbsToolbar kendi ortalama transform'unu
 * (bkz. POSITION_STYLES) `this.style.transform` uzerinden ayarliyor; ikisi
 * ayni property'yi PAYLASSAYDI biri digerini ezerdi.
 */
export class PanelLayoutController {
  private _map: TucbsMapInstance | undefined;
  private _mapContainer: HTMLElement | null = null;
  private _resizeObserver: ResizeObserver | null = null;
  private _toolbarEl: HTMLElement | null = null;
  private _toolbarLookupDone = false;
  private _resizeRaf: number | null = null;
  /** Host'un setTimeout/rAF çağrılarını izler; host DOM'dan kalkınca bekleyen kareyi iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers: TimerBag;

  /** Sahibi tarafindan atanir: ayni taraftaki BASKA bir panel acilinca BU panelin de kapatilmasi gerektiginde cagrilir. */
  onExclusiveClose: (() => void) | null = null;

  // Host bir Lit bileseni olmali (ReactiveControllerHost): TimerBag ona
  // controller olarak eklenir. ESKIDEN yalnizca Element bekleniyordu
  // (toolbar aramasi icin); dort cagiran da zaten `this` (LitElement) veriyor.
  constructor(
    private readonly hostForToolbarLookup: Element & ReactiveControllerHost,
    private readonly side: "left" | "right" = "right",
  ) {
    this._timers = new TimerBag(hostForToolbarLookup);
  }

  /** Bu controller'ı bir `Map` instance'ına bağlar; harita container'ının (ve varsa `tucbs-info-bar`'ın) boyut geçişlerini/ResizeObserver'ını kurar. */
  bindMap(map: TucbsMapInstance): void {
    this._map = map;
    const container = map.viewer.container as HTMLElement;
    this._mapContainer = container;
    container.style.transition = `width ${TRANSITION_TIMING}, margin-left ${TRANSITION_TIMING}`;
    layoutTargets.add(container);

    // "Ciplak marker tag" deseni (bkz. TucbsLayerList'teki ayni desen):
    // sadece varlik kontrolu icin -- tucbs-info-bar sayfada gercekten
    // kullaniliyorsa (showInfoBar=true) onu da AYNI bicimde daraltiriz.
    const infoBar = document.querySelector("tucbs-info-bar") as HTMLElement | null;
    if (infoBar) {
      infoBar.style.transition = `width ${TRANSITION_TIMING}, margin-left ${TRANSITION_TIMING}`;
      layoutTargets.add(infoBar);
    }

    // `map.resize()` (Cesium'un `viewer.resize()`'i) canvas'in WEBGL arka
    // tamponunu yeniden ayirip bir render tetikleyen agir bir islem --
    // ResizeObserver, gecis animasyonu boyunca HER frame'de (ust uste
    // binerek) bunu dogrudan cagirirsa ana thread'i tikayip gecisin
    // kendisini "kesik kesik" gostermesine yol aciyordu (CSS gecisi
    // compositor'da duzgun aksa da, canvas'in KENDISI onu takip edemiyordu).
    // Diger frekans-sinirlama desenlerinde (bkz. TucbsQualityBar/
    // TucbsLayerList opaklik slider'i) oldugu gibi, frame basina EN FAZLA
    // BIR `resize()` cagrisiyla sinirlandirilir.
    this._resizeObserver = new ResizeObserver(() => {
      if (this._resizeRaf !== null) return;
      this._resizeRaf = this._timers.requestAnimationFrame(() => {
        this._resizeRaf = null;
        map.resize();
      });
    });
    this._resizeObserver.observe(container);
    // Bu controller BAGLANDIGINDA diger tarafin paneli ZATEN acik olabilir
    // (ör. Ayarlar acikken harita/InteractionManager gec hazir oldu) --
    // mevcut paylasilan durumu hemen uygulariz.
    applyCombinedLayout();
  }

  /** Bu controller'ı haritadan ayırır: gözlemciyi/paylaşılan genişlik durumunu temizler ve haritayı son bir kez `resize()` eder. */
  unbindMap(map: TucbsMapInstance): void {
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    if (this._resizeRaf !== null) {
      this._timers.cancelAnimationFrame(this._resizeRaf);
      this._resizeRaf = null;
    }
    if (openControllerBySide[this.side] === this) openControllerBySide[this.side] = null;
    if (this.side === "left") sharedLeftWidth = null;
    else sharedRightWidth = null;
    applyCombinedLayout();
    if (this._mapContainer) this._mapContainer.style.transition = "";
    this._mapContainer = null;
    this._map = undefined;
    map.resize();
  }

  /** Panel acildiginda/kapandiginda haritayi, (varsa) info-bar'i ve (varsa) toolbar'i esler. */
  setOpen(open: boolean, panelWidth: string): void {
    if (open) {
      const current = openControllerBySide[this.side];
      if (current && current !== this) current.onExclusiveClose?.();
      openControllerBySide[this.side] = this;
    } else if (openControllerBySide[this.side] === this) {
      openControllerBySide[this.side] = null;
    }

    if (this.side === "left") sharedLeftWidth = open ? panelWidth : null;
    else sharedRightWidth = open ? panelWidth : null;
    applyCombinedLayout();
    this._applyToolbarShift(open, panelWidth);
  }

  private _findToolbarHost(): HTMLElement | null {
    const root = this.hostForToolbarLookup.getRootNode();
    if (root instanceof ShadowRoot && root.host.tagName.toLowerCase() === "tucbs-toolbar") {
      return root.host as HTMLElement;
    }
    return null;
  }

  private _applyToolbarShift(open: boolean, panelWidth: string): void {
    if (!this._toolbarLookupDone) {
      this._toolbarEl = this._findToolbarHost();
      this._toolbarLookupDone = true;
    }
    const toolbar = this._toolbarEl;
    if (!toolbar) return;

    const position = (toolbar as unknown as { position?: string }).position;
    const rightAnchored =
      position === "right-center" || position === "top-right" || position === "bottom-right";
    if (!rightAnchored) return;

    toolbar.style.transition = `translate ${TRANSITION_TIMING}`;
    toolbar.style.translate = open ? `calc(-1 * ${panelWidth})` : "";
  }
}
