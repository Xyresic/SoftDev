#Team Mmm-Kay? - Clement Chan & Eric Lam
#SoftDev pd1
#K11 -- Ay Mon Go Git It From Yer Flask
#2020-03-07

import os
from flask import Flask, render_template, request, session, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = os.urandom(32)

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

@app.route('/',methods=['GET','POST'])
def root():
    form = request.form
    results = ''
    if 'option' in form:
        if form['option'] == 'ID':
            results = filter_id(int(form['query']))
        if form['option'] == 'Title':
            results = filter_title(form['query'])
        if form['option'] == 'Season & Number':
            results = filter_season_num(int(form['s']),int(form['e']))
        if form['option'] == 'Before Date':
            results = filter_before_date(form['query'])
        if form['option'] == 'Description':
            results = filter_desc(form['query'])
    return render_template("base.html",results=results)

if __name__ == '__main__':
    app.debug = True
    app.run()