<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { promiseTimeout } from '@vueuse/core'
import type { IActivateAccount, IAuthError } from '~/types'
import { useAuthStore } from '~/store/auth'

const { errorMessage, user } = storeToRefs(useAuthStore())
const { activateAccount, resendEmail } = useAuthStore()
const route = useRoute()
const toast = useToast()
const slug = route.params.slug
const confirmationCookie = useCookie('accountConfirmation')

const activateForm: IActivateAccount = {
  uid: slug[0] || '',
  token: slug[1] || ''
}

const email = useState('email', () => '')

async function onSubmitActivate () {
  // const data = await form.value!.validate()
  await activateAccount(activateForm)
  const confirmationCookie = useCookie('accountConfirmation')
  if (confirmationCookie.value === 'confirmed') {
    toast.add({
      title: 'Success!',
      description: 'Account activated',
      icon: 'i-heroicons-check-solid',
      color: 'green'
    })
    // return navigateTo('/account')
  } else if (errorMessage.value?.message) {
    for (const msg of Object.values(errorMessage.value.message)) {
      toast.add({
        title: 'Activation faild!',
        description: `${msg}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
      await promiseTimeout(500)
    }
    errorMessage.value = {} as IAuthError
    return navigateTo('/account/confirm')
  } else {
    toast.add({
      title: 'Activation faild!',
      description: 'Undefined error',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  }
}
async function submitResend () {
  await resendEmail(user.value?.email || email.value)
  const confirmationCookie = useCookie('accountConfirmation')
  if (confirmationCookie.value === 'sended') {
    toast.add({
      title: 'Success!',
      description: 'Activation link sended',
      icon: 'i-heroicons-check-solid',
      color: 'green'
    })
  } else if (errorMessage.value?.message) {
    for (const msg of Object.values(errorMessage.value)) {
      toast.add({
        title: 'Resend faild!',
        description: `${msg}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
      await promiseTimeout(500)
    }
    errorMessage.value = {} as IAuthError
  } else {
    toast.add({
      title: 'Resend faild!',
      description: 'Undefined error',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  }
}
const breadcrumbs = [
  {
    level: 1,
    name: 'Account',
    href: '/account',
    disabled: false
  },
  {
    level: 2,
    name: 'Activation',
    href: '/account/confirm',
    disabled: true
  }
]
</script>

<template>
  <!--
    Проверить весь процесс регистрации и активации
    Поправить вывод ошибок в новом формате
  -->
  <div>
    <DefaultBreadcrumbs :items="breadcrumbs" />
    <UContainer class="flex flex-col items-center justify-center">
      <UCard v-if="activateForm.uid && activateForm.token && confirmationCookie !== 'confirmed'" class="w-auto lg:w-96">
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Activate
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Activate your account
          </p>
        </template>
        Click on button
        <template #footer>
          <UButton color="green" @click="onSubmitActivate">
            Activate
          </UButton>
        </template>
      </UCard>
      <UCard v-if="confirmationCookie === 'confirmed'" class="w-auto lg:w-96">
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Success!
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your account sucessfull activated
          </p>
        </template>
        Body
        <template #footer>
          <UButton color="green" @click="navigateTo('/account')">
            Login
          </UButton>
        </template>
      </UCard>
      <UCard v-if="(confirmationCookie === 'error' || confirmationCookie === 'sended') && !activateForm.uid" class="w-auto lg:w-96">
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Confirmation
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Confirm your account
          </p>
        </template>
        We send confirmation link on email, please check
        If you didn't receive it click "resend" button
        <UFormGroup v-if="!user?.email" label="Email" name="email" required class="mb-3">
          <UInput v-model="email" placeholder="you@example.com" error="Not a valid email address." icon="i-heroicons-envelope" required />
        </UFormGroup>
        <template #footer>
          <UButton color="red" @click="submitResend">
            Resend activation email
          </UButton>
        </template>
      </UCard>
    </UContainer>
  </div>
</template>
