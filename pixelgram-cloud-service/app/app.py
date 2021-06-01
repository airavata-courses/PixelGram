from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from flask_restful import Api
import gdrive
from config import USER_TO_IMAGE_QUEUE, METADATA_QUEUE
from rabbitmq import producerMQ, consumerMQ
import json

import logging


app = Flask(__name__)

app.secret_key =  'hello'

CORS(app)

api = Api(app)

# drive_api = gdrive.getDriveService()
# userproducermq = producerMQ(USER_TO_IMAGE_QUEUE)
# userproducermq.publish_message(
#         body= json.dumps({
#             "user_id": "8823714f-9a93-4901-89cd-0ea298b60ce0",
#             "imageids": ["1rE-2eNcHe6ndYiZXbIki-plFDJSjyX7y"]
#         })
#     )
# metadataproducermq = producerMQ(METADATA_QUEUE)


@app.route('/gdrive/upload/<user_id>', methods=['POST'])
def upload_file(user_id):
    print(request.files)
    if 'images' not in request.files:
        return Response('There is no image feilds to proceed', 400)
    files = request.files.getlist('images')
    return gdrive.files_to_be_uploaded(files, user_id, userproducermq, metadataproducermq)


@app.route('/gdrive/view/<file_id>', methods=['GET'])
def view_file(file_id):
    return gdrive.view_file(file_id)

@app.route('/gdrive/download', methods=['POST'])
def download_files():
    if request.json['imageids'] == None:
        return {'message: Must have imageids'}, 400
    return gdrive.download_multiple_files(request.json['imageids'])

if __name__ == "__main__":
    drive_api = gdrive.getDriveService()
    userproducermq = producerMQ(USER_TO_IMAGE_QUEUE)
    metadataproducermq = producerMQ(METADATA_QUEUE)
    app.run(debug = True, host='0.0.0.0', port=5004)
