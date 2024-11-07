<template>
  <lazy-client-only>
    <span v-if="status === 'pending'">Ładowanie...</span>

    <fwb-accordion v-else-if="status === 'success' && teamsData && !(teamsData instanceof H3Error)" always-open>
      <fwb-accordion-panel v-for="(team, index) in teamsData.data.teams" :key="index">
        <fwb-accordion-header>{{ team.name }}</fwb-accordion-header>
        <fwb-accordion-content>
          <div>
            <h3 class="dark:text-gray-400">Robots:</h3>
            <ul>
              <li class="dark:text-gray-400"
                v-for="(robot, index) in team.robots.split(';').map(
                  (robot) =>
                    ({
                      name: robot.split('<').slice(0, 2).join(' - ').split('>').slice(0,1).join()
                    }) as Robot
                )"
              >
                {{ robot.name }}
              </li>
            </ul>
          </div>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>

<script setup lang="ts">
import { H3Error } from 'h3'
import type { TeamsResponse } from '~/server/api/teams/index.get'

import { FwbAccordion, FwbAccordionContent, FwbAccordionHeader, FwbAccordionPanel } from 'flowbite-vue'

interface Robot {
  name: string
}
const { data: teamsData, status } = useLazyFetch<TeamsResponse | H3Error>('/api/teams')
</script>

<style></style>
