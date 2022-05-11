from flask import Flask, render_template # These are all we need for our purposes
from controlaMotor import *
from time import sleep
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")
    
@app.route("/liberaRacao", methods=["GET", "POST"])
def liberaRacao():
    forward(3)
    sleep(4)
    stop()
    return {"liberaRacao":True}

app.run(port=5587)
