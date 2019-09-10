import random
def printRandFromDict(dictionary):
    keys = dictionary.keys()
    team = dictionary[keys[random.randrange(len(keys))]]
    print(team[random.randrange(len(team))])
KREWES = {'orpheus':['Emily','Kevin'],
    'rex':['William','Joseph'],
    'endymion':['Grace','Nahi']}
printRandFromDict(KREWES)
