from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from flask_restful import Api
import gdrive


app = Flask(__name__)

app.secret_key =  'jose'

CORS(app)

api = Api(app)


@app.route('/gdrive/upload/<user_id>', methods=['POST'])
def upload_file(user_id):
    if 'images' not in request.files:
        return Response('There is no image feilds to proceed', 400)
    files = request.files.getlist('images')
    return gdrive.files_to_be_uploaded(files, user_id)


@app.route('/gdrive/view/<file_id>', methods=['GET'])
def view_file(file_id):
    return gdrive.view_file(file_id)

@app.route('/gdrive/download', methods=['POST'])
def download_files():
    imageids = request.form.getlist('imageids')
    return download_multiple_files(imageids)

if __name__ == "__main__":
    drive_api = gdrive.getDriveService()
    app.run(port = 5004, debug = True)
