/**
 * React'te tucbs etiketlerinin tipini bildirir.
 * Paket kurulunca gelir; kullanıcı ayrı bildirim dosyası yazmaz.
 */
/** Paket kurulunca React bu etiketleri tanısın diye dışa açılır. */
export type TucbsJsxTags = "tucbs-analysis-panel" | "tucbs-analysis-tool" | "tucbs-app" | "tucbs-authorized-layers" | "tucbs-basemap-picker" | "tucbs-boundary-tool" | "tucbs-buffer-tool" | "tucbs-busy-overlay" | "tucbs-clip-tool" | "tucbs-delete-tool" | "tucbs-difference-tool" | "tucbs-draw-tool" | "tucbs-file-upload" | "tucbs-goto-coordinate" | "tucbs-identify-panel" | "tucbs-info-bar" | "tucbs-intersection-tool" | "tucbs-layer-export" | "tucbs-layer-list" | "tucbs-layer-menu-portal" | "tucbs-legend-panel" | "tucbs-map" | "tucbs-map-export" | "tucbs-map-preview" | "tucbs-measure-tool" | "tucbs-print-panel-content" | "tucbs-print-tool" | "tucbs-quality-bar" | "tucbs-service-style-card" | "tucbs-service-upload" | "tucbs-settings-tool" | "tucbs-slide-over-panel" | "tucbs-style-editor" | "tucbs-subtract-tool" | "tucbs-toolbar" | "tucbs-tooltip-portal" | "tucbs-union-tool" | "tucbs-wedge-buffer-tool" | "tucbs-zoom-tool";
export {};
type TucbsTagProps = {
    children?: unknown;
    [attribute: string]: unknown;
};
declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "tucbs-analysis-panel": TucbsTagProps;
            "tucbs-analysis-tool": TucbsTagProps;
            "tucbs-app": TucbsTagProps;
            "tucbs-authorized-layers": TucbsTagProps;
            "tucbs-basemap-picker": TucbsTagProps;
            "tucbs-boundary-tool": TucbsTagProps;
            "tucbs-buffer-tool": TucbsTagProps;
            "tucbs-busy-overlay": TucbsTagProps;
            "tucbs-clip-tool": TucbsTagProps;
            "tucbs-delete-tool": TucbsTagProps;
            "tucbs-difference-tool": TucbsTagProps;
            "tucbs-draw-tool": TucbsTagProps;
            "tucbs-file-upload": TucbsTagProps;
            "tucbs-goto-coordinate": TucbsTagProps;
            "tucbs-identify-panel": TucbsTagProps;
            "tucbs-info-bar": TucbsTagProps;
            "tucbs-intersection-tool": TucbsTagProps;
            "tucbs-layer-export": TucbsTagProps;
            "tucbs-layer-list": TucbsTagProps;
            "tucbs-layer-menu-portal": TucbsTagProps;
            "tucbs-legend-panel": TucbsTagProps;
            "tucbs-map": TucbsTagProps;
            "tucbs-map-export": TucbsTagProps;
            "tucbs-map-preview": TucbsTagProps;
            "tucbs-measure-tool": TucbsTagProps;
            "tucbs-print-panel-content": TucbsTagProps;
            "tucbs-print-tool": TucbsTagProps;
            "tucbs-quality-bar": TucbsTagProps;
            "tucbs-service-style-card": TucbsTagProps;
            "tucbs-service-upload": TucbsTagProps;
            "tucbs-settings-tool": TucbsTagProps;
            "tucbs-slide-over-panel": TucbsTagProps;
            "tucbs-style-editor": TucbsTagProps;
            "tucbs-subtract-tool": TucbsTagProps;
            "tucbs-toolbar": TucbsTagProps;
            "tucbs-tooltip-portal": TucbsTagProps;
            "tucbs-union-tool": TucbsTagProps;
            "tucbs-wedge-buffer-tool": TucbsTagProps;
            "tucbs-zoom-tool": TucbsTagProps;
        }
    }
}
//# sourceMappingURL=react-jsx.d.ts.map