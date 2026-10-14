<script setup>
/**
 * VizPlaceholder — placeholder card for Tableau embeds.
 */
const props = defineProps({
  label: { type: String, required: true },
  caption: { type: String, default: '' },
  aspect: { type: String, default: '16 / 9' },
})
</script>

<template>
  <figure class="viz-card">
    <div class="viz-card__frame" :style="{ aspectRatio: aspect }">
      <div class="viz-card__placeholder">
        <span class="viz-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="2" width="20" height="20" rx="3"/>
            <path d="M7 12h10M12 7v10" stroke-linecap="round"/>
          </svg>
        </span>
        <p class="viz-card__label">{{ label }}</p>
        <p class="viz-card__note">Live <code>tableau-viz</code> embed — Task 2 / Task 4</p>
      </div>
    </div>
    <figcaption v-if="caption" class="viz-card__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.viz-card {
  min-width: 0;
  margin: 0;
  background: var(--color-cream);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  padding: var(--space-4);
  transition: box-shadow var(--transition-base), transform var(--transition-fast);
}
.viz-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.viz-card__frame {
  width: 100%;
  min-width: 0;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--color-border-medium);
  border-radius: var(--radius-md);
  background: var(--color-cream-muted);
}
.viz-card__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-3);
  padding: var(--space-6);
  color: var(--color-olive-soft);
}
.viz-card__icon { opacity: 0.4; }
.viz-card__label {
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--text-base);
  color: var(--color-olive);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.viz-card__note { margin: 0; font-size: var(--text-xs); opacity: 0.7; }
.viz-card__caption {
  margin: var(--space-3) var(--space-1) var(--space-1);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-olive-soft);
  text-align: center;
}
</style>