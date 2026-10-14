import { DataSourceCollection, EntityCollection, ImageryLayerCollection, JulianDate, type Viewer } from "cesium";

// LayerManager karakterizasyon testleri icin minimal "Viewer" ikizi.
// bkz project_ucbp_api_layermanager_karakterizasyon_test_kapsami (hafiza) +
// packages/core/src/__tests__/cesium-node-environment.test.ts -- Cesium'un
// GERCEK ImageryLayerCollection/DataSourceCollection sinifi WebGL/DOM
// OLMADAN construct edilebiliyor, bu yuzden bunlar SAHTE degil GERCEK.
// LayerManager.add()'in WMS/WFS/GeoJSON dallari SADECE bu ikisine ve
// (KML yolunda) scene.camera/scene.canvas'a dokunuyor -- kapsam disindaki
// tum diger Viewer yuzeyi kasitli olarak eksik birakilip `as unknown as
// Viewer` ile "tip olarak Viewer" haline getiriliyor (LayerManager.ts'e
// HICBIR sekilde dokunulmadan, kural 2 ve 3'e uygun).
export function createFakeViewer(): Viewer {
  const imageryLayers = new ImageryLayerCollection();
  const dataSources = new DataSourceCollection();
  // Adim 7 (layers/sources/LocalSourceLoader.ts + layers/sources/ShapeLayerBridge.ts)
  // karakterizasyonu icin eklendi -- _addDrawnShape/_addMeasuredShape/
  // _removeDrawnShape viewer.entities.remove()'a ihtiyac duyuyor.
  // EntityCollection de (DataSourceCollection/ImageryLayerCollection gibi)
  // WebGL/DOM olmadan construct edilebiliyor.
  const entities = new EntityCollection();

  const fake = {
    imageryLayers,
    dataSources,
    entities,
    // waitForRenderSettle() (addWFS/addLocalKmlGeoJson yolunda) postRender'in
    // TAM OLARAK 60 KEZ tetiklenmesini bekliyor (frames=60 varsayilani,
    // internal `remaining` sayaci) -- gercek render dongusu olmadigi icin
    // addEventListener CAGRILDIGI ANDA callback'i yeterince (100x, guvenlik
    // payi) senkron calistiriyoruz, boylece Promise askida kalmiyor.
    scene: {
      camera: {},
      canvas: {},
      // setOpacity() -> OpacityController.setDataSourceOpacity() (bkz Adim 5
      // Faz 3, ML-11) opaklik gercekten degistiginde bunu cagirir -- no-op
      // yeterli, karakterizasyon testleri gercek bir render dongusu
      // calistirmiyor.
      requestRender: () => {},
      postRender: {
        addEventListener: (listener: () => void) => {
          for (let i = 0; i < 100; i++) listener();
          return () => {};
        },
        removeEventListener: () => {},
      },
    },
    clock: {
      currentTime: JulianDate.now(),
    },
    // Adim 10 (layers/CameraHighlight.ts) karakterizasyonu icin eklendi --
    // zoomToLayer/zoomToEntity'nin ihtiyac duydugu ust-seviye (scene.camera
    // DEGIL) viewer.camera/viewer.zoomTo yuzeyi. flyToBoundingSphere gercek
    // bir animasyon calistirmadan complete callback'ini SENKRON cagirir --
    // testler kendi vi.spyOn'larini bu fonksiyonlarin USTUNE kurup gercek
    // cagrilan argumanlari denetleyebilir.
    camera: {
      flyToBoundingSphere: (
        _boundingSphere: unknown,
        options?: { complete?: () => void; cancel?: () => void }
      ) => {
        options?.complete?.();
      },
    },
    zoomTo: () => Promise.resolve(true),
  };

  return fake as unknown as Viewer;
}
