// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/mdc',
  ],
  runtimeConfig: {
    tursoDatabaseUrl: '',
    tursoAuthToken: '',
    githubClientId: '',
    githubClientSecret: '',
    googleClientId: '',
    googleClientSecret: '',
    geminiApi: '',
    public: {
      appEnv: '',
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})