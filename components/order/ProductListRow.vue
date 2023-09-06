<script lang="ts" setup>
import type { ICustomerProduct, ICustomerProductUpdate, IProduct } from '~/types/orders'
const props = defineProps<{
  // id: number
  customerProduct: ICustomerProduct
  baseProducts: IProduct[]
  idx: number
  refreshOrders:() => void
}>()
const route = useRoute()
const id = +route.params.id
const emptyCustomerProducts = useState<ICustomerProduct[]>(`"emptyCustomerProducts_${id}"`)

const toast = useToast()
const { updateCustomerProduct } = useProducts()

const customerProductState = useState<ICustomerProduct>(`"customer_product_"${props.customerProduct.id}`, () => props.customerProduct)
const baseProduct = useState(`"base_product_"${props.customerProduct.id}`, () => props.customerProduct.base_product)
const editable = useState<boolean>(`"editable_"${props.customerProduct.id}`, () => false)

const update = async () => {
  const updatedData: ICustomerProductUpdate = {
    name: customerProductState.value.name,
    customer: customerProductState.value.customer,
    vendor_code: customerProductState.value.vendor_code,
    base_product_id: baseProduct.value?.id || null
  }
  const { data: updatedCustomerProduct, error } = await updateCustomerProduct(customerProductState.value.id, updatedData)
  if (error.value) {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка обновления товара',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  } else if (updatedCustomerProduct.value) {
    toast.add({
      title: 'Сохранение успешно',
      description: `Товар "${updatedCustomerProduct.value.name}" успешно обновлен`,
      icon: 'i-heroicons-check-solid',
      color: 'green'
    })
    customerProductState.value = updatedCustomerProduct.value
    emptyCustomerProducts.value = emptyCustomerProducts.value.filter(obj => obj.id !== updatedCustomerProduct.value?.id)
    props.refreshOrders()
  }
  editable.value = false
}

const search = (q: string) => {
  return props.baseProducts.filter(obj => obj.vendor_code?.includes(q))
}
</script>

<template>
  <template v-if="customerProductState">
    <tr :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
      <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
        {{ customerProductState.name }}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm text-gray-600">
        <div v-if="!editable">
          {{ customerProductState.base_product?.name }}
        </div>
        <div v-else>
          <USelectMenu
            v-model="baseProduct"
            :options="baseProducts"
            :searchable="search"
            by="vendor_code"
            placeholder="Выберите базовый продукт"
            searchable-placeholder="Введите артикул..."
            option-attribute="option"
          />
        </div>
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
        {{ customerProductState.base_product?.vendor_code }}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
        {{ customerProductState.base_product?.amount_in_pack }}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm text-gray-500">
        <NuxtLink v-if="!editable" class="relative inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="editable = true">
          <UIcon name="i-tabler-edit" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
        </NuxtLink>
        <div v-else class="flex">
          <NuxtLink
            class="relative inline-flex items-center space-x-2 rounded-l-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            @click="update"
          >
            <UIcon name="i-mdi-content-save" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink
            class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            @click="editable = false"
          >
            <UIcon name="i-mdi-close-circle-outline" class="text-primary-600 hover:text-primary-700 h-5 w-5" aria-hidden="true" />
          </NuxtLink>
        </div>
      </td>
    </tr>
  </template>
  <div v-else>
    Loading...
  </div>
</template>
