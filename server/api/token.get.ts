import { CredentialType } from "~~/models/CredentialType"
import axios,{AxiosResponse} from 'axios'

export default defineEventHandler(async(event) => {
  const query = useQuery(event)
  const code = query.code

  const config = useRuntimeConfig()
  const region = config.public.REGION
  const domain = config.public.DOMAIN
  const scope = config.public.SCOPE
  const redirectUrl = config.public.REDIRECT_URL
  const clientId = config.public.COGNITO_USER_POOL_WEB_CLIENT_ID

  const url = `https://${domain}.auth.${region}.amazoncognito.com/oauth2/token`

  const param = {
    grant_type: 'authorization_code',
    client_id: `${clientId}`,
    scope: `${scope}`,
    redirect_uri: `${redirectUrl}`,
    code: `${code}`,
  }

  console.log(param)

  try {
//    const token = await $fetch<CredentialType>(url, {
    const token: AxiosResponse<CredentialType> = await axios({
      url: url,
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: param,
    })
  
    console.log(token)

//    return token
    return token.data
  } catch (e) {
    console.error(e)
    return e
  }
})
