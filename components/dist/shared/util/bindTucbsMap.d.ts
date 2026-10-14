import { InteractionManager, LayerManager, Map as TucbsMapInstance } from '@tucbs/core';
/** `TucbsMap`'in apiKey doğrulama durumu: `"none"` (apiKey verilmedi), `"pending"` (doğrulanıyor), `"ok"`, `"failed"`. */
export type ApiKeyAuthState = "none" | "pending" | "ok" | "failed";
/** {@link TucbsMap} host elementi — mapElementId ile bağlanan bileşenler için. */
export type TucbsMapElement = HTMLElement & {
    map?: TucbsMapInstance | null;
    layerManager?: LayerManager;
    interaction?: InteractionManager;
    apiKeyAuthState?: ApiKeyAuthState;
    _grantApiKeyTo?: (target: {
        apiKey: string;
    }) => void;
};
/**
 * Bir `TucbsMap` host elementinin apiKey doğrulama durumunun kullanılabilir olup olmadığını kontrol eder.
 * @param mapEl - Kontrol edilecek `TucbsMap` host elementi.
 * @returns Durum `"none"` (apiKey gerekmiyor) veya `"ok"` ise `true`.
 */
export declare function isTucbsMapAuthUsable(mapEl: TucbsMapElement): boolean;
/**
 * api-key validate tamamlanınca (veya api-key yoksa hemen) callback çalışır.
 * Validate başarısızsa callback çağrılmaz.
 */
export declare function whenTucbsMapReady(mapEl: TucbsMapElement, onReady: (mapEl: TucbsMapElement) => void): void;
/** {@link bindMapByElementId} ile haritaya bağlanan araç bileşeninin gereken alanları. */
export interface MapByElementIdHost {
    /** Bağlanılan harita; property binding ile dışarıdan da atanabilir. */
    map: TucbsMapInstance | undefined;
    /** Bağlanılacak `tucbs-map` elementinin id'si. */
    readonly mapElementId: string;
}
/** {@link bindMapByElementId} seçenekleri: araca özgü uyarı metinleri ve zamanlaması. */
export interface MapByElementIdOptions {
    /** `"mapElementId" yok` uyarısının zamanlaması: `"raf"` bir kare ertelenir, `"sync"` hemen basılır. */
    readonly noIdTiming: "raf" | "sync";
    /** `mapElementId` ve `map` ikisi de yokken basılan uyarı metni. */
    readonly noIdMessage: string;
    /** `mapElementId` ile element bulunamadığında basılan uyarı metni. */
    readonly missingElementMessage: (mapElementId: string) => string;
}
/**
 * Araçların ortak uyarı metinlerini üretir.
 * @param tag - Bileşenin custom element tag'i (ör. `"tucbs-zoom-tool"`).
 * @param suffix - Bağlanamayınca bileşenin durumu: `"islevsiz"` (buton çalışmaz) veya `"gizli"` (bileşen görünmez).
 * @returns `noIdMessage` ve `missingElementMessage` alanları.
 */
export declare function standardMapBindingMessages(tag: string, suffix: "islevsiz" | "gizli"): Pick<MapByElementIdOptions, "noIdMessage" | "missingElementMessage">;
/**
 * Araç bileşenini `map` property'si ya da `mapElementId` üzerinden haritaya bağlar.
 * `map` zaten atanmışsa hiçbir şey yapmaz; aksi halde `mapElementId` ile eşleşen
 * `tucbs-map` elementinin haritasını atar, harita henüz hazır değilse elementin
 * `ready` olayını bir kez bekler. Bağlanamazsa `console.warn` ile uyarır.
 * @param host - Bağlanacak araç bileşeni.
 * @param options - Uyarı metinleri ve "mapElementId yok" uyarısının zamanlaması.
 */
export declare function bindMapByElementId(host: MapByElementIdHost, options: MapByElementIdOptions): void;
//# sourceMappingURL=bindTucbsMap.d.ts.map