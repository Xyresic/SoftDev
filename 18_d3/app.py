import os
from flask import Flask, render_template, request, session, redirect, url_for, flash, jsonify

app = Flask(__name__)
app.secret_key = os.urandom(32)


@app.route('/', methods=['GET', 'POST'])
def root():
    return render_template('main.html')


@app.route('/data')
def data():
    return jsonify(get_data())


def get_data():
    return ''


if __name__ == '__main__':
    app.debug = True
    app.run()
