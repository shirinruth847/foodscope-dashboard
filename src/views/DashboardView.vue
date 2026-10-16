<script setup>
import { computed } from 'vue'
import { DASHBOARDS } from '../content/site'
import TableauEmbed from '../components/TableauEmbed.vue'

const props = defineProps({
  slug: { type: String, required: true },
})

const dashboard = computed(() => DASHBOARDS.items.find((d) => d.slug === props.slug))
</script>

<template>
  <main v-if="dashboard" class="page">
    <header class="page-head">
      <p class="page-eyebrow">
        <RouterLink to="/dashboards">{{ DASHBOARDS.title }}</RouterLink>
      </p>
      <h1 class="page-title">{{ dashboard.title }}</h1>
      <p v-if="dashboard.description" class="page-intro">{{ dashboard.description }}</p>
    </header>

    <TableauEmbed
      v-if="dashboard.src"
      :key="dashboard.slug"
      :src="dashboard.src"
      :height="dashboard.height"
      :title="dashboard.title"
    />

    <div v-else class="placeholder" role="img" :aria-label="`${dashboard.title}: coming soon`">
      <svg viewBox="0 0 48 48" width="44" height="44" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" stroke-width="1.5" />
        <path d="M14 32v-8M22 32V18M30 32v-11M38 32v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <p>Dashboard coming soon</p>
    </div>
  </main>
</template>

<style scoped>
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  aspect-ratio: 16 / 9;
  min-height: 280px;
  border: 1.5px dashed var(--line-strong);
  border-radius: var(--radius);
  background:
    repeating-linear-gradient(135deg, transparent 0 14px, rgba(176, 138, 62, 0.05) 14px 15px),
    var(--paper);
  color: var(--ink-muted);
  font-size: 15px;
  letter-spacing: 0.02em;
}
</style>
