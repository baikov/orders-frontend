<template>
  <Body
    class="bg-gray-100 text-gray-800 antialiased transition-colors duration-0 dark:bg-gray-700 dark:text-gray-200"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
  </Body>
</template>
