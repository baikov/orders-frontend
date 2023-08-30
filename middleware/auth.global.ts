import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const confirmationCookie = useCookie<string>('accountConfirmation')
  const tokenCookie = useCookie<string>('token')
  const refreshCookie = useCookie<string>('refresh')
  const { verifyJWT } = useAuthStore()
  const { authenticated, user } = storeToRefs(useAuthStore())
  const hasTokens = !!tokenCookie.value && !!refreshCookie.value

  // token exists and authenticated but no user
  if (hasTokens && authenticated.value && !user.value) {
    verifyJWT(tokenCookie.value)
  }

  // if token exists and url is /login redirect to homepage
  if (authenticated.value === false && to?.name === 'useronly') {
    return navigateTo('/login')
  }
  if (!confirmationCookie.value && to?.path === '/account/confirm') {
    return navigateTo('/account')
  }
})
