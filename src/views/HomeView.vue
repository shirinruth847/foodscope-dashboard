<script setup>
import { SITE, PROBLEM } from '../content/site'

const storySteps = [
  { number: '01', path: '/dashboards/1', label: 'Global view', title: 'Map self-sufficiency' },
  { number: '02', path: '/dashboards/2', label: 'Relationship', title: 'Compare food supply' },
  { number: '03', path: '/dashboards/3', label: 'Food groups', title: 'Look inside the ratio' },
  { number: '04', path: '/dashboards/4', label: 'Income', title: 'Compare by income' },
  { number: '05', path: '/dashboards/5', label: 'Singapore', title: 'Examine food imports' },
  { number: '06', path: '/dashboards/6', label: '2035 targets', title: 'Track local production' },
]

const readingPrinciples = [
  { title: 'Origin ≠ adequacy', text: 'SSR shows where supply comes from.' },
  { title: 'Association ≠ causation', text: 'Patterns do not prove cause.' },
  { title: 'Availability ≠ access', text: 'National supply does not show distribution.' },
]
</script>

<template>
  <main class="home-page">
    <section class="hero" aria-labelledby="hero-title">
      <p class="hero__eyebrow">{{ SITE.eyebrow }}</p>
      <h1 id="hero-title">{{ SITE.title }}</h1>
      <p class="hero__lede">{{ SITE.lede }}</p>

      <div class="hero__meta" aria-label="Project scope">
        <span>178 countries</span>
        <span>2010–2023</span>
        <span>FAOSTAT</span>
      </div>

      <div class="hero__actions">
        <RouterLink to="/dashboards" class="button button--primary">
          Explore the dashboards
          <span aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink to="/problem" class="button button--secondary">About the project</RouterLink>
      </div>

      <p class="hero__team">By {{ SITE.team.join(', ') }}</p>
    </section>

    <section class="home-section" aria-labelledby="question-title">
      <div class="section-heading">
        <p class="section-eyebrow">01 / The question</p>
        <h2 id="question-title">Does producing more at home mean having more to eat?</h2>
      </div>

      <div class="focus-grid">
        <figure class="focus-image">
          <img :src="PROBLEM.banner.src" :alt="PROBLEM.banner.alt" />
          <figcaption>Domestic production is only one part of food availability.</figcaption>
        </figure>

        <blockquote class="research-question">
          <span>Our research question</span>
          <p>{{ PROBLEM.question }}</p>
          <RouterLink to="/problem">Read the context <span aria-hidden="true">→</span></RouterLink>
        </blockquote>
      </div>
    </section>

    <section class="home-section" aria-labelledby="story-title">
      <div class="section-heading section-heading--row">
        <div>
          <p class="section-eyebrow">02 / The story</p>
          <h2 id="story-title">Explore six connected views</h2>
        </div>
        <RouterLink to="/dashboards" class="section-link">View all dashboards <span aria-hidden="true">→</span></RouterLink>
      </div>

      <ol class="story-grid">
        <li v-for="step in storySteps" :key="step.number">
          <RouterLink :to="step.path" class="story-card">
            <div class="story-card__top">
              <span class="story-card__number">{{ step.number }}</span>
              <span class="story-card__arrow" aria-hidden="true">↗</span>
            </div>
            <div class="story-card__mark" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <p>{{ step.label }}</p>
            <h3>{{ step.title }}</h3>
          </RouterLink>
        </li>
      </ol>
    </section>

    <section class="reading-guide" aria-labelledby="guide-title">
      <div>
        <p class="section-eyebrow">03 / Read with care</p>
        <h2 id="guide-title">Three distinctions matter</h2>
      </div>
      <ul>
        <li v-for="principle in readingPrinciples" :key="principle.title">
          <strong>{{ principle.title }}</strong>
          <span>{{ principle.text }}</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 48px) var(--gutter) 72px;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: clamp(34px, 6vw, 72px);
  border-radius: var(--radius);
  color: var(--cream);
  background:
    radial-gradient(100% 110% at 100% 0%, rgba(176, 138, 62, 0.26), transparent 58%),
    radial-gradient(75% 85% at 0% 100%, rgba(111, 143, 114, 0.24), transparent 62%),
    linear-gradient(155deg, #24452f, var(--forest-deep));
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(115deg, transparent 0 26px, rgba(246, 241, 230, 0.025) 26px 27px);
  pointer-events: none;
}

.hero > * {
  position: relative;
  z-index: 1;
}

.hero__eyebrow,
.section-eyebrow {
  margin: 0;
  color: var(--wheat);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero__eyebrow {
  color: #d9c79c;
}

.hero h1 {
  max-width: 18ch;
  margin-top: 14px;
  color: var(--cream);
  font-size: clamp(36px, 5.5vw, 64px);
  line-height: 1.02;
}

.hero__lede {
  max-width: 65ch;
  margin-top: 22px;
  color: rgba(246, 241, 230, 0.82);
  font-size: clamp(17px, 1.8vw, 20px);
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 28px;
  color: #d9c79c;
  font-size: 13px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.hero__team {
  margin-top: 28px;
  color: rgba(246, 241, 230, 0.62);
  font-size: 14px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button--primary {
  background: var(--cream);
  color: var(--forest-deep);
}

.button--primary:hover {
  background: #fff;
  color: var(--forest-deep);
}

.button--secondary {
  border-color: rgba(246, 241, 230, 0.35);
  color: var(--cream);
}

.button--secondary:hover {
  border-color: rgba(246, 241, 230, 0.7);
  color: var(--cream);
}

.home-section {
  padding-top: clamp(50px, 7vw, 82px);
}

.section-heading {
  max-width: 780px;
  margin-bottom: 24px;
}

.section-heading h2,
.reading-guide h2 {
  margin-top: 8px;
  font-size: clamp(28px, 3.5vw, 42px);
}

.section-heading--row {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  max-width: none;
}

.section-link {
  flex: none;
  padding-bottom: 4px;
  color: var(--forest);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.focus-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  min-height: 370px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper);
  box-shadow: var(--shadow);
}

.focus-image {
  position: relative;
  min-height: 320px;
  margin: 0;
  overflow: hidden;
}

.focus-image::after {
  content: '';
  position: absolute;
  inset: 45% 0 0;
  background: linear-gradient(transparent, rgba(20, 48, 33, 0.88));
}

.focus-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.focus-image figcaption {
  position: absolute;
  right: 28px;
  bottom: 24px;
  left: 28px;
  z-index: 1;
  max-width: 28ch;
  color: var(--cream);
  font-family: var(--font-display);
  font-size: clamp(19px, 2vw, 25px);
  line-height: 1.25;
}

.research-question {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: clamp(28px, 4vw, 46px);
  border-left: 4px solid var(--wheat);
  background: var(--wheat-tint);
}

.research-question > span {
  color: #8a6a2a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.research-question > p {
  margin-top: 14px;
  color: var(--forest);
  font-family: var(--font-display);
  font-size: clamp(23px, 2.7vw, 32px);
  line-height: 1.3;
}

.research-question a {
  align-self: flex-start;
  margin-top: 24px;
  color: var(--forest);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.story-card {
  display: flex;
  flex-direction: column;
  min-height: 200px;
  height: 100%;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--paper);
  color: var(--ink);
  text-decoration: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}

.story-card:hover {
  border-color: var(--sage);
  box-shadow: var(--shadow);
  color: var(--ink);
  transform: translateY(-2px);
}

.story-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.story-card__number {
  color: var(--wheat);
  font-family: var(--font-display);
  font-weight: 600;
}

.story-card__arrow {
  color: var(--sage);
  font-size: 18px;
}

.story-card__mark {
  display: flex;
  align-items: end;
  gap: 4px;
  height: 36px;
  margin: 20px 0 18px;
}

.story-card__mark span {
  width: 9px;
  border-radius: 2px 2px 0 0;
  background: var(--sage);
}

.story-card__mark span:nth-child(1) { height: 45%; opacity: 0.55; }
.story-card__mark span:nth-child(2) { height: 80%; opacity: 0.75; }
.story-card__mark span:nth-child(3) { height: 58%; opacity: 0.65; }
.story-card__mark span:nth-child(4) { height: 100%; }

.story-card p {
  color: var(--ink-muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.story-card h3 {
  margin-top: 6px;
  color: var(--forest);
  font-size: 21px;
}

.reading-guide {
  display: grid;
  grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);
  gap: 32px;
  align-items: center;
  margin-top: clamp(50px, 7vw, 82px);
  padding: clamp(26px, 4vw, 40px);
  border-radius: var(--radius);
  background: var(--sage-tint);
}

.reading-guide ul {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.reading-guide li {
  display: grid;
  grid-template-columns: minmax(170px, 0.8fr) 1fr;
  gap: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(36, 69, 47, 0.18);
}

.reading-guide li:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.reading-guide strong {
  color: var(--forest);
  font-family: var(--font-display);
  font-size: 17px;
}

.reading-guide span {
  color: var(--ink-soft);
  font-size: 14px;
}

@media (max-width: 850px) {
  .focus-grid {
    grid-template-columns: 1fr;
  }

  .research-question {
    border-top: 4px solid var(--wheat);
    border-left: 0;
  }

  .story-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .reading-guide {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .section-heading--row {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .story-grid {
    grid-template-columns: 1fr;
  }

  .story-card {
    min-height: 170px;
  }

  .reading-guide li {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
