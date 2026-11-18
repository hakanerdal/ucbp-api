import { TemplateResult } from 'lit';
import { DrawLayerKind, LayerStyleSpec, LineDash, PointShape } from '@tucbs/core';
/** Stili okunamayan/kapalı olduğunda kullanılan nötr renk. */
export declare const DRAW_KIND_NEUTRAL_COLOR = "#9e9e9e";
/** Çizim katmanı türü ikonunun boyaması (`none` = o bileşen çizilmez). */
export interface DrawKindPaint {
    /** Dolgu rengi (CSS renk değeri ya da `none`). */
    readonly fill: string;
    /** Kenar/çizgi rengi (CSS renk değeri ya da `none`). */
    readonly stroke: string;
    /** Nokta ikonunun şekli (verilmezse daire). */
    readonly shape?: PointShape;
    /** Çizgi ikonunun SVG `stroke-dasharray` değeri (verilmezse düz). */
    readonly dashArray?: string;
}
/** Katman stilinden ikonu etkileyen sembol alanları. */
export interface DrawKindSymbol {
    readonly shape?: PointShape;
    readonly dash?: LineDash;
}
/** Stilden ikon sembolünü çıkarır; çizgi tipi yalnız dış hat açıkken geçerlidir (haritadaki davranışla aynı). */
export declare function drawKindSymbolOf(style: LayerStyleSpec | undefined): DrawKindSymbol | undefined;
/**
 * Katmanın gerçek stilini ikona çevirir: nokta/alan kendi dolgu rengiyle (varsa
 * dış hat rengi kenar çizgisiyle), çizgi kendi dış hat rengiyle boyanır.
 * Çizgide dış hat kapalıysa ikon görünür kalsın diye nötr renk kullanılır.
 */
export declare function drawKindPaint(kind: DrawLayerKind, fillColor: string, outlineColor: string | undefined, symbol?: DrawKindSymbol): DrawKindPaint;
/**
 * Katman listesindeki renk kutusunun (swatch) stili. Dolgu KAPALI ("off") ise kutu gri
 * dolmaz: icin bos, yalniz dis hat renginde (yoksa notr) bir cerceve gosterilir.
 */
export declare function layerSwatchStyle(styleMode: string | undefined, fill: string, outlineColor: string | undefined): string;
/** 16x16'lık tür ikonu (renk noktasıyla aynı boyut/hizada kullanılır): nokta=daire, çizgi=yatay çizgi, alan=beşgen. */
export declare function renderDrawKindIcon(kind: DrawLayerKind, paint: DrawKindPaint): TemplateResult;
//# sourceMappingURL=drawKindIcon.d.ts.map