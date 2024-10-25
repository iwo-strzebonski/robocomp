<script setup lang="ts">
import { useUserStore } from '~/store/user.store'

definePageMeta({
  middleware: ['no-auth']
})

const userStore = useUserStore()
const $route = useRoute()

const showPassword = ref(false)

/** Toggle password visibility */
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

const password = ref('')
const email = ref('')

/** Login user */
async function login() {
  try {
    await userStore.login(email.value, password.value)

    alert('Zalogowano pomyślnie')

    navigateTo(($route.query.redirect as string | undefined) || '/xillith')
  } catch (e) {
    alert(JSON.stringify(e))
  }
}
</script>

<template>
  <div
    class="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700"
  >
    <div class="px-6 py-6 space-y-4 md:space-y-6 sm:px-8">
      <h1
        class="text-xl inline-flex justify-center items-center w-full font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-white"
      >
        Zaloguj się do systemu XILLITH
      </h1>

      <form class="space-y-4 md:space-y-6" @submit.prevent="login()">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">
            Twój login (adres email)
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required="true"
            autocomplete="email"
          />
        </div>

        <div class="relative">
          <label for="password" class="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"> Hasło </label>
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            :placeholder="showPassword ? 'Wpisz hasło' : '••••••••'"
            class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required="true"
            autocomplete="current-password"
          />

          <lazy-client-only>
            <fa-icon
              class="w-6 h-6 absolute right-3 top-9 cursor-pointer"
              :icon="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"
              @click="togglePasswordVisibility()"
            />
          </lazy-client-only>
        </div>
        <!-- <div class="flex items-center justify-between"> -->
        <!-- <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-neutral-300 rounded bg-neutral-50 focus:ring-3 focus:ring-blue-300 dark:bg-neutral-700 dark:border-neutral-600 dark:focus:ring-blue-600 dark:ring-offset-neutral-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-neutral-500 dark:text-neutral-300">Zapamiętaj mnie</label>
                </div>
              </div> -->
        <!-- <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >Forgot password?</a
              > -->
        <!-- </div> -->
        <button
          type="submit"
          class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  </div>
</template>
