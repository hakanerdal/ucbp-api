import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/**
 * `tucbs-settings-tool`: harita AYARLARINI ("Altlık Haritalar" + "Harita
 * Kalitesi") tek bir toolbar butonunun actigi, sagdan sola kayarak acilan
 * tam-yukseklik bir panelde toplayan arac. `tucbs-toolbar` icinde bir arac
 * olarak (`tools="...,settings"`) kullanilabildigi gibi, diger tum
 * tucbs-*-tool bilesenleri gibi tek basina da embed edilebilir.
 *
 * Gercek panel govdesi paylasilan `tucbs-slide-over-panel`'dir (bkz. o
 * dosyanin WHY yorumu: `document.body`'ye PORTAL edilir, cunku
 * `tucbs-toolbar`'in bazi konumlarda kendi :host'una uyguladigi `transform`
 * fixed-position torunlar icin viewport DISINDA bir containing block
 * olusturuyordu). Icerik (basemap-picker + quality-bar), panelin light
 * DOM'una Lit'in `render()` fonksiyonuyla DOGRUDAN yazilir (bkz.
 * _renderIntoPanel()) -- boylece `.map=${...}` gibi property binding'ler
 * normal bir Lit template'indeki gibi calisir, tek fark hedefin bu
 * bilesenin KENDI shadow root'u degil, portal edilmis panelin light DOM'u
 * olmasidir.
 *
 * Panel acildiginda haritanin CESIUM CONTAINER'ini VE (varsa, bkz.
 * PanelLayoutController) ata `tucbs-toolbar`'i panel genisligi kadar sola
 * "iterek" yer acar -- kamera KONUMU/ACISI/ZOOM'u HICBIR SEKILDE
 * degistirilmez, sadece canvas'in fiziksel boyutu (dolayisiyla en-boy
 * orani) degisir.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-settings-tool mapElementId="map" panel-width="360px"></tucbs-settings-tool>
 * ```
 */
export declare class TucbsSettingsTool extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Baglanacak `tucbs-map` elementinin HTML `id`'si (opsiyonel). */
    mapElementId: string;
    /** Panelin genisligi (herhangi bir CSS boyut degeri, ör. "360px"). */
    panelWidth: string;
    /** Bu bilesenin KENDI (.tool-button) shadow DOM'una enjekte edilecek keyfi CSS metni. */
    customCss: string;
    /** Core JS API `Map` instance referansi; ayarlar panelinin baglanacagi harita. */
    map: TucbsMapInstance | undefined;
    private _open;
    private readonly _layoutController;
    private _panelEl;
    private readonly _customCssState;
    /**
     * Lit yasam dongusu: bilesen DOM'a baglandiginda paylasilan
     * `tucbs-slide-over-panel`'i olusturup `document.body`'ye portal eder,
     * baslik/genislik/kapatma callback'ini ayarlar ve ilk icerigi panele render eder.
     */
    connectedCallback(): void;
    /**
     * Lit yasam dongusu: bilesen DOM'dan kaldirildiginda haritadan/layout
     * controller'dan ayrilir ve portal edilmis paneli DOM'dan kaldirir.
     */
    disconnectedCallback(): void;
    /**
     * Lit yasam dongusu: ilk render sonrasi haritaya baglanir -- `map`
     * property binding ile zaten atanmissa (Senaryo 1) hicbir sey yapmaz,
     * aksi halde `mapElementId` ile referans verilen `tucbs-map` elementini
     * bulup (varsa `ready` event'ini bekleyerek) `map`'i atar (Senaryo 2).
     */
    firstUpdated(): void;
    /**
     * Lit yasam dongusu: `customCss` degistiginde shadow DOM'a yeniden uygular,
     * `map` degistiginde layout controller'in bind/unbind islemlerini yapar,
     * `panelWidth` degisip panel aciksa yeni genisligi uygular ve panelin
     * icerigini (basemap-picker/quality-bar) yeniden render eder.
     *
     * @param changed - Degisen property'leri iceren Lit `PropertyValues` haritasi.
     */
    updated(changed: PropertyValues): void;
    private _renderIntoPanel;
    private _toggle;
    /** Toolbar butonunu render eder; tiklaninca ayarlar panelini acip kapatir. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsSettingsTool.d.ts.map