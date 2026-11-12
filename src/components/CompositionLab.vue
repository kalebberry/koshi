<script setup lang="ts">
import { computed, ref } from 'vue';
import { generateCompositions, studySignature, type Block } from '../lib/compositions';
import { exportBoth, exportCSS, exportHTML } from '../lib/export';

const batch = ref(0);
const selected = ref(0);
const previewWidth = ref(960);
const showCode = ref(false);
const showContent = ref(true);
const gap = ref(20);
const copied = ref('');
const studies = computed(() => generateCompositions(batch.value));
const active = computed(() => studies.value[selected.value]!);
const generatedCode = computed(() => exportHTML(active.value));

function regenerate() {
  batch.value += 1;
  selected.value = 0;
  showCode.value = false;
  copied.value = '';
}

function selectStudy(index: number) {
  selected.value = index;
  showCode.value = false;
}

function kindClass(block: Block) {
  return 'block--' + block.kind + ' block--' + (block.height ?? 'medium');
}

async function copy(type: 'html' | 'css' | 'both') {
  const content = type === 'html' ? exportHTML(active.value) : type === 'css' ? exportCSS : exportBoth(active.value);
  try {
    await navigator.clipboard.writeText(content);
    copied.value = type;
  } catch {
    showCode.value = true;
    copied.value = 'unavailable';
  }
}
</script>

<template>
  <div class="lab-shell">
    <section class="hero">
      <span class="overline">An experiment in proportion & rhythm</span>
      <h1>Explore the space<br /><em>between elements.</em></h1>
      <p>Ten generated editorial studies. No page templates, no predefined sections. Find a structure that sparks an idea, then make it your own.</p>
    </section>

    <div class="section-heading">
      <div>
        <span class="overline">01 / THE STUDIES</span>
        <h2>Compositions</h2>
      </div>
      <button class="button button--primary" type="button" @click="regenerate">↻ <span>Generate another set</span></button>
    </div>

    <section class="gallery" aria-label="Composition studies">
      <button v-for="(study, index) in studies" :key="study.id" class="study-card" :class="{ 'study-card--selected': selected === index }" type="button" :aria-pressed="selected === index" @click="selectStudy(index)">
        <div class="card-meta"><span>STUDY {{ String(index + 1).padStart(2, '0') }}</span><span>{{ selected === index ? '●' : '↗' }}</span></div>
        <div class="study-sketch" aria-hidden="true">
          <div v-for="(row, rowIndex) in study.rows" :key="rowIndex" class="kos-grid" kos-cols="12">
            <div v-for="(block, blockIndex) in row" :key="blockIndex" class="sketch-block" :class="'sketch-block--' + block.kind" :kos-col-span="block.span" :kos-offset="block.offset || undefined">
              <template v-if="block.kind === 'text'"><i></i><i></i><i></i></template>
              <span v-else-if="block.kind === 'image'">▧</span>
              <span v-else-if="block.kind === 'quote'">“ ”</span>
            </div>
          </div>
        </div>
        <div class="card-caption">{{ studySignature(study) }} <span>12 columns</span></div>
      </button>
    </section>

    <section class="detail" aria-labelledby="detail-title">
      <div class="section-heading section-heading--detail">
        <div><span class="overline">02 / SELECTED COMPOSITION</span><h2 id="detail-title">Study {{ String(selected + 1).padStart(2, '0') }}</h2></div>
        <span class="detail-counter">{{ String(selected + 1).padStart(2, '0') }} <span>/ 10</span></span>
      </div>

      <div class="control-bar">
        <label class="width-label" for="preview-width">Preview width <output for="preview-width">{{ previewWidth }}px</output></label>
        <input id="preview-width" v-model.number="previewWidth" class="width-slider" type="range" min="320" max="1200" step="10" aria-label="Composition preview width in pixels" />
        <button type="button" class="width-reset" @click="previewWidth = 960">Reset</button>
        <label class="switch-label"><input v-model="showContent" type="checkbox" /> Sample content</label>
        <label class="gap-label">Gap <input v-model.number="gap" type="range" min="8" max="40" step="4" /> <output>{{ gap }}px</output></label>
      </div>

      <div class="preview-stage">
        <div class="preview-paper" :style="{ width: previewWidth + 'px' }">
          <div class="preview-mast"><span>格子 / KŌSHI</span><span>STUDY {{ String(selected + 1).padStart(2, '0') }}</span></div>
          <div class="kos-composition" :style="{ '--kos-gutter': gap + 'px' }">
            <div v-for="(row, rowIndex) in active.rows" :key="rowIndex" class="kos-grid" kos-cols="12">
              <div v-for="(block, blockIndex) in row" :key="blockIndex" class="preview-block" :class="kindClass(block)" :kos-col-span="block.span" :kos-offset="block.offset || undefined">
                <template v-if="showContent">
                  <template v-if="block.kind === 'image'"><div class="sample-image"><span>IMAGE / VISUAL</span></div></template>
                  <template v-else-if="block.kind === 'quote'"><div class="sample-quote">“Form follows the space between.”</div></template>
                  <template v-else-if="block.kind === 'text'"><div class="sample-copy"><span class="overline">Editorial study / 001</span><h3>Space shapes the story.</h3><p>Every composition begins with proportion, rhythm, and a considered relationship between elements.</p></div></template>
                </template>
                <span v-else-if="block.kind !== 'space'" class="wire-label">{{ block.span }} / 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="export-bar">
        <div><span class="overline">03 / TAKE IT FURTHER</span><p>Copy the Kōshi structure and shape it into your own work.</p></div>
        <div class="export-buttons">
          <button type="button" class="button" @click="showCode = !showCode">{{ showCode ? 'Hide code' : 'View HTML' }}</button>
          <button type="button" class="button" @click="copy('css')">{{ copied === 'css' ? 'CSS copied ✓' : 'Copy CSS' }}</button>
          <button type="button" class="button button--primary" @click="copy('both')">{{ copied === 'both' ? 'Copied ✓' : 'Copy HTML + CSS' }}</button>
        </div>
      </div>
      <p v-if="copied === 'unavailable'" class="copy-note" role="status">Clipboard not available. You can select and copy from the code below.</p>
      <pre v-if="showCode" class="code-panel"><code>{{ generatedCode }}</code></pre>
      <p class="implementation-note">Exports require the independent Kōshi stylesheet. Composition helpers are included with the copied CSS. This is a layout exploration tool, not a website builder.</p>
    </section>
  </div>
</template>
