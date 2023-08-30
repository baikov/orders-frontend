<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable, useClipboard } from '@vueuse/core'
const config = useRuntimeConfig()
const toast = useToast()
// definePageMeta({
//   middleware: 'logedinonly'
// })

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 140 }
})

const input = ref('')

const { text, isSupported, copy } = useClipboard()
useHead({
  title: 'VueUse demo page',
  titleTemplate: '%s | Template',
  meta: [
    {
      name: 'description',
      content: 'Just a demo page for VueUse'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
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
    { rel: 'canonical', href: `${config.public.siteUrl}/vueuse` }
  ]
})
const breadcrumbs = [
  {
    level: 1,
    name: 'VueUse',
    href: '/vueuse',
    disabled: true
  }
]
</script>

<template>
  <div>
    <DefaultBreadcrumbs :items="breadcrumbs" />
    <UContainer class="flex items-center justify-center">
      <ClientOnly>
        <div ref="el" :style="style" style="position: fixed" class="bg-primary-600 cursor-move text-gray-200">
          Drag me! I am at <br>{{ x }}, {{ y }}
        </div>
        <div v-if="isSupported">
          <p>
            Current copied: <code>{{ text || 'none' }}</code>
          </p>
          <UInput v-model="input" />
          <UButton label="Copy!" @click="copy(input);toast.add({ title: 'Copied!' })" />
        </div>
        <p v-else>
          Your browser does not support Clipboard API
        </p>
      </ClientOnly>
    </UContainer>
  </div>
</template>
