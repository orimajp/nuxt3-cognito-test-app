export default defineNuxtRouteMiddleware(async(to, from) => {

  console.log('all cache clear')

  // callbackページから来た場合は、キャッシュクリアしてはだめっぽい。
  // 何故かトークンを再取得しに行ってエラー(認証コードが再利用不可のため)になる。
  if (from.path !== '/login/callback') {
    // useFetch(), useAsyncData() cache all clear
//    await refreshNuxtData()
  }

})
