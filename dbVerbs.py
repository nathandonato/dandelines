from flask import Flask, render_template, json, jsonify, request
import mysql.connector
import os.path, sys
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))
from secrets import *

secrets = secretsSafe()

def dbConnect():
    return mysql.connector.connect(user=secrets['user'], password=secrets['password'], database=secrets['database'], host=secrets['host'])

def createEntry(form):
    connection = dbConnect()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO journals (user_id, entry_date, entry) VALUES ("+ form['user_id'] + ", \'" + form['entry_date'] + "\', \'" + form['entry'] +"\');")

    # Commit and close connection
    connection.commit()
    cursor.close()
    connection.close()

    return getEntry(form)

def getEntry(form):
    connection = dbConnect()
    cursor = connection.cursor()

    cursor.execute("SELECT entry FROM journals WHERE entry_date = \'" + form['entry_date'] + "\' AND user_id = " + form['user_id'])
    
    # Get result
    entry = None
    for (e) in cursor:
        entry = e

    # Close connection
    cursor.close()
    connection.close()

    return entry
