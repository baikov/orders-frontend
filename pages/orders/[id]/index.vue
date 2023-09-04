<script lang="ts" setup>
// const { getOrdersList } = useOrders()
const route = useRoute()
const id = +route.params.id
// const { data: tpOrders, refresh } = await getOrdersList(id)
</script>

<template>
  <div class="flex flex-1 flex-col">
    <TradepointOrderList />
    <!-- <TradepointOrderList v-if="tpOrders && tpOrders.length !== 0" :tp-orders="tpOrders" /> -->
    <!-- <TradepointCreateOrders v-else :order-id="id" /> -->
    <OrderProductList :order-id="id" :refresh-orders="refresh" />
  </div>
</template>
