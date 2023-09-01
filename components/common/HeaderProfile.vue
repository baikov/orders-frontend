<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
const { user, authenticated } = storeToRefs(useAuthStore())
const { logoutUser } = useAuthStore()
const toast = useToast()

async function onLogout () {
  await logoutUser()
  toast.add({
    title: 'You\'r logout!',
    description: 'See you soon again!',
    icon: 'i-heroicons-check-solid',
    color: 'green',
    callback: () => {
      return navigateTo('/account')
    }
  })
}

const items = [
  [{
    label: 'Guest',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Login',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    to: '/account'
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog',
    to: '/account'
  }], [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: onLogout
  }]
]

// TODO: fix this
const getItems = (authenticated: boolean) => {
  if (authenticated) {
    return items.filter(group => group[0].label !== 'Login')
  } else {
    return items.filter(group => group[0].label !== 'Logout' && group[0].label !== 'Settings')
  }
}

</script>

<template>
  <UDropdown :items="getItems(authenticated)" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <!-- <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" /> -->
    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50">
      <UIcon name="i-heroicons-user" class="h-6 w-6 bg-gray-900 text-gray-900" />
    </div>

    <template #account="{ item }">
      <div class="text-left">
        <p v-if="authenticated">
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user?.username || item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon :name="item.icon" class="ms-auto h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
    </template>
  </UDropdown>
</template>
