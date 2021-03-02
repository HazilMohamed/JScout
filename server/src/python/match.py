import pandas as pd
import sys
import json

minute = int(sys.argv[1])


def find_events(minute):
    try:
        with open('./src/python/brazil_belgium.json') as file:
            data = json.load(file)
        match = pd.json_normalize(data, sep='_')
        match_minute = match[match['minute'] == minute]
        return match_minute.T.to_json()
    except:
        return 'File not found!'

print(find_events(minute))
