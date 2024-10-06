import type ParticipantTable from './Participants'
import type RobotTable from './Robots'
import type TeamTable from './Teams'
import type TeamsParticipantsTable from './TeamsParticipants'

export interface Database {
  'robocomp.teams_participants': TeamsParticipantsTable
  'robocomp.teams': TeamTable
  'robocomp.participants': ParticipantTable
  'robocomp.robots': RobotTable
}
