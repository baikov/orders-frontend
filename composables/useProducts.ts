import type { IProduct } from '~/types/orders'

export const useProducts = () => {
  const config = useRuntimeConfig()

  const getProduct = async (id: number) => {
    try {
      const data = await $fetch<IProduct>(
        `${config.public.apiUrl}/products/${id}/`
      )
      return data as IProduct
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

  return { getProduct, updateProduct } // createProduct, deleteProduct
}
