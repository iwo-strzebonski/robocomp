import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export default interface RobotTable {
  id: Generated<number>
  robot_no: number
  name: string
  year: Generated<number>
  team: number
  competition: string
  status: Generated<string>
}

export type RobotRow = Selectable<RobotTable>
export type InsertableRobotRow = Insertable<RobotTable>
export type UpdateableRobotRow = Updateable<RobotTable>
