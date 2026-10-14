/** applyCustomCss'in bir instance icin tasidigi durum; cagiran private bir alanda saklamali. */
export interface CustomCssState {
    /** Adopte edilmiş `CSSStyleSheet` (henüz oluşturulmadıysa `null`). */
    sheet: CSSStyleSheet | null;
}
/**
 * Verilen CSS metnini, shadowRoot'a adopte edilmis ayri bir CSSStyleSheet
 * olarak uygular/gunceller. Ayni instance icin tekrar cagrildiginda
 * (customCss degistiginde) sheet'i yeniden olusturmak yerine replaceSync
 * ile gunceller; metin bos ise sheet'i adoptedStyleSheets'ten kaldirir.
 *
 * @param shadowRoot Bilesenin `this.shadowRoot`'u.
 * @param cssText Tuketicinin verdigi CSS metni (ör. `this.customCss`).
 * @param state Cagirandaki private alanda tutulan durum (ör. `{ sheet: null }`).
 * @param loggerLabel Hata mesajlarinda gosterilecek bilesen adi (ör. "tucbs-layer-list").
 */
export declare function applyCustomCss(shadowRoot: ShadowRoot | null, cssText: string, state: CustomCssState, loggerLabel: string): void;
//# sourceMappingURL=CustomCss.d.ts.map