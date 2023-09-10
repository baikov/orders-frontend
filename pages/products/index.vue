<script lang="ts" setup>
import type { FormError } from '@nuxthq/ui/dist/runtime/types'
import type { IProduct, IProductCreate } from '~/types/orders'
const { getProductList, createProduct, updateProduct, deleteProduct } = useProducts()
const { data: products, refresh, pending } = await getProductList()

const toast = useToast()
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
}, {
  key: 'amount_in_pack',
  label: 'Кол-во'
}, {
  key: 'actions'
}]

const validateProduct = (state: IProductCreate): FormError[] => {
  const errors = []
  if (!state.name) { errors.push({ path: 'name', message: 'Обязательно для заполнения' }) }
  if (!state.vendor_code) { errors.push({ path: 'vendor_code', message: 'Обязательно для заполнения' }) }
  return errors
}
const form = ref()

const productForm = ref<IProductCreate>({
  name: '',
  vendor_code: null,
  amount_in_pack: null,
  volume: null
})
async function onSubmitProduct () {
  const data = await form.value!.validate(productForm.value)
  const { data: newProduct, error } = await createProduct(data)
  if (error.value) {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка добавления продукта',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  } else if (newProduct.value) {
    toast.add({
      title: 'Продукт добавлен',
      description: `Продукт "${newProduct.value.name}" успешно добавлен`,
      icon: 'i-heroicons-check-solid',
      color: 'green'
    })
  }
  productForm.value.vendor_code = null
  productForm.value.name = ''
  await refresh()
}

const q = ref('')
const filteredRows = computed(() => {
  if (products.value) {
    if (!q.value) {
      return products.value
    }
    return products.value.filter((product) => {
      return Object.values(product).some((value) => {
        return String(value).toLowerCase().includes(q.value.toLowerCase())
      })
    })
  } else {
    return [] as IProduct[]
  }
})

const page = ref(1)
const pageCount = 20
const rows = computed(() => {
  return filteredRows.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const update = useState('updateProd', () => {
  return products.value?.reduce((acc: Record<number, any>, item) => {
    acc[item.id] = { vendor_code: false, volume: false, amount_in_pack: false }
    return acc
  }, {}) || {}
})
const updateFields = useState('updateFields', () => {
  return products.value?.reduce((acc: Record<number, any>, item) => {
    acc[item.id] = {
      name: item.name,
      vendor_code: item.vendor_code,
      amount_in_pack: item.amount_in_pack,
      volume: item.volume
    }
    return acc
  }, {}) || {}
})
async function submitUpdateProduct (id: number) {
  if (updateFields.value[id].vendor_code === '') {
    toast.add({
      title: 'Ошибка обновления продукта',
      description: 'Артикул не может быть пустым',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
    const product = products.value?.filter(product => product.id === id)
    updateFields.value[id].vendor_code = product![0].vendor_code
    return
  }
  const { data: product, error } = await updateProduct(id, updateFields.value[id])
  if (error.value) {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка добавления продукта',
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
  }
  await refresh()
  for (const key of Object.keys(update.value[id])) {
    update.value[id][key] = false
  }
}

async function submitDeleteProduct (id: number) {
  const { status, error } = await deleteProduct(id)
  if (error.value) {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка удаления продукта',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  } else if (status.value === 'success') {
    toast.add({
      title: 'Удаление успешно',
      description: 'Продукт успешно удален',
      icon: 'i-heroicons-check-solid',
      color: 'green'
    })
    await refresh()
    updateFields.value[id] = {}
  }
}

// const items = (row: any) => [
//   [{
//     label: 'Редактировать',
//     icon: 'i-heroicons-pencil-square-20-solid',
//     click: () => console.log('Edit', row.id)
//   }], [{
//     label: 'Удалить',
//     icon: 'i-heroicons-trash-20-solid',
//     click: () => submitDeleteProduct(row.id)
//   }]
// ]
</script>
<template>
  <div>
    <CommonPageTitle :text="`Товарная матрица (${products?.length || 0} товаров)`" />
    <UContainer class="flex flex-1 flex-col">
      <UForm
        ref="form"
        :validate="validateProduct"
        :state="productForm"
        class="mb-12 flex gap-4 rounded-lg bg-white p-4 shadow"
        @submit.prevent="onSubmitProduct"
      >
        <UFormGroup required name="name">
          <UInput v-model="productForm.name" placeholder="Название" required />
        </UFormGroup>

        <UFormGroup required name="vendor_code">
          <UInput v-model="productForm.vendor_code" placeholder="Артикул" required />
        </UFormGroup>
        <UFormGroup name="volume">
          <UInput v-model="productForm.volume" placeholder="Объём" />
        </UFormGroup>
        <UFormGroup name="amount_in_pack">
          <UInput v-model="productForm.amount_in_pack" placeholder="Кол-во" />
        </UFormGroup>

        <UButton type="submit">
          Добавить товар
        </UButton>
      </UForm>
      <UInput
        v-model="q"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Поиск продукта"
        :ui="{ wrapper: 'relative w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 mb-8' }"
      />
      <UTable
        :loading="pending"
        :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Обновение товаров...' }"
        :rows="rows"
        :columns="columns"
        :sort="{ column: 'id' }"
      >
        <template #vendor_code-data="{ row }">
          <div v-if="!update[row.id].vendor_code" class="group flex">
            <UButton
              color="gray"
              size="sm"
              icon="i-tabler-edit"
              variant="link"
              :label="row.vendor_code"
              @click="update[row.id].vendor_code = true"
            />
          </div>
          <div v-else class="flex">
            <UInput v-model="updateFields[row.id].vendor_code" placeholder="Артикул" required />
            <UButtonGroup size="sm">
              <UButton
                icon="i-tabler-x"
                size="sm"
                color="primary"
                square
                variant="outline"
                @click="update[row.id].vendor_code = false"
              />
              <UButton
                icon="i-mdi-content-save"
                size="sm"
                color="green"
                square
                variant="outline"
                @click="submitUpdateProduct(row.id)"
              />
            </UButtonGroup>
          </div>
        </template>
        <template #volume-data="{ row }">
          <div v-if="!update[row.id].volume" class="group flex">
            <UButton
              color="gray"
              size="sm"
              icon="i-tabler-edit"
              variant="link"
              :label="row.volume.toString()"
              @click="update[row.id].volume = true"
            />
          </div>
          <div v-else class="flex">
            <UInput v-model="updateFields[row.id].volume" placeholder="Объём" />
            <UButtonGroup size="sm">
              <UButton
                icon="i-tabler-x"
                size="sm"
                color="primary"
                square
                variant="outline"
                @click="update[row.id].volume = false"
              />
              <UButton
                icon="i-mdi-content-save"
                size="sm"
                color="green"
                square
                variant="outline"
                @click="submitUpdateProduct(row.id)"
              />
            </UButtonGroup>
          </div>
        </template>
        <template #amount_in_pack-data="{ row }">
          <div v-if="!update[row.id].amount_in_pack" class="group flex">
            <UButton
              color="gray"
              size="sm"
              icon="i-tabler-edit"
              variant="link"
              :label="row.amount_in_pack.toString()"
              @click="update[row.id].amount_in_pack = true"
            />
          </div>
          <div v-else class="flex">
            <UInput v-model="updateFields[row.id].amount_in_pack" placeholder="Кол-во" />
            <UButtonGroup size="sm">
              <UButton
                icon="i-tabler-x"
                size="sm"
                color="primary"
                square
                variant="outline"
                @click="update[row.id].amount_in_pack = false"
              />
              <UButton
                icon="i-mdi-content-save"
                size="sm"
                color="green"
                square
                variant="outline"
                @click="submitUpdateProduct(row.id)"
              />
            </UButtonGroup>
          </div>
        </template>
        <template #actions-data="{ row }">
          <!-- <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown> -->
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-trash-20-solid"
            @click="submitDeleteProduct(row.id)"
          />
        </template>
      </UTable>
      <UPagination v-model="page" :page-count="pageCount" :total="filteredRows?.length || 0" />
    </UContainer>
  </div>
</template>
