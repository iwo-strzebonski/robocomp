export interface Address {
  id?: number
  street_address: string
  admin_level_2: string
  postal_code: string
  country: string
}

export interface Team {
  id?: number
  name: string
}

export interface Participant {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  address: number
  team: number
}

export interface Robot {
  id?: number
  robot_no?: number
  name: string
  team: number
  competition: string
}

export interface Database {
  'robocomp.address': Address
  'robocomp.teams': Team
  'robocomp.participants': Participant
  'robocomp.robots': Robot
}
