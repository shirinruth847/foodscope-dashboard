<script setup>
import { computed } from 'vue'
import Card from './Card.vue'

/**
 * StatCard — Metric display card for futuristic dashboard
 */
const props = defineProps({
  value: { type: [String, Number], required: true },
  label: { type: String, required: true },
  trend: { type: String, default: '' },
  trendUp: { type: Boolean, default: true },
  icon: { type: String, default: '' },
  variant: { type: String, default: 'default', validator: v => ['default', 'cyan', 'amber', 'violet', 'emerald'].includes(v) },
})

const variantClasses = {
  default: 'stat-card--default',
  cyan: 'stat-card--cyan',
  amber: 'stat-card--amber',
  violet: 'stat-card--violet',
  emerald: 'stat-card--emerald',
}
const cardVariant = computed(() => variantClasses[props.variant] || variantClasses.default)
const trendColor = computed(() => props.trendUp ? 'var(--color-success)' : 'var(--color-error)')
</script>

<template>
<Card variant="elevated" padding="lg" class="stat-card" :class="cardVariant" hover>
  <div class="stat-card__header">
    <span v-if="icon" class="stat-card__icon" :class="`stat-card__icon--${variant}`" aria-hidden="true">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span v-if="trend" class="stat-card__trend" :style="{ color: trendColor }">
      <span class="trend-icon" aria-hidden="true">{{ trendUp ? '↗' : '↘' }}</span>
      {{ trend }}
    </span>
  </div>
  <div class="stat-card__value">{{ value }}</div>
  <div class="stat-card__label">{{ label }}</div>
</Card>
</template>

<style scoped>
.stat-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  overflow: hidden;
}
.stat-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}
.stat-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  font-size: var(--text-xl);
  border: 1px solid var(--color-border);
  background: var(--color-bg-muted);
  color: var(--color-primary);
}
.stat-card__icon--cyan {
  background: var(--color-brand-900);
  border-color: var(--color-brand-600);
  color: var(--color-brand-400);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.2);
}
.stat-card__icon--amber {
  background: var(--color-accent-900);
  border-color: var(--color-accent-600);
  color: var(--color-amber-400);
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
}
.stat-card__icon--violet {
  background: rgba(122, 77, 255, 0.1);
  border-color: var(--color-accent-600);
  color: var(--color-accent-400);
  box-shadow: 0 0 15px rgba(122, 77, 255, 0.2);
}
.stat-card__icon--emerald {
  background: var(--color-brand-900);
  border-color: var(--color-brand-600);
  color: var(--color-brand-400);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.2);
}
.stat-card__trend {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}
.trend-icon { font-size: 0.8em; line-height: 1; }
.stat-card__value {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: var(--leading-tight);
  color: var(--color-text);
  margin-bottom: var(--space-1);
  letter-spacing: -0.02em;
}
.stat-card__label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Variant glow borders */
.stat-card--default { border-color: var(--color-brand-600); box-shadow: 0 0 20px rgba(0, 180, 255, 0.05); }
.stat-card--cyan { border-color: var(--color-brand-600); box-shadow: 0 0 20px rgba(0, 180, 255, 0.1); }
.stat-card--amber { border-color: var(--color-amber-600); box-shadow: 0 0 20px rgba(245, 158, 11, 0.1); }
.stat-card--violet { border-color: var(--color-accent-600); box-shadow: 0 0 20px rgba(122, 77, 255, 0.1); }
.stat-card--emerald { border-color: var(--color-brand-600); box-shadow: 0 0 20px rgba(0, 180, 255, 0.1); }
</style>