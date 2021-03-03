import pandas as pd
import sys
import json

player = str(sys.argv[1])
passing_attr = ['id', 'index', 'period', 'timestamp', 'minute', 'second', 'possession', 'duration', 'type_id', 'type_name', 'possession_team_id', 'possession_team_name', 'play_pattern_id', 'play_pattern_name', 'team_id', 'team_name', 'location', 'player_id', 'player_name', 'position_id', 'position_name', 'pass_length', 'pass_angle', 'pass_height_id', 'pass_height_name',
                'pass_end_location', 'pass_recipient_id', 'pass_recipient_name', 'pass_type_id', 'pass_type_name', 'pass_body_part_id', 'pass_body_part_name', 'pass_outcome_id', 'pass_outcome_name', 'pass_switch', 'pass_aerial_won', 'pass_cross', 'pass_assisted_shot_id', 'pass_shot_assist', 'pass_backheel', 'pass_goal_assist']


def find_passes(player):
    try:
        with open('./src/python/brazil_belgium.json') as file:
            data = json.load(file)
        match = pd.json_normalize(data, sep='_')
        match_player = match[match['player_name'] == player]
        match_player_pass = match_player[match_player['type_name']
                                         == 'Pass'][passing_attr]
        return match_player_pass.T.to_json()
    except:
        return 'Something went wrong!'


print(find_passes(player))
