<template>
  <div class="min-h-screen w-full overflow-y-auto overflow-x-none flex flex-col">
    <LandingPage />

    <slot></slot>

    <BigFooter class="mt-auto" />
    <AppFooter />
  </div>
</template>
