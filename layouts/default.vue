<script lang="ts" setup>
// defineOgImage({
//   component: 'OgImageDefault'
//   // title: 'My awesome home page.'
// })
// defineOgImageScreenshot()
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <CommonHeader />
    <div class="flex w-full flex-1 flex-col">
      <slot />
    </div>
    <CommonFooter />
  </div>
</template>
