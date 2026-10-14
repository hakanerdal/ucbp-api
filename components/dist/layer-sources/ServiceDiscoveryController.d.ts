import { ReactiveController, ReactiveControllerHost } from 'lit';
import { LayerManager, DiscoveredItem } from '@tucbs/core';
export declare function baseServiceUrl(url: string): string;
/** Servis keşfinin bileşen durumuna yazdığı yer (sırası korunarak çağrılır). */
export interface DiscoverySink {
    /** O an bağlı `LayerManager` (yoksa doğrudan GetCapabilities yolu kullanılır); her istekten önce okunur. */
    layerManager(): LayerManager | undefined;
    /** Önceki keşfin sonuçlarını temizler (bileşenin `_resetDiscovery`'si). */
    resetDiscovery(): void;
    /** Keşif isteğinin sürüp sürmediğini yazar. */
    setDiscovering(discovering: boolean): void;
    /** Kullanıcıya gösterilecek keşif hata mesajını yazar. */
    setError(message: string): void;
    /** Bulunan katmanları yazar. */
    setItems(items: DiscoveredItem[]): void;
    /** Sunucunun GeoTIFF uyumlu formatını (varsa) yazar. */
    setTiffFormat(format: string | undefined): void;
}
/**
 * OGC servis adresinden GetCapabilities ile katman keşfeden reaktif denetleyici;
 * yalnızca en son başlatılan keşfin sonucu yazılır.
 */
export declare class ServiceDiscoveryController implements ReactiveController {
    private readonly sink;
    private readonly generation;
    /**
     * @param host - Denetleyiciyi barındıran bileşen.
     * @param sink - Keşif sonuçlarının yazılacağı yer.
     */
    constructor(host: ReactiveControllerHost, sink: DiscoverySink);
    /** Bileşen DOM'dan kaldırılınca süren keşfin sonucunu geçersiz kılar. */
    hostDisconnected(): void;
    /** Süren keşfin sonucunu geçersiz kılar (form değişince/sıfırlanınca). */
    invalidate(): void;
    discover(serviceType: string, serviceUrl: string): Promise<void>;
}
//# sourceMappingURL=ServiceDiscoveryController.d.ts.map