import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // .envファイルの読み込み
  privateRuntimeConfig: {
    /*
    REGION: process.env.REGION,
    DOMAIN: process.env.DOMAIN,
    SCOPE: process.env.SCOPE,
    REDIRECT_URL: process.env.REDIRECT_URL,
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
    COGNITO_USER_POOL_WEB_CLIENT_ID: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
    */
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  },
  publicRuntimeConfig: {
    REGION: process.env.REGION,
    DOMAIN: process.env.DOMAIN,
    SCOPE: process.env.SCOPE,
    REDIRECT_URL: process.env.REDIRECT_URL,
    COGNITO_USER_POOL_WEB_CLIENT_ID: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
//  builder: 'webpack',
  app: {
    head: {
      meta: [
        {  name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0'  },
      ],
    }
  },
//  css: ['~/assets/css/tailwind.css'],
  modules: [
    // Docs: https://tailwindcss.nuxtjs.org
//    "@nuxtjs/tailwindcss",
  ],
  vite: {
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
      }
    },
    define: {
      "window.global": {},
    }
  },
  alias: {
    '@aws-amplify/core': '@aws-amplify/core/lib',
    '@aws-amplify/auth': '@aws-amplify/auth/lib',
  },
  /*
  vite: {
    resolve: {
      alias: [
        {
          find: './runtimeConfig',
          replacement: './runtimeConfig.browser',
        },
      ]
    }
  }*/
})
