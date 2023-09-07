import type { IProduct, ICustomerProduct, ICustomerProductUpdate } from '~/types/orders'

export const useProducts = () => {
  const config = useRuntimeConfig()

  const getProductList = async () => {
    const { data, error, refresh, pending } = await useFetch<IProduct[]>(
      // `${config.public.apiUrl}/products/?search=${q}`,
      `${config.public.apiUrl}/products/`,
      {
        watch: false
      }
    )
    return {
      data,
      error,
      refresh,
      pending
    }
  }

  const getProduct = async (id: number) => {
    const { data, error, refresh } = await useFetch<IProduct>(
      `${config.public.apiUrl}/products/${id}/`
    )
    return { data, error, refresh }
  }

  const deleteProduct = async (id: number) => {
    const { status, error } = await useFetch(
      `${config.public.apiUrl}/products/${id}/`, {
        method: 'DELETE'
      }
    )
    return { status, error }
  }

  const updateProduct = async (id: number, formData: IProduct) => {
    const { data, error } = await useFetch<IProduct>(
        `${config.public.apiUrl}/products/${id}/`, {
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
          method: 'POST',
          body: formData,
          watch: false
        }
    )
    return { data, error }
  }
  const getCustomerProduct = async (id: number) => {
    const { data, error } = await useFetch<ICustomerProduct>(
      `${config.public.apiUrl}/customer-products/${id}/`
    )
    return { data, error }
  }

  const updateCustomerProduct = async (id: number, formData: ICustomerProductUpdate) => {
    const { data, error } = await useFetch<ICustomerProduct>(
      `${config.public.apiUrl}/customer-products/${id}/`, {
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
