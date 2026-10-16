<script setup>
import DashboardBlock from '../components/DashboardBlock.vue'
import { SITE, PROBLEM, FINDINGS, DASHBOARDS, RECOMMENDATIONS } from '../content/site'
</script>

<template>
  <main class="page container">
    <!-- 1. Home -->
    <section id="home" class="hero" aria-labelledby="hero-title">
      <p class="hero__eyebrow">{{ SITE.eyebrow }}</p>
      <h1 id="hero-title" class="hero__title">{{ SITE.title }}</h1>
      <p class="hero__lede">{{ SITE.lede }}</p>

      <p class="hero__team">{{ SITE.team.join(', ') }}</p>

      <dl class="hero__stats">
        <div v-for="stat in SITE.stats" :key="stat.label" class="hero__stat">
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>

      <a href="#dashboards" class="hero__cta">
        Explore the dashboards
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </section>

    <!-- 2. Problem -->
    <section id="problem" class="card" aria-labelledby="problem-title">
      <h2 id="problem-title" class="card__title">{{ PROBLEM.title }}</h2>
      <div class="prose">
        <p v-for="(para, i) in PROBLEM.paragraphs" :key="i">{{ para }}</p>
      </div>
      <blockquote class="question">
        <span class="question__label">Our question</span>
        <p>{{ PROBLEM.question }}</p>
      </blockquote>
      <p class="note">{{ PROBLEM.scope }}</p>
    </section>

    <!-- 3. Key findings -->
    <section id="findings" class="card" aria-labelledby="findings-title">
      <h2 id="findings-title" class="card__title">{{ FINDINGS.title }}</h2>
      <p class="card__intro">{{ FINDINGS.intro }}</p>
      <ol class="findings">
        <li
          v-for="(item, i) in FINDINGS.items"
          :key="i"
          class="finding"
          :class="{ 'is-placeholder': item.placeholder }"
        >
          <span class="finding__tag">{{ item.tag }}</span>
          <p class="finding__text">{{ item.text }}</p>
        </li>
      </ol>
    </section>

    <!-- 4. Explore dashboards -->
    <section id="dashboards" class="card" aria-labelledby="dashboards-title">
      <h2 id="dashboards-title" class="card__title">{{ DASHBOARDS.title }}</h2>
      <p class="card__intro">{{ DASHBOARDS.intro }}</p>

      <nav class="jump" aria-label="Jump to dashboard">
        <a v-for="d in DASHBOARDS.items" :key="d.id" :href="`#${d.id}`" class="jump__link">{{ d.title }}</a>
      </nav>

      <div class="dashboards">
        <DashboardBlock
          v-for="(d, i) in DASHBOARDS.items"
          :key="d.id"
          :id="d.id"
          :index="i + 1"
          :title="d.title"
          :description="d.description"
          :src="d.src"
          :height="d.height"
        />
      </div>
    </section>

    <!-- 5. Recommendations -->
    <section id="recommendations" class="card" aria-labelledby="recs-title">
      <h2 id="recs-title" class="card__title">{{ RECOMMENDATIONS.title }}</h2>
      <p class="card__intro">{{ RECOMMENDATIONS.intro }}</p>
      <ol class="recs">
        <li
          v-for="(rec, i) in RECOMMENDATIONS.items"
          :key="i"
          class="rec"
          :class="{ 'is-placeholder': rec.placeholder }"
        >
          <span class="rec__num" aria-hidden="true">{{ i + 1 }}</span>
          <div>
            <h3 class="rec__title">{{ rec.title }}</h3>
            <p class="rec__text">{{ rec.text }}</p>
          </div>
        </li>
      </ol>
      <p class="note">{{ RECOMMENDATIONS.caveat }}</p>
    </section>
  </main>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
  padding-bottom: 64px;
}

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
  margin-top: 16px;
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

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, max-content));
  gap: clamp(24px, 5vw, 64px);
  margin: 28px 0 0;
  padding-top: 20px;
  border-top: 1px solid rgba(246, 241, 230, 0.16);
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
  transition: background-color 0.15s, transform 0.15s;
}

.hero__cta:hover {
  color: var(--forest);
  background: #fff;
  transform: translateY(1px);
}

/* ── Section cards ───────────────────────────────────── */
.card {
  padding: clamp(28px, 4.5vw, 56px);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.card__title {
  font-size: clamp(30px, 4vw, 42px);
}

.card__intro {
  margin-top: 10px;
  color: var(--ink-soft);
  max-width: 68ch;
}

.prose {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  max-width: 72ch;
  color: var(--ink);
}

.note {
  margin-top: 20px;
  font-size: 15px;
  font-style: italic;
  color: var(--ink-muted);
  max-width: 72ch;
}

.question {
  margin: 28px 0 0;
  padding: 20px 24px;
  background: var(--wheat-tint);
  border-left: 3px solid var(--wheat);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.question__label {
  display: block;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8a6a2a;
  margin-bottom: 6px;
}

.question p {
  font-family: var(--font-display);
  font-size: clamp(19px, 2vw, 22px);
  line-height: 1.4;
  color: var(--forest);
}

/* ── Findings ────────────────────────────────────────── */
.findings {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  counter-reset: finding;
}

.finding {
  counter-increment: finding;
  padding: 20px 22px;
  background: var(--cream);
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

.finding__tag::before {
  content: counter(finding, decimal-leading-zero);
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

.is-placeholder {
  border-left-color: var(--line-strong);
}

.is-placeholder .finding__text,
.is-placeholder .rec__text {
  font-weight: 400;
  font-style: italic;
  color: var(--ink-muted);
}

/* ── Dashboards ──────────────────────────────────────── */
.jump {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.jump__link {
  padding: 6px 14px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  font-size: 14px;
  color: var(--forest);
  text-decoration: none;
  transition: background-color 0.15s, border-color 0.15s;
}

.jump__link:hover {
  color: var(--forest);
  background: var(--sage-tint);
  border-color: var(--sage);
}

.dashboards {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 40px;
}

/* ── Recommendations ─────────────────────────────────── */
.recs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
}

.rec {
  display: flex;
  gap: 16px;
  padding: 22px;
  background: var(--cream);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
}

.rec__num {
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--forest);
  color: var(--cream);
  font-family: var(--font-display);
  font-size: 15px;
}

.rec.is-placeholder .rec__num {
  background: var(--line-strong);
}

.rec__title {
  font-size: 19px;
}

.rec__text {
  margin-top: 6px;
  font-size: 16px;
  color: var(--ink-soft);
}

@media (max-width: 860px) {
  .findings,
  .recs {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .hero__stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
