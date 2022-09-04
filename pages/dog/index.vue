<script setup lang="ts">
import { FetchContext } from 'ohmyfetch'
const dogImageLink = ref('')
const busy = ref(false)

const { createAuthHeader, getToken } = useAuthHeader()
const { createInterceptors } = useApiInterceptor()

const token = getToken()

const intercepters = createInterceptors()

const router = useRouter()

const {data: response, refresh} = await useFetch('/api/dog', {
  headers: {
    ...createAuthHeader()
  },
//  ...createInterceptors()
//  ...intercepters,



onResponseError: async (ctx: FetchContext) => {
    console.log('onResponseError: ', ctx)
    const response = ctx.response
    const status = response?.status ? response.status : 500
    const message = response?.statusText ? response.statusText: 'internal server error'
    console.log(`status=${status}, message=${message}`)
//    throwError({statusCode: status})
//    throw createError({ statusCode: status, statusMessage: 'Unauthorized' })
//    await router.push('/')
//    await router.push('/')
    createError({ statusCode: status, statusMessage: message })
  },

})

//dogImageLink.value = response.value.message

/*
if (!response.value) {
  const error = useError()
  console.log('error: ', error)
  console.log('statusCode: ', error.statusCode)
  console.log('message: ', error.message)
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}*/

response.value.status

if (response.value) {
  dogImageLink.value = response.value.message
}

onBeforeUnmount(async () => {
  await refreshNuxtData()
})

const reload = async () => {
  busy.value = true
  await refresh()
  dogImageLink.value = response.value.message
  busy.value = false
}
</script>

<template>
  <div>
    <h1>Dog Image</h1>
    <div>
      <button :aria-busy="busy" @click="reload">Next Dog Image</button>
    </div>
    <article>
      <img :src="dogImageLink" />
    </article>
    <div>
      <NuxtLink to="/">トップ</NuxtLink>
    </div>
  </div>
</template>
