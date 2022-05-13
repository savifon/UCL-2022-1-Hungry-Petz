from flask import Flask, render_template, request
#from controlaMotor import *
from time import sleep
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
    print("Entrou")
    return render_template("index.html")
    
@app.route("/liberaRacao", methods=["GET", "POST"])
def liberaRacao():
    motorGiro = request.json()
    if motorGiro["cart"][0]["id"] == 1 and motorGiro["cart"][1]["id"] == 2:
        # forward1(3)
        # forward2(3)
        # sleep(4)
        # stop1()
        # stop2()
        print(1)
    elif motorGiro["cart"][0]["id"] == 1:
        # forward1(3)
        # sleep(4)
        # stop1()
        print(2)

    elif motorGiro["cart"][1]["id"] == 2:
        # forward2(3)
        # sleep(4)
        # stop2()
        print(3)
    return {"liberaRacao":True}

app.run(port=5587)
