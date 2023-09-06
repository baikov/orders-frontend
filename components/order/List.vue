<script lang="ts" setup>
const { getCustomerOrders } = useCustomer()
// defineProps<{
//   customerId: number | null
// }>()
const { data: orders, error } = await getCustomerOrders()
if (error.value) {
  // look at https://github.com/mitre/saf-site-frontend/issues/89
  // showError({
  //   statusCode: error.value?.statusCode || 400,
  //   statusMessage: error.value?.statusMessage || 'Show Some strange error in order/List.vue :)'
  // })
  // throw createError({
  //   statusCode: error.value?.statusCode || 400,
  //   statusMessage: error.value?.statusMessage || 'Throw Some strange error in order/List.vue :)'
  // })
}
</script>

<template>
  <CustomerShortList />
  <section v-if="orders" class="relative mx-auto flex w-full flex-col">
    <div class="mx-auto w-full max-w-7xl p-4">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      №, дата
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Клиент
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Файл
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, orderIdx) in orders" :key="order.id" :class="orderIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-600">
                      <NuxtLink :to="`/orders/${order.id}`" class="hover:text-gray-800 hover:underline">
                        № {{ order.id }} от {{ order.created }}
                      </NuxtLink>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      <NuxtLink :to="`/customers/${order.customer}`" class="hover:text-gray-800 hover:underline">
                        {{ order.customer_name }}
                      </NuxtLink>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <NuxtLink :href="order.file" target="_blank" class="text-indigo-600 hover:text-gray-800">
                        <UIcon name="i-mdi-download" class="h-5 w-5 text-gray-600 hover:text-gray-800" aria-hidden="true" />
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <UContainer v-else class="flex flex-1 flex-col items-center justify-center">
    <p>Заказы не найдены</p>
    <p>Возможно, отсутствует соединение с сервером</p>
  </UContainer>
</template>
