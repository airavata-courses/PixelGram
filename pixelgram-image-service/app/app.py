from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from flask_restful import Api
from resources.usertoimage import UsertoimageResource, process_user_to_image_queue_data
from resources.imagedetails import ImagedetailsResource, process_image_details_queue_data
from resources.sharedetails import ShareddetailsResource
from rabbitmq import consumerMQ
from config import USER_TO_IMAGE_QUEUE, IMAGE_DETAILS_QUEUE

app = Flask(__name__)

app.secret_key = 'jose'

CORS(app)

api = Api(app)

api.add_resource(UsertoimageResource,'/usertoimage')
api.add_resource(ImagedetailsResource, '/imagedetails')
api.add_resource(ShareddetailsResource, '/shareimage')

if __name__ == '__main__':
    userconsumermq = consumerMQ(USER_TO_IMAGE_QUEUE, process_user_to_image_queue_data)
    imagedetailsconsumermq = consumerMQ(IMAGE_DETAILS_QUEUE, process_image_details_queue_data)
    app.run(debug = True)
