import type { IProduct, ICustomerProduct, ICustomerProductUpdate } from '~/types/orders'
// import { useAuthStore } from '~/store/auth'

export const useProducts = () => {
  const config = useRuntimeConfig()
  // const tokenCookie = useCookie<string>('token')
  // const refreshCookie = useCookie<string>('refresh')
  // const { refreshJWT } = useAuthStore()

  const getProductList = async () => {
    const { data, error, refresh, pending } = await useFetch<IProduct[]>(
      // `${config.public.apiUrl}/products/?search=${q}`,
      `${config.public.apiUrl}/products/`,
      {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        watch: false
      }
    )
    // if (error.value?.statusCode === 401 && refreshCookie.value) {
    //   await refreshJWT(refreshCookie.value).then(() => {
    //     getProductList()
    //   })
    // }
    return {
      data,
      error,
      refresh,
      pending
    }
  }

  const getProduct = async (id: number) => {
    const { data, error, refresh } = await useFetch<IProduct>(
      `${config.public.apiUrl}/products/${id}/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      }
    )
    // if (error.value?.statusCode === 401 && refreshCookie.value) {
    //   await refreshJWT(refreshCookie.value).then(() => {
    //     getProduct(id)
    //   })
    // }
    return { data, error, refresh }
  }

  const deleteProduct = async (id: number) => {
    const { status, error } = await useFetch(
      `${config.public.apiUrl}/products/${id}/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        method: 'DELETE'
      }
    )
    return { status, error }
  }

  const updateProduct = async (id: number, formData: IProduct) => {
    const { data, error } = await useFetch<IProduct>(
        `${config.public.apiUrl}/products/${id}/`, {
          // headers: { Authorization: `JWT ${tokenCookie.value}` },
          method: 'PUT',
          body: formData,
          watch: false
        }
    )
    return { data, error }
  }

  const createProduct = async (formData: IProduct) => {
    const { data, error } = await useFetch<IProduct>(
        `${config.public.apiUrl}/products/`, {
          // headers: { Authorization: `JWT ${tokenCookie.value}` },
          method: 'POST',
          body: formData,
          watch: false
        }
    )
    return { data, error }
  }
  const getCustomerProduct = async (id: number) => {
    const { data, error } = await useFetch<ICustomerProduct>(
      `${config.public.apiUrl}/customer-products/${id}/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      }
    )
    return { data, error }
  }

  const updateCustomerProduct = async (id: number, formData: ICustomerProductUpdate) => {
    const { data, error } = await useFetch<ICustomerProduct>(
      `${config.public.apiUrl}/customer-products/${id}/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        method: 'PUT',
        body: formData,
        watch: false
      }
    )
    return { data, error }
  }

  const deleteCustomerProduct = async (id: number) => {
    const { status, error } = await useFetch(
      `${config.public.apiUrl}/products/${id}/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` },
        method: 'DELETE'
      }
    )
    return { status, error }
  }

  return {
    getProductList,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getCustomerProduct,
    updateCustomerProduct,
    deleteCustomerProduct
  }
}
