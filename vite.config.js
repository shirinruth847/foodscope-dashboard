import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // <tableau-viz> is a custom element from the Tableau Embedding API (v3).
        // Registering it here stops Vue from warning about an unresolved
        // component when we start embedding live views (Task 2).
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('tableau-'),
        },
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    target: ['es2020', 'edge90', 'firefox78', 'chrome87', 'safari14'],
  },
})