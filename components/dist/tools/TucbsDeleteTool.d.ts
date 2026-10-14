import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/**
 * Cizilen TUM sekilleri (nokta/cizgi/alan/dikdortgen/daire/serbest-cizim) VE
 * ileride yazilacak olcum araci sonuclarini (v1 SS5 karari geregi
 * `DrawingManager`'in ayni `polyline`/`polygon` araclarini yeniden kullanacagi
 * icin AYNI `shapes` deposunda tutulacak) tek bir aksiyonla siler. `tucbs-toolbar`
 * icinde bir arac olarak kullanilabildigi gibi, toolbar disinda tek basina da
 * embed edilebilir (TucbsZoomTool ile ayni konvansiyon).
 *
 * Geri alinamaz bir eylem oldugu icin tek tiklamada SILMEZ -- `cds-actionable-
 * notification` (kind="warning") ile bir onay gosterilir, sadece bildirimin
 * eylem butonuna tiklanirsa gercek silme gerceklesir.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-delete-tool mapElementId="map"></tucbs-delete-tool>
 * ```
 */
export declare class TucbsDeleteTool extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Baglanilacak `tucbs-map` elementinin HTML id'si (Senaryo 2 - otomatik baglama); opsiyoneldir. */
    mapElementId: string;
    /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni (bkz. ./internal/CustomCss.ts). */
    customCss: string;
    /** Core JS API `Map` referansi. */
    map: TucbsMapInstance | undefined;
    private _confirming;
    private readonly _customCssState;
    /** `customCss` degistiginde shadow DOM'a yeniden uygular. */
    updated(changed: PropertyValues): void;
    /** `mapElementId` ile eslesen elementten `map` referansini alir (henuz `map` atanmamissa). */
    firstUpdated(): void;
    private _openConfirm;
    private _cancel;
    private _confirmDelete;
    /** Sil butonunu ve (`_confirming` true iken) onay bildirimini render eder. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsDeleteTool.d.ts.map