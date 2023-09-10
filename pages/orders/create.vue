<script lang="ts" setup>
const customerId = useState<number>('customer_id')
</script>

<template>
  <div class="flex flex-1 flex-col">
    <CommonPageTitle v-show="!customerId" :text="`Добавление заказа`" />
    <CommonFileUpload v-if="customerId" :customer-id="customerId" />
    <CustomerShortList v-else />
  </div>
</template>
