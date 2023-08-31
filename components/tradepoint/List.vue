<script lang="ts" setup>
const props = defineProps<{
  customerId: number
}>()
const { getCustomerTPList } = useCustomer()
const tradePointsList = await getCustomerTPList(props.customerId)
</script>

<template>
  <div class="mx-auto w-full max-w-7xl p-4">
    <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <li v-for="tp in tradePointsList" :key="tp.id" class="col-span-1 flex rounded-md shadow-sm">
        <div class="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white">
          <div class="flex-1 truncate px-4 py-2 text-sm">
            <NuxtLink :to="`/trade-points/${tp.id}`" class="font-medium text-gray-900 hover:text-gray-600">
              {{ tp.name }}
            </NuxtLink>
            <p class="text-gray-500">
              {{ tp.sapcode }}
            </p>
          </div>
          <div class="shrink-0 pr-2">
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <UIcon name="i-tabler-dots-vertical" class="h-5 w-5 outline-none" aria-hidden="true" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
