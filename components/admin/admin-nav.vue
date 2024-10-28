<script setup lang="ts">
import { FwbSidebar, FwbSidebarItem, FwbSidebarLogo } from 'flowbite-vue'

import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()

/** Logout user */
async function logout() {
  try {
    await userStore.logout()
  } catch (e) {
    alert((e as Error).message)
  }
}
</script>

<template>
  <lazy-client-only>
    <fwb-sidebar class="flowbite fixed">
      <fwb-sidebar-logo name="XILLITH" logo="/icon.png" />

      <fwb-sidebar-item link="/xillith">
        <template #icon>
          <fa-icon icon="fa-solid fa-gauge-simple-high" class="w-4 h-4" />
        </template>

        <template #default>Dashboard</template>
      </fwb-sidebar-item>

      <fwb-sidebar-item link="/xillith/agenda">
        <template #icon>
          <fa-icon icon="fa-regular fa-calendar" class="w-4 h-4" />
        </template>

        <template #default>Harmonogram</template>
      </fwb-sidebar-item>

      <fwb-sidebar-item link="/xillith/login" @click="logout()">
        <template #icon>
          <fa-icon icon="fa-solid fa-sign-out-alt" class="w-5 h-5 text-black dark:text-neutral-200" />
        </template>

        <template #default>Wyloguj się</template>
      </fwb-sidebar-item>
    </fwb-sidebar>
  </lazy-client-only>
</template>
