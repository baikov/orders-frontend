import type { ICustomer, ICustomerOrder, ITradePoint } from '~/types/orders'

export const useCustomer = () => {
  const config = useRuntimeConfig()

  const getCustomersList = async () => {
    try {
      const { data: orders } = await useFetch<ICustomer[]>(
        `${config.public.apiUrl}/customers/`
      )
      return orders.value
    } catch (e: any) {
      showError(e)
      return null
    }
  }

  const getCustomerOrders = async (customer?: number | null) => {
    try {
      const { data, refresh } = await useFetch<ICustomerOrder[]>(
        `${config.public.apiUrl}/customer-orders/`,
        {
          query: {
            customer
          }
        }

      )
      return {
        data,
        refresh
      }
    } catch (e: any) {
      showError(e)
      return null
    }
  }

  const getCustomerOrderDetail = async (id: number) => {
    try {
      const data = await $fetch<ICustomerOrder>(
        `${config.public.apiUrl}/customer-orders/${id}/`
      )
      return data as ICustomerOrder
    } catch (e: any) {
      showError(e)
      return null
    }
  }
  const getCustomerDetail = async (id: number) => {
    try {
      const { data: customer } = await useFetch<ICustomer>(
        `${config.public.apiUrl}/customers/${id}/`
      )
      return customer.value
    } catch (e: any) {
      showError(e)
      return null
    }
  }
  const createCustomerOrder = async (data: FormData) => {
    try {
      const { data: customerOrder } = await useFetch<ICustomerOrder>(
        `${config.public.apiUrl}/customer-orders/`, {
          method: 'POST',
          body: data
        }
      )
      return customerOrder.value
    } catch (e: any) {
      showError(e)
      return null
    }
  }

  const getCustomerTPList = async (customerId: number) => {
    try {
      const data = await $fetch<ITradePoint[]>(
        `${config.public.apiUrl}/trade-points/`,
        {
          query: {
            customer_id: customerId
          }
        }
      )
      return data as ITradePoint[]
    } catch (e: any) {
      showError(e)
      return null
    }
  }

  return {
    getCustomersList,
    getCustomerDetail,
    createCustomerOrder,
    getCustomerOrders,
    getCustomerOrderDetail,
    getCustomerTPList
  }
}
