<script setup>
import { computed } from 'vue'
import Card from './Card.vue'
import RingGauge from './RingGauge.vue'
import IconButton from './IconButton.vue'
import Button from './Button.vue'

const props = defineProps({
  crop: { type: String, default: 'wheat', validator: v => ['wheat', 'sprout', 'rooftop', 'globe'].includes(v) },
  gauges: { type: Array, default: () => [] },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  prevRoute: { type: Object, default: () => ({}) },
  nextRoute: { type: Object, default: () => ({}) },
  primaryAction: { type: Object, default: () => ({}) },
  collapsed: { type: Boolean, default: false },
})

const gaugeColors = ['amber', 'sky', 'cyan']

function renderCropIllustration(crop) {
  const illustrations = {
    wheat: `
      <svg viewBox="0 0 200 200" class="crop-svg" aria-hidden="true">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" stitchTiles="stitch"/>
            <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <ellipse cx="100" cy="160" rx="80" ry="20" fill="var(--color-bg-accent)"/>
        <g filter="url(#grain)">
          <path d="M100 140 Q80 80 70 40 Q75 60 90 80 Q105 60 110 80 Q100 40 90 40 Q80 80 100 140" fill="var(--color-brand-700)"/>
          <path d="M100 140 Q110 90 120 50 Q115 70 100 90 Q85 70 90 90 Q100 50 110 50 Q120 90 100 140" fill="var(--color-brand-600)"/>
          <path d="M100 140 Q95 100 90 60 Q95 80 100 100 Q105 80 110 100 Q110 60 105 100 Q100 100 100 140" fill="var(--color-accent-600)"/>
        </g>
      </svg>
    `,
    sprout: `
      <svg viewBox="0 0 200 200" class="crop-svg" aria-hidden="true">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" stitchTiles="stitch"/>
            <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <ellipse cx="100" cy="160" rx="80" ry="20" fill="var(--color-bg-accent)"/>
        <g filter="url(#grain)">
          <path d="M100 140 Q90 80 85 40 Q95 60 100 80 Q105 60 110 80 Q105 40 100 40 Q90 80 100 140" fill="var(--color-brand-600)"/>
          <path d="M100 140 Q105 90 110 50 Q105 70 100 90 Q95 70 95 90 Q100 50 95 50 Q90 90 100 140" fill="var(--color-brand-700)"/>
        </g>
      </svg>
    `,
    rooftop: `
      <svg viewBox="0 0 200 200" class="crop-svg" aria-hidden="true">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" stitchTiles="stitch"/>
            <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <ellipse cx="100" cy="160" rx="80" ry="20" fill="var(--color-bg-accent)"/>
        <g filter="url(#grain)">
          <rect x="60" y="100" width="80" height="40" rx="4" fill="var(--color-accent-700)"/>
          <path d="M70 100 Q70 70 100 60 Q130 70 130 100" fill="var(--color-brand-600)"/>
          <circle cx="85" cy="115" r="8" fill="var(--color-accent-500)"/>
          <circle cx="115" cy="115" r="8" fill="var(--color-accent-500)"/>
        </g>
      </svg>
    `,
    globe: `
      <svg viewBox="0 0 200 200" class="crop-svg" aria-hidden="true">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" stitchTiles="stitch"/>
            <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <ellipse cx="100" cy="160" rx="80" ry="20" fill="var(--color-bg-accent)"/>
        <circle cx="100" cy="100" r="60" fill="var(--color-brand-900)"/>
        <g filter="url(#grain)">
          <path d="M100 40 Q130 70 130 100 Q130 130 100 160 Q70 130 70 100 Q70 70 100 40" fill="var(--color-brand-600)"/>
        </g>
        <circle cx="100" cy="100" r="60" stroke="var(--color-brand-600)" stroke-width="1" fill="none" opacity="0.3"/>
      </svg>
    `,
  }
  return illustrations[crop] || illustrations.wheat
}

const cropIllustration = computed(() => renderCropIllustration(props.crop))
</script>

<template>
<aside 
  v-show="!collapsed" 
  class="detail-panel" 
  :class="{ 'detail-panel--collapsed': collapsed }"
  aria-label="Detail panel"
>
  <!-- Crop Illustration -->
  <div class="detail-panel__illustration">
    <div v-html="cropIllustration" class="crop-illustration-wrapper" />
  </div>

  <!-- Ring Gauges -->
  <div v-if="gauges.length" class="detail-panel__gauges">
    <RingGauge
      v-for="(gauge, i) in gauges"
      :key="gauge.label"
      :value="gauge.value"
      :label="gauge.label"
      :color="gauge.color || gaugeColors[i % gaugeColors.length]"
      :size="80"
      :stroke-width="5"
    />
  </div>

  <!-- Crop Info -->
  <div class="detail-panel__info">
    <h3 v-if="title" class="detail-panel__title">{{ title }}</h3>
    <p v-if="description" class="detail-panel__description">{{ description }}</p>
  </div>

  <!-- Action Row -->
  <div class="detail-panel__actions">
    <IconButton
      v-if="prevRoute.path"
      :href="prevRoute.path"
      :aria-label="`Previous: ${prevRoute.label}`"
      variant="outline"
      size="md"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </IconButton>

    <Button
      v-if="primaryAction.label"
      :variant="primaryAction.variant || 'primary'"
      :size="'lg'"
      :href="primaryAction.href"
      :disabled="primaryAction.disabled"
      @click="primaryAction.handler"
      class="detail-panel__primary-btn"
    >
      {{ primaryAction.label }}
    </Button>

    <IconButton
      v-if="nextRoute.path"
      :href="nextRoute.path"
      :aria-label="`Next: ${nextRoute.label}`"
      variant="outline"
      size="md"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </IconButton>
  </div>
</aside>
</template>

<style scoped>
.detail-panel {
  flex: 0 0 380px;
  background: var(--color-bg-elevated);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: var(--space-6);
  gap: var(--space-6);
  transition: width var(--transition-base), opacity var(--transition-base);
  box-shadow: var(--shadow-inner);
}
.detail-panel--collapsed { display: none; }

.detail-panel__illustration {
  display: flex;
  justify-content: center;
  padding: var(--space-4) 0;
}
.crop-illustration-wrapper { width: 100%; max-width: 280px; }
.crop-svg { width: 100%; max-width: 280px; height: auto; }

.detail-panel__gauges {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
  padding: var(--space-2) 0;
}

.detail-panel__info { padding-top: var(--space-2); }
.detail-panel__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-3);
  color: var(--color-text);
  letter-spacing: -0.01em;
}
.detail-panel__description {
  margin: 0;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  max-width: 340px;
}

.detail-panel__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}
.detail-panel__primary-btn { flex: 1; max-width: 220px; }

@media (max-width: 899px) {
  .detail-panel {
    position: static;
    flex: none;
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--color-border);
    padding: var(--space-5);
  }
  .detail-panel__gauges { gap: var(--space-3); }
}
</style>