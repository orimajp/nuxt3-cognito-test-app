import { dog } from "~~/models/Dog"

export default defineEventHandler(async (event) => {
  const res = await $fetch<dog>('https://dog.ceo/api/breeds/image/random')
  return res
})
