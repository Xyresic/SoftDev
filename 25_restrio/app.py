from flask import Flask, render_template
import json
from urllib.request import urlopen
app = Flask(__name__)


@app.route("/")
def yeet():
    url = urlopen("https://api.nasa.gov/planetary/apod?api_key=FGtm7aHTXQlrO7Gd3JWbEWA0e1cNT5hLKMETo2Mp")
    response = url.read()
    data = json.loads(response)
    return render_template('index.html', imgsrc=data['url'], explanation = data['explanation'])


if __name__ == "__main__":
    app.run(debug=True)