<script setup>
import { RECOMMENDATIONS } from '../content/site'
</script>

<template>
  <main class="page">
    <header class="page-head">
      <p class="page-eyebrow">What next</p>
      <h1 class="page-title">{{ RECOMMENDATIONS.title }}</h1>
      <p class="page-intro">{{ RECOMMENDATIONS.intro }}</p>
    </header>

    <ol class="recs">
      <li
        v-for="(rec, i) in RECOMMENDATIONS.items"
        :key="i"
        class="rec"
        :class="{ 'is-placeholder': rec.placeholder }"
      >
        <span class="rec__num" aria-hidden="true">{{ i + 1 }}</span>
        <div>
          <h2 class="rec__title">{{ rec.title }}</h2>
          <p class="rec__text placeholder-text">{{ rec.text }}</p>
        </div>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.recs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.rec {
  display: flex;
  gap: 20px;
  padding: 24px 28px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.rec__num {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--forest);
  color: var(--cream);
  font-family: var(--font-display);
  font-size: 16px;
}

.rec.is-placeholder .rec__num {
  background: var(--line-strong);
}

.rec__title {
  font-size: 22px;
}

.rec__text {
  margin-top: 6px;
  color: var(--ink-soft);
}
</style>
