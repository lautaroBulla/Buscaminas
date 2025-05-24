import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '', // <– esto es importante para usar solo "dark" y no "dark-mode"
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'es', file: 'es.json', name: 'Spanish' }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
      alwaysRedirect: false,
      redirectOn: 'root' 
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
    server: {
      watch: {
        usePolling: true
      },
      proxy: {
        '/api': 
          { 
            target: process.env.VITE_URL_BACKEND,
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            configure: (proxy, _options) => {
              proxy.on('error', (err, _req, _res) => {
                console.log('proxy error', err);
              });
              proxy.on('proxyReq', (proxyReq, req, _res) => {
                console.log('Sending Request to the Target:', req.method, req.url);
              });
              proxy.on('proxyRes', (proxyRes, req, _res) => {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              });
            }
          }
      }
    }
  },
})