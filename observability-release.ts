export const PUBLIC_SITE_RELEASE_ID_PATTERN = /^[0-9A-Za-z][0-9A-Za-z._+-]{0,127}$/u;
export const PUBLIC_SITE_RELEASE_HEADER = "X-ProyectaKonscio-Release" as const;

export function resolvePublicSiteBuildRelease(
  env: NodeJS.ProcessEnv,
  fallbackVersion: string,
): string {
  const candidates = [
    env.PROYECTAKONSCIO_RELEASE,
    env.APP_RELEASE,
    env.RELEASE_ID,
    env.NEXT_PUBLIC_APP_RELEASE,
    fallbackVersion,
  ];
  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const value = candidate.trim();
    if (PUBLIC_SITE_RELEASE_ID_PATTERN.test(value)) return value;
  }
  return "unknown";
}
