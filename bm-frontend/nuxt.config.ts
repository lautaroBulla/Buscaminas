import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/themes/classicTheme.css', '~/assets/css/themes/darkTheme.css'],
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@nuxtjs/color-mode'],

  colorMode: {
    preference: 'light', 
    fallback: 'dark', 
    storageKey: 'nuxt-color-mode', 
    storage: 'cookie',
    classSuffix: ''
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
      cookieKey: 'i18n_locale',
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
            target: process.env.API_URL_BACKEND,
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            configure: (proxy, _options) => {
              proxy.on('error', (err, _req, _res) => {
                console.log('UUUUUUUUUUURRRRRRRRRRRLLLLLLLLLL', process.env.API_URL_BACKEND);
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
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    public: {
      apiBaseUrl: process.env.API_URL_BACKEND,
    }
  }
})