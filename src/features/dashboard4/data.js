export const FOODS = { 'Chicken meat': '🍗', Eggs: '🥚', 'Live chickens': '🐔', Pork: '🐖', Rice: '🍚', Vegetables: '🥬', Wheat: '🌾' }
export const formatShare = (share) => (share * 100).toFixed(1)

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
      explanation: `India now leads, but in 2010 Thailand was the largest supplier with ${formatShare(getStats(data, 'Rice', 2010).share)}%.`,
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
// calculated from supplier shares. See README.md for their provenance and limits.
export function getSteps(data) {
  const stats = (commodity, year = 2023) => getStats(data, commodity, year)
  const vegetables = stats('Vegetables')
  const eggsBefore = stats('Eggs', 2010)
  const eggsAfter = stats('Eggs')
  return [
    { label: 'Many suppliers', title: 'Many suppliers. One big share.', target: ['Vegetables', 2023],
      text: `Singapore imported vegetables from <strong>${vegetables.count} countries</strong> in 2023. Yet Malaysia supplied <strong>${formatShare(vegetables.share)}%</strong>—many sources can still mean relying heavily on one.` },
    { label: 'One disrupted route', title: 'When one route is interrupted.', target: ['Live chickens', 2022],
      text: `In 2022, the year of Malaysia’s export ban, Singapore’s live chicken imports fell <strong>38%</strong>. Malaysia still supplied <strong>${formatShare(stats('Live chickens', 2022).share)}%</strong>. In the same year, chicken meat imports rose <strong>34%</strong>.` },
    { label: 'More diverse sources', title: 'Eggs spread their origins.', target: ['Eggs', 2023],
      text: `Malaysia’s share of egg imports fell from <strong>${formatShare(eggsBefore.share)}%</strong> in 2010 to <strong>${formatShare(eggsAfter.share)}%</strong> in 2023. Over that period, suppliers grew from <strong>${eggsBefore.count}</strong> to <strong>${eggsAfter.count}</strong>.` },
  ]
}

export const SOURCE_NOTE = "Source: FAOSTAT Detailed Trade Matrix, import quantities reported by Singapore, 2010–2023. Excludes locally produced food and seafood. Live chickens counted by head; other foods by weight."
