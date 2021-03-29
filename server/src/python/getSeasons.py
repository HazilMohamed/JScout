import pandas as pd
import json
import sys

competition_id = int(sys.argv[1])


def get_seasons(competition_id):
    try:
        with open('./src/open-data/data/competitions.json') as file:
            data = json.load(file)
        comps = pd.json_normalize(data, sep="_")
        comps = comps[['competition_id',
                       'competition_name', 'season_name', 'season_id']]
        comps_seasons = comps[comps['competition_id'] == competition_id]
        return comps_seasons.T.to_json()
    except:
        return 'Something went wrong!'


if __name__ == "__main__":
    print(get_seasons(competition_id))
