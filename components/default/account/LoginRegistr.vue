<script lang="ts" setup>
import type { FormError } from '@nuxt/ui/dist/runtime/types'
import { storeToRefs } from 'pinia'
import { promiseTimeout } from '@vueuse/core'
import type { ILoginForm, IRegistrationForm, IUser, IAuthError } from '~/types'
import { useAuthStore } from '~/store/auth'

const userCookie = useCookie<IUser>('user')
const { loginUser, registerUser } = useAuthStore()
const { authenticated, errorMessage, user } = storeToRefs(useAuthStore())
const toast = useToast()

const items = [{
  slot: 'login',
  label: 'LogIn'
}, {
  slot: 'registration',
  label: 'Registration'
}]

const validateLogin = (state: ILoginForm): FormError[] => {
  const errors = []
  if (!state.username) { errors.push({ path: 'username', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}
const validateRegistration = (state: IRegistrationForm): FormError[] => {
  const errors = []
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  if (!state.username) { errors.push({ path: 'username', message: 'Required' }) }
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (state.email && !emailRegex.test(state.email)) { errors.push({ path: 'email', message: 'Invalid email' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  if (!state.re_password) { errors.push({ path: 're_password', message: 'Required' }) }
  return errors
}
const form = ref()

const loginForm = ref<ILoginForm>({
  username: user.value?.username || undefined,
  password: undefined
})

const registrationForm = ref<IRegistrationForm>(
  {
    name: undefined,
    email: undefined,
    username: undefined,
    password: undefined,
    re_password: undefined
  }
)

async function onSubmitLogin () {
  const data = await form.value!.validate(loginForm.value)
  await loginUser(data)
  if (authenticated.value) {
    toast.add({
      title: 'Success!',
      description: `Welcome ${loginForm.value?.username}`,
      icon: 'i-heroicons-check-solid',
      color: 'green'
      // callback: () => { return navigateTo('/') }
    })
    return navigateTo('/')
  } else if (errorMessage.value?.message) {
    for (const msg of Object.values(errorMessage.value.message)) {
      toast.add({
        title: 'Login faild!',
        description: `${msg}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
      await promiseTimeout(500)
    }
    errorMessage.value = {} as IAuthError
  } else {
    toast.add({
      title: 'Login faild!',
      description: 'Undefined error',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  }
}

async function onSubmitRegistration () {
  const data = await form.value!.validate(registrationForm.value)
  const regUser = await registerUser(data)
  if (regUser) {
    userCookie.value = regUser
    toast.add({
      title: 'Registration Successfull!',
      description: `Confirm your account. We send confirmation link on ${regUser.email}`,
      icon: 'i-heroicons-check-solid',
      color: 'green'
    })
    return navigateTo('/account/confirm')
  } else if (errorMessage.value?.message) {
    // TODO: handle error
    for (const msg of Object.values(errorMessage.value?.message)) {
      toast.add({
        title: 'Registration faild!',
        description: `${msg}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
      await promiseTimeout(500)
    }
    errorMessage.value = {} as IAuthError
  } else {
    toast.add({
      title: 'Registration faild!',
      description: 'Undefined error',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  }
}
</script>

<template>
  <UTabs :items="items" class="w-full">
    <template #login="{ item }">
      <UForm
        ref="form"
        :validate="validateLogin"
        :state="loginForm"
        @submit.prevent="onSubmitLogin"
      >
        <UCard>
          <template #header>
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Login here
            </p>
          </template>

          <UFormGroup label="username" required name="username">
            <UInput v-model="loginForm.username" required />
          </UFormGroup>

          <UFormGroup label="Password" required name="password">
            <UInput v-model="loginForm.password" type="password" required />
          </UFormGroup>

          <template #footer>
            <UButton type="submit" color="black">
              Login
            </UButton>
          </template>
        </UCard>
      </UForm>
    </template>

    <template #registration="{ item }">
      <UForm
        ref="form"
        :validate="validateRegistration"
        :state="registrationForm"
        @submit.prevent="onSubmitRegistration"
      >
        <UCard @submit.prevent="onSubmitRegistration">
          <template #header>
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Registration form
            </p>
          </template>

          <UFormGroup label="Username" name="username" required class="mb-3">
            <UInput v-model="registrationForm.username" required />
          </UFormGroup>
          <UFormGroup label="Email" name="email" required class="mb-3">
            <UInput v-model="registrationForm.email" placeholder="you@example.com" error="Not a valid email address." icon="i-heroicons-envelope" required />
          </UFormGroup>
          <UFormGroup label="Name" name="name" required class="mb-3">
            <UInput v-model="registrationForm.name" required />
          </UFormGroup>
          <UFormGroup label="Password" name="password" required class="mb-3">
            <UInput v-model="registrationForm.password" type="password" required />
          </UFormGroup>
          <UFormGroup label="Repeat Password" name="re_password" required>
            <UInput v-model="registrationForm.re_password" type="password" required />
          </UFormGroup>

          <template #footer>
            <UButton type="submit" color="black">
              Register
            </UButton>
          </template>
        </UCard>
      </UForm>
    </template>
  </UTabs>
</template>
