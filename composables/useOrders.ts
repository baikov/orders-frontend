import type { IOrder } from '~/types/orders'
// import { useAuthStore } from '~/store/auth'

export const useOrders = () => {
  const config = useRuntimeConfig()
  // const tokenCookie = useCookie<string>('token')
  // const refreshCookie = useCookie<string>('refresh')
  // const { refreshJWT } = useAuthStore()

  const getOrdersList = async (customerOrder: number, tradePoint?: number) => {
    const { data, error, refresh } = await useFetch<IOrder[]>(
        `${config.public.apiUrl}/orders/`,
        {
          // headers: { Authorization: `JWT ${tokenCookie.value}` },
          query: {
            customer_order: customerOrder,
            trade_point: tradePoint
          }
        }
    )
    // if (error.value?.statusCode === 401 && refreshCookie.value) {
    //   await refreshJWT(refreshCookie.value).then(() => {
    //     getOrdersList(customerOrder, tradePoint)
    //   })
    // }
    return {
      data,
      error,
      refresh
    }
  }

  return { getOrdersList }
}
