<script setup lang="ts">
import calculateCountdown from '~/helpers/calculateCountdown'

const countdown = ref<string>(calculateCountdown())

onBeforeMount(() => {
  const currCountdown = calculateCountdown()

  const interval = setInterval(
    () => {
      countdown.value = calculateCountdown()
    },
    currCountdown.includes('.') ? 1 : 1000
  )

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})
</script>

<template>
  <h2 class="!my-0">
    Czas do wydarzenia: <span>{{ countdown }}</span>
  </h2>
</template>
