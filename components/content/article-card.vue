<script setup lang="ts">
import type { Article } from '~/types'

const $props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true
  }
})
</script>

<template>
  <nuxt-link
    :id="$props.article.slug"
    :to="$props.article._path"
    class="block w-full md:w-[calc(50%_-_0.5rem)] p-6 bg-white border border-neutral-200 rounded-lg shadow hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 no-underline"
  >
    <div v-if="$props.article.image" class="article-card__image">
      <img :src="$props.article.image" :alt="$props.article.title" />
    </div>

    <div>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {{ $props.article.title }}
      </h5>

      <span class="mb-4 text-sm font-light text-neutral-700 dark:text-neutral-400">
        {{ new Date($props.article.createdAt).toLocaleString() }} &middot; {{ $props.article.author }}
      </span>
    </div>

    <p class="font-normal text-neutral-700 dark:text-neutral-400">
      {{ $props.article.description }}
    </p>

    <div v-if="$props.article.tags && $props.article.tags.length" class="text-sm text-neutral-700 dark:text-neutral-400">
      Tagi: {{ $props.article.tags.join(', ') }}
    </div>

    <div class="text-xs font-light text-neutral-700 dark:text-neutral-400">
      Ostatnia modyfikacja: {{ new Date($props.article.lastmod).toLocaleString() }}
    </div>
  </nuxt-link>
</template>
