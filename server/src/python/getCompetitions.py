import pandas as pd
import json
import sys


def get_competitions():
    try:
        with open('./src/open-data/data/competitions.json') as file:
            data = json.load(file)
        comps = pd.json_normalize(data, sep="_")
        comps = comps[['competition_id', 'competition_name']]
        gr = comps.groupby(['competition_id'])
        return gr.first().to_json()
    except:
        return 'Something went wrong!'


if __name__ == '__main__':
    print(get_competitions())
