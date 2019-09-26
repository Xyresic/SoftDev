from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/auth')
def handle():
    print(app)
    print(request)
    print(request.headers)
    print(request.form)
    print(request.method)
    return render_template('forms.html')

if __name__ == "__main__":
    app.debug=True
    app.run()
