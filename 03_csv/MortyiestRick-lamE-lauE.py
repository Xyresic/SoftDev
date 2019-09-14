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
