<script lang="ts" setup>
</script>
<template>
  <section class="w-full">
    <UContainer class="py-24">
      <div class="mb-20 flex w-full flex-col text-center">
        <p class="mb-1 text-xs font-medium tracking-widest">
          READY FOR QUICK START
        </p>
        <h1 class="text-primary-400 mb-4 text-2xl font-black sm:text-3xl">
          Preconfigured Nuxt 3 with NuxtUI
        </h1>
        <p class="mx-auto text-base leading-relaxed lg:w-2/3">
          Include TailwindCSS + headlessui, ready to use as part of fullstack project with Django+DRF as backend.
        </p>
      </div>
      <div class="-m-4 flex flex-wrap justify-around">
        <div class="w-full p-4 sm:w-1/2 lg:w-1/4 ">
          <h2 class="text-primary-400 mb-4 text-center text-sm font-bold tracking-widest sm:text-left">
            MODULES
          </h2>
          <nav class="-mb-1 flex flex-col items-center space-y-2.5 text-center sm:items-start sm:text-left">
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>
              <NuxtLink
                to="https://tailwindcss.com/docs/installation"
                target="_blank"
                class="border-primary-500 text-primary-500 hover:text-primary-700 hover:border-primary-700 border-b border-dotted"
              >
                NuxtUI
              </NuxtLink>
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>
              <NuxtLink
                to="https://github.com/nuxt-modules/eslint"
                target="_blank"
                class="border-primary-500 text-primary-500 hover:text-primary-700 hover:border-primary-700 border-b border-dotted"
              >
                @nuxtjs/eslint-module
              </NuxtLink> +
              <NuxtLink
                to="https://github.com/nuxt/eslint-config"
                target="_blank"
                class="border-primary-500 text-primary-500 hover:text-primary-700 hover:border-primary-700 border-b border-dotted"
              >
                @nuxtjs/eslint-config-typescript
              </NuxtLink> +
              <NuxtLink
                to="https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master"
                target="_blank"
                class="border-primary-500 text-primary-500 hover:text-primary-700 hover:border-primary-700 border-b border-dotted"
              >
                plugin:tailwindcss/recommended
              </NuxtLink>
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>
              <NuxtLink
                to="https://vueuse.org/guide/"
                target="_blank"
                class="border-primary-500 text-primary-500 hover:text-primary-700 hover:border-primary-700 border-b border-dotted"
              >
                @vueuse/nuxt
              </NuxtLink>
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>
              <NuxtLink
                to="https://v1.image.nuxtjs.org/get-started"
                target="_blank"
                class="border-primary-500 text-primary-500 hover:text-primary-700 hover:border-primary-700 border-b border-dotted"
              >
                @nuxt/image-edge
              </NuxtLink>
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>
              <NuxtLink
                to="https://google-fonts.nuxtjs.org/"
                target="_blank"
                class="border-primary-500 text-primary-500 hover:text-primary-700 hover:border-primary-700 border-b border-dotted"
              >
                @nuxtjs/google-fonts
              </NuxtLink>
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>
              <NuxtLink
                to="https://pinia.vuejs.org/"
                target="_blank"
                class="border-primary-500 text-primary-500 hover:text-primary-700 hover:border-primary-700 border-b border-dotted"
              >
                Pinia
              </NuxtLink>
            </div>
          </nav>
        </div>
        <div class="w-full p-4 sm:w-1/2 lg:w-1/4">
          <h2 class="text-primary-400 mb-4 text-center text-sm font-bold tracking-widest sm:text-left">
            DEVELOPMENT
          </h2>
          <nav class="-mb-1 flex flex-col items-center space-y-2.5 text-center sm:items-start sm:text-left">
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>Full dockerized
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>GitHub dependantbot
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>GitHub CI
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>Default demo components, composables and stores
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>TypeScript with strict mode
            </div>
          </nav>
        </div>
        <div class="w-full p-4 sm:w-1/2 lg:w-1/4">
          <h2 class="text-primary-400 mb-4 text-center text-sm font-bold tracking-widest sm:text-left">
            DOCKER COMPOSE MODES
          </h2>
          <nav class="-mb-1 flex flex-col items-center space-y-2.5 text-center sm:items-start sm:text-left">
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span><span class="font-bold">Mode 0:</span> As separate dev server on custom port
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span><span class="font-bold">Mode 1:</span> As dev server behind the Traefik with http
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span><span class="font-bold">Mode 2:</span> As dev server behind the Traefik + SSL and custom domain
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span><span class="font-bold">Mode 3:</span> For production as SSR with Node.js
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span><span class="font-bold">Mode 4:</span> For production as SPA with Nginx
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>Just create <span class="text-primary-400">.env</span> from <span class="text-primary-400">.env.example</span> and type <span class="text-primary-400">docker compose up -d</span>
            </div>
          </nav>
        </div>
        <div class="w-full p-4 sm:w-1/2 lg:w-1/4">
          <h2 class="text-primary-400 mb-4 text-center text-sm font-bold tracking-widest sm:text-left">
            PART OF FULLSTACK APP
          </h2>
          <nav class="-mb-1 flex flex-col items-center space-y-2.5 text-center sm:items-start sm:text-left">
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>
              <NuxtLink to="https://github.com/baikov/drf-tpl">
                Template for Django+DRF REST API backend
              </NuxtLink>
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>
              <NuxtLink to="https://github.com/baikov/tpl-traefik">
                Traefik with SSL as reverse-proxy for development and production
              </NuxtLink>
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>Users with registration/autentification API
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>SEO-friendly out of the box
            </div>
            <div>
              <span class="bg-primary-100 text-primary-500 mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full">
                <UIcon name="i-heroicons-check" class="h-3 w-3" />
              </span>and more...
            </div>
          </nav>
        </div>
      </div>
      <div class="mx-auto mt-16 flex w-full justify-center">
        <NuxtLink
          to="https://github.com/baikov/tpl-nuxt3#readme"
          class="bg-primary-500 hover:bg-primary-600 flex items-center justify-center rounded border-0 px-8 py-2 text-lg text-gray-200 focus:outline-none"
        >
          <UIcon name="i-mdi-file-document" class="h-5 w-5" />
          <span class="pl-2">Documentation</span>
        </NuxtLink>
      </div>
    </UContainer>
    <UContainer class="flex justify-center pb-5">
      <!-- <NuxtImg :src="`/site/media/test.png`" width="60" height="30" class="dark:invert" /> -->
      <NuxtPicture
        src="/img/nuxt.png"
        sizes="sm:50 md:100px lg:150px"
        :img-attrs="{ class: 'dark:invert' }"
      />
    </UContainer>
  </section>
</template>
