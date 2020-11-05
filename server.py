from flask import render_template
import connexion
import flask
from flask_sqlalchemy import SQLAlchemy
import os
#import sys
# sys.path.append('C://Users//grram//PycharmProjects//projectscheduling/')


app = flask.Flask(__name__)

print(os.environ['APP_SETTINGS'])
app.config.from_pyfile('app//myconfig.py')
print(app.config.from_pyfile('app//myconfig.py'))

db = SQLAlchemy(app)


# db = SQLAlchemy(app)
# Create the application instance
# app = connexion.App(__name__, specification_dir="./")
# Read the swagger.yml file to configure the endpoints
# api("swagger.yml")


# create a URL route in our application for "/"
@app.route("/")
def home():
    """
    This function just responds to the browser URL
    localhost:5000/
    :return:        the rendered template "home.html"
    """
    return render_template("home.html")



if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)