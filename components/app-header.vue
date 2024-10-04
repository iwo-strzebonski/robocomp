<template>
  <header id="page-header">

    <div class="hidden md:block">
      <div class="flex items-center justify-between">

        <NuxtImg src="/images/logoHalfNoNeon.png" height="120px"></NuxtImg>
        <div class="flex">
          <div class="header-item" v-for="link in headerLinks">{{ link.name }}</div>
          <div class="header-item" v-on:click="dropdownVisible = !dropdownVisible">
            <lazy-client-only>
              <fa-icon icon="fa-solid fa-burger" class="h-4 w-4" />
            </lazy-client-only>
          </div>
          <div class="hidden md:relative md:block" v-if="dropdownVisible">
            <div class="flex flex-col absolute top-[100%] right-[-100%] bg-white rounded-sm">
              <a class="p-[2rem] text-black" v-for="link in hamburgerLinks" :href="link.link"> {{ link.name }}</a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="block md:hidden">
      <div class="flex items-center justify-between">
        <NuxtImg src="/images/logoHalfNoNeon.png" height="120px"></NuxtImg>
        <div class="flex">
          <div class="header-item" v-on:click="dropdownVisible = !dropdownVisible">H</div>
          <div class="hidden md:relative md:block" v-if="dropdownVisible">
            <div class="flex flex-col absolute top-[100%] right-[-100%] bg-white rounded-sm">
              <a class="p-[2rem] text-black" v-for="link in links" :href="link.link"> {{ link.name }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full block md:hidden" v-if="dropdownVisible">
        <div class="flex flex-col text-center bg-white rounded-sm">
          <a class="p-[2rem] text-black" v-for="link in links" :href="link.link"> {{ link.name }}</a>
        </div>
      </div>
    </div>






  </header>
</template>

<script lang="ts" setup>

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'


const links = [
  { name: "Atrakcje", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "Wyniki", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "Głosowanie", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { name: "Rejestracja", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
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
  @apply p-[2rem]
}
</style>