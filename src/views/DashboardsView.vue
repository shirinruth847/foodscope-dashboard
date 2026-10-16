<script setup>
import { DASHBOARDS } from '../content/site'
</script>

<template>
  <main class="page">
    <header class="page-head">
      <p class="page-eyebrow">Interactive views</p>
      <h1 class="page-title">{{ DASHBOARDS.title }}</h1>
      <p class="page-intro">{{ DASHBOARDS.intro }}</p>
    </header>

    <ol class="grid">
      <li v-for="(d, i) in DASHBOARDS.items" :key="d.slug">
        <RouterLink :to="`/dashboards/${d.slug}`" class="tile">
          <span class="tile__thumb" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
              <rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" stroke-width="1.5" />
              <path d="M14 32v-8M22 32V18M30 32v-11M38 32v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </span>
          <span class="tile__body">
            <span class="tile__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="tile__title">{{ d.title }}</span>
            <span v-if="d.description" class="tile__desc">{{ d.description }}</span>
            <span class="tile__status" :class="{ 'is-live': d.src }">
              {{ d.src ? 'Live' : 'Coming soon' }}
            </span>
          </span>
        </RouterLink>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tile {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.tile:hover {
  border-color: var(--sage);
  box-shadow: var(--shadow);
}

.tile__thumb {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  background:
    repeating-linear-gradient(135deg, transparent 0 14px, rgba(176, 138, 62, 0.06) 14px 15px),
    var(--cream-deep);
  color: var(--ink-muted);
  border-bottom: 1px solid var(--line);
}

.tile__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px 20px;
}

.tile__num {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--wheat);
}

.tile__title {
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 600;
  color: var(--forest);
}

.tile__desc {
  font-size: 15px;
  color: var(--ink-soft);
}

.tile__status {
  align-self: flex-start;
  margin-top: 8px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
  background: var(--cream-deep);
}

.tile__status.is-live {
  color: var(--forest);
  background: var(--sage-tint);
}

@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
