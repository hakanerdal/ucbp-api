import { LitElement, nothing, PropertyValues } from 'lit';
import { InteractionManager, Map as TucbsMapInstance } from '@tucbs/core';
/**
 * Harita altinda sabit duran, imlecin altindaki koordinati (enlem/boylam),
 * kamera olcegini ("1/N") ve -- haritada gercek bir arazi (yukseklik) verisi
 * kuruluysa -- yuksekligi gosteren bilgi cubugu. Cubugun hemen ustunde, sag
 * altta seffaf TUCBS logosu ve uygulama adi durur (`show-brand="false"` gizler). Arazi verisi yokken (Cesium'un
 * duz elipsoidi, varsayilan) yukseklik alani gosterilmez. Altlik harita
 * yuklenemedigi icin yedek dunya goruntusu (NASA Blue Marble) gosterildigi
 * surece sagdaki atfa goruntunun kaynagi da eklenir (bkz. `map`).
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
    /** Opsiyonel: Core JS API `Map` referansi; yedek dunya goruntusunun kaynak atfi buradan izlenir. */
    map: TucbsMapInstance | undefined;
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
     * atif yeri burasidir. `map` bagliyken yedek dunya goruntusu gosterildigi
     * surece bu metnin yanina "Yedek görüntü: <kaynak>" eklenir; altlik kesin
     * basarisiz olup haritadan kaldirildiysa (`basemap:error`) bu metin gizlenir,
     * yalniz yedek goruntunun kaynagi kalir. Ikisi de `attribution`'i degistirmez.
     */
    attribution: string;
    /** Sağ alttaki şeffaf logo ve uygulama adının gösterilip gösterilmeyeceği; HTML'de `show-brand="false"` gizler (varsayılan `true`). */
    showBrand: boolean;
    private readonly _customCssState;
    private _lon;
    private _lat;
    private _height;
    private _scale;
    private _fallbackAttribution;
    private _basemapUnavailable;
    private readonly _onFallbackShown;
    private readonly _onFallbackHidden;
    private readonly _onBasemapError;
    private readonly _onBasemapRecovered;
    private readonly _onLayerAdd;
    private _mouseMoveRaf;
    private _pendingMouseDetail;
    private _cameraRaf;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    private readonly _onMapMouseMove;
    private readonly _onCameraChanged;
    /**
     * `interactionManager` ya da `map` disaridan verilmemisse, `mapElementId` ile
     * bulunan `tucbs-map` elementinin hazir olmasini bekleyip ondan alir.
     */
    firstUpdated(): void;
    /**
     * `customCss` degistiginde ozel stili shadow DOM'a uygular; `interactionManager`
     * ya da `map` degistiginde onceki referanstan olay dinleyicilerini kaldirip yenisine baglar.
     */
    updated(changed: PropertyValues): void;
    /** DOM'a bağlandığında panel yerleşimine kaydolur; açık bir panel varsa hemen ona göre daralır. */
    connectedCallback(): void;
    /** Baglanti kesildiginde olay dinleyicilerini, bekleyen animation frame'leri ve panel yerlesimi kaydini temizler. */
    disconnectedCallback(): void;
    private _lastCameraPosition;
    private _removePostRender;
    private _lastScaleRetry;
    private readonly _onPostRender;
    private _bind;
    private _unbind;
    private _bindMap;
    private _unbindMap;
    /**
     * Sagdaki atif metni: `attribution`, yedek goruntu gosteriliyorsa yanina kaynagi.
     * Altlik kesin basarisizsa ekranda yalniz yedek goruntu oldugundan `attribution` atlanir.
     */
    private _attributionText;
    /** Sahnede gerçek bir arazi (yükseklik) kaynağı var mı; düz elipsoit ya da sahne yoksa `false`. */
    private _hasTerrain;
    private _sampleHeight;
    private _computeScale;
    private _formatLat;
    private _formatLon;
    private _formatHeight;
    private _formatScale;
    /** `interactionManager` yoksa hicbir sey render etmez; varsa koordinat/olcek satirini (gercek arazi verisi varsa yukseklikle) ve -- `showBrand` ise -- ustundeki logoyu cizer. */
    render(): import('lit').TemplateResult<1> | typeof nothing;
}
//# sourceMappingURL=TucbsInfoBar.d.ts.map