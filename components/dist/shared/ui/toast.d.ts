/**
 * document.body'ye portallanmış, birkaç saniye sonra kendiliğinden kapanan bir bildirim (toast) gösterir. Aynı anda tek toast gösterilir; yeni biri geleni değiştirir.
 * @param kind - Bildirim türü (kapanma süresini de belirler: `success`/`info` en kısa, `error` en uzun).
 * @param message - Gösterilecek mesaj metni.
 */
export declare function showToast(kind: "success" | "info" | "warning" | "error", message: string): void;
/** Şu an gösterilen toast'ı (varsa) DOM'dan kaldırır. */
export declare function destroyToast(): void;
//# sourceMappingURL=toast.d.ts.map