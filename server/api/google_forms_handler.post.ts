import { createKysely } from '@vercel/postgres-kysely'
import { createError } from 'h3'
import { sql } from 'kysely'
import type { Database } from '~/types/db/Database'
import type ParticipantTable from '~/types/db/Participants'
import type { ParticipantRow } from '~/types/db/Participants'
import type { RobotRow } from '~/types/db/Robots'
import type RobotTable from '~/types/db/Robots'
import type { TeamRow } from '~/types/db/Teams'
import type TeamTable from '~/types/db/Teams'
import type TeamsParticipantsTable from '~/types/db/TeamsParticipants'
import { type TeamsParticipantsRow } from '~/types/db/TeamsParticipants'
import { isFormsResponse, type FormsResponse, type Participant, type Robot } from '~/types/Forms_response'

function insertUpdateTeam(team_name: string) {
  return sql<TeamTable>`robocomp.fn_insert_update_team(${sql.lit(team_name)})`
}
function insertUpdateParticipant(participant: Participant) {
  return sql<ParticipantTable>`robocomp.fn_insert_update_participant(${sql.lit(participant.first_name)},${sql.lit(participant.last_name)},${sql.lit(participant.email)},${sql.lit(participant.phone)},${sql.lit(participant.street_address)},${sql.lit(participant.admin_level_2)},${sql.lit(participant.postal_code)},${sql.lit(participant.country)})`
}
//the robot numer must be unique
function insertUpdateRobot(robot: Robot, team_id: number) {
  return sql<RobotTable>`robocomp.fn_insert_update_robot(robocomp.fn_get_next_robot_no(),${sql.lit(robot.name)},2024::smallint,${sql.lit(team_id)},${sql.lit(robot.competition)})`
}

function connectTeamParticipant(participant_id: number, team_id: number, role: string) {
  return sql<TeamsParticipantsTable>`robocomp.fn_connect_participant_and_team(${sql.lit(participant_id)},${sql.lit(team_id)},${sql.lit(role)})`
}

function getNextRobotNo() {
  return sql`robocomp.fn_get_next_robot_no()`
}

export default defineEventHandler(async (event) => {
  const rawBody = await readBody(event)
  if (!isFormsResponse(rawBody)) {
    throw 'Invalid form data'
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
      throw 'Edits are not yet supported'
    }
    // Create a team
    const team = await sql<TeamRow[]>`SELECT * FROM ${insertUpdateTeam(body.team_name)}`.execute(db)
    if (!team || team.rows.length === 0) {
      throw 'Something went wrong while creating team'
    }
    //@ts-ignore, Idk why but it returns a different structure
    const team_id = team.rows[0].fn_insert_update_team
    const emails = body.participants.map((p) => p.email)
    // Check if participants are already registered
    const existing_participants = await db
      .selectFrom('robocomp.teams_participants as tp')
      .innerJoin('robocomp.teams as t', 'tp.teams_id', 't.id')
      .innerJoin('robocomp.participants as p', 'tp.participants_id', 'p.id')
      .select('p.id')
      .where('t.year', '=', new Date().getFullYear())
      .where('p.email', 'in', emails)
      .execute()
    if (existing_participants.length !== 0) {
      throw 'Some of the participants are already registered'
    }
    // add participants
    // I don't know how (if that even is possible to insert all participants as a single query with postgresql function)
    let participants = []
    try {
      const participants_response = await Promise.all(
        body.participants.map((p) => sql<ParticipantRow>`SELECT * FROM ${insertUpdateParticipant(p)}`.execute(db))
      )
      // @ts-ignore
      participants = participants_response.map((pr) => pr.rows[0].fn_insert_update_participant)
    } catch (e) {
      console.log(e)
      throw 'Something went wrong while creating participants'
    }

    // add robots
    let robots = []
    try {
      const robots_response = await Promise.all(
        body.robots.map((r) => {
          return sql<RobotRow>`SELECT * FROM ${insertUpdateRobot(r, team_id)}`.execute(db)
        })
      )
      // @ts-ignore
      robots = robots_response.map((rr) => rr.rows[0].fn_insert_update_robot)
    } catch (e) {
      throw 'Something went wrong while creating robots'
    }

    // connect teams and participants
    const leader_id = participants[0]
    try {
      const res = await Promise.all(
        participants.map((p_id) => {
          const role = p_id === leader_id ? 'leader' : 'participant'
          return sql<TeamsParticipantsRow>`SELECT * FROM ${connectTeamParticipant(p_id, team_id, role)}`.execute(db)
        })
      )
    } catch {
      throw 'Something went wrong while linking teams and participants'
    }
    db.destroy()
  } catch (e) {
    db.destroy()
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: e as string
    })
  }
})
