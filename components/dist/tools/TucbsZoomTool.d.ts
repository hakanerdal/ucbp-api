import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance, MapExtent } from '@tucbs/core';
/**
 * Yakinlastir / Varsayilan Sinir / Uzaklastir butonlarindan olusan, `DrawingManager`'a
 * bagli olmayan bagimsiz kamera araci. `tucbs-toolbar` icinde bir arac olarak
 * kullanilabildigi gibi, toolbar disinda tek basina da embed edilebilir
 * (bkz. tucbs-taslak-web-component-metod-ihtiyac-analizi-v14 SS4.5).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-zoom-tool mapElementId="map" step-ratio="0.5"></tucbs-zoom-tool>
 * ```
 */
export declare class TucbsZoomTool extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Baglanacak `tucbs-map` elementinin DOM ID'si. */
    mapElementId: string;
    /** Her tiklamada kameranin mevcut yuksekligine oranla ne kadar hareket edecegini belirleyen adim orani. */
    stepRatio: number;
    /** "Varsayilan Sinir" butonuna tiklandiginda kameranin donecegi hedef bolge. */
    defaultExtent: MapExtent | undefined;
    /** Shadow DOM'a enjekte edilecek serbest metin CSS. */
    customCss: string;
    /** Baglanilan Core JS API `Map` instance'i. */
    map: TucbsMapInstance | undefined;
    private readonly _customCssState;
    private _atMaxZoom;
    private _atMinZoom;
    private _unsubscribeZoomLimits;
    /** `customCss` degistiginde shadow DOM'a enjekte edilen ozel stili gunceller. */
    updated(changed: PropertyValues): void;
    /**
     * Ilk render sonrasi haritaya baglanir: `map` property binding ile zaten
     * atanmissa (Senaryo 1) hicbir sey yapmaz; aksi halde `mapElementId` ile
     * DOM'dan haritayi bulup `map`'i atar, gerekirse elementin `ready`
     * event'ini bekler (Senaryo 2).
     */
    firstUpdated(): void;
    private _watchZoomLimits;
    /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken kamera yakınlaştırma sınırı izleyicisini (`postRender` aboneliği) kaldırır. */
    disconnectedCallback(): void;
    /** Lit yaşam döngüsü: bileşen DOM'a yeniden eklendiğinde, harita bağlıysa kamera yakınlaştırma sınırı izleyicisini yeniden kurar. */
    connectedCallback(): void;
    private _zoomIn;
    private _zoomOut;
    private _goToDefaultExtent;
    /** Yakinlastir, Varsayilan Sinir ve Uzaklastir butonlarindan olusan buton grubunu render eder. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsZoomTool.d.ts.map