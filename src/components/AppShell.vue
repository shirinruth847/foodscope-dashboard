<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarNav from './SidebarNav.vue'
import PageHeader from './PageHeader.vue'
import ToolbarPill from './ToolbarPill.vue'
import DetailPanel from './DetailPanel.vue'
import StatCard from './StatCard.vue'
import ChartCard from './ChartCard.vue'
import Button from './Button.vue'
import { SECTIONS } from '../content/site'

const route = useRoute()
const router = useRouter()

const detailCollapsed = ref(false)
const sidebarCollapsed = ref(false)
const screenWidth = ref(1024)

const currentSection = computed(() => SECTIONS.find(s => s.path === route.path) || SECTIONS[0])
const sectionIndex = computed(() => SECTIONS.findIndex(s => s.path === route.path))

const prevSection = computed(() => sectionIndex.value > 0 ? { ...SECTIONS[sectionIndex.value - 1], label: SECTIONS[sectionIndex.value - 1].navTitle } : null)
const nextSection = computed(() => sectionIndex.value < SECTIONS.length - 1 ? { ...SECTIONS[sectionIndex.value + 1], label: SECTIONS[sectionIndex.value + 1].navTitle } : null)

const gauges = computed(() => {
  const gaugeData = {
    intro: [
      { label: 'Countries', value: 178, color: 'amber' },
      { label: 'Years', value: 14, color: 'sky' },
      { label: 'Categories', value: 12, color: 'cyan' },
    ],
    'self-sufficiency': [
      { label: 'Self-Sufficiency', value: 67, color: 'amber' },
      { label: 'Import Dependency', value: 33, color: 'sky' },
      { label: 'Export Share', value: 22, color: 'cyan' },
    ],
    availability: [
      { label: 'Supply per Capita', value: 72, color: 'amber' },
      { label: 'Diversity Index', value: 58, color: 'sky' },
      { label: 'Stability Score', value: 64, color: 'cyan' },
    ],
    singapore: [
      { label: 'Local Fibre', value: 8, color: 'amber' },
      { label: 'Local Protein', value: 25, color: 'sky' },
      { label: 'Import Diversity', value: 91, color: 'cyan' },
    ],
    about: [
      { label: 'Data Sources', value: 3, color: 'amber' },
      { label: 'References', value: 6, color: 'sky' },
      { label: 'Team Members', value: 5, color: 'cyan' },
    ],
  }
  return gaugeData[currentSection.value.id] || []
})

const crop = computed(() => {
  const crops = {
    intro: 'sprout',
    'self-sufficiency': 'wheat',
    availability: 'wheat',
    singapore: 'rooftop',
    about: 'globe',
  }
  return crops[currentSection.value.id] || 'wheat'
})

const primaryAction = computed(() => ({
  label: nextSection.value ? `Next: ${nextSection.value.navTitle}` : 'View About',
  href: nextSection.value?.path || '/about',
  variant: 'primary',
}))

function toggleDetailPanel() {
  detailCollapsed.value = !detailCollapsed.value
}

function handleResize() {
  screenWidth.value = window.innerWidth
  if (window.innerWidth < 900) {
    detailCollapsed.value = true
  }
}

onMounted(() => {
  screenWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
  handleResize()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
<div class="app-shell">
  <a class="skip-link" href="#main">Skip to main content</a>
  <div class="bg-pattern" aria-hidden="true" />

  <!-- Sidebar -->
  <SidebarNav :collapsed="sidebarCollapsed" />

  <!-- Main Area -->
  <main id="main" class="app-main" :class="{ 'app-main--detail-collapsed': detailCollapsed }">
    <!-- Top Bar -->
    <header class="app-topbar">
      <div class="app-topbar__left">
        <Button
          variant="ghost"
          size="md"
          class="app-topbar__menu-btn"
          @click="sidebarCollapsed = !sidebarCollapsed"
          aria-label="Toggle menu"
          :aria-expanded="!sidebarCollapsed"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Button>
      </div>

      <div class="app-topbar__center">
        <PageHeader
          :title="currentSection.title"
          :subtitle="currentSection.subtitle"
          :breadcrumbs="[
            { label: 'FoodScope', path: '/' },
            { label: currentSection.navTitle, path: currentSection.path }
          ]"
        />
      </div>

      <div class="app-topbar__right">
        <ToolbarPill
          :search-enabled="true"
          :search-placeholder="'Search countries...'"
          @search="(q) => router.push(`/search?q=${encodeURIComponent(q)}`)"
          :notifications="[]"
          :user="{ name: 'G1T1', email: 'team@foodscope' }"
        />
      </div>
    </header>

    <!-- Content Area -->
    <div class="app-content">
      <div class="app-content__main">
        <!-- Stat Cards -->
        <div class="stat-cards">
          <StatCard
            v-for="(stat, i) in currentSection.stats"
            :key="i"
            :value="stat.value"
            :label="stat.label"
            :trend="stat.trend"
            :trend-up="stat.trendUp"
            :icon="stat.icon"
            :variant="stat.variant || 'default'"
          />
        </div>

        <!-- Section Heading + Status Pill -->
        <SectionHeading
          :title="currentSection.sectionTitle"
          :description="currentSection.sectionDescription"
          :action="currentSection.statusPill"
        />

        <!-- Main Content Card with Tableau -->
        <ChartCard
          :title="currentSection.vizTitle"
          :subtitle="currentSection.vizSubtitle"
          :src="currentSection.vizSrc"
          :height="currentSection.vizHeight"
          :loading="currentSection.vizLoading"
          :error="currentSection.vizError"
          :actions="currentSection.vizActions"
        >
          <template #actions>
            <Button
              v-for="action in currentSection.vizActions"
              :key="action.label"
              :variant="action.variant || 'ghost'"
              size="sm"
              @click="action.handler"
            >
              {{ action.label }}
            </Button>
          </template>
        </ChartCard>
      </div>

      <!-- Divider Chevron -->
      <Button
        v-if="screenWidth >= 900"
        class="divider-chevron"
        variant="outline"
        size="sm"
        :aria-expanded="!detailCollapsed"
        @click="toggleDetailPanel"
        aria-label="Toggle detail panel"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Button>

      <!-- Detail Panel -->
      <DetailPanel
        :crop="crop"
        :gauges="gauges"
        :title="currentSection.detailTitle"
        :description="currentSection.detailDescription"
        :prev-route="prevSection || {}"
        :next-route="nextSection || {}"
        :primary-action="primaryAction"
        :collapsed="detailCollapsed"
      />
    </div>
  </main>
</div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  background: var(--color-bg);
}
.bg-pattern { z-index: var(--z-bg); }

/* Sidebar positioning */
.sidebar-nav { z-index: var(--z-sticky); }

/* Main Area */
.app-main {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left var(--transition-base);
}
.app-main--detail-collapsed .detail-panel { display: none; }
.app-main--detail-collapsed .divider-chevron { display: none; }

/* Top Bar */
.app-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 var(--space-6);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
  gap: var(--space-4);
  position: sticky;
  top: 0;
  z-index: var(--z-header);
}
.app-topbar__left,
.app-topbar__right { flex-shrink: 0; }
.app-topbar__center { flex: 1; min-width: 0; }
.app-topbar__menu-btn { display: none; }

/* Content Layout */
.app-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.app-content__main { flex: 1; min-width: 0; padding: var(--space-8); overflow-y: auto; }

/* Stat Cards Grid */
.stat-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

/* Divider Chevron */
.divider-chevron {
  position: sticky;
  top: var(--space-8);
  right: var(--space-8);
  left: auto;
  align-self: flex-start;
  z-index: var(--z-sticky);
  margin-left: auto;
}

/* Responsive */
@media (max-width: 1279px) {
  .app-topbar__center { display: none; }
  .app-topbar__menu-btn { display: flex; }
  .sidebar-nav { transform: translateX(-100%); transition: transform var(--transition-base); }
  .sidebar-nav:not(.sidebar-nav--collapsed) { transform: translateX(0); }
  .app-main { margin-left: 0; }
}

@media (max-width: 899px) {
  .divider-chevron { display: none; }
  .detail-panel { position: static; }
  .stat-cards { grid-template-columns: 1fr; }
}

@media (max-width: 639px) {
  .app-topbar { padding: 0 var(--space-3); height: 64px; }
  .app-content__main { padding: var(--space-5); }
  .stat-cards { grid-template-columns: 1fr; }
  .app-topbar__right .toolbar-pill__search { display: none; }
}
</style>