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
    { value: 'FAOSTAT', label: 'Primary data source' },
  ],
}

/**
 * Side navigation, one entry per page. `summary` is shown on the home page cards.
 * The Explore Dashboards entry gets a sub-link per item in DASHBOARDS.items.
 */
export const NAV = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'problem', label: 'Problem', path: '/problem', summary: 'Why producing more food at home doesn’t automatically mean more food available.' },
  { id: 'findings', label: 'Key Findings', path: '/findings', summary: 'Headline insights from 178 countries, 2010–2023.' },
  { id: 'dashboards', label: 'Explore Dashboards', path: '/dashboards', summary: 'Six interactive Tableau dashboards to explore the data yourself.' },
  { id: 'recommendations', label: 'Recommendations', path: '/recommendations', summary: 'What the findings suggest for policymakers and planners.' },
]

export const PROBLEM = {
  title: 'Problem',
  banner: {
    src: '/images/problem-rice-paddy.png',
    alt: 'Two farmers working in a flooded green rice paddy. One bends over the seedlings while the other shakes mud from a bundle of uprooted rice plants.',
  },
  photo: {
    src: '/images/problem-harvest.png',
    alt: 'A farmer in a straw hat walks along a dirt path beside a cornfield, carrying a bucket and a basket of freshly picked corn on a shoulder pole.',
  },
  paragraphs: [
    'Governments have long treated domestic food production as a safeguard for national food availability. But food supply doesn’t stop at the border: a large share of the world’s cereals, fish and oils is traded. Whether countries that produce more of their own food really have more food available per person is rarely checked, and the data sits in separate FAOSTAT tables that governments and policy analysts cannot easily compare. Without a consistent way to do so over time, it’s hard to tell whether growing more food at home actually puts more food on the table.'
  ],
  question:
    'Is a higher share of domestically produced food associated with greater food availability per person, and how does Singapore compare?',
  scope:
    'Scope: This study looks at national food availability (whether enough food is available in the country), not how food is distributed within a population.',
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
 * Leave `src` empty to show a placeholder. Each dashboard gets its own page
 * at /dashboards/<slug>.
 */
export const DASHBOARDS = {
  title: 'Explore Dashboards',
  intro: 'Interactive Tableau dashboards. Hover, filter and click to explore the data.',
  items: [
    { slug: '1', title: 'Dashboard 1', description: '', src: 'https://public.tableau.com/views/testing-dashboard/Dashboard1', height: '820px' },
    { slug: '2', title: 'Dashboard 2', description: '', src: '', height: '820px' },
    { slug: '3', title: 'Dashboard 3', description: '', src: '', height: '820px' },
    { slug: '4', title: 'Dashboard 4', description: '', src: '', height: '820px' },
    { slug: '5', title: 'Dashboard 5', description: '', src: '', height: '820px' },
    { slug: '6', title: 'Dashboard 6', description: '', src: '', height: '820px' },
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
}

export const REFERENCES = [
  { short: 'Baer-Nawrocka & Sadowski (2019)', text: 'Food security and food self-sufficiency around the world: A typology of countries. PLOS ONE 14(3).', url: 'https://doi.org/10.1371/journal.pone.0213448' },
  { short: 'Clapp (2017)', text: 'Food self-sufficiency: Making sense of it, and when it makes sense. Food Policy 66: 88–96.', url: 'https://doi.org/10.1016/j.foodpol.2016.12.001' },
  { short: 'FAO (2025)', text: 'Food Balance Sheets 2010–2023.', url: 'https://www.fao.org/statistics/highlights-archive/highlights-detail/food-balance-sheets-2010-2023/en' },
  { short: 'MSE (2025)', text: 'Speech by Ms Grace Fu at the Asia-Pacific Agri-Food Innovation Summit.', url: 'https://www.mse.gov.sg/latest-news/asia-pacific-agri-food-innovation-summit--singapore-international-agri-food-week----ms-grace-fu/' },
  { short: 'SFA (2026)', text: 'Singapore Food Statistics 2025.', url: 'https://www.sfa.gov.sg/news-publications/newsroom/singapore-food-statistics-2025' },
  { short: 'Takahashi (2025)', text: 'A new method for calculating the food self-sufficiency ratio. Agriculture & Food Security.', url: 'https://doi.org/10.1186/s40066-025-00570-z' },
]
