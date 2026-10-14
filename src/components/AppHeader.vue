<script setup>
import Sparkle from './Sparkle.vue'
import PillButton from './PillButton.vue'
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <router-link to="/" class="brand" aria-label="FoodScope — back to the introduction">
        <div class="brand__mark" aria-hidden="true">
          <Sparkle variant="cream" size="lg" rotate />
        </div>
        <span class="brand__text">
          <span class="brand__name">FoodScope</span>
          <span class="brand__tag">Food self-sufficiency & supply</span>
        </span>
      </router-link>

      <router-link to="/about" class="header-about">
        <PillButton variant="secondary" size="sm">About & methods</PillButton>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  height: var(--header-height);
  background: rgba(254, 253, 245, 0.92);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--color-border-subtle);
}
.app-header__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--color-text-primary);
}
.brand__mark {
  width: 40px;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand__text { display: flex; flex-direction: column; line-height: 1.15; }
.brand__name {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--text-lg);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--color-forest);
}
.brand__tag {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-olive-soft);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.header-about { flex: none; }
@media (max-width: 640px) {
  .app-header__inner { padding: 0 var(--space-4); }
  .brand__tag { display: none; }
  .brand__name { font-size: var(--text-base); }
}
</style>