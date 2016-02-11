from flask import Flask, render_template, json, jsonify, request
import mysql.connector
from dbVerbs import *
# from werkzeug import generate_password_hash, check_password_hash

app = Flask(__name__)

# Routes
@app.route("/")
def main():
    return render_template('index.html')

@app.route("/getBackgrounds", methods=['GET'])
def getBackgrounds():
	return render_template('images.json')

@app.route("/getJournal", methods=['POST'])
def getJournal():
    # Query db
    entry = getEntry(request.form)

    # Returns
    if entry is None:
        if 'create_if_null' in request.form and request.form['create_if_null'] == 'yes':
            return createEntry({ 'entry_date' :request.form['entry_date'], 'user_id' : request.form['user_id'], 'entry' : "<p>Type to get started.</p>"})
        else:
            return ""
    else:
        return entry

if __name__ == "__main__":
    app.debug = True
    app.run()
