import { createKysely } from '@vercel/postgres-kysely'
import { sql } from 'kysely'

import type { H3Error } from 'h3'

export interface Schedule {
  id: number
  name: string
  start_date: string
  end_date: string
  competition?: string
}

export interface ScheduleResponse {
  data: {
    results: Schedule[]
    competitionNames: string[]
    competitionKeys: string[]
    scheduleTypes: string[]
  }
  statusCode: number
}

export default defineEventHandler(async (): Promise<ScheduleResponse | H3Error> => {
  const db = createKysely()

  try {
    const schedules = (await db
      .selectFrom('robocomp.schedules' as any)
      .select([
        sql<string>`REPLACE(name, ' ' || CAST(${new Date().getFullYear()} AS VARCHAR(4)), '')`.as('name'),
        'start_date',
        'end_date',
        'competition'
      ] as any)
      .where('name' as any, 'like', '% ' + new Date().getFullYear())
      .where('name' as any, 'not like', '%Jury%')
      .execute()) as Schedule[]

    db.destroy()

    const competitions = schedules
      .filter((schedule) => schedule.competition && schedule.competition !== 'events')
      .toSorted((a, b) => b.competition!.localeCompare(a.competition!))
      .map((schedule) => ({
        key: schedule.competition,
        name: schedule.name.split(' ').slice(1).join(' '),
        type: schedule.name.split(' ')[0]
      }))

    return {
      statusCode: 200,
      data: {
        results: schedules as Schedule[],
        competitionNames: [...new Set(competitions.map((competition) => competition.name))],
        competitionKeys: [...new Set(competitions.map((competition) => competition.key!))],
        scheduleTypes: [...new Set(competitions.map((competition) => competition.type))]
      }
    }
  } catch (error) {
    console.error(error)

    db.destroy()

    return createError({
      statusCode: 500,
      message: 'Failed to fetch schedules'
    })
  }
})
