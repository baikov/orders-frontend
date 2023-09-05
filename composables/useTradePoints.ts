import type { ITradePoint } from '~/types/orders'

export const useTradePoints = () => {
  const config = useRuntimeConfig()

  const getTPList = async (customerId: number) => {
    const { data, error, refresh } = await useFetch<ITradePoint[]>(
      `${config.public.apiUrl}/trade-points/`,
      {
        query: {
          customer: customerId
        }
      }
    )
    return { data, error, refresh }
  }

  const updateTP = async (id: number, formData: FormData) => {
    const { data, error } = await useFetch<ITradePoint>(
      `${config.public.apiUrl}/trade-points/${id}/`,
      {
        method: 'PUT',
        body: formData,
        watch: false
      }
    )
    return { data, error }
  }

  return {
    getTPList,
    updateTP
  }
}
