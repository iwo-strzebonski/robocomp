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

      <span class="inline-flex gap-8 flex-wrap justify-center">
        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://www.agh.edu.pl/"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo"
            :style="`background-image: url('/logo/agh${$props.logoSize === 'small' ? '' : '-text'}.jpg')`"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-lg">Akademia</span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-lg">Górniczo-Hutnicza</span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://www.eaiib.agh.edu.pl/"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/weaiib.jpg')"
          />

          <span v-if="$props.logoSize !== 'small'" class="text-lg">Wydział</span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-sm"> Elektrotechniki, </span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-sm"> Automatyki, Informatyki </span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-sm"> i Inżynierii Biomedycznej </span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://kair.agh.edu.pl/"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/kair.jpg')"
          />

          <span v-if="$props.logoSize !== 'small'" class="text-lg">Katedra</span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">Automatyki i Robotyki</span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/blog/about' : 'http://www.integra.agh.edu.pl/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/integra.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="text-lg">Koło Naukowe</span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">INTEGRA</span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://inuni.org.pl"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/inuni.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">Fundacja InUnI</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Złoci Partnerzy</div>

      <span class="inline-flex gap-8 flex-wrap justify-center">
        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/tme' : 'https://www.tme.eu/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/tme.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">TME Sp. z o.o.</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Srebrni Partnerzy</div>

      <span class="inline-flex gap-8 flex-wrap justify-center">
        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/astar' : 'https://www.astar.pl/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/astar.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">ASTAR Sp. z o.o.</span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/mab-robotics' : 'https://www.mabrobotics.pl/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/mab-robotics.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">MAB Robotics Sp. z o.o.</span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/manu' : 'https://manuonline.pl/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/manu.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">Małopolska Akademia</span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">Nabywania Umiejętności</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Patroni Medialni</div>

      <span class="inline-flex gap-8 flex-wrap justify-center">
        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://www.krakow.pl/"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/krakow-pl.jpg')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">Magiczny Kraków</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Patronat Honorowy</div>

      <span class="inline-flex gap-8 flex-wrap justify-center">
        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://www.krakow.pl/3401,obj,14437,patronaty.html"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/miasto-krakow.jpg')"
          />

          <span class="font-bold text-xl mt-2">Aleksander Miszalski</span>
          <span class="text-lg">Prezydent Miasta Krakowa</span>
        </span>
      </span>
    </div>

    <div class="flex flex-col items-center gap-8">
      <div class="primary-header mt-6">Wsparcie Wydarzenia</div>

      <span class="inline-flex gap-8 flex-wrap justify-center">
        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/rainlabs' : 'https://www.rainlabs.pl/'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo"
            style="background-image: url('/logo/rainlabs.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="font-bold text-xl">Rainlabs Services Sp. z o.o.</span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            to="https://iet.agh.edu.pl/"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-logo !p-6"
            style="background-image: url('/logo/wiet.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="text-lg">Wydział</span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-base"> Informatyki, Elektroniki </span>
          <span v-if="$props.logoSize !== 'small'" class="font-bold text-base"> i Telekomunikacji </span>
        </span>

        <span class="flex flex-col items-center">
          <NuxtLink
            :to="$props.linkType === 'internal' ? '/partners/uciekamy-cukrzycy' : 'https://www.uciekamycukrzycy.pl'"
            :target="$props.linkType === 'internal' ? '_self' : '_blank'"
            rel="noopener noreferrer"
            class="partner-logo !p-6"
            style="background-image: url('/logo/uciekamy-cukrzycy.png')"
          />

          <span v-if="$props.logoSize !== 'small'" class="text-lg">Uciekamy Cukrzycy</span>
        </span>
      </span>
    </div>
  </div>
</template>
