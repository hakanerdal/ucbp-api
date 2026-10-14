import { LitElement, nothing, PropertyValues } from 'lit';
import { InteractionManager } from '@tucbs/core';
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
export declare class TucbsInfoBar extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Core JS API `InteractionManager` referansi; imlec/kamera olaylarina buradan abone olunur. */
    interactionManager: InteractionManager | undefined;
    /** Opsiyonel: `tucbs-map` element'inin ID'si; verilirse `interactionManager` buradan kendiliginden baglanir. */
    mapElementId: string;
    /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni. */
    customCss: string;
    /**
     * Sag alttaki altlik harita kaynak/telif metni. Varsayilani HGM'dir; HGM
     * DISINDA bir altlik kullanildiginda (ör. `basemap`'e ham bir XYZ URL'i
     * verilmisse) tuketici bunu DEGISTIRMELIDIR -- aksi halde bar, ekranda
     * olmayan bir kaynagi gosterir. Cesium'un kendi credit kutusu bu üründe
     * gizli oldugu icin (bkz. Map.ts hiddenCreditContainer) gorunur TEK
     * atif yeri burasidir.
     */
    attribution: string;
    private readonly _customCssState;
    private _lon;
    private _lat;
    private _height;
    private _scale;
    private _mouseMoveRaf;
    private _pendingMouseDetail;
    private _cameraRaf;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    private readonly _onMapMouseMove;
    private readonly _onCameraChanged;
    /**
     * `interactionManager` disaridan verilmemisse, `mapElementId` ile
     * bulunan `tucbs-map` elementinin hazir olmasini bekleyip ondan alir.
     */
    firstUpdated(): void;
    /**
     * `customCss` degistiginde ozel stili shadow DOM'a uygular; `interactionManager`
     * degistiginde onceki referanstan olay dinleyicilerini kaldirip yenisine baglar.
     */
    updated(changed: PropertyValues): void;
    /** Baglanti kesildiginde olay dinleyicilerini ve bekleyen animation frame'leri temizler. */
    disconnectedCallback(): void;
    private _bind;
    private _unbind;
    private _sampleHeight;
    private _computeScale;
    private _formatLat;
    private _formatLon;
    private _formatHeight;
    private _formatScale;
    /** `interactionManager` yoksa hicbir sey render etmez; varsa koordinat/yukseklik/olcek satirini cizer. */
    render(): import('lit').TemplateResult<1> | typeof nothing;
}
//# sourceMappingURL=TucbsInfoBar.d.ts.map