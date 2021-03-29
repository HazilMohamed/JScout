import pandas as pd
import json
import sys


def get_lineups():
    try:
        with open('./src/json/match_lineup_brazil_belgium.json') as file:
            data = json.load(file)
        teams = pd.json_normalize(data, sep="_")
        return teams.T.to_json()
    except:
        return 'Something went wrong!'
    return


if __name__ == "__main__":
    print(get_lineups())
