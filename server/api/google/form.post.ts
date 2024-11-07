import { createKysely } from '@vercel/postgres-kysely'
import { createError } from 'h3'
import { sql } from 'kysely'

import { isFormsResponse, type FormsResponse, type Participant, type Robot } from '~/types/Forms_response'

import type { Database } from '~/types/db/Database'
import type { ParticipantTable, RobotTable, TeamTable, TeamsParticipantsTable }  from '~/types/db/Schema'

function insertUpdateTeam(team_name: string, team_id: number | null = null) {
  if (team_id) {
    return sql<TeamTable>`robocomp.fn_insert_update_team(${sql.lit(team_name)},NULL,NULL,${sql.lit(team_id)})`
  }
  return sql<TeamTable>`robocomp.fn_insert_update_team(${sql.lit(team_name)})`
}

function insertUpdateParticipant(participant: Participant, participant_id: number | null = null) {
  if (participant_id) {
    return sql<ParticipantTable>`robocomp.fn_insert_update_participant(${sql.lit(participant.first_name)},${sql.lit(participant.last_name)},${sql.lit(participant.email)},${sql.lit(participant.phone)},${sql.lit(participant.street_address)},${sql.lit(participant.admin_level_2)},${sql.lit(participant.postal_code)},${sql.lit(participant.country)},${sql.lit(participant_id)})`
  }
  return sql<ParticipantTable>`robocomp.fn_insert_update_participant(${sql.lit(participant.first_name)},${sql.lit(participant.last_name)},${sql.lit(participant.email)},${sql.lit(participant.phone)},${sql.lit(participant.street_address)},${sql.lit(participant.admin_level_2)},${sql.lit(participant.postal_code)},${sql.lit(participant.country)})`
}
// the robot numer must be unique
function insertUpdateRobot(robot: Robot, team_id: number) {
  return sql<RobotTable>`robocomp.fn_insert_update_robot(robocomp.fn_get_next_robot_no(),${sql.lit(robot.name)},${sql.lit(new Date().getFullYear())}::smallint,${sql.lit(team_id)},${sql.lit(robot.competition)})`
}

function connectTeamParticipant(participant_id: number, team_id: number, role: string) {
  return sql<TeamsParticipantsTable>`robocomp.fn_connect_participant_and_team(${sql.lit(participant_id)},${sql.lit(team_id)},${sql.lit(role)})`
}

/* Data flow (e - edit, n - new)
1. Check if data is valid
2. check if emails already exits in db
  if they do and the capitan email matches edit data
3e. Unlink linked participants, delete linked robots, delete participants
4n. add team
4e. edit team
5ne. add participants
6ne. add robots
7ne. link participants

*/
export default defineEventHandler(async (event) => {
  const rawBody = await readBody(event)

  if (!isFormsResponse(rawBody)) {
    console.error('Invalid form data')
    console.error(rawBody)

    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid form data'
    })
  }

  const body = rawBody as FormsResponse
  const db = createKysely<Database>()
  const emails = body.participants.map((p) => p.email)
  const leaderEmail = emails[0]

  // there are no clear ways to check if google forms was edited, so this will have to be done by checking if the participant email was already used.
  try {
    let editReq = false
    // Check if participants are already registered
    const existingParticipants = await db
      .selectFrom('robocomp.teams_participants as tp')
      .innerJoin('robocomp.teams as t', 'tp.teams_id', 't.id')
      .innerJoin('robocomp.participants as p', 'tp.participants_id', 'p.id')
      .select(['p.id as pid', 'tp.role', 'p.email', 't.id as tid'])
      .where('t.year', '=', new Date().getFullYear())
      .where('p.email', 'in', emails)
      .execute()

    const existingLeader = existingParticipants.filter((ep) => ep.email === leaderEmail)
    let existingTeamId = null

    if (existingLeader.length === 1 && existingLeader[0].role === 'leader') {
      existingTeamId = existingLeader[0].tid
      editReq = true
    } else if (existingParticipants.length !== 0) {
      console.error('Some participants are already registered to a different team')

      throw createError({
        statusCode: 400,
        statusMessage: 'Some participants are already registered to a different team'
      })
    }

    // unlink all participants, delete linked robots
    let deletedLinks: { participants_id: number }[] = []

    if (editReq) {
      try {
        deletedLinks = await db
          .deleteFrom('robocomp.teams_participants')
          .where('teams_id', '=', existingTeamId)
          .returning('participants_id')
          .execute()
        const deletedIds = deletedLinks.map((l) => l.participants_id)
        await db.deleteFrom('robocomp.participants').where('id', 'in', deletedIds).execute()
        await db.deleteFrom('robocomp.robots').where('team', '=', existingTeamId).execute()
      } catch (e) {
        console.error(e)

        throw createError({
          statusCode: 400,
          statusMessage: 'Something went wrong while unlinking robots and participants'
        })
      }
    }

    // Create or update a team
    const team = await sql<{
      fn_insert_update_team: number
    }>`SELECT * FROM ${insertUpdateTeam(body.team_name, existingTeamId)}`.execute(db)
    if (!team || team.rows.length === 0) {
      console.error('Failed to create team')

      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong while creating team'
      })
    }

    const teamId = team.rows[0].fn_insert_update_team

    console.debug('Added team: ', teamId)

    // add participants
    let participants = []

    try {
      const participantsResponse = await Promise.all(
        body.participants.map((p) =>
          sql<{
            fn_insert_update_participant: number
          }>`SELECT * FROM ${insertUpdateParticipant(p)}`.execute(db)
        )
      )

      participants = participantsResponse.map((pr) => pr.rows[0].fn_insert_update_participant)

      console.debug('Added participants: ', participants)
    } catch (e) {
      console.error(e)

      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong while creating participants'
      })
    }

    // add robots
    let robots = []

    try {
      const robotsResponse = await Promise.all(
        body.robots.map((r) => {
          return sql<{
            fn_insert_update_robot: number
          }>`SELECT * FROM ${insertUpdateRobot(r, teamId)}`.execute(db)
        })
      )

      robots = robotsResponse.map((rr) => rr.rows[0].fn_insert_update_robot)

      console.debug('Added robots: ', robots)
    } catch (e) {
      console.error(e)

      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong while creating robots'
      })
    }

    // connect teams and participants
    const leaderId = participants[0]

    try {
      await Promise.all(
        participants.map((pId) => {
          const role = pId === leaderId ? 'leader' : 'participant'
          return sql<{
            fn_connect_participant_and_team: number
          }>`SELECT * FROM ${connectTeamParticipant(pId, teamId, role)}`.execute(db)
        })
      )
    } catch (e) {
      console.error(e)

      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong while connecting participants to team'
      })
    }
  } catch (e) {
    db.destroy()

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: (e as Error).message,
      stack: (e as Error).stack,
      cause: (e as Error).cause,
      name: (e as Error).name
    })
  } finally {
    db.destroy()
  }
})
