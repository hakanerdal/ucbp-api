import { Cartesian2, Cartesian3, Ellipsoid, SceneMode, type Viewer } from "cesium";

/** `createMarkerOverlay` seçenekleri. */
export interface MarkerOverlayOptions {
  /** İkonun ekrandaki genişliği (CSS px); verilmezse görüntünün kendi boyutu. */
  width?: number;
  /** İkonun ekrandaki yüksekliği (CSS px); verilmezse görüntünün kendi boyutu. */
  height?: number;
  /** İkonun koordinata oturan noktası: `"bottom"` (varsayılan, pin ucu) veya `"center"` (dairesel ikon). */
  anchor?: "bottom" | "center";
}

// Marker neden Cesium billboard'u DEGIL de DOM <img> overlay'i:
// `Map.setQuality()` Cesium'un `resolutionScale`'ini dusurebilir (demoda
// quality=70 -> tuval CSS boyutunun %70'i) ve Cesium tuvali, yuksek DPI'da
// bile CSS piksel cozunurlugunde cizer; billboard'lar da bu dusuk cozunurluklu
// tuvale cizilip buyutuldugunden, kaynak gorsel ne kadar buyuk olursa olsun
// BULANIK/PIKSELLI gorunuyordu. Tarayicinin <img>'i ise gorseli kendi
// (cihaz) cozunurluginde cizer -- kalite ayarindan ve DPI'dan bagimsiz keskin.
// Konum her karede (`scene.postRender`) `cartesianToCanvasCoordinates` ile
// guncellenir; ikonun ALT-ORTA noktasi (pin ucu; `anchor:"center"` ise MERKEZI) tam koordinata oturur.
//
// Gorunurluk: 3D'de nokta dunyanin ARKASINDAYSA (ufuk ustu) gizlenir
// (teget duzlem testi); aksi halde kamera uzaklasip dondugunde pin
// kuresinin arkasindan "sizardi". Arazi/3D Tiles tarafindan ortulme
// (depth test) KASITLI olarak yok -- billboard'un eski
// `disableDepthTestDistance: Infinity` davranisiyla ayni: marker HER ZAMAN gorunur.
export function createMarkerOverlay(
  viewer: Viewer,
  longitude: number,
  latitude: number,
  iconUrl: string,
  options: MarkerOverlayOptions = {},
): () => void {
  const position = Cartesian3.fromDegrees(longitude, latitude);
  const normal = Ellipsoid.WGS84.geodeticSurfaceNormal(position, new Cartesian3());
  const toCamera = new Cartesian3();
  const scratch = new Cartesian2();

  const img = document.createElement("img");
  img.src = iconUrl;
  img.alt = "";
  img.draggable = false;
  Object.assign(img.style, {
    position: "absolute",
    left: "0",
    top: "0",
    display: "none",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: "1",
    willChange: "transform",
    ...(options.width === undefined ? {} : { width: `${options.width}px` }),
    ...(options.height === undefined ? {} : { height: `${options.height}px` }),
  });
  viewer.container.appendChild(img);

  const update = (): void => {
    const { scene } = viewer;
    let visible = true;
    if (scene.mode === SceneMode.SCENE3D) {
      // Kamera noktanin teget duzleminin DIS tarafindaysa nokta gorunur.
      Cartesian3.subtract(scene.camera.positionWC, position, toCamera);
      visible = Cartesian3.dot(normal, toCamera) > 0;
    }
    const canvasPosition = visible ? scene.cartesianToCanvasCoordinates(position, scratch) : undefined;
    if (!canvasPosition) {
      img.style.display = "none";
      return;
    }
    img.style.display = "block";
    const x = Math.round(canvasPosition.x - img.offsetWidth / 2);
    const y = Math.round(canvasPosition.y - (options.anchor === "center" ? img.offsetHeight / 2 : img.offsetHeight));
    img.style.transform = `translate(${x}px, ${y}px)`;
  };

  const removeListener = viewer.scene.postRender.addEventListener(update);
  // Gorsel yuklenince ilk dogru konumlandirma (boyut o ana kadar bilinmiyor).
  img.addEventListener("load", update);
  update();

  return () => {
    removeListener();
    img.remove();
  };
}
