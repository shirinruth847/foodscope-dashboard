<script setup>
import { computed } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  action: { type: Object, default: () => ({}) },
  align: { type: String, default: 'left', validator: v => ['left', 'center'].includes(v) },
})

const headingClass = computed(() => ['section-heading', `section-heading--${props.align}`])
</script>

<template>
<header :class="headingClass">
  <div class="section-heading__text">
    <h2 class="section-heading__title">{{ title }}</h2>
    <p v-if="description" class="section-heading__description">{{ description }}</p>
  </div>
  <div v-if="action && action.label" class="section-heading__action">
    <Button
      :variant="action.variant || 'ghost'"
      :size="action.size || 'md'"
      :href="action.href"
      @click="action.handler"
    >
      {{ action.label }}
    </Button>
  </div>
</header>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}
.section-heading--center { text-align: center; justify-content: center; }
.section-heading--center .section-heading__action { margin-top: var(--space-4); }
.section-heading__text { flex: 1; min-width: 200px; }
.section-heading__title {
  margin-bottom: var(--space-1);
  color: var(--color-text);
  font-size: var(--text-2xl);
}
.section-heading__description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  max-width: 600px;
}
.section-heading__action { flex-shrink: 0; }
</style>