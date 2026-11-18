import { GeometryKinds, LayerStyleSpec, LineDash, PointShape, PointSymbol } from '@tucbs/core';
/** Sembol formunun durumu. */
export interface SymbolFormState {
    /** Seçili nokta şekli. */
    readonly pointShape: PointShape;
    /** Nokta boyutu (metin alanı değeri). */
    readonly pointSize: string;
    /**
     * Kullanıcı (veya kayıtlı stil) nokta sembolünü belirledi mi. Belirlenmediyse
     * stile `point` yazılmaz ve katmanın mevcut nokta boyutu/görünümü korunur
     * (ör. CSV katmanı 6 px'tir; sembole dokunmayan bir renk değişikliği onu 8 px yapmamalı).
     */
    readonly pointCustomized: boolean;
    /** Seçili çizgi tipi. */
    readonly lineDash: LineDash;
}
/** Kayıtlı stilden sembol formunu geri yükler; sembol/çizgi tipi yoksa varsayılanlar. */
export declare function deriveSymbolFormState(style: LayerStyleSpec | undefined): SymbolFormState;
/** Form durumundan stile yazılacak nokta sembolü; belirlenmediyse `undefined` (alan yazılmaz). */
export declare function buildPointSymbol(state: {
    readonly pointCustomized: boolean;
    readonly pointShape: PointShape;
    readonly pointSize: string;
}): PointSymbol | undefined;
/** Stile yazılacak çizgi tipi: düz çizgide alan hiç yazılmaz (kayıtlı stil biçimi değişmesin). */
export declare function buildLineDash(dash: LineDash): {
    readonly dash?: LineDash;
};
/** Boyut alanına yazılırken: yalnız rakamlar kalır (ondalık/işaret yok). */
export declare function sanitizePointSizeInput(raw: string): string;
/** Boyut metni geçerli aralıkta bir tam sayı mı. */
export declare function isValidPointSize(raw: string): boolean;
/** Odaktan çıkınca boyutu geçerli aralığa çeker; boş/geçersizse varsayılan boyuta döner. */
export declare function normalizePointSizeText(raw: string): string;
/** Dropdown değerini doğrular: geçerli şekil ise döndürür, değilse `undefined`. */
export declare function parsePointShape(value: string): PointShape | undefined;
/** Dropdown değerini doğrular: geçerli çizgi tipi ise döndürür, değilse `undefined`. */
export declare function parseLineDash(value: string): LineDash | undefined;
/** Stil editöründe hangi kartların/alanların gösterileceği. */
export interface StyleCardLayout {
    /** "Dolgu" kartı görünür mü. */
    readonly fill: boolean;
    /** "Sembol" kartı görünür mü. */
    readonly symbol: boolean;
    /** Sembol kartında nokta alanları (şekil/boyut). */
    readonly symbolPoint: boolean;
    /** Sembol kartında çizgi tipi (nokta, çizgi veya kenarı kesikli çizilebilen alan katmanı). */
    readonly symbolDash: boolean;
    /** Dış hat kartının başlığı: yalnız çizgi katmanında "Hat" (çizgide dış hat çizginin kendisidir). */
    readonly outlineTitle: "Dış Hat" | "Hat";
    /**
     * Dış hat anahtarı görünür mü. Yalnız çizgi içeren katmanda gizlenir ve dış hat HER ZAMAN
     * açıktır: kapatınca çizgi ya kaybolur (Çizim/Ölçü) ya da Dolgu renginden boyanırdı
     * (görünürlük için katman listesindeki göz var).
     */
    readonly outlineEnabledToggle: boolean;
}
/**
 * Kart düzeni kuralı:
 * - Sembol kartı nokta varsa ya da çizgi tipi uygulanabiliyorsa (çizgi veya kenarı kesikli
 *   çizilebilen poligon) görünür; çizgi tipi her zaman orada durur (tek yer). Noktada sıra:
 *   Şekil, Boyut, Çizgi Tipi (tip, dış hat ayrıntısı; okunurluğu boyuta bağlı).
 * - Kalınlık her geometride Dış Hat/Hat kartındadır (tutarlılık); Sembol kartında yalnız
 *   nokta alanları (şekil/boyut) ve çizgi tipi bulunur.
 * - Yalnız çizgi içeren katmanda (türü ne olursa olsun) "Dolgu" kartı ve Hat anahtarı yoktur, Hat
 *   her zaman açıktır: çizginin dolgusu olmadığı için Dolgu çizgide görünür bir şey değiştirmezdi
 *   (yalnız Hat kapalıyken çizgiyi boyardı; keşfedilemez bir yol).
 */
export declare function styleCardLayout(kinds: GeometryKinds | undefined): StyleCardLayout;
/** Kayıtlı stilden dış hat opaklığı (0-100 yüzde); alan yoksa tam opak (100). */
export declare function deriveOutlineOpacityPercent(style: LayerStyleSpec | undefined): number;
/** Stile yazılacak dış hat opaklığı; tam opakta alan hiç yazılmaz (kayıtlı stil biçimi değişmesin). */
export declare function buildOutlineOpacity(percent: number): {
    readonly opacity?: number;
};
//# sourceMappingURL=symbolSpec.d.ts.map