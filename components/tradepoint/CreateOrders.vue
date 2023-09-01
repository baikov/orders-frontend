<script lang="ts" setup>
defineProps<{
  orderId: number
}>()
const { createTPOrders } = useOrders()
</script>

<template>
  <CommonPageTitle :text="`Товары по точкам в заказе № ${orderId}`" />
  <section class="relative mx-auto flex w-full flex-col">
    <div class="mx-auto w-full max-w-7xl p-4">
      <NuxtLink
        class="relative inline-flex items-center space-x-2 rounded-l-md border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        @click="createTPOrders(orderId)"
      >
        <UIcon name="i-mdi-flask" class="h-5 w-5 text-red-600 hover:text-red-800" aria-hidden="true" />
      </NuxtLink>
    </div>
  </section>
</template>
