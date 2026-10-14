<script setup>
import { computed } from 'vue'

/**
 * RingGauge — Circular progress indicator with neon style
 */
const props = defineProps({
  value: { type: Number, required: true, validator: v => v >= 0 && v <= 100 },
  label: { type: String, required: true },
  color: { type: String, default: 'primary', validator: v => ['primary', 'amber', 'sky', 'cyan', 'violet'].includes(v) },
  size: { type: Number, default: 80 },
  strokeWidth: { type: Number, default: 6 },
  showValue: { type: Boolean, default: true },
})

const colorMap = {
  primary: 'var(--color-primary)',
  cyan: 'var(--color-primary)',
  amber: 'var(--color-amber-500)',
  sky: '#0891B2',
  violet: 'var(--color-accent-500)',
}
const strokeColor = computed(() => colorMap[props.color] || colorMap.primary)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value - (props.value / 100) * circumference.value)
const trackColor = computed(() => `${strokeColor.value}20`)
</script>

<template>
<div class="ring-gauge" role="img" :aria-label="`${label}: ${value}%`">
  <svg :width="size" :height="size" class="ring-gauge__svg">
    <circle
      class="ring-gauge__track"
      :cx="size / 2"
      :cy="size / 2"
      :r="radius"
      :stroke="trackColor"
      :stroke-width="strokeWidth"
      fill="none"
    />
    <circle
      class="ring-gauge__progress"
      :cx="size / 2"
      :cy="size / 2"
      :r="radius"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="offset"
      fill="none"
      stroke-linecap="round"
      style="transform: rotate(-90deg); transform-origin: center;"
    />
  </svg>
  <div class="ring-gauge__content">
    <span v-if="showValue" class="ring-gauge__value">{{ value }}%</span>
    <span class="ring-gauge__label">{{ label }}</span>
  </div>
</div>
</template>

<style scoped>
.ring-gauge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2);
}
.ring-gauge__svg { display: block; }
.ring-gauge__track { transition: stroke var(--transition-base); }
.ring-gauge__progress {
  transition: stroke-dashoffset 1s cubic-bezier(0.34, 1.56, 0.64, 1), stroke var(--transition-base);
}
.ring-gauge__content { display: flex; flex-direction: column; align-items: center; gap: var(--space-1); }
.ring-gauge__value {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
  letter-spacing: -0.02em;
}
.ring-gauge__label {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
  max-width: 100px;
  line-height: 1.3;
}
</style>