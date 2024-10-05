<script setup lang="ts">
import { FwbAccordion, FwbAccordionContent, FwbAccordionHeader, FwbAccordionPanel } from 'flowbite-vue'
import { H3Error } from 'h3'

import type { AlbumResponse } from '~/server/api/meta/albums.get'

const { data: galleryData, status } = useLazyFetch<AlbumResponse | H3Error>('/api/meta/albums')
</script>

<template>
  <lazy-client-only>
    <span v-if="status === 'pending'">Ładowanie...</span>

    <fwb-accordion
      v-else-if="status === 'success' && galleryData && !(galleryData instanceof H3Error)"
      always-open
      flush
      class="fwb-accordion"
    >
      <fwb-accordion-panel v-for="yearData in galleryData.data" :key="yearData.name">
        <fwb-accordion-header class="fwb-accorion-header before-box before:bg-sky-400">
          <h3 class="font-semibold block w-max text-white !text-2xl !m-0">Edycja {{ yearData.name }}</h3>
        </fwb-accordion-header>

        <fwb-accordion-content class="fwb-accordion-content">
          <NuxtLink :to="yearData.link" class="underline text-lg mb-4"> Galeria na Facebooku </NuxtLink>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <NuxtLink
              v-for="imgData in yearData.photos.data"
              :key="imgData.id"
              :to="imgData.link"
              :style="{ backgroundImage: `url(${imgData.webp_images[0].source})` }"
              class="aspect-square bg-cover shadow-xl"
            />
          </div>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>

<style>
div.fwb-accorion-header {
  @apply ml-8 w-52 bg-black relative mt-8;
}

div.fwb-accorion-header button {
  @apply flex-row-reverse py-4 px-6 items-center justify-center;
}

div.fwb-accorion-header button span {
  @apply w-max;
}

div.fwb-accorion-header button svg {
  @apply text-white w-8 h-8;
}

div.fwb-accordion-content div {
  @apply !bg-transparent border-none;
}
</style>
