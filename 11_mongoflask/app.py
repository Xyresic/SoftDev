import os
from flask import Flask, render_template, request, session, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = os.urandom(32)

#Team Goliath - Eric Lam & David Xiedeng
#SoftDev pd1
#K10 -- Import/Export Bank
#2020-03-03

from pymongo import MongoClient
client = MongoClient('localhost')
db = client.sd10
col = db.southpark

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

@app.route('/', methods=['GET','POST'])
def root():
    return ''

if __name__ == '__main__':
    app.debug = True
    app.run()