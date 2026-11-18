# Dashboard 5: integrated story

The main `/dashboards/5` page contains the quiz, three selectable explanations,
one shared Tableau embed and the static supplier-share comparison chart.
The standalone reference remains at `/dashboard4-story/d4_story.html` (its original reference path).

## File map

| File | Responsibility |
| --- | --- |
| `Dashboard5Story.vue` | Page, scoped theme, current selection and embed connection |
| `ImportQuiz.vue` | Three questions, answer feedback, supplier bars and score |
| `SupplierComparison.vue` | Static SVG chart, keyboard row controls and accessible table |
| `data.js` | Quiz/story copy, percentages, supplier counts, classifications and sorting |
| `supplier-shares.json` | Exact copy of the supplied Singapore supplier-share dataset |
| `tableau.js` | Parameter queue, deduplication, manual-change notifications and cleanup |

`src/views/DashboardView.vue` lazily loads `Dashboard5Story.vue` for slug `5`;
the existing template serves the other dashboards. Numbering and findings are
configured in `src/content/site.js`, and homepage story links in `HomeView.vue`.
The router, sidebar, global styles and shared Tableau embed are unchanged.
Each component's styles are scoped; extra colour tokens inherit from the
Dashboard 5 page only. No packages were added.

## Tableau lifecycle

`TableauEmbed.vue` owns the one visualization, lazy loading, reset button, error
fallback, retry and responsive dimensions. The URL and dimensions come from
Dashboard 5's existing `DASHBOARDS` entry in `src/content/site.js`.

The story stores the latest selection even before the lazy embed loads. Its
`load` event provides the ready visualization to `createDashboardController()`;
FirstInteractive has already fired, so the controller starts immediately.
The controller then applies the pending food/year, with numeric years, and
observes manual changes including resets. A retry reconnects a new controller
and reapplies the latest selection. Leaving Dashboard 5 destroys its listeners.

The quiz, explanations and local chart remain usable if Tableau fails. Every
selector uses the same visualization; scrolling never changes its selection.
The graph contains no emojis, animation or playback controls.

## Data notes

All displayed supplier shares, names, counts and chart classifications come
from the JSON. Counts include every supplied record, including tiny shares
rounded to zero. Percentages are rounded to one decimal; the largest supplier
may differ between 2010 and 2023 (as shown for rice).

Chart classifications use the change in the largest supplier's share: at least
5 percentage points lower is “More diversified”, at least 5 higher is “More
concentrated”, and smaller changes are “Little change”. This is not a full
supplier-diversity index. Short arrows sit below the dots to keep heads visible;
all x coordinates remain on the same 0–100% scale.

The 38% fall in live-chicken imports, 34% rise in chicken-meat imports and 2022
export-ban context are fixed facts supplied in the brief; they cannot be
verified from the share-only JSON. Verify the underlying quantities before a
final report. The narrative describes the two import changes as occurring in
the same year, without asserting causation.

The live-chicken quiz answer is for 2023 (97.2%); its labelled map button opens
2022 (98.9%), as requested. “100%” in the quiz is qualified as rounded.

## Build

From the repository root:

```sh
npm run build
```
