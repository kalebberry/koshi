# Kōshi 格子

**A lightweight, modern CSS grid system for intentional, responsive layouts — with an interactive editorial Composition Lab.**

Kōshi's grid styling is **framework-independent**. The Composition Lab is an optional browser-based playground built with Astro and Vue.

## What is here?

- `src/styles/koshi.css` — plain CSS grid foundation, including columns 1–12, spans, offsets, row spans, order, layout utilities, and an opt-in responsive composition context.
- `src/components/CompositionLab.vue` — interactive gallery, study selector, mobile/desktop preview, and code export.
- `src/lib/compositions.ts` — framework-independent procedural layout recipes; produces 10 varied studies from a controlled pool.
- `src/lib/export.ts` — markup and CSS export helpers. Exported compositions require the core Kōshi stylesheet.

This first release is an **MVP**: it prioritizes composing and inspecting structures over a full website/page builder. It does not include drag-and-drop, saved projects, or a backend.

## Local development

Requires a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Astro. Before publishing, check the project with:

```bash
npm run check
npm run build
```

## Use Kōshi without Astro or Vue

Copy `src/styles/koshi.css` into any HTML project:

```html
<link rel="stylesheet" href="/styles/koshi.css" />
<section class="kos-container">
  <div class="kos-grid" kos-cols="12">
    <article kos-col-span="8">Main content</article>
    <aside kos-col-span="4">Side content</aside>
  </div>
</section>
```

Use `class="kos-composition"` around a generated composition if you want its fixed 12-column structures to collapse to a single column in a narrow containing element.

## Design direction

The Lab is a **gallery of compositional studies**, not ready-made named sections or a site generator. Regenerate a set, choose a structure, preview how it adapts, and copy the markup into your own project.

## Status and next steps

This repository begins from the provided Kōshi CSS reference and the in-chat Lab prototype. The grid stylesheet has been refined for fixed-track overflow and the Lab's opt-in responsiveness; the existing API is the goal, but full parity with the historical Sass implementation still needs a dedicated review. Composition patterns currently draw from a finite set; further work should improve vertical relationships, intentional whitespace, image hierarchy, and automated browser testing.

## License

MIT. See [LICENSE](LICENSE).
