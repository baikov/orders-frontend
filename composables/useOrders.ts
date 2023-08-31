import type { IOrder } from '~/types/orders'

export const useOrders = () => {
  const config = useRuntimeConfig()

  const getOrdersList = async (customerOrder: number, tradePoint?: number) => {
    try {
      const { data: orders } = await useFetch<IOrder[]>(
        `${config.public.apiUrl}/orders/`,
        {
          query: {
            customer_order: customerOrder,
            trade_point: tradePoint
          }
        }
      )
      return orders.value
    } catch (e: any) {
      showError(e)
      return null
    }
  }

  const createTPOrders = async (customerOrder: number) => {
    try {
      const { data: orders } = await useFetch<IOrder[]>(
        `${config.public.apiUrl}/customer-orders/${customerOrder}/create-tp-orders/`
      )
      return orders.value
    } catch (e: any) {
      showError(e)
      return null
    }
  }
  return { getOrdersList, createTPOrders }
}
