<script lang="ts" setup>
import type { IBreadcrumb } from '~/types'
const breadcrumbs = defineProps<{
  items?: IBreadcrumb[]
}>()
const schemaBreadcrumbs = breadcrumbs.items?.map(({ name, href }) => ({ name, item: href }))
schemaBreadcrumbs?.unshift({ name: 'Главная', item: '/' })
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: schemaBreadcrumbs
  })
])
</script>

<template>
  <UContainer class="pb-8">
    <nav
      class="flex overflow-x-auto border-b border-gray-200 py-3 dark:border-gray-600"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        class="mx-auto flex w-full space-x-4"
      >
        <li class="flex">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center justify-center">
              <UIcon
                name="i-mdi-home"
                class="text-primary-700 h-5 w-5 shrink-0 dark:text-gray-200"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>
        </li>
        <li v-for="item in items" :key="item.level" class="flex whitespace-nowrap">
          <div class="flex items-center">
            <UIcon name="i-mdi-chevron-right" class="h-full w-6 shrink-0" />
            <NuxtLink
              :to="item.href"
              class="ml-4 text-sm font-medium hover:underline"
              :aria-current="item.href ? 'page' : undefined"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </li>
      </ol>
    </nav>
  </UContainer>
</template>
