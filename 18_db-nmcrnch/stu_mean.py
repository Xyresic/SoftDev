#Team [REDACTED] - Eric Lam and Ivan Galakhov
#SoftDev1 pd1
#K18 -- Average
#2019-10-14

import sqlite3

DB_FILE='discobandit.db'

db = sqlite3.connect(DB_FILE)
c = db.cursor()

def compute():
    c.execute('DROP TABLE IF EXISTS stu_avg;')
    c.execute('CREATE TABLE IF NOT EXISTS stu_avg (id numeric, avg numeric);')
    c.execute('INSERT INTO stu_avg SELECT students.id, AVG(courses.mark) '\
              'FROM courses INNER JOIN students ON courses.id = students.id '\
              'GROUP BY students.id;')

def add_row_to_course(row):
    c.execute('INSERT INTO courses VALUES (\"'+row[0]+'\", '+str(row[1])+', ' +str(row[2])+');')
    compute()

add_row_to_course(['quantum',666,1])

db.commit()
db.close()