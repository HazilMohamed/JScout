import pandas as pd
import json
import sys


def find_teams():
    try:
        with open('./src/json/match_lineup_brazil_belgium.json') as file:
            data = json.load(file)
        teams = pd.json_normalize(data, sep="_")
        return teams[['team_id', 'team_name']].T.to_json()
    except:
        return 'Something went wrong!'
    return


if __name__ == "__main__":
    print(find_teams())
