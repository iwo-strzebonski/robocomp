<script setup lang="ts">
import calculateCountdown from '~/helpers/calculateCountdown'

const countdown = ref<string>(calculateCountdown());

onBeforeMount(() => {
  const currCountdown = calculateCountdown()

  const interval = setInterval(() => {
    countdown.value = calculateCountdown()
  }, currCountdown.includes('.') ? 1 : 1000)

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <div class="inline-flex gap-2">
    <h2>Czas do wydarzenia:</h2>
    <span>{{ countdown }}</span>
  </div>
</template>
