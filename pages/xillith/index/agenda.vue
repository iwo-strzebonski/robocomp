<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import {
  FwbTable,
  FwbTableHead,
  FwbTableBody,
  FwbTableHeadCell,
  FwbTableCell,
  FwbTableRow,
  FwbButton
} from 'flowbite-vue'
import { H3Error } from 'h3'

import prepareDataForSchedule from '~/helpers/prepareDataForSchedule'
import { useUserStore } from '~/store/user.store'

import type { Schedule, ScheduleResponse } from '~/server/api/schedule/index.get'

const userStore = useUserStore()

const timeSchedule = ref([] as (Schedule & { changed: boolean; toRemove: boolean })[])

const rKey = ref((Math.random() * 10).toString())
const eKey = ref((Math.random() * 10).toString())

const { data } = useLazyAsyncData('schedule', async () => {
  if (import.meta.server) {
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

  timeSchedule.value = schedule.map((item) => ({ ...item, changed: false, toRemove: false }))

  return {
    competitionNames,
    competitionKeys,
    scheduleTypes,
    events
  }
})

const schedule = computed(() => {
  if (!data.value) {
    return {
      robots: { datasets: [], labels: [], options: {} },
      events: { datasets: [], labels: [], options: {} }
    }
  }

  const robotsData = prepareDataForSchedule(
    'robots',
    timeSchedule.value,
    data.value.competitionNames,
    data.value.competitionKeys,
    data.value.scheduleTypes
  )
  const eventsData = prepareDataForSchedule(
    'events',
    timeSchedule.value,
    data.value.competitionNames,
    data.value.competitionKeys,
    data.value.scheduleTypes
  )

  const rl = data.value.competitionNames
  const ro = {
    annotations: robotsData.annotations,
    yMin: robotsData.eventStartDate,
    yMax: robotsData.eventEndDate
  }
  const rd = robotsData.datasets

  const el = data.value.events
  const eo = {
    annotations: eventsData.annotations,
    yMin: eventsData.eventStartDate,
    yMax: eventsData.eventEndDate
  }
  const ed = eventsData.datasets

  rKey.value = (Math.random() * 10).toString()
  eKey.value = (Math.random() * 10).toString()

  return {
    robots: { datasets: rd, labels: rl, options: ro },
    events: { datasets: ed, labels: el, options: eo }
  }
})
function parseDateToTimeParam(date: Date | string) {
  const d = new Date(date)

  return {
    hours: d.getHours(),
    minutes: d.getMinutes(),
    seconds: d.getSeconds()
  }
}

/**
 * @param {string} scheduleName name of the schedule
 * @param {'start_date' | 'end_date'} type type of the date
 * @param {number} date date in ms timestamp
 */
function updateSchedule(id: number, type: 'start_date' | 'end_date', date: number) {
  const index = timeSchedule.value.findIndex((item) => item.id === id)

  if (index === -1) {
    return
  }

  timeSchedule.value[index][type] = new Date(date).toISOString()
  timeSchedule.value[index].changed = true
}

function deleteSchedule(id: string) {
  const index = timeSchedule.value.findIndex((item) => item.name === id)

  if (index === -1) {
    return
  }

  timeSchedule.value[index].toRemove = !timeSchedule.value[index].toRemove
  timeSchedule.value[index].changed = !timeSchedule.value[index].changed
}

async function resetSchedule() {
  await refreshNuxtData('schedule')
}

/** Save new schedule
 * #TODO: implement saving schedule
 */
async function saveSchedule() {
  const schedulesToSave = timeSchedule.value.filter((item) => item.changed && !item.toRemove)
  const schedulesToRemove = timeSchedule.value.filter((item) => item.toRemove)

  const savedResults = schedulesToSave.map((item) => {
    return $fetch(`/api/schedule/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${userStore.tokenType} ${userStore.accessToken}`
      },
      body: item
    })
  })

  const removedResults = schedulesToRemove.map((item) => {
    return $fetch(`/api/schedule/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${userStore.tokenType} ${userStore.accessToken}`
      }
    })
  })

  try {
    await Promise.all([...savedResults, ...removedResults])
  } catch (error) {
    console.error(error)
    alert('Wystąpił błąd podczas zapisywania harmonogramu:\n' + (error as Error).message)
  }

  await refreshNuxtData('schedule')
}
</script>

<template>
  <div class="flex flex-col w-full">
    <h2 class="text-2xl font-bold mb-2">Harmonogram</h2>

    <section>
      <lazy-client-only>
        <fwb-table class="flowbite-table mb-8 w-full">
          <fwb-table-head>
            <fwb-table-cell>ID</fwb-table-cell>
            <fwb-table-cell>Konkurencja</fwb-table-cell>
            <fwb-table-cell>Godzina rozpoczęcia</fwb-table-cell>
            <fwb-table-cell>Godzina zakończenia</fwb-table-cell>
            <fwb-table-cell>
              <span class="sr-only">Akcje</span>
            </fwb-table-cell>
          </fwb-table-head>

          <fwb-table-body>
            <fwb-table-row v-for="row in timeSchedule" :key="row.id">
              <fwb-table-cell>{{ row.id }}</fwb-table-cell>
              <fwb-table-head-cell>{{ row.name }}</fwb-table-head-cell>
              <fwb-table-cell>
                <VueDatePicker
                  v-model="row.start_date"
                  :max-time="parseDateToTimeParam(row.end_date)"
                  :time-picker="true"
                  model-type="timestamp"
                  @update:model-value="(timestamp: number) => updateSchedule(row.id, 'start_date', timestamp)"
                />
              </fwb-table-cell>
              <fwb-table-cell>
                <VueDatePicker
                  v-model="row.end_date"
                  :min-time="parseDateToTimeParam(row.start_date)"
                  :time-picker="true"
                  model-type="timestamp"
                  @update:model-value="(timestamp: number) => updateSchedule(row.id, 'end_date', timestamp)"
                />
              </fwb-table-cell>
              <fwb-table-cell>
                <span class="inline-flex gap-2">
                  <fwb-button :color="row.toRemove ? 'alternative' : 'red'" @click="deleteSchedule(row.name)">
                    <template #prefix>
                      <lazy-client-only>
                        <fa-icon
                          :icon="row.toRemove ? 'fa-solid fa-check-square' : 'fa-regular fa-square'"
                          class="w-4 h-4"
                        />
                      </lazy-client-only>
                    </template>
                    {{ row.toRemove ? 'Anuluj' : 'Usuń' }}
                  </fwb-button>
                </span>
              </fwb-table-cell>
            </fwb-table-row>
          </fwb-table-body>
        </fwb-table>
      </lazy-client-only>

      <span class="inline-flex mb-6 gap-4 w-full justify-end">
        <fwb-button color="alternative" :disabled="!timeSchedule.some((item) => item.changed)" @click="resetSchedule()">
          <template #prefix>
            <lazy-client-only>
              <fa-icon icon="fa-solid fa-rotate-left" class="w-4 h-4" />
            </lazy-client-only>
          </template>
          Reset
        </fwb-button>

        <fwb-button :disabled="!timeSchedule.some((item) => item.changed)" @click="saveSchedule()">
          <template #prefix>
            <lazy-client-only>
              <fa-icon icon="fa-solid fa-floppy-disk" class="w-4 h-4" />
            </lazy-client-only>
          </template>
          Zapisz
        </fwb-button>
      </span>
    </section>

    <section v-show="schedule.robots.labels.length">
      <ScheduleChart
        :key="rKey"
        :chart-labels="schedule.robots.labels"
        :chart-datasets="schedule.robots.datasets"
        :chart-config="schedule.robots.options"
        schedule-name="robots"
        class="!h-[30rem] lg:!h-[40rem]"
      />
    </section>

    <section v-show="schedule.events.labels.length">
      <ScheduleChart
        :key="eKey"
        :chart-labels="schedule.events.labels"
        :chart-datasets="schedule.events.datasets"
        :chart-config="schedule.events.options"
        schedule-name="events"
        class="!h-[30rem] lg:!h-[40rem]"
      />
    </section>
  </div>
</template>
