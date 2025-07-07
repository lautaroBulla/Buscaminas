import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/themes/classicTheme.css', '~/assets/css/themes/darkTheme.css'],
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: '',
    preference: 'system', 
    fallback: 'dark', 
    storageKey: 'nuxt-color-mode', 
    storage: 'cookie',
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
            rewrite: path => path.replace(/^\/api/, '')
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