# Dashboard 4: isolated story experiment

This folder preserves the standalone experiment for reference. The integrated
version now lives at `/dashboards/4`, with its source under
`src/features/dashboard4/`; see that folder's README for the integration map.
This prototype remains independent of the main app.

## Preview

Run `npm run dev` from the repository root and open:

http://localhost:5173/dashboard4-story/d4_story.html

Vite serves this folder directly and copies it into the production build. The
prototype is deliberately not added to the existing navigation. Removing this
folder removes only the standalone reference; the main Dashboard 4 is independent.

## File map

| File | Purpose |
| --- | --- |
| `d4_story.html` | Standalone page: quiz → story with one Tableau embed → chart |
| `d4_story.css` | Local layout, responsive rules and prefixed design tokens |
| `d4_story.js` | Data calculations, shared Tableau controller, quiz, story, SVG chart |
| `d4_basket.json` | Exact copy of the supplied Singapore supplier-share JSON |

The page uses plain HTML/CSS/JavaScript. It imports no Vue code or chart library,
loads no web fonts, and has no new package dependencies. Font stacks and colours
mirror FoodScope; installed fonts are used where available.

## Configuration and copy

- **Tableau URL and size:** `CONFIG` at the top of `d4_story.js`. The URL is the
  currently configured D4 workbook, `D4_17949258250760/Dashboard2`. The prototype
  uses the new brief's fixed **1200 × 800 px**, independently of the original
  app's dimensions. The frame scrolls horizontally when it is narrower.
- **Colours/fonts:** `--d4-*` variables at the top of `d4_story.css`.
- **Quiz:** `getQuiz()` in `d4_story.js`.
- **Story:** `getSteps()` in `d4_story.js`.
- **Chart rules:** `compareSuppliers()` in `d4_story.js`.
- **Chart display:** fixed 2010 and 2023 markers with arrows showing the direction
  of change. Short arrows sit below the data dots to keep the arrowheads visible.
  Values are labelled 2010 → 2023; the chart has no decorative icons or animation.
- **Supplier data:** replace `d4_basket.json` with the same schema. Shares are
  fractions, not percentages. Lists must be sorted largest first.

## Data and interpretation

All supplier shares, names, counts, chart order and classifications are calculated
from the JSON. Supplier counts include all records in a year's list, including
small shares that rounded to zero in the supplied file. Percentages are formatted
to one decimal; rounding means totals may differ very slightly from 100%.

“More diversified” in the chart means **a reduction of at least 5 percentage points
in the largest supplier's share**, not a claim about a full diversity index.

These **fixed figures were supplied in the brief**, and cannot be validated from
the supplier-share JSON alone:

- 2022 live-chicken import quantity fell 38%.
- 2022 chicken-meat import quantity rose 34%.
- The 2022 Malaysian chicken export-ban context.

They appear in the requested copy. Verify their underlying trade quantities
before treating this experimental page as a final report. The story has three
selectable examples: vegetable supplier concentration, the 2022 live-chicken
example, and egg diversification. Other foods remain in the quiz, Tableau
dashboard and comparison chart.
The Malaysia “100%” wording is qualified as **rounded**: the supplied early
live-chicken shares are 99.96–100%, rather than all being mathematically 100%.
The 2023 quiz answer is 97.2%; its map link intentionally opens 2022 (98.9%),
as specified by the brief, and labels that year on the button.

## Interaction and integration

`setDashboard(commodity, year)` is exported from `d4_story.js`. It uses the one
existing `<tableau-viz>`, queues calls until `firstinteractive`, serialises changes,
and skips parameters whose values already match. Years are sent as numbers.
After the dashboard is ready, fast interactions replace unstarted selections
with the latest requested one, rather than replaying a backlog of stale steps.
Manual changes in Tableau update the cached values. An API or loading error
leaves the quiz, explanation and chart usable.

Three native buttons sit above a single explanation panel and the dashboard.
Choosing a button changes the explanation and Tableau selection together,
without moving the page. Buttons use `aria-pressed` and work with Tab and
Enter/Space. They stack on small screens; the dashboard remains in the normal
page flow at every size. Scrolling never changes its selection.

Quiz and chart links can still jump directly to a food/year. Matching examples
are selected automatically; other selections show a brief exploration message
and clear the pressed buttons. This keeps the text aligned with the dashboard.

The integrated Vue version is in `src/features/dashboard4/`. It renders native
Vue components and reuses the app's shared embed with lifecycle cleanup. This
standalone document stays independent; do not mount it inside the Vue page,
which would create a second embed.

## Build

From the repository root:

```sh
npm run build
```
