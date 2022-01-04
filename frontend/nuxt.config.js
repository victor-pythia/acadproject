export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'acad',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  axios: {
    // proxyHeaders: false
    baseURL: 'eduboard.pythia.social/api'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/api/auth/me', method: 'get', propertyName: 'user' },
          logout: false
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        globalToken: true,
      }
    },
    resetOnError: true

  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/videoPlayer.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
