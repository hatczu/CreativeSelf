import tailwindcss from '@tailwindcss/vite'

// `npm run generate:artifact` builds a self-contained static copy for hosts that
// serve the app from an unknown sub-path and can't use path-based URLs
// (e.g. a Claude artifact): hash routing + relative asset URLs.
const isArtifactBuild = process.env.ARTIFACT_BUILD === '1'

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
    define: {
      __ASSET_BASE__: JSON.stringify(isArtifactBuild ? './' : '/'),
      __ARTIFACT_BUILD__: JSON.stringify(isArtifactBuild),
    },
  },

  router: {
    options: { hashMode: isArtifactBuild },
  },

  app: {
    ...(isArtifactBuild ? { cdnURL: './', buildAssetsDir: '/assets/' } : {}),
    head: {
      // In the artifact build the host may add a plain `#name` to the URL, which the
      // hash router would treat as an unknown page. Reset any such hash to the home route
      // before the app starts.
      script: isArtifactBuild
        ? [{ innerHTML: "if (location.hash && location.hash.indexOf('#/') !== 0) history.replaceState(null, '', location.pathname + location.search + '#/');" }]
        : [],
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

  experimental: {
    // The artifact build has no server to answer app-manifest requests.
    appManifest: !isArtifactBuild,
  },

  typescript: {
    strict: true,
  },
})
