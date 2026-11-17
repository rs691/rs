/**
 * Prefix a root-absolute public path with the GitHub Pages basePath when set.
 * Raw <a href> / media src do not get Next's automatic basePath prefix.
 */
export function assetPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
  if (!path.startsWith("/")) return `${base}/${path}`
  return `${base}${path}`
}
