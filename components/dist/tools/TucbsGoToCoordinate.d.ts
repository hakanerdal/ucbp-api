import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/**
 * `tucbs-goto-coordinate`: toolbar butonuna basinca (Ayarlar gibi) sagdan
 * kayarak acilan paylasilan `tucbs-slide-over-panel` icinde Enlem/Boylam
 * formunu gosteren, girilen koordinata kamerayi animasyonla goturup
 * haritaya pin dusuren arac. Panel acilinca haritayi (ve varsa toolbar'i)
 * panel genisligi kadar iter (bkz. PanelLayoutController); ayni tarafta
 * baska bir panel (Ayarlar/Analiz/Yazdir) acilirsa kapanir. Diger tum
 * tucbs-*-tool bilesenleri gibi `tucbs-toolbar` icinde
 * (`tools="...,goto-coordinate"`) kullanilabildigi gibi tek basina da embed
 * edilebilir.
 *
 * @fires tucbs-goto-coordinate-closed - Panel kapandiginda tetiklenir
 *   (kapat butonu, tekrar buton tiklamasi ya da baska panelin acilmasi);
 *   detay yok.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-goto-coordinate mapElementId="map"></tucbs-goto-coordinate>
 * ```
 */
export declare class TucbsGoToCoordinate extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Opsiyonel: tucbs-map elementinin ID'si (Senaryo 2 baglama). */
    mapElementId: string;
    /** Panelin genisligi (herhangi bir CSS boyut degeri, ör. "360px"). */
    panelWidth: string;
    /** Bilesenin `.tool-button` shadow DOM'una enjekte edilecek serbest bicimli CSS metni. */
    customCss: string;
    /** Core JS API `Map` instance referansi; Senaryo 1'de property binding ile, Senaryo 2'de otomatik atanir. */
    map: TucbsMapInstance | undefined;
    private _open;
    private _lat;
    private _lon;
    private readonly _layoutController;
    private _panelEl;
    private readonly _customCssState;
    /** Paylasilan slide-over paneli olusturup `document.body`'ye portal eder (bkz. SlideOverPanel.ts WHY yorumu). */
    connectedCallback(): void;
    /** Haritadan/layout controller'dan ayrilir, pin'i temizler ve portal edilmis paneli kaldirir. */
    disconnectedCallback(): void;
    /** Ilk render sonrasi `map`i (programatik atanmadiysa) `mapElementId` uzerinden haritaya baglar. */
    firstUpdated(): void;
    /** `customCss`/`map`/`panelWidth` degisimlerini isler ve panel icerigini yeniden render eder. */
    updated(changed: PropertyValues): void;
    private _toggle;
    private _openPanel;
    private _close;
    private _isValid;
    private static _sanitizeCoordinateInput;
    private static _parseCoordinate;
    private _handleCoordInput;
    private _handleKeydown;
    private _submit;
    private _renderIntoPanel;
    /** Toolbar'daki dairesel "Koordinata Git" butonunu render eder. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsGoToCoordinate.d.ts.map