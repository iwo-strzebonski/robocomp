<script setup lang="ts">
import EmptyDoc from '~/components/slots/empty-doc.vue'
import NotFound from '~/components/slots/not-found.vue'

definePageMeta({
  layout: 'index-page'
})

useHead({
  title: 'Festiwal Robotyki ROBOCOMP'
})
</script>

<template>
  <div class="index-page content-page markdown-content flex flex-col flex-1">
    <main class="container mx-auto my-8 px-4 lg:px-0 flex-1">
      <content-doc>
        <template #not-found>
          <not-found />
        </template>

        <template #empty>
          <empty-doc />
        </template>
      </content-doc>
    </main>

    <BigFooter class="mt-auto" />
    <AppFooter />
  </div>
</template>
