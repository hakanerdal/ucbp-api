import { LayerManager, ManagedLayer } from '@tucbs/core';
import { LegendRow } from '../shared/util/legendRows.js';
export type { LegendRow };
/** Bir katmanın, yazdırma önizlemesindeki lejant bölümü için önceden hesaplanmış girdisi. */
export type PrintLegendEntry = 
/** WMS/WMTS servis grafiği (görsel URL'i). */
{
    readonly layerTitle: string;
    readonly kind: "image";
    readonly imageUrl: string;
} | {
    readonly layerTitle: string;
    /** Sürekli renk rampası, sabit aralıklı bin veya kategorik (enum) vektör stili. */
    readonly kind: "gradient" | "bin" | "enum";
    readonly rows: readonly LegendRow[];
    readonly displayColumn: string;
}
/** Tek koloni aşan bir bin/enum listesinin, hizalama için önceden N koloma bölünmüş hali. */
 | {
    readonly layerTitle: string;
    readonly kind: "list-columns";
    readonly displayColumn: string;
    readonly columnGroups: readonly (readonly LegendRow[])[];
}
/** Lejant çözülemedi/uygulanmadı (`message` kullanıcıya gösterilecek nedendir). */
 | {
    readonly layerTitle: string;
    readonly kind: "empty";
    readonly message: string;
};
/**
 * Görünür (basemap olmayan, gizlenmemiş) katmanların adlarını döner — hiçbir ağ çağrısı yapmaz.
 * @param layers - Taranacak katman listesi (`LayerManager.getLayers()`).
 * @returns Görünür katmanların başlıkları.
 */
export declare function collectVisibleDatasetNames(layers: readonly ManagedLayer[]): string[];
/**
 * Yazdirma onizlemesindeki lejant bolumu icin, GORUNUR (basemap olmayan)
 * katmanlarin lejant verisini `TucbsLegendPanel.ts` ile AYNI kaynaklardan
 * (WMS GetLegendGraphic / WMTS capabilities / vektor stil) cozer. Bir
 * katmanin cozumu basarisiz olursa (ag hatasi, servis hatasi) TUM onizlemeyi
 * dusurmez -- `Promise.allSettled` ile o katman icin "Lejant yuklenemedi"
 * girdisi uretilir.
 */
export declare function collectPrintLegendEntries(layerManager: LayerManager, layers: readonly ManagedLayer[]): Promise<PrintLegendEntry[]>;
//# sourceMappingURL=PrintLegendData.d.ts.map