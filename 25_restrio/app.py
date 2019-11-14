from flask import Flask, render_template
import json
from urllib.request import urlopen
from random import randint, choice

app = Flask(__name__)

@app.route("/")
def root():
    character = {}
    url = urlopen("http://dnd5eapi.co/api/classes/%d" % randint(1,12))
    data = json.loads(url.read())
    character['class'] = data['name']
    character['hit'] = 'd' + str(data['hit_die'])
    character['saves'] = str([l['name'] for l in data['saving_throws']])[1:-1].replace('\'','').replace('\"','')
    character['profs'] = [l['name'] for l in data['proficiencies']]
    character['skills'] = []
    for i in range(data['proficiency_choices'][0]['choose']):
        prof = choice(data['proficiency_choices'][0]['from'])
        character['skills'].append(prof['name'])
        data['proficiency_choices'][0]['from'].remove(prof)
    url = urlopen("http://dnd5eapi.co/api/races/%d" % randint(1,9))
    data = json.loads(url.read())
    character['race'] = data['name']
    character['size'] = data['size']
    character['speed'] = data['speed']
    character['languages'] = str([l['name'] for l in data['languages']])[1:-1].replace('\'','').replace('\"','')
    character['traits'] = str([t['name'] for t in data['traits']])[1:-1].replace('\'','').replace('\"','')
    for p in data['starting_proficiencies']:
        if 'Skill' in p['name']:
            character['skills'].append(p['name'])
        else:
            character['profs'].append(p['name'])
    character['profs'] = str(character['profs'])[1:-1].replace('\'','').replace('\"','')
    character['skills'] = str(character['skills'])[1:-1].replace('\'','').replace('\"','').replace('Skill: ','')
    return render_template('index.html',race=character['race'],rclass=character['class'],hit=character['hit'],
                            speed=character['speed'],size=character['size'],languages=character['languages'],
                            saves=character['saves'], profs=character['profs'], skills=character['skills'],
                            traits=character['traits'])


if __name__ == "__main__":
    app.run(debug=True)