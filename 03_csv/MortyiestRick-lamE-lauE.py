import random
def weightedRandFromDict(dictionary):
    keys = list(dictionary.keys())
    weights = list(dictionary.values())
    return random.choices(keys,weights=weights,k=100000)[0]
