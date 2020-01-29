#Eric "Rick" Lam
#SoftDev1 pd1
#K8 -- First Flask App
#2019-09-17
import random
from flask import Flask
app = Flask(__name__) #create instance of class Flask

messages = ['It is certain.','It is decidedly so.','Without a doubt.',
            'Yes, definitely.','You may rely on it.','As I see it, yes.',
            'Most likely.','Outlook good.','It is known.','Signs point to yes.',
            'Reply hazy, try again.','Ask again later.',
            'Better not tell you now.','Cannot predict now.',
            'Concentrate and ask again.','Don\'t count on it.','My reply is no.',
            'My sources say no.','Outlook not so good.','Very doubtful.']

@app.route("/") #assign following fxn to run when root route requested
def hello_world():
    #print(__name__) #where will this go?
    return '''<!DOCTYPE html>
    <html lang="en-US">
        <head>
            <title>How?</title>
        </head>
        <body>
            You're in the wrong <a href="http://127.0.0.1:5000/old">place</a>.
        </body>'''

@app.route("/old")
def to_Old():
    html = open("index.html")
    text = html.read()
    html.close()
    return text

@app.route("/magic8ball")
def shake():
    html = open("magic8ball.html")
    text = html.read()
    html.close()
    return text

@app.route("/response")
def respond():
    html = open("response.html")
    text = html.read().format(random.choice(messages))
    html.close()
    return text

if __name__ == "__main__":
    app.debug = True
    app.run()
