#Team Meseeks (Eric Lam and Michael Zhang)
#SoftDev1 pd1
#K15 -- Do I Know You?
#2019-10-01

import os
from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route('/login', methods=['GET','POST'])
def login():
    return render_template('login.html')

@app.route('/welcome', methods=['GET','POST'])
def welcome():
    return render_template('welcome.html', user=session['user'])

@app.route('/error', methods=['GET','POST'])
def error():
    user = session.pop('user') != 'Michael'
    pword = session.pop('pass') != 'hunter2'
    error = 'Bad Juju' if user and pword else 'Bad Username' if user else 'Bad Password'
    return render_template('error.html', message=error)

@app.route('/logout', methods=['GET','POST'])
def logout():
    session.pop('user')
    session.pop('pass')
    return render_template('logout.html')

@app.route('/', methods=['GET','POST'])
def rootFunc():
    if 'user' in session:
        return redirect(url_for('welcome'))
    else:
        return redirect(url_for('login'))

@app.route('/check', methods=['GET','POST'])
def authenticate():
    session['user'] = request.form['username']
    session['pass'] = request.form['password']
    if session['user'] == 'Michael' and session['pass'] == 'hunter2':
        return redirect(url_for('welcome'))
    else:
        return redirect(url_for('error'))

if __name__ == '__main__':
    app.debug = True
    app.run()
