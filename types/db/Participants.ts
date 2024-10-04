import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export default interface ParticipantTable {
  id?: Generated<number>
  first_name: string
  last_name: string
  email: string
  phone: string
  street_address: string
  admin_level_2: string
  postal_code: string
  country: string
}

export type ParticipantRow = Selectable<ParticipantTable>
export type InsertableParticipantRow = Insertable<ParticipantTable>
export type UpdateableParticipantRow = Updateable<ParticipantTable>
