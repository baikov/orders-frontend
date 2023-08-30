<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false
})

defineProps({
  title: {
    type: String,
    default: 'Default Title'
  },
  description: {
    type: String,
    default: 'Default Descr'
  }
})
</script>

<template>
  <div class="flex h-full w-full items-center justify-center border-b border-blue-600 bg-gradient-to-r from-blue-900 to-blue-700 text-zinc-200">
    <h1>
      {{ title }}
    </h1>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 70px;
}
</style>
