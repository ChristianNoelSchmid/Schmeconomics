// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/hints',
    '@nuxt/eslint',
    '@nuxt/image',
    '@vite-pwa/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:5153'
    }
  },
  css: [
    '@/styles.css'
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Schmeconomics',
      short_name: '$ch',
      theme_color: '#fff',
      start_url: '/',
      description: 'A simple budgeting app',
      display: 'standalone',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      navigateFallback: '/'
    },
    devOptions: {
      enabled: false, // Allows you to test PWA features in dev mode
    },
    client: {
      installPrompt: true
    }
  },
})