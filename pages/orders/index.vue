<script lang="ts" setup>
const customerId = useState<number>('customerId')
</script>

<template>
  <div class="flex flex-1 flex-col">
    <OrderList :customer-id="customerId" />
  </div>
</template>
