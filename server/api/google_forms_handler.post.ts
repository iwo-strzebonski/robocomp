import { createKysely } from '@vercel/postgres-kysely'

// This sould probably be moved somewhere, idk where
interface Address {
  id?: number
  street_address: string
  admin_level_2: string
  postal_code: string
  country: string
}

interface Team {
  id?: number
  name: string
}

interface Participant {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  address: number
  team: number
}

interface Robot {
  id?: number
  robot_no?: number
  name: string
  team: number
  competition: string
}

// Database interface (put all tables together)
interface Database {
  'robocomp.address': Address
  'robocomp.teams': Team
  'robocomp.participants': Participant
  'robocomp.robots': Robot
}

const db = createKysely<Database>()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // transactions are not supported yet, have to make it manually,
  // for now there will not be any reverting if something fails in the middle
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
})
