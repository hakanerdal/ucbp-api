// Sayfa genelinde paylasilan, ayni anda canli kalabilecek TucbsMapPreview Cesium
// Viewer sayisini sinirlayan LRU (en az kullanilan) havuzu.
//
// WHY: Her <tucbs-map-preview> kendi Cesium Viewer'ini olusturabilir, ama bir
// sayfada cok sayida (10+) eszamanli aktif Viewer tarayicinin WebGL context
// limitini (tipik 8-16) asip sessiz hataya ya da zorla context-loss'a yol
// acabilir. Bu havuz, sabit bir ust sinir asildiginda en uzun suredir
// kullanilmayan preview'i otomatik tahliye ederek (onEvict callback'i
// cagirarak) bu riski ortadan kaldirir.
const MAX_CONCURRENT_PREVIEW_VIEWERS = 6;

interface PreviewPoolEntry {
  lastUsed: number;
  readonly onEvict: () => void;
}

class PreviewViewerPool {
  private readonly entries = new Map<string, PreviewPoolEntry>();

  /** Bir preview'i havuza kaydeder; havuz doluysa en eski kullanilan once tahliye edilir. */
  activate(id: string, onEvict: () => void): void {
    if (this.entries.has(id)) {
      this.touch(id);
      return;
    }
    if (this.entries.size >= MAX_CONCURRENT_PREVIEW_VIEWERS) {
      this.evictOldest();
    }
    this.entries.set(id, { lastUsed: performance.now(), onEvict });
  }

  /** Son-kullanim zamanini gunceller (LRU siralamasinda tahliyeden korur). */
  touch(id: string): void {
    const entry = this.entries.get(id);
    if (entry) entry.lastUsed = performance.now();
  }

  /** Preview kendi istegiyle (ör. gorunumden cikinca) havuzdan ayrilir. */
  release(id: string): void {
    this.entries.delete(id);
  }

  private evictOldest(): void {
    let oldestId: string | undefined;
    let oldestEntry: PreviewPoolEntry | undefined;
    for (const [id, entry] of this.entries) {
      if (!oldestEntry || entry.lastUsed < oldestEntry.lastUsed) {
        oldestId = id;
        oldestEntry = entry;
      }
    }
    if (oldestId === undefined || oldestEntry === undefined) return;
    this.entries.delete(oldestId);
    oldestEntry.onEvict();
  }
}

// Modul-seviyesi tekil (singleton) — sayfa genelinde TEK havuz, TucbsMapPreview
// instance sayisindan bagimsiz. MAX_CONCURRENT_PREVIEW_VIEWERS bu yuzden per-
// component bir property degil, burada sabit bir modul degeridir.
export const previewViewerPool = new PreviewViewerPool();
export { MAX_CONCURRENT_PREVIEW_VIEWERS };
