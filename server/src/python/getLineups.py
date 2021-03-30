import pandas as pd
import json
import sys

match_id = int(sys.argv[1])


def get_lineups(match_id):
    try:
        with open(f'./src/open-data/data/lineups/{match_id}.json') as file:
            data = json.load(file)
        lineups = pd.json_normalize(data, sep="_")
        return lineups.T.to_json()
    except:
        return 'Something went wrong!'
    return


if __name__ == "__main__":
    print(get_lineups(match_id))
