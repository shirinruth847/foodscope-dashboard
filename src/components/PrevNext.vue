<script setup>
import { computed } from 'vue'
import PillButton from './PillButton.vue'
import { SECTIONS } from '../content/site'

const props = defineProps({
  currentPath: { type: String, required: true },
})

const index = computed(() => SECTIONS.findIndex((s) => s.path === props.currentPath))
const prev = computed(() => SECTIONS[index.value - 1] || null)
const next = computed(() => SECTIONS[index.value + 1] || null)
</script>

<template>
  <nav class="prev-next" aria-label="Section navigation">
    <PillButton
      v-if="prev"
      :href="prev.path"
      variant="secondary"
      size="md"
      extra-class="pn-btn pn-btn--prev"
      leading-icon="←"
    >
      <span class="pn-btn__text">
        <span class="pn-btn__kicker">Previous</span>
        <span class="pn-btn__title">{{ prev.navTitle }}</span>
      </span>
    </PillButton>
    <div v-else class="pn-btn pn-btn--empty" aria-hidden="true"></div>

    <PillButton
      v-if="next"
      :href="next.path"
      variant="primary"
      size="md"
      extra-class="pn-btn pn-btn--next"
      trailing-icon="→"
    >
      <span class="pn-btn__text pn-btn__text--right">
        <span class="pn-btn__kicker">Next</span>
        <span class="pn-btn__title">{{ next.navTitle }}</span>
      </span>
    </PillButton>
    <div v-else class="pn-btn pn-btn--empty" aria-hidden="true"></div>
  </nav>
</template>

<style scoped>
.prev-next {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-subtle);
  flex-wrap: wrap;
}
.pn-btn { display: inline-flex; align-items: center; gap: var(--space-3); }
.pn-btn--empty { visibility: hidden; pointer-events: none; min-width: 200px; }
.pn-btn__text { display: flex; flex-direction: column; line-height: 1.3; }
.pn-btn__text--right { text-align: right; }
.pn-btn__kicker {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.55;
}
.pn-btn__title { font-weight: 500; font-size: var(--text-sm); }
@media (max-width: 560px) {
  .prev-next { margin-top: var(--space-8); padding-top: var(--space-6); }
  .pn-btn { flex: 1; justify-content: center; text-align: center; min-width: 0; }
  .pn-btn__text--right { text-align: left; }
  .pn-btn--empty { min-width: 0; width: 100%; }
}
</style>