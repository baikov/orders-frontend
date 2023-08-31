<script lang="ts" setup>
// import { storeToRefs } from 'pinia'
// import { useAuthStore } from '~/store/auth'
// const router = useRouter()
// const { authenticated } = storeToRefs(useAuthStore())
// const logout = () => {
//   logUserOut()
//   router.push('/login')
// }
</script>

<template>
  <header
    class="border-primary-600 from-primary-700 to-primary-500 sticky top-0 z-40 flex h-16 border-b bg-gradient-to-r text-gray-200"
  >
    <UContainer class="flex flex-1 items-center">
      <DefaultLogo />
      <nav class="hidden flex-1 items-center justify-center px-4 md:flex">
        <DefaultMainMenu />
      </nav>
      <div class="flex items-center md:flex-initial">
        <DefaultDarkToggleSwipe />
        <!-- <DefaultDarkToggle /> -->
        <NuxtLink to="https://github.com/baikov/tpl-traefik" class="ml-4">
          <UIcon name="i-mdi-github" class="h-8 w-8" />
        </NuxtLink>
        <DefaultHeaderProfile class="ml-4" />
      </div>
    </UContainer>
  </header>
</template>
