// Resolve a public/ asset path so it works both in dev (base "/") and on GitHub Pages (base "/portfolio-lidl/").
// Usage: asset('img/team/ilyann.png') -> '/portfolio-lidl/img/team/ilyann.png' in prod
const BASE = import.meta.env.BASE_URL // ends with "/"

export function asset(path) {
  return BASE + path.replace(/^\//, '')
}
