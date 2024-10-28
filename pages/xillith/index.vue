<script setup lang="ts">
definePageMeta({
  middleware: ['admin']
})
</script>

<template>
  <div class="admin-page inline-flex flex-1 w-full">
    <main class="container flex-1 mx-auto my-8 px-4 lg:px-0">
      <div class="admin-page-content mt-2 flex-grow mb-auto">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
