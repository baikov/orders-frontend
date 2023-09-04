<script lang="ts" setup>
const { getProductList } = useProducts()
const productList = await getProductList()
const columns = [{
  key: 'id',
  label: 'ID',
  sortable: true,
  direction: 'asc'
}, {
  key: 'name',
  label: 'Product name',
  sortable: true,
  direction: 'desc'
}, {
  key: 'vendor_code',
  label: 'Артикул',
  sortable: true,
  direction: 'desc'
}, {
  key: 'volume',
  label: 'Объём/Вес'
}]
</script>
<template>
  <UContainer class="flex flex-1 flex-col items-center justify-center">
    <UTable :rows="productList" :columns="columns" :sort="{ column: 'id' }" />
  </UContainer>
</template>
