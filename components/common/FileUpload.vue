<script lang="ts" setup>
// import type { ICustomerOrder } from '~/types/orders'
const toast = useToast()
const props = defineProps<{
  customerId: number
}>()
useSeoMeta({
  title: 'Обработка заказа'
})

const { getCustomerDetail, createCustomerOrder } = useCustomer()
const { data: customer, error } = await getCustomerDetail(props.customerId)

if (customer.value === null || error.value) {
  // look at https://github.com/mitre/saf-site-frontend/issues/89
  // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  throw createError({
    statusCode: error.value?.statusCode || 400,
    statusMessage: error.value?.statusMessage || 'Some strange error in FileUpload.vue :)'
  })
}

const fileInput = ref<HTMLInputElement | null>(null)
const file = ref<File | null>(null)
// const customerOrder = useState<ICustomerOrder | null>('customer_order', () => null)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) { file.value = target.files[0] }
}
const uploadFile = async () => {
  if (file.value && customer.value) {
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('customer', customer.value.id.toString())
    const { data: customerOrder, error } = await createCustomerOrder(formData)
    if (error.value) {
      for (const key of Object.keys(error.value.data)) {
        toast.add({
          title: 'Ошибка создания заказа',
          description: `${key}: ${error.value.data[key]}`,
          icon: 'i-heroicons-x-circle-solid',
          color: 'red'
        })
      }
    } else if (customerOrder.value) {
      toast.add({
        title: 'Сохранение успешно',
        description: `Заказ "${customerOrder.value.id}" успешно создан`,
        icon: 'i-heroicons-check-solid',
        color: 'green'
      })
    }
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
</template>
