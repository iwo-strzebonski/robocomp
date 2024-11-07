import type { Selectable } from 'kysely'

export interface TeamsDetailsView {
    name: string
    year: number
    status: string
    members_count: number
    robots_count: number
    leader_email: string
    leaders: string
    participants: string
    robots: string
}
export type TeamsDetailsRow = Selectable<TeamsDetailsView>

export interface CompetitionTimesView {
    robot_id: number
    robot_no: number
    robot_name: string
    year: number
    score: number
    stage: string
}
export type CompetitionTimesRow = Selectable<CompetitionTimesView>

export interface CompetitionTournamentBracketsView {
    robot_id: number
    robot_no: number
    robot_name: string
    year: number
    group_name: string
    stage: string
}
export type CompetitionTournamentBracketsRow= Selectable<CompetitionTournamentBracketsView>

export interface CompetitionVotesView {
    robot_id: number
    robot_no: number
    robot_name: string
    year: number
    score: number
}
export type CompetitionVotesRow = Selectable<CompetitionVotesView>
