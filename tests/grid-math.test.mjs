import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const css = readFileSync(new URL('../src/styles/koshi.css', import.meta.url), 'utf8');
const columns = 12;
const gutterSizes = [0, 8, 16, 24, 40];
const widths = [320, 768, 1200];

function expectedSpanWidth(span, width, gap) {
  return (span / columns) * width - ((columns - span) / columns) * gap;
}

test('every flex span has the correct gutter-aware expression', () => {
  for (let span = 1; span <= columns; span++) {
    const expression = span === 12
      ? '100%'
      : `calc(100% * ${span} / 12 - var(--kos-gutter) * ${12 - span} / 12)`;
    assert.ok(css.includes(`.kos-flex-grid > [kos-col-span="${span}"] { flex-basis: ${expression}; }`), `span ${span}`);
  }
});

test('12 columns occupy one complete row', () => {
  for (const width of widths) for (const gap of gutterSizes) {
    assert.equal(expectedSpanWidth(12, width, gap), width);
  }
});

test('row combinations exactly fill their available width including gaps', () => {
  const rows = [[6, 6], [4, 4, 4], [3, 9], [8, 4], [2, 5, 5], [1, 11], [12]];
  for (const width of widths) for (const gap of gutterSizes) for (const row of rows) {
    const occupied = row.reduce((sum, span) => sum + expectedSpanWidth(span, width, gap), 0)
      + (row.length - 1) * gap;
    assert.ok(Math.abs(occupied - width) < 1e-8, `width=${width} gap=${gap} row=${row} got=${occupied}`);
  }
});

test('CSS Grid uses native fractional tracks for 12 columns', () => {
  assert.match(css, /\.kos-grid\[kos-cols="12"\] \{ grid-template-columns: repeat\(12, minmax\(0, 1fr\)\); \}/);
});


test('default CSS Grid uses twelve tracks without a column attribute', () => {
  assert.match(css, /\\.kos-grid \\{[\\s\\S]*?grid-template-columns: repeat\\(12, minmax\\(0, 1fr\\)\\);/);
});

test('intrinsic grid is explicitly opt-in', () => {
  assert.match(css, /\\.kos-grid\\.kos-grid--auto \\{[\\s\\S]*?repeat\\(var\\(--kos-grid-placement, auto-fit\\)/);
});

test('flex spans wrap and grow to fill the row', () => {
  assert.match(css, /\\.kos-flex-grid \\{ display: flex; flex-wrap: wrap; gap: var\\(--kos-gutter\\); \\}/);
  assert.match(css, /\\.kos-flex-grid > \\* \\{ flex: 1 1 var\\(--kos-grid-min-item-size\\); min-width: 0; \\}/);
});

test('default grids stack inside a narrow composition container', () => {
  assert.match(css, /\\.kos-composition > \\.kos-grid:not\\(\\.kos-grid--auto\\) \\{ grid-template-columns: minmax\\(0, 1fr\\); \\}/);
});
