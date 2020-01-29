#Eric Lam
#SoftDev1 pd1
#K6 -- Divine your Destiny!
#2019-09-17

import random

"""
-------------------------------------------------------------------
-------------------------CSV TO DICTIONARY-------------------------
-------------------------------------------------------------------
"""

dictionary = {}

# turn the csv into a list, making each item in the list a job,percentage
data = open("./occupations.csv").read().rstrip("\n").split("\n")

# remove the first and last items which are ["Job Class, Percentage"] and ["Total, 99.8"]
data = data[1:len(data) - 1]

# for each item in the data list, split the item by comma,
# and add the job/percentage as a key/value pair to the dictionary 
for item in data:
    splits = item.rsplit(",", 1)
    dictionary[splits[0].strip("\"")] = float(splits[1])

#add unemployed option
dictionary["Unemployed"]=0.2

"""
-------------------------------------------------------------------
-------------------------SELECT RANDOM JOB-------------------------
-------------------------------------------------------------------
"""

# returns a weighted random element from a dictionary
def weightedRandFromDict(dictionary):
    keys = list(dictionary.keys())
    weights = list(dictionary.values())

    # return one(k=1) random job accounting for attached weights 
    # the [0] is needed because random.choices returns a list 
    return random.choices(keys,weights=weights,k=1)[0] 

"""
-------------------------------------------------------------------
--------------------------TESTING RESULTS--------------------------
-------------------------------------------------------------------
"""

results = []
tests = 100000

# for test number of times, append a random job to the results list 
for i in range(tests):
    results.append(weightedRandFromDict(dictionary))

# for each job, print the actual percentage of the job and
# print the count of the number of appearances of job in the results array as a percent out of tests
for job in list(dictionary.keys()):
    print(job, "\n", "actual:", str(dictionary[job]), "experimental:", str(results.count(job)*100.0/tests), end="\n\n")