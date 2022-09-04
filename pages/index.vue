<script setup lang="ts">
const { isAuthenticated, getUser } = useAuth()

const authenticated = await isAuthenticated()
const userInfo = await getUser()

//const loginState = authenticated ? 'ログイン中' : '未ログイン'
const loginState = userInfo ? `${userInfo.email}` : '未ログイン'

</script>

<template>
  <div>
    <h1>トップ</h1>
    <div>
      ログイン状態： <span> {{ loginState }} </span>
    </div>
    <div>
      <NuxtLink to="/login">ログイン画面へ</NuxtLink>
    </div>
    <div>
      <NuxtLink to="/dog">dog api</NuxtLink>
    </div>
    <div>
      <NuxtLink to="/test">テスト</NuxtLink>
    </div>
  </div>
</template>
