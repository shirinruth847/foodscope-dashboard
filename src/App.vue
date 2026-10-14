<script setup>
import AppShell from './components/AppShell.vue'
import { onMounted } from 'vue'

onMounted(() => {
  // Load Tableau Embedding API
  const script = document.createElement('script')
  script.type = 'module'
  script.src = 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'
  document.head.appendChild(script)
})
</script>

<template>
  <AppShell />
</template>

<style scoped>
/* Global styles are in src/styles/global.css */
</style>