import pandas as pd
import json
import sys

competition_id = sys.argv[1]
season_id = sys.argv[2]


def get_matches(comp_id, season_id):
    try:
        with open(f'./src/open-data/data/matches/{comp_id}/{season_id}.json') as file:
            data = json.load(file)
        matches = pd.json_normalize(data, sep="_")
        matches = matches[[
            'match_id', 'home_team_home_team_name', 'away_team_away_team_name']]
        return matches.T.to_json()
    except:
        return 102 



if __name__ == "__main__":
    print(get_matches(competition_id, season_id))
