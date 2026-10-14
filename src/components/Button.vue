<script setup>
import { computed } from 'vue'

/**
 * Button — Neon button component for futuristic dashboard
 */
const props = defineProps({
  variant: { type: String, default: 'primary', validator: v => ['primary', 'secondary', 'outline', 'ghost', 'accent'].includes(v) },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg', 'xl'].includes(v) },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  href: { type: String, default: '' },
  type: { type: String, default: 'button' },
  fullWidth: { type: Boolean, default: false },
  class: { type: String, default: '' },
})

const isLink = computed(() => Boolean(props.href))
const tag = computed(() => isLink.value ? 'a' : 'button')

const sizeStyles = {
  sm: { px: 'var(--space-3)', py: 'var(--space-1.5)', font: 'var(--text-sm)' },
  md: { px: 'var(--space-5)', py: 'var(--space-2.5)', font: 'var(--text-base)' },
  lg: { px: 'var(--space-6)', py: 'var(--space-3)', font: 'var(--text-lg)' },
  xl: { px: 'var(--space-8)', py: 'var(--space-4)', font: 'var(--text-xl)' },
}
const s = sizeStyles[props.size] || sizeStyles.md

const btnClass = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  { 'btn--loading': props.loading, 'btn--disabled': props.disabled, 'btn--full': props.fullWidth },
  props.class
])

const btnStyle = computed(() => ({
  padding: `${s.py} ${s.px}`,
  fontSize: s.font,
}))
</script>

<template>
<component
  :is="tag"
  :href="href"
  :type="isLink ? undefined : type"
  :disabled="disabled || loading"
  :class="btnClass"
  :style="btnStyle"
  :aria-disabled="disabled || loading"
  @click="disabled && $event.preventDefault()"
>
  <span v-if="loading" class="btn__spinner" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
      </path>
    </svg>
  </span>
  <slot />
</component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  border: none;
  letter-spacing: -0.01em;
}
.btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.btn--disabled,
.btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}
.btn--full { width: 100%; }
.btn__spinner { display: inline-flex; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Primary — Electric Cyan */
.btn--primary {
  background: var(--color-primary);
  color: var(--color-bg);
  border: 1px solid var(--color-primary);
  box-shadow: var(--glow-cyan);
}
.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  box-shadow: 0 0 25px rgba(0, 180, 255, 0.4), 0 0 50px rgba(0, 180, 255, 0.2);
  transform: translateY(-1px);
}

/* Secondary — Violet */
.btn--secondary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-accent);
  box-shadow: var(--glow-violet);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  box-shadow: 0 0 25px rgba(122, 77, 255, 0.4), 0 0 50px rgba(122, 77, 255, 0.2);
  transform: translateY(-1px);
}

/* Outline — Cyan border */
.btn--outline {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.btn--outline:hover:not(:disabled) {
  background: var(--color-primary);
  color: var(--color-bg);
  transform: translateY(-1px);
  box-shadow: var(--glow-cyan);
}

/* Ghost — minimal */
.btn--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: none;
  padding: var(--space-1.5) var(--space-2.5);
}
.btn--ghost:hover:not(:disabled) {
  color: var(--color-primary);
  background: var(--color-bg-muted);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.1);
}

/* Accent — Amber */
.btn--accent {
  background: var(--color-amber-500);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-amber-500);
  box-shadow: var(--glow-amber);
}
.btn--accent:hover:not(:disabled) {
  background: var(--color-amber-600);
  border-color: var(--color-amber-600);
  transform: translateY(-1px);
  box-shadow: 0 0 25px rgba(245, 158, 11, 0.4), 0 0 50px rgba(245, 158, 11, 0.2);
}

/* Size overrides */
.btn--ghost.btn--sm { padding: var(--space-1) var(--space-2); }
.btn--ghost.btn--md { padding: var(--space-1.5) var(--space-2.5); }
.btn--ghost.btn--lg { padding: var(--space-2) var(--space-3); }
.btn--ghost.btn--xl { padding: var(--space-2.5) var(--space-4); }
</style>