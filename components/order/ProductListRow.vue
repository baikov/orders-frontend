<script lang="ts" setup>
import type { ICustomerProduct, ICustomerProductUpdate } from '~/types/orders'
const props = defineProps<{
  // id: number
  customerProduct: ICustomerProduct
  idx: number
  refreshOrders:() => void
}>()
const { getCustomerProduct, updateCustomerProduct, getProductList } = useProducts()
const customerProduct = useState<ICustomerProduct | null>(`"customer_product_"${props.customerProduct.id}`, () => props.customerProduct || null)
if (!customerProduct.value) { customerProduct.value = await getCustomerProduct(props.customerProduct.id) }

if (customerProduct.value === null) {
  // look at https://github.com/mitre/saf-site-frontend/issues/89
  showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}
// const vendorCode = useState(`"vendor_code_"${product.value.id}`, () => product.value?.vendor_code || '')
// const amountInPack = useState(`"amount_in_pack_"${product.value.id}`, () => product.value?.amount_in_pack || '')
const baseProduct = useState(`"base_product_"${customerProduct.value.id}`, () => customerProduct.value?.product || null)
const editable = useState<boolean>(`"editable_"${customerProduct.value.id}`, () => false)
const update = async () => {
  if (customerProduct.value) {
    const updatedData: ICustomerProductUpdate = {
      id: customerProduct.value.id,
      product_id: baseProduct.value?.id || null
    }
    editable.value = false
    customerProduct.value = await updateCustomerProduct(updatedData)
    props.refreshOrders()
  }
}

// const selected = ref([])
const baseProducts = await getProductList()
if (baseProducts === null) {
  // look at https://github.com/mitre/saf-site-frontend/issues/89
  showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}
const search = (q: string) => {
  // const baseProducts = await getProductList(q)
  return baseProducts.filter(obj => obj.vendor_code?.includes(q))
}
// const selected = ref(baseProduct.value)
</script>

<template>
  <template v-if="customerProduct">
    <tr :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
      <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
        {{ customerProduct.id }}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
        {{ customerProduct.name }}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
        {{ customerProduct.vendor_code }}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm text-gray-600">
        <div v-if="!editable">
          {{ customerProduct.product?.name }}
        </div>
        <div v-else>
          <!-- <div class="flex rounded-md shadow-sm">
            <div class="relative flex grow items-stretch focus-within:z-10">
              <input v-model="baseProduct" type="text" placeholder="Базовый продукт" class="block w-full rounded-none rounded-l-md border border-gray-300 pl-4 focus:border-indigo-500 focus:ring-0 sm:text-sm">
            </div>
            <button
              type="button"
              class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              @click="update"
            >
              <UIcon name="i-mdi-content-save" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
            </button>
          </div> -->

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
