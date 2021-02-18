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

    def getMetaData(request):
        return self.stub.getMetaData(pb2.MetadataRequest(**request))

def get_image_byte_data():
    image = Image.open("./Image/sample.jpg")
    exif_data = image.getexif()
    img_byte_arr = io.BytesIO()
    roi_img.save(img_byte_arr, format='JPG', exit=exif)
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