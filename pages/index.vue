<script lang="ts" setup>
const config = useRuntimeConfig()
useHead({
  title: 'Preconfigured Nuxt 3 with NuxtUI',
  titleTemplate: '%s | Template',
  meta: [
    {
      name: 'description',
      content: 'Include TailwindCSS + headlessui, ready to use as part of fullstack project.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      property: 'og:site_name',
      content: config.public.siteName
    },
    {
      property: 'og:url',
      content: config.public.siteUrl
    }
  ],
  link: [
    { rel: 'canonical', href: config.public.siteUrl }
  ]
})
</script>

<template>
  <DefaultHero />
</template>
