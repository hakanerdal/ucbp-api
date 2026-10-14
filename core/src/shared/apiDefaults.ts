import { getGlobalApiBase, getGlobalProxyBase } from "../config.js";

/**
 * Build-time ucbp-api kökü — `packages/core/.env` → `VITE_ANALYSIS_API_BASE`.
 */
export const DEFAULT_UCBP_API_BASE: string =
  (import.meta.env.VITE_ANALYSIS_API_BASE as string | undefined)?.trim() ||
  "/ucbp-api";

function trimSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Aktif ucbp-api kökü: önce {@link configureTucbs} `apiBase`, sonra build-time env.
 */
export function getUcbpApiBase(): string {
  const runtime = getGlobalApiBase();
  if (runtime) {
    return trimSlash(runtime);
  }
  return trimSlash(DEFAULT_UCBP_API_BASE);
}

/**
 * HGM getByUrl tabanı — yalnız {@link configureTucbs} `proxyBase`.
 * Verilmezse boş; tile URL'si kurulmaz. Sonda `url=` kalır; slash kırpılmaz.
 */
export function getProxyBase(): string {
  const runtime = getGlobalProxyBase();
  if (runtime) {
    return runtime;
  }
  console.warn("proxyBase yok; configureTucbs({ proxyBase }) verilmedi. main.js'te verilmeli.");
  return "";
}
