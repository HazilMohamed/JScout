import numpy as np
import pandas as pd
import sys
import json

match_id = int(sys.argv[1])
player_id = int(sys.argv[2])

passing_attr = ['id', 'index', 'period', 'timestamp', 'duration', 'type_name', 'play_pattern_id', 'team_name', 'location', 'player_name', 'player_id', 'position_name',
                'pass_length', 'pass_angle', 'pass_height_id', 'pass_end_location', 'pass_recipient_name', 'pass_body_part_id', 'pass_outcome_name']


def get_passes(match_id, player_id):
    try:
        with open(f'./src/open-data/data/events/{match_id}.json') as file:
            data = json.load(file)
        match = pd.json_normalize(data, sep='_')
        match_player = match[(match['player_id'] == player_id)
                             & (match['pass_outcome_id'].isna())]
        match_player_pass = match_player[match_player['type_name']
                                         == 'Pass'][passing_attr]
        return match_player_pass.T.to_json()
    except:
        return 'Something went wrong!'


if __name__ == "__main__":
    print(get_passes(match_id, player_id))
