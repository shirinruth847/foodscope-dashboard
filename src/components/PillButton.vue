<script setup>
import { computed } from 'vue'

/**
 * PillButton — refined pill-shaped button with 3 variants.
 */
const props = defineProps({
  variant: { type: String, default: 'primary', validator: v => ['primary', 'secondary', 'outline', 'ghost'].includes(v) },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: '' },
  type: { type: String, default: 'button' },
  extraClass: { type: String, default: '' },
  trailingIcon: { type: String, default: '' },
  leadingIcon: { type: String, default: '' },
})

const isLink = computed(() => Boolean(props.href))
const tag = computed(() => isLink.value ? 'a' : 'button')

const sizes = {
  sm: { px: '14px', py: '8px', font: 'var(--text-xs)', gap: 'var(--space-2)', radius: 'var(--radius-pill)' },
  md: { px: '20px', py: '10px', font: 'var(--text-sm)', gap: 'var(--space-2)', radius: 'var(--radius-pill)' },
  lg: { px: '28px', py: '12px', font: 'var(--text-base)', gap: 'var(--space-3)', radius: 'var(--radius-pill)' },
}
const s = sizes[props.size] || sizes.md

const classList = computed(() => [
  'pill-btn',
  `pill-btn--${props.variant}`,
  `pill-btn--${props.size}`,
  { 'pill-btn--disabled': props.disabled },
  props.extraClass,
])

const style = computed(() => ({
  padding: `${s.py} ${s.px}`,
  fontSize: s.font,
  gap: s.gap,
  borderRadius: s.radius,
}))
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :type="isLink ? undefined : type"
    :disabled="disabled"
    :class="classList"
    :style="style"
    :aria-disabled="disabled"
    @click="disabled && $event.preventDefault()"
  >
    <span v-if="leadingIcon" class="pill-btn__icon" aria-hidden="true">{{ leadingIcon }}</span>
    <slot />
    <span v-if="trailingIcon" class="pill-btn__icon" aria-hidden="true">{{ trailingIcon }}</span>
  </component>
</template>

<style scoped>
.pill-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-weight: 600;
  text-decoration: none;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  line-height: 1;
}
.pill-btn:focus-visible {
  outline: 2px solid var(--accent-gold);
  outline-offset: 3px;
}
.pill-btn--disabled,
.pill-btn[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
}
.pill-btn__icon { font-size: 0.9em; line-height: 1; flex: none; }

/* Primary — forest */
.pill-btn--primary {
  background: var(--color-forest);
  color: var(--color-cream);
  border-color: var(--color-forest);
}
.pill-btn--primary:hover:not(:disabled) {
  background: var(--color-forest-light);
  border-color: var(--color-forest-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Secondary — cream with border */
.pill-btn--secondary {
  background: var(--color-cream);
  color: var(--color-forest);
  border-color: var(--color-border-default);
}
.pill-btn--secondary:hover:not(:disabled) {
  background: var(--color-cream-muted);
  border-color: var(--color-forest);
  color: var(--color-forest);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Outline — transparent with border */
.pill-btn--outline {
  background: transparent;
  color: var(--color-forest);
  border-color: var(--color-forest);
}
.pill-btn--outline:hover:not(:disabled) {
  background: var(--color-forest);
  color: var(--color-cream);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Ghost — minimal, text only */
.pill-btn--ghost {
  background: transparent;
  color: var(--color-olive);
  border-color: transparent;
  padding: var(--space-2) var(--space-3);
}
.pill-btn--ghost:hover:not(:disabled) {
  color: var(--color-forest);
  background: var(--color-cream-muted);
}
</style>