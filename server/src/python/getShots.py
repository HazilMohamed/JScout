import numpy as np
import pandas as pd
import sys
import json

match_id = int(sys.argv[1])
player_id = int(sys.argv[2])

shooting_attr = ['id', 'index', 'period', 'timestamp', 'duration', 'type_name', 'team_name', 'location', 'player_name', 'player_id', 'position_name', 'shot_statsbomb_xg',
                 'shot_end_location', 'shot_body_part_id', 'shot_body_part_name', 'shot_technique_id', 'shot_technique_name', 'shot_type_id', 'shot_type_name', 'shot_outcome_id', 'shot_outcome_name', ]


def get_shots(match_id, player_id):
    try:
        with open(f'./src/open-data/data/events/{match_id}.json') as file:
            data = json.load(file)
        match = pd.json_normalize(data, sep='_')
        match_player = match[(match['player_id'] == player_id)]
        if len(match_player.index) == 0:
            return 104
        match_player_shoot = match_player[match_player['type_name']
                                         == 'Shot'][shooting_attr]
        return match_player_shoot.T.to_json()
    except:
        return 103


if __name__ == "__main__":
    print(get_shots(match_id, player_id))
