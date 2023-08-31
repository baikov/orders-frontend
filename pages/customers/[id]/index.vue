<script lang="ts" setup>
const route = useRoute()
const id = +route.params.id
</script>

<template>
  <div class="flex flex-1 flex-col">
    Client id: {{ id }}
  </div>
</template>
