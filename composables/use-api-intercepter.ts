import {
  FetchContext
} from 'ohmyfetch'


export const useApiInterceptor = () => {

  const createInterceptors = () => {

    const opt = {
      onRequest: async (ctx: FetchContext) => {
//        console.log(ctx.request)
        console.log('onReuqest: ', ctx)
      },

      onRequestError: async (ctx: FetchContext) => {
        console.log('onRequestError: ', ctx)
      },

      onResponse: async (ctx: FetchContext) => {
        console.log('onResponse: ', ctx)
      },

      onResponseError: async (ctx: FetchContext) => {
        console.log('onResponseError: ', ctx)
        clearError({ redirect: '/' })
      },
    }

    return {
      opt,
    }
  }

  return {
    createInterceptors,
  }
}
