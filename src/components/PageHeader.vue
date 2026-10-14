<script setup>
import { computed } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  actions: { type: Array, default: () => [] },
  breadcrumbs: { type: Array, default: () => [] },
})

const hasActions = computed(() => props.actions.length > 0)
const hasBreadcrumbs = computed(() => props.breadcrumbs.length > 0)
</script>

<template>
<header class="page-header">
  <nav v-if="hasBreadcrumbs" class="page-header__breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs">
      <li v-for="(crumb, i) in breadcrumbs" :key="i" class="breadcrumbs__item">
        <router-link v-if="crumb.path" :to="crumb.path" class="breadcrumbs__link">{{ crumb.label }}</router-link>
        <span v-else class="breadcrumbs__current" aria-current="page">{{ crumb.label }}</span>
        <svg v-if="i < breadcrumbs.length - 1" class="breadcrumbs__sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </li>
    </ol>
  </nav>

  <div class="page-header__main">
    <div class="page-header__text">
      <h1 class="page-header__title">{{ title }}</h1>
      <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
    </div>

    <div v-if="hasActions" class="page-header__actions">
      <Button
        v-for="action in actions"
        :key="action.label"
        :variant="action.variant || 'primary'"
        :size="action.size || 'md'"
        :href="action.href"
        :disabled="action.disabled"
        @click="action.handler"
      >
        {{ action.label }}
      </Button>
    </div>
  </div>
</header>
</template>

<style scoped>
.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-6);
}
.page-header__breadcrumbs { margin-top: 0; }
.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.breadcrumbs__link {
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
  text-decoration: none;
}
.breadcrumbs__link:hover { color: var(--color-primary); }
.breadcrumbs__current { color: var(--color-text-secondary); font-weight: 500; }
.breadcrumbs__sep {
  color: var(--color-text-muted);
  flex-shrink: 0;
  opacity: 0.4;
}

.page-header__main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
.page-header__text { flex: 1; min-width: 200px; }
.page-header__title {
  margin-bottom: var(--space-1);
  color: var(--color-text);
  font-size: var(--text-3xl);
  letter-spacing: -0.03em;
}
.page-header__subtitle {
  margin: 0;
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  font-weight: 400;
}
.page-header__actions { display: flex; gap: var(--space-3); flex-shrink: 0; }

@media (max-width: 640px) {
  .page-header__main { flex-direction: column; align-items: flex-start; }
  .page-header__actions { width: 100%; }
  .page-header__actions .btn { flex: 1; justify-content: center; }
}
</style>