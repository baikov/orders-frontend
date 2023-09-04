import type { IProduct, ICustomerProduct, ICustomerProductUpdate } from '~/types/orders'

export const useProducts = () => {
  const config = useRuntimeConfig()

  const getProductList = async (q: string = '') => {
    const { data: products, error } = await useFetch<IProduct[]>(
      `${config.public.apiUrl}/products/?search=${q}`
    )
    if (products.value) {
      return products.value
    }
    if (error.value) {
      return null
    }
    return null
  }

  const getProduct = async (id: number) => {
    try {
      const { data: product } = await useFetch<IProduct>(
        `${config.public.apiUrl}/products/${id}/`
      )
      return product.value
    } catch (e: any) {
      showError(e)
      return null
    }
  }

  const updateProduct = async (data: IProduct) => {
    try {
      const { data: product } = await useFetch<IProduct>(
        `${config.public.apiUrl}/products/${data.id}/`, {
          method: 'PUT',
          body: data
        }
      )
      return product.value
    } catch (e: any) {
      showError(e)
      return null
    }
  }
  const getCustomerProduct = async (id: number) => {
    const { data, error } = await useFetch<ICustomerProduct>(
      `${config.public.apiUrl}/customer-products/${id}/`
    )
    if (data.value) {
      return data.value
    }
    if (error.value) {
      return null
    }
    return null
  }

  const updateCustomerProduct = async (data: ICustomerProductUpdate) => {
    try {
      const { data: customerProduct } = await useFetch<ICustomerProduct>(
        `${config.public.apiUrl}/customer-products/${data.id}/`, {
          method: 'PUT',
          body: {
            product_id: data.product_id
          }
        }
      )
      return customerProduct.value
    } catch (e: any) {
      showError(e)
      return null
    }
  }

  return { getProduct, updateProduct, getCustomerProduct, updateCustomerProduct, getProductList } // createProduct, deleteProduct
}
