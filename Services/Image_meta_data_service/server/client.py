import grpc
import proto.metaData_pb2 as pb2
import proto.metaData_pb2_grpc as grpc_pb2
import io
from PIL import Image

class MetadataClient:
    def __init__(self):
        self.host = 'localhost'
        self.server_port = 50051

        self.channel = grpc.insecure_channel('{}:{}'.format(self.host,self.server_port))
        self.stub = grpc_pb2.MetadataServiceStub(self.channel)

    def getMetaData(self, request):
        return self.stub.getMetaData(request)

def get_image_byte_data():
    image = Image.open("./Image/sample.jpeg")
    exif_data = image.getexif()
    exif = image.info['exif']
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='JPEG', exif=exif)
    return img_byte_arr.getvalue()


if __name__ == '__main__':
    client = MetadataClient()
    imageData = get_image_byte_data()
    request = pb2.MetadataRequest(**{
        'userId': 'ssannid',
        'imageId': '1234',
        'imageData': imageData
    })
    result = client.getMetaData(request)
    print(result)