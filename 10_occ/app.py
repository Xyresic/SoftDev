#Eric "Rick" Lam
#SoftDev1 pd1
#K10 -- Occupat
#2019-09-19

from random import choices
from flask import Flask, render_template
app = Flask(__name__)

def weightedRandFromDict(dictionary):
    keys = list(dictionary.keys())
    weights = list(dictionary.values())
    return choices(keys,weights=weights,k=1)[0]

@app.route("/")
def root():
    return "You're in the wrong <a href=http://127.0.0.1:5000/occupyflaskst"">place</a>"

@app.route("/occupyflaskst")
def fill_table():
    table = {}
    csv = open("static/occupations.csv")
    jobs = csv.read().rstrip("\n").split("\n")
    csv.close()
    jobs.insert(-1,"Unemployed,0.2")
    for item in jobs[1:-1]:
        split = item.rsplit(",", 1)
        table[split[0].strip("\"")] = float(split[1])
    generated = weightedRandFromDict(table)
    jobs = [n.replace('\"','').rsplit(',',1) for n in jobs]
    return render_template("occtempl.html",randJob=generated,heading=jobs[0],data=jobs[1:-1],total=jobs[-1])

if __name__ == "__main__":
    app.debug = True
    app.run()
