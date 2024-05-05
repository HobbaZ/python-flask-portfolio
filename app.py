from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/gamesBase')
def gamesBase():
    return render_template('gamesBase.html')