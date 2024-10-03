import type Address from './Address'
import type ParticipantDB from './ParticipantDB'
import type RobotDB from './RobotDB'
import type Team from './Team'

export interface Database {
  'robocomp.address': Address
  'robocomp.teams': Team
  'robocomp.participants': ParticipantDB
  'robocomp.robots': RobotDB
}
