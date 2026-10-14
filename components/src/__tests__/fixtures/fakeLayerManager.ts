import type { LayerManager, LayerStyleSpec, ServiceStyleOption } from "@tucbs/core";

type ColumnRangeLike = { min: number; max: number };

// TucbsStyleEditor karakterizasyon testleri icin minimal "LayerManager"
// ikizi -- packages/core/src/__tests__/fixtures/fakeViewer.ts ile AYNI
// gerekce (bkz o dosyanin yorumu): bileşenin GERÇEKTEN dokunduğu yüzey
// (getColumnRange/getUniqueColumnValues/getEntityPropertyNames/
// getFeatureCount/getLayerStyle/applyLayerStyle/on/off + WMS/WMTS stil
// sorguları) dışında hiçbir şey içermez; `as unknown as LayerManager` ile
// "tip olarak LayerManager" haline getirilir (TucbsStyleEditor.ts'e HİÇBİR
// ŞEKİLDE dokunulmadan).
export interface FakeLayerManagerOptions {
  columnRanges?: Record<string, ColumnRangeLike | null>;
  uniqueColumnValues?: Record<string, (string | number)[]>;
  entityPropertyNames?: string[];
  layerStyle?: LayerStyleSpec;
  featureCount?: number;
  wmsStyles?: ServiceStyleOption[];
  wmtsStyles?: ServiceStyleOption[];
  /** getWmsAvailableStyles/getWmtsAvailableStyles her cagrildiginda tetiklenir -- cagri sayisini izlemek icin. */
  onGetServiceStyles?: () => void;
}

export function createFakeLayerManager(options: FakeLayerManagerOptions = {}): LayerManager {
  // Parametre isimleri "_" ile basliyor -- LayerManager arayuzunu tatmin
  // etmek icin gerekliler ama bu sahte uygulama onlari OKUMUYOR (bkz
  // LayerManager.ts/InteractionManager.ts'teki AYNI "kasitli olarak
  // kullanilmiyor" kurali, projede kabul edilmis bir uyari).
  const fake = {
    getColumnRange: (_id: string, column: string) => options.columnRanges?.[column] ?? null,
    getUniqueColumnValues: (_id: string, column: string) =>
      options.uniqueColumnValues?.[column] ?? [],
    getEntityPropertyNames: (_id: string) => options.entityPropertyNames ?? [],
    getFeatureCount: (_id: string) => options.featureCount,
    getLayerStyle: (_id: string) => options.layerStyle,
    applyLayerStyle: async (_id: string, _spec: LayerStyleSpec) => {},
    getWmsAvailableStyles: async (_id: string) => {
      options.onGetServiceStyles?.();
      return options.wmsStyles ?? [];
    },
    getWmtsAvailableStyles: async (_id: string) => {
      options.onGetServiceStyles?.();
      return options.wmtsStyles ?? [];
    },
    setWmsStyle: async (_id: string, _styleName: string) => {},
    setWmtsStyle: async (_id: string, _styleName: string) => {},
    on: (_event: string, _cb: (...args: unknown[]) => void) => {},
    off: (_event: string, _cb: (...args: unknown[]) => void) => {},
  };

  return fake as unknown as LayerManager;
}
