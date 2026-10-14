<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { SECTIONS } from '../content/site'
import Button from './Button.vue'
import * as Icons from './Icons.js'

const route = useRoute()

const iconMap = {
  IntroIcon: Icons.IntroIcon,
  Objective1Icon: Icons.Objective1Icon,
  Objective2Icon: Icons.Objective2Icon,
  Objective3Icon: Icons.Objective3Icon,
  AboutIcon: Icons.AboutIcon,
}

const navItems = computed(() => SECTIONS.map(s => ({
  id: s.id,
  path: s.path,
  label: s.navTitle,
  icon: iconMap[s.icon] || Icons.IntroIcon,
})))

const collapsed = ref(false)
</script>

<template>
<aside class="sidebar-nav" :class="{ 'sidebar-nav--collapsed': collapsed }" aria-label="Main navigation">
  <div class="sidebar-nav__brand">
    <div class="sidebar-nav__logo" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="48" height="48">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--color-brand-400)"/>
            <stop offset="100%" stop-color="var(--color-brand-600)"/>
          </linearGradient>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#logoGrad)" filter="url(#logoGlow)"/>
        <path d="M14 28c0 4.4 3.6 8 8 8s8-3.6 8-8" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="24" cy="20" r="6" fill="white"/>
      </svg>
    </div>
    <span class="sidebar-nav__title" v-show="!collapsed">FoodScope</span>
  </div>

  <nav class="sidebar-nav__list" aria-label="Sections">
    <Button
      v-for="item in navItems"
      :key="item.id"
      :href="item.path"
      variant="ghost"
      size="md"
      full-width
      :class="[
        'sidebar-nav__item',
        { 'sidebar-nav__item--active': route.path === item.path }
      ]"
      :aria-current="route.path === item.path ? 'page' : undefined"
    >
      <span class="sidebar-nav__item-icon" aria-hidden="true" v-html="item.icon()" />
      <span class="sidebar-nav__item-label" v-show="!collapsed">{{ item.label }}</span>
    </Button>
  </nav>

  <div class="sidebar-nav__footer" v-show="!collapsed">
    <Button variant="ghost" size="md" full-width class="sidebar-nav__logout">
      <span class="sidebar-nav__item-icon" v-html="Icons.ChevronLeftIcon()" />
      <span>Sign out</span>
    </Button>
  </div>

  <Button
    v-show="collapsed"
    variant="ghost"
    size="sm"
    class="sidebar-nav__toggle"
    @click="collapsed = false"
    aria-label="Expand sidebar"
  >
    <span v-html="Icons.ChevronRightIcon()" />
  </Button>
</aside>
</template>

<style scoped>
.sidebar-nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--color-bg-elevated);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  z-index: var(--z-sticky);
  transition: width var(--transition-base);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}
.sidebar-nav--collapsed { width: 72px; }

.sidebar-nav__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  min-height: var(--header-height);
}
.sidebar-nav__logo { flex-shrink: 0; }
.sidebar-nav__title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: var(--text-lg);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: -0.01em;
}
.sidebar-nav--collapsed .sidebar-nav__title { display: none; }

.sidebar-nav__list {
  flex: 1;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  overflow-y: auto;
}
.sidebar-nav__item {
  justify-content: flex-start;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}
.sidebar-nav__item:hover {
  color: var(--color-text);
  background: var(--color-bg-muted);
  border-color: var(--color-border);
}
.sidebar-nav__item--active {
  background: var(--color-brand-900);
  color: var(--color-primary);
  font-weight: 600;
  border: 1px solid var(--color-brand-600);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.15);
}
.sidebar-nav__item-icon {
  display: inline-flex;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: currentColor;
}
.sidebar-nav__item-label {
  margin-left: var(--space-3);
  white-space: nowrap;
}
.sidebar-nav--collapsed .sidebar-nav__item-label { display: none; }
.sidebar-nav--collapsed .sidebar-nav__item { justify-content: center; padding: var(--space-3); }
.sidebar-nav--collapsed .sidebar-nav__item-icon { margin: 0; }

.sidebar-nav__footer {
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
}
.sidebar-nav__logout { color: var(--color-text-secondary); }
.sidebar-nav__logout:hover { color: var(--color-error); background: var(--color-error-light); }

.sidebar-nav__toggle {
  position: absolute;
  bottom: var(--space-4);
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  padding: 0;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
}
.sidebar-nav__toggle:hover {
  color: var(--color-primary);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.3);
}
</style>