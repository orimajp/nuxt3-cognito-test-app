<script setup lang="ts">
import jwt_decode from 'jwt-decode'
const route = useRoute()
const code = route.query.code as string
/*
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

const json = ref('')

onMounted(async() => {
const { data: result } = await useFetch(url, {
  method: 'post',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: {
    grant_type: 'authorization_code',
    client_id: `${clientId}`,
    scope: `${scope}`,
    redirect_uri: `${redirectUrl}`,
    code: `${code}`,
  }
})
json.value = JSON.stringify(result.value)
})*/

type CredentialType  = {
  id_token: string
  access_token: string
  refresh_token: string
  expire_in: number
  token_type: string
}

type IDToken = {
  sub: string
  email_verified: boolean
  iss: string
  origin_jti: string
  aud: string
  event_id: string
  token_use: string
  auth_time: number
  exp: number
  iat: number
  jti: string
  email: string
}

const json = ref<IDToken>(null)
const { data: token } = await useFetch(`/api/token?code=${code}`, {
  initialCache: false,
})

  json.value = jwt_decode((token.value as CredentialType).id_token) as IDToken
  console.log(json.value)

</script>

<template>
  <div>
    <h1>コールバック</h1>
    <h2>認証情報</h2>
    <div v-if="json === null">null</div>
    <ul v-else>
      <li>sub: {{json.sub}}</li>
      <li>email_verified: {{json.email_verified}}</li>
      <li>iss: {{json.iss}}</li>
      <li>origin_jti: {{json.origin_jti}}</li>
      <li>aud: {{json.aud}}</li>
      <li>event_id: {{json.event_id}}</li>
      <li>token_use: {{json.token_use}}</li>
      <li>auth_time: {{json.auth_time}}</li>
      <li>exp: {{json.exp}}</li>
      <li>iat: {{json.iat}}</li>
      <li>jti: {{json.jti}}</li>
      <li>email: {{json.email}}</li>
    </ul>
    <NuxtLink to="/">トップ</NuxtLink>
  </div>
</template>
