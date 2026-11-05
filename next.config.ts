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
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Keep this package as the Turbopack root (parent dirs may have other lockfiles).
  turbopack: {
    root: rootDir,
  },
}

export default nextConfig
