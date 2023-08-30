<script lang="ts" setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="border-t bg-gray-900 text-gray-200 dark:border-gray-50/[0.2] lg:border-gray-900/10"
  >
    <UContainer class="flex flex-col items-center justify-between py-4 sm:flex-row">
      <div class="flex flex-col items-center sm:items-start">
        <span class="font-bold">Nuxt 3 Template</span>
        <span>Frontend starterpack © {{ year }}</span>
      </div>
      <div class="flex flex-col items-center gap-2 sm:float-right sm:flex-row">
        <NuxtLink to="https://baikov.dev" target="_blank" class="text-sm font-bold">
          baikov<span class="font-bold text-red-500 dark:text-gray-200">.dev</span>
        </NuxtLink>
        <span class="bg-primary-500 text-light-200 block rounded px-1 py-0.5 text-xs dark:bg-gray-200 dark:text-gray-900">
          v0.5.0
        </span>
      </div>
    </UContainer>
  </footer>
</template>
