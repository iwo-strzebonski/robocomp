<script setup lang="ts">
import { FwbAccordion, FwbAccordionContent, FwbAccordionHeader, FwbAccordionPanel } from 'flowbite-vue'
import { H3Error } from 'h3'

import type { AlbumResponse } from '~/server/api/meta/albums.get'

const { data: galleryData, pending: galleryPending } = useLazyFetch<AlbumResponse | H3Error>('/api/meta/albums')
</script>

<template>
  <lazy-client-only>
    <span v-if="galleryPending">Loading...</span>

    <fwb-accordion v-else-if="galleryData && !(galleryData instanceof H3Error)">
      <fwb-accordion-panel v-for="yearData in galleryData.data" :key="yearData.name">
        <fwb-accordion-header>
          <h3 class="text-lg font-semibold !m-0">{{ yearData.name }}</h3>
        </fwb-accordion-header>

        <fwb-accordion-content>
          <NuxtLink :to="yearData.link" class="underline text-lg mb-4"> Galeria na Facebooku </NuxtLink>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <NuxtLink
              v-for="imgData in yearData.photos.data"
              :key="imgData.id"
              :to="imgData.link"
              :style="{ backgroundImage: `url(${imgData.webp_images[0].source})` }"
              class="aspect-square bg-cover"
            />
          </div>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
