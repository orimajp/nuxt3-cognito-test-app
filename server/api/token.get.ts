export default defineEventHandler(async(event) => {
  const query = useQuery(event)
  const code = query.code

  const config = useRuntimeConfig()
  const region = config.REGION
  const domain = config.DOMAIN
  const scope = config.SCOPE
  const redirectUrl = config.REDIRECT_URL
  const clientId = config.COGNITO_USER_POOL_WEB_CLIENT_ID

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
    const token = await $fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: param,
    })
  
    console.log(token)
  
    return token
  } catch (e) {
    console.error(e)
    return e
  }
})
