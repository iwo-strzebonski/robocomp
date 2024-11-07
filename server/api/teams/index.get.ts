import type { H3Error } from 'h3';
import { createKysely } from '@vercel/postgres-kysely'
import type { TeamsDetailsRow } from '~/types/db/Views';
import type { Database } from '~/types/db/Database'

export interface TeamsResponse {
  statusCode: number
  data: {
    teams: TeamsDetailsRow[]
  }
}

export default defineEventHandler(async (): Promise<TeamsResponse | H3Error> => {
  try {
    const kyselyDb = createKysely<Database>()
    const teams = (await kyselyDb.selectFrom('robocomp.teams_details' as any).selectAll().execute()) as TeamsDetailsRow[];
    return {
      statusCode: 200,
      data: {
        teams: teams,
      }
    } as TeamsResponse
  }
  catch (error) {
    console.error(error)

    return createError({
      statusCode: 500,
      message: (error as Error).message
    })
  }
})
