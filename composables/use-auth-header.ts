export const useAuthHeader = () => {
  const createAuthHeader = () => {
    const idToken = useCookie('id_token')

    const headers: HeadersInit = {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${idToken.value}`,
    }

    console.log('headers', headers)

    return headers
  }

  const getToken = () => {
    return useCookie('id_token').value
  }

  return {
    createAuthHeader,
    getToken,
  }
}
