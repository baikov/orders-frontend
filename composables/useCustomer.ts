import type { ICustomer, ICustomerOrder } from '~/types/orders'
// import { useAuthStore } from '~/store/auth'

export const useCustomer = () => {
  const config = useRuntimeConfig()
  // const tokenCookie = useCookie<string>('token')
  // const refreshCookie = useCookie<string>('refresh')
  // const { refreshJWT } = useAuthStore()

  const getCustomersList = async () => {
    const { data, error } = await useFetch<ICustomer[]>(
      `${config.public.apiUrl}/customers/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      }
    )
    // if (error.value?.statusCode === 401 && refreshCookie.value) {
    //   await refreshJWT(refreshCookie.value).then(() => {
    //     getCustomersList()
    //   })
    // }
    return {
      data,
      error
    }
  }

  const getCustomerOrders = async (customer?: number | null) => {
    const { data, refresh, error } = await useFetch<ICustomerOrder[]>(
      `${config.public.apiUrl}/customer-orders/`,
      {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        query: {
          customer
        }
      }
    )
    // if (error.value?.statusCode === 401 && refreshCookie.value) {
    //   await refreshJWT(refreshCookie.value).then(() => {
    //     getCustomerOrders(customer)
    //   })
    // }
    return {
      data,
      refresh,
      error
    }
  }

  const getCustomerOrderDetail = async (id: number) => {
    const { data, error, refresh } = await useFetch<ICustomerOrder>(
      `${config.public.apiUrl}/customer-orders/${id}/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      }
    )
    // if (error.value?.statusCode === 401 && refreshCookie.value) {
    //   await refreshJWT(refreshCookie.value).then(() => {
    //     getCustomerOrderDetail(id)
    //   })
    // }
    return {
      data,
      error,
      refresh
    }
  }

  const getCustomerDetail = async (id: number) => {
    const { data, error } = await useFetch<ICustomer>(
      `${config.public.apiUrl}/customers/${id}/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      }
    )
    // if (error.value?.statusCode === 401 && refreshCookie.value) {
    //   await refreshJWT(refreshCookie.value).then(() => {
    //     getCustomerDetail(id)
    //   })
    // }
    return { data, error }
  }

  const createCustomerOrder = async (formData: FormData) => {
    const { data, error } = await useFetch<ICustomerOrder>(
      `${config.public.apiUrl}/customer-orders/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        method: 'POST',
        body: formData
      }
    )
    return { data, error }
  }

  const deleteCustomerOrder = async (id: number) => {
    const { status, error } = await useFetch(
      `${config.public.apiUrl}/customer-orders/${id}`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        method: 'DELETE'
      }
    )
    return { status, error }
  }

  return {
    getCustomersList,
    getCustomerDetail,
    createCustomerOrder,
    getCustomerOrders,
    getCustomerOrderDetail,
    deleteCustomerOrder
  }
}
