import {
  entityToGeoJSON,
  featureLabel,
  type EntityInteractionDetail,
  type Map as TucbsMapCore,
} from "@tucbs/core";

export type SelectedFeature = {
  type: "Feature";
  id?: string | number | undefined;
  properties: Record<string, unknown>;
  geometry: object & { type?: string };
};

type MapHost = HTMLElement & { map?: TucbsMapCore | null };

/**
 * Analiz formunun harita tıklamasını seçime çevirir; identify araç açıkken susar.
 */
export class AnalysisMapBind {
  private map: TucbsMapCore | null = null;
  private host: MapHost | null = null;
  private readonly onReady = (): void => {
    this.attach();
  };

  constructor(
    private readonly resolve: () => { map: TucbsMapCore | null; mapElementId: string },
    private readonly onPick: (feature: SelectedFeature, label: string) => void,
    private readonly onBadGeoJson: () => void,
  ) {}

  /** Haritayı bulur ve entity tıklamasını dinler. */
  attach(): void {
    const { map, mapElementId } = this.resolve();
    if (map) {
      this.listen(map);
      return;
    }
    if (!mapElementId) return;
    const host = document.getElementById(mapElementId) as MapHost | null;
    if (!host) return;
    this.host = host;
    if (host.map) {
      this.listen(host.map);
      return;
    }
    host.addEventListener("ready", this.onReady, { once: true });
  }

  /** Dinleyiciyi ve identify askısını kaldırır. */
  detach(): void {
    if (this.map) {
      this.map.interactionManager.off("entity:click", this.onClick);
      this.map.clearSelectionHighlight();
      this.map.interactionManager.resumeIdentify();
      this.map = null;
    }
    if (this.host) {
      this.host.removeEventListener("ready", this.onReady);
      this.host = null;
    }
  }

  current(): TucbsMapCore | null {
    return this.map ?? this.resolve().map;
  }

  /** Seçili nesneleri kırmızı vurguyla gösterir. */
  highlight(features: SelectedFeature[]): void {
    this.map?.showSelectionHighlight(features);
  }

  private listen(map: TucbsMapCore): void {
    if (this.map === map) return;
    if (this.map) {
      this.map.interactionManager.off("entity:click", this.onClick);
      this.map.interactionManager.resumeIdentify();
    }
    this.map = map;
    map.interactionManager.on("entity:click", this.onClick);
    map.interactionManager.suspendIdentify();
  }

  private readonly onClick = (detail: EntityInteractionDetail): void => {
    const feature = entityToGeoJSON(detail.entity);
    if (!feature) {
      this.onBadGeoJson();
      return;
    }
    this.onPick(
      {
        type: "Feature",
        id: feature.id,
        properties: (feature.properties ?? {}) as Record<string, unknown>,
        geometry: feature.geometry as SelectedFeature["geometry"],
      },
      featureLabel(feature),
    );
  };
}

/** Poligon veya çoklu poligon. */
export function isPolygonFeature(feature: SelectedFeature | null): boolean {
  const t = feature?.geometry?.type;
  return t === "Polygon" || t === "MultiPolygon";
}

/** Nokta veya çoklu nokta. */
export function isPointFeature(feature: SelectedFeature | null): boolean {
  const t = feature?.geometry?.type;
  return t === "Point" || t === "MultiPoint";
}
