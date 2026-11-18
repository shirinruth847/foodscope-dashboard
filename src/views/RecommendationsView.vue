<script setup>
import { computed, ref } from 'vue'
import { CONCLUSION } from '../content/site'

const singaporeCard = CONCLUSION.items.find((item) => item.lenses)
const activeLensId = ref(singaporeCard.lenses[0].id)
const activeLens = computed(
  () => singaporeCard.lenses.find((lens) => lens.id === activeLensId.value) || singaporeCard.lenses[0],
)
</script>

<template>
  <main class="page">
    <header class="page-head conclusion-head">
      <p class="page-eyebrow">What we learned</p>
      <h1 class="page-title">{{ CONCLUSION.title }}</h1>
      <p class="page-intro">{{ CONCLUSION.intro }}</p>
    </header>

    <ol class="recs">
      <li
        v-for="(rec, i) in CONCLUSION.items"
        :key="i"
        class="rec"
        :class="{
          'is-placeholder': rec.placeholder,
          'rec--interactive': rec.lenses,
          'rec--distinctions': rec.points,
        }"
      >
        <div class="rec__meta">
          <span class="rec__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="rec__kicker">{{ rec.kicker }}</span>
        </div>
        <h2 class="rec__title">{{ rec.title }}</h2>
        <p v-if="rec.text" class="rec__text placeholder-text">{{ rec.text }}</p>
        <div v-if="rec.lenses" class="lens-switcher">
          <div class="lens-tabs" role="tablist" aria-label="Choose a Singapore food resilience lens">
            <button
              v-for="lens in rec.lenses"
              :id="`lens-tab-${lens.id}`"
              :key="lens.id"
              class="lens-tab"
              :class="{ 'is-active': activeLensId === lens.id }"
              type="button"
              role="tab"
              :aria-selected="activeLensId === lens.id"
              :aria-controls="`lens-panel-${lens.id}`"
              @click="activeLensId = lens.id"
            >
              {{ lens.label }}
            </button>
          </div>
          <div
            :id="`lens-panel-${activeLens.id}`"
            :key="activeLens.id"
            class="lens-panel"
            role="tabpanel"
            :aria-labelledby="`lens-tab-${activeLens.id}`"
          >
            <h3>{{ activeLens.title }}</h3>
            <p>{{ activeLens.text }}</p>
            <RouterLink :to="activeLens.link" class="lens-link">
              {{ activeLens.linkLabel }} <span aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </div>
        <ul v-if="rec.points" class="distinctions">
          <li v-for="point in rec.points" :key="point">{{ point }}</li>
        </ul>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.recs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.rec {
  display: flex;
  flex-direction: column;
  min-height: 238px;
  padding: clamp(24px, 3vw, 32px);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.rec:first-child {
  grid-column: 1 / -1;
  min-height: auto;
  padding: clamp(28px, 5vw, 48px);
  background: linear-gradient(145deg, var(--forest), var(--forest-deep));
  border: 0;
}

.rec:nth-child(3) {
  background: var(--sage-tint);
  border-color: transparent;
}

.rec:last-child {
  grid-column: 1 / -1;
  min-height: auto;
  background: var(--wheat-tint);
  border-color: transparent;
}

.rec__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.rec__num,
.rec__kicker {
  color: var(--wheat);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.rec__num {
  padding-right: 10px;
  border-right: 1px solid var(--line-strong);
}

.rec:first-child .rec__num {
  border-color: rgb(246 241 230 / 30%);
}

.rec__title {
  max-width: 28ch;
  font-size: clamp(24px, 3vw, 32px);
}

.rec__text {
  max-width: 70ch;
  margin-top: 12px;
  color: var(--ink-soft);
  font-size: 17px;
  line-height: 1.55;
}

.rec:first-child .rec__title,
.rec:first-child .rec__text {
  color: var(--cream);
}

.rec:first-child .rec__text {
  font-size: clamp(18px, 2vw, 21px);
}

.rec--interactive {
  min-height: 410px;
}

.lens-switcher {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 18px;
}

.lens-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.lens-tab {
  min-height: 38px;
  padding: 8px 12px;
  border: 1px solid rgb(31 61 43 / 20%);
  border-radius: 999px;
  background: rgb(251 248 241 / 58%);
  color: var(--forest);
  font: inherit;
  font-size: 14px;
  line-height: 1.2;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
}

.lens-tab:hover {
  border-color: var(--forest);
}

.lens-tab.is-active {
  border-color: var(--forest);
  background: var(--forest);
  color: var(--cream);
}

.lens-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgb(31 61 43 / 18%);
}

.lens-panel h3 {
  font-size: 21px;
}

.lens-panel p {
  margin-top: 9px;
  color: var(--ink-soft);
  font-size: 16px;
  line-height: 1.5;
}

.lens-link {
  align-self: flex-start;
  margin-top: auto;
  padding-top: 16px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
}

.lens-link:hover {
  text-decoration: underline;
}

.distinctions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  list-style: none;
  margin: 22px 0 0;
  padding: 0;
}

.distinctions li {
  padding: 2px 24px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.distinctions li:first-child {
  padding-left: 0;
}

.distinctions li + li {
  border-left: 1px solid var(--line-strong);
}

@media (max-width: 720px) {
  .recs {
    grid-template-columns: 1fr;
  }

  .rec:first-child,
  .rec:last-child {
    grid-column: auto;
  }

  .rec {
    min-height: auto;
  }

  .rec--interactive {
    min-height: 0;
  }

  .lens-link {
    margin-top: 6px;
  }

  .distinctions {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .distinctions li,
  .distinctions li:first-child {
    padding: 0 0 14px;
  }

  .distinctions li + li {
    padding-top: 14px;
    border-top: 1px solid var(--line-strong);
    border-left: 0;
  }
}
</style>
