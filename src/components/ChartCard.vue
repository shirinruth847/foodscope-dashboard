<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Card from './Card.vue'

/**
 * ChartCard — Container for Tableau embeds or chart visualizations
 */
const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  src: { type: String, default: '' },
  height: { type: String, default: '500px' },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  actions: { type: Array, default: () => [] },
})

const isLoaded = ref(false)
const hasError = ref(false)
</script>

<template>
<Card variant="elevated" padding="none" class="chart-card" glass hover>
  <div class="chart-card__header">
    <div>
      <h3 v-if="title" class="chart-card__title">{{ title }}</h3>
      <p v-if="subtitle" class="chart-card__subtitle">{{ subtitle }}</p>
    </div>
    <div class="chart-card__actions">
      <slot name="actions">
        <Button v-for="action in actions" :key="action.label" :variant="action.variant || 'ghost'" size="sm" @click="action.handler">
          {{ action.label }}
        </Button>
      </slot>
    </div>
  </div>
  <div class="chart-card__content" :style="{ height: height }">
    <!-- Tableau Embed -->
    <div v-if="src" class="chart-card__embed" ref="embedRef">
      <tableau-viz
        :src="src"
        :toolbar="false"
        :hide-tabs="true"
        style="width: 100%; height: 100%;"
        @first-interactive="onLoad"
      ></tableau-viz>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="chart-card__loading">
      <div class="spinner-cyan" aria-hidden="true"></div>
      <p>Loading visualization…</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || hasError" class="chart-card__error">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="error-icon">
        <circle cx="12" cy="12" r="10" stroke="var(--color-error)" stroke-width="2" />
        <path d="M12 9v4M12 15h.01" stroke="var(--color-error)" stroke-width="2" stroke-linecap="round" />
      </svg>
      <p>Couldn't load the visualization</p>
      <p class="error-detail">{{ error || 'An unexpected error occurred' }}</p>
      <Button v-if="src" variant="outline" size="sm" :href="src" target="_blank" rel="noopener">
        Open in Tableau
      </Button>
    </div>

    <!-- Empty State -->
    <div v-else class="chart-card__empty">
      <div class="chart-placeholder" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" class="placeholder-icon">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M9 12h6M12 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <p>No visualization configured</p>
      <p class="empty-detail">Connect a Tableau view to display here</p>
    </div>
  </div>
</Card>
</template>

<style scoped>
.chart-card { overflow: hidden; }
.chart-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-6) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}
.chart-card__title {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-1);
  color: var(--color-text);
}
.chart-card__subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0;
}
.chart-card__actions { display: flex; gap: var(--space-2); flex-shrink: 0; }
.chart-card__content { position: relative; width: 100%; }
.chart-card__embed { width: 100%; height: 100%; }

.chart-card__loading,
.chart-card__error,
.chart-card__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-8);
  text-align: center;
  color: var(--color-text-secondary);
  height: 100%;
}
.spinner-cyan {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  box-shadow: 0 0 20px rgba(0, 180, 255, 0.3);
}
@keyframes spin { to { transform: rotate(360deg); } }
.error-icon,
.placeholder-icon { width: 48px; height: 48px; color: var(--color-text-muted); flex-shrink: 0; }
.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-xl);
  background: var(--color-bg-muted);
  border: 1px dashed var(--color-border);
}
.error-detail,
.empty-detail { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; max-width: 300px; }
</style>