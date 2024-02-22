<script lang="ts" setup>
const { getCustomersList } = useCustomer()
const { data: customersList } = await getCustomersList()
const customerId = useState<number | null>('customer_id', () => null)
</script>

<template>
  <!-- <section class="relative mx-auto flex w-full flex-col">
    <div class="mx-auto w-full max-w-7xl p-4">
      <ul
        role="list"
        class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        <li
          v-for="customer in customersList"
          :key="customer.id"
          class="col-span-1 flex rounded-md shadow-sm"
          @click="customerId = customer.id"
        >
          <div class="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white">
            <div class="flex-1 truncate px-4 py-2 text-sm">
              <span class="font-medium text-gray-900 hover:text-gray-600">
                {{ customer.name }}
              </span>
              <p class="text-gray-500">
                Добавить заказ
              </p>
            </div>
            <div class="shrink-0 pr-2">
              <NuxtLink
                to="/orders"
                prefetch
                class="relative inline-flex items-center space-x-2 rounded-l-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                @click="customerId = customer.id"
              >
                <UIcon
                  name="i-mdi-list-box"
                  class="h-5 w-5 text-gray-600 hover:text-gray-800"
                  aria-hidden="true"
                />
              </NuxtLink>
              <NuxtLink
                to="/orders/create"
                class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                @click="customerId = customer.id"
              >
                <UIcon
                  name="i-mdi-plus-box"
                  class="h-5 w-5 text-green-600 hover:text-green-700"
                  aria-hidden="true"
                />
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section> -->
  <UContainer class="mb-4 flex w-full flex-col items-center justify-center">
    <div class="mt-3 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <UCard
        v-for="customer in customersList"
        :key="customer.id"
        :ui="{ body: { padding: 'p-4'} }"
      >
        <div class="flex w-full items-center justify-between">
          <NuxtLink
            :to="`/customers/${customer.id}`"
            class="hover:text-primary-800 font-semibold"
          >
            {{ customer.name }}
          </NuxtLink>
          <div class="shrink-0">
            <UTooltip text="Показать список заказов">
              <NuxtLink
                to="/orders"
                prefetch
                class="relative inline-flex items-center space-x-2 rounded-l-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="customerId = customer.id"
              >
                <UIcon
                  name="i-tabler-filter"
                  class="size-5 text-gray-600 hover:text-gray-800"
                  aria-hidden="true"
                />
              </NuxtLink>
            </UTooltip>
            <UTooltip text="Создать новый заказ">
              <NuxtLink
                to="/orders/create"
                class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                @click="customerId = customer.id"
              >
                <UIcon
                  name="i-tabler-file-plus"
                  class="size-5 text-green-600 hover:text-green-700"
                  aria-hidden="true"
                />
              </NuxtLink>
            </UTooltip>
          </div>
          <!-- <UButtonGroup size="sm">
              <UButton
                icon="i-tabler-x"
                size="sm"
                color="gray"
                square
                variant="outline"
                @click="update[row.id] = false"
              />
            <UButton
              icon="i-mdi-plus-box"
              size="sm"
              color="gray"
              square
              variant="outline"
              @click="submitUpdateCustomerProduct(row.id)"
            />
          </UButtonGroup> -->
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
