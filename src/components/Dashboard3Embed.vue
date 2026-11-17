<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ChernoffFaces from './ChernoffFaces.vue'
import FaceKey from './FaceKey.vue'

const country = ref('Bulgaria')   // fallback until the viz reports p_Country
const year = ref(2023)
const hl = ref(null)
let viz = null, timer = null

function applyParam(p) {
  if (p.name === 'p_Country') country.value = String(p.currentValue.value)
  if (p.name === 'p_Year') year.value = Number(p.currentValue.value)
}
async function readParams() {
  const params = await viz.workbook.getParametersAsync()
  params.forEach(applyParam)
}
async function onParamChanged(e) { applyParam(await e.detail.getParameterAsync()) }
async function onMarksSelected(e) {
  const marks = await e.detail.getMarksAsync()
  const t = marks.data[0]
  if (!t || !t.data.length) return
  const i = t.columns.findIndex(c => c.fieldName === 'Area')
  if (i < 0) return
  country.value = String(t.data[0][i].value)
}

function attach(v) {
  viz = v
  v.addEventListener('firstinteractive', readParams)
  v.addEventListener('parameterchanged', onParamChanged)
  v.addEventListener('markselectionchanged', onMarksSelected)
  if (v.workbook) readParams()   // already loaded before we attached
}

onMounted(() => {
  let tries = 0
  timer = setInterval(() => {
    const v = document.querySelector('tableau-viz')
    if (v) { clearInterval(timer); attach(v) }
    else if (++tries > 50) clearInterval(timer)
  }, 200)
})
onBeforeUnmount(() => {
  clearInterval(timer)
  if (!viz) return
  viz.removeEventListener('firstinteractive', readParams)
  viz.removeEventListener('parameterchanged', onParamChanged)
  viz.removeEventListener('markselectionchanged', onMarksSelected)
})
</script>

<template>
  <div :class="['glance', hl && 'hl-' + hl]">
    <div class="glance__grid">
      <ChernoffFaces :country="country" :year="year" />
      <FaceKey @hl="hl = $event" />
    </div>
    <p class="glance__note">
      The scale is logarithmic and stops at ¼× and 4× the median, and missing
      food groups are drawn as the median. Use the table above for exact values.
    </p>
  </div>
</template>

<style scoped>
.glance__lede, .glance__note { max-width: 760px; color: var(--ink-soft); font-size: 15px; line-height: 1.5 }
.glance__grid {
  display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(20px, 3vw, 40px); align-items: start; margin: 18px 0;
}
@media (max-width: 850px) { .glance__grid { grid-template-columns: 1fr } }
</style>

