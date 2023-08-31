<script setup lang="ts">
const color = useColorMode()
const isDark = useState('isDark', () => color.value === 'dark')
function toggleDark () {
  color.preference = isDark.value ? 'dark' : 'light'
}
watch(isDark, () => {
  toggleDark()
})
onMounted(() => {
  isDark.value = localStorage.getItem('nuxt-color-mode') === 'dark'
})
</script>

<template>
  <ClientOnly>
    <UToggle
      v-model="isDark"
      off-icon="i-heroicons-sun-20-solid"
      on-icon="i-heroicons-moon-20-solid"
    />
  </ClientOnly>
</template>
