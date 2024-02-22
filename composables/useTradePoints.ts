import type { ITradePoint } from '~/types/orders'
// import { useAuthStore } from '~/store/auth'

export const useTradePoints = () => {
  const config = useRuntimeConfig()
  // const tokenCookie = useCookie<string>('token')
  // const refreshCookie = useCookie<string>('refresh')
  // const { refreshJWT } = useAuthStore()

  const getTPList = async (customerId: number) => {
    const { data, error, refresh } = await useFetch<ITradePoint[]>(
      `${config.public.apiUrl}/trade-points/`,
      {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        query: {
          customer: customerId
        }
      }
    )
    // if (error.value?.statusCode === 401 && refreshCookie.value) {
    //   await refreshJWT(refreshCookie.value).then(() => {
    //     getTPList(customerId)
    //   })
    // }
    return { data, error, refresh }
  }

  const updateTP = async (id: number, formData: FormData) => {
    const { data, error } = await useFetch<ITradePoint>(
      `${config.public.apiUrl}/trade-points/${id}/`,
      {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        method: 'PUT',
        body: formData,
        watch: false
      }
    )
    return { data, error }
  }

  return {
    getTPList,
    updateTP
  }
}
