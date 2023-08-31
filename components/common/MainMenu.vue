<script lang="ts" setup>
const mainMenu = [
  {
    id: 1,
    name: 'Клиенты',
    slug: 'customers'
  },
  {
    id: 2,
    name: 'Заказы',
    slug: 'orders'
  }
]
</script>

<template>
  <div
    v-for="item in mainMenu"
    :key="item.id"
    class="relative flex h-full cursor-pointer items-center p-4 font-bold transition-colors ease-in-out hover:bg-white/10 hover:text-gray-50"
  >
    <NuxtLink :to="`/${item.slug}`" active-class="underline">
      {{ item.name }}
    </NuxtLink>
  </div>
</template>
