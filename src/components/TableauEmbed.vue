<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  /** The published Tableau viz URL (from Tableau Public or Cloud). */
  src: { type: String, required: true },
  /** Optional height for the viz. Defaults to 420px. */
  height: { type: String, default: '420px' },
  /** Optional caption shown below the viz card. */
  caption: { type: String, default: '' },
  /** Optional initial filter to apply (object with field/value). */
  filter: { type: Object, default: () => ({}) },
  /** Whether to show the Tableau toolbar. */
  toolbar: { type: Boolean, default: false },
  /** Hide the tabs in the embedded viz. */
  hideTabs: { type: Boolean, default: true },
})

const emit = defineEmits(['load', 'error'])

const loaded = ref(false)
const error = ref(false)
const loadError = ref('')

let viz = null
let apiLoaded = false
let loadPromise = null

/** Load the Tableau Embedding API v3 script once per session. */
function loadEmbeddingAPI() {
  if (apiLoaded) return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const url = new URL(props.src)
    const isPublic = url.hostname.includes('public.tableau.com')
    const apiUrl = isPublic
      ? 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'
      : `${url.origin}/javascripts/api/tableau.embedding.3.latest.min.js`

    const script = document.createElement('script')
    script.type = 'module'
    script.src = apiUrl
    script.onload = () => {
      apiLoaded = true
      resolve()
    }
    script.onerror = (e) => {
      loadPromise = null
      reject(new Error(`Failed to load Tableau Embedding API from ${apiUrl}`))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}

async function embedViz() {
  if (!props.src) return
  loaded.value = false
  error.value = false
  loadError.value = ''

  try {
    await loadEmbeddingAPI()
    await customElements.whenDefined('tableau-viz')

    const container = document.querySelector('.tableau-embed__viz')
    if (!container) return

    viz = document.createElement('tableau-viz')
    viz.src = props.src
    viz.toolbar = props.toolbar
    viz.hideTabs = props.hideTabs
    viz.style.width = '100%'
    viz.style.height = props.height

    if (props.filter?.field && props.filter?.value !== undefined) {
      // Apply after first interaction
    }

    viz.addEventListener('firstInteractive', onFirstInteractive)
    viz.addEventListener('vizLoadError', onVizLoadError)

    container.appendChild(viz)
  } catch (e) {
    error.value = true
    loadError.value = e?.message ?? String(e)
    emit('error', { message: loadError.value })
  }
}

function onFirstInteractive(e) {
  loaded.value = true
  viz = e.target
  emit('load', { viz })

  if (props.filter?.field && props.filter?.value !== undefined) {
    try {
      viz.getWorkbook().then((wb) => {
        wb.getActiveSheet().then((sheet) => {
          sheet.applyFilterAsync(props.filter.field, props.filter.value, 'REPLACE')
        })
      })
    } catch {
      // filter failed silently
    }
  }
}

function onVizLoadError(e) {
  error.value = true
  loaded.value = false
  loadError.value = e?.detail?.message ?? 'The Tableau visualisation could not be loaded.'
  emit('error', { message: loadError.value })
}

function dispose() {
  if (viz) {
    viz.removeEventListener('firstInteractive', onFirstInteractive)
    viz.removeEventListener('vizLoadError', onVizLoadError)
    try { viz.remove() } catch { /* ignore */ }
    viz = null
  }
}

onMounted(() => { embedViz() })
onBeforeUnmount(() => { dispose() })

watch(
  () => [props.src, props.height, props.toolbar, props.hideTabs],
  () => { dispose(); embedViz() },
  { deep: true }
)
</script>

<template>
  <figure class="tableau-embed">
    <div class="tableau-embed__frame">
      <!-- Loading state -->
      <div v-if="!loaded && !error" class="tableau-embed__loading" aria-live="polite">
        <div class="spinner" aria-hidden="true"></div>
        <p>Loading visualisation…</p>
      </div>

      <!-- Error / fallback state -->
      <div v-if="error" class="tableau-embed__error" role="alert">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="error-icon">
          <circle cx="12" cy="12" r="10" stroke="var(--color-error)" stroke-width="2" />
          <path d="M12 9v4M12 15h.01" stroke="var(--color-error)" stroke-width="2" stroke-linecap="round" />
        </svg>
        <p>Couldn't load the visualisation.</p>
        <p class="tableau-embed__err-detail">{{ loadError }}</p>
        <a :href="props.src" target="_blank" rel="noopener" class="tableau-embed__fallback-link">
          Open in Tableau →
        </a>
      </div>

      <!-- Live viz -->
      <div class="tableau-embed__viz" v-show="loaded"></div>
    </div>

    <figcaption v-if="caption" class="tableau-embed__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.tableau-embed {
  margin: 0;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  padding: var(--space-4);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.tableau-embed:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.tableau-embed__frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-width: 0;
}
.tableau-embed__loading,
.tableau-embed__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-8) var(--space-6);
  text-align: center;
  background: var(--color-cream-muted);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-lg);
  width: 100%;
}
.tableau-embed__error {
  background: #FDF3F0;
  border-color: var(--color-error);
  color: var(--color-error);
}
.error-icon {
  width: 40px;
  height: 40px;
  flex: none;
}
.tableau-embed__err-detail {
  font-size: var(--text-sm);
  opacity: 0.85;
  max-width: 320px;
}
.tableau-embed__fallback-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-forest);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  background: var(--color-cream);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-pill);
  transition: all var(--transition-fast);
}
.tableau-embed__fallback-link:hover {
  background: var(--color-forest);
  color: var(--color-cream);
  border-color: var(--color-forest);
}
.spinner {
  width: 28px;
  height: 28px;
  border: 2.5px solid rgba(45, 59, 18, 0.1);
  border-top-color: var(--color-forest);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .spinner { animation: none; border-top-color: transparent; }
}
.tableau-embed__viz { width: 100%; }
.tableau-embed__caption {
  margin: var(--space-3) var(--space-2) var(--space-1);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-olive-soft);
  text-align: center;
}
</style>