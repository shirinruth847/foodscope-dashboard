<script setup>
import * as d3 from 'd3'
import { ref, watch, onMounted } from 'vue'
import { FEATURE, toT, drawFace } from '../lib/chernoff'

const props = defineProps({ country: String, year: { type: Number, default: 2023 } })
const el = ref(null)
let rows = []

// Group names must match the CSV exactly
function render() {
  if (!rows.length || !props.country) return
  const yr = rows.filter(r => r.Year === props.year)
  const med = d3.rollup(yr, v => d3.median(v, d => d.ssr), d => d.D3_Group)
  const sel = new Map(yr.filter(r => r.Area === props.country).map(r => [r.D3_Group, r.ssr]))

  if (!sel.size) {
    d3.select(el.value).html(`<p>No data for ${props.country} in ${props.year}.</p>`)
    return
    }

  const medianFace = {}, countryFace = {}
  for (const [grp, key] of Object.entries(FEATURE)) {
    medianFace[key] = 0                                    // neutral by definition
    countryFace[key] = toT(sel.get(grp), med.get(grp))     // missing → neutral
  }

  const svg = d3.select(el.value).html('').append('svg').attr('viewBox', '0 0 520 260')
  drawFace(svg.append('g').attr('transform', 'translate(130,130)'), medianFace)
  drawFace(svg.append('g').attr('transform', 'translate(390,130)'), countryFace)
  svg.append('text').attr('x', 130).attr('y', 250).attr('text-anchor', 'middle').text('World median')
  svg.append('text').attr('x', 390).attr('y', 250).attr('text-anchor', 'middle').text(props.country)
}

onMounted(async () => {
  const raw = await d3.csv('/data/d3_group_ssr.csv')
  let area = '', grp = ''
  rows = raw.map(r => {
    const o = {}
    for (const k in r) o[k.replace(/^\uFEFF/, '').trim()] = String(r[k]).trim()
    // Tableau leaves repeated Area / D3_Group cells blank: fill down
    if (o.Area) area = o.Area; else o.Area = area
    if (o.D3_Group) grp = o.D3_Group; else o.D3_Group = grp
    return {
      Area: o.Area,
      D3_Group: o.D3_Group,
      Year: +o.Year.replace(/,/g, ''),
      ssr: +o.ssr.replace(/,/g, '')
    }
  })
  render()
})

// redraw whenever the selected country or year changes
watch(() => [props.country, props.year], render)
</script>

<template><div ref="el" class="faces"></div></template>

<style>
.head, .ear { fill: #f3e3c3; stroke: #333; stroke-width: 1.5 }
.eye { fill: #fff; stroke: #333 }
.pupil { fill: #333 }
.brow, .nose, .mouth { stroke: #333; stroke-width: 2; fill: none }
.faces svg { max-width: 520px; width: 100%; transition: all .3s }
</style>