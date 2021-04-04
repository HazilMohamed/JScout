import pandas as pd
import json
import sys


def get_competitions():
    with open('./src/open-data/data/competitions.json') as file:
        data = json.load(file)
    comps = pd.json_normalize(data, sep="_")
    comps = comps[['competition_id', 'competition_name']]
    grouped = comps.groupby(['competition_id'])
    return grouped.first().reset_index().T.to_json()


if __name__ == '__main__':
    print(get_competitions())
