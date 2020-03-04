#Team Goliath - Eric Lam & David Xiedeng
#SoftDev pd1
#K10 -- Import/Export Bank
#2020-03-03

from pymongo import MongoClient
from bson.json_util import loads
client = MongoClient('localhost')
db = client.sd10
col = db.southpark

'''
data = []
doc = ''
with open('southpark.json','r') as f:
    for c in f.read():
        if '}}}' in doc:
            data.append(doc)
            doc = ''
        else:
            doc += c
    data.append(doc)
for d in data:
    col.insert_one(loads(d))
'''

def filter_id(id):
    return list(col.find({'id':id}))

def filter_title(name):
    return list(col.find({'name':name}))

def filter_season_num(season,num):
    return list(col.find({'season':season,'number':num}))

def filter_before_date(date):
    return list(col.find({'airdate':{'$lte':date}}))

def filter_desc(desc):
    return list(col.find({'summary':{'$regex':'(?i).*%s.*' % desc.lower()}}))

#print(filter_id(7919))
#print(filter_title('Cartman Gets an Anal Probe'))
#print(filter_season_num(1,1))
#print(filter_before_date('2010-06-27'))
#print(filter_desc('manbearpig'))