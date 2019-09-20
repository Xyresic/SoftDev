#Eric "Rick" Lam
#SoftDev1 pd1
#K9 -- Jinja
#2019-09-19

from flask import Flask, render_template
app = Flask(__name__)

coll = [1,2,3,4,5]

@app.route("/")
def root():
    return render_template("my_foist_template.html",
    foo="<title here>",
    collection=coll)

if __name__ == "__main__":
    app.debug = True
    app.run()
