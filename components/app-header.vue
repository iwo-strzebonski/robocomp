<template>
  <header id="page-header">
    <div class="hidden md:block">
      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <NuxtImg src="/img/landing-page/logoHalfNoNeon.png" height="128px" class="ml-4 mb-2" />
        </NuxtLink>

        <div class="flex">
          <NuxtLink v-for="link in headerLinks" :key="link.name" class="header-item text-white" :to="link.link">
            {{ link.name }}
          </NuxtLink>

          <div
            class="header-item inline-flex items-center py-0 cursor-pointer"
            @click="dropdownVisible = !dropdownVisible"
          >
            <lazy-client-only>
              <fa-icon icon="fa-solid fa-bars" class="h-4 w-4 text-white" />
            </lazy-client-only>
          </div>

          <div v-show="dropdownVisible" class="hidden md:relative md:block z-40">
            <div class="flex flex-col absolute top-full -right-full bg-white rounded-sm slide-in-left">
              <NuxtLink
                v-for="link in hamburgerLinks"
                :key="link.name"
                class="p-8 text-black hover:bg-neutral-200"
                :to="link.link"
              >
                {{ link.name }}
              </NuxtLink>
              <!-- TODO - animacja wjazd z prawej do lewej -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block md:hidden">
      <div class="flex items-center justify-between">
        <NuxtImg src="/img/landing-page/logoHalfNoNeon.png" height="128px" class="ml-4 my-2 cursor-pointer" />

        <div class="flex">
          <div class="header-item cursor-pointer" @click="dropdownVisible = !dropdownVisible">
            <lazy-client-only>
              <fa-icon icon="fa-solid fa-bars" class="h-4 w-4 text-white" />
            </lazy-client-only>
          </div>
        </div>
      </div>

      <div v-show="dropdownVisible" class="w-full absolute slide-in-up md:hidden z-40">
        <div class="flex flex-col text-center bg-white rounded-sm">
          <NuxtLink
            v-for="link in filteredLinks"
            :key="link.name"
            class="p-8 text-black hover:bg-neutral-200 cursor-pointer"
            :to="link.link"
            @click="dropdownVisible = false"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const links = [
  { name: 'Harmonogram', link: '/blog/agenda' },
  { name: 'Regulaminy', link: '/blog/regulations' },
  // { name: 'Wyniki', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  // { name: 'Rejestracja', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  // { name: 'Głosowanie', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  // { name: 'Kontakt', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  // { name: 'O\xA0nas', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Galeria', link: '/blog/gallery' }
]

const $route = useRoute()

const filteredLinks = computed(() => {
  const filtered = links.filter((link) => link.link !== $route.path)

  if (filtered.length < links.length) {
    filtered.unshift({ name: 'Strona główna', link: '/' })
  }

  return filtered
})

const hamburgerIndex = 3

const headerLinks = computed(() => filteredLinks.value.slice(0, hamburgerIndex))
const hamburgerLinks = computed(() => filteredLinks.value.slice(hamburgerIndex, -1))
const dropdownVisible = ref(false)
</script>

<style>
.header-item {
  @apply p-8;
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
  100% {
    transform: translateY(0%);
  }
}

@keyframes slide-in-l {
  100% {
    transform: translateX(0%);
  }
}
</style>
