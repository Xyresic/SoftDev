#Battling Mongeese - Ayham Alnasser & Eric Lam
#pd1 softdev
#K12 -- Echo echo echo
#2019 - 09 - 26


from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def handle():
    #print("APP_NAME")
    #print(app)
    #print("REQUEST:")
    #print(request)
    #print("REQUEST_HEADERS:")
    #print(request.headers)
    #print("REQUEST_FORM:")
    #print(request.form)
    #print("REQUEST_METHOD:")
    #print(request.method)
    return render_template('forms.html')


@app.route('/auth')
def process():
    return render_template('process.html',
                           username = request.args["username"],
                           method = request.method
                           )

if __name__ == "__main__":
    app.debug=True
    app.run()
