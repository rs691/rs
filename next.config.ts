import type { NextConfig } from "next"
import path from "path"
import { fileURLToPath } from "url"

const basePath = process.env.PAGES_BASE_PATH || ""
const rootDir = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  output: "export",
  // Set by GitHub Actions configure-pages (e.g. "/rs" for project Pages).
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // Expose to client so raw <a>/media paths can prefix the Pages basePath.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Hide the Next.js route indicator so it doesn’t cover the scroll dial.
  devIndicators: false,
  // Keep this package as the Turbopack root (parent dirs may have other lockfiles).
  turbopack: {
    root: rootDir,
  },
}

export default nextConfig
