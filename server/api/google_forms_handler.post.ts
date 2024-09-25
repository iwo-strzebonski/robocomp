import { createKysely } from '@vercel/postgres-kysely'
import { createError } from 'h3'
import type { Database } from '~/types/Database'
import { isFormsResponse, type FormsResponse } from '~/types/Forms_response'

const db = createKysely<Database>()

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
  // transactions are not supported yet, have to make it manually,
  // for now there will not be any reverting if something fails in the middle

  // there are no clear ways to check if google forms was edited, so this will have to be done by checking if the participant email was already used.
  try {
    const participant_team_id = await db
      .selectFrom('robocomp.participants')
      .select('team')
      .where('email', '=', body.participants[0].email)
      .executeTakeFirst()

    if (participant_team_id && participant_team_id.team) {
      // the request is an edit request
      const addresses_to_del = await db
        .deleteFrom('robocomp.participants')
        .where('team', '=', participant_team_id.team)
        .returning('address')
        .execute()

      await db
        .deleteFrom('robocomp.address')
        .where(
          'id',
          'in',
          addresses_to_del.map((a) => {
            return a.address
          })
        )
        .execute()
      await db.deleteFrom('robocomp.robots').where('team', '=', participant_team_id.team).execute()
      await db.deleteFrom('robocomp.teams').where('id', '=', participant_team_id.team).execute()
    }

    //Now that everything is cleared, add it once again
    const team = await db
      .insertInto('robocomp.teams')
      .values({
        name: body.team_name
      })
      .returning('id')
      .executeTakeFirstOrThrow()
    const addresses = await db
      .insertInto('robocomp.address')
      .values(
        body.participants.map((p: any) => {
          return {
            street_address: p.street_address,
            admin_level_2: p.admin_level_2,
            postal_code: p.postal_code,
            country: p.country
          }
        })
      )
      .returning('id')
      .execute()
    const participant_data = []
    for (let i = 0; i < body.participants.length; i++) {
      participant_data.push({
        address: addresses[i].id ?? 0, // Tis should be definitely changed somehow, but idk how
        team: team.id ?? 0,
        first_name: body.participants[i].first_name,
        last_name: body.participants[i].last_name,
        email: body.participants[i].email,
        phone: body.participants[i].phone
      })
    }
    await db.insertInto('robocomp.participants').values(participant_data).returningAll().execute()
    await db
      .insertInto('robocomp.robots')
      .values(
        body.robots.map((r: any) => {
          return { ...r, team: team.id }
        })
      )
      .execute()
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Something went wrong while adding to database'
    })
  }
})
