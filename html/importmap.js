// release-github.mjs uretir. Elle degistirmeyin.
// Sayfa bunu module script'ten once yukler.
(function () {
  var base = document.currentScript.src;
  function lib(path) {
    return new URL(path, base).href;
  }

  window.CESIUM_BASE_URL = "https://cdn.jsdelivr.net/npm/cesium@1.143.0/Build/Cesium/";

  var imports = {
    cesium: "https://cdn.jsdelivr.net/npm/cesium@1.143.0/+esm",
    papaparse: "https://cdn.jsdelivr.net/npm/papaparse@5.5.4/+esm",
    "lit": lib("vendor/vendor-lite.js"),
    "shpjs": lib("vendor/vendor-lite.js"),
    "proj4": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/checkbox/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/radio-button/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/file-uploader/file-uploader-drop-container.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/icon-button/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/dropdown/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/multi-select/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/slider/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/number-input/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/text-input/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/data-table/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/notification/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/web-components/es/components/accordion/index.js": lib("vendor/vendor-lite.js"),
    "@carbon/icons": lib("vendor/vendor-lite.js"),
    "ol/format/WFS.js": lib("vendor/ol-wfs.js"),
    "ol/format/GeoJSON.js": lib("vendor/ol-geojson.js"),
    "@tucbs/core": lib("tucbs-core.js?v=0.2.3"),
    "@tucbs/components": lib("tucbs-components.es.js?v=0.2.3"),
  };

  document.write('<script type="importmap">' + JSON.stringify({ imports: imports }) + "</" + "script>");
})();
