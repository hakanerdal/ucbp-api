import { configureTucbs } from "@tucbs/core";

configureTucbs({
  apiBase: "https://ucbp-api.tucbs.gov.tr/ucbp-api",
  apiKey: "API_ANAHTARI",
  proxyBase: "https://ucbp-api.tucbs.gov.tr/proxyservice/proxyservice/getByUrl?url=",
});

await import("@tucbs/components");
