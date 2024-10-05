<template>
  <div class="min-h-screen w-full overflow-y-auto overflow-x-none flex flex-col">
    <AppHeader class="bg-black" />

    <slot></slot>

    <AppFooter class="mt-auto" />
  </div>
</template>
