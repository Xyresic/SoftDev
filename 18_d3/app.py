import os
from flask import Flask, render_template, request, session, redirect, url_for, flash, jsonify

app = Flask(__name__)
app.secret_key = os.urandom(32)

def get_data():
    return ''

@app.route('/', methods=['GET', 'POST'])
def root():
    return render_template('main.html', data = get_data())


if __name__ == '__main__':
    app.debug = True
    app.run()
