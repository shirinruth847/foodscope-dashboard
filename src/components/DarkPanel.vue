<script setup>
import { computed } from 'vue'
import Sparkle from './Sparkle.vue'

/**
 * DarkPanel — deep forest panel with optional image overlay.
 * Professional, high-contrast dark surface.
 */
const props = defineProps({
  bordered: { type: Boolean, default: true },
  sparkleCorners: { type: Boolean, default: false },
  image: { type: String, default: '' },
  overlayOpacity: { type: Number, default: 0.94 },
  class: { type: String, default: '' },
})

const panelClass = computed(() => [
  'dark-panel',
  { 'dark-panel--bordered': props.bordered },
  { 'dark-panel--image': props.image },
  props.class
])
const overlayStyle = computed(() => ({ opacity: props.overlayOpacity }))
</script>

<template>
  <div
    :class="panelClass"
    :style="{ backgroundImage: image ? 'url(' + image + ')' : undefined }"
  >
    <div v-if="bordered" class="dark-panel__frame" aria-hidden="true">
      <Sparkle v-if="sparkleCorners" variant="cream" size="sm" class="dark-panel__sparkle dark-panel__sparkle--tl" />
      <Sparkle v-if="sparkleCorners" variant="cream" size="sm" class="dark-panel__sparkle dark-panel__sparkle--tr" />
      <Sparkle v-if="sparkleCorners" variant="cream" size="sm" class="dark-panel__sparkle dark-panel__sparkle--bl" />
      <Sparkle v-if="sparkleCorners" variant="cream" size="sm" class="dark-panel__sparkle dark-panel__sparkle--br" />
    </div>
    <div class="dark-panel__overlay" aria-hidden="true" :style="overlayStyle" />
    <div class="dark-panel__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dark-panel {
  position: relative;
  border-radius: var(--radius-xl);
  color: var(--color-text-on-dark);
  isolation: isolate;
  overflow: hidden;
  background-color: var(--color-bg-panel);
  background-size: cover;
  background-position: center;
}
.dark-panel--image { background-color: transparent; }

.dark-panel__overlay {
  position: absolute;
  inset: 0;
  background: var(--color-bg-panel-overlay);
  z-index: 0;
}

.dark-panel__frame {
  position: absolute;
  inset: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-on-dark);
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
  transition: opacity var(--transition-base);
}
.dark-panel:hover .dark-panel__frame { opacity: 0.25; }
.dark-panel__frame::before {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-on-dark);
  opacity: 0.08;
}

.dark-panel__sparkle { position: absolute; }
.dark-panel__sparkle--tl { top: -6px; left: -6px; }
.dark-panel__sparkle--tr { top: -6px; right: -6px; }
.dark-panel__sparkle--bl { bottom: -6px; left: -6px; }
.dark-panel__sparkle--br { bottom: -6px; right: -6px; }

.dark-panel__content {
  position: relative;
  z-index: 2;
  padding: var(--card-padding-lg);
}

@media (max-width: 640px) {
  .dark-panel__frame { inset: var(--space-3); }
  .dark-panel__frame::before { inset: 2px; }
  .dark-panel__content { padding: var(--card-padding); }
  .dark-panel__sparkle { display: none; }
}
</style>