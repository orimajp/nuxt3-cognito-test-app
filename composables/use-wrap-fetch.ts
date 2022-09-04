import { FetchOptions } from 'ohmyfetch'

// https://github.com/nuxt/framework/discussions/4504
export const useWrapFetch = () => {

  const useServerApi = async (url: string, options?: FetchOptions) => {
    const idToken = useCookie('id_token')

    const headers: HeadersInit = {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer: ${idToken.value}`,
      ...options?.headers
    }

    const opts: FetchOptions = options ? (({ headers, ...opts }) => opts)(options) : null

//    const baseURL = !options?.baseURL ? apiRoute : options.baseURL

    return useFetch(url, {
      headers,
      ...opts,
    })
  }







  return {
    useServerApi,
  }

}

