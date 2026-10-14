export { Map, DEFAULT_INITIAL_EXTENT, MEASURE_LAYER_ID } from "./map/Map.js";
export { measureGround, snapScaleForDisplay } from "./map/scaleZoom.js";
export type { GroundMeasure } from "./map/scaleZoom.js";
export { configureTucbs, registerApiKeyRefresh } from "./config.js";
export type { TucbsGlobalConfig } from "./config.js";
export { LayerManager } from "./layers/LayerManager.js";
export { InteractionManager } from "./interaction/InteractionManager.js";
export { DrawingManager } from "./interaction/DrawingManager.js";
export { AnalysisManager } from "./analysis/AnalysisManager.js";
export { DEFAULT_ANALYSIS_API_BASE } from "./analysis/defaults.js";
export { DEFAULT_UCBP_API_BASE, getUcbpApiBase, getProxyBase } from "./shared/apiDefaults.js";
export { validateApiKey, ensureEffectiveApiKeyValid } from "./auth/validateApiKey.js";
export {
  TucbsError,
  LayerOperationError,
  OgcRequestError,
  AnalysisRequestError,
  GeometryError,
  ApiKeyValidationError,
  getErrorCodes,
} from "./shared/TucbsError.js";
export type { TucbsErrorCode, TucbsErrorInfo } from "./shared/TucbsError.js";
export { entityToGeoJSON, featureLabel } from "./analysis/entityToGeoJSON.js";
export { HGM_BASEMAP_IDS } from "./types/index.js";
// TucbsServiceUpload (components) servis kesfi (GetCapabilities cekme/
// ayristirma) icin kullanir -- bkz project_ucbp_api_ogc_capabilities_uygulama_plani
// Faz 3 (GC-05 tarafinin saf tasinmasi, bilincli yeni public export).
// getCapabilities Faz 5'te (ML-12 duzeltmesi) fetchCapabilitiesDocument'in
// yerini aldi -- LayerManager baglantisi yoksa (bkz TucbsServiceUpload)
// dogrudan, apiKey/proxy olmadan da cagrilabilir (authContext opsiyonel).
export {
  buildCapabilitiesUrl,
  getCapabilities,
  parseCapabilities,
  detectServiceType,
  parseWmsTiffFormat,
  parseWcsTiffFormat,
  fetchWcsCoverageExtents,
  wcsRectangleFor,
} from "./layers/ogc/capabilities.js";
// Faz 5b: LayerManager.getWcsCoverageExtents()'in donus tipinde
// kullaniliyor -- bilincli yeni public export (bkz DiscoveredItem ile ayni
// gerekce, Faz 3).
export type { DiscoveredItem, GeographicBoundingBox } from "./layers/ogc/capabilities.js";

export type {
  BasemapId,
  BasemapOptions,
  CameraOptions,
  MapExtent,
  MapOptions,
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
  LayerManagerEventMap,
  LayerManagerEventName,
  LayerManagerEventPayload,
  InteractionManagerEventMap,
  InteractionManagerEventName,
  InteractionManagerEventPayload,
  DrawingManagerEventMap,
  DrawingManagerEventName,
  DrawingManagerEventPayload,
  EntityInteractionDetail,
  MapInteractionDetail,
  PickedFeatureDetail,
  ImageryFeatureInfo,
  ImageryGeometryHint,
  ImageryInteractionDetail,
  DrawTool,
  DrawnShape,
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
} from "./types/index.js";
