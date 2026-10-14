// WHY: "Bu asenkron olcum/islem HALA guncel mi?" sorusu -- bir await'ten
// sonra sonucun hala gecerli olup olmadigini anlamak icin -- TucbsIdentifyPanel.ts
// (_compactItemBoxToken, _itemTitleGroupWidthToken) ve TucbsMapPreview.ts
// (_syncGeneration) icinde BIREBIR AYNI "elle yazilmis jeton/nesil sayaci"
// deseniyle UC KERE cozulmustu (bkz God Component kilavuzu, "Capraz
// Tekrarlar" bolumu). Her kopya ayni iki satiri tekrarliyordu:
// `const token = ++this._xToken;` ... `if (token !== this._xToken) return;`.
// Bu sinif o ikiliyi TEK bir yere indirir -- shared/util/TimerBag.ts/
// identify/deferredMeasure.ts'den FARKLI bir sorunu cozer (onlar rAF/
// setTimeout ZAMANLAMASINI yonetir, bu ise zamanlamadan bagimsiz, SAF bir
// "en son baslatilan islem hangisi" sayacidir).

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
export class AsyncGeneration {
  private current = 0;

  /** Yeni bir nesil baslatir ve ona ait token'i doner. */
  next(): number {
    return ++this.current;
  }

  /** Verilen token, EN SON baslatilan nesle ait mi (yani hala gecerli mi)? */
  isCurrent(token: number): boolean {
    return token === this.current;
  }
}
