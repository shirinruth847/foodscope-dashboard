import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

// Single-page narrative: sections are reached by hash (#problem, #dashboards…).
// TASK 5 decision: for static hosts without rewrite rules, switch to
// createWebHashHistory() or add a 404.html fallback (see brief §7).
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 76, behavior: 'smooth' }
    return { top: 0 }
  },
})
