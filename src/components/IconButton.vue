<script setup>
import { computed } from 'vue'

/**
 * IconButton — Icon-only button for toolbars and actions (futuristic style)
 */
const props = defineProps({
  variant: { type: String, default: 'ghost', validator: v => ['ghost', 'outline', 'primary', 'secondary'].includes(v) },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  href: { type: String, default: '' },
  ariaLabel: { type: String, required: true },
  class: { type: String, default: '' },
})

const isLink = computed(() => Boolean(props.href))
const tag = computed(() => isLink.value ? 'a' : 'button')

const sizeMap = {
  sm: { dim: 32, icon: 16 },
  md: { dim: 40, icon: 18 },
  lg: { dim: 48, icon: 20 },
}
const s = sizeMap[props.size] || sizeMap.md

const btnClass = computed(() => [
  'icon-btn',
  `icon-btn--${props.variant}`,
  `icon-btn--${props.size}`,
  { 'icon-btn--loading': props.loading, 'icon-btn--disabled': props.disabled },
  props.class
])

const btnStyle = computed(() => ({
  width: `${s.dim}px`,
  height: `${s.dim}px`,
}))
</script>

<template>
<component
  :is="tag"
  :href="href"
  :disabled="disabled || loading"
  :class="btnClass"
  :style="btnStyle"
  :aria-disabled="disabled || loading"
  :aria-label="ariaLabel"
  @click="disabled && $event.preventDefault()"
>
  <span v-if="loading" class="icon-btn__spinner" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" :width="s.icon" :height="s.icon">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
      </path>
    </svg>
  </span>
  <slot v-else />
</component>
</template>

<style scoped>
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  background: transparent;
  text-decoration: none;
}
.icon-btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.icon-btn:hover:not(:disabled) {
  color: var(--color-text);
  background: var(--color-bg-muted);
  border-color: var(--color-border);
}
.icon-btn--disabled,
.icon-btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}
.icon-btn__spinner { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Ghost — minimal neon on hover */
.icon-btn--ghost:hover:not(:disabled) {
  color: var(--color-primary);
  background: var(--color-bg-muted);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.2);
}

/* Outline — bordered */
.icon-btn--outline {
  background: var(--color-bg-elevated);
  border-color: var(--color-border);
}
.icon-btn--outline:hover:not(:disabled) {
  color: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.2);
}

/* Primary — neon cyan background */
.icon-btn--primary {
  background: var(--color-primary);
  color: var(--color-bg);
  border-color: var(--color-primary);
  box-shadow: var(--glow-cyan);
}
.icon-btn--primary:hover:not(:disabled) {
  box-shadow: 0 0 25px rgba(0, 180, 255, 0.4), 0 0 50px rgba(0, 180, 255, 0.2);
  transform: translateY(-1px);
}

/* Slot content sizing */
.icon-btn :slotted(svg),
.icon-btn :slotted(*) { width: 100%; height: 100%; }
</style>