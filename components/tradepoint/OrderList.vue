<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import type { IOrder } from '~/types/orders'

const props = defineProps<{
  tpOrders: IOrder[]
  ordersReady: boolean
}>()
const route = useRoute()
const id = +route.params.id

// const { getOrdersList } = useOrders()
// const { data: tpOrders } = await getOrdersList(id)

// if (tpOrders.value === null || tpOrders.value.length === 0) {
//   // look at https://github.com/mitre/saf-site-frontend/issues/89
//   // showError({ statusCode: 404, statusMessage: 'Message 0' })
//   throw createError({ statusCode: 400, statusMessage: 'Message 1' })
// }

// Пагинация заказов по точкам
const tpIndex = useState(`tp_index_${id}`, () => 0)
const next = () => {
  if (tpIndex.value < props.tpOrders.length - 1) { tpIndex.value++ }
}
const prev = () => {
  if (tpIndex.value > 0) { tpIndex.value-- }
}

// Функционал копирования таблиц и сапкодов точек по кнопке
const getTable = (index: number) => {
  let text = ''
  for (let i = 0; i < props.tpOrders[index].products_list.length; i++) {
    text += `${props.tpOrders[index].products_list[i].vendor_code}\t${props.tpOrders[index].products_list[i].amount / props.tpOrders[index].products_list[i].amount_in_pack}`
    if (i < props.tpOrders[index].products_list.length - 1) { text += '\n' }
  }
  return text
}
const getSapcode = (index: number) => {
  return `${props.tpOrders[index].trade_point_name}`
}
const tableContent = useState(`table_content_${id}`, () => getTable(tpIndex.value))
const sapcode = useState(`sapcode_${id}`, () => getSapcode(tpIndex.value))
const ordersCopied = useState(`orders_copied_${id}`, () => Array(props.tpOrders.length).fill(0))
const { copy: copyTable, isSupported } = useClipboard({ source: tableContent })
const { copy: copySapcode, copied: copiedSapcode } = useClipboard({ source: sapcode })
</script>

<template>
  <section v-if="ordersReady" class="relative mx-auto flex w-full flex-col">
    <CommonPageH2 :text="`Заказы по точкам: ${tpOrders.length} шт`" />
    <div class="mx-auto w-full max-w-7xl p-4">
      <div class="flex flex-row flex-wrap gap-2">
        <button
          v-for="(tp, index) in tpOrders"
          :key="tp.id"
          type="button"
          class="focus:ring-none inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none"
          :class="tpIndex === index ? 'bg-indigo-300' : 'bg-indigo-100'"
          @click="tpIndex = index; tableContent = getTable(tpIndex)"
        >
          <span :class="ordersCopied[index] ? 'line-through' : ''">
            {{ tp.trade_point_name }}
          </span>
        </button>
      </div>
      <div v-if="tpOrders[tpIndex].products_list.length !== 0" class="flex flex-row flex-wrap">
        <div class="flex w-full gap-5">
          <div class="flex items-center justify-self-end">
            <NuxtLink
              class="relative inline-flex items-center space-x-2 rounded-l-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              @click="prev(); tableContent = getTable(tpIndex); sapcode = getSapcode(tpIndex)"
            >
              <UIcon name="i-mdi-arrow-left-bold-box-outline" :class="tpIndex <= 0 ? 'text-gray-300 hover:text-gray-300' : ''" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink
              class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              @click="next(); tableContent = getTable(tpIndex); sapcode = getSapcode(tpIndex)"
            >
              <UIcon name="i-mdi-arrow-right-bold-box-outline" class="h-5 w-5 text-gray-600 hover:text-gray-700" :class="tpIndex >= tpOrders.length - 1 ? 'text-gray-300 hover:text-gray-300' : ''" aria-hidden="true" />
            </NuxtLink>
          </div>
          <div class="text-md flex items-center justify-center p-4 text-center font-semibold">
            {{ tpOrders[tpIndex].trade_point_name }}
          </div>
          <div class="text-md flex items-center justify-center p-4 text-center font-semibold">
            <span
              v-if="isSupported"
              class="rounded-xs inline-flex cursor-copy items-center border border-dotted py-0.5 pl-2.5 pr-1 text-sm font-medium"
              :class="copiedSapcode ? 'bg-green-50 hover:bg-green-100 text-green-700 border-green-300' : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-300'"
              @click="copySapcode()"
            >
              sap-код: {{ tpOrders[tpIndex].trade_point_sapcode }}
              <UIcon
                v-if="!copiedSapcode"
                name="i-mdi-content-copy"
                class="ml-2 h-4 w-4"
                aria-hidden="true"
              />
              <UIcon
                v-else
                name="i-mdi-check-circle-outline"
                class="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </span>
            <span
              v-else
              class="rounded-xs inline-flex items-center border border-dotted py-0.5 pl-2.5 pr-1 text-sm font-medium text-gray-500"
            >sap-код: {{ tpOrders[tpIndex].trade_point_sapcode }}</span>
          </div>
        </div>
        <div class="w-4/12 items-start overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div
              class="overflow-hidden border-b shadow shadow-green-600 sm:rounded-lg"
              :class="ordersCopied[tpIndex] ? 'border-green-200 shadow-green-600' : 'border-red-200 shadow-red-600'"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Артикул
                    </th>
                    <th scope="col" class="relative px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Кол-во
                      <div v-show="isSupported" class="absolute inset-y-0 right-0 flex items-center">
                        <NuxtLink
                          class="inline-flex items-center space-x-2 rounded-md border p-2 text-sm font-medium focus:outline-none"
                          :class="ordersCopied[tpIndex] ? 'bg-green-50 hover:bg-green-100 text-green-700 border-green-300' : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-300'"
                          @click="copyTable(); ordersCopied[tpIndex] = 1"
                        >
                          <UIcon
                            v-if="!ordersCopied[tpIndex]"
                            name="i-mdi-content-copy"
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                          <UIcon
                            v-else
                            name="i-mdi-check-circle-outline"
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                        </NuxtLink>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, productIdx) in tpOrders[tpIndex].products_list"
                    :key="product.id"
                    :class="productIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
                  >
                    <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
                      {{ product.base_vendor_code }}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
                      {{ product.amount / product.amount_in_pack }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="flex w-8/12 items-start justify-start overflow-x-auto">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Товар
                    </th>
                    <th scope="col" class="relative px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Кол-во
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, productIdx) in tpOrders[tpIndex].products_list"
                    :key="product.id"
                    :class="productIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
                  >
                    <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
                      {{ product.product_name }}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
                      {{ product.amount }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        Отсутствуют товары в заказе
      </div>
    </div>
  </section>
  <UContainer v-else class="flex flex-col items-center justify-center space-y-2">
    <USkeleton class="h-4 w-full bg-white" />
    <USkeleton class="h-4 w-full bg-white" />
    Укажите соответствие товаров клиента с товарами из матрицы
  </UContainer>
</template>
