/** Sayfada aynı anda etkin olabilecek en fazla önizleme Viewer'ı sayısı. */
declare const MAX_CONCURRENT_PREVIEW_VIEWERS = 6;
declare class PreviewViewerPool {
    private readonly entries;
    /** Bir preview'i havuza kaydeder; havuz doluysa en eski kullanilan once tahliye edilir. */
    activate(id: string, onEvict: () => void): void;
    /** Son-kullanim zamanini gunceller (LRU siralamasinda tahliyeden korur). */
    touch(id: string): void;
    /** Preview kendi istegiyle (ör. gorunumden cikinca) havuzdan ayrilir. */
    release(id: string): void;
    private evictOldest;
}
/** Sayfadaki tüm `TucbsMapPreview`'ların paylaştığı tekil havuz. */
export declare const previewViewerPool: PreviewViewerPool;
export { MAX_CONCURRENT_PREVIEW_VIEWERS };
//# sourceMappingURL=PreviewViewerPool.d.ts.map