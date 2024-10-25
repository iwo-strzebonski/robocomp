<script setup lang="ts">
import LoginForm from '~/components/admin/login-form.vue'

definePageMeta({
  middleware: ['no-admin']
})
</script>

<template>
  <main class="mt-6">
    <div class="mx-auto px-2 max-w-fit">
      <LoginForm />
    </div>
  </main>
</template>
