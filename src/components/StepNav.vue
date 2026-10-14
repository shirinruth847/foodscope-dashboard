<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sparkle from './Sparkle.vue'
import { GROWTH_STEPS } from '../content/site'

const route = useRoute()

const currentIndex = computed(() =>
  GROWTH_STEPS.findIndex((s) => s.path === route.path)
)
</script>

<template>
  <nav class="step-nav" aria-label="Story progress">
    <div class="step-nav__bg" aria-hidden="true" />

    <ol class="step-nav__list">
      <li
        v-for="(step, i) in GROWTH_STEPS"
        :key="step.id"
        class="step-nav__item"
      >
        <router-link
          :to="step.path"
          class="step"
          :class="{ 'is-active': i === currentIndex, 'is-done': i < currentIndex }"
          :aria-current="i === currentIndex ? 'page' : undefined"
        >
          <span class="step__number">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="step__label">{{ step.label }}</span>
          <Sparkle v-if="i === currentIndex" variant="forest" size="sm" class="step__sparkle" />
        </router-link>

        <span v-if="i < GROWTH_STEPS.length - 1" class="step__connector" aria-hidden="true">
          <span class="step__connector-line" />
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.step-nav {
  position: sticky;
  top: var(--header-height);
  z-index: var(--z-sticky);
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  background: var(--color-bg-page);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: var(--space-3) 0;
}

.step-nav__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    repeating-linear-gradient(
      18deg,
      transparent 0,
      transparent 2px,
      rgba(61, 77, 18, 0.015) 2px,
      rgba(61, 77, 18, 0.015) 4px
    ),
    linear-gradient(180deg, #3A4A16 0%, #2D3B12 50%, #1E2A0E 100%);
  opacity: 0.06;
}

.step-nav__list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0 var(--space-6);
  min-width: 100%;
  width: max-content;
  scrollbar-width: thin;
  scrollbar-color: var(--color-olive-muted) transparent;
}
.step-nav__list::-webkit-scrollbar { height: 4px; }
.step-nav__list::-webkit-scrollbar-track { background: transparent; }
.step-nav__list::-webkit-scrollbar-thumb { background: var(--color-olive-muted); border-radius: 2px; }

.step-nav__item { display: flex; align-items: center; }

.step {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 500;
  padding: var(--space-2) var(--space-3);
  white-space: nowrap;
  opacity: 0.55;
  transition: opacity var(--transition-fast), color var(--transition-fast);
}
.step:hover { opacity: 1; color: var(--color-forest); }
.step.is-done { opacity: 0.85; color: var(--color-olive-soft); }
.step.is-active {
  opacity: 1;
  color: var(--color-forest);
  font-weight: 600;
}
.step__number {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.1em;
  flex: none;
}
.step__label { text-transform: uppercase; letter-spacing: 0.04em; }
.step__sparkle { margin-left: var(--space-2); }

.step__connector { flex: 1; min-width: 36px; height: 1px; display: flex; align-items: center; }
.step__connector-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--color-olive) 0%, transparent 100%);
  opacity: 0.12;
}
.step-nav__item:last-child .step__connector { display: none; }

@media (max-width: 860px) {
  .step-nav__list { padding: 0 var(--space-4); }
  .step__label { display: none; }
  .step { padding: var(--space-2) var(--space-2); }
  .step__connector { min-width: 16px; }
}
</style>