<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import type { IOrder } from '~/types/orders'

const props = defineProps<{
  tpOrders: IOrder[]
  ordersInPack: boolean
}>()
const route = useRoute()
const id = +route.params.id

const toast = useToast()

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
    const vendorCode = props.tpOrders[index].products_list[i].base_vendor_code
    const amountInPack = props.tpOrders[index].products_list[i].amount_in_pack
    let amount
    if (props.ordersInPack) {
      amount = props.tpOrders[index].products_list[i].amount
    } else if (amountInPack === 0) {
      amount = '-'
    } else {
      amount = props.tpOrders[index].products_list[i].amount / amountInPack
    }
    text += `${vendorCode || '-'}\t${amount}`
    if (i < props.tpOrders[index].products_list.length - 1) { text += '\n' }
  }
  return text
}
const getSapcode = (index: number) => {
  return `${props.tpOrders[index].trade_point_sapcode || 'код не заполнен'}`
}
const tableContent = useState(`table_content_${id}`, () => getTable(tpIndex.value))
const sapcode = useState(`sapcode_${id}`, () => getSapcode(tpIndex.value))
const ordersCopied = useState(`orders_copied_${id}`, () => Array(props.tpOrders.length).fill(0))
const { copy: copyTable, isSupported } = useClipboard({ source: tableContent })
const { copy: copySapcode, copied: copiedSapcode } = useClipboard({ source: sapcode })
function truncatedName (name: string) {
  return name.length > 20 ? name.slice(0, 20) + '...' : name
}
</script>

<template>
  <section class="relative mx-auto flex w-full flex-col">
    <CommonPageH2 :text="`Заказы по точкам: ${tpOrders.length} шт`" />
    <div class="mx-auto w-full max-w-7xl p-4">
      <div class="flex flex-row flex-wrap gap-2">
        <UButton
          v-for="(tp, index) in tpOrders"
          :key="tp.id"
          size="md"
          :color="tpIndex === index ? 'primary' : 'gray'"
          variant="outline"
          :class="ordersCopied[index] ? 'line-through' : ''"
          :label="truncatedName(tp.trade_point_name)"
          @click="tpIndex = index; tableContent = getTable(tpIndex)"
        />
      </div>
      <div v-if="tpOrders[tpIndex].products_list.length !== 0" class="flex flex-row flex-wrap">
        <div class="flex w-full gap-5">
          <div class="flex items-center justify-self-end">
            <UButtonGroup size="md">
              <UButton
                icon="i-heroicons-chevron-left-20-solid"
                :disabled="tpIndex <= 0"
                color="gray"
                @click="prev(); tableContent = getTable(tpIndex); sapcode = getSapcode(tpIndex)"
              />
              <UButton
                icon="i-heroicons-chevron-right-20-solid"
                :disabled="tpIndex >= tpOrders.length - 1"
                color="gray"
                @click="next(); tableContent = getTable(tpIndex); sapcode = getSapcode(tpIndex)"
              />
            </UButtonGroup>
          </div>
          <div class="text-md flex items-center justify-center p-4 text-center font-semibold">
            {{ truncatedName(tpOrders[tpIndex].trade_point_name) }}
          </div>
          <div class="text-md flex items-center justify-center p-4 text-center font-semibold">
            <span
              v-if="isSupported"
              class="rounded-xs inline-flex cursor-copy items-center border border-dotted py-0.5 pl-2.5 pr-1 text-sm font-medium"
              :class="copiedSapcode ? 'bg-green-50 hover:bg-green-100 text-green-700 border-green-300' : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-300'"
              @click="copySapcode(); toast.add({ title: 'Код скопирован', color: 'green' })"
            >
              sap-код: {{ tpOrders[tpIndex].trade_point_sapcode || 'не заполнен' }}
              <UIcon
                v-if="!copiedSapcode"
                name="i-mdi-content-copy"
                class="ml-2 size-4"
                aria-hidden="true"
              />
              <UIcon
                v-else
                name="i-mdi-check-circle-outline"
                class="ml-2 size-4"
                aria-hidden="true"
              />
            </span>
            <span
              v-else
              class="rounded-xs inline-flex items-center border border-dotted py-0.5 pl-2.5 pr-1 text-sm font-medium text-gray-500"
            >sap-код: {{ tpOrders[tpIndex].trade_point_sapcode || 'не заполнен' }}</span>
          </div>
        </div>
        <div class="w-4/12 items-start overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div
              class="overflow-hidden border-b shadow sm:rounded-lg"
              :class="ordersCopied[tpIndex] ? 'border-green-200 shadow-green-600' : 'border-primary-200 shadow-primary-600'"
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
                        <UButton
                          :icon="!ordersCopied[tpIndex] ? 'i-mdi-content-copy' : 'i-mdi-check-circle-outline'"
                          size="sm"
                          :color="!ordersCopied[tpIndex] ? 'primary' : 'green'"
                          square
                          variant="outline"
                          @click="copyTable(); ordersCopied[tpIndex] = 1; toast.add({ title: 'Таблица скопирована', color: 'green' })"
                        />
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
                      {{ product.base_vendor_code || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
                      {{ product.amount_in_pack === 0 ? '-' : product.amount / product.amount_in_pack }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="flex w-8/12 items-start justify-start overflow-x-auto">
          <div class="inline-block min-w-full py-2 align-middle sm:pl-6 lg:pl-8">
            <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-700">
                      Товар
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-700">
                      Код
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-700">
                      В уп.
                    </th>
                    <th scope="col" class="relative px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-700">
                      Кол
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
                      {{ product.base_vendor_code || '-' }}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600">
                      {{ product.amount_in_pack === 0 ? '-' : product.amount_in_pack }}
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
</template>
