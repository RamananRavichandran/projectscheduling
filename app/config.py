import os
from server import app
from flask_marshmallow import Marshmallow

basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)


# Create the connexion application instance
# connex_app = connexion.App(__name__, specification_dir=basedir)

# Get the underlying Flask app instance
# app = connex_app.app

# Build the Sqlite ULR for SqlAlchemy
# postgres_url = "postgres:////" + os.path.join(basedir, "dbo.project.db")
# print(postgres_url)
'''
DATABASE_URL = "postgresql:///postgres"
# Configure the SqlAlchemy part of the app instance
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
'''
# Create the SqlAlchemy db instance

# Initialize Marshmallow
ma = Marshmallow(app)

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'root'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
