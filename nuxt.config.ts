import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // The app relies on browser-only state (localStorage) throughout, so it
  // runs as a client-rendered SPA.
  ssr: false,

  modules: ['motion-v/nuxt'],

  // Register components by file name only (e.g. components/layout/NavBar.vue -> <NavBar>)
  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'CreativeSelf',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Empowers individuals and businesses to explore and express creativity through a dynamic, user-friendly platform with fluid, engaging design.',
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
  },

  typescript: {
    strict: true,
  },
})
