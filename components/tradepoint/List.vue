<script lang="ts" setup>
const props = defineProps<{
  customerId: number
}>()
const toast = useToast()
const { getTPList, updateTP } = useTradePoints()
const { data: tradePointsList, error, refresh: refreshTPList } = await getTPList(props.customerId)
if (error.value) {
  for (const key of Object.keys(error.value.data)) {
    toast.add({
      title: 'Ошибка загркзки точек',
      description: `${key}: ${error.value.data[key]}`,
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  }
}

// Update Trade Points
const updateTPstate = useState(`updateTP_${props.customerId}`, () => {
  return tradePointsList.value?.reduce((acc: Record<number, any>, item) => {
    acc[item.id] = { sapcode: false }
    return acc
  }, {}) || {}
})
const updateTPFields = useState(`updateTPFields_${props.customerId}`, () => {
  return tradePointsList.value?.reduce((acc: Record<number, any>, item) => {
    acc[item.id] = {
      name: item.name,
      sapcode: item.sapcode,
      customer: item.customer
    }
    return acc
  }, {}) || {}
})
async function submitUpdateTP (id: number) {
  const { data: tp, error } = await updateTP(id, updateTPFields.value[id])
  if (error.value) {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка изменения точки',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  } else if (tp.value) {
    toast.add({
      title: 'Сохранение успешно',
      description: `Точка "${tp.value.name}" успешно обновлена`,
      icon: 'i-heroicons-check-solid',
      color: 'green'
    })
  }
  await refreshTPList()
  updateTPstate.value[id].sapcode = false
}
function truncatedName (name: string) {
  return name.length > 20 ? name.slice(0, 20) + '...' : name
}
</script>

<template>
  <div class="mx-auto w-full max-w-7xl p-4">
    <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      <li v-for="tp in tradePointsList" :key="tp.id" class="col-span-1 flex rounded-md shadow-sm">
        <div class="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800">
          <p class="font-medium">
            {{ truncatedName(tp.name) }}
          </p>
          <p v-if="!updateTPstate[tp.id].sapcode" class="text-gray-500">
            {{ tp.sapcode || 'sapcode not set' }}
          </p>
          <UInput v-else v-model="updateTPFields[tp.id].sapcode" placeholder="Sapcode" />
          <UIcon
            v-if="!updateTPstate[tp.id].sapcode"
            name="i-tabler-edit"
            class="size-5 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-200"
            aria-hidden="true"
            @click="updateTPstate[tp.id].sapcode = true"
          />
          <UIcon
            v-else
            name="i-mdi-content-save"
            class="size-5 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-200"
            aria-hidden="true"
            @click="submitUpdateTP(tp.id)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
