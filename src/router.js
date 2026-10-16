import { createRouter, createWebHistory } from 'vue-router'
import { NAV, DASHBOARDS, SITE } from './content/site'
import HomeView from './views/HomeView.vue'
import ProblemView from './views/ProblemView.vue'
import FindingsView from './views/FindingsView.vue'
import DashboardsView from './views/DashboardsView.vue'
import DashboardView from './views/DashboardView.vue'
import RecommendationsView from './views/RecommendationsView.vue'

const label = (id) => NAV.find((n) => n.id === id).label

// TASK 5 decision: for static hosts without rewrite rules, switch to
// createWebHashHistory() or add a 404.html fallback (see brief §7).
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/problem', name: 'problem', component: ProblemView, meta: { title: label('problem') } },
    { path: '/findings', name: 'findings', component: FindingsView, meta: { title: label('findings') } },
    { path: '/dashboards', name: 'dashboards', component: DashboardsView, meta: { title: label('dashboards') } },
    {
      path: '/dashboards/:slug',
      name: 'dashboard',
      component: DashboardView,
      props: true,
      beforeEnter: (to) => DASHBOARDS.items.some((d) => d.slug === to.params.slug) || '/dashboards',
    },
    { path: '/recommendations', name: 'recommendations', component: RecommendationsView, meta: { title: label('recommendations') } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.afterEach((to) => {
  const dashboard = DASHBOARDS.items.find((d) => d.slug === to.params.slug)
  const title = dashboard?.title ?? to.meta.title
  document.title = title ? `${title} · ${SITE.brand}` : `${SITE.brand}: ${SITE.title}`
})

export default router
