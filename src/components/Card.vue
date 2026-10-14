<script setup>
import { computed } from 'vue'

/**
 * Card — Glassmorphic card component for futuristic dashboard
 */
const props = defineProps({
  variant: { type: String, default: 'elevated', validator: v => ['elevated', 'outlined', 'filled'].includes(v) },
  padding: { type: String, default: 'lg', validator: v => ['none', 'sm', 'md', 'lg', 'xl'].includes(v) },
  hover: { type: Boolean, default: false },
  glass: { type: Boolean, default: false },
  class: { type: String, default: '' },
})

const paddingMap = { none: '0', sm: 'var(--space-4)', md: 'var(--space-5)', lg: 'var(--space-6)', xl: 'var(--space-8)' }
const cardClass = computed(() => [
  'card',
  `card--${props.variant}`,
  `card--p-${props.padding}`,
  { 'card--hover': props.hover, 'card--glass': props.glass },
  props.class
])
</script>

<template>
<div :class="cardClass">
  <slot />
</div>
</template>

<style scoped>
.card {
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

/* Elevated — dark surface with neon border */
.card--elevated {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}
.card--elevated.card--hover:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-brand-600);
  transform: translateY(-2px);
}

/* Glassmorphic */
.card--glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: var(--shadow-panel);
}
.card--glass.card--hover:hover {
  border-color: var(--color-brand-600);
  box-shadow: var(--shadow-xl);
}

/* Outlined — transparent with border */
.card--outlined {
  background: transparent;
  border: 1px solid var(--color-border);
}
.card--outlined.card--hover:hover {
  border-color: var(--color-brand-600);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Filled — subtle background */
.card--filled {
  background: var(--color-bg-muted);
  border: 1px solid var(--color-border);
}
.card--filled.card--hover:hover {
  background: var(--color-bg-subtle);
  transform: translateY(-2px);
}

.card--p-none { padding: 0; }
.card--p-sm { padding: var(--space-4); }
.card--p-md { padding: var(--space-5); }
.card--p-lg { padding: var(--space-6); }
.card--p-xl { padding: var(--space-8); }

@media (max-width: 640px) {
  .card--p-lg { padding: var(--space-5); }
  .card--p-xl { padding: var(--space-6); }
}
</style>