# Website stylesheet architecture

The website uses a **7–1-inspired plain CSS structure** (seven folders and one main entrypoint). No Sass build dependency is required.

- `abstracts/`: design tokens and shared custom properties
- `base/`: document defaults and overflow safety
- `components/`: reusable documentation and preview controls
- `layout/`: site navigation, shell, and footer
- `pages/`: homepage, documentation, Composition Lab, and layout studies
- `themes/`: Japanese typography overrides
- `vendors/`: external font imports

`main.css` is the single site-wide entrypoint. `layout-studies-entry.css` is a page-only aggregator for layout studies. `pages/_lab.css` is imported only on the Composition Lab page.

**Important:** `koshi.css` is the distributable Kōshi grid API, not website art direction. Keep it independent from the website architecture.

The layout gallery uses `container: study / inline-size` on each preview. Slider changes update the canvas width, and container queries plus `cqi` typography adapt inside that canvas. Do not replace this with viewport-only `vw` font sizes, which do not respond to the slider.

The source-order of migrated CSS has been preserved through the entrypoint imports. Validate visually and with `npm run build` before merging.
