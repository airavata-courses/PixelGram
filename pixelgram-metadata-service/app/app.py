from flask import Flask, session
from flask_cors import CORS
from flask_restful import Api
from flask_jwt import JWT
from flask import request
from metadata import MetaDataExtractorResource
from rabbitmq import consumerMQ, producerMQ
from config import IMAGE_DETAILS_QUEUE, METADATA_QUEUE

app = Flask(__name__)

app.secret_key =  'jose'

CORS(app)

api = Api(app)


if __name__ == "__main__":
    imagedetailsproducermq = producerMQ(IMAGE_DETAILS_QUEUE)
    metadataconsumermq = consumerMQ(METADATA_QUEUE)
    app.run(debug = True)
