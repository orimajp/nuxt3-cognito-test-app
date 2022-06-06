<script setup lang="ts">
const config = useRuntimeConfig()
const region = config.REGION
const domain = config.DOMAIN
const scope = config.SCOPE
const redirectUrl = config.REDIRECT_URL
const clientId = config.COGNITO_USER_POOL_WEB_CLIENT_ID
const url = `https://${domain}.auth.${region}.amazoncognito.com/login?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUrl}`

</script>

<template>
  <div>
    <h1>ログイン</h1>
    <NuxtLink :to="url">ログイン</NuxtLink>
  </div>
</template>
