import numpy as np
import pandas as pd
import sys
import json

player = int(sys.argv[1])
passing_attr = ['id', 'index', 'period', 'timestamp', 'duration', 'type_name', 'play_pattern_id', 'team_name', 'location', 'player_name', 'player_id', 'position_name',
                'pass_length', 'pass_angle', 'pass_height_id', 'pass_end_location', 'pass_recipient_name', 'pass_body_part_id', 'pass_outcome_name']


def find_passes(player):
    try:
        with open('./src/json/match_brazil_belgium.json') as file:
            data = json.load(file)
        match = pd.json_normalize(data, sep='_')
        match_player = match[(match['player_id'] == player)
                             & (match['pass_outcome_id'].isna())]
        match_player_pass = match_player[match_player['type_name']
                                         == 'Pass'][passing_attr]
        return match_player_pass.T.to_json()
    except:
        return 'Something went wrong!'


if __name__ == "__main__":
    print(find_passes(player))
