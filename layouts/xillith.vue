<script setup lang="ts">
import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()

const loggedIn = computed(() => userStore.tokenType && userStore.accessToken)
</script>

<template>
  <div class="min-h-screen w-full overflow-y-auto overflow-x-none flex flex-col relative bg-white dark:bg-neutral-700">
    <AdminNav v-if="loggedIn" />

    <div class="flex flex-col flex-1" :class="{ 'ml-64': loggedIn }">
      <AdminHeader />

      <div><slot></slot></div>

      <AdminFooter />
    </div>
  </div>
</template>
