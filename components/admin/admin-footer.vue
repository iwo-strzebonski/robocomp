<script setup lang="ts">
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    class="w-full inline-flex p-4 justify-between items-center mt-auto bg-neutral-200 dark:bg-neutral-950 text-black dark:text-neutral-200"
  >
    All rights reserved &copy;{{ year }} KN Integra AGH
  </footer>
</template>
