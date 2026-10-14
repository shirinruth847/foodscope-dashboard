<script setup>
import FramedCard from './FramedCard.vue'
import FakeViz from './FakeViz.vue'

/**
 * TableauCard — wraps a FakeViz (or TableauEmbed) in a FramedCard with caption.
 * If src is provided, it will use TableauEmbed. Otherwise shows FakeViz.
 */
const props = defineProps({
  src: { type: String, default: '' },
  height: { type: String, default: '420px' },
  caption: { type: String, default: '' },
  filter: { type: Object, default: () => ({}) },
  toolbar: { type: Boolean, default: false },
  hideTabs: { type: Boolean, default: true },
  sparkleCorners: { type: Boolean, default: true },
  padded: { type: Boolean, default: true },
  class: { type: String, default: '' },
  vizType: { type: String, default: 'choropleth', validator: v => ['choropleth', 'scatter', 'line', 'bar', 'stacked', 'heatmap'].includes(v) },
  vizTitle: { type: String, default: '' },
})
</script>

<template>
  <FramedCard :sparkle-corners="sparkleCorners" :padded="padded" :class="class" elevated>
    <div style="width: 100%; aspect-ratio: 16 / 9; min-height: 320px;">
      <FakeViz v-if="!src" :type="vizType" :title="vizTitle" :width="640" :height="420" />
      <div v-else class="tableau-placeholder">
        <p style="text-align:center; color: var(--color-olive-soft); padding: var(--space-8);">
          Tableau embed would appear here<br><small>src: {{ src }}</small>
        </p>
      </div>
    </div>
    <figcaption v-if="caption" class="tableau-card__caption">
      <span class="caption-dot" aria-hidden="true"></span>
      <span>{{ caption }}</span>
    </figcaption>
  </FramedCard>
</template>

<style scoped>
.tableau-placeholder { display: flex; align-items: center; justify-content: center; height: 100%; background: var(--color-cream-muted); border: 1px dashed var(--color-border-default); border-radius: var(--radius-lg); }
.tableau-card__caption {
  margin: var(--space-4) var(--space-2) var(--space-1);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-forest);
}
.caption-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-forest);
  opacity: 0.6;
  flex: none;
}
</style>