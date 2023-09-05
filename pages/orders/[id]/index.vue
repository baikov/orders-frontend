<script lang="ts" setup>
const route = useRoute()
const id = +route.params.id
const { getOrdersList } = useOrders()
const { data: tpOrders, error: errorTPOrders, refresh: refreshTPOrders } = await getOrdersList(id)

const { getCustomerOrderDetail } = useCustomer()
const { data: customerOrderDetail, error: errorOrderDetail } = await getCustomerOrderDetail(id)

if (errorTPOrders.value) {
  showError({
    statusCode: errorTPOrders.value.statusCode,
    statusMessage: errorTPOrders.value.statusMessage
  })
  throw createError({
    statusCode: errorTPOrders.value.statusCode,
    statusMessage: errorTPOrders.value.statusMessage
  })
}
if (errorOrderDetail.value) {
  showError({
    statusCode: errorOrderDetail.value.statusCode,
    statusMessage: errorOrderDetail.value.statusMessage
  })
  throw createError({
    statusCode: errorOrderDetail.value.statusCode,
    statusMessage: errorOrderDetail.value.statusMessage
  })
}
</script>

<template>
  <div class="flex flex-1 flex-col">
    <CommonPageTitle :text="`${customerOrderDetail?.customer_name}: заказ №${id} от ${customerOrderDetail?.created}`" />
    <TradepointOrderList :orders-ready="customerOrderDetail?.is_ready" :tp-orders="tpOrders" />
    <OrderProductList :order-detail="customerOrderDetail" :refresh-orders="refreshTPOrders" />
  </div>
</template>
