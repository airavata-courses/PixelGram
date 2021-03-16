from flask import Flask, session
from flask_cors import CORS
from flask_restful import Api
from flask_jwt import JWT
from flask import request
from resources.user import UserRegister, User, getUserDetailsByName
from models.user import search_by_username, authentication
import create_tables

app = Flask(__name__)

app.secret_key =  'jose'

CORS(app)

api = Api(app)

app.add_resource(MetaDataExtractorResource, '/metadataectractor')

if __name__ == "__main__":
    app.run(port = 5006, debug = True, host='0.0.0.0')
