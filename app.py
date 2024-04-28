from flask import Flask, render_template
from flask_font_awesome import FontAwesome

app = Flask(__name__)
font_awesome = FontAwesome(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/gamesBase')
def gamesBase():
    return render_template('gamesBase.html')