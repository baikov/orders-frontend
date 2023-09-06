<script lang="ts" setup>
import type { ICustomerOrder } from '~/types/orders'
const props = defineProps<{
  orderDetail: ICustomerOrder
  refreshOrders:() => Promise<void>
}>()

const { getProductList } = useProducts()
const { data: baseProducts } = await getProductList()

const emptyCustomerProducts = useState(`"emptyCustomerProducts_${props.orderDetail.id}"`, () => {
  return props.orderDetail.products.filter(obj => obj.base_product === null)
})
</script>

<template>
  <section class="relative mx-auto flex w-full flex-col">
    <CommonPageH2 :text="`Товары без привязки (${emptyCustomerProducts.length} шт)`" />
    <div class="mx-auto w-full max-w-7xl p-4">
      <div v-if="emptyCustomerProducts" class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Наименование товара
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Товар из матрицы
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Внутренний артикул
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Кол-во
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(product, productIdx) in emptyCustomerProducts" :key="product.id">
                    <OrderProductListRow
                      :customer-product="product"
                      :idx="productIdx"
                      :refresh-orders="refreshOrders"
                      :base-products="baseProducts"
                    />
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
