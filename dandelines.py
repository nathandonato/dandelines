from flask import Flask, render_template, json, request

# from flask.ext.mysql import MySQL
# from werkzeug import generate_password_hash, check_password_hash

app = Flask(__name__)
# mysql = MySQL()
 
# MySQL configurations
# app.config['MYSQL_DATABASE_USER'] = 'root'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
# app.config['MYSQL_DATABASE_DB'] = 'dande'
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# mysql.init_app(app)

# Routes
@app.route("/")
def main():
    return render_template('index.html')

@app.route("/getBackgrounds")
def getBackgrounds():
	return render_template('images.json')

if __name__ == "__main__":
    app.run()