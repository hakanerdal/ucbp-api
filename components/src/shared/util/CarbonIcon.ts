/** `@carbon/icons` paketinin ürettiği, bir SVG düğümünü temsil eden ham veri şekli. */
export interface CarbonIconNode {
  /** SVG etiket adı (ör. `"svg"`, `"path"`). */
  readonly elem: string;
  /** Etiketin attribute'ları (ör. `viewBox`, `d`). */
  readonly attrs?: Record<string, string | number>;
  /** Alt düğümler (varsa). */
  readonly content?: readonly CarbonIconNode[];
}

/** Bir @carbon/icons dugumunu duz SVG string'ine cevirir (lit'in unsafeSVG'i ile render icin). */
export function iconNodeToString(node: CarbonIconNode): string {
  const attrs = node.attrs
    ? Object.entries(node.attrs)
        .map(([key, value]) => `${key}="${String(value)}"`)
        .join(" ")
    : "";
  const children = (node.content ?? []).map(iconNodeToString).join("");
  return `<${node.elem} ${attrs}>${children}</${node.elem}>`;
}
