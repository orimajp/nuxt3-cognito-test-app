<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
const config = useRuntimeConfig()
const region = config.public.REGION
const domain = config.public.DOMAIN
const scope = config.public.SCOPE
const redirectUrl = config.public.REDIRECT_URL
const clientId = config.public.COGNITO_USER_POOL_WEB_CLIENT_ID
const state = useCookie('login_state')

const gotoLogin = () => {
  state.value = uuidv4()
  const url = `https://${domain}.auth.${region}.amazoncognito.com/login?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUrl}&state=${state.value}`
  location.href = url
  console.log(state.value)
}

//const state = useCookie('login_state')
//state.value = uuidv4()

//const url = `https://${domain}.auth.${region}.amazoncognito.com/login?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUrl}&state=${state.value}`

</script>

<template>
  <div>
    <h1>ログイン</h1>
    <button type="button" @click="gotoLogin">ログイン</button>
    <!--
    <NuxtLink :to="url">ログイン</NuxtLink>
    -->
  </div>
</template>
