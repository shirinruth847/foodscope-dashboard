<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import TableauEmbed from '../../components/TableauEmbed.vue'
import ImportQuiz from './ImportQuiz.vue'
import SupplierComparison from './SupplierComparison.vue'
import supplierData from './supplier-shares.json'
import { getSteps, SOURCE_NOTE } from './data.js'
import { createDashboardController } from './tableau.js'

defineProps({ dashboard: { type: Object, required: true } })

const steps = getSteps(supplierData)
const selection = ref({ commodity: steps[0].target[0], year: steps[0].target[1] })
const status = ref('Choose a step above; its selection will apply when the dashboard loads.')
const embedFailed = ref(false)
const quizSection = ref(null)
const storySection = ref(null)
const dashboardPanel = ref(null)
const comparisonSection = ref(null)
const activeStep = computed(() => steps.findIndex((step) => step.target[0] === selection.value.commodity && step.target[1] === selection.value.year))
const example = computed(() => steps[activeStep.value])
let controller = null

function scrollTo(element) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
}

function selectDashboard(commodity, year) {
  selection.value = { commodity, year: Number(year) }
  if (controller) void controller.setDashboard(commodity, year)
  else if (!embedFailed.value) status.value = 'Your selection is queued while Tableau loads.'
}

async function showDashboard(commodity, year) {
  selectDashboard(commodity, year)
  await nextTick()
  scrollTo(dashboardPanel.value)
}

function startStory() {
  selectDashboard(...steps[0].target)
  scrollTo(storySection.value)
}

function connectDashboard({ viz }) {
  controller?.destroy()
  embedFailed.value = false
  controller = createDashboardController(viz, {
    onStatus(state, applied) {
      if (state === 'manual') {
        if (applied.commodity && applied.year) selection.value = { commodity: applied.commodity, year: Number(applied.year) }
        status.value = 'Exploring freely. Choose a step above for a guided example.'
      } else {
        const messages = {
          ready: 'Ready. Choose a step above or explore the dashboard directly.',
          queued: 'Your selection is queued while Tableau loads.',
          updating: 'Updating the dashboard…',
          selected: 'Selection applied. Explore the map and charts below.',
          'selection-error': 'This selection could not be applied. Use the controls in Tableau or try another step.',
        }
        status.value = messages[state] ?? status.value
      }
    },
  })
  // Selections made in the quiz before the lazy embed loads are retained here.
  void controller.setDashboard(selection.value.commodity, selection.value.year)
}

function handleEmbedError() {
  controller?.destroy()
  controller = null
  embedFailed.value = true
  status.value = 'Tableau is unavailable. The quiz, explanations and comparison remain available.'
}

onBeforeUnmount(() => controller?.destroy())
</script>

<template>
  <main class="d4-story">
    <header id="overview" class="story-intro">
      <p class="breadcrumb"><RouterLink to="/dashboards">Explore Dashboards</RouterLink><span aria-hidden="true">/</span>Dashboard 04</p>
      <p class="eyebrow">Dashboard 04 · Follow the food</p>
      <h1>{{ dashboard.title }}</h1>
      <p class="lede">Follow Singapore’s imports, from familiar foods to surprising suppliers. Make three guesses, explore the map, then see what changed over time.</p>
      <nav class="journey-nav" aria-label="On this dashboard">
        <a href="#quiz" @click.prevent="scrollTo(quizSection)"><span>01</span> Guess first</a>
        <a href="#story" @click.prevent="startStory"><span>02</span> Follow the deliveries</a>
        <a href="#comparison" @click.prevent="scrollTo(comparisonSection)"><span>03</span> See what changed</a>
      </nav>
      <ul class="coverage" aria-label="Dashboard coverage"><li>7 foods</li><li>2010–2023</li><li>Singapore’s imports</li></ul>
    </header>

    <section id="quiz" ref="quizSection" class="story-section" aria-labelledby="quiz-title">
      <div class="section-heading">
        <div><p class="eyebrow">01 / A little food for thought</p><h2 id="quiz-title">Guess before you explore.</h2></div>
        <a href="#story" @click.prevent="startStory">Skip quiz ↓</a>
      </div>
      <ImportQuiz :data="supplierData" @select="showDashboard" @continue="startStory" />
    </section>

    <section id="story" ref="storySection" class="story-section" aria-labelledby="story-title">
      <div class="section-heading">
        <div><p class="eyebrow">02 / Follow the deliveries</p><h2 id="story-title">Many origins. A few big suppliers.</h2></div>
        <p class="section-note">Choose a step to update the explanation and dashboard together.</p>
      </div>
      <div class="story-steps" role="group" aria-label="Choose a food sourcing story">
        <button
          v-for="(step, index) in steps"
          :key="step.label"
          class="story-choice"
          type="button"
          :data-select-step="index"
          :aria-pressed="activeStep === index"
          aria-controls="story-explanation"
          @click="selectDashboard(...step.target)"
        ><span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span><span>{{ step.label }}</span></button>
      </div>
      <div id="story-explanation" class="story-explanation" aria-live="polite" aria-atomic="true">
        <template v-if="example">
          <h3>{{ example.title }}</h3>
          <!-- This HTML is controlled narrative copy with numeric values from our data. -->
          <p v-html="example.text" />
          <p class="step-target">{{ selection.commodity }} · {{ selection.year }}</p>
        </template>
        <template v-else>
          <h3>Exploring {{ selection.commodity.toLowerCase() }} imports</h3>
          <p>You’re viewing {{ selection.commodity.toLowerCase() }} imports in {{ selection.year }}. Choose a step above for a guided example.</p>
        </template>
      </div>
      <div id="dashboard-panel" ref="dashboardPanel" class="dashboard-panel">
        <div class="dashboard-heading">
          <div><p class="eyebrow">Explore the evidence</p><p id="dashboard-selection">{{ selection.commodity }} · {{ selection.year }}</p></div>
          <a href="#quiz" @click.prevent="scrollTo(quizSection)">Back to quiz ↑</a>
        </div>
        <p id="dashboard-status" class="dashboard-status" role="status" aria-live="polite">{{ status }}</p>
        <TableauEmbed
          :src="dashboard.src"
          :height="dashboard.height"
          :width="dashboard.width"
          :mobile-height="dashboard.mobileHeight"
          :title="dashboard.title"
          @load="connectDashboard"
          @error="handleEmbedError"
        />
      </div>
      <p class="story-takeaway">Count the suppliers, but check their shares too. <a href="#comparison" @click.prevent="scrollTo(comparisonSection)">See which foods became less dependent on one supplier ↓</a></p>
      <p class="source-note">{{ SOURCE_NOTE }}</p>
    </section>

    <section id="comparison" ref="comparisonSection" class="story-section" aria-labelledby="comparison-title">
      <div class="section-heading"><div><p class="eyebrow">03 / The longer view</p><h2 id="comparison-title">Which foods became less dependent on one supplier?</h2></div></div>
      <SupplierComparison :data="supplierData" @select="showDashboard" />
    </section>
  </main>
</template>

<style scoped>
.d4-story {
  --d4-correct: #2e7d32;
  --d4-correct-tint: #edf5eb;
  --d4-wrong: #a93632;
  --d4-wrong-tint: #fbeceb;
  --d4-diversified: #2e7d32;
  --d4-concentrated: #e07b00;
  --d4-unchanged: #757575;
  --d4-2010: #b4b5af;
  --d4-supplier-1: #234f40;
  --d4-supplier-2: #547c89;
  --d4-supplier-3: #a68343;
  --d4-supplier-other: #a6aaa2;
  width: 100%;
  min-width: 0;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 48px) var(--gutter) 72px;
}
.story-intro { padding-block: 12px 30px; border-bottom: 1px solid var(--line-strong); }
.breadcrumb { display: flex; gap: 8px; margin-bottom: 22px; color: var(--ink-muted); font-size: 14px; }
.breadcrumb a { color: var(--ink-soft); text-decoration: none; }
.eyebrow { margin-bottom: 10px; color: var(--wheat); font-size: 11px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; }
h1 { max-width: 24ch; font-size: clamp(36px, 4.7vw, 68px); }
.lede { max-width: 66ch; margin-top: 24px; color: var(--ink-soft); font-size: 21px; }
.journey-nav { display: flex; flex-wrap: wrap; gap: 12px 28px; margin-top: 30px; }
.journey-nav a { text-decoration: none; border-bottom: 1px solid var(--line); padding-block: 5px; }
.journey-nav span { margin-right: 6px; color: var(--wheat); font-size: 12px; }
.coverage { display: flex; flex-wrap: wrap; gap: 10px 24px; margin: 24px 0 0; padding: 0; list-style: none; color: var(--ink-soft); font-size: 13px; }
.story-section { padding-top: clamp(44px, 6vw, 72px); scroll-margin-top: 20px; }
.section-heading { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 25px; }
h2 { font-size: clamp(29px, 3vw, 42px); }
.section-note { max-width: 34ch; color: var(--ink-soft); font-size: 15px; }
.story-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 12px; }
.story-choice { display: flex; align-items: center; gap: 12px; padding: 15px 18px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: var(--paper); color: var(--forest); font: inherit; text-align: left; cursor: pointer; }
.story-choice[aria-pressed="true"] { border-color: var(--forest); background: var(--forest); color: #fff; }
.story-choice span:first-child { font-size: 12px; opacity: .8; }
.story-explanation { padding: 22px 25px; margin-bottom: 20px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: var(--paper); }
.story-explanation h3 { margin-bottom: 10px; font-size: 26px; }
.story-explanation p { max-width: 90ch; }
.step-target { margin-top: 12px; color: var(--ink-soft); font-size: 13px; }
.dashboard-panel { min-width: 0; margin-bottom: 28px; }
.dashboard-heading { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 12px 18px; border: 1px solid var(--line); border-radius: var(--radius-sm) var(--radius-sm) 0 0; background: var(--paper); }
.dashboard-heading .eyebrow { margin-bottom: 2px; }
.dashboard-heading a { font-size: 12px; }
#dashboard-selection { font-size: 15px; }
.dashboard-status { padding: 8px 18px; min-height: 36px; color: var(--ink-soft); font-size: 12px; }
.story-takeaway { margin-bottom: 20px; color: var(--ink-soft); }
.story-takeaway a { display: inline-block; }
.source-note { color: var(--ink-soft); font-size: 12px; }
@media (max-width: 599px) {
  .lede { font-size: 18px; }
  .section-heading { align-items: start; flex-wrap: wrap; gap: 15px; }
  .story-steps { grid-template-columns: minmax(0, 1fr); }
  .story-choice { padding: 10px 15px; }
  .story-explanation { padding: 20px; }
  .dashboard-heading { flex-wrap: wrap; }
}
</style>
