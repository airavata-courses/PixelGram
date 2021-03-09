import json
from flask_restful import Resource,reqparse
from models.usertoimage import usertoimageModel


class UsertoimageResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('userid', type= str, required= True, help= "This field cannot be left blank")
    parser.add_argument('imageids', type= str, action="append", required= False, help= "Imageids cant be left blank")

    def post(self):
        data = UsertoimageResource.parser.parse_args()
        print(data)
        try:
            usertoimage = usertoimageModel(userid=data['userid'])
            print(usertoimage.__dict__)
            usertoimage.get_imageids()
            return json.dumps(usertoimage.__dict__), 200
        except Exception as e:
            print(e)
            return json.dumps({ "error": e }), 500

    def delete(self):
        data = UsertoimageResource().parser.parse_args()
        if data['imageids'] == None:
            return json.dumps({'error': 'imageids parameter should pass'}), 500
        if len(data['imageids']) > 0:
            try:
                usertoimage = usertoimageModel(
                    userid=data['userid'],
                    imageids=data['imageids']
                )
                usertoimage.delete_imageids()
            except Exception as e:
                print(e)
                return json.dumps({'error': e}), 500

    def put(self):
        data = UsertoimageResource().parser.parse_args()
        print("Resourse imageids: {}".format(data['imageids']))
        if data['imageids'] == None:
            return json.dumps({'error': 'imageids parameter should pass'}), 500
        if len(data['imageids']) > 0:
            try:
                usertoimage = usertoimageModel(
                    userid=data['userid'],
                    imageids=data['imageids']
                )
                usertoimage.insert()
                return json.dumps({'message': 'Inserted successfully'}), 200
            except Exception as e:
                print(e)
                return json.dumps({'error': e}), 500

