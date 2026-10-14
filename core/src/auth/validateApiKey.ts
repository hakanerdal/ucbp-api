import { getUcbpApiBase } from "../shared/apiDefaults.js";
import { getGlobalApiKey } from "../config.js";
import { ApiKeyValidationError } from "../shared/TucbsError.js";

export { ApiKeyValidationError } from "../shared/TucbsError.js";

function trimSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * GET /auth/validate + X-API-Key.
 * Key yoksa / boşsa no-op (harita key’siz açılabilir).
 * Geçersizse {@link ApiKeyValidationError} (body = backend message).
 */
export async function validateApiKey(
  apiKey: string,
  apiBase: string = getUcbpApiBase(),
): Promise<void> {
  if (!apiKey) {
    return;
  }
  const url = `${trimSlash(apiBase)}/auth/validate`;
  let response: Response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new ApiKeyValidationError(msg);
  }
  if (!response.ok) {
    let title: string | undefined;
    let message: string | undefined;
    let reason: string | undefined;
    let detail: string | undefined;
    try {
      const data = (await response.json()) as {
        title?: string;
        message?: string;
        mesaj?: string;
        reason?: string;
        detail?: string;
      };
      title = data.title;
      message = data.message || data.mesaj;
      reason = data.reason;
      detail = data.detail;
    } catch {
      /* ignore */
    }
    const opts: { title?: string; reason?: string; detail?: string } = {};
    if (title !== undefined) opts.title = title;
    if (reason !== undefined) opts.reason = reason;
    if (detail !== undefined) opts.detail = detail;
    throw new ApiKeyValidationError(
      message || `HTTP ${response.status}`,
      opts,
    );
  }
}

/**
 * Instance-seviyesi apiKey verilmemisse (bos/undefined) configureTucbs()
 * ile ayarlanmis GLOBAL apiKey'e (varsa) duser, sonra validateApiKey() ile
 * dogrular. HICBIRI yoksa (ne instance ne global) ApiKeyValidationError
 * firlatir -- validateApiKey()'in kendi "bos apiKey -> sessiz basari"
 * kisayoluna DUSMEDEN (bkz yukarisi), TucbsMap'in "apiKey yoksa hic
 * yuklenmesin" garantisini instance-veya-global her iki kaynak icin de
 * korur. Global anahtarin HAM DEGERI bu fonksiyonun DISINA hic cikmaz.
 */
export async function ensureEffectiveApiKeyValid(
  instanceApiKey: string | undefined,
  apiBase: string,
): Promise<void> {
  const effectiveKey = instanceApiKey || getGlobalApiKey();
  if (!effectiveKey) {
    throw new ApiKeyValidationError(
      "Haritayı görüntülemek için geçerli bir apiKey gereklidir.",
      { title: "API Anahtarı Eksik", reason: "missing-key", code: "API_KEY_MISSING" },
    );
  }
  await validateApiKey(effectiveKey, apiBase);
}
