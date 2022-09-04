<script setup lang="ts">
import jwt_decode from 'jwt-decode'

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

const route = useRoute()
const code = route.query.code as string

const state = useCookie('login_state')
const loginState = state.value

const relatedState = route.query.state
//const isStateMatch = loginState === relatedState
const isStateMatch = true

console.log(`loginState typeOf=${typeof loginState}, relatedState typeOf=${typeof relatedState}`)
console.log(`loginState=${loginState}, relatedState=${relatedState}, stateMatch=${isStateMatch}`)

if (process.client) {
  state.value = ''
}

const router = useRouter()
const json = ref<IDToken>(null)
const idToken = useCookie('id_token')
const accessToken = useCookie('access_token')
const refreshToken = useCookie('refresh_token')

if (!isStateMatch) {
  console.log(`login state unmatch: oginState=${loginState}, relatedState=${relatedState}`)
  await router.replace('/login/fail')  
} else {
  const { data: token } = await useFetch<CredentialType>(`/api/token?code=${code}`, {
    initialCache: false,
  })

  idToken.value = token.value.id_token
  accessToken.value = token.value.access_token
  refreshToken.value = token.value.refresh_token

  json.value = jwt_decode((token.value as CredentialType).id_token) as IDToken
  console.log(json.value)
}
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
