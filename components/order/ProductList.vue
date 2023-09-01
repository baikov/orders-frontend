<script lang="ts" setup>
const props = defineProps<{
  orderId: number
}>()
const { getCustomerOrderDetail } = useCustomer()
const order = await getCustomerOrderDetail(props.orderId)
if (order === null) {
  // look at https://github.com/mitre/saf-site-frontend/issues/89
  showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  throw createError({
    statusCode: 400,
    statusMessage: 'Page Not Found'
  })
}
</script>

<template>
  <CommonPageTitle :text="`Товары в заказе № ${order.id} - ${order.customer_name}`" />
  <section class="relative mx-auto flex w-full flex-col">
    <div class="mx-auto w-full max-w-7xl p-4">
      <div v-if="order.products" class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Наименование товара
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Артикул
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Кол-во в упаковке
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(product, productIdx) in order.products" :key="product.id">
                    <OrderProductListRow :id="product.id" :product="product" :idx="productIdx" />
                    <!-- {{ product.name }} -->
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        Отсутствуют товары в заказе
      </div>
    </div>
  </section>
</template>
