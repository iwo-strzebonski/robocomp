<template>
  <fwb-accordion>
    <fwb-accordion-panel v-for="(team, index) in teams" :key="index">
      <fwb-accordion-header>{{ team.name }}</fwb-accordion-header>
      <fwb-accordion-content>
        <div>
          <h3>Robots: </h3>
            <ul>
                <li v-for="(robot, index) in team.robots">
                    {{ robot.name }}
                </li>
            </ul>
          <p class="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </div>
      </fwb-accordion-content>
    </fwb-accordion-panel>
  </fwb-accordion>
</template>

<script lang="ts" setup>
import { H3Error } from 'h3'
import type { TeamsResponse } from '~/server/api/teams/index.get'
import type { TeamsDetailsRow } from '~/types/db/Views'

import {
  FwbAccordion,
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel,
} from 'flowbite-vue'

interface Robot {
  name: string
}

interface TeamDisplay {
  name: string
  robots: Robot[]
}

let teams: TeamDisplay[] = []
const { data: response, error } = useLazyFetch('/api/teams')
console.log(response.value?.data)
if (error.value) {
  teams = []
} else {
  const teams_response = (response.value as TeamsResponse)?.data?.teams as TeamsDetailsRow[]
  teams = teams_response.map((team) => ({
    name: team.name,
    robots: team.robots.split(';').map(
      (robot) =>
        ({
          name: robot.split(' ').slice(0, 2).join(' ')
        }) as Robot
    )
  })) as TeamDisplay[]
}
</script>

<style></style>
