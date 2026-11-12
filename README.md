# Kōshi 格子

**A lightweight, modern CSS grid system for intentional, responsive layouts — with an interactive editorial Composition Lab.**

Kōshi's CSS is **framework-independent**. The website is built with Astro, and the optional Composition Lab uses Vue.

## Website

| Route | Purpose |
| --- | --- |
| `/` | Editorial introduction and getting started |
| `/docs/` | Reference for the Kōshi CSS API |
| `/lab/` | Interactive composition gallery and code export |
| `/downloads/koshi.css` | Direct download of the canonical standalone CSS |

The download is produced at build time from `src/styles/koshi.css` through an Astro static endpoint. Do **not** maintain a second CSS copy in `public/`.

## Development

Requires a current Node.js LTS release and npm.

```bash
npm install
npm run dev
npm run check
npm run build
```

## Use Kōshi without Astro or Vue

Download `koshi.css` from the website (or copy `src/styles/koshi.css`) into any HTML project:

```html
<link rel="stylesheet" href="/css/koshi.css" />
<section class="kos-composition">
  <div class="kos-grid" kos-cols="12">
    <article kos-col-span="8">Main content</article>
    <aside kos-col-span="4">Side content</aside>
  </div>
</section>
```

The `.kos-composition` wrapper opts into container-query stacking at narrow widths. Explicit column counts outside this wrapper remain fixed.

## Source structure

- `src/styles/koshi.css` — independent grid foundation and utilities.
- `src/styles/site.css` — landing page, documentation, and shared navigation styles.
- `src/styles/lab.css` — Composition Lab styling.
- `src/lib/compositions.ts` — framework-independent composition recipes.
- `src/lib/export.ts` — generated HTML/CSS snippets.
- `src/components/CompositionLab.vue` — interactive Lab.
- `src/pages/downloads/koshi.css.ts` — static CSS download endpoint.

Kōshi is an early-stage project. Grid mathematics and layout examples should be verified in browsers before a versioned public release.

## License

MIT. See [LICENSE](LICENSE).
