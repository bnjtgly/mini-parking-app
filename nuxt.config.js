export default {
  state: () => ({}),

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    axios: {
      browserBaseURL: process.env.API_URL_BROWSER
    }
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mini-parking-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    // '@nuxtjs/auth',
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    '@nuxtjs/toast'
  ],

  toast: {
    position: 'top-right',
    duration: 2 * 1000,
    keepOnHover: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    headers: {
      common: {
        'Accept': 'application/json'
      }
    }
  },

  // Authentication configuration
  auth: {
    cookie: {
      options: {
        sameSite: 'lax'
      }
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          global: true
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          tokenRequired: true
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: {url: 'login', method: 'post'},
          refresh: {url: 'refresh_me', method: 'post'},
          logout: {url: 'logout', method: 'delete'},
          user: {url: '/api/v1/users', method: 'get'}
        },
      },
    },
    redirect: {
      login: 'signin',
      logout: 'signin',
      callback: 'signin',
      home: '/'
    },
    router: {
      middleware: ['auth']
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
