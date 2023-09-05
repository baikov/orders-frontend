<script lang="ts" setup>
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="mx-auto w-full max-w-7xl p-4">
    <h2 class="my-2 text-lg font-bold text-gray-800 dark:text-gray-200 md:text-xl">
      {{ text }}
    </h2>
  </div>
</template>
