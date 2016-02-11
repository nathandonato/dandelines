from flask import Flask, render_template, json, jsonify, request
import mysql.connector
import os.path, sys
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))
from secrets import *

def dbConnect():
    secrets = secretsSafe()
    return mysql.connector.connect(user=secrets['user'], password=secrets['password'], database=secrets['database'], host=secrets['host'])

def createEntry(entry_date, user, entry):
    #  TODO: Actually create it!
    return entry