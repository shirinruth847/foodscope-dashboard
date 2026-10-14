<script setup>
import { computed } from 'vue'

/**
 * SectionDivider — refined thin line with centred sparkle.
 */
const props = defineProps({
  variant: { type: String, default: 'line', validator: v => ['line', 'arch'].includes(v) },
  color: { type: String, default: 'olive', validator: v => ['olive', 'cream'].includes(v) },
  class: { type: String, default: '' },
  reverse: { type: Boolean, default: false },
})

const stroke = computed(() => props.color === 'cream' ? '#F5F3E8' : '#3D4A14')
const sparkleColor = computed(() => props.color === 'cream' ? '#F5F3E8' : '#2D3B12')
const divClass = computed(() => [
  'section-divider',
  `section-divider--${props.variant}`,
  { 'section-divider--reverse': props.reverse },
  props.class
])
</script>

<template>
  <div :class="divClass" aria-hidden="true">
    <svg v-if="variant === 'line'" viewBox="0 0 1440 20" preserveAspectRatio="none" focusable="false" style="overflow: visible;">
      <line x1="0" y1="10" x2="1440" y2="10" :stroke="stroke" stroke-opacity="0.15" stroke-width="1" />
      <g transform="translate(720, 3) scale(0.6)">
        <path d="M12 2L13.5 7.5 19 8.5 14.5 12 15.5 18 12 14.5 8.5 18 9.5 12 5 8.5 6.5 7.5Z" :stroke="sparkleColor" :fill="sparkleColor" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round" />
      </g>
    </svg>
    <svg v-if="variant === 'arch'" viewBox="0 0 1440 36" preserveAspectRatio="none" focusable="false" style="overflow: visible;">
      <path d="M0,18 Q720,-8 1440,18" fill="none" :stroke="stroke" stroke-opacity="0.15" stroke-width="1.25" />
      <g transform="translate(720, 0) scale(0.6)">
        <path d="M12 2L13.5 7.5 19 8.5 14.5 12 15.5 18 12 14.5 8.5 18 9.5 12 5 8.5 6.5 7.5Z" :stroke="sparkleColor" :fill="sparkleColor" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.section-divider { line-height: 0; width: 100%; margin: var(--space-5) 0; }
.section-divider svg { display: block; width: 100%; height: auto; }
.section-divider--reverse { transform: rotate(180deg); }
</style>