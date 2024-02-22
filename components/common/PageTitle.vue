<script lang="ts" setup>
defineProps<{
  text?: string
}>()
</script>

<template>
  <section class="relative mx-auto flex w-full flex-col">
    <div class="mx-auto w-full max-w-7xl p-4">
      <h1 class="my-2 text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-3xl">
        {{ text }}
      </h1>
      <div class="mt-2">
        <span class="bg-primary-700 inline-block h-1 w-40 rounded-full dark:bg-gray-200" />
        <span class="bg-primary-700 ml-1 inline-block h-1 w-3 rounded-full dark:bg-gray-200" />
        <span class="bg-primary-700 ml-1 inline-block size-1 rounded-full dark:bg-gray-200" />
      </div>
    </div>
  </section>
</template>
