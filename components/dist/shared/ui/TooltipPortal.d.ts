import { LitElement, PropertyValues } from 'lit';
/**
 * `tucbs-tooltip-portal`: tek bir tooltip metnini `document.body`'ye
 * DOĞRUDAN portal eder (tek instance, `TucbsLayerList` tarafından
 * oluşturulup yeniden kullanılır) -- `TucbsLayerMenuPortal` ile AYNI
 * gerekçe (bkz. o dosyanın WHY yorumu): `.options-btn` satırın EN SAGINA
 * yaslı (bkz. TucbsLayerList `.layer-actions{margin-left:auto}`), bu yüzden
 * SAGA açılan bir tooltip `tucbs-slide-over-panel`'in
 * `.panel-body{overflow-y:auto}`'sunun CSS spec geregi karşı eksende de
 * uyguladığı örtük "auto" kırpmasına takılıp görünmez olurdu. Bu bileşen
 * `position:fixed` + butonun `getBoundingClientRect()`'i ile hesaplanan
 * mutlak ekran koordinatlarını kullanarak bu kırpma sınırının TAMAMEN
 * dışında (haritanın ÜSTÜNDE) render edilir.
 */
export declare class TucbsTooltipPortal extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Tooltip'in görünür olup olmadığı (`open` attribute'una reflect edilir). */
    open: boolean;
    /** Gösterilecek tooltip metni. */
    text: string;
    /** Tooltip'in ekrandaki mutlak X koordinatı (piksel). */
    x: number;
    /** Tooltip'in ekrandaki mutlak Y koordinatı (piksel). */
    y: number;
    /** `x`/`y` değiştiğinde host'un `transform`'unu günceller. */
    updated(changed: PropertyValues): void;
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TooltipPortal.d.ts.map