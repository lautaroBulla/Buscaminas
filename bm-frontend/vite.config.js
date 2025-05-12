import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/locales/**'
      ),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
})
