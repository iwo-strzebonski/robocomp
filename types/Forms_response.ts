export interface Participant {
  email: string
  first_name: string
  last_name: string
  phone: string
  street_address: string
  admin_level_2: string
  postal_code: string
  country: string
}
export interface Robot {
  name: string
  competition: string
}
export interface FormsResponse {
  team_name: string
  participants: Participant[]
  robots: Robot[]
}
// It seems strange but i wasn't able to find a better way to check if the data is correct
export function isFormsResponse(obj: any): obj is FormsResponse {
  const isParticipant = (participant: any): participant is Participant => {
    return (
      typeof participant.email === 'string' &&
      typeof participant.first_name === 'string' &&
      typeof participant.last_name === 'string' &&
      typeof participant.phone === 'string' &&
      typeof participant.street_address === 'string' &&
      typeof participant.admin_level_2 === 'string' &&
      typeof participant.postal_code === 'string' &&
      typeof participant.country === 'string'
    )
  }

  const isRobot = (robot: any): robot is Robot => {
    return typeof robot.name === 'string' && typeof robot.competition === 'string'
  }

  return (
    typeof obj === 'object' &&
    typeof obj.team_name === 'string' &&
    Array.isArray(obj.participants) &&
    obj.participants.every(isParticipant) &&
    Array.isArray(obj.robots) &&
    obj.robots.every(isRobot)
  )
}
