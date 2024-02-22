<script lang="ts" setup>
import type { ICustomerOrder, ICustomerProduct, IOrder } from '~/types/orders'
const props = defineProps<{
  orderDetail: ICustomerOrder
  refreshOrders:() => Promise<IOrder[] | Promise<void> | null>
  refreshOrderDetail:() => Promise<ICustomerOrder | Promise<void> | null>
}>()

const toast = useToast()
const { getProductList, updateCustomerProduct } = useProducts()
const { data: baseProducts } = await getProductList()

const emptyCustomerProducts = useState(`"emptyCustomerProducts_${props.orderDetail.id}"`, () => {
  return props.orderDetail.products.filter(obj => obj.base_product === null)
})

// Новая таблица продуктов в заказе
const onlyWithEmptyBaseProduct = useState(`"onlyWithEmptyBaseProduct_${props.orderDetail.id}"`, () => false)
const columns = [{
  key: 'name',
  label: 'Название'
}, {
  key: 'base_product_name',
  label: 'Базовый товар'
}, {
  key: 'vendor_code',
  label: 'Артикул'
}, {
  key: 'volume',
  label: 'Объём/Вес'
}, {
  key: 'amount_in_pack',
  label: 'Кол-во'
}]
const q = ref('')
const filteredRows = computed(() => {
  let data = props.orderDetail.products
  if (onlyWithEmptyBaseProduct.value) {
    data = emptyCustomerProducts.value
  }
  if (props.orderDetail.products) {
    if (!q.value) {
      return data
    }
    return data.filter((product) => {
      return Object.values(product).some((value) => {
        return String(value).toLowerCase().includes(q.value.toLowerCase())
      })
    })
  } else {
    return [] as ICustomerProduct[]
  }
})
const products: ICustomerProduct[] = props.orderDetail.products
const update = useState('updateCustomerProductState', () => {
  return products.reduce((acc: Record<number, any>, item: any) => {
    acc[item.id] = false
    return acc
  }, {}) || {}
})
const updateFields = useState('updateCustomerProductFields', () => {
  return products.reduce((acc: Record<number, any>, item: ICustomerProduct) => {
    acc[item.id] = {
      name: item.name,
      vendor_code: item.vendor_code,
      base_product: item.base_product || null
    }
    return acc
  }, {}) || {}
})
async function submitUpdateCustomerProduct (id: number) {
  const data = {
    name: updateFields.value[id].name,
    vendor_code: updateFields.value[id].vendor_code,
    base_product_id: updateFields.value[id].base_product || null,
    customer: props.orderDetail.customer
  }
  const { data: product, error } = await updateCustomerProduct(id, data)
  if (error.value) {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка обновения продукта',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  } else if (product.value) {
    toast.add({
      title: 'Сохранение успешно',
      description: `Продукт "${product.value.name}" успешно обновлен`,
      icon: 'i-heroicons-check-solid',
      color: 'green'
    })
    emptyCustomerProducts.value = emptyCustomerProducts.value.filter(obj => obj.id !== product.value?.id)
    await props.refreshOrderDetail()
  }
  update.value[id] = false
}
// const search = (q: string) => {
//   return baseProducts.value?.filter(obj => obj.vendor_code?.includes(q))
// }
</script>

<template>
  <section class="relative mx-auto flex w-full flex-col">
    <CommonPageH2 :text="`Товаров в заказе: ${products.length} шт. Без привязки: (${emptyCustomerProducts.length} шт)`" />
  </section>
  <UContainer class="flex w-full flex-col">
    <div class="flex w-full items-center justify-between gap-4 pb-7">
      <UInput
        v-model="q"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Поиск продукта"
        :ui="{ wrapper: 'relative w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0' }"
      />
      <span class="whitespace-nowrap text-xs">Без привязки:</span>
      <UToggle v-model="onlyWithEmptyBaseProduct" on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid" />
    </div>
    <UTable
      v-if="baseProducts"
      :rows="filteredRows"
      :columns="columns"
      class="overflow-x-auto"
    >
      <template #base_product_name-data="{ row }">
        <div v-if="!update[row.id]" class="group flex">
          <UButton
            :color="row.base_product?.name ? 'gray' : 'primary'"
            size="sm"
            :icon="row.base_product?.name ? 'i-tabler-edit' : 'i-tabler-plus'"
            variant="outline"
            :label="row.base_product?.name || 'выбрать'"
            @click="update[row.id] = true"
          />
        </div>
        <div v-else class="flex">
          <USelectMenu
            v-model="updateFields[row.id].base_product"
            :options="baseProducts"
            placeholder="Выберите базовый продукт"
            searchable
            :search-attributes="['name', 'vendor_code']"
            searchable-placeholder="Введите артикул..."
            value-attribute="id"
            option-attribute="option"
          />
          <UButtonGroup size="sm">
            <UButton
              icon="i-tabler-x"
              size="sm"
              color="primary"
              square
              variant="solid"
              @click="update[row.id] = false"
            />
            <UButton
              icon="i-mdi-content-save"
              size="sm"
              color="green"
              square
              variant="solid"
              @click="submitUpdateCustomerProduct(row.id)"
            />
          </UButtonGroup>
        </div>
      </template>
      <template #vendor_code-data="{ row }">
        <span class="group-hover:opacity-50">{{ row.base_product?.vendor_code || '-' }}</span>
      </template>
      <template #volume-data="{ row }">
        <span class="group-hover:opacity-50">{{ row.base_product?.volume || '-' }}</span>
      </template>
      <template #amount_in_pack-data="{ row }">
        <span class="group-hover:opacity-50">{{ row.base_product?.amount_in_pack || '-' }}</span>
      </template>
    </UTable>
    <p v-else class="text-center text-sm text-gray-500">
      Не удалось загрузить список...
    </p>
  </UContainer>
</template>
