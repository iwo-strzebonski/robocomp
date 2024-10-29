import { createKysely } from '@vercel/postgres-kysely'

import type { NuxtError } from '@nuxt/types'
import type { Database } from '~/types/db/Database'
import { sql } from 'kysely'

export enum StatsTypes {
  'competitions' = 'competitions',
  'average' = 'average',
  'total' = 'total'
}

export interface StatsQuery {
  year: string
  types: string | string[]
}

export interface StatsResultsBase extends Record<StatsTypes, unknown> {
  competitions: {
    competition: string
    count: number
    color: string
  }[]
  average: {
    avg_members_count: number
    avg_robots_count: number
  }[]
  total: {
    total_members_count: number
    total_robots_count: number
  }[]
}

export type StatsResults = Partial<StatsResultsBase>

export interface StatsResponse {
  statusCode: number
  results: StatsResults
}

export default defineEventHandler(async (event): Promise<StatsResponse | NuxtError> => {
  const query = getQuery<Partial<StatsQuery>>(event)

  const year = query.year || new Date().getFullYear().toString()

  if (!year.match(/^20\d{2}$/)) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid year'
    })
  }

  const types = typeof query.types === 'string' ? [query.types] : query.types

  if (!types || !types.length) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing stats types'
    })
  }

  const invalidTypes = types.filter((type) => !Object.values(StatsTypes).includes(type as StatsTypes))

  const uniqueTypes = [...new Set(types)]

  if (invalidTypes.length) {
    return createError({
      statusCode: 400,
      statusMessage: `Invalid stats types: ${invalidTypes.join(', ')}`
    })
  }

  const results: StatsResults = {}

  const db = createKysely<Database>()

  try {
    for (const type of uniqueTypes) {
      switch (type) {
        case StatsTypes.competitions:
          results.competitions = await db
            .withSchema('robocomp')
            .selectFrom('robots')
            .innerJoin('competitions', 'robots.competition', 'competitions.name')
            .select(({ fn }) => [
              sql`competitions.name as competition`,
              fn.countAll<number>().as('count'),
              'competitions.color'
            ])
            .groupBy(['competitions.name', 'competitions.color'])
            .orderBy('competitions.name')
            .where('year', '=', Number(year))
            .execute()

          break
        case StatsTypes.average:
          results.average = await db
            .selectFrom('robocomp.teams_details')
            .select(({ fn }) => [
              fn.avg<number>('members_count').as('avg_members_count'),
              fn.avg<number>('robots_count').as('avg_robots_count')
            ])
            .where('year', '=', Number(year))
            .execute()
          break
        case StatsTypes.total:
          results.total = await db
            .selectFrom('robocomp.teams_details')
            .select(({ fn }) => [
              fn.sum<number>('members_count').as('total_members_count'),
              fn.sum<number>('robots_count').as('total_robots_count')
            ])
            .where('year', '=', Number(year))
            .execute()
          break
      }
    }

    db.destroy()

    return {
      statusCode: 200,
      results
    }
  } catch (error) {
    console.error(error)

    db.destroy()

    return createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      stack: (error as Error).stack
    })
  }
})
