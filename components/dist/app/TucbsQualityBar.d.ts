import { LitElement, nothing, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/**
 * Harita render kalitesi/performans dengesini ayarlamak icin surgulu (slider)
 * kontrol paneli. Baglandigi Map instance'inin GUNCEL kalitesini
 * (viewer.resolutionScale) okuyarak baslar ve kullanici surukledikce
 * `map.setQuality()` cagirir (bkz. _onSliderInput, _syncFromMap).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-quality-bar mapElementId="map" position="bottom-right"></tucbs-quality-bar>
 * ```
 */
export declare class TucbsQualityBar extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Baglanilacak `tucbs-map` elementinin id'si (opsiyonel). */
    mapElementId: string;
    /** Bar'in harita uzerindeki konumu. Varsayilan `"bottom-left"`. */
    position: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni (bkz. ./internal/CustomCss.ts). */
    customCss: string;
    /** Core JS API `Map` instance referansi. */
    map: TucbsMapInstance | undefined;
    private readonly _customCssState;
    private _quality;
    private _qualityRaf;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    /** Bekleyen RAF (kalite guncelleme) varsa iptal eder, ardindan super'i cagirir. */
    disconnectedCallback(): void;
    /** Map instance'ina baglanir: property binding (Senaryo 1) veya `mapElementId` (Senaryo 2A/2B) uzerinden. */
    firstUpdated(): void;
    /** `customCss` degisince ozel CSS'i yeniden uygular; `map` degisince bar'i haritanin guncel kalitesinden senkronlar. */
    updated(changed: PropertyValues): void;
    private _syncFromMap;
    private _onSliderInput;
    /** Map baglanmadiysa `nothing` (bilesen gizli); baglandiysa kalite surgulu panelini cizer. */
    render(): import('lit').TemplateResult<1> | typeof nothing;
}
//# sourceMappingURL=TucbsQualityBar.d.ts.map