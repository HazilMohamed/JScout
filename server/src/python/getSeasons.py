import pandas as pd
import json
import sys

competition_id = int(sys.argv[1])


def get_seasons(competition_id):
    with open('./src/open-data/data/competitions.json') as file:
        data = json.load(file)
    comps = pd.json_normalize(data, sep="_")
    comps = comps[['competition_id',
                   'competition_name', 'season_name', 'season_id']]
    comps_seasons = comps[comps['competition_id'] == competition_id]
    if len(comps_seasons.index) == 0:
        return 101
    return comps_seasons.T.to_json()


if __name__ == "__main__":
    print(get_seasons(competition_id))
