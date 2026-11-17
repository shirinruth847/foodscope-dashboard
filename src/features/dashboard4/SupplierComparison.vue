<script setup>
import { computed, ref } from 'vue'
import { compareSuppliers, formatShare, SOURCE_NOTE } from './data.js'

const props = defineProps({ data: { type: Object, required: true } })
const emit = defineEmits(['select'])
const detail = ref('Select a food to follow its imports.')
const chartWidth = 1200
const chartHeight = 660
const plotLeft = 215
const plotWidth = 550
const ticks = [0, 25, 50, 75, 100]
const x = (share) => plotLeft + share * plotWidth
const colour = (row) => `var(--d4-${row.colour})`

const rows = computed(() => compareSuppliers(props.data).map((row, index) => {
  const y = 145 + index * 70
  const startX = x(row.before.share)
  const endX = x(row.after.share)
  const direction = Math.sign(endX - startX)
  // Short arrows sit below the dots so neither endpoint hides the arrowhead.
  const shortChange = Math.abs(endX - startX) < 36
  const arrowY = y + (shortChange ? 18 : 0)
  const tip = endX - (shortChange ? 0 : direction * 10)
  const base = tip - direction * 10
  const summary = `${row.commodity}: 2010, ${row.before.partner} ${formatShare(row.before.share)}%, ${row.before.count} suppliers; 2023, ${row.after.partner} ${formatShare(row.after.share)}%, ${row.after.count} suppliers. ${row.classification}.`
  const values = row.before.partner === row.after.partner
    ? `${formatShare(row.before.share)}% → ${formatShare(row.after.share)}%`
    : `${row.before.partner} ${formatShare(row.before.share)}% → ${row.after.partner} ${formatShare(row.after.share)}%`
  return {
    ...row, y, startX, endX, direction, shortChange, arrowY, base, summary, values,
    arrowHead: `M ${tip} ${arrowY} L ${base} ${arrowY - 7} L ${base} ${arrowY + 7} Z`,
    buttonStyle: { top: `${(y - 29) / chartHeight * 100}%`, height: `${60 / chartHeight * 100}%` },
  }
}))

const chartLabel = computed(() => `Largest supplier’s share of Singapore’s imports, 2010 versus 2023. ${rows.value.map((row) => `${row.commodity}: ${row.classification.toLowerCase()}`).join('; ')}.`)

function explore(row) {
  detail.value = row.summary
  emit('select', row.commodity, 2023)
}
</script>

<template>
  <div class="supplier-comparison">
    <p class="comparison-intro">Share of Singapore’s imports from its largest supplier, 2010 vs 2023.</p>
    <div class="chart-legend" aria-label="Chart key">
      <span><i class="legend-dot dot-2010" />2010</span>
      <span><i class="legend-dot dot-diversified" />2023 · More diversified</span>
      <span><i class="legend-dot dot-concentrated" />2023 · More concentrated</span>
      <span><i class="legend-dot dot-unchanged" />2023 · Little change</span>
    </div>
    <p class="chart-instruction">Hover or focus a row for details. Select it to explore that food on the dashboard. On small screens, swipe across the chart.</p>
    <div id="chart-region" class="chart-region" tabindex="0" role="region" aria-label="Supplier concentration chart; scroll horizontally if needed">
      <div class="chart-canvas">
        <svg :viewBox="`0 0 ${chartWidth} ${chartHeight}`" role="img" :aria-label="chartLabel">
          <text :x="plotLeft" y="34" font-size="15">Share of imports from the largest supplier</text>
          <text x="20" y="76" font-size="14">Food</text>
          <text x="805" y="76" font-size="14">2010 → 2023</text>
          <g v-for="tick in ticks" :key="tick">
            <line :x1="x(tick / 100)" y1="85" :x2="x(tick / 100)" y2="600" stroke="var(--line)" :stroke-dasharray="tick === 50 ? '5 5' : undefined" />
            <text :x="x(tick / 100)" y="76" text-anchor="middle" font-size="14">{{ tick }}%</text>
          </g>
          <text :x="x(0.5)" y="54" text-anchor="middle" font-size="12">Half from one supplier</text>
          <g v-for="row in rows" :key="row.commodity" class="comparison-row" :data-food="row.commodity">
            <line x1="18" :y1="row.y + 32" x2="1182" :y2="row.y + 32" stroke="var(--line)" />
            <text x="20" :y="row.y + 5" font-size="18">{{ row.commodity }}</text>
            <line :x1="row.startX" :y1="row.y" :x2="row.endX" :y2="row.y" :stroke="colour(row)" stroke-width="2.5" />
            <line v-if="row.shortChange && row.direction" :x1="row.startX" :y1="row.arrowY" :x2="row.base" :y2="row.arrowY" :stroke="colour(row)" stroke-width="2.5" />
            <path v-if="row.direction" class="change-arrow-head" :d="row.arrowHead" :fill="colour(row)" />
            <circle class="point-2010" :cx="row.startX" :cy="row.y" r="6" fill="var(--d4-2010)" />
            <circle class="point-2023" :cx="row.endX" :cy="row.y" r="7" :fill="colour(row)" stroke="var(--paper)" stroke-width="2" />
            <text x="805" :y="row.y - 3" font-size="16">{{ row.values }}</text>
            <text x="805" :y="row.y + 18" font-size="12">{{ row.classification }}</text>
          </g>
          <text :x="plotLeft" y="632" font-size="12">Arrows show 2010 → 2023. Short arrows sit below the dots. Select a row to explore its imports.</text>
        </svg>
        <button
          v-for="(row, index) in rows"
          :key="row.commodity"
          type="button"
          class="chart-row-button"
          :data-chart-row="index"
          :style="row.buttonStyle"
          :aria-label="`${row.summary} Show ${row.commodity} on the dashboard.`"
          :title="row.summary"
          @pointerenter="detail = row.summary"
          @focus="detail = row.summary"
          @click="explore(row)"
        ><span class="sr-only">Explore {{ row.commodity }}</span></button>
      </div>
    </div>
    <p id="chart-detail" class="chart-detail" aria-live="polite">{{ detail }}</p>
    <div class="sr-only">
      <table>
        <caption>Largest supplier’s share of Singapore’s imports, 2010 and 2023</caption>
        <thead><tr>
          <th scope="col">Commodity</th><th scope="col">2010 supplier</th><th scope="col">2010 share</th><th scope="col">2010 supplier count</th>
          <th scope="col">2023 supplier</th><th scope="col">2023 share</th><th scope="col">2023 supplier count</th><th scope="col">Change</th>
        </tr></thead>
        <tbody><tr v-for="row in rows" :key="row.commodity">
          <th scope="row">{{ row.commodity }}</th><td>{{ row.before.partner }}</td><td>{{ formatShare(row.before.share) }}%</td><td>{{ row.before.count }}</td>
          <td>{{ row.after.partner }}</td><td>{{ formatShare(row.after.share) }}%</td><td>{{ row.after.count }}</td><td>{{ row.classification }}</td>
        </tr></tbody>
      </table>
    </div>
    <p class="classification-note">“More diversified” means the largest supplier’s share fell by at least 5 percentage points; “more concentrated” means it rose by at least 5. Smaller changes are “little change”. This compares the largest share, not the full distribution of suppliers.</p>
    <p class="source-note">{{ SOURCE_NOTE }}</p>
  </div>
</template>

<style scoped>
.supplier-comparison { min-width: 0; }
.comparison-intro { color: var(--ink-soft); font-size: 19px; }
.chart-legend { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-block: 24px 12px; font-size: 13px; }
.legend-dot { display: inline-block; width: 11px; height: 11px; margin-right: 7px; border-radius: 50%; }
.dot-2010 { background: var(--d4-2010); }
.dot-diversified { background: var(--d4-diversified); }
.dot-concentrated { background: var(--d4-concentrated); }
.dot-unchanged { background: var(--d4-unchanged); }
.chart-instruction { color: var(--ink-soft); font-size: 13px; }
.chart-region { margin-top: 20px; overflow-x: auto; border: 1px solid var(--line); border-radius: var(--radius-sm); background: var(--paper); }
.chart-canvas { position: relative; min-width: 850px; }
svg { display: block; width: 100%; height: auto; font-family: inherit; }
svg text { fill: var(--ink); }
.chart-row-button { position: absolute; left: 0; width: 100%; border: 2px solid transparent; border-radius: 4px; background: transparent; padding: 0; cursor: pointer; }
.chart-row-button:hover { border-color: var(--line); background: rgb(31 61 43 / 3%); }
.chart-row-button:focus-visible { outline-offset: -4px; }
.chart-detail { min-height: 88px; padding: 18px; border-bottom: 1px solid var(--line); color: var(--forest); }
.classification-note { max-width: 95ch; margin-block: 20px; color: var(--ink-soft); font-size: 13px; }
.source-note { color: var(--ink-soft); font-size: 12px; }
</style>
