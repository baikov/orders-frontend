<script lang="ts" setup>
const customerId = useState<number>('customer_id')
</script>

<template>
  <div class="flex flex-1 flex-col">
    <CommonFileUpload v-if="customerId" :customer-id="customerId" />
    <CustomerShortList v-else />
  </div>
</template>
