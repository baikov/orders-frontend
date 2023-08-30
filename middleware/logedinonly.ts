export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token') // get token from cookies

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    abortNavigation()
    return navigateTo('/account')
  }
})
