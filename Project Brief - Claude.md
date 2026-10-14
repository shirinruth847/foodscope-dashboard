# Project Brief: Food Self-Sufficiency vs Food Supply Dashboard

> Hand this whole file to the AI as context. Section 6 maps directly to the build rubric.
> Items marked **[ASSUMPTION]** were not stated in the proposal. Confirm or override them.

---

## 1. One-paragraph summary

A Vue 3 web app that guides readers through an interactive Tableau dashboard series on global food self-sufficiency. It uses FAOSTAT data for 178 countries, 2010-2023. For each country it computes a **self-sufficiency ratio** (the share of domestic food supply that comes from local production rather than imports) and compares it with **food supply per capita**. It then places **Singapore** in the global picture and tracks Singapore's local production against its revised 2035 targets. The scope is **national-level food availability** (is enough food available in the country?). It does **not** cover distribution within a population.

**Central question (use as the app's headline):**
*Does growing your own food mean greater food availability?*

**Audience:** students, journalists and policy analysts exploring whether greater domestic production corresponds to greater food availability.

---

## 2. Objectives (these become the three narrative sections, in this order)

| # | Objective | What the reader should see |
|---|-----------|----------------------------|
| 1 | Calculate production-based self-sufficiency and import dependency for each country and major food category, and show how they have changed since 2010. | World map of self-sufficiency; trend over time; breakdown by food category. |
| 2 | Compare these measures with food supply per capita, to test whether greater domestic production relative to national supply is associated with higher food availability per person. | Scatter or comparison view of self-sufficiency vs supply per capita; side-by-side country comparison of food-supply structure. |
| 3 | Place Singapore within the global picture and track its local production against the revised 2035 targets. | Singapore highlighted in the global view; Singapore-specific view of local production vs targets. |

---

## 3. Key facts the narrative can use

Use only these facts, with citations. Do not invent statistics.

**Singapore (SFA, *Singapore Food Statistics 2025*; MSE speech by Grace Fu, 2025):**
- In 2025, local farms supplied about **8% of local fibre consumption** and **25% of local protein consumption**.
- In **Nov 2025**, Singapore replaced its "30 by 30" goal with **Singapore Food Story 2**, targeting **20% of local fibre consumption and 30% of local protein consumption by 2035**.
- The strategy treats local production as **one of four pillars**: local production, import diversification, stockpiling, global partnerships.
- The 2035 targets use **narrower definitions** (fibre, protein) than "30 by 30", so direct comparison across the two frameworks is not straightforward. Show this as a caveat.

**Global trade (FAO Food Balance Sheets 2010-2023):**
- In 2023, about **46%** of global vegetable oil production, **34%** of fish and seafood, **26%** of pulses and **20%** of cereals were exported.
- So food available in a country depends substantially on trade, not just domestic production.

**Prior research (use for framing and caveats):**
- *Baer-Nawrocka & Sadowski (2019, PLOS ONE):* domestic production supports food availability mainly in richer countries with good farming conditions (e.g. North America, Europe). Trade secures availability in import-dependent regions (Middle East, North Africa, parts of South America). Limitation: it is a single-year typology, so it can't show change over time.
- *Takahashi (2025, Agriculture & Food Security):* the conventional self-sufficiency ratio is grain-focused. No ratio guarantees the diversity or reliability of a country's food supply.
- *Clapp (2017, Food Policy):* self-sufficiency as a policy goal. It has long been viewed as a way to safeguard national food availability, but it is debated.
- **Framing for Singapore:** it has a very low self-sufficiency ratio yet a consistently high, diversified food supply via trade. It is a natural test of whether the ratio predicts availability.
- **Narrative rule:** the relationship between self-sufficiency and availability is **not consistent globally**. Do not claim causation. Use "associated with" language.

---

## 4. Data

**Global (FAOSTAT):**
- *Food Balances (2010-)*: sources of supply and utilisation per food item per country, including food composition factors.
- *Production Indices*: volume of agricultural production per year per country.
- *Crops and livestock products*: import and export quantities and values.

**Singapore (data.gov.sg):**
- *Local Production, Annual*: vegetables, seafood, eggs, total production value.
- *Licensed Local Food Farms, Annual*: number of farms by category.

**Derived measures:**
- **Self-sufficiency ratio** (per country, food category, year): share of domestic supply from local production. **[ASSUMPTION]** Standard form: `production / (production + imports − exports)`. Confirm the team's exact formula.
- **Import dependency**: the complement, i.e. the share of supply that comes from imports. **[ASSUMPTION]**
- **Food supply per capita**: from Food Balances.

**Data prep notes:**
- Tableau Prep consolidates the bulk files, separates real countries from FAO regional aggregates, and derives the ratio.
- Python (pandas) profiles indicator completeness and validates figures against published national statistics.
- The dataset carries explicit coordinates and an ISO3 field, so maps need no boundary files or geocoding.
- The proposal says filters are by "flag, gear and period". **[ASSUMPTION]** "gear" is probably a typo. Treat filters as country (ISO3), food category, and year/period.

---

## 5. Tech stack and constraints

- **Tableau Desktop**: primary tool for building the views. Parameters and dashboard actions drive the interactive filtering.
- **Vue 3 app** with **Vue Router**.
- **Tableau Embedding API v3**: views are embedded live as `<tableau-viz>` web components, **not static images**.
- **Static site** deployment (no server-side code). **[ASSUMPTION]** Hosting is GitHub Pages, Netlify or Vercel. Pick one and confirm.
- The Vue layer's job is **narrative structure**: guiding readers through the three objectives in sequence.
- Must work on a **different person's machine and browser**, not only the developer's.

**Technical notes for the embed:**
- Load the Embedding API v3 as an ES module script from the host that serves the published workbook (e.g. Tableau Public: `https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js`).
- Tell Vue that `tableau-viz` is a custom element, otherwise Vue warns about an unresolved component. In `vite.config.js`: `vue({ template: { compilerOptions: { isCustomElement: tag => tag.startsWith('tableau-') } } })`.
- Make the embed responsive. Set `hide-tabs`, and set `toolbar` deliberately.
- If the workbook is on Tableau Cloud/Server rather than Public, authentication or Connected Apps (JWT) may be required. Check this early.

---

## 6. Build tasks (rubric) with acceptance criteria

### Task 1: Scaffold the Vue 3 app with routing and placeholder slots for each view
- Create a Vue 3 + Vite project with Vue Router.
- **Routes (one per narrative stage):**
  - `/`: Intro and the central question
  - `/self-sufficiency`: Objective 1
  - `/availability`: Objective 2
  - `/singapore`: Objective 3
  - `/about`: data sources, methodology, limitations, references
- Each view page has a **placeholder slot** (a clearly labelled box with a fixed aspect ratio) where a `<tableau-viz>` will go, plus a slot for narrative text.
- Shared layout: header with step navigation (1 → 2 → 3), Previous/Next controls, and a footer.
- **Done when:** the app runs locally, all routes render, navigation works, and each view page shows a placeholder where its viz will be.

### Task 2: Publish one test view to Tableau and confirm Embedding API v3 works end to end
- **Human step:** publish one simple view (e.g. the world map) to Tableau Public or Cloud.
- Build a reusable `TableauEmbed.vue` component that takes `src`, `height`, and optional filter props, and renders `<tableau-viz>`.
- Load the Embedding API v3 script and register `tableau-viz` as a custom element.
- Add a fallback state if the viz fails to load, with a clear error message and a link to the viz.
- **Done when:** the test view renders inside the Vue app, is interactive (hover, filter, click), and works in both dev and a production build.
- **Do not build the remaining views until this passes.**

### Task 3: Write the narrative layer
Write the guiding text for each of the three objectives, in sequence.

Each section needs:
1. A one-line **question** the section answers.
2. A short **framing paragraph** (2-4 sentences), using the facts in §3 only.
3. **"What to look at"**: 2-3 prompts for what to explore in the embedded view.
4. A **takeaway** that uses associational language and states the caveat.
5. A "Next" link into the following section.

Also write: an intro (central question, scope statement that this is availability and not distribution, who it's for) and an About/Methods page (definition of the ratio, data sources, limitations).

**Tone:** plain English for non-specialists. No causal claims. State limitations explicitly (§3). Keep the text in a content file or constants module, not hard-coded in templates, so it can be edited easily.

**Done when:** all sections have final copy, every statistic is traceable to §3, and references are listed on `/about`.

### Task 4: Embed all finished views
- Replace each placeholder with its published `<tableau-viz>` using the shared `TableauEmbed.vue`.
- Interactivity must be preserved (filters, map selection, parameters).
- **Done when:** every route shows its live view with no console errors, and it is usable at desktop and tablet widths.

### Task 5: Deploy as a static site and verify on another person's machine and browser
- Build with `vite build` and deploy to the chosen static host.
- If using client-side routing on a host without rewrite rules, use **hash history** or add a `404.html` fallback, and set the correct `base` path in the Vite config.
- **Verification checklist (run by a person other than the developer):**
  - [ ] Site loads from the public URL on a different machine.
  - [ ] Works in at least Chrome and one other browser (Safari or Firefox).
  - [ ] Every route loads directly by URL and on refresh (no 404s).
  - [ ] Every Tableau view loads and is interactive.
  - [ ] No mixed-content or CORS errors in the console.
  - [ ] Narrative text and references display correctly.
- **Done when:** the checklist is passed and the URL is recorded in the README.

---

## 7. Project milestones (from the proposal)

| Week | Milestone |
|------|-----------|
| 6 | Data collection and exploration |
| 7 | Data cleaning and preparation |
| 9 | Dashboard creation |
| 11 | User testing and iterative dashboard refinement |
| 12 | User guidebook creation |
| 13 | Final report and presentation preparation |

---

## 8. Open questions to confirm

1. The exact self-sufficiency ratio formula and food category groupings.
2. The hosting platform, and whether the workbook is on Tableau Public or Cloud/Server.
3. How many Tableau views exist in total, and which routes each one belongs to.
4. What "gear" refers to in the filter list.
5. How to present the "30 by 30" vs 2035 definition mismatch for Singapore (side-by-side caveat vs a single chart).

---

## 9. References

1. Baer-Nawrocka, A. & Sadowski, A. (2019). Food security and food self-sufficiency around the world: A typology of countries. *PLOS ONE* 14(3): e0213448. https://doi.org/10.1371/journal.pone.0213448
2. Clapp, J. (2017). Food self-sufficiency: Making sense of it, and when it makes sense. *Food Policy* 66: 88-96. https://doi.org/10.1016/j.foodpol.2016.12.001
3. FAO (2025). Food Balance Sheets 2010-2023. https://www.fao.org/statistics/highlights-archive/highlights-detail/food-balance-sheets-2010-2023/en
4. Ministry of Sustainability and the Environment (2025). Speech by Ms Grace Fu at the Asia-Pacific Agri-Food Innovation Summit. https://www.mse.gov.sg/latest-news/asia-pacific-agri-food-innovation-summit--singapore-international-agri-food-week----ms-grace-fu/
5. Singapore Food Agency (2026). Singapore Food Statistics 2025. https://www.sfa.gov.sg/news-publications/newsroom/singapore-food-statistics-2025
6. Takahashi, G. (2025). A new method for calculating the food self-sufficiency ratio: Supply-side food self-sufficiency ratio. *Agriculture & Food Security*. https://doi.org/10.1186/s40066-025-00570-z
