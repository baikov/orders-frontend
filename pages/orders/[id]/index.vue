<script lang="ts" setup>
const route = useRoute()
const id = +route.params.id
const { getOrdersList } = useOrders()
const { data: tpOrders, refresh: refreshTPOrders } = await getOrdersList(id)

const { getCustomerOrderDetail } = useCustomer()
const { data: customerOrderDetail, refresh: refreshOrderDetail } = await getCustomerOrderDetail(id)

// if (errorTPOrders.value) { , error: errorTPOrders
// }
// if (errorOrderDetail.value) { , error: errorOrderDetail
// }
</script>

<template>
  <div class="flex flex-1 flex-col">
    <CommonPageTitle :text="`${customerOrderDetail?.customer_name}: заказ №${id} от ${customerOrderDetail?.created}`" />
    <TradepointOrderList v-if="tpOrders" :tp-orders="tpOrders" :orders-in-pack="customerOrderDetail?.order_in_packs" />
    <UContainer v-else class="flex flex-col items-center justify-center space-y-2">
      <USkeleton class="h-4 w-full bg-white" />
      <USkeleton class="h-4 w-full bg-white" />
      Отсутствует список сформированных заказов
    </UContainer>
    <OrderProductList
      v-if="customerOrderDetail"
      :order-detail="customerOrderDetail"
      :refresh-orders="refreshTPOrders"
      :refresh-order-detail="refreshOrderDetail"
    />
    <UContainer v-else class="flex flex-col items-center justify-center space-y-2">
      <USkeleton class="h-4 w-full bg-white" />
      <USkeleton class="h-4 w-full bg-white" />
      Отсутствует список товаров в заказе клиента
    </UContainer>
  </div>
</template>
