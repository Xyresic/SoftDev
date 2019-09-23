#Eric "Rick" Lam, Yevgeniy Gorbachev
#SoftDev1 pd1
#K10 -- Jinja tuning
#2019-09-22

from random import choices
from flask import Flask, render_template
import csv
app = Flask(__name__)
__ppath__ = __file__[: __file__.rfind('/') if __file__.rfind('/') != -1 else __file__.rfind('\\')] # python file's parent directory
print(__ppath__)
def weightedRandFromDict(dictionary):
    items = dictionary.items()
    keys = [item[0] for item in items]
    weights = [item[1] for item in items]
    return choices(keys,weights=weights,k=1)[0]

def gen_dict():
    lines = [line for line in csv.reader(open(__ppath__ + "/data/occupations.csv"))] # uses a csv.reader to parse the file
    lines = [(line[0],float(line[1])) for line in lines[1:-2]]# removes the column names and "Total" row, re-expresses as a list of tuples to enable dictionary conversion
    lines.append(("Unemployed",0.2)) # accounts for missing 0.2% of jobs
    return dict(lines)

@app.route("/")
def root():
    return "You're in the wrong place, <a href=\"http://127.0.0.1:5000/occupyflaskst\">this</a> is where you want to be"

@app.route("/occupyflaskst")
def fill_table():
    occs = gen_dict()
    selected = weightedRandFromDict(occs)
    return render_template("occtempl.html",randJob=selected,data=occs.items())

if __name__ == "__main__":
    app.debug = True
    app.run()
