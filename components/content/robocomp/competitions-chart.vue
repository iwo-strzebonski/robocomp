<script setup lang="ts">
import { H3Error } from 'h3'
import { Chart } from 'vue-chartjs'

import CHART_CONFIG from '~/settings/charts/competitions.chart'

import type { StatsResponse } from '~/server/api/stats/index.get'
import type { Dataset } from '~/types'

const key = ref((Math.random() * 10).toString())

const chartData = ref({
  labels: [] as string[],
  datasets: [] as Dataset[]
})

const chartOptions = ref(CHART_CONFIG)

const { status } = useLazyAsyncData('competitions-chart', async () => {
  if (import.meta.server) {
    return null
  }

  const response = await $fetch<StatsResponse>('/api/stats', {
    query: {
      types: ['competitions']
    }
  })

  if (response instanceof H3Error || !response.results) {
    return null
  }

  const { results } = response

  const labels = results.competitions?.map((result) => result.competition) || []
  const datasets = {
    data: results.competitions?.map((result) => Number(result.count)) || [],
    backgroundColor: results.competitions?.map((result) => result.color || '#000000') || []
  }

  chartData.value.labels = labels
  chartData.value.datasets = [datasets as unknown as Dataset]

  key.value = (Math.random() * 10).toString()
})

onBeforeMount(() => {
  const interval = setInterval(() => {
    refreshNuxtData('competitions-chart')
  }, 60 * 1000)

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})
</script>

<template>
  <div>
    <span v-if="status === 'pending'">Ładowanie...</span>

    <div :key="key" class="h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[40rem] px-4">
      <lazy-client-only>
        <!-- @vue-expect-error: VueChartJs is not typed properly -->
        <Chart :id="key" :options="chartOptions" :data="chartData" type="doughnut" />
      </lazy-client-only>
    </div>
  </div>
</template>
