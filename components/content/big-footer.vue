<script setup lang="ts">
const $props = defineProps<{
  logoSize?: 'small' | 'medium' | 'large'
  linkType?: 'internal' | 'external'
}>()
</script>

<template>
  <div
    class="big-footer flex flex-col items-center gap-8 py-8 z-0"
    :class="{
      'small-logo': $props.logoSize === 'small',
      'large-logo': $props.logoSize === 'large'
    }"
  >
    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Organizatorzy</div>

      <span class="inline-flex gap-8">
        <NuxtLink
          to="https://www.agh.edu.pl/"
          target="_blank"
          rel="noopener noreferrer"
          class="partner-logo"
          :style="`background-image: url('/logo/agh${$props.logoSize === 'small' ? '' : '-text'}.jpg')`"
        />

        <NuxtLink
          to="http://www.integra.agh.edu.pl/"
          target="_blank"
          rel="noopener noreferrer"
          class="partner-logo"
          style="background-image: url('/logo/integra.png')"
        />
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Złoci Partnerzy</div>

      <span class="inline-flex gap-4">
        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/tme' : 'https://www.tme.eu/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/tme.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl mt-4">TME Sp. z o.o.</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Srebrni Partnerzy</div>

      <span class="inline-flex gap-4">
        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/astar' : 'https://www.astar.pl/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/astar.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl mt-4">ASTAR Sp. z o.o.</span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/manu' : 'https://manuonline.pl/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/manu.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl mt-4">Małopolska Akademia</span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">Nabywania Umiejętności</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Patroni Medialni</div>

      <span class="inline-flex gap-4">
        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://www.krakow.pl/"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/krakow-pl.jpg')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl mt-4">Magiczny Kraków</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Patronat Honorowy</div>

      <span class="inline-flex gap-4">
        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://www.krakow.pl/3401,obj,14437,patronaty.html"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/miasto-krakow.jpg')"
          />

          <span class="font-bold text-xl mt-4">Aleksander Miszalski</span>
          <span class="text-lg">Prezydent Miasta Krakowa</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Opieka Techniczna</div>

      <span class="inline-flex gap-4">
        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/rainlabs' : 'https://www.rainlabs.pl/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo bg-neutral-700"
            style="background-image: url('/logo/rainlabs.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl mt-4">Rainlabs Services Sp. z o.o.</span>
        </span>
      </span>
    </div>
  </div>
</template>
