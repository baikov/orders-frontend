import type { ICustomer, ICustomerOrder } from '~/types/orders'

export const useCustomer = () => {
  const config = useRuntimeConfig()

  const getCustomersList = async () => {
    const { data, error } = await useFetch<ICustomer[]>(
      `${config.public.apiUrl}/customers/`
    )
    return {
      data,
      error
    }
  }

  const getCustomerOrders = async (customer?: number | null) => {
    const { data, refresh, error } = await useFetch<ICustomerOrder[]>(
      `${config.public.apiUrl}/customer-orders/`,
      {
        query: {
          customer
        }
      }
    )
    return {
      data,
      refresh,
      error
    }
  }

  const getCustomerOrderDetail = async (id: number) => {
    const { data, error, refresh } = await useFetch<ICustomerOrder>(
      `${config.public.apiUrl}/customer-orders/${id}/`
    )
    return {
      data,
      error,
      refresh
    }
  }
  const getCustomerDetail = async (id: number) => {
    const { data, error } = await useFetch<ICustomer>(
      `${config.public.apiUrl}/customers/${id}/`
    )
    return { data, error }
  }
  const createCustomerOrder = async (formData: FormData) => {
    const { data, error } = await useFetch<ICustomerOrder>(
      `${config.public.apiUrl}/customer-orders/`, {
        method: 'POST',
        body: formData
      }
    )
    return { data, error }
  }

  return {
    getCustomersList,
    getCustomerDetail,
    createCustomerOrder,
    getCustomerOrders,
    getCustomerOrderDetail
  }
}
