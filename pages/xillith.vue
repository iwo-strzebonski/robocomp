<script setup lang="ts">
definePageMeta({
  title: 'XILLITH',
  description: 'System do zarządzania Festiwalem Robotyki ROBOCOMP',
  key: (route) => route.fullPath,
  layout: 'xillith'
})
</script>

<template>
  <div class="admin-page flex flex-col">
    <Head>
      <Title>XILLITH</Title>
    </Head>

    <div class="admin-page-content px-2 md:px-4 lg:px-6 mt-2 flex-grow mb-auto">
      <NuxtPage />
    </div>
  </div>
</template>
