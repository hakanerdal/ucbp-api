import { LitElement, PropertyValues } from 'lit';
/**
 * `tucbs-slide-over-panel`: ekranin bir kenarindan (bkz. `side`) tam-
 * yukseklik acilan genel-amacli panel govdesi. `TucbsSettingsTool`'un
 * actigi "Ayarlar" paneli `side="right"` (varsayilan) ile, `TucbsLayerList`'in
 * "Katman Yonetimi"'i `side="left"` ile kullanir -- ikisi de AYNI govdeyi
 * (baslik+kapatma+govde+gecis animasyonu) paylasir, sadece hangi kenardan
 * acilip hangi yone kaydigi degisir. Icerik (`<slot>`) VE baslik yanindaki
 * ikon (`<slot name="icon">`, opsiyonel) tuketiciye birakilir.
 *
 * NOT: `TucbsBasemapPicker`'in KENDI bagimsiz modu (tucbs-settings-tool
 * sayfada yoksa) bunu KULLANMAZ -- TucbsLayerList'teki ESKI toggle-btn/
 * panel deseriyle ayni sekilde, harita sikistirmadan/kaydirmadan sadece
 * haritanin ustunde yuzen bir kart acar/kapatir (bkz. TucbsBasemapPicker.ts).
 *
 * `TucbsLayerList` gibi kendisi zaten TOP-LEVEL bir tag olarak kullanilan
 * (baska bir bilesenin shadow DOM'una gomulmeyen) tuketiciler bunu KENDI
 * shadow root'larinda NORMAL bir cocuk olarak (portal OLMADAN) kullanabilir
 * -- `position:fixed` zaten dogru sekilde viewport'a gore konumlanir.
 * `document.body`'ye DOGRUDAN eklenmesi ("portal") SADECE `TucbsSettingsTool`
 * gibi `tucbs-toolbar`'in kendi shadow DOM'unda yasayan tuketiciler icin
 * GEREKIR -- cagiran bilesenin KENDI shadow DOM agacinin icinde DEGIL.
 * WHY: cagiran bilesen
 * (ör. `tucbs-settings-tool`) genelde `tucbs-toolbar` icinde bir arac
 * olarak kullanilir; TucbsToolbar bazi konumlarda kendini ortalamak icin
 * kendi :host'una `transform` uygular (bkz. TucbsToolbar.POSITION_STYLES).
 * CSS spec'ine gore `transform` tasiyan HERHANGI bir ATA, `position:fixed`
 * torunlari icin YENI bir "containing block" olusturur -- yani panel,
 * viewport'a DEGIL o atanin kendi (icerige-gore-boyutlanan, kucuk)
 * kutusuna hapsolup yanlis/kirpilmis konum-boyutta cizilir. `document.
 * body`'ye dogrudan eklenmis bagimsiz bir element bu transform zincirinin
 * TAMAMEN disinda kalir.
 */
export declare class TucbsSlideOverPanel extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Panel başlığı. */
    panelTitle: string;
    /** Panelin hangi ekran kenarından açılacağı. */
    side: "left" | "right";
    /** Panelin açık/kapalı durumu (`open` attribute'una reflect edilir). */
    open: boolean;
    /** Panelin genişliği. */
    panelWidth: string;
    /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni. */
    customCss: string;
    /** Gövde (`.panel-body`) taşarsa dikey scroll gösterilsin mi. */
    scrollBody: boolean;
    /** Panelin kendi kapatma (X) butonu tetiklendiğinde çağrılır. */
    onCloseRequest: (() => void) | undefined;
    private readonly _customCssState;
    /** `customCss` değiştiğinde özel CSS'i shadow DOM'a yeniden uygular. */
    updated(changed: PropertyValues): void;
    private _close;
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=SlideOverPanel.d.ts.map