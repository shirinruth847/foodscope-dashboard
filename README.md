# FoodScope Dashboard

A Vue 3 web app that guides readers through an interactive Tableau dashboard series on global food self-sufficiency (FAOSTAT data, 178 countries, 2010–2023), with a focus on where Singapore stands.

**Central question:** *Does growing your own food mean greater food availability?*

## Requirements

- [Node.js](https://nodejs.org/) **20.19+ or 22.12+** (required by Vite 7). Check your version with `node -v`.
- npm (comes with Node.js)

## Getting started

From the project root:

```bash
# 1. Install dependencies (first time only, or after package.json changes)
npm install

# 2. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser. The page reloads automatically when you edit files. Press `Ctrl+C` in the terminal to stop the server.

> The dev server is pinned to port 5173 (`strictPort` in `vite.config.js`). If something else is already using that port, Vite will exit with an error instead of picking another port. Stop the other process and try again.

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production version into `dist/` |
| `npm run preview` | Serve the built `dist/` folder at http://localhost:4173 |

## Troubleshooting

**`npm install` fails with `ERESOLVE could not resolve`**
This happens when `@vitejs/plugin-vue` doesn't support the installed Vite version. The project uses Vite 7 with `@vitejs/plugin-vue` v6, so make sure `package.json` lists `"@vitejs/plugin-vue": "^6..."`. Don't fix it with `--force` or `--legacy-peer-deps`.

**`npm audit` reports vulnerabilities**
These come from development dependencies and are safe to ignore for local development. Avoid `npm audit fix --force`, because it can install incompatible major versions.

## Project structure

```
├── index.html        # App entry HTML
├── src/              # Vue app: components, views, router, content and styles
├── public/           # Static assets served as-is
└── vite.config.js    # Vite config (registers <tableau-viz> as a custom element)
```
