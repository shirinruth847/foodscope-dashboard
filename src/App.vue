<script setup>
import { ref, watch } from 'vue'
import SideNav from './components/SideNav.vue'
import SiteFooter from './components/SiteFooter.vue'

const STORAGE_KEY = 'foodscope:sidebar-collapsed'

function readCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

const collapsed = ref(readCollapsed())

watch(collapsed, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  } catch {
    /* storage unavailable: the preference just won't persist */
  }
})
</script>

<template>
  <div class="layout" :class="{ 'is-collapsed': collapsed }">
    <SideNav v-model:collapsed="collapsed" />
    <div class="layout__main">
      <RouterView />
      <SiteFooter />
    </div>
  </div>
</template>

<style scoped>
.layout__main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-left: var(--side-w);
  transition: margin-left 0.25s ease;
}

.layout__main > :first-child {
  flex: 1;
}

.layout.is-collapsed .layout__main {
  margin-left: var(--side-w-collapsed);
}

@media (max-width: 900px) {
  .layout__main,
  .layout.is-collapsed .layout__main {
    margin-left: 0;
  }
}
</style>
