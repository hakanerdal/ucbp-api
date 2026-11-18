/**
 * Varsayılanı `true` olan "göster/gizle" nitelikleri için Lit dönüştürücüsü:
 * yalnızca tam olarak `"false"` değeri `false` verir. Nitelik yoksa
 * (ya da kaldırılırsa), değersiz yazılırsa ya da başka bir değer alırsa `true`.
 *
 * @param value - Niteliğin HTML'deki değeri; nitelik yoksa `null`.
 * @returns Değer `"false"` ise `false`, aksi halde `true`.
 *
 * @example
 * ```ts
 * @property({ attribute: "show-toolbar", converter: defaultTrueAttribute })
 * showToolbar = true;
 * ```
 */
export declare function defaultTrueAttribute(value: string | null): boolean;
//# sourceMappingURL=defaultTrueAttribute.d.ts.map