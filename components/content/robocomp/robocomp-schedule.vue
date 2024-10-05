<script setup lang="ts">
import { H3Error } from 'h3'
import Qty from 'js-quantities'
import { Chart } from 'vue-chartjs'

import prepareDataForSchedule from '~/helpers/prepareDataForSchedule'

import type { ScheduleResponse } from '~/server/api/schedule/index.get'

const key = ref(Math.random())

const $props = defineProps<{
  scheduleName: 'robots' | 'events'
}>()

const chartData = ref({
  labels: [] as string[],
  // datasets: [{ data: [Date.now(), Date.now() + (60 * 60 * 1000) / 2, Date.now() - 60 * 60 * 1000] }]
  datasets: [] as { label: string; backgroundColor: string; data: ([number, number] | null)[] }[]
})

const annotationsConfig = ref({
  drawTime: 'afterDatasetsDraw',
  annotations: {}
})

const scalesConfig = ref({
  x: {
    display: true,
    stacked: true,
    ticks: {
      maxRotation: 90,
      minRotation: 45
    }
  },
  y: {
    reverse: true,
    min: 0,
    max: 1,
    ticks: {
      stepSize: 30
    },
    display: true,
    type: 'time',
    time: {
      unit: 'minute',
      tooltipFormat: 'HH:mm',
      displayFormats: {
        minute: 'HH:mm'
      }
    }
  }
})

const chartOptions = computed(() => ({
  // responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    tooltip: {
      enabled: true,

      callbacks: {
        title: (items: { label: string; dataset: { label: string } }[]) =>
          `${items[0].label} (${items[0].dataset.label})`,
        label: (ctx: { label: string; dataset: { label: string }; raw: number[] }) => {
          const label = []

          if (!Array.isArray(ctx.raw)) {
            return ctx.label
          }

          const timeDelta = ctx.raw[1] - ctx.raw[0]
          const duration = Qty(timeDelta, 'ms').to('h').scalar
          const hours = duration | 0
          const minutes = (duration - (duration | 0)) * 60
          const minutesStr = minutes < 10 ? `0${minutes}` : minutes

          label.push(`Czas trwania ${hours}:${minutesStr} h`)

          label.push(`Start: ${new Date(ctx.raw[0]).toLocaleTimeString().slice(0, -3)}`)
          label.push(`Koniec: ${new Date(ctx.raw[1]).toLocaleTimeString().slice(0, -3)}`)

          return label
        }
      }
    },
    annotation: annotationsConfig.value,
    datalabels: {
      display: true,
      color: (ctx: { dataset: { label: string } }) => (ctx.dataset.label === 'Finał' ? 'white' : 'black'),
      formatter: (value: number, ctx: { dataset: { label: string } }) => {
        if (!Array.isArray(value)) {
          return null
        }

        /*
        const timeDelta = value[1] - value[0]
        const duration = Qty(timeDelta, 'ms').to('h').scalar
        const hours = duration | 0
        const minutes = (duration - (duration | 0)) * 60
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes

        return ctx.dataset.label === 'Finał' ? ctx.dataset.label : `${ctx.dataset.label}\n(${hours}:${minutesStr} h)`
        */

        return ctx.dataset.label
      }
    }
  },
  scales: scalesConfig.value
}))

useLazyAsyncData(`${$props.scheduleName}-schedule`, async () => {
  if (import.meta.server) {
    return null
  }

  const response = await $fetch('/api/schedule')

  if (response instanceof H3Error || !response.data) {
    return null
  }

  const { results: schedule, competitionNames, competitionKeys, scheduleTypes } = (response as ScheduleResponse).data

  const data = prepareDataForSchedule($props.scheduleName, schedule, competitionNames, competitionKeys, scheduleTypes)

  chartData.value.labels = competitionNames
  annotationsConfig.value.annotations = data.annotations
  scalesConfig.value.y.min = data.eventStartDate
  scalesConfig.value.y.max = data.eventEndDate
  chartData.value.datasets = data.datasets

  key.value = Math.random()
})

onMounted(() => {
  if (import.meta.server) {
    return
  }

  // refresh data every minute
  if (!$props.scheduleName) {
    return
  }

  setInterval(() => {
    refreshNuxtData(`${$props.scheduleName}-schedule`)
  }, 60 * 1000)
})
</script>

<template>
  <div class="h-[20rem] md:h-[25rem] lg:h-[30rem] xl:h-[40rem] px-4">
    <!-- @vue-expect-error: VueChartJs is not typed properly -->
    <Chart :key="key" :options="chartOptions" :data="chartData" type="bar" />
  </div>
</template>
