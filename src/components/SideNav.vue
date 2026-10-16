<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NAV, DASHBOARDS, SITE } from '../content/site'

const collapsed = defineModel('collapsed', { type: Boolean, default: false })

const route = useRoute()
const drawerOpen = ref(false) // mobile only
const onDashboards = computed(() => route.path.startsWith('/dashboards'))
const dashboardsOpen = ref(onDashboards.value)

// Keep the dashboard sub-list open whenever a dashboard page is showing,
// and close the mobile drawer after navigating.
watch(
  () => route.path,
  () => {
    if (onDashboards.value) dashboardsOpen.value = true
    drawerOpen.value = false
  },
)

function isActive(item) {
  return item.path === '/' ? route.path === '/' : route.path.startsWith(item.path)
}

const ICONS = {
  home: 'M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-8.5Z',
  problem: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v5m0 3.5v.5',
  findings: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z',
  dashboards: 'M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z',
  recommendations: 'M5 21V4m0 0h11l-2 4 2 4H5',
}
</script>

<template>
  <!-- Mobile top bar -->
  <header class="topbar">
    <button
      class="icon-btn"
      type="button"
      aria-controls="sidenav"
      :aria-expanded="drawerOpen"
      @click="drawerOpen = true"
    >
      <span class="sr-only">Open menu</span>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
      </svg>
    </button>
    <RouterLink to="/" class="topbar__brand">{{ SITE.brand }}</RouterLink>
  </header>

  <div v-if="drawerOpen" class="backdrop" aria-hidden="true" @click="drawerOpen = false" />

  <aside
    id="sidenav"
    class="side"
    :class="{ 'is-collapsed': collapsed, 'is-open': drawerOpen }"
    aria-label="Main navigation"
  >
    <div class="side__head">
      <RouterLink to="/" class="side__brand" :title="SITE.brand">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path d="M12 21V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M12 13c0-4 3-7 7-7 0 4-3 7-7 7Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
          <path d="M12 16c0-3-2.5-5.5-6-5.5 0 3 2.5 5.5 6 5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
        </svg>
        <span class="side__label">{{ SITE.brand }}</span>
      </RouterLink>

      <!-- Desktop: collapse to icon rail -->
      <button
        class="icon-btn side__collapse"
        type="button"
        :aria-expanded="!collapsed"
        aria-controls="sidenav"
        @click="collapsed = !collapsed"
      >
        <span class="sr-only">{{ collapsed ? 'Expand sidebar' : 'Collapse sidebar' }}</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <path d="M9.5 4.5v15" />
        </svg>
      </button>

      <!-- Mobile: close drawer -->
      <button class="icon-btn side__close" type="button" @click="drawerOpen = false">
        <span class="sr-only">Close menu</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <nav class="side__nav">
      <ul class="side__list">
        <li v-for="item in NAV" :key="item.id">
          <div class="side__row">
            <RouterLink
              :to="item.path"
              class="side__link"
              :class="{ 'is-active': isActive(item) }"
              :aria-current="route.path === item.path ? 'page' : undefined"
              :title="collapsed ? item.label : undefined"
            >
              <svg class="side__icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path :d="ICONS[item.id]" />
              </svg>
              <span class="side__label">{{ item.label }}</span>
            </RouterLink>

            <button
              v-if="item.id === 'dashboards'"
              class="side__expand"
              type="button"
              :aria-expanded="dashboardsOpen"
              aria-controls="dashboard-links"
              @click="dashboardsOpen = !dashboardsOpen"
            >
              <span class="sr-only">{{ dashboardsOpen ? 'Hide' : 'Show' }} dashboard list</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" :class="{ 'is-flipped': dashboardsOpen }">
                <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <ul
            v-if="item.id === 'dashboards'"
            v-show="dashboardsOpen"
            id="dashboard-links"
            class="side__sub"
          >
            <li v-for="d in DASHBOARDS.items" :key="d.slug">
              <RouterLink
                :to="`/dashboards/${d.slug}`"
                class="side__sublink"
                active-class="is-active"
              >
                {{ d.title }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <p class="side__foot side__label">{{ SITE.eyebrow }}</p>
  </aside>
</template>

<style scoped>
/* ── Sidebar shell ───────────────────────────────────── */
.side {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 60;
  width: var(--side-w);
  display: flex;
  flex-direction: column;
  background: var(--forest-deep);
  color: rgba(246, 241, 230, 0.78);
  transition: width 0.25s ease, transform 0.25s ease;
  overflow: hidden;
}

.side__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 68px;
  padding: 0 14px 0 22px;
  border-bottom: 1px solid rgba(246, 241, 230, 0.1);
}

.side__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 600;
  color: var(--cream);
  text-decoration: none;
  white-space: nowrap;
}

.side__brand:hover {
  color: var(--cream);
}

.side__brand svg {
  flex: none;
  color: #d9c79c;
}

.icon-btn {
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  padding: 0;
  border: 0;
  border-radius: var(--radius-sm);
  background: none;
  color: inherit;
  cursor: pointer;
}

.icon-btn:hover {
  background: rgba(246, 241, 230, 0.08);
  color: var(--cream);
}

.side__close {
  display: none;
}

/* ── Links ───────────────────────────────────────────── */
.side__nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 12px;
}

.side__list,
.side__sub {
  list-style: none;
  margin: 0;
  padding: 0;
}

.side__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.side__row {
  position: relative;
  display: flex;
  align-items: center;
}

.side__link {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 16px;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.15s, color 0.15s;
}

.side__link:hover {
  background: rgba(246, 241, 230, 0.07);
  color: var(--cream);
}

.side__link.is-active {
  background: rgba(246, 241, 230, 0.12);
  color: var(--cream);
}

.side__link.is-active .side__icon {
  color: #d9c79c;
}

.side__icon {
  flex: none;
}

.side__expand {
  position: absolute;
  right: 6px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: none;
  color: inherit;
  cursor: pointer;
}

.side__expand:hover {
  background: rgba(246, 241, 230, 0.1);
  color: var(--cream);
}

.side__expand svg {
  transition: transform 0.2s;
}

.side__expand svg.is-flipped {
  transform: rotate(180deg);
}

.side__sub {
  margin: 4px 0 8px 22px;
  padding-left: 12px;
  border-left: 1px solid rgba(246, 241, 230, 0.14);
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.side__sublink {
  display: block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 15px;
  color: rgba(246, 241, 230, 0.66);
  text-decoration: none;
  white-space: nowrap;
}

.side__sublink:hover {
  color: var(--cream);
  background: rgba(246, 241, 230, 0.06);
}

.side__sublink.is-active {
  color: var(--cream);
  background: rgba(246, 241, 230, 0.1);
}

.side__foot {
  margin: 0;
  padding: 16px 22px 20px;
  border-top: 1px solid rgba(246, 241, 230, 0.1);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.5;
  color: rgba(246, 241, 230, 0.45);
}

/* ── Collapsed rail (desktop) ────────────────────────── */
@media (min-width: 901px) {
  .side.is-collapsed {
    width: var(--side-w-collapsed);
  }

  .side.is-collapsed .side__head {
    flex-direction: column;
    justify-content: center;
    height: auto;
    gap: 6px;
    padding: 14px 0;
  }

  .side.is-collapsed .side__label,
  .side.is-collapsed .side__expand,
  .side.is-collapsed .side__sub {
    display: none;
  }

  .side.is-collapsed .side__nav {
    padding: 16px 12px;
  }

  .side.is-collapsed .side__link {
    justify-content: center;
    padding: 10px;
  }
}

/* ── Mobile drawer ───────────────────────────────────── */
.topbar,
.backdrop {
  display: none;
}

@media (max-width: 900px) {
  .topbar {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 56px;
    padding: 0 var(--gutter);
    background: rgba(246, 241, 230, 0.92);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
    color: var(--forest);
  }

  .topbar .icon-btn {
    margin-left: -8px;
  }

  .topbar .icon-btn:hover {
    background: var(--cream-deep);
    color: var(--forest);
  }

  .topbar__brand {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 600;
    color: var(--forest);
    text-decoration: none;
  }

  .backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 55;
    background: rgba(20, 42, 29, 0.4);
  }

  .side {
    width: min(300px, 85vw);
    transform: translateX(-100%);
  }

  .side.is-open {
    transform: none;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.25);
  }

  .side__collapse {
    display: none;
  }

  .side__close {
    display: inline-grid;
  }
}
</style>
