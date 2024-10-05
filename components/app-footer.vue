<template>
  <footer class="bg-black text-white flex flex-col sm:flex-row justify-between gap-y-2 px-8 py-4 md:px-16 sm:py-8">
    <span>
      © {{ new Date().getFullYear() }}
      <NuxtLink
        to="http://www.integra.agh.edu.pl"
        target="_blank"
        rel="noopener noreferrer"
        class="underline cursor-pointer"
      >
        KN Integra
      </NuxtLink>
    </span>

    <span class="inline-flex gap-4 sm:gap-8">
      <NuxtLink to="/blog/about" class="underline cursor-pointer">O nas</NuxtLink>
      <NuxtLink to="/blog/regulations" class="underline cursor-pointer">Regulamin</NuxtLink>
      <NuxtLink to="/blog/contact" class="underline cursor-pointer">Kontakt</NuxtLink>
    </span>
  </footer>
</template>
