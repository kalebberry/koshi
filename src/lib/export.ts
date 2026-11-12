import type { Block, Composition } from './compositions';

function blockContent(block: Block): string {
  if (block.kind === 'image') return '<figure class="kos-placeholder-media"><span>Image</span></figure>';
  if (block.kind === 'quote') return '<blockquote>“Space shapes the story.”</blockquote>';
  if (block.kind === 'text') return '<div><p class="eyebrow">Editorial study</p><h2>Make this space your own.</h2><p>Replace this example with your content.</p></div>';
  return '<!-- intentional empty space -->';
}

export function exportHTML(study: Composition): string {
  const rows = study.rows.map((row) => {
    const blocks = row.map((block) => {
      const attrs = `kos-col-span="${block.span}"${block.offset ? ` kos-offset="${block.offset}"` : ''}`;
      return `    <div ${attrs} class="kos-block">${blockContent(block)}</div>`;
    }).join('\n');
    return `  <div class="kos-grid" kos-cols="12">\n${blocks}\n  </div>`;
  }).join('\n');
  return `<section class="kos-composition">\n${rows}\n</section>`;
}

/** Companion styles. Include src/styles/koshi.css from the repository first. */
export const exportCSS = `/* Requires Kōshi CSS: src/styles/koshi.css */
.kos-composition { container-type: inline-size; }
.kos-composition > .kos-grid + .kos-grid { margin-top: 1.5rem; }
.kos-placeholder-media {
  min-height: 16rem;
  display: grid;
  place-items: center;
  margin: 0;
  background: #e7e5df;
}
.kos-block blockquote { margin: 0; font: italic 2rem/1.2 Georgia, serif; }
.kos-block h2 { font: 400 2rem/1.2 Georgia, serif; }
@container (max-width: 48rem) {
  .kos-composition > .kos-grid[kos-cols] { grid-template-columns: minmax(0, 1fr); }
  .kos-composition > .kos-grid > * { grid-column: 1 / -1; }
}`;

export function exportBoth(study: Composition): string {
  return `<!-- Include Kōshi's core stylesheet before this HTML. -->\n${exportHTML(study)}\n\n<style>\n${exportCSS}\n</style>`;
}
