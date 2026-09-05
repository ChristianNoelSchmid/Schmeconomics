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
    registerType: 'prompt',
    manifest: {
      name: 'Schmeconomics',
      short_name: '$ch',
      start_url: '/',
      description: 'A simple budgeting app',
      display: 'fullscreen',
      theme_color: '#fff',
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
          purpose: 'any maskable'
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true
    },
    devOptions: {
      enabled: false, // Allows you to test PWA features in dev mode
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})