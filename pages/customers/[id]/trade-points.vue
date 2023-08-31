<script lang="ts" setup>
// const customerId = useState<number>('customerId')
const route = useRoute()
const id = +route.params.id
</script>

<template>
  <section class="relative mx-auto flex w-full flex-col">
    <TradepointList :customer-id="id" />
  </section>
</template>
