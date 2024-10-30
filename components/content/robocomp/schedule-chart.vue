<script setup lang="ts">
import { H3Error } from 'h3'
import { Chart } from 'vue-chartjs'

import prepareDataForSchedule from '~/helpers/prepareDataForSchedule'
import CHART_OPTIONS from '~/settings/charts/schedule.chart'

import type { ScheduleResponse } from '~/server/api/schedule/index.get'
import type { Dataset } from '~/types'

const key = ref((Math.random() * 10).toString())

const interval = ref(null as null | number)

const $props = defineProps<{
  scheduleName: 'robots' | 'events'
  chartLabels?: string[]
  chartDatasets?: Dataset[]
  chartConfig?: Record<string, unknown>
}>()

const chartData = ref({
  labels: [] as string[],
  // datasets: [{ data: [Date.now(), Date.now() + (60 * 60 * 1000) / 2, Date.now() - 60 * 60 * 1000] }]
  datasets: [] as Dataset[]
})

const chartOptions = ref(CHART_OPTIONS)

useLazyAsyncData(`${$props.scheduleName}-schedule`, async () => {
  if (import.meta.server) {
    return null
  }

  if ($props.chartLabels && $props.chartDatasets && $props.chartConfig) {
    chartData.value.labels = $props.chartLabels
    chartOptions.value.plugins.annotation.annotations = $props.chartConfig.annotations as any
    chartOptions.value.scales.y.min = $props.chartConfig.yMin as any
    chartOptions.value.scales.y.max = $props.chartConfig.yMax as any
    chartData.value.datasets = $props.chartDatasets

    key.value = (Math.random() * 10).toString()
    return null
  }

  const response = await $fetch('/api/schedule')

  if (response instanceof H3Error || !response.data) {
    return null
  }

  const {
    results: schedule,
    competitionNames,
    competitionKeys,
    scheduleTypes,
    events
  } = (response as ScheduleResponse).data

  const data = prepareDataForSchedule($props.scheduleName, schedule, competitionNames, competitionKeys, scheduleTypes)

  chartData.value.labels = $props.scheduleName === 'robots' ? competitionNames : events
  chartOptions.value.plugins.annotation.annotations = data.annotations
  chartOptions.value.scales.y.min = data.eventStartDate
  chartOptions.value.scales.y.max = data.eventEndDate
  chartData.value.datasets = data.datasets

  key.value = (Math.random() * 10).toString()
})

onMounted(() => {
  if (import.meta.server) {
    return
  }

  // refresh data every minute
  if (!$props.scheduleName) {
    return
  }

  if (interval.value) {
    clearInterval(interval.value)
  }

  if ($props.chartLabels && $props.chartDatasets && $props.chartConfig) {
    return
  }

  setInterval(() => {
    refreshNuxtData(`${$props.scheduleName}-schedule`)
  }, 60 * 1000)
})

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})
</script>

<template>
  <div :key="key" class="h-[calc(100vh_-_20rem)] md:h-[calc(100vh_-_22rem)] px-4 dark:bg-white rounded-lg">
    <lazy-client-only>
      <!-- @vue-expect-error: VueChartJs is not typed properly -->
      <Chart :id="key" :options="chartOptions" :data="chartData" type="bar" />
    </lazy-client-only>
  </div>
</template>
