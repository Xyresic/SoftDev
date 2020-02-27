#Team R&M - Eric Lam and Michael Zhang
#SoftDev pd1
#K09 - Yummy Mongo Py
#2020-02-26

from pymongo import MongoClient
from bson.json_util import loads
client = MongoClient('localhost')
db = client.database
col = db.restaurants
'''with open('primer-dataset.json','r') as c:
    for doc in c:
        col.insert_one(loads(doc[:-1]))'''

def filter_borough(bor):
    return list(col.find({'borough':bor}))


def filter_zip(zip):
    return list(col.find({'address.zipcode':zip}))

def filter_zip_grade(zip,grade):
    return list(r for r in col.find({'address.zipcode':zip,'grades.0.grade':grade}))

def filter_zip_score(zip,score):
    return list(r for r in col.find({'address.zipcode':zip,'grades.0.score':{'$lt':score}}))

def filter_radius(lat,long,r):
    return list(col.find({'address.coord':{'$geoWithin':{'$centerSphere':[[long,lat],r/6371000]}}}))