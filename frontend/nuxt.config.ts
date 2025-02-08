// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_BASE_URL || "http://127.0.0.1:8000/api",
    },
  },
  modules: [
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt'
  ],
})
