<script lang="ts" setup>
import type { IProduct } from '~/types/orders'
const props = defineProps<{
  id: number
  product?: IProduct
  idx: number
}>()
const { getProduct, updateProduct } = useProducts()
const product = useState<IProduct | null>(`"product_"${props.id}`, () => props.product || null)
if (!product.value) { product.value = await getProduct(props.id) }

if (product.value === null) {
  // look at https://github.com/mitre/saf-site-frontend/issues/89
  showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  throw createError({
    statusCode: 400,
    statusMessage: 'Page Not Found'
  })
}
const vendorCode = useState(`"vendor_code_"${product.value.id}`, () => product.value?.vendor_code || '')
const amountInPack = useState(`"amount_in_pack_"${product.value.id}`, () => product.value?.amount_in_pack || '')
const editable = useState<boolean>(`"editable_"${product.value.id}`, () => false)
const update = async () => {
  if (product.value) {
    const updatedData: IProduct = {
      id: product.value.id,
      name: product.value.name,
      vendor_code: vendorCode.value,
      amount_in_pack: +amountInPack.value
    }
    editable.value = false
    product.value = await updateProduct(updatedData)
  }
}
</script>

<template>
  <template v-if="product">
    <tr :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
      <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
        {{ product.id }}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
        {{ product.name }}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm text-gray-600">
        <div v-if="!editable">
          {{ product.vendor_code }}
        </div>
        <!-- <input v-else v-model="vendor_code" type="text" placeholder="Артикул"> -->
        <div v-else>
          <div class="flex rounded-md shadow-sm">
            <div class="relative flex grow items-stretch focus-within:z-10">
              <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="mdi:123" class="h-5 w-5 text-gray-600" aria-hidden="true" />
              </div> -->
              <input v-model="vendorCode" type="text" placeholder="Артикул" class="block w-full rounded-none rounded-l-md border border-gray-300 pl-4 focus:border-indigo-500 focus:ring-0 sm:text-sm">
            </div>
            <button type="button" class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="update">
              <UIcon name="i-mdi-content-save" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
            </button>
          </div>
        </div>
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm text-gray-600">
        <div v-if="!editable">
          {{ product.amount_in_pack }}
        </div>
        <!-- <input v-else v-model="amount_in_pack" type="text" placeholder="Кол-во в упаковке"> -->
        <div v-else>
          <div class="flex rounded-md shadow-sm">
            <div class="relative flex grow items-stretch focus-within:z-10">
              <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r">
                <UIcon name="mdi:123" class="h-5 w-5 text-gray-600" aria-hidden="true" />
              </div> -->
              <input v-model="amountInPack" type="text" placeholder="Кол-во в упаковке" class="block w-full rounded-none rounded-l-md border border-gray-300 pl-4 sm:text-sm">
            </div>
            <button type="button" class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="update">
              <UIcon name="i-mdi-content-save" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
            </button>
          </div>
        </div>
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-sm text-gray-500">
        <NuxtLink v-if="!editable" class="relative inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="editable = true">
          <UIcon name="i-tabler-edit" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
        </NuxtLink>
        <div v-else class="flex">
          <NuxtLink class="relative inline-flex items-center space-x-2 rounded-l-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="update">
            <UIcon name="i-mdi-content-save" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" @click="editable = false">
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
