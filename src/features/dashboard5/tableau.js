import { FOODS } from './data.js'

// Serialises selections, skips unchanged parameters and observes manual changes.
export function createDashboardController(viz, { onStatus = () => {} } = {}) {
  let ready = false
  let running = false
  let destroyed = false
  let revision = 0
  const current = new Map()
  const expectedChanges = new Map()
  const queue = []
  const listeners = []
  const parameterValue = (name, value) => name === 'p_Year' ? Number(value) : value

  function listen(type, handler) {
    viz.addEventListener(type, handler)
    listeners.push([type, handler])
  }

  async function drain() {
    if (!ready || running || destroyed) return
    running = true
    while (queue.length && ready && !destroyed) {
      const job = queue.shift()
      let success = true
      onStatus('updating', job)
      try {
        for (const [name, value] of [['p_Commodity', job.commodity], ['p_Year', job.year]]) {
          if (current.get(name) === value) continue
          expectedChanges.set(name, value)
          await viz.workbook.changeParameterValueAsync(name, value)
          if (destroyed) break
          current.set(name, value)
        }
        if (!destroyed && !queue.length) onStatus('selected', job)
      } catch (error) {
        success = false
        current.clear()
        expectedChanges.clear()
        console.warn('[D5 story] Could not change Tableau parameters.', error)
        onStatus('selection-error', job)
      }
      job.resolve(success && !destroyed)
    }
    running = false
  }

  const controller = {
    setDashboard(commodity, year) {
      const numericYear = Number(year)
      if (destroyed || !Object.hasOwn(FOODS, commodity) || !Number.isInteger(numericYear) || numericYear < 2010 || numericYear > 2023) return Promise.resolve(false)
      onStatus(ready ? 'updating' : 'queued', { commodity, year: numericYear })
      return new Promise((resolve) => {
        // Keep every pre-ready request. Once interactive, prioritise the latest
        // selection if the reader chooses another step during an update.
        if (ready && running) queue.splice(0).forEach((job) => job.resolve(false))
        queue.push({ commodity, year: numericYear, resolve })
        void drain()
      })
    },
    destroy() {
      destroyed = true
      queue.splice(0).forEach((job) => job.resolve(false))
      listeners.forEach(([type, handler]) => viz.removeEventListener(type, handler))
    },
  }

  async function initialise() {
    if (destroyed) return
    const readRevision = revision
    try {
      const parameters = await viz.workbook.getParametersAsync()
      // Don't overwrite a newer manual parameter event with an older snapshot.
      if (readRevision === revision) parameters.forEach((parameter) => current.set(parameter.name, parameterValue(parameter.name, parameter.currentValue.value)))
    } catch (error) {
      console.warn('[D5 story] Initial parameters unavailable; queued selections will still be applied.', error)
    }
    if (destroyed) return
    ready = true
    onStatus('ready')
    void drain()
  }
  listen('parameterchanged', async (event) => {
    try {
      const parameter = await event.detail.getParameterAsync()
      if (destroyed) return
      revision += 1
      const value = parameterValue(parameter.name, parameter.currentValue.value)
      current.set(parameter.name, value)
      // Tableau may deliver this notification after the change promise resolves.
      // It acknowledges our update, rather than a reader changing the controls.
      if (expectedChanges.get(parameter.name) === value) {
        expectedChanges.delete(parameter.name)
        return
      }
      if (!running) onStatus('manual', { commodity: current.get('p_Commodity'), year: current.get('p_Year') })
    } catch (error) {
      console.warn('[D5 story] Could not read the changed parameter.', error)
    }
  })
  // The shared TableauEmbed emits load after FirstInteractive has fired.
  void initialise()
  return controller
}
