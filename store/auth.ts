import { defineStore, acceptHMRUpdate } from 'pinia'
import type { IUser, IJWTCreate, ILoginForm, IRegistrationForm, IActivateAccount, IAuthError } from '~/types'

const createErrors = (data: any): IAuthError | null => {
  if (!data) {
    return null
  }
  const error: IAuthError = { code: data.statusCode, message: null }
  // const errorMessages = []
  for (const fieldErrors of Object.values(data)) {
    if (Array.isArray(fieldErrors)) {
      error.message = [...fieldErrors]
    } else if (typeof fieldErrors === 'object' && fieldErrors !== null) {
      error.message = [...Object.values(fieldErrors)]
    } else if (typeof fieldErrors === 'string') {
      error.message = [fieldErrors]
    }
  }
  return error
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: useCookie('user').value as IUser | null || null,
      authenticated: !!useCookie('token').value,
      errorMessage: {} as IAuthError | null
    }
  },
  getters: {},
  actions: {
    async loginUser (formData: ILoginForm) {
      const config = useRuntimeConfig()
      const tokenCookie = useCookie<string>('token')
      const refreshCookie = useCookie<string>('refresh')
      const confirmationCookie = useCookie('accountConfirmation')
      const { data, error } = await useFetch<IJWTCreate>(`${config.public.apiUrl}/auth/jwt/create/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: formData,
        watch: false
      })
      if (data.value) {
        tokenCookie.value = data.value.access
        refreshCookie.value = data.value.refresh
        this.authenticated = true
        this.getUserMe(tokenCookie.value)
        confirmationCookie.value = null
      }
      if (error.value) {
        this.errorMessage = createErrors(error.value.data)
      }
    },
    logoutUser () {
      const tokenCookie = useCookie('token')
      const refreshCookie = useCookie('refresh')
      const userCookie = useCookie<IUser | null>('user')
      const confirmationCookie = useCookie('accountConfirmation')
      this.authenticated = false
      tokenCookie.value = null
      refreshCookie.value = null
      userCookie.value = null
      this.user = null
      confirmationCookie.value = null
    },
    async getUserMe (token: string) {
      const config = useRuntimeConfig()
      const user = useCookie<IUser>('user')
      const { data, error } = await useFetch<IUser>(`${config.public.apiUrl}/auth/users/me/`, {
        headers: { Authorization: `JWT ${token}` }
      })
      if (data.value) {
        user.value = data.value
        this.user = data.value
        user.value = data.value
      }
      if (error.value) {
        this.errorMessage = createErrors(error.value)
      }
    },
    async verifyJWT (token: string) {
      const config = useRuntimeConfig()
      const refreshCookie = useCookie('refresh')
      const tokenCookie = useCookie('token')
      const userCookie = useCookie('user')
      const { status, error } = await useFetch(`${config.public.apiUrl}/auth/jwt/verify/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: { token }
      })

      if (status.value === 'success') {
        this.authenticated = true
        this.getUserMe(token)
      }
      if (error.value) {
        // return false
        this.errorMessage = createErrors(error.value.data)
        if (this.errorMessage?.code === 401 && refreshCookie.value) {
          this.refreshJWT(refreshCookie.value)
        } else {
          this.authenticated = false
          this.user = null
          refreshCookie.value = null
          tokenCookie.value = null
          userCookie.value = null
        }
      }
    },
    async refreshJWT (refresh: string) {
      const config = useRuntimeConfig()
      const tokenCookie = useCookie('token')
      const userCookie = useCookie('user')
      // const refreshCookie = useCookie('refresh')
      const { data, error } = await useFetch<IJWTCreate>(`${config.public.apiUrl}/auth/jwt/refresh/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: { refresh },
        server: false
      })
      if (data.value) {
        tokenCookie.value = data.value.access
        this.authenticated = true
        this.getUserMe(data.value.access)
      }
      if (error.value) {
        this.errorMessage = createErrors(error.value.data)
        this.authenticated = false
        tokenCookie.value = null
        // refreshCookie.value = null
        userCookie.value = null
        this.user = null
      }
    },
    async registerUser (formData: IRegistrationForm) {
      const config = useRuntimeConfig()
      const confirmationCookie = useCookie('accountConfirmation')
      const { data, error } = await useFetch<IUser>(`${config.public.apiUrl}/auth/users/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: formData,
        watch: false
      })
      if (data.value) {
        confirmationCookie.value = 'sended'
        return data.value as IUser
      }
      if (error.value) {
        this.errorMessage = createErrors(error.value.data)
      }
    },
    async activateAccount (formData: IActivateAccount) {
      const config = useRuntimeConfig()
      const confirmationCookie = useCookie('accountConfirmation')
      const { status, error } = await useFetch(`${config.public.apiUrl}/auth/users/activation/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: formData
      })
      if (status.value === 'success') {
        confirmationCookie.value = 'confirmed'
      }
      if (error.value) {
        confirmationCookie.value = 'error'
        this.errorMessage = createErrors(error.value.data)
      }
    },
    async resendEmail (email: string) {
      const config = useRuntimeConfig()
      const confirmationCookie = useCookie('accountConfirmation')
      const { status, error } = await useFetch(`${config.public.apiUrl}/auth/users/resend_activation/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: { email }
      })
      if (status.value === 'success') {
        confirmationCookie.value = 'sended'
      }
      if (error.value) {
        this.errorMessage = {
          code: error.value.statusCode as number || null,
          message: ['Wrong email']
        }
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
