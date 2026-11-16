<script setup>
import { SITE, DASHBOARDS, PROBLEM } from '../content/site'
import TableauEmbed from '../components/TableauEmbed.vue'
import TradeContextChart from '../components/TradeContextChart.vue'

const navigationSteps = [
  { number: '01', title: 'Start with the question', text: 'Read the context and scope before interpreting the visuals.' },
  { number: '02', title: 'Explore the dashboard', text: 'Use filters, hover states and the reset button to test your own comparisons.' },
  { number: '03', title: 'Read the analysis', text: 'Use the notes below the visual to connect each view back to the central question.' },
]

const analyses = [
  {
    number: '01',
    title: 'Global overview',
    text: 'Use the map and headline measures to see how much of a country’s food supply is associated with domestic production. Start broad, then select a country or category for a closer look.',
  },
  {
    number: '02',
    title: 'Change over time',
    text: 'The trend view helps you distinguish a one-year snapshot from a sustained pattern. Compare the same country, category and measure from 2010 to 2023.',
  },
  {
    number: '03',
    title: 'Food categories',
    text: 'Food self-sufficiency is not one uniform story. Category-level views show where domestic production is stronger and where supply depends more on imports.',
  },
  {
    number: '04',
    title: 'Self-sufficiency and availability',
    text: 'Read the comparison as an association, not a causal claim. A higher domestic share does not automatically mean higher food supply per person because trade also shapes availability.',
  },
  {
    number: '05',
    title: 'Country comparison',
    text: 'Compare countries with similar filters to understand how their food-supply structures differ. Keep the units and selected year consistent before drawing a conclusion.',
  },
  {
    number: '06',
    title: 'Singapore and 2035',
    text: 'Singapore is a useful test case: local production is low relative to its food needs, while diversified imports support availability. Compare the local-production measures with the 2035 targets, noting that the newer fibre and protein definitions are narrower than the former “30 by 30” framing.',
  },
]
</script>

<template>
  <main class="dashboard-page">
    <section id="overview" class="dashboard-hero" aria-labelledby="hero-title">
      <p class="dashboard-hero__eyebrow">{{ SITE.eyebrow }}</p>
      <h1 id="hero-title">{{ SITE.title }}</h1>
      <p class="dashboard-hero__lede">{{ SITE.lede }}</p>
      <div class="dashboard-hero__meta">
        <span>178 countries</span>
        <span>2010–2023</span>
        <span>FAOSTAT</span>
      </div>
    </section>

    <section id="how-to-use" class="dashboard-section" aria-labelledby="how-to-use-title">
      <div class="section-heading">
        <p class="section-heading__eyebrow">01 / Orientation</p>
        <h2 id="how-to-use-title">How to navigate this page</h2>
        <p>Move from context to evidence, then use the analysis to interpret what you see.</p>
      </div>
      <ol class="navigation-steps">
        <li v-for="step in navigationSteps" :key="step.number">
          <span class="navigation-steps__number">{{ step.number }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section id="dashboard" class="dashboard-section" aria-labelledby="dashboard-title">
      <div class="section-heading">
        <p class="section-heading__eyebrow">02 / Explore</p>
        <h2 id="dashboard-title">The dashboard</h2>
        <p>{{ DASHBOARDS.items[0].description }}</p>
      </div>
      <TableauEmbed
        :src="DASHBOARDS.items[0].src"
        :height="DASHBOARDS.items[0].height"
        :width="DASHBOARDS.items[0].width"
        :title="DASHBOARDS.items[0].title"
      />
    </section>

    <section id="trade-context" class="dashboard-section dashboard-section--split" aria-labelledby="trade-title">
      <div class="section-heading">
        <p class="section-heading__eyebrow">03 / Context</p>
        <h2 id="trade-title">Availability is shaped by trade too</h2>
        <p>Domestic production is only one part of national food availability. This chart adds a compact view of how much production was exported in 2023 across four major food groups.</p>
      </div>
      <div class="chart-card">
        <TradeContextChart />
      </div>
    </section>

    <section id="analysis" class="dashboard-section" aria-labelledby="analysis-title">
      <div class="section-heading">
        <p class="section-heading__eyebrow">04 / Interpret</p>
        <h2 id="analysis-title">How to read each dashboard</h2>
        <p>These notes keep the six-view story connected to the central question and make the limits of the comparison explicit.</p>
      </div>
      <ol class="analysis-grid">
        <li v-for="analysis in analyses" :key="analysis.number" class="analysis-card">
          <span class="analysis-card__number">{{ analysis.number }}</span>
          <h3>{{ analysis.title }}</h3>
          <p>{{ analysis.text }}</p>
        </li>
      </ol>
    </section>

    <section id="question" class="question-card" aria-labelledby="question-title">
      <p class="section-heading__eyebrow">Keep this in view</p>
      <h2 id="question-title">{{ PROBLEM.question }}</h2>
      <p>{{ PROBLEM.scope }}</p>
    </section>
  </main>
</template>

<style scoped>
.dashboard-page {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 48px) var(--gutter) 72px;
}

.dashboard-hero {
  padding: clamp(30px, 5vw, 64px);
  border-radius: var(--radius);
  color: var(--cream);
  background:
    radial-gradient(100% 100% at 100% 0%, rgba(176, 138, 62, 0.24), transparent 58%),
    linear-gradient(155deg, #24452f, var(--forest-deep));
}

.dashboard-hero__eyebrow,
.section-heading__eyebrow {
  margin: 0;
  color: var(--wheat);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.dashboard-hero__eyebrow {
  color: #d9c79c;
}

.dashboard-hero h1 {
  max-width: 18ch;
  margin-top: 14px;
  color: var(--cream);
  font-size: clamp(34px, 5vw, 58px);
}

.dashboard-hero__lede {
  max-width: 66ch;
  margin-top: 20px;
  color: rgba(246, 241, 230, 0.82);
  font-size: clamp(17px, 1.8vw, 20px);
}

.dashboard-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 28px;
  color: #d9c79c;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.dashboard-section {
  padding-top: clamp(48px, 7vw, 84px);
  scroll-margin-top: 24px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 24px;
}

.section-heading h2 {
  margin-top: 7px;
  font-size: clamp(28px, 3.5vw, 42px);
}

.section-heading > p:last-child {
  margin-top: 12px;
  color: var(--ink-soft);
  font-size: 18px;
}

.navigation-steps,
.analysis-grid {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navigation-steps {
  grid-template-columns: repeat(3, 1fr);
}

.navigation-steps li,
.analysis-card,
.chart-card {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--paper);
}

.navigation-steps li {
  display: flex;
  gap: 14px;
}

.navigation-steps__number,
.analysis-card__number {
  flex: none;
  color: var(--wheat);
  font-family: var(--font-display);
  font-weight: 600;
}

.navigation-steps h3,
.analysis-card h3 {
  font-size: 20px;
}

.navigation-steps p,
.analysis-card p {
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.5;
}

.dashboard-section--split {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 28px;
  align-items: start;
}

.dashboard-section--split .section-heading {
  margin-top: 20px;
}

.chart-card {
  box-shadow: var(--shadow);
}

.analysis-grid {
  grid-template-columns: repeat(3, 1fr);
}

.analysis-card {
  min-height: 190px;
}

.analysis-card__number {
  display: block;
  margin-bottom: 14px;
}

.question-card {
  margin-top: clamp(48px, 7vw, 84px);
  padding: clamp(24px, 4vw, 40px);
  border-left: 3px solid var(--wheat);
  border-radius: 0 var(--radius) var(--radius) 0;
  background: var(--wheat-tint);
  scroll-margin-top: 24px;
}

.question-card h2 {
  max-width: 34ch;
  margin-top: 8px;
  font-size: clamp(24px, 3vw, 34px);
}

.question-card > p:last-child {
  margin-top: 14px;
  color: var(--ink-soft);
}

@media (max-width: 850px) {
  .navigation-steps,
  .analysis-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-section--split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .navigation-steps,
  .analysis-grid {
    grid-template-columns: 1fr;
  }
}
</style>
