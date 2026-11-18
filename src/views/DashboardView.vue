<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { DASHBOARDS } from '../content/site'
import TableauEmbed from '../components/TableauEmbed.vue'
import TradeContextChart from '../components/TradeContextChart.vue'
import Dashboard3Embed from '../components/Dashboard3Embed.vue'

const Dashboard5Story = defineAsyncComponent(() => import('../features/dashboard5/Dashboard5Story.vue'))

const props = defineProps({
  slug: { type: String, required: true },
})

const dashboard = computed(() => DASHBOARDS.items.find((d) => d.slug === props.slug))
const isGlobalOverview = computed(() => props.slug === '1')

const defaultNavigation = [
  { title: 'Hover for detail', text: 'Move over a mark to reveal exact values and context.' },
  { title: 'Use the filters', text: 'Choose a country, year or category to focus the view.' },
  { title: 'Compare views', text: 'Keep the same selections while comparing related charts.' },
  { title: 'Reset when needed', text: 'Use Reset dashboard to return to the full view.' },
]

const analysis = {
  '1': 'Use the map and ranking to compare how much food supply is associated with domestic production across countries. Singapore is a useful contrast: a low self-sufficiency ratio does not by itself mean low national food availability.',
  '2': 'Read this view as change over time. Keep the country and food category consistent so you can distinguish a sustained pattern from a single-year movement.',
  '3': 'Compare food categories rather than treating self-sufficiency as one overall condition. Domestic production can be stronger for some foods while other categories rely more heavily on imports.',
  '4': 'Compare self-sufficiency and food supply within income groups, then examine their relationship with GDP per capita.',
  '6': 'Use this view to place Singapore’s local production beside its 2035 fibre and protein targets. The target definitions are narrower than the former “30 by 30” framing, so the measures are not directly interchangeable.',
}

const currentAnalysis = computed(() => analysis[props.slug] ?? 'Use the filters and tooltips to examine this view, then relate the pattern back to the central question.')
const navigationSteps = computed(() => dashboard.value?.navigation ?? defaultNavigation)
</script>

<template>
  <Dashboard5Story v-if="dashboard?.slug === '5'" :dashboard="dashboard" />
  <main v-else-if="dashboard" class="dashboard-page">
    <header id="overview" class="dashboard-intro">
      <p class="dashboard-intro__breadcrumb">
        <RouterLink to="/dashboards">{{ DASHBOARDS.title }}</RouterLink>
        <span aria-hidden="true">/</span>
        Dashboard {{ dashboard.slug.padStart(2, '0') }}
      </p>
      <p class="section-kicker">{{ dashboard.overview?.eyebrow || 'Dashboard overview' }}</p>
      <h1>{{ dashboard.title }}</h1>
      <p class="dashboard-intro__lede">{{ dashboard.description || 'Explore this view to investigate food self-sufficiency, imports and national food availability.' }}</p>
      <ul v-if="dashboard.overview?.meta" class="dashboard-meta" aria-label="Dashboard coverage">
        <li v-for="item in dashboard.overview.meta" :key="item">{{ item }}</li>
      </ul>
    </header>

    <section v-if="dashboard.metric" id="metric" class="dashboard-section metric-section" aria-labelledby="metric-title">
      <div class="section-heading">
        <p class="section-kicker">{{ dashboard.metric.eyebrow }}</p>
        <h2 id="metric-title">{{ dashboard.metric.title }}</h2>
        <p>{{ dashboard.metric.text }}</p>
      </div>

      <div class="metric-card">
        <div class="metric-formula" aria-label="Self-sufficiency ratio equals domestic production divided by domestic production plus imports minus exports, multiplied by 100">
          <span class="metric-formula__name">SSR</span>
          <span aria-hidden="true">=</span>
          <span class="metric-fraction">
            <span>{{ dashboard.metric.numerator }}</span>
            <span>{{ dashboard.metric.denominator }}</span>
          </span>
          <span aria-hidden="true">× 100</span>
        </div>
        <p class="metric-example">{{ dashboard.metric.example }}</p>
      </div>

      <div class="metric-bands" aria-label="How to interpret SSR values">
        <article v-for="band in dashboard.metric.bands" :key="band.value">
          <strong>{{ band.value }}</strong>
          <p>{{ band.text }}</p>
        </article>
      </div>

      <aside class="metric-note">
        <p>{{ dashboard.metric.note }}</p>
        <span>{{ dashboard.metric.source }}</span>
      </aside>
    </section>

    <section id="how-to-use" class="dashboard-section" aria-labelledby="how-to-use-title">
      <div class="section-heading">
        <p class="section-kicker">02 · Navigate</p>
        <h2 id="how-to-use-title">How to navigate the dashboard</h2>
        <p>{{ dashboard.navigationIntro || 'Follow this sequence for a clear comparison without losing track of your selections.' }}</p>
      </div>
      <ol class="navigation-steps">
        <li v-for="(step, index) in navigationSteps" :key="step.title">
          <span class="navigation-steps__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section id="dashboard" class="dashboard-section dashboard-section--viz" aria-labelledby="dashboard-title">
      <div class="section-heading">
        <p class="section-kicker">03 · Explore</p>
        <h2 id="dashboard-title">Explore the dashboard</h2>
        <p>Select a year or country, then use the reset button above the visual to return to the complete view.</p>
      </div>
      <TableauEmbed
        v-if="dashboard.src"
        :key="dashboard.slug"
        :src="dashboard.src"
        :height="dashboard.height"
        :width="dashboard.width"
        :mobile-height="dashboard.mobileHeight"
        :title="dashboard.title"
      />
      <div v-else class="placeholder" role="img" :aria-label="`${dashboard.title}: coming soon`">
        <p>Dashboard coming soon</p>
      </div>
      <p v-if="dashboard.note" class="note dashboard-note">Note: {{ dashboard.note }}</p>
    </section>

    <section v-if="dashboard.slug === '3'" id="faces" class="dashboard-section" aria-labelledby="faces-title">
      <div class="section-heading">
        <p class="section-kicker">Companion view</p>
        <h2 id="faces-title">The selected country at a glance</h2>
        <p>Hover a row in the key to highlight that feature on the faces.</p>
      </div>
      <Dashboard3Embed />
    </section>

    <section id="analysis" class="dashboard-section" aria-labelledby="analysis-title">
      <div class="section-heading">
        <p class="section-kicker">04 · Analyse</p>
        <h2 id="analysis-title">How to read each view</h2>
        <p v-if="dashboard.analysis">{{ dashboard.analysis.intro }}</p>
      </div>
      <div v-if="dashboard.analysis" class="analysis-grid" :class="{ 'analysis-grid--two': dashboard.slug === '4' }">
        <article v-for="item in dashboard.analysis.items" :key="item.title" class="analysis-card">
          <p class="analysis-card__label">{{ item.label }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <div v-if="item.callout" class="analysis-callout">
            <h4>{{ item.callout.title }}</h4>
            <dl class="analysis-callout__sides">
              <div v-for="side in item.callout.sides" :key="side.label">
                <dt>{{ side.label }}</dt>
                <dd>{{ side.text }}</dd>
              </div>
            </dl>
            <p v-if="item.callout.takeaway" class="analysis-callout__takeaway">{{ item.callout.takeaway }}</p>
          </div>
        </article>
      </div>
      <article v-else class="analysis-card analysis-card--single">
        <p>{{ currentAnalysis }}</p>
      </article>

      <aside v-if="dashboard.analysis?.takeaway" class="takeaway" aria-label="Key interpretation">
        <span>Key interpretation</span>
        <p>{{ dashboard.analysis.takeaway }}</p>
      </aside>

      <section v-if="isGlobalOverview && dashboard.significance" class="significance" aria-labelledby="significance-title">
        <div class="significance__copy">
          <p class="section-kicker">Significance · Trade context</p>
          <h3 id="significance-title">{{ dashboard.significance.title }}</h3>
          <p>{{ dashboard.significance.text }}</p>
          <p class="significance__source">Source: {{ dashboard.significance.source }}</p>
        </div>
        <div class="chart-card">
          <TradeContextChart />
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.dashboard-page {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 48px) var(--gutter) 72px;
}

.dashboard-intro {
  max-width: 920px;
  padding: clamp(12px, 2vw, 24px) 0 clamp(24px, 4vw, 40px);
  border-bottom: 1px solid var(--line-strong);
}

.dashboard-intro__breadcrumb {
  display: flex;
  gap: 8px;
  color: var(--ink-muted);
  font-size: 14px;
}

.dashboard-intro__breadcrumb a {
  color: var(--ink-soft);
  text-decoration: none;
}

.section-kicker {
  margin: 0;
  color: var(--wheat);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.dashboard-intro .section-kicker {
  margin-top: 22px;
}

.dashboard-intro h1 {
  margin-top: 8px;
  text-wrap: balance;
  font-size: clamp(40px, 5.5vw, 68px);
}

.dashboard-intro__lede {
  max-width: 68ch;
  margin-top: 14px;
  color: var(--ink-soft);
  font-size: clamp(18px, 2vw, 21px);
}

.dashboard-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}

.dashboard-meta li {
  padding: 5px 11px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--ink-soft);
  background: var(--paper);
  font-size: 13px;
}

.dashboard-section {
  padding-top: clamp(44px, 6vw, 72px);
  scroll-margin-top: 24px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 22px;
}

.section-heading h2 {
  margin-top: 7px;
  font-size: clamp(28px, 3.5vw, 40px);
}

.section-heading > p:last-child {
  margin-top: 10px;
  color: var(--ink-soft);
  font-size: 18px;
}

.metric-section {
  max-width: 1040px;
}

.metric-card {
  padding: clamp(24px, 4vw, 38px);
  border-radius: var(--radius);
  background: linear-gradient(145deg, var(--forest), var(--forest-deep));
  color: var(--cream);
  box-shadow: var(--shadow);
}

.metric-formula {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 2vw, 20px);
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 31px);
  line-height: 1.25;
  text-align: center;
}

.metric-formula__name {
  color: #d6b76f;
  font-weight: 700;
}

.metric-fraction {
  display: grid;
  min-width: min(100%, 430px);
}

.metric-fraction span {
  padding: 7px 16px;
}

.metric-fraction span:first-child {
  border-bottom: 1px solid rgb(246 241 230 / 65%);
}

.metric-example {
  max-width: 72ch;
  margin: 24px auto 0;
  padding-top: 18px;
  border-top: 1px solid rgb(246 241 230 / 18%);
  color: rgb(246 241 230 / 82%);
  font-size: 15px;
  text-align: center;
}

.metric-bands {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.metric-bands article {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--paper);
}

.metric-bands strong {
  color: var(--wheat);
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.metric-bands p {
  margin-top: 7px;
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.5;
}

.metric-note {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 12px;
  padding: 16px 18px;
  border-left: 3px solid var(--wheat);
  background: var(--wheat-tint);
}

.metric-note p {
  color: var(--forest);
  font-weight: 600;
}

.metric-note span {
  flex: 0 0 260px;
  color: var(--ink-muted);
  font-size: 13px;
  font-style: italic;
  text-align: right;
}

.navigation-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navigation-steps li,
.analysis-card,
.chart-card {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--paper);
}

.navigation-steps li {
  display: block;
}

.navigation-steps__number,
.analysis-card__label {
  flex: none;
  color: var(--wheat);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.navigation-steps h3 {
  margin-top: 12px;
  font-size: 20px;
}

.navigation-steps p,
.analysis-card p {
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.5;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.analysis-grid--two {
  grid-template-columns: repeat(2, 1fr);
}

.analysis-card h3 {
  margin-top: 9px;
  font-size: 22px;
}

.chart-card {
  min-width: 0;
  box-shadow: var(--shadow);
}

.analysis-card p {
  margin-top: 10px;
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.5;
}

.analysis-card--single {
  max-width: 800px;
}

/* Sizes against its own width, since the card can be a narrow third of the row. */
.analysis-callout {
  container-type: inline-size;
  margin-top: 16px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--cream-deep);
}

.analysis-callout h4 {
  font-size: 17px;
}

.analysis-callout__sides {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 12px 0 0;
}

.analysis-callout dt {
  color: var(--forest);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
}

.analysis-callout dd {
  margin: 4px 0 0;
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.5;
}

.analysis-card .analysis-callout__takeaway {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--line-strong);
  color: var(--forest);
  font-size: 14px;
  font-weight: 600;
}

@container (max-width: 300px) {
  .analysis-callout__sides {
    grid-template-columns: 1fr;
  }
}

.takeaway {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  margin-top: 14px;
  padding: 18px 20px;
  border-left: 3px solid var(--wheat);
  background: var(--wheat-tint);
}

.takeaway span {
  color: var(--wheat);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.takeaway p {
  color: var(--forest);
  font-weight: 600;
}

.significance {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(480px, 1.2fr);
  gap: clamp(24px, 4vw, 48px);
  align-items: center;
  margin-top: clamp(36px, 5vw, 56px);
  padding: clamp(24px, 4vw, 40px);
  border-radius: var(--radius);
  background: var(--sage-tint);
}

.significance__copy h3 {
  max-width: 18ch;
  margin-top: 8px;
  font-size: clamp(27px, 3vw, 38px);
}

.significance__copy > p:not(.section-kicker) {
  margin-top: 14px;
  color: var(--ink-soft);
}

.significance__source {
  font-size: 13px;
  font-style: italic;
}

.dashboard-note {
  max-width: 80ch;
  margin-top: 14px;
}

.placeholder {
  display: grid;
  min-height: 300px;
  place-items: center;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius);
  color: var(--ink-muted);
}

@media (max-width: 850px) {
  .navigation-steps,
  .analysis-grid,
  .significance,
  .metric-bands {
    grid-template-columns: 1fr;
  }

  .significance {
    padding: 22px;
  }

  .takeaway {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .metric-note {
    flex-direction: column;
    gap: 8px;
  }

  .metric-note span {
    flex-basis: auto;
    text-align: left;
  }
}

@media (min-width: 600px) and (max-width: 1050px) {
  .navigation-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
