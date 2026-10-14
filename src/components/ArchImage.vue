<script setup>
import { ref, computed } from 'vue'
import Sparkle from './Sparkle.vue'

/**
 * ArchImage — image with rounded arch top or circular mask.
 * Professional loading states, error handling.
 */
const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  shape: { type: String, default: 'arch', validator: v => ['arch', 'circle', 'rounded'].includes(v) },
  aspect: { type: String, default: '16 / 9' },
  class: { type: String, default: '' },
})

const hasLoaded = ref(false)
const hasError = ref(false)
const figureClass = computed(() => [
  'arch-image',
  `arch-image--${props.shape}`,
  { 'arch-image--loaded': hasLoaded, 'arch-image--error': hasError },
  props.class
])

function handleLoad() { hasLoaded.value = true; hasError.value = false }
function handleError() { hasLoaded.value = false; hasError.value = true }
</script>

<template>
  <figure :class="figureClass" :style="{ aspectRatio: aspect }">
    <img
      v-if="hasLoaded"
      :src="src"
      :alt="alt"
      class="arch-image__img"
      loading="lazy"
      @load="handleLoad"
      @error="handleError"
    />
    <div v-else class="arch-image__placeholder" aria-hidden="true">
      <div class="placeholder-content">
        <Sparkle variant="forest" size="lg" />
        <span v-if="!hasError" class="placeholder-text">Loading…</span>
        <span v-else class="placeholder-text">Image unavailable</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.arch-image {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: var(--color-cream-muted);
}
.arch-image--arch { border-radius: var(--radius-arch); }
.arch-image--circle { border-radius: 50%; }
.arch-image--rounded { border-radius: var(--radius-xl); }

.arch-image__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity var(--transition-slow);
}
.arch-image--loaded .arch-image__img { opacity: 1; }

.arch-image__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-forest) 0%, var(--color-forest-light) 100%);
  transition: opacity var(--transition-base);
}
.arch-image--loaded .arch-image__placeholder,
.arch-image--error .arch-image__placeholder { opacity: 0; pointer-events: none; }

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-cream);
  opacity: 0.4;
}
.placeholder-text {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
</style>