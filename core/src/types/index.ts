export type {
  BasemapId,
  BasemapOptions,
  BasemapStatus,
  CameraOptions,
  MapExtent,
  MapOptions,
} from "./map.types.js";
export { HGM_BASEMAP_IDS } from "./map.types.js";

export type {
  LayerType,
  ManagedLayer,
  WMSLayerOptions,
  WMTSLayerOptions,
  WFSLayerOptions,
  WCSLayerOptions,
  GeoTiffLayerOptions,
  LocalLayerOptions,
  SolidFillStyle,
  GradientFillStyle,
  BinFillStyle,
  EnumFillStyle,
  OffFillStyle,
  FillStyle,
  PaletteKind,
  OutlineStyle,
  LayerStyleSpec,
  ServiceStyleOption,
  AuthorizedLayerInfo,
} from "./layer.types.js";

export type {
  LayerManagerEventMap,
  LayerManagerEventName,
  LayerManagerEventPayload,
  InteractionManagerEventMap,
  InteractionManagerEventName,
  InteractionManagerEventPayload,
  DrawingManagerEventMap,
  DrawingManagerEventName,
  DrawingManagerEventPayload,
} from "./events.types.js";

export type {
  EntityInteractionDetail,
  MapInteractionDetail,
  PickedFeatureDetail,
  ImageryFeatureInfo,
  ImageryGeometryHint,
  ImageryInteractionDetail,
} from "./interaction.types.js";

export type { DrawTool, DrawnShape } from "./drawing.types.js";

export type {
  AnalysisManagerOptions,
  BaseRequestDto,
  BaseResponseDto,
  BufferAnalysisRequest,
  BufferAnalysisResult,
  BoundaryAnalysisRequest,
  GeoJsonAnalysisResult,
  IntersectionAnalysisRequest,
  IntersectionAnalysisResult,
  WedgeBufferAnalysisRequest,
} from "./analysis.types.js";
