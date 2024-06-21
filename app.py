from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/block_dodger')
def blockDodger():
    return render_template('/gameTemplates/blockDodger.html')

@app.route('/car_drive')
def carDrive():
    return render_template('/gameTemplates/carDrive.html')