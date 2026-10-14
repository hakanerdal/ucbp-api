import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import {
  ZoomIn16 as ZoomInIcon,
  UpToTop16 as UpToTopIcon,
  TrashCan16 as TrashCanIcon,
  ColorPalette16 as ColorPaletteIcon,
  Legend16 as LegendIcon,
  DocumentExport16 as DocumentExportIcon,
} from "@carbon/icons";
import type { LayerType } from "@tucbs/core";
import type { LayerMenuAction } from "./LayerMenuPortal.js";
import { iconNodeToString, type CarbonIconNode } from "../shared/util/CarbonIcon.js";

// TucbsAnalysisTool/TucbsDrawTool/TucbsAuthorizedLayers vb. AYNI (bkz
// shared/util/CarbonIcon.ts) paylaşılan iconNodeToString()'i kullanıp SADECE bu
// 1 satırlık unsafeSVG sarmalayıcısını kendi dosyasında tutar -- bu dosya da
// AYNI kurulmuş deseni izler (TucbsLayerList.ts'in kendi, bu paylaşılan
// modülden ÖNCE yazılmış yerel kopyası ayrı/önceden var olan bir durum,
// bu fazın kapsamı dışında).
function carbonIcon(node: CarbonIconNode) {
  return unsafeSVG(iconNodeToString(node));
}

const ICON_ZOOM_IN = carbonIcon(ZoomInIcon);
const ICON_UP_TO_TOP = carbonIcon(UpToTopIcon);
const ICON_TRASH_CAN = carbonIcon(TrashCanIcon);
const ICON_PALETTE = carbonIcon(ColorPaletteIcon);
const ICON_LEGEND = carbonIcon(LegendIcon);
const ICON_DOCUMENT_EXPORT = carbonIcon(DocumentExportIcon);

/** `buildLayerMenuActions`'ın karar vermek için okuduğu minimal katman alanları. */
export interface MenuActionLayer {
  styleMode: string | undefined;
  layerType: LayerType;
}

/** Hangi ek aksiyonların görünebileceğine dair, `LayerManager`'dan ÖNCEDEN okunmuş bayraklar. */
export interface MenuActionFlags {
  styleEditorAvailable: boolean;
  legendAvailable: boolean;
  layerExportAvailable: boolean;
  isAnalysisResult: boolean;
  isGeoTiffExportAvailable: boolean;
}

/** Her aksiyonun tıklanınca çağıracağı geri çağırım. */
export interface MenuActionCallbacks {
  zoomToLayer: () => void;
  bringToFront: () => void;
  remove: () => void;
  openStyleEditor: () => void;
  toggleLegend: () => void;
  exportLayer: () => void;
  exportLayerKml: () => void;
  exportLayerShapefile: () => void;
  exportLayerAsGeoTiff: () => void;
}

/**
 * Katman "..." (kebap) menüsünde hangi aksiyonların, hangi sırada
 * görüneceğine karar verir -- `TucbsLayerList.ts`'teki `_openMenuPortal`'ın
 * (God Component kılavuzu GC-03 yardımcı-sınıf çıkarma planı, Faz 2) SAF
 * karar mantığı. `LayerManager`'a dokunmaz -- gerekli tüm sorgular `flags`
 * üzerinden ÖNCEDEN çözülmüş olarak gelir, bu yüzden mock'suz test edilebilir.
 */
export function buildLayerMenuActions(
  layer: MenuActionLayer,
  flags: MenuActionFlags,
  callbacks: MenuActionCallbacks,
): LayerMenuAction[] {
  const actions: LayerMenuAction[] = [
    { icon: ICON_ZOOM_IN, label: "Yakınlaş", onClick: callbacks.zoomToLayer },
    { icon: ICON_UP_TO_TOP, label: "En Üste Taşı", onClick: callbacks.bringToFront },
    { icon: ICON_TRASH_CAN, label: "Kaldır", onClick: callbacks.remove },
  ];

  if (flags.styleEditorAvailable) {
    actions.push({ icon: ICON_PALETTE, label: "Stil Düzenle", onClick: callbacks.openStyleEditor });
  }

  if (
    flags.legendAvailable &&
    layer.styleMode !== "solid" &&
    layer.layerType !== "DRAWING" &&
    layer.layerType !== "MEASURE"
  ) {
    actions.push({ icon: ICON_LEGEND, label: "Lejant", onClick: callbacks.toggleLegend });
  }

  // "GeoJSON Olarak Dışa Aktar" SADECE Çizim Katmanı için sunulur (Ölçü
  // Katmanı için kullanıcı isteğiyle BİLEREK kapsam dışı bırakıldı) --
  // listedeki SON push olarak eklenir ki her koşulda (Stil Düzenle
  // olsun/olmasın) menünün EN ALTINDA dursun.
  if (flags.layerExportAvailable && layer.layerType === "DRAWING") {
    actions.push({
      icon: ICON_DOCUMENT_EXPORT,
      label: "GeoJSON Olarak Dışa Aktar",
      onClick: callbacks.exportLayer,
    });
  }

  if (flags.layerExportAvailable && flags.isAnalysisResult) {
    actions.push({
      icon: ICON_DOCUMENT_EXPORT,
      label: "Dışa Aktar",
      onClick: () => undefined,
      children: [
        { icon: ICON_DOCUMENT_EXPORT, label: "GeoJSON", onClick: callbacks.exportLayer },
        { icon: ICON_DOCUMENT_EXPORT, label: "KML", onClick: callbacks.exportLayerKml },
        { icon: ICON_DOCUMENT_EXPORT, label: "Shapefile (ZIP)", onClick: callbacks.exportLayerShapefile },
      ],
    });
  }

  // "GeoTIFF Olarak Dışa Aktar" SADECE sunucusu (keşif sırasında
  // TucbsServiceUpload tarafından tespit edilmiş) tiff/geotiff format
  // desteği bildiren WMS/WCS katmanları için sunulur. DRAWING'deki GeoJSON
  // export ile AYNI marker'ı (layerExportAvailable) paylaşır, ikisi ASLA
  // aynı katman için birlikte görünmez (layerType birbirini dışlıyor).
  if (
    flags.layerExportAvailable &&
    (layer.layerType === "WMS" || layer.layerType === "WCS") &&
    flags.isGeoTiffExportAvailable
  ) {
    actions.push({
      icon: ICON_DOCUMENT_EXPORT,
      label: "GeoTIFF Olarak Dışa Aktar",
      onClick: callbacks.exportLayerAsGeoTiff,
    });
  }

  return actions;
}
