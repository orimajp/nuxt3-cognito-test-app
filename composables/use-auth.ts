import { JwtPayload } from "jsonwebtoken"
import jwtDecode from "jwt-decode"
import { CredentialType } from "~~/models/CredentialType"
import { UserInfo } from "~~/models/UserInfo"

export const useAuth = () => {
  const isAuthenticated = async () => {
    const token = await getSession()
    return token !== null
  }

  const getUser = async (): Promise<UserInfo> => {
    const token = await getSession()
    if (token === null) {
      return null
    }
    const jwt = jwtDecode<JwtPayload>(token)
    return jwt as unknown as UserInfo
  }

  const getSession = async ()  => {
    const idToken = useCookie('id_token')
    const accessToken = useCookie('access_token')
    const refreshToken = useCookie('refresh_token')

    if (idToken.value == null || accessToken.value == null
      || refreshToken.value == null) {
      console.log('getSession(): token is null.')
      return null
    }

    const jwt = jwtDecode<JwtPayload>(idToken.value)

    const currentSeconds = Math.floor((new Date()).valueOf() / 1000)
    if (currentSeconds < jwt.exp && jwt.auth_time < currentSeconds) {
      console.log('getSession(): token is valid.')
      return idToken.value
    }

    const config = useRuntimeConfig()
    const region = config.public.REGION
    const domain = config.public.DOMAIN
    const clientId = config.public.COGNITO_USER_POOL_WEB_CLIENT_ID
  
    const url = `https://${domain}.auth.${region}.amazoncognito.com/oauth2/token`
  
    const param = {
      grant_type: 'refresh_token',
      client_id: `${clientId}`,
      refresh_token: `${refreshToken.value}`
    }

    console.log('getSession(): token refresh.')
//    console.log(param)

    try {
      const token = await $fetch<CredentialType>(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: param,
      })
    
//      console.log(token)
      console.log('id_token: ', token.id_token)

      idToken.value = token.id_token
      accessToken.value = token.access_token

      return token.id_token
    } catch (e) {
      console.log('getSession(): token refresh error.')
      console.error(e)
      return null
    }
  }

  return {
    isAuthenticated,
    getUser,
    getSession,
  }
}
