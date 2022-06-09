from flask import Flask, render_template, request
from flask_cors import CORS
from controlaMotor import *
from time import sleep
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")
    
@app.route("/liberaRacao", methods=["POST"])
def liberaRacao():
    dados = request.get_json()

    if dados["cart"]:
        if "1" in dados["cart"]:
            forward2(3)
            sleep(4 * dados["2"]["quantity"])
            stop2()
        if "2" in dados["cart"]:
            forward1(3)
            sleep(4 * dados["1"]["quantity"])
            stop1()
        payload = json.dumps(dados, separators=(',', ':'))
        headers = {'Content-Type': 'application/json'}
        requests.post("https://pivpix.herokuapp.com/dados-venda",headers=headers, data=payload)
    return {"liberaRacao":True}

app.run(port=5587)
