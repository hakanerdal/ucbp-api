/**
 * Art arda baslatilan asenkron islemlerden SADECE en sonuncunun gecerli
 * sayilmasini saglayan, saf bir "nesil" (generation) sayaci.
 *
 * @example
 * ```ts
 * private readonly _syncGeneration = new AsyncGeneration();
 *
 * async _sync(): Promise<void> {
 *   const token = this._syncGeneration.next();
 *   await something();
 *   if (!this._syncGeneration.isCurrent(token)) return; // bu arada yeni bir _sync() baslamis
 *   // ... sonucu uygula ...
 * }
 * ```
 */
export declare class AsyncGeneration {
    private current;
    /** Yeni bir nesil baslatir ve ona ait token'i doner. */
    next(): number;
    /** Verilen token, EN SON baslatilan nesle ait mi (yani hala gecerli mi)? */
    isCurrent(token: number): boolean;
}
//# sourceMappingURL=AsyncGeneration.d.ts.map