import { createRouter, createWebHistory } from 'vue-router'
import AppShell from './components/AppShell.vue'

// Web history for clean URLs during development.
// TASK 5 decision: for static hosts without rewrite rules, switch to
// createMemoryHistory()/hash history or add a 404.html fallback (see brief §7).
const history = createWebHistory()

const routes = [
  {
    path: '/',
    name: 'intro',
    component: AppShell,
  },
  {
    path: '/self-sufficiency',
    name: 'self-sufficiency',
    component: AppShell,
  },
  {
    path: '/availability',
    name: 'availability',
    component: AppShell,
  },
  {
    path: '/singapore',
    name: 'singapore',
    component: AppShell,
  },
  {
    path: '/about',
    name: 'about',
    component: AppShell,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export default createRouter({
  history,
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})