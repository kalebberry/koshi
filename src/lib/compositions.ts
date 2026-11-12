/**
 * Composition recipes are data, not Vue components or named website sections.
 * The grid attributes belong to Kōshi; the lab just explores combinations.
 */
export type BlockKind = 'image' | 'text' | 'quote' | 'space';
export type BlockHeight = 'short' | 'medium' | 'tall';

export interface Block {
  span: number;
  kind: BlockKind;
  height?: BlockHeight;
  offset?: number;
}

export interface Composition {
  id: string;
  rows: Block[][];
}

const b = (span: number, kind: BlockKind, height: BlockHeight = 'medium', offset?: number): Block =>
  ({ span, kind, height, ...(offset ? { offset } : {}) });

const recipes: Block[][][] = [
  [[b(8, 'image', 'tall'), b(4, 'text')]],
  [[b(4, 'text'), b(8, 'image', 'tall')]],
  [[b(3, 'quote'), b(6, 'image', 'tall'), b(3, 'text')]],
  [[b(7, 'image', 'tall'), b(5, 'text')], [b(4, 'space'), b(8, 'quote')]],
  [[b(12, 'text')], [b(5, 'image', 'medium'), b(7, 'image', 'tall')]],
  [[b(5, 'image', 'tall'), b(7, 'quote', 'tall')]],
  [[b(4, 'image'), b(4, 'text'), b(4, 'image')]],
  [[b(9, 'image', 'tall'), b(3, 'quote')], [b(6, 'space'), b(6, 'text')]],
  [[b(6, 'text'), b(6, 'image', 'tall')], [b(3, 'quote'), b(9, 'image')]],
  [[b(3, 'text'), b(9, 'image', 'tall')]],
  [[b(2, 'quote'), b(7, 'image', 'tall'), b(3, 'text')], [b(8, 'space'), b(4, 'image')]],
  [[b(7, 'image', 'tall'), b(5, 'text')], [b(12, 'quote')]],
  [[b(4, 'text'), b(8, 'image', 'tall')], [b(8, 'quote'), b(4, 'image')]],
  [[b(12, 'image', 'tall')], [b(4, 'text'), b(4, 'quote'), b(4, 'image')]],
  [[b(5, 'quote'), b(4, 'image', 'tall'), b(3, 'text')]],
  [[b(2, 'space'), b(7, 'image', 'tall'), b(3, 'text')], [b(5, 'quote'), b(7, 'image')]],
  [[b(6, 'image'), b(6, 'text')], [b(4, 'space'), b(8, 'image', 'tall')]],
  [[b(3, 'quote'), b(9, 'text')], [b(4, 'image'), b(8, 'image', 'tall')]],
];

function rng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let x = state;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateCompositions(batch: number, count = 10): Composition[] {
  const random = rng(batch * 104729 + 17);
  const indices = recipes.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j]!, indices[i]!];
  }
  return indices.slice(0, Math.min(count, recipes.length)).map((idx, i) => ({
    id: `study-${batch}-${i}-${idx}`,
    rows: recipes[idx]!.map((row) => row.map((block) => ({ ...block }))),
  }));
}

export function studySignature(composition: Composition): string {
  return composition.rows.map((row) => row.map((block) => block.span).join(' : ')).join(' / ');
}
