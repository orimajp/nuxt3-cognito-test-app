import { Amplify, Auth } from "aws-amplify"

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const amplifyConfig = {
    region: config.COGNITO_USER_POOL_ID,
    userPoolId: config.COGNITO_USER_POOL_WEB_CLIENT_ID,
    userPoolWebClientId: config.COGNITO_USER_POOL_WEB_CLIENT_ID,
  }

//  console.log(amplifyConfig)

//  Amplify.configure(amplifyConfig)

  return {
    provide: {
//      auth: Auth
      auth: () => ''
    }
  }
})
