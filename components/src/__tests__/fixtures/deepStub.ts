/**
 * Her property erisimine ve her cagriya yine kendisi gibi bir stub donen,
 * HICBIR is yapmayan sahte nesne uretir. Bir bilesenin `map` gibi genis bir
 * nesneye yalnizca "baglanip baglanmadigini" test ederken, `updated()`'in o
 * nesnenin derinliklerine (orn. `map.viewer.camera`, `map.layerManager.on()`)
 * yaptigi yan erisimlerin testi patlatmamasi icin kullanilir.
 *
 * Bilerek sinirli: sayisal baglamda 0, string baglamda "" gibi davranir,
 * `for...of` ile bos dizi gibi gezilir, Promise sanilmasin diye `then`
 * DONDURMEZ. Davranis dogrulamasi gereken testlerde KULLANILMAMALI --
 * yalnizca kimlik (===) karsilastirmasi icin.
 *
 * @param label - Hata ayiklamada stub'i ayirt etmek icin ad (toString'te gorunur).
 * @returns Her erisimde stub donen Proxy.
 */
export function createDeepStub<T = unknown>(label = "stub"): T {
  const children = new Map<PropertyKey, unknown>();
  const target = function stub(): void {};
  const proxy: unknown = new Proxy(target, {
    get(_target, key) {
      if (key === "then") return undefined;
      // Lit'in ic isaretleri ("_$litDirective$", "_$litType$" vb.): stub bir
      // template'te render edilirse Lit onu direktif/template sanip sonsuz
      // ozyinelemeye girer -- bu anahtarlar "yok" sayilir.
      if (typeof key === "string" && key.startsWith("_$")) return undefined;
      if (key === Symbol.toPrimitive) return (hint: string) => (hint === "number" ? 0 : "");
      if (key === Symbol.iterator) return function* empty() {};
      if (key === "toString") return () => `[${label}]`;
      if (key === "length") return 0;
      if (!children.has(key)) children.set(key, createDeepStub(`${label}.${String(key)}`));
      return children.get(key);
    },
    apply() {
      return createDeepStub(`${label}()`);
    },
    construct() {
      return createDeepStub(`new ${label}`) as object;
    },
    set(_target, key, value) {
      children.set(key, value);
      return true;
    },
    has() {
      return true;
    },
  });
  return proxy as T;
}
