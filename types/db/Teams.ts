import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export default interface TeamTable {
  id: Generated<number>
  name: string
  year: Generated<number>
  status: Generated<string>
}

export type TeamRow = Selectable<TeamTable>
export type InsertableTeamRow = Insertable<TeamTable>
export type UpdateableTeamRow = Updateable<TeamTable>
