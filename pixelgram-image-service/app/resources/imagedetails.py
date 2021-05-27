import json
from flask_restful import Resource,reqparse
from models.imagedetails import imagedetailsModel

def process_image_details_queue_data(ch, method, properties, body):
    body = json.loads(body)
    print(body)
    try:
        print("Inserted")
        ch.basic_ack(delivery_tag = method.delivery_tag)
    except Exception as e:
        print(e)



class ImagedetailsResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('imageid', type= str, required= True, help= "This field cannot be left blank")
    parser.add_argument('locationname', type= str, required= False, default=None)
    parser.add_argument('latitude', type= float, required= False, default=None)
    parser.add_argument('longitude', type= float, required= False, default=None)
    parser.add_argument('createdate', type= lambda s: datetime.datetime.strptime(s, '''%Y-%m-%dT%H:%M:%SZ'''), required= False, default=None)

    def post(self):
        data = ImagedetailsResource.parser.parse_args()
        print(data)
        try:
            imagedetails = imagedetailsModel(imageid=data['imageid'])
            print(imagedetails.__dict__)
            imagedetails.getimagedetails()
            return json.dumps(imagedetails.__dict__), 200
        except Exception as e:
            return json.dumps({'error': e}), 500
    
    def delete(self):
        data = ImagedetailsResource.parser.parse_args()
        print(data)
        try:
            imagedetails = imagedetailsModel(imageid=data['imageid'])
            print(imagedetails.__dict__)
            imagedetails.deletedetails()
            return json.dumps({'message': 'Deleted successfully'}), 200
        except Exception as e:
            return json.dumps({'error': e}), 500

    def put(self):
        data = ImagedetailsResource.parser.parse_args()
        print(data)
        try:
            imagedetails = imagedetailsModel(
                imageid= data['imageid'],
                locationname= data['locationname'],
                latitude= data['latitude'],
                longitude= data['longitude']
            )
            print(imagedetails.__dict__)
            imagedetails.updateorinsert()
            return json.dumps({'message': 'Updated/inserted successfully'}), 200
        except Exception as e:
            return json.dumps({'error': e}), 500