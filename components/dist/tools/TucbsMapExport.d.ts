import { LitElement, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/**
 * O anki harita goruntusunu (kamera + tum entity/feature'lar, UI butonlari
 * HARIC) JPEG olarak indirir. Yakalama/indirme mantigi `@tucbs/core`'da
 * (`Map.exportJPEG()`, tucbs-react RecordToolPanel.tsx'ten porte edildi) --
 * bu component sadece ince bir tetikleyici buton. `tucbs-toolbar` icinde bir
 * arac olarak kullanilabildigi gibi, toolbar disinda tek basina da embed
 * edilebilir (TucbsZoomTool ile ayni konvansiyon).
 *
 * v14/v8 dokumanlarindaki genis kapsamli tasarim (format secimi, yazdirma
 * gorunumu, mail gonderme, GeoTIFF) BILEREK kapsam disi -- bu turde SADECE
 * JPG indirme. Yazdirma gorunumu sonraki bir surumde ayri bir `TucbsPrintTool`
 * olarak eklenecek.
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2).
 *
 * @example
 * ```html
 * <tucbs-map-export mapElementId="map" filename="harita"></tucbs-map-export>
 * ```
 */
export declare class TucbsMapExport extends LitElement {
    static readonly styles: (import('lit').CSSResult | import('lit').CSSResult[])[];
    /** Opsiyonel: tucbs-map elementinin ID'si (Senaryo 2 baglama). */
    mapElementId: string;
    /** Indirilen dosyanin adi (uzantisiz). */
    filename: string;
    /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni. Bkz. ./internal/CustomCss.ts. */
    customCss: string;
    /** Senaryo 2: `mapElementId` uzerinden otomatik cozulur; ayrica programatik olarak da atanabilir. Baglanti kurulana kadar bilesen islevsiz kalir. */
    map: TucbsMapInstance | undefined;
    private _busy;
    private readonly _customCssState;
    /** `customCss` degistiginde shadow DOM'a enjekte edilen ozel stili gunceller. */
    updated(changed: PropertyValues): void;
    /** `mapElementId` uzerinden (veya `ready` olayini bekleyerek) `map` referansini coze; hicbiri saglanmazsa uyari loglar. */
    firstUpdated(): void;
    private _onClick;
    /** Bilesenin indirme dugmesini (JPG ikonu) render eder. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsMapExport.d.ts.map