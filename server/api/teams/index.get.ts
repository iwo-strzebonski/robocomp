import { kyselyDb } from '~/server/database/db';
import type { TeamsDetailsRow } from '~/types/db/Views';

export interface TeamsResponse {
  statusCode: number
  data: {
    teams: TeamsDetailsRow[]
  }
}

export default defineEventHandler(async (event) => {
  try {
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
      message: 'Failed to fetch schedules'
    })
  }
})
