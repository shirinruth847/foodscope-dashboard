<script setup>
import { computed } from 'vue'

/**
 * CalloutCard — clean white card with accent left border for key callouts.
 */
const props = defineProps({
  accent: { type: String, default: 'forest', validator: v => ['forest', 'gold', 'emerald', 'sky', 'terracotta', 'amber'].includes(v) },
  leadIn: { type: String, default: '' },
  icon: { type: String, default: '' },
  class: { type: String, default: '' },
})

const accentColors = {
  forest: 'var(--color-forest)',
  gold: 'var(--accent-gold)',
  emerald: 'var(--accent-emerald)',
  sky: 'var(--accent-sky)',
  terracotta: 'var(--accent-terracotta)',
  amber: 'var(--accent-amber)',
}
const borderColor = computed(() => accentColors[props.accent] || accentColors.forest)
const iconMap = {
  forest: '▸',
  gold: '◆',
  emerald: '✦',
  sky: '●',
  terracotta: '▲',
  amber: '★',
}
const defaultIcon = computed(() => iconMap[props.accent] || iconMap.forest)
</script>

<template>
  <div
    class="callout-card"
    :class="class"
    :style="{ '--callout-accent': borderColor }"
  >
    <div v-if="leadIn || icon" class="callout-card__header">
      <span v-if="icon || defaultIcon" class="callout-card__icon" aria-hidden="true">{{ icon || defaultIcon }}</span>
      <p v-if="leadIn" class="callout-card__lead">{{ leadIn }}</p>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.callout-card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-5) var(--space-6);
  border-left: 4px solid var(--callout-accent);
  transition: box-shadow var(--transition-base), transform var(--transition-fast), border-color var(--transition-base);
}
.callout-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-left-color: var(--callout-accent);
}
.callout-card__header {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}
.callout-card__icon {
  font-size: var(--text-base);
  color: var(--callout-accent);
  line-height: 1;
  flex: none;
}
.callout-card__lead {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--callout-accent);
}
.callout-card :last-child { margin-bottom: 0; }

@media (max-width: 640px) {
  .callout-card { padding: var(--space-4) var(--space-5); }
}
</style>