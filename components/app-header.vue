<template>
  <header id="page-header">
    <div class="hidden md:block">
      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <NuxtImg src="/img/landing-page/logoHalfNoNeon.webp" height="128px" class="ml-4 mb-2" alt="ROBOCOMP Logo" />
        </NuxtLink>

        <div class="flex">
          <NuxtLink
            v-for="link in headerLinks"
            :key="link.name"
            class="header-item text-white"
            :to="link.link"
            :target="link.external ? '_blank' : '_self'"
            @click="dropdownVisible = false"
          >
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
          <transition name="slide-fade">
          <div v-show="dropdownVisible" class="hidden absolute md:relative md:block z-40">
            <div class="flex flex-col absolute top-full -right-full bg-white rounded-sm slide-in-left shadow">
              <NuxtLink
                v-for="link in hamburgerLinks"
                :key="link.name"
                class="p-8 text-black hover:bg-neutral-200"
                :to="link.link"
                :target="link.external ? '_blank' : '_self'"
                @click="dropdownVisible = false"
              >
                {{ link.name }}
              </NuxtLink>
            </div>
          </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="block md:hidden">
      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <NuxtImg
            src="/img/landing-page/logoHalfNoNeon.webp"
            height="128px"
            class="ml-4 my-2 cursor-pointer"
            alt="ROBOCOMP robot arm"
          />
        </NuxtLink>

        <div class="flex">
          <div class="header-item cursor-pointer" @click="dropdownVisible = !dropdownVisible">
            <lazy-client-only>
              <fa-icon icon="fa-solid fa-bars" class="h-4 w-4 text-white" />
            </lazy-client-only>
          </div>
        </div>
      </div>
      <transition name="slide-fade">
        <div v-show="dropdownVisible" class="w-full absolute md:hidden z-40">
          <div class="flex flex-col text-center bg-white shadow">
            <NuxtLink
              v-for="link in filteredLinks"
              :key="link.name"
              :to="link.link"
              :target="link.external ? '_blank' : '_self'"
              class="p-8 text-black hover:bg-neutral-200 cursor-pointer"
              @click="dropdownVisible = false"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script lang="ts" setup>
const links = [
  { name: 'Harmonogram', link: '/blog/agenda' },
  { name: 'Regulaminy', link: '/blog/regulations' },
  // { name: 'Wyniki', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Rejestracja', link: 'http://registration.robocomp.info', external: true },
  { name: 'Lokalizacja', link: '/blog/location' },
  // { name: 'Głosowanie', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Kontakt', link: '/blog/contact' },
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
const hamburgerLinks = computed(() => filteredLinks.value.slice(hamburgerIndex))
const dropdownVisible = ref(false)
</script>

<style>
.header-item {
  @apply p-8;
}


.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateX(120px);
}

.slide-fade-leave-from, .slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
