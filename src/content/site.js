/**
 * FoodScope content.
 * All visible copy lives here so it can be edited without touching layout code.
 * Statistics must come from the project brief §3 and be cited. Use
 * "associated with" language: the brief rules out causal claims.
 */

export const SITE = {
  brand: 'FoodScope',
  eyebrow: 'IS428 Visual Analytics Final Project G1T1',
  title: 'Does growing your own food mean greater food availability?',
  lede:
    'An interactive look at food self-sufficiency and food supply across 178 countries from 2010 to 2023, and where Singapore fits in the global picture.',
  team: ['Anjali', 'Anumitaa', 'Shirin', 'Shree', 'Sreya'],
  stats: [
    { value: '178', label: 'Countries' },
    { value: '2010–2023', label: 'Years covered' },
    { value: 'FAOSTAT', label: 'Primary data source' },
  ],
}

/** Top navigation. Each `id` must match a section's id on the page. */
export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'problem', label: 'Problem' },
  { id: 'findings', label: 'Key Findings' },
  { id: 'dashboards', label: 'Explore Dashboards' },
  { id: 'recommendations', label: 'Recommendations' },
]

export const PROBLEM = {
  title: 'Problem',
  paragraphs: [
    'Self-sufficiency has long been seen as a way to safeguard national food availability, but the idea is contested (Clapp, 2017). Much of the world’s food crosses borders. In 2023, about 46% of global vegetable oil production, 34% of fish and seafood, 26% of pulses and 20% of cereals were exported (FAO, 2025). What a country has to eat depends heavily on trade, not only on what it grows.',
    'Singapore is a natural test case. Local farms supplied about 8% of fibre and 25% of protein consumption in 2025 (SFA, 2026), yet the country has a consistently high and diverse food supply. In November 2025 it replaced its “30 by 30” goal with Singapore Food Story 2, which targets 20% of fibre and 30% of protein from local production by 2035 (MSE, 2025).',
  ],
  question:
    'Is a higher share of domestically produced food associated with greater food availability per person, and how does Singapore compare?',
  scope:
    'Scope: this study looks at national food availability (is enough food available in the country?), not how food is distributed within a population.',
}

/**
 * Key findings. Replace each `text` with a final finding once the dashboards
 * are done. Cards with `placeholder: true` are styled as drafts.
 */
export const FINDINGS = {
  title: 'Key Findings',
  intro: 'Headline insights from our analysis of 178 countries, 2010–2023.',
  items: [
    { tag: 'Self-sufficiency', text: 'Finding to be added: how self-sufficiency and import dependency have changed since 2010.', placeholder: true },
    { tag: 'Food categories', text: 'Finding to be added: which food categories countries produce domestically versus import.', placeholder: true },
    { tag: 'Availability', text: 'Finding to be added: how self-sufficiency relates to food supply per capita across countries.', placeholder: true },
    { tag: 'Supply structure', text: 'Finding to be added: how the food-supply structure differs between comparable countries.', placeholder: true },
    { tag: 'Singapore', text: 'Finding to be added: where Singapore sits relative to its global peers.', placeholder: true },
    { tag: '2035 targets', text: 'Finding to be added: Singapore’s local production against its 2035 fibre and protein targets.', placeholder: true },
  ],
}

/**
 * Dashboards. To embed a published Tableau Public view, set `src` to its link
 * in the form https://public.tableau.com/views/WorkbookName/SheetName
 * Leave `src` empty to show a placeholder.
 */
export const DASHBOARDS = {
  title: 'Explore Dashboards',
  intro: 'Interactive Tableau dashboards. Hover, filter and click to explore the data.',
  items: [
    { id: 'dashboard-1', title: 'Dashboard 1', description: '', src: 'https://public.tableau.com/views/testing-dashboard/Dashboard1', height: '820px' },
    { id: 'dashboard-2', title: 'Dashboard 2', description: '', src: '', height: '820px' },
    { id: 'dashboard-3', title: 'Dashboard 3', description: '', src: '', height: '820px' },
    { id: 'dashboard-4', title: 'Dashboard 4', description: '', src: '', height: '820px' },
    { id: 'dashboard-5', title: 'Dashboard 5', description: '', src: '', height: '820px' },
    { id: 'dashboard-6', title: 'Dashboard 6', description: '', src: '', height: '820px' },
  ],
}

export const RECOMMENDATIONS = {
  title: 'Recommendations',
  intro: 'What our findings suggest for policymakers and planners.',
  items: [
    { title: 'Recommendation 1', text: 'To be added once the findings are final.', placeholder: true },
    { title: 'Recommendation 2', text: 'To be added once the findings are final.', placeholder: true },
    { title: 'Recommendation 3', text: 'To be added once the findings are final.', placeholder: true },
  ],
  caveat:
    'The relationship between self-sufficiency and food availability is not consistent across countries. Our results describe associations, not causes.',
}

export const REFERENCES = [
  { short: 'Baer-Nawrocka & Sadowski (2019)', text: 'Food security and food self-sufficiency around the world: A typology of countries. PLOS ONE 14(3).', url: 'https://doi.org/10.1371/journal.pone.0213448' },
  { short: 'Clapp (2017)', text: 'Food self-sufficiency: Making sense of it, and when it makes sense. Food Policy 66: 88–96.', url: 'https://doi.org/10.1016/j.foodpol.2016.12.001' },
  { short: 'FAO (2025)', text: 'Food Balance Sheets 2010–2023.', url: 'https://www.fao.org/statistics/highlights-archive/highlights-detail/food-balance-sheets-2010-2023/en' },
  { short: 'MSE (2025)', text: 'Speech by Ms Grace Fu at the Asia-Pacific Agri-Food Innovation Summit.', url: 'https://www.mse.gov.sg/latest-news/asia-pacific-agri-food-innovation-summit--singapore-international-agri-food-week----ms-grace-fu/' },
  { short: 'SFA (2026)', text: 'Singapore Food Statistics 2025.', url: 'https://www.sfa.gov.sg/news-publications/newsroom/singapore-food-statistics-2025' },
  { short: 'Takahashi (2025)', text: 'A new method for calculating the food self-sufficiency ratio. Agriculture & Food Security.', url: 'https://doi.org/10.1186/s40066-025-00570-z' },
]
