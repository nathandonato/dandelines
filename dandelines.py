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
    # Open MySQL connection
    connection = dbConnect()
    cursor = connection.cursor()

    # Select journal that matches the date requested and the user requesting it
    cursor.execute("SELECT entry FROM dande.journals WHERE entry_date = \'" + request.form['entry_date'] + "\' AND user_id = " + request.form['user'])  
    
    # Get result
    entry = None
    for (e) in cursor:
        entry = e

    # Close connection
    cursor.close()
    connection.close()

    # Returns
    if entry is None:
        if 'create_if_null' in request.form and request.form['create_if_null'] == 'yes':
            return createEntry(request.form['entry_date'], request.form['user'], "<p>Type to get started.</p>")
        else:
            return ""
    else:
        return entry

if __name__ == "__main__":
    app.debug = True
    app.run()
