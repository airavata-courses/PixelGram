import json
from flask_restful import Resource,reqparse
from models.sharedetails import shareimagedetalsModel



class ShareddetailsResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('userid', type= str, required= True, help= "This field cannot be left blank")
    parser.add_argument('imageids', type= str, action="append", required= False, help= "Imageids can be left blank")
    parser.add_argument('sharedtoids', type= str, action="append", required= False, help= "Imageids can be left blank")

    def put(self):
        data = ShareddetailsResource().parser.parse_args()
        if  data['imageids'] == None or data['sharedtoids'] == None:
            return json.dumps({'error': '''imageids and sharedtoids shouldn't be None'''}), 500
        try:
            shareimagedetals = shareimagedetalsModel(
                userid = data['userid'],
                imageids = data['imageids'],
                sharedtoids = data['sharedtoids'] 
            )
            shareimagedetals.update_share_details()
            return json.dumps({'message': 'Inserted successfully'}), 200
        except Exception as e:
            print(e)
            return json.dumps({'error': e}), 500


    def delete(self):
        data = ShareddetailsResource().parser.parse_args()
        if  data['imageids'] == None and data['sharedtoids'] == None:
            try:
                shareimagedetals = shareimagedetalsModel(userid=data['userid'])
                shareimagedetals.delete_share_details_for_user()
                return json.dumps({'message': 'Deleted successfully'}), 200
            except Exception as e:
                print(e)
                return json.dumps({'error': e}), 500
        elif data['imageids'] == None and not data['sharedtoids'] == None:
            try:
                shareimagedetals = shareimagedetalsModel(userid=data['userid'], sharedtoids=data['sharedtoids'])
                shareimagedetals.delete_share_details_for_user_shareuser()
                return json.dumps({'message': 'Deleted successfully'}), 200
            except Exception as e:
                print(e)
                return json.dumps({'error': e}), 500
        elif (not (data['imageids'] == None)) and (not (data['sharedtoids'] == None)):
            try:
                shareimagedetals = shareimagedetalsModel(userid=data['userid'], imageids=data['imageids'], sharedtoids=data['sharedtoids'])
                shareimagedetals.delete_share_details()
                return json.dumps({'message': 'Deleted successfully'}), 200
            except Exception as e:
                print(e)
                return json.dumps({'error': e}), 500
        else:
            try:
                shareimagedetals = shareimagedetalsModel(userid=data['userid'], imageids=data['imageids'])
                shareimagedetals.delete_share_details_images()
                return json.dumps({'message': 'Deleted successfully'}), 200
            except Exception as e:
                print(e)
                return json.dumps({'error': e}), 500




    def post(self):
        data = ShareddetailsResource().parser.parse_args()
        try:
            shareimagedetals = shareimagedetalsModel(userid = data['userid'])
            response = shareimagedetals.get_shared_imageids()
            print(response)
            return json.dumps(response), 200
        except Exception as e:
            print(e)
            return json.dumps({'error', e}), 500
