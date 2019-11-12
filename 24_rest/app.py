from flask import Flask, render_template
import urllib.request as urllib
import json, random, datetime

app = Flask(__name__)

endpoint = 'https://api.nasa.gov/planetary/apod?date=%d-%d-%d&hd=true&api_key=EoAkZW94V81mbKf6UntnTYUzwqoiaSJxlZ3pfXPB'

@app.route('/')
def root():
    start = datetime.date(1995,6,16).toordinal()
    end = datetime.date.today().toordinal()
    date = datetime.date.fromordinal(random.randint(start, end))
    u = urllib.urlopen(endpoint % (date.year,date.month,date.day))
    response = u.read()
    data = json.loads(response)
    return render_template('index.html', title=data['title'], pic = data['url'], info = data['explanation'])

if __name__ == "__main__":
    app.debug = True
    app.run()