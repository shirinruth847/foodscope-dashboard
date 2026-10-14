<script setup>
import { computed } from 'vue'
import Sparkle from './Sparkle.vue'

/**
 * FramedCard — elevated white card with subtle frame and optional sparkle corners.
 * Clean, professional look with proper depth.
 */
const props = defineProps({
  padded: { type: Boolean, default: true },
  sparkleCorners: { type: Boolean, default: false },
  hoverLift: { type: Boolean, default: true },
  elevated: { type: Boolean, default: false },  // use white bg with stronger shadow
  class: { type: String, default: '' },
})

const cardClass = computed(() => [
  'framed-card',
  { 'framed-card--lift': props.hoverLift },
  { 'framed-card--elevated': props.elevated },
  { 'framed-card--padded': props.padded },
  props.class
])
</script>

<template>
  <div :class="cardClass">
    <div class="framed-card__frame" aria-hidden="true">
      <Sparkle v-if="sparkleCorners" variant="forest" size="sm" class="framed-card__sparkle framed-card__sparkle--tl" />
      <Sparkle v-if="sparkleCorners" variant="forest" size="sm" class="framed-card__sparkle framed-card__sparkle--tr" />
      <Sparkle v-if="sparkleCorners" variant="forest" size="sm" class="framed-card__sparkle framed-card__sparkle--bl" />
      <Sparkle v-if="sparkleCorners" variant="forest" size="sm" class="framed-card__sparkle framed-card__sparkle--br" />
    </div>
    <div class="framed-card__inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.framed-card {
  position: relative;
  border-radius: var(--radius-xl);
  transition: box-shadow var(--transition-base), transform var(--transition-base);
  isolation: isolate;
  overflow: hidden;
}

/* Default: cream background, subtle shadow */
.framed-card {
  background: var(--color-bg-card);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-subtle);
}

/* Elevated: white background, stronger shadow for emphasis */
.framed-card--elevated {
  background: var(--color-bg-elevated);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-default);
}

.framed-card--lift:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}
.framed-card--elevated.framed-card--lift:hover {
  box-shadow: var(--shadow-xl);
}

.framed-card__frame {
  position: absolute;
  inset: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle);
  opacity: 0.3;
  pointer-events: none;
  transition: opacity var(--transition-base);
}
.framed-card:hover .framed-card__frame { opacity: 0.5; }
.framed-card__frame::before {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-subtle);
  opacity: 0.2;
}

.framed-card__sparkle { position: absolute; }
.framed-card__sparkle--tl { top: -6px; left: -6px; }
.framed-card__sparkle--tr { top: -6px; right: -6px; }
.framed-card__sparkle--bl { bottom: -6px; left: -6px; }
.framed-card__sparkle--br { bottom: -6px; right: -6px; }

.framed-card__inner {
  position: relative;
  z-index: 1;
  padding: var(--card-padding);
}
.framed-card--padded .framed-card__inner { padding: var(--card-padding-lg); }

@media (max-width: 640px) {
  .framed-card__frame { inset: var(--space-3); }
  .framed-card__frame::before { inset: 2px; }
  .framed-card__inner { padding: var(--card-padding); }
  .framed-card--padded .framed-card__inner { padding: var(--space-6); }
  .framed-card__sparkle { display: none; }
}
</style>