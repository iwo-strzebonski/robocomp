<template>
  <header id="page-header">
    <div class="hidden md:block">
      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <NuxtImg src="/landing-page-img/logoHalfNoNeon.png" height="128px" class="ml-4"></NuxtImg>
        </NuxtLink>
        <div class="flex">
          <NuxtLink v-for="link in headerLinks" class="header-item" :to="link.link">
            {{ link.name }}
          </NuxtLink>
          <div class="header-item inline-flex items-center py-0 cursor-pointer"
            v-on:click="dropdownVisible = !dropdownVisible">
            <lazy-client-only>
              <fa-icon icon="fa-solid fa-bars" class="h-4 w-4" />
            </lazy-client-only>
          </div>
          <div class="hidden md:relative md:block" v-if="dropdownVisible">
            <div class="flex flex-col absolute top-full -right-full bg-white rounded-sm slide-in-left">
              <NuxtLink class="p-8 text-black hover:bg-neutral-200" v-for="link in hamburgerLinks" :to="link.link">
                {{ link.name }}
              </NuxtLink>
              <!-- TODO - animacja wjazd z lewej do prawej -->
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="block md:hidden">
      <div class="flex items-center justify-between">
        <NuxtImg src="/landing-page-img/logoHalfNoNeon.png" height="128px" class="ml-4 mt-2 cursor-pointer"></NuxtImg>
        <div class="flex">
          <div class="header-item cursor-pointer" v-on:click="dropdownVisible = !dropdownVisible">
            <lazy-client-only>
              <fa-icon icon="fa-solid fa-bars" class="h-4 w-4" />
            </lazy-client-only>
          </div>
        </div>
      </div>
      <div class="w-full absolute slide-in-up md:hidden" v-if="dropdownVisible">
        <div class="flex flex-col text-center bg-white rounded-sm">
          <NuxtLink class="p-8 text-black hover:bg-neutral-200 cursor-pointer" v-for="link in links" :to="link.link"> 
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </div>

  </header>
</template>

<script lang="ts" setup>


const links = [
  { name: "Atrakcje", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "Wyniki", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "Rejestracja", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "Głosowanie", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "Kontakt", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "O\xa0nas", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "Galeria", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
];

let hamburgerIndex = 3;

let headerLinks = links.slice(0, hamburgerIndex);
let hamburgerLinks = links.slice(hamburgerIndex, -1);
let dropdownVisible = ref(false);


</script>

<style>
.header-item {
  @apply p-8
}

.slide-in-up {
  transform: translateY(-100%);
  animation: slide-in-u 0.5s forwards;
}

.slide-in-left {
  transform: translateX(100%);
  animation: slide-in-l 0.5s forwards;
}

@keyframes slide-in-u {
    100% { transform: translateY(0%); }
}

@keyframes slide-in-l {
    100% { transform: translateX(0%); }
}
</style>