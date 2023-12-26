import react from '@vitejs/plugin-react-swc'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3000,
  },
  plugins: [react(), topLevelAwait()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
