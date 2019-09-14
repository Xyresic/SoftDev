import random

dictionary = {}

#turn the csv into a list, making each item in the list a job,percentage
data = open("./occupations.csv").read().rstrip("\n").split("\n")

#remove the first and last items which are ["Job Class, Percentage"] and ["Total, 99.8"]
data = data[1:len(data) - 1]

#for each item in the data list
for item in data:

    # split the item by comma
    splits = item.rsplit(",", 1)

    #add the job as a key to the dictionary and assign the percentage as the value 
    dictionary[splits[0].strip("\"")] = float(splits[1])

#returns a weighted random element from a dictionary
def weightedRandFromDict(dictionary):
    keys = list(dictionary.keys())
    weights = list(dictionary.values())
    return random.choices(keys,weights=weights,k=1)[0]

results = []
tests = 100000
for i in range(tests):
    results.append(weightedRandFromDict(dictionary))
for job in list(dictionary.keys()):
    print(job)
    print("actual: "+str(dictionary[job])+" experimental: "+str(results.count(job)*100.0/tests))
