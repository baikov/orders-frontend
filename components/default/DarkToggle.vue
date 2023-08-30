<script setup lang="ts">
const color = useColorMode()
function toggleDark () {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    aria-label="Тема"
    :title="`Choose ${color.value === 'dark' ? 'light' : 'dark'} theme`"
    class="link group inline-block p-1 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 sm:p-2"
    @click="toggleDark()"
  >
    <div class="theme-icon">
      <ClientOnly>
        <template v-if="color.value === 'dark'">
          <UIcon
            name="i-tabler-moon"
            class="theme-icon"
          />
        </template>
        <template v-else>
          <UIcon name="i-tabler-sun" class="theme-icon" />
        </template>
        <template #fallback>
          <UIcon name="i-tabler-loader" class="theme-icon" />
        </template>
      </ClientOnly>
    </div>
  </button>
</template>

<style lang="css" scoped>
/* .theme-icon {
  @apply h-6 w-6 md:h-6 md:w-6 text-light-200;
}

.icon--off {
  @apply inline-block group-hover:!hidden;
}
.icon--on {
  @apply !hidden group-hover:!inline-block;
} */
</style>
