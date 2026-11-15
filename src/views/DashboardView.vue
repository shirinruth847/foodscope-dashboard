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
  <main v-if="dashboard" class="page page--wide">
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
      :width="dashboard.width"
      :title="dashboard.title"
    />

    <div v-else class="placeholder" role="img" :aria-label="`${dashboard.title}: coming soon`">
      <svg viewBox="0 0 48 48" width="44" height="44" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" stroke-width="1.5" />
        <path d="M14 32v-8M22 32V18M30 32v-11M38 32v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <p>Dashboard coming soon</p>
    </div>

    <section v-if="dashboard.guide" class="dashboard-guide" :aria-labelledby="`guide-${dashboard.slug}`">
      <p class="dashboard-guide__eyebrow">Interactive guide</p>
      <h2 :id="`guide-${dashboard.slug}`" class="dashboard-guide__title">{{ dashboard.guide.title }}</h2>
      <ol class="dashboard-guide__list">
        <li v-for="(item, index) in dashboard.guide.items" :key="item.title" class="dashboard-guide__item">
          <span class="dashboard-guide__number" aria-hidden="true">{{ index + 1 }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<style scoped>
.dashboard-guide {
  margin-top: 28px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--cream-deep);
}

.dashboard-guide__eyebrow {
  margin: 0 0 4px;
  color: var(--wheat);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.dashboard-guide__title {
  margin: 0;
  color: var(--forest);
  font-family: var(--font-display);
  font-size: 24px;
}

.dashboard-guide__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.dashboard-guide__item {
  display: flex;
  gap: 10px;
  min-width: 0;
}

.dashboard-guide__number {
  display: grid;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  background: var(--forest);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.dashboard-guide__item h3,
.dashboard-guide__item p {
  margin: 0;
}

.dashboard-guide__item h3 {
  color: var(--forest);
  font-family: var(--font-display);
  font-size: 17px;
}

.dashboard-guide__item p {
  margin-top: 4px;
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.5;
}

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

@media (max-width: 720px) {
  .dashboard-guide__list {
    grid-template-columns: 1fr;
  }
}
</style>
