from pymongo import MongoClient
from bson.json_util import loads
client = MongoClient('localhost')
db = client.sd10
col = db.southpark


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