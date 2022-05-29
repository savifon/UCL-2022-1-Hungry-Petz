from flask import Flask, render_template, request
from controlaMotor import *
from time import sleep

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")
    
@app.route("/liberaRacao", methods=["POST"])
def liberaRacao():
    motorGiro = request.get_json()

    if motorGiro["cart"]:
        if "1" in motorGiro["cart"]:
            forward2(3)
            sleep(4 * motorGiro["2"]["quantity"])
            stop2()
            print("1")
        if "2" in motorGiro["cart"]:
            forward1(3)
            sleep(4 * motorGiro["1"]["quantity"])
            stop1()
            print ("2")

    return {"liberaRacao":True}

app.run(port=5587)
