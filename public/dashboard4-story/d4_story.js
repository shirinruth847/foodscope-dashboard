// Standalone Dashboard 4 experiment. No framework, package or shared app imports.
export const CONFIG = Object.freeze({
  tableauUrl: 'https://public.tableau.com/views/D4_17949258250760/Dashboard2',
  apiUrl: 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js',
  dataUrl: new URL('./d4_basket.json', import.meta.url),
  width: 1200,
  height: 800,
  loadTimeout: 45000,
})

const FOODS = { 'Chicken meat': '🍗', Eggs: '🥚', 'Live chickens': '🐔', Pork: '🐖', Rice: '🍚', Vegetables: '🥬', Wheat: '🌾' }
const pct = (share) => (share * 100).toFixed(1)
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

// ── Data: all shares, suppliers and counts are derived from the supplied JSON. ──
export function getStats(data, commodity, year) {
  const suppliers = data[commodity]?.[String(year)]
  if (!Array.isArray(suppliers) || !suppliers.length) throw new Error(`No supplier data for ${commodity}, ${year}`)
  return { commodity, year: Number(year), partner: suppliers[0].partner, share: suppliers[0].share, count: suppliers.length, suppliers }
}

export function compareSuppliers(data) {
  return Object.keys(FOODS).map((commodity) => {
    const before = getStats(data, commodity, 2010)
    const after = getStats(data, commodity, 2023)
    const delta = (after.share - before.share) * 100
    const classification = delta <= -5 ? 'More diversified' : delta >= 5 ? 'More concentrated' : 'Little change'
    const colour = delta <= -5 ? 'diversified' : delta >= 5 ? 'concentrated' : 'unchanged'
    return { commodity, before, after, delta, classification, colour }
  }).sort((a, b) => a.delta - b.delta)
}

export function getQuiz(data) {
  return [
    {
      question: 'Where does most of Singapore’s imported chicken meat come from?',
      options: ['Malaysia', 'Brazil', 'Thailand', 'United States'], commodity: 'Chicken meat', year: 2023,
      explanation: 'Three in every four tonnes of chicken meat Singapore imports come from Brazil, on the other side of the world.',
      target: ['Chicken meat', 2023],
    },
    {
      question: 'Which country supplies the most of Singapore’s imported rice?',
      options: ['Thailand', 'India', 'Vietnam', 'China (mainland)'], commodity: 'Rice', year: 2023,
      explanation: `India now leads, but in 2010 Thailand was the largest supplier with ${pct(getStats(data, 'Rice', 2010).share)}%.`,
      target: ['Rice', 2023],
    },
    {
      question: 'Where do Singapore’s imported live chickens come from?',
      options: ['Malaysia', 'Indonesia', 'Thailand', 'Brazil'], commodity: 'Live chickens', year: 2023,
      explanation: 'Almost all of them. Malaysia supplied 100% (rounded) every year from 2010 to 2021, which is why its 2022 export ban was felt immediately.',
      target: ['Live chickens', 2022],
    },
  ].map((question) => ({ ...question, answer: getStats(data, question.commodity, question.year).partner }))
}

// Fixed figures below were explicitly supplied in the brief; they cannot be
// calculated from supplier shares. See README.md for their provenance/limits.
export function getSteps(data) {
  const stats = (commodity, year = 2023) => getStats(data, commodity, year)
  const vegetables = stats('Vegetables')
  const eggsBefore = stats('Eggs', 2010)
  const eggsAfter = stats('Eggs')
  return [
    { label: 'Many suppliers', title: 'Many suppliers. One big share.', target: ['Vegetables', 2023],
      text: `Singapore imported vegetables from <strong>${vegetables.count} countries</strong> in 2023. Yet Malaysia supplied <strong>${pct(vegetables.share)}%</strong>—many sources can still mean relying heavily on one.` },
    { label: 'One disrupted route', title: 'When one route is interrupted.', target: ['Live chickens', 2022],
      text: `In 2022, the year of Malaysia’s export ban, Singapore’s live chicken imports fell <strong>38%</strong>. Malaysia still supplied <strong>${pct(stats('Live chickens', 2022).share)}%</strong>. In the same year, chicken meat imports rose <strong>34%</strong>.` },
    { label: 'More diverse sources', title: 'Eggs spread their origins.', target: ['Eggs', 2023],
      text: `Malaysia’s share of egg imports fell from <strong>${pct(eggsBefore.share)}%</strong> in 2010 to <strong>${pct(eggsAfter.share)}%</strong> in 2023. Over that period, suppliers grew from <strong>${eggsBefore.count}</strong> to <strong>${eggsAfter.count}</strong>.` },
  ]
}

// ── Shared Tableau helper: ready gate, FIFO queue, deduplication and recovery. ──
// The factory also allows deterministic checks without loading Tableau.
export function createDashboardController(viz, { onStatus = () => {}, onFailure = () => {}, logError = (message, error) => console.warn(message, error) } = {}) {
  let ready = false
  let failed = false
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
    if (!ready || running || destroyed || failed) return
    running = true
    while (queue.length && ready && !failed && !destroyed) {
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
        logError('[D4 story] Could not change Tableau parameters.', error)
        onStatus('selection-error', job)
      }
      job.resolve(success && !destroyed && !failed)
    }
    running = false
  }

  const controller = {
    setDashboard(commodity, year) {
      const numericYear = Number(year)
      if (destroyed || failed || !Object.hasOwn(FOODS, commodity) || !Number.isInteger(numericYear) || numericYear < 2010 || numericYear > 2023) return Promise.resolve(false)
      onStatus(ready ? 'updating' : 'queued', { commodity, year: numericYear })
      return new Promise((resolve) => {
        // Keep every pre-ready request. Once interactive, prioritise the latest
        // selection if the reader chooses another step during an update.
        if (ready && running) queue.splice(0).forEach((job) => job.resolve(false))
        queue.push({ commodity, year: numericYear, resolve })
        void drain()
      })
    },
    fail(error) {
      if (destroyed) return
      failed = true
      ready = false
      queue.splice(0).forEach((job) => job.resolve(false))
      logError('[D4 story] Tableau is unavailable; the local story remains usable.', error)
      onFailure(error)
    },
    destroy() {
      destroyed = true
      queue.splice(0).forEach((job) => job.resolve(false))
      listeners.forEach(([type, handler]) => viz.removeEventListener(type, handler))
    },
  }

  listen('firstinteractive', async () => {
    if (destroyed) return
    const readRevision = revision
    try {
      const parameters = await viz.workbook.getParametersAsync()
      // Don't overwrite a newer manual parameter event with an older snapshot.
      if (readRevision === revision) parameters.forEach((parameter) => current.set(parameter.name, parameterValue(parameter.name, parameter.currentValue.value)))
    } catch (error) {
      logError('[D4 story] Initial parameters unavailable; queued selections will still be applied.', error)
    }
    if (destroyed) return
    failed = false
    ready = true
    onStatus('ready')
    void drain()
  })
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
      logError('[D4 story] Could not read the changed parameter.', error)
    }
  })
  listen('vizloaderror', (event) => controller.fail(event.detail?.message || 'Tableau reported a loading error.'))
  return controller
}

let dashboardController = null
export function setDashboard(commodity, year) {
  return dashboardController?.setDashboard(commodity, year) ?? Promise.resolve(false)
}

// ── Page setup: the remote API can fail independently of the local features. ──
async function init() {
  const $ = (selector) => document.querySelector(selector)
  const viz = $('#d4-viz')
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  let storySteps = []
  let displayedSelection = ''
  let loadTimer = null
  let destroyed = false
  let quizIndex = 0
  let score = 0
  let answered = false

  function scrollToElement(element) {
    element.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' })
  }

  function selectDashboard(commodity, year) {
    renderStorySelection(commodity, year)
    void setDashboard(commodity, year)
  }

  function showDashboard(commodity, year) {
    selectDashboard(commodity, year)
    scrollToElement($('#dashboard-panel'))
  }

  dashboardController = createDashboardController(viz, {
    onStatus(status, selection) {
      const statusNode = $('#dashboard-status')
      if (selection?.commodity && selection.year) {
        $('#dashboard-selection').textContent = `${selection.commodity} · ${selection.year}`
        renderStorySelection(selection.commodity, Number(selection.year))
      }
      if (status === 'ready') {
        clearTimeout(loadTimer)
        $('#dashboard-error').hidden = true
        $('#viz-scroll').hidden = false
        statusNode.textContent = 'Ready. Choose a step above or explore the dashboard directly.'
      } else if (status === 'manual') {
        statusNode.textContent = 'Exploring freely. Choose a step above for a guided example.'
      } else if (selection) {
        statusNode.textContent = status === 'queued' ? 'Your selection is queued while Tableau loads.'
          : status === 'selection-error' ? 'This selection could not be applied. Use the controls in Tableau or try another step.'
          : status === 'updating' ? 'Updating the dashboard…'
          : 'Selection applied. Explore the map and charts below.'
      }
    },
    onFailure() {
      clearTimeout(loadTimer)
      $('#dashboard-error').hidden = false
      $('#viz-scroll').hidden = true
      $('#dashboard-status').textContent = 'Tableau is unavailable. The local story and charts remain available.'
    },
  })
  $('#retry-dashboard').addEventListener('click', () => location.reload())
  $('#tableau-link').href = CONFIG.tableauUrl
  viz.setAttribute('width', String(CONFIG.width))
  viz.setAttribute('height', String(CONFIG.height))
  document.documentElement.style.setProperty('--d4-viz-width', `${CONFIG.width}px`)
  document.documentElement.style.setProperty('--d4-viz-height', `${CONFIG.height}px`)
  loadTimer = setTimeout(() => dashboardController.fail('The dashboard did not become interactive within 45 seconds.'), CONFIG.loadTimeout)
  // Listeners are registered before upgrading/starting the custom element.
  void import(CONFIG.apiUrl).then(() => {
    if (!destroyed) viz.setAttribute('src', CONFIG.tableauUrl)
  }).catch((error) => dashboardController.fail(error))

  let data
  try {
    const response = await fetch(CONFIG.dataUrl)
    if (!response.ok) throw new Error(`Supplier data request returned ${response.status}`)
    data = await response.json()
    for (const commodity of Object.keys(FOODS)) {
      for (let year = 2010; year <= 2023; year += 1) getStats(data, commodity, year)
    }
  } catch (error) {
    console.warn('[D4 story] Supplier data could not load.', error)
    for (const id of ['#quiz-panel', '#story-explanation', '#chart-region']) $(id).textContent = 'Supplier data could not load. Reload the page to try again, or explore the Tableau dashboard.'
    return
  }
  if (destroyed) return

  // ── Quiz ──
  const questions = getQuiz(data)

  function renderQuiz() {
    answered = false
    const question = questions[quizIndex]
    $('#quiz-panel').innerHTML = `
      <div class="quiz-progress"><span>Question ${quizIndex + 1} of ${questions.length}</span><span class="quiz-progress-dots" aria-hidden="true">${questions.map((_, index) => `<i class="${index <= quizIndex ? 'is-current' : ''}"></i>`).join('')}</span></div>
      <span class="quiz-food" aria-hidden="true">${FOODS[question.commodity]}</span>
      <h3 id="quiz-question" class="quiz-question" tabindex="-1">${escapeHtml(question.question)}</h3>
      <div class="quiz-options" role="group" aria-labelledby="quiz-question">${question.options.map((option) => `<button class="quiz-option" type="button" data-answer="${escapeHtml(option)}"><span>${escapeHtml(option)}</span><span class="answer-mark" aria-hidden="true"></span></button>`).join('')}</div>
      <div id="quiz-result" class="quiz-result" hidden></div>`
    $('#quiz-panel').querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => revealAnswer(button.dataset.answer)))
  }

  function revealAnswer(answer) {
    if (answered) return
    answered = true
    const question = questions[quizIndex]
    const stats = getStats(data, question.commodity, question.year)
    const correct = answer === question.answer
    if (correct) score += 1
    $('#quiz-panel').querySelectorAll('[data-answer]').forEach((button) => {
      button.disabled = true
      if (button.dataset.answer === question.answer) {
        button.classList.add('is-correct')
        button.querySelector('.answer-mark').textContent = '✓ Correct'
      } else if (button.dataset.answer === answer) {
        button.classList.add('is-wrong')
        button.querySelector('.answer-mark').textContent = '✕ Your guess'
      }
    })
    const topThree = stats.suppliers.slice(0, 3)
    const others = stats.suppliers.slice(3).reduce((total, supplier) => total + supplier.share, 0)
    const segments = [...topThree, { partner: 'Others', share: others }]
    const colours = ['1', '2', '3', 'other']
    const result = $('#quiz-result')
    result.hidden = false
    result.innerHTML = `
      <p class="answer-kicker">${correct ? 'You got it.' : 'A surprising answer.'} ${escapeHtml(stats.partner)} · ${stats.year}</p>
      <p class="answer-number">${pct(stats.share)}% <small>of ${escapeHtml(question.commodity.toLowerCase())} imports</small></p>
      <p class="answer-explanation">${escapeHtml(question.explanation)}</p>
      <div class="mini-bar" role="img" aria-label="${escapeHtml(segments.map((segment) => `${segment.partner}: ${pct(segment.share)}%`).join('; '))}">${segments.map((segment, index) => `<span style="flex: ${segment.share}; background: var(--d4-supplier-${colours[index]})"></span>`).join('')}</div>
      <div class="mini-legend">${segments.map((segment, index) => `<span><i style="background: var(--d4-supplier-${colours[index]})" aria-hidden="true"></i>${escapeHtml(segment.partner)} ${pct(segment.share)}%</span>`).join('')}</div>
      <div class="quiz-buttons"><button type="button" id="quiz-map" class="button-secondary">See it on the map${question.target[1] !== question.year ? ` · ${question.target[1]}` : ''} →</button><button type="button" id="quiz-next">${quizIndex === questions.length - 1 ? 'See my score' : 'Next question →'}</button></div>`
    $('#quiz-announcement').textContent = `${correct ? 'Correct.' : 'The correct answer is ' + question.answer + '.'} ${pct(stats.share)}% of ${question.commodity.toLowerCase()} imports came from ${stats.partner} in ${stats.year}. ${question.explanation}`
    $('#quiz-map').addEventListener('click', () => showDashboard(...question.target))
    $('#quiz-next').addEventListener('click', () => {
      quizIndex += 1
      if (quizIndex < questions.length) {
        renderQuiz()
        $('#quiz-question').focus({ preventScroll: true })
      } else renderScore()
    })
  }

  function renderScore() {
    $('#quiz-panel').innerHTML = `<p class="eyebrow">Your food origins quiz</p><h3 id="quiz-score" tabindex="-1">You got ${score} of ${questions.length}</h3><p class="score" aria-hidden="true">${FOODS.Rice} ${FOODS.Eggs} ${FOODS['Chicken meat']}</p><p>Now follow the routes behind those answers—and see what happens when one supplier dominates.</p><div class="quiz-buttons"><button type="button" id="read-story">Read the full story ↓</button><button type="button" id="quiz-restart" class="button-secondary">Try again</button></div>`
    $('#quiz-announcement').textContent = `Quiz complete. You got ${score} of ${questions.length}.`
    $('#quiz-score').focus({ preventScroll: true })
    $('#read-story').addEventListener('click', beginStory)
    $('#quiz-restart').addEventListener('click', () => { quizIndex = 0; score = 0; renderQuiz(); $('#quiz-question').focus() })
  }
  renderQuiz()

  // ── Guided examples: three buttons and one explanation, at every screen size. ──
  storySteps = getSteps(data)
  $('#story-steps').innerHTML = storySteps.map((step, index) => `
    <button type="button" class="story-choice" data-select-step="${index}" aria-pressed="false" aria-controls="story-explanation">
      <span aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span>${step.label}</span>
    </button>`).join('')

  function renderStorySelection(commodity, year) {
    if (!storySteps.length) return
    const key = `${commodity}|${year}`
    if (key === displayedSelection) return
    displayedSelection = key
    const index = storySteps.findIndex((step) => step.target[0] === commodity && step.target[1] === year)
    document.querySelectorAll('[data-select-step]').forEach((button, buttonIndex) => {
      button.setAttribute('aria-pressed', String(buttonIndex === index))
    })
    const step = storySteps[index]
    $('#story-explanation').innerHTML = step
      ? `<h3>${step.title}</h3><p>${step.text}</p><p class="step-target"><span aria-hidden="true">${FOODS[commodity]}</span> ${commodity} · ${year}</p>`
      : `<h3>Exploring ${escapeHtml(commodity.toLowerCase())} imports</h3><p>You’re viewing ${escapeHtml(commodity.toLowerCase())} imports in ${year}. Choose a step above for a guided example.</p>`
  }

  function beginStory() {
    selectDashboard(...storySteps[0].target)
    scrollToElement($('#story'))
  }
  document.querySelectorAll('a[href="#story"]').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); beginStory() }))
  document.querySelectorAll('[data-select-step]').forEach((button) => button.addEventListener('click', () => {
    selectDashboard(...storySteps[Number(button.dataset.selectStep)].target)
  }))
  selectDashboard(...storySteps[0].target)

  // ── Dumbbell chart: SVG drawing, native row buttons and a full data table. ──
  const rows = compareSuppliers(data)
  const chartWidth = 1200
  const chartHeight = 660
  const plotLeft = 215
  const plotWidth = 550
  const x = (share) => plotLeft + share * plotWidth
  const y = (index) => 145 + index * 70
  const rowSummary = (row) => `${row.commodity}: 2010, ${row.before.partner} ${pct(row.before.share)}%, ${row.before.count} suppliers; 2023, ${row.after.partner} ${pct(row.after.share)}%, ${row.after.count} suppliers. ${row.classification}.`
  const rowValues = (row) => row.before.partner === row.after.partner
    ? `${pct(row.before.share)}% → ${pct(row.after.share)}%`
    : `${row.before.partner} ${pct(row.before.share)}% → ${row.after.partner} ${pct(row.after.share)}%`

  $('#chart-region').innerHTML = `<div class="chart-canvas">
    <svg viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-label="Largest supplier’s share of Singapore’s imports, 2010 versus 2023. Eggs and rice became more diversified; chicken meat and pork became more concentrated. Live chickens, vegetables and wheat changed by less than five percentage points.">
      <text x="${plotLeft}" y="34" font-size="15">Share of imports from the largest supplier</text>
      <text x="20" y="76" font-size="14">Food</text>
      <text x="805" y="76" font-size="14">2010 → 2023</text>
      ${[0, 25, 50, 75, 100].map((tick) => `<line x1="${x(tick / 100)}" y1="85" x2="${x(tick / 100)}" y2="600" stroke="var(--d4-line)" ${tick === 50 ? 'stroke-dasharray="5 5"' : ''}/><text x="${x(tick / 100)}" y="76" text-anchor="middle" font-size="14">${tick}%</text>`).join('')}
      <text x="${x(0.5)}" y="54" text-anchor="middle" font-size="12">Half from one supplier</text>
      ${rows.map((row, index) => {
        const rowY = y(index)
        const startX = x(row.before.share)
        const endX = x(row.after.share)
        const direction = Math.sign(endX - startX)
        // Short changes have no room for a head between the dots. Put their
        // direction arrow below the dots, preserving the exact x positions.
        const shortChange = Math.abs(endX - startX) < 36
        const arrowY = rowY + (shortChange ? 18 : 0)
        const arrowTip = endX - (shortChange ? 0 : direction * 10)
        const arrowBase = arrowTip - direction * 10
        return `<g class="comparison-row" data-food="${row.commodity}"><line x1="18" y1="${rowY + 32}" x2="1182" y2="${rowY + 32}" stroke="var(--d4-line)"/>
          <text x="20" y="${rowY + 5}" font-size="18">${row.commodity}</text>
          <line x1="${startX}" y1="${rowY}" x2="${endX}" y2="${rowY}" stroke="var(--d4-${row.colour})" stroke-width="2.5"/>
          ${shortChange ? `<line x1="${startX}" y1="${arrowY}" x2="${arrowBase}" y2="${arrowY}" stroke="var(--d4-${row.colour})" stroke-width="2.5"/>` : ''}
          <path class="change-arrow-head" d="M ${arrowTip} ${arrowY} L ${arrowBase} ${arrowY - 7} L ${arrowBase} ${arrowY + 7} Z" fill="var(--d4-${row.colour})"/>
          <circle cx="${startX}" cy="${rowY}" r="6" fill="var(--d4-2010)"/>
          <circle cx="${endX}" cy="${rowY}" r="7" fill="var(--d4-${row.colour})" stroke="var(--d4-paper)" stroke-width="2"/>
          <text x="805" y="${rowY - 3}" font-size="16">${escapeHtml(rowValues(row))}</text>
          <text x="805" y="${rowY + 18}" font-size="12">${row.classification}</text></g>`
      }).join('')}
      <text x="${plotLeft}" y="632" font-size="12">Arrows show 2010 → 2023. Short arrows sit below the dots. Select a row to explore its imports.</text>
    </svg>
    ${rows.map((row, index) => `<button type="button" class="chart-row-button" data-chart-row="${index}" style="top:${(y(index) - 29) / chartHeight * 100}%;height:${60 / chartHeight * 100}%" aria-label="${escapeHtml(rowSummary(row))} Show ${escapeHtml(row.commodity)} on the dashboard." title="${escapeHtml(rowSummary(row))}"><span class="sr-only">Explore ${row.commodity}</span></button>`).join('')}
  </div>`

  document.querySelectorAll('[data-chart-row]').forEach((button) => {
    const row = rows[Number(button.dataset.chartRow)]
    const describe = () => { $('#chart-detail').textContent = rowSummary(row) }
    button.addEventListener('pointerenter', describe)
    button.addEventListener('focus', describe)
    button.addEventListener('click', () => { describe(); showDashboard(row.commodity, 2023) })
  })
  $('#chart-table').innerHTML = `<table><caption>Largest supplier’s share of Singapore’s imports, 2010 and 2023</caption><thead><tr><th scope="col">Commodity</th><th scope="col">2010 supplier</th><th scope="col">2010 share</th><th scope="col">2010 supplier count</th><th scope="col">2023 supplier</th><th scope="col">2023 share</th><th scope="col">2023 supplier count</th><th scope="col">Change</th></tr></thead><tbody>${rows.map((row) => `<tr><th scope="row">${row.commodity}</th><td>${escapeHtml(row.before.partner)}</td><td>${pct(row.before.share)}%</td><td>${row.before.count}</td><td>${escapeHtml(row.after.partner)}</td><td>${pct(row.after.share)}%</td><td>${row.after.count}</td><td>${row.classification}</td></tr>`).join('')}</tbody></table>`

  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return
    destroyed = true
    clearTimeout(loadTimer)
    dashboardController.destroy()
  })
}

if (typeof document !== 'undefined') void init().catch((error) => console.warn('[D4 story] Could not initialise the story.', error))
