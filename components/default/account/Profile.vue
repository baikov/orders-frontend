<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

const { user } = storeToRefs(useAuthStore())
</script>
<template>
  <UCard>
    <template #header>
      Profile
    </template>
    <div v-if="user !== null" class="flex items-center space-x-4">
      {{ user.username }}
      {{ user.email }}
    </div>
    <div v-else class="flex items-center space-x-4">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
    <template #footer>
      Footer
    </template>
  </UCard>
</template>
