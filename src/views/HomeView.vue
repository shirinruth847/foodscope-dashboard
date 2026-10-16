<script setup>
import { NAV, SITE } from '../content/site'

const sections = NAV.filter((n) => n.id !== 'home')
</script>

<template>
  <main class="page">
    <section class="hero" aria-labelledby="hero-title">
      <p class="hero__eyebrow">{{ SITE.eyebrow }}</p>
      <h1 id="hero-title" class="hero__title">{{ SITE.title }}</h1>
      <div class="hero__row">
        <div>
          <p class="hero__lede">{{ SITE.lede }}</p>
          <p class="hero__team">{{ SITE.team.join(', ') }}</p>
        </div>

        <dl class="hero__stats">
          <div v-for="stat in SITE.stats" :key="stat.label" class="hero__stat">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <RouterLink to="/dashboards" class="hero__cta">
        Explore the dashboards
        <span aria-hidden="true">→</span>
      </RouterLink>
    </section>

    <section aria-labelledby="sections-title">
      <h2 id="sections-title" class="sr-only">Sections</h2>
      <ol class="sections">
        <li v-for="(s, i) in sections" :key="s.id">
          <RouterLink :to="s.path" class="section-link">
            <span class="section-link__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="section-link__title">{{ s.label }}</span>
            <span class="section-link__summary">{{ s.summary }}</span>
          </RouterLink>
        </li>
      </ol>
    </section>
  </main>
</template>

<style scoped>
/* ── Hero ─────────────────────────────────────────────── */
.hero {
  position: relative;
  overflow: hidden;
  padding: clamp(28px, 4.5vw, 52px) clamp(24px, 5vw, 56px);
  border-radius: var(--radius);
  color: var(--cream);
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(176, 138, 62, 0.22), transparent 55%),
    radial-gradient(90% 80% at 0% 100%, rgba(111, 143, 114, 0.28), transparent 60%),
    linear-gradient(160deg, #24452f 0%, var(--forest-deep) 100%);
}

.hero::after {
  /* faint field-row texture */
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(115deg, transparent 0 22px, rgba(246, 241, 230, 0.025) 22px 23px);
  pointer-events: none;
}

.hero > * {
  position: relative;
  z-index: 1;
}

.hero__eyebrow {
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #d9c79c;
}

.hero__title {
  margin-top: 12px;
  max-width: 24ch;
  font-size: clamp(30px, 4.2vw, 48px);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--cream);
}

.hero__lede {
  max-width: 62ch;
  font-size: clamp(16px, 1.4vw, 18px);
  color: rgba(246, 241, 230, 0.82);
}

.hero__team {
  margin-top: 10px;
  font-size: 15px;
  font-style: italic;
  color: rgba(246, 241, 230, 0.7);
}

.hero__row {
  display: flex;
  align-items: flex-start;
  margin-top: 16px;
  gap: clamp(48px, 8vw, 112px);
}

.hero__stats {
  flex: none;
  display: flex;
  gap: 32px;
  margin: 0;
  padding-left: 24px;
  border-left: 1px solid rgba(246, 241, 230, 0.2);
}

.hero__stat dt {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(246, 241, 230, 0.6);
}

.hero__stat dd {
  margin: 4px 0 0;
  font-family: var(--font-display);
  font-size: clamp(20px, 2.4vw, 24px);
  color: var(--cream);
  font-variant-numeric: lining-nums tabular-nums;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  padding: 10px 20px;
  border-radius: 999px;
  background: var(--cream);
  color: var(--forest);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s;
}

.hero__cta:hover {
  color: var(--forest);
  background: #fff;
}

/* ── Section cards ───────────────────────────────────── */
.sections {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.section-link {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 14px;
  row-gap: 4px;
  align-content: start;
  height: 100%;
  padding: 22px 24px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.section-link:hover {
  border-color: var(--sage);
  box-shadow: var(--shadow);
}

.section-link__num {
  grid-row: span 2;
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--wheat);
  line-height: 1.9;
}

.section-link__title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--forest);
}

.section-link__summary {
  font-size: 15px;
  color: var(--ink-soft);
}

@media (max-width: 720px) {
  .sections {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .hero__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .hero__stats {
    padding-left: 0;
    padding-top: 16px;
    border-left: 0;
    border-top: 1px solid rgba(246, 241, 230, 0.2);
  }
}
</style>
