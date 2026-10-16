<script setup>
import { FINDINGS } from '../content/site'
</script>

<template>
  <main class="page">
    <header class="page-head">
      <p class="page-eyebrow">What we found</p>
      <h1 class="page-title">{{ FINDINGS.title }}</h1>
      <p class="page-intro">{{ FINDINGS.intro }}</p>
    </header>

    <ol class="findings">
      <li
        v-for="(item, i) in FINDINGS.items"
        :key="i"
        class="finding"
        :class="{ 'is-placeholder': item.placeholder }"
      >
        <span class="finding__tag">
          <span class="finding__num">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ item.tag }}
        </span>
        <p class="finding__text placeholder-text">{{ item.text }}</p>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.findings {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.finding {
  padding: 22px 24px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-left: 3px solid var(--forest);
  border-radius: var(--radius-sm);
}

.finding__tag {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sage);
}

.finding__num {
  font-family: var(--font-display);
  color: var(--wheat);
  letter-spacing: 0.04em;
}

.finding__text {
  margin-top: 8px;
  font-weight: 600;
  color: var(--forest);
  line-height: 1.5;
}

@media (max-width: 760px) {
  .findings {
    grid-template-columns: 1fr;
  }
}
</style>
