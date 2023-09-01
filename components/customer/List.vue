<script lang="ts" setup>
const { getCustomersList } = useCustomer()
const customersList = await getCustomersList()
const customerId = useState<number | null>('customer_id', () => null)
</script>

<template>
  <section class="relative mx-auto flex w-full flex-col">
    <div class="mx-auto w-full max-w-7xl p-4">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="customer in customersList" :key="customer.id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="truncate text-sm font-medium text-gray-900">
                  {{ customer.name }}
                </h3>
                <span v-if="customer.last_order" class="inline-block shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  Последний заказ: {{ customer.last_order.created }}
                </span>
              </div>
              <p class="mt-1 truncate text-sm text-gray-500">
                Заказ №{{ customer.last_order?.id }}
              </p>
            </div>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="flex w-0 flex-1">
                <NuxtLink :to="`/customers/${customer.id}/trade-points`" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                  <UIcon name="i-mdi-shop-location" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span class="ml-3">Точки ({{ customer.tp_count }} шт.)</span>
                </NuxtLink>
              </div>
              <div class="-ml-px flex w-0 flex-1">
                <!-- <NuxtLink :to="`/customer-orders/${customer.id}`" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"> -->
                <NuxtLink
                  to="/orders/create"
                  class="relative inline-flex w-0 flex-1 cursor-pointer items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  @click="customerId = customer.id"
                >
                  <UIcon name="i-mdi-plus-box" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span class="ml-3">Создать заказ</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
