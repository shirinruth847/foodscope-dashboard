<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'choropleth', validator: v => ['choropleth', 'scatter', 'line', 'bar', 'stacked', 'heatmap'].includes(v) },
  title: { type: String, default: '' },
  width: { type: Number, default: 640 },
  height: { type: Number, default: 420 },
  animate: { type: Boolean, default: true },
})

const containerRef = ref(null)
let animationId = null
let animationTime = 0

const colors = {
  forest: '#2D3B12',
  forestLight: '#3A4A16',
  olive: '#3D4A14',
  oliveSoft: '#5A6B2A',
  oliveMuted: '#7A8A4A',
  oliveFaint: '#A8B47A',
  cream: '#FEFDF5',
  creamMuted: '#FAF9EF',
  creamDark: '#E8E5D4',
  white: '#FFFFFF',
  gold: '#C8963E',
  emerald: '#2E8B57',
  sky: '#1A7A9E',
  terracotta: '#B85C3A',
  amber: '#D4A042',
  sage: '#5A8A5A',
}

const palette = [
  colors.forest,
  colors.olive,
  colors.gold,
  colors.emerald,
  colors.sky,
  colors.terracotta,
  colors.amber,
]

function drawChoropleth(ctx, w, h, t) {
  const countries = generateCountries(w, h)
  countries.forEach((c, i) => {
    const val = 0.25 + 0.75 * Math.sin(t * 0.0008 + i * 0.6) * 0.5 + 0.5
    const color = interpolateColor(colors.creamMuted, colors.forest, val)
    drawCountry(ctx, c, color)
  })
}

function drawScatter(ctx, w, h, t) {
  const padding = 64
  const plotW = w - padding * 2
  const plotH = h - padding * 2
  const points = generateScatterPoints(100)
  
  // Axes
  ctx.strokeStyle = colors.oliveFaint + '88'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, h - padding)
  ctx.lineTo(w - padding, h - padding)
  ctx.stroke()
  
  // Axis labels
  ctx.fillStyle = colors.oliveSoft
  ctx.font = '500 11px Montserrat'
  ctx.textAlign = 'center'
  ctx.fillText('Self-Sufficiency Ratio (%)', w / 2, h - 14)
  ctx.save()
  ctx.translate(22, h / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Food Supply (kcal/capita/day)', 0, 0)
  ctx.restore()
  
  // Grid
  ctx.strokeStyle = colors.oliveFaint + '44'
  ctx.lineWidth = 0.5
  for (let i = 1; i < 5; i++) {
    const x = padding + (plotW / 5) * i
    const y = padding + (plotH / 5) * i
    ctx.beginPath(); ctx.moveTo(x, padding); ctx.lineTo(x, h - padding); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(padding, y); ctx.lineTo(w - padding, y); ctx.stroke()
  }
  
  // Points
  points.forEach(p => {
    const x = padding + p.x * plotW
    const y = h - padding - p.y * plotH
    const r = 2.5 + p.size * 5
    const pulse = props.animate ? 1 + 0.12 * Math.sin(t * 0.0025 + p.phase) : 1
    ctx.beginPath()
    ctx.arc(x, y, r * pulse, 0, Math.PI * 2)
    ctx.fillStyle = p.color + (p.highlight ? 'DD' : '99')
    ctx.fill()
    ctx.strokeStyle = colors.white
    ctx.lineWidth = 0.75
    ctx.stroke()
  })
  
  // Trend line
  ctx.strokeStyle = colors.gold
  ctx.lineWidth = 2
  ctx.setLineDash([6, 6])
  ctx.beginPath()
  ctx.moveTo(padding, h - padding - 0.35 * plotH)
  ctx.lineTo(w - padding, h - padding - 0.65 * plotH)
  ctx.stroke()
  ctx.setLineDash([])
}

function drawLine(ctx, w, h, t) {
  const padding = 64
  const plotW = w - padding * 2
  const plotH = h - padding * 2
  const series = generateLineSeries(5, 14)
  
  // Axes
  ctx.strokeStyle = colors.oliveFaint + '88'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, h - padding)
  ctx.lineTo(w - padding, h - padding)
  ctx.stroke()
  
  // Grid
  ctx.strokeStyle = colors.oliveFaint + '44'
  ctx.lineWidth = 0.5
  for (let i = 1; i < 5; i++) {
    const y = padding + (plotH / 5) * i
    ctx.beginPath(); ctx.moveTo(padding, y); ctx.lineTo(w - padding, y); ctx.stroke()
  }
  for (let i = 1; i < 14; i++) {
    const x = padding + (plotW / 13) * i
    ctx.beginPath(); ctx.moveTo(x, padding); ctx.lineTo(x, h - padding); ctx.stroke()
  }
  
  series.forEach((s, si) => {
    ctx.strokeStyle = s.color
    ctx.lineWidth = si === 0 ? 2.5 : 1.5
    ctx.globalAlpha = si === 0 ? 1 : 0.65
    ctx.beginPath()
    s.data.forEach((d, i) => {
      const x = padding + (i / (s.data.length - 1)) * plotW
      const y = h - padding - d * plotH
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()
    
    // Animated dot on latest point for primary series
    if (props.animate && si === 0) {
      const latest = s.data[s.data.length - 1]
      const x = padding + plotW
      const y = h - padding - latest * plotH
      const pulse = 3.5 + 1.5 * Math.sin(t * 0.0035)
      ctx.beginPath()
      ctx.arc(x, y, pulse, 0, Math.PI * 2)
      ctx.fillStyle = s.color
      ctx.fill()
      ctx.strokeStyle = colors.white
      ctx.lineWidth = 1.5
      ctx.stroke()
    }
  })
  ctx.globalAlpha = 1
  
  // Year labels
  ctx.fillStyle = colors.oliveSoft
  ctx.font = '500 10px Montserrat'
  ctx.textAlign = 'center'
  const years = ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2023']
  years.forEach((y, i) => {
    const x = padding + (plotW / (years.length - 1)) * i
    ctx.fillText(y, x, h - padding + 18)
  })
}

function drawBar(ctx, w, h, t) {
  const padding = 72
  const plotW = w - padding * 2
  const plotH = h - padding * 2
  const categories = ['Cereals', 'Veg Oils', 'Fish & Seafood', 'Pulses', 'Meat', 'Dairy', 'Fruits', 'Vegetables']
  const values = categories.map((_, i) => 0.18 + 0.82 * Math.sin(t * 0.0009 + i * 0.8) * 0.5 + 0.5)
  const barW = plotW / categories.length * 0.65
  const gap = plotW / categories.length * 0.35
  
  // Axes
  ctx.strokeStyle = colors.oliveFaint + '88'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, h - padding)
  ctx.lineTo(w - padding, h - padding)
  ctx.stroke()
  
  // Bars
  categories.forEach((cat, i) => {
    const x = padding + gap / 2 + i * (barW + gap)
    const val = values[i]
    const barH = val * plotH
    const y = h - padding - barH
    
    // Bar gradient
    const grad = ctx.createLinearGradient(x, y, x, y + barH)
    grad.addColorStop(0, palette[i % palette.length])
    grad.addColorStop(1, palette[i % palette.length] + '99')
    ctx.fillStyle = grad
    ctx.fillRect(x, y, barW, barH)
    
    // Value label
    ctx.fillStyle = colors.olive
    ctx.font = '600 10px Montserrat'
    ctx.textAlign = 'center'
    ctx.fillText((val * 100).toFixed(0) + '%', x + barW / 2, y - 6)
    
    // Category label
    ctx.fillStyle = colors.oliveSoft
    ctx.font = '400 10px Montserrat'
    ctx.fillText(cat, x + barW / 2, h - padding + 16)
  })
}

function drawStacked(ctx, w, h, t) {
  const padding = 72
  const plotW = w - padding * 2
  const plotH = h - padding * 2
  const years = ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2023']
  const categories = ['Production', 'Imports', 'Exports', 'Stock Change']
  const catColors = [colors.forest, colors.emerald, colors.sky, colors.gold]
  
  // Axes
  ctx.strokeStyle = colors.oliveFaint + '88'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, h - padding)
  ctx.lineTo(w - padding, h - padding)
  ctx.stroke()
  
  const barW = plotW / years.length * 0.65
  const gap = plotW / years.length * 0.35
  
  years.forEach((year, yi) => {
    const x = padding + gap / 2 + yi * (barW + gap)
    let yBase = h - padding
    const data = categories.map((_, ci) => 0.12 + 0.38 * Math.sin(t * 0.0008 + yi + ci * 1.2) * 0.5 + 0.5)
    const total = data.reduce((a, b) => a + b, 0)
    const norm = data.map(d => d / total)
    
    norm.forEach((val, ci) => {
      const barH = val * plotH
      const y = yBase - barH
      ctx.fillStyle = catColors[ci] + 'DD'
      ctx.fillRect(x, y, barW, barH)
      yBase = y
    })
    
    ctx.fillStyle = colors.oliveSoft
    ctx.font = '400 10px Montserrat'
    ctx.textAlign = 'center'
    ctx.fillText(year, x + barW / 2, h - padding + 16)
  })
  
  // Legend
  categories.forEach((cat, i) => {
    const lx = w - 180
    const ly = padding + i * 20
    ctx.fillStyle = catColors[i] + 'DD'
    ctx.fillRect(lx, ly, 12, 12)
    ctx.fillStyle = colors.olive
    ctx.font = '500 11px Montserrat'
    ctx.textAlign = 'left'
    ctx.fillText(cat, lx + 18, ly + 10)
  })
}

function drawHeatmap(ctx, w, h, t) {
  const padding = 72
  const plotW = w - padding * 2
  const plotH = h - padding * 2
  const rows = 12
  const cols = 14
  const cellW = plotW / cols
  const cellH = plotH / rows
  const foods = ['Cereals', 'Veg Oils', 'Fish', 'Pulses', 'Meat', 'Dairy', 'Eggs', 'Fruits', 'Veg', 'Sugar', 'Roots', 'Other']
  const years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
  
  // Y-axis labels
  ctx.fillStyle = colors.oliveSoft
  ctx.font = '400 10px Montserrat'
  ctx.textAlign = 'right'
  foods.forEach((f, i) => {
    ctx.fillText(f, padding - 10, padding + (i + 0.5) * cellH + 3)
  })
  
  // X-axis labels
  ctx.textAlign = 'center'
  years.forEach((y, i) => {
    if (i % 2 === 0) ctx.fillText(y, padding + (i + 0.5) * cellW, h - padding + 16)
  })
  
  // Cells with smooth color interpolation
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = 0.08 + 0.92 * Math.sin(t * 0.0004 + r * 0.6 + c * 0.4) * 0.5 + 0.5
      const x = padding + c * cellW
      const y = padding + r * cellH
      // Green to gold gradient
      const rVal = Math.round(45 + val * 160)
      const gVal = Math.round(75 + val * 120)
      const bVal = Math.round(20 + val * 30)
      ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`
      ctx.fillRect(x, y, cellW - 0.5, cellH - 0.5)
    }
  }
}

function generateCountries(w, h) {
  const countries = []
  const cols = 14
  const rows = 9
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.12) {
        const cx = (c + 0.5) * w / cols
        const cy = (r + 0.5) * h / rows
        const rx = w / cols * 0.3
        const ry = h / rows * 0.3
        const points = []
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2
          const rr = rx * (0.65 + Math.random() * 0.35)
          const rry = ry * (0.65 + Math.random() * 0.35)
          points.push({ x: cx + Math.cos(angle) * rr, y: cy + Math.sin(angle) * rry })
        }
        countries.push(points)
      }
    }
  }
  return countries
}

function generateScatterPoints(n) {
  const points = []
  for (let i = 0; i < n; i++) {
    const x = Math.random()
    const y = 0.25 + 0.55 * x + (Math.random() - 0.5) * 0.35
    const clampedY = Math.max(0.05, Math.min(0.95, y))
    points.push({
      x,
      y: clampedY,
      size: Math.random(),
      color: palette[Math.floor(Math.random() * palette.length)],
      phase: Math.random() * Math.PI * 2,
      highlight: Math.random() > 0.92,
    })
  }
  return points
}

function generateLineSeries(n, points) {
  return Array.from({ length: n }, (_, si) => ({
    color: palette[si % palette.length],
    data: Array.from({ length: points }, () => 0.25 + Math.random() * 0.55).map((v, i, arr) => i > 0 ? arr[i-1] * 0.65 + v * 0.35 : v)
  }))
}

function drawCountry(ctx, points, color) {
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.strokeStyle = colors.oliveFaint + '55'
  ctx.lineWidth = 0.4
  ctx.stroke()
}

function interpolateColor(c1, c2, t) {
  const hex1 = c1.replace('#', '')
  const hex2 = c2.replace('#', '')
  const r1 = parseInt(hex1.slice(0, 2), 16)
  const g1 = parseInt(hex1.slice(2, 4), 16)
  const b1 = parseInt(hex1.slice(4, 6), 16)
  const r2 = parseInt(hex2.slice(0, 2), 16)
  const g2 = parseInt(hex2.slice(2, 4), 16)
  const b2 = parseInt(hex2.slice(4, 6), 16)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function animate() {
  if (!containerRef.value) return
  const canvas = containerRef.value
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const w = props.width
  const h = props.height
  
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  ctx.scale(dpr, dpr)
  
  // Clear with page background
  ctx.fillStyle = colors.cream
  ctx.fillRect(0, 0, w, h)
  
  // Draw based on type
  switch (props.type) {
    case 'choropleth': drawChoropleth(ctx, w, h, animationTime); break
    case 'scatter': drawScatter(ctx, w, h, animationTime); break
    case 'line': drawLine(ctx, w, h, animationTime); break
    case 'bar': drawBar(ctx, w, h, animationTime); break
    case 'stacked': drawStacked(ctx, w, h, animationTime); break
    case 'heatmap': drawHeatmap(ctx, w, h, animationTime); break
  }
  
  animationTime += 16
  if (props.animate) animationId = requestAnimationFrame(animate)
}

onMounted(() => { animate() })
onBeforeUnmount(() => { if (animationId) cancelAnimationFrame(animationId) })
</script>

<template>
  <div class="fake-viz" role="img" :aria-label="title || 'Data visualization'">
    <canvas ref="containerRef" :width="width" :height="height"></canvas>
    <div v-if="title" class="fake-viz__title">{{ title }}</div>
    <div class="fake-viz__badge">Demo Data</div>
  </div>
</template>

<style scoped>
.fake-viz {
  position: relative;
  width: 100%;
  max-width: 100%;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xs);
}
.fake-viz canvas {
  display: block;
  width: 100%;
  height: auto;
}
.fake-viz__title {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-forest);
  z-index: 1;
  opacity: 0.8;
}
.fake-viz__badge {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-olive-muted);
  background: var(--color-cream-muted);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-pill);
  padding: var(--space-1) var(--space-2);
  z-index: 1;
}
</style>