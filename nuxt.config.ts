import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'aws-lambda',
    serveStatic: true
  },
  // .envファイルの読み込み
  runtimeConfig: {
    public: {
      REGION: '',
      DOMAIN: '',
      SCOPE: '',
      REDIRECT_URL: '',
      LOGOUT_URL: '',
      COGNITO_USER_POOL_WEB_CLIENT_ID: '',
      COGNITO_USER_POOL_ID: '',
    },
  },
  app: {
    head: {
      meta: [
        {  name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0'  },
      ],
    }
  },
  css: [
  ],
  modules: [
  ],
})
