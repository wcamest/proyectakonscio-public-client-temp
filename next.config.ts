import type { NextConfig } from "next";
import publicPackage from "./package.json";
import {
  PUBLIC_SITE_RELEASE_HEADER,
  resolvePublicSiteBuildRelease,
} from "./observability-release";

const publicApiInternalOrigin =
  process.env.PUBLIC_API_INTERNAL_ORIGIN?.trim() || "http://127.0.0.1:4000";
const releaseId = resolvePublicSiteBuildRelease(process.env, publicPackage.version);
const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  output: "standalone",
  // Bind tracing to the actual Next project/workspace. A build workspace lives
  // under .artifacts inside the monorepo, so parent lockfiles must not change
  // the standalone layout away from .next/standalone/server.js.
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },

  // The release marker is deliberately public and bound at build time. It is
  // never sourced from a browser request and must never contain secrets.
  env: {
    NEXT_PUBLIC_APP_RELEASE: releaseId,
    NEXT_PUBLIC_OBSERVABILITY_PUBLIC_REPORTING_ENABLED:
      process.env.OBSERVABILITY_PUBLIC_CLIENT_ERROR_ENABLED?.trim() === "false" ? "false" : "true",
  },

  // Browser source maps exist only as a transient build artifact. The public-site
  // build runner extracts them to the private observability store before packaging.
  productionBrowserSourceMaps:
    process.env.PROYECTAKONSCIO_PRIVATE_BROWSER_SOURCE_MAPS === "true",

  // Allow external dev origins (for example ngrok) when testing on mobile devices.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev"],

  /**
   * Browser code uses same-origin /api URLs. In development Next proxies those
   * requests to the local server; in production an upstream reverse proxy can
   * still intercept /api before Next. The destination can be overridden without
   * exposing an internal server origin to browser JavaScript.
   */
  async rewrites() {
    return [
      // Transitional legacy alias: videos historically lived under
      // public-client/public/videos and were referenced as /videos/*. During
      // the Media migration they live in persistent MEDIA_ROOT/videos while
      // existing pages continue to resolve without duplicating ~20 GiB inside
      // every immutable candidate/release. New CMS-managed references should
      // use the canonical /media/videos/* namespace.
      {
        source: "/videos/:path*",
        destination: `${publicApiInternalOrigin}/api/public/media/content?path=videos/:path*`,
      },
      // Remaining historical public/ namespaces are also runtime Media now.
      // Keep old URLs working while CMS references migrate toward /media/*.
      {
        source: "/images/:path*",
        destination: `${publicApiInternalOrigin}/api/public/media/content?path=images/:path*`,
      },
      {
        source: "/pdf/:path*",
        destination: `${publicApiInternalOrigin}/api/public/media/content?path=pdf/:path*`,
      },
      {
        source: "/three/:path*",
        destination: `${publicApiInternalOrigin}/api/public/media/content?path=three/:path*`,
      },
      // Some historical Media uploads lived loose at public/ root. This regex
      // is root-only, so application routes such as /blogs or /categorias are
      // never proxied to Media. Filesystem/app routes are checked before this
      // standard rewrite list by Next.js.
      {
        source: "/:asset([^/]+\\.(?:avif|gif|jpeg|jpg|png|svg|webp|pdf|fbx|glb|gltf|hdr|obj|mtl))",
        destination: `${publicApiInternalOrigin}/api/public/media/content?path=:asset`,
      },
      // `/media` belongs to persistent runtime Media and is intentionally not
      // packaged inside immutable public-client releases.
      {
        source: "/media/:path*",
        destination: `${publicApiInternalOrigin}/api/public/media/content?path=:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${publicApiInternalOrigin}/api/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: PUBLIC_SITE_RELEASE_HEADER, value: releaseId }],
      },
    ];
  },
};

export default nextConfig;
