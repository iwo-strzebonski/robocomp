<script setup lang="ts">
import { FwbTable, FwbTableHead, FwbTableBody, FwbTableHeadCell, FwbTableCell, FwbTableRow } from 'flowbite-vue'

import type { StatsResponse } from '~/server/api/stats/index.get'

const { data: stats } = useLazyFetch<StatsResponse>('/api/stats', {
  query: {
    types: ['total', 'average']
  }
})
</script>

<template>
  <section>
    <lazy-client-only v-if="stats">
      <fwb-table v-if="stats.data.total" class="flowbite-table w-full not-prose mt-4 sm:mt-8">
        <fwb-table-head>
          <fwb-table-head-cell>Ilość Zespołów</fwb-table-head-cell>
          <fwb-table-head-cell>Ilość Zawodników</fwb-table-head-cell>
          <fwb-table-head-cell>Ilość Robotów</fwb-table-head-cell>
        </fwb-table-head>

        <fwb-table-body>
          <fwb-table-row>
            <fwb-table-cell>{{ stats.data.total.total_teams }}</fwb-table-cell>
            <fwb-table-cell>{{ stats.data.total.total_members_count }}</fwb-table-cell>
            <fwb-table-cell>{{ stats.data.total.total_robots_count }}</fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>

      <fwb-table v-if="stats.data.average" class="flowbite-table w-full not-prose mt-4">
        <fwb-table-head>
          <fwb-table-head-cell>Średnia Ilość Zawodników</fwb-table-head-cell>
          <fwb-table-head-cell>Średnia Ilość Robotów</fwb-table-head-cell>
        </fwb-table-head>

        <fwb-table-body>
          <fwb-table-row>
            <fwb-table-cell>{{ Number(stats.data.average.avg_members_count).toLocaleString() }}</fwb-table-cell>
            <fwb-table-cell>{{ Number(stats.data.average.avg_robots_count).toLocaleString() }}</fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </lazy-client-only>
  </section>
</template>
