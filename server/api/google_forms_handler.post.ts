import { createKysely } from '@vercel/postgres-kysely'
import { createError } from 'h3'
import { sql } from 'kysely'
import type { Database } from '~/types/db/Database'
import type { TeamRow } from '~/types/db/Teams'
import type TeamTable from '~/types/db/Teams'
import { isFormsResponse, type FormsResponse } from '~/types/Forms_response'

function insertUpdateTeam(team_name: string) {
  return sql<TeamTable>`robocomp.fn_insert_update_team(${sql.lit(team_name)})`
}

export default defineEventHandler(async (event) => {
  const rawBody = await readBody(event)
  if (!isFormsResponse(rawBody)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid form data'
    })
  }
  const body = rawBody as FormsResponse

  const db = createKysely<Database>()

  // there are no clear ways to check if google forms was edited, so this will have to be done by checking if the participant email was already used.
  try {
    const participant_team_id = await db
      .selectFrom('robocomp.participants')
      .select('id')
      .where('email', '=', body.participants[0].email)
      .execute()
    if (participant_team_id.length !== 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Edits are not yet supported'
      })
      // // the request is an edit request
      // const addresses_to_del = await db
      //   .deleteFrom('robocomp.participants')
      //   .where('team', '=', participant_team_id.team)
      //   .returning('address')
      //   .execute()

      // await db
      //   .deleteFrom('robocomp.address')
      //   .where(
      //     'id',
      //     'in',
      //     addresses_to_del.map((a) => {
      //       return a.address
      //     })
      //   )
      //   .execute()
      // await db.deleteFrom('robocomp.robots').where('team', '=', participant_team_id.team).execute()
      // await db.deleteFrom('robocomp.teams').where('id', '=', participant_team_id.team).execute()
    }
    const team = await sql<TeamRow[]>`SELECT * FROM ${insertUpdateTeam(body.team_name)}`.execute(db)
    console.log(team)
    // const participant_data = []
    // for (let i = 0; i < body.participants.length; i++) {
    //   participant_data.push({
    //     address: addresses[i].id ?? 0, // Tis should be definitely changed somehow, but idk how
    //     team: team.id ?? 0,
    //     first_name: body.participants[i].first_name,
    //     last_name: body.participants[i].last_name,
    //     email: body.participants[i].email,
    //     phone: body.participants[i].phone
    //   })
    // }
    // await db.insertInto('robocomp.participants').values(participant_data).returningAll().execute()
    // await db
    //   .insertInto('robocomp.robots')
    //   .values(
    //     body.robots.map((r: any) => {
    //       return { ...r, team: team.id }
    //     })
    //   )
    //   .execute()
    db.destroy()
  } catch (e) {
    console.log(e)
    db.destroy()
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Something went wrong while adding to database'
    })
  }
})
