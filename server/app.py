
from flask import Flask, request, jsonify, redirect
import pandas as pd
import pymssql as sql
from flask_cors import CORS

from os import getenv
from dotenv import load_dotenv
load_dotenv()


conn = sql.connect(server='213.140.22.237\SQLEXPRESS', user= 'elsherbini.mohamed', password='xxx123##', database='elsherbini.mohamed')

app = Flask(__name__)
CORS(app)



## Home Data 

@app.route('/all')
def getall():

    data = request.args.get("")
    df = pd.read_sql(q, conn)

    res = list(df.to_dict("index").values())    # list(df.to_dict("index").values())

    return jsonify(res)


## Register 

@app.route("/register/data", methods=["POST"])
def dati_registrazione():
  username = request.args.get("name")
  email = request.args.get("email")
  password = request.args.get("password")

  Cq = "SELECT * FROM docente WHERE username = %(username)s OR email = %(e)s"
  Ccursor = conn.cursor(as_dict=True)
  Cp = {"username": f"{username}","e": f"{email}"}
  Ccursor.execute(Cq, Cp)
  Cdata = Ccursor.fetchall()

  print(Cdata)

  if len(Cdata) < 1:
    print(request.args)
    q = 'INSERT INTO docente (username, email, password) VALUES (%(username)s, %(email)s, %(password)s)'
    cursor = conn.cursor(as_dict=True)
    p = {"username": f"{username}","email": f"{email}","password": f"{password}"}

    cursor.execute(q, p)
    conn.commit()
    return jsonify({'data': 'Ok!', 'url': 'login'})
  else:
    return jsonify({'data': 'User already exists!', 'url': None})


    

@app.route("/login/data", methods=["POST"])
def dati_login():
  cursor = conn.cursor(as_dict=True)

  email = request.args.get("email")
  password = request.args.get("password")

  data = {
    'errore': "",
    'data': {}
  }

  q = "select * from docente where useremail = %(email)s"
  p = {"email": f"{email}","password": f"{password}"}
  cursor.execute(q, p)
  res = cursor.fetchall()

  if len(res) > 0:
    if res[0]['password'] == password:
      data['data'] = res[0]
    else:
      data['errore'] = "Password sbagliata"
  else:
     data['errore'] = "L'utente non esiste"
  
  print(data)
  return jsonify(data)



  ## BACKEND

@app.route('/backend', methods=['POST'])
def backend():
        if request.method == 'POST':
            nome = request.args.get('nome')
            cognome = request.args.get('cognome')

            #query
            cursor = conn.cursor(as_dict=True)
            q = ''
            cursor.execute(q, params={'nome': nome, 'cognome': cognome})
            conn.commit()
            return jsonify(request.args)



if __name__=='__main__':
    app.run(host="0.0.0.0", port=5000)