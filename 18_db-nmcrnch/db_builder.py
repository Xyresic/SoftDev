#Team Maz Hatters - Eric Lam and Ayham Alnasser
#SoftDev1 pd1
#K17 -- No Trouble
#2019-10-10

import sqlite3   #enable control of an sqlite database
import csv       #facilitate CSV I/O


DB_FILE="discobandit.db"

db = sqlite3.connect(DB_FILE) #open if file exists, otherwise create
c = db.cursor()               #facilitate db ops

#==========================================================

def to_table(data):
    table = data[:-4]
    c.execute('DROP TABLE IF EXISTS ' + table + ';')
    with open(data,'r') as file:
        reader = csv.reader(file)
        headings = reader.__next__()
        c.execute('CREATE TABLE IF NOT EXISTS '+table+' ('+headings[0]+' text, '+headings[1]+' numeric, '+headings[2]+' numeric);')
        for row in reader:
            c.execute('INSERT INTO '+table+' VALUES (\''+row[0]+'\', '+row[1]+', '+row[2]+');')

to_table('courses.csv')
to_table('students.csv')

#==========================================================

db.commit() #save changes
db.close()  #close database
