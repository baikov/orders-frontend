<script lang="ts" setup>
import type { ICustomer, ICustomerOrder } from '~/types/orders'
const props = defineProps<{
  customerId: number | null
}>()
useSeoMeta({
  title: 'Обработка заказа'
})

const { getCustomerDetail, createCustomerOrder } = useCustomer()
let customer: ICustomer | null = null
if (props.customerId) { customer = await getCustomerDetail(props.customerId) }

const fileInput = ref<HTMLInputElement | null>(null)
const file = ref<File | null>(null)
const customerOrder = useState<ICustomerOrder | null>('customer_order', () => null)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) { file.value = target.files[0] }
}
const uploadFile = async () => {
  if (file.value && customer) {
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('customer', customer.id.toString())
    customerOrder.value = await createCustomerOrder(formData)
    await navigateTo(`/orders/${customerOrder.value?.id}`)
  }
}
</script>

<template>
  <CommonPageTitle :text="`Загрузка файла заказа для клиента ${customer?.name}`" />
  <div class="mx-auto flex max-w-7xl flex-1 items-center px-4">
    <div
      class="flex justify-center justify-items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:bg-gray-400"
    >
      <form class="flex flex-col gap-2">
        <div class="flex rounded-md shadow-sm sm:max-w-md">
          <input ref="fileInput" type="file" @change="handleFileChange">
        </div>
        <NuxtLink
          class="border-primary-900/25 mt-2 w-full cursor-pointer rounded-lg border px-4 py-2 text-center text-sm font-medium text-gray-900"
          @click="uploadFile"
        >
          Загрузить
        </NuxtLink>
      </form>
    </div>
  </div>
  <!-- <CustomerOrderProducts v-else :products="customer_order.products" :order-id="customer_order.id" /> -->
</template>
