import { ReactiveControllerHost } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
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
export declare class PanelLayoutController {
    private readonly hostForToolbarLookup;
    private readonly side;
    private _map;
    private _mapContainer;
    private _resizeObserver;
    private _toolbarEl;
    private _toolbarLookupDone;
    private _resizeRaf;
    /** Host'un setTimeout/rAF çağrılarını izler; host DOM'dan kalkınca bekleyen kareyi iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    /** Sahibi tarafindan atanir: ayni taraftaki BASKA bir panel acilinca BU panelin de kapatilmasi gerektiginde cagrilir. */
    onExclusiveClose: (() => void) | null;
    constructor(hostForToolbarLookup: Element & ReactiveControllerHost, side?: "left" | "right");
    /** Bu controller'ı bir `Map` instance'ına bağlar; harita container'ının (ve varsa `tucbs-info-bar`'ın) boyut geçişlerini/ResizeObserver'ını kurar. */
    bindMap(map: TucbsMapInstance): void;
    /** Bu controller'ı haritadan ayırır: gözlemciyi/paylaşılan genişlik durumunu temizler ve haritayı son bir kez `resize()` eder. */
    unbindMap(map: TucbsMapInstance): void;
    /** Panel acildiginda/kapandiginda haritayi, (varsa) info-bar'i ve (varsa) toolbar'i esler. */
    setOpen(open: boolean, panelWidth: string): void;
    private _findToolbarHost;
    private _applyToolbarShift;
}
//# sourceMappingURL=PanelLayoutController.d.ts.map