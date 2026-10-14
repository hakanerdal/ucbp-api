type Listener<TPayload> = (payload: TPayload) => void;

/**
 * Tip-güvenli, generic yayıncı/abone (pub/sub) taban sınıfı. `TEventMap`,
 * event adından o event'in payload tipine bir eşlemedir. `LayerManager`,
 * `InteractionManager` ve `DrawingManager` bu sınıftan türer ve `on`/`off`/
 * `once`/`emit`/`removeAllListeners`/`listenerCount` metodlarını hiçbirini
 * override etmeden AYNEN miras alır — yani bu sınıftaki JSDoc, o üç sınıfın
 * da `.on(...)` API'sinin belgesidir.
 *
 * @example
 * ```ts
 * layerManager.on("layer:add", ({ layer }) => {
 *   console.log(layer.id, layer.title);
 * });
 * ```
 */
export class EventEmitter<TEventMap> {
  private readonly listeners: Partial<{
    [K in keyof TEventMap]: Set<Listener<TEventMap[K]>>;
  }> = {};

  /**
   * Bir event için dinleyici ekler.
   * @param event - Dinlenecek event adı.
   * @param listener - Event yayıldığında çağrılacak fonksiyon.
   * @returns Zincirleme çağrılar için `this`.
   */
  on<K extends keyof TEventMap>(
    event: K,
    listener: Listener<TEventMap[K]>
  ): this {
    const existing = this.listeners[event];
    if (existing !== undefined) {
      existing.add(listener);
    } else {
      this.listeners[event] = new Set([listener]);
    }
    return this;
  }

  /**
   * `on()` ile eklenmiş bir dinleyiciyi kaldırır.
   * @param event - Dinleyicinin kayıtlı olduğu event adı.
   * @param listener - Kaldırılacak dinleyici (referans eşitliğiyle bulunur).
   * @returns Zincirleme çağrılar için `this`.
   */
  off<K extends keyof TEventMap>(
    event: K,
    listener: Listener<TEventMap[K]>
  ): this {
    this.listeners[event]?.delete(listener);
    return this;
  }

  /**
   * Bir event için, sadece BİR KEZ tetiklenecek bir dinleyici ekler; ilk
   * tetiklenmenin ardından dinleyici otomatik olarak `off()` ile kaldırılır.
   * @param event - Dinlenecek event adı.
   * @param listener - Event ilk yayıldığında çağrılacak fonksiyon.
   * @returns Zincirleme çağrılar için `this`.
   */
  once<K extends keyof TEventMap>(
    event: K,
    listener: Listener<TEventMap[K]>
  ): this {
    const wrapper: Listener<TEventMap[K]> = (payload) => {
      listener(payload);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  /**
   * Bir event'i, verilen payload ile kayıtlı tüm dinleyicilere senkron olarak yayar.
   * @param event - Yayılacak event adı.
   * @param payload - Dinleyicilere iletilecek veri.
   */
  emit<K extends keyof TEventMap>(event: K, payload: TEventMap[K]): void {
    const set = this.listeners[event];
    if (set === undefined) return;
    for (const listener of set) {
      listener(payload);
    }
  }

  /**
   * Dinleyicileri temizler.
   * @param event - Verilirse SADECE bu event'in dinleyicileri; verilmezse TÜM event'lerin tüm dinleyicileri kaldırılır.
   */
  removeAllListeners<K extends keyof TEventMap>(event?: K): void {
    if (event !== undefined) {
      delete this.listeners[event];
    } else {
      for (const key of Object.keys(this.listeners) as Array<
        keyof TEventMap
      >) {
        delete this.listeners[key];
      }
    }
  }

  /**
   * Bir event için kayıtlı dinleyici sayısını döner.
   * @param event - Sayılacak event adı.
   * @returns Kayıtlı dinleyici sayısı (hiç yoksa `0`).
   */
  listenerCount<K extends keyof TEventMap>(event: K): number {
    return this.listeners[event]?.size ?? 0;
  }
}
