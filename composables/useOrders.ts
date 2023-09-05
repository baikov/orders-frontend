import type { IOrder } from '~/types/orders'

export const useOrders = () => {
  const config = useRuntimeConfig()

  const getOrdersList = async (customerOrder: number, tradePoint?: number) => {
    const { data, error, refresh } = await useFetch<IOrder[]>(
        `${config.public.apiUrl}/orders/`,
        {
          query: {
            customer_order: customerOrder,
            trade_point: tradePoint
          }
        }
    )
    return {
      data,
      error,
      refresh
    }
  }

  return { getOrdersList }
}
