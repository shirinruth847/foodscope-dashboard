<script setup>
import * as d3 from 'd3'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const chartHost = ref(null)
const activeCategory = ref(null)

const data = [
  { category: 'Vegetable oils', value: 46, color: '#b08a3e' },
  { category: 'Fish & seafood', value: 34, color: '#6f8f72' },
  { category: 'Pulses', value: 26, color: '#8fa78d' },
  { category: 'Cereals', value: 20, color: '#c9a967' },
]

let resizeObserver

function renderChart() {
  if (!chartHost.value) return

  const host = d3.select(chartHost.value)
  const width = chartHost.value.clientWidth
  // ResizeObserver can fire while the responsive grid is between layouts.
  // Wait for a usable width rather than drawing negative-width bars.
  if (width < 260) return

  host.selectAll('*').remove()

  const height = Math.max(280, Math.min(390, width * 0.62))
  const margin = { top: 18, right: 28, bottom: 42, left: 124 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const svg = host
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img')
    .attr('aria-labelledby', 'trade-chart-title trade-chart-desc')

  svg.append('title').attr('id', 'trade-chart-title').text('Global food production exported in 2023')
  svg
    .append('desc')
    .attr('id', 'trade-chart-desc')
    .text('Horizontal bars show the percentage of each food category production that was exported in 2023.')

  const x = d3.scaleLinear().domain([0, 50]).range([0, innerWidth])
  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, innerHeight])
    .padding(0.35)

  const plot = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  plot
    .append('g')
    .attr('class', 'trade-chart__grid')
    .call(
      d3
        .axisBottom(x)
        .tickValues([0, 10, 20, 30, 40, 50])
        .tickSize(innerHeight)
        .tickFormat(''),
    )
    .call((g) => g.select('.domain').remove())

  plot
    .append('g')
    .attr('class', 'trade-chart__axis')
    .call(d3.axisLeft(y).tickSize(0))
    .call((g) => g.select('.domain').remove())

  const bars = plot
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('class', 'trade-chart__bar')
    .attr('x', 0)
    .attr('y', (d) => y(d.category))
    .attr('width', (d) => x(d.value))
    .attr('height', y.bandwidth())
    .attr('rx', 4)
    .attr('fill', (d) => d.color)
    .attr('opacity', (d) => (!activeCategory.value || activeCategory.value === d.category ? 1 : 0.28))
    .on('mouseenter', (_, d) => {
      activeCategory.value = d.category
      bars.attr('opacity', (item) => (item.category === d.category ? 1 : 0.28))
    })
    .on('mouseleave', () => {
      activeCategory.value = null
      bars.attr('opacity', 1)
    })

  plot
    .selectAll('.trade-chart__value')
    .data(data)
    .join('text')
    .attr('class', 'trade-chart__value')
    .attr('x', (d) => x(d.value) + 8)
    .attr('y', (d) => y(d.category) + y.bandwidth() / 2)
    .attr('dominant-baseline', 'middle')
    .text((d) => `${d.value}%`)
}

onMounted(() => {
  renderChart()
  resizeObserver = new ResizeObserver(renderChart)
  resizeObserver.observe(chartHost.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div ref="chartHost" class="trade-chart" aria-label="Interactive chart of exported food production" />
  <p class="trade-chart__note">Hover over a bar to isolate a food group.</p>
</template>

<style scoped>
.trade-chart {
  width: 100%;
  min-height: 280px;
}

.trade-chart :deep(.trade-chart__grid line) {
  stroke: var(--line);
  stroke-dasharray: 2 4;
}

.trade-chart :deep(.trade-chart__axis text),
.trade-chart :deep(.trade-chart__value) {
  fill: var(--ink-soft);
  font-family: var(--font-body);
  font-size: 13px;
}

.trade-chart :deep(.trade-chart__value) {
  fill: var(--forest);
  font-weight: 600;
}

.trade-chart__note {
  margin-top: 4px;
  color: var(--ink-muted);
  font-size: 13px;
}
</style>
