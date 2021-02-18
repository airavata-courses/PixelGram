import grpc
import io
import numpy as np
from geopy.geocoders import GoogleV3
from concurrent import futures
import time
import proto.metaData_pb2 as pb2
import proto.metaData_pb2_grpc as pb2_grpc
import extract_image_data


class MetadataServiceService(pb2_grpc.MetadataServiceServicer):

    def __init__(self, *args, **kwargs):
        pass

    def getMetaData(self, request, context):
        extraction = extract_image_data.meta_data_extraction(request.imageData,{
            'latitude':'latitude',
            'longitude':'longitude',
            'timestamp':'dateTime',
            'location':'locationName'
        })
        meta_data = extraction.getRequriedExifData()
        meta_data.update({'userId': request.userId, 'imageId': request.imageId})
        return pb2.MetadataResponse(**meta_data)

def start_server():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_MetadataServiceServicer_to_server(MetadataServiceService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started at {}:{}".format('localhost',50051))
    server.wait_for_termination()

if __name__ == '__main__':
    start_server()