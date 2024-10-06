import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export default interface TeamsParticipantsTable {
  teams_id: number
  participants_id: number
  role: Generated<string>
  status: Generated<string>
}

export type TeamsParticipantsRow = Selectable<TeamsParticipantsTable>
export type InsertableTeamsParticipantsRow = Insertable<TeamsParticipantsTable>
export type UpdateableTeamsParticipantsRow = Updateable<TeamsParticipantsTable>
