// The download is generated directly from the canonical grid stylesheet.
// No second hand-maintained copy can drift out of sync.
import css from '../../styles/koshi.css?raw';

export const prerender = true;

export function GET() {
  return new Response(css, {
    status: 200,
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Content-Disposition': 'attachment; filename="koshi.css"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
