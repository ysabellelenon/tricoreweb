/**
 * Prefix public asset paths for GitHub Pages (basePath).
 * next/link and next/image already handle basePath — use this for raw <video>/<source>/img.
 */
export function assetPath(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
