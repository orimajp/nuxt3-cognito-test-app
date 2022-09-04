import { JwtPayload } from "jsonwebtoken"
import jwtDecode from "jwt-decode"
import { useAuth } from "~~/composables/use-auth"

export default defineNuxtRouteMiddleware(async(to, from) => {
  const { getSession } = useAuth()

  // pico.min.css.map未発見対策
  if (!to.fullPath.includes('map') && to.path.indexOf('/login/callback') === -1
      && from.path !== '/login/callback' && to.path !== '/login') {
    console.log(`route middleware from=${from.fullPath} to=${to.fullPath}`)
    const idToken = useCookie('id_token')
    console.log('id_token', idToken.value)
    if (!idToken.value) {
      return navigateTo('/login')
    }
    const jwt = jwtDecode<JwtPayload>(idToken.value)
    console.log('jwt: ', jwt)

    const currentSeconds = Math.floor((new Date()).valueOf() / 1000)

    if (jwt.exp <= currentSeconds) {
      console.log('defineNuxtRouteMiddleware(): token is expired.')

      const token = await getSession()
      console.log('defineNuxtRouteMiddleware(): idToken= ', token)

      if (token == null) {
        if (from.path !== '/login') {
          return navigateTo('/login')
        }
      }
    }
  }
})

/**
 * https://qiita.com/purini-to/items/075143f45fa0caf558d8
 * こういうので一気にチェックしてしまう手もある。これは日付だけでなくトークンのチェックを行う。
 */
