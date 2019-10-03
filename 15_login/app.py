#Team Meseeks (Eric Lam and Michael Zhang)
#SoftDev1 pd1
#K15 -- Do I Know You?
#2019-10-01

import os
from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route("/", methods=['POST'])
def rootFunc():
    if request.cookies.get('logout')=='Log Out':
        return redirect(url_for('welcome'))
    else:
        return redirect(url_for('login'))

@app.route('/login', methods=['POST'])
def login():
    return render_template('login.html')

@app.route("/check", methods=['POST'])
def authenticate():
    if request.form["username"] == "Michael" and request.form["password"] == "hunter2":
        session['user'] = 'Michael'
        return render_template('welcome.html', user=request.form["username"])
    else:
        return redirect(url_for('error'))

@app.route('/welcome', methods=['POST'])
def welcome():
    return render_template('welcome.html')

@app.route('/error', methods=['POST'])
def error():
    user = request.form["username"] != "Michael"
    pword = request.form["password"] != "hunter2"
    error = 'Bad Juju' if user and pword else 'Bad Username' if user else 'Bad Password'
    return render_template('error.html', message=error)

@app.route('/logout', methods=['POST'])
def logout():
    return render_template('logout.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
