<script>
// Shared across every instance: the Embedding API v3 script is loaded once.
let apiPromise = null

function loadEmbeddingApi(src) {
  if (customElements.get('tableau-viz')) return Promise.resolve()
  if (apiPromise) return apiPromise

  const origin = new URL(src).origin
  const apiUrl = origin.includes('public.tableau.com')
    ? 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'
    : `${origin}/javascripts/api/tableau.embedding.3.latest.min.js`

  apiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = apiUrl
    script.onload = () => customElements.whenDefined('tableau-viz').then(resolve)
    script.onerror = () => {
      apiPromise = null
      reject(new Error(`Could not load the Tableau Embedding API from ${apiUrl}`))
    }
    document.head.appendChild(script)
  })
  return apiPromise
}
</script>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  /** Published view URL, e.g. https://public.tableau.com/views/Workbook/Sheet */
  src: { type: String, required: true },
  height: { type: String, default: '820px' },
  /** 'top' | 'bottom' | 'hidden' */
  toolbar: { type: String, default: 'bottom' },
  hideTabs: { type: Boolean, default: true },
  title: { type: String, default: 'Tableau visualisation' },
})

const emit = defineEmits(['load', 'error'])

const host = ref(null)
const status = ref('idle') // idle | loading | ready | error
const errorMessage = ref('')

let viz = null
let observer = null

async function embed() {
  dispose()
  status.value = 'loading'
  errorMessage.value = ''

  try {
    await loadEmbeddingApi(props.src)
    if (!host.value) return

    viz = document.createElement('tableau-viz')
    viz.setAttribute('src', props.src)
    viz.setAttribute('toolbar', props.toolbar)
    if (props.hideTabs) viz.setAttribute('hide-tabs', '')
    viz.setAttribute('width', '100%')
    viz.setAttribute('height', props.height)
    viz.addEventListener('firstinteractive', onReady)
    viz.addEventListener('vizloaderror', onError)
    host.value.appendChild(viz)
  } catch (e) {
    fail(e?.message ?? String(e))
  }
}

function onReady() {
  status.value = 'ready'
  console.info('[Tableau] Viz loaded:', props.src)
  emit('load', { viz })
}

function onError(e) {
  fail(e?.detail?.message ?? 'The Tableau view could not be loaded.')
}

function fail(message) {
  status.value = 'error'
  errorMessage.value = message
  console.error('[Tableau] Viz failed to load:', props.src, message)
  emit('error', { message })
}

function dispose() {
  if (!viz) return
  viz.removeEventListener('firstinteractive', onReady)
  viz.removeEventListener('vizloaderror', onError)
  viz.remove()
  viz = null
}

// Only load a view once it scrolls near the viewport, so six dashboards
// don't all start loading on first paint.
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect()
        embed()
      }
    },
    { rootMargin: '400px 0px' },
  )
  observer.observe(host.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  dispose()
})

watch(
  () => [props.src, props.height, props.toolbar, props.hideTabs],
  () => { if (status.value !== 'idle') embed() },
)
</script>

<template>
  <div class="embed" :style="{ minHeight: height }">
    <div ref="host" class="embed__host" :aria-label="title" :class="{ 'is-hidden': status === 'error' }" />

    <div v-if="status === 'idle' || status === 'loading'" class="embed__overlay" aria-live="polite">
      <span class="embed__spinner" aria-hidden="true" />
      <p>Loading dashboard…</p>
    </div>

    <div v-else-if="status === 'error'" class="embed__overlay embed__overlay--error" role="alert">
      <p class="embed__error-title">This dashboard couldn’t be loaded.</p>
      <p class="embed__error-detail">{{ errorMessage }}</p>
      <a :href="src" target="_blank" rel="noopener">Open it on Tableau Public →</a>
    </div>
  </div>
</template>

<style scoped>
.embed {
  position: relative;
  width: 100%;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.embed__host {
  width: 100%;
}

.embed__host.is-hidden {
  display: none;
}

.embed__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--paper);
  color: var(--ink-soft);
  font-size: 15px;
  text-align: center;
  padding: 24px;
}

.embed__overlay--error {
  background: var(--wheat-tint);
}

.embed__error-title {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--forest);
}

.embed__error-detail {
  font-size: 14px;
  color: var(--ink-muted);
  max-width: 48ch;
}

.embed__spinner {
  width: 28px;
  height: 28px;
  border: 2px solid var(--line);
  border-top-color: var(--forest);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
