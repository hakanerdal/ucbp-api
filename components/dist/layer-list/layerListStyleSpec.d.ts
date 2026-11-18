import { LayerStyleSpec } from '@tucbs/core';
/** Katman listesinde renk kutusu ve opaklık çubuğunun gösterdiği değerler. */
export interface LayerListColorView {
    /** Renk kutusunun rengi (hex ya da nötr yer tutucu). */
    readonly fill: string;
    /** Renk kutusunun davranışı: `"solid"` ise düzenlenebilir. */
    readonly styleMode: string | undefined;
    /** Opaklık çubuğunun değeri (0-1); gösterilecek bir değer yoksa `undefined`. */
    readonly opacity: number | undefined;
}
/**
 * Renk kutusu ve opaklık çubuğu hangi stile bakar:
 * - Yalnız çizgi içeren katmanda Hat'a; kutu her zaman düzenlenebilir ("solid").
 * - Diğer katmanlarda Dolgu'ya (sabit renkse rengi; değilse nötr; kapalıysa opaklık yok).
 */
export declare function layerListColorView(style: LayerStyleSpec | undefined, lineOnly: boolean): LayerListColorView;
/**
 * Renk kutusundan renk seçilince uygulanacak stil. Stilin DİĞER alanları (nokta sembolü, çizgi
 * tipi, dış hat opaklığı...) korunur; aksi halde nokta sembolü sessizce eski daireye dönerdi.
 */
export declare function colorChangeSpec(current: LayerStyleSpec | undefined, lineOnly: boolean, color: string): LayerStyleSpec;
/**
 * Opaklık çubuğundan opaklık seçilince uygulanacak stil, ya da `undefined` (eski katman-geneli
 * `setOpacity` yolu: stil yok/raster ya da dolgu kapalı). Yalnız çizgi katmanında Hat opaklığı,
 * diğerlerinde Dolgu opaklığıdır; tam opakta (1) `outline.opacity` yazılmaz.
 */
export declare function opacityChangeSpec(current: LayerStyleSpec | undefined, lineOnly: boolean, opacity: number): LayerStyleSpec | undefined;
//# sourceMappingURL=layerListStyleSpec.d.ts.map