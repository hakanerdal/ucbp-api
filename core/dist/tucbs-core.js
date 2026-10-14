var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _apiKey, _apiKey2, _AnalysisManager_instances, post_fn, _unregisterApiKeyRefresh, _apiKey3, _a;
import { Cartesian3, Ellipsoid, Cartesian2, SceneMode, JulianDate, Cartographic, Math as _0x33fcf2, ConstantProperty, PropertyBag, PolygonHierarchy, ColorMaterialProperty, Color, CallbackProperty, HeadingPitchRange, BoundingSphere, Entity, PolylineGraphics, ConstantPositionProperty, PointGraphics, CustomDataSource, GeoJsonDataSource, KmlDataSource, Rectangle, WebMapServiceImageryProvider, GetFeatureInfoFormat, Resource, WebMapTileServiceImageryProvider, WebMercatorTilingScheme, ImageryLayer, SingleTileImageryProvider, HeightReference, ScreenSpaceEventHandler, ScreenSpaceEventType, UrlTemplateImageryProvider, Viewer } from "cesium";
function createMarkerOverlay(_0x207f91, _0x150f60, _0x54e99a, _0x11abf7, _0x1f3c84 = {}) {
  const _0x4b2240 = Cartesian3["fromDegrees"](_0x150f60, _0x54e99a), _0x56f9da = Ellipsoid["WGS84"]["geodeticSurfaceNormal"](_0x4b2240, new Cartesian3()), _0x5e1e02 = new Cartesian3(), _0xfe3dd9 = new Cartesian2(), _0x27f9c3 = document["createElement"]("img");
  _0x27f9c3["src"] = _0x11abf7, _0x27f9c3["alt"] = "", _0x27f9c3["draggable"] = ![], Object["assign"](_0x27f9c3["style"], { "position": "absolute", "left": "0", "top": "0", "display": "none", "pointerEvents": "none", "userSelect": "none", "zIndex": "1", "willChange": "transform", ..._0x1f3c84["width"] === void 0 ? {} : { "width": _0x1f3c84["width"] + "px" }, ..._0x1f3c84["height"] === void 0 ? {} : { "height": _0x1f3c84["height"] + "px" } }), _0x207f91["container"]["appendChild"](_0x27f9c3);
  const _0xdc0740 = () => {
    const { scene: _0x375ecd } = _0x207f91;
    let _0x56a3a6 = !![];
    _0x375ecd["mode"] === SceneMode["SCENE3D"] && (Cartesian3["subtract"](_0x375ecd["camera"]["positionWC"], _0x4b2240, _0x5e1e02), _0x56a3a6 = Cartesian3["dot"](_0x56f9da, _0x5e1e02) > 0);
    const _0x480a68 = _0x56a3a6 ? _0x375ecd["cartesianToCanvasCoordinates"](_0x4b2240, _0xfe3dd9) : void 0;
    if (!_0x480a68) {
      _0x27f9c3["style"]["display"] = "none";
      return;
    }
    _0x27f9c3["style"]["display"] = "block";
    const _0x4da70c = Math["round"](_0x480a68["x"] - _0x27f9c3["offsetWidth"] / 2), _0x1e16ba = Math["round"](_0x480a68["y"] - (_0x1f3c84["anchor"] === "center" ? _0x27f9c3["offsetHeight"] / 2 : _0x27f9c3["offsetHeight"]));
    _0x27f9c3["style"]["transform"] = "translate(" + _0x4da70c + "px, " + _0x1e16ba + "px)";
  }, _0x5ea4f7 = _0x207f91["scene"]["postRender"]["addEventListener"](_0xdc0740);
  return _0x27f9c3["addEventListener"]("load", _0xdc0740), _0xdc0740(), () => {
    _0x5ea4f7(), _0x27f9c3["remove"]();
  };
}
class EventEmitter {
  constructor() {
    this["listeners"] = {};
  }
  ["on"](_0x1ffe57, _0x4f9c32) {
    const _0x4a0af2 = this["listeners"][_0x1ffe57];
    return _0x4a0af2 !== void 0 ? _0x4a0af2["add"](_0x4f9c32) : this["listeners"][_0x1ffe57] = /* @__PURE__ */ new Set([_0x4f9c32]), this;
  }
  ["off"](_0x19eb33, _0xd54eb) {
    var _a2;
    return (_a2 = this["listeners"][_0x19eb33]) == null ? void 0 : _a2["delete"](_0xd54eb), this;
  }
  ["once"](_0x56f9f3, _0x389ede) {
    const _0x4f2e16 = (_0x403529) => {
      _0x389ede(_0x403529), this["off"](_0x56f9f3, _0x4f2e16);
    };
    return this["on"](_0x56f9f3, _0x4f2e16);
  }
  ["emit"](_0x2da84c, _0x3aa2f6) {
    const _0x41c8c0 = this["listeners"][_0x2da84c];
    if (_0x41c8c0 === void 0) return;
    for (const _0x6f566b of _0x41c8c0) {
      _0x6f566b(_0x3aa2f6);
    }
  }
  ["removeAllListeners"](_0x294aa8) {
    if (_0x294aa8 !== void 0) delete this["listeners"][_0x294aa8];
    else for (const _0x284b6f of Object["keys"](this["listeners"])) {
      delete this["listeners"][_0x284b6f];
    }
  }
  ["listenerCount"](_0x44f527) {
    var _a2;
    return ((_a2 = this["listeners"][_0x44f527]) == null ? void 0 : _a2["size"]) ?? 0;
  }
}
const GLOBAL_STATE_SLOT = Symbol["for"]("@tucbs/core/globalConfigState");
function getState() {
  const _0x1f3ae9 = globalThis;
  let _0x2952c1 = _0x1f3ae9[GLOBAL_STATE_SLOT];
  return !_0x2952c1 && (_0x2952c1 = { "apiKey": void 0, "apiBase": void 0, "proxyBase": void 0, "configured": ![], "refreshers": /* @__PURE__ */ new Set() }, Object["defineProperty"](globalThis, GLOBAL_STATE_SLOT, { "value": _0x2952c1, "enumerable": ![], "configurable": ![], "writable": ![] })), _0x2952c1;
}
function configureTucbs(_0xfbcc7) {
  const _0x42b240 = getState();
  if (_0xfbcc7["apiBase"] !== void 0) {
    const _0x2287ee = _0xfbcc7["apiBase"]["trim"]()["replace"](/\/+$/, "");
    _0x42b240["apiBase"] = _0x2287ee || void 0, _0x42b240["configured"] = !![];
  }
  if (_0xfbcc7["proxyBase"] !== void 0) {
    const _0x11f09e = _0xfbcc7["proxyBase"]["trim"]();
    _0x42b240["proxyBase"] = _0x11f09e || void 0, _0x42b240["configured"] = !![];
  }
  if (_0xfbcc7["apiKey"] === void 0) {
    _0x42b240["configured"] && _0x42b240["refreshers"]["forEach"]((_0x5510ba) => _0x5510ba());
    return;
  }
  _0x42b240["configured"] && _0xfbcc7["apiKey"] !== _0x42b240["apiKey"] && console["warn"]("[@tucbs/core] configureTucbs() daha once farkli bir apiKey ile cagrilmisti; deger degistirildi. Bu beklenmiyorsa sayfada birden fazla script'in ayni fonksiyonu cagirdigini kontrol edin."), _0x42b240["apiKey"] = _0xfbcc7["apiKey"], _0x42b240["configured"] = !![], _0x42b240["refreshers"]["forEach"]((_0x14e51a) => _0x14e51a());
}
function getGlobalApiBase() {
  return getState()["apiBase"];
}
function getGlobalProxyBase() {
  return getState()["proxyBase"];
}
function getGlobalApiKey() {
  return getState()["apiKey"];
}
function registerApiKeyRefresh(_0xf2093b) {
  const { refreshers: _0x3ce5c1 } = getState();
  return _0x3ce5c1["add"](_0xf2093b), () => _0x3ce5c1["delete"](_0xf2093b);
}
const DEFAULT_UCBP_API_BASE = ("https://dev-ucbp-api.turksat.com.tr/ucbp-api" == null ? void 0 : "https://dev-ucbp-api.turksat.com.tr/ucbp-api"["trim"]()) || "/ucbp-api";
function trimSlash$2(_0x3bc5bf) {
  return _0x3bc5bf["replace"](/\/+$/, "");
}
function getUcbpApiBase() {
  const _0x2c4058 = getGlobalApiBase();
  if (_0x2c4058) return trimSlash$2(_0x2c4058);
  return trimSlash$2(DEFAULT_UCBP_API_BASE);
}
function getProxyBase() {
  const _0xd226c8 = getGlobalProxyBase();
  if (_0xd226c8) return _0xd226c8;
  return console["warn"]("proxyBase yok; configureTucbs({ proxyBase }) verilmedi. main.js'te verilmeli."), "";
}
const ERROR_REGISTRY = { "API_KEY_MISSING": { "code": "API_KEY_MISSING", "number": "E001", "title": "API Anahtarı Eksik", "description": "Ne instance ne configureTucbs() ile ayarlanmış global apiKey sağlanmış." }, "API_KEY_INVALID": { "code": "API_KEY_INVALID", "number": "E002", "title": "API Anahtarı Geçersiz", "description": "Sağlanan apiKey backend tarafından reddedildi veya doğrulama isteği başarısız oldu." }, "INTERNAL_INDEX_OUT_OF_RANGE": { "code": "INTERNAL_INDEX_OUT_OF_RANGE", "number": "E003", "title": "İç Durum Hatası", "description": "Beklenen bir dizi indeksi bulunamadı (iç tutarlılık hatası)." }, "OGC_CAPABILITIES_REQUEST_FAILED": { "code": "OGC_CAPABILITIES_REQUEST_FAILED", "number": "E201", "title": "GetCapabilities İsteği Başarısız", "description": "WFS GetCapabilities isteği HTTP hata koduyla döndü." }, "OGC_CAPABILITIES_EXCEPTION": { "code": "OGC_CAPABILITIES_EXCEPTION", "number": "E202", "title": "GetCapabilities OGC Exception", "description": "WFS GetCapabilities yanıtı bir OGC ExceptionReport/ServiceExceptionReport döndürdü." }, "OGC_CAPABILITIES_PARSE_FAILED": { "code": "OGC_CAPABILITIES_PARSE_FAILED", "number": "E203", "title": "GetCapabilities Ayrıştırma Hatası", "description": "WFS GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "OGC_FEATURE_TYPE_NOT_FOUND": { "code": "OGC_FEATURE_TYPE_NOT_FOUND", "number": "E204", "title": "FeatureType Bulunamadı", "description": "WFS GetCapabilities yanıtında hiç FeatureType bulunamadı." }, "CRS_UNRESOLVED_UNSUPPORTED": { "code": "CRS_UNRESOLVED_UNSUPPORTED", "number": "E401", "title": "Koordinat Sistemi Tanınamadı", "description": "GeoJSON'daki koordinat sistemi (CRS) çözülemedi ve koordinatlar WGS84 ile uyumlu değil." }, "CRS_CLAIMED_WGS84_INVALID": { "code": "CRS_CLAIMED_WGS84_INVALID", "number": "E402", "title": "Koordinatlar WGS84 İle Uyumsuz", "description": "GeoJSON WGS84/CRS84 olduğunu belirtiyor ama koordinatlar geçerli bir enlem/boylam aralığında değil." }, "CRS_MISSING_UNSUPPORTED": { "code": "CRS_MISSING_UNSUPPORTED", "number": "E403", "title": "Koordinat Sistemi Bilgisi Yok", "description": "GeoJSON'da CRS bilgisi yok ve koordinatlar geçerli bir enlem/boylam aralığında değil." }, "ANALYSIS_API_KEY_MISSING": { "code": "ANALYSIS_API_KEY_MISSING", "number": "E301", "title": "Analiz İçin API Anahtarı Eksik", "description": "AnalysisManager'a apiKey tanımlanmadan analiz isteği yapıldı." }, "ANALYSIS_NETWORK_ERROR": { "code": "ANALYSIS_NETWORK_ERROR", "number": "E302", "title": "Analiz Ağ Hatası", "description": "Analiz isteği ağ seviyesinde (fetch) başarısız oldu." }, "ANALYSIS_REQUEST_FAILED": { "code": "ANALYSIS_REQUEST_FAILED", "number": "E303", "title": "Analiz İsteği Başarısız", "description": "Analiz backend'i HTTP hata koduyla döndü." }, "ANALYSIS_UNSUCCESSFUL": { "code": "ANALYSIS_UNSUCCESSFUL", "number": "E304", "title": "Analiz Başarısız", "description": "Analiz backend'i HTTP 200 döndü ama isSuccess/success=false işaretledi." }, "ANALYSIS_RESPONSE_MISSING_GEOJSON": { "code": "ANALYSIS_RESPONSE_MISSING_GEOJSON", "number": "E305", "title": "Analiz Yanıtı Eksik", "description": "Analiz backend'i başarılı yanıt döndü ama sonuç geojson içermiyor." }, "LAYER_AUTHORIZED_LIST_API_KEY_MISSING": { "code": "LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "number": "E101", "title": "Yetkili Katman Listesi İçin API Anahtarı Gerekli", "description": "getAuthorizedLayers() apiKey ayarlanmadan çağrıldı." }, "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE": { "code": "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", "number": "E102", "title": "GeoTIFF Export Desteklenmiyor", "description": "GeoTIFF export sadece WMS/WCS katmanlarında desteklenir." }, "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED": { "code": "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", "number": "E103", "title": "GeoTIFF Export Yapılandırılmamış", "description": "Katman GeoTIFF export için gerekli tiffFormat seçeneğine sahip değil." }, "LAYER_STYLE_NOT_VECTOR": { "code": "LAYER_STYLE_NOT_VECTOR", "number": "E104", "title": "Stil Sadece Vektör Katmanlarda", "description": "applyLayerStyle() sadece vektör (Entity tabanlı) katmanlarda kullanılabilir." }, "LAYER_TYPE_UNSUPPORTED_XYZ": { "code": "LAYER_TYPE_UNSUPPORTED_XYZ", "number": "E105", "title": "XYZ Katmanı add() İle Desteklenmiyor", "description": "XYZ katmanı add() ile eklenemez, Map.setBasemap() kullanılmalı." }, "LAYER_TYPE_UNSUPPORTED_DRAWING": { "code": "LAYER_TYPE_UNSUPPORTED_DRAWING", "number": "E106", "title": "DRAWING Katmanı add() İle Desteklenmiyor", "description": "DRAWING katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_TYPE_UNSUPPORTED_MEASURE": { "code": "LAYER_TYPE_UNSUPPORTED_MEASURE", "number": "E107", "title": "MEASURE Katmanı add() İle Desteklenmiyor", "description": "MEASURE katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_WMS_LAYERS_EMPTY": { "code": "LAYER_WMS_LAYERS_EMPTY", "number": "E108", "title": "WMS layers Parametresi Boş", "description": "WMS katmanı eklenirken layers (ogcLayerName) parametresi boş." }, "LAYER_GEOTIFF_UNSUPPORTED": { "code": "LAYER_GEOTIFF_UNSUPPORTED", "number": "E109", "title": "GeoTIFF Katmanı Desteklenmiyor", "description": "GeoTIFF katmanı mevcut Cesium sürümünde desteklenmiyor." }, "LAYER_SHP_PACKAGE_MISSING": { "code": "LAYER_SHP_PACKAGE_MISSING", "number": "E110", "title": "shpjs Paketi Eksik", "description": 'SHP katmanı için gereken "shpjs" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_PACKAGE_MISSING": { "code": "LAYER_CSV_PACKAGE_MISSING", "number": "E111", "title": "papaparse Paketi Eksik", "description": 'CSV katmanı için gereken "papaparse" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_LATLON_NOT_FOUND": { "code": "LAYER_CSV_LATLON_NOT_FOUND", "number": "E112", "title": "CSV'de lat/lon Sütunu Bulunamadı", "description": "CSV içinde lat/lon sütunları otomatik tespit edilemedi." }, "LAYER_NOT_FOUND": { "code": "LAYER_NOT_FOUND", "number": "E113", "title": "Katman Bulunamadı", "description": "Verilen id'ye sahip bir katman yönetimde kayıtlı değil." }, "LAYER_ID_ALREADY_EXISTS": { "code": "LAYER_ID_ALREADY_EXISTS", "number": "E114", "title": "Katman ID'si Zaten Kayıtlı", "description": "Verilen id ile zaten bir katman eklenmiş." }, "LAYER_TYPE_MISMATCH": { "code": "LAYER_TYPE_MISMATCH", "number": "E115", "title": "Katman Tipi Uyuşmuyor", "description": "Katman beklenen tipte (WMS/WMTS) değil." }, "LAYER_SERVICE_OPTIONS_NOT_FOUND": { "code": "LAYER_SERVICE_OPTIONS_NOT_FOUND", "number": "E116", "title": "Servis Seçenekleri Bulunamadı", "description": "Katman için orijinal servis seçenekleri (serviceLayerOptions) bulunamadı." }, "LAYER_NOT_RASTER": { "code": "LAYER_NOT_RASTER", "number": "E117", "title": "Katman Raster Değil", "description": "İşlem sadece raster (ImageryLayer) katmanlarda desteklenir." }, "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED": { "code": "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "number": "E205", "title": "Yetkili Katman Listesi Alınamadı", "description": "getAuthorizedLayers() isteği HTTP hata koduyla döndü." }, "OGC_GEOTIFF_DOWNLOAD_FAILED": { "code": "OGC_GEOTIFF_DOWNLOAD_FAILED", "number": "E206", "title": "GeoTIFF İndirilemedi", "description": "GeoTIFF export isteği HTTP hata koduyla döndü." }, "OGC_WFS_JSON_FORMAT_UNSUPPORTED": { "code": "OGC_WFS_JSON_FORMAT_UNSUPPORTED", "number": "E207", "title": "WFS JSON Format İlan Etmiyor", "description": "WFS sunucusu GetCapabilities yanıtında JSON çıktı formatı ilan etmiyor." }, "OGC_WFS_GEOJSON_REQUEST_FAILED": { "code": "OGC_WFS_GEOJSON_REQUEST_FAILED", "number": "E208", "title": "WFS GeoJSON İsteği Başarısız", "description": "WFS GetFeature (GeoJSON çıktı) isteği başarısız oldu." }, "OGC_WFS_REQUEST_FAILED": { "code": "OGC_WFS_REQUEST_FAILED", "number": "E209", "title": "WFS İsteği Başarısız", "description": "WFS GetFeature (GML çıktı) isteği HTTP hata koduyla döndü." }, "OGC_WFS_EXCEPTION": { "code": "OGC_WFS_EXCEPTION", "number": "E210", "title": "WFS OGC Exception", "description": "WFS GetFeature yanıtı bir OGC ExceptionReport döndürdü." }, "OGC_WFS_OL_PACKAGE_MISSING": { "code": "OGC_WFS_OL_PACKAGE_MISSING", "number": "E211", "title": "ol Paketi Eksik", "description": 'WFS GML yanıtını okumak için gereken "ol" paketi tüketici uygulamaya eklenmemiş.' }, "OGC_WCS_REQUEST_FAILED": { "code": "OGC_WCS_REQUEST_FAILED", "number": "E212", "title": "WCS İsteği Başarısız", "description": "WCS GetCoverage isteği HTTP hata koduyla döndü." }, "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND": { "code": "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "number": "E213", "title": "WCS Multipart Görsel Bulunamadı", "description": "Multipart WCS yanıtında görsel (image) parçası bulunamadı." }, "LAYER_PREVIEW_UNSUPPORTED_XYZ": { "code": "LAYER_PREVIEW_UNSUPPORTED_XYZ", "number": "E118", "title": "XYZ Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview XYZ katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_DRAWING": { "code": "LAYER_PREVIEW_UNSUPPORTED_DRAWING", "number": "E119", "title": "DRAWING Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview DRAWING katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_MEASURE": { "code": "LAYER_PREVIEW_UNSUPPORTED_MEASURE", "number": "E120", "title": "MEASURE Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview MEASURE katman tipini önizlemede desteklemiyor." }, "LAYER_MANAGER_NOT_READY": { "code": "LAYER_MANAGER_NOT_READY", "number": "E121", "title": "Harita Hazır Değil", "description": "Katman eklenmeye çalışıldığında LayerManager henüz hazır değildi." }, "LAYER_AUTHORIZED_ADD_MISSING_INFO": { "code": "LAYER_AUTHORIZED_ADD_MISSING_INFO", "number": "E122", "title": "Yetkili Katman Eklenemedi", "description": "Yetkili katman için gerekli servis bilgisi (ör. WMTS TileMatrixSet) eksik." }, "OGC_SERVICE_DISCOVERY_PARSE_FAILED": { "code": "OGC_SERVICE_DISCOVERY_PARSE_FAILED", "number": "E214", "title": "Servis Keşfi Ayrıştırma Hatası", "description": "TucbsServiceUpload'da GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "LAYER_WMTS_TILEMATRIXSET_MISSING": { "code": "LAYER_WMTS_TILEMATRIXSET_MISSING", "number": "E123", "title": "TileMatrixSet Bilgisi Bulunamadı", "description": "Keşfedilen WMTS katmanı için TileMatrixSet bilgisi bulunamadı." } };
function getErrorCodes() {
  return ERROR_REGISTRY;
}
class TucbsError extends Error {
  constructor(_0xea937e, _0x5131b0, _0x27c2a4) {
    const _0x28035d = ERROR_REGISTRY[_0xea937e];
    super(_0x5131b0 ?? _0x28035d["description"]), this["name"] = "TucbsError", this["code"] = _0xea937e, this["number"] = _0x28035d["number"], this["title"] = _0x27c2a4 ?? _0x28035d["title"];
  }
}
class LayerOperationError extends TucbsError {
  constructor(_0x2a0787, _0xe21a0b, _0x2dafa3) {
    super(_0x2a0787, _0xe21a0b, _0x2dafa3), this["name"] = "LayerOperationError";
  }
}
class OgcRequestError extends TucbsError {
  constructor(_0x42352c, _0x9ed75b, _0x58ed51) {
    super(_0x42352c, _0x9ed75b, _0x58ed51), this["name"] = "OgcRequestError";
  }
}
class AnalysisRequestError extends TucbsError {
  constructor(_0x40abf4, _0x5224f9, _0x96d1ec) {
    super(_0x40abf4, _0x5224f9, _0x96d1ec), this["name"] = "AnalysisRequestError";
  }
}
class GeometryError extends TucbsError {
  constructor(_0x5a3579, _0x5d6771, _0x35e7fe) {
    super(_0x5a3579, _0x5d6771, _0x35e7fe), this["name"] = "GeometryError";
  }
}
class ApiKeyValidationError extends TucbsError {
  constructor(_0x41714e, _0x4804d1) {
    super((_0x4804d1 == null ? void 0 : _0x4804d1["code"]) ?? "API_KEY_INVALID", _0x41714e, (_0x4804d1 == null ? void 0 : _0x4804d1["title"]) ?? "API Hatası"), this["name"] = "ApiKeyValidationError";
    if ((_0x4804d1 == null ? void 0 : _0x4804d1["reason"]) !== void 0) this["reason"] = _0x4804d1["reason"];
    if ((_0x4804d1 == null ? void 0 : _0x4804d1["detail"]) !== void 0) this["detail"] = _0x4804d1["detail"];
  }
}
const _ApiKeyPolicy = class _ApiKeyPolicy {
  constructor(_0x4f2ee5) {
    __privateAdd(this, _apiKey);
    this["getApiBase"] = _0x4f2ee5["apiBase"];
  }
  ["configure"](_0x2869df) {
    _0x2869df["apiKey"] !== void 0 && __privateSet(this, _apiKey, _0x2869df["apiKey"]), _0x2869df["trustedApiKeyHosts"] !== void 0 && (this["trustedApiKeyHosts"] = _0x2869df["trustedApiKeyHosts"]), _0x2869df["apiKeyDiscoveryUrl"] !== void 0 && (this["apiKeyDiscoveryUrl"] = _0x2869df["apiKeyDiscoveryUrl"]);
  }
  get ["hasApiKey"]() {
    return __privateGet(this, _apiKey) !== void 0;
  }
  async ["getAuthorizedLayers"]() {
    if (__privateGet(this, _apiKey) === void 0) throw new LayerOperationError("LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "getAuthorizedLayers() icin apiKey gerekli — Map/LayerManager.configure({apiKey}) ile atayin.");
    const _0xba2bf = this["apiKeyDiscoveryUrl"] ?? this["getApiBase"]()["replace"](/\/+$/, "") + "/layers", _0x549125 = await fetch(_0xba2bf, { "headers": { [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) } });
    if (!_0x549125["ok"]) throw new OgcRequestError("OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "Yetkili katman listesi alinamadi: " + _0x549125["status"] + " " + _0x549125["statusText"]);
    const _0x5737c3 = await _0x549125["json"](), _0x3f7780 = Array["isArray"](_0x5737c3) ? _0x5737c3 : _0x5737c3["object"] ?? [];
    return _0x3f7780["map"]((_0x3492fb) => this["normalizeAuthorizedLayer"](_0x3492fb));
  }
  async ["getLayerList"]() {
    return this["getAuthorizedLayers"]();
  }
  ["canAddAuthorizedLayer"](_0x1f7ae2) {
    var _a2, _b;
    const _0x24898f = (_0x1f7ae2["servisTuru"] || "")["toUpperCase"]();
    if (!((_a2 = _0x1f7ae2["servisUrl"]) == null ? void 0 : _a2["trim"]()) || !this["resolveOgcLayerName"](_0x1f7ae2["ogcLayerName"], _0x1f7ae2["katmanAdi"])) return ![];
    if (_0x24898f === "WMTS") return !!((_b = _0x1f7ae2["wmtsTileMatrixSet"]) == null ? void 0 : _b["trim"]());
    return _0x24898f === "WMS" || _0x24898f === "WFS";
  }
  ["resolveAddOptions"](_0x540206) {
    var _a2;
    if (!this["canAddAuthorizedLayer"](_0x540206)) throw new LayerOperationError("LAYER_AUTHORIZED_ADD_MISSING_INFO", ((_a2 = _0x540206["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" ? "WMTS için TileMatrixSet eksik." : "Eksik servis bilgisi.");
    const _0x469d09 = _0x540206["servisTuru"]["toUpperCase"](), _0x1c5667 = "authorized-" + this["authorizedLayerKey"](_0x540206) + "-" + Date["now"](), _0x3f8398 = this["resolveOgcLayerName"](_0x540206["ogcLayerName"], _0x540206["katmanAdi"]), _0x1238a4 = _0x540206["katmanAdi"] || _0x3f8398;
    if (_0x469d09 === "WMS") return { "layerType": "WMS", "options": { "id": _0x1c5667, "title": _0x1238a4, "url": _0x540206["servisUrl"], "layers": _0x3f8398 } };
    if (_0x469d09 === "WFS") return { "layerType": "WFS", "options": { "id": _0x1c5667, "title": _0x1238a4, "url": _0x540206["servisUrl"], "typeName": _0x3f8398 } };
    return { "layerType": "WMTS", "options": { "id": _0x1c5667, "title": _0x1238a4, "url": _0x540206["servisUrl"], "layer": _0x3f8398, "tileMatrixSetID": _0x540206["wmtsTileMatrixSet"] } };
  }
  ["authorizedLayerKey"](_0x50dcb5) {
    return _0x50dcb5["id"] ?? _0x50dcb5["servisTuru"] + "|" + _0x50dcb5["servisUrl"] + "|" + _0x50dcb5["ogcLayerName"];
  }
  ["normalizeAuthorizedLayer"](_0x309744) {
    const _0xca02fb = this["resolveOgcLayerName"](_0x309744["ogcLayerName"], _0x309744["katmanAdi"]), _0x306b76 = this["rewriteOpaqueOgcUrl"](_0x309744["servisUrl"]), _0x556405 = _0x309744["servisTuru"]["toUpperCase"]();
    return { ..._0x309744, "servisTuru": _0x556405, ..._0xca02fb && _0xca02fb !== _0x309744["ogcLayerName"] ? { "ogcLayerName": _0xca02fb } : {}, ..._0x306b76 !== _0x309744["servisUrl"] ? { "servisUrl": _0x306b76 } : {} };
  }
  ["resolveOgcLayerName"](_0xae070e, _0x2a8348) {
    for (const _0x2f40d3 of [_0xae070e, _0x2a8348]) {
      if (!_0x2f40d3) continue;
      const _0x556510 = _0x2f40d3["trim"]();
      if (!_0x556510 || _0x556510["toLowerCase"]() === "undefined" || _0x556510["toLowerCase"]() === "null") continue;
      return _0x556510;
    }
    return "";
  }
  ["isTrustedApiKeyHost"](_0x31cd56) {
    if (__privateGet(this, _apiKey) === void 0) return ![];
    return this["isKnownGatedUrl"](_0x31cd56);
  }
  ["layerRequiresApiKey"](_0x492ec3) {
    return this["isKnownGatedUrl"](_0x492ec3);
  }
  ["isKnownGatedUrl"](_0x3e7b16) {
    if (this["isOwnBackendUrl"](_0x3e7b16)) return !![];
    if (this["trustedApiKeyHosts"] === void 0 || this["trustedApiKeyHosts"]["length"] === 0) return ![];
    try {
      return this["trustedApiKeyHosts"]["includes"](new URL(_0x3e7b16)["hostname"]);
    } catch {
      return ![];
    }
  }
  ["isOwnBackendUrl"](_0x77771e) {
    try {
      const _0x3a9540 = new URL(_0x77771e, window["location"]["origin"]), _0x26bfe5 = new URL(this["getApiBase"](), window["location"]["origin"]);
      if (_0x3a9540["hostname"] !== _0x26bfe5["hostname"]) return ![];
      return _0x3a9540["pathname"]["includes"]("/wms-proxy/") || _0x3a9540["pathname"]["includes"]("/ogc/");
    } catch {
      return ![];
    }
  }
  ["rewriteOpaqueOgcUrl"](_0x22ed74) {
    if (!(_0x22ed74 == null ? void 0 : _0x22ed74["includes"]("/ogc/"))) return _0x22ed74 ?? "";
    const _0x5629e7 = _0x22ed74["indexOf"]("/ogc/"), _0x26779a = _0x22ed74["substring"](_0x5629e7), _0xb36fd2 = this["getApiBase"]()["replace"](/\/+$/, "");
    return "" + _0xb36fd2 + _0x26779a;
  }
  ["resolveOgcProxyUrl"](_0x1bd0e2, _0x15ed22) {
    if (__privateGet(this, _apiKey) === void 0) return _0x15ed22;
    if (_0x15ed22["includes"]("/ogc/")) return this["rewriteOpaqueOgcUrl"](_0x15ed22);
    if (_0x15ed22["includes"]("/wms-proxy/")) return _0x15ed22;
    const _0x39a372 = this["getApiBase"]()["replace"](/\/+$/, "") + "/wms-proxy/" + _0x1bd0e2, _0x2b2fde = _0x39a372["includes"]("?") ? "&" : "?";
    return "" + _0x39a372 + _0x2b2fde + "url=" + encodeURIComponent(_0x15ed22);
  }
  ["mergeApiKeyHeader"](_0x5d778d, _0x240a84) {
    if (!this["isTrustedApiKeyHost"](_0x240a84)) return _0x5d778d;
    return { ..._0x5d778d, [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) };
  }
  ["attachApiKeyToUrl"](_0x1f09aa) {
    if (!this["isTrustedApiKeyHost"](_0x1f09aa)) return _0x1f09aa;
    const _0x4ebdf9 = _0x1f09aa["includes"]("?") ? "&" : "?";
    return "" + _0x1f09aa + _0x4ebdf9 + _ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] + "=" + encodeURIComponent(__privateGet(this, _apiKey));
  }
  ["buildAuthHeaders"](_0x2dac2e) {
    if (_0x2dac2e === void 0) return void 0;
    return { "Authorization": "Bearer " + _0x2dac2e };
  }
};
_apiKey = new WeakMap();
_ApiKeyPolicy["API_KEY_HEADER_NAME"] = "X-API-Key";
_ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] = "tucbsapikey";
let ApiKeyPolicy = _ApiKeyPolicy;
function cartesianToLonLat(_0x35239b) {
  const _0x4d49c1 = Cartographic["fromCartesian"](_0x35239b);
  return [_0x33fcf2["toDegrees"](_0x4d49c1["longitude"]), _0x33fcf2["toDegrees"](_0x4d49c1["latitude"])];
}
function closeRing$1(_0x48e9e6) {
  if (_0x48e9e6["length"] === 0) return _0x48e9e6;
  const _0x543d04 = _0x48e9e6[0], _0x4200e1 = _0x48e9e6[_0x48e9e6["length"] - 1];
  if (_0x543d04[0] === _0x4200e1[0] && _0x543d04[1] === _0x4200e1[1]) return _0x48e9e6;
  return [..._0x48e9e6, _0x543d04];
}
function entityToGeoJSON(_0x272d7c, _0x1f07de = JulianDate["now"]()) {
  var _a2, _b, _c;
  const _0x49c45e = ((_a2 = _0x272d7c["properties"]) == null ? void 0 : _a2["getValue"](_0x1f07de)) ?? {}, _0x183bd1 = { ..._0x49c45e };
  delete _0x183bd1["layerId"], delete _0x183bd1["featureId"];
  let _0x5d6531 = null;
  if ((_b = _0x272d7c["polygon"]) == null ? void 0 : _b["hierarchy"]) {
    const _0xa2e1aa = _0x272d7c["polygon"]["hierarchy"]["getValue"](_0x1f07de), _0xb4cff = _0xa2e1aa == null ? void 0 : _0xa2e1aa["positions"];
    if (_0xb4cff && _0xb4cff["length"] >= 3) {
      const _0x2dafe3 = closeRing$1(_0xb4cff["map"](cartesianToLonLat));
      _0x5d6531 = { "type": "Polygon", "coordinates": [_0x2dafe3] };
    }
  } else {
    if ((_c = _0x272d7c["polyline"]) == null ? void 0 : _c["positions"]) {
      const _0x25ea27 = _0x272d7c["polyline"]["positions"]["getValue"](_0x1f07de);
      _0x25ea27 && _0x25ea27["length"] >= 2 && (_0x5d6531 = { "type": "LineString", "coordinates": _0x25ea27["map"](cartesianToLonLat) });
    } else {
      if (_0x272d7c["position"]) {
        const _0x50fc67 = _0x272d7c["position"]["getValue"](_0x1f07de);
        _0x50fc67 && (_0x5d6531 = { "type": "Point", "coordinates": cartesianToLonLat(_0x50fc67) });
      }
    }
  }
  if (!_0x5d6531) return null;
  return { "type": "Feature", "id": _0x272d7c["id"], "properties": _0x183bd1, "geometry": _0x5d6531 };
}
function featureLabel(_0x1272be) {
  var _a2;
  const _0xf4c8e4 = ((_a2 = _0x1272be["geometry"]) == null ? void 0 : _a2["type"]) ?? "Feature", _0x2fece3 = _0x1272be["id"] != null ? String(_0x1272be["id"]) : "";
  return _0x2fece3 ? _0xf4c8e4 + " " + _0x2fece3 : _0xf4c8e4;
}
function triggerDownload(_0x4db875, _0x24bc5f) {
  const _0x31fbcf = URL["createObjectURL"](_0x4db875), _0x4621c8 = document["createElement"]("a");
  _0x4621c8["href"] = _0x31fbcf, _0x4621c8["download"] = _0x24bc5f, document["body"]["appendChild"](_0x4621c8), _0x4621c8["click"](), _0x4621c8["remove"](), setTimeout(() => URL["revokeObjectURL"](_0x31fbcf), 1e3);
}
function featureCollectionToKml(_0x12299d) {
  const _0x4563bc = _0x12299d["features"]["map"]((_0x9907a2, _0x9308d) => featureToKml(_0x9907a2, _0x9308d))["join"]("");
  return '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document>' + _0x4563bc + "</Document></kml>";
}
function featureCollectionToShapefileZip(_0x41bef3) {
  const _0x4c4881 = collectShpRecords(_0x41bef3), _0x31ceda = writeShp(_0x4c4881), _0x13c0e1 = writeShx(_0x4c4881), _0x4daf3e = writeDbf(_0x4c4881["map"]((_0xaf6d4e) => _0xaf6d4e["name"]));
  return zipStore([{ "name": "export.shp", "data": _0x31ceda }, { "name": "export.shx", "data": _0x13c0e1 }, { "name": "export.dbf", "data": _0x4daf3e }]);
}
function featureToKml(_0x27b5e1, _0xa20704) {
  const _0x45548b = xmlEscape(featureName(_0x27b5e1, _0xa20704)), _0x5f0172 = geometryToKml(_0x27b5e1["geometry"]);
  if (!_0x5f0172) return "";
  return "<Placemark><name>" + _0x45548b + "</name>" + _0x5f0172 + "</Placemark>";
}
function geometryToKml(_0x3ce572) {
  if (!_0x3ce572) return "";
  switch (_0x3ce572["type"]) {
    case "Point":
      return "<Point><coordinates>" + coord(_0x3ce572["coordinates"]) + "</coordinates></Point>";
    case "MultiPoint":
      return "<MultiGeometry>" + _0x3ce572["coordinates"]["map"]((_0x1f0f10) => "<Point><coordinates>" + coord(_0x1f0f10) + "</coordinates></Point>")["join"]("") + "</MultiGeometry>";
    case "LineString":
      return "<LineString><coordinates>" + line(_0x3ce572["coordinates"]) + "</coordinates></LineString>";
    case "MultiLineString":
      return "<MultiGeometry>" + _0x3ce572["coordinates"]["map"]((_0x1da307) => "<LineString><coordinates>" + line(_0x1da307) + "</coordinates></LineString>")["join"]("") + "</MultiGeometry>";
    case "Polygon":
      return polygonKml(_0x3ce572["coordinates"]);
    case "MultiPolygon":
      return "<MultiGeometry>" + _0x3ce572["coordinates"]["map"]((_0x5b47fb) => polygonKml(_0x5b47fb))["join"]("") + "</MultiGeometry>";
    case "GeometryCollection":
      return "<MultiGeometry>" + _0x3ce572["geometries"]["map"]((_0x2751f0) => geometryToKml(_0x2751f0))["join"]("") + "</MultiGeometry>";
    default:
      return "";
  }
}
function polygonKml(_0x1c1b3d) {
  const [_0x5f0edc, ..._0x1ecc4e] = _0x1c1b3d;
  if (!_0x5f0edc) return "";
  const _0x48efc8 = _0x1ecc4e["map"]((_0x33abb0) => "<innerBoundaryIs><LinearRing><coordinates>" + line(_0x33abb0) + "</coordinates></LinearRing></innerBoundaryIs>")["join"]("");
  return "<Polygon><outerBoundaryIs><LinearRing><coordinates>" + line(_0x5f0edc) + "</coordinates></LinearRing></outerBoundaryIs>" + _0x48efc8 + "</Polygon>";
}
function coord(_0x27d1ac) {
  return _0x27d1ac[0] + "," + _0x27d1ac[1] + ",0";
}
function line(_0x104689) {
  return _0x104689["map"](coord)["join"](" ");
}
function xmlEscape(_0x1931f9) {
  return _0x1931f9["replaceAll"]("&", "&amp;")["replaceAll"]("<", "&lt;")["replaceAll"](">", "&gt;")["replaceAll"]('"', "&quot;");
}
function collectShpRecords(_0x406b82) {
  const _0x26843b = firstKind(_0x406b82);
  if (!_0x26843b) return [];
  const _0x2d09a5 = [];
  return _0x406b82["features"]["forEach"]((_0x144b76, _0x598584) => {
    for (const _0x25f1d7 of ringsForKind(_0x144b76["geometry"], _0x26843b)) {
      const _0x52d414 = _0x25f1d7["map"](closeRing), _0x7d0537 = _0x26843b === 5 ? orientPolygon(_0x52d414) : _0x52d414;
      _0x2d09a5["push"]({ "kind": _0x26843b, "name": featureName(_0x144b76, _0x598584), "rings": _0x7d0537, "bbox": bboxOf(_0x7d0537) });
    }
  }), _0x2d09a5;
}
function firstKind(_0x422eb7) {
  for (const _0x14b4c6 of _0x422eb7["features"]) {
    const _0x5d880f = kindOf(_0x14b4c6["geometry"]);
    if (_0x5d880f) return _0x5d880f;
  }
  return null;
}
function kindOf(_0x4f68db) {
  if (!_0x4f68db) return null;
  switch (_0x4f68db["type"]) {
    case "Point":
    case "MultiPoint":
      return 1;
    case "LineString":
    case "MultiLineString":
      return 3;
    case "Polygon":
    case "MultiPolygon":
      return 5;
    case "GeometryCollection":
      for (const _0x2e6078 of _0x4f68db["geometries"]) {
        const _0x2bc8db = kindOf(_0x2e6078);
        if (_0x2bc8db) return _0x2bc8db;
      }
      return null;
    default:
      return null;
  }
}
function ringsForKind(_0x43c947, _0x361c60) {
  if (!_0x43c947 || kindOf(_0x43c947) !== _0x361c60) {
    if ((_0x43c947 == null ? void 0 : _0x43c947["type"]) === "GeometryCollection") return _0x43c947["geometries"]["flatMap"]((_0x202a14) => ringsForKind(_0x202a14, _0x361c60));
    return [];
  }
  switch (_0x43c947["type"]) {
    case "Point":
      return [[[_0x43c947["coordinates"]]]];
    case "MultiPoint":
      return _0x43c947["coordinates"]["map"]((_0x414efd) => [[_0x414efd]]);
    case "LineString":
      return [[_0x43c947["coordinates"]]];
    case "MultiLineString":
      return [_0x43c947["coordinates"]];
    case "Polygon":
      return [_0x43c947["coordinates"]];
    case "MultiPolygon":
      return _0x43c947["coordinates"];
    default:
      return [];
  }
}
function closeRing(_0x3b5072) {
  const _0x3f5abc = _0x3b5072[0], _0x4dcedd = _0x3b5072[_0x3b5072["length"] - 1];
  if (!_0x3f5abc || !_0x4dcedd) return _0x3b5072;
  if (_0x3f5abc[0] === _0x4dcedd[0] && _0x3f5abc[1] === _0x4dcedd[1]) return _0x3b5072;
  return [..._0x3b5072, _0x3f5abc];
}
function orientPolygon(_0x1c6c05) {
  return _0x1c6c05["map"]((_0x1b30a, _0x187674) => {
    const _0x3e83ff = signedArea(_0x1b30a), _0xd66478 = _0x187674 === 0, _0x13a821 = _0x3e83ff < 0;
    if (_0xd66478 === _0x13a821) return _0x1b30a;
    return [..._0x1b30a]["reverse"]();
  });
}
function signedArea(_0x4e0157) {
  let _0x43d249 = 0;
  for (let _0x555f01 = 0; _0x555f01 < _0x4e0157["length"] - 1; _0x555f01++) {
    const _0x1d4479 = _0x4e0157[_0x555f01], _0x21cf02 = _0x4e0157[_0x555f01 + 1], _0x2b1291 = _0x1d4479 == null ? void 0 : _0x1d4479[0], _0x53c3cd = _0x1d4479 == null ? void 0 : _0x1d4479[1], _0x209b0c = _0x21cf02 == null ? void 0 : _0x21cf02[0], _0x12eac1 = _0x21cf02 == null ? void 0 : _0x21cf02[1];
    if (_0x2b1291 === void 0 || _0x53c3cd === void 0 || _0x209b0c === void 0 || _0x12eac1 === void 0) continue;
    _0x43d249 += _0x2b1291 * _0x12eac1 - _0x209b0c * _0x53c3cd;
  }
  return _0x43d249 / 2;
}
function bboxOf(_0x3f9a6e) {
  let _0x324c91 = Infinity, _0x28e7c1 = Infinity, _0x317ca5 = -Infinity, _0x21a662 = -Infinity;
  for (const _0x558544 of _0x3f9a6e) {
    for (const _0x35588d of _0x558544) {
      const [_0x2f3094, _0x5a39cc] = xy(_0x35588d);
      _0x324c91 = Math["min"](_0x324c91, _0x2f3094), _0x28e7c1 = Math["min"](_0x28e7c1, _0x5a39cc), _0x317ca5 = Math["max"](_0x317ca5, _0x2f3094), _0x21a662 = Math["max"](_0x21a662, _0x5a39cc);
    }
  }
  if (!Number["isFinite"](_0x324c91)) return [0, 0, 0, 0];
  return [_0x324c91, _0x28e7c1, _0x317ca5, _0x21a662];
}
function featureName(_0x34066a, _0x4524d2) {
  const _0x3c471b = _0x34066a["properties"], _0x2e4e0c = _0x3c471b && typeof _0x3c471b["name"] === "string" ? _0x3c471b["name"] : "";
  return _0x2e4e0c || "feature-" + (_0x4524d2 + 1);
}
function writeShp(_0x2acb85) {
  const _0x3a1a3e = _0x2acb85["map"](recordBody), _0x1c5f29 = _0x3a1a3e["reduce"]((_0x5333ae, _0x4bbf92) => _0x5333ae + 8 + _0x4bbf92["length"], 0), _0x519d80 = new Uint8Array(100 + _0x1c5f29), _0x513d56 = new DataView(_0x519d80["buffer"]);
  writeHeader(_0x513d56, _0x519d80["length"], _0x2acb85);
  let _0x28d574 = 100;
  return _0x3a1a3e["forEach"]((_0x4ed888, _0x57272a) => {
    _0x513d56["setInt32"](_0x28d574, _0x57272a + 1, ![]), _0x513d56["setInt32"](_0x28d574 + 4, _0x4ed888["length"] / 2, ![]), _0x519d80["set"](_0x4ed888, _0x28d574 + 8), _0x28d574 += 8 + _0x4ed888["length"];
  }), _0x519d80;
}
function writeShx(_0x7619fc) {
  const _0x587aa6 = new Uint8Array(100 + _0x7619fc["length"] * 8), _0xe2abd8 = new DataView(_0x587aa6["buffer"]);
  writeHeader(_0xe2abd8, _0x587aa6["length"], _0x7619fc);
  let _0x27fdda = 50;
  return _0x7619fc["forEach"]((_0x48227b, _0xd9577e) => {
    const _0x149b91 = recordBody(_0x48227b)["length"] / 2;
    _0xe2abd8["setInt32"](100 + _0xd9577e * 8, _0x27fdda, ![]), _0xe2abd8["setInt32"](100 + _0xd9577e * 8 + 4, _0x149b91, ![]), _0x27fdda += 4 + _0x149b91;
  }), _0x587aa6;
}
function writeHeader(_0x55906a, _0x56b26b, _0x206a98) {
  var _a2;
  _0x55906a["setInt32"](0, 9994, ![]), _0x55906a["setInt32"](24, _0x56b26b / 2, ![]), _0x55906a["setInt32"](28, 1e3, !![]), _0x55906a["setInt32"](32, ((_a2 = _0x206a98[0]) == null ? void 0 : _a2["kind"]) ?? 5, !![]);
  const _0x30e4f4 = unionBbox(_0x206a98);
  _0x55906a["setFloat64"](36, _0x30e4f4[0], !![]), _0x55906a["setFloat64"](44, _0x30e4f4[1], !![]), _0x55906a["setFloat64"](52, _0x30e4f4[2], !![]), _0x55906a["setFloat64"](60, _0x30e4f4[3], !![]);
}
function unionBbox(_0x968ec5) {
  if (_0x968ec5["length"] === 0) return [0, 0, 0, 0];
  let _0xf43baa = Infinity, _0x4c868d = Infinity, _0x4ea19e = -Infinity, _0x56a1d0 = -Infinity;
  for (const _0x4ce32c of _0x968ec5) {
    _0xf43baa = Math["min"](_0xf43baa, _0x4ce32c["bbox"][0]), _0x4c868d = Math["min"](_0x4c868d, _0x4ce32c["bbox"][1]), _0x4ea19e = Math["max"](_0x4ea19e, _0x4ce32c["bbox"][2]), _0x56a1d0 = Math["max"](_0x56a1d0, _0x4ce32c["bbox"][3]);
  }
  return [_0xf43baa, _0x4c868d, _0x4ea19e, _0x56a1d0];
}
function xy(_0x2d0780) {
  return [_0x2d0780[0] ?? 0, _0x2d0780[1] ?? 0];
}
function recordBody(_0x564897) {
  var _a2;
  if (_0x564897["kind"] === 1) {
    const _0x1b5262 = new Uint8Array(20), _0x11147f = new DataView(_0x1b5262["buffer"]);
    _0x11147f["setInt32"](0, 1, !![]);
    const [_0x3e4811, _0x2ce45b] = xy(((_a2 = _0x564897["rings"][0]) == null ? void 0 : _a2[0]) ?? [0, 0]);
    return _0x11147f["setFloat64"](4, _0x3e4811, !![]), _0x11147f["setFloat64"](12, _0x2ce45b, !![]), _0x1b5262;
  }
  const _0x521e81 = _0x564897["rings"]["reduce"]((_0x153adc, _0xa27da0) => _0x153adc + _0xa27da0["length"], 0), _0x41ab05 = new Uint8Array(44 + _0x564897["rings"]["length"] * 4 + _0x521e81 * 16), _0x533f7a = new DataView(_0x41ab05["buffer"]);
  _0x533f7a["setInt32"](0, _0x564897["kind"], !![]), _0x533f7a["setFloat64"](4, _0x564897["bbox"][0], !![]), _0x533f7a["setFloat64"](12, _0x564897["bbox"][1], !![]), _0x533f7a["setFloat64"](20, _0x564897["bbox"][2], !![]), _0x533f7a["setFloat64"](28, _0x564897["bbox"][3], !![]), _0x533f7a["setInt32"](36, _0x564897["rings"]["length"], !![]), _0x533f7a["setInt32"](40, _0x521e81, !![]);
  let _0x206c74 = 0;
  _0x564897["rings"]["forEach"]((_0x3f9c49, _0x1a3a44) => {
    _0x533f7a["setInt32"](44 + _0x1a3a44 * 4, _0x206c74, !![]), _0x206c74 += _0x3f9c49["length"];
  });
  let _0x3c139e = 44 + _0x564897["rings"]["length"] * 4;
  for (const _0x1276eb of _0x564897["rings"]) {
    for (const _0x1ce021 of _0x1276eb) {
      const [_0x58369d, _0xc47c05] = xy(_0x1ce021);
      _0x533f7a["setFloat64"](_0x3c139e, _0x58369d, !![]), _0x533f7a["setFloat64"](_0x3c139e + 8, _0xc47c05, !![]), _0x3c139e += 16;
    }
  }
  return _0x41ab05;
}
function writeDbf(_0x1bed5b) {
  const _0x1d4a6f = 32 + 32 + 1, _0x323bd1 = 1 + 80, _0x4b001d = new Uint8Array(_0x1d4a6f + _0x1bed5b["length"] * _0x323bd1 + 1), _0x1ebcd4 = new DataView(_0x4b001d["buffer"]);
  _0x4b001d[0] = 3, _0x1ebcd4["setUint32"](4, _0x1bed5b["length"], !![]), _0x1ebcd4["setUint16"](8, _0x1d4a6f, !![]), _0x1ebcd4["setUint16"](10, _0x323bd1, !![]);
  const _0x170638 = new TextEncoder()["encode"]("NAME");
  _0x4b001d["set"](_0x170638, 32), _0x4b001d[32 + 11] = "C"["charCodeAt"](0), _0x4b001d[32 + 16] = 80, _0x4b001d[32 + 32] = 13;
  const _0x158bb9 = new TextEncoder();
  return _0x1bed5b["forEach"]((_0x227091, _0x13e981) => {
    const _0x43bcbf = _0x1d4a6f + _0x13e981 * _0x323bd1;
    _0x4b001d[_0x43bcbf] = 32;
    const _0x5adeea = _0x158bb9["encode"](_0x227091)["slice"](0, 80);
    _0x4b001d["set"](_0x5adeea, _0x43bcbf + 1);
    for (let _0x10e6d1 = 1 + _0x5adeea["length"]; _0x10e6d1 < _0x323bd1; _0x10e6d1++) _0x4b001d[_0x43bcbf + _0x10e6d1] = 32;
  }), _0x4b001d[_0x4b001d["length"] - 1] = 26, _0x4b001d;
}
function zipStore(_0x2c79cd) {
  const _0x566a51 = new TextEncoder(), _0x530730 = [], _0x4d2ed1 = [];
  let _0x1ad134 = 0;
  for (const _0x3560b6 of _0x2c79cd) {
    const _0x44caa3 = _0x566a51["encode"](_0x3560b6["name"]), _0x340807 = crc32(_0x3560b6["data"]), _0x3d28af = new Uint8Array(30 + _0x44caa3["length"] + _0x3560b6["data"]["length"]), _0x35af67 = new DataView(_0x3d28af["buffer"]);
    _0x35af67["setUint32"](0, 67324752, !![]), _0x35af67["setUint16"](4, 20, !![]), _0x35af67["setUint16"](8, 0, !![]), _0x35af67["setUint32"](14, _0x340807, !![]), _0x35af67["setUint32"](18, _0x3560b6["data"]["length"], !![]), _0x35af67["setUint32"](22, _0x3560b6["data"]["length"], !![]), _0x35af67["setUint16"](26, _0x44caa3["length"], !![]), _0x3d28af["set"](_0x44caa3, 30), _0x3d28af["set"](_0x3560b6["data"], 30 + _0x44caa3["length"]), _0x530730["push"](_0x3d28af);
    const _0xef8b33 = new Uint8Array(46 + _0x44caa3["length"]), _0x4044b7 = new DataView(_0xef8b33["buffer"]);
    _0x4044b7["setUint32"](0, 33639248, !![]), _0x4044b7["setUint16"](4, 20, !![]), _0x4044b7["setUint16"](6, 20, !![]), _0x4044b7["setUint16"](10, 0, !![]), _0x4044b7["setUint32"](16, _0x340807, !![]), _0x4044b7["setUint32"](20, _0x3560b6["data"]["length"], !![]), _0x4044b7["setUint32"](24, _0x3560b6["data"]["length"], !![]), _0x4044b7["setUint16"](28, _0x44caa3["length"], !![]), _0x4044b7["setUint32"](42, _0x1ad134, !![]), _0xef8b33["set"](_0x44caa3, 46), _0x4d2ed1["push"](_0xef8b33), _0x1ad134 += _0x3d28af["length"];
  }
  const _0x26f57a = _0x4d2ed1["reduce"]((_0x1c5eba, _0x36575d) => _0x1c5eba + _0x36575d["length"], 0), _0xf12175 = new Uint8Array(22), _0x2153f7 = new DataView(_0xf12175["buffer"]);
  return _0x2153f7["setUint32"](0, 101010256, !![]), _0x2153f7["setUint16"](8, _0x2c79cd["length"], !![]), _0x2153f7["setUint16"](10, _0x2c79cd["length"], !![]), _0x2153f7["setUint32"](12, _0x26f57a, !![]), _0x2153f7["setUint32"](16, _0x1ad134, !![]), concat([..._0x530730, ..._0x4d2ed1, _0xf12175]);
}
function crc32(_0x573984) {
  let _0x3be49e = 4294967295;
  for (const _0x4f5a65 of _0x573984) {
    _0x3be49e ^= _0x4f5a65;
    for (let _0x515c90 = 0; _0x515c90 < 8; _0x515c90++) {
      _0x3be49e = _0x3be49e >>> 1 ^ ((_0x3be49e & 1) === 1 ? 3988292384 : 0);
    }
  }
  return (_0x3be49e ^ 4294967295) >>> 0;
}
function concat(_0x5a807f) {
  const _0x498a64 = _0x5a807f["reduce"]((_0x1437bd, _0x5e3dec) => _0x1437bd + _0x5e3dec["length"], 0), _0x422b49 = new Uint8Array(_0x498a64);
  let _0x1d2742 = 0;
  for (const _0x4b9dbd of _0x5a807f) {
    _0x422b49["set"](_0x4b9dbd, _0x1d2742), _0x1d2742 += _0x4b9dbd["length"];
  }
  return _0x422b49;
}
function getLayerGeoJSON(_0x10e1b6, _0x289967, _0x302d0b) {
  if (!("entities" in _0x10e1b6["cesiumObject"])) return void 0;
  const _0x3d6220 = _0x10e1b6["cesiumObject"]["entities"]["values"]["filter"]((_0x28046c) => !_0x302d0b(_0x28046c))["map"]((_0x5b3c3c) => entityToGeoJSON(_0x5b3c3c, _0x289967))["filter"]((_0x27a46c) => _0x27a46c !== null);
  return { "type": "FeatureCollection", "features": _0x3d6220 };
}
function exportLayerVector(_0x58ab57, _0x13ab6a, _0x5ee0c4) {
  if (!_0x58ab57) return;
  const _0x392407 = vectorFile(_0x58ab57, _0x5ee0c4);
  triggerDownload(_0x392407["blob"], _0x13ab6a + "-" + Date["now"]() + "." + _0x392407["extension"]);
}
function exportLayerGeoJSON(_0x26e962, _0x374145) {
  exportLayerVector(_0x26e962, _0x374145, "geojson");
}
function exportLayerKml(_0x537ec4, _0x49f3f7) {
  exportLayerVector(_0x537ec4, _0x49f3f7, "kml");
}
function exportLayerShapefile(_0x463b9e, _0x111a01) {
  exportLayerVector(_0x463b9e, _0x111a01, "shp");
}
function bytesAsBuffer(_0xa8d6b6) {
  return _0xa8d6b6["buffer"]["slice"](_0xa8d6b6["byteOffset"], _0xa8d6b6["byteOffset"] + _0xa8d6b6["byteLength"]);
}
function vectorFile(_0x46a601, _0x4f8993) {
  if (_0x4f8993 === "kml") return { "blob": new Blob([featureCollectionToKml(_0x46a601)], { "type": "application/vnd.google-earth.kml+xml" }), "extension": "kml" };
  if (_0x4f8993 === "shp") return { "blob": new Blob([bytesAsBuffer(featureCollectionToShapefileZip(_0x46a601))], { "type": "application/zip" }), "extension": "zip" };
  return { "blob": new Blob([JSON["stringify"](_0x46a601, null, 2)], { "type": "application/geo+json" }), "extension": "geojson" };
}
const GEOTIFF_EXPORT_MAX_WMS_DIMENSION = 2048;
function geoTiffExportDimensions(_0x2b67c7, _0x56b090) {
  if (!_0x2b67c7) return { "width": _0x56b090, "height": Math["round"](_0x56b090 / 2) };
  const _0x30d2ee = Math["max"](_0x2b67c7["east"] - _0x2b67c7["west"], 1e-6), _0x30ab95 = Math["max"](_0x2b67c7["north"] - _0x2b67c7["south"], 1e-6), _0x571ca9 = _0x30d2ee >= _0x30ab95 ? _0x56b090 : Math["max"](64, Math["round"](_0x56b090 * _0x30d2ee / _0x30ab95)), _0x3fafd5 = _0x30ab95 >= _0x30d2ee ? _0x56b090 : Math["max"](64, Math["round"](_0x56b090 * _0x30ab95 / _0x30d2ee));
  return { "width": _0x571ca9, "height": _0x3fafd5 };
}
function buildWmsGeoTiffExportUrl(_0x26ac7, _0x99ba16) {
  const _0x349f13 = _0x99ba16("wms", _0x26ac7["url"]), { width: _0x2374d0, height: _0x4ad2d5 } = geoTiffExportDimensions(_0x26ac7["geographicBoundingBox"], GEOTIFF_EXPORT_MAX_WMS_DIMENSION), _0x43ec60 = _0x26ac7["geographicBoundingBox"], _0x5b632b = new URLSearchParams({ "SERVICE": "WMS", "REQUEST": "GetMap", "VERSION": "1.3.0", "LAYERS": _0x26ac7["layers"], "STYLES": "", "FORMAT": _0x26ac7["tiffFormat"], "TRANSPARENT": "false", "WIDTH": String(_0x2374d0), "HEIGHT": String(_0x4ad2d5), "CRS": "CRS:84", "BBOX": _0x43ec60 ? _0x43ec60["west"] + "," + _0x43ec60["south"] + "," + _0x43ec60["east"] + "," + _0x43ec60["north"] : "-180,-90,180,90" }), _0x3a095e = _0x349f13["includes"]("?") ? "&" : "?";
  return "" + _0x349f13 + _0x3a095e + _0x5b632b["toString"]();
}
function buildWcsGeoTiffExportUrl(_0x5d8af5, _0x2f9e6a) {
  const _0x37dab5 = _0x2f9e6a("wcs", _0x5d8af5["url"]), _0x397c5c = _0x5d8af5["version"] ?? "2.0.1", _0x5559c4 = { "service": "WCS", "version": _0x397c5c, "request": "GetCoverage", "coverageId": _0x5d8af5["coverageId"], "format": _0x5d8af5["tiffFormat"] };
  if (_0x397c5c["startsWith"]("2.")) {
    const _0x1e73ca = _0x5d8af5["maxSize"] ?? 2048;
    if (Number["isFinite"](_0x1e73ca)) _0x5559c4["SCALESIZE"] = "x(" + _0x1e73ca + "),y(" + _0x1e73ca + ")";
  }
  const _0x4ba425 = _0x37dab5["includes"]("?") ? "&" : "?";
  return "" + _0x37dab5 + _0x4ba425 + new URLSearchParams(_0x5559c4)["toString"]();
}
function isGeoTiffExportAvailable(_0x22acea, _0x3411c8) {
  if (!_0x22acea || _0x22acea["layerType"] !== "WMS" && _0x22acea["layerType"] !== "WCS") return ![];
  return !!_0x3411c8 && "tiffFormat" in _0x3411c8 && !!_0x3411c8["tiffFormat"];
}
async function exportLayerAsGeoTiff(_0x1c347b, _0x55e089, _0x4a5f7c, _0x589660, _0x56a84f) {
  if (_0x1c347b["layerType"] !== "WMS" && _0x1c347b["layerType"] !== "WCS") throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", 'Katman WMS/WCS değil, GeoTIFF export desteklenmiyor: "' + _0x1c347b["id"] + '"');
  if (!_0x55e089 || !("tiffFormat" in _0x55e089) || !_0x55e089["tiffFormat"]) throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", 'Katman GeoTIFF export desteklemiyor: "' + _0x1c347b["id"] + '"');
  const _0x37d4e1 = _0x1c347b["layerType"] === "WMS" ? buildWmsGeoTiffExportUrl(_0x55e089, _0x589660) : buildWcsGeoTiffExportUrl(_0x55e089, _0x589660), _0x5670ad = _0x56a84f["mergeApiKeyHeader"](_0x56a84f["buildAuthHeaders"](_0x55e089["authToken"]), _0x37d4e1), _0x39d508 = await fetch(_0x37d4e1, _0x5670ad ? { "headers": _0x5670ad } : void 0);
  if (!_0x39d508["ok"]) throw new OgcRequestError("OGC_GEOTIFF_DOWNLOAD_FAILED", "GeoTIFF indirilemedi: " + _0x39d508["status"] + " " + _0x39d508["statusText"]);
  const _0x3581c8 = _0x39d508["headers"]["get"]("content-type") ?? "", _0x490f78 = await _0x39d508["arrayBuffer"](), _0x14749e = /boundary="?([^";]+)"?/i["exec"](_0x3581c8);
  let _0x51f8ad;
  if (_0x3581c8["includes"]("multipart/") && _0x14749e) {
    const { bytes: _0x143daa, mimeType: _0x952701 } = extractMultipartImage(new Uint8Array(_0x490f78), _0x14749e[1]), _0x2c1ed7 = _0x143daa["buffer"]["slice"](_0x143daa["byteOffset"], _0x143daa["byteOffset"] + _0x143daa["byteLength"]);
    _0x51f8ad = new Blob([_0x2c1ed7], { "type": _0x952701 });
  } else _0x51f8ad = new Blob([_0x490f78], { "type": _0x3581c8 || _0x55e089["tiffFormat"] });
  triggerDownload(_0x51f8ad, _0x4a5f7c + "-" + Date["now"]() + ".tif");
}
function extractMultipartImage(_0x5a1701, _0x4f96bf) {
  var _a2;
  const _0x576de9 = new TextDecoder("iso-8859-1")["decode"](_0x5a1701), _0x2b5ec5 = "--" + _0x4f96bf;
  let _0x56bdf1 = 0;
  while (_0x56bdf1 < _0x576de9["length"]) {
    const _0x419449 = _0x576de9["indexOf"](_0x2b5ec5, _0x56bdf1);
    if (_0x419449 === -1) break;
    const _0x369cd3 = _0x419449 + _0x2b5ec5["length"], _0x2c2c79 = _0x576de9["indexOf"](_0x2b5ec5, _0x369cd3);
    if (_0x2c2c79 === -1) break;
    const _0x40bd02 = _0x576de9["indexOf"]("\r\n\r\n", _0x369cd3), _0x291b87 = _0x576de9["indexOf"]("\n\n", _0x369cd3), _0x8a3d46 = _0x40bd02 !== -1 && (_0x291b87 === -1 || _0x40bd02 <= _0x291b87) ? _0x40bd02 : _0x291b87, _0x2b4d5b = _0x8a3d46 === _0x40bd02 ? 4 : 2;
    if (_0x8a3d46 === -1 || _0x8a3d46 >= _0x2c2c79) {
      _0x56bdf1 = _0x2c2c79;
      continue;
    }
    const _0x59ac5f = /content-type:\s*([^\r\n;]+)/i["exec"](_0x576de9["slice"](_0x369cd3, _0x8a3d46)), _0x59f367 = (_a2 = _0x59ac5f == null ? void 0 : _0x59ac5f[1]) == null ? void 0 : _a2["trim"]();
    if (_0x59f367 == null ? void 0 : _0x59f367["startsWith"]("image/")) {
      const _0x4273a5 = _0x8a3d46 + _0x2b4d5b;
      let _0x469c88 = _0x2c2c79;
      if (_0x576de9[_0x469c88 - 2] === "\r" && _0x576de9[_0x469c88 - 1] === "\n") _0x469c88 -= 2;
      else {
        if (_0x576de9[_0x469c88 - 1] === "\n") _0x469c88 -= 1;
      }
      return { "bytes": _0x5a1701["slice"](_0x4273a5, _0x469c88), "mimeType": _0x59f367 };
    }
    _0x56bdf1 = _0x2c2c79;
  }
  throw new OgcRequestError("OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "Multipart WCS yanıtında görsel parçası bulunamadı.");
}
const POLE_SLICE_DEGREES = 90, POLE_LATITUDE_LIMIT = 89.9;
function clipRingToLongitude(_0x2c00e8, _0x156744, _0x22da9b) {
  const _0x22dece = (_0x1446a7) => _0x22da9b * (_0x1446a7[0] - _0x156744) >= 0, _0x2dad49 = [], _0x116e38 = (_0x58b244) => {
    const _0x2eef94 = _0x2dad49[_0x2dad49["length"] - 1];
    if (_0x2eef94 === void 0 || _0x2eef94[0] !== _0x58b244[0] || _0x2eef94[1] !== _0x58b244[1]) _0x2dad49["push"]([_0x58b244[0], _0x58b244[1]]);
  };
  for (let _0x5d0f07 = 0; _0x5d0f07 < _0x2c00e8["length"] - 1; _0x5d0f07++) {
    const _0x400f01 = _0x2c00e8[_0x5d0f07], _0x17370a = _0x2c00e8[_0x5d0f07 + 1];
    if (_0x22dece(_0x400f01)) _0x116e38(_0x400f01);
    if (_0x22dece(_0x400f01) !== _0x22dece(_0x17370a)) {
      const _0x5c4aae = (_0x156744 - _0x400f01[0]) / (_0x17370a[0] - _0x400f01[0]);
      _0x116e38([_0x156744, _0x400f01[1] + _0x5c4aae * (_0x17370a[1] - _0x400f01[1])]);
    }
  }
  if (_0x2dad49["length"] > 0) _0x116e38(_0x2dad49[0]);
  return _0x2dad49;
}
const _OutlineGeometry = class _OutlineGeometry {
  constructor(_0x92da28) {
    this["outlineCompanionEntities"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithOutlineCompanion"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithRiskyOutline"] = /* @__PURE__ */ new WeakSet(), this["getCurrentTime"] = _0x92da28["getCurrentTime"];
  }
  ["isOutlineCompanion"](_0x161b0d) {
    return this["outlineCompanionEntities"]["has"](_0x161b0d);
  }
  ["hasOutlineCompanion"](_0x445ba9) {
    return this["entitiesWithOutlineCompanion"]["has"](_0x445ba9);
  }
  ["hasRiskyOutline"](_0x38bc20) {
    return this["entitiesWithRiskyOutline"]["has"](_0x38bc20);
  }
  ["addPolygonOutlines"](_0x5ac705, _0x2a789c, _0x273d85) {
    const _0x2b8760 = _0x5ac705["entities"]["values"]["filter"]((_0x560413) => _0x560413["polygon"] !== void 0 && !this["entitiesWithRiskyOutline"]["has"](_0x560413));
    _0x5ac705["entities"]["suspendEvents"]();
    for (const _0x59130c of _0x2b8760) {
      this["addPolygonOutlineCompanion"](_0x5ac705, _0x59130c, _0x2a789c, _0x273d85, !![]);
    }
    _0x5ac705["entities"]["resumeEvents"]();
  }
  ["addPolygonOutlineCompanion"](_0x508e34, _0x3f22b8, _0x4f7736, _0x32d621, _0x391018) {
    var _a2;
    const _0x31f2f6 = this["getCurrentTime"](), _0x4bc2a8 = (_a2 = _0x3f22b8["polygon"]["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x31f2f6), _0x28e4ac = _0x4bc2a8 == null ? void 0 : _0x4bc2a8["positions"], _0x1bfd91 = _0x28e4ac == null ? void 0 : _0x28e4ac[0];
    if (_0x28e4ac === void 0 || _0x28e4ac["length"] < 2 || _0x1bfd91 === void 0) return;
    _0x3f22b8["polygon"]["outline"] = new ConstantProperty(![]), this["entitiesWithOutlineCompanion"]["add"](_0x3f22b8);
    const _0x3c75d5 = _OutlineGeometry["simplifyOutlinePositions"]([..._0x28e4ac, _0x1bfd91]), _0x2d94da = _0x508e34["entities"]["add"]({ "id": _0x3f22b8["id"] + "::outline", "polyline": { "positions": _0x3c75d5, "clampToGround": _0x391018, "width": _0x32d621, "material": _0x4f7736 } });
    this["outlineCompanionEntities"]["add"](_0x2d94da), _0x2d94da["properties"] = new PropertyBag({ "__tucbsOutlineOf": _0x3f22b8["id"] });
  }
  ["disableRiskyPolygonOutlines"](_0x1776ac) {
    var _a2, _b;
    const _0x489a80 = JulianDate["now"]();
    _0x1776ac["entities"]["suspendEvents"]();
    for (const _0x4408b0 of [..._0x1776ac["entities"]["values"]]) {
      const _0x349b6e = _0x4408b0["polygon"], _0x34280d = (_a2 = _0x349b6e == null ? void 0 : _0x349b6e["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x489a80);
      if (_0x349b6e !== void 0 && this["risksAntimeridianOrPoleBug"](_0x34280d == null ? void 0 : _0x34280d["positions"])) {
        _0x349b6e["outline"] = new ConstantProperty(![]), this["entitiesWithRiskyOutline"]["add"](_0x4408b0);
        if (_0x34280d !== void 0 && this["splitPoleEnclosingPolygon"](_0x1776ac, _0x4408b0, _0x34280d, _0x489a80)) continue;
        _0x349b6e["height"] === void 0 && ((_b = _0x349b6e["perPositionHeight"]) == null ? void 0 : _b["getValue"](_0x489a80)) !== !![] && (_0x349b6e["height"] = new ConstantProperty(0));
      }
    }
    _0x1776ac["entities"]["resumeEvents"]();
  }
  ["splitPoleEnclosingPolygon"](_0x135fc9, _0x3c7fdc, _0x3ac8da, _0x4f0f28) {
    var _a2;
    const _0xf9bf09 = _0x3c7fdc["polygon"];
    if (_0xf9bf09 === void 0 || _0x3ac8da["holes"]["length"] > 0) return ![];
    const _0x1c01d6 = _0x3ac8da["positions"]["map"]((_0x3c5416) => {
      const _0x309622 = Cartographic["fromCartesian"](_0x3c5416);
      return [_0x33fcf2["toDegrees"](_0x309622["longitude"]), _0x33fcf2["toDegrees"](_0x309622["latitude"])];
    });
    let _0x4bbc6b = Infinity, _0x1448b5 = -Infinity;
    for (let _0x28534f = 0; _0x28534f < _0x1c01d6["length"]; _0x28534f++) {
      const [_0x43ff84] = _0x1c01d6[_0x28534f];
      if (_0x28534f > 0 && Math["abs"](_0x43ff84 - _0x1c01d6[_0x28534f - 1][0]) > 180) return ![];
      _0x4bbc6b = Math["min"](_0x4bbc6b, _0x43ff84), _0x1448b5 = Math["max"](_0x1448b5, _0x43ff84);
    }
    if (_0x1448b5 - _0x4bbc6b < 359) return ![];
    const _0x2fe228 = [..._0x1c01d6, _0x1c01d6[0]]["map"](([_0xcfb638, _0x3cc394]) => [_0xcfb638, Math["max"](-POLE_LATITUDE_LIMIT, Math["min"](POLE_LATITUDE_LIMIT, _0x3cc394))]), _0x39d4ab = [];
    for (let _0x1eefa4 = -180; _0x1eefa4 < 180; _0x1eefa4 += POLE_SLICE_DEGREES) {
      const _0x388df3 = clipRingToLongitude(clipRingToLongitude(_0x2fe228, _0x1eefa4, 1), _0x1eefa4 + POLE_SLICE_DEGREES, -1)["slice"](0, -1);
      if (_0x388df3["length"] >= 3) _0x39d4ab["push"](Cartesian3["fromDegreesArray"](_0x388df3["flat"]()));
    }
    if (_0x39d4ab["length"] === 0) return ![];
    const _0x3237e1 = (_a2 = _0x3c7fdc["properties"]) == null ? void 0 : _a2["getValue"](_0x4f0f28);
    return _0x39d4ab["forEach"]((_0x2b8793, _0x2efa91) => {
      const _0x15cf60 = new ConstantProperty(new PolygonHierarchy(_0x2b8793));
      if (_0x2efa91 === 0) {
        _0xf9bf09["hierarchy"] = _0x15cf60;
        return;
      }
      const _0x16dee9 = _0xf9bf09["clone"]();
      _0x16dee9["hierarchy"] = _0x15cf60;
      const _0x1b067e = _0x135fc9["entities"]["add"]({ "id": _0x3c7fdc["id"] + "::part-" + _0x2efa91, ..._0x3c7fdc["name"] !== void 0 ? { "name": _0x3c7fdc["name"] } : {}, "polygon": _0x16dee9 });
      if (_0x3237e1 !== void 0) _0x1b067e["properties"] = new PropertyBag(_0x3237e1);
      this["entitiesWithRiskyOutline"]["add"](_0x1b067e);
    }), !![];
  }
  ["risksAntimeridianOrPoleBug"](_0x5689dc) {
    if (!_0x5689dc || _0x5689dc["length"] < 2) return ![];
    let _0x324258;
    for (const _0x3fe4ed of _0x5689dc) {
      const _0x4a91e1 = Cartographic["fromCartesian"](_0x3fe4ed), _0xb7343e = _0x33fcf2["toDegrees"](_0x4a91e1["latitude"]);
      if (Math["abs"](_0xb7343e) > 89) return !![];
      const _0x497ce1 = _0x33fcf2["toDegrees"](_0x4a91e1["longitude"]);
      if (_0x324258 !== void 0 && Math["abs"](_0x497ce1 - _0x324258) > 180) return !![];
      _0x324258 = _0x497ce1;
    }
    return ![];
  }
  ["flattenSuspiciousGeometry"](_0x194251) {
    _0x194251["entities"]["suspendEvents"]();
    for (const _0x586e4b of _0x194251["entities"]["values"]) {
      if (_0x586e4b["polygon"] !== void 0) _0x586e4b["polygon"]["granularity"] = new ConstantProperty(Math["PI"]);
      if (_0x586e4b["polyline"] !== void 0) _0x586e4b["polyline"]["granularity"] = new ConstantProperty(Math["PI"]);
    }
    _0x194251["entities"]["resumeEvents"]();
  }
  static ["douglasPeucker"](_0x3c9d3a, _0x1b5541) {
    const _0x45602e = new Array(_0x3c9d3a["length"])["fill"](![]);
    _0x45602e[0] = !![], _0x45602e[_0x3c9d3a["length"] - 1] = !![];
    const _0x294fbd = [[0, _0x3c9d3a["length"] - 1]];
    while (_0x294fbd["length"] > 0) {
      const [_0xf1364d, _0x44254d] = _0x294fbd["pop"]();
      if (_0x44254d <= _0xf1364d + 1) continue;
      let _0x194284 = -1, _0x581e6f = -1;
      for (let _0x190f0c = _0xf1364d + 1; _0x190f0c < _0x44254d; _0x190f0c++) {
        const _0x3f3feb = _OutlineGeometry["perpendicularDistance"](_0x3c9d3a[_0x190f0c], _0x3c9d3a[_0xf1364d], _0x3c9d3a[_0x44254d]);
        _0x3f3feb > _0x194284 && (_0x194284 = _0x3f3feb, _0x581e6f = _0x190f0c);
      }
      _0x194284 > _0x1b5541 && (_0x45602e[_0x581e6f] = !![], _0x294fbd["push"]([_0xf1364d, _0x581e6f], [_0x581e6f, _0x44254d]));
    }
    return _0x3c9d3a["filter"]((_0x4ea206, _0x227abb) => _0x45602e[_0x227abb]);
  }
  static ["perpendicularDistance"](_0x42b34a, _0x45bd30, _0xdaa12e) {
    const _0x3bbd2c = Cartesian3["subtract"](_0xdaa12e, _0x45bd30, new Cartesian3()), _0x1827fa = Cartesian3["magnitudeSquared"](_0x3bbd2c);
    if (_0x1827fa === 0) return Cartesian3["distance"](_0x42b34a, _0x45bd30);
    const _0x8d288e = Cartesian3["subtract"](_0x42b34a, _0x45bd30, new Cartesian3()), _0xbf4179 = _0x33fcf2["clamp"](Cartesian3["dot"](_0x8d288e, _0x3bbd2c) / _0x1827fa, 0, 1), _0x999a26 = Cartesian3["add"](_0x45bd30, Cartesian3["multiplyByScalar"](_0x3bbd2c, _0xbf4179, _0x3bbd2c), _0x3bbd2c);
    return Cartesian3["distance"](_0x42b34a, _0x999a26);
  }
  static ["uniformDecimate"](_0x55ff41, _0x1a303f) {
    if (_0x55ff41["length"] <= _0x1a303f) return [..._0x55ff41];
    const _0x2b3f63 = (_0x55ff41["length"] - 1) / (_0x1a303f - 1);
    return Array["from"]({ "length": _0x1a303f }, (_0x23453a, _0x556307) => _0x55ff41[Math["round"](_0x556307 * _0x2b3f63)]);
  }
  static ["polygonExtentMeters"](_0x4cf683) {
    let _0xa015d5 = Infinity, _0x10f555 = Infinity, _0x6f11df = Infinity, _0x36b18a = -Infinity, _0x5aaff9 = -Infinity, _0x4a8d8b = -Infinity;
    for (const _0x581439 of _0x4cf683) {
      if (_0x581439["x"] < _0xa015d5) _0xa015d5 = _0x581439["x"];
      if (_0x581439["x"] > _0x36b18a) _0x36b18a = _0x581439["x"];
      if (_0x581439["y"] < _0x10f555) _0x10f555 = _0x581439["y"];
      if (_0x581439["y"] > _0x5aaff9) _0x5aaff9 = _0x581439["y"];
      if (_0x581439["z"] < _0x6f11df) _0x6f11df = _0x581439["z"];
      if (_0x581439["z"] > _0x4a8d8b) _0x4a8d8b = _0x581439["z"];
    }
    return Math["sqrt"]((_0x36b18a - _0xa015d5) ** 2 + (_0x5aaff9 - _0x10f555) ** 2 + (_0x4a8d8b - _0x6f11df) ** 2);
  }
  static ["simplifyOutlinePositions"](_0x4cbb34) {
    const _0x5af5ae = _OutlineGeometry["polygonExtentMeters"](_0x4cbb34), _0x4deb5e = _0x33fcf2["clamp"](_0x5af5ae * _OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"], _OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"], _OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"]), _0x2911b3 = _OutlineGeometry["douglasPeucker"](_0x4cbb34, _0x4deb5e);
    return _0x2911b3["length"] > _OutlineGeometry["OUTLINE_MAX_VERTICES"] ? _OutlineGeometry["uniformDecimate"](_0x2911b3, _OutlineGeometry["OUTLINE_MAX_VERTICES"]) : _0x2911b3;
  }
};
_OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"] = 7e-5;
_OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"] = 0.25;
_OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"] = 150;
_OutlineGeometry["OUTLINE_MAX_VERTICES"] = 1200;
let OutlineGeometry = _OutlineGeometry;
class OpacityController {
  constructor(_0x1cc424) {
    this["dataSourceOpacityStates"] = /* @__PURE__ */ new WeakMap(), this["dataSourceOpacityProperties"] = /* @__PURE__ */ new WeakMap(), this["requestRender"] = _0x1cc424["requestRender"];
  }
  ["getWrappedBaseColor"](_0x370570) {
    return this["dataSourceOpacityProperties"]["get"](_0x370570);
  }
  ["prepareDataSourceOpacity"](_0xf8b75e) {
    var _a2, _b;
    const _0x4ca8a8 = this["getDataSourceOpacityState"](_0xf8b75e), _0x58c402 = JulianDate["now"]();
    _0xf8b75e["entities"]["suspendEvents"]();
    for (const _0x6f7f7d of _0xf8b75e["entities"]["values"]) {
      if (((_a2 = _0x6f7f7d["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty) {
        const _0x94cc6a = _0x6f7f7d["polygon"]["material"];
        this["installOpacityColorProperty"](_0x94cc6a["color"], _0x4ca8a8, _0x58c402, new Color(1, 1, 1, 0.5), (_0x597464) => _0x94cc6a["color"] = _0x597464);
      }
      if (((_b = _0x6f7f7d["polyline"]) == null ? void 0 : _b["material"]) instanceof ColorMaterialProperty) {
        const _0x1c824b = _0x6f7f7d["polyline"]["material"];
        this["installOpacityColorProperty"](_0x1c824b["color"], _0x4ca8a8, _0x58c402, Color["WHITE"], (_0x2cf263) => _0x1c824b["color"] = _0x2cf263);
      }
      _0x6f7f7d["point"] !== void 0 && this["installOpacityColorProperty"](_0x6f7f7d["point"]["color"], _0x4ca8a8, _0x58c402, Color["WHITE"], (_0x3cfe70) => _0x6f7f7d["point"]["color"] = _0x3cfe70), _0x6f7f7d["billboard"] !== void 0 && this["installOpacityColorProperty"](_0x6f7f7d["billboard"]["color"], _0x4ca8a8, _0x58c402, Color["WHITE"], (_0x319076) => _0x6f7f7d["billboard"]["color"] = _0x319076);
    }
    _0xf8b75e["entities"]["resumeEvents"]();
  }
  ["ensureDynamicFillColor"](_0x51ba7b, _0x2399af) {
    var _a2;
    if (!(((_a2 = _0x2399af["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty)) return;
    const _0x1c5ba3 = this["getDataSourceOpacityState"](_0x51ba7b), _0x325288 = _0x2399af["polygon"]["material"];
    this["installOpacityColorProperty"](_0x325288["color"], _0x1c5ba3, JulianDate["now"](), new Color(1, 1, 1, 0.5), (_0x5f4b18) => _0x325288["color"] = _0x5f4b18);
  }
  ["setDataSourceOpacity"](_0x595ef8, _0x4c0777) {
    const _0x3f77ab = this["getDataSourceOpacityState"](_0x595ef8);
    if (_0x3f77ab["opacity"] === _0x4c0777) return;
    _0x3f77ab["opacity"] = _0x4c0777, !_0x3f77ab["wrapped"] && _0x4c0777 !== 1 && (this["prepareDataSourceOpacity"](_0x595ef8), _0x3f77ab["wrapped"] = !![]), this["requestRender"]();
  }
  ["getDataSourceOpacityState"](_0x50ea32) {
    let _0x1453d0 = this["dataSourceOpacityStates"]["get"](_0x50ea32);
    return _0x1453d0 === void 0 && (_0x1453d0 = { "opacity": 1, "wrapped": ![] }, this["dataSourceOpacityStates"]["set"](_0x50ea32, _0x1453d0)), _0x1453d0;
  }
  ["installOpacityColorProperty"](_0x1b0acf, _0x31f7da, _0x381136, _0x1dfba0, _0x21b8c3) {
    if (_0x1b0acf !== void 0 && this["dataSourceOpacityProperties"]["has"](_0x1b0acf)) return;
    const _0xc911da = this["readColorProperty"](_0x1b0acf, _0x381136, _0x1dfba0), _0x5c9490 = this["createOpacityColorProperty"](_0xc911da, _0x31f7da);
    _0x21b8c3(_0x5c9490);
  }
  ["readColorProperty"](_0x1ef8c0, _0x4be5ca, _0x5c35aa) {
    const _0x38d9f6 = _0x1ef8c0 == null ? void 0 : _0x1ef8c0["getValue"](_0x4be5ca);
    return _0x38d9f6 instanceof Color ? Color["clone"](_0x38d9f6, new Color()) : Color["clone"](_0x5c35aa, new Color());
  }
  ["createOpacityColorProperty"](_0x1f7707, _0x1e4617) {
    const _0x4e4a06 = Color["clone"](_0x1f7707, new Color()), _0x159fd5 = new CallbackProperty((_0x36f3de, _0x489433) => {
      const _0x1ab433 = _0x489433 instanceof Color ? _0x489433 : new Color();
      return _0x1ab433["red"] = _0x4e4a06["red"], _0x1ab433["green"] = _0x4e4a06["green"], _0x1ab433["blue"] = _0x4e4a06["blue"], _0x1ab433["alpha"] = _0x4e4a06["alpha"] * _0x1e4617["opacity"], _0x1ab433;
    }, ![]);
    return this["dataSourceOpacityProperties"]["set"](_0x159fd5, _0x4e4a06), _0x159fd5;
  }
}
const _CameraHighlight = class _CameraHighlight {
  constructor(_0x202a8d, _0xf43f80) {
    this["viewer"] = _0x202a8d, this["deps"] = _0xf43f80;
  }
  async ["zoomToLayer"](_0x5e9d3d) {
    const _0x43c4c9 = this["deps"]["requireLayer"](_0x5e9d3d);
    return this["viewer"]["zoomTo"](_0x43c4c9["cesiumObject"], new HeadingPitchRange(0, -_0x33fcf2["PI_OVER_TWO"], 0));
  }
  async ["zoomToEntity"](_0x5be0b4, _0x4ab1cb) {
    var _a2, _b;
    const _0x176021 = this["viewer"]["clock"]["currentTime"];
    let _0x5c1503;
    if (((_a2 = _0x5be0b4["polygon"]) == null ? void 0 : _a2["hierarchy"]) !== void 0) {
      const _0x4a35e6 = _0x5be0b4["polygon"]["hierarchy"]["getValue"](_0x176021);
      _0x5c1503 = _0x4a35e6 == null ? void 0 : _0x4a35e6["positions"];
    } else ((_b = _0x5be0b4["polyline"]) == null ? void 0 : _b["positions"]) !== void 0 && (_0x5c1503 = _0x5be0b4["polyline"]["positions"]["getValue"](_0x176021));
    if (_0x5c1503 !== void 0 && _0x5c1503["length"] > 0) {
      const _0x691221 = BoundingSphere["fromPoints"](_0x5c1503), _0x19c50c = Math["max"](_0x691221["radius"] * 2, 50);
      return new Promise((_0x1341d1) => {
        this["viewer"]["camera"]["flyToBoundingSphere"](_0x691221, { "offset": new HeadingPitchRange(0, -_0x33fcf2["PI_OVER_TWO"], _0x19c50c), ...(_0x4ab1cb == null ? void 0 : _0x4ab1cb["duration"]) !== void 0 ? { "duration": _0x4ab1cb["duration"] } : {}, "complete": () => _0x1341d1(!![]), "cancel": () => _0x1341d1(![]) });
      });
    }
    return this["viewer"]["zoomTo"](_0x5be0b4, new HeadingPitchRange(0, -_0x33fcf2["PI_OVER_TWO"], 0));
  }
  static ["elevate"](_0x59712e, _0x236e0d) {
    return _0x59712e["map"]((_0x5749e0) => {
      const _0x473c71 = Cartographic["fromCartesian"](_0x5749e0);
      return Cartesian3["fromRadians"](_0x473c71["longitude"], _0x473c71["latitude"], _0x473c71["height"] + _0x236e0d);
    });
  }
  ["highlightEntity"](_0x4ed617) {
    var _a2, _b, _c;
    const _0x50a04e = this["viewer"]["clock"]["currentTime"], _0x1ab5c2 = (_a2 = _0x4ed617["properties"]) == null ? void 0 : _a2["getValue"](_0x50a04e), _0x329b6c = _0x1ab5c2 == null ? void 0 : _0x1ab5c2["layerId"], _0xb9c87c = _0x329b6c !== void 0 ? this["deps"]["getLayerStyle"](_0x329b6c) : void 0, _0x3ccc3a = _CameraHighlight["HIGHLIGHT_COLOR"], _0x1dc030 = ((_0xb9c87c == null ? void 0 : _0xb9c87c["outline"]["width"]) ?? 2) + 4, _0x339bcc = new ColorMaterialProperty(_0x3ccc3a), _0x1db632 = new Entity();
    if (((_b = _0x4ed617["polygon"]) == null ? void 0 : _b["hierarchy"]) !== void 0) {
      const _0x412e48 = _0x4ed617["polygon"]["hierarchy"]["getValue"](_0x50a04e), _0x454911 = _0x412e48 == null ? void 0 : _0x412e48["positions"];
      if (_0x454911 === void 0 || _0x454911["length"] < 2) return;
      const _0x1ada82 = Cartesian3["equals"](_0x454911[0], _0x454911[_0x454911["length"] - 1]) ? _0x454911 : [..._0x454911, _0x454911[0]];
      _0x1db632["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x1ada82, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x1dc030, "material": _0x339bcc, "depthFailMaterial": _0x339bcc });
    } else {
      if (((_c = _0x4ed617["polyline"]) == null ? void 0 : _c["positions"]) !== void 0) {
        const _0x24c0a7 = _0x4ed617["polyline"]["positions"]["getValue"](_0x50a04e);
        if (_0x24c0a7 === void 0 || _0x24c0a7["length"] < 2) return;
        _0x1db632["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x24c0a7, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x1dc030, "material": _0x339bcc, "depthFailMaterial": _0x339bcc });
      } else {
        if (_0x4ed617["position"] !== void 0) {
          const _0x3467ff = _0x4ed617["position"]["getValue"](_0x50a04e);
          if (_0x3467ff === void 0) return;
          _0x1db632["position"] = new ConstantPositionProperty(_0x3467ff), _0x1db632["point"] = new PointGraphics({ "pixelSize": _0x1dc030 + 12, "color": _0x3ccc3a, "disableDepthTestDistance": Number["POSITIVE_INFINITY"] });
        } else return;
      }
    }
    !this["highlightDataSource"] ? (this["highlightDataSource"] = new CustomDataSource("__tucbs_highlight__"), void this["viewer"]["dataSources"]["add"](this["highlightDataSource"])) : this["highlightDataSource"]["entities"]["removeAll"](), this["highlightDataSource"]["entities"]["add"](_0x1db632);
  }
  ["clearHighlight"]() {
    var _a2;
    (_a2 = this["highlightDataSource"]) == null ? void 0 : _a2["entities"]["removeAll"]();
  }
};
_CameraHighlight["HIGHLIGHT_COLOR"] = Color["fromCssColorString"]("#00FFFF");
_CameraHighlight["HIGHLIGHT_ELEVATION_METERS"] = 0.5;
let CameraHighlight = _CameraHighlight;
const SEAM_COVER_WIDTH = 1, OUTLINE_ID_SUFFIX = "::outline";
class LayerStyleEngine {
  constructor(_0x5ee0a7) {
    this["appliedLayerStyles"] = /* @__PURE__ */ new Map(), this["appliedCompanionWidths"] = /* @__PURE__ */ new Map(), this["outlineGeometry"] = _0x5ee0a7["outlineGeometry"], this["opacityController"] = _0x5ee0a7["opacityController"], this["getCurrentTime"] = _0x5ee0a7["getCurrentTime"], this["requestRender"] = _0x5ee0a7["requestRender"], this["emitStyle"] = _0x5ee0a7["emitStyle"], this["waitForRenderSettle"] = _0x5ee0a7["waitForRenderSettle"];
  }
  async ["applyLayerStyle"](_0x53c205, _0x5b62db, _0x4d9349, _0x1d2bba) {
    var _a2;
    const _0x1f34d3 = this["appliedCompanionWidths"]["get"](_0x53c205) ?? ((_a2 = this["appliedLayerStyles"]["get"](_0x53c205)) == null ? void 0 : _a2["outline"]["width"]), _0x520c4d = this["getCurrentTime"](), _0x5b6ed0 = this["resolveStyleRange"](_0x5b62db, _0x520c4d, _0x1d2bba["fill"]), _0x39292b = [], _0x1bd7ab = /* @__PURE__ */ new Map();
    _0x5b62db["entities"]["suspendEvents"]();
    for (const _0x19f061 of _0x5b62db["entities"]["values"]) {
      if (this["outlineGeometry"]["isOutlineCompanion"](_0x19f061)) {
        _0x39292b["push"](_0x19f061);
        continue;
      }
      const _0x5748ff = this["resolveFillColor"](_0x19f061, _0x1d2bba["fill"], _0x5b6ed0, _0x520c4d);
      if (_0x19f061["polygon"] !== void 0 && _0x5748ff !== void 0) _0x1bd7ab["set"](_0x19f061["id"], _0x5748ff);
      this["applyEntityStyle"](_0x19f061, _0x5748ff, _0x1d2bba["outline"], _0x4d9349);
    }
    const _0x161130 = this["styleOutlineCompanions"](_0x39292b, _0x1d2bba["outline"], _0x4d9349, _0x1bd7ab);
    _0x5b62db["entities"]["resumeEvents"]();
    const _0xbc83a5 = _0x5b6ed0 !== null && (_0x1d2bba["fill"]["mode"] === "gradient" || _0x1d2bba["fill"]["mode"] === "bin") ? { ..._0x1d2bba, "fill": { ..._0x1d2bba["fill"], "min": _0x5b6ed0["min"], "max": _0x5b6ed0["max"] } } : _0x1d2bba;
    this["appliedLayerStyles"]["set"](_0x53c205, _0xbc83a5), this["requestRender"](), this["emitStyle"](_0x53c205, _0xbc83a5), this["appliedCompanionWidths"]["set"](_0x53c205, _0x161130);
    const _0x5d69ae = _0x1f34d3 === void 0 || _0x1f34d3 !== _0x161130;
    if (_0x5d69ae) await this["waitForRenderSettle"]();
  }
  ["styleOutlineCompanions"](_0x5692b7, _0x3b0792, _0x2c3229, _0x9118df) {
    const _0x2a39a7 = _0x3b0792["enabled"] ? Color["fromCssColorString"](_0x3b0792["color"]) : void 0, _0x4b892f = _0x3b0792["enabled"] ? _0x3b0792["width"] : SEAM_COVER_WIDTH;
    for (const _0x2c1da9 of _0x5692b7) {
      const _0x1a4bd6 = _0x3b0792["enabled"] || _0x2c3229 ? void 0 : _0x9118df["get"](LayerStyleEngine["outlineOwnerId"](_0x2c1da9)), _0x265458 = _0x1a4bd6 !== void 0 && _0x1a4bd6["alpha"] >= 1;
      _0x2c1da9["show"] = _0x3b0792["enabled"] || _0x265458;
      const _0x3dccc4 = _0x2a39a7 ?? (_0x265458 ? _0x1a4bd6 : void 0);
      _0x3dccc4 !== void 0 && _0x2c1da9["polyline"] !== void 0 && (_0x2c1da9["polyline"]["material"] = this["updateColorMaterial"](_0x2c1da9["polyline"]["material"], _0x3dccc4), _0x2c1da9["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x2c1da9["polyline"]["width"], _0x4b892f));
    }
    return _0x4b892f;
  }
  static ["outlineOwnerId"](_0x2902a3) {
    return _0x2902a3["id"]["endsWith"](OUTLINE_ID_SUFFIX) ? _0x2902a3["id"]["slice"](0, -OUTLINE_ID_SUFFIX["length"]) : _0x2902a3["id"];
  }
  ["getStyle"](_0x4a7b29) {
    return this["appliedLayerStyles"]["get"](_0x4a7b29);
  }
  ["deleteStyle"](_0x4ee25b) {
    this["appliedLayerStyles"]["delete"](_0x4ee25b), this["appliedCompanionWidths"]["delete"](_0x4ee25b);
  }
  ["recordInitialStyle"](_0x27d882, _0x30bdb5, _0x4a1501, _0x2c4dcf) {
    const _0x442211 = { "fill": { "mode": "solid", "color": _0x30bdb5, "opacity": _0x4a1501 }, "outline": _0x2c4dcf };
    this["appliedLayerStyles"]["set"](_0x27d882, _0x442211), this["emitStyle"](_0x27d882, _0x442211);
  }
  ["randomLayerColor"]() {
    return Color["fromRandom"]({ "alpha": 1 });
  }
  ["applyEntityColor"](_0x20def2, _0x736f40) {
    _0x20def2["entities"]["suspendEvents"]();
    for (const _0x263d1d of _0x20def2["entities"]["values"]) {
      _0x263d1d["polygon"] !== void 0 && (_0x263d1d["polygon"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x736f40["withAlpha"](0.5)))), _0x263d1d["polyline"] !== void 0 && (_0x263d1d["polyline"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x736f40))), _0x263d1d["point"] !== void 0 && (_0x263d1d["point"]["color"] = new ConstantProperty(_0x736f40)), _0x263d1d["billboard"] !== void 0 && (_0x263d1d["billboard"]["color"] = new ConstantProperty(_0x736f40));
    }
    _0x20def2["entities"]["resumeEvents"]();
  }
  ["convertMarkersToPoints"](_0x10b3cd, _0x484095) {
    _0x10b3cd["entities"]["suspendEvents"]();
    for (const _0x3b0d92 of _0x10b3cd["entities"]["values"]) {
      if (_0x3b0d92["billboard"] === void 0) continue;
      const _0xb7b716 = _0x3b0d92["billboard"]["heightReference"];
      _0x3b0d92["point"] = new PointGraphics({ "pixelSize": 8, "color": _0x484095, ..._0xb7b716 !== void 0 ? { "heightReference": _0xb7b716 } : {} }), _0x3b0d92["billboard"] = void 0;
    }
    _0x10b3cd["entities"]["resumeEvents"]();
  }
  ["applyEntityStyle"](_0x3cf294, _0x460a57, _0x85acbd, _0x3fdacb) {
    const _0x4476f1 = _0x85acbd["enabled"] ? Color["fromCssColorString"](_0x85acbd["color"]) : void 0;
    _0x3cf294["polygon"] !== void 0 && (_0x3cf294["polygon"]["material"] = this["updateColorMaterial"](_0x3cf294["polygon"]["material"], _0x460a57 ?? Color["WHITE"]["withAlpha"](0)), !this["outlineGeometry"]["hasOutlineCompanion"](_0x3cf294) && !this["outlineGeometry"]["hasRiskyOutline"](_0x3cf294) && (_0x3cf294["polygon"]["outline"] = LayerStyleEngine["updateConstantProperty"](_0x3cf294["polygon"]["outline"], _0x85acbd["enabled"]), _0x4476f1 !== void 0 && (_0x3cf294["polygon"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x3cf294["polygon"]["outlineColor"], _0x4476f1), _0x3cf294["polygon"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x3cf294["polygon"]["outlineWidth"], _0x85acbd["width"]))));
    if (_0x3cf294["polyline"] !== void 0) {
      let _0x2677fb;
      _0x3fdacb ? _0x2677fb = _0x4476f1 ?? Color["WHITE"]["withAlpha"](0) : _0x2677fb = _0x85acbd["enabled"] ? _0x4476f1 : _0x460a57, _0x3cf294["polyline"]["material"] = this["updateColorMaterial"](_0x3cf294["polyline"]["material"], _0x2677fb ?? Color["WHITE"]["withAlpha"](0)), _0x85acbd["enabled"] && (_0x3cf294["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x3cf294["polyline"]["width"], _0x85acbd["width"]));
    }
    _0x3cf294["point"] !== void 0 && (_0x3cf294["point"]["color"] = _0x460a57 !== void 0 ? this["updateColorProperty"](_0x3cf294["point"]["color"], _0x460a57) : void 0, _0x85acbd["enabled"] && _0x4476f1 !== void 0 && (_0x3cf294["point"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x3cf294["point"]["outlineColor"], _0x4476f1), _0x3cf294["point"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x3cf294["point"]["outlineWidth"], _0x85acbd["width"]))), _0x3cf294["billboard"] !== void 0 && _0x460a57 !== void 0 && (_0x3cf294["billboard"]["color"] = this["updateColorProperty"](_0x3cf294["billboard"]["color"], _0x460a57));
  }
  ["resolveFillColor"](_0x59a145, _0x1efead, _0x5ecd32, _0x11003e) {
    switch (_0x1efead["mode"]) {
      case "off":
        return void 0;
      case "solid":
        return Color["fromCssColorString"](_0x1efead["color"])["withAlpha"](_0x1efead["opacity"]);
      case "gradient": {
        if (_0x5ecd32 === null) return void 0;
        const _0x46399d = this["readNumericProperty"](_0x59a145, _0x1efead["column"], _0x11003e);
        if (_0x46399d === null) return void 0;
        const _0x5958b1 = _0x5ecd32["max"] === _0x5ecd32["min"] ? 0.5 : _0x33fcf2["clamp"]((_0x46399d - _0x5ecd32["min"]) / (_0x5ecd32["max"] - _0x5ecd32["min"]), 0, 1);
        return LayerStyleEngine["sampleFromPalette"](_0x1efead["palette"], _0x5958b1, _0x1efead["paletteKind"])["withAlpha"](_0x1efead["opacity"]);
      }
      case "bin": {
        if (_0x5ecd32 === null) return void 0;
        const _0x21d558 = this["readNumericProperty"](_0x59a145, _0x1efead["column"], _0x11003e);
        if (_0x21d558 === null) return void 0;
        const _0x548c50 = (_0x5ecd32["max"] - _0x5ecd32["min"]) / _0x1efead["binCount"], _0x2a3347 = Array["from"]({ "length": _0x1efead["binCount"] }, (_0x2b59f1, _0xb8f2ee) => _0x5ecd32["min"] + _0x548c50 * (_0xb8f2ee + 1)), _0x490780 = LayerStyleEngine["pickBin"](_0x21d558, _0x2a3347), _0x2824bb = _0x1efead["binCount"] <= 1 ? 0.5 : _0x490780 / (_0x1efead["binCount"] - 1);
        return LayerStyleEngine["sampleFromPalette"](_0x1efead["palette"], _0x2824bb, _0x1efead["paletteKind"])["withAlpha"](_0x1efead["opacity"]);
      }
      case "enum": {
        const _0x26be31 = this["readProperty"](_0x59a145, _0x1efead["column"], _0x11003e);
        if (_0x26be31 === null) return void 0;
        const _0xbbb545 = _0x1efead["colors"][String(_0x26be31)];
        return _0xbbb545 !== void 0 ? Color["fromCssColorString"](_0xbbb545)["withAlpha"](_0x1efead["opacity"]) : Color["LIGHTGRAY"]["withAlpha"](_0x1efead["opacity"]);
      }
    }
  }
  ["readProperty"](_0xc47a96, _0x361833, _0x1dbb6e) {
    const _0x2f7563 = _0xc47a96["properties"];
    if (_0x2f7563 === void 0 || !_0x2f7563["hasProperty"](_0x361833)) return null;
    const _0x4cac31 = _0x2f7563["getValue"](_0x1dbb6e), _0x2aba7c = _0x4cac31 == null ? void 0 : _0x4cac31[_0x361833];
    if (_0x2aba7c === void 0 || _0x2aba7c === null) return null;
    return typeof _0x2aba7c === "number" ? _0x2aba7c : String(_0x2aba7c);
  }
  ["readNumericProperty"](_0x434ba4, _0x3e6311, _0x42b33d) {
    const _0x48f450 = this["readProperty"](_0x434ba4, _0x3e6311, _0x42b33d);
    if (_0x48f450 === null) return null;
    const _0x562f40 = typeof _0x48f450 === "number" ? _0x48f450 : Number(_0x48f450);
    return Number["isFinite"](_0x562f40) ? _0x562f40 : null;
  }
  ["resolveStyleRange"](_0x30846a, _0x5731fd, _0x38820e) {
    if (_0x38820e["mode"] !== "gradient" && _0x38820e["mode"] !== "bin") return null;
    if (_0x38820e["min"] !== void 0 && _0x38820e["max"] !== void 0) return { "min": _0x38820e["min"], "max": _0x38820e["max"] };
    const _0x1c2d30 = this["getColumnRange"](_0x30846a, _0x5731fd, _0x38820e["column"]);
    if (_0x1c2d30 === null) return null;
    return { "min": _0x38820e["min"] ?? _0x1c2d30["min"], "max": _0x38820e["max"] ?? _0x1c2d30["max"] };
  }
  ["getColumnRange"](_0x5a4c74, _0x3d403d, _0x493c15) {
    let _0x2eaefd = Infinity, _0x42c451 = -Infinity;
    for (const _0x197917 of _0x5a4c74["entities"]["values"]) {
      const _0x3c1a59 = this["readNumericProperty"](_0x197917, _0x493c15, _0x3d403d);
      if (_0x3c1a59 === null) continue;
      if (_0x3c1a59 < _0x2eaefd) _0x2eaefd = _0x3c1a59;
      if (_0x3c1a59 > _0x42c451) _0x42c451 = _0x3c1a59;
    }
    return Number["isFinite"](_0x2eaefd) && Number["isFinite"](_0x42c451) ? { "min": _0x2eaefd, "max": _0x42c451 } : null;
  }
  static ["valueEquals"](_0x529b0d, _0x66d77a) {
    if (_0x529b0d instanceof Color || _0x66d77a instanceof Color) return _0x529b0d instanceof Color && _0x66d77a instanceof Color && Color["equals"](_0x529b0d, _0x66d77a);
    return _0x529b0d === _0x66d77a;
  }
  static ["updateConstantProperty"](_0x2e70f2, _0x21920d) {
    if (_0x2e70f2 instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x2e70f2["getValue"](), _0x21920d) && _0x2e70f2["setValue"](_0x21920d), _0x2e70f2;
    return new ConstantProperty(_0x21920d);
  }
  ["updateColorProperty"](_0x1388d9, _0x5d49c8) {
    const _0x234730 = _0x1388d9 !== void 0 ? this["opacityController"]["getWrappedBaseColor"](_0x1388d9) : void 0;
    if (_0x234730 !== void 0) return Color["clone"](_0x5d49c8, _0x234730), _0x1388d9;
    if (_0x1388d9 instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x1388d9["getValue"](), _0x5d49c8) && _0x1388d9["setValue"](_0x5d49c8), _0x1388d9;
    return new ConstantProperty(_0x5d49c8);
  }
  ["updateColorMaterial"](_0x3e2fb7, _0x57e7b5) {
    if (_0x3e2fb7 instanceof ColorMaterialProperty) return _0x3e2fb7["color"] = this["updateColorProperty"](_0x3e2fb7["color"], _0x57e7b5), _0x3e2fb7;
    return new ColorMaterialProperty(this["updateColorProperty"](void 0, _0x57e7b5));
  }
  static ["sampleFromPalette"](_0x45bcf0, _0x17effc, _0x48a647) {
    return _0x48a647 === "qualitative" ? LayerStyleEngine["sampleDiscrete"](_0x45bcf0, _0x17effc) : LayerStyleEngine["sampleGradient"](_0x45bcf0, _0x17effc);
  }
  static ["sampleGradient"](_0x371e55, _0x2320b9) {
    if (_0x371e55["length"] === 0) return Color["GRAY"];
    if (_0x371e55["length"] === 1) return Color["fromCssColorString"](_0x371e55[0]);
    const _0x32186d = _0x33fcf2["clamp"](_0x2320b9, 0, 1) * (_0x371e55["length"] - 1), _0x5b290d = Math["floor"](_0x32186d), _0x58c09a = Math["min"](_0x371e55["length"] - 1, _0x5b290d + 1), _0x229472 = _0x32186d - _0x5b290d, _0x1bd3cb = Color["fromCssColorString"](_0x371e55[_0x5b290d]), _0x137e25 = Color["fromCssColorString"](_0x371e55[_0x58c09a]);
    return Color["lerp"](_0x1bd3cb, _0x137e25, _0x229472, new Color());
  }
  static ["sampleDiscrete"](_0x4a4b2f, _0x1b0ea5) {
    if (_0x4a4b2f["length"] === 0) return Color["GRAY"];
    const _0x59d95b = Math["round"](_0x33fcf2["clamp"](_0x1b0ea5, 0, 1) * (_0x4a4b2f["length"] - 1));
    return Color["fromCssColorString"](_0x4a4b2f[_0x59d95b]);
  }
  static ["pickBin"](_0x2b3531, _0xb3524e) {
    for (let _0x138621 = 0; _0x138621 < _0xb3524e["length"]; _0x138621++) {
      if (_0x2b3531 <= _0xb3524e[_0x138621]) return _0x138621;
    }
    return _0xb3524e["length"] - 1;
  }
}
function extractEpsgCode(_0x239c6a) {
  if (!/EPSG/i["test"](_0x239c6a)) return void 0;
  const _0x133a6b = _0x239c6a["trim"]();
  let _0xf2d87b = _0x133a6b["length"];
  while (_0xf2d87b > 0 && _0x133a6b["charCodeAt"](_0xf2d87b - 1) >= 48 && _0x133a6b["charCodeAt"](_0xf2d87b - 1) <= 57) {
    _0xf2d87b--;
  }
  const _0x1617ac = _0x133a6b["slice"](_0xf2d87b);
  return _0x1617ac["length"] > 0 ? _0x1617ac : void 0;
}
const proj4DefRequests = /* @__PURE__ */ new Map();
async function registerProj4Def(_0xfbc6a0, _0x35ed8d) {
  const _0x157f54 = "EPSG:" + _0x35ed8d;
  if (_0xfbc6a0["defs"](_0x157f54)) return !![];
  let _0x25a94a = proj4DefRequests["get"](_0x35ed8d);
  !_0x25a94a && (_0x25a94a = (async () => {
    try {
      const _0x48017b = await fetch("https://epsg.io/" + _0x35ed8d + ".proj4");
      if (!_0x48017b["ok"]) return _0x48017b["status"] === 404 ? "missing" : "transient-failure";
      const _0x3ec1e6 = (await _0x48017b["text"]())["trim"]();
      if (!_0x3ec1e6) return "missing";
      return _0xfbc6a0["defs"](_0x157f54, _0x3ec1e6), "registered";
    } catch {
      return "transient-failure";
    }
  })(), proj4DefRequests["set"](_0x35ed8d, _0x25a94a));
  const _0x4eda15 = await _0x25a94a;
  return _0x4eda15 === "transient-failure" && proj4DefRequests["get"](_0x35ed8d) === _0x25a94a && proj4DefRequests["delete"](_0x35ed8d), _0x4eda15 === "registered";
}
async function ensureProj4Def(_0x3d83a5) {
  let _0x40abc3;
  try {
    ({ default: _0x40abc3 } = await import("proj4"));
  } catch {
    return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x3d83a5 + ' icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil (peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.'), void 0;
  }
  if (!await registerProj4Def(_0x40abc3, _0x3d83a5)) return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x3d83a5 + " icin proj4 tanimi epsg.io'dan alinamadi (agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir."), void 0;
  return _0x40abc3;
}
const CESIUM_BUILTIN_CRS_NAMES = /* @__PURE__ */ new Set(["urn:ogc:def:crs:OGC:1.3:CRS84", "EPSG:4326", "urn:ogc:def:crs:EPSG::4326"]);
function defaultCrsFunction(_0x535399) {
  return Cartesian3["fromDegrees"](_0x535399[0], _0x535399[1], _0x535399[2]);
}
function numericCodeString(_0x38ac98) {
  if (_0x38ac98 === void 0) return void 0;
  const _0x50e6db = String(_0x38ac98)["trim"]();
  return /^\d+$/["test"](_0x50e6db) ? _0x50e6db : void 0;
}
function isSuspiciousCrsResult(_0x15c362) {
  return _0x15c362 !== null && _0x15c362["kind"] !== "reprojected";
}
function firstCoordinatePair(_0x4cb5a6) {
  let _0x338653 = _0x4cb5a6;
  while (Array["isArray"](_0x338653) && _0x338653["length"] > 0 && Array["isArray"](_0x338653[0])) {
    _0x338653 = _0x338653[0];
  }
  if (Array["isArray"](_0x338653) && _0x338653["length"] >= 2 && typeof _0x338653[0] === "number" && typeof _0x338653[1] === "number") return [_0x338653[0], _0x338653[1]];
  return void 0;
}
function findFirstCoordinates(_0x24cc49) {
  if (typeof _0x24cc49 !== "object" || _0x24cc49 === null) return void 0;
  const _0x1cb93b = _0x24cc49;
  if (_0x1cb93b["type"] === "FeatureCollection" && Array["isArray"](_0x1cb93b["features"])) {
    for (const _0x40e3cd of _0x1cb93b["features"]) {
      const _0x14793c = findFirstCoordinates(_0x40e3cd);
      if (_0x14793c) return _0x14793c;
    }
    return void 0;
  }
  if (_0x1cb93b["type"] === "Feature") return findFirstCoordinates(_0x1cb93b["geometry"]);
  if (_0x1cb93b["type"] === "GeometryCollection" && Array["isArray"](_0x1cb93b["geometries"])) {
    for (const _0x49912d of _0x1cb93b["geometries"]) {
      const _0x5f4e6d = findFirstCoordinates(_0x49912d);
      if (_0x5f4e6d) return _0x5f4e6d;
    }
    return void 0;
  }
  if ("coordinates" in _0x1cb93b) return firstCoordinatePair(_0x1cb93b["coordinates"]);
  return void 0;
}
function resolveOrRejectUnresolvedCrs(_0x3c057a, _0x47d1bc, _0x873797) {
  if (!_0x873797) throw new GeometryError("CRS_UNRESOLVED_UNSUPPORTED", "Koordinat sistemi tanınamadı ve WGS84 ile uyumlu değil.");
  return GeoJsonDataSource["crsNames"][_0x3c057a] = defaultCrsFunction, { "kind": "suspicious-unresolved-crs", "crsName": _0x47d1bc };
}
function acceptClaimedWgs84(_0x595e6f, _0x5b3a20, _0x288adc) {
  if (!_0x5b3a20) throw new GeometryError("CRS_CLAIMED_WGS84_INVALID", "Koordinatlar WGS84 ile uyumlu değil.");
  if (_0x288adc) GeoJsonDataSource["crsNames"][_0x595e6f] = defaultCrsFunction;
  return null;
}
function computeLooksLikeWgs84(_0x504f6e) {
  const _0x3c70ce = findFirstCoordinates(_0x504f6e);
  return !_0x3c70ce || Math["abs"](_0x3c70ce[0]) <= 180 && Math["abs"](_0x3c70ce[1]) <= 90;
}
function resolveCrsFieldOrThrow(_0xc02e17, _0x270edf) {
  const _0x327c32 = "crs" in _0xc02e17 ? _0xc02e17["crs"] : void 0;
  if (!_0x327c32 || typeof _0x327c32 !== "object") {
    if (!_0x270edf) throw new GeometryError("CRS_MISSING_UNSUPPORTED", "Bu dosyada geçerli koordinat sistemi (CRS) bilgisi yok.");
    return null;
  }
  return _0x327c32;
}
async function ensureGeoJsonCrsSupport(_0x5ea3f0) {
  var _a2, _b, _c;
  if (typeof _0x5ea3f0 !== "object" || _0x5ea3f0 === null) return null;
  const _0x58da9c = computeLooksLikeWgs84(_0x5ea3f0), _0x565083 = resolveCrsFieldOrThrow(_0x5ea3f0, _0x58da9c);
  if (!_0x565083) return null;
  const _0x5b57b7 = _0x565083["type"] === "EPSG", _0x2e8070 = _0x5b57b7 ? "EPSG:" + ((_a2 = _0x565083["properties"]) == null ? void 0 : _a2["code"]) : (_b = _0x565083["properties"]) == null ? void 0 : _b["name"];
  if (!_0x2e8070 || typeof _0x2e8070 !== "string") return null;
  if (CESIUM_BUILTIN_CRS_NAMES["has"](_0x2e8070)) return acceptClaimedWgs84(_0x2e8070, _0x58da9c, ![]);
  const _0xb4f7bc = _0x5b57b7 ? numericCodeString((_c = _0x565083["properties"]) == null ? void 0 : _c["code"]) : extractEpsgCode(_0x2e8070);
  if (!_0xb4f7bc) return resolveOrRejectUnresolvedCrs(_0x2e8070, _0x2e8070, _0x58da9c);
  if (_0xb4f7bc === "4326") return acceptClaimedWgs84(_0x2e8070, _0x58da9c, !![]);
  const _0x3f9399 = "EPSG:" + _0xb4f7bc;
  let _0x471433;
  try {
    ({ default: _0x471433 } = await import("proj4"));
  } catch {
    return resolveOrRejectUnresolvedCrs(_0x2e8070, _0x3f9399, _0x58da9c);
  }
  if (!await registerProj4Def(_0x471433, _0xb4f7bc)) return resolveOrRejectUnresolvedCrs(_0x2e8070, _0x3f9399, _0x58da9c);
  return GeoJsonDataSource["crsNames"][_0x2e8070] = (_0xda3fe0) => {
    const [_0x49e5af, _0x1d0fe1] = _0x471433(_0x3f9399, "EPSG:4326", [_0xda3fe0[0], _0xda3fe0[1]]);
    return Cartesian3["fromDegrees"](_0x49e5af, _0x1d0fe1, _0xda3fe0[2]);
  }, { "kind": "reprojected", "fromEpsg": _0x3f9399 };
}
class LocalSourceLoader {
  constructor(_0x35381f, _0x2913ea) {
    this["viewer"] = _0x35381f, this["deps"] = _0x2913ea;
  }
  async ["addLocalKmlGeoJson"](_0x587f85, _0x45dd12) {
    let _0xce4e75, _0x56a983, _0x4a7aea = null;
    const _0x87a042 = this["deps"]["styleEngine"]["randomLayerColor"]();
    let _0x13d0b1 = _0x45dd12["clampToGround"] ?? !![];
    if (_0x587f85 === "GEOJSON") {
      const _0xb3095c = _0x45dd12["data"] instanceof File ? JSON["parse"](await this["fileToText"](_0x45dd12["data"])) : _0x45dd12["data"];
      _0x4a7aea = await ensureGeoJsonCrsSupport(_0xb3095c);
      if (isSuspiciousCrsResult(_0x4a7aea)) _0x13d0b1 = ![];
      _0xce4e75 = await GeoJsonDataSource["load"](_0xb3095c, { "clampToGround": _0x13d0b1, "fill": _0x87a042["withAlpha"](0.5), "stroke": _0x87a042, "strokeWidth": 2, "markerColor": _0x87a042 }), this["deps"]["styleEngine"]["applyEntityColor"](_0xce4e75, _0x87a042), this["deps"]["styleEngine"]["convertMarkersToPoints"](_0xce4e75, _0x87a042);
      if (isSuspiciousCrsResult(_0x4a7aea)) this["deps"]["outlineGeometry"]["flattenSuspiciousGeometry"](_0xce4e75);
    } else {
      let _0x29f5c8;
      _0x45dd12["data"] instanceof File ? (_0x56a983 = this["fileToBlobUrl"](_0x45dd12["data"]), _0x29f5c8 = _0x56a983) : _0x29f5c8 = _0x45dd12["data"], _0xce4e75 = await KmlDataSource["load"](_0x29f5c8, { "camera": this["viewer"]["scene"]["camera"], "canvas": this["viewer"]["scene"]["canvas"], "clampToGround": _0x13d0b1 }), this["deps"]["styleEngine"]["applyEntityColor"](_0xce4e75, _0x87a042);
    }
    this["deps"]["outlineGeometry"]["disableRiskyPolygonOutlines"](_0xce4e75);
    _0x13d0b1 && this["deps"]["addPolygonOutlines"](_0xce4e75, this["deps"]["defaultOutlineColor"], 2);
    await this["viewer"]["dataSources"]["add"](_0xce4e75);
    _0x56a983 !== void 0 && URL["revokeObjectURL"](_0x56a983);
    const _0x108f1b = _0x87a042["toCssHexString"](), _0x5f309d = this["deps"]["register"](_0x45dd12["id"], _0x45dd12["title"], _0x587f85, _0xce4e75, ![], _0x108f1b);
    return this["deps"]["emitCrsCheckResult"](_0x5f309d["id"], _0x4a7aea), this["deps"]["styleEngine"]["recordInitialStyle"](_0x5f309d["id"], _0x108f1b, 0.5, { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 2 }), await this["deps"]["waitForRenderSettle"](), _0x5f309d;
  }
  async ["addShp"](_0x133a16) {
    let _0x4dc25a;
    try {
      ({ getShapefile: _0x4dc25a } = await import("shpjs"));
    } catch {
      throw new LayerOperationError("LAYER_SHP_PACKAGE_MISSING", 'SHP katmanı için "shpjs" paketi gereklidir: shpjs kütüphanesini import etmelisiniz');
    }
    const _0x4b229d = _0x133a16["data"] instanceof File ? await this["fileToArrayBuffer"](_0x133a16["data"]) : _0x133a16["data"], _0x4af027 = await _0x4dc25a(_0x4b229d), _0x3f9807 = Array["isArray"](_0x4af027) ? { "type": "FeatureCollection", "features": _0x4af027["flatMap"]((_0x4d4631) => _0x4d4631["features"]) } : _0x4af027;
    return loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x3f9807, { "id": _0x133a16["id"], "title": _0x133a16["title"], "layerType": "SHP", "clampToGround": _0x133a16["clampToGround"] ?? !![] });
  }
  async ["addCsv"](_0x59f048) {
    let _0x348c07;
    try {
      ({ default: _0x348c07 } = await import("papaparse"));
    } catch {
      throw new LayerOperationError("LAYER_CSV_PACKAGE_MISSING", 'CSV katmanı için "papaparse" paketi gereklidir: papaparse kütüphanesini import etmelisiniz');
    }
    const _0x302903 = _0x59f048["data"] instanceof File ? await this["fileToText"](_0x59f048["data"]) : _0x59f048["data"], _0x4beb47 = _0x348c07["parse"](_0x302903, { "header": !![], "dynamicTyping": !![] }), _0x2a4767 = _0x4beb47["data"], _0x326ed6 = _0x2a4767["find"]((_0x1edd35) => _0x1edd35 && Object["keys"](_0x1edd35)["length"] > 0), _0xca5e62 = _0x326ed6 && this["detectLatLonKeys"](_0x326ed6);
    if (!_0xca5e62) throw new LayerOperationError("LAYER_CSV_LATLON_NOT_FOUND", "CSV içinde lat/lon sütunlarını bulamadım (ör: lat, lon).");
    const _0x36c038 = this["deps"]["styleEngine"]["randomLayerColor"](), _0xcef4a1 = new CustomDataSource(_0x59f048["title"]);
    for (const _0x58602f of _0x2a4767) {
      const _0x481463 = Number(_0x58602f[_0xca5e62["lat"]]), _0xb5f714 = Number(_0x58602f[_0xca5e62["lon"]]);
      Number["isFinite"](_0x481463) && Number["isFinite"](_0xb5f714) && _0xcef4a1["entities"]["add"]({ "position": Cartesian3["fromDegrees"](_0xb5f714, _0x481463), "point": { "pixelSize": 6, "color": _0x36c038 }, "properties": _0x58602f });
    }
    await this["viewer"]["dataSources"]["add"](_0xcef4a1);
    const _0x9442ac = _0x36c038["toCssHexString"](), _0xa9a9b4 = this["deps"]["register"](_0x59f048["id"], _0x59f048["title"], "CSV", _0xcef4a1, ![], _0x9442ac);
    return this["deps"]["styleEngine"]["recordInitialStyle"](_0xa9a9b4["id"], _0x9442ac, 1, { "enabled": ![], "color": _0x9442ac, "width": 0 }), _0xa9a9b4;
  }
  ["detectLatLonKeys"](_0x5d42c7) {
    const _0x1c8eb9 = Object["keys"](_0x5d42c7)["reduce"]((_0x3c0fe3, _0x52c4c2) => {
      const _0x5a7e17 = _0x52c4c2["toLowerCase"]();
      if (!_0x3c0fe3["lat"] && /^(lat|latitude|y)$/["test"](_0x5a7e17)) _0x3c0fe3["lat"] = _0x52c4c2;
      if (!_0x3c0fe3["lon"] && /^(lon|lng|long|longitude|x)$/["test"](_0x5a7e17)) _0x3c0fe3["lon"] = _0x52c4c2;
      return _0x3c0fe3;
    }, { "lat": "", "lon": "" });
    return _0x1c8eb9["lat"] && _0x1c8eb9["lon"] ? _0x1c8eb9 : null;
  }
  async ["fileToText"](_0x1c804b) {
    return decodeTextBuffer(await _0x1c804b["arrayBuffer"]());
  }
  ["fileToBlobUrl"](_0x5a3e6d) {
    return URL["createObjectURL"](_0x5a3e6d);
  }
  ["fileToArrayBuffer"](_0x4d5b4d) {
    return _0x4d5b4d["arrayBuffer"]();
  }
}
async function loadVectorGeoJsonLayer(_0x222fdd, _0x5efe62, _0x48270b, _0x582b20, _0x88a4b9) {
  const _0x32a1ce = await ensureGeoJsonCrsSupport(_0x48270b), _0xf21ef1 = _0x5efe62["styleEngine"]["randomLayerColor"](), _0x3f9102 = isSuspiciousCrsResult(_0x32a1ce) ? ![] : _0x582b20["clampToGround"], _0x118886 = await GeoJsonDataSource["load"](_0x48270b, { "clampToGround": _0x3f9102, "fill": _0xf21ef1["withAlpha"](0.5), "stroke": _0xf21ef1, "strokeWidth": 2, "markerColor": _0xf21ef1 });
  _0x5efe62["styleEngine"]["applyEntityColor"](_0x118886, _0xf21ef1), _0x5efe62["styleEngine"]["convertMarkersToPoints"](_0x118886, _0xf21ef1), _0x5efe62["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x118886);
  if (isSuspiciousCrsResult(_0x32a1ce)) _0x5efe62["outlineGeometry"]["flattenSuspiciousGeometry"](_0x118886);
  _0x3f9102 && _0x5efe62["addPolygonOutlines"](_0x118886, _0x5efe62["defaultOutlineColor"], 2);
  await _0x222fdd["dataSources"]["add"](_0x118886);
  const _0x2501b3 = _0xf21ef1["toCssHexString"](), _0x48f258 = _0x5efe62["register"](_0x582b20["id"], _0x582b20["title"], _0x582b20["layerType"], _0x118886, ![], _0x2501b3);
  return _0x5efe62["emitCrsCheckResult"](_0x48f258["id"], _0x32a1ce), _0x88a4b9 == null ? void 0 : _0x88a4b9(_0x48f258), _0x5efe62["styleEngine"]["recordInitialStyle"](_0x48f258["id"], _0x2501b3, 0.5, { "enabled": !![], "color": _0x5efe62["defaultOutlineColorHex"], "width": 2 }), await _0x5efe62["waitForRenderSettle"](), _0x48f258;
}
function decodeTextBuffer(_0x5d8a95) {
  try {
    return new TextDecoder("utf-8", { "fatal": !![] })["decode"](_0x5d8a95);
  } catch {
    return new TextDecoder("windows-1254")["decode"](_0x5d8a95);
  }
}
const els = (_0xe3f07f, _0x5ca3cc) => Array["from"](_0xe3f07f["getElementsByTagNameNS"]("*", _0x5ca3cc)), el = (_0x46d348, _0x4993fb) => els(_0x46d348, _0x4993fb)[0], txt = (_0x201a58, _0x53b243) => {
  var _a2, _b;
  return (_b = (_a2 = el(_0x201a58, _0x53b243)) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
};
function buildWfsCapabilitiesUrl(_0x2c0ddb) {
  const _0xe754f2 = new URL(_0x2c0ddb, window["location"]["origin"]), _0x491210 = new URL("" + _0xe754f2["origin"] + _0xe754f2["pathname"]);
  for (const [_0x474de2, _0x2fc847] of _0xe754f2["searchParams"]["entries"]()) {
    const _0x7068f2 = _0x474de2["toLowerCase"]();
    (_0x7068f2 === "url" || _0x7068f2 === "tucbsapikey") && _0x491210["searchParams"]["set"](_0x474de2, _0x2fc847);
  }
  return _0x491210["searchParams"]["set"]("service", "WFS"), _0x491210["searchParams"]["set"]("request", "GetCapabilities"), _0x491210["searchParams"]["set"]("acceptVersions", "2.0.0,1.1.0,1.0.0"), _0x491210["toString"]();
}
function isOgcExceptionXml(_0x2cdcc6) {
  const _0x1ca1ff = _0x2cdcc6["trimStart"]();
  return _0x1ca1ff["startsWith"]("<") && (_0x1ca1ff["includes"]("ExceptionReport") || _0x1ca1ff["includes"]("ServiceExceptionReport"));
}
function repairBareAmpersands(_0x41e23f) {
  return _0x41e23f["replace"](/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/gi, "&amp;");
}
async function fetchWfsCapabilities(_0x21316f, _0x116734 = {}) {
  const _0x2f9da0 = await fetch(buildWfsCapabilitiesUrl(_0x21316f), _0x116734);
  if (!_0x2f9da0["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "WFS GetCapabilities başarısız: " + _0x2f9da0["status"] + " " + _0x2f9da0["statusText"]);
  const _0x5db457 = await _0x2f9da0["text"]();
  if (isOgcExceptionXml(_0x5db457)) throw new OgcRequestError("OGC_CAPABILITIES_EXCEPTION", "WFS GetCapabilities OGC Exception döndü.");
  const _0x5ede25 = repairBareAmpersands(_0x5db457), _0x3f232b = new DOMParser()["parseFromString"](_0x5ede25, "application/xml");
  if (_0x3f232b["querySelector"]("parsererror")) throw new OgcRequestError("OGC_CAPABILITIES_PARSE_FAILED", "WFS GetCapabilities XML parse edilemedi.");
  const _0x3cf116 = _0x3f232b["documentElement"]["getAttribute"]("version") || "2.0.0", _0x211cb8 = [];
  for (const _0x307b15 of els(_0x3f232b, "FeatureType")) {
    const _0x3fb7e4 = txt(_0x307b15, "Name") || "";
    if (!_0x3fb7e4) continue;
    const _0x2652ea = els(_0x307b15, "OutputFormats")["flatMap"]((_0x561929) => els(_0x561929, "Format")["map"]((_0xacdf2f) => {
      var _a2;
      return ((_a2 = _0xacdf2f["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean)), _0xfa1472 = txt(_0x307b15, "Title"), _0x2bc443 = txt(_0x307b15, "DefaultCRS"), _0x7c28dc = txt(_0x307b15, "DefaultSRS");
    _0x211cb8["push"]({ "name": _0x3fb7e4, ..._0xfa1472 ? { "title": _0xfa1472 } : {}, ..._0x2bc443 ? { "defaultCRS": _0x2bc443 } : {}, ..._0x7c28dc ? { "defaultSRS": _0x7c28dc } : {}, ..._0x2652ea["length"] ? { "outputFormats": _0x2652ea } : {} });
  }
  const _0x240ff3 = el(_0x3f232b, "OperationsMetadata");
  let _0x133db4 = [];
  if (_0x240ff3) {
    const _0x5cf13e = els(_0x240ff3, "Operation")["find"]((_0x3c830e) => (_0x3c830e["getAttribute"]("name") || "") === "GetFeature"), _0xb1098d = els(_0x5cf13e ?? _0x240ff3, "Parameter")["find"]((_0x1293c) => (_0x1293c["getAttribute"]("name") || "")["toLowerCase"]() === "outputformat");
    _0xb1098d && (_0x133db4 = els(_0xb1098d, "Value")["map"]((_0x9d9c67) => {
      var _a2;
      return ((_a2 = _0x9d9c67["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean));
  }
  if (!_0x133db4["length"]) {
    const _0xfef33c = /* @__PURE__ */ new Set();
    _0x133db4 = _0x211cb8["flatMap"]((_0xd7a0c6) => _0xd7a0c6["outputFormats"] || [])["filter"]((_0xe886f0) => !_0xfef33c["has"](_0xe886f0) && _0xfef33c["add"](_0xe886f0));
  }
  return { "version": _0x3cf116, "featureTypes": _0x211cb8, "outputFormats": _0x133db4 };
}
function normName(_0x55ffb6) {
  return _0x55ffb6["trim"]()["toLowerCase"]();
}
function localTypeName(_0x1dc2cb) {
  const _0xb4c09b = _0x1dc2cb["lastIndexOf"](":");
  return _0xb4c09b >= 0 ? _0x1dc2cb["slice"](_0xb4c09b + 1) : _0x1dc2cb;
}
function resolveWfsFeatureType(_0x43e0f8, _0x2e4c5e) {
  if (!_0x2e4c5e["length"]) throw new OgcRequestError("OGC_FEATURE_TYPE_NOT_FOUND", "WFS FeatureType bulunamadı.");
  const _0x333c06 = _0x43e0f8 == null ? void 0 : _0x43e0f8["trim"]();
  if (_0x333c06) {
    const _0x110b0e = _0x2e4c5e["find"]((_0x13dfc0) => normName(_0x13dfc0["name"]) === normName(_0x333c06));
    if (_0x110b0e) return _0x110b0e;
    const _0x3b9095 = normName(localTypeName(_0x333c06)), _0x5cd202 = _0x2e4c5e["find"]((_0x4e8168) => normName(localTypeName(_0x4e8168["name"])) === _0x3b9095);
    if (_0x5cd202) return _0x5cd202;
  }
  return _0x2e4c5e[0];
}
function pickJsonOutput(_0x51cf93) {
  const _0x5f207b = ["application/geo+json", "application/json;subtype=geojson", "application/json", "geojson", "json", "esrigeojson", "geojson+gzip", "geojson+zip"], _0x57a619 = _0x51cf93["map"]((_0x2fa22f) => _0x2fa22f["toLowerCase"]()["replace"](/\s+/g, ""));
  for (const _0x377b92 of _0x5f207b) {
    const _0x583c33 = _0x57a619["findIndex"]((_0xd9271d) => _0xd9271d === _0x377b92 || _0xd9271d["includes"](_0x377b92));
    if (_0x583c33 >= 0) return _0x51cf93[_0x583c33] ?? null;
  }
  return null;
}
function buildWfsGetFeaturePlan(_0x594146) {
  const _0x263c03 = resolveWfsFeatureType(_0x594146["typeNameHint"], _0x594146["caps"]["featureTypes"]), _0x4bb01c = _0x594146["version"] || _0x594146["caps"]["version"] || "2.0.0", _0x18c35b = _0x594146["srsName"] || _0x263c03["defaultCRS"] || _0x263c03["defaultSRS"] || "EPSG:4326", _0x27ffbf = _0x594146["outputFormat"] || pickJsonOutput(_0x263c03["outputFormats"] || []) || pickJsonOutput(_0x594146["caps"]["outputFormats"]), _0xe40157 = _0x594146["maxFeatures"] ?? 5e3;
  return { "version": _0x4bb01c, "typeName": _0x263c03["name"], "srsName": _0x18c35b, "jsonOutputFormat": _0x27ffbf, "maxFeatures": _0xe40157 };
}
function appendWfsGetFeatureParams(_0x486a64, _0x2b04f2, _0x24305a) {
  _0x486a64["set"]("service", "WFS"), _0x486a64["set"]("request", "GetFeature"), _0x486a64["set"]("version", _0x2b04f2["version"]);
  const _0x38b21d = _0x2b04f2["version"]["startsWith"]("2.");
  _0x486a64["set"](_0x38b21d ? "typeNames" : "typeName", _0x2b04f2["typeName"]), _0x486a64["set"]("srsName", _0x2b04f2["srsName"]);
  _0x24305a && _0x486a64["set"]("outputFormat", _0x24305a);
  const _0x71d2ad = _0x38b21d ? "count" : "maxFeatures";
  _0x486a64["set"](_0x71d2ad, String(_0x2b04f2["maxFeatures"]));
}
async function getCapabilities(_0x5dbd7d, _0x50214b, _0x4a34d2) {
  const _0x29b97e = _0x4a34d2 == null ? void 0 : _0x4a34d2["mergeApiKeyHeader"](_0x4a34d2["buildAuthHeaders"](_0x50214b), _0x5dbd7d), _0x541250 = await fetch(_0x5dbd7d, _0x29b97e ? { "headers": _0x29b97e } : void 0);
  if (!_0x541250["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "GetCapabilities isteği başarısız: " + _0x541250["status"] + " " + _0x541250["statusText"]);
  const _0x549b75 = await _0x541250["text"](), _0x22eb5e = new DOMParser()["parseFromString"](_0x549b75, "application/xml");
  if (_0x22eb5e["getElementsByTagName"]("parsererror")["length"] > 0) throw new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "GetCapabilities yanıtı XML olarak ayrıştırılamadı.");
  return _0x22eb5e;
}
function parseWmsStyles(_0x268429, _0x57e2cd) {
  var _a2, _b, _c, _d;
  const _0x2c2bcf = elementsByLocalName(_0x268429, "Layer")["find"]((_0x18b48a) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x18b48a, "Name")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x57e2cd;
  });
  if (!_0x2c2bcf) return [];
  const _0x17fff1 = [];
  for (const _0x21784d of Array["from"](_0x2c2bcf["children"])) {
    if (_0x21784d["localName"] !== "Style") continue;
    const _0x26d41f = (_b = (_a2 = childByLocalName(_0x21784d, "Name")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x26d41f) continue;
    const _0x5e8672 = ((_d = (_c = childByLocalName(_0x21784d, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x26d41f;
    _0x17fff1["push"]({ "name": _0x26d41f, "title": _0x5e8672 });
  }
  return _0x17fff1;
}
function parseWmtsStyles(_0x3563fc, _0x3e4cc9) {
  var _a2, _b, _c, _d, _e;
  const _0x5a7771 = elementsByLocalName(_0x3563fc, "Layer")["find"]((_0x15c5e5) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x15c5e5, "Identifier")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x3e4cc9;
  });
  if (!_0x5a7771) return [];
  const _0x52cd25 = [];
  for (const _0xb1267f of Array["from"](_0x5a7771["children"])) {
    if (_0xb1267f["localName"] !== "Style") continue;
    const _0x3fd03c = (_b = (_a2 = childByLocalName(_0xb1267f, "Identifier")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x3fd03c) continue;
    const _0x90d520 = ((_d = (_c = childByLocalName(_0xb1267f, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x3fd03c, _0x10efd8 = ((_e = childByLocalName(_0xb1267f, "LegendURL")) == null ? void 0 : _e["getAttribute"]("xlink:href")) ?? "", _0x44df96 = _0xb1267f["getAttribute"]("isDefault") === "true";
    _0x52cd25["push"]({ "name": _0x3fd03c, "title": _0x90d520, "legendUrl": _0x10efd8, "isDefault": _0x44df96 });
  }
  return _0x52cd25["sort"]((_0x2b41a1, _0x48370e) => Number(_0x48370e["isDefault"]) - Number(_0x2b41a1["isDefault"])), _0x52cd25["map"]((_0x5ae11b) => ({ "name": _0x5ae11b["name"], "title": _0x5ae11b["title"], "legendUrl": _0x5ae11b["legendUrl"] }));
}
function buildCapabilitiesUrl(_0x29c228, _0x498857, _0x4b2de4) {
  const _0x14cc00 = new URL(_0x29c228);
  return _0x14cc00["searchParams"]["set"]("SERVICE", _0x498857), _0x14cc00["searchParams"]["set"]("REQUEST", "GetCapabilities"), _0x14cc00["searchParams"]["set"]("VERSION", _0x4b2de4), _0x14cc00["toString"]();
}
function elementsByLocalName(_0x1605e3, _0x4bc88c) {
  return Array["from"](_0x1605e3["getElementsByTagNameNS"]("*", _0x4bc88c));
}
function childByLocalName(_0x3e0dd3, _0x45bb99) {
  return Array["from"](_0x3e0dd3["children"])["find"]((_0x29e44e) => _0x29e44e["localName"] === _0x45bb99);
}
function parseWmsGeographicBoundingBox(_0xa8627b) {
  var _a2, _b, _c, _d;
  const _0x31ad6b = childByLocalName(_0xa8627b, "EX_GeographicBoundingBox");
  if (_0x31ad6b) {
    const _0x33ca4f = (_a2 = childByLocalName(_0x31ad6b, "westBoundLongitude")) == null ? void 0 : _a2["textContent"], _0x403ec4 = (_b = childByLocalName(_0x31ad6b, "eastBoundLongitude")) == null ? void 0 : _b["textContent"], _0x7d61cb = (_c = childByLocalName(_0x31ad6b, "southBoundLatitude")) == null ? void 0 : _c["textContent"], _0x56c820 = (_d = childByLocalName(_0x31ad6b, "northBoundLatitude")) == null ? void 0 : _d["textContent"];
    if (_0x33ca4f && _0x403ec4 && _0x7d61cb && _0x56c820) {
      const _0x34a73f = { "west": Number(_0x33ca4f), "south": Number(_0x7d61cb), "east": Number(_0x403ec4), "north": Number(_0x56c820) };
      if (Object["values"](_0x34a73f)["every"](Number["isFinite"])) return _0x34a73f;
    }
  }
  const _0xaf01e5 = childByLocalName(_0xa8627b, "LatLonBoundingBox");
  if (_0xaf01e5) {
    const _0x5721e1 = { "west": Number(_0xaf01e5["getAttribute"]("minx")), "south": Number(_0xaf01e5["getAttribute"]("miny")), "east": Number(_0xaf01e5["getAttribute"]("maxx")), "north": Number(_0xaf01e5["getAttribute"]("maxy")) };
    if (Object["values"](_0x5721e1)["every"](Number["isFinite"])) return _0x5721e1;
  }
  return void 0;
}
function parseWmsCapabilities(_0x4a31aa) {
  var _a2;
  const _0x555360 = [];
  for (const _0x1bac79 of elementsByLocalName(_0x4a31aa, "Layer")) {
    const _0x3c06c5 = childByLocalName(_0x1bac79, "Name");
    if (!(_0x3c06c5 == null ? void 0 : _0x3c06c5["textContent"])) continue;
    const _0x5f2408 = childByLocalName(_0x1bac79, "Title"), _0x47159f = parseWmsGeographicBoundingBox(_0x1bac79);
    _0x555360["push"]({ "identifier": _0x3c06c5["textContent"]["trim"](), "title": ((_a2 = _0x5f2408 == null ? void 0 : _0x5f2408["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x3c06c5["textContent"]["trim"](), ..._0x47159f && { "geographicBoundingBox": _0x47159f } });
  }
  return _0x555360;
}
function parseWmsTiffFormat(_0xc5a781) {
  const _0xe12ffe = elementsByLocalName(_0xc5a781, "GetMap")[0];
  if (!_0xe12ffe) return void 0;
  const _0x4feb30 = new Set(elementsByLocalName(_0xe12ffe, "Format")["map"]((_0x133754) => {
    var _a2;
    return (_a2 = _0x133754["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x1f9fd7) => !!_0x1f9fd7));
  if (_0x4feb30["has"]("image/geotiff")) return "image/geotiff";
  if (_0x4feb30["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWcsTiffFormat(_0x20f619) {
  const _0x194eb7 = new Set(elementsByLocalName(_0x20f619, "formatSupported")["map"]((_0x34f83e) => {
    var _a2;
    return (_a2 = _0x34f83e["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x336d9f) => !!_0x336d9f));
  if (_0x194eb7["has"]("image/geotiff")) return "image/geotiff";
  if (_0x194eb7["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWmtsCapabilities(_0x2fbfe2) {
  var _a2;
  const _0x14b085 = [];
  for (const _0x58b24c of elementsByLocalName(_0x2fbfe2, "Layer")) {
    const _0x3a29f0 = childByLocalName(_0x58b24c, "Identifier");
    if (!(_0x3a29f0 == null ? void 0 : _0x3a29f0["textContent"])) continue;
    const _0x52e741 = childByLocalName(_0x58b24c, "Title"), _0x2eb958 = childByLocalName(_0x58b24c, "TileMatrixSetLink"), _0x6a5faa = _0x2eb958 ? childByLocalName(_0x2eb958, "TileMatrixSet") : void 0;
    _0x14b085["push"]({ "identifier": _0x3a29f0["textContent"]["trim"](), "title": ((_a2 = _0x52e741 == null ? void 0 : _0x52e741["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x3a29f0["textContent"]["trim"](), ...(_0x6a5faa == null ? void 0 : _0x6a5faa["textContent"]) && { "tileMatrixSetID": _0x6a5faa["textContent"]["trim"]() } });
  }
  return _0x14b085;
}
function parseWfsCapabilities(_0x47d2e0) {
  var _a2;
  const _0x57fc00 = [];
  for (const _0x4cc039 of elementsByLocalName(_0x47d2e0, "FeatureType")) {
    const _0x31483e = childByLocalName(_0x4cc039, "Name");
    if (!(_0x31483e == null ? void 0 : _0x31483e["textContent"])) continue;
    const _0x39a022 = childByLocalName(_0x4cc039, "Title");
    _0x57fc00["push"]({ "identifier": _0x31483e["textContent"]["trim"](), "title": ((_a2 = _0x39a022 == null ? void 0 : _0x39a022["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x31483e["textContent"]["trim"]() });
  }
  return _0x57fc00;
}
function parseWcsCapabilities(_0x47cb44) {
  var _a2, _b;
  const _0x2de56f = [];
  for (const _0x1ef063 of elementsByLocalName(_0x47cb44, "CoverageSummary")) {
    const _0x10cf0f = childByLocalName(_0x1ef063, "CoverageId") ?? childByLocalName(_0x1ef063, "Identifier");
    if (!(_0x10cf0f == null ? void 0 : _0x10cf0f["textContent"])) continue;
    const _0x23c21c = childByLocalName(_0x1ef063, "Title");
    _0x2de56f["push"]({ "identifier": _0x10cf0f["textContent"]["trim"](), "title": ((_a2 = _0x23c21c == null ? void 0 : _0x23c21c["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x10cf0f["textContent"]["trim"]() });
  }
  if (_0x2de56f["length"] > 0) return _0x2de56f;
  for (const _0x57a710 of elementsByLocalName(_0x47cb44, "CoverageOfferingBrief")) {
    const _0x7b26f7 = childByLocalName(_0x57a710, "name");
    if (!(_0x7b26f7 == null ? void 0 : _0x7b26f7["textContent"])) continue;
    const _0x266569 = childByLocalName(_0x57a710, "label");
    _0x2de56f["push"]({ "identifier": _0x7b26f7["textContent"]["trim"](), "title": ((_b = _0x266569 == null ? void 0 : _0x266569["textContent"]) == null ? void 0 : _b["trim"]()) || _0x7b26f7["textContent"]["trim"]() });
  }
  return _0x2de56f;
}
async function parseWcsCoverageEnvelope(_0x2d74b3) {
  var _a2, _b, _c, _d;
  const _0x512745 = childByLocalName(_0x2d74b3, "boundedBy"), _0x5c7b43 = _0x512745 ? childByLocalName(_0x512745, "Envelope") : void 0;
  if (!_0x5c7b43) return void 0;
  const _0x4859e5 = (_b = (_a2 = childByLocalName(_0x5c7b43, "lowerCorner")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"](), _0x41d214 = (_d = (_c = childByLocalName(_0x5c7b43, "upperCorner")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]();
  if (!_0x4859e5 || !_0x41d214) return void 0;
  const _0xf82921 = _0x4859e5["split"](/\s+/)["map"](Number), _0x175b98 = _0x41d214["split"](/\s+/)["map"](Number);
  if (_0xf82921["length"] < 2 || _0x175b98["length"] < 2) return void 0;
  if (![..._0xf82921, ..._0x175b98]["every"](Number["isFinite"])) return void 0;
  const _0x435348 = (_0x5c7b43["getAttribute"]("axisLabels") ?? "")["trim"]()["toLowerCase"](), _0x41e481 = (_0x5c7b43["getAttribute"]("uomLabels") ?? "")["toLowerCase"]();
  if (_0x41e481["includes"]("deg")) {
    const _0x2933df = _0x435348["startsWith"]("lat");
    return _0x2933df ? { "south": _0xf82921[0], "west": _0xf82921[1], "north": _0x175b98[0], "east": _0x175b98[1] } : { "west": _0xf82921[0], "south": _0xf82921[1], "east": _0x175b98[0], "north": _0x175b98[1] };
  }
  const _0x265533 = _0x5c7b43["getAttribute"]("srsName") ?? "";
  return resolveProjectedEnvelope(_0x265533, _0x435348, _0xf82921, _0x175b98);
}
async function resolveProjectedEnvelope(_0x10f5e4, _0x42ae13, _0x368c28, _0x3c4641) {
  const _0x53785c = extractEpsgCode(_0x10f5e4);
  if (!_0x53785c) return void 0;
  const _0x186e52 = await ensureProj4Def(_0x53785c);
  if (!_0x186e52) return void 0;
  try {
    const _0x48fd87 = _0x42ae13["startsWith"]("y") || _0x42ae13["startsWith"]("n"), _0x30f329 = (_0xbe76b4) => _0x48fd87 ? [_0xbe76b4[1], _0xbe76b4[0]] : [_0xbe76b4[0], _0xbe76b4[1]], [_0x5a8e8, _0x3b3e97] = _0x30f329(_0x368c28), [_0x37840f, _0x1aeb29] = _0x30f329(_0x3c4641), _0x1e1390 = [[_0x5a8e8, _0x3b3e97], [_0x37840f, _0x1aeb29], [_0x5a8e8, _0x1aeb29], [_0x37840f, _0x3b3e97]], _0x55bd9f = "EPSG:" + _0x53785c, _0x2ef266 = _0x1e1390["map"]((_0x5c989d) => _0x186e52(_0x55bd9f, "EPSG:4326", _0x5c989d)), _0x5f084c = _0x2ef266["map"]((_0x45e4e1) => _0x45e4e1[0]), _0x19df33 = _0x2ef266["map"]((_0x40ee3d) => _0x40ee3d[1]), _0x5e0e60 = { "west": Math["min"](..._0x5f084c), "east": Math["max"](..._0x5f084c), "south": Math["min"](..._0x19df33), "north": Math["max"](..._0x19df33) };
    if (!Object["values"](_0x5e0e60)["every"](Number["isFinite"])) return void 0;
    return _0x5e0e60;
  } catch {
    return void 0;
  }
}
async function fetchWcsCoverageExtents(_0x18c85b, _0x5737aa, _0x2de7dd, _0x43bb92) {
  var _a2;
  const _0x3c3f20 = /* @__PURE__ */ new Map();
  if (_0x5737aa["length"] === 0) return _0x3c3f20;
  try {
    const _0x55661c = new URL(_0x18c85b);
    _0x55661c["searchParams"]["set"]("SERVICE", "WCS"), _0x55661c["searchParams"]["set"]("VERSION", "2.0.1"), _0x55661c["searchParams"]["set"]("REQUEST", "DescribeCoverage"), _0x55661c["searchParams"]["set"]("COVERAGEID", _0x5737aa["join"](","));
    const _0x4e4fed = await getCapabilities(_0x55661c["toString"](), _0x2de7dd, _0x43bb92);
    for (const _0x48cc0b of elementsByLocalName(_0x4e4fed, "CoverageDescription")) {
      const _0x5e041b = childByLocalName(_0x48cc0b, "CoverageId"), _0x32e48a = (_a2 = _0x5e041b == null ? void 0 : _0x5e041b["textContent"]) == null ? void 0 : _a2["trim"]();
      if (!_0x32e48a) continue;
      const _0x609f72 = await parseWcsCoverageEnvelope(_0x48cc0b);
      if (_0x609f72) _0x3c3f20["set"](_0x32e48a, _0x609f72);
    }
  } catch {
  }
  return _0x3c3f20;
}
function wcsRectangleFor(_0x59c5ac) {
  const _0x3be86a = _0x59c5ac["geographicBoundingBox"];
  if (!_0x3be86a) return void 0;
  return Rectangle["fromDegrees"](_0x3be86a["west"], _0x3be86a["south"], _0x3be86a["east"], _0x3be86a["north"]);
}
function parseCapabilities(_0x704772, _0x235c31) {
  switch (_0x704772) {
    case "WMS":
      return parseWmsCapabilities(_0x235c31);
    case "WMTS":
      return parseWmtsCapabilities(_0x235c31);
    case "WFS":
      return parseWfsCapabilities(_0x235c31);
    case "WCS":
      return parseWcsCapabilities(_0x235c31);
    default:
      return [];
  }
}
function detectServiceType(_0x118f64) {
  const _0x166b09 = _0x118f64["documentElement"], _0x5f0b7f = _0x166b09["localName"], _0x349ff8 = _0x166b09["namespaceURI"] ?? "";
  if (_0x5f0b7f === "WMS_Capabilities" || _0x5f0b7f === "WMT_MS_Capabilities" || _0x349ff8["includes"]("/wms")) return "WMS";
  if (_0x5f0b7f === "WFS_Capabilities" || _0x349ff8["includes"]("/wfs")) return "WFS";
  if (_0x349ff8["includes"]("/wmts")) return "WMTS";
  if (_0x349ff8["includes"]("/wcs") || _0x5f0b7f === "WCS_Capabilities") return "WCS";
  return void 0;
}
const _OgcLayerFactory = class _OgcLayerFactory {
  constructor(_0x12cedf, _0x3e83ee) {
    this["viewer"] = _0x12cedf, this["deps"] = _0x3e83ee, this["serviceLayerOptions"] = /* @__PURE__ */ new Map();
  }
  ["getServiceOptions"](_0x37e670) {
    return this["serviceLayerOptions"]["get"](_0x37e670);
  }
  ["deleteServiceOptions"](_0x36ee55) {
    this["serviceLayerOptions"]["delete"](_0x36ee55);
  }
  ["buildWmsProvider"](_0x285779) {
    var _a2, _b;
    const _0xa145df = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x285779["url"]), _0x576529 = (_a2 = _0x285779["layers"]) == null ? void 0 : _a2["trim"]();
    if (!_0x576529) throw new LayerOperationError("LAYER_WMS_LAYERS_EMPTY", "WMS katmani eklenemedi: layers (ogcLayerName) bos — id=" + _0x285779["id"]);
    const _0x338527 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x285779["authToken"]), _0xa145df), _0x24269e = _0x285779["version"] ?? "1.3.0", _0xb6e750 = new WebMapServiceImageryProvider({ "url": _0x338527 ? new Resource({ "url": _0xa145df, "headers": _0x338527 }) : _0xa145df, "layers": _0x576529, "parameters": { "service": "WMS", "version": _0x24269e, "request": "GetMap", "transparent": "true", "format": "image/png", ..._0x285779["parameters"] }, "getFeatureInfoParameters": { "version": _0x24269e, "styles": ((_b = _0x285779["parameters"]) == null ? void 0 : _b["styles"]) ?? "" }, "getFeatureInfoFormats": [new GetFeatureInfoFormat("json"), new GetFeatureInfoFormat("xml", "application/vnd.ogc.gml"), new GetFeatureInfoFormat("xml", "text/xml"), new GetFeatureInfoFormat("html")], ..._0x285779["rectangle"] !== void 0 && { "rectangle": _0x285779["rectangle"] }, ..._0x285779["minimumLevel"] !== void 0 && { "minimumLevel": _0x285779["minimumLevel"] }, ..._0x285779["maximumLevel"] !== void 0 && { "maximumLevel": _0x285779["maximumLevel"] }, ..._0x285779["tileWidth"] !== void 0 && { "tileWidth": _0x285779["tileWidth"] }, ..._0x285779["tileHeight"] !== void 0 && { "tileHeight": _0x285779["tileHeight"] } });
    return _0xb6e750;
  }
  ["addWMS"](_0x45d476) {
    const _0x3fd40f = this["buildWmsProvider"](_0x45d476), _0x230e8b = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x3fd40f), _0x32131e = this["deps"]["register"](_0x45d476["id"], _0x45d476["title"], "WMS", _0x230e8b, ![]);
    return this["serviceLayerOptions"]["set"](_0x45d476["id"], _0x45d476), Promise["resolve"](_0x32131e);
  }
  ["buildWmtsProvider"](_0x2c5681) {
    const _0x275dbc = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wmts", _0x2c5681["url"]), _0x1b7bf8 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x2c5681["authToken"]), _0x275dbc);
    return new WebMapTileServiceImageryProvider({ "url": _0x1b7bf8 ? new Resource({ "url": _0x275dbc, "headers": _0x1b7bf8 }) : _0x275dbc, "layer": _0x2c5681["layer"], "style": _0x2c5681["style"] ?? "default", "tileMatrixSetID": _0x2c5681["tileMatrixSetID"], "format": _0x2c5681["format"] ?? "image/png", "tilingScheme": new WebMercatorTilingScheme(), ..._0x2c5681["tileWidth"] !== void 0 && { "tileWidth": _0x2c5681["tileWidth"] }, ..._0x2c5681["tileHeight"] !== void 0 && { "tileHeight": _0x2c5681["tileHeight"] }, ..._0x2c5681["minimumLevel"] !== void 0 && { "minimumLevel": _0x2c5681["minimumLevel"] }, ..._0x2c5681["maximumLevel"] !== void 0 && { "maximumLevel": _0x2c5681["maximumLevel"] }, ..._0x2c5681["rectangle"] !== void 0 && { "rectangle": _0x2c5681["rectangle"] } });
  }
  ["addWMTS"](_0x16ed7c) {
    const _0x2e8712 = this["buildWmtsProvider"](_0x16ed7c), _0x5b9fa9 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x2e8712), _0xefec6a = this["deps"]["register"](_0x16ed7c["id"], _0x16ed7c["title"], "WMTS", _0x5b9fa9, ![]);
    return this["serviceLayerOptions"]["set"](_0x16ed7c["id"], _0x16ed7c), Promise["resolve"](_0xefec6a);
  }
  async ["getWmsAvailableStyles"](_0x40c562) {
    const _0x49f8ed = this["requireServiceOptions"](_0x40c562, "WMS"), _0x274b88 = _0x49f8ed["version"] ?? "1.3.0", _0xffedf3 = await this["getCapabilitiesDocument"](_0x49f8ed["url"], "WMS", _0x274b88, _0x49f8ed["authToken"]);
    return parseWmsStyles(_0xffedf3, _0x49f8ed["layers"])["map"]((_0x2ee105) => ({ ..._0x2ee105, "legendUrl": this["getWmsLegendGraphicUrl"](_0x40c562, _0x2ee105["name"]) }));
  }
  async ["setWmsStyle"](_0xbc1ab5, _0x28b389) {
    const _0x2141e8 = this["requireServiceOptions"](_0xbc1ab5, "WMS"), _0x82a8c1 = { ..._0x2141e8, "parameters": { ..._0x2141e8["parameters"], "STYLES": _0x28b389 } };
    await this["rebuildImageryLayer"](_0xbc1ab5, () => this["buildWmsProvider"](_0x82a8c1)), this["serviceLayerOptions"]["set"](_0xbc1ab5, _0x82a8c1);
  }
  ["getWmsLegendGraphicUrl"](_0x21a7b4, _0x5acf20) {
    const _0x2be56c = this["requireServiceOptions"](_0x21a7b4, "WMS"), _0x886c0 = new URLSearchParams({ "service": "WMS", "version": _0x2be56c["version"] ?? "1.3.0", "request": "GetLegendGraphic", "format": "image/png", "layer": _0x2be56c["layers"], "sld_version": "1.1.0", ..._0x5acf20 !== void 0 && _0x5acf20 !== "" ? { "style": _0x5acf20 } : {} }), _0x218e0a = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x2be56c["url"]);
    return this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"]("" + _0x218e0a + (_0x218e0a["includes"]("?") ? "&" : "?") + _0x886c0["toString"]());
  }
  async ["getWmtsAvailableStyles"](_0x2f8d18) {
    const _0x5477f2 = this["requireServiceOptions"](_0x2f8d18, "WMTS"), _0x4847d9 = await this["getCapabilitiesDocument"](_0x5477f2["url"], "WMTS", "1.0.0", _0x5477f2["authToken"]), _0x2d664b = parseWmtsStyles(_0x4847d9, _0x5477f2["layer"]);
    return _0x2d664b["map"]((_0x1fc505) => ({ ..._0x1fc505, "legendUrl": this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"](_0x1fc505["legendUrl"]) }));
  }
  async ["setWmtsStyle"](_0x16259d, _0x5f050e) {
    const _0x1cb72e = this["requireServiceOptions"](_0x16259d, "WMTS"), _0x583d16 = { ..._0x1cb72e, "style": _0x5f050e };
    await this["rebuildImageryLayer"](_0x16259d, () => this["buildWmtsProvider"](_0x583d16)), this["serviceLayerOptions"]["set"](_0x16259d, _0x583d16);
  }
  async ["addWFS"](_0x2277c7) {
    const _0x4f5516 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wfs", _0x2277c7["url"]), _0x19b22b = {};
    _0x2277c7["authToken"] !== void 0 && (_0x19b22b["headers"] = { "Authorization": "Bearer " + _0x2277c7["authToken"] });
    const _0x2fb4be = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](_0x19b22b["headers"], _0x4f5516);
    if (_0x2fb4be !== void 0) _0x19b22b["headers"] = _0x2fb4be;
    const _0x54ab28 = { ..._0x2277c7, "url": _0x4f5516 }, _0x420825 = await fetchWfsCapabilities(_0x4f5516, _0x19b22b), _0xc8e347 = { "typeNameHint": _0x2277c7["typeName"], "caps": _0x420825 };
    if (_0x2277c7["version"] !== void 0) _0xc8e347["version"] = _0x2277c7["version"];
    if (_0x2277c7["srsName"] !== void 0) _0xc8e347["srsName"] = _0x2277c7["srsName"];
    _0x2277c7["outputFormat"] !== void 0 && (_0xc8e347["outputFormat"] = _0x2277c7["outputFormat"]);
    _0x2277c7["maxFeatures"] !== void 0 ? _0xc8e347["maxFeatures"] = _0x2277c7["maxFeatures"] : _0xc8e347["maxFeatures"] = _OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"];
    const _0x1d4326 = buildWfsGetFeaturePlan(_0xc8e347);
    let _0x2cf54f;
    try {
      _0x2cf54f = await this["fetchWfsGeoJson"](_0x54ab28, _0x19b22b, _0x1d4326);
    } catch (_0x2ab774) {
      try {
        _0x2cf54f = await this["fetchWfsGml"](_0x54ab28, _0x19b22b, _0x1d4326);
      } catch (_0x415632) {
        _0x415632 instanceof Error && (_0x415632["cause"] = _0x2ab774);
        throw _0x415632;
      }
    }
    const _0x481cba = _0x2cf54f !== null && typeof _0x2cf54f === "object" ? _0x2cf54f["features"] : void 0;
    return Array["isArray"](_0x481cba) ? _0x481cba["length"] : _0x1d4326["maxFeatures"], loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x2cf54f, { "id": _0x2277c7["id"], "title": _0x2277c7["title"], "layerType": "WFS", "clampToGround": _0x2277c7["clampToGround"] ?? ![] }, (_0x1caeec) => {
    });
  }
  async ["fetchWfsHitsCount"](_0x5a654a, _0x2bb1c6, _0x3ae9bc) {
    if (!_0x3ae9bc["version"]["startsWith"]("2.") && !_0x3ae9bc["version"]["startsWith"]("1.1")) return void 0;
    const _0x53b98a = new URLSearchParams();
    appendWfsGetFeatureParams(_0x53b98a, _0x3ae9bc), _0x53b98a["delete"]("count"), _0x53b98a["delete"]("maxFeatures"), _0x53b98a["set"]("resultType", "hits");
    let _0x40fe84;
    try {
      _0x40fe84 = await fetch("" + _0x5a654a["url"] + (_0x5a654a["url"]["includes"]("?") ? "&" : "?") + _0x53b98a["toString"](), _0x2bb1c6);
    } catch {
      return void 0;
    }
    if (!_0x40fe84["ok"]) return void 0;
    const _0x46ae40 = decodeTextBuffer(await _0x40fe84["arrayBuffer"]());
    if (isOgcExceptionXml(_0x46ae40)) return void 0;
    const _0x44b302 = _0x46ae40["trimStart"]();
    if (_0x44b302["startsWith"]("{")) try {
      const _0xb7705a = JSON["parse"](_0x44b302), _0x3d50ce = _0xb7705a["numberMatched"] ?? _0xb7705a["totalFeatures"];
      return typeof _0x3d50ce === "number" ? _0x3d50ce : void 0;
    } catch {
      return void 0;
    }
    try {
      const _0x16dcc4 = new DOMParser()["parseFromString"](_0x46ae40, "application/xml")["documentElement"], _0x3b8481 = _0x16dcc4["getAttribute"]("numberMatched") ?? _0x16dcc4["getAttribute"]("numberOfFeatures") ?? _0x16dcc4["getAttribute"]("numberReturned");
      if (!_0x3b8481) return void 0;
      const _0xa500f5 = Number(_0x3b8481);
      return Number["isFinite"](_0xa500f5) ? _0xa500f5 : void 0;
    } catch {
      return void 0;
    }
  }
  async ["fetchWfsGeoJson"](_0x4a5a23, _0x5dd33f, _0x4ce87c) {
    const _0xd8073c = _0x4ce87c["jsonOutputFormat"];
    if (!_0xd8073c) throw new OgcRequestError("OGC_WFS_JSON_FORMAT_UNSUPPORTED", "WFS sunucusu JSON çıktı formatı ilan etmiyor.");
    const _0x4495b8 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x4495b8, _0x4ce87c, _0xd8073c);
    const _0x465b89 = await fetch("" + _0x4a5a23["url"] + (_0x4a5a23["url"]["includes"]("?") ? "&" : "?") + _0x4495b8["toString"](), _0x5dd33f), _0x273365 = decodeTextBuffer(await _0x465b89["arrayBuffer"]());
    if (!_0x465b89["ok"] || isOgcExceptionXml(_0x273365) || !_0x273365["trimStart"]()["startsWith"]("{")) throw new OgcRequestError("OGC_WFS_GEOJSON_REQUEST_FAILED", "WFS GeoJSON isteği başarısız: " + _0x465b89["status"] + " " + _0x465b89["statusText"]);
    return JSON["parse"](_0x273365);
  }
  async ["fetchWfsGml"](_0x1ac667, _0x4bb1f5, _0x796bf0) {
    const _0x285a23 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x285a23, _0x796bf0);
    const _0x463e87 = await fetch("" + _0x1ac667["url"] + (_0x1ac667["url"]["includes"]("?") ? "&" : "?") + _0x285a23["toString"](), _0x4bb1f5);
    if (!_0x463e87["ok"]) throw new OgcRequestError("OGC_WFS_REQUEST_FAILED", "WFS isteği başarısız: " + _0x463e87["status"] + " " + _0x463e87["statusText"]);
    const _0x186d37 = decodeTextBuffer(await _0x463e87["arrayBuffer"]());
    if (isOgcExceptionXml(_0x186d37)) throw new OgcRequestError("OGC_WFS_EXCEPTION", "WFS GetFeature OGC Exception döndü.");
    let _0x31afa3, _0x533191;
    try {
      ({ default: _0x31afa3 } = await import("ol/format/WFS.js")), { default: _0x533191 } = await import("ol/format/GeoJSON.js");
    } catch {
      throw new OgcRequestError("OGC_WFS_OL_PACKAGE_MISSING", 'WFS sunucusu GeoJSON çıktısı desteklemiyor; GML yanıtını okumak için "ol" paketi gereklidir: pnpm add ol');
    }
    const _0x2a5e90 = new _0x31afa3({ "version": _0x796bf0["version"] })["readFeatures"](_0x186d37);
    return new _0x533191()["writeFeaturesObject"](_0x2a5e90, { "featureProjection": "EPSG:4326" });
  }
  async ["addWCS"](_0x59ea0c) {
    const _0x1d766d = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x59ea0c["url"]), _0x1a32a4 = { "service": "WCS", "version": _0x59ea0c["version"] ?? "2.0.1", "request": "GetCoverage", "coverageId": _0x59ea0c["coverageId"], "format": _0x59ea0c["format"] ?? "image/png" }, _0x3fd570 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x59ea0c["authToken"]), _0x1d766d), _0x57c244 = _0x59ea0c["rectangle"] ?? Rectangle["fromDegrees"](-180, -90, 180, 90), _0x362c5e = async (_0x24e1e7) => {
      const _0x37e471 = { ..._0x1a32a4 };
      if (_0x24e1e7 !== void 0) _0x37e471["SCALESIZE"] = _0x24e1e7;
      const _0x2db2db = _0x1d766d + "?" + new URLSearchParams(_0x37e471)["toString"](), _0x8282c2 = await this["resolveWcsImageUrl"](_0x2db2db, _0x3fd570);
      try {
        return await SingleTileImageryProvider["fromUrl"](_0x8282c2, { "rectangle": _0x57c244 });
      } finally {
        if (_0x8282c2["startsWith"]("blob:")) URL["revokeObjectURL"](_0x8282c2);
      }
    }, _0x259b5d = _0x59ea0c["maxSize"] ?? 2048, _0x2266ed = _0x1a32a4["version"]["startsWith"]("2.") && Number["isFinite"](_0x259b5d);
    let _0x3823a6;
    if (!_0x2266ed) _0x3823a6 = await _0x362c5e();
    else {
      const _0x184765 = "http://www.opengis.net/def/axis/OGC/1/i(" + _0x259b5d + "),http://www.opengis.net/def/axis/OGC/1/j(" + _0x259b5d + ")";
      try {
        _0x3823a6 = await _0x362c5e(_0x184765);
      } catch {
        _0x3823a6 = await _0x362c5e("x(" + _0x259b5d + "),y(" + _0x259b5d + ")");
      }
    }
    const _0x34a492 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x3823a6);
    return this["serviceLayerOptions"]["set"](_0x59ea0c["id"], _0x59ea0c), this["deps"]["register"](_0x59ea0c["id"], _0x59ea0c["title"], "WCS", _0x34a492, ![]);
  }
  async ["resolveWcsImageUrl"](_0x5a47ab, _0x1c58d7) {
    const _0x5aea09 = await fetch(_0x5a47ab, _0x1c58d7 ? { "headers": _0x1c58d7 } : void 0);
    if (!_0x5aea09["ok"]) throw new OgcRequestError("OGC_WCS_REQUEST_FAILED", "WCS isteği başarısız: " + _0x5aea09["status"] + " " + _0x5aea09["statusText"]);
    const _0xddc38a = _0x5aea09["headers"]["get"]("content-type") ?? "", _0x3dd48d = await _0x5aea09["arrayBuffer"](), _0x5d8c94 = /boundary="?([^";]+)"?/i["exec"](_0xddc38a);
    if (!_0xddc38a["includes"]("multipart/") || !_0x5d8c94) return URL["createObjectURL"](new Blob([_0x3dd48d], { "type": _0xddc38a || "image/png" }));
    const _0x30869c = extractMultipartImage(new Uint8Array(_0x3dd48d), _0x5d8c94[1]), _0x21b685 = _0x30869c["bytes"]["buffer"]["slice"](_0x30869c["bytes"]["byteOffset"], _0x30869c["bytes"]["byteOffset"] + _0x30869c["bytes"]["byteLength"]);
    return URL["createObjectURL"](new Blob([_0x21b685], { "type": _0x30869c["mimeType"] }));
  }
  ["addGeoTiff"](_0x26548b) {
    throw new LayerOperationError("LAYER_GEOTIFF_UNSUPPORTED", "GeoTIFF katmanı bu Cesium sürümünde (≥1.143) henüz desteklenmiyor. GeoTiffImageryProvider mevcut değil. geotiff.js ile özel provider gereklidir.");
  }
  ["requireServiceOptions"](_0xaf97bb, _0x3bbf74) {
    const _0x37259a = this["deps"]["requireLayer"](_0xaf97bb);
    if (_0x37259a["layerType"] !== _0x3bbf74) throw new LayerOperationError("LAYER_TYPE_MISMATCH", "Katman " + _0x3bbf74 + ' değil: "' + _0xaf97bb + '" (' + _0x37259a["layerType"] + ")");
    const _0x4eeff5 = this["serviceLayerOptions"]["get"](_0xaf97bb);
    if (_0x4eeff5 === void 0) throw new LayerOperationError("LAYER_SERVICE_OPTIONS_NOT_FOUND", 'Katman için orijinal servis seçenekleri bulunamadı: "' + _0xaf97bb + '"');
    return _0x4eeff5;
  }
  async ["rebuildImageryLayer"](_0x57a5c3, _0x36bdd4) {
    const _0x4528fa = this["deps"]["requireLayer"](_0x57a5c3);
    if (!(_0x4528fa["cesiumObject"] instanceof ImageryLayer)) throw new LayerOperationError("LAYER_NOT_RASTER", 'Katman raster (ImageryLayer) değil: "' + _0x57a5c3 + '"');
    const _0x270eb8 = _0x4528fa["cesiumObject"], _0x276998 = this["viewer"]["imageryLayers"]["indexOf"](_0x270eb8), { show: _0x461364, alpha: _0x6013a } = _0x270eb8, _0x1c94a0 = _0x36bdd4(), _0x51162a = new ImageryLayer(_0x1c94a0, { "show": _0x461364, "alpha": _0x6013a });
    this["viewer"]["imageryLayers"]["remove"](_0x270eb8, !![]), this["viewer"]["imageryLayers"]["add"](_0x51162a, _0x276998), this["deps"]["setItem"](_0x57a5c3, Object["freeze"]({ ..._0x4528fa, "cesiumObject": _0x51162a }));
  }
  async ["getCapabilitiesDocument"](_0x346d78, _0x1a7143, _0xe2128d, _0x22f086) {
    const _0x3b6d45 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x1a7143["toLowerCase"](), _0x346d78), _0x304cf8 = buildCapabilitiesUrl(_0x3b6d45, _0x1a7143, _0xe2128d);
    return getCapabilities(_0x304cf8, _0x22f086, this["deps"]["apiKeyPolicy"]);
  }
  async ["getWcsCoverageExtents"](_0x570199, _0x2a1c64, _0xed569e) {
    const _0x3f7aac = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x570199);
    return fetchWcsCoverageExtents(_0x3f7aac, _0x2a1c64, _0xed569e, this["deps"]["apiKeyPolicy"]);
  }
};
_OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"] = 1e6;
let OgcLayerFactory = _OgcLayerFactory;
class ShapeLayerBridge {
  constructor(_0x354cce, _0x163622) {
    this["viewer"] = _0x354cce, this["deps"] = _0x163622, this["drawnShapeCounters"] = /* @__PURE__ */ new Map();
  }
  ["deleteCounter"](_0x4e5c36) {
    this["drawnShapeCounters"]["delete"](_0x4e5c36);
  }
  async ["addDrawnShape"](_0x1f2bfe, _0x526777, _0x224d01) {
    const _0x5b9379 = _0x224d01["entity"];
    this["viewer"]["entities"]["remove"](_0x5b9379);
    const _0x22d61b = (this["drawnShapeCounters"]["get"](_0x1f2bfe) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x1f2bfe, _0x22d61b), _0x5b9379["properties"] = buildDrawnShapeProperties(_0x224d01, _0x22d61b);
    const _0xc65c4a = this["deps"]["getItem"](_0x1f2bfe), _0x4667b5 = _0xc65c4a && "entities" in _0xc65c4a["cesiumObject"] ? _0xc65c4a["cesiumObject"] : new CustomDataSource(_0x526777), _0x355a2b = _0xc65c4a ? this["deps"]["getStyle"](_0x1f2bfe) : void 0, _0x2a5f67 = (_0x355a2b == null ? void 0 : _0x355a2b["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x355a2b["fill"]["color"])["withAlpha"](_0x355a2b["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x5bd0af = (_0x355a2b == null ? void 0 : _0x355a2b["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x5b9379, _0x2a5f67, _0x5bd0af, !![]), _0x4667b5["entities"]["add"](_0x5b9379);
    _0x5b9379["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x4667b5, _0x5b9379, Color["fromCssColorString"](_0x5bd0af["color"]), _0x5bd0af["width"], ![]);
    if (_0xc65c4a) return this["deps"]["tagEntities"](_0x4667b5, _0x1f2bfe), _0xc65c4a;
    await this["viewer"]["dataSources"]["add"](_0x4667b5);
    const _0x3d7cb6 = Color["CYAN"]["toCssHexString"](), _0x5969e7 = this["deps"]["register"](_0x1f2bfe, _0x526777, "DRAWING", _0x4667b5, ![], _0x3d7cb6);
    return this["deps"]["recordInitialStyle"](_0x5969e7["id"], _0x3d7cb6, 0.4, _0x5bd0af), _0x5969e7;
  }
  async ["addMeasuredShape"](_0x21de5e, _0x139a8c, _0x58a69a) {
    const _0x19664f = _0x58a69a["entity"];
    this["viewer"]["entities"]["remove"](_0x19664f);
    const _0xebe1a9 = (this["drawnShapeCounters"]["get"](_0x21de5e) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x21de5e, _0xebe1a9), _0x19664f["properties"] = buildMeasuredShapeProperties(_0x58a69a, _0xebe1a9);
    const _0x946e39 = this["deps"]["getItem"](_0x21de5e), _0x3ac51c = _0x946e39 && "entities" in _0x946e39["cesiumObject"] ? _0x946e39["cesiumObject"] : new CustomDataSource(_0x139a8c), _0x4871b5 = _0x946e39 ? this["deps"]["getStyle"](_0x21de5e) : void 0, _0x4ff6fa = (_0x4871b5 == null ? void 0 : _0x4871b5["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x4871b5["fill"]["color"])["withAlpha"](_0x4871b5["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x4e62c9 = (_0x4871b5 == null ? void 0 : _0x4871b5["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x19664f, _0x4ff6fa, _0x4e62c9, !![]), _0x3ac51c["entities"]["add"](_0x19664f);
    _0x19664f["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x3ac51c, _0x19664f, Color["fromCssColorString"](_0x4e62c9["color"]), _0x4e62c9["width"], ![]);
    if (_0x946e39) return this["deps"]["tagEntities"](_0x3ac51c, _0x21de5e), _0x946e39;
    await this["viewer"]["dataSources"]["add"](_0x3ac51c);
    const _0x41067b = Color["CYAN"]["toCssHexString"](), _0x4a453e = this["deps"]["register"](_0x21de5e, _0x139a8c, "MEASURE", _0x3ac51c, ![], _0x41067b);
    return this["deps"]["recordInitialStyle"](_0x4a453e["id"], _0x41067b, 0.4, _0x4e62c9), _0x4a453e;
  }
  ["removeDrawnShape"](_0x38cff2, _0x343691) {
    const _0x4cf6bc = this["deps"]["getItem"](_0x38cff2);
    if (!_0x4cf6bc || !("entities" in _0x4cf6bc["cesiumObject"])) return;
    _0x4cf6bc["cesiumObject"]["entities"]["removeById"](_0x343691["id"] + "::outline"), _0x4cf6bc["cesiumObject"]["entities"]["remove"](_0x343691), _0x4cf6bc["cesiumObject"]["entities"]["values"]["length"] === 0 && this["deps"]["removeLayer"](_0x38cff2);
  }
}
const DRAWN_SHAPE_LABELS = { "point": "Nokta", "polyline": "Çizgi", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function roundMeters(_0x7bd9da) {
  return Math["round"](_0x7bd9da * 100) / 100;
}
function roundCoordinate(_0x28ed25) {
  return Math["round"](_0x28ed25 * 1e6) / 1e6;
}
function wktCoordinatePair(_0x1a1ac6) {
  return roundCoordinate(_0x1a1ac6[0]) + " " + roundCoordinate(_0x1a1ac6[1]);
}
function geometryToWkt(_0x3544af) {
  switch (_0x3544af["type"]) {
    case "Point": {
      const _0xd44267 = _0x3544af["coordinates"];
      return "POINT (" + wktCoordinatePair(_0xd44267) + ")";
    }
    case "LineString": {
      const _0x267422 = _0x3544af["coordinates"];
      return "LINESTRING (" + _0x267422["map"]((_0x535f26) => wktCoordinatePair(_0x535f26))["join"](", ") + ")";
    }
    case "Polygon": {
      const _0x2d8d26 = _0x3544af["coordinates"], _0x5af882 = _0x2d8d26["map"]((_0x15bb8d) => "(" + _0x15bb8d["map"]((_0x41aa1c) => wktCoordinatePair(_0x41aa1c))["join"](", ") + ")")["join"](", ");
      return "POLYGON (" + _0x5af882 + ")";
    }
    default:
      return "";
  }
}
function buildDrawnShapeProperties(_0x4b0119, _0x1c086e) {
  const _0x441e11 = { "id": _0x1c086e, "sekil": DRAWN_SHAPE_LABELS[_0x4b0119["tool"]] };
  if (_0x4b0119["length"] !== void 0) _0x441e11["uzunluk_m"] = roundMeters(_0x4b0119["length"]);
  if (_0x4b0119["area"] !== void 0) _0x441e11["alan_m2"] = roundMeters(_0x4b0119["area"]);
  if (_0x4b0119["perimeter"] !== void 0) _0x441e11["cevre_m"] = roundMeters(_0x4b0119["perimeter"]);
  if (_0x4b0119["radius"] !== void 0) _0x441e11["yaricap_m"] = roundMeters(_0x4b0119["radius"]);
  return _0x441e11["olusturma_tarihi"] = new Date(_0x4b0119["createdAt"])["toLocaleString"]("tr-TR"), _0x441e11["geomwkt"] = geometryToWkt(_0x4b0119["geometry"]), new PropertyBag(_0x441e11);
}
const MEASURED_SHAPE_LABELS = { "point": "Nokta", "polyline": "Mesafe", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function buildMeasuredShapeProperties(_0xc514e9, _0x1b58ee) {
  const _0x2a59e0 = { "id": _0x1b58ee, "olcum_turu": MEASURED_SHAPE_LABELS[_0xc514e9["tool"]] };
  if (_0xc514e9["length"] !== void 0) _0x2a59e0["uzunluk_m"] = roundMeters(_0xc514e9["length"]);
  if (_0xc514e9["area"] !== void 0) _0x2a59e0["alan_m2"] = roundMeters(_0xc514e9["area"]);
  if (_0xc514e9["perimeter"] !== void 0) _0x2a59e0["cevre_m"] = roundMeters(_0xc514e9["perimeter"]);
  return _0x2a59e0["olusturma_tarihi"] = new Date(_0xc514e9["createdAt"])["toLocaleString"]("tr-TR"), _0x2a59e0["geomwkt"] = geometryToWkt(_0xc514e9["geometry"]), new PropertyBag(_0x2a59e0);
}
const _LayerManager = class _LayerManager extends EventEmitter {
  constructor(_0x4a5a03) {
    super(), this["items"] = /* @__PURE__ */ new Map(), this["analysisResultIds"] = /* @__PURE__ */ new Set(), this["viewer"] = _0x4a5a03, this["apiKeyPolicy"] = new ApiKeyPolicy({ "apiBase": () => getUcbpApiBase() }), this["outlineGeometry"] = new OutlineGeometry({ "getCurrentTime": () => this["viewer"]["clock"]["currentTime"] }), this["opacityController"] = new OpacityController({ "requestRender": () => this["viewer"]["scene"]["requestRender"]() }), this["styleEngine"] = new LayerStyleEngine({ "outlineGeometry": this["outlineGeometry"], "opacityController": this["opacityController"], "getCurrentTime": () => this["viewer"]["clock"]["currentTime"], "requestRender": () => this["viewer"]["scene"]["requestRender"](), "emitStyle": (_0x75b7e1, _0x90acad) => this["emit"]("layer:style", { "id": _0x75b7e1, "style": _0x90acad }), "waitForRenderSettle": () => this["waitForRenderSettle"]() }), this["localSourceLoader"] = new LocalSourceLoader(_0x4a5a03, { "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "addPolygonOutlines": (_0x2bfefb, _0x28753c, _0x51cfdd) => this["addPolygonOutlines"](_0x2bfefb, _0x28753c, _0x51cfdd), "register": (_0x2ac35a, _0x4802c5, _0x28f121, _0x3baf84, _0x535cea, _0x28e701) => this["register"](_0x2ac35a, _0x4802c5, _0x28f121, _0x3baf84, _0x535cea, _0x28e701), "emitCrsCheckResult": (_0x2df0bc, _0x232364) => this["emitCrsCheckResult"](_0x2df0bc, _0x232364), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["shapeLayerBridge"] = new ShapeLayerBridge(_0x4a5a03, { "getItem": (_0x1f563d) => this["items"]["get"](_0x1f563d), "getStyle": (_0x2eaa22) => this["styleEngine"]["getStyle"](_0x2eaa22), "applyEntityStyle": (_0x1c1fc4, _0x1355a4, _0x198b03, _0x5047c7) => this["applyEntityStyle"](_0x1c1fc4, _0x1355a4, _0x198b03, _0x5047c7), "addPolygonOutlineCompanion": (_0x18b7a6, _0x49f2bd, _0x436212, _0x5b7950, _0x4546d8) => this["addPolygonOutlineCompanion"](_0x18b7a6, _0x49f2bd, _0x436212, _0x5b7950, _0x4546d8), "tagEntities": (_0x2021b0, _0x36a152) => this["tagEntities"](_0x2021b0, _0x36a152), "register": (_0x28e77d, _0xabb03d, _0x364f11, _0x2fd2e5, _0x25ea3f, _0x327af2) => this["register"](_0x28e77d, _0xabb03d, _0x364f11, _0x2fd2e5, _0x25ea3f, _0x327af2), "recordInitialStyle": (_0x46c224, _0xa7655a, _0x9b23e5, _0x2d9696) => this["styleEngine"]["recordInitialStyle"](_0x46c224, _0xa7655a, _0x9b23e5, _0x2d9696), "removeLayer": (_0x1bce89) => this["removeLayer"](_0x1bce89), "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["ogcLayerFactory"] = new OgcLayerFactory(_0x4a5a03, { "apiKeyPolicy": this["apiKeyPolicy"], "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "requireLayer": (_0x689460) => this["requireLayer"](_0x689460), "setItem": (_0x4c4abc, _0x30ecf7) => this["items"]["set"](_0x4c4abc, _0x30ecf7), "register": (_0x3cfd2f, _0x28b857, _0x3b8032, _0x6e17a9, _0x24d7ad, _0x55c1ab) => this["register"](_0x3cfd2f, _0x28b857, _0x3b8032, _0x6e17a9, _0x24d7ad, _0x55c1ab), "addPolygonOutlines": (_0x14cd53, _0x8a55e, _0x3a1581) => this["addPolygonOutlines"](_0x14cd53, _0x8a55e, _0x3a1581), "emitCrsCheckResult": (_0x5203a8, _0x125f6f) => this["emitCrsCheckResult"](_0x5203a8, _0x125f6f), "emitFeaturesTruncated": (_0x3d6e98, _0xc640b4, _0x35fbe9) => this["emit"]("layer:features-truncated", { "id": _0x3d6e98, "totalCount": _0xc640b4, "loadedCount": _0x35fbe9 }), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["cameraHighlight"] = new CameraHighlight(_0x4a5a03, { "requireLayer": (_0x4d6793) => this["requireLayer"](_0x4d6793), "getLayerStyle": (_0x226000) => this["getLayerStyle"](_0x226000) });
  }
  ["configure"](_0x5ae693) {
    this["apiKeyPolicy"]["configure"](_0x5ae693), _0x5ae693["apiKey"] !== void 0 && this["emit"]("apiKey:change", { "hasApiKey": !![] });
  }
  get ["hasApiKey"]() {
    return this["apiKeyPolicy"]["hasApiKey"];
  }
  async ["getAuthorizedLayers"]() {
    return this["apiKeyPolicy"]["getAuthorizedLayers"]();
  }
  async ["getLayerList"]() {
    return this["apiKeyPolicy"]["getLayerList"]();
  }
  ["canAddAuthorizedLayer"](_0x88efc3) {
    return this["apiKeyPolicy"]["canAddAuthorizedLayer"](_0x88efc3);
  }
  async ["addAuthorizedLayer"](_0x180f6d) {
    const _0x142903 = this["apiKeyPolicy"]["resolveAddOptions"](_0x180f6d);
    if (_0x142903["layerType"] === "WMS") return this["add"]("WMS", _0x142903["options"]);
    if (_0x142903["layerType"] === "WFS") return this["add"]("WFS", _0x142903["options"]);
    return this["add"]("WMTS", _0x142903["options"]);
  }
  ["layerRequiresApiKey"](_0x81452a) {
    return this["apiKeyPolicy"]["layerRequiresApiKey"](_0x81452a);
  }
  ["getLayers"]() {
    return Array["from"](this["items"]["values"]());
  }
  ["getLayerById"](_0xf4fe17) {
    return this["items"]["get"](_0xf4fe17);
  }
  ["getEntityPropertyNames"](_0x154f0e) {
    const _0x325436 = this["requireLayer"](_0x154f0e);
    if (!("entities" in _0x325436["cesiumObject"])) return [];
    const _0x217562 = /* @__PURE__ */ new Set();
    for (const _0x41eebf of _0x325436["cesiumObject"]["entities"]["values"]) {
      const _0x323db9 = _0x41eebf["properties"];
      if (_0x323db9 === void 0) continue;
      for (const _0x2156d7 of _0x323db9["propertyNames"]) {
        if (_0x2156d7 === "layerId" || _0x2156d7 === "featureId") continue;
        _0x217562["add"](_0x2156d7);
      }
    }
    return Array["from"](_0x217562);
  }
  ["getUniqueColumnValues"](_0x49d7f1, _0xe8b6ec) {
    const _0x233a35 = this["requireLayer"](_0x49d7f1);
    if (!("entities" in _0x233a35["cesiumObject"])) return [];
    const _0x554b7a = this["viewer"]["clock"]["currentTime"], _0x418d86 = /* @__PURE__ */ new Set();
    for (const _0x5c5222 of _0x233a35["cesiumObject"]["entities"]["values"]) {
      const _0x20cf73 = this["readProperty"](_0x5c5222, _0xe8b6ec, _0x554b7a);
      if (_0x20cf73 !== null) _0x418d86["add"](_0x20cf73);
    }
    return Array["from"](_0x418d86);
  }
  ["getFeatureCount"](_0x779f94) {
    const _0x21b7b7 = this["requireLayer"](_0x779f94);
    if (!("entities" in _0x21b7b7["cesiumObject"])) return void 0;
    let _0x32214b = 0;
    for (const _0xf4aaed of _0x21b7b7["cesiumObject"]["entities"]["values"]) {
      if (!this["isOutlineCompanion"](_0xf4aaed)) _0x32214b++;
    }
    return _0x32214b;
  }
  ["getLayerGeoJSON"](_0x4e935c) {
    return getLayerGeoJSON(this["requireLayer"](_0x4e935c), this["viewer"]["clock"]["currentTime"], (_0xcbeb81) => this["isOutlineCompanion"](_0xcbeb81));
  }
  ["exportLayerGeoJSON"](_0x5ab66b, _0x3b34b0 = "katman") {
    exportLayerGeoJSON(this["getLayerGeoJSON"](_0x5ab66b), _0x3b34b0);
  }
  ["exportLayerKml"](_0x1ace79, _0x1004ba = "katman") {
    exportLayerKml(this["getLayerGeoJSON"](_0x1ace79), _0x1004ba);
  }
  ["exportLayerShapefile"](_0x4a49d8, _0x12e7cd = "katman") {
    exportLayerShapefile(this["getLayerGeoJSON"](_0x4a49d8), _0x12e7cd);
  }
  ["markAnalysisResult"](_0x33cf87) {
    this["analysisResultIds"]["add"](_0x33cf87);
  }
  ["isAnalysisResult"](_0x4e18d2) {
    return this["analysisResultIds"]["has"](_0x4e18d2);
  }
  ["isGeoTiffExportAvailable"](_0x51ce60) {
    return isGeoTiffExportAvailable(this["items"]["get"](_0x51ce60), this["ogcLayerFactory"]["getServiceOptions"](_0x51ce60));
  }
  async ["exportLayerAsGeoTiff"](_0x31fd29, _0x47485b = "katman") {
    const _0x54c8c1 = this["requireLayer"](_0x31fd29);
    await exportLayerAsGeoTiff(_0x54c8c1, this["ogcLayerFactory"]["getServiceOptions"](_0x31fd29), _0x47485b, (_0x371db0, _0x495e2f) => this["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x371db0, _0x495e2f), { "mergeApiKeyHeader": (_0x1543b1, _0xe101f5) => this["apiKeyPolicy"]["mergeApiKeyHeader"](_0x1543b1, _0xe101f5), "buildAuthHeaders": (_0xd4f2d4) => this["apiKeyPolicy"]["buildAuthHeaders"](_0xd4f2d4) });
  }
  ["getColumnRange"](_0xe22b84, _0x144d36) {
    const _0xc05a13 = this["requireLayer"](_0xe22b84);
    if (!("entities" in _0xc05a13["cesiumObject"])) return null;
    return this["styleEngine"]["getColumnRange"](_0xc05a13["cesiumObject"], this["viewer"]["clock"]["currentTime"], _0x144d36);
  }
  async ["applyLayerStyle"](_0x5932ba, _0xdd106f) {
    const _0x23d1ae = this["requireLayer"](_0x5932ba);
    if (!("entities" in _0x23d1ae["cesiumObject"])) throw new LayerOperationError("LAYER_STYLE_NOT_VECTOR", 'applyLayerStyle sadece vektör (Entity tabanlı) katmanlarda kullanılabilir: "' + _0x5932ba + '"');
    await this["styleEngine"]["applyLayerStyle"](_0x5932ba, _0x23d1ae["cesiumObject"], _0x23d1ae["layerType"] === "DRAWING" || _0x23d1ae["layerType"] === "MEASURE", _0xdd106f);
  }
  ["getLayerStyle"](_0x56f34f) {
    return this["styleEngine"]["getStyle"](_0x56f34f);
  }
  ["getInitialFillColor"](_0x3ad263) {
    var _a2;
    return (_a2 = this["items"]["get"](_0x3ad263)) == null ? void 0 : _a2["initialFillColor"];
  }
  ["getImageryLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x6833a8) => !_0x6833a8["isBasemap"] && _0x6833a8["cesiumObject"] instanceof ImageryLayer)["map"]((_0x20480d) => _0x20480d["cesiumObject"]);
  }
  ["getBasemapLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x54a326) => _0x54a326["isBasemap"] && _0x54a326["cesiumObject"] instanceof ImageryLayer)["map"]((_0x266bf6) => _0x266bf6["cesiumObject"]);
  }
  ["getDataSourceLayers"]() {
    return this["viewer"]["dataSources"];
  }
  ["getLayerByType"](_0x45a975) {
    return Array["from"](this["items"]["values"]())["filter"]((_0x51becf) => _0x51becf["layerType"] === _0x45a975);
  }
  async ["zoomToLayer"](_0x4f9294) {
    return this["cameraHighlight"]["zoomToLayer"](_0x4f9294);
  }
  async ["zoomToEntity"](_0x9f25f8, _0x308818) {
    return this["cameraHighlight"]["zoomToEntity"](_0x9f25f8, _0x308818);
  }
  ["highlightEntity"](_0x22647d) {
    this["cameraHighlight"]["highlightEntity"](_0x22647d);
  }
  ["clearHighlight"]() {
    this["cameraHighlight"]["clearHighlight"]();
  }
  async ["add"](_0xa8887a, _0x34ab02) {
    this["assertUniqueId"](_0x34ab02["id"]);
    switch (_0xa8887a) {
      case "WMS":
        return this["addWMS"](_0x34ab02);
      case "WMTS":
        return this["addWMTS"](_0x34ab02);
      case "WFS":
        return this["addWFS"](_0x34ab02);
      case "WCS":
        return this["addWCS"](_0x34ab02);
      case "GEOTIFF":
        return this["addGeoTiff"](_0x34ab02);
      case "GEOJSON":
      case "KML":
      case "KMZ":
        return this["addLocalKmlGeoJson"](_0xa8887a, _0x34ab02);
      case "SHP":
        return this["addShp"](_0x34ab02);
      case "CSV":
        return this["addCsv"](_0x34ab02);
      case "XYZ":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_XYZ", "XYZ katmanı add() ile desteklenmiyor. Map.setBasemap() kullanın.");
      case "DRAWING":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_DRAWING", '"DRAWING" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
      case "MEASURE":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_MEASURE", '"MEASURE" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
    }
  }
  ["setVisible"](_0x303abc, _0x5b6b91) {
    const _0x11bfaf = this["requireLayer"](_0x303abc);
    _0x11bfaf["cesiumObject"]["show"] = _0x5b6b91, this["emit"]("layer:visibility", { "id": _0x303abc, "visible": _0x5b6b91 });
  }
  ["setOpacity"](_0x435b08, _0x464c35) {
    const _0x4891e3 = Math["max"](0, Math["min"](1, _0x464c35)), _0x34762a = this["requireLayer"](_0x435b08);
    _0x34762a["cesiumObject"] instanceof ImageryLayer ? _0x34762a["cesiumObject"]["alpha"] = _0x4891e3 : this["setDataSourceOpacity"](_0x34762a["cesiumObject"], _0x4891e3), this["emit"]("layer:opacity", { "id": _0x435b08, "opacity": _0x4891e3 });
  }
  ["_move"](_0x5d5440, _0x3889f2) {
    const _0x51489d = this["requireLayer"](_0x5d5440), _0x2c5baa = _0x51489d["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"] : this["viewer"]["dataSources"], _0x51ab29 = _0x2c5baa["indexOf"](_0x51489d["cesiumObject"]);
    _0x2c5baa[_0x3889f2](_0x51489d["cesiumObject"]);
    const _0x562a4a = _0x2c5baa["indexOf"](_0x51489d["cesiumObject"]);
    this["reindexLayerOrder"](), this["emit"]("layer:reorder", { "id": _0x5d5440, "oldIndex": _0x51ab29, "newIndex": _0x562a4a, "layer": _0x51489d });
  }
  ["raise"](_0x3f03b1) {
    this["_move"](_0x3f03b1, "raise");
  }
  ["lower"](_0x10d67f) {
    this["_move"](_0x10d67f, "lower");
  }
  ["raiseToTop"](_0x583db1) {
    this["_move"](_0x583db1, "raiseToTop");
  }
  ["lowerToBottom"](_0x3b88d8) {
    this["_move"](_0x3b88d8, "lowerToBottom");
  }
  ["reorder"](_0x25ed3b) {
    const _0x51b568 = _0x25ed3b[0], _0x1f1dac = _0x51b568 !== void 0 ? this["items"]["get"](_0x51b568) : void 0, _0xd79b97 = (_0x1f1dac == null ? void 0 : _0x1f1dac["cesiumObject"]) instanceof ImageryLayer, _0x11df19 = _0x1f1dac ? _0xd79b97 ? this["viewer"]["imageryLayers"]["indexOf"](_0x1f1dac["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x1f1dac["cesiumObject"]) : -1, _0x2450f = [], _0x2c636f = [];
    for (const _0x34caf3 of _0x25ed3b) {
      const _0x5283ed = this["items"]["get"](_0x34caf3);
      if (_0x5283ed === void 0) continue;
      _0x5283ed["cesiumObject"] instanceof ImageryLayer ? _0x2450f["push"](_0x34caf3) : _0x2c636f["push"](_0x34caf3);
    }
    for (let _0x599bcd = _0x2450f["length"] - 1; _0x599bcd >= 0; _0x599bcd--) {
      const _0x55e521 = this["items"]["get"](_0x2450f[_0x599bcd]);
      (_0x55e521 == null ? void 0 : _0x55e521["cesiumObject"]) instanceof ImageryLayer && this["viewer"]["imageryLayers"]["raiseToTop"](_0x55e521["cesiumObject"]);
    }
    for (let _0x44999a = _0x2c636f["length"] - 1; _0x44999a >= 0; _0x44999a--) {
      const _0x2494f0 = this["items"]["get"](_0x2c636f[_0x44999a]);
      _0x2494f0 !== void 0 && !(_0x2494f0["cesiumObject"] instanceof ImageryLayer) && this["viewer"]["dataSources"]["raiseToTop"](_0x2494f0["cesiumObject"]);
    }
    this["reindexLayerOrder"]();
    if (_0x1f1dac !== void 0 && _0x51b568 !== void 0) {
      const _0xa48fbc = _0xd79b97 ? this["viewer"]["imageryLayers"]["indexOf"](_0x1f1dac["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x1f1dac["cesiumObject"]);
      this["emit"]("layer:reorder", { "id": _0x51b568, "oldIndex": _0x11df19, "newIndex": _0xa48fbc, "layer": _0x1f1dac });
    }
  }
  ["removeLayer"](_0x1e2617) {
    const _0x25b282 = this["requireLayer"](_0x1e2617);
    _0x25b282["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"]["remove"](_0x25b282["cesiumObject"], !![]) : void this["viewer"]["dataSources"]["remove"](_0x25b282["cesiumObject"], !![]), this["items"]["delete"](_0x1e2617), this["analysisResultIds"]["delete"](_0x1e2617), this["ogcLayerFactory"]["deleteServiceOptions"](_0x1e2617), this["styleEngine"]["deleteStyle"](_0x1e2617), this["shapeLayerBridge"]["deleteCounter"](_0x1e2617), this["emit"]("layer:remove", { "layer": _0x25b282 });
  }
  ["addWMS"](_0x2819f3) {
    return this["ogcLayerFactory"]["addWMS"](_0x2819f3);
  }
  ["addWMTS"](_0x3e923d) {
    return this["ogcLayerFactory"]["addWMTS"](_0x3e923d);
  }
  async ["getWmsAvailableStyles"](_0x49e902) {
    return this["ogcLayerFactory"]["getWmsAvailableStyles"](_0x49e902);
  }
  async ["setWmsStyle"](_0x3f87cd, _0x5c24aa) {
    return this["ogcLayerFactory"]["setWmsStyle"](_0x3f87cd, _0x5c24aa);
  }
  ["getWmsLegendGraphicUrl"](_0xe5f740, _0x3cdecb) {
    return this["ogcLayerFactory"]["getWmsLegendGraphicUrl"](_0xe5f740, _0x3cdecb);
  }
  async ["getWmtsAvailableStyles"](_0x4d21d0) {
    return this["ogcLayerFactory"]["getWmtsAvailableStyles"](_0x4d21d0);
  }
  async ["setWmtsStyle"](_0x288aff, _0x2e82d0) {
    return this["ogcLayerFactory"]["setWmtsStyle"](_0x288aff, _0x2e82d0);
  }
  ["addWFS"](_0x41e24b) {
    return this["ogcLayerFactory"]["addWFS"]({ ..._0x41e24b, "clampToGround": _0x41e24b["clampToGround"] ?? !![] });
  }
  ["addWCS"](_0x36ed57) {
    return this["ogcLayerFactory"]["addWCS"](_0x36ed57);
  }
  ["addGeoTiff"](_0x4130b6) {
    return this["ogcLayerFactory"]["addGeoTiff"](_0x4130b6);
  }
  ["addLocalKmlGeoJson"](_0x25bb65, _0x35a645) {
    return this["localSourceLoader"]["addLocalKmlGeoJson"](_0x25bb65, _0x35a645);
  }
  ["addShp"](_0x9989b4) {
    return this["localSourceLoader"]["addShp"](_0x9989b4);
  }
  ["addCsv"](_0x424841) {
    return this["localSourceLoader"]["addCsv"](_0x424841);
  }
  ["_addBasemapImageryLayer"](_0x1de160, _0x56fd70, _0x1dafc5) {
    return this["register"](_0x1de160, _0x56fd70, "XYZ", _0x1dafc5, !![]);
  }
  ["_removeBasemapLayers"]() {
    for (const _0x470dc4 of this["items"]["values"]()) {
      _0x470dc4["isBasemap"] && _0x470dc4["cesiumObject"] instanceof ImageryLayer && (this["viewer"]["imageryLayers"]["remove"](_0x470dc4["cesiumObject"], !![]), this["items"]["delete"](_0x470dc4["id"]));
    }
  }
  ["_addDrawnShape"](_0x349347, _0x33a7ca, _0x6304dd) {
    return this["shapeLayerBridge"]["addDrawnShape"](_0x349347, _0x33a7ca, _0x6304dd);
  }
  ["_addMeasuredShape"](_0x34704e, _0x3a348f, _0x30e4e4) {
    return this["shapeLayerBridge"]["addMeasuredShape"](_0x34704e, _0x3a348f, _0x30e4e4);
  }
  ["_removeDrawnShape"](_0xf79a2f, _0x3f4fad) {
    this["shapeLayerBridge"]["removeDrawnShape"](_0xf79a2f, _0x3f4fad);
  }
  ["register"](_0x4f8937, _0x5a01f5, _0x4baa3a, _0x44f060, _0xb245d0, _0x38a594) {
    "entities" in _0x44f060 && this["tagEntities"](_0x44f060, _0x4f8937);
    const _0x2f62b8 = Object["freeze"]({ "id": _0x4f8937, "title": _0x5a01f5, "layerType": _0x4baa3a, "cesiumObject": _0x44f060, "isBasemap": _0xb245d0, ..._0x38a594 !== void 0 ? { "initialFillColor": _0x38a594 } : {} });
    return this["items"]["set"](_0x4f8937, _0x2f62b8), this["emit"]("layer:add", { "layer": _0x2f62b8 }), _0x2f62b8;
  }
  ["emitCrsCheckResult"](_0x570d1c, _0x5571d9) {
    if (!_0x5571d9) return;
    switch (_0x5571d9["kind"]) {
      case "reprojected":
        this["emit"]("layer:crs-reprojected", { "id": _0x570d1c, "fromEpsg": _0x5571d9["fromEpsg"], "toEpsg": "EPSG:4326" });
        break;
      case "suspicious-unresolved-crs":
        this["emit"]("layer:crs-unresolved", { "id": _0x570d1c, "crsName": _0x5571d9["crsName"] });
        break;
    }
  }
  ["tagEntities"](_0x4d9f13, _0x40f8c4) {
    _0x4d9f13["entities"]["suspendEvents"]();
    for (const _0x533116 of _0x4d9f13["entities"]["values"]) {
      _0x533116["properties"] === void 0 && (_0x533116["properties"] = new PropertyBag()), !_0x533116["properties"]["hasProperty"]("layerId") && _0x533116["properties"]["addProperty"]("layerId", _0x40f8c4), !_0x533116["properties"]["hasProperty"]("featureId") && _0x533116["properties"]["addProperty"]("featureId", _0x533116["id"]);
    }
    _0x4d9f13["entities"]["resumeEvents"]();
  }
  ["reindexLayerOrder"]() {
    const _0x3f6656 = /* @__PURE__ */ new Map();
    for (let _0x27caa0 = 0; _0x27caa0 < this["viewer"]["imageryLayers"]["length"]; _0x27caa0++) {
      _0x3f6656["set"](this["viewer"]["imageryLayers"]["get"](_0x27caa0), _0x27caa0);
    }
    const _0x58eb04 = /* @__PURE__ */ new Map();
    for (let _0x2c89a3 = 0; _0x2c89a3 < this["viewer"]["dataSources"]["length"]; _0x2c89a3++) {
      _0x58eb04["set"](this["viewer"]["dataSources"]["get"](_0x2c89a3), _0x2c89a3);
    }
    const _0x379ed8 = (_0x201f6c) => (_0x201f6c["cesiumObject"] instanceof ImageryLayer ? _0x3f6656["get"](_0x201f6c["cesiumObject"]) : _0x58eb04["get"](_0x201f6c["cesiumObject"])) ?? Number["POSITIVE_INFINITY"], _0x50954a = Array["from"](this["items"]["entries"]()), _0xbc281a = _0x50954a["filter"](([, _0x4a8d5b]) => _0x4a8d5b["cesiumObject"] instanceof ImageryLayer)["sort"](([, _0x29f531], [, _0x16f160]) => _0x379ed8(_0x29f531) - _0x379ed8(_0x16f160)), _0x1af499 = _0x50954a["filter"](([, _0x4eb03e]) => !(_0x4eb03e["cesiumObject"] instanceof ImageryLayer))["sort"](([, _0x13f93e], [, _0x45743a]) => _0x379ed8(_0x13f93e) - _0x379ed8(_0x45743a));
    let _0x35152 = 0, _0x130704 = 0;
    const _0xe75718 = _0x50954a["map"](([, _0x366bed]) => _0x366bed["cesiumObject"] instanceof ImageryLayer ? _0xbc281a[_0x35152++] : _0x1af499[_0x130704++]);
    this["items"]["clear"]();
    for (const [_0x3f380d, _0x5bffed] of _0xe75718) this["items"]["set"](_0x3f380d, _0x5bffed);
  }
  ["requireLayer"](_0x56e1d0) {
    const _0x4dc297 = this["items"]["get"](_0x56e1d0);
    if (_0x4dc297 === void 0) throw new LayerOperationError("LAYER_NOT_FOUND", 'Katman bulunamadı: "' + _0x56e1d0 + '"');
    return _0x4dc297;
  }
  ["assertUniqueId"](_0x1fbb17) {
    if (this["items"]["has"](_0x1fbb17)) throw new LayerOperationError("LAYER_ID_ALREADY_EXISTS", '"' + _0x1fbb17 + `" id'li katman zaten eklenmiş.`);
  }
  async ["getCapabilitiesDocument"](_0x1307f4, _0x5e837e, _0x3fc9c8, _0x301bd5) {
    return this["ogcLayerFactory"]["getCapabilitiesDocument"](_0x1307f4, _0x5e837e, _0x3fc9c8, _0x301bd5);
  }
  async ["getWcsCoverageExtents"](_0x10f924, _0x1a8d8a, _0x1a191b) {
    return this["ogcLayerFactory"]["getWcsCoverageExtents"](_0x10f924, _0x1a8d8a, _0x1a191b);
  }
  ["waitForRenderSettle"](_0x243373 = 60) {
    return new Promise((_0x40a438) => {
      let _0x11ee52 = _0x243373;
      const _0x298d97 = () => {
        _0x11ee52 -= 1, _0x11ee52 <= 0 && (this["viewer"]["scene"]["postRender"]["removeEventListener"](_0x298d97), _0x40a438());
      };
      this["viewer"]["scene"]["postRender"]["addEventListener"](_0x298d97);
    });
  }
  ["isOutlineCompanion"](_0x552e85) {
    return this["outlineGeometry"]["isOutlineCompanion"](_0x552e85);
  }
  ["hasOutlineCompanion"](_0x2ad813) {
    return this["outlineGeometry"]["hasOutlineCompanion"](_0x2ad813);
  }
  ["hasRiskyOutline"](_0x129a54) {
    return this["outlineGeometry"]["hasRiskyOutline"](_0x129a54);
  }
  ["addPolygonOutlines"](_0x3b0bfd, _0x297e5b, _0x200a96) {
    this["outlineGeometry"]["addPolygonOutlines"](_0x3b0bfd, _0x297e5b, _0x200a96);
    for (const _0x1e640f of _0x3b0bfd["entities"]["values"]) {
      this["outlineGeometry"]["hasOutlineCompanion"](_0x1e640f) && this["opacityController"]["ensureDynamicFillColor"](_0x3b0bfd, _0x1e640f);
    }
  }
  ["addPolygonOutlineCompanion"](_0x5050d5, _0x585f2a, _0x38b195, _0x38dbdd, _0x2b955e) {
    this["outlineGeometry"]["addPolygonOutlineCompanion"](_0x5050d5, _0x585f2a, _0x38b195, _0x38dbdd, _0x2b955e), this["outlineGeometry"]["hasOutlineCompanion"](_0x585f2a) && this["opacityController"]["ensureDynamicFillColor"](_0x5050d5, _0x585f2a);
  }
  ["readProperty"](_0x69a6ed, _0x35741c, _0x425179) {
    return this["styleEngine"]["readProperty"](_0x69a6ed, _0x35741c, _0x425179);
  }
  ["applyEntityStyle"](_0x506b7f, _0x5a7a75, _0xc2ed63, _0x5d4a12) {
    this["styleEngine"]["applyEntityStyle"](_0x506b7f, _0x5a7a75, _0xc2ed63, _0x5d4a12);
  }
  ["setDataSourceOpacity"](_0x39c939, _0x73573a) {
    this["opacityController"]["setDataSourceOpacity"](_0x39c939, _0x73573a);
  }
  ["destroy"]() {
    this["removeAllListeners"](), this["items"]["clear"]();
  }
};
_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] = "#1a73e8";
_LayerManager["DEFAULT_OUTLINE_COLOR"] = Color["fromCssColorString"](_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"]);
let LayerManager = _LayerManager;
const FLAG = "__tucbsSelectionHighlight";
function isSelectionHighlightEntity(_0x3d553f) {
  return _0x3d553f[FLAG] === !![];
}
class SelectionHighlight {
  constructor(_0x58cf78) {
    this["viewer"] = _0x58cf78, this["source"] = null, this["generation"] = 0;
  }
  ["show"](_0x4909f1) {
    const _0x2d0666 = ++this["generation"];
    if (_0x4909f1["length"] === 0) {
      this["removeSource"]();
      return;
    }
    void this["load"](_0x4909f1, _0x2d0666);
  }
  ["clear"]() {
    this["generation"]++, this["removeSource"]();
  }
  async ["load"](_0x489322, _0x460d00) {
    const _0x75a224 = Color["fromCssColorString"]("#dc2626")["withAlpha"](0.25), _0x2b3cd7 = Color["fromCssColorString"]("#dc2626"), _0x252fe = { "type": "FeatureCollection", "features": [..._0x489322] }, _0x54396f = await GeoJsonDataSource["load"](_0x252fe, { "clampToGround": !![], "fill": _0x75a224, "stroke": _0x2b3cd7, "strokeWidth": 3, "markerColor": _0x2b3cd7, "markerSize": 16 });
    if (_0x460d00 !== this["generation"]) return;
    this["removeSource"](), this["paint"](_0x54396f, _0x75a224, _0x2b3cd7), this["viewer"]["dataSources"]["add"](_0x54396f), this["source"] = _0x54396f;
  }
  ["paint"](_0x531c7f, _0x1ae7e3, _0x4c565f) {
    var _a2;
    for (const _0x5bdde3 of [..._0x531c7f["entities"]["values"]]) {
      this["tag"](_0x5bdde3);
      _0x5bdde3["billboard"] && (_0x5bdde3["billboard"] = void 0, _0x5bdde3["point"] = new PointGraphics({ "pixelSize": 16, "color": _0x4c565f, "outlineColor": Color["WHITE"], "outlineWidth": 2, "heightReference": HeightReference["CLAMP_TO_GROUND"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] }));
      const _0x1d3075 = _0x5bdde3["polygon"];
      if (!_0x1d3075) continue;
      _0x1d3075["material"] = new ColorMaterialProperty(_0x1ae7e3), _0x1d3075["outline"] = new ConstantProperty(![]);
      const _0xda5083 = (_a2 = _0x1d3075["hierarchy"]) == null ? void 0 : _a2["getValue"](JulianDate["now"]());
      this["addRings"](_0x531c7f, _0xda5083, _0x4c565f);
    }
  }
  ["addRings"](_0x588d43, _0x6e6b01, _0x4101a0) {
    var _a2;
    if (!((_a2 = _0x6e6b01 == null ? void 0 : _0x6e6b01["positions"]) == null ? void 0 : _a2["length"])) return;
    this["addRing"](_0x588d43, _0x6e6b01["positions"], _0x4101a0);
    for (const _0x69792b of _0x6e6b01["holes"] ?? []) this["addRings"](_0x588d43, _0x69792b, _0x4101a0);
  }
  ["addRing"](_0x473e4d, _0x4f8b82, _0x1ea1ce) {
    const _0x391e16 = _0x473e4d["entities"]["add"]({ "polyline": { "positions": _0x4f8b82, "width": 3, "material": new ColorMaterialProperty(_0x1ea1ce), "clampToGround": !![] } });
    this["tag"](_0x391e16);
  }
  ["tag"](_0x1fa6d4) {
    _0x1fa6d4[FLAG] = !![];
  }
  ["removeSource"]() {
    if (!this["source"]) return;
    this["viewer"]["dataSources"]["remove"](this["source"], !![]), this["source"] = null;
  }
}
const DRILL_PICK_LIMIT = 32;
function boundingBoxFromPoints(_0x54a71d) {
  if (_0x54a71d["length"] === 0) return void 0;
  let _0x1e9b69 = Infinity, _0x6924a2 = Infinity, _0x19d1a7 = -Infinity, _0x50e25c = -Infinity;
  for (const [_0x4da3f1, _0x5e6ded] of _0x54a71d) {
    if (_0x4da3f1 < _0x1e9b69) _0x1e9b69 = _0x4da3f1;
    if (_0x4da3f1 > _0x19d1a7) _0x19d1a7 = _0x4da3f1;
    if (_0x5e6ded < _0x6924a2) _0x6924a2 = _0x5e6ded;
    if (_0x5e6ded > _0x50e25c) _0x50e25c = _0x5e6ded;
  }
  if (_0x1e9b69 === _0x19d1a7 && _0x6924a2 === _0x50e25c) return { "kind": "point", "longitude": _0x1e9b69, "latitude": _0x6924a2 };
  return { "kind": "extent", "west": _0x1e9b69, "south": _0x6924a2, "east": _0x19d1a7, "north": _0x50e25c };
}
function flattenGeoJsonCoordinates(_0x135cb8, _0x4ef76c) {
  if (!Array["isArray"](_0x135cb8) || _0x135cb8["length"] === 0) return;
  if (typeof _0x135cb8[0] === "number") {
    const [_0x13de17, _0x5d7270] = _0x135cb8;
    if (typeof _0x13de17 === "number" && typeof _0x5d7270 === "number") _0x4ef76c["push"]([_0x13de17, _0x5d7270]);
    return;
  }
  for (const _0x5bce12 of _0x135cb8) flattenGeoJsonCoordinates(_0x5bce12, _0x4ef76c);
}
function extractGeoJsonExtent(_0x2a22bf) {
  if (_0x2a22bf === null || typeof _0x2a22bf !== "object") return void 0;
  const _0x284544 = _0x2a22bf, _0x33db5d = _0x284544["type"] === "FeatureCollection" && Array["isArray"](_0x284544["features"]) ? _0x284544["features"]["map"]((_0x39c1e6) => _0x39c1e6 == null ? void 0 : _0x39c1e6["geometry"])["filter"]((_0x4a8979) => _0x4a8979 !== void 0 && _0x4a8979 !== null) : _0x284544["geometry"] ? [_0x284544["geometry"]] : [];
  if (_0x33db5d["length"] === 0) return void 0;
  const _0x3f54ae = [];
  for (const _0x398d9b of _0x33db5d) {
    const _0x889474 = _0x398d9b;
    if (_0x889474["type"] === "GeometryCollection" && Array["isArray"](_0x889474["geometries"])) for (const _0x4dcc1a of _0x889474["geometries"]) {
      flattenGeoJsonCoordinates(_0x4dcc1a == null ? void 0 : _0x4dcc1a["coordinates"], _0x3f54ae);
    }
    else flattenGeoJsonCoordinates(_0x889474["coordinates"], _0x3f54ae);
  }
  return boundingBoxFromPoints(_0x3f54ae);
}
function collectGmlCoordinates(_0x8103e8, _0x50e6c2) {
  var _a2, _b;
  for (const _0x573f94 of Array["from"](_0x8103e8["getElementsByTagNameNS"]("*", "coordinates"))) {
    const _0x51909d = (_a2 = _0x573f94["textContent"]) == null ? void 0 : _a2["trim"]();
    if (!_0x51909d) continue;
    for (const _0xe003b7 of _0x51909d["split"](/\s+/)) {
      const [_0x32f42e, _0x32f4d7] = _0xe003b7["split"](","), _0x5be730 = Number(_0x32f42e), _0xf00192 = Number(_0x32f4d7);
      if (Number["isFinite"](_0x5be730) && Number["isFinite"](_0xf00192)) _0x50e6c2["push"]([_0x5be730, _0xf00192]);
    }
  }
  for (const _0x28ba61 of ["pos", "posList"]) {
    for (const _0x5b885a of Array["from"](_0x8103e8["getElementsByTagNameNS"]("*", _0x28ba61))) {
      const _0x44cf89 = (((_b = _0x5b885a["textContent"]) == null ? void 0 : _b["trim"]()) ?? "")["split"](/\s+/)["map"](Number);
      for (let _0x21166e = 0; _0x21166e + 1 < _0x44cf89["length"]; _0x21166e += 2) {
        const _0x352331 = _0x44cf89[_0x21166e], _0x48ff6b = _0x44cf89[_0x21166e + 1];
        if (Number["isFinite"](_0x352331) && Number["isFinite"](_0x48ff6b)) _0x50e6c2["push"]([_0x352331, _0x48ff6b]);
      }
    }
  }
}
function extractGmlExtent(_0x435bc7) {
  if (!(_0x435bc7 instanceof Element)) return void 0;
  const _0x311ba5 = [];
  return collectGmlCoordinates(_0x435bc7, _0x311ba5), boundingBoxFromPoints(_0x311ba5);
}
function extractImageryGeometry(_0x53f7a7) {
  return extractGeoJsonExtent(_0x53f7a7) ?? extractGmlExtent(_0x53f7a7);
}
class InteractionManager extends EventEmitter {
  constructor(_0x512020) {
    super(), this["unsubscribers"] = [], this["suspended"] = ![], this["identifySuspended"] = ![], this["hoverEnabled"] = ![], this["pickGeneration"] = 0, this["viewer"] = _0x512020, this["handler"] = new ScreenSpaceEventHandler(_0x512020["scene"]["canvas"]), this["bindMouseEvents"](), this["bindCameraEvents"](), this["bindSceneEvents"]();
  }
  get ["scene"]() {
    return this["viewer"]["scene"];
  }
  get ["camera"]() {
    return this["viewer"]["camera"];
  }
  ["suspend"]() {
    this["suspended"] = !![];
  }
  ["resume"]() {
    this["suspended"] = ![];
  }
  ["isSuspended"]() {
    return this["suspended"];
  }
  ["suspendIdentify"]() {
    this["identifySuspended"] = !![];
  }
  ["resumeIdentify"]() {
    this["identifySuspended"] = ![];
  }
  ["isIdentifySuspended"]() {
    return this["identifySuspended"];
  }
  ["enableHover"](_0xe58d3f) {
    this["hoverEnabled"] = _0xe58d3f, !_0xe58d3f && (this["hoveredEntity"] = void 0);
  }
  ["isHoverEnabled"]() {
    return this["hoverEnabled"];
  }
  ["flyToPosition"](_0x4d0970, _0x14dcbe, _0x2ce49e) {
    const _0x556c39 = (_0x2ce49e == null ? void 0 : _0x2ce49e["height"]) ?? 1e3;
    this["viewer"]["camera"]["flyTo"]({ "destination": Cartesian3["fromDegrees"](_0x4d0970, _0x14dcbe, _0x556c39), "orientation": { "pitch": _0x33fcf2["toRadians"](-90) }, ...(_0x2ce49e == null ? void 0 : _0x2ce49e["duration"]) !== void 0 ? { "duration": _0x2ce49e["duration"] } : {} });
  }
  ["flyToExtent"](_0x5b402a, _0x1f9cb5, _0x2b976f, _0x50bed4, _0x4d322b) {
    this["viewer"]["camera"]["flyTo"]({ "destination": Rectangle["fromDegrees"](_0x5b402a, _0x1f9cb5, _0x2b976f, _0x50bed4), "orientation": { "pitch": _0x33fcf2["toRadians"](-90) }, ...(_0x4d322b == null ? void 0 : _0x4d322b["duration"]) !== void 0 ? { "duration": _0x4d322b["duration"] } : {} });
  }
  ["destroy"]() {
    !this["handler"]["isDestroyed"]() && this["handler"]["destroy"]();
    for (const _0xdd41a3 of this["unsubscribers"]) {
      _0xdd41a3();
    }
    this["unsubscribers"]["length"] = 0, this["removeAllListeners"]();
  }
  ["bindMouseEvents"]() {
    this["handler"]["setInputAction"]((_0x3d73ad) => this["dispatchPick"](_0x3d73ad["position"], "entity:click", "map:click", "imagery:click"), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x22dbbf) => this["dispatchPick"](_0x22dbbf["position"], "entity:dblclick", "map:dblclick", "imagery:dblclick"), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["handler"]["setInputAction"]((_0x490472) => this["dispatchPick"](_0x490472["position"], "entity:rightclick", "map:rightclick", "imagery:rightclick"), ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["setInputAction"]((_0xdb578c) => this["dispatchEntityOnly"](_0xdb578c["position"], "entity:mousedown"), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"]((_0x576797) => this["dispatchEntityOnly"](_0x576797["position"], "entity:mouseup"), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0xe3519a) => this["handleMouseMove"](_0xe3519a["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["setInputAction"]((_0x58b993) => this["emit"]("map:wheel", { "delta": _0x58b993 }), ScreenSpaceEventType["WHEEL"]), this["handler"]["setInputAction"]((_0x1900b4) => this["emit"]("map:pinchstart", this["buildMapDetail"](_0x1900b4["position1"])), ScreenSpaceEventType["PINCH_START"]), this["handler"]["setInputAction"](() => this["emit"]("map:pinchend", {}), ScreenSpaceEventType["PINCH_END"]), this["handler"]["setInputAction"]((_0x187419) => {
      const _0x20ea02 = Math["atan2"](_0x187419["position2"]["y"] - _0x187419["position1"]["y"], _0x187419["position2"]["x"] - _0x187419["position1"]["x"]);
      this["emit"]("map:pinchmove", { ...this["buildMapDetail"](_0x187419["position1"]), "angle": _0x20ea02 });
    }, ScreenSpaceEventType["PINCH_MOVE"]);
  }
  ["handleMouseMove"](_0x5a6216) {
    this["emit"]("map:mousemove", this["buildMapDetail"](_0x5a6216));
    if (!this["hoverEnabled"] || this["suspended"]) return;
    const _0x550ae9 = this["pickSelectableEntity"](_0x5a6216);
    if (_0x550ae9 === this["hoveredEntity"]) return;
    this["hoveredEntity"] !== void 0 && this["emit"]("entity:mouseleave", this["buildEntityDetail"](this["hoveredEntity"], _0x5a6216)), this["hoveredEntity"] = _0x550ae9, _0x550ae9 !== void 0 && this["emit"]("entity:mouseenter", this["buildEntityDetail"](_0x550ae9, _0x5a6216));
  }
  ["dispatchPick"](_0x1ce721, _0x438b9b, _0x4db391, _0x368ee8) {
    if (this["suspended"]) return;
    this["pickGeneration"]++;
    const _0x2c16a4 = this["pickSelectableEntity"](_0x1ce721);
    _0x2c16a4 ? this["emit"](_0x438b9b, this["buildEntityDetail"](_0x2c16a4, _0x1ce721)) : this["emit"](_0x4db391, this["buildMapDetail"](_0x1ce721)), this["pickImageryFeatures"](_0x1ce721, _0x368ee8);
  }
  ["pickSelectableEntity"](_0xcab4f5) {
    const _0x31b3da = this["scene"]["drillPick"](_0xcab4f5, DRILL_PICK_LIMIT);
    for (const _0x2cc116 of _0x31b3da) {
      const _0x33375a = _0x2cc116 == null ? void 0 : _0x2cc116["id"];
      if (!(_0x33375a instanceof Entity)) continue;
      if (isSelectionHighlightEntity(_0x33375a)) continue;
      return _0x33375a;
    }
    return void 0;
  }
  ["pickImageryFeatures"](_0x163829, _0x38f483) {
    const _0x38b603 = this["pickGeneration"], _0x123308 = this["camera"]["getPickRay"](_0x163829);
    if (!_0x123308) return;
    const _0x1e9b1b = this["viewer"]["imageryLayers"]["pickImageryLayerFeatures"](_0x123308, this["scene"]);
    if (!_0x1e9b1b) return;
    this["emit"]("imagery:querying", this["buildMapDetail"](_0x163829));
    const _0x38379f = (_0x366cee) => {
      if (this["suspended"] || _0x38b603 !== this["pickGeneration"]) return;
      this["emit"](_0x38f483, this["buildImageryDetail"](_0x366cee, _0x163829));
    };
    _0x1e9b1b["then"](_0x38379f)["catch"](() => {
      _0x38379f([]);
    });
  }
  ["buildImageryDetail"](_0x11c66f, _0x1c646a) {
    const _0x51765e = _0x11c66f["map"]((_0x58ea99) => ({ "imageryLayer": _0x58ea99["imageryLayer"], "name": _0x58ea99["name"] ?? null, "properties": _0x58ea99["properties"] ?? {}, "description": _0x58ea99["description"] ?? null, "geometryHint": extractImageryGeometry(_0x58ea99["data"]) }));
    return { "position": this["toLonLat"](_0x1c646a), "screenPos": { "x": _0x1c646a["x"], "y": _0x1c646a["y"] }, "features": _0x51765e };
  }
  ["dispatchEntityOnly"](_0xb052aa, _0x526607) {
    if (this["suspended"]) return;
    const _0x52ffad = this["scene"]["pick"](_0xb052aa);
    (_0x52ffad == null ? void 0 : _0x52ffad["id"]) instanceof Entity && this["emit"](_0x526607, this["buildEntityDetail"](_0x52ffad["id"], _0xb052aa));
  }
  ["bindCameraEvents"]() {
    this["unsubscribers"]["push"](this["camera"]["moveStart"]["addEventListener"](() => this["emit"]("camera:moveStart", {})), this["camera"]["moveEnd"]["addEventListener"](() => this["emit"]("camera:moveEnd", {})), this["camera"]["changed"]["addEventListener"]((_0x51d3a5) => this["emit"]("camera:changed", { "percentage": _0x51d3a5 })));
  }
  ["bindSceneEvents"]() {
    this["unsubscribers"]["push"](this["scene"]["preRender"]["addEventListener"]((_0x352a8b, _0x348412) => this["emit"]("scene:preRender", { "time": _0x348412 })), this["scene"]["postRender"]["addEventListener"]((_0x3727c4, _0x4642fb) => this["emit"]("scene:postRender", { "time": _0x4642fb })), this["scene"]["morphStart"]["addEventListener"](() => this["emit"]("scene:morphStart", {})), this["scene"]["morphComplete"]["addEventListener"](() => this["emit"]("scene:morphComplete", {})));
  }
  ["buildMapDetail"](_0x55c18b) {
    return { "position": this["toLonLat"](_0x55c18b), "screenPos": { "x": _0x55c18b["x"], "y": _0x55c18b["y"] } };
  }
  ["buildEntityDetail"](_0x2c8c01, _0x5c5315) {
    return { ...this["resolveFeature"](_0x2c8c01), "position": this["toLonLat"](_0x5c5315), "screenPos": { "x": _0x5c5315["x"], "y": _0x5c5315["y"] }, "features": this["pickAllFeatures"](_0x5c5315, _0x2c8c01) };
  }
  ["resolveFeature"](_0x4ca78e) {
    var _a2, _b;
    const _0x2af485 = JulianDate["now"](), _0x110eb4 = ((_a2 = _0x4ca78e["properties"]) == null ? void 0 : _a2["getValue"](_0x2af485)) ?? {}, _0x5449ad = _0x110eb4["__tucbsOutlineOf"];
    if (typeof _0x5449ad === "string") {
      const _0x32bf80 = (_b = _0x4ca78e["entityCollection"]) == null ? void 0 : _b["getById"](_0x5449ad);
      if (_0x32bf80 && _0x32bf80 !== _0x4ca78e) return this["resolveFeature"](_0x32bf80);
    }
    const _0x510e5c = typeof _0x110eb4["layerId"] === "string" ? _0x110eb4["layerId"] : null, _0x3223ea = typeof _0x110eb4["featureId"] === "string" ? _0x110eb4["featureId"] : null;
    if ("__tucbsOutlineOf" in _0x110eb4) {
      const { __tucbsOutlineOf: _0x47deec, ..._0x4af5ab } = _0x110eb4;
      return { "entity": _0x4ca78e, "layerId": _0x510e5c, "featureId": _0x3223ea, "properties": _0x4af5ab };
    }
    return { "entity": _0x4ca78e, "layerId": _0x510e5c, "featureId": _0x3223ea, "properties": _0x110eb4 };
  }
  ["pickAllFeatures"](_0x437ae2, _0x4c2285) {
    const _0x465f62 = this["resolveFeature"](_0x4c2285), _0x3b24ea = [_0x465f62], _0x4b6e4f = /* @__PURE__ */ new Set([_0x465f62["entity"]]), _0x106967 = this["scene"]["drillPick"](_0x437ae2, DRILL_PICK_LIMIT);
    for (const _0x562cca of _0x106967) {
      const _0x493313 = _0x562cca == null ? void 0 : _0x562cca["id"];
      if (!(_0x493313 instanceof Entity)) continue;
      const _0x1e552f = this["resolveFeature"](_0x493313);
      if (_0x4b6e4f["has"](_0x1e552f["entity"])) continue;
      _0x4b6e4f["add"](_0x1e552f["entity"]), _0x3b24ea["push"](_0x1e552f);
    }
    return _0x3b24ea;
  }
  ["toLonLat"](_0x6cdad) {
    const _0x5111e5 = this["camera"]["pickEllipsoid"](_0x6cdad, this["scene"]["globe"]["ellipsoid"]);
    if (_0x5111e5 === void 0) return [0, 0];
    const _0x2ea454 = Cartographic["fromCartesian"](_0x5111e5);
    return [_0x33fcf2["toDegrees"](_0x2ea454["longitude"]), _0x33fcf2["toDegrees"](_0x2ea454["latitude"])];
  }
}
const EARTH_RADIUS_METERS = 6378137, CIRCLE_SEGMENTS = 48;
function dedupePositions(_0x5cad5f) {
  return _0x5cad5f["filter"]((_0x171fc9, _0xea4e43) => _0xea4e43 === 0 || !Cartesian3["equalsEpsilon"](_0x171fc9, _0x5cad5f[_0xea4e43 - 1], _0x33fcf2["EPSILON7"]));
}
class DrawingManager extends EventEmitter {
  constructor(_0x576226, _0x3b1d47) {
    super(), this["shapes"] = /* @__PURE__ */ new Map(), this["positions"] = [], this["tempVertexEntities"] = [], this["freehandDragging"] = ![], this["onEscapeKey"] = (_0x40472e) => {
      if (_0x40472e["key"] !== "Escape") return;
      this["finishMultiVertex"]();
    }, this["viewer"] = _0x576226, this["interactionManager"] = _0x3b1d47, this["handler"] = new ScreenSpaceEventHandler(_0x576226["scene"]["canvas"]);
  }
  get ["scene"]() {
    return this["viewer"]["scene"];
  }
  ["activate"](_0x22b892, _0x3e04f3) {
    if (this["activeTool"]) this["deactivate"]();
    this["activeTool"] = _0x22b892, this["activeSource"] = _0x3e04f3, this["positions"] = [], this["previewPosition"] = void 0, this["interactionManager"]["suspend"](), this["resetTrackedEntity"]();
    if (_0x22b892 === "freehand") this["lockCamera"]();
    this["setCursor"]("crosshair"), this["bindToolHandlers"](_0x22b892), this["emit"]("draw:start", _0x3e04f3 === void 0 ? { "tool": _0x22b892 } : { "tool": _0x22b892, "source": _0x3e04f3 });
  }
  ["deactivate"]() {
    if (!this["activeTool"]) return;
    const _0x5efef4 = this["activeTool"], _0x5086dd = this["activeSource"];
    this["finishSession"](), this["emit"]("draw:cancel", _0x5086dd === void 0 ? { "tool": _0x5efef4 } : { "tool": _0x5efef4, "source": _0x5086dd });
  }
  ["getActiveTool"]() {
    return this["activeTool"];
  }
  ["isActive"]() {
    return this["activeTool"] !== void 0;
  }
  ["getShapes"]() {
    return [...this["shapes"]["values"]()];
  }
  ["getShapeById"](_0x57f2ae) {
    return this["shapes"]["get"](_0x57f2ae);
  }
  ["removeShape"](_0x5417fa) {
    const _0x5e35ad = this["shapes"]["get"](_0x5417fa);
    if (!_0x5e35ad) return;
    this["viewer"]["entities"]["remove"](_0x5e35ad["entity"]), this["shapes"]["delete"](_0x5417fa), this["emit"]("draw:remove", { "id": _0x5417fa, "shape": _0x5e35ad });
  }
  ["clearAll"]() {
    for (const _0x3335c7 of [...this["shapes"]["keys"]()]) this["removeShape"](_0x3335c7);
  }
  ["undo"]() {
    if (this["positions"]["length"] === 0) return;
    this["positions"]["pop"]();
    const _0xb13c6c = this["tempVertexEntities"]["pop"]();
    if (_0xb13c6c) this["viewer"]["entities"]["remove"](_0xb13c6c);
  }
  ["toGeoJSON"]() {
    return { "type": "FeatureCollection", "features": this["getShapes"]()["map"]((_0x3ea6fb) => ({ "type": "Feature", "properties": { "id": _0x3ea6fb["id"], "tool": _0x3ea6fb["tool"] }, "geometry": _0x3ea6fb["geometry"] })) };
  }
  ["destroy"]() {
    this["deactivate"](), this["handler"]["destroy"](), this["removeAllListeners"]();
  }
  ["bindToolHandlers"](_0x2fbf3f) {
    this["handler"]["setInputAction"](() => this["deactivate"](), ScreenSpaceEventType["RIGHT_CLICK"]);
    if (_0x2fbf3f === "freehand") {
      this["handler"]["setInputAction"]((_0x5a238c) => this["onFreehandDown"](_0x5a238c["position"]), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"](() => this["onFreehandUp"](), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x40098a) => this["onFreehandMove"](_0x40098a["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]);
      return;
    }
    this["handler"]["setInputAction"]((_0x5b5f14) => this["onVertexClick"](_0x5b5f14["position"]), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0xfc36da) => this["onPreviewMove"](_0xfc36da["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), (_0x2fbf3f === "polyline" || _0x2fbf3f === "polygon") && (this["handler"]["setInputAction"](() => this["finishMultiVertexViaDoubleClick"](), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), document["addEventListener"]("keydown", this["onEscapeKey"]));
  }
  ["unbindToolHandlers"]() {
    this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_UP"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), document["removeEventListener"]("keydown", this["onEscapeKey"]);
  }
  ["onVertexClick"](_0x2f7f64) {
    const _0x293099 = this["toCartesian"](_0x2f7f64);
    if (_0x293099 === void 0 || this["activeTool"] === void 0) return;
    this["positions"]["push"](_0x293099), this["emitVertex"](_0x2f7f64), this["ensureTempEntity"]();
    (this["activeTool"] === "polygon" || this["activeTool"] === "polyline") && this["addVertexMarker"](_0x293099);
    if (this["activeTool"] === "point") {
      this["completeShape"]();
      return;
    }
    (this["activeTool"] === "rectangle" || this["activeTool"] === "circle") && this["positions"]["length"] >= 2 && this["completeShape"]();
  }
  ["onPreviewMove"](_0x3aeee0) {
    if (this["positions"]["length"] === 0 || this["activeTool"] === void 0) return;
    const _0x2c2899 = this["toCartesian"](_0x3aeee0);
    if (_0x2c2899 === void 0) return;
    this["previewPosition"] = _0x2c2899, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x2c2899), "screenPos": { "x": _0x3aeee0["x"], "y": _0x3aeee0["y"] } });
  }
  ["finishMultiVertex"]() {
    const _0x30f827 = this["activeTool"] === "polygon" ? 3 : 2;
    if (this["positions"]["length"] < _0x30f827) return;
    this["completeShape"]();
  }
  ["finishMultiVertexViaDoubleClick"]() {
    this["positions"]["length"] >= 2 && this["positions"]["pop"](), this["finishMultiVertex"](), this["resetTrackedEntity"]();
  }
  ["onFreehandDown"](_0x7b0b32) {
    this["freehandDragging"] = !![], this["positions"] = [];
    const _0x55f27f = this["toCartesian"](_0x7b0b32);
    if (_0x55f27f === void 0) return;
    this["positions"]["push"](_0x55f27f), this["emitVertex"](_0x7b0b32), this["ensureTempEntity"]();
  }
  ["onFreehandMove"](_0x3d0483) {
    if (!this["freehandDragging"] || this["activeTool"] === void 0) return;
    const _0x272f7e = this["toCartesian"](_0x3d0483);
    if (_0x272f7e === void 0) return;
    this["positions"]["push"](_0x272f7e), this["previewPosition"] = _0x272f7e, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x272f7e), "screenPos": { "x": _0x3d0483["x"], "y": _0x3d0483["y"] } });
  }
  ["onFreehandUp"]() {
    this["freehandDragging"] = ![];
    if (this["positions"]["length"] >= 2) this["completeShape"]();
  }
  ["emitVertex"](_0x54c029) {
    if (this["activeTool"] === void 0) return;
    const _0x4c3a81 = this["requireIndex"](this["positions"], this["positions"]["length"] - 1);
    this["emit"]("draw:vertex", { "tool": this["activeTool"], "index": this["positions"]["length"] - 1, "coordinates": this["toLonLat"](_0x4c3a81), "screenPos": { "x": _0x54c029["x"], "y": _0x54c029["y"] } });
  }
  ["completeShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x47e06d = this["buildShape"](this["activeTool"], this["positions"]), _0xfe16e3 = this["activeSource"] === void 0 ? _0x47e06d : { ..._0x47e06d, "source": this["activeSource"] };
    this["shapes"]["set"](_0xfe16e3["id"], _0xfe16e3), this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["emit"]("draw:complete", { "shape": _0xfe16e3 });
  }
  ["resetSessionForContinuousDrawing"]() {
    this["positions"] = [], this["previewPosition"] = void 0, this["freehandDragging"] = ![];
  }
  ["finishSession"]() {
    this["unbindToolHandlers"](), this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["activeTool"] = void 0, this["activeSource"] = void 0, this["unlockCamera"](), this["setCursor"]("default"), this["resetTrackedEntity"](), this["interactionManager"]["resume"]();
  }
  ["ensureTempEntity"]() {
    if (this["activeTool"] === void 0) return;
    if (this["tempEntity"] === void 0) {
      if (this["activeTool"] === "point") this["tempEntity"] = this["viewer"]["entities"]["add"]({ "position": this["requireIndex"](this["positions"], 0), "point": { "pixelSize": 8, "color": Color["YELLOW"] } });
      else this["activeTool"] !== "rectangle" && this["activeTool"] !== "circle" && (this["tempEntity"] = this["viewer"]["entities"]["add"]({ "polyline": { "positions": this["buildPositionsCallback"](2), "width": 2, "material": Color["YELLOW"] } }));
    }
    if (this["tempFillEntity"] === void 0) {
      if (this["activeTool"] === "polygon") this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
        const _0x10dbb9 = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x1c8915 = dedupePositions(_0x10dbb9);
        return _0x1c8915["length"] >= 3 ? new PolygonHierarchy(_0x1c8915) : void 0;
      }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
      else {
        if (this["activeTool"] === "rectangle") this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x7bb703 = this["positions"][0], _0x4c45b3 = this["previewPosition"];
          if (_0x7bb703 === void 0 || _0x4c45b3 === void 0) return void 0;
          const _0x15f8a8 = this["computeRectangleCoordinates"](_0x7bb703, _0x4c45b3);
          return new PolygonHierarchy(_0x15f8a8["map"]((_0x50153e) => this["toCartesianFromLonLat"](_0x50153e)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
        else this["activeTool"] === "circle" && (this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x2483c1 = this["positions"][0], _0xde513a = this["previewPosition"];
          if (_0x2483c1 === void 0 || _0xde513a === void 0) return void 0;
          const _0x560194 = this["computeCircleRing"](_0x2483c1, _0xde513a);
          return new PolygonHierarchy(_0x560194["map"]((_0x4fed74) => this["toCartesianFromLonLat"](_0x4fed74)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } }));
      }
    }
  }
  ["addVertexMarker"](_0x10507d) {
    this["tempVertexEntities"]["push"](this["viewer"]["entities"]["add"]({ "position": _0x10507d, "point": { "pixelSize": 6, "color": Color["YELLOW"], "outlineColor": Color["BLACK"], "outlineWidth": 1 } }));
  }
  ["buildPositionsCallback"](_0x13a519) {
    return new CallbackProperty(() => {
      const _0x4c6daa = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x54541d = dedupePositions(_0x4c6daa);
      return _0x54541d["length"] >= _0x13a519 ? _0x54541d : void 0;
    }, ![]);
  }
  ["clearTempEntity"]() {
    this["tempEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempEntity"]), this["tempEntity"] = void 0);
    this["tempFillEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempFillEntity"]), this["tempFillEntity"] = void 0);
    for (const _0x590fc1 of this["tempVertexEntities"]) {
      this["viewer"]["entities"]["remove"](_0x590fc1);
    }
    this["tempVertexEntities"] = [];
  }
  ["resetTrackedEntity"]() {
    this["viewer"]["trackedEntity"] !== void 0 && (this["viewer"]["trackedEntity"] = void 0);
  }
  ["setCursor"](_0x2b9a7b) {
    this["viewer"]["scene"]["canvas"]["style"]["cursor"] = _0x2b9a7b;
  }
  ["lockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = ![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = ![];
  }
  ["unlockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = !![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = !![];
  }
  ["buildShape"](_0x35af42, _0x10752b) {
    const _0x20ccde = crypto["randomUUID"](), _0x232bbd = Date["now"]();
    if (_0x35af42 === "point") {
      const _0x543bff = this["requireIndex"](_0x10752b, 0), _0x3a72e2 = this["toLonLat"](_0x543bff);
      return { "id": _0x20ccde, "tool": _0x35af42, "entity": this["viewer"]["entities"]["add"]({ "position": _0x543bff, "point": { "pixelSize": 8, "color": Color["CYAN"] } }), "positions": _0x10752b, "coordinates": [_0x3a72e2], "geometry": { "type": "Point", "coordinates": _0x3a72e2 }, "createdAt": _0x232bbd };
    }
    if (_0x35af42 === "circle") return this["buildCircleShape"](_0x20ccde, _0x10752b, _0x232bbd);
    if (_0x35af42 === "rectangle") return this["buildRectangleShape"](_0x20ccde, _0x10752b, _0x232bbd);
    if (_0x35af42 === "polygon") return this["buildPolygonShape"](_0x20ccde, _0x10752b, _0x232bbd);
    return this["buildLineShape"](_0x20ccde, _0x35af42, _0x10752b, _0x232bbd);
  }
  ["buildLineShape"](_0x290ea4, _0x30f51b, _0xfb647, _0x5bc302) {
    const _0x58f620 = _0xfb647["map"]((_0x482b93) => this["toLonLat"](_0x482b93));
    return { "id": _0x290ea4, "tool": _0x30f51b, "entity": this["viewer"]["entities"]["add"]({ "polyline": { "positions": _0xfb647, "width": 3, "material": Color["CYAN"] } }), "positions": _0xfb647, "coordinates": _0x58f620, "geometry": { "type": "LineString", "coordinates": _0x58f620 }, "length": this["computeLength"](_0xfb647), "createdAt": _0x5bc302 };
  }
  ["buildPolygonShape"](_0x4bec3f, _0x32f9ee, _0x24168f) {
    const _0x610ad9 = _0x32f9ee["map"]((_0x3ad2c) => this["toLonLat"](_0x3ad2c)), _0x1199b2 = this["requireIndex"](_0x610ad9, 0), _0x467f9b = this["requireIndex"](_0x32f9ee, 0), _0x587994 = [..._0x610ad9, _0x1199b2];
    return { "id": _0x4bec3f, "tool": "polygon", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x32f9ee, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x32f9ee, "coordinates": _0x610ad9, "geometry": { "type": "Polygon", "coordinates": [_0x587994] }, "area": this["computeArea"](_0x610ad9), "perimeter": this["computeLength"]([..._0x32f9ee, _0x467f9b]), "createdAt": _0x24168f };
  }
  ["buildRectangleShape"](_0x5c3f3a, _0x353976, _0xae73ba) {
    const _0x4aa486 = this["requireIndex"](_0x353976, 0), _0x279ea5 = this["requireIndex"](_0x353976, 1), _0x20f8fa = this["computeRectangleCoordinates"](_0x4aa486, _0x279ea5), _0x1624f2 = _0x20f8fa["map"]((_0x20b52d) => this["toCartesianFromLonLat"](_0x20b52d)), _0x37e257 = this["requireIndex"](_0x1624f2, 0);
    return { "id": _0x5c3f3a, "tool": "rectangle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x1624f2, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x1624f2, "coordinates": _0x20f8fa, "geometry": { "type": "Polygon", "coordinates": [[..._0x20f8fa, this["requireIndex"](_0x20f8fa, 0)]] }, "area": this["computeArea"](_0x20f8fa), "perimeter": this["computeLength"]([..._0x1624f2, _0x37e257]), "createdAt": _0xae73ba };
  }
  ["buildCircleShape"](_0x50f5cd, _0x419e77, _0x7adb1b) {
    const _0x537dae = this["requireIndex"](_0x419e77, 0), _0x5c86d7 = this["requireIndex"](_0x419e77, 1), _0x3999a3 = Cartesian3["distance"](_0x537dae, _0x5c86d7), _0x2591c5 = this["computeCircleRing"](_0x537dae, _0x5c86d7), _0x31f957 = _0x2591c5["map"]((_0x13967b) => this["toCartesianFromLonLat"](_0x13967b)), _0x47617e = this["requireIndex"](_0x2591c5, 0);
    return { "id": _0x50f5cd, "tool": "circle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x31f957, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": [_0x537dae, _0x5c86d7], "coordinates": [this["toLonLat"](_0x537dae)], "geometry": { "type": "Polygon", "coordinates": [[..._0x2591c5, _0x47617e]] }, "area": Math["PI"] * _0x3999a3 * _0x3999a3, "perimeter": 2 * Math["PI"] * _0x3999a3, "radius": _0x3999a3, "createdAt": _0x7adb1b };
  }
  ["sampleCircleRing"](_0xa8d075, _0x3e0f3f) {
    const _0x49591a = [];
    for (let _0x3508b6 = 0; _0x3508b6 < CIRCLE_SEGMENTS; _0x3508b6++) {
      const _0x3f109c = 2 * Math["PI"] * _0x3508b6 / CIRCLE_SEGMENTS, _0x39a46c = _0x3e0f3f * Math["cos"](_0x3f109c), _0x1919a3 = _0x3e0f3f * Math["sin"](_0x3f109c);
      _0x49591a["push"](this["offsetMetersToLonLat"](_0xa8d075, _0x39a46c, _0x1919a3));
    }
    return _0x49591a;
  }
  ["computeRectangleCoordinates"](_0x48c919, _0x2f4bc1) {
    const _0x100115 = this["toLonLat"](_0x48c919), _0x3e3d32 = this["toLonLat"](_0x2f4bc1), _0x1ee8d9 = Math["min"](_0x100115[0], _0x3e3d32[0]), _0x2a5864 = Math["max"](_0x100115[0], _0x3e3d32[0]), _0x33db68 = Math["min"](_0x100115[1], _0x3e3d32[1]), _0x1395b9 = Math["max"](_0x100115[1], _0x3e3d32[1]);
    return [[_0x1ee8d9, _0x33db68], [_0x2a5864, _0x33db68], [_0x2a5864, _0x1395b9], [_0x1ee8d9, _0x1395b9]];
  }
  ["computeCircleRing"](_0x3b44c4, _0x1eda67) {
    const _0x4303a4 = Cartesian3["distance"](_0x3b44c4, _0x1eda67), _0x5782ef = this["toLonLat"](_0x3b44c4);
    return this["sampleCircleRing"](_0x5782ef, _0x4303a4);
  }
  ["computeArea"](_0x2e84ce) {
    const _0x1f5096 = this["requireIndex"](_0x2e84ce, 0)[1], _0x36cb8c = _0x2e84ce["map"]((_0x52b2c2) => this["projectMeters"](_0x52b2c2, _0x1f5096));
    let _0x48de6b = 0;
    for (let _0x3ffec9 = 0; _0x3ffec9 < _0x36cb8c["length"]; _0x3ffec9++) {
      const [_0x229da5, _0x1481f3] = this["requireIndex"](_0x36cb8c, _0x3ffec9), [_0x3b5939, _0x492285] = this["requireIndex"](_0x36cb8c, (_0x3ffec9 + 1) % _0x36cb8c["length"]);
      _0x48de6b += _0x229da5 * _0x492285 - _0x3b5939 * _0x1481f3;
    }
    return Math["abs"](_0x48de6b) / 2;
  }
  ["computeLength"](_0x2e6f96) {
    let _0x4d0d62 = 0;
    for (let _0x3777fe = 0; _0x3777fe < _0x2e6f96["length"] - 1; _0x3777fe++) {
      _0x4d0d62 += Cartesian3["distance"](this["requireIndex"](_0x2e6f96, _0x3777fe), this["requireIndex"](_0x2e6f96, _0x3777fe + 1));
    }
    return _0x4d0d62;
  }
  ["projectMeters"](_0x19f576, _0x17bdcf) {
    const _0x59f481 = _0x33fcf2["toRadians"](_0x19f576[0]) * Math["cos"](_0x33fcf2["toRadians"](_0x17bdcf)) * EARTH_RADIUS_METERS, _0x42281c = _0x33fcf2["toRadians"](_0x19f576[1]) * EARTH_RADIUS_METERS;
    return [_0x59f481, _0x42281c];
  }
  ["offsetMetersToLonLat"](_0x3a2b6c, _0x252779, _0x2472eb) {
    const _0xedc5d7 = _0x3a2b6c[1] + _0x33fcf2["toDegrees"](_0x2472eb / EARTH_RADIUS_METERS), _0x28981d = _0x3a2b6c[0] + _0x33fcf2["toDegrees"](_0x252779 / (EARTH_RADIUS_METERS * Math["cos"](_0x33fcf2["toRadians"](_0x3a2b6c[1]))));
    return [_0x28981d, _0xedc5d7];
  }
  ["toCartesianFromLonLat"](_0xcbeb4d) {
    return Cartesian3["fromDegrees"](_0xcbeb4d[0], _0xcbeb4d[1]);
  }
  ["toCartesian"](_0xc9491f) {
    return this["viewer"]["camera"]["pickEllipsoid"](_0xc9491f, this["scene"]["globe"]["ellipsoid"]);
  }
  ["toLonLat"](_0x38adce) {
    const _0x330b29 = Cartographic["fromCartesian"](_0x38adce);
    return [_0x33fcf2["toDegrees"](_0x330b29["longitude"]), _0x33fcf2["toDegrees"](_0x330b29["latitude"])];
  }
  ["requireIndex"](_0x2d8ace, _0x505145) {
    const _0x550824 = _0x2d8ace[_0x505145];
    if (_0x550824 === void 0) throw new TucbsError("INTERNAL_INDEX_OUT_OF_RANGE", "DrawingManager: beklenen index (" + _0x505145 + ") dizide bulunamadi");
    return _0x550824;
  }
}
function trimSlash$1(_0x2a72a1) {
  return _0x2a72a1["replace"](/\/+$/, "");
}
function newClientId() {
  if (typeof crypto !== "undefined" && typeof crypto["randomUUID"] === "function") return crypto["randomUUID"]();
  return "00000000-0000-0000-0000-000000000001";
}
class AnalysisManager {
  constructor(_0x331d33) {
    __privateAdd(this, _AnalysisManager_instances);
    __privateAdd(this, _apiKey2);
    __privateSet(this, _apiKey2, _0x331d33["apiKey"] ?? ""), this["clientId"] = _0x331d33["clientId"] ?? newClientId();
  }
  ["configure"](_0x837b59) {
    if (_0x837b59["apiKey"] !== void 0) __privateSet(this, _apiKey2, _0x837b59["apiKey"]);
    if (_0x837b59["clientId"] !== void 0) this["clientId"] = _0x837b59["clientId"];
  }
  get ["configured"]() {
    return Boolean(getUcbpApiBase() && __privateGet(this, _apiKey2));
  }
  async ["buffer"](_0x2c5d10) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/buffer", _0x2c5d10);
  }
  async ["intersection"](_0x389ceb) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/intersection", _0x389ceb);
  }
  async ["boundary"](_0x428e50) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/boundary", _0x428e50);
  }
  async ["clip"](_0x5f251d) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/clip", _0x5f251d);
  }
  async ["difference"](_0x234659) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/difference", _0x234659);
  }
  async ["subtract"](_0x51b64d) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/subtract", _0x51b64d);
  }
  async ["union"](_0x5acda6) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/union", _0x5acda6);
  }
  async ["wedgeBuffer"](_0x42c968) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/wedge-buffer", _0x42c968);
  }
}
_apiKey2 = new WeakMap();
_AnalysisManager_instances = new WeakSet();
post_fn = async function(_0x3bfb45, _0x5045cc) {
  if (!__privateGet(this, _apiKey2)) throw new AnalysisRequestError("ANALYSIS_API_KEY_MISSING", "apiKey tanımlı değil (tucbs-map apiKey).");
  const _0x73361a = { "clientId": this["clientId"], "object": _0x5045cc }, _0x3d8759 = "" + trimSlash$1(getUcbpApiBase()) + _0x3bfb45;
  let _0x1a2ff7;
  try {
    _0x1a2ff7 = await fetch(_0x3d8759, { "method": "POST", "headers": { "Content-Type": "application/json", "X-API-Key": __privateGet(this, _apiKey2) }, "body": JSON["stringify"](_0x73361a) });
  } catch (_0x160f91) {
    const _0x3bf7a3 = _0x160f91 instanceof Error ? _0x160f91["message"] : String(_0x160f91);
    throw new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", "Ağ hatası: " + _0x3bf7a3);
  }
  const _0x593907 = await _0x1a2ff7["json"]()["catch"](() => null);
  if (!_0x1a2ff7["ok"]) {
    const _0x4bf1f7 = (_0x593907 == null ? void 0 : _0x593907["mesaj"]) || (_0x593907 == null ? void 0 : _0x593907["message"]) || "İstek başarısız (HTTP " + _0x1a2ff7["status"] + ")";
    throw new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", _0x4bf1f7);
  }
  if ((_0x593907 == null ? void 0 : _0x593907["isSuccess"]) === ![] || (_0x593907 == null ? void 0 : _0x593907["success"]) === ![]) throw new AnalysisRequestError("ANALYSIS_UNSUCCESSFUL", _0x593907["mesaj"] || _0x593907["message"] || "Analiz başarısız.");
  const _0x4d58d5 = _0x593907 == null ? void 0 : _0x593907["object"];
  if (!(_0x4d58d5 == null ? void 0 : _0x4d58d5["geojson"])) throw new AnalysisRequestError("ANALYSIS_RESPONSE_MISSING_GEOJSON", "Yanıtta geojson yok.");
  return _0x4d58d5;
};
const FALLBACK_IMAGE_FILENAME = "blue-marble-fallback.jpg", FALLBACK_WORLD_IMAGE = new URL(FALLBACK_IMAGE_FILENAME, import.meta.url)["href"], FALLBACK_DELAY_MS = 3e3, BASEMAP_ERROR_RETRY_LIMIT = 2, BASEMAP_UNAVAILABLE_DELAY_MS = 1e4;
function watchBasemap(_0x37f5ba, _0x3c446a, _0x25501a, _0x10b745, _0x43f390, _0x35ee72) {
  let _0x22f688 = ![], _0x3e86df = ![];
  const _0x1170a0 = window["setTimeout"](() => {
    if (_0x22f688 || !_0x3c446a["isCurrentGeneration"](_0x25501a)) return;
    _0x3c446a["ensureFallbackBasemap"]();
  }, FALLBACK_DELAY_MS), _0x275e83 = window["setTimeout"](() => {
    if (_0x22f688 || !_0x3c446a["isCurrentGeneration"](_0x25501a)) return;
    _0x22f688 = !![], _0x4f71b8(), _0x3c446a["setStatus"]("unavailable"), _0x3c446a["removeBasemapLayer"](), _0x3c446a["ensureFallbackBasemap"](), _0x3c446a["emit"]("basemap:error", { "id": _0x10b745 });
  }, BASEMAP_UNAVAILABLE_DELAY_MS), _0x4f71b8 = () => {
    _0x3e86df = !![], window["clearTimeout"](_0x1170a0), window["clearTimeout"](_0x275e83), _0x35ee72["errorEvent"]["removeEventListener"](_0x259065);
  }, _0x259065 = (_0x431892) => {
    if (_0x22f688) return;
    if (!_0x3c446a["isCurrentGeneration"](_0x25501a)) return;
    if (!_0x37f5ba["imageryLayers"]["contains"](_0x43f390)) return;
    if (_0x431892["timesRetried"] < BASEMAP_ERROR_RETRY_LIMIT) {
      _0x431892["retry"] = !![];
      return;
    }
    _0x22f688 = !![], _0x4f71b8(), _0x3c446a["setStatus"]("unavailable"), _0x3c446a["removeBasemapLayer"](), _0x3c446a["ensureFallbackBasemap"](), _0x3c446a["emit"]("basemap:error", { "id": _0x10b745 });
  }, _0x8c4dc6 = _0x35ee72["requestImage"]["bind"](_0x35ee72);
  _0x35ee72["requestImage"] = (_0x4eb22a, _0x131552, _0xe778d5, _0x2beb6c) => {
    const _0xe35955 = _0x8c4dc6(_0x4eb22a, _0x131552, _0xe778d5, _0x2beb6c);
    if (_0xe35955 && !_0x22f688 && !_0x3e86df) _0xe35955["then"](_0x2992b6, () => void 0);
    return _0xe35955;
  };
  const _0x2992b6 = () => {
    if (_0x22f688 || _0x3e86df) return;
    if (!_0x3c446a["isCurrentGeneration"](_0x25501a)) {
      _0x4f71b8();
      return;
    }
    _0x22f688 = !![], _0x4f71b8(), _0x3c446a["setStatus"]("ready"), _0x3c446a["clearFallbackBasemap"](), _0x3c446a["emit"]("basemap:recovered", { "id": _0x10b745 });
  };
  return _0x35ee72["errorEvent"]["addEventListener"](_0x259065), _0x4f71b8;
}
const BASEMAP_LAYER_ID = "__tucbs_basemap__";
function trackProviderRequests(_0x411d34) {
  const _0x1fdad8 = /* @__PURE__ */ new Set(), _0x1af1d3 = _0x411d34["requestImage"]["bind"](_0x411d34);
  return _0x411d34["requestImage"] = (_0x1c05fe, _0x2764dd, _0x3a16a1, _0x3900d1) => {
    if (_0x3900d1) _0x1fdad8["add"](_0x3900d1);
    const _0xf52c21 = _0x1af1d3(_0x1c05fe, _0x2764dd, _0x3a16a1, _0x3900d1);
    if (_0x3900d1 && _0xf52c21) {
      const _0x4e9361 = () => {
        _0x1fdad8["delete"](_0x3900d1);
      };
      _0xf52c21["then"](_0x4e9361, _0x4e9361);
    }
    return _0xf52c21;
  }, () => {
    for (const _0x574d44 of _0x1fdad8) _0x574d44["cancel"]();
    _0x1fdad8["clear"]();
  };
}
class BasemapController {
  constructor(_0x7ced96, _0x3743a3) {
    this["_basemapGeneration"] = 0, this["_basemapStatus"] = "ready", this["_fallbackBasemapLayer"] = null, this["viewer"] = _0x7ced96, this["deps"] = _0x3743a3;
  }
  get ["status"]() {
    return this["_basemapStatus"];
  }
  get ["currentBasemapId"]() {
    return this["_currentBasemapId"];
  }
  ["set"](_0x145a12) {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0, this["deps"]["removeBasemapLayers"](), this["clearFallbackBasemap"]();
    const _0x2165f = ++this["_basemapGeneration"];
    if (_0x145a12 === null || _0x145a12 === void 0) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    const _0x34567b = typeof _0x145a12 === "string" ? { "id": _0x145a12 } : _0x145a12;
    if (!_0x34567b["id"]) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    this["_basemapStatus"] = "loading", this["_currentBasemapId"] = _0x34567b["id"];
    const _0x27397a = this["resolveBasemapUrl"](_0x34567b), _0x50afb7 = new UrlTemplateImageryProvider({ "url": _0x27397a }), _0x4da197 = trackProviderRequests(_0x50afb7);
    this["_cancelBasemapRequests"] = _0x4da197;
    const _0x164a34 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x50afb7, 0);
    this["deps"]["addBasemapImageryLayer"](BASEMAP_LAYER_ID, _0x34567b["id"], _0x164a34), this["_stopBasemapWatch"] = watchBasemap(this["viewer"], { "ensureFallbackBasemap": () => this["ensureFallbackBasemap"](), "clearFallbackBasemap": () => this["clearFallbackBasemap"](), "removeBasemapLayer": () => {
      _0x4da197(), this["deps"]["removeLayer"](BASEMAP_LAYER_ID);
    }, "emit": (_0x3abe71, _0x359a9b) => this["deps"]["emit"](_0x3abe71, _0x359a9b), "setStatus": (_0x45fa9a) => {
      this["_basemapStatus"] = _0x45fa9a;
    }, "isCurrentGeneration": (_0x157e29) => _0x157e29 === this["_basemapGeneration"] }, _0x2165f, _0x34567b["id"], _0x164a34, _0x50afb7);
  }
  ["stop"]() {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0;
  }
  ["addFallbackBasemap"]() {
    const _0x3a31c5 = new SingleTileImageryProvider({ "url": FALLBACK_WORLD_IMAGE, "tileWidth": 5400, "tileHeight": 2700, "credit": "NASA Earth Observatory (Blue Marble)" }), _0x3e44d7 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x3a31c5, 0);
    this["_fallbackBasemapLayer"] = _0x3e44d7;
  }
  ["ensureFallbackBasemap"]() {
    if (this["_fallbackBasemapLayer"] !== null) return;
    try {
      this["addFallbackBasemap"]();
    } catch (_0x3a589) {
      console["warn"]("[tucbs-core] Basemap yedek goruntusu eklenemedi:", _0x3a589);
    }
  }
  ["clearFallbackBasemap"]() {
    this["_fallbackBasemapLayer"] !== null && (this["viewer"]["imageryLayers"]["remove"](this["_fallbackBasemapLayer"], !![]), this["_fallbackBasemapLayer"] = null);
  }
  ["resolveBasemapUrl"](_0x2e933a) {
    const _0x2cd2e2 = (_0x1247e8) => {
      const _0x19da01 = this["deps"]["getProxyBase"](), _0x1694df = _0x19da01 + "https://atlas.harita.gov.tr/" + _0x1247e8 + "/{z}/{x}/{y}.png";
      return this["appendTucbsApiKeyQuery"](_0x1694df);
    };
    switch (_0x2e933a["id"]) {
      case "hgm-temel":
        return _0x2cd2e2("temel");
      case "hgm-ortofoto":
        return _0x2cd2e2("ortofotoservis");
      case "hgm-siyasi":
        return _0x2cd2e2("siyasi");
      case "hgm-yukseklik":
        return _0x2cd2e2("yukseklik");
      default:
        return _0x2e933a["id"];
    }
  }
  ["appendTucbsApiKeyQuery"](_0x151485) {
    const _0x3b753c = this["deps"]["getApiKey"]();
    if (!_0x3b753c) return _0x151485;
    const _0x41d0f6 = _0x151485["includes"]("?") ? "&" : "?";
    return "" + _0x151485 + _0x41d0f6 + "tucbsapikey=" + encodeURIComponent(_0x3b753c);
  }
}
function nextFrame(_0x2212e6) {
  return new Promise((_0x36557f) => {
    const _0x1e3e95 = () => {
      _0x2212e6["scene"]["postRender"]["removeEventListener"](_0x1e3e95), _0x36557f();
    };
    _0x2212e6["scene"]["postRender"]["addEventListener"](_0x1e3e95), _0x2212e6["scene"]["requestRender"]();
  });
}
async function captureCanvasBlob(_0x485374, _0x7b91b8, _0x58ea28) {
  const _0x2910b0 = _0x485374["canvas"];
  if (typeof _0x2910b0["toBlob"] === "function") return new Promise((_0x322fbe, _0x4d4b16) => {
    _0x2910b0["toBlob"]((_0x178670) => _0x178670 ? _0x322fbe(_0x178670) : _0x4d4b16(new Error("canvas.toBlob basarisiz oldu")), _0x7b91b8, _0x58ea28);
  });
  const _0x562e70 = _0x2910b0["toDataURL"](_0x7b91b8, _0x58ea28), _0x16be95 = _0x562e70["split"](",")[1] ?? "", _0x2ce72b = atob(_0x16be95), _0x2ae37b = new Uint8Array(_0x2ce72b["length"]);
  for (let _0x21e889 = 0; _0x21e889 < _0x2ce72b["length"]; _0x21e889++) _0x2ae37b[_0x21e889] = _0x2ce72b["charCodeAt"](_0x21e889);
  return new Blob([_0x2ae37b], { "type": _0x7b91b8 });
}
function measureGroundMetersPerPixel(_0x155c62) {
  const _0x2c27b3 = _0x155c62["scene"], _0x598347 = _0x155c62["camera"], _0x5b9684 = _0x155c62["canvas"], _0x3bc48d = _0x5b9684["clientWidth"] / 2, _0x1ed592 = _0x5b9684["clientHeight"] / 2, _0x151346 = _0x598347["getPickRay"](new Cartesian2(_0x3bc48d - 1, _0x1ed592)), _0x2736f7 = _0x598347["getPickRay"](new Cartesian2(_0x3bc48d + 1, _0x1ed592));
  if (!_0x151346 || !_0x2736f7) return null;
  const _0x11ddc5 = _0x2c27b3["globe"]["pick"](_0x151346, _0x2c27b3), _0x2558ab = _0x2c27b3["globe"]["pick"](_0x2736f7, _0x2c27b3);
  if (!_0x11ddc5 || !_0x2558ab) return null;
  return Cartesian3["distance"](_0x11ddc5, _0x2558ab) / 2;
}
function toOrientedDestination(_0xde18f8) {
  return { "destination": Cartesian3["fromDegrees"](_0xde18f8["longitude"], _0xde18f8["latitude"], _0xde18f8["height"]), "orientation": { "heading": _0x33fcf2["toRadians"](_0xde18f8["heading"] ?? 0), "pitch": _0x33fcf2["toRadians"](_0xde18f8["pitch"] ?? -90), "roll": _0x33fcf2["toRadians"](_0xde18f8["roll"] ?? 0) } };
}
function setView(_0x36e813, _0x275398) {
  _0x36e813["camera"]["setView"](toOrientedDestination(_0x275398));
}
function setExtent(_0x4a0de7, _0x2b9e8a) {
  _0x4a0de7["camera"]["setView"]({ "destination": Rectangle["fromDegrees"](_0x2b9e8a["west"], _0x2b9e8a["south"], _0x2b9e8a["east"], _0x2b9e8a["north"]) });
}
function flyTo(_0xf608ce, _0x28b632) {
  _0xf608ce["camera"]["flyTo"](toOrientedDestination(_0x28b632));
}
function zoomTo(_0x4ad526, _0x24d9de, _0x59e34b, _0x4a107d) {
  _0x4ad526["camera"]["setView"]({ "destination": Cartesian3["fromDegrees"](_0x24d9de, _0x59e34b, _0x4a107d) });
}
async function zoomToLayer(_0x586042, _0x8dab77) {
  return _0x586042["zoomTo"](_0x8dab77["cesiumObject"], new HeadingPitchRange(0, -_0x33fcf2["PI_OVER_TWO"], 0));
}
function trimSlash(_0x5896eb) {
  return _0x5896eb["replace"](/\/+$/, "");
}
async function validateApiKey(_0x3cacf5, _0x502f05 = getUcbpApiBase()) {
  if (!_0x3cacf5) return;
  const _0x38c4ff = trimSlash(_0x502f05) + "/auth/validate";
  let _0x18b954;
  try {
    _0x18b954 = await fetch(_0x38c4ff, { "method": "GET", "headers": { "X-API-Key": _0x3cacf5 } });
  } catch (_0x3cc65a) {
    const _0x756019 = _0x3cc65a instanceof Error ? _0x3cc65a["message"] : String(_0x3cc65a);
    throw new ApiKeyValidationError(_0x756019);
  }
  if (!_0x18b954["ok"]) {
    let _0x56477f, _0x3d3936, _0x4aefd3, _0x3228fd;
    try {
      const _0x423e8e = await _0x18b954["json"]();
      _0x56477f = _0x423e8e["title"], _0x3d3936 = _0x423e8e["message"] || _0x423e8e["mesaj"], _0x4aefd3 = _0x423e8e["reason"], _0x3228fd = _0x423e8e["detail"];
    } catch {
    }
    const _0x16d8fa = {};
    if (_0x56477f !== void 0) _0x16d8fa["title"] = _0x56477f;
    if (_0x4aefd3 !== void 0) _0x16d8fa["reason"] = _0x4aefd3;
    if (_0x3228fd !== void 0) _0x16d8fa["detail"] = _0x3228fd;
    throw new ApiKeyValidationError(_0x3d3936 || "HTTP " + _0x18b954["status"], _0x16d8fa);
  }
}
async function ensureEffectiveApiKeyValid(_0x5bc00f, _0x2dcc0c) {
  const _0x336f11 = _0x5bc00f || getGlobalApiKey();
  if (!_0x336f11) throw new ApiKeyValidationError("Haritayı görüntülemek için geçerli bir apiKey gereklidir.", { "title": "API Anahtarı Eksik", "reason": "missing-key", "code": "API_KEY_MISSING" });
  await validateApiKey(_0x336f11, _0x2dcc0c);
}
const DRAWING_LAYER_ID = "__tucbs_drawing_layer__", DRAWING_LAYER_TITLE = "Çizim Katmanı", MEASURE_LAYER_ID = "__tucbs_measure_layer__", MEASURE_LAYER_TITLE = "Ölçü Katmanı", MAX_ZOOM_DISTANCE_METERS = 25e6, MIN_ZOOM_DISTANCE_METERS = 10, DEFAULT_INITIAL_EXTENT = { "west": 22.94, "south": 34.05, "east": 47.39, "north": 42.7 };
let Map$1 = (_a = class {
  constructor(_0x3bb443, _0xf38fa7 = {}) {
    __privateAdd(this, _unregisterApiKeyRefresh);
    __privateAdd(this, _apiKey3);
    const _0x4a4d28 = document["createElement"]("div");
    _0x4a4d28["style"]["display"] = "none", this["viewer"] = new Viewer(_0x3bb443, this["buildViewerOptions"](_0xf38fa7, _0x4a4d28)), this["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#a3c6e0"), this["viewer"]["scene"]["screenSpaceCameraController"]["maximumZoomDistance"] = MAX_ZOOM_DISTANCE_METERS, this["viewer"]["scene"]["screenSpaceCameraController"]["minimumZoomDistance"] = MIN_ZOOM_DISTANCE_METERS;
    const _0x415f1b = _0xf38fa7["apiKey"] ?? getGlobalApiKey();
    __privateSet(this, _apiKey3, _0x415f1b), this["layerManager"] = new LayerManager(this["viewer"]), this["selectionHighlight"] = new SelectionHighlight(this["viewer"]), this["layerManager"]["configure"]({ ..._0x415f1b !== void 0 && { "apiKey": _0x415f1b }, ..._0xf38fa7["trustedApiKeyHosts"] !== void 0 && { "trustedApiKeyHosts": _0xf38fa7["trustedApiKeyHosts"] }, ..._0xf38fa7["apiKeyDiscoveryUrl"] !== void 0 && { "apiKeyDiscoveryUrl": _0xf38fa7["apiKeyDiscoveryUrl"] } }), this["interactionManager"] = new InteractionManager(this["viewer"]), this["drawingManager"] = new DrawingManager(this["viewer"], this["interactionManager"]), this["analysisManager"] = new AnalysisManager({ "apiKey": _0x415f1b ?? "" }), this["basemapController"] = new BasemapController(this["viewer"], { "removeBasemapLayers": () => this["layerManager"]["_removeBasemapLayers"](), "addBasemapImageryLayer": (_0x4c7ba4, _0x83f258, _0x1e5ce0) => this["layerManager"]["_addBasemapImageryLayer"](_0x4c7ba4, _0x83f258, _0x1e5ce0), "removeLayer": (_0x4b7c6f) => this["layerManager"]["removeLayer"](_0x4b7c6f), "emit": (_0x41285, _0x300168) => this["layerManager"]["emit"](_0x41285, _0x300168), "getProxyBase": () => getProxyBase(), "getApiKey": () => __privateGet(this, _apiKey3) }), _0xf38fa7["apiKey"] === void 0 && this["registerGlobalApiKeyRotation"](_0x415f1b), this["wireShapeSource"]("draw", DRAWING_LAYER_ID, DRAWING_LAYER_TITLE, (_0x33f1da, _0x5aa5c0, _0x10bb8f) => this["layerManager"]["_addDrawnShape"](_0x33f1da, _0x5aa5c0, _0x10bb8f)), this["wireShapeSource"]("measure", MEASURE_LAYER_ID, MEASURE_LAYER_TITLE, (_0x29acfc, _0x4719db, _0x2a33bf) => this["layerManager"]["_addMeasuredShape"](_0x29acfc, _0x4719db, _0x2a33bf)), _0xf38fa7["camera"] !== void 0 ? this["setView"](_0xf38fa7["camera"]) : this["setExtent"](_0xf38fa7["initialExtent"] ?? DEFAULT_INITIAL_EXTENT), this["setBasemap"](_0xf38fa7["basemap"]);
  }
  async ["ensureApiKeyValid"]() {
    await validateApiKey(__privateGet(this, _apiKey3) ?? "", getUcbpApiBase());
  }
  async ["runBuffer"](_0x2d13f7, _0x3ca0ac) {
    const _0x2c6961 = await this["analysisManager"]["buffer"](_0x2d13f7), _0x30367a = (_0x3ca0ac == null ? void 0 : _0x3ca0ac["id"]) ?? "buffer-" + Date["now"](), _0x10411d = (_0x3ca0ac == null ? void 0 : _0x3ca0ac["title"]) ?? "Tampon sonucu (" + _0x2d13f7["distanceM"] + "m)";
    this["layerManager"]["markAnalysisResult"](_0x30367a);
    const _0x1b6866 = await this["layerManager"]["add"]("GEOJSON", { "id": _0x30367a, "title": _0x10411d, "data": _0x2c6961["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x1b6866;
  }
  async ["runIntersection"](_0x584e9e, _0x3b77d8) {
    const _0x3bd4c5 = await this["analysisManager"]["intersection"](_0x584e9e), _0x53c3e8 = (_0x3b77d8 == null ? void 0 : _0x3b77d8["id"]) ?? "intersection-" + Date["now"](), _0xa65ed4 = (_0x3b77d8 == null ? void 0 : _0x3b77d8["title"]) ?? "Kesişim sonucu";
    this["layerManager"]["markAnalysisResult"](_0x53c3e8);
    const _0x3d98dd = await this["layerManager"]["add"]("GEOJSON", { "id": _0x53c3e8, "title": _0xa65ed4, "data": _0x3bd4c5["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x3d98dd;
  }
  async ["runBoundary"](_0x2e6aa5, _0x5f019b) {
    const _0x4d717e = await this["analysisManager"]["boundary"](_0x2e6aa5);
    return this["addAnalysisGeoJson"]((_0x5f019b == null ? void 0 : _0x5f019b["id"]) ?? "boundary-" + Date["now"](), (_0x5f019b == null ? void 0 : _0x5f019b["title"]) ?? "Sınır sonucu", _0x4d717e["geojson"]);
  }
  async ["runClip"](_0x49b1f4, _0x39df51) {
    const _0x2c3589 = await this["analysisManager"]["clip"](_0x49b1f4);
    return this["addAnalysisGeoJson"]((_0x39df51 == null ? void 0 : _0x39df51["id"]) ?? "clip-" + Date["now"](), (_0x39df51 == null ? void 0 : _0x39df51["title"]) ?? "Kırpma sonucu", _0x2c3589["geojson"]);
  }
  async ["runDifference"](_0x1ebccb, _0x3ea564) {
    const _0x42f81b = await this["analysisManager"]["difference"](_0x1ebccb);
    return this["addAnalysisGeoJson"]((_0x3ea564 == null ? void 0 : _0x3ea564["id"]) ?? "difference-" + Date["now"](), (_0x3ea564 == null ? void 0 : _0x3ea564["title"]) ?? "Fark sonucu", _0x42f81b["geojson"]);
  }
  async ["runSubtract"](_0x5ef7ee, _0x503fc6) {
    const _0x3e4226 = await this["analysisManager"]["subtract"](_0x5ef7ee);
    return this["addAnalysisGeoJson"]((_0x503fc6 == null ? void 0 : _0x503fc6["id"]) ?? "subtract-" + Date["now"](), (_0x503fc6 == null ? void 0 : _0x503fc6["title"]) ?? "Çıkarma sonucu", _0x3e4226["geojson"]);
  }
  async ["runUnion"](_0x59775e, _0x1b6159) {
    const _0x35977b = await this["analysisManager"]["union"](_0x59775e);
    return this["addAnalysisGeoJson"]((_0x1b6159 == null ? void 0 : _0x1b6159["id"]) ?? "union-" + Date["now"](), (_0x1b6159 == null ? void 0 : _0x1b6159["title"]) ?? "Birleştir sonucu", _0x35977b["geojson"]);
  }
  async ["runWedgeBuffer"](_0x346545, _0x3f0b56) {
    const _0x4a395a = await this["analysisManager"]["wedgeBuffer"](_0x346545);
    return this["addAnalysisGeoJson"]((_0x3f0b56 == null ? void 0 : _0x3f0b56["id"]) ?? "wedge-" + Date["now"](), (_0x3f0b56 == null ? void 0 : _0x3f0b56["title"]) ?? "Kama tampon sonucu", _0x4a395a["geojson"]);
  }
  async ["addAnalysisGeoJson"](_0x53a2e8, _0x5a4768, _0x27e9c0) {
    return this["layerManager"]["markAnalysisResult"](_0x53a2e8), this["layerManager"]["add"]("GEOJSON", { "id": _0x53a2e8, "title": _0x5a4768, "data": _0x27e9c0, "layerType": "GEOJSON", "clampToGround": !![] });
  }
  ["setView"](_0x20f29a) {
    setView(this["viewer"], _0x20f29a);
  }
  ["setExtent"](_0x21498f) {
    setExtent(this["viewer"], _0x21498f);
  }
  ["flyTo"](_0x349546) {
    flyTo(this["viewer"], _0x349546);
  }
  ["zoomTo"](_0x1ceb48, _0x5bc4cd, _0x46a722) {
    zoomTo(this["viewer"], _0x1ceb48, _0x5bc4cd, _0x46a722);
  }
  async ["zoomToLayer"](_0x2d2887) {
    return zoomToLayer(this["viewer"], _0x2d2887);
  }
  ["dropMarker"](_0x39c4d5, _0x3163c9, _0x4f173b, _0x4bfc48 = {}) {
    this["clearMarker"](), this["_removeMarker"] = createMarkerOverlay(this["viewer"], _0x39c4d5, _0x3163c9, _0x4f173b, _0x4bfc48);
  }
  ["clearMarker"]() {
    var _a2;
    (_a2 = this["_removeMarker"]) == null ? void 0 : _a2.call(this), this["_removeMarker"] = void 0;
  }
  get ["basemapStatus"]() {
    return this["basemapController"]["status"];
  }
  ["setBasemap"](_0x1cc20d) {
    this["basemapController"]["set"](_0x1cc20d);
  }
  ["setMode"](_0x5135f3) {
    _0x5135f3 === "2D" ? this["viewer"]["scene"]["morphTo2D"](0) : this["viewer"]["scene"]["morphTo3D"](0);
  }
  ["setQuality"](_0xb7ec03) {
    const _0x26aac0 = Math["min"](100, Math["max"](0, _0xb7ec03));
    this["viewer"]["resolutionScale"] = Math["max"](0.1, _0x26aac0 / 100);
  }
  ["resize"]() {
    this["viewer"]["resize"]();
  }
  async ["exportJPEG"](_0x3fb048 = "tucbs-harita", _0x3127f5 = 0.92) {
    const _0x6b5cdd = await this["captureScreenshotBlob"](_0x3127f5);
    triggerDownload(_0x6b5cdd, _0x3fb048 + "-" + Date["now"]() + ".jpg");
  }
  async ["captureScreenshotBlob"](_0xcbf8f1 = 0.92) {
    return await nextFrame(this["viewer"]), captureCanvasBlob(this["viewer"], "image/jpeg", _0xcbf8f1);
  }
  ["measureGroundMetersPerPixel"]() {
    return measureGroundMetersPerPixel(this["viewer"]);
  }
  ["buildViewerOptions"](_0x939cca, _0x3bfdd6) {
    return { "timeline": _0x939cca["timeline"] ?? ![], "animation": _0x939cca["animation"] ?? ![], "baseLayerPicker": _0x939cca["baseLayerPicker"] ?? ![], "baseLayer": ![], "geocoder": _0x939cca["geocoder"] ?? ![], "homeButton": _0x939cca["homeButton"] ?? ![], "sceneModePicker": _0x939cca["sceneModePicker"] ?? ![], "navigationHelpButton": _0x939cca["navigationHelpButton"] ?? ![], "infoBox": _0x939cca["infoBox"] ?? ![], "selectionIndicator": _0x939cca["selectionIndicator"] ?? ![], "shadows": _0x939cca["shadows"] ?? ![], "shouldAnimate": _0x939cca["shouldAnimate"] ?? ![], "fullscreenButton": _0x939cca["fullscreenButton"] ?? ![], "creditContainer": _0x3bfdd6, ..._0x939cca["cesiumOptions"] };
  }
  ["registerGlobalApiKeyRotation"](_0x29120a) {
    _0x29120a !== void 0 && console["info"]("[@tucbs/core] Bu Map instance'i configureTucbs() global apiKey'ini kullaniyor (kendi apiKey attribute'u/options'u verilmedi). Farkli bir anahtar gerekiyorsa Map/component'e acikca apiKey verin."), __privateSet(this, _unregisterApiKeyRefresh, registerApiKeyRefresh(() => {
      const _0x10e3ab = getGlobalApiKey();
      __privateSet(this, _apiKey3, _0x10e3ab), this["layerManager"]["configure"]({ ..._0x10e3ab !== void 0 && { "apiKey": _0x10e3ab } }), this["analysisManager"]["configure"]({ "apiKey": _0x10e3ab ?? "" }), void this["ensureApiKeyValid"]()["catch"]((_0x54f805) => {
        console["error"]("[@tucbs/core] apiKey rotasyon validate basarisiz:", _0x54f805);
      }), this["basemapController"]["currentBasemapId"] !== void 0 && this["setBasemap"](this["basemapController"]["currentBasemapId"]);
    }));
  }
  ["wireShapeSource"](_0x5b3190, _0x153c05, _0x31418e, _0x1f21d2) {
    this["drawingManager"]["on"]("draw:complete", ({ shape: _0x2c9c4b }) => {
      if (_0x2c9c4b["source"] !== _0x5b3190) return;
      void _0x1f21d2(_0x153c05, _0x31418e, _0x2c9c4b);
    }), this["drawingManager"]["on"]("draw:remove", ({ shape: _0xdd3332 }) => {
      if (_0xdd3332["source"] !== _0x5b3190) return;
      this["layerManager"]["_removeDrawnShape"](_0x153c05, _0xdd3332["entity"]);
    });
  }
  ["showSelectionHighlight"](_0x6d9bfc) {
    this["selectionHighlight"]["show"](_0x6d9bfc);
  }
  ["clearSelectionHighlight"]() {
    this["selectionHighlight"]["clear"]();
  }
  ["destroy"]() {
    var _a2;
    this["clearMarker"](), this["selectionHighlight"]["clear"](), this["basemapController"]["stop"](), (_a2 = __privateGet(this, _unregisterApiKeyRefresh)) == null ? void 0 : _a2.call(this), this["drawingManager"]["destroy"](), this["interactionManager"]["destroy"](), this["layerManager"]["destroy"](), this["viewer"]["destroy"]();
  }
}, _unregisterApiKeyRefresh = new WeakMap(), _apiKey3 = new WeakMap(), _a);
const HGM_BASEMAP_IDS = ["hgm-temel", "hgm-ortofoto", "hgm-siyasi", "hgm-yukseklik"];
export {
  AnalysisManager,
  AnalysisRequestError,
  ApiKeyValidationError,
  DEFAULT_UCBP_API_BASE as DEFAULT_ANALYSIS_API_BASE,
  DEFAULT_INITIAL_EXTENT,
  DEFAULT_UCBP_API_BASE,
  DrawingManager,
  GeometryError,
  HGM_BASEMAP_IDS,
  InteractionManager,
  LayerManager,
  LayerOperationError,
  MEASURE_LAYER_ID,
  Map$1 as Map,
  OgcRequestError,
  TucbsError,
  buildCapabilitiesUrl,
  configureTucbs,
  detectServiceType,
  ensureEffectiveApiKeyValid,
  entityToGeoJSON,
  featureLabel,
  fetchWcsCoverageExtents,
  getCapabilities,
  getErrorCodes,
  getProxyBase,
  getUcbpApiBase,
  parseCapabilities,
  parseWcsTiffFormat,
  parseWmsTiffFormat,
  registerApiKeyRefresh,
  validateApiKey,
  wcsRectangleFor
};
