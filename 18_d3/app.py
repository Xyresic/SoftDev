import os, csv
from flask import Flask, render_template, jsonify

app = Flask(__name__)
app.secret_key = os.urandom(32)

rename = {
    "Antigua and Barbuda":"Antigua and Barb.",
    "Bosnia and Herzegovina":"Bosnia and Herz.",
    "Central African Republic":"Central African Rep.",
    "Congo (Brazzaville)":"Congo",
    "Congo (Kinshasa)":"Dem. Rep. Congo",
    "Dominican Republic":"Dominican Rep.",
    "Equatorial Guinea":"Eq. Guinea",
    "Korea, South":"South Korea",
    "Saint Kitts and Nevis":"St. Kitts and Nevis",
    "Saint Vincent and the Grenadines":"St. Vin. and Gren.",
    "Sao Tome and Principe":"São Tomé and Principe",
    "South Sudan":"S. Sudan",
    "North Macedonia":"Macedonia",
    "US":"United States of America"
}

def get_data():
    parse = {}
    with open('./static/data/covid19_confirmed.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)
        next(reader)
        for row in reader:
            date = row[4]
            if date not in list(parse):
                parse[date] = {}
            name = rename[row[1]] if row[1] in list(rename) else row[1]
            if name in list(parse[date]):
                parse[date][name] += int(row[5])
            else:
                parse[date][name] = int(row[5])
    return parse


@app.route('/', methods=['GET', 'POST'])
def root():
    return render_template('main.html', data=get_data())


@app.route('/data')
def data():
    return jsonify(get_data())


if __name__ == '__main__':
    app.debug = True
    app.run()