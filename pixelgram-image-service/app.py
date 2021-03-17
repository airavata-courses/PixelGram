from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from flask_restful import Api
from resources.usertoimage import UsertoimageResource
from resources.imagedetails import ImagedetailsResource
from resources.sharedetails import ShareddetailsResource
import create_tables
from rabbitmq import consumerMQ
from config import USER_TO_IMAGE_QUEUE

app = Flask(__name__)

app.secret_key = 'jose'

CORS(app)

api = Api(app)

api.add_resource(UsertoimageResource,'/usertoimage')
api.add_resource(ImagedetailsResource, '/imagedetails')
api.add_resource(ShareddetailsResource, '/shareimage')

if __name__ == '__main__':
    create_tables.createdb()
    consumermq = consumerMQ(USER_TO_IMAGE_QUEUE)
    app.run(debug = True, port = 5005, host='0.0.0.0')
