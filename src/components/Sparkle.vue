<script setup>
import { computed } from 'vue'

/**
 * Sparkle — four-pointed star ornament.
 * Variants: 'forest' (on cream) | 'cream' (on dark)
 * Sizes: 'xs' | 'sm' | 'md' | 'lg'
 */
const props = defineProps({
  variant: { type: String, default: 'forest', validator: v => ['forest', 'cream'].includes(v) },
  size: { type: String, default: 'md', validator: v => ['xs', 'sm', 'md', 'lg'].includes(v) },
  rotate: { type: Boolean, default: false },
  class: { type: String, default: '' },
})

const sizes = { xs: 10, sm: 14, md: 18, lg: 24 }
const size = sizes[props.size] || sizes.md
const strokeWidth = size < 16 ? 1.25 : 1.5
const color = computed(() => props.variant === 'cream' ? '#F5F3E8' : '#2D3B12')
const sparkleClass = computed(() => ['sparkle', props.class, { 'sparkle--rotate': props.rotate }])
</script>

<template>
  <svg
    :class="sparkleClass"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 2L13.5 7.5 19 8.5 14.5 12 15.5 18 12 14.5 8.5 18 9.5 12 5 8.5 6.5 7.5Z"
      :stroke-width="strokeWidth"
      :stroke="color"
      :fill="color"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.sparkle { display: inline-block; flex: none; vertical-align: middle; }
.sparkle--rotate { animation: sparkleSpin 20s linear infinite; }
@keyframes sparkleSpin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .sparkle--rotate { animation: none; } }
</style>