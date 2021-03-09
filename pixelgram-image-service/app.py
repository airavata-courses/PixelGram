from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from flask_restful import Api
from resources.usertoimage import UsertoimageResource
import create_tables

app = Flask(__name__)

app.secret_key = 'jose'

CORS(app)

api = Api(app)

api.add_resource(UsertoimageResource,'/usertoimage')

if __name__ == '__main__':
    app.run(debug = True, port = 5005)
