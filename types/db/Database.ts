import * as schema from './Schema'
import * as views from './Views'
export interface Database {
    'robocomp.teams_participants': schema.TeamsParticipantsTable
    'robocomp.teams': schema.TeamTable
    'robocomp.participants': schema.ParticipantTable
    'robocomp.robots': schema.RobotTable
    'robocomp.roles': schema.RolesTable
    'robocomp.groups': schema.GroupsTable
    'robocomp.robot_schedule': schema.RobotScheduleTable
    'robocomp.robot_groups': schema.RobotScheduleTable
    'robocomp.results': schema.ResultsTable
    'robocomp.schedules': schema.ScheduleTable
    'robocomp.stages': schema.StagesTable
    'robocomp.competitions': schema.CompetitionsTable

    'robocomp.teams_details': views.TeamsDetailsView
    'robocomp.times_linefollower-enchanced': views.CompetitionTimesView     
    'robocomp.times_linefollower-standard': views.CompetitionTimesView
    'robocomp.times_micromouse': views.CompetitionTimesView
    'robocomp.times_robosprint': views.CompetitionTimesView
    'robocomp.tournament_brackets_smashbots-mini': views.CompetitionTournamentBracketsView
    'robocomp.tournament_brackets_sumo-lego': views.CompetitionTournamentBracketsView
    'robocomp.tournament_brackets_sumo-micro':  views.CompetitionTournamentBracketsView
    'robocomp.tournament_brackets_sumo-mini': views.CompetitionTournamentBracketsView
    'robocomp.tournament_brackets_sumo-standard': views.CompetitionTournamentBracketsView
    'robocomp.votes_freestyle_audience': views.CompetitionVotesView
    'robocomp.votes_freestyle_jury': views.CompetitionVotesView
}
